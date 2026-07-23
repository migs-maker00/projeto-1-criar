// Planejador de rotina local — sem API externa

const CATEGORIAS_VALIDAS = ["Geral", "Saúde", "Estudo", "Trabalho", "Lazer"];

function salvarPerfilRotina(perfil) {
  localStorage.setItem("rotina-perfil-ia", JSON.stringify(perfil));
}

function carregarPerfilRotina() {
  try {
    return JSON.parse(localStorage.getItem("rotina-perfil-ia") || "{}");
  } catch {
    return {};
  }
}

function validarHabito(item) {
  if (!item || typeof item.nome !== "string") return null;
  const nome = item.nome.trim().slice(0, 60);
  if (!nome) return null;

  const categoria = CATEGORIAS_VALIDAS.includes(item.categoria)
    ? item.categoria
    : "Geral";

  let metaSemanal = Number(item.metaSemanal);
  if (!Number.isFinite(metaSemanal) || metaSemanal < 1) metaSemanal = 7;
  if (metaSemanal > 7) metaSemanal = 7;

  let horario = "";
  if (typeof item.horario === "string" && /^\d{2}:\d{2}$/.test(item.horario)) {
    horario = item.horario;
  }

  const motivo =
    typeof item.motivo === "string" ? item.motivo.trim().slice(0, 120) : "";

  let lembretes;
  const n = Number(item.lembretes);
  if (Number.isFinite(n) && n > 1) lembretes = Math.round(n);

  const habito = { nome, categoria, metaSemanal, horario, motivo };
  if (lembretes) habito.lembretes = lembretes;

  let importancia = Number(item.importancia);
  if (importancia === 1 || importancia === 2) habito.importancia = importancia;

  if (Array.isArray(item.microPassos) && item.microPassos.length) {
    habito.microPassos = item.microPassos
      .filter((p) => typeof p === "string" && p.trim())
      .map((p) => p.trim().slice(0, 80))
      .slice(0, 8);
  }

  if (Array.isArray(item.horariosLembretes) && item.horariosLembretes.length) {
    habito.horariosLembretes = item.horariosLembretes
      .filter((h) => typeof h === "string" && /^\d{2}:\d{2}$/.test(h))
      .slice(0, 12);
  }

  return habito;
}

function horaParaMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function extrairBlocosOcupados(texto) {
  const blocos = [];
  const regex = /(\d{1,2})[:h](\d{2})?\s*[-–àa]\s*(\d{1,2})[:h](\d{2})?/gi;
  let match;
  while ((match = regex.exec(texto)) !== null) {
    const ini = `${match[1].padStart(2, "0")}:${(match[2] || "00").padStart(2, "0")}`;
    const fim = `${match[3].padStart(2, "0")}:${(match[4] || "00").padStart(2, "0")}`;
    blocos.push({ ini: horaParaMinutos(ini), fim: horaParaMinutos(fim) });
  }
  return blocos;
}

function horarioLivre(candidato, blocos) {
  const t = horaParaMinutos(candidato);
  return !blocos.some((b) => t >= b.ini && t < b.fim);
}

function escolherHorariosLivres(candidatos, blocos, max = 6) {
  return candidatos.filter((h) => horarioLivre(h, blocos)).slice(0, max);
}

