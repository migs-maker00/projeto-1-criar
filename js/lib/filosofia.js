// Citações filosóficas — uma por dia, escolhida de forma determinística pela data
const CITACOES_FILOSOFICAS = [
  { texto: "No meio do inverno, descobri que havia em mim um verão invencível.", autor: "Albert Camus" },
  { texto: "A vida é a soma de todas as suas escolhas.", autor: "Albert Camus" },
  { texto: "O absurdo é o confronto essencial entre a mente humana e o universo irracional.", autor: "Albert Camus" },
  { texto: "Devemos imaginar Sísifo feliz.", autor: "Albert Camus" },
  { texto: "A única maneira de lidar com um mundo sem liberdade é tornar-se tão absolutamente livre que sua própria existência seja um ato de rebelião.", autor: "Albert Camus" },
  { texto: "Não são as coisas que nos perturbam, mas a opinião que temos delas.", autor: "Epicteto" },
  { texto: "Primeiro diga a si mesmo o que você seria; e então faça o que tiver de fazer.", autor: "Epicteto" },
  { texto: "A riqueza não consiste em ter grandes posses, mas em ter poucas necessidades.", autor: "Epicteto" },
  { texto: "Não procure que os acontecimentos aconteçam como você quer; queira antes que eles aconteçam como acontecem, e você será feliz.", autor: "Epicteto" },
  { texto: "Nenhum homem é livre se não for mestre de si mesmo.", autor: "Epicteto" },
  { texto: "Se você quer melhorar, aceite parecer tolo e sem graça em assuntos exteriores.", autor: "Epicteto" },
  { texto: "A felicidade da sua vida depende da qualidade dos seus pensamentos.", autor: "Marco Aurélio" },
  { texto: "Obstáculos no caminho não impedem o avanço; tornam-se o caminho.", autor: "Marco Aurélio" },
  { texto: "Não perca mais tempo discutindo como um bom homem deve ser. Seja um.", autor: "Marco Aurélio" },
  { texto: "A melhor vingança é não ser como o seu inimigo.", autor: "Marco Aurélio" },
  { texto: "Você tem poder sobre sua mente, não sobre os eventos externos. Perceba isso e encontrará força.", autor: "Marco Aurélio" },
  { texto: "Muito pouco é necessário para fazer uma vida feliz; está tudo dentro de você, na sua maneira de pensar.", autor: "Marco Aurélio" },
  { texto: "O impedimento à ação avança a ação. O que se interpõe no caminho torna-se o caminho.", autor: "Marco Aurélio" },
  { texto: "Quando você acordar de manhã, pense no precioso privilégio de estar vivo.", autor: "Marco Aurélio" },
  { texto: "A alma fica tingida pela cor dos seus pensamentos.", autor: "Marco Aurélio" },
  { texto: "A saúde não é tudo, mas sem saúde tudo é nada.", autor: "Arthur Schopenhauer" },
  { texto: "O destino baralha as cartas, e nós jogamos.", autor: "Arthur Schopenhauer" },
  { texto: "Todo homem toma os limites de seu próprio campo de visão como os do mundo.", autor: "Arthur Schopenhauer" },
  { texto: "A mudança sozinha é eterna, perpétua, incessante.", autor: "Arthur Schopenhauer" },
  { texto: "O homem pode fazer o que quer, mas não pode querer o que quer.", autor: "Arthur Schopenhauer" },
  { texto: "A compaixão é a base da moral.", autor: "Arthur Schopenhauer" },
  { texto: "Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que são difíceis.", autor: "Sêneca" },
  { texto: "Comecemos a ser agora o que seremos no futuro.", autor: "Sêneca" },
  { texto: "Enquanto adiamos, a vida passa.", autor: "Sêneca" },
  { texto: "Não é que tenhamos pouco tempo, mas que desperdiçamos muito.", autor: "Sêneca" },
  { texto: "A sorte é o que acontece quando a preparação encontra a oportunidade.", autor: "Sêneca" },
  { texto: "Sofremos mais na imaginação do que na realidade.", autor: "Sêneca" },
  { texto: "Nenhum vento sopra a favor de quem não sabe para onde ir.", autor: "Sêneca" },
  { texto: "O homem sábio não se deita com a consciência pesada.", autor: "Sêneca" },
  { texto: "A felicidade depende de nós mesmos.", autor: "Aristóteles" },
  { texto: "Somos o que fazemos repetidamente. A excelência, portanto, não é um ato, mas um hábito.", autor: "Aristóteles" },
  { texto: "Conhece-te a ti mesmo.", autor: "Sócrates" },
  { texto: "Uma vida não examinada não vale a pena ser vivida.", autor: "Sócrates" },
  { texto: "A coragem é saber o que não se deve temer.", autor: "Platão" },
  { texto: "A medida de um homem é o que ele faz com o poder.", autor: "Platão" },
  { texto: "O homem nasce livre, e em toda parte encontra-se acorrentado.", autor: "Jean-Jacques Rousseau" },
  { texto: "Penso, logo existo.", autor: "René Descartes" },
  { texto: "A dúvida é o princípio da sabedoria.", autor: "René Descartes" },
  { texto: "O que não me mata, fortalece-me.", autor: "Friedrich Nietzsche" },
  { texto: "Aquele que tem um porquê para viver pode suportar quase qualquer como.", autor: "Friedrich Nietzsche" },
  { texto: "Torna-te quem tu és.", autor: "Friedrich Nietzsche" },
  { texto: "A liberdade é a consciência da necessidade.", autor: "Baruch Espinosa" },
  { texto: "Não rir, não lamentar, não odiar, mas compreender.", autor: "Baruch Espinosa" },
  { texto: "O homem está condenado a ser livre.", autor: "Jean-Paul Sartre" },
  { texto: "A existência precede a essência.", autor: "Jean-Paul Sartre" },
  { texto: "O inferno são os outros.", autor: "Jean-Paul Sartre" },
  { texto: "Aquele que luta com monstros deve cuidar para não se tornar um monstro.", autor: "Friedrich Nietzsche" },
  { texto: "Quem olha para fora sonha; quem olha para dentro desperta.", autor: "Carl Jung" },
  { texto: "Até que você faça o inconsciente consciente, ele dirigirá sua vida e você o chamará de destino.", autor: "Carl Jung" },
  { texto: "O sábio encontra o equilíbrio entre o que pode controlar e o que não pode.", autor: "Epicteto" },
  { texto: "Cada dia é uma vida inteira em miniatura.", autor: "Marco Aurélio" },
  { texto: "Aceitar o que não podemos mudar é o início da sabedoria.", autor: "Epicteto" },
  { texto: "A revolta contra o absurdo é o que nos mantém vivos.", autor: "Albert Camus" },
  { texto: "A verdadeira generosidade para com o futuro consiste em dar tudo ao presente.", autor: "Albert Camus" },
  { texto: "Nada na vida é tão necessário quanto a amizade.", autor: "Cícero" },
  { texto: "A paciência é amarga, mas seu fruto é doce.", autor: "Jean-Jacques Rousseau" },
];

function indicePorData(strData, total) {
  let hash = 0;
  for (let i = 0; i < strData.length; i++) {
    hash = (hash * 31 + strData.charCodeAt(i)) >>> 0;
  }
  return hash % total;
}

function fraseFilosoficaDoDia(dataStr) {
  const indice = indicePorData(dataStr || new Date().toISOString().slice(0, 10), CITACOES_FILOSOFICAS.length);
  return CITACOES_FILOSOFICAS[indice];
}

export { fraseFilosoficaDoDia };
