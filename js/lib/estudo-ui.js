// UI da aba Estudo — renderização e eventos

import {
  adicionarLink,
  adicionarPalavra,
  avancarPalavra,
  falarTexto,
  htmlPlayer,
  linkAtivo,
  linksPorTipo,
  marcarSessao,
  palavraAtual,
  parseMediaUrl,
  removerLink,
  resumoSessao,
} from "./estudo-hub.js";
import {
  carregarProgressoLivro,
  livroAtivo,
  META_PERGUNTAS_DIA,
  metaDiariaAtingida,
  moduloAtual,
  perguntaAtual,
  progressoGeral,
  registrarResposta,
} from "./livros-pratica.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function renderSessao(dados, metaPratica) {
  const r = resumoSessao(dados, metaPratica);
  const passosHtml = r.passos
    .map(
      (p) =>
        `<li class="estudo-passo ${p.ok ? "feito" : ""}"><span class="estudo-passo-icone">${p.ok ? "✓" : "○"}</span>${p.rotulo}</li>`
    )
    .join("");

  return `
    <section class="estudo-bloco estudo-sessao">
      <h2 class="bloco-titulo">Sessão de hoje</h2>
      <p class="bloco-apoio">${r.feitos}/${r.total} etapas — vídeo, áudio, questões e falar em voz alta.</p>
      <ul class="estudo-passos">${passosHtml}</ul>
      <div class="estudo-sessao-botoes">
        <button type="button" class="botao-secundario" data-estudo-aba="assistir">▶ Assistir</button>
        <button type="button" class="botao-secundario" data-estudo-aba="ouvir">🎧 Ouvir</button>
        <button type="button" class="botao-secundario" data-estudo-aba="praticar">📖 Praticar</button>
        <button type="button" class="botao-secundario" data-estudo-aba="falar">🗣️ Falar</button>
      </div>
    </section>`;
}

function renderFormLink(placeholder) {
  return `
    <form class="estudo-form-link" data-estudo-form="link">
      <input type="text" name="titulo" class="campo-opcao" placeholder="Nome (ex.: Aula de inglês)" maxlength="60" />
      <input type="url" name="url" class="campo-opcao" placeholder="${esc(placeholder)}" required />
      <button type="submit" class="botao-secundario">Salvar link</button>
    </form>`;
}

function renderListaLinks(links, ativoId, filtro) {
  if (!links.length) {
    return `<p class="estudo-vazio">Nenhum link ainda. Cole um URL do YouTube, Spotify ou arquivo de áudio (.mp3).</p>`;
  }
  return `<ul class="estudo-links">
    ${links
      .map(
        (l) => `
      <li class="estudo-link-item ${l.id === ativoId ? "ativo" : ""}">
        <button type="button" class="estudo-link-btn" data-estudo-link="${l.id}">
          <span class="estudo-link-tipo">${l.tipo === "video" ? "▶" : "🎧"}</span>
          <span class="estudo-link-titulo">${esc(l.titulo)}</span>
        </button>
        <button type="button" class="estudo-link-remover" data-estudo-remover="${l.id}" aria-label="Remover">×</button>
      </li>`
      )
      .join("")}
  </ul>`;
}

function renderAssistir(dados) {
  const links = linksPorTipo(dados, "video");
  const ativo = linkAtivo(dados);
  const parsed = ativo ? parseMediaUrl(ativo.url) : null;
  const player = ativo && ativo.tipo === "video" ? htmlPlayer(parsed) : "";

  return `
    <section class="estudo-bloco">
      <h2 class="bloco-titulo">Assistir</h2>
      <p class="bloco-apoio">Vídeos do YouTube aqui dentro — sem sair do app.</p>
      ${player}
      ${renderListaLinks(links, dados.linkAtivoId, "video")}
      ${renderFormLink("https://youtube.com/watch?v=...")}
      <div class="estudo-acoes-timer">
        <button type="button" class="botao-secundario" data-estudo-timer="15">Timer 15 min</button>
        <button type="button" class="botao-texto" data-estudo-marcar="assistir">Marcar como feito ✓</button>
      </div>
    </section>`;
}

