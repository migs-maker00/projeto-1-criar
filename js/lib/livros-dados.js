// Catálogo de livros — metadados + módulos de estudo (texto original, sem copiar obras)

import { LIVROS_EXTRAS } from "./livros-extras.js";

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
  palavrasChave: ["marco aurélio", "marco aurelio", "meditações", "estoicismo", "filosofia", "controle"],
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

export const LIVRO_SENECA = {
  id: "seneca-brevidade",
  titulo: "Sobre a Brevidade da Vida",
  autor: "Sêneca",
  subtitulo: "Estoicismo — o tempo é seu bem mais precioso",
  categoria: "filosofia",
  tags: ["filosofia", "estoicismo", "seneca", "tempo"],
  palavrasChave: ["sêneca", "seneca", "brevidade", "estoicismo", "cartas", "lucílio", "lucilio"],
  modulos: [
    {
      id: "tempo",
      nome: "A vida não é curta — a gente desperdiça",
      ideia: "Não falta tempo; falta usar bem o que temos.",
      perguntas: [
        {
          id: "se1",
          tipo: "escolha",
          pergunta: "Passar 3h no celular e dizer ‘não tive tempo’ para estudar. Sêneca diria que…",
          opcoes: [
            "O tempo sumiu sozinho",
            "Você escolheu onde colocou o tempo",
            "Culpa é só da escola",
          ],
          correta: 1,
          dica: "Tempo ‘curto’ muitas vezes é tempo mal gasto.",
        },
        {
          id: "se2",
          tipo: "reflexao",
          pergunta: "Onde você mais ‘vaza’ tempo sem perceber?",
          dica: "Honestidade aqui já é filosofia prática.",
        },
      ],
    },
    {
      id: "presente",
      nome: "Viver o presente",
      ideia: "O passado foi; o futuro pode não vir — o agora é seu.",
      perguntas: [
        {
          id: "se3",
          tipo: "escolha",
          pergunta: "Ficar remoendo erro do passado o dia inteiro. Isso é…",
          opcoes: [
            "Aprender de verdade",
            "Roubar o presente de si mesmo",
            "Ser profundo",
          ],
          correta: 1,
          dica: "Refletir ≠ repetir a dor sem fim.",
        },
        {
          id: "se4",
          tipo: "reflexao",
          pergunta: "Uma coisa boa que você pode fazer HOJE, sem esperar ‘o momento certo’?",
          dica: "Sêneca: quem adia a vida nunca vive.",
        },
      ],
    },
    {
      id: "morte",
      nome: "Memento mori — lembrar que vamos morrer",
      ideia: "Consciência da morte torna a vida mais urgente e real.",
      perguntas: [
        {
          id: "se5",
          tipo: "reflexao",
          pergunta: "Se esta semana fosse sua última com foco total, o que você priorizaria?",
          dica: "Não é morbido — é clareza.",
        },
        {
          id: "se6",
          tipo: "escolha",
          pergunta: "Lembrar que a vida acaba pode…",
          opcoes: [
            "Paralisar para sempre",
            "Te fazer valorizar o que importa",
            "Só servir para idosos",
          ],
          correta: 1,
          dica: "Urgência saudável muda escolhas pequenas.",
        },
      ],
    },
  ],
};

