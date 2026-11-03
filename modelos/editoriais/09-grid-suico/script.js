// Modelo 09 · Grid suíço
Xatspace.aoCarregar(function (d) {
  var todos = function (sel, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), fn);
  };

  // Ano atual
  todos("[data-xs-ano]", function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Autor da citação abreviado: "Mario Quintana" vira "M. Quintana"
  var autor = (d.citacao.autor || "").trim();
  var partes = autor.split(/\s+/);
  if (partes.length > 1) autor = partes[0].charAt(0) + ". " + partes.slice(1).join(" ");
  todos("[data-xs-autor]", function (el) {
    el.textContent = autor;
  });
  if (!d.citacao.texto) todos(".foot .cit", function (el) { el.hidden = true; });

  // Frase com a última palavra em itálico na cor de destaque
  todos(".q", function (el) {
    var frase = (d.frase || "").trim();
    var i = frase.lastIndexOf(" ");
    el.textContent = i > 0 ? frase.slice(0, i + 1) : "";
    var destaque = document.createElement("span");
    destaque.className = "red";
    var em = document.createElement("em");
    em.textContent = i > 0 ? frase.slice(i + 1) : frase;
    destaque.appendChild(em);
    el.appendChild(destaque);
  });

  // Frases longas diminuem para não passar da linha de baixo
  function encolher(el, alturaMax) {
    if (!el) return;
    var tamanho = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollHeight > alturaMax && tamanho > 12) {
      tamanho *= 0.95;
      el.style.fontSize = tamanho + "px";
    }
  }
  encolher(document.querySelector(".desk .q"), 175);
  encolher(document.querySelector(".mob .q"), 82);

  // Nomes longos diminuem para não encostar na foto
  Xatspace.caber(document.querySelector(".desk h1"), 1220);
  Xatspace.caber(document.querySelector(".mob h1"), 360);
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
