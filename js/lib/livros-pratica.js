// Aprendizado na prática — busca, seleção e progresso por livro

import {
  LIVRO_PADRAO,
  TODOS_LIVROS,
} from "./livros-dados.js";

export { LIVRO_PADRAO, TODOS_LIVROS };
export const LIVROS_DISPONIVEIS = TODOS_LIVROS;

const CHAVE_PROGRESSO = "livro-pratica-progresso-v2";

function normalizarBusca(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function buscarLivros(termo = "", categoria = "todos") {
  const q = normalizarBusca(termo);
  return TODOS_LIVROS.filter((livro) => {
    if (categoria !== "todos" && livro.categoria !== categoria) return false;
    if (!q) return true;
    const blob = normalizarBusca(
      [
        livro.titulo,
        livro.autor,
        livro.subtitulo,
        ...(livro.tags || []),
        ...(livro.palavrasChave || []),
      ].join(" ")
    );
    return blob.includes(q) || q.split(/\s+/).every((p) => p.length > 1 && blob.includes(p));
  });
}

export function livroPorId(livroId) {
  return TODOS_LIVROS.find((l) => l.id === livroId) || LIVRO_PADRAO;
}

function progressoInicialLivro() {
  return { moduloIndex: 0, respondidas: {} };
}

function progressoInicial() {
  return {
    livroAtivoId: LIVRO_PADRAO.id,
    porLivro: { [LIVRO_PADRAO.id]: progressoInicialLivro() },
    perguntasHoje: 0,
    ultimoDia: "",
    streak: 0,
  };
}

function migrarProgressoAntigo(dados) {
  if (dados.porLivro && dados.livroAtivoId) return dados;

  const livroId =
    dados.livroId === "7-habitos" ? LIVRO_PADRAO.id : dados.livroId || LIVRO_PADRAO.id;

  return {
    livroAtivoId: livroId,
    porLivro: {
      [livroId]: {
        moduloIndex: dados.moduloIndex || 0,
        respondidas: dados.respondidas || {},
      },
    },
    perguntasHoje: dados.perguntasHoje || 0,
    ultimoDia: dados.ultimoDia || "",
    streak: dados.streak || 0,
  };
}

export function carregarProgressoLivro() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || "null");
    if (!dados || typeof dados !== "object") return progressoInicial();
    const migrado = migrarProgressoAntigo(dados);
    if (!migrado.porLivro[migrado.livroAtivoId]) {
      migrado.porLivro[migrado.livroAtivoId] = progressoInicialLivro();
    }
    return migrado;
  } catch {
    return progressoInicial();
  }
}

export function salvarProgressoLivro(progresso) {
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
}

export function livroAtivo(livroId) {
  const progresso = carregarProgressoLivro();
  const id = livroId || progresso.livroAtivoId || LIVRO_PADRAO.id;
  return livroPorId(id);
}

export function selecionarLivro(livroId) {
  const progresso = carregarProgressoLivro();
  const livro = livroPorId(livroId);
  const porLivro = { ...progresso.porLivro };
  if (!porLivro[livro.id]) porLivro[livro.id] = progressoInicialLivro();
  const novo = { ...progresso, livroAtivoId: livro.id, porLivro };
  salvarProgressoLivro(novo);
  return novo;
}

function progressoDoLivroAtual(progresso) {
  const id = progresso.livroAtivoId || LIVRO_PADRAO.id;
  return progresso.porLivro?.[id] || progressoInicialLivro();
}

export function moduloAtual(livro, progresso) {
  const pl = progressoDoLivroAtual(progresso);
  const idx = Math.min(pl.moduloIndex, livro.modulos.length - 1);
  return livro.modulos[idx];
}

export function perguntaAtual(livro, progresso) {
  const mod = moduloAtual(livro, progresso);
  const pl = progressoDoLivroAtual(progresso);
  const chaveMod = `${livro.id}:${mod.id}`;
  const feitas = pl.respondidas[chaveMod] || [];
  return mod.perguntas.find((p) => !feitas.includes(p.id)) || null;
}

export function registrarResposta(progresso, livro, perguntaId, chaveDia) {
  const id = progresso.livroAtivoId || livro.id;
  const pl = { ...progressoDoLivroAtual(progresso) };
  const mod = moduloAtual(livro, progresso);
  const chaveMod = `${livro.id}:${mod.id}`;
  const feitas = [...(pl.respondidas[chaveMod] || [])];
  if (!feitas.includes(perguntaId)) feitas.push(perguntaId);

  pl.respondidas = { ...pl.respondidas, [chaveMod]: feitas };

  const todasFeitas = mod.perguntas.every((p) => feitas.includes(p.id));
  if (todasFeitas && pl.moduloIndex < livro.modulos.length - 1) {
    pl.moduloIndex += 1;
  }

  const novo = {
    ...progresso,
    livroAtivoId: id,
    porLivro: { ...progresso.porLivro, [id]: pl },
    perguntasHoje: progresso.ultimoDia === chaveDia ? progresso.perguntasHoje + 1 : 1,
    ultimoDia: chaveDia,
  };

  if (novo.ultimoDia !== progresso.ultimoDia && progresso.ultimoDia) {
    novo.streak = progresso.perguntasHoje > 0 ? (progresso.streak || 0) + 1 : progresso.streak || 0;
  }

  salvarProgressoLivro(novo);
  return novo;
}

export const META_PERGUNTAS_DIA = 3;

export function metaDiariaAtingida(progresso, chaveDia) {
  if (progresso.ultimoDia !== chaveDia) return false;
  return progresso.perguntasHoje >= META_PERGUNTAS_DIA;
}

export { CATEGORIAS_LIVRO } from "./livros-dados.js";

export function progressoGeral(livro, progresso) {
  const pl = progressoDoLivroAtual(progresso);
  let total = 0;
  let feitas = 0;
  livro.modulos.forEach((mod) => {
    const chave = `${livro.id}:${mod.id}`;
    const lista = pl.respondidas[chave] || [];
    total += mod.perguntas.length;
    feitas += lista.length;
  });
  return { total, feitas, pct: total ? Math.round((feitas / total) * 100) : 0 };
}
