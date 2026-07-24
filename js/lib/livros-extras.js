// Livros adicionais — módulos compactos para prática guiada

export const LIVRO_TRABALHO_FOCADO = {
  id: "trabalho-focado",
  titulo: "Trabalho Focado",
  autor: "Cal Newport",
  subtitulo: "Como ter sucesso em um mundo distraído",
  categoria: "habitos",
  tags: ["foco", "profundidade", "distração"],
  palavrasChave: ["cal newport", "deep work", "focado", "concentração", "distração", "celular"],
  modulos: [
    {
      id: "profundidade",
      nome: "Trabalho profundo",
      ideia: "Foco sem interrupção é raro — e valioso.",
      perguntas: [
        {
          id: "tf1",
          tipo: "escolha",
          pergunta: "Duas horas com celular ao lado vs. 45 min sem notificações. O que rende mais?",
          opcoes: ["Celular perto — dá pra multitarefa", "45 min sem interrupção", "Tanto faz"],
          correta: 1,
          dica: "Profundidade bate volume disperso quase sempre.",
        },
        {
          id: "tf2",
          tipo: "reflexao",
          pergunta: "Quando foi a última vez que você estudou 25 min sem olhar o celular?",
          dica: "Sem culpa — só notar o padrão.",
        },
      ],
    },
    {
      id: "ritual",
      nome: "Ritual de foco",
      ideia: "O cérebro aprende a entrar em modo profundo com gatilhos fixos.",
      perguntas: [
        {
          id: "tf3",
          tipo: "escolha",
          pergunta: "O que ajuda a entrar em foco mais rápido?",
          opcoes: [
            "Começar sem plano e ver no que dá",
            "Mesmo lugar, mesma música, timer definido",
            "Esperar ‘estar inspirada’",
          ],
          correta: 1,
          dica: "Ritual reduz atrito — o cérebro reconhece o sinal.",
        },
        {
          id: "tf4",
          tipo: "reflexao",
          pergunta: "Qual seria seu ritual de 3 passos antes de estudar?",
          dica: "Ex.: água, fone, timer de 25 min.",
        },
      ],
    },
  ],
};

export const LIVRO_ESSENCIALISMO = {
  id: "essencialismo",
  titulo: "Essencialismo",
  autor: "Greg McKeown",
  subtitulo: "A disciplina de fazer menos, porém melhor",
  categoria: "habitos",
  tags: ["prioridade", "menos", "clareza"],
  palavrasChave: ["essencialismo", "mckeown", "menos é mais", "prioridade", "não"],
  modulos: [
    {
      id: "menos",
      nome: "Menos, porém melhor",
      ideia: "Dizer não é proteger o que importa.",
      perguntas: [
        {
          id: "es1",
          tipo: "escolha",
          pergunta: "Agenda lotada de coisas ‘legais’. O essencialista faz o quê?",
          opcoes: [
            "Aceita tudo e se esgota",
            "Escolhe poucas coisas e faz bem feito",
            "Some e ignora todo mundo",
          ],
          correta: 1,
          dica: "Essencialismo não é preguiça — é escolha consciente.",
        },
        {
          id: "es2",
          tipo: "reflexao",
          pergunta: "O que você poderia dizer não esta semana, sem culpa?",
          dica: "Uma coisa só — pode ser pequena.",
        },
      ],
    },
    {
      id: "clareza",
      nome: "Clareza de prioridade",
      ideia: "Se tudo é prioridade, nada é.",
      perguntas: [
        {
          id: "es3",
          tipo: "escolha",
          pergunta: "Três metas urgentes ao mesmo tempo. Melhor atitude?",
          opcoes: [
            "Correr nas três pela metade",
            "Escolher a mais importante agora",
            "Paralisar e rolar o feed",
          ],
          correta: 1,
          dica: "Uma vitória clara vale mais que três meias.",
        },
        {
          id: "es4",
          tipo: "reflexao",
          pergunta: "Se só pudesse fazer UMA coisa hoje, qual seria?",
          dica: "Essa é sua essência do dia.",
        },
      ],
    },
  ],
};

