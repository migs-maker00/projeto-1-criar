# Hábitos

Um app simples e bonito para acompanhar hábitos diários, manter sequências ("não quebre a corrente") e visualizar seu progresso ao longo do tempo. Funciona 100% no navegador, sem back-end: todos os dados ficam salvos localmente no seu dispositivo (`localStorage`).

## Funcionalidades

- **Adicionar hábitos** com categoria, meta semanal e horário sugerido.
- **Marcar como feito** a cada dia e acompanhar o **progresso de hoje** com barra de conclusão.
- **Sequências (streaks)** por hábito e uma **sequência global** representada por uma mascote em forma de chama que muda de humor conforme sua constância.
- **Recorde** de dias seguidos para cada hábito.
- **Filtros por categoria** (Geral, Saúde, Estudo, Trabalho, Lazer).
- **Gráfico dos últimos 7 dias** com a porcentagem de hábitos concluídos.
- **Calendário do mês** no estilo "não quebre a corrente", com níveis de intensidade por dia.
- **Nota diária** para registrar como foi o dia.
- **Tema claro/escuro** com preferência salva.
- **Reordenar hábitos** arrastando e soltando.
- **Backup dos dados**: exportar e importar em JSON.

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
