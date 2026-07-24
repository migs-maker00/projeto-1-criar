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

export function carregarInboxArquivo() {
  try {
    const lista = JSON.parse(localStorage.getItem("inbox-arquivo") || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function arquivarInboxCompleta() {
  const atual = carregarInbox();
  if (!atual.length) {
    return { ok: false, mensagem: "Inbox já está vazia." };
  }

  const arquivo = [
    ...atual.map((item) => ({
      ...item,
      arquivadoEm: new Date().toISOString(),
    })),
    ...carregarInboxArquivo(),
  ].slice(0, 200);

  localStorage.setItem("inbox-arquivo", JSON.stringify(arquivo));
  salvarInbox([]);
  return {
    ok: true,
    mensagem: `${atual.length} ${atual.length === 1 ? "item guardado" : "itens guardados"}. Cabeça mais leve.`,
  };
}

export function modoCabecaLeve() {
  return localStorage.getItem("modo-cabeca-leve") === "1";
}

export function definirModoCabecaLeve(ativo) {
  localStorage.setItem("modo-cabeca-leve", ativo ? "1" : "0");
}

export function filtrarModoLeve(habitos, chave, mapa = carregarPrioridades()) {
  const prio = prioridadesDoDia(chave, mapa);
  return habitos.filter(
    (h) => prio.includes(h.id) || normalizarImportancia(h.importancia) === 1
  );
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
  return lista
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id))
    .slice(0, MAX_PRIORIDADES);
}

export function ehPrioridadeHoje(chave, habitoId, mapa = carregarPrioridades()) {
  const id = Number(habitoId);
  return prioridadesDoDia(chave, mapa).includes(id);
}

export function alternarPrioridade(chave, habitoId, mapa = carregarPrioridades()) {
  const id = Number(habitoId);
  if (!Number.isFinite(id)) {
    return { ok: false, ids: prioridadesDoDia(chave, mapa), mensagem: "Hábito inválido." };
  }

  const atual = [...prioridadesDoDia(chave, mapa)];
  const indice = atual.indexOf(id);

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

  atual.push(id);
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

  const porImportancia = [...pendentes].sort((a, b) => {
    const ia = normalizarImportancia(a.importancia);
    const ib = normalizarImportancia(b.importancia);
    if (ia !== ib) return ia - ib;
    return 0;
  });

  const essencial = porImportancia.find((h) => normalizarImportancia(h.importancia) === 1);
  if (essencial) {
    return { habito: essencial, motivo: "Hábito essencial — maior impacto" };
  }

  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  const comHorario = ordenarPorHorario(
    porImportancia.filter((h) => h.horario)
  );

  for (const habito of comHorario) {
    const [hh, mm] = habito.horario.split(":").map(Number);
    if (hh * 60 + mm >= minutosAgora) {
      return { habito, motivo: `Próximo horário (${habito.horario})` };
    }
  }

  if (comHorario[0]) {
    return { habito: comHorario[0], motivo: "Próximo da lista por horário" };
  }

  return { habito: porImportancia[0], motivo: "Um passo de cada vez" };
}

function normalizarImportancia(valor) {
  const n = Number(valor);
  if (n === 1 || n === 2) return n;
  return 3;
}

function compararImportancia(a, b) {
  const diff = normalizarImportancia(a.importancia) - normalizarImportancia(b.importancia);
  if (diff !== 0) return diff;
  return 0;
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

  resto.sort(compararImportancia);
  return [...emFoco, ...resto];
}

export function carregarRevisaoNoturna() {
  try {
    return JSON.parse(localStorage.getItem("revisao-noturna") || "{}");
  } catch {
    return {};
  }
}

export function salvarRevisaoNoturna(mapa) {
  localStorage.setItem("revisao-noturna", JSON.stringify(mapa));
}

export function revisaoDoDia(chave, mapa = carregarRevisaoNoturna()) {
  const dados = mapa[chave];
  if (!dados || typeof dados !== "object") {
    return { feito: "", ficou: "", amanha: "" };
  }
  return {
    feito: dados.feito || "",
    ficou: dados.ficou || "",
    amanha: dados.amanha || "",
  };
}

export function definirRevisaoCampo(chave, campo, valor, mapa = carregarRevisaoNoturna()) {
  const atual = revisaoDoDia(chave, mapa);
  atual[campo] = valor;
  salvarRevisaoNoturna({ ...mapa, [chave]: atual });
}

export function carregarRevisaoManha() {
  try {
    return JSON.parse(localStorage.getItem("revisao-manha") || "{}");
  } catch {
    return {};
  }
}

export function salvarRevisaoManha(mapa) {
  localStorage.setItem("revisao-manha", JSON.stringify(mapa));
}

export function revisaoManhaDoDia(chave, mapa = carregarRevisaoManha()) {
  const dados = mapa[chave];
  if (!dados || typeof dados !== "object") {
    return { foco1: "", foco2: "", foco3: "" };
  }
  return {
    foco1: dados.foco1 || "",
    foco2: dados.foco2 || "",
    foco3: dados.foco3 || "",
  };
}

export function definirRevisaoManhaCampo(chave, campo, valor, mapa = carregarRevisaoManha()) {
  const atual = revisaoManhaDoDia(chave, mapa);
  atual[campo] = valor;
  salvarRevisaoManha({ ...mapa, [chave]: atual });
}

export function carregarInboxDepois() {
  try {
    const lista = JSON.parse(localStorage.getItem("inbox-depois") || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function salvarInboxDepois(lista) {
  localStorage.setItem("inbox-depois", JSON.stringify(lista.slice(0, 80)));
}

export function moverInboxParaDepois(id) {
  const item = carregarInbox().find((i) => i.id === id);
  if (!item) return null;
  removerInbox(id);
  const depois = [{ ...item, movidoEm: new Date().toISOString() }, ...carregarInboxDepois()].slice(0, 80);
  salvarInboxDepois(depois);
  return item;
}

export function limiteDiarioAtivo() {
  return localStorage.getItem("limite-diario-5") === "1";
}

export function definirLimiteDiario(ativo) {
  localStorage.setItem("limite-diario-5", ativo ? "1" : "0");
}

export const LIMITE_DIARIO = 5;

export function aplicarLimiteDiario(lista, chave, mapa = carregarPrioridades()) {
  if (!limiteDiarioAtivo()) return lista;
  const prio = prioridadesDoDia(chave, mapa);
  const emFoco = [];
  const resto = [];

  prio.forEach((id) => {
    const h = lista.find((item) => item.id === id);
    if (h) emFoco.push(h);
  });
  lista.forEach((h) => {
    if (!prio.includes(h.id)) resto.push(h);
  });

  const combinado = [...emFoco, ...resto];
  return combinado.slice(0, LIMITE_DIARIO);
}

export function modoCerebroVazio() {
  return localStorage.getItem("modo-cerebro-vazio") === "1";
}

export function definirModoCerebroVazio(ativo) {
  localStorage.setItem("modo-cerebro-vazio", ativo ? "1" : "0");
}

export function filtrarCerebroVazio(lista, chave, mapa = carregarPrioridades()) {
  const prio = prioridadesDoDia(chave, mapa);
  if (prio.length) {
    const h = lista.find((item) => item.id === prio[0]);
    return h ? [h] : lista.slice(0, 1);
  }
  return lista.slice(0, 1);
}

export function carregarTemaSemana() {
  return localStorage.getItem("tema-semana") || "";
}

export function salvarTemaSemana(texto) {
  localStorage.setItem("tema-semana", (texto || "").trim().slice(0, 80));
}
