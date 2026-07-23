// Tarde difícil — após escola (17h–20h)

import { carregarPerfil, ehDiaEscola, hhmmParaMinutos, minutosAgora } from "./perfil.js";
import { detectarHabitoAprender } from "./aprender.js";

export function ehHorarioDificil(perfil = carregarPerfil(), data = new Date()) {
  if (!ehDiaEscola(perfil, data)) return false;
  const agora = minutosAgora(data);
  const inicio = hhmmParaMinutos(perfil.tardeDificilInicio || "17:00");
  const fim = hhmmParaMinutos(perfil.tardeDificilFim || "20:00");
  return agora >= inicio && agora < fim;
}

export function mensagemTarde() {
  return "Tarde difícil? Normal depois da escola. Só 2 min de vídeo/áudio ou falar 1 coisa em voz alta já vale.";
}

export function sugestaoTarde(habitos, { estaPendente, detectarEstudo }) {
  const detectar = detectarEstudo || detectarHabitoAprender;
  const pendentes = habitos.filter((h) => estaPendente(h));
  const aprender = pendentes.find((h) => detectar(h));
  if (aprender) return { habito: aprender, motivo: "Tarde difícil — comece pelo aprendizado (versão mínima)" };

  const essencial = pendentes.find((h) => Number(h.importancia) === 1);
  if (essencial) return { habito: essencial, motivo: "Um passo essencial antes do jogo" };

  return pendentes[0] ? { habito: pendentes[0], motivo: "Só um passo antes de relaxar" } : null;
}

export { detectarHabitoAprender as detectarHabitoEstudo };