function renderOuvir(dados) {
  const links = linksPorTipo(dados, "audio");
  const ativo = links.find((l) => l.id === dados.linkAtivoId) || links[0];
  const parsed = ativo ? parseMediaUrl(ativo.url) : null;
  const player =
    ativo && (ativo.tipo === "audio" || ativo.tipo === "podcast") ? htmlPlayer(parsed) : "";

  return `
    <section class="estudo-bloco">
      <h2 class="bloco-titulo">Ouvir</h2>
      <p class="bloco-apoio">Podcast, Spotify ou arquivo de áudio (.mp3).</p>
      ${player}
      ${renderListaLinks(links, ativo?.id, "audio")}
      ${renderFormLink("https://open.spotify.com/episode/... ou link .mp3")}
      <div class="estudo-acoes-timer">
        <button type="button" class="botao-secundario" data-estudo-timer="10">Timer 10 min</button>
        <button type="button" class="botao-texto" data-estudo-marcar="ouvir">Marcar como feito ✓</button>
      </div>
    </section>`;
}

function renderPraticar(chaveDia) {
  const progresso = carregarProgressoLivro();
  const livro = livroAtivo(progresso.livroId);
  const g = progressoGeral(livro, progresso);

  if (metaDiariaAtingida(progresso, chaveDia)) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar ✓</h2>
        <p class="bloco-apoio">Meta de hoje feita (${META_PERGUNTAS_DIA} questões). Livro: ${g.pct}%.</p>
      </section>`;
  }

  const mod = moduloAtual(livro, progresso);
  const pergunta = perguntaAtual(livro, progresso);
  if (!pergunta) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar — completo!</h2>
        <p class="bloco-apoio">Você terminou ${esc(livro.titulo)}.</p>
      </section>`;
  }

  const hojeCount = progresso.ultimoDia === chaveDia ? progresso.perguntasHoje : 0;

  let interacao = "";
  if (pergunta.tipo === "reflexao") {
    interacao = `
      <textarea class="pratica-reflexao nota-campo estudo-pratica-input" rows="2" placeholder="Sua resposta..."></textarea>
      <button type="button" class="botao-secundario estudo-pratica-confirmar">Pronto</button>`;
  } else {
    interacao = `
      <div class="pratica-opcoes">
        ${pergunta.opcoes
          .map(
            (op, i) =>
              `<button type="button" class="botao-secundario pratica-opcao estudo-pratica-opcao" data-indice="${i}">${esc(op)}</button>`
          )
          .join("")}
      </div>`;
  }

  return `
    <section class="estudo-bloco estudo-pratica" data-estudo-pratica="1">
      <h2 class="bloco-titulo">Praticar</h2>
      <p class="pratica-livro-nome">${esc(livro.titulo)}</p>
      <p class="pratica-modulo">${esc(mod.nome)}</p>
      <p class="pratica-ideia">${esc(mod.ideia)}</p>
      <p class="pratica-meta">Hoje: ${hojeCount}/${META_PERGUNTAS_DIA} · Livro: ${g.pct}%</p>
      <p class="pratica-pergunta">${esc(pergunta.pergunta)}</p>
      ${interacao}
    </section>`;
}

