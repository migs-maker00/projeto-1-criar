// Planejador de rotina com IA (Google Gemini) + fallback local

const MODELOS_GEMINI = [
  "gemini-1.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash-8b",
];
const CATEGORIAS_VALIDAS = ["Geral", "Saúde", "Estudo", "Trabalho", "Lazer"];

function obterChaveGemini() {
  return (localStorage.getItem("gemini-api-key") || "").trim();
}

function salvarChaveGemini(chave) {
  const limpa = (chave || "").trim();
  if (limpa) {
    localStorage.setItem("gemini-api-key", limpa);
  } else {
    localStorage.removeItem("gemini-api-key");
  }
}

function salvarPerfilRotina(perfil) {
  localStorage.setItem("rotina-perfil-ia", JSON.stringify(perfil));
}

function carregarPerfilRotina() {
  try {
    return JSON.parse(localStorage.getItem("rotina-perfil-ia") || "{}");
  } catch {
    return {};
  }
}

function montarPromptRotina({ perfil, horarios, objetivos, habitosExistentes }) {
  const listaAtual =
    habitosExistentes.length === 0
      ? "Nenhum."
      : habitosExistentes
          .map(
            (h) =>
              `- ${h.nome} (${h.categoria}, meta ${h.metaSemanal}x/sem${h.horario ? `, ${h.horario}` : ""})`
          )
          .join("\n");

  return `Você é um planejador de rotina e coach de hábitos. Responda em português do Brasil.

PERFIL E CONTEXTO:
${perfil || "(não informado)"}

HORÁRIOS OCUPADOS / AGENDA FIXA:
${horarios || "(não informado)"}

OBJETIVOS, DIFICULDADES E O QUE QUER MELHORAR:
${objetivos || "(não informado)"}

HÁBITOS JÁ NA AGENDA (não duplique; pode sugerir complementos):
${listaAtual}

REGRAS OBRIGATÓRIAS:
1. Respeite os horários ocupados — NUNCA agende hábitos nesses períodos.
2. Hidratação/água: divida em 4 a 6 lembretes curtos ao longo do dia nos intervalos livres (ex.: ao acordar, meio da manhã, almoço, tarde, jantar, antes de dormir). NÃO use um único horário para "beber 3 litros".
3. Máximo 8 hábitos — rotina enxuta e realista.
4. Horários em formato HH:MM (24h), apenas em janelas livres.
5. metaSemanal: inteiro de 1 a 7 (7 = todos os dias).
6. categoria: exatamente uma de: Geral, Saúde, Estudo, Trabalho, Lazer.
7. nome: máximo 55 caracteres, claro e acionável.
8. motivo: uma frase curta explicando por que aquele horário faz sentido.
9. Priorize o que o usuário disse que tem dificuldade.
10. Se jiu-jitsu, esporte ou escola aparecer na agenda, organize estudo e descanso ao redor disso.

Responda SOMENTE com JSON válido neste formato:
{
  "mensagem": "2-3 frases explicando a lógica da rotina de forma acolhedora",
  "habitos": [
    {
      "nome": "string",
      "categoria": "Saúde",
      "metaSemanal": 7,
      "horario": "06:30",
      "motivo": "string"
    }
  ]
}`;
}

function validarHabitoIA(item) {
  if (!item || typeof item.nome !== "string") return null;
  const nome = item.nome.trim().slice(0, 60);
  if (!nome) return null;

  const categoria = CATEGORIAS_VALIDAS.includes(item.categoria)
    ? item.categoria
    : "Geral";

  let metaSemanal = Number(item.metaSemanal);
  if (!Number.isFinite(metaSemanal) || metaSemanal < 1) metaSemanal = 7;
  if (metaSemanal > 7) metaSemanal = 7;

  let horario = "";
  if (typeof item.horario === "string" && /^\d{2}:\d{2}$/.test(item.horario)) {
    horario = item.horario;
  }

  const motivo =
    typeof item.motivo === "string" ? item.motivo.trim().slice(0, 120) : "";

  return { nome, categoria, metaSemanal, horario, motivo };
}