export const LIVRO_CAMUS = {
  id: "camus-sisifo",
  titulo: "O Mito de Sísifo",
  autor: "Albert Camus",
  subtitulo: "O absurdo e a revolta — filosofia existencial",
  categoria: "filosofia",
  tags: ["filosofia", "existencialismo", "camus", "absurdo"],
  palavrasChave: ["camus", "sísifo", "sisifo", "absurdo", "estrangeiro", "albert"],
  modulos: [
    {
      id: "absurdo",
      nome: "O absurdo",
      ideia: "Queremos sentido num mundo que nem sempre responde.",
      perguntas: [
        {
          id: "ca1",
          tipo: "escolha",
          pergunta: "Você se esforça muito e às vezes parece que ‘não adianta’. Camus chamaria isso de…",
          opcoes: [
            "Prova de que você é fraco",
            "Choque entre seu desejo de sentido e o silêncio do mundo",
            "Motivo para parar de tentar",
          ],
          correta: 1,
          dica: "Absurdo ≠ sem esperança — é reconhecer o choque.",
        },
        {
          id: "ca2",
          tipo: "reflexao",
          pergunta: "Quando você sentiu que o mundo ‘não fazia sentido’? O que fez depois?",
          dica: "Não precisa ter resposta bonita.",
        },
      ],
    },
    {
      id: "sisifo",
      nome: "Sísifo e a pedra",
      ideia: "Repetir o esforço mesmo sabendo que é difícil — e escolher continuar.",
      perguntas: [
        {
          id: "ca3",
          tipo: "escolha",
          pergunta: "Estudar todo dia parecendo que esquece tudo. Atitude camusiana?",
          opcoes: [
            "Desistir — é inútil",
            "Continuar e criar sentido na própria luta",
            "Fingir que não liga",
          ],
          correta: 1,
          dica: "Imaginar Sísifo feliz = aceitar a luta e ainda assim agir.",
        },
        {
          id: "ca4",
          tipo: "reflexao",
          pergunta: "Qual ‘pedra’ você empurra todo dia? (escola, rotina, trabalho…)",
          dica: "Nomear a luta já muda como você a vê.",
        },
      ],
    },
    {
      id: "revolta",
      nome: "A revolta",
      ideia: "Dizer ‘não’ ao desespero e viver com intensidade consciente.",
      perguntas: [
        {
          id: "ca5",
          tipo: "escolha",
          pergunta: "Diante do absurdo, Camus prefere…",
          opcoes: [
            "Suicídio filosófico (desistir de viver)",
            "A revolta: viver mesmo assim, com lucidez",
            "Fé cega sem pensar",
          ],
          correta: 1,
          dica: "Revolta = lucidez + vida, não negação.",
        },
        {
          id: "ca6",
          tipo: "reflexao",
          pergunta: "O que te faz continuar num dia difícil, mesmo sem ‘sentido’ claro?",
          dica: "Amizade, curiosidade, raiva boa, música — tudo conta.",
        },
      ],
    },
  ],
};

export const LIVRO_SARTRE = {
  id: "sartre-existencialismo",
  titulo: "O Existencialismo é um Humanismo",
  autor: "Jean-Paul Sartre",
  subtitulo: "Liberdade, escolha e responsabilidade",
  categoria: "filosofia",
  tags: ["filosofia", "existencialismo", "sartre", "liberdade"],
  palavrasChave: ["sartre", "existencialismo", "náusea", "nausea", "ser e nada", "liberdade", "escolha"],
  modulos: [
    {
      id: "essencia",
      nome: "A existência precede a essência",
      ideia: "Você não nasce pronto — se constrói pelas escolhas.",
      perguntas: [
        {
          id: "sa1",
          tipo: "escolha",
          pergunta: "‘Sou assim mesmo, não mudo.’ Sartre diria que…",
          opcoes: [
            "Personalidade é fixa para sempre",
            "Você está se escondendo das próprias escolhas",
            "Filosofia não serve para nada",
          ],
          correta: 1,
          dica: "Dizer ‘sou assim’ pode ser fugir da responsabilidade de mudar.",
        },
        {
          id: "sa2",
          tipo: "reflexao",
          pergunta: "Que tipo de pessoa você está ESCOLHENDO ser esta semana?",
          dica: "Um hábito, uma atitude, um limite.",
        },
      ],
    },
    {
      id: "má-fé",
      nome: "Má-fé",
      ideia: "Fingir que não tem escolha quando tem.",
      perguntas: [
        {
          id: "sa3",
          tipo: "escolha",
          pergunta: "‘Não tenho escolha, sou obrigado.’ Quando isso é má-fé?",
          opcoes: [
            "Nunca — sempre é literal",
            "Quando há opções, mas você finge que não há",
            "Só em filosofia de faculdade",
          ],
          correta: 1,
          dica: "Má-fé = mentir para si sobre sua liberdade.",
        },
        {
          id: "sa4",
          tipo: "reflexao",
          pergunta: "Alguma desculpa que você usa muito? Qual seria a escolha por trás dela?",
          dica: "Ex.: ‘depois da escola não dá’ → escolhi descansar sem limite.",
        },
      ],
    },
    {
      id: "angustia",
      nome: "Angústia e responsabilidade",
      ideia: "Escolher é carregar o peso do que você faz do mundo.",
      perguntas: [
        {
          id: "sa5",
          tipo: "escolha",
          pergunta: "Sartre diz que estamos ‘condenados a ser livres’. Isso significa…",
          opcoes: [
            "Liberdade total sem consequência",
            "Não dá para fugir das escolhas — elas definem quem você é",
            "Só políticos são livres",
          ],
          correta: 1,
          dica: "Liberdade assusta porque não há roteiro pronto.",
        },
        {
          id: "sa6",
          tipo: "reflexao",
          pergunta: "Uma escolha recente que mostrou quem você quer ser (ou não ser)?",
          dica: "Pequenas escolhas também contam.",
        },
      ],
    },
  ],
};

