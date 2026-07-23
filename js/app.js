import { APP_VERSION } from "./config.js?v=1.8.0";
import { fraseFilosoficaDoDia } from "./lib/filosofia.js?v=1.8.0";
import {
  criarHabitoAgua,
  detectarTextoAgua,
  ehHabitoAgua,
  ehAtivoHoje,
  ehMultiPassos,
  estaCompletoNoDia,
  horariosLembretes,
  listaMicroPassos,
  listaPreparar,
  microFeitosNoDia,
  microPassoFeito,
  migrarHabitosAgua,
  nomeAguaLimpo,
  normalizarHabito,
  normalizarImportancia,
  parseMicroPassosTexto,
  parsePrepararTexto,
  passosTotal,
  progressoNoDia,
  rotuloImportancia,
  textoHorariosLembretes,
  textoPlanoB,
  todosMicroFeitos,
} from "./lib/habitos.js?v=1.8.0";
import {
  carregarPerfil,
  habitosSugeridosPerfil,
  marcarPerfilInicializado,
  perfilInicializado,
  salvarPerfil,
} from "./lib/perfil.js?v=1.8.0";
import {
  detectarHabitoEstudo,
  ehHorarioDificil,
  mensagemTarde,
  sugestaoTarde,
} from "./lib/tarde.js?v=1.8.0";
import {
  complementoCoachDiario,
  gerarResumoSemana,
  sugerirHabito,
  textoSugestao,
} from "./lib/inteligencia.js?v=1.8.0";
import {
  iniciarVerificacaoLembretes,
  lembretesAtivos,
  pedirPermissaoLembretes,
  verificarLembretes,
} from "./lib/lembretes.js?v=1.8.0";
import { sincronizarAgendaSW } from "./lib/agenda-notif.js?v=1.8.0";
import {
  cancelarTimer,
  cronometroAtivo,
  formatarTimer,
  horaFormatada,
  iniciarCronometro,
  iniciarTimer,
  minutosAte,
  pararCronometro,
  proximoHorarioPendente,
  segundosCronometro,
  segundosRestantesTimer,
  textoCountdown,
  timerAtivo,
} from "./lib/foco.js?v=1.8.0";
import {
  carregarPerfilRotina,
  gerarRotina,
  salvarPerfilRotina,
} from "./lib/rotina-local.js?v=1.8.0";
import {
  adicionarInbox,
  alternarPrioridade,
  aplicarLimiteDiario,
  arquivarInboxCompleta,
  carregarInbox,
  carregarPrioridades,
  carregarRevisaoManha,
  carregarRevisaoNoturna,
  carregarTemaSemana,
  definirLimiteDiario,
  definirModoCabecaLeve,
  definirModoCerebroVazio,
  definirRevisaoCampo,
  definirRevisaoManhaCampo,
  ehPrioridadeHoje,
  filtrarCerebroVazio,
  filtrarModoLeve,
  limiteDiarioAtivo,
  MAX_PRIORIDADES,
  modoCabecaLeve,
  modoCerebroVazio,
  moverInboxParaDepois,
  ordenarComPrioridades,
  prioridadesDoDia,
  removerInbox,
  revisaoDoDia,
  revisaoManhaDoDia,
  salvarTemaSemana,
  sugestaoAgora,
} from "./lib/tdah.js?v=1.8.0";

// ---- Referências aos elementos da página (DOM) ----
const entradaHabito = document.getElementById("entrada-habito");
const entradaCategoria = document.getElementById("entrada-categoria");
const entradaMeta = document.getElementById("entrada-meta");
const entradaHorario = document.getElementById("entrada-horario");
const entradaImportancia = document.getElementById("entrada-importancia");
const entradaMicro = document.getElementById("entrada-micro");
const entradaContexto = document.getElementById("entrada-contexto");
const entradaPlanoB = document.getElementById("entrada-plano-b");
const entradaPreparar = document.getElementById("entrada-preparar");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaHabitos = document.getElementById("lista-habitos");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorFeitos = document.getElementById("contador-feitos");
const contadorTotal = document.getElementById("contador-total");
const barraProgresso = document.getElementById("barra-progresso");
const dataHoje = document.getElementById("data-hoje");
const graficoBarras = document.getElementById("grafico-barras");
const graficoHoje = document.getElementById("grafico-hoje");
const graficoMedia = document.getElementById("grafico-media");
const botaoTema = document.getElementById("botao-tema");
const filtros = document.getElementById("filtros");
const notaHoje = document.getElementById("nota-hoje");
const calendarioGrade = document.getElementById("calendario-grade");
const botaoExportar = document.getElementById("botao-exportar");
const entradaImportar = document.getElementById("entrada-importar");
const agendaResumo = document.getElementById("agenda-resumo");
const filosofiaDia = document.getElementById("filosofia-dia");
const listaMetasSemana = document.getElementById("lista-metas-semana");
const cardsInsights = document.getElementById("cards-insights");
const navPaineis = document.querySelector(".nav-paineis");
const diarioData = document.getElementById("diario-data");
const diarioTexto = document.getElementById("diario-texto");
const diarioLegenda = document.getElementById("diario-data-legenda");
const diarioHojeBotao = document.getElementById("diario-hoje");
const listaDiario = document.getElementById("lista-diario");
const diarioVazio = document.getElementById("diario-vazio");
const resumoSemana = document.getElementById("resumo-semana");
const sugestaoHabito = document.getElementById("sugestao-habito");
const sugestaoTexto = document.getElementById("sugestao-texto");
const botaoUsarSugestao = document.getElementById("botao-usar-sugestao");
const feedbackAdicao = document.getElementById("feedback-adicao");
const tituloPainel = document.querySelector(".titulo-dia");
const rotinaPerfil = document.getElementById("rotina-perfil");
const rotinaHorarios = document.getElementById("rotina-horarios");
const rotinaObjetivos = document.getElementById("rotina-objetivos");
const botaoGerarRotina = document.getElementById("botao-gerar-rotina");
const rotinaStatus = document.getElementById("rotina-status");
const rotinaResultado = document.getElementById("rotina-resultado");
const rotinaMensagem = document.getElementById("rotina-mensagem");
const rotinaLista = document.getElementById("rotina-lista");
const rotinaSubstituir = document.getElementById("rotina-substituir");
const botaoAplicarRotina = document.getElementById("botao-aplicar-rotina");
const botaoRegenerarRotina = document.getElementById("botao-regenerar-rotina");
const botaoMontarAdicionar = document.getElementById("botao-montar-adicionar");
const dicaInicio = document.getElementById("dica-inicio");
const botaoDicaFechar = document.getElementById("dica-fechar");
const infoVersao = document.getElementById("info-versao");
const agoraConteudo = document.getElementById("agora-conteudo");
const entradaInbox = document.getElementById("entrada-inbox");
const botaoInbox = document.getElementById("botao-inbox");
const listaInbox = document.getElementById("lista-inbox");
const inboxVazio = document.getElementById("inbox-vazio");
const rotuloFoco = document.getElementById("rotulo-foco");
const revisaoFeito = document.getElementById("revisao-feito");
const revisaoFicou = document.getElementById("revisao-ficou");
const revisaoAmanha = document.getElementById("revisao-amanha");
const botaoLembretes = document.getElementById("botao-lembretes");
const lembretesStatus = document.getElementById("lembretes-status");
const relogioAtual = document.getElementById("relogio-atual");
const countdownProximo = document.getElementById("countdown-proximo");
const botaoArquivarInbox = document.getElementById("botao-arquivar-inbox");
const toggleCabecaLeve = document.getElementById("toggle-cabeca-leve");
const toggleLimiteDiario = document.getElementById("toggle-limite-diario");
const toggleCerebroVazio = document.getElementById("toggle-cerebro-vazio");
const bannerTarde = document.getElementById("banner-tarde");
const manhaFoco1 = document.getElementById("manha-foco1");
const manhaFoco2 = document.getElementById("manha-foco2");
const manhaFoco3 = document.getElementById("manha-foco3");
const resumoNaoEsqueci = document.getElementById("resumo-nao-esqueci");
const entradaTemaSemana = document.getElementById("entrada-tema-semana");
const perfilResumo = document.getElementById("perfil-resumo");
const botaoRotinaPersonalizada = document.getElementById("botao-rotina-personalizada");

