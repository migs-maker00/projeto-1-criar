// Catálogo de livros — metadados + módulos de estudo (texto original, sem copiar obras)

export const LIVRO_8_HABITOS = {
  id: "8-habitos-sharma",
  titulo: "A Riqueza que o Dinheiro Não Compra",
  autor: "Robin Sharma",
  subtitulo: "8 hábitos para uma vida mais próspera",
  categoria: "habitos",
  tags: ["hábitos", "prosperidade", "rotina"],
  palavrasChave: [
    "8 hábitos",
    "prospera",
    "próspera",
    "sharma",
    "riqueza",
    "dinheiro não compra",
    "vida plena",
  ],
  modulos: [
    {
      id: "riqueza-real",
      nome: "Riqueza de verdade",
      ideia: "Prosperidade não é só dinheiro — é viver com sentido.",
      perguntas: [
        {
          id: "r1",
          tipo: "escolha",
          pergunta: "Você ganha bem mas se sente vazio. O que isso sugere?",
          opcoes: [
            "Falta só trabalhar mais",
            "Dinheiro é uma parte da riqueza, não tudo",
            "Não tem solução",
          ],
          correta: 1,
          dica: "Riqueza real inclui saúde, propósito, relações e paz — não só conta bancária.",
        },
        {
          id: "r2",
          tipo: "reflexao",
          pergunta: "O que te faria sentir ‘rico’ hoje, sem gastar dinheiro?",
          dica: "Ex.: uma conversa boa, energia, tempo livre, aprender algo.",
        },
      ],
    },
    {
      id: "mestria",
      nome: "Hábito 1 — Mestria pessoal",
      ideia: "Desenvolver seus talentos e fazer o melhor trabalho que puder.",
      perguntas: [
        {
          id: "m1",
          tipo: "escolha",
          pergunta: "Qual atitude constrói mestria?",
          opcoes: [
            "Fazer o mínimo e esperar sorte",
            "Praticar um pouco todo dia no que importa",
            "Comparar-se com todo mundo nas redes",
          ],
          correta: 1,
          dica: "Mestria = repetição intencional, não perfeição de uma vez.",
        },
        {
          id: "m2",
          tipo: "reflexao",
          pergunta: "Qual talento ou habilidade você quer cultivar este mês?",
          dica: "Pode ser inglês, música, organização — escolha uma.",
        },
      ],
    },
    {
      id: "bem-estar",
      nome: "Hábito 2 — Bem-estar",
      ideia: "Corpo e mente com energia são base de tudo.",
      perguntas: [
        {
          id: "b1",
          tipo: "escolha",
          pergunta: "Chegou exausto da escola. O que é mais próspero?",
          opcoes: [
            "Jogar até 2h sem comer",
            "Água + lanche + 10 min de descanso antes de estudar",
            "Café e tela até de madrugada",
          ],
          correta: 1,
          dica: "Sem energia não há vida próspera — cuidar do corpo não é ‘perder tempo’.",
        },
        {
          id: "b2",
          tipo: "reflexao",
          pergunta: "O que você pode fazer hoje pelo seu sono ou movimento?",
          dica: "Pequeno: deitar 30 min mais cedo, academia, caminhada.",
        },
      ],
    },
    {
      id: "relacoes",
      nome: "Hábito 3 — Relacionamentos",
      ideia: "Conexões profundas valem mais que likes.",
      perguntas: [
        {
          id: "rel1",
          tipo: "escolha",
          pergunta: "O que fortalece uma amizade de verdade?",
          opcoes: [
            "Só falar quando precisa de favor",
            "Presença, escuta e honestidade",
            "Competir o tempo todo",
          ],
          correta: 1,
          dica: "Relacionamento próspero = qualidade, não quantidade.",
        },
        {
          id: "rel2",
          tipo: "reflexao",
          pergunta: "Quem merece um ‘obrigado’ ou mensagem sua esta semana?",
          dica: "Um gesto pequeno já conta.",
        },
      ],
    },
    {
      id: "proposito",
      nome: "Hábito 4 — Propósito",
      ideia: "Saber por que você faz o que faz.",
      perguntas: [
        {
          id: "p1",
          tipo: "reflexao",
          pergunta: "O que você quer que as pessoas lembrem de você daqui 5 anos?",
          dica: "Não precisa ser grandioso — só honesto.",
        },
        {
          id: "p2",
          tipo: "escolha",
          pergunta: "Estudar só por nota, sem saber por quê. Isso é…",
          opcoes: [
            "Sempre suficiente",
            "Ok no curto prazo, mas frágil no longo",
            "O ideal para todos",
          ],
          correta: 1,
          dica: "Propósito dá combustível quando a motivação some.",
        },
      ],
    },
    {
      id: "contribuicao",
      nome: "Hábito 5 — Contribuição",
      ideia: "Ajudar outros enriquece quem dá também.",
      perguntas: [
        {
          id: "c1",
          tipo: "escolha",
          pergunta: "Forma simples de contribuir na escola ou em casa?",
          opcoes: [
            "Explicar matéria para um colega",
            "Ignorar quem precisa de ajuda",
            "Só pensar em si",
          ],
          correta: 0,
          dica: "Contribuir não precisa ser grandioso — um gesto já transforma.",
        },
        {
          id: "c2",
          tipo: "reflexao",
          pergunta: "Como você pode ajudar alguém esta semana, em 15 minutos?",
          dica: "Ouvir, ensinar, arrumar algo junto.",
        },
      ],
    },
    {
      id: "tempo",
      nome: "Hábito 6 — Tempo e presença",
      ideia: "Onde sua atenção vai, sua vida vai.",
      perguntas: [
        {
          id: "t1",
          tipo: "escolha",
          pergunta: "Jantar com a família no celular o tempo todo. Isso é…",
          opcoes: [
            "Normal e sem problema",
            "Perder riqueza de presença",
            "Ser mais produtivo",
          ],
          correta: 1,
          dica: "Tempo de qualidade é riqueza — não dá para comprar de volta.",
        },
        {
          id: "t2",
          tipo: "reflexao",
          pergunta: "Onde você perde mais tempo sem perceber? O que faria diferente hoje?",
          dica: "Honestidade aqui já é progresso.",
        },
      ],
    },
    {
      id: "mente",
      nome: "Hábito 7 — Paz interior",
      ideia: "Serenidade e clareza mental.",
      perguntas: [
        {
          id: "pi1",
          tipo: "escolha",
          pergunta: "Mente acelerada antes de dormir. O que ajuda?",
          opcoes: [
            "Mais uma hora de feed",
            "Anotar o que está na cabeça + respirar 2 min",
            "Ignorar e torcer para passar",
          ],
          correta: 1,
          dica: "Esvaziar a cabeça é hábito — não luxo.",
        },
        {
          id: "pi2",
          tipo: "reflexao",
          pergunta: "O que te acalma de verdade? (música, silêncio, caminhada…)",
          dica: "Use isso quando a tarde ficar pesada.",
        },
      ],
    },
    {
      id: "financas",
      nome: "Hábito 8 — Liberdade financeira (com equilíbrio)",
      ideia: "Dinheiro é ferramenta, não o fim.",
      perguntas: [
        {
          id: "f1",
          tipo: "escolha",
          pergunta: "Gastar tudo no impulso vs guardar um pouco com objetivo. O que é mais próspero?",
          opcoes: [
            "Só gastar — vida curta",
            "Equilibrar prazer hoje e segurança amanhã",
            "Nunca gastar nada",
          ],
          correta: 1,
          dica: "Riqueza financeira saudável não é medo nem impulso — é consciência.",
        },
        {
          id: "f2",
          tipo: "reflexao",
          pergunta: "Um objetivo financeiro pequeno para este ano? (mesada, trabalho, poupar)",
          dica: "Meta clara ajuda a escolher melhor no dia a dia.",
        },
      ],
    },
  ],
};

