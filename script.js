// ---- Referências aos elementos da página (DOM) ----
const entradaHabito = document.getElementById("entrada-habito");
const entradaCategoria = document.getElementById("entrada-categoria");
const entradaMeta = document.getElementById("entrada-meta");
const entradaHorario = document.getElementById("entrada-horario");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHabitos = document.getElementById("lista-habitos");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorFeitos = document.getElementById("contador-feitos");
const contadorTotal = document.getElementById("contador-total");
const barraProgresso = document.getElementById("barra-progresso");
const dataHoje = document.getElementById("data-hoje");
const graficoBarras = document.getElementById("grafico-barras");
const botaoTema = document.getElementById("botao-tema");
const filtros = document.getElementById("filtros");
const notaHoje = document.getElementById("nota-hoje");
const calendarioGrade = document.getElementById("calendario-grade");
const botaoExportar = document.getElementById("botao-exportar");
const entradaImportar = document.getElementById("entrada-importar");
const mascote = document.getElementById("mascote");
const listaMetasSemana = document.getElementById("lista-metas-semana");
const cardsInsights = document.getElementById("cards-insights");
const navPaineis = document.querySelector(".nav-paineis");
const diarioData = document.getElementById("diario-data");
const diarioTexto = document.getElementById("diario-texto");
const diarioLegenda = document.getElementById("diario-data-legenda");
const diarioHojeBotao = document.getElementById("diario-hoje");
const listaDiario = document.getElementById("lista-diario");
const diarioVazio = document.getElementById("diario-vazio");

// ---- Estado (a "fonte da verdade" do app) ----
let habitos = [];
let notas = {};
let filtroCategoria = "Todas";
let idArrastando = null;
let painelAtivo = "hoje";
let dataDiarioSelecionada = hojeStr();

