// Voz mais natural — escolhe a melhor voz do sistema (Web Speech API)

export const CHAVE_VOZ_EN = "estudo-voz-en";
export const CHAVE_VOZ_PT = "estudo-voz-pt";

let cacheVozes = [];

function normalizarLang(lang) {
  return (lang || "en-US").replace("_", "-").toLowerCase();
}

function idiomaCompativel(voz, lang) {
  const alvo = normalizarLang(lang).split("-")[0];
  const v = normalizarLang(voz.lang).split("-")[0];
  return v === alvo;
}

function pontuarVoz(voz, lang) {
  if (!idiomaCompativel(voz, lang)) return -100;

  const nome = voz.name.toLowerCase();
  const idioma = normalizarLang(voz.lang);
  let pts = 0;

  if (voz.localService) pts += 8;

  if (/google|natural|neural|premium|enhanced|wavenet|online/i.test(nome)) pts += 35;
  if (/samantha|aaron|nicky|daniel|karen|moira|alex|ava|zoey|jenny|guy/i.test(nome)) pts += 28;
  if (/luciana|felipe|francisca|antonio|microsoft.*maria|google.*portugu/i.test(nome)) pts += 28;

  if (normalizarLang(lang).startsWith("en")) {
    if (/en-us|united states|us english/i.test(`${idioma} ${nome}`)) pts += 12;
    if (/female|mulher|woman/i.test(nome)) pts += 2;
  }

  if (normalizarLang(lang).startsWith("pt")) {
    if (/pt-br|brazil|brasil/i.test(`${idioma} ${nome}`)) pts += 15;
    if (/male|homem|masculin|felipe|antonio/i.test(nome)) pts += 4;
  }

  if (/espeak|synthetic|android tts|default|compact|supercomp/i.test(nome)) pts -= 40;
  if (/bad|croak|whisper/i.test(nome)) pts -= 50;

  return pts;
}

export function atualizarCacheVozes() {
  if (!("speechSynthesis" in window)) return [];
  cacheVozes = window.speechSynthesis.getVoices() || [];
  return cacheVozes;
}

export function iniciarVozes(onPronto) {
  if (!("speechSynthesis" in window)) return;
  atualizarCacheVozes();
  if (cacheVozes.length) onPronto?.();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    atualizarCacheVozes();
    onPronto?.();
  });
}

function chaveParaLang(lang) {
  return normalizarLang(lang).startsWith("pt") ? CHAVE_VOZ_PT : CHAVE_VOZ_EN;
}

export function salvarVozPreferida(lang, voiceURI) {
  if (voiceURI) localStorage.setItem(chaveParaLang(lang), voiceURI);
  else localStorage.removeItem(chaveParaLang(lang));
}

export function vozSalva(lang) {
  return localStorage.getItem(chaveParaLang(lang)) || "";
}

function vozPorURI(uri) {
  if (!uri) return null;
  return cacheVozes.find((v) => v.voiceURI === uri || v.name === uri) || null;
}

export function melhorVoz(lang = "en-US") {
  atualizarCacheVozes();
  const salva = vozSalva(lang);
  if (salva) {
    const escolhida = vozPorURI(salva);
    if (escolhida) return escolhida;
  }

  const ordenadas = cacheVozes
    .map((v) => ({ v, pts: pontuarVoz(v, lang) }))
    .filter((x) => x.pts >= 0)
    .sort((a, b) => b.pts - a.pts);

  return ordenadas[0]?.v || cacheVozes.find((v) => idiomaCompativel(v, lang)) || null;
}

export function listarVozesUI(lang = "en-US") {
  atualizarCacheVozes();
  const vistas = new Set();
  const lista = [];

  cacheVozes
    .map((v) => ({ v, pts: pontuarVoz(v, lang) }))
    .filter((x) => x.pts >= 5)
    .sort((a, b) => b.pts - a.pts)
    .forEach(({ v }) => {
      if (vistas.has(v.voiceURI)) return;
      vistas.add(v.voiceURI);
      lista.push({ uri: v.voiceURI, nome: v.name, local: v.localService });
    });

  return lista.slice(0, 10);
}

export function rotuloVozAtual(lang = "en-US") {
  const salva = vozSalva(lang);
  const v = salva ? vozPorURI(salva) : melhorVoz(lang);
  return v?.name || "Automática (melhor disponível)";
}

/** Fala com voz mais humana — rate/pitch calibrados */
export function falarTexto(texto, opts = {}) {
  if (!("speechSynthesis" in window) || !texto) return false;

  const lang = opts.lang || "en-US";
  const tipo = opts.tipo || (normalizarLang(lang).startsWith("pt") ? "pt" : "en");

  window.speechSynthesis.cancel();

  const falar = () => {
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = lang;

    const voz = opts.voiceURI ? vozPorURI(opts.voiceURI) : melhorVoz(lang);
    if (voz) u.voice = voz;

    u.rate = tipo === "en" ? 0.93 : 0.96;
    u.pitch = tipo === "en" ? 1.02 : 0.98;
    u.volume = 1;

    window.speechSynthesis.speak(u);
  };

  if (!cacheVozes.length) {
    atualizarCacheVozes();
    if (!cacheVozes.length) {
      window.speechSynthesis.addEventListener("voiceschanged", falar, { once: true });
      return true;
    }
  }

  falar();
  return true;
}