export const LIVRO_ATOMICOS = {
  id: "habitos-atomicos",
  titulo: "Hábitos Atômicos",
  autor: "James Clear",
  subtitulo: "Mudanças pequenas, resultados grandes",
  categoria: "habitos",
  tags: ["hábitos", "rotina", "produtividade"],
  palavrasChave: ["atomicos", "atômicos", "james clear", "1%", "sistemas"],
  modulos: [
    {
      id: "1-porcento",
      nome: "1% melhor todo dia",
      ideia: "Pequenas melhorias compostas viram transformação.",
      perguntas: [
        {
          id: "a1",
          tipo: "escolha",
          pergunta: "Melhorar 1% por dia ou mudar tudo de uma vez?",
          opcoes: [
            "Mudar tudo segunda-feira (e desistir quinta)",
            "Um passo mínimo repetível",
            "Esperar motivação perfeita",
          ],
          correta: 1,
          dica: "Sistemas batam metas vazias — consistência ganha.",
        },
        {
          id: "a2",
          tipo: "reflexao",
          pergunta: "Qual hábito de 2 minutos você poderia fazer todo dia?",
          dica: "Ex.: abrir o material, 2 min de vocabulário.",
        },
      ],
    },
    {
      id: "identidade",
      nome: "Identidade, não só resultado",
      ideia: "Pergunte ‘que tipo de pessoa faz isso?’",
      perguntas: [
        {
          id: "id1",
          tipo: "reflexao",
          pergunta: "Complete: ‘Sou o tipo de pessoa que…’ (1 frase sobre estudo/rotina)",
          dica: "Identidade guia comportamento melhor que ‘quero passar na prova’.",
        },
        {
          id: "id2",
          tipo: "escolha",
          pergunta: "‘Quero tirar 10’ vs ‘Sou alguém que estuda um pouco todo dia’. Qual fixa mais?",
          opcoes: ["Só a nota", "A identidade", "Tanto faz"],
          correta: 1,
          dica: "Você repete o que acredita ser.",
        },
      ],
    },
    {
      id: "obvio",
      nome: "Lei 1 — Deixar óbvio",
      ideia: "O gatilho do hábito precisa estar na sua frente.",
      perguntas: [
        {
          id: "o1",
          tipo: "escolha",
          pergunta: "Quer estudar à noite. O que deixa o hábito óbvio?",
          opcoes: [
            "Material escondido na mochila fechada",
            "Livro/fone na mesa antes de chegar",
            "Depender de lembrar no meio do jogo",
          ],
          correta: 1,
          dica: "Ambiente é design — prepare antes do momento difícil.",
        },
        {
          id: "o2",
          tipo: "reflexao",
          pergunta: "O que você pode deixar visível hoje para um hábito bom?",
          dica: "Garrafa de água, caderno aberto, alarme com nome claro.",
        },
      ],
    },
    {
      id: "facil",
      nome: "Lei 3 — Deixar fácil",
      ideia: "Reduza atrito — versão mínima conta.",
      perguntas: [
        {
          id: "fa1",
          tipo: "escolha",
          pergunta: "Plano B inteligente quando está cansado?",
          opcoes: [
            "Desistir do dia inteiro",
            "2 min da versão mínima",
            "Só estudar se tiver 2 horas livres",
          ],
          correta: 1,
          dica: "Nunca falte duas vezes seguidas — mas 2 min salvam o hábito.",
        },
        {
          id: "fa2",
          tipo: "reflexao",
          pergunta: "Qual é a versão mais fácil do seu hábito de estudo?",
          dica: "Menor que isso ainda conta.",
        },
      ],
    },
  ],
};

