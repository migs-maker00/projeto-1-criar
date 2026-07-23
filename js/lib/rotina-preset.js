import {
  CONTEXTO_APRENDER,
  MICRO_APRENDER,
  MICRO_VOCABULARIO,
  PLANO_B_APRENDER,
  PLANO_B_VOCABULARIO,
} from "./aprender.js";

export const CHAVE_ROTINA_MONTADA = "rotina-montada-v1.8.3";

export const HORARIOS_AGUA_ROTINA = [
  "06:15", "09:30", "12:00", "15:30", "18:00", "21:00",
];

export function rotinaJaMontada() {
  return localStorage.getItem(CHAVE_ROTINA_MONTADA) === "1";
}

export function marcarRotinaMontada() {
  localStorage.setItem(CHAVE_ROTINA_MONTADA, "1");
}

export function textosPlanejadorRotina() {
  return {
    perfil:
      "Tenho 16 anos. Acordo às 5:45. Minhas prioridades agora são: adquirir mais conhecimento, ser mais organizado e construir uma boa rotina. Tenho TDAH — esqueço, demoro a começar, perco a noção do tempo e fico com muita coisa na cabeça.",
    horarios:
      "Segunda a sexta: escola 07:00–16:00, chego em casa por volta das 17h (às 18h quando corto o cabelo). Tarde difícil das 17h às 20h — costumo jogar. Trabalho na praia sábado e domingo quando faz sol, saio ~9:30 e volto 18h–19h. Durmo entre 23h e meia-noite.",
    objetivos:
      "Aprender com vídeo/áudio (15 min), vocabulário falado, rotina de sono, organização ao chegar, academia e água.",
  };
}

/** @returns {Array<object>} modelos de hábito com campo `presetId` para merge */
export function habitosRotinaCompleta() {
  return [
    {
      presetId: "agua",
      nome: "Beber água",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "06:15",
      importancia: 1,
      lembretes: 6,
      horariosLembretes: HORARIOS_AGUA_ROTINA,
      contextoLembrete: "Um copo agora — hidratação ajuda a focar.",
    },
    {
      presetId: "organizar",
      nome: "Organizar ao chegar (10 min)",
      categoria: "Geral",
      metaSemanal: 5,
      horario: "17:30",
      importancia: 1,
      diasAtivos: [1, 2, 3, 4, 5],
      microPassos: [
        "Tirar mochila e material",
        "Separar o que precisa amanhã",
        "Mesa limpa para aprender",
      ],
      planoB: "Só tirar a mochila e pegar 1 coisa pra amanhã.",
      preparar: ["Mochila perto da porta", "Lista do que falta"],
      contextoLembrete: "Chegou da escola — 10 min antes de relaxar/jogar.",
    },
    {
      presetId: "aprender",
      nome: "Aprender 15 min",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: "19:00",
      importancia: 1,
      diasAtivos: [1, 2, 3, 4, 5],
      microPassos: [...MICRO_APRENDER],
      planoB: PLANO_B_APRENDER,
      preparar: ["Fone ou alto-falante", "Água por perto", "Celular longe"],
      contextoLembrete: CONTEXTO_APRENDER,
    },
    {
      presetId: "vocabulario",
      nome: "Vocabulário 5 min",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: "19:20",
      importancia: 2,
      diasAtivos: [1, 2, 3, 4, 5],
      microPassos: [...MICRO_VOCABULARIO],
      planoB: PLANO_B_VOCABULARIO,
      contextoLembrete: "Falar em voz alta fixa mais que ler.",
    },
    {
      presetId: "academia",
      nome: "Academia",
      categoria: "Saúde",
      metaSemanal: 3,
      horario: "20:30",
      importancia: 2,
      diasAtivos: [1, 3, 5],
      microPassos: ["Vestir roupa", "Ir até a academia", "15 min de movimento"],
      planoB: "Só se vestir e ir — 15 min na esteira já vale.",
      contextoLembrete: "Sem pressão — só aparecer.",
    },
    {
      presetId: "telas",
      nome: "Desligar telas",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "22:30",
      importancia: 2,
      planoB: "Celular em outro cômodo por 5 min.",
      contextoLembrete: "Hora de desacelerar para dormir bem.",
    },
    {
      presetId: "sono",
      nome: "Dormir no horário",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "23:30",
      importancia: 1,
      planoB: "Deitar e fechar os olhos — sem pressão para dormir já.",
      contextoLembrete: "Rotina de sono — meta é deitar até meia-noite.",
    },
    {
      presetId: "manha",
      nome: "Planejar o dia (2 min)",
      categoria: "Geral",
      metaSemanal: 5,
      horario: "06:00",
      importancia: 2,
      diasAtivos: [1, 2, 3, 4, 5],
      microPassos: ["Abrir a agenda", "Escrever 3 focos do dia", "Fechar"],
      planoB: "Só abrir a agenda e ver o que tem hoje.",
      contextoLembrete: "2 minutos — o que importa hoje?",
    },
    {
      presetId: "praia",
      nome: "Preparar trabalho na praia",
      categoria: "Trabalho",
      metaSemanal: 2,
      horario: "09:15",
      importancia: 2,
      diasAtivos: [0, 6],
      microPassos: ["Ver o tempo", "Separar roupa e protetor", "Sair no horário"],
      planoB: "Só ver o tempo e separar a bolsa.",
      contextoLembrete: "Fim de semana — preparar com calma.",
    },
  ];
}

export const PRIORIDADES_PRESET = ["organizar", "aprender", "agua"];

export function correspondePreset(habito, presetId) {
  if (presetId === "agua") return /agua|água|hidrata/i.test(habito.nome || "");
  const padroes = {
    organizar: /organiz/i,
    aprender: /aprend|estud/i,
    vocabulario: /vocabul/i,
    estudo: /aprend|estud|vocabul/i,
    academia: /academia|treino/i,
    telas: /tela|desligar/i,
    sono: /dormir|sono/i,
    manha: /planejar|planej/i,
    praia: /praia|trabalho/i,
  };
  const re = padroes[presetId];
  return re ? re.test(habito.nome || "") : false;
}