// ============ DATAS (funções auxiliares) ============
function chaveData(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function hojeStr() {
  return chaveData(new Date());
}

// Converte "2026-07-18" em um objeto Date no fuso local
function parseData(str) {
  const [ano, mes, dia] = str.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

// Diferença em dias entre duas datas (texto)
function diffEmDias(strA, strB) {
  const ms = parseData(strB) - parseData(strA);
  return Math.round(ms / 86400000);
}

// Segunda-feira da semana atual
function inicioDaSemana() {
  const d = new Date();
  const diaDaSemana = (d.getDay() + 6) % 7; // transforma domingo(0) em 6
  d.setDate(d.getDate() - diaDaSemana);
  d.setHours(0, 0, 0, 0);
  return d;
}

function mostrarData() {
  const opcoes = { weekday: "long", day: "numeric", month: "long" };
  dataHoje.textContent = new Date().toLocaleDateString("pt-BR", opcoes);
}

// ============ TEMA (claro/escuro) ============
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  botaoTema.textContent = tema === "escuro" ? "☀" : "☾";
  localStorage.setItem("tema", tema);
}

function alternarTema() {
  const atual = document.documentElement.getAttribute("data-tema");
  aplicarTema(atual === "escuro" ? "claro" : "escuro");
}

// ============ PERSISTÊNCIA (salvar/carregar) ============
function salvar() {
  localStorage.setItem("meus-habitos", JSON.stringify(habitos));
}

function salvarNotas() {
  localStorage.setItem("notas-diarias", JSON.stringify(notas));
}

function definirNota(chave, texto) {
  const limpo = texto.trim();
  if (limpo) {
    notas[chave] = texto;
  } else {
    delete notas[chave];
  }
  salvarNotas();
  if (chave === hojeStr()) notaHoje.value = texto;
  if (chave === dataDiarioSelecionada) diarioTexto.value = texto;
  desenharListaDiario();
}

function formatarDataBR(chave) {
  const data = parseData(chave);
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarDataCurtaBR(chave) {
  const [ano, mes, dia] = chave.split("-");
  return `${dia}/${mes}/${ano}`;
}

function carregarNotaDiario(chave) {
  dataDiarioSelecionada = chave;
  diarioData.value = chave;
  diarioTexto.value = notas[chave] || "";
  const ehHoje = chave === hojeStr();
  diarioLegenda.textContent = ehHoje
    ? `Hoje — ${formatarDataBR(chave)}`
    : formatarDataBR(chave);
  desenharListaDiario();
}

function desenharListaDiario() {
  const chaves = Object.keys(notas)
    .filter((chave) => (notas[chave] || "").trim())
    .sort()
    .reverse();

  listaDiario.innerHTML = "";
  diarioVazio.hidden = chaves.length > 0;

  chaves.forEach((chave) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className =
      "entrada-diario" + (chave === dataDiarioSelecionada ? " ativa" : "");

    const dataEl = document.createElement("span");
    dataEl.className = "entrada-diario-data";
    dataEl.textContent =
      formatarDataCurtaBR(chave) + (chave === hojeStr() ? " · hoje" : "");

    const preview = document.createElement("span");
    preview.className = "entrada-diario-preview";
    preview.textContent = notas[chave].trim();

    botao.appendChild(dataEl);
    botao.appendChild(preview);
    botao.addEventListener("click", () => carregarNotaDiario(chave));
    listaDiario.appendChild(botao);
  });
}

function carregar() {
  const salvos = localStorage.getItem("meus-habitos");
  if (salvos) {
    const dados = JSON.parse(salvos);
    // Preenche campos que talvez não existam em dados antigos (migração)
    habitos = dados.map((h) => ({
      id: h.id,
      nome: h.nome,
      categoria: h.categoria || "Geral",
      metaSemanal: h.metaSemanal || 7,
      horario: h.horario || "",
      historico: h.historico || (h.feito ? { [hojeStr()]: true } : {}),
    }));
  }

  const notasSalvas = localStorage.getItem("notas-diarias");
  if (notasSalvas) notas = JSON.parse(notasSalvas);
}

// ============ CÁLCULOS ============
function estaFeitoHoje(habito) {
  return habito.historico[hojeStr()] === true;
}

// Sequência atual: dias seguidos cumpridos, terminando hoje ou ontem
function calcularStreak(habito) {
  let streak = 0;
  const dia = new Date();
  if (!habito.historico[chaveData(dia)]) {
    dia.setDate(dia.getDate() - 1);
  }
  while (habito.historico[chaveData(dia)]) {
    streak++;
    dia.setDate(dia.getDate() - 1);
  }
  return streak;
}

// Recorde: a maior sequência de dias seguidos já registrada
function calcularRecorde(habito) {
  const dias = Object.keys(habito.historico)
    .filter((d) => habito.historico[d])
    .sort();

  let melhor = 0;
  let atual = 0;
  let anterior = null;

  for (const d of dias) {
    if (anterior && diffEmDias(anterior, d) === 1) {
      atual++;
    } else {
      atual = 1;
    }
    if (atual > melhor) melhor = atual;
    anterior = d;
  }
  return melhor;
}

// Um dia "conta" para a chama se pelo menos um hábito foi concluído nele
function diaConcluido(chave) {
  return habitos.some((h) => h.historico[chave]);
}

// Sequência global: dias seguidos com pelo menos um hábito concluído
function streakGlobal() {
  if (habitos.length === 0) return 0;
  let streak = 0;
  const dia = new Date();
  if (!diaConcluido(chaveData(dia))) {
    dia.setDate(dia.getDate() - 1);
  }
  while (diaConcluido(chaveData(dia))) {
    streak++;
    dia.setDate(dia.getDate() - 1);
  }
  return streak;
}

// Quantos dias o hábito foi cumprido dentro da semana atual
function feitosNaSemana(habito) {
  const inicio = inicioDaSemana();
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const dia = new Date(inicio);
    dia.setDate(inicio.getDate() + i);
    if (habito.historico[chaveData(dia)]) total++;
  }
  return total;
}

// ============ AÇÕES ============
function adicionarHabito() {
  const texto = entradaHabito.value.trim();
  if (texto === "") return;

  habitos.push({
    id: Date.now(),
    nome: texto,
    categoria: entradaCategoria.value,
    metaSemanal: Number(entradaMeta.value),
    horario: entradaHorario.value,
    historico: {},
  });

  entradaHabito.value = "";
  entradaHorario.value = "";
  entradaMeta.value = "7";
  entradaCategoria.value = "Geral";
  salvar();
  desenhar();
}

function alternarFeito(id) {
  const hoje = hojeStr();
  habitos = habitos.map((habito) => {
    if (habito.id !== id) return habito;
    const historico = { ...habito.historico };
    if (historico[hoje]) {
      delete historico[hoje];
    } else {
      historico[hoje] = true;
    }
    return { ...habito, historico };
  });
  salvar();
  desenhar();
}

function removerHabito(id) {
  habitos = habitos.filter((habito) => habito.id !== id);
  salvar();
  desenhar();
}

