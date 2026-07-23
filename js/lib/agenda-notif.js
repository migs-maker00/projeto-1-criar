// Agenda de notificações — service worker + alertas de transição

import { carregarPerfil, ehDiaEscola } from "./perfil.js";
import { lembretesAtivos } from "./lembretes.js";

function somarMinutos(hhmm, delta) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const total = ((hh * 60 + mm + delta) % (24 * 60) + 24 * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function hhmmParaTimestamp(hhmm, base = new Date()) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const d = new Date(base);
  d.setHours(hh, mm, 0, 0);
  return d.getTime();
}

function carregarIgnorados() {
  try {
    return JSON.parse(localStorage.getItem("lembretes-ignorados") || "{}");
  } catch {
    return {};
  }
}

function textoLembrete(habito, tipo, ignorados) {
  const ctx = habito.contextoLembrete || "Hora de fazer isso — um passo só.";
  const vezes = ignorados[habito.id] || 0;

  if (tipo === "reforco" && vezes >= 2) {
    return `Última chance hoje — só 2 min: ${ctx}`;
  }
  if (tipo === "reforco") return `Ainda dá tempo — ${ctx}`;
  if (tipo === "transicao") return `Em 10 min: ${habito.nome}`;
  return ctx;
}

export function montarAgendaNotificacoes(
  habitos,
  chave,
  { estaPendente, horariosDoHabito, prioridades = [], prioridadesVida = [] }
) {
  const agenda = [];
  const ignorados = carregarIgnorados();
  const perfil = carregarPerfil();
  const hoje = new Date();
  const baseUrl = location.origin + location.pathname;

  habitos.forEach((habito) => {
    if (!estaPendente(habito)) return;

    const horarios = horariosDoHabito(habito);
    horarios.forEach((hora) => {
      [
        { hhmm: hora, tipo: "normal", sufixo: "" },
        { hhmm: somarMinutos(hora, 15), tipo: "reforco", sufixo: "-reforco" },
        { hhmm: somarMinutos(hora, -10), tipo: "transicao", sufixo: "-transicao" },
      ].forEach(({ hhmm, tipo, sufixo }) => {
        agenda.push({
          tag: `${chave}-${habito.id}-${hora}${sufixo}`,
          title: tipo === "transicao" ? "⏰ Em 10 minutos" : habito.nome,
          body: textoLembrete(habito, tipo, ignorados),
          timestamp: hhmmParaTimestamp(hhmm, hoje),
          url: baseUrl,
          habitoId: habito.id,
          importante: tipo === "reforco" && (ignorados[habito.id] || 0) >= 2,
        });
      });
    });
  });

  if (ehDiaEscola(perfil, hoje)) {
    agenda.push({
      tag: `${chave}-manha-resumo`,
      title: "Bom dia — seu dia",
      body: montarResumoManha(prioridades, habitos, prioridadesVida),
      timestamp: hhmmParaTimestamp("05:50", hoje),
      url: baseUrl,
      importante: true,
    });

    agenda.push({
      tag: `${chave}-tarde-escola`,
      title: "Chegou da escola?",
      body: "Só 2 min de estudo ou abrir o material já conta. O jogo pode esperar.",
      timestamp: hhmmParaTimestamp("17:15", hoje),
      url: baseUrl,
      importante: true,
    });
  }

  agenda.push({
    tag: `${chave}-sono`,
    title: "Hora de desacelerar",
    body: "Rotina de sono — desligar telas e preparar para dormir.",
    timestamp: hhmmParaTimestamp(perfil.dormir || "23:30", hoje),
    url: baseUrl,
  });

  return agenda.filter((item) => item.timestamp > Date.now());
}

export function montarResumoManha(prioridades, habitos, prioridadesVida) {
  const nomes = prioridades
    .map((id) => habitos.find((h) => h.id === id)?.nome)
    .filter(Boolean)
    .slice(0, 3);

  if (nomes.length) return `Foco hoje: ${nomes.join(" · ")}`;
  if (prioridadesVida.length) {
    return `Lembrete: ${prioridadesVida.slice(0, 3).join(" · ")}`;
  }
  return "Abra a agenda e marque até 3 prioridades com ☆.";
}

export async function sincronizarAgendaSW(
  habitos,
  chave,
  helpers
) {
  if (!lembretesAtivos() || !("serviceWorker" in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.active) return;

    const agenda = montarAgendaNotificacoes(habitos, chave, helpers);
    reg.active.postMessage({ type: "AGENDAR", agenda });
  } catch {
    /* silencioso */
  }
}

export function registrarIgnorado(habitoId) {
  const mapa = carregarIgnorados();
  mapa[habitoId] = (mapa[habitoId] || 0) + 1;
  localStorage.setItem("lembretes-ignorados", JSON.stringify(mapa));
}

export function limparIgnoradosDia() {
  localStorage.removeItem("lembretes-ignorados");
}
