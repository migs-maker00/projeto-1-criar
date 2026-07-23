// Foco — relógio visível, countdown e timer de 2 minutos (TDAH)

export function horaFormatada(data = new Date()) {
  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function minutosAte(horarioHHMM) {
  if (!horarioHHMM || !/^\d{1,2}:\d{2}$/.test(horarioHHMM)) return null;
  const [hh, mm] = horarioHHMM.split(":").map(Number);
  const agora = new Date();
  const alvo = new Date();
  alvo.setHours(hh, mm, 0, 0);
  return Math.round((alvo - agora) / 60000);
}

export function textoCountdown(minutos) {
  if (minutos == null) return "";
  if (minutos < 0) return "passou";
  if (minutos === 0) return "agora";
  if (minutos < 60) return `em ${minutos} min`;
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m ? `em ${h}h${String(m).padStart(2, "0")}` : `em ${h}h`;
}

export function proximoHorarioPendente(habitos, { estaPendente, horariosDoHabito }) {
  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
  let melhor = null;

  habitos.forEach((habito) => {
    if (!estaPendente(habito)) return;
    const horarios = horariosDoHabito(habito);
    horarios.forEach((hora) => {
      const [hh, mm] = hora.split(":").map(Number);
      const min = hh * 60 + mm;
      if (min < minutosAgora) return;
      if (!melhor || min < melhor.minutos) {
        melhor = { habito, horario: hora, minutos: min };
      }
    });
  });

  return melhor;
}

export function formatarTimer(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

let timerInterval = null;
let timerRestante = 0;
let timerMeta = null;

export function timerAtivo() {
  return timerInterval !== null;
}

export function segundosRestantesTimer() {
  return timerRestante;
}

export function metaTimer() {
  return timerMeta;
}

export function iniciarTimer(segundos, meta, { onTick, onFim }) {
  pararCronometro();
  cancelarTimer();
  timerRestante = segundos;
  timerMeta = meta;
  onTick?.(timerRestante, timerMeta);
  timerInterval = setInterval(() => {
    timerRestante -= 1;
    onTick?.(timerRestante, timerMeta);
    if (timerRestante <= 0) {
      const fimMeta = timerMeta;
      cancelarTimer();
      onFim?.(fimMeta);
    }
  }, 1000);
}

export function cancelarTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  timerRestante = 0;
  timerMeta = null;
  pararCronometro();
}

let cronometroInterval = null;
let cronometroSegundos = 0;
let cronometroMeta = null;

export function cronometroAtivo() {
  return cronometroInterval !== null;
}

export function segundosCronometro() {
  return cronometroSegundos;
}

export function metaCronometro() {
  return cronometroMeta;
}

export function iniciarCronometro(meta, { onTick }) {
  pararCronometro();
  cancelarTimer();
  cronometroSegundos = 0;
  cronometroMeta = meta;
  onTick?.(cronometroSegundos, cronometroMeta);
  cronometroInterval = setInterval(() => {
    cronometroSegundos += 1;
    onTick?.(cronometroSegundos, cronometroMeta);
  }, 1000);
}

export function pararCronometro() {
  if (cronometroInterval) clearInterval(cronometroInterval);
  cronometroInterval = null;
  cronometroSegundos = 0;
  cronometroMeta = null;
}
