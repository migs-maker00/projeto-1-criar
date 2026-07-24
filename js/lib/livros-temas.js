// Coleções temáticas da biblioteca — curadoria por momento de vida

export const TEMAS_LIVRO = [
  {
    id: "pensa-demais",
    titulo: "Pra você que pensa demais",
    descricao: "Mente acelerada, filosofia e sentido",
    livroIds: [
      "meditacoes",
      "seneca-brevidade",
      "epicteto-manual",
      "schopenhauer-mundo",
      "camus-sisifo",
      "sartre-existencialismo",
      "nietzsche-zarathustra",
      "platao-republica",
      "sentido-frankl",
      "siddhartha",
    ],
  },
  {
    id: "sem-distracoes",
    titulo: "Uma vida livre de distrações",
    descricao: "Foco, hábitos e clareza no dia a dia",
    livroIds: [
      "habitos-atomicos",
      "8-habitos-sharma",
      "trabalho-focado",
      "essencialismo",
      "poder-habito",
      "arrume-cama",
    ],
  },
  {
    id: "historias-que-tocam",
    titulo: "Histórias que tocam",
    descricao: "Literatura e emoção com profundidade",
    livroIds: ["noites-brancas", "sentido-frankl", "siddhartha", "montanha-voce"],
  },
  {
    id: "forca-por-dentro",
    titulo: "Força por dentro",
    descricao: "Resiliência, estoicismo e coragem",
    livroIds: [
      "meditacoes",
      "seneca-brevidade",
      "epicteto-manual",
      "arrume-cama",
      "sentido-frankl",
      "poder-habito",
    ],
  },
];

export function temaPorId(id) {
  return TEMAS_LIVRO.find((t) => t.id === id) || null;
}