function renomearHabito(id, novoNome) {
  habitos = habitos.map((habito) =>
    habito.id === id ? { ...habito, nome: novoNome } : habito
  );
  salvar();
  desenhar();
}

function reordenar(idOrigem, idDestino) {
  if (idOrigem === null || idOrigem === idDestino) return;
  const de = habitos.findIndex((h) => h.id === idOrigem);
  const para = habitos.findIndex((h) => h.id === idDestino);
  const [movido] = habitos.splice(de, 1);
  habitos.splice(para, 0, movido);
  salvar();
  desenhar();
}

function iniciarEdicao(habito, item, nomeSpan) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "editar-nome";
  input.value = habito.nome;
  input.maxLength = 60;

  let finalizado = false;
  function confirmar() {
    if (finalizado) return;
    finalizado = true;
    const novo = input.value.trim();
    if (novo) {
      renomearHabito(habito.id, novo);
    } else {
      desenhar();
    }
  }

  input.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") confirmar();
    if (evento.key === "Escape") {
      finalizado = true;
      desenhar();
    }
  });
  input.addEventListener("blur", confirmar);

  item.replaceChild(input, nomeSpan);
  input.focus();
  input.select();
}

// ============ EXPORTAR / IMPORTAR ============
function exportarDados() {
  const dados = { versao: 1, habitos, notas };
  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "habitos-backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importarDados(evento) {
  const arquivo = evento.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = () => {
    try {
      const dados = JSON.parse(leitor.result);
      if (!Array.isArray(dados.habitos)) throw new Error("formato inválido");
      if (!confirm("Isso vai substituir seus dados atuais. Continuar?")) return;

      habitos = dados.habitos;
      notas = dados.notas || {};
      salvar();
      salvarNotas();
      carregarNotaHoje();
      carregarNotaDiario(hojeStr());
      desenhar();
    } catch (erro) {
      alert("Arquivo inválido. Escolha um backup exportado por este app.");
    }
  };
  leitor.readAsText(arquivo);
  evento.target.value = ""; // permite importar o mesmo arquivo de novo
}

// ============ RENDERIZAÇÃO (desenhar na tela) ============
function atualizarResumo() {
  const total = habitos.length;
  const feitos = habitos.filter(estaFeitoHoje).length;
  contadorTotal.textContent = total;
  contadorFeitos.textContent = feitos;
  const porcentagem = total === 0 ? 0 : (feitos / total) * 100;
  barraProgresso.style.width = porcentagem + "%";
}

function desenharFiltros() {
  const categorias = ["Todas", ...new Set(habitos.map((h) => h.categoria || "Geral"))];

  // Se a categoria filtrada sumiu (após remover hábitos), volta para "Todas"
  if (!categorias.includes(filtroCategoria)) filtroCategoria = "Todas";

  filtros.innerHTML = "";
  filtros.style.display = habitos.length > 0 ? "flex" : "none";

  categorias.forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (filtroCategoria === cat ? " ativo" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      filtroCategoria = cat;
      desenhar();
    });
    filtros.appendChild(chip);
  });
}

function desenharGrafico() {
  graficoBarras.innerHTML = "";
  const total = habitos.length;

  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    const feitosNoDia = habitos.filter((h) => h.historico[chave]).length;
    const porcentagem = total === 0 ? 0 : (feitosNoDia / total) * 100;

    const coluna = document.createElement("div");
    coluna.className = "grafico-coluna";

    const percentual = document.createElement("span");
    percentual.className = "grafico-percentual";
    percentual.textContent = Math.round(porcentagem) + "%";

    const trilha = document.createElement("div");
    trilha.className = "grafico-trilha";
    const preenchimento = document.createElement("div");
    preenchimento.className = "grafico-preenchimento";
    preenchimento.style.height = porcentagem + "%";
    trilha.appendChild(preenchimento);

    const rotulo = document.createElement("span");
    rotulo.className = "grafico-rotulo";
    rotulo.textContent = dia
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .replace(".", "");

    coluna.appendChild(percentual);
    coluna.appendChild(trilha);
    coluna.appendChild(rotulo);
    graficoBarras.appendChild(coluna);
  }
}

// Traduz uma porcentagem em um "nível" de cor (0 a 4)
function nivelPorPorcentagem(pct) {
  if (pct === 0) return 0;
  if (pct <= 33) return 1;
  if (pct <= 66) return 2;
  if (pct < 100) return 3;
  return 4;
}

