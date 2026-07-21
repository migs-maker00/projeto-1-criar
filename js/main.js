/**
 * Ponto de entrada do app — expõe API para sync.js e inicializa a UI.
 */
import { APP_VERSION } from "./config.js";
import {
  initApp,
  aplicarEstadoRemoto,
  aplicarTema,
  desenhar,
  carregarNotaHoje,
  carregarNotaDiario,
  getEstadoExportavel,
  hojeStr,
} from "./app.js";

initApp();

window.APP_VERSION = APP_VERSION;
window.getEstadoHabitos = getEstadoExportavel;
window.aplicarEstadoRemoto = aplicarEstadoRemoto;
window.aplicarTema = aplicarTema;
window.desenhar = desenhar;
window.carregarNotaHoje = carregarNotaHoje;
window.carregarNotaDiario = carregarNotaDiario;
window.hojeStr = hojeStr;