// ---- Estado (a "fonte da verdade" do app) ----
let habitos = [];
let notas = {};
let filtroCategoria = "Todas";
let idArrastando = null;
let painelAtivo = "rotina";
let intervaloRelogio = null;
let dataDiarioSelecionada = hojeStr();
let sugestaoAtual = null;
let rotinaGerada = null;

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

function ontemStr() {
  const dia = new Date();
  dia.setDate(dia.getDate() - 1);
  return chaveData(dia);
}

function habitosDiarios() {
  return habitos.filter((h) => (h.metaSemanal || 7) >= 7).length;
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
  if (botaoTema) botaoTema.textContent = tema === "escuro" ? "☀" : "☾";
  const metaTema = document.querySelector('meta[name="theme-color"]');
  if (metaTema) metaTema.content = tema === "escuro" ? "#0f0e0d" : "#e8dfd1";
  const metaStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (metaStatus) metaStatus.content = tema === "escuro" ? "black" : "default";
  localStorage.setItem("tema", tema);
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
}

function alternarTema() {
  const atual = document.documentElement.getAttribute("data-tema");
  aplicarTema(atual === "escuro" ? "claro" : "escuro");
}

// ============ PERSISTÊNCIA (salvar/carregar) ============
function salvar() {
  localStorage.setItem("meus-habitos", JSON.stringify(habitos));
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
  rodarLembretes();
  sincronizarLembretesSW();
}

function sincronizarLembretesSW() {
  const chave = hojeStr();
  const perfil = carregarPerfil();
  sincronizarAgendaSW(habitos, chave, {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
    prioridades: prioridadesDoDia(chave),
    prioridadesVida: perfil.prioridadesVida || [],
  });
}

function salvarNotas() {
  localStorage.setItem("notas-diarias", JSON.stringify(notas));
  if (!window.syncEstaAplicandoRemoto || !window.syncEstaAplicandoRemoto()) {
    if (typeof window.agendarSyncNuvem === "function") window.agendarSyncNuvem();
  }
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
  desenharResumoAgenda();
  desenharFilosofia();
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
    habitos = migrarHabitosAgua(
      dados.map((h) =>
        normalizarHabito({
          ...h,
          historico: h.historico || (h.feito ? { [hojeStr()]: true } : {}),
        })
      ),
      hojeStr()
    );
    salvar();
  }

  const notasSalvas = localStorage.getItem("notas-diarias");
  if (notasSalvas) notas = JSON.parse(notasSalvas);
}

// ============ CÁLCULOS ============
function estaFeitoHoje(habito) {
  return estaCompletoNoDia(habito, hojeStr());
}

// Sequência atual: dias seguidos cumpridos, terminando hoje ou ontem
function calcularStreak(habito) {
  let streak = 0;
  const dia = new Date();
  if (!estaCompletoNoDia(habito, chaveData(dia))) {
    dia.setDate(dia.getDate() - 1);
  }
  while (estaCompletoNoDia(habito, chaveData(dia))) {
    streak++;
    dia.setDate(dia.getDate() - 1);
  }
  return streak;
}

// Recorde: a maior sequência de dias seguidos já registrada
function calcularRecorde(habito) {
  const dias = Object.keys(habito.historico)
    .filter((d) => estaCompletoNoDia(habito, d))
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
  return habitos.some((h) => estaCompletoNoDia(h, chave));
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
    if (estaCompletoNoDia(habito, chaveData(dia))) total++;
  }
  return total;
}

// ============ AÇÕES ============
function montarHabitoDoFormulario(texto) {
  const sugestao = sugerirHabito(texto);
  const habito = {
    id: novoIdHabito(),
    nome: texto,
    categoria: entradaCategoria.value || sugestao.categoria,
    metaSemanal: Number(entradaMeta.value) || sugestao.metaSemanal,
    horario: entradaHorario.value || sugestao.horario || "",
    importancia: normalizarImportancia(entradaImportancia?.value || 3),
    historico: {},
  };

  const contexto = entradaContexto?.value.trim();
  if (contexto) habito.contextoLembrete = contexto;

  const micro = parseMicroPassosTexto(entradaMicro?.value || "");
  if (micro.length) habito.microPassos = micro;

  const planoB = entradaPlanoB?.value.trim();
  if (planoB) habito.planoB = planoB;

  const preparar = parsePrepararTexto(entradaPreparar?.value || "");
  if (preparar.length) habito.preparar = preparar;

  if (detectarTextoAgua(texto) || sugestao.lembretes > 1) {
    habito.nome = nomeAguaLimpo();
    habito.categoria = "Saúde";
    habito.metaSemanal = 7;
    habito.importancia = 1;
    habito.lembretes = sugestao.lembretes || 6;
    habito.horariosLembretes = horariosLembretes({ lembretes: habito.lembretes });
    if (!habito.horario) habito.horario = habito.horariosLembretes[0] || "06:30";
    if (!habito.contextoLembrete) habito.contextoLembrete = "Beber um copo de água agora.";
  }

  if (/estud|prova|ler|leitura/.test(texto.toLowerCase()) && !micro.length) {
    habito.microPassos = ["Abrir o material", "Focar 10 minutos", "Marcar o que ficou"];
    habito.planoB = habito.planoB || "Só abrir o material e ler 1 página.";
    habito.preparar = habito.preparar || ["Mesa limpa", "Celular longe"];
    habito.diasAtivos = [1, 2, 3, 4, 5];
  }

  return habito;
}

function novoIdHabito() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function mostrarFeedback(texto, tipo = "ok") {
  if (!feedbackAdicao) return;
  feedbackAdicao.textContent = texto;
  feedbackAdicao.className = "feedback-adicao feedback-" + tipo;
  feedbackAdicao.hidden = false;
  clearTimeout(mostrarFeedback._timer);
  mostrarFeedback._timer = setTimeout(() => {
    feedbackAdicao.hidden = true;
  }, 3200);
}

function limparFormularioHabito() {
  entradaHabito.value = "";
  entradaHorario.value = "";
  entradaMeta.value = "7";
  entradaCategoria.value = "Geral";
  if (entradaImportancia) entradaImportancia.value = "3";
  if (entradaMicro) entradaMicro.value = "";
  if (entradaContexto) entradaContexto.value = "";
  if (entradaPlanoB) entradaPlanoB.value = "";
  if (entradaPreparar) entradaPreparar.value = "";
  sugestaoAtual = null;
  if (sugestaoHabito) sugestaoHabito.hidden = true;
}

function adicionarHabito() {
  const texto = entradaHabito.value.trim();
  if (texto === "") return;

  if (detectarTextoAgua(texto) && habitos.some(ehHabitoAgua)) {
    mostrarFeedback("Água já está na agenda — marque os lembretes na aba Hoje.", "aviso");
    return;
  }

  habitos.push(montarHabitoDoFormulario(texto));
  limparFormularioHabito();
  salvar();
  desenhar();
  mostrarFeedback("Hábito adicionado! Veja na aba Hoje.");
}

const ATALHOS_RAPIDOS = {
  agua: () => criarHabitoAgua(novoIdHabito()),
  academia: () => ({
    id: novoIdHabito(),
    nome: "Academia",
    categoria: "Saúde",
    metaSemanal: 5,
    horario: "18:00",
    importancia: 2,
    historico: {},
  }),
  estudo: () => ({
    id: novoIdHabito(),
    nome: "Estudar 15 min",
    categoria: "Estudo",
    metaSemanal: 5,
    horario: "19:00",
    importancia: 1,
    diasAtivos: [1, 2, 3, 4, 5],
    microPassos: ["Abrir o material", "Focar 10 minutos", "Anotar dúvidas"],
    planoB: "Só abrir o material e ler 1 página.",
    preparar: ["Mesa limpa", "Água por perto", "Celular longe"],
    contextoLembrete: "Chegou da escola — só 10 min já conta.",
    historico: {},
  }),
  meditar: () => ({
    id: novoIdHabito(),
    nome: "Meditar 10 min",
    categoria: "Saúde",
    metaSemanal: 7,
    horario: "06:30",
    historico: {},
  }),
};

