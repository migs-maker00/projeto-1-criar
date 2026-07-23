// Aprendizado na prática — questões por livro/módulo (conceitos públicos, texto original)

export const LIVRO_COVEY = {
  id: "7-habitos",
  titulo: "Os 7 Hábitos (Covey)",
  subtitulo: "Produtividade e equilíbrio — na prática, sem ler capítulo por capítulo",
  modulos: [
    {
      id: "proativo",
      nome: "Hábito 1 — Ser proativo",
      ideia: "Você escolhe a resposta, não só reage ao que acontece.",
      perguntas: [
        {
          id: "p1",
          tipo: "escolha",
          pergunta: "Você chega da escola exausto e pensa: 'não tenho energia pra nada'. O que é mais PROATIVO?",
          opcoes: [
            "Aceitar que 'hoje não dá' e não fazer nada",
            "Fazer só 2 min de uma coisa que importa, mesmo cansado",
            "Culpar a escola pelo resto do dia perdido",
          ],
          correta: 1,
          dica: "Proatividade = agir no que você controla, mesmo que seja pequeno.",
        },
        {
          id: "p2",
          tipo: "reflexao",
          pergunta: "Círculo de influência: o que você controla hoje à tarde? (escreva 1 coisa)",
          dica: "Ex.: abrir um vídeo, tomar água, arrumar a mochila — não o humor dos outros.",
        },
        {
          id: "p3",
          tipo: "escolha",
          pergunta: "Qual frase é reativa?",
          opcoes: [
            "Vou tentar 10 min de estudo antes do jogo",
            "Sempre sou assim depois da escola, não adianta",
            "Posso escolher começar pequeno",
          ],
          correta: 1,
          dica: "Reativo = 'não tenho escolha'. Proativo = 'posso fazer um passo'.",
        },
      ],
    },
    {
      id: "fim-mente",
      nome: "Hábito 2 — Começar com o fim em mente",
      ideia: "Saber para onde quer ir antes de agir no automático.",
      perguntas: [
        {
          id: "f1",
          tipo: "reflexao",
          pergunta: "Daqui 1 ano, o que você quer ter melhorado? (1 frase)",
          dica: "Não precisa ser perfeito — direção já ajuda a escolher o que fazer hoje.",
        },
        {
          id: "f2",
          tipo: "escolha",
          pergunta: "Passar a tarde só no celular sem pensar. Isso está alinhado com seus objetivos?",
          opcoes: [
            "Sim, se foi escolha consciente e com limite",
            "Não importa, todo mundo faz",
            "Nunca penso nisso",
          ],
          correta: 0,
          dica: "O problema não é jogar — é jogar no piloto automático sem decidir antes.",
        },
        {
          id: "f3",
          tipo: "situacao",
          pergunta: "Antes de abrir o jogo hoje, qual pergunta ajuda mais?",
          opcoes: [
            "Quanto tempo vou jogar e o que faço depois?",
            "Por que a vida é assim?",
            "Não preciso pensar",
          ],
          correta: 0,
          dica: "Definir antes = fim em mente na prática.",
        },
      ],
    },
    {
      id: "importante",
      nome: "Hábito 3 — Primeiro o mais importante",
      ideia: "Urgente grita; importante constrói sua vida.",
      perguntas: [
        {
          id: "i1",
          tipo: "escolha",
          pergunta: "O que é IMPORTANTE (não só urgente) para você esta semana?",
          opcoes: ["Estudar um pouco", "Responder todo story", "Ficar em apps sem parar"],
          correta: 0,
          dica: "Importante = te aproxima do que você quer ser.",
        },
        {
          id: "i2",
          tipo: "reflexao",
          pergunta: "Qual é a 1 coisa mais importante de fazer amanhã de manhã?",
          dica: "Só uma. Se fizer só isso, o dia já valeu.",
        },
        {
          id: "i3",
          tipo: "escolha",
          pergunta: "Chegou notificação enquanto você ia estudar. Melhor atitude?",
          opcoes: [
            "Abrir na hora",
            "Estudar 10 min primeiro, depois ver",
            "Ignorar estudo e ficar no celular",
          ],
          correta: 1,
          dica: "Primeiro o importante — depois o urgente dos outros.",
        },
      ],
    },
    {
      id: "ganha-ganha",
      nome: "Hábito 4 — Pensar ganha-ganha",
      ideia: "Buscar soluções em que todos saem ganhando, não só você.",
      perguntas: [
        {
          id: "g1",
          tipo: "escolha",
          pergunta: "Grupo na escola: você quer nota máxima sozinho ou o grupo ir bem?",
          opcoes: [
            "Só minha nota importa",
            "Todos aprendem e a nota reflete isso",
            "Deixo os outros se virarem",
          ],
          correta: 1,
          dica: "Ganha-ganha = colaborar sem se anular.",
        },
        {
          id: "g2",
          tipo: "reflexao",
          pergunta: "Um conflito recente: como as duas partes poderiam ganhar um pouco?",
          dica: "Não precisa resolver — só treinar o pensamento.",
        },
      ],
    },
    {
      id: "compreender",
      nome: "Hábito 5 — Buscar compreender primeiro",
      ideia: "Ouvir de verdade antes de defender sua opinião.",
      perguntas: [
        {
          id: "c1",
          tipo: "escolha",
          pergunta: "Alguém reclama com você. O que fazer PRIMEIRO?",
          opcoes: [
            "Explicar por que ela está errada",
            "Repetir com suas palavras o que ela sente",
            "Ignorar",
          ],
          correta: 1,
          dica: "Compreender primeiro = a pessoa se sente ouvida; aí a conversa melhora.",
        },
        {
          id: "c2",
          tipo: "reflexao",
          pergunta: "Na última briga, o que a outra pessoa queria que você entendesse?",
          dica: "Empatia é habilidade — treina com reflexão.",
        },
      ],
    },
    {
      id: "sinergia",
      nome: "Hábito 6 — Criar sinergia",
      ideia: "Juntos podem criar algo melhor do que cada um sozinho.",
      perguntas: [
        {
          id: "s1",
          tipo: "escolha",
          pergunta: "Trabalho em equipe: qual atitude gera sinergia?",
          opcoes: [
            "Impor sua ideia",
            "Combinar o melhor de cada um",
            "Não participar",
          ],
          correta: 1,
          dica: "Sinergia = 1 + 1 pode ser 3.",
        },
        {
          id: "s2",
          tipo: "reflexao",
          pergunta: "Com quem você trabalha bem? O que essa pessoa traz que você não tem?",
          dica: "Perceber diferenças como força, não ameaça.",
        },
      ],
    },
    {
      id: "afiar",
      nome: "Hábito 7 — Afiar a serra",
      ideia: "Cuidar de corpo, mente, coração e espírito para não quebrar.",
      perguntas: [
        {
          id: "a1",
          tipo: "escolha",
          pergunta: "O que é 'afiar a serra' na sua vida agora?",
          opcoes: [
            "Dormir mal e estudar 5h",
            "Água, sono, movimento e pausa",
            "Só trabalhar mais",
          ],
          correta: 1,
          dica: "Sem energia não há produtividade sustentável.",
        },
        {
          id: "a2",
          tipo: "reflexao",
          pergunta: "O que você vai fazer HOJE para recarregar? (sono, água, academia, silêncio…)",
          dica: "Renovar não é perda de tempo — é o que permite continuar.",
        },
        {
          id: "a3",
          tipo: "escolha",
          pergunta: "Você está no limite. O que é mais inteligente?",
          opcoes: [
            "Empurrar até colapsar",
            "Parar 15 min e voltar com um passo só",
            "Desistir de tudo por uma semana",
          ],
          correta: 1,
          dica: "Afiar = pausa estratégica, não fuga.",
        },
      ],
    },
  ],
};