export const LIVRO_SENTIDO = {
  id: "sentido-frankl",
  titulo: "Em Busca de Sentido",
  autor: "Viktor Frankl",
  subtitulo: "Entre o sofrimento e a escolha de como responder",
  categoria: "filosofia",
  tags: ["sentido", "resiliência", "escolha"],
  palavrasChave: ["frankl", "sentido", "logoterapia", "auschwitz", "liberdade interior"],
  modulos: [
    {
      id: "liberdade",
      nome: "Última liberdade humana",
      ideia: "Entre estímulo e resposta, há espaço para escolher.",
      perguntas: [
        {
          id: "fr1",
          tipo: "escolha",
          pergunta: "Situação difícil que você não escolheu. O que ainda está sob seu controle?",
          opcoes: [
            "Nada — sou vítima total",
            "Sua atitude e o sentido que dá ao que vive",
            "Só a opinião dos outros",
          ],
          correta: 1,
          dica: "Frankl: podemos não controlar o que acontece, mas como respondemos.",
        },
        {
          id: "fr2",
          tipo: "reflexao",
          pergunta: "Num dia ruim recente, o que você ainda pôde escolher?",
          dica: "Tom de voz, honestidade, um pequeno gesto de cuidado.",
        },
      ],
    },
    {
      id: "proposito",
      nome: "Sentido como bússola",
      ideia: "Quem tem um ‘porquê’ aguenta quase qualquer ‘como’.",
      perguntas: [
        {
          id: "fr3",
          tipo: "reflexao",
          pergunta: "O que te faz levantar da cama além de obrigação?",
          dica: "Pode ser alguém, um sonho, um valor — não precisa ser grandioso.",
        },
        {
          id: "fr4",
          tipo: "escolha",
          pergunta: "Sentido na vida vem principalmente de…",
          opcoes: [
            "Só de prazer e conforto",
            "Criar, amar, servir ou superar algo",
            "Esperar que alguém defina por você",
          ],
          correta: 1,
          dica: "Sentido se constrói — não se recebe de presente.",
        },
      ],
    },
  ],
};

export const LIVRO_PODER_HABITO = {
  id: "poder-habito",
  titulo: "O Poder do Hábito",
  autor: "Charles Duhigg",
  subtitulo: "Por que fazemos o que fazemos",
  categoria: "habitos",
  tags: ["hábitos", "rotina", "gatilho"],
  palavrasChave: ["duhigg", "hábito", "loop", "gatilho", "recompensa", "rotina"],
  modulos: [
    {
      id: "loop",
      nome: "O loop do hábito",
      ideia: "Gatilho → rotina → recompensa. Todo hábito segue esse ciclo.",
      perguntas: [
        {
          id: "ph1",
          tipo: "escolha",
          pergunta: "Você pega o celular sem perceber. Qual parte do loop atacar primeiro?",
          opcoes: [
            "A recompensa (culpa depois)",
            "O gatilho (tédio, notificação, horário)",
            "Ignorar — é falta de força de vontade",
          ],
          correta: 1,
          dica: "Ver o gatilho é o primeiro passo para mudar a rotina.",
        },
        {
          id: "ph2",
          tipo: "reflexao",
          pergunta: "Um hábito seu: qual é o gatilho? E a ‘recompensa’ que o cérebro busca?",
          dica: "Ex.: estresse → scroll → alívio momentâneo.",
        },
      ],
    },
    {
      id: "substituir",
      nome: "Substituir, não apagar",
      ideia: "O cérebro mantém o gatilho e a recompensa — muda-se a rotina do meio.",
      perguntas: [
        {
          id: "ph3",
          tipo: "escolha",
          pergunta: "Quer parar de procrastinar. Estratégia mais realista?",
          opcoes: [
            "‘Nunca mais’ sem plano",
            "Mesmo gatilho, rotina menor e melhor (2 min de estudo)",
            "Só força de vontade na véspera da prova",
          ],
          correta: 1,
          dica: "Troque o meio do loop — o cérebro aceita melhor.",
        },
        {
          id: "ph4",
          tipo: "reflexao",
          pergunta: "Que rotina boa de 2 min você poderia colocar no lugar de um hábito ruim?",
          dica: "Pequeno o suficiente para não assustar.",
        },
      ],
    },
  ],
};

export const LIVRO_ARRUME_CAMA = {
  id: "arrume-cama",
  titulo: "Arrume a sua Cama",
  autor: "William McRaven",
  subtitulo: "Pequenas ações que mudam tudo",
  categoria: "habitos",
  tags: ["disciplina", "manhã", "resiliência"],
  palavrasChave: ["mcraven", "cama", "marinha", "disciplina", "manhã"],
  modulos: [
    {
      id: "primeira-vitoria",
      nome: "A primeira vitória do dia",
      ideia: "Começar bem uma tarefa pequena dá impulso para o resto.",
      perguntas: [
        {
          id: "ac1",
          tipo: "escolha",
          pergunta: "Por que ‘arrumar a cama’ virou símbolo de disciplina?",
          opcoes: [
            "Porque é difícil demais",
            "Porque é uma vitória simples que você controla",
            "Porque decoração importa mais que tudo",
          ],
          correta: 1,
          dica: "Pequenas vitórias alimentam o dia — especialmente com TDAH.",
        },
        {
          id: "ac2",
          tipo: "reflexao",
          pergunta: "Qual seria sua ‘vitória de 2 minutos’ ao acordar?",
          dica: "Não precisa ser cama — pode ser água, roupa, janela.",
        },
      ],
    },
    {
      id: "resiliencia",
      nome: "Não desista no meio da tempestade",
      ideia: "Vida vai bater forte — importa continuar.",
      perguntas: [
        {
          id: "ac3",
          tipo: "reflexao",
          pergunta: "Uma vez que você quis desistir mas continuou. O que te segurou?",
          dica: "Pode ser alguém, um lembrete, raiva boa, fé.",
        },
        {
          id: "ac4",
          tipo: "escolha",
          pergunta: "Dia péssimo. O que McRaven sugeriria?",
          opcoes: [
            "Desistir — não adianta",
            "Fazer o mínimo possível e não abandonar tudo",
            "Esperar motivação perfeita amanhã",
          ],
          correta: 1,
          dica: "Mínimo consistente > zero heroico.",
        },
      ],
    },
  ],
};