const ROTULOS_ATALHO = {
  agua: "Beber água",
  academia: "Academia",
  estudo: "Estudar 15 min",
  meditar: "Meditar 10 min",
};

function adicionarAtalho(tipo) {
  if (tipo === "agua" && habitos.some(ehHabitoAgua)) {
    mostrarFeedback("Água já está na agenda — marque os lembretes na aba Hoje.", "aviso");
    return;
  }

  const criar = ATALHOS_RAPIDOS[tipo];
  if (!criar) return;

  habitos.push(criar());
  limparFormularioHabito();
  salvar();
  desenhar();
  mostrarFeedback(`${ROTULOS_ATALHO[tipo] || "Hábito"} adicionado! Veja na aba Hoje.`);
}

function avancarHabito(id) {
  const hoje = hojeStr();
  habitos = habitos.map((habito) => {
    if (habito.id !== id) return habito;
    const historico = { ...habito.historico };
    const total = passosTotal(habito);

    if (total > 1) {
      const atual = progressoNoDia(habito, hoje);
      if (atual >= total) {
        delete historico[hoje];
      } else {
        historico[hoje] = atual + 1;
      }
    } else if (historico[hoje] === true) {
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
  const dados = {
    versao: 3,
    habitos,
    notas,
    inbox: carregarInbox(),
    prioridades: carregarPrioridades(),
    revisao: carregarRevisaoNoturna(),
  };
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
      if (Array.isArray(dados.inbox)) {
        localStorage.setItem("inbox-captura", JSON.stringify(dados.inbox));
      }
      if (dados.prioridades && typeof dados.prioridades === "object") {
        localStorage.setItem("prioridades-dia", JSON.stringify(dados.prioridades));
      }
      if (dados.revisao && typeof dados.revisao === "object") {
        localStorage.setItem("revisao-noturna", JSON.stringify(dados.revisao));
      }
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

function calcularDadosGrafico7Dias() {
  const total = habitos.length;
  const dias = [];

  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    const feitosNoDia = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
    const porcentagem = total === 0 ? 0 : (feitosNoDia / total) * 100;

    dias.push({
      porcentagem,
      rotulo: dia.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
      ehHoje: chave === hojeStr(),
    });
  }

  return dias;
}

function renderizarGraficoBarras(container, { compacto = false } = {}) {
  if (!container) return;

  const dias = calcularDadosGrafico7Dias();
  container.innerHTML = "";
  container.classList.toggle("grafico-compacto", compacto);

  dias.forEach((dia) => {
    const coluna = document.createElement("div");
    coluna.className = "grafico-coluna" + (dia.ehHoje ? " hoje" : "");

    const percentual = document.createElement("span");
    percentual.className = "grafico-percentual";
    percentual.textContent = Math.round(dia.porcentagem) + "%";

    const trilha = document.createElement("div");
    trilha.className = "grafico-trilha";
    const preenchimento = document.createElement("div");
    preenchimento.className = "grafico-preenchimento";
    preenchimento.style.height = dia.porcentagem + "%";
    trilha.appendChild(preenchimento);

    const rotulo = document.createElement("span");
    rotulo.className = "grafico-rotulo";
    rotulo.textContent = dia.rotulo;

    coluna.appendChild(percentual);
    coluna.appendChild(trilha);
    coluna.appendChild(rotulo);
    container.appendChild(coluna);
  });
}

function desenharGrafico() {
  renderizarGraficoBarras(graficoBarras);
  renderizarGraficoBarras(graficoHoje, { compacto: true });

  if (graficoMedia) {
    const dias = calcularDadosGrafico7Dias();
    const media = Math.round(
      dias.reduce((soma, dia) => soma + dia.porcentagem, 0) / dias.length
    );
    graficoMedia.textContent = habitos.length === 0 ? "—" : `média ${media}%`;
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
      const feitosNoDia = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
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
    feitos += habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
  }

  return possiveis === 0 ? 0 : Math.round((feitos / possiveis) * 100);
}

function calcularEstatisticasSemana() {
  const totalHabitos = habitos.length;
  if (totalHabitos === 0) {
    return { totalHabitos: 0 };
  }

  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(dia.getDate() - i);
    const chave = chaveData(dia);
    const feitos = habitos.filter((h) => estaCompletoNoDia(h, chave)).length;
    const pct = Math.round((feitos / totalHabitos) * 100);
    dias.push({
      chave,
      pct,
      nome: dia.toLocaleDateString("pt-BR", { weekday: "long" }),
    });
  }

  const mediaConclusao = Math.round(
    dias.reduce((soma, d) => soma + d.pct, 0) / dias.length
  );

  const melhorDia = dias.reduce((a, b) => (b.pct > a.pct ? b : a), dias[0]);

  const categorias = {};
  habitos.forEach((h) => {
    const cat = h.categoria || "Geral";
    if (!categorias[cat]) categorias[cat] = { feitos: 0, possivel: 0 };
    for (let i = 0; i < 7; i++) {
      const dia = new Date();
      dia.setDate(dia.getDate() - i);
      const chave = chaveData(dia);
      categorias[cat].possivel++;
      if (estaCompletoNoDia(h, chave)) categorias[cat].feitos++;
    }
  });

  const listaCats = Object.entries(categorias).map(([nome, dados]) => ({
    nome,
    pct: dados.possivel
      ? Math.round((dados.feitos / dados.possivel) * 100)
      : 0,
  }));

  listaCats.sort((a, b) => b.pct - a.pct);
  const melhorCategoria = listaCats[0] || null;
  const fracaCategoria =
    listaCats.length > 1 ? listaCats[listaCats.length - 1] : null;

  let metasCumpridas = 0;
  const desempenhoHabitos = habitos.map((h) => {
    const feitos = feitosNaSemana(h);
    const alvo = h.metaSemanal || 7;
    if (feitos >= alvo) metasCumpridas++;
    return { nome: h.nome, pct: Math.round((feitos / alvo) * 100), feitos, alvo };
  });

  desempenhoHabitos.sort((a, b) => b.pct - a.pct);
  const habitoMaisForte =
    desempenhoHabitos[0] && desempenhoHabitos[0].feitos > 0
      ? desempenhoHabitos[0]
      : null;

  return {
    totalHabitos,
    mediaConclusao,
    melhorDia,
    melhorCategoria,
    fracaCategoria,
    metasCumpridas,
    metasTotal: habitos.length,
    habitoMaisForte,
  };
}

function desenharResumoSemana() {
  if (!resumoSemana) return;
  const stats = calcularEstatisticasSemana();
  resumoSemana.textContent = gerarResumoSemana(stats);
}

function atualizarSugestaoHabito() {
  const texto = entradaHabito.value.trim();
  if (!texto || texto.length < 3) {
    sugestaoAtual = null;
    if (sugestaoHabito) sugestaoHabito.hidden = true;
    return;
  }

  sugestaoAtual = sugerirHabito(texto);
  if (sugestaoTexto) sugestaoTexto.textContent = textoSugestao(sugestaoAtual);
  if (sugestaoHabito) sugestaoHabito.hidden = false;
}

function aplicarSugestaoHabito() {
  if (!sugestaoAtual) return;
  entradaCategoria.value = sugestaoAtual.categoria;
  entradaMeta.value = String(sugestaoAtual.metaSemanal);
  entradaHorario.value = sugestaoAtual.horario || "";
  if (sugestaoHabito) sugestaoHabito.hidden = true;

  if (sugestaoAtual.lembretes > 1 && detectarTextoAgua(entradaHabito.value)) {
    adicionarHabito();
  }
}

function carregarCamposRotina() {
  const salvo = carregarPerfilRotina();
  if (rotinaPerfil) rotinaPerfil.value = salvo.perfil || "";
  if (rotinaHorarios) rotinaHorarios.value = salvo.horarios || "";
  if (rotinaObjetivos) rotinaObjetivos.value = salvo.objetivos || "";
}

function salvarCamposRotina() {
  salvarPerfilRotina({
    perfil: rotinaPerfil?.value || "",
    horarios: rotinaHorarios?.value || "",
    objetivos: rotinaObjetivos?.value || "",
  });
}

function habitoJaExiste(nome) {
  const alvo = nome.toLowerCase();
  return habitos.some((h) => h.nome.toLowerCase() === alvo);
}

function renderizarRotinaGerada(resultado) {
  rotinaGerada = resultado;
  rotinaMensagem.textContent = resultado.mensagem;
  rotinaLista.innerHTML = "";

  if (!resultado.habitos.length) {
    rotinaResultado.hidden = true;
    return;
  }

  resultado.habitos.forEach((item, indice) => {
    const jaExiste = habitoJaExiste(item.nome);
    const label = document.createElement("label");
    label.className = "rotina-item" + (jaExiste ? " rotina-item-existente" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "rotina-item-check";
    check.checked = !jaExiste;
    check.dataset.indice = String(indice);

    const corpo = document.createElement("div");
    corpo.className = "rotina-item-corpo";

    const topo = document.createElement("div");
    topo.className = "rotina-item-topo";

    const nome = document.createElement("span");
    nome.className = "rotina-item-nome";
    nome.textContent = item.nome;

    const hora = document.createElement("span");
    hora.className = "rotina-item-hora";
    hora.textContent = item.horario || "—";

    topo.appendChild(nome);
    topo.appendChild(hora);

    const meta = document.createElement("p");
    meta.className = "rotina-item-meta";
    meta.textContent =
      item.lembretes > 1
        ? `${item.categoria} · ${item.lembretes} lembretes/dia`
        : `${item.categoria} · ${item.metaSemanal === 7 ? "todo dia" : item.metaSemanal + "x/semana"}`;

    const motivo = document.createElement("p");
    motivo.className = "rotina-item-motivo";
    motivo.textContent = item.motivo;

    corpo.appendChild(topo);
    corpo.appendChild(meta);
    if (jaExiste) {
      const aviso = document.createElement("p");
      aviso.className = "rotina-item-aviso";
      aviso.textContent = "Já está na sua agenda";
      corpo.appendChild(aviso);
    }
    if (item.motivo) corpo.appendChild(motivo);

    label.appendChild(check);
    label.appendChild(corpo);
    rotinaLista.appendChild(label);
  });

  rotinaResultado.hidden = false;
  rotinaResultado.classList.add("rotina-resultado-revelado");
  rotinaResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function executarGeracaoRotina() {
  salvarCamposRotina();

  const perfil = rotinaPerfil?.value.trim() || "";
  const horarios = rotinaHorarios?.value.trim() || "";
  const objetivos = rotinaObjetivos?.value.trim() || "";

  if (!botaoGerarRotina || !rotinaStatus) return;

  botaoGerarRotina.disabled = true;
  botaoGerarRotina.textContent = "Montando rotina…";
  rotinaStatus.textContent = "Organizando seus horários livres…";
  rotinaStatus.className = "rotina-status rotina-carregando";
  rotinaResultado?.classList.remove("rotina-resultado-revelado");

  try {
    const resultado = await gerarRotina({
      perfil,
      horarios,
      objetivos,
      habitosExistentes: habitos,
    });

    if (!resultado.habitos.length) {
      rotinaResultado.hidden = true;
      rotinaStatus.textContent = resultado.mensagem;
      rotinaStatus.className = "rotina-status rotina-erro";
      return;
    }

    renderizarRotinaGerada(resultado);
    const novos = resultado.habitos.filter((h) => !habitoJaExiste(h.nome)).length;
    rotinaStatus.textContent =
      novos > 0
        ? `Pronto! ${resultado.habitos.length} hábitos sugeridos (${novos} novos). Toque em "Adicionar selecionados" abaixo.`
        : `Pronto! ${resultado.habitos.length} sugeridos — todos já estão na agenda. Marque "Substituir" para trocar.`;
    rotinaStatus.className = "rotina-status rotina-ok";
  } catch (erro) {
    rotinaStatus.textContent = erro.message || "Erro ao gerar rotina.";
    rotinaStatus.className = "rotina-status rotina-erro";
  } finally {
    botaoGerarRotina.disabled = false;
    botaoGerarRotina.textContent = "Montar rotina completa";
  }
}

function aplicarRotinaGerada() {
  if (!rotinaGerada) return;

  const selecionados = [];
  rotinaLista.querySelectorAll(".rotina-item-check:checked").forEach((el) => {
    const item = rotinaGerada.habitos[Number(el.dataset.indice)];
    if (item) selecionados.push(item);
  });

  if (selecionados.length === 0) {
    rotinaStatus.textContent = "Selecione pelo menos um hábito.";
    rotinaStatus.className = "rotina-status rotina-erro";
    return;
  }

  if (rotinaSubstituir?.checked) {
    habitos = [];
  }

  const baseId = novoIdHabito();
  let adicionados = 0;
  let ignorados = 0;

  selecionados.forEach((item, i) => {
    if (habitoJaExiste(item.nome)) {
      ignorados++;
      return;
    }

    const habito = {
      id: baseId + i,
      nome: item.nome,
      categoria: item.categoria,
      metaSemanal: item.metaSemanal,
      horario: item.horario || "",
      historico: {},
    };
    if (item.lembretes > 1) habito.lembretes = item.lembretes;
    if (item.horariosLembretes?.length) habito.horariosLembretes = item.horariosLembretes;
    if (item.importancia) habito.importancia = item.importancia;
    if (item.microPassos?.length) habito.microPassos = item.microPassos;
    if (item.motivo && !habito.contextoLembrete) habito.contextoLembrete = item.motivo;
    habitos.push(habito);
    adicionados++;
  });

  if (adicionados === 0) {
    rotinaStatus.textContent =
      ignorados > 0
        ? "Esses hábitos já estão na agenda."
        : "Nenhum hábito novo para adicionar.";
    rotinaStatus.className = "rotina-status rotina-erro";
    return;
  }

  habitos = migrarHabitosAgua(habitos, hojeStr());
  salvar();
  desenhar();
  ativarPainel("hoje");
  rotinaStatus.textContent = `${adicionados} hábito(s) adicionados! Veja na aba Hoje.`;
  rotinaStatus.className = "rotina-status rotina-ok";
  mostrarFeedback(`${adicionados} hábito(s) da rotina adicionados!`);
  fecharDicaInicio();
}

async function montarEAdicionarRotina() {
  await executarGeracaoRotina();
  if (!rotinaGerada?.habitos?.length) return;

  rotinaLista.querySelectorAll(".rotina-item-check").forEach((el) => {
    const item = rotinaGerada.habitos[Number(el.dataset.indice)];
    el.checked = Boolean(item && !habitoJaExiste(item.nome));
  });

  aplicarRotinaGerada();
}

function fecharDicaInicio() {
  if (!dicaInicio) return;
  dicaInicio.hidden = true;
  localStorage.setItem("dica-inicio-vista", "1");
}

function mostrarDicaInicio() {
  if (!dicaInicio) return;
  if (localStorage.getItem("dica-inicio-vista")) return;
  if (habitos.length > 0) return;
  dicaInicio.hidden = false;
}

function atualizarInfoVersao() {
  if (!infoVersao) return;
  const online = location.hostname.includes("github.io");
  infoVersao.textContent = `Versão ${APP_VERSION}${online ? " · online" : " · local"}`;
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
      <p class="card-insight-apoio">compromissos concluídos</p>
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

  const titulos = {
    rotina: "Sua rotina",
    hoje: "Seu dia",
    semana: "Sua semana",
    diario: "Diário",
    insights: "Insights",
    ajustes: "Ajustes",
  };
  if (tituloPainel) tituloPainel.textContent = titulos[nome] || "Agenda";

  if (nome === "rotina") {
    carregarCamposRotina();
  }
}

function ordenarPorHorario(lista) {
  return [...lista].sort((a, b) => {
    if (a.horario && b.horario) return a.horario.localeCompare(b.horario);
    if (a.horario) return -1;
    if (b.horario) return 1;
    return 0;
  });
}

function ciclarImportancia(habitoId) {
  habitos = habitos.map((h) => {
    if (h.id !== habitoId) return h;
    const atual = normalizarImportancia(h.importancia);
    return { ...h, importancia: atual >= 3 ? 1 : atual + 1 };
  });
  salvar();
  desenhar();
}

function alternarMicroPasso(habitoId, indice) {
  const chave = hojeStr();
  habitos = habitos.map((habito) => {
    if (habito.id !== habitoId) return habito;
    const microHistorico = { ...(habito.microHistorico || {}) };
    const feitos = [...(microHistorico[chave] || [])];
    const pos = feitos.indexOf(indice);
    if (pos >= 0) feitos.splice(pos, 1);
    else feitos.push(indice);
    microHistorico[chave] = feitos.sort((a, b) => a - b);
    return { ...habito, microHistorico };
  });
  salvar();
  desenhar();
}

function horariosParaLembrete(habito) {
  const extras = horariosLembretes(habito);
  if (extras.length) return extras;
  return habito.horario ? [habito.horario] : [];
}

function rodarLembretes() {
  verificarLembretes(habitos, hojeStr(), {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
  });
  sincronizarLembretesSW();
}

function atualizarLembretesStatus() {
  if (!lembretesStatus) return;
  if (!("Notification" in window)) {
    lembretesStatus.textContent = "Notificações não disponíveis neste navegador.";
    return;
  }
  if (lembretesAtivos() && Notification.permission === "granted") {
    lembretesStatus.textContent =
      "Lembretes ativos — avisos no horário (melhor com app na tela inicial).";
  } else if (Notification.permission === "denied") {
    lembretesStatus.textContent = "Permissão bloqueada. Libere nas configurações do navegador.";
  } else {
    lembretesStatus.textContent = "Lembretes desligados.";
  }
}

async function ativarLembretes() {
  const resultado = await pedirPermissaoLembretes();
  atualizarLembretesStatus();
  mostrarFeedback(resultado.mensagem, resultado.ok ? "ok" : "aviso");
  rodarLembretes();
  if (resultado.ok && "serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(`./sw.js?v=${APP_VERSION}`);
    } catch {
      /* silencioso */
    }
  }
}

function carregarRevisaoCampos() {
  const dados = revisaoDoDia(hojeStr());
  if (revisaoFeito) revisaoFeito.value = dados.feito;
  if (revisaoFicou) revisaoFicou.value = dados.ficou;
  if (revisaoAmanha) revisaoAmanha.value = dados.amanha;
}

function desenharRevisao() {
  carregarRevisaoCampos();
}

function proximoCompromisso() {
  const chave = hojeStr();
  const sugestao = sugestaoAgora(habitos, chave, {
    estaPendente: (h) => !estaFeitoHoje(h),
    ordenarPorHorario,
    prioridades: prioridadesDoDia(chave),
  });
  return sugestao?.habito || null;
}

function irParaHabito(id) {
  const item = document.querySelector(`.item-habito[data-habito-id="${id}"]`);
  if (!item) return;
  item.scrollIntoView({ behavior: "smooth", block: "center" });
  item.classList.add("item-destaque");
  setTimeout(() => item.classList.remove("item-destaque"), 1800);
}

function alternarFocoHabito(habitoId) {
  const resultado = alternarPrioridade(hojeStr(), habitoId);
  if (!resultado.ok) {
    mostrarFeedback(resultado.mensagem, "aviso");
    return;
  }
  desenhar();
  mostrarFeedback(resultado.mensagem);
}

function capturarInbox() {
  const texto = entradaInbox?.value || "";
  const item = adicionarInbox(texto);
  if (!item) return;
  if (entradaInbox) entradaInbox.value = "";
  desenharInbox();
  mostrarFeedback("Anotado na inbox — organize quando puder.");
}

function arquivarInbox() {
  const resultado = arquivarInboxCompleta();
  if (!resultado.ok) {
    mostrarFeedback(resultado.mensagem, "aviso");
    return;
  }
  desenharInbox();
  mostrarFeedback(resultado.mensagem);
}

function atualizarTimerUI(segundos) {
  const el = document.getElementById("agora-timer-valor");
  if (!el) return;
  if (cronometroAtivo()) el.textContent = formatarTimer(segundos);
  else el.textContent = formatarTimer(segundos);
}

function comecarTimer(segundos, habito, rotulo) {
  const passos = listaMicroPassos(habito);
  const primeiroPasso = passos[0];
  iniciarTimer(
    segundos,
    { habitoId: habito.id, nome: habito.nome, rotulo },
    { onTick: atualizarTimerUI, onFim: onTimerFim }
  );
  desenharAgora();
  const dica =
    segundos <= 30
      ? primeiroPasso
        ? `Só abrir: "${primeiroPasso}"`
        : "Só 30 segundos para começar."
      : primeiroPasso
        ? `Só: "${primeiroPasso}" — ${rotulo}.`
        : `${rotulo}. Sem precisar terminar.`;
  mostrarFeedback(dica);
}

function comecar2minutos(habito) {
  comecarTimer(120, habito, "2 minutos");
}

function comecarCronometro(habito) {
  iniciarCronometro(
    { habitoId: habito.id, nome: habito.nome },
    { onTick: atualizarTimerUI }
  );
  desenharAgora();
  mostrarFeedback("Cronômetro ligado — veja quanto tempo passa.");
}

function onTimerFim(meta) {
  if (lembretesAtivos() && Notification.permission === "granted") {
    try {
      new Notification(meta?.rotulo || "Tempo!", {
        body: meta?.nome
          ? `Como foi com "${meta.nome}"? Marque um passo ou continue.`
          : "Um passo já conta.",
        tag: "timer-foco",
        icon: "icon-192.png",
      });
    } catch {
      /* silencioso */
    }
  }
  mostrarFeedback("Tempo! Marque um passo ou continue — já vale.");
  desenharAgora();
  if (meta?.habitoId) irParaHabito(meta.habitoId);
}

function onTimer2minFim(meta) {
  onTimerFim(meta);
}

function desenharRelogio() {
  if (relogioAtual) relogioAtual.textContent = horaFormatada();

  if (!countdownProximo) return;

  const prox = proximoHorarioPendente(habitos, {
    estaPendente: (h) => ehAtivoHoje(h) && !estaFeitoHoje(h),
    horariosDoHabito: horariosParaLembrete,
  });

  if (!prox) {
    countdownProximo.textContent = "";
    return;
  }

  const min = minutosAte(prox.horario);
  const texto = textoCountdown(min);
  if (texto === "passou") {
    countdownProximo.textContent = "";
    return;
  }
  if (min != null && min <= 10 && min > 0) {
    countdownProximo.textContent = `⏰ ${prox.habito.nome} em ${min} min`;
    return;
  }
  countdownProximo.textContent = `Próximo: ${prox.habito.nome} ${texto}`;
}

function obterSugestaoAgora() {
  const chave = hojeStr();
  const pendente = (h) => ehAtivoHoje(h) && !estaFeitoHoje(h);

  if (ehHorarioDificil()) {
    const tarde = sugestaoTarde(habitos, {
      estaPendente: pendente,
      detectarEstudo: detectarHabitoEstudo,
    });
    if (tarde) return tarde;
  }

  return sugestaoAgora(habitos, chave, {
    estaPendente: pendente,
    ordenarPorHorario,
    prioridades: prioridadesDoDia(chave),
  });
}

function desenharAgora() {
  if (!agoraConteudo) return;

  const sugestao = obterSugestaoAgora();

  if (!sugestao) {
    agoraConteudo.innerHTML = `
      <p class="agora-texto agora-vazio">Nada pendente agora. Descanse ou revise a inbox.</p>`;
    return;
  }

  const { habito, motivo } = sugestao;
  const horario = habito.horario ? `<span class="agora-hora">${habito.horario}</span>` : "";
  const passos = listaMicroPassos(habito);
  const preparar = listaPreparar(habito);
  const dicaPasso = passos[0]
    ? `<p class="agora-micro">Primeiro passo: <strong>${passos[0]}</strong></p>`
    : "";
  const prepHtml = preparar.length
    ? `<p class="agora-preparar">Preparar: ${preparar.join(" · ")}</p>`
    : "";

  const timerHtml =
    timerAtivo() || cronometroAtivo()
      ? `<div class="agora-timer" id="agora-timer">
        <span class="agora-timer-label">${cronometroAtivo() ? "Cronômetro" : "Foco"}</span>
        <span class="agora-timer-valor" id="agora-timer-valor">${formatarTimer(
          cronometroAtivo() ? segundosCronometro() : segundosRestantesTimer()
        )}</span>
        <button type="button" class="agora-timer-cancelar" id="agora-cancelar-timer">Parar</button>
      </div>`
      : "";

  agoraConteudo.innerHTML = `
    ${timerHtml}
    <p class="agora-motivo">${motivo}</p>
    <button type="button" class="agora-botao" data-ir-habito="${habito.id}">
      ${horario}
      <span class="agora-nome">${habito.nome}</span>
    </button>
    ${dicaPasso}
    ${prepHtml}
    <div class="agora-acoes agora-timers">
      <button type="button" class="botao-secundario agora-timer-btn" data-seg="30">Só abrir</button>
      <button type="button" class="botao-secundario agora-timer-btn" data-seg="120">2 min</button>
      <button type="button" class="botao-secundario agora-timer-btn" data-seg="300">5 min</button>
      <button type="button" class="botao-secundario agora-timer-btn" data-seg="600">10 min</button>
      <button type="button" class="botao-secundario agora-timer-btn" data-seg="1500">25 min</button>
    </div>
    <div class="agora-acoes">
      <button type="button" class="botao-secundario" id="agora-cronometro">Cronômetro</button>
      <button type="button" class="botao-secundario agora-travei" data-travei="${habito.id}">Travei</button>
    </div>
    <p class="agora-dica">Um passo só. Sem precisar fazer tudo.</p>`;

  agoraConteudo.querySelector(".agora-botao")?.addEventListener("click", () => {
    irParaHabito(habito.id);
  });
  agoraConteudo.querySelectorAll(".agora-timer-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const seg = Number(btn.dataset.seg);
      const rotulo =
        seg <= 30 ? "30 segundos" : seg === 120 ? "2 minutos" : `${Math.round(seg / 60)} minutos`;
      comecarTimer(seg, habito, rotulo);
    });
  });
  agoraConteudo.querySelector("#agora-cronometro")?.addEventListener("click", () => {
    comecarCronometro(habito);
  });
  agoraConteudo.querySelector(".agora-travei")?.addEventListener("click", () => {
    mostrarFeedback(textoPlanoB(habito), "aviso");
  });
  agoraConteudo.querySelector("#agora-cancelar-timer")?.addEventListener("click", () => {
    cancelarTimer();
    pararCronometro();
    desenharAgora();
    mostrarFeedback("Timer parado.");
  });
}

