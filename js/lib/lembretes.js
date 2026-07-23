// Lembretes nativos — verificação a cada minuto enquanto o app está aberto

const CHAVE_ATIVO = "lembretes-nativos";
const CHAVE_ENVIADOS = "lembretes-enviados-dia";

export function lembretesAtivos() {
  return localStorage.getItem(CHAVE_ATIVO) === "1";
}

export function definirLembretes(ativo) {
  localStorage.setItem(CHAVE_ATIVO, ativo ? "1" : "0");
}

export async function pedirPermissaoLembretes() {
  if (!("Notification" in window)) {
    return { ok: false, mensagem: "Este navegador não suporta notificações." };
  }
  if (Notification.permission === "granted") {
    definirLembretes(true);
    return { ok: true, mensagem: "Lembretes ativados." };
  }
  if (Notification.permission === "denied") {
    return { ok: false, mensagem: "Permissão negada. Ative nas configurações do navegador." };
  }
  const resultado = await Notification.requestPermission();
  if (resultado === "granted") {
    definirLembretes(true);
    return { ok: true, mensagem: "Lembretes ativados." };
  }
  return { ok: false, mensagem: "Permissão não concedida." };
}

function carregarEnviados(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_ENVIADOS) || "{}");
    return Array.isArray(dados[chave]) ? dados[chave] : [];
  } catch {
    return [];
  }
}

function marcarEnviado(chave, id) {
  const dados = JSON.parse(localStorage.getItem(CHAVE_ENVIADOS) || "{}");
  const lista = Array.isArray(dados[chave]) ? dados[chave] : [];
  if (!lista.includes(id)) lista.push(id);
  dados[chave] = lista;
  localStorage.setItem(CHAVE_ENVIADOS, JSON.stringify(dados));
}

function horaAtual() {
  const agora = new Date();
  return `${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}`;
}

function dispararNotificacao(titulo, corpo, tag) {
  if (!lembretesAtivos() || Notification.permission !== "granted") return;
  try {
    new Notification(titulo, {
      body: corpo,
      tag,
      icon: "icon-192.png",
    });
  } catch {
    /* silencioso */
  }
}

export function verificarLembretes(habitos, chave, { estaPendente, horariosDoHabito }) {
  if (!lembretesAtivos() || Notification.permission !== "granted") return;

  const hhmm = horaAtual();
  const enviados = carregarEnviados(chave);

  habitos.forEach((habito) => {
    if (!estaPendente(habito)) return;

    const horarios = horariosDoHabito(habito);
    horarios.forEach((hora) => {
      if (hora !== hhmm) return;
      const id = `${habito.id}-${hora}`;
      if (enviados.includes(id)) return;

      marcarEnviado(chave, id);
      const ctx = habito.contextoLembrete || "Hora de fazer isso — um passo só.";
      dispararNotificacao(habito.nome, ctx, id);
    });
  });
}

let intervaloLembretes = null;

export function iniciarVerificacaoLembretes(callback) {
  if (intervaloLembretes) clearInterval(intervaloLembretes);
  callback();
  intervaloLembretes = setInterval(callback, 60000);
}

export function pararVerificacaoLembretes() {
  if (intervaloLembretes) {
    clearInterval(intervaloLembretes);
    intervaloLembretes = null;
  }
}
