// UI da aba Estudo — renderização e eventos

import {
  adicionarLink,
  adicionarLinkSugerido,
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
  escutarPronuncia,
  pararEscuta,
  suportaReconhecimentoVoz,
} from "./estudo-fala.js";
import {
  listarVozesUI,
  rotuloVozAtual,
  salvarVozPreferida,
  vozSalva,
} from "./voz-sintese.js";
import {
  buscarLivros,
  carregarProgressoLivro,
  CATEGORIAS_LIVRO,
  livroAtivo,
  META_PERGUNTAS_DIA,
  metaDiariaAtingida,
  moduloAtual,
  perguntaAtual,
  progressoGeral,
  registrarResposta,
  selecionarLivro,
} from "./livros-pratica.js";
import {
  linkSugeridoPorId,
  linksSugeridosPorTipo,
  urlJaSalva,
} from "./estudo-links-sugeridos.js";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

/** Título + autor — exibido em todo o app de estudo */
function cabecalhoLivro(livro, { destaque = false } = {}) {
  const cls = destaque ? "estudo-livro-cabecalho estudo-livro-cabecalho-destaque" : "estudo-livro-cabecalho";
  const autor = livro.autor ? `<p class="estudo-livro-autor"><span class="estudo-por">por</span> ${esc(livro.autor)}</p>` : "";
  return `
    <div class="${cls}">
      <p class="estudo-livro-titulo">${esc(livro.titulo)}</p>
      ${autor}
    </div>`;
}

function renderSessao(dados, metaPratica) {
  const r = resumoSessao(dados, metaPratica);
  const livro = livroAtivo();
  const passosHtml = r.passos
    .map(
      (p) =>
        `<li class="estudo-passo ${p.ok ? "feito" : ""}"><span class="estudo-passo-icone">${p.ok ? "✓" : "○"}</span>${p.rotulo}</li>`
    )
    .join("");

  return `
    <section class="estudo-bloco estudo-sessao">
      <h2 class="bloco-titulo">Sessão de hoje</h2>
      ${cabecalhoLivro(livro, { destaque: true })}
      <p class="bloco-apoio">${r.feitos}/${r.total} etapas — vídeo, áudio, questões e falar.</p>
      <ul class="estudo-passos">${passosHtml}</ul>
      <div class="estudo-sessao-botoes">
        <button type="button" class="botao-secundario" data-estudo-aba="livros">📚 Livros</button>
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

function renderSugestoesLinks(dados, tipo) {
  const livro = livroAtivo();
  const todas = linksSugeridosPorTipo(tipo, livro.id).filter((s) => !urlJaSalva(dados, s.url));
  if (!todas.length) return "";

  const doLivro = todas.filter((s) => s.livroId === livro.id);
  const criadores = todas.filter((s) => !s.livroId);
  const icone = tipo === "video" ? "▶" : "🎧";

  const bloco = (titulo, itens) => {
    if (!itens.length) return "";
    return `
      <p class="estudo-form-rotulo">${esc(titulo)}</p>
      <ul class="estudo-sugestoes-lista">
        ${itens
          .map(
            (s) => `
          <li>
            <button type="button" class="estudo-sugestao-btn" data-estudo-sugerir="${s.id}">
              <span class="estudo-sugestao-icone">${icone}</span>
              <span class="estudo-sugestao-titulo">${esc(s.titulo)}</span>
              <span class="estudo-sugestao-add">+ Adicionar</span>
            </button>
          </li>`
          )
          .join("")}
      </ul>`;
  };

  return `
    <div class="estudo-sugestoes">
      ${bloco(`Sugestões para ${livro.titulo}`, doLivro)}
      ${bloco("Canais favoritos", criadores)}
    </div>`;
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
      ${renderSugestoesLinks(dados, "video")}
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
      ${renderSugestoesLinks(dados, "audio")}
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
  const livro = livroAtivo();
  const g = progressoGeral(livro, progresso);

  if (metaDiariaAtingida(progresso, chaveDia)) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar ✓</h2>
        ${cabecalhoLivro(livro, { destaque: true })}
        <p class="bloco-apoio">Meta de hoje feita (${META_PERGUNTAS_DIA} questões). Progresso: ${g.pct}%.</p>
      </section>`;
  }

  const mod = moduloAtual(livro, progresso);
  const pergunta = perguntaAtual(livro, progresso);
  if (!pergunta) {
    return `
      <section class="estudo-bloco estudo-pratica">
        <h2 class="bloco-titulo">Praticar — completo!</h2>
        ${cabecalhoLivro(livro, { destaque: true })}
        <p class="bloco-apoio">Você terminou todos os módulos desta obra.</p>
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
      <p class="estudo-pratica-trocar">
        <button type="button" class="botao-texto" data-estudo-aba="livros">Trocar livro →</button>
      </p>
      ${cabecalhoLivro(livro, { destaque: true })}
      <p class="pratica-modulo">${esc(mod.nome)}</p>
      <p class="pratica-ideia">${esc(mod.ideia)}</p>
      <p class="pratica-meta">Hoje: ${hojeCount}/${META_PERGUNTAS_DIA} · Livro: ${g.pct}%</p>
      <p class="pratica-pergunta">${esc(pergunta.pergunta)}</p>
      ${interacao}
    </section>`;
}

