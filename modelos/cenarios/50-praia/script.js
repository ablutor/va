// Modelo 50 · Praia

Xatspace.aoCarregar(function (d) {
  // Nomes longos diminuem para caber ao lado da foto
  Xatspace.caber(document.querySelector(".desk h1"), 450, 40);
  Xatspace.caber(document.querySelector(".mob h1"), 230, 28);

  desenharOndas();
  copiarId(d);
  statusNoXat(d);
});

// Barras da onda sonora: duas camadas iguais, a de cima colorida até onde a música chegou
var ALTURAS = [.35, .55, .4, .75, .5, .9, .62, .8, .45, 1, .7, .85, .5, .65, .38, .78, .55, .92, .6, .42];

function desenharOndas() {
  Array.prototype.forEach.call(document.querySelectorAll(".onda[data-barras]"), function (onda) {
    var n = Number(onda.dataset.barras);
    var barras = "";
    for (var i = 0; i < n; i++) {
      var h = ALTURAS[(i * 7) % ALTURAS.length] * (.75 + .25 * Math.abs(Math.sin(i * .6)));
      barras += "<i style='height:" + Math.round(h * 100) + "%'></i>";
    }
    onda.innerHTML = "<div class='camada'>" + barras + "</div><div class='camada cheia'>" + barras + "</div>";
  });
}

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