export const LIVRO_SIDDHARTHA = {
  id: "siddhartha",
  titulo: "Siddhartha",
  autor: "Hermann Hesse",
  subtitulo: "A busca interior em cada fase da vida",
  categoria: "literatura",
  tags: ["jornada", "sabedoria", "autoconhecimento"],
  palavrasChave: ["hesse", "siddhartha", "rio", "busca", "iluminação", "caminho"],
  modulos: [
    {
      id: "caminho",
      nome: "O caminho é único",
      ideia: "Sabedoria não se transfere só por palavras — se vive.",
      perguntas: [
        {
          id: "si1",
          tipo: "escolha",
          pergunta: "Siddhartha deixa os mestres. Isso significa…",
          opcoes: [
            "Arrogância pura",
            "Cada um precisa viver sua própria experiência",
            "Ensinamentos não valem nada",
          ],
          correta: 1,
          dica: "Ouvir ajuda — mas a vida exige caminhar com os próprios pés.",
        },
        {
          id: "si2",
          tipo: "reflexao",
          pergunta: "Algo que você só entendeu vivendo — não lendo ou ouvindo?",
          dica: "Sem julgar — só reconhecer.",
        },
      ],
    },
    {
      id: "rio",
      nome: "Escutar o rio",
      ideia: "Parar de lutar contra o tempo e perceber o fluxo.",
      perguntas: [
        {
          id: "si3",
          tipo: "reflexao",
          pergunta: "Quando você para de correr e só observa, o que muda?",
          dica: "Ansiedade, clareza, cansaço — o que notar?",
        },
        {
          id: "si4",
          tipo: "escolha",
          pergunta: "A mensagem do rio, em essência:",
          opcoes: [
            "Tudo deve ser controlado",
            "Tudo flui — momentos bons e ruins passam",
            "Nada importa, então desista",
          ],
          correta: 1,
          dica: "Fluxo não é apatia — é presença.",
        },
      ],
    },
  ],
};

export const LIVRO_MONTANHA = {
  id: "montanha-voce",
  titulo: "A Montanha é Você",
  autor: "Brianna Wiest",
  subtitulo: "Transformar autossabotagem em autodomínio",
  categoria: "filosofia",
  tags: ["mente", "emoções", "autoconhecimento"],
  palavrasChave: ["wiest", "montanha", "autossabotagem", "ansiedade", "pensar demais"],
  modulos: [
    {
      id: "sabotagem",
      nome: "Autossabotagem",
      ideia: "Às vezes o que te trava não é falta de vontade — é medo disfarçado.",
      perguntas: [
        {
          id: "mw1",
          tipo: "escolha",
          pergunta: "Você adia algo importante repetidamente. Pode ser…",
          opcoes: [
            "Só preguiça",
            "Medo de falhar, de brilhar, ou de mudar",
            "Falta de talento definitivo",
          ],
          correta: 1,
          dica: "Autossabotagem protege de um medo — identificar o medo é o começo.",
        },
        {
          id: "mw2",
          tipo: "reflexao",
          pergunta: "O que você evita fazer — e o que teria que sentir se fizesse?",
          dica: "Honestidade gentil, sem drama.",
        },
      ],
    },
    {
      id: "montanha",
      nome: "A montanha é você",
      ideia: "O obstáculo não está só ‘lá fora’ — está no padrão interno.",
      perguntas: [
        {
          id: "mw3",
          tipo: "reflexao",
          pergunta: "Qual ‘montanha’ você enfrenta agora — prova, relação, identidade?",
          dica: "Nomear já reduz um pouco o peso.",
        },
        {
          id: "mw4",
          tipo: "escolha",
          pergunta: "Superar a montanha, para Wiest, começa com…",
          opcoes: [
            "Ignorar emoções",
            "Entender o padrão que te mantém no mesmo lugar",
            "Culpar o passado para sempre",
          ],
          correta: 1,
          dica: "Mudança interna precede mudança externa duradoura.",
        },
      ],
    },
  ],
};

export const LIVROS_EXTRAS = [
  LIVRO_TRABALHO_FOCADO,
  LIVRO_ESSENCIALISMO,
  LIVRO_SENTIDO,
  LIVRO_PODER_HABITO,
  LIVRO_ARRUME_CAMA,
  LIVRO_SIDDHARTHA,
  LIVRO_MONTANHA,
];
