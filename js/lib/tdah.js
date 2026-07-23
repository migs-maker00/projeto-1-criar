// Ferramentas para TDAH — prioridades, inbox e sugestão do momento

export const MAX_PRIORIDADES = 3;
export const MAX_INBOX = 40;

export function carregarInbox() {
  try {
    const lista = JSON.parse(localStorage.getItem("inbox-captura") || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function salvarInbox(lista) {
  localStorage.setItem("inbox-captura", JSON.stringify(lista.slice(0, MAX_INBOX)));
}

export function adicionarInbox(texto) {
  const limpo = (texto || "").trim().slice(0, 200);
  if (!limpo) return null;

  const item = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    texto: limpo,
    criadoEm: new Date().toISOString(),
  };

  const lista = [item, ...carregarInbox()].slice(0, MAX_INBOX);
  salvarInbox(lista);
  return item;
}

export function removerInbox(id) {
  const lista = carregarInbox().filter((item) => item.id !== id);
  salvarInbox(lista);
  return lista;
}

export function carregarPrioridades() {
  try {
    const dados = JSON.parse(localStorage.getItem("prioridades-dia") || "{}");
    return dados && typeof dados === "object" ? dados : {};
  } catch {
    return {};
  }
}

export function salvarPrioridades(mapa) {
  localStorage.setItem("prioridades-dia", JSON.stringify(mapa));
}

export function prioridadesDoDia(chave, mapa = carregarPrioridades()) {
  const lista = mapa[chave];
  if (!Array.isArray(lista)) return [];
  return lista.filter((id) => Number.isFinite(Number(id))).slice(0, MAX_PRIORIDADES);
}

export function ehPrioridadeHoje(chave, habitoId, mapa = carregarPrioridades()) {
  return prioridadesDoDia(chave, mapa).includes(habitoId);
}

export function alternarPrioridade(chave, habitoId, mapa = carregarPrioridades()) {
  const atual = [...prioridadesDoDia(chave, mapa)];
  const indice = atual.indexOf(habitoId);

  if (indice >= 0) {
    atual.splice(indice, 1);
    salvarPrioridades({ ...mapa, [chave]: atual });
    return { ok: true, ids: atual, mensagem: "Removido do foco de hoje." };
  }

  if (atual.length >= MAX_PRIORIDADES) {
    return {
      ok: false,
      ids: atual,
      mensagem: `Só ${MAX_PRIORIDADES} prioridades por dia — desmarque uma estrela primeiro.`,
    };
  }

  atual.push(habitoId);
  salvarPrioridades({ ...mapa, [chave]: atual });
  return { ok: true, ids: atual, mensagem: "Marcado como prioridade de hoje." };
}

export function sugestaoAgora(habitos, chave, { estaPendente, ordenarPorHorario, prioridades }) {
  const pendentes = habitos.filter((h) => estaPendente(h));
  if (!pendentes.length) return null;

  for (const id of prioridades) {
    const habito = pendentes.find((h) => h.id === id);
    if (habito) return { habito, motivo: "Sua prioridade de hoje" };
  }

  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const comHorario = ordenarPorHorario(pendentes.filter((h) => h.horario));

  for (const habito of comHorario) {
    const [hh, mm] = habito.horario.split(":").map(Number);
    if (hh * 60 + mm >= minutosAgora) {
      return { habito, motivo: `Próximo horário (${habito.horario})` };
    }
  }

  if (comHorario[0]) {
    return { habito: comHorario[0], motivo: "Próximo da lista por horário" };
  }

  return { habito: pendentes[0], motivo: "Um passo de cada vez" };
}

export function ordenarComPrioridades(lista, chave, mapa = carregarPrioridades()) {
  const prio = prioridadesDoDia(chave, mapa);
  const emFoco = [];
  const resto = [];

  prio.forEach((id) => {
    const habito = lista.find((h) => h.id === id);
    if (habito) emFoco.push(habito);
  });

  lista.forEach((habito) => {
    if (!prio.includes(habito.id)) resto.push(habito);
  });

  return [...emFoco, ...resto];
}
