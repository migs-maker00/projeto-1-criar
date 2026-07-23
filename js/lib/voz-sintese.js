// Voz em inglês nativo — evita sotaque brasileiro em palavras em inglês

export const CHAVE_VOZ_EN = "estudo-voz-en";
export const CHAVE_VOZ_PT = "estudo-voz-pt";

let cacheVozes = [];

function normalizarLang(lang) {
  return (lang || "en-US").replace("_", "-").toLowerCase();
}

/** Só vozes en-US ou en-GB de verdade — nada de pt-BR falando inglês */
function localeInglesNativo(voz) {
  const lang = normalizarLang(voz.lang);
  const nome = voz.name.toLowerCase();

  if (lang.startsWith("pt")) return null;
  if (/luciana|felipe|francisca|antonio|fernanda|vit[oó]ria|daniel.*br|maria.*br/i.test(nome)) {
    return null;
  }
  if (/brazil|brasil|portugu|portuguese|multi-?ling|espeak/i.test(nome)) return null;

  if (lang.startsWith("en-us") || lang === "en-us") return "us";
  if (lang.startsWith("en-gb") || lang === "en-gb") return "uk";

  return null;
}

function pontuarVozIngles(voz) {
  const locale = localeInglesNativo(voz);
  if (!locale) return -100;

  const nome = voz.name.toLowerCase();
  let pts = 0;

  if (/google.*english.*united states|google us english/i.test(nome)) pts += 100;
  if (/google.*english.*united kingdom|google uk english/i.test(nome)) pts += 90;
  if (/microsoft.*zira|microsoft.*david|microsoft.*aria.*english/i.test(nome)) pts += 85;
  if (/samantha|aaron|nicky|karen|moira|alex|ava|zoey|jenny|guy|daniel/i.test(nome)) pts += 70;
  if (/enhanced|premium|natural|neural|wavenet|online/i.test(nome)) pts += 25;

  if (locale === "us") pts += 20;
  if (locale === "uk") pts += 15;

  if (!voz.localService) pts += 5;

  if (/compact|default|android|synthetic|bad/i.test(nome)) pts -= 30;

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
  limparVozSalvaInvalida();
  if (cacheVozes.length) onPronto?.();
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    atualizarCacheVozes();
    limparVozSalvaInvalida();
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

function limparVozSalvaInvalida() {
  const salva = vozSalva("en-US");
  if (!salva) return;
  const v = vozPorURI(salva);
  if (!v || localeInglesNativo(v) === null) {
    localStorage.removeItem(CHAVE_VOZ_EN);
  }
}

export function melhorVoz(lang = "en-US") {
  atualizarCacheVozes();
  limparVozSalvaInvalida();

  const salva = vozSalva(lang);
  if (salva) {
    const escolhida = vozPorURI(salva);
    if (escolhida && localeInglesNativo(escolhida)) return escolhida;
  }

  const ordenadas = cacheVozes
    .map((v) => ({ v, pts: pontuarVozIngles(v) }))
    .filter((x) => x.pts >= 0)
    .sort((a, b) => b.pts - a.pts);

  return ordenadas[0]?.v || null;
}

function rotuloVozLista(voz) {
  const loc = localeInglesNativo(voz);
  const bandeira = loc === "uk" ? "🇬🇧" : "🇺🇸";
  return `${bandeira} ${voz.name}`;
}

export function listarVozesUI(lang = "en-US") {
  atualizarCacheVozes();
  const vistas = new Set();
  const lista = [];

  cacheVozes
    .map((v) => ({ v, pts: pontuarVozIngles(v) }))
    .filter((x) => x.pts >= 10)
    .sort((a, b) => b.pts - a.pts)
    .forEach(({ v }) => {
      if (vistas.has(v.voiceURI)) return;
      vistas.add(v.voiceURI);
      lista.push({
        uri: v.voiceURI,
        nome: rotuloVozLista(v),
        local: v.localService,
      });
    });

  return lista.slice(0, 12);
}

export function rotuloVozAtual(lang = "en-US") {
  const salva = vozSalva(lang);
  const v = salva ? vozPorURI(salva) : melhorVoz(lang);
  if (!v) return "Google US English (recomendado)";
  return rotuloVozLista(v);
}

/** Fala inglês com voz nativa en-US/en-GB */
export function falarTexto(texto, opts = {}) {
  if (!("speechSynthesis" in window) || !texto) return false;

  window.speechSynthesis.cancel();

  const falar = () => {
    const voz = opts.voiceURI ? vozPorURI(opts.voiceURI) : melhorVoz("en-US");
    const locale = voz ? localeInglesNativo(voz) : "us";
    const lang = locale === "uk" ? "en-GB" : "en-US";

    const u = new SpeechSynthesisUtterance(texto);
    u.lang = lang;

    if (voz && localeInglesNativo(voz)) {
      u.voice = voz;
    }

    u.rate = 0.9;
    u.pitch = 1;
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

export function temVozInglesNativa() {
  atualizarCacheVozes();
  return cacheVozes.some((v) => pontuarVozIngles(v) >= 10);
}