function desenharInbox() {
  if (!listaInbox) return;

  const itens = carregarInbox();
  listaInbox.innerHTML = "";
  if (inboxVazio) inboxVazio.hidden = itens.length > 0;
  if (botaoArquivarInbox) botaoArquivarInbox.hidden = itens.length === 0;

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.className = "inbox-item";

    const texto = document.createElement("span");
    texto.className = "inbox-texto";
    texto.textContent = item.texto;

    const acoes = document.createElement("div");
    acoes.className = "inbox-acoes";

    const btnHabito = document.createElement("button");
    btnHabito.type = "button";
    btnHabito.className = "inbox-acao";
    btnHabito.textContent = "Hábito";
    btnHabito.title = "Criar hábito na Rotina";
    btnHabito.addEventListener("click", () => {
      removerInbox(item.id);
      ativarPainel("rotina");
      if (entradaHabito) {
        entradaHabito.value = item.texto;
        entradaHabito.focus();
      }
      desenharInbox();
      mostrarFeedback("Texto colocado em Rotina — ajuste e adicione.");
    });

    const btnNota = document.createElement("button");
    btnNota.type = "button";
    btnNota.className = "inbox-acao";
    btnNota.textContent = "Nota";
    btnNota.title = "Mover para anotações de hoje";
    btnNota.addEventListener("click", () => {
      const hoje = hojeStr();
      const atual = notas[hoje] || "";
      const novo = atual ? `${atual}\n• ${item.texto}` : `• ${item.texto}`;
      definirNota(hoje, novo);
      removerInbox(item.id);
      desenharInbox();
      mostrarFeedback("Adicionado às anotações de hoje.");
    });

    const btnDepois = document.createElement("button");
    btnDepois.type = "button";
    btnDepois.className = "inbox-acao";
    btnDepois.textContent = "Depois";
    btnDepois.title = "Guardar para outro dia";
    btnDepois.addEventListener("click", () => {
      moverInboxParaDepois(item.id);
      desenharInbox();
      mostrarFeedback("Guardado para depois.");
    });

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "inbox-remover";
    remover.textContent = "×";
    remover.title = "Remover da inbox";
    remover.addEventListener("click", () => {
      removerInbox(item.id);
      desenharInbox();
    });

    acoes.appendChild(btnHabito);
    acoes.appendChild(btnNota);
    acoes.appendChild(btnDepois);
    acoes.appendChild(remover);

    li.appendChild(texto);
    li.appendChild(acoes);
    listaInbox.appendChild(li);
  });
}

