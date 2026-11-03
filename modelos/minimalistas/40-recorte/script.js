// Modelo 40 · Recorte
Xatspace.aoCarregar(function (d) {
  // Nome grande demais diminui até caber: no desktop pela largura, no celular pela altura (nome na vertical)
  Xatspace.caber(document.querySelector(".desk .nm"), 1760);
  caberNaVertical(document.querySelector(".mob .nm"), 520);

  // Sem sobrenome, a linha embaixo do nome não aparece
  if (!d.sobrenome) {
    Array.prototype.forEach.call(document.querySelectorAll(".sob"), function (el) { el.hidden = true; });
  }
});

// Como o Xatspace.caber, mas para texto na vertical: mede o comprimento em altura
function caberNaVertical(el, alturaMax) {
  if (!el) return;
  if (document.fonts && document.fonts.status !== "loaded") {
    document.fonts.ready.then(function () { caberNaVertical(el, alturaMax); });
  }
  el.style.fontSize = "";
  el.style.display = "inline-block";
  var tamanho = parseFloat(getComputedStyle(el.parentNode).fontSize);
  while (el.offsetHeight > alturaMax && tamanho > 40) {
    tamanho *= 0.96;
    el.style.fontSize = tamanho + "px";
  }
}

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
