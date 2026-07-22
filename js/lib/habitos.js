// Modelo de hábitos — simples ou com vários lembretes no mesmo dia (ex.: água 6/6)

export function passosTotal(habito) {
  const n = Number(habito.lembretes);
  return Number.isFinite(n) && n > 1 ? Math.round(n) : 1;
}

export function ehMultiPassos(habito) {
  return passosTotal(habito) > 1;
}

export function valorHistorico(habito, chave) {
  return habito.historico?.[chave];
}

export function progressoNoDia(habito, chave) {
  const v = valorHistorico(habito, chave);
  if (v === true) return passosTotal(habito);
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.min(Math.round(n), passosTotal(habito)) : 0;
}

export function estaCompletoNoDia(habito, chave) {
  const total = passosTotal(habito);
  if (total === 1) return valorHistorico(habito, chave) === true;
  return progressoNoDia(habito, chave) >= total;
}

export function temProgressoNoDia(habito, chave) {
  return progressoNoDia(habito, chave) > 0;
}

export function normalizarTexto(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function detectarTextoAgua(texto) {
  return /agua|litro|hidrata/.test(normalizarTexto(texto));
}

export function ehHabitoAgua(habito) {
  return detectarTextoAgua(habito.nome);
}

export function nomeAguaLimpo() {
  return "Beber água";
}

export function normalizarHabito(h) {
  const lembretes = Number(h.lembretes);
  const habito = {
    id: h.id,
    nome: h.nome,
    categoria: h.categoria || "Geral",
    metaSemanal: h.metaSemanal || 7,
    horario: h.horario || "",
    historico: h.historico || {},
  };
  if (Number.isFinite(lembretes) && lembretes > 1) {
    habito.lembretes = Math.round(lembretes);
  }
  return habito;
}

function contribuicaoDia(habito, chave) {
  const v = valorHistorico(habito, chave);
  if (v === true) return 1;
  if (typeof v === "number" && v > 0) return Math.round(v);
  return 0;
}

export function migrarHabitosAgua(lista, chaveHoje) {
  const agua = [];
  const outros = [];

  lista.map(normalizarHabito).forEach((h) => {
    if (ehHabitoAgua(h)) agua.push(h);
    else outros.push(h);
  });

  if (agua.length === 0) return lista.map(normalizarHabito);

  if (agua.length === 1) {
    const unico = agua[0];
    if (!unico.lembretes) unico.lembretes = 6;
    unico.nome = nomeAguaLimpo();
    unico.categoria = "Saúde";
    return [...outros, unico];
  }

  const consolidado = {
    id: agua[0].id,
    nome: nomeAguaLimpo(),
    categoria: "Saúde",
    metaSemanal: 7,
    horario: agua.find((h) => h.horario)?.horario || "07:00",
    lembretes: 6,
    historico: {},
  };

  const todasChaves = new Set();
  agua.forEach((h) => Object.keys(h.historico).forEach((k) => todasChaves.add(k)));

  todasChaves.forEach((chave) => {
    let passos = 0;
    agua.forEach((h) => {
      passos += contribuicaoDia(h, chave);
    });
    if (passos > 0) {
      consolidado.historico[chave] = Math.min(6, passos);
    }
  });

  if (chaveHoje && !consolidado.historico[chaveHoje]) {
    let passosHoje = 0;
    agua.forEach((h) => {
      if (estaCompletoNoDia(h, chaveHoje) || h.historico[chaveHoje]) passosHoje++;
    });
    if (passosHoje > 0) {
      consolidado.historico[chaveHoje] = Math.min(6, passosHoje);
    }
  }

  return [...outros, consolidado];
}

export function criarHabitoAgua(id) {
  return {
    id,
    nome: nomeAguaLimpo(),
    categoria: "Saúde",
    metaSemanal: 7,
    horario: "07:00",
    lembretes: 6,
    historico: {},
  };
}