export const LIVROS_DISPONIVEIS = [LIVRO_COVEY];

const CHAVE_PROGRESSO = "livro-pratica-progresso";

export function carregarProgressoLivro() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || "null");
    if (!dados || typeof dados !== "object") return progressoInicial();
    return {
      ...progressoInicial(),
      ...dados,
      respondidas: dados.respondidas && typeof dados.respondidas === "object" ? dados.respondidas : {},
    };
  } catch {
    return progressoInicial();
  }
}

function progressoInicial() {
  return {
    livroId: LIVRO_COVEY.id,
    moduloIndex: 0,
    perguntasHoje: 0,
    ultimoDia: "",
    respondidas: {},
    streak: 0,
  };
}

export function salvarProgressoLivro(progresso) {
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
}

export function livroAtivo(livroId = LIVRO_COVEY.id) {
  return LIVROS_DISPONIVEIS.find((l) => l.id === livroId) || LIVRO_COVEY;
}

export function moduloAtual(livro, progresso) {
  const idx = Math.min(progresso.moduloIndex, livro.modulos.length - 1);
  return livro.modulos[idx];
}

export function perguntaAtual(livro, progresso) {
  const mod = moduloAtual(livro, progresso);
  const chaveMod = `${livro.id}:${mod.id}`;
  const feitas = progresso.respondidas[chaveMod] || [];
  const proxima = mod.perguntas.find((p) => !feitas.includes(p.id));
  return proxima || null;
}

export function registrarResposta(progresso, livro, perguntaId, chaveDia) {
  const mod = moduloAtual(livro, progresso);
  const chaveMod = `${livro.id}:${mod.id}`;
  const feitas = [...(progresso.respondidas[chaveMod] || [])];
  if (!feitas.includes(perguntaId)) feitas.push(perguntaId);

  const novo = {
    ...progresso,
    respondidas: { ...progresso.respondidas, [chaveMod]: feitas },
    perguntasHoje: progresso.ultimoDia === chaveDia ? progresso.perguntasHoje + 1 : 1,
    ultimoDia: chaveDia,
  };

  const todasFeitas = mod.perguntas.every((p) => feitas.includes(p.id));
  if (todasFeitas && novo.moduloIndex < livro.modulos.length - 1) {
    novo.moduloIndex += 1;
  }

  if (novo.ultimoDia !== progresso.ultimoDia && progresso.ultimoDia) {
    novo.streak = progresso.perguntasHoje > 0 ? (progresso.streak || 0) + 1 : progresso.streak || 0;
  }

  salvarProgressoLivro(novo);
  return novo;
}

export const META_PERGUNTAS_DIA = 3;

export function metaDiariaAtingida(progresso, chaveDia) {
  if (progresso.ultimoDia !== chaveDia) return false;
  return progresso.perguntasHoje >= META_PERGUNTAS_DIA;
}

export function progressoGeral(livro, progresso) {
  let total = 0;
  let feitas = 0;
  livro.modulos.forEach((mod) => {
    const chave = `${livro.id}:${mod.id}`;
    const lista = progresso.respondidas[chave] || [];
    total += mod.perguntas.length;
    feitas += lista.length;
  });
  return { total, feitas, pct: total ? Math.round((feitas / total) * 100) : 0 };
}