export const LIVRO_EPICTETO = {
  id: "epicteto-manual",
  titulo: "Manual de Epicteto",
  autor: "Epicteto",
  subtitulo: "Estoicismo direto — dicotomia do controle",
  categoria: "filosofia",
  tags: ["filosofia", "estoicismo", "epicteto"],
  palavrasChave: ["epicteto", "estoicismo", "manual", "enchiridion", "dicotomia", "controle"],
  modulos: [
    {
      id: "dicotomia",
      nome: "Dicotomia do controle",
      ideia: "Algumas coisas dependem de você; outras não.",
      perguntas: [
        {
          id: "ep1",
          tipo: "reflexao",
          pergunta: "Separe em duas colunas (mentalmente): o que depende de você hoje e o que não.",
          dica: "Só a primeira coluna merece sua energia emocional.",
        },
        {
          id: "ep2",
          tipo: "escolha",
          pergunta: "Nota baixa na prova. O que Epicteto diria para focar?",
          opcoes: [
            "A nota em si (já passou)",
            "O que você aprende e faz na próxima",
            "O professor ‘que odeia você’",
          ],
          correta: 1,
          dica: "Resultado passado ≠ seu campo de ação agora.",
        },
      ],
    },
    {
      id: "impressoes",
      nome: "Não são as coisas que perturbam",
      ideia: "São os julgamentos que fazemos sobre elas.",
      perguntas: [
        {
          id: "ep3",
          tipo: "escolha",
          pergunta: "Alguém te ignorou. O que mais perturba?",
          opcoes: [
            "O fato em si",
            "A história que você conta na cabeça sobre isso",
            "Sempre a outra pessoa",
          ],
          correta: 1,
          dica: "Mudar o julgamento muda o peso emocional.",
        },
        {
          id: "ep4",
          tipo: "reflexao",
          pergunta: "Uma situação que piorou porque você ‘encheu a cabeça’? E se fosse só um fato neutro?",
          dica: "Não negar sentimento — questionar a narrativa.",
        },
      ],
    },
  ],
};

export const LIVRO_NIETZSCHE = {
  id: "nietzsche-zarathustra",
  titulo: "Assim Falou Zaratustra",
  autor: "Friedrich Nietzsche",
  subtitulo: "Vontade de potência, amor fati e superação",
  categoria: "filosofia",
  tags: ["filosofia", "nietzsche", "vontade", "superação"],
  palavrasChave: ["nietzsche", "zaratustra", "übermensch", "super-homem", "fati", "vontade de potência", "eterno retorno"],
  modulos: [
    {
      id: "moral",
      nome: "Além do bem e do mal",
      ideia: "Questionar regras herdadas sem pensar — criar seus próprios valores.",
      perguntas: [
        {
          id: "ni1",
          tipo: "escolha",
          pergunta: "Fazer algo ‘porque sempre foi assim’. Nietzsche chamaria isso de…",
          opcoes: [
            "Sabedoria tradicional",
            "Moral de rebanho — seguir sem questionar",
            "O único caminho certo",
          ],
          correta: 1,
          dica: "Perguntar ‘por quê?’ já é começar a filosofar.",
        },
        {
          id: "ni2",
          tipo: "reflexao",
          pergunta: "Uma regra ou crença que você segue sem nunca ter questionado?",
          dica: "Não precisa abandonar — só olhar de frente.",
        },
      ],
    },
    {
      id: "fati",
      nome: "Amor fati — amar o destino",
      ideia: "Não só aceitar o que aconteceu, mas abraçar como parte da sua força.",
      perguntas: [
        {
          id: "ni3",
          tipo: "escolha",
          pergunta: "Erro grave no passado. Amor fati sugere…",
          opcoes: [
            "Apagar da memória e fingir que não existiu",
            "Integrar: ‘isso também me formou’",
            "Odiar a si para sempre",
          ],
          correta: 1,
          dica: "Não é gostar do erro — é não deixar que ele te defina só como vítima.",
        },
        {
          id: "ni4",
          tipo: "reflexao",
          pergunta: "Algo difícil que, olhando hoje, te fortaleceu de algum jeito?",
          dica: "Pode ser pequeno — um tropeço que ensinou.",
        },
      ],
    },
    {
      id: "superacao",
      nome: "Tornar-se quem você é",
      ideia: "Superar a si mesmo, não os outros.",
      perguntas: [
        {
          id: "ni5",
          tipo: "escolha",
          pergunta: "Comparar-se o tempo todo com influencers. Nietzsche diria que…",
          opcoes: [
            "É motivação saudável",
            "Você está vivendo o script dos outros, não o seu",
            "Redes sociais são a verdade",
          ],
          correta: 1,
          dica: "Superação = seu próprio padrão, não o de ninguém.",
        },
        {
          id: "ni6",
          tipo: "reflexao",
          pergunta: "Se ninguém estivesse olhando, o que você faria diferente esta semana?",
          dica: "A resposta honesta aponta para quem você quer ser.",
        },
      ],
    },
  ],
};