function extrairJsonResposta(texto) {
  const limpo = texto.trim();
  try {
    return JSON.parse(limpo);
  } catch {
    const match = limpo.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("A IA não retornou um formato válido. Tente de novo.");
  }
}

function horaParaMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function minutosParaHora(min) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function extrairBlocosOcupados(texto) {
  const blocos = [];
  const regex =
    /(\d{1,2})[:h](\d{2})?\s*[-–àa]\s*(\d{1,2})[:h](\d{2})?/gi;
  let match;
  while ((match = regex.exec(texto)) !== null) {
    const ini = `${match[1].padStart(2, "0")}:${(match[2] || "00").padStart(2, "0")}`;
    const fim = `${match[3].padStart(2, "0")}:${(match[4] || "00").padStart(2, "0")}`;
    blocos.push({ ini: horaParaMinutos(ini), fim: horaParaMinutos(fim) });
  }
  return blocos;
}

function horarioLivre(candidato, blocos) {
  const t = horaParaMinutos(candidato);
  return !blocos.some((b) => t >= b.ini && t < b.fim);
}

function escolherHorariosLivres(candidatos, blocos, max = 6) {
  return candidatos.filter((h) => horarioLivre(h, blocos)).slice(0, max);
}

function gerarRotinaLocal(dados) {
  const texto = `${dados.perfil || ""} ${dados.horarios || ""} ${dados.objetivos || ""}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const blocos = extrairBlocosOcupados(dados.horarios || "");
  const habitos = [];
  const nomesExistentes = new Set(
    (dados.habitosExistentes || []).map((h) => h.nome.toLowerCase())
  );

  function add(h) {
    const v = validarHabitoIA(h);
    if (!v || nomesExistentes.has(v.nome.toLowerCase())) return;
    if (v.horario && !horarioLivre(v.horario, blocos)) return;
    habitos.push(v);
    nomesExistentes.add(v.nome.toLowerCase());
  }

  if (/agua|litro|hidrata/.test(texto)) {
    const slots = escolherHorariosLivres(
      ["06:30", "09:30", "12:00", "15:30", "18:00", "21:00"],
      blocos,
      6
    );
    slots.forEach((h, i) => {
      add({
        nome: `Beber água (${i + 1}/${slots.length})`,
        categoria: "Saúde",
        metaSemanal: 7,
        horario: h,
        motivo: "Lembretes espaçados para bater a meta de hidratação",
      });
    });
  }

  if (/ler|leitura|livro/.test(texto)) {
    const slot =
      escolherHorariosLivres(["16:30", "20:00", "21:30", "06:45"], blocos, 1)[0] ||
      "20:00";
    add({
      nome: "Ler 20 minutos",
      categoria: "Estudo",
      metaSemanal: 7,
      horario: slot,
      motivo: "Janela tranquila fora dos compromissos fixos",
    });
  }

  if (/medita|silencio|mindful/.test(texto)) {
    const slot =
      escolherHorariosLivres(["06:15", "22:45", "16:45", "12:30"], blocos, 1)[0] ||
      "06:15";
    add({
      nome: "Meditação e silêncio (10 min)",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: slot,
      motivo: "Momento de pausa antes ou depois da rotina corrida",
    });
  }

  if (/dormir|sono/.test(texto)) {
    add({
      nome: "Preparar para dormir",
      categoria: "Saúde",
      metaSemanal: 7,
      horario: "22:30",
      motivo: "Rotina de desaceleração no fim do dia",
    });
  }

  if (/estud|prova|facul|escola/.test(texto)) {
    const slot =
      escolherHorariosLivres(["17:00", "16:30", "19:00", "07:00"], blocos, 1)[0] ||
      "17:00";
    add({
      nome: "Sessão de estudo focado (30 min)",
      categoria: "Estudo",
      metaSemanal: 5,
      horario: slot,
      motivo: "Bloco de foco fora do horário de aula",
    });
  }

  if (habitos.length < 3) {
    add({
      nome: "Caminhada leve (15 min)",
      categoria: "Saúde",
      metaSemanal: 5,
      horario: escolherHorariosLivres(["07:00", "17:30", "18:30"], blocos, 1)[0] || "07:00",
      motivo: "Movimento simples para manter energia",
    });
    add({
      nome: "Revisar o dia no diário",
      categoria: "Geral",
      metaSemanal: 7,
      horario: escolherHorariosLivres(["22:00", "21:30"], blocos, 1)[0] || "22:00",
      motivo: "Fechamento consciente do dia",
    });
  }

  return {
    mensagem:
      "Montei uma rotina básica com base no que você escreveu. " +
      "(O Google bloqueou a IA agora — usei o planejador local do app. " +
      "Você pode tentar a IA de novo mais tarde.)",
    habitos: habitos.slice(0, 8),
    usouFallback: true,
  };
}

async function chamarGeminiModelo(chave, modelo, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${encodeURIComponent(chave)}`;

  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.65,
      },
    }),
  });

  return { resposta, modelo };
}