function desenharManha() {
  const chave = hojeStr();
  const dados = revisaoManhaDoDia(chave);
  if (manhaFoco1) manhaFoco1.value = dados.foco1;
  if (manhaFoco2) manhaFoco2.value = dados.foco2;
  if (manhaFoco3) manhaFoco3.value = dados.foco3;

  if (!resumoNaoEsqueci) return;

  const perfil = carregarPerfil();
  const prio = prioridadesDoDia(chave);

  const focos = [dados.foco1, dados.foco2, dados.foco3].filter((t) => t.trim());
  const habitoNomes = prio
    .map((id) => habitos.find((h) => h.id === id)?.nome)
    .filter(Boolean);

  if (focos.length || habitoNomes.length) {
    const linhas = focos.length ? focos : habitoNomes;
    resumoNaoEsqueci.hidden = false;
    resumoNaoEsqueci.innerHTML = `<strong>Não esquecer:</strong> ${linhas.slice(0, 3).join(" · ")}`;
  } else if (perfil.prioridadesVida?.length) {
    resumoNaoEsqueci.hidden = false;
    resumoNaoEsqueci.innerHTML = `<strong>Seu foco:</strong> ${perfil.prioridadesVida.join(" · ")}`;
  } else {
    resumoNaoEsqueci.hidden = true;
  }

  if (entradaTemaSemana && entradaTemaSemana.value !== carregarTemaSemana()) {
    entradaTemaSemana.value = carregarTemaSemana();
  }
}