export const LIVRO_PLATAO = {
  id: "platao-republica",
  titulo: "A República",
  autor: "Platão",
  subtitulo: "Justiça, verdade e a alegoria da caverna",
  categoria: "filosofia",
  tags: ["filosofia", "platão", "platao", "clássico", "verdade"],
  palavrasChave: ["platão", "platao", "república", "republica", "caverna", "sócrates", "socrates", "ideias"],
  modulos: [
    {
      id: "caverna",
      nome: "A alegoria da caverna",
      ideia: "O que vemos pode ser só sombra — a verdade exige esforço para sair.",
      perguntas: [
        {
          id: "pl1",
          tipo: "escolha",
          pergunta: "Acreditar em tudo que aparece no feed sem checar. Isso é…",
          opcoes: [
            "Ver a realidade completa",
            "Ficar na caverna — ver sombras como verdade",
            "Ser moderno",
          ],
          correta: 1,
          dica: "Platão: sair da caverna = questionar, estudar, pensar.",
        },
        {
          id: "pl2",
          tipo: "reflexao",
          pergunta: "Uma ‘verdade’ que você acreditava e depois descobriu que era incompleta?",
          dica: "Todo mundo já esteve na caverna em algum tema.",
        },
      ],
    },
    {
      id: "justica",
      nome: "O que é justiça?",
      ideia: "Justiça não é só ‘não ser pego’ — é harmonia da alma.",
      perguntas: [
        {
          id: "pl3",
          tipo: "escolha",
          pergunta: "Colar na prova sem ninguém ver. Para Platão, isso…",
          opcoes: [
            "É inteligente se funcionar",
            "Prejudica você — desorganiza a alma por dentro",
            "Não tem consequência moral",
          ],
          correta: 1,
          dica: "Injustiça corrói quem pratica, mesmo em segredo.",
        },
        {
          id: "pl4",
          tipo: "reflexao",
          pergunta: "Quando você fez o certo mesmo sendo difícil — como se sentiu depois?",
          dica: "Justiça interior = paz, não só regra externa.",
        },
      ],
    },
    {
      id: "filosofo",
      nome: "O amor à sabedoria",
      ideia: "Filosofar é buscar a verdade, não ter todas as respostas.",
      perguntas: [
        {
          id: "pl5",
          tipo: "escolha",
          pergunta: "‘Filósofo’ para Platão é quem…",
          opcoes: [
            "Sabe tudo e nunca erra",
            "Reconhece que não sabe e busca entender",
            "Só fala palavras difíceis",
          ],
          correta: 1,
          dica: "Sócrates: ‘só sei que nada sei’ — e isso é o começo.",
        },
        {
          id: "pl6",
          tipo: "reflexao",
          pergunta: "Sobre o que você gostaria de entender mais fundo (não só decorar)?",
          dica: "Curiosidade genuína = motor do estudo.",
        },
      ],
    },
  ],
};