function alvoElemento(evento) {
  const t = evento.target;
  if (t instanceof Element) return t;
  if (t?.parentElement instanceof Element) return t.parentElement;
  return null;
}

function renderFalar(dados) {
  const p = palavraAtual(dados);
  if (!p) {
    return `<section class="estudo-bloco"><p class="estudo-vazio">Adicione palavras abaixo.</p></section>`;
  }

  const frase = p.frase || `I use the word "${p.en}" today.`;
  const fb = dados.falaFeedback;
  let feedbackHtml = "";
  if (fb?.mensagem) {
    const cls = fb.status === "ouvindo" ? "ouvindo" : fb.ok ? "ok" : "erro";
    feedbackHtml = `<p class="estudo-fala-feedback ${cls}" role="status">${esc(fb.mensagem)}</p>`;
  } else {
    feedbackHtml = `<p class="estudo-fala-feedback" hidden role="status"></p>`;
  }

  const avisoMic = suportaReconhecimentoVoz()
    ? `<p class="estudo-falar-mic-aviso">Toque no microfone, permita o acesso e fale em inglês. Funciona melhor no Chrome.</p>`
    : `<p class="estudo-falar-mic-aviso estudo-falar-mic-off">Reconhecimento de voz indisponível neste navegador — use Chrome no celular.</p>`;

  const botoesMic = suportaReconhecimentoVoz()
    ? `
        <button type="button" class="botao-secundario estudo-btn-mic" data-estudo-mic="en">🎤 Falar palavra</button>
        <button type="button" class="botao-secundario estudo-btn-mic" data-estudo-mic="frase">🎤 Falar frase</button>`
    : "";

  const vozesEn = listarVozesUI("en-US");
  const vozAtual = vozSalva("en-US");
  const opcoesVoz =
    vozesEn.length > 0
      ? vozesEn
          .map(
            (v) =>
              `<option value="${esc(v.uri)}" ${vozAtual === v.uri ? "selected" : ""}>${esc(v.nome)}</option>`
          )
          .join("")
      : "";

  const seletorVoz =
    vozesEn.length > 0
      ? `
      <div class="estudo-voz-linha">
        <label class="estudo-form-rotulo" for="estudo-voz-en">Voz ao ouvir (inglês)</label>
        <select id="estudo-voz-en" class="campo-opcao" data-estudo-voz="en-US" aria-label="Voz em inglês">
          <option value="">Automática — ${esc(rotuloVozAtual("en-US"))}</option>
          ${opcoesVoz}
        </select>
        <p class="estudo-voz-dica">Só vozes 🇺🇸 americanas ou 🇬🇧 britânicas — pra não sair “pro a c tive”. Use <strong>Google US English</strong> no Chrome.</p>
      </div>`
      : "";

  return `
    <section class="estudo-bloco estudo-falar">
      <h2 class="bloco-titulo">Falar em voz alta</h2>
      <p class="bloco-apoio">Ouça → fale no microfone → veja se acertou. Palavra ${p.indice + 1}/${p.total}.</p>
      <div class="estudo-vocab-card">
        <p class="estudo-vocab-en">${esc(p.en)}</p>
        <p class="estudo-vocab-pt">${esc(p.pt)}</p>
        <p class="estudo-vocab-frase">"${esc(frase)}"</p>
      </div>
      ${feedbackHtml}
      <div class="estudo-falar-botoes">
        <button type="button" class="botao-secundario" data-estudo-ouvir="en">🔊 Ouvir palavra</button>
        <button type="button" class="botao-secundario" data-estudo-ouvir="frase">🔊 Ouvir frase</button>
        ${botoesMic}
        <button type="button" class="botao-secundario estudo-btn-proxima" data-estudo-acao="proxima">Próxima →</button>
      </div>
      ${avisoMic}
      ${seletorVoz}
      <form class="estudo-form-vocab" data-estudo-form="vocab">
        <p class="estudo-form-rotulo">Adicionar palavra sua</p>
        <input type="text" name="en" class="campo-opcao" placeholder="Inglês" maxlength="40" />
        <input type="text" name="pt" class="campo-opcao" placeholder="Português" maxlength="40" />
        <input type="text" name="frase" class="campo-opcao" placeholder="Frase (opcional)" maxlength="120" />
        <button type="submit" class="botao-secundario">Adicionar</button>
      </form>
    </section>`;
}

