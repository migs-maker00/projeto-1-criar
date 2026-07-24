/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 */
import { APP_VERSION } from "./config.js?v=2.5.0";

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
    const u = new URL(location.href);
    u.searchParams.set("v", APP_VERSION);
    u.searchParams.set("t", Date.now());
    location.replace(u.toString());
  });
}

try {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`).catch(() => {});
  }

  const app = await import(`./app.js?v=${APP_VERSION}`);

  app.initApp();

  window.APP_VERSION = APP_VERSION;
  window.getEstadoHabitos = app.getEstadoExportavel;
  window.aplicarEstadoRemoto = app.aplicarEstadoRemoto;
  window.aplicarTema = app.aplicarTema;
  window.desenhar = app.desenhar;
  window.carregarNotaHoje = app.carregarNotaHoje;
  window.carregarNotaDiario = app.carregarNotaDiario;
  window.hojeStr = app.hojeStr;
} catch (erro) {
  console.error(erro);
  mostrarErroCarregamento(erro);
}
