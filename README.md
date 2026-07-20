# Hábitos

Agenda diária de hábitos com visual **Studio calmo** (tipografia Fraunces + Manrope, paleta oliva/petróleo) e estrutura **Agenda executiva** (painéis Hoje, Semana, Insights e Ajustes). Funciona 100% no navegador: os dados ficam no `localStorage`.

## Funcionalidades

- **Painel Hoje** — checklist do dia, progresso, chama de sequência e nota.
- **Painel Semana** — gráfico dos últimos 7 dias e metas semanais por hábito.
- **Painel Insights** — sequência global, taxa de 30 dias, recorde e calendário do mês.
- **Painel Ajustes** — exportar/importar backup e tema claro/escuro.
- **Adicionar hábitos** com categoria, meta semanal e horário sugerido.
- **Filtros por categoria**, edição de nome e reordenação por arrastar e soltar.

## Como usar

Como é um site estático, basta servir os arquivos com qualquer servidor local. Por exemplo:

```bash
python3 -m http.server 5173
```

Depois abra `http://localhost:5173` no navegador.

## Estrutura do projeto

```
.
├── index.html   # Estrutura da página
├── style.css    # Estilos e temas (claro/escuro)
├── script.js    # Lógica do app (estado, cálculos e renderização)
└── README.md
```

## Tecnologias

- HTML, CSS e JavaScript puro (sem frameworks ou dependências).
- Persistência local via `localStorage`.

## Privacidade

Nenhum dado é enviado para servidores. Tudo é armazenado apenas no seu navegador. Use **Exportar** para fazer backup e **Importar** para restaurar em outro dispositivo.