function renderLivros(dados) {
  const progresso = carregarProgressoLivro();
  const ativo = livroAtivo();
  const g = progressoGeral(ativo, progresso);
  const termo = dados.buscaLivro || "";
  const cat = dados.categoriaLivro || "todos";
  const resultados = buscarLivros(termo, cat);

  const chips = CATEGORIAS_LIVRO.map(
    (c) =>
      `<button type="button" class="estudo-cat-chip ${cat === c.id ? "ativo" : ""}" data-estudo-cat="${c.id}">${c.rotulo}</button>`
  ).join("");

  const lista =
    resultados.length === 0
      ? `<p class="estudo-vazio">Nenhum livro encontrado. Tente: <strong>nietzsche</strong>, <strong>platão</strong>, <strong>schopenhauer</strong>.</p>`
      : `<ul class="estudo-livros-lista">
    ${resultados
      .map((livro) => {
        const prog = progressoGeral(livro, progresso);
        const selecionado = livro.id === ativo.id;
        return `
      <li class="estudo-livro-card ${selecionado ? "ativo" : ""}">
        <div class="estudo-livro-info">
          ${cabecalhoLivro(livro)}
          <p class="estudo-livro-sub">${esc(livro.subtitulo)}</p>
          <p class="estudo-livro-tags">${(livro.tags || []).map((t) => `#${esc(t)}`).join(" ")}</p>
          ${prog.pct > 0 ? `<p class="estudo-livro-prog">Progresso: ${prog.pct}%</p>` : ""}
        </div>
        <button type="button" class="botao-secundario" data-estudo-selecionar-livro="${livro.id}">
          ${selecionado ? "Estudando ✓" : "Estudar este"}
        </button>
      </li>`;
      })
      .join("")}
  </ul>`;

  return `
    <section class="estudo-bloco estudo-biblioteca">
      <h2 class="bloco-titulo">Biblioteca</h2>
      <p class="bloco-apoio">Busque um livro, escolha e pratique com questões — sem precisar ler capítulo por capítulo.</p>
      <div class="estudo-lendo-agora">
        <span class="estudo-lendo-rotulo">Lendo agora</span>
        ${cabecalhoLivro(ativo, { destaque: true })}
        <span class="estudo-lendo-pct">${g.pct}% do estudo</span>
      </div>
      <input
        type="search"
        class="campo-opcao estudo-busca-livro"
        data-estudo-busca-livro
        placeholder="Buscar: nietzsche, platão, schopenhauer, camus…"
        value="${esc(termo)}"
        maxlength="80"
      />
      <div class="estudo-categorias">${chips}</div>
      ${lista}
    </section>`;
}

const ABAS = [
  { id: "sessao", rotulo: "Início", icone: "🏠" },
  { id: "livros", rotulo: "Livros", icone: "📚" },
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
  else if (aba === "livros") conteudo = renderLivros(dados);
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
  const livro = livroAtivo();
  const praticaOk = metaDiariaAtingida(progresso, chaveDia);
  const pct = Math.round((r.feitos / r.total) * 100);

  return `
    <h2 class="bloco-titulo">Estudo de hoje</h2>
    ${cabecalhoLivro(livro, { destaque: true })}
    <p class="bloco-apoio">Vídeo, áudio, questões e falar em voz alta.</p>
    <div class="estudo-resumo-barra"><div class="estudo-resumo-fill" style="width:${pct}%"></div></div>
    <p class="estudo-resumo-texto">${r.feitos}/${r.total} etapas · Prática: ${praticaOk ? "✓" : "pendente"}</p>
    <button type="button" class="botao-secundario estudo-ir-aba" data-ir-painel="estudo">Abrir Estudo →</button>`;
}

