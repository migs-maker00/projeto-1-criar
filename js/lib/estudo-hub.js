// Hub de estudo — vídeos, áudio, prática e vocabulário falado

export const CHAVE_ESTUDO = "estudo-hub-v1";

export const VOCAB_PADRAO = [
  { id: "v1", en: "proactive", pt: "proativo(a)", frase: "I want to be more proactive after school." },
  { id: "v2", en: "priority", pt: "prioridade", frase: "My first priority is to learn something new." },
  { id: "v3", en: "routine", pt: "rotina", frase: "A good routine helps me focus." },
  { id: "v4", en: "mindset", pt: "mentalidade", frase: "I can change my mindset in small steps." },
  { id: "v5", en: "focus", pt: "foco", frase: "Ten minutes of focus is enough to start." },
  { id: "v6", en: "habit", pt: "hábito", frase: "Small habits make a big difference." },
  { id: "v7", en: "productive", pt: "produtivo(a)", frase: "I feel productive when I finish one task." },
  { id: "v8", en: "balance", pt: "equilíbrio", frase: "Balance between study and rest matters." },
];

function estadoInicial() {
  return {
    links: [],
    vocabulario: [...VOCAB_PADRAO],
    vocabIndex: 0,
    linkAtivoId: null,
    sessao: { data: "", assistir: false, ouvir: false, praticar: 0, falar: 0 },
    abaAtiva: "sessao",
    buscaLivro: "",
    categoriaLivro: "todos",
    temaLivro: null,
    falaFeedback: null,
    notasMidia: {},
  };
}

export function carregarEstudo() {
  try {
    const raw = localStorage.getItem(CHAVE_ESTUDO);
    if (!raw) return estadoInicial();
    const dados = JSON.parse(raw);
    return {
      ...estadoInicial(),
      ...dados,
      links: Array.isArray(dados.links) ? dados.links : [],
      vocabulario:
        Array.isArray(dados.vocabulario) && dados.vocabulario.length
          ? dados.vocabulario
          : [...VOCAB_PADRAO],
      sessao: { ...estadoInicial().sessao, ...(dados.sessao || {}) },
      notasMidia:
        dados.notasMidia && typeof dados.notasMidia === "object" ? { ...dados.notasMidia } : {},
    };
  } catch {
    return estadoInicial();
  }
}

export function salvarEstudo(dados) {
  localStorage.setItem(CHAVE_ESTUDO, JSON.stringify(dados));
}

export function parseMediaUrl(url) {
  const limpo = (url || "").trim();
  if (!limpo) return null;

  const yt = limpo.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{6,})/
  );
  if (yt) return { tipo: "youtube", id: yt[1], url: limpo };

  const spotify = limpo.match(/open\.spotify\.com\/(episode|show|track)\/([a-zA-Z0-9]+)/);
  if (spotify) return { tipo: "spotify", path: `${spotify[1]}/${spotify[2]}`, url: limpo };

  if (/\.(mp3|m4a|ogg|wav|aac)(\?|$)/i.test(limpo)) {
    return { tipo: "audio", url: limpo };
  }

  return { tipo: "link", url: limpo };
}

export function tipoLinkDetectado(url) {
  const p = parseMediaUrl(url);
  if (!p) return "link";
  if (p.tipo === "youtube") return "video";
  if (p.tipo === "spotify" || p.tipo === "audio") return "audio";
  return "podcast";
}

