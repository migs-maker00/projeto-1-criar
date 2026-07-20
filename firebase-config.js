// Configuração do projeto Firebase (Hábitos)
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBRE9kN3gJs3wh5wpCTfPIL5rCVl9kN6y8",
  authDomain: "habitos-fe909.firebaseapp.com",
  projectId: "habitos-fe909",
  storageBucket: "habitos-fe909.firebasestorage.app",
  messagingSenderId: "789148094113",
  appId: "1:789148094113:web:47f17b47f3bee6315eaae0",
};

window.firebaseConfigurado = function firebaseConfigurado() {
  const cfg = window.FIREBASE_CONFIG || {};
  return Boolean(cfg.apiKey && cfg.projectId);
};