export function ligarPainelEstudo(root, getState, setState, opts = {}) {
  if (!root || root.dataset.estudoLigado === "1") return;
  root.dataset.estudoLigado = "1";

  const { chaveDia, onTimer, onAtualizarHoje, mostrarFeedback } = opts;

  root.addEventListener("click", (evento) => {
    const origem = alvoElemento(evento);
    if (!origem) return;

    const alvo = origem.closest(
      "[data-estudo-acao], [data-estudo-aba], [data-estudo-link], [data-estudo-remover], [data-estudo-sugerir], [data-estudo-timer], [data-estudo-marcar], [data-estudo-ouvir], [data-estudo-mic], [data-estudo-selecionar-livro], [data-estudo-cat], .estudo-pratica-confirmar, .estudo-pratica-opcao, [data-ir-painel]"
    );

    if (!alvo) return;

    if (alvo.dataset.irPainel === "estudo") {
      onAtualizarHoje?.("estudo");
      return;
    }

    let dados = getState();

    if (alvo.dataset.estudoAcao === "proxima") {
      pararEscuta();
      const prox = avancarPalavra(getState());
      setState({ ...prox, abaAtiva: "falar", falaFeedback: null });
      onAtualizarHoje?.();
      return;
    }

    if (alvo.dataset.estudoAba) {
      pararEscuta();
      setState({ ...dados, abaAtiva: alvo.dataset.estudoAba, falaFeedback: null });
      return;
    }

    if (alvo.dataset.estudoSelecionarLivro) {
      selecionarLivro(alvo.dataset.estudoSelecionarLivro);
      setState({ ...dados, abaAtiva: "praticar" });
      mostrarFeedback?.("Livro selecionado! Vá em Praticar.");
      onAtualizarHoje?.();
      return;
    }

    if (alvo.dataset.estudoCat) {
      setState({ ...dados, categoriaLivro: alvo.dataset.estudoCat });
      return;
    }

    if (alvo.dataset.estudoSugerir) {
      const sug = linkSugeridoPorId(alvo.dataset.estudoSugerir);
      if (!sug) return;
      const novo = adicionarLinkSugerido(dados, sug);
      const aba = sug.tipo === "video" ? "assistir" : "ouvir";
      setState({ ...novo, abaAtiva: aba });
      mostrarFeedback?.("Link adicionado! Toque nele para abrir.");
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
      if (!falarTexto(texto, { lang: "en-US", tipo: "en" })) {
        mostrarFeedback?.("Seu navegador não suporta voz sintética.");
      }
      return;
    }

    if (alvo.dataset.estudoMic) {
      const p = palavraAtual(dados);
      if (!p) return;
      const ehFrase = alvo.dataset.estudoMic === "frase";
      const esperado = ehFrase ? p.frase || p.en : p.en;

      setState({
        ...dados,
        falaFeedback: { status: "ouvindo", mensagem: "Preparando microfone…", ok: null },
      });

      escutarPronuncia(esperado, {
        frase: ehFrase,
        onStatus: (msg) => {
          setState({ ...getState(), falaFeedback: { status: "ouvindo", mensagem: msg, ok: null } });
        },
        onError: (msg) => {
          setState({ ...getState(), falaFeedback: { status: "erro", mensagem: msg, ok: false } });
        },
        onResult: (resultado) => {
          let atual = getState();
          if (resultado.ok) {
            const falar = (atual.sessao?.falar || 0) + 1;
            atual = marcarSessao(atual, "falar", falar);
          }
          setState({
            ...atual,
            falaFeedback: {
              status: resultado.ok ? "ok" : "erro",
              mensagem: resultado.mensagem,
              ok: resultado.ok,
            },
          });
          onAtualizarHoje?.();
        },
      });
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

  root.addEventListener("change", (evento) => {
    const sel = evento.target.closest("[data-estudo-voz]");
    if (!sel) return;
    salvarVozPreferida(sel.dataset.estudoVoz || "en-US", sel.value);
    const dados = getState();
    setState({ ...dados, abaAtiva: "falar" });
    mostrarFeedback?.(sel.value ? "Voz salva!" : "Voz automática ativada.");
  });

  root.addEventListener("input", (evento) => {
    const campo = evento.target.closest("[data-estudo-busca-livro]");
    if (!campo) return;
    const dados = getState();
    setState({ ...dados, buscaLivro: campo.value });
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
  const livro = livroAtivo();
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
