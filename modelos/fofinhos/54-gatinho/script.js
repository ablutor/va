// Modelo 54 · Gatinho
Xatspace.aoCarregar(function () {
  // Nomes longos diminuem para caber no cartão
  Xatspace.caber(document.querySelector(".desk .nome"), 282);
  Xatspace.caber(document.querySelector(".desk .sobrenome"), 282);
  Xatspace.caber(document.querySelector(".mob .nome"), 240);
});

Xatspace.aoCarregar(function (d) {
  // Frase comprida usa letra menor, para o cartão não crescer demais
  var texto = (d.citacao && d.citacao.texto) || "";
  if (texto.length > 50) {
    document.querySelectorAll(".citacao").forEach(function (el) { el.classList.add("longa"); });
  }
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