async function chamarGemini(chave, prompt) {
  let ultimoErro = null;

  for (const modelo of MODELOS_GEMINI) {
    const { resposta } = await chamarGeminiModelo(chave, modelo, prompt);

    if (resposta.ok) {
      return resposta.json();
    }

    const erro = await resposta.json().catch(() => ({}));
    const msg = erro?.error?.message || `Erro ${resposta.status}`;
    ultimoErro = { status: resposta.status, msg, modelo };

    if (resposta.status === 400 && /API key/i.test(msg)) {
      throw new Error("Chave do Gemini inválida. Verifique em Ajustes.");
    }

    if (resposta.status === 404) continue;
    if (resposta.status === 429) break;
  }

  if (ultimoErro?.status === 429) {
    const err = new Error("GEMINI_LIMITE");
    err.codigo = "GEMINI_LIMITE";
    throw err;
  }

  throw new Error(
    ultimoErro?.msg ||
      "Não foi possível conectar à IA do Google. Tente de novo em alguns minutos."
  );
}

async function gerarRotinaComIA(dados) {
  const chave = obterChaveGemini();

  if (!chave) {
    const local = gerarRotinaLocal(dados);
    if (local.habitos.length > 0) return local;
    throw new Error(
      "Configure sua chave do Gemini em Ajustes → IA da rotina, ou preencha mais detalhes para o modo local."
    );
  }

  const prompt = montarPromptRotina(dados);

  try {
    const corpo = await chamarGemini(chave, prompt);
    const texto =
      corpo?.candidates?.[0]?.content?.parts?.[0]?.text ||
      corpo?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");

    if (!texto) {
      throw new Error("sem texto");
    }

    const parsed = extrairJsonResposta(texto);
    const habitos = (parsed.habitos || []).map(validarHabitoIA).filter(Boolean);

    if (habitos.length === 0) {
      throw new Error("vazio");
    }

    return {
      mensagem:
        typeof parsed.mensagem === "string"
          ? parsed.mensagem.trim()
          : "Sua rotina foi organizada nos horários livres do seu dia.",
      habitos,
      usouFallback: false,
    };
  } catch (erro) {
    const local = gerarRotinaLocal(dados);
    if (local.habitos.length === 0) {
      if (erro.codigo === "GEMINI_LIMITE") {
        throw new Error(
          "O Google bloqueou sua chave gratuita agora (pode acontecer na 1ª tentativa — limite deles, não seu). " +
            "Espere alguns minutos ou use o modo local preenchendo escola/horários."
        );
      }
      throw erro;
    }
    return local;
  }
}

export {
  obterChaveGemini,
  salvarChaveGemini,
  carregarPerfilRotina,
  salvarPerfilRotina,
  gerarRotinaComIA,
};
