/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 */
import { APP_VERSION } from "./config.js?v=2.7.0";

const CHAVE_VERSAO_LOCAL = "app-versao-carregada";

function mostrarErroCarregamento(erro) {
  const detalhe = erro?.message || String(erro);
  document.body.innerHTML = `
    <div style="font-family:system-ui,sans-serif;max-width:28rem;margin:2rem auto;padding:1.5rem;line-height:1.5;text-align:center">
      <h1 style="font-size:1.1rem;margin:0 0 .75rem">Não foi possível carregar o app</h1>
      <p style="margin:0 0 1rem;color:#444">
        Seu navegador pode estar com uma versão antiga em cache.
      </p>
      <button type="button" id="botao-recarregar-erro" style="padding:12px 20px;border:none;border-radius:10px;background:#1b365d;color:#faf7f1;font-weight:600;cursor:pointer;font-size:1rem">
        Recarregar agora
      </button>
      <p style="margin:12px 0 0;font-size:.8rem;color:#666">${detalhe}</p>
    </div>`;
  document.getElementById("botao-recarregar-erro")?.addEventListener("click", () => {
    forcarRecargaComVersaoNova();
  });
}

export function forcarRecargaComVersaoNova() {
  const u = new URL(location.href);
  u.searchParams.set("v", APP_VERSION);
  u.searchParams.set("t", Date.now());
  location.replace(u.toString());
}

async function limparCachesAntigos() {
  if (!("caches" in window)) return;
  const chaves = await caches.keys();
  await Promise.all(chaves.map((chave) => caches.delete(chave)));
}

async function configurarServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;

  const registration = await navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`);

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    forcarRecargaComVersaoNova();
  });

  if (registration.waiting) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  }

  registration.addEventListener("updatefound", () => {
    const novo = registration.installing;
    if (!novo) return;
    novo.addEventListener("statechange", () => {
      if (novo.state === "installed" && navigator.serviceWorker.controller) {
        novo.postMessage({ type: "SKIP_WAITING" });
      }
    });
  });

  await registration.update();
  return registration;
}

export async function forcarAtualizacaoApp() {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((reg) => reg.unregister()));
  }
  await limparCachesAntigos();
  localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
  forcarRecargaComVersaoNova();
}

function verificarVersaoCarregada() {
  const salva = localStorage.getItem(CHAVE_VERSAO_LOCAL);
  if (salva && salva !== APP_VERSION) {
    localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
    forcarRecargaComVersaoNova();
    return true;
  }
  localStorage.setItem(CHAVE_VERSAO_LOCAL, APP_VERSION);
  return false;
}

try {
  if (verificarVersaoCarregada()) {
    throw new Error("Atualizando versão…");
  }

  await configurarServiceWorker();

  const app = await import(`./app.js?v=${APP_VERSION}`);

  app.initApp();

  window.APP_VERSION = APP_VERSION;
  window.forcarAtualizacaoApp = forcarAtualizacaoApp;
  window.getEstadoHabitos = app.getEstadoExportavel;
  window.aplicarEstadoRemoto = app.aplicarEstadoRemoto;
  window.aplicarTema = app.aplicarTema;
  window.desenhar = app.desenhar;
  window.carregarNotaHoje = app.carregarNotaHoje;
  window.carregarNotaDiario = app.carregarNotaDiario;
  window.hojeStr = app.hojeStr;
} catch (erro) {
  if (String(erro?.message || erro).includes("Atualizando versão")) {
    // reload em andamento
  } else {
    console.error(erro);
    mostrarErroCarregamento(erro);
  }
}