function desenharCalendario() {
  calendarioGrade.innerHTML = "";
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const total = habitos.length;

  const primeiroDia = new Date(ano, mes, 1);
  const deslocamento = (primeiroDia.getDay() + 6) % 7; // quantas células vazias antes do dia 1
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < deslocamento; i++) {
    const vazia = document.createElement("div");
    vazia.className = "dia-cel vazia";
    calendarioGrade.appendChild(vazia);
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(ano, mes, dia);
    const chave = chaveData(data);
    const cel = document.createElement("div");
    cel.className = "dia-cel";
    cel.textContent = dia;

    if (chaveData(data) === hojeStr()) cel.classList.add("hoje");

    if (data > hoje) {
      cel.classList.add("futuro");
    } else {
      const feitosNoDia = habitos.filter((h) => h.historico[chave]).length;
      const pct = total === 0 ? 0 : (feitosNoDia / total) * 100;
      cel.classList.add("nivel-" + nivelPorPorcentagem(pct));
    }

    calendarioGrade.appendChild(cel);
  }
}

function desenharMetasSemana() {
  listaMetasSemana.innerHTML = "";

  if (habitos.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "meta-vazia";
    vazio.textContent = "Adicione hábitos na aba Hoje para acompanhar as metas semanais.";
    listaMetasSemana.appendChild(vazio);
    return;
  }

  habitos.forEach((habito) => {
    const feitos = feitosNaSemana(habito);
    const alvo = habito.metaSemanal || 7;
    const pct = Math.min(100, (feitos / alvo) * 100);

    const item = document.createElement("div");
    item.className = "meta-item";

    const topo = document.createElement("div");
    topo.className = "meta-item-topo";

    const nome = document.createElement("span");
    nome.className = "meta-item-nome";
    nome.textContent = habito.nome;

    const valor = document.createElement("span");
    valor.className = "meta-item-valor";
    valor.textContent = `${feitos}/${alvo}`;

    topo.appendChild(nome);
    topo.appendChild(valor);

    const barraFundo = document.createElement("div");
    barraFundo.className = "barra-fundo";
    const barra = document.createElement("div");
    barra.className = "barra-progresso";
    barra.style.width = pct + "%";
    barraFundo.appendChild(barra);

    item.appendChild(topo);
    item.appendChild(barraFundo);
    listaMetasSemana.appendChild(item);
  });
}

function taxaConclusao30Dias() {
  if (habitos.length === 0) return 0;
  let possiveis = 0;
  let feitos = 0;
  const hoje = new Date();

  for (let i = 0; i < 30; i++) {
    const dia = new Date(hoje);
    dia.setDate(hoje.getDate() - i);
    const chave = chaveData(dia);
    possiveis += habitos.length;
    feitos += habitos.filter((h) => h.historico[chave]).length;
  }

  return possiveis === 0 ? 0 : Math.round((feitos / possiveis) * 100);
}

function desenharCardsInsights() {
  const streak = streakGlobal();
  const feitosHoje = habitos.filter(estaFeitoHoje).length;
  const total = habitos.length;
  const taxa = taxaConclusao30Dias();
  const melhorRecorde = habitos.reduce((max, h) => Math.max(max, calcularRecorde(h)), 0);

  cardsInsights.innerHTML = `
    <article class="card-insight">
      <p class="card-insight-rotulo">Sequência</p>
      <p class="card-insight-valor">${streak}</p>
      <p class="card-insight-apoio">${streak === 1 ? "dia seguido" : "dias seguidos"}</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">Hoje</p>
      <p class="card-insight-valor">${feitosHoje}/${total}</p>
      <p class="card-insight-apoio">hábitos concluídos</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">30 dias</p>
      <p class="card-insight-valor">${taxa}%</p>
      <p class="card-insight-apoio">taxa de conclusão</p>
    </article>
    <article class="card-insight">
      <p class="card-insight-rotulo">Recorde</p>
      <p class="card-insight-valor">${melhorRecorde}</p>
      <p class="card-insight-apoio">melhor sequência individual</p>
    </article>`;
}

function ativarPainel(nome) {
  painelAtivo = nome;

  document.querySelectorAll(".nav-item").forEach((botao) => {
    botao.classList.toggle("ativo", botao.dataset.painel === nome);
  });

  document.querySelectorAll(".painel").forEach((painel) => {
    const ativo = painel.id === `painel-${nome}`;
    painel.hidden = !ativo;
    painel.classList.toggle("ativo", ativo);
  });
}