function renderFalar(dados) {
  const p = palavraAtual(dados);
  if (!p) {
    return `<section class="estudo-bloco"><p class="estudo-vazio">Adicione palavras abaixo.</p></section>`;
  }

  const frase = p.frase || `I use the word "${p.en}" today.`;

  return `
    <section class="estudo-bloco estudo-falar">
      <h2 class="bloco-titulo">Falar em voz alta</h2>
      <p class="bloco-apoio">Ouça → repita 3 vezes → use numa frase. Palavra ${p.indice + 1}/${p.total}.</p>
      <div class="estudo-vocab-card">
        <p class="estudo-vocab-en">${esc(p.en)}</p>
        <p class="estudo-vocab-pt">${esc(p.pt)}</p>
        <p class="estudo-vocab-frase">"${esc(frase)}"</p>
      </div>
      <div class="estudo-falar-botoes">
        <button type="button" class="botao-secundario" data-estudo-ouvir="en">🔊 Ouvir palavra</button>
        <button type="button" class="botao-secundario" data-estudo-ouvir="frase">🔊 Ouvir frase</button>
        <button type="button" class="botao-secundario" data-estudo-proxima-palavra">Próxima →</button>
      </div>
      <p class="estudo-falar-dica">Diga em voz alta antes de passar. Ninguém precisa ouvir — o importante é sua boca fazer o movimento.</p>
      <form class="estudo-form-vocab" data-estudo-form="vocab">
        <p class="estudo-form-rotulo">Adicionar palavra sua</p>
        <input type="text" name="en" class="campo-opcao" placeholder="Inglês" maxlength="40" />
        <input type="text" name="pt" class="campo-opcao" placeholder="Português" maxlength="40" />
        <input type="text" name="frase" class="campo-opcao" placeholder="Frase (opcional)" maxlength="120" />
        <button type="submit" class="botao-secundario">Adicionar</button>
      </form>
    </section>`;
}

const ABAS = [
  { id: "sessao", rotulo: "Início", icone: "🏠" },
  { id: "assistir", rotulo: "Assistir", icone: "▶" },
  { id: "ouvir", rotulo: "Ouvir", icone: "🎧" },
  { id: "praticar", rotulo: "Praticar", icone: "📖" },
  { id: "falar", rotulo: "Falar", icone: "🗣️" },
];

export function renderPainelEstudo(dados, chaveDia) {
  const aba = dados.abaAtiva || "sessao";
  const nav = ABAS.map(
    (a) =>
      `<button type="button" class="estudo-nav-item ${aba === a.id ? "ativo" : ""}" data-estudo-aba="${a.id}">${a.icone} ${a.rotulo}</button>`
  ).join("");

  let conteudo = "";
  if (aba === "sessao") conteudo = renderSessao(dados, META_PERGUNTAS_DIA);
  else if (aba === "assistir") conteudo = renderAssistir(dados);
  else if (aba === "ouvir") conteudo = renderOuvir(dados);
  else if (aba === "praticar") conteudo = renderPraticar(chaveDia);
  else if (aba === "falar") conteudo = renderFalar(dados);

  return `
    <nav class="estudo-nav" aria-label="Modos de estudo">${nav}</nav>
    <div class="estudo-conteudo">${conteudo}</div>`;
}

export function renderResumoHoje(dados, chaveDia) {
  const r = resumoSessao(dados, META_PERGUNTAS_DIA);
  const progresso = carregarProgressoLivro();
  const praticaOk = metaDiariaAtingida(progresso, chaveDia);
  const pct = Math.round((r.feitos / r.total) * 100);

  return `
    <h2 class="bloco-titulo">Estudo de hoje</h2>
    <p class="bloco-apoio">Vídeo, áudio, questões e falar — tudo na aba <strong>Estudo</strong>.</p>
    <div class="estudo-resumo-barra"><div class="estudo-resumo-fill" style="width:${pct}%"></div></div>
    <p class="estudo-resumo-texto">${r.feitos}/${r.total} etapas · Prática: ${praticaOk ? "✓" : "pendente"}</p>
    <button type="button" class="botao-secundario estudo-ir-aba" data-ir-painel="estudo">Abrir Estudo →</button>`;
}