function desenharBannerTarde() {
  if (!bannerTarde) return;
  const ativo = ehHorarioDificil();
  bannerTarde.hidden = !ativo;
  if (ativo) {
    const texto = bannerTarde.querySelector(".banner-tarde-texto");
    if (texto) texto.textContent = mensagemTarde();
  }
}

function desenharPerfilAjustes() {
  if (!perfilResumo) return;
  const perfil = carregarPerfil();
  perfilResumo.textContent = `Acorda ${perfil.acordar}, escola seg–sex, tarde difícil ${perfil.tardeDificilInicio}–${perfil.tardeDificilFim}. Prioridades: ${(perfil.prioridadesVida || []).join(", ")}.`;
}

function aplicarRotinaPersonalizada() {
  const sugeridos = habitosSugeridosPerfil();
  let adicionados = 0;

  sugeridos.forEach((modelo) => {
    const jaExiste = habitos.some((h) => {
      if (/água|agua/i.test(modelo.nome)) return ehHabitoAgua(h);
      return h.nome.toLowerCase() === modelo.nome.toLowerCase();
    });
    if (jaExiste) return;

    if (/água|agua/i.test(modelo.nome)) {
      habitos.push(criarHabitoAgua(novoIdHabito()));
      adicionados++;
      return;
    }

    const habito = { ...modelo, id: novoIdHabito(), historico: {} };
    if (habito.lembretes) {
      habito.horariosLembretes = horariosLembretes(habito);
    }
    habitos.push(normalizarHabito(habito));
    adicionados++;
  });

  marcarPerfilInicializado();
  salvarPerfil(carregarPerfil());
  salvar();
  desenhar();
  mostrarFeedback(
    adicionados
      ? `${adicionados} hábito(s) adicionados com base na sua rotina.`
      : "Sua rotina sugerida já está na agenda."
  );
}

