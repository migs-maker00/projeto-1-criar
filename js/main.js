/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 * Import dinâmico com versão para evitar cache antigo no iPhone/PWA.
 */
import { APP_VERSION } from "./config.js";

function mostrarErroCarregamento(erro) {
  document.body.innerHTML = `
    <div style="font-family:system-ui,sans-serif;max-width:28rem;margin:2rem auto;padding:1.5rem;line-height:1.5">
      <h1 style="font-size:1.1rem;margin:0 0 .75rem">Não foi possível carregar o app</h1>
      <p style="margin:0 0 1rem;color:#444">
        Abra pelo <strong>localhost</strong> ou pelo link do GitHub — não abra o arquivo HTML direto.
      </p>
      <p style="margin:0;font-size:.85rem;color:#666">${erro?.message || erro}</p>
    </div>`;
}

try {
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