export function htmlPlayer(parsed) {
  if (!parsed) return "";
  if (parsed.tipo === "youtube") {
    return `<div class="estudo-player estudo-player-yt">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${parsed.id}?rel=0"
        title="Vídeo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>`;
  }
  if (parsed.tipo === "spotify") {
    return `<div class="estudo-player estudo-player-spotify">
      <iframe
        src="https://open.spotify.com/embed/${parsed.path}"
        title="Spotify"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>`;
  }
  if (parsed.tipo === "audio") {
    return `<audio class="estudo-audio" controls preload="metadata" src="${escapeAttr(parsed.url)}"></audio>`;
  }
  return `<p class="estudo-link-externo">
    <a href="${escapeAttr(parsed.url)}" target="_blank" rel="noopener noreferrer">Abrir link no navegador ↗</a>
  </p>`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function urlJaExiste(dados, url) {
  const alvo = (url || "").trim();
  return dados.links.some((l) => l.url.trim() === alvo);
}

export function adicionarLink(dados, titulo, url) {
  const parsed = parseMediaUrl(url);
  if (!parsed) return dados;
  const tipo = tipoLinkDetectado(url);
  const link = {
    id: `l${Date.now()}`,
    titulo: (titulo || "").trim() || tituloPadrao(tipo),
    url: parsed.url,
    tipo,
  };
  const links = [...dados.links, link];
  return { ...dados, links, linkAtivoId: link.id };
}

export function adicionarLinkSugerido(dados, sugestao) {
  if (!sugestao?.url) return dados;
  const url = sugestao.url.trim();
  if (urlJaExiste(dados, url)) {
    const existente = dados.links.find((l) => l.url.trim() === url);
    return existente ? { ...dados, linkAtivoId: existente.id } : dados;
  }
  const parsed = parseMediaUrl(url);
  if (!parsed) return dados;
  const tipo = sugestao.tipo || tipoLinkDetectado(url);
  const link = {
    id: `l${Date.now()}`,
    titulo: (sugestao.titulo || "").trim() || tituloPadrao(tipo),
    url: parsed.url,
    tipo,
  };
  return { ...dados, links: [...dados.links, link], linkAtivoId: link.id };
}

function tituloPadrao(tipo) {
  if (tipo === "video") return "Vídeo";
  if (tipo === "audio") return "Áudio";
  return "Podcast";
}

export function removerLink(dados, id) {
  const links = dados.links.filter((l) => l.id !== id);
  const notasMidia = { ...(dados.notasMidia || {}) };
  delete notasMidia[id];
  const linkAtivoId =
    dados.linkAtivoId === id ? links[0]?.id || null : dados.linkAtivoId;
  return { ...dados, links, linkAtivoId, notasMidia };
}

export function notaMidia(dados, linkId) {
  if (!linkId) return "";
  return (dados.notasMidia || {})[linkId] || "";
}

export function salvarNotaMidia(dados, linkId, texto) {
  if (!linkId) return dados;
  const notasMidia = { ...(dados.notasMidia || {}), [linkId]: String(texto ?? "") };
  if (!notasMidia[linkId].trim()) delete notasMidia[linkId];
  return { ...dados, notasMidia };
}

export function linkTemNota(dados, linkId) {
  return Boolean(notaMidia(dados, linkId).trim());
}

export function linkAtivo(dados) {
  return dados.links.find((l) => l.id === dados.linkAtivoId) || dados.links[0] || null;
}

export function linksPorTipo(dados, tipo) {
  if (tipo === "video") return dados.links.filter((l) => l.tipo === "video");
  return dados.links.filter((l) => l.tipo === "audio" || l.tipo === "podcast");
}

export function resetSessaoSeNovoDia(dados, chaveDia) {
  if (dados.sessao?.data === chaveDia) return dados;
  return {
    ...dados,
    sessao: { data: chaveDia, assistir: false, ouvir: false, praticar: 0, falar: 0 },
  };
}

export function marcarSessao(dados, campo, valor = true) {
  const sessao = { ...dados.sessao, [campo]: valor };
  return { ...dados, sessao };
}

export function palavraAtual(dados) {
  const lista = dados.vocabulario || [];
  if (!lista.length) return null;
  const idx = Math.min(dados.vocabIndex || 0, lista.length - 1);
  return { ...lista[idx], indice: idx, total: lista.length };
}

export function avancarPalavra(dados) {
  const total = dados.vocabulario.length;
  if (!total) return dados;
  const prox = ((dados.vocabIndex || 0) + 1) % total;
  return { ...dados, vocabIndex: prox };
}

export function adicionarPalavra(dados, en, pt, frase = "") {
  const palavra = {
    id: `w${Date.now()}`,
    en: en.trim(),
    pt: pt.trim(),
    frase: frase.trim(),
  };
  if (!palavra.en) return dados;
  return { ...dados, vocabulario: [...dados.vocabulario, palavra] };
}

export { falarTexto } from "./voz-sintese.js";

export function resumoSessao(dados, metaPratica = 3) {
  const s = dados.sessao || {};
  const passos = [
    { id: "assistir", ok: !!s.assistir, rotulo: "Assistir" },
    { id: "ouvir", ok: !!s.ouvir, rotulo: "Ouvir" },
    { id: "praticar", ok: (s.praticar || 0) >= metaPratica, rotulo: "Praticar" },
    { id: "falar", ok: (s.falar || 0) >= 3, rotulo: "Falar" },
  ];
  const feitos = passos.filter((p) => p.ok).length;
  return { passos, feitos, total: passos.length };
}
