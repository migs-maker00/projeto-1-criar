// Lógica inteligente do app — sugestões, resumos e alertas (sem API externa)

const REGRAS_CATEGORIA = [
  {
    categoria: "Saúde",
    palavras: [
      "caminh", "correr", "corrida", "água", "agua", "dormir", "sono", "meditar",
      "meditação", "yoga", "exerc", "academia", "alongar", "vitamina", "fruta",
      "salada", "remédio", "remedio", "saúde", "saude", "hidrata",
    ],
  },
  {
    categoria: "Estudo",
    palavras: [
      "ler", "livro", "estud", "curso", "inglês", "ingles", "aprender", "revisar",
      "aula", "prova", "redação", "redacao", "matéria", "materia", "faculdade",
      "universidade", "código", "codigo", "programar",
    ],
  },
  {
    categoria: "Trabalho",
    palavras: [
      "trabalh", "email", "e-mail", "reunião", "reuniao", "projeto", "foco",
      "relatório", "relatorio", "cliente", "tarefa", "escritório", "escritorio",
      "deep work", "produtiv",
    ],
  },
  {
    categoria: "Lazer",
    palavras: [
      "tocar", "jogar", "música", "musica", "hobby", "desenhar", "pintar",
      "filme", "série", "serie", "amigos", "família", "familia", "passear",
      "viagem", "fotograf",
    ],
  },
];

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function sugerirHabito(nome) {
  const texto = normalizarTexto(nome);
  let categoria = "Geral";
  let metaSemanal = 7;
  let horario = "";
  let dica = "";

  if (/agua|litro|hidrata/.test(texto)) {
    categoria = "Saúde";
    metaSemanal = 7;
    dica = "Água funciona melhor com vários lembretes — use a aba Rotina para isso.";
  } else {
    for (const regra of REGRAS_CATEGORIA) {
      if (regra.palavras.some((p) => texto.includes(normalizarTexto(p)))) {
        categoria = regra.categoria;
        break;
      }
    }
  }

  if (/\b(1x|uma vez|1 vez)\b/.test(texto) || /semanal/.test(texto)) {
    metaSemanal = 1;
  } else if (/\b(2x|duas vezes|2 vezes)\b/.test(texto) || /fim de semana/.test(texto)) {
    metaSemanal = 2;
  } else if (/\b(3x|três vezes|3 vezes)\b/.test(texto)) {
    metaSemanal = 3;
  } else if (/\b(4x|quatro vezes|4 vezes)\b/.test(texto)) {
    metaSemanal = 4;
  } else if (/\b(5x|cinco vezes|5 vezes)\b/.test(texto)) {
    metaSemanal = 5;
  } else if (/\b(6x|seis vezes|6 vezes)\b/.test(texto)) {
    metaSemanal = 6;
  } else if (/todo dia|diário|diario|diariamente/.test(texto)) {
    metaSemanal = 7;
  } else if (categoria === "Lazer") {
    metaSemanal = 3;
  } else if (categoria === "Saúde" && /caminh|correr|academia|exerc/.test(texto)) {
    metaSemanal = 5;
  }

  const horaMatch = nome.match(/(?:às|as)\s*(\d{1,2})(?::(\d{2}))?\s*h?/i);
  if (horaMatch) {
    const h = horaMatch[1].padStart(2, "0");
    const m = (horaMatch[2] || "00").padStart(2, "0");
    horario = `${h}:${m}`;
  } else if (!/agua|litro|hidrata/.test(texto)) {
    if (/manha|manhã|cedo|ao acordar|6h|7h|08:|07:|06:/.test(texto)) {
      horario = "07:00";
    } else if (/tarde|almoco|almoço|12h|13h|14:|15:/.test(texto)) {
      horario = "14:00";
    } else if (/noite|jantar|antes de dormir|20h|21h|22h|19:|20:|21:|22:/.test(texto)) {
      horario = "20:00";
    } else if (/medita|silencio/.test(texto)) {
      horario = "06:15";
    } else if (/ler|leitura|livro/.test(texto)) {
      horario = "20:00";
    } else if (/caminh|correr|academia|exerc/.test(texto)) {
      horario = "07:00";
    } else if (categoria === "Estudo") {
      horario = "19:00";
    } else if (categoria === "Trabalho") {
      horario = "09:00";
    }
  }

  return { categoria, metaSemanal, horario, dica };
}

function rotuloMeta(meta) {
  if (meta === 7) return "todo dia";
  if (meta === 1) return "1x/semana";
  return `${meta}x/semana`;
}

