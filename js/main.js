/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 * Import dinâmico com versão para evitar cache antigo no iPhone/PWA.
 */
import { APP_VERSION } from "./config.js";

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