// Gera o desenho (SVG) da chama conforme o estado emocional
function mascoteSVG(estado) {
  const cores = {
    feliz: { externa: "#f97316", interna: "#fbbf24" },
    alerta: { externa: "#fb923c", interna: "#fdba74" },
    triste: { externa: "#9ca3af", interna: "#d1d5db" },
  }[estado];

  let rosto;
  if (estado === "feliz") {
    rosto = `
      <circle cx="42" cy="62" r="3.2" fill="#1f2937"/>
      <circle cx="58" cy="62" r="3.2" fill="#1f2937"/>
      <path d="M42 70 Q50 78 58 70" stroke="#1f2937" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  } else if (estado === "alerta") {
    rosto = `
      <circle cx="42" cy="62" r="3.2" fill="#1f2937"/>
      <circle cx="58" cy="62" r="3.2" fill="#1f2937"/>
      <path d="M43 73 Q50 69 57 73" stroke="#1f2937" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  } else {
    rosto = `
      <path d="M39 60 Q42 57 45 60" stroke="#374151" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M55 60 Q58 57 61 60" stroke="#374151" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M43 75 Q50 69 57 75" stroke="#374151" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M60 65 q3 5 0 8 q-3 -3 0 -8 Z" fill="#60a5fa"/>`;
  }

  // Quando está triste, sobem fios de fumaça em vez do brilho da chama
  const fumaca =
    estado === "triste"
      ? `<path d="M44 14 q-6 -6 0 -12" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>
         <path d="M56 12 q6 -6 0 -12" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>`
      : "";

  const animacao = estado === "triste" ? "" : "chama-viva";

  return `
    <svg viewBox="0 0 100 100" class="mascote-svg ${animacao}" aria-hidden="true">
      ${fumaca}
      <ellipse cx="50" cy="93" rx="20" ry="4" fill="rgba(0,0,0,0.12)"/>
      <path d="M50 8 C 62 30, 82 42, 74 64 A 26 26 0 1 1 26 64 C 18 42, 38 30, 50 8 Z" fill="${cores.externa}"/>
      <path d="M50 28 C 58 42, 70 50, 64 66 A 15 15 0 1 1 36 66 C 32 52, 44 44, 50 28 Z" fill="${cores.interna}"/>
      ${rosto}
    </svg>`;
}

function desenharMascote() {
  const streak = streakGlobal();
  const feitoHoje = diaConcluido(hojeStr());

  let estado;
  let msg;

  if (streak === 0) {
    estado = "triste";
    msg =
      habitos.length === 0
        ? "Adicione um hábito e conclua para acender sua chama."
        : "Sua chama apagou. Conclua um hábito para reacender!";
  } else if (!feitoHoje) {
    estado = "alerta";
    msg = "Sua chama está acesa — não deixe apagar hoje!";
  } else {
    estado = "feliz";
    if (streak >= 30) msg = "Imparável! Você é pura chama.";
    else if (streak >= 14) msg = "Você está pegando fogo!";
    else if (streak >= 7) msg = "Uma semana inteira acesa!";
    else msg = "Chama acesa. Continue assim!";
  }

  const rotulo = streak === 1 ? "1 dia" : `${streak} dias`;

  mascote.innerHTML = `
    ${mascoteSVG(estado)}
    <div class="mascote-info">
      <div class="mascote-streak">${rotulo} de sequência</div>
      <div class="mascote-msg">${msg}</div>
    </div>`;
}

