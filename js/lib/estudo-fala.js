// Reconhecimento de voz — checar pronúncia (Web Speech API)

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

let reconhecimentoAtivo = null;

export function suportaReconhecimentoVoz() {
  return !!SpeechRecognition;
}

export function pararEscuta() {
  if (!reconhecimentoAtivo) return;
  try {
    reconhecimentoAtivo.onend = null;
    reconhecimentoAtivo.stop();
  } catch {
    /* já parado */
  }
  reconhecimentoAtivo = null;
}

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const custo = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + custo);
    }
  }
  return dp[m][n];
}

function similaridade(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) {
    return Math.min(a.length, b.length) / Math.max(a.length, b.length);
  }
  const maxLen = Math.max(a.length, b.length);
  return 1 - levenshtein(a, b) / maxLen;
}

export function avaliarPronuncia(esperado, ouvido, { frase = false } = {}) {
  const e = normalizar(esperado);
  const o = normalizar(ouvido);
  const ouvidoLimpo = String(ouvido || "").trim();

  if (!o) {
    return {
      ok: false,
      mensagem: "Não ouvi nada. Fale mais perto do microfone e tente de novo.",
      ouvido: ouvidoLimpo,
    };
  }

  if (!frase) {
    const palavras = o.split(" ").filter(Boolean);
    for (const palavra of palavras) {
      if (similaridade(palavra, e) >= 0.8) {
        return {
          ok: true,
          mensagem: `Boa pronúncia! Ouvi “${ouvidoLimpo}”.`,
          ouvido: ouvidoLimpo,
        };
      }
    }
    if (similaridade(o, e) >= 0.72) {
      return {
        ok: true,
        mensagem: `Muito bom! Ouvi “${ouvidoLimpo}”.`,
        ouvido: ouvidoLimpo,
      };
    }
    return {
      ok: false,
      mensagem: `Ouvi “${ouvidoLimpo}” — esperava “${esperado}”. Ouça de novo e repita.`,
      ouvido: ouvidoLimpo,
    };
  }

  const chave = e.split(" ").filter((w) => w.length > 2);
  const ouvidas = o.split(" ").filter(Boolean);
  if (!chave.length) {
    const ok = similaridade(o, e) >= 0.65;
    return {
      ok,
      mensagem: ok
        ? `Frase boa! Ouvi “${ouvidoLimpo}”.`
        : `Ouvi “${ouvidoLimpo}”. Tente mais devagar, palavra por palavra.`,
      ouvido: ouvidoLimpo,
    };
  }

  let acertos = 0;
  chave.forEach((palavra) => {
    if (ouvidas.some((o) => similaridade(o, palavra) >= 0.78)) acertos += 1;
  });
  const ratio = acertos / chave.length;

  if (ratio >= 0.6) {
    return {
      ok: true,
      mensagem: `Muito bom! Peguei o essencial da frase (“${ouvidoLimpo}”).`,
      ouvido: ouvidoLimpo,
    };
  }

  return {
    ok: false,
    mensagem: `Ouvi “${ouvidoLimpo}”. Falta um pouco — ouça a frase e tente outra vez.`,
    ouvido: ouvidoLimpo,
  };
}

function melhorAvaliacao(esperado, resultados, frase) {
  let melhor = { ok: false, mensagem: "Não entendi. Tente de novo.", ouvido: "" };
  for (const item of resultados) {
    const aval = avaliarPronuncia(esperado, item.transcript, { frase });
    aval.confianca = item.confidence;
    if (aval.ok) return aval;
    if ((item.confidence || 0) >= (melhor.confianca || 0)) melhor = aval;
  }
  return melhor;
}

export function escutarPronuncia(esperado, opts = {}) {
  const { frase = false, onStatus, onResult, onError } = opts;

  pararEscuta();

  if (!SpeechRecognition) {
    onError?.(
      "Reconhecimento de voz não disponível aqui. No celular, use Chrome — e permita o microfone."
    );
    return;
  }

  const rec = new SpeechRecognition();
  reconhecimentoAtivo = rec;
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 5;

  rec.onstart = () => onStatus?.("🎤 Ouvindo… fale agora em inglês.");

  rec.onerror = (evento) => {
    reconhecimentoAtivo = null;
    const mapa = {
      "not-allowed": "Microfone bloqueado. Permita o acesso nas configurações do navegador.",
      "no-speech": "Não ouvi voz. Tente falar um pouco mais alto.",
      "network": "Precisa de internet para reconhecer a voz.",
      aborted: "Escuta cancelada.",
    };
    onError?.(mapa[evento.error] || "Erro ao ouvir. Tente de novo.");
  };

  rec.onend = () => {
    if (reconhecimentoAtivo === rec) reconhecimentoAtivo = null;
  };

  rec.onresult = (evento) => {
    const bloco = evento.results[0];
    if (!bloco) {
      onError?.("Não ouvi nada. Tente de novo.");
      return;
    }
    const alternativas = [];
    for (let i = 0; i < bloco.length; i++) {
      alternativas.push({ transcript: bloco[i].transcript, confidence: bloco[i].confidence });
    }
    const resultado = melhorAvaliacao(esperado, alternativas, frase);
    onResult?.(resultado);
  };

  try {
    rec.start();
  } catch {
    reconhecimentoAtivo = null;
    onError?.("Microfone ocupado. Aguarde um segundo e tente de novo.");
  }
}
