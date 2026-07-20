// Sincronização Mac ↔ iPhone via Firebase (código compartilhado)
(function () {
  const CHAVE_SYNC = "habitos-sync-id";
  let syncId = localStorage.getItem(CHAVE_SYNC) || "";
  let cancelarEscuta = null;
  let aplicandoRemoto = false;
  let timerSync = null;
  let db = null;
  let pronto = false;

  function $(id) {
    return document.getElementById(id);
  }

  function gerarCodigo() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += chars[Math.floor(Math.random() * chars.length)];
    }
    return codigo;
  }

  function normalizarCodigo(texto) {
    return String(texto || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 12);
  }

  function atualizarUI(mensagem) {
    const status = $("sync-status");
    const codigoEl = $("sync-codigo-atual");
    const painelConectado = $("sync-conectado");
    const painelDesconectado = $("sync-desconectado");
    const avisoConfig = $("sync-aviso-config");

    if (!status) return;

    if (!window.firebaseConfigurado || !window.firebaseConfigurado()) {
      status.textContent = "Firebase ainda não configurado.";
      if (avisoConfig) avisoConfig.hidden = false;
      if (painelConectado) painelConectado.hidden = true;
      if (painelDesconectado) painelDesconectado.hidden = true;
      return;
    }

    if (avisoConfig) avisoConfig.hidden = true;

    if (syncId) {
      if (painelConectado) painelConectado.hidden = false;
      if (painelDesconectado) painelDesconectado.hidden = true;
      if (codigoEl) codigoEl.textContent = syncId;
      status.textContent = mensagem || "Sincronização ativa neste aparelho.";
    } else {
      if (painelConectado) painelConectado.hidden = true;
      if (painelDesconectado) painelDesconectado.hidden = false;
      status.textContent =
        mensagem || "Sem sincronização. Crie um código ou entre com um existente.";
    }
  }

  function lerEstado() {
    if (typeof window.getEstadoHabitos === "function") {
      return window.getEstadoHabitos();
    }
    return { habitos: [], notas: {}, tema: "claro" };
  }

  function payloadAtual() {
    const estado = lerEstado();
    return {
      habitos: estado.habitos || [],
      notas: estado.notas || {},
      tema: estado.tema || "claro",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      versao: 1,
    };
  }

  async function enviarParaNuvem() {
    if (!pronto || !syncId || aplicandoRemoto) return;
    try {
      await db.collection("sync").doc(syncId).set(payloadAtual(), { merge: true });
      atualizarUI("Sincronizado agora.");
    } catch (erro) {
      console.error(erro);
      atualizarUI("Falha ao enviar para a nuvem. Tente de novo.");
    }
  }

  function agendarSyncNuvem() {
    if (!pronto || !syncId || aplicandoRemoto) return;
    clearTimeout(timerSync);
    timerSync = setTimeout(enviarParaNuvem, 700);
  }

  function aplicarDadosRemotos(dados) {
    if (!dados || typeof window.aplicarEstadoRemoto !== "function") return;
    aplicandoRemoto = true;
    try {
      window.aplicarEstadoRemoto(dados);
    } finally {
      aplicandoRemoto = false;
    }
  }

  function escutarSync(codigo) {
    if (cancelarEscuta) {
      cancelarEscuta();
      cancelarEscuta = null;
    }
    cancelarEscuta = db.collection("sync").doc(codigo).onSnapshot(
      (snap) => {
        if (!snap.exists) return;
        aplicarDadosRemotos(snap.data());
        atualizarUI("Atualizado da nuvem.");
      },
      (erro) => {
        console.error(erro);
        atualizarUI("Erro ao ouvir a nuvem.");
      }
    );
  }

  async function conectar(codigo, { criar }) {
    const id = normalizarCodigo(codigo);
    if (id.length < 6) {
      atualizarUI("Código inválido. Use pelo menos 6 caracteres.");
      return;
    }

    const ref = db.collection("sync").doc(id);
    const snap = await ref.get();

    if (!snap.exists) {
      if (!criar) {
        atualizarUI("Código não encontrado. Confira ou crie uma sincronização nova.");
        return;
      }
      await ref.set(payloadAtual());
    } else if (!criar) {
      aplicarDadosRemotos(snap.data());
    }

    syncId = id;
    localStorage.setItem(CHAVE_SYNC, syncId);
    escutarSync(syncId);
    await enviarParaNuvem();
    atualizarUI(
      criar
        ? "Sincronização criada. Use este código no outro aparelho."
        : "Conectado. Dados sincronizados."
    );
  }

  async function criarSync() {
    await conectar(gerarCodigo(), { criar: true });
  }

  async function entrarComCodigo() {
    const entrada = $("sync-entrada-codigo");
    await conectar(entrada ? entrada.value : "", { criar: false });
  }

  function desconectar() {
    if (cancelarEscuta) {
      cancelarEscuta();
      cancelarEscuta = null;
    }
    syncId = "";
    localStorage.removeItem(CHAVE_SYNC);
    atualizarUI("Sincronização desligada neste aparelho. Os dados locais continuam aqui.");
  }

  async function copiarCodigo() {
    if (!syncId) return;
    try {
      await navigator.clipboard.writeText(syncId);
      atualizarUI("Código copiado. Cole no outro aparelho.");
    } catch (erro) {
      atualizarUI("Não deu para copiar. Anote o código: " + syncId);
    }
  }

  window.agendarSyncNuvem = agendarSyncNuvem;
  window.syncEstaAplicandoRemoto = function () {
    return aplicandoRemoto;
  };

  window.initHabitosSync = async function initHabitosSync() {
    atualizarUI();

    $("botao-sync-criar")?.addEventListener("click", () => {
      criarSync().catch((e) => {
        console.error(e);
        atualizarUI("Erro ao criar sincronização.");
      });
    });
    $("botao-sync-entrar")?.addEventListener("click", () => {
      entrarComCodigo().catch((e) => {
        console.error(e);
        atualizarUI("Erro ao conectar.");
      });
    });
    $("botao-sync-desconectar")?.addEventListener("click", desconectar);
    $("botao-sync-copiar")?.addEventListener("click", () => {
      copiarCodigo().catch(() => {});
    });

    if (!window.firebaseConfigurado || !window.firebaseConfigurado()) return;
    if (typeof firebase === "undefined") {
      atualizarUI("Biblioteca Firebase não carregou.");
      return;
    }

    try {
      if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
      db = firebase.firestore();
      await firebase.auth().signInAnonymously();
      pronto = true;
      if (syncId) {
        await conectar(syncId, { criar: true });
      } else {
        atualizarUI();
      }
    } catch (erro) {
      console.error(erro);
      atualizarUI("Não foi possível iniciar o Firebase. Confira a configuração.");
    }
  };

  window.initHabitosSync();
})();
