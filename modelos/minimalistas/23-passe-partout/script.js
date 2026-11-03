// Modelo 23 · Passe-partout

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Legenda do quadro, como numa exposição: "Rafael, 2026"
  ano: function () { return String(new Date().getFullYear()); },
  legenda: function (d) { return d.nome + ", " + TEXTOS.ano(d); },
  // Linha de baixo: a cidade (o CSS deixa em maiúsculas e espaçada)
  lugar: function (d) { return d.local; },
  online: "● online no xat"
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
    if (!el.textContent) el.hidden = true;
  });

  // Nomes longos diminuem para caber na largura da janela
  Xatspace.caber(document.querySelector(".desk h1"), 560, 16);
  Xatspace.caber(document.querySelector(".mob h1"), 330, 14);

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