function criarItem(habito) {
  const feito = estaFeitoHoje(habito);
  const streak = calcularStreak(habito);
  const recorde = calcularRecorde(habito);

  const item = document.createElement("li");
  item.className = "item-habito" + (feito ? " feito" : "");
  item.draggable = true;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox-habito";
  checkbox.checked = feito;
  checkbox.addEventListener("change", () => alternarFeito(habito.id));

  // Bloco central: nome + linha de informações
  const conteudo = document.createElement("div");
  conteudo.className = "item-conteudo";

  const nome = document.createElement("span");
  nome.className = "nome-habito";
  nome.textContent = habito.nome;

  const meta = document.createElement("div");
  meta.className = "item-meta";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = habito.categoria || "Geral";
  meta.appendChild(tag);

  if (habito.horario) {
    const hora = document.createElement("span");
    hora.className = "meta-info";
    hora.textContent = "⏰ " + habito.horario;
    meta.appendChild(hora);
  }

  if (habito.metaSemanal < 7) {
    const feitosSemana = feitosNaSemana(habito);
    const alvo = habito.metaSemanal;
    const semana = document.createElement("span");
    semana.className = "meta-info" + (feitosSemana >= alvo ? " cumprida" : "");
    semana.textContent = `${feitosSemana}/${alvo} esta semana`;
    meta.appendChild(semana);
  }

  if (recorde > 0) {
    const rec = document.createElement("span");
    rec.className = "meta-info";
    rec.textContent = `recorde ${recorde}`;
    meta.appendChild(rec);
  }

  conteudo.appendChild(nome);
  conteudo.appendChild(meta);

  const marcaStreak = document.createElement("span");
  marcaStreak.className = "streak" + (streak > 0 ? " ativa" : "");
  marcaStreak.textContent = streak > 0 ? `${streak} ${streak === 1 ? "dia" : "dias"}` : "—";

  const botaoEditar = document.createElement("button");
  botaoEditar.className = "botao-editar";
  botaoEditar.textContent = "✎";
  botaoEditar.title = "Editar nome";
  botaoEditar.addEventListener("click", () => iniciarEdicao(habito, conteudo, nome));

  const botaoRemover = document.createElement("button");
  botaoRemover.className = "botao-remover";
  botaoRemover.textContent = "×";
  botaoRemover.title = "Remover hábito";
  botaoRemover.addEventListener("click", () => removerHabito(habito.id));

  // Arrastar para reordenar (Drag and Drop API)
  item.addEventListener("dragstart", () => {
    idArrastando = habito.id;
    item.classList.add("arrastando");
  });
  item.addEventListener("dragend", () => {
    idArrastando = null;
    item.classList.remove("arrastando");
  });
  item.addEventListener("dragover", (evento) => {
    evento.preventDefault();
    item.classList.add("alvo");
  });
  item.addEventListener("dragleave", () => item.classList.remove("alvo"));
  item.addEventListener("drop", (evento) => {
    evento.preventDefault();
    item.classList.remove("alvo");
    reordenar(idArrastando, habito.id);
  });

  item.appendChild(checkbox);
  item.appendChild(conteudo);
  item.appendChild(marcaStreak);
  item.appendChild(botaoEditar);
  item.appendChild(botaoRemover);
  return item;
}

function desenhar() {
  desenharFiltros();

  const visiveis =
    filtroCategoria === "Todas"
      ? habitos
      : habitos.filter((h) => (h.categoria || "Geral") === filtroCategoria);

  listaHabitos.innerHTML = "";
  mensagemVazia.style.display = habitos.length === 0 ? "block" : "none";

  visiveis.forEach((habito) => listaHabitos.appendChild(criarItem(habito)));

  desenharMascote();
  atualizarResumo();
  desenharGrafico();
  desenharMetasSemana();
  desenharCardsInsights();
  desenharCalendario();
  desenharListaDiario();
}

function carregarNotaHoje() {
  notaHoje.value = notas[hojeStr()] || "";
}

// ============ LIGAÇÕES DE EVENTOS ============
botaoAdicionar.addEventListener("click", adicionarHabito);
entradaHabito.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") adicionarHabito();
});
botaoTema.addEventListener("click", alternarTema);
botaoExportar.addEventListener("click", exportarDados);
entradaImportar.addEventListener("change", importarDados);
notaHoje.addEventListener("input", () => {
  definirNota(hojeStr(), notaHoje.value);
});
diarioTexto.addEventListener("input", () => {
  definirNota(dataDiarioSelecionada, diarioTexto.value);
});
diarioData.addEventListener("change", () => {
  if (diarioData.value) carregarNotaDiario(diarioData.value);
});
diarioHojeBotao.addEventListener("click", () => {
  carregarNotaDiario(hojeStr());
});
navPaineis.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".nav-item");
  if (!botao) return;
  ativarPainel(botao.dataset.painel);
  if (botao.dataset.painel === "diario") {
    carregarNotaDiario(dataDiarioSelecionada || hojeStr());
  }
});

// ============ INICIALIZAÇÃO ============
aplicarTema(localStorage.getItem("tema") || "claro");
mostrarData();
carregar();
carregarNotaHoje();
carregarNotaDiario(hojeStr());
ativarPainel(painelAtivo);
desenhar();
