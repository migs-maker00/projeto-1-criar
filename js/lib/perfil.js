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
  return habitosRotinaCompleta();
}

export { habitosRotinaCompleta, textosPlanejadorRotina } from "./rotina-preset.js";

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
