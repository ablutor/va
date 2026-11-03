// Modelo 05 · Galeria
Xatspace.aoCarregar(function (d) {
  // Ano atual nas etiquetas do museu
  var ano = String(new Date().getFullYear());
  document.querySelectorAll("[data-ano]").forEach(function (el) {
    el.textContent = ano;
  });

  // Gostos viram uma frase: "fotografia, treino e música."
  var g = d.gostos.map(function (x) { return x.toLowerCase(); });
  var lista = g.length > 1 ? g.slice(0, -1).join(", ") + " e " + g[g.length - 1] : g.join("");
  document.querySelectorAll("[data-gostos]").forEach(function (el) {
    var antes = el.dataset.gostos;
    if (!lista) { el.hidden = true; return; }
    // Sem prefixo, a frase começa com letra maiúscula
    el.textContent = antes ? antes + lista + "." : lista.charAt(0).toUpperCase() + lista.slice(1) + ".";
  });

  // Nomes longos diminuem para não sair da parede
  Xatspace.caber(document.querySelector(".desk .title .n1"), 760);
  Xatspace.caber(document.querySelector(".desk .title .n2"), 760);
  Xatspace.caber(document.querySelector(".desk .label h2"), 274);
  Xatspace.caber(document.querySelector(".mob .title h1"), 342);
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