function textoSugestao(sugestao) {
  const partes = [`Categoria: ${sugestao.categoria}`, `Meta: ${rotuloMeta(sugestao.metaSemanal)}`];
  if (sugestao.horario) {
    partes.push(`Horário: ${sugestao.horario}`);
  } else if (!sugestao.dica) {
    partes.push("Horário: você escolhe");
  }
  if (sugestao.dica) partes.push(sugestao.dica);
  return partes.join(" · ");
}

function gerarResumoSemana(stats) {
  if (stats.totalHabitos === 0) {
    return "Sua semana ainda está em branco. Adicione um ou dois hábitos na aba Hoje e volte aqui no fim da semana para ver o retrato do seu progresso.";
  }

  const partes = [];

  partes.push(
    `Nos últimos 7 dias você concluiu em média ${stats.mediaConclusao}% dos hábitos.`
  );

  if (stats.melhorDia.pct > 0) {
    partes.push(
      `Seu melhor dia foi ${stats.melhorDia.nome} (${stats.melhorDia.pct}%).`
    );
  }

  if (stats.melhorCategoria && stats.melhorCategoria.pct > 0) {
    partes.push(
      `${stats.melhorCategoria.nome} foi sua categoria mais forte (${stats.melhorCategoria.pct}% de conclusão).`
    );
  }

  if (stats.fracaCategoria && stats.fracaCategoria.pct < stats.melhorCategoria.pct) {
    partes.push(
      `${stats.fracaCategoria.nome} pede mais atenção (${stats.fracaCategoria.pct}% esta semana).`
    );
  }

  if (stats.metasCumpridas > 0) {
    partes.push(
      `${stats.metasCumpridas} de ${stats.metasTotal} metas semanais já foram cumpridas.`
    );
  }

  if (stats.habitoMaisForte) {
    partes.push(`"${stats.habitoMaisForte.nome}" está em ótimo ritmo.`);
  }

  if (stats.mediaConclusao >= 80) {
    partes.push("Semana sólida — consistência é o que transforma hábito em caráter.");
  } else if (stats.mediaConclusao >= 50) {
    partes.push("Você está no caminho. Pequenos ajustes podem elevar o próximo ciclo.");
  } else if (stats.mediaConclusao > 0) {
    partes.push("Semana difícil? Tudo bem. O estoicismo ensina: recomeçar também é virtude.");
  }

  return partes.join(" ");
}

function complementoCoachDiario(notaOntem) {
  if (!notaOntem) return "";

  const texto = normalizarTexto(notaOntem);
  const negativos = ["cansad", "difícil", "dificil", "estresse", "ansied", "mal", "pesad", "trav"];
  const positivos = ["bem", "ótimo", "otimo", "feliz", "produtiv", "leve", "grato", "motivad", "fácil", "facil"];

  if (negativos.some((p) => texto.includes(p))) {
    return " Ontem foi pesado no diário — hoje vá com gentileza, um hábito de cada vez.";
  }
  if (positivos.some((p) => texto.includes(p))) {
    return " Ontem você registrou um bom dia — use esse impulso.";
  }
  if (notaOntem.length > 40) {
    return " Sua nota de ontem mostra reflexão — transforme isso em ação hoje.";
  }
  return "";
}

function mensagemSobrecarga(totalHabitos, habitosDiarios) {
  if (totalHabitos >= 8) {
    return {
      nivel: "alto",
      texto: `${totalHabitos} hábitos é muito para manter foco. Os estoicos dizem: menos, porém com excelência. Que tal manter só os 3 mais importantes?`,
    };
  }
  if (totalHabitos >= 6 || habitosDiarios >= 5) {
    return {
      nivel: "medio",
      texto: `Você já tem ${totalHabitos} hábitos${habitosDiarios >= 5 ? ` (${habitosDiarios} diários)` : ""}. Consistência vence quantidade — adicione só se for essencial.`,
    };
  }
  return null;
}

function confirmarSobrecarga(totalAposAdicionar, habitosDiariosApos) {
  if (totalAposAdicionar >= 8) {
    return (
      `Você terá ${totalAposAdicionar} hábitos. Isso pode diluir sua energia.\n\n` +
      "Mesmo assim quer adicionar?"
    );
  }
  if (totalAposAdicionar >= 6 && habitosDiariosApos >= 5) {
    return (
      `${totalAposAdicionar} hábitos, sendo ${habitosDiariosApos} diários, é uma agenda pesada.\n\n` +
      "Quer adicionar mesmo assim?"
    );
  }
  return null;
}

export {
  sugerirHabito,
  textoSugestao,
  gerarResumoSemana,
  complementoCoachDiario,
  mensagemSobrecarga,
  confirmarSobrecarga,
};
