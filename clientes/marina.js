// Perfil de exemplo para as imagens do portfólio (cores femininas). As fotos ficam em clientes/exemplo/.
Xatspace.cliente({
  id: "marina",
  genero: "f",

  nome: "Marina",
  sobrenome: "Costa",
  frase: "Sou feita de mar, café e dias de sol.",
  destaque: "Feita de mar e de sol.",
  titulo: "Maré Alta",
  manchete: "Recifense troca a pressa pelo pôr do sol",
  citacao: {
    texto: "Liberdade é pouco. O que eu desejo ainda não tem nome.",
    autor: "Clarice Lispector"
  },

  // Texto longo do capítulo no Livro aberto (04). Sem ele, o livro usa citacao.poema.
  capitulo: {
    titulo: "Seiscentos e Sessenta e Seis",
    autor: "Mario Quintana",
    texto: [
      "A vida é uns deveres que nós trouxemos para fazer em casa.",
      "Quando se vê, já são 6 horas: há tempo…",
      "Quando se vê, já é 6ª-feira…",
      "Quando se vê, passaram 60 anos!",
      "Agora, é tarde demais para ser reprovado…",
      "E se me dessem – um dia – uma outra oportunidade,",
      "Eu nem olhava o relógio",
      "Seguia sempre em frente…",
      "E iria jogando pelo caminho a casca dourada e inútil das horas."
    ].join("\n")
  },

  local: "Recife",
  gostos: ["Praia", "Leitura", "Música"],
  instagram: "marina.costa",
  // ID numérico no xat, quando houver: xat: 123. Sem ele, o status não aparece.

  fotos: {
    perfil: "exemplo/perfil-feminino.jpg",
    destaque: "exemplo/em-pe-feminina.jpg",
    cenario: "exemplo/montanhas.jpg",
    verso: "exemplo/em-pe-feminina-2.jpg",
    galeria: ["exemplo/em-pe-feminina-2.jpg", "exemplo/perfil-feminino.jpg", "exemplo/em-pe-feminina.jpg", "exemplo/estrada.jpg", "exemplo/floresta.jpg"]
  },

  // Onde está o rosto em cada foto: [esquerda, topo, largura, altura], em fração da foto
  // (0 a 1). O Visor de câmera (03) usa para pôr o quadro de foco em cima do rosto.
  rostos: {
    "exemplo/em-pe-feminina.jpg": [0.45, 0.165, 0.16, 0.12]
  },

  musica: {
    youtube: "ZEKeZmN_d4A",
    titulo: "Distance & Pixelated",
    artista: "Jeremy Passion"
  },

  cor: ""
});
