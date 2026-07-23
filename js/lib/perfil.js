// Perfil personalizado — rotina e prioridades de vida

export const PERFIL_PADRAO = {
  acordar: "05:45",
  dormir: "23:30",
  escolaDias: [1, 2, 3, 4, 5],
  escolaInicio: "07:00",
  escolaFim: "16:00",
  chegadaCasa: "17:00",
  tardeDificilInicio: "17:00",
  tardeDificilFim: "20:00",
  trabalhoPraiaFimSemana: true,
  prioridadesVida: [
    "Adquirir mais conhecimento",
    "Ser mais organizado",
    "Construir uma boa rotina",
  ],
};

export function carregarPerfil() {
  try {
    const dados = JSON.parse(localStorage.getItem("perfil-usuario") || "null");
    return dados && typeof dados === "object" ? { ...PERFIL_PADRAO, ...dados } : { ...PERFIL_PADRAO };
  } catch {
    return { ...PERFIL_PADRAO };
  }
}

export function salvarPerfil(perfil) {
  localStorage.setItem("perfil-usuario", JSON.stringify(perfil));
}

export function perfilInicializado() {
  return localStorage.getItem("perfil-inicializado") === "1";
}

export function marcarPerfilInicializado() {
  localStorage.setItem("perfil-inicializado", "1");
}

export function habitosSugeridosPerfil() {
  return [
    {
      nome: "Estudar 15 min",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: "19:00",
      importancia: 1,
      diasAtivos: [1, 2, 3, 4, 5],
      microPassos: ["Abrir o material", "Focar 10 minutos", "Fechar com 1 anotação"],
      planoB: "Só abrir o material e ler 1 página.",
      preparar: ["Mesa limpa", "Água por perto", "Celular longe"],
      contextoLembrete: "Chegou da escola — só 10 min já conta.",
    },
    {
      nome: "Academia",
      categoria: "Saúde",
      metaSemanal: 3,
      horario: "20:00",
      importancia: 2,
      diasAtivos: [1, 2, 3, 4, 5],
      planoB: "Só se vestir e ir — 15 min na esteira já vale.",
      contextoLembrete: "Sem pressão — só aparecer.",
    },
    {
      nome: "Dormir no horário",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "23:00",
      importancia: 1,
      planoB: "Desligar telas e deitar — sem precisar dormir já.",
      contextoLembrete: "Hora de começar a desacelerar.",
    },
    {
      nome: "Beber água",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "06:30",
      importancia: 1,
      lembretes: 6,
    },
  ];
}

export function hhmmParaMinutos(hhmm) {
  const [hh, mm] = (hhmm || "00:00").split(":").map(Number);
  return hh * 60 + mm;
}

export function minutosAgora(data = new Date()) {
  return data.getHours() * 60 + data.getMinutes();
}

export function ehDiaEscola(perfil, data = new Date()) {
  return (perfil.escolaDias || [1, 2, 3, 4, 5]).includes(data.getDay());
}
