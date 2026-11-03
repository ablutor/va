// Modelo 51 · Café

Xatspace.aoCarregar(function (d) {
  // Nomes longos diminuem para caber na coluna
  Xatspace.caber(document.querySelector(".desk h1"), 290, 40);
  Xatspace.caber(document.querySelector(".mob h1"), 250, 30);

  copiarId(d);
  statusNoXat(d);
});

// Clicar no ID copia o número
function copiarId(d) {
  Array.prototype.forEach.call(document.querySelectorAll("[data-copiar]"), function (el) {
    el.addEventListener("click", function () {
      if (!d.xat || !navigator.clipboard) return;
      navigator.clipboard.writeText(String(d.xat)).then(function () {
        el.classList.add("copiado");
        setTimeout(function () { el.classList.remove("copiado"); }, 1500);
      });
    });
  });
}

// Consulta o status no xat pelo ID do cliente.
// Sem ID, ou se o usuário não existe, o status não aparece.
function statusNoXat(d) {
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