export const LIVRO_NOITES_BRANCAS = {
  id: "noites-brancas",
  titulo: "Noites Brancas",
  autor: "Fiódor Dostoiévski",
  subtitulo: "Literatura e reflexão sobre amor e solidão",
  categoria: "literatura",
  tags: ["filosofia", "literatura", "amor", "clássico"],
  palavrasChave: ["noites brancas", "dostoiévski", "dostoevsky", "sonho", "solidão"],
  modulos: [
    {
      id: "solidao",
      nome: "Solidão e encontro",
      ideia: "A necessidade humana de conexão.",
      perguntas: [
        {
          id: "nb1",
          tipo: "reflexao",
          pergunta: "Quando você se sentiu sozinho mesmo rodeado de gente? O que faltou?",
          dica: "Solidão não é só estar só — é falta de conexão real.",
        },
        {
          id: "nb2",
          tipo: "escolha",
          pergunta: "Um encontro inesperado muda o dia de alguém. Por quê?",
          opcoes: [
            "Porque somos feitos para vínculo",
            "Porque sorte resolve tudo",
            "Não muda nada",
          ],
          correta: 0,
          dica: "Na obra, um encontro transforma a noite — conexão dá sentido.",
        },
      ],
    },
    {
      id: "idealizacao",
      nome: "Sonhar e idealizar",
      ideia: "Amar a imagem que criamos da pessoa.",
      perguntas: [
        {
          id: "nb3",
          tipo: "escolha",
          pergunta: "Idealizar alguém que mal conhecemos pode…",
          opcoes: [
            "Ser sempre saudável",
            "Criar expectativas que a realidade não cumpre",
            "Garantir felicidade eterna",
          ],
          correta: 1,
          dica: "O narrador sonha muito — idealização pode doer quando a realidade chega.",
        },
        {
          id: "nb3b",
          tipo: "reflexao",
          pergunta: "Você já idealizou alguém (amigo, crush, ídolo)? O que aprendeu?",
          dica: "Sem julgar — só observar.",
        },
      ],
    },
    {
      id: "escolhas",
      nome: "Escolhas e destino",
      ideia: "Momentos decisivos mudam a história.",
      perguntas: [
        {
          id: "nb4",
          tipo: "reflexao",
          pergunta: "Uma escolha pequena que mudou algo grande na sua vida?",
          dica: "Falar com alguém, mudar de escola, começar um hábito.",
        },
        {
          id: "nb5",
          tipo: "escolha",
          pergunta: "Diante de um sentimento forte, o que é mais sábio?",
          opcoes: [
            "Agir só no impulso",
            "Sentir, pensar um pouco e depois agir",
            "Nunca sentir nada",
          ],
          correta: 1,
          dica: "Paixão + reflexão — Dostoiévski explora os dois lados.",
        },
      ],
    },
  ],
};

