// Cole aqui a configuração do seu projeto Firebase (Console → Project settings → Your apps → Web).
// Enquanto apiKey for "COLE_AQUI", o sync fica desligado.
window.FIREBASE_CONFIG = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI.firebaseapp.com",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI",
};

window.firebaseConfigurado = function firebaseConfigurado() {
  const cfg = window.FIREBASE_CONFIG || {};
  return Boolean(cfg.apiKey && cfg.apiKey !== "COLE_AQUI" && cfg.projectId && cfg.projectId !== "COLE_AQUI");
};