function gerarRotinaLocal(dados) {
  const texto = `${dados.perfil || ""} ${dados.horarios || ""} ${dados.objetivos || ""}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const blocos = extrairBlocosOcupados(dados.horarios || "");
  const habitos = [];
  const nomesGerados = new Set();

  function ajustarHorario(horario, candidatos = []) {
    if (!horario) return "";
    if (horarioLivre(horario, blocos)) return horario;
    const lista = [horario, ...candidatos];
    return escolherHorariosLivres(lista, blocos, 1)[0] || "";
  }

  function add(h) {
    const v = validarHabito(h);
    if (!v || nomesGerados.has(v.nome.toLowerCase())) return;

    if (v.horario) {
      v.horario = ajustarHorario(v.horario, [
        "06:30", "07:00", "09:30", "12:00", "15:30", "17:00", "18:00", "20:00", "21:00", "22:00",
      ]);
    }

    habitos.push(v);
    nomesGerados.add(v.nome.toLowerCase());
  }

  if (/agua|litro|hidrata/.test(texto)) {
    const slots = escolherHorariosLivres(
      ["06:30", "09:30", "12:00", "15:30", "18:00", "21:00"],
      blocos,
      6
    );
    const horarios = slots.length ? slots : ["06:30", "09:30", "12:00", "15:30", "18:00", "21:00"];
    add({
      nome: "Beber água",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: horarios[0],
      lembretes: horarios.length,
      importancia: 1,
      horariosLembretes: horarios,
      motivo: `${horarios.length} lembretes: ${horarios.join(", ")}`,
    });
  }

  if (/academia|musculacao|musculação|treino|jiu|judo|luta|crossfit/.test(texto)) {
    const slot =
      escolherHorariosLivres(["18:00", "17:30", "19:00", "07:00", "20:30"], blocos, 1)[0] ||
      "18:00";
    const nomeTreino = /jiu|judo|luta/.test(texto) ? "Treino de luta" : "Academia";
    const meta = /2x|duas vezes|2 vezes/.test(texto) ? 2 : /4x|quatro/.test(texto) ? 4 : 3;
    add({
      nome: nomeTreino,
      categoria: "Saúde",
      metaSemanal: meta,
      horario: slot,
      importancia: 2,
      motivo: "Fora dos horários ocupados que você descreveu",
    });
  }

  if (/ler|leitura|livro/.test(texto)) {
    const slot =
      escolherHorariosLivres(["16:30", "20:00", "21:30", "06:45"], blocos, 1)[0] ||
      "20:00";
    add({
      nome: "Ler 20 minutos",
      categoria: "Estudo",
      metaSemanal: 7,
      horario: slot,
      motivo: "Janela tranquila fora dos compromissos fixos",
    });
  }

  if (/medita|silencio|mindful/.test(texto)) {
    const slot =
      escolherHorariosLivres(["06:15", "22:45", "16:45", "12:30"], blocos, 1)[0] ||
      "06:15";
    add({
      nome: "Meditação e silêncio (10 min)",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: slot,
      motivo: "Momento de pausa antes ou depois da rotina corrida",
    });
  }

  if (/dormir|sono/.test(texto)) {
    add({
      nome: "Preparar para dormir",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "22:30",
      motivo: "Rotina de desaceleração no fim do dia",
    });
  }

  if (/estud|prova|facul|escola/.test(texto)) {
    const slot =
      escolherHorariosLivres(["17:00", "16:30", "19:00", "07:00"], blocos, 1)[0] ||
      "17:00";
    add({
      nome: "Sessão de estudo focado (30 min)",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: slot,
      importancia: 1,
      microPassos: ["Abrir o material", "Focar 25 minutos", "Revisar anotações"],
      motivo: "Bloco de foco fora do horário de aula",
    });
  }

  if (habitos.length === 0) {
    add({
      nome: "Caminhada leve (15 min)",
      categoria: "Saúde",
      metaSemanal: 5,
      horario: escolherHorariosLivres(["07:00", "17:30", "18:30"], blocos, 1)[0] || "07:00",
      motivo: "Comece com um hábito simples de movimento",
    });
    add({
      nome: "Revisar o dia no diário",
      categoria: "Geral",
      metaSemanal: 7,
      horario: escolherHorariosLivres(["22:00", "21:30"], blocos, 1)[0] || "22:00",
      motivo: "Fechamento consciente do dia",
    });
  }

  return {
    mensagem:
      habitos.length > 0
        ? "Montei uma rotina básica com base no que você escreveu. Revise os horários e adicione o que fizer sentido."
        : "Descreva escola, treinos e o que quer melhorar — quanto mais detalhe, melhor a rotina.",
    habitos: habitos.slice(0, 8),
  };
}

async function gerarRotina(dados) {
  return gerarRotinaLocal(dados);
}

export { carregarPerfilRotina, gerarRotina, salvarPerfilRotina };