export const LIVRO_SCHOPENHAUER = {
  id: "schopenhauer-mundo",
  titulo: "O Mundo como Vontade e Representação",
  autor: "Arthur Schopenhauer",
  subtitulo: "O pessimista que entende o sofrimento — e a arte como refúgio",
  categoria: "filosofia",
  tags: ["filosofia", "schopenhauer", "pessimismo", "sofrimento"],
  palavrasChave: ["schopenhauer", "pessimismo", "vontade", "sofrimento", "representação", "arte"],
  modulos: [
    {
      id: "sofrimento",
      nome: "A vida oscila entre dor e tédio",
      ideia: "Schopenhauer é direto: sofrer faz parte — negar isso só piora.",
      perguntas: [
        {
          id: "sc1",
          tipo: "escolha",
          pergunta: "‘A vida deveria ser só feliz.’ Schopenhauer diria que…",
          opcoes: [
            "Sim, e qualquer tristeza é defeito",
            "Esperar só alegria é receita para frustração",
            "Filosofia pessimista não serve",
          ],
          correta: 1,
          dica: "Aceitar que há dor não é desistir — é ser realista.",
        },
        {
          id: "sc2",
          tipo: "reflexao",
          pergunta: "Um momento em que o tédio (não dor) foi o problema. O que você fez?",
          dica: "Oscilar entre ‘quero mais’ e ‘não quero nada’ é humano.",
        },
      ],
    },
    {
      id: "vontade",
      nome: "A vontade cega",
      ideia: "Desejamos sem parar — e a satisfação é sempre temporária.",
      perguntas: [
        {
          id: "sc3",
          tipo: "escolha",
          pergunta: "Comprou/jogou/consumiu o que queria e logo quis outra coisa. Isso ilustra…",
          opcoes: [
            "Que você é ingrato",
            "O ciclo da vontade — satisfação nunca dura",
            "Que dinheiro resolve tudo",
          ],
          correta: 1,
          dica: "Conhecer o ciclo ajuda a não ser escravo dele.",
        },
        {
          id: "sc4",
          tipo: "reflexao",
          pergunta: "Um desejo que você perseguiu e, ao conseguir, não preencheu como imaginava?",
          dica: "Honestidade sem drama — só observação.",
        },
      ],
    },
    {
      id: "arte",
      nome: "Arte e contemplação",
      ideia: "Na música, natureza e beleza, há pausa do sofrimento.",
      perguntas: [
        {
          id: "sc5",
          tipo: "escolha",
          pergunta: "Schopenhauer via a arte como…",
          opcoes: [
            "Perda de tempo",
            "Refúgio — momento de paz fora da vontade",
            "Só para ricos",
          ],
          correta: 1,
          dica: "Uma música, um pôr do sol, um livro — pausa legítima.",
        },
        {
          id: "sc6",
          tipo: "reflexao",
          pergunta: "O que te tira da ‘roda’ do estresse por alguns minutos? (música, mar, desenho…)",
          dica: "Não é fuga permanente — é oxigênio.",
        },
      ],
    },
    {
      id: "compaixao",
      nome: "Compaixão",
      ideia: "Reconhecer o sofrimento alheio nos aproxima da moral verdadeira.",
      perguntas: [
        {
          id: "sc7",
          tipo: "escolha",
          pergunta: "Ver alguém mal e pensar ‘isso não é problema meu’. Schopenhauer criticaria…",
          opcoes: [
            "Sim — compaixão é base moral",
            "Não — cada um por si",
            "Só importa quem você ama",
          ],
          correta: 0,
          dica: "Todos sofremos — isso pode unir, não separar.",
        },
        {
          id: "sc8",
          tipo: "reflexao",
          pergunta: "Quando você se colocou no lugar de alguém que sofre? O que mudou na sua atitude?",
          dica: "Empatia não é fraqueza — é lucidez.",
        },
      ],
    },
  ],
};

export const TODOS_LIVROS = [
  LIVRO_8_HABITOS,
  LIVRO_ATOMICOS,
  LIVRO_MEDITACOES,
  LIVRO_SENECA,
  LIVRO_EPICTETO,
  LIVRO_PLATAO,
  LIVRO_NIETZSCHE,
  LIVRO_SCHOPENHAUER,
  LIVRO_CAMUS,
  LIVRO_SARTRE,
  LIVRO_NOITES_BRANCAS,
  ...LIVROS_EXTRAS,
];

export const LIVRO_PADRAO = LIVRO_8_HABITOS;

export const CATEGORIAS_LIVRO = [
  { id: "todos", rotulo: "Todos" },
  { id: "habitos", rotulo: "Hábitos" },
  { id: "filosofia", rotulo: "Filosofia" },
  { id: "literatura", rotulo: "Literatura" },
];

export { TEMAS_LIVRO, temaPorId } from "./livros-temas.js";