export function ligarPainelEstudo(root, getState, setState, opts = {}) {
  if (!root || root.dataset.ligado === "1") return;
  root.dataset.ligado = "1";

  const { chaveDia, onTimer, onAtualizarHoje, mostrarFeedback } = opts;

  root.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-estudo-aba], [data-estudo-link], [data-estudo-remover], [data-estudo-timer], [data-estudo-marcar], [data-estudo-ouvir], [data-estudo-proxima-palavra], .estudo-pratica-confirmar, .estudo-pratica-opcao, [data-ir-painel]");

    if (!alvo) return;

    if (alvo.dataset.irPainel === "estudo") {
      onAtualizarHoje?.("estudo");
      return;
    }

    let dados = getState();

    if (alvo.dataset.estudoAba) {
      setState({ ...dados, abaAtiva: alvo.dataset.estudoAba });
      return;
    }

    if (alvo.dataset.estudoLink) {
      setState({ ...dados, linkAtivoId: alvo.dataset.estudoLink });
      return;
    }

    if (alvo.dataset.estudoRemover) {
      setState(removerLink(dados, alvo.dataset.estudoRemover));
      return;
    }

    if (alvo.dataset.estudoTimer) {
      onTimer?.(Number(alvo.dataset.estudoTimer));
      return;
    }

    if (alvo.dataset.estudoMarcar) {
      setState(marcarSessao(dados, alvo.dataset.estudoMarcar));
      mostrarFeedback?.("Marcado! Boa sessão.");
      return;
    }

    if (alvo.dataset.estudoOuvir) {
      const p = palavraAtual(dados);
      if (!p) return;
      const texto = alvo.dataset.estudoOuvir === "frase" ? p.frase || p.en : p.en;
      if (!falarTexto(texto)) mostrarFeedback?.("Seu navegador não suporta voz sintética.");
      return;
    }

    if (alvo.closest("[data-estudo-proxima-palavra]")) {
      const prox = avancarPalavra(dados);
      const comFalar = marcarSessao(prox, "falar", (prox.sessao.falar || 0) + 1);
      setState(comFalar);
      return;
    }

    if (alvo.classList.contains("estudo-pratica-confirmar")) {
      confirmarPratica(root, chaveDia(), mostrarFeedback, getState, setState, onAtualizarHoje);
      return;
    }

    if (alvo.classList.contains("estudo-pratica-opcao")) {
      confirmarPratica(root, chaveDia(), mostrarFeedback, getState, setState, onAtualizarHoje, Number(alvo.dataset.indice));
    }
  });

  root.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const form = evento.target.closest("[data-estudo-form]");
    if (!form) return;

    const dados = getState();
    const fd = new FormData(form);

    if (form.dataset.estudoForm === "link") {
      const titulo = fd.get("titulo");
      const url = fd.get("url");
      if (!url) return;
      const novo = adicionarLink(dados, titulo, url);
      const parsed = parseMediaUrl(url);
      const aba =
        parsed?.tipo === "youtube" ? "assistir" : parsed?.tipo === "spotify" || parsed?.tipo === "audio" ? "ouvir" : dados.abaAtiva;
      setState({ ...novo, abaAtiva: aba });
      form.reset();
      mostrarFeedback?.("Link salvo!");
      return;
    }

    if (form.dataset.estudoForm === "vocab") {
      const novo = adicionarPalavra(dados, fd.get("en"), fd.get("pt"), fd.get("frase"));
      setState(novo);
      form.reset();
      mostrarFeedback?.("Palavra adicionada!");
    }
  });
}

function confirmarPratica(root, chave, mostrarFeedback, getState, setState, onAtualizarHoje, indiceEscolhido) {
  const progresso = carregarProgressoLivro();
  const livro = livroAtivo(progresso.livroId);
  const pergunta = perguntaAtual(livro, progresso);
  if (!pergunta) return;

  if (pergunta.tipo !== "reflexao" && indiceEscolhido === undefined) return;

  if (pergunta.tipo === "reflexao") {
    const texto = root.querySelector(".estudo-pratica-input")?.value?.trim();
    if (!texto) {
      mostrarFeedback?.("Escreva algo — pode ser curto.");
      return;
    }
    mostrarFeedback?.(pergunta.dica);
  } else if (indiceEscolhido !== undefined) {
    const certa = pergunta.correta === indiceEscolhido;
    mostrarFeedback?.(
      certa ? `Certo! ${pergunta.dica}` : pergunta.dica,
      certa ? "ok" : "aviso"
    );
  }

  registrarResposta(progresso, livro, pergunta.id, chave);

  let dados = getState();
  const praticar = (dados.sessao?.praticar || 0) + 1;
  dados = marcarSessao({ ...dados, sessao: { ...dados.sessao, data: chave, praticar } }, "praticar", praticar);
  setState(dados);
  onAtualizarHoje?.();
}
