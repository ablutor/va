// Perfil de exemplo para as imagens do portfólio (cores masculinas). As fotos ficam em clientes/exemplo/.
Xatspace.cliente({
  id: "rafael",
  genero: "m",

  nome: "Rafael",
  sobrenome: "Lima",
  frase: "Devagar também é caminho. O importante é não parar.",
  destaque: "Devagar também é caminho.",
  titulo: "Sem Pressa",
  manchete: "Mineiro mostra que devagar também é caminho",
  citacao: {
    texto: "Tudo vale a pena se a alma não é pequena.",
    autor: "Fernando Pessoa"
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

  local: "Belo Horizonte",
  gostos: ["Café", "Trilhas", "Música"],
  instagram: "rafael.lima",
  // ID numérico no xat, quando houver: xat: 123. Sem ele, o status não aparece.

  fotos: {
    perfil: "exemplo/perfil-masculino.jpg",
    destaque: "exemplo/sentado-masculino.jpg",
    cenario: "exemplo/floresta.jpg",
    verso: "exemplo/em-pe-masculino.jpg",
    galeria: ["exemplo/sentado-masculino.jpg", "exemplo/perfil-masculino.jpg", "exemplo/em-pe-masculino.jpg", "exemplo/montanhas.jpg", "exemplo/estrada.jpg"]
  },

  // Onde está o rosto em cada foto: [esquerda, topo, largura, altura], em fração da foto
  // (0 a 1). O Visor de câmera (03) usa para pôr o quadro de foco em cima do rosto.
  rostos: {
    "exemplo/sentado-masculino.jpg": [0.45, 0.17, 0.2, 0.145]
  },

  musica: {
    youtube: "ZEKeZmN_d4A",
    titulo: "Distance & Pixelated",
    artista: "Jeremy Passion"
  },

  cor: ""
});
