// Modelo 08 · Capa de disco
Xatspace.aoCarregar(function (d) {
  // Foto em preto e branco ou sépia, igual em todas as cores (?foto=pb, ?foto=sepia)
  // ou com as cores de verdade da foto (?foto=normal)
  var foto = new URLSearchParams(location.search).get("foto") || d.foto;
  if (["pb", "sepia", "normal"].indexOf(foto) >= 0) document.documentElement.dataset.foto = foto;

  // Ano do LP é o ano atual
  document.querySelectorAll("[data-xs-ano]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Nomes longos diminuem para não passar da capa
  document.querySelectorAll(".desk .cover h2 span").forEach(function (el) {
    Xatspace.caber(el, 540);
    el.style.display = "block";
  });
  document.querySelectorAll(".mob .cover h2 span").forEach(function (el) {
    Xatspace.caber(el, 278);
    el.style.display = "block";
  });
  Xatspace.caber(document.querySelector(".desk .side h1 em"), 520);
  Xatspace.caber(document.querySelector(".mob .side h1 em"), 350);
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