function processarHashHabito() {
  const hash = location.hash;
  if (!hash.startsWith("#habito-")) return;
  const id = Number(hash.replace("#habito-", ""));
  if (!Number.isFinite(id)) return;
  ativarPainel("hoje");
  setTimeout(() => irParaHabito(id), 300);
}

function desenharResumoAgenda() {
  if (!agendaResumo) return;

  const total = habitos.length;
  const feitos = habitos.filter((h) => estaFeitoHoje(h)).length;
  const pendente = total - feitos;
  const proximo = proximoCompromisso();

  let texto = "";
  if (total === 0) {
    texto = "Sua agenda está livre. Adicione um compromisso abaixo.";
  } else if (pendente === 0) {
    texto = "Tudo concluído por hoje.";
  } else if (proximo) {
    texto = `Próximo: <strong>${proximo.horario}</strong> — ${proximo.nome}`;
  } else {
    texto = `${pendente} compromisso${pendente > 1 ? "s" : ""} ainda hoje.`;
  }

  agendaResumo.innerHTML = `<p class="agenda-resumo-texto">${texto}</p>`;
  desenharFilosofia();
  desenharManha();
  desenharBannerTarde();
  desenharAgora();
  desenharInbox();
  desenharRevisao();
}

function desenharFilosofia() {
  if (!filosofiaDia) return;
  const citacao = fraseFilosoficaDoDia(hojeStr());
  const notaOntem = (notas[ontemStr()] || "").trim();
  const extra = complementoCoachDiario(notaOntem);

  filosofiaDia.innerHTML = `
    <p class="filosofia-texto">"${citacao.texto}"</p>
    <cite class="filosofia-autor">— ${citacao.autor}</cite>
    ${extra ? `<p class="filosofia-reflexao">${extra.trim()}</p>` : ""}`;
}