export const LIVRO_MEDITACOES = {
  id: "meditacoes",
  titulo: "Meditações",
  autor: "Marco Aurélio",
  subtitulo: "Filosofia estoica para o dia a dia",
  categoria: "filosofia",
  tags: ["filosofia", "estoicismo", "clássico"],
  palavrasChave: ["marco aurélio", "meditações", "estoicismo", "filosofia", "controle"],
  modulos: [
    {
      id: "controle",
      nome: "O que está no seu controle",
      ideia: "Foque no que depende de você; aceite o resto.",
      perguntas: [
        {
          id: "ma1",
          tipo: "reflexao",
          pergunta: "Hoje: liste 1 coisa que você controla e 1 que não controla.",
          dica: "Atitude sua vs clima, humor dos outros, nota passada.",
        },
        {
          id: "ma2",
          tipo: "escolha",
          pergunta: "Prova difícil amanhã. Atitude estoica?",
          opcoes: [
            "Pânico o dia inteiro",
            "Preparar o que puder e aceitar o resultado",
            "Desistir antes de tentar",
          ],
          correta: 1,
          dica: "Esforço é seu; resultado nem sempre é.",
        },
      ],
    },
    {
      id: "impermanencia",
      nome: "Tudo passa",
      ideia: "Dificuldades e glórias são temporárias.",
      perguntas: [
        {
          id: "ma3",
          tipo: "reflexao",
          pergunta: "Algo que parecia o fim do mundo e passou. O que te ajudou?",
          dica: "Lembrar que passou fortalece para a próxima vez.",
        },
        {
          id: "ma4",
          tipo: "escolha",
          pergunta: "Briga forte com alguém. O que Marco Aurélio sugeriria primeiro?",
          opcoes: [
            "Guardar ódio para sempre",
            "Lembrar que a vida é curta e buscar clareza",
            "Ignorar para sempre sem resolver",
          ],
          correta: 1,
          dica: "Não é ser frio — é não desperdiçar energia no que não volta.",
        },
      ],
    },
  ],
};

export const TODOS_LIVROS = [
  LIVRO_8_HABITOS,
  LIVRO_ATOMICOS,
  LIVRO_NOITES_BRANCAS,
  LIVRO_MEDITACOES,
];

export const LIVRO_PADRAO = LIVRO_8_HABITOS;

export const CATEGORIAS_LIVRO = [
  { id: "todos", rotulo: "Todos" },
  { id: "habitos", rotulo: "Hábitos" },
  { id: "filosofia", rotulo: "Filosofia" },
  { id: "literatura", rotulo: "Literatura" },
];
