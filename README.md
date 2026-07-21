# Hábitos

Agenda diária de hábitos com visual **Studio calmo** e estrutura **Agenda executiva**. Funciona no navegador; os dados ficam no `localStorage` do aparelho.

**Online:** https://migs-maker00.github.io/projeto-1-criar/

## Funcionalidades

- **Hoje** — checklist, coach do dia, frases filosóficas, sugestão rápida ao criar hábito
- **Rotina** — planejador com IA (Google Gemini) + fallback local
- **Semana** — gráfico dos últimos 7 dias e metas semanais
- **Diário** — notas por data
- **Insights** — sequência, taxa de 30 dias, resumo da semana, calendário
- **Ajustes** — sync Firebase, backup, tema, chave da IA

## Arquitetura

```
.
├── index.html              # Shell da aplicação
├── style.css               # Estilos e temas
├── firebase-config.js      # Config Firebase (sync)
├── sync.js                 # Sincronização Mac ↔ iPhone
├── js/
│   ├── config.js           # Versão do app (cache-bust)
│   ├── main.js             # Entrada — inicializa e expõe API pro sync
│   ├── app.js              # UI, estado, renderização, eventos
│   └── lib/
│       ├── filosofia.js    # Citações filosóficas do dia
│       ├── inteligencia.js # Coach, resumo, sugestões, alertas
│       └── rotina-ia.js    # Planejador de rotina (Gemini + local)
└── manifest.webmanifest    # PWA
```

- **ES Modules** — `main.js` importa `app.js` e as libs
- **Sem build** — GitHub Pages serve os arquivos direto
- **sync.js** usa `window.getEstadoHabitos` etc., expostos por `main.js`

## Desenvolvimento local

```bash
cd "/Users/ericafaustino/Projeto 1 - Criar"
python3 -m http.server 5173
```

Abra http://localhost:5173

## IA da rotina (Gemini)

1. Crie uma chave grátis em [Google AI Studio](https://aistudio.google.com/apikey)
2. No app: **Ajustes → IA da rotina** → cole e salve
3. Use a aba **Rotina** para montar hábitos com base na sua agenda

## Privacidade

Hábitos e notas ficam no seu navegador. A chave Gemini fica só no `localStorage` local. O sync Firebase é opcional.