function criarItem(habito) {
  const hoje = hojeStr();
  const feito = estaFeitoHoje(habito);
  const streak = calcularStreak(habito);
  const recorde = calcularRecorde(habito);
  const multi = ehMultiPassos(habito);
  const progresso = progressoNoDia(habito, hoje);
  const totalPassos = passosTotal(habito);

  const item = document.createElement("li");
  const emFoco = ehPrioridadeHoje(hoje, habito.id);
  item.className = "item-habito" + (feito ? " feito" : "") + (emFoco ? " item-foco" : "");
  item.draggable = true;
  item.dataset.habitoId = String(habito.id);

  let controle;
  if (multi) {
    controle = document.createElement("button");
    controle.type = "button";
    controle.className = "botao-passos" + (feito ? " completo" : "");
    controle.textContent = `${progresso}/${totalPassos}`;
    controle.title = "Toque para registrar o próximo lembrete";
    controle.addEventListener("click", () => avancarHabito(habito.id));
  } else {
    controle = document.createElement("input");
    controle.type = "checkbox";
    controle.className = "checkbox-habito";
    controle.checked = feito;
    controle.addEventListener("change", () => avancarHabito(habito.id));
  }

  // Bloco central: nome + linha de informações
  const conteudo = document.createElement("div");
  conteudo.className = "item-conteudo";

  const linha = document.createElement("div");
  linha.className = "item-linha";

  if (habito.horario) {
    const hora = document.createElement("span");
    hora.className = "item-horario";
    hora.textContent = habito.horario;
    linha.appendChild(hora);
  }

  const nome = document.createElement("span");
  nome.className = "nome-habito";
  nome.textContent = habito.nome;
  linha.appendChild(nome);

  const imp = normalizarImportancia(habito.importancia);
  const badgeImp = document.createElement("button");
  badgeImp.type = "button";
  badgeImp.className = "badge-importancia imp-" + imp;
  badgeImp.textContent = rotuloImportancia(habito);
  badgeImp.title = "Toque para mudar importância (Essencial → Importante → Normal)";
  badgeImp.addEventListener("click", () => ciclarImportancia(habito.id));
  linha.appendChild(badgeImp);

  const meta = document.createElement("div");
  meta.className = "item-meta";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = habito.categoria || "Geral";
  meta.appendChild(tag);

  if (multi) {
    const passos = document.createElement("div");
    passos.className = "passos-pontos";
    passos.setAttribute("aria-hidden", "true");
    for (let i = 1; i <= totalPassos; i++) {
      const ponto = document.createElement("span");
      ponto.className = "passo-ponto" + (i <= progresso ? " ativo" : "");
      passos.appendChild(ponto);
    }
    meta.appendChild(passos);

    const lembrete = document.createElement("span");
    lembrete.className = "meta-info";
    lembrete.textContent =
      progresso === 0
        ? `${totalPassos} lembretes no dia`
        : feito
          ? "todos os lembretes feitos"
          : `lembrete ${progresso} de ${totalPassos}`;
    meta.appendChild(lembrete);

    const horariosTxt = textoHorariosLembretes(habito);
    if (horariosTxt) {
      const horariosEl = document.createElement("span");
      horariosEl.className = "meta-horarios-lembretes";
      horariosEl.textContent = horariosTxt;
      meta.appendChild(horariosEl);
    }
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

  conteudo.appendChild(linha);
  conteudo.appendChild(meta);

  const microLista = listaMicroPassos(habito);
  if (microLista.length && !multi) {
    const blocoMicro = document.createElement("ul");
    blocoMicro.className = "micro-lista";
    microLista.forEach((passo, indice) => {
      const li = document.createElement("li");
      li.className = "micro-item";

      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = microPassoFeito(habito, hoje, indice);
      check.addEventListener("change", () => alternarMicroPasso(habito.id, indice));

      const label = document.createElement("span");
      label.textContent = passo;

      li.appendChild(check);
      li.appendChild(label);
      blocoMicro.appendChild(li);
    });
    conteudo.appendChild(blocoMicro);

    if (todosMicroFeitos(habito, hoje) && !feito) {
      const dica = document.createElement("p");
      dica.className = "micro-completo-dica";
      dica.textContent = "Micro-passos feitos — pode marcar o hábito principal ✓";
      conteudo.appendChild(dica);
    }
  }

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

  const botaoFoco = document.createElement("button");
  botaoFoco.type = "button";
  botaoFoco.className = "botao-foco" + (emFoco ? " ativo" : "");
  botaoFoco.textContent = emFoco ? "★" : "☆";
  botaoFoco.title = `Prioridade de hoje (máx. ${MAX_PRIORIDADES})`;
  botaoFoco.addEventListener("click", () => alternarFocoHabito(habito.id));

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

  item.appendChild(controle);
  item.appendChild(conteudo);
  item.appendChild(marcaStreak);
  item.appendChild(botaoFoco);
  item.appendChild(botaoEditar);
  item.appendChild(botaoRemover);
  return item;
}

function desenhar() {
  desenharFiltros();

  const chave = hojeStr();
  let base =
    filtroCategoria === "Todas"
      ? habitos
      : habitos.filter((h) => (h.categoria || "Geral") === filtroCategoria);

  base = base.filter((h) => ehAtivoHoje(h));

  if (modoCabecaLeve()) {
    base = filtrarModoLeve(base, chave);
  }
  if (modoCerebroVazio()) {
    base = filtrarCerebroVazio(base, chave);
  }

  let visiveis = ordenarComPrioridades(ordenarPorHorario(base), chave);
  visiveis = aplicarLimiteDiario(visiveis, chave);

  if (toggleCabecaLeve) {
    toggleCabecaLeve.classList.toggle("ativo", modoCabecaLeve());
    toggleCabecaLeve.setAttribute("aria-pressed", modoCabecaLeve() ? "true" : "false");
  }
  if (toggleLimiteDiario) {
    toggleLimiteDiario.classList.toggle("ativo", limiteDiarioAtivo());
    toggleLimiteDiario.setAttribute("aria-pressed", limiteDiarioAtivo() ? "true" : "false");
  }
  if (toggleCerebroVazio) {
    toggleCerebroVazio.classList.toggle("ativo", modoCerebroVazio());
    toggleCerebroVazio.setAttribute("aria-pressed", modoCerebroVazio() ? "true" : "false");
  }

  if (rotuloFoco) rotuloFoco.hidden = habitos.length === 0;

  listaHabitos.innerHTML = "";
  if (habitos.length === 0) {
    mensagemVazia.style.display = "block";
    mensagemVazia.innerHTML =
      'Nenhum hábito na agenda. Vá em <strong>Rotina</strong> para criar o primeiro.';
  } else if (visiveis.length === 0 && (modoCabecaLeve() || modoCerebroVazio() || limiteDiarioAtivo())) {
    mensagemVazia.style.display = "block";
    mensagemVazia.textContent =
      "Nenhum hábito visível com os filtros atuais. Desative um modo ou marque prioridades.";
  } else {
    mensagemVazia.style.display = "none";
  }

  visiveis.forEach((habito) => listaHabitos.appendChild(criarItem(habito)));

  desenharResumoAgenda();
  desenharRelogio();
  atualizarResumo();
  desenharGrafico();
  desenharMetasSemana();
  desenharCardsInsights();
  desenharResumoSemana();
  desenharCalendario();
  desenharListaDiario();
  desenharPerfilAjustes();
}

function carregarNotaHoje() {
  notaHoje.value = notas[hojeStr()] || "";
}

// ============ LIGAÇÕES DE EVENTOS ============
function ligarEventosRotina() {
  const painelRotina = document.getElementById("painel-rotina");
  if (!painelRotina) return;

  painelRotina.addEventListener("click", (evento) => {
    const alvo = evento.target;

    if (alvo.closest("#botao-gerar-rotina")) {
      evento.preventDefault();
      executarGeracaoRotina();
      return;
    }
    if (alvo.closest("#botao-montar-adicionar")) {
      evento.preventDefault();
      montarEAdicionarRotina();
      return;
    }
    if (alvo.closest("#botao-regenerar-rotina")) {
      executarGeracaoRotina();
      return;
    }
    if (alvo.closest("#botao-aplicar-rotina")) {
      aplicarRotinaGerada();
      return;
    }

    const atalho = alvo.closest(".atalho[data-atalho]");
    if (atalho) adicionarAtalho(atalho.dataset.atalho);
  });

  [rotinaPerfil, rotinaHorarios, rotinaObjetivos].forEach((campo) => {
    campo?.addEventListener("input", salvarCamposRotina);
  });
}

function ligarTodosEventos() {
  ligarEventosRotina();

  botaoAdicionar?.addEventListener("click", adicionarHabito);
  entradaHabito?.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") adicionarHabito();
  });
  entradaHabito?.addEventListener("input", atualizarSugestaoHabito);
  botaoUsarSugestao?.addEventListener("click", aplicarSugestaoHabito);
  botaoTema?.addEventListener("click", alternarTema);
  botaoExportar?.addEventListener("click", exportarDados);
  entradaImportar?.addEventListener("change", importarDados);
  notaHoje?.addEventListener("input", () => {
    definirNota(hojeStr(), notaHoje.value);
  });
  diarioTexto?.addEventListener("input", () => {
    definirNota(dataDiarioSelecionada, diarioTexto.value);
  });
  diarioData?.addEventListener("change", () => {
    if (diarioData.value) carregarNotaDiario(diarioData.value);
  });
  diarioHojeBotao?.addEventListener("click", () => {
    carregarNotaDiario(hojeStr());
  });
  navPaineis?.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".nav-item");
    if (!botao) return;
    ativarPainel(botao.dataset.painel);
    if (botao.dataset.painel === "diario") {
      carregarNotaDiario(dataDiarioSelecionada || hojeStr());
    }
  });
  botaoDicaFechar?.addEventListener("click", fecharDicaInicio);
  botaoInbox?.addEventListener("click", capturarInbox);
  entradaInbox?.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") capturarInbox();
  });
  revisaoFeito?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "feito", revisaoFeito.value);
  });
  revisaoFicou?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "ficou", revisaoFicou.value);
  });
  revisaoAmanha?.addEventListener("input", () => {
    definirRevisaoCampo(hojeStr(), "amanha", revisaoAmanha.value);
  });
  botaoLembretes?.addEventListener("click", ativarLembretes);
  botaoArquivarInbox?.addEventListener("click", arquivarInbox);
  toggleCabecaLeve?.addEventListener("click", () => {
    definirModoCabecaLeve(!modoCabecaLeve());
    desenhar();
    mostrarFeedback(
      modoCabecaLeve()
        ? "Mostrando só essenciais e prioridades."
        : "Mostrando todos os hábitos."
    );
  });
  toggleLimiteDiario?.addEventListener("click", () => {
    definirLimiteDiario(!limiteDiarioAtivo());
    desenhar();
    mostrarFeedback(limiteDiarioAtivo() ? "Hoje só 5 compromissos visíveis." : "Mostrando todos.");
  });
  toggleCerebroVazio?.addEventListener("click", () => {
    definirModoCerebroVazio(!modoCerebroVazio());
    desenhar();
    mostrarFeedback(modoCerebroVazio() ? "Só 1 coisa na tela." : "Mostrando todos.");
  });
  manhaFoco1?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco1", manhaFoco1.value);
    desenharManha();
  });
  manhaFoco2?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco2", manhaFoco2.value);
    desenharManha();
  });
  manhaFoco3?.addEventListener("input", () => {
    definirRevisaoManhaCampo(hojeStr(), "foco3", manhaFoco3.value);
    desenharManha();
  });
  entradaTemaSemana?.addEventListener("input", () => {
    salvarTemaSemana(entradaTemaSemana.value);
  });
  botaoRotinaPersonalizada?.addEventListener("click", aplicarRotinaPersonalizada);
}

// ============ INICIALIZAÇÃO ============
export function initApp() {
  if (!perfilInicializado()) {
    salvarPerfil(carregarPerfil());
    marcarPerfilInicializado();
  }

  aplicarTema(localStorage.getItem("tema") || "claro");
  mostrarData();
  carregar();
  carregarCamposRotina();
  carregarNotaHoje();
  carregarNotaDiario(hojeStr());
  ligarTodosEventos();
  ativarPainel(painelAtivo);
  atualizarInfoVersao();
  mostrarDicaInicio();
  atualizarLembretesStatus();
  iniciarVerificacaoLembretes(rodarLembretes);
  if (intervaloRelogio) clearInterval(intervaloRelogio);
  intervaloRelogio = setInterval(() => {
    desenharRelogio();
    if (timerAtivo()) atualizarTimerUI(segundosRestantesTimer());
    else if (cronometroAtivo()) atualizarTimerUI(segundosCronometro());
  }, 1000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") rodarLembretes();
  });
  processarHashHabito();
  desenhar();
}

export function getEstadoExportavel() {
  return {
    habitos,
    notas,
    tema: localStorage.getItem("tema") || "claro",
  };
}

export function aplicarEstadoRemoto(dados) {
  habitos = migrarHabitosAgua(
    Array.isArray(dados.habitos) ? dados.habitos.map(normalizarHabito) : [],
    hojeStr()
  );
  notas = dados.notas && typeof dados.notas === "object" ? dados.notas : {};
  localStorage.setItem("meus-habitos", JSON.stringify(habitos));
  localStorage.setItem("notas-diarias", JSON.stringify(notas));
  if (dados.tema) aplicarTema(dados.tema);
  carregarNotaHoje();
  carregarNotaDiario(dataDiarioSelecionada || hojeStr());
  desenhar();
}

export {
  aplicarTema,
  carregarNotaDiario,
  carregarNotaHoje,
  desenhar,
  hojeStr,
};
