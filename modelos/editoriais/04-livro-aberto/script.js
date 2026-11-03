// Modelo 04 · Livro aberto
Xatspace.aoCarregar(function () {
  // Nomes longos diminuem para caber na largura da página
  Xatspace.caber(document.querySelector(".desk h1"), 520);
  Xatspace.caber(document.querySelector(".mob h1"), 306);
});

// Texto longo na página da esquerda: "capitulo" nos dados ou, sem ele, o poema da citação.
// A frase da pessoa passa para debaixo da foto, no lugar da citação curta.
Xatspace.aoCarregar(function (d) {
  var c = d.capitulo || (d.citacao.poema && {
    titulo: d.citacao.titulo,
    autor: d.citacao.autor,
    texto: d.citacao.poema
  });
  if (!c || !c.texto) return;
  document.documentElement.classList.add("com-capitulo");
  document.querySelectorAll("[data-capitulo]").forEach(function (el) {
    el.textContent = c[el.dataset.capitulo] || "";
    el.hidden = !c[el.dataset.capitulo];
  });
  var poem = document.querySelector(".desk .poem");
  if (poem) poem.textContent = "“" + d.frase + "”";
  var autor = document.querySelector(".desk .autor");
  if (autor) autor.textContent = d.fraseAutor || d.nomeCompleto;
});

Xatspace.aoCarregar(function (d) {
  statusNoXat(d);
});

// Consulta o status no xat pelo ID do cliente.
// Sem ID, ou se o usuário não existe, o status não aparece.
function statusNoXat(d, pronto) {
  if (!d.xat) return;
  fetch("https://api.xatools.net/v1/user/" + encodeURIComponent(d.xat) + "/online")
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (!res || res.code !== 200 || !res.data) return;
      var ligado = !!res.data.online;
      document.querySelectorAll("[data-xs-se='online']").forEach(function (el) {
        if (!ligado) marcarOffline(el);
        el.hidden = false;
      });
      if (pronto) pronto(ligado);
    })
    .catch(function () {});
}

function marcarOffline(el) {
  var textos = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  var pedaco;
  while ((pedaco = textos.nextNode())) {
    pedaco.nodeValue = pedaco.nodeValue.replace(/\bonline\b/gi, function (m) {
      if (m === m.toUpperCase()) return "OFFLINE";
      if (m.charAt(0) === m.charAt(0).toUpperCase()) return "Offline";
      return "offline";
    });
  }
  el.classList.add("xs-off");
}
