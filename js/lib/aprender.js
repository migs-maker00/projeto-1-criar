// Aprender sem leitura — vídeo, áudio, falar e vocabulário

export const MICRO_APRENDER = [
  "Escolher vídeo ou áudio",
  "Focar 10 minutos",
  "Explicar 1 coisa em voz alta",
];

export const PLANO_B_APRENDER = "Assistir 2 min de vídeo ou ouvir 1 trecho de áudio.";

export const MICRO_VOCABULARIO = [
  "Ouvir 3 palavras novas",
  "Repetir em voz alta",
  "Usar 1 numa frase",
];

export const PLANO_B_VOCABULARIO = "Ouvir só 1 palavra e repetir 3 vezes.";

export const CONTEXTO_APRENDER = "Sem livro — vídeo, áudio ou falar em voz alta conta.";

export function detectarHabitoAprender(habito) {
  return /aprend|estud|vocabul|conhec|prova|reda[cç]/i.test(habito.nome || "");
}

export function textoSugereAprender(texto) {
  return /estud|aprend|vocabul|vídeo|video|áudio|audio|podcast|curso|prova|inglês|ingles/i.test(
    texto || ""
  );
}

export function aplicarModeloAprender(habito) {
  const atualizado = { ...habito };

  if (/^estudar/i.test(atualizado.nome)) {
    atualizado.nome = atualizado.nome.replace(/^estudar/i, "Aprender");
  }
  if (/ler \d|leitura|ler 20/i.test(atualizado.nome)) {
    atualizado.nome = "Aprender 15 min";
  }

  const microAntigo = Array.isArray(atualizado.microPassos)
    ? atualizado.microPassos.some((p) => /abrir o material|ler|página|pdf|caderno/i.test(p))
  : false;

  const planoAntigo = /ler|página|material|abrir o/i.test(atualizado.planoB || "");

  if (microAntigo || !atualizado.microPassos?.length) {
    atualizado.microPassos = /vocabul/i.test(atualizado.nome)
      ? [...MICRO_VOCABULARIO]
      : [...MICRO_APRENDER];
  }

  if (planoAntigo || !atualizado.planoB) {
    atualizado.planoB = /vocabul/i.test(atualizado.nome)
      ? PLANO_B_VOCABULARIO
      : PLANO_B_APRENDER;
  }

  if (/ler|página|material/i.test(atualizado.contextoLembrete || "")) {
    atualizado.contextoLembrete = CONTEXTO_APRENDER;
  }

  return atualizado;
}

export function migrarHabitosAprendizado(lista) {
  return lista.map((h) => {
    const precisa =
      /estud|ler|leitura|aprend|vocabul/i.test(h.nome || "") ||
      /ler|página|abrir o material/i.test(h.planoB || "") ||
      (Array.isArray(h.microPassos) &&
        h.microPassos.some((p) => /ler|material|pdf|página/i.test(p)));

    if (!precisa) return h;
    return aplicarModeloAprender(h);
  });
}
