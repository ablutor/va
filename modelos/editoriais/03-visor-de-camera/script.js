// Modelo 03 · Visor de câmera
Xatspace.aoCarregar(function () {
  // Nomes longos diminuem para não invadir o centro da foto
  Xatspace.caber(document.querySelector(".desk .name h1"), 760);
  Xatspace.caber(document.querySelector(".mob .name h1"), 342);
});

// Quadro de foco em cima do rosto. A foto cobre a tela toda e o palco é escalado à parte,
// então a posição é calculada a partir de "rostos" nos dados; sem isso, fica onde o CSS põe.
Xatspace.aoCarregar(function (d) {
  var r = d.rostos && d.rostos[d.fotos.destaque];
  var fundo = document.querySelector(".xs-fundo");
  var url = /url\(["']?(.*?)["']?\)/.exec(fundo.style.backgroundImage);
  if (!r || !url) return;

  var img = new Image();
  img.onload = function () {
    focar();
    window.addEventListener("resize", focar);
  };
  img.src = url[1];

  function focar() {
    var w = fundo.clientWidth;
    var h = fundo.clientHeight;
    var s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    var fw = img.naturalWidth * s;
    var fh = img.naturalHeight * s;
    var pos = getComputedStyle(fundo).backgroundPosition.split(" ").map(parseFloat);
    var x = (w - fw) * pos[0] / 100 + r[0] * fw;
    var y = (h - fh) * pos[1] / 100 + r[1] * fh;

    document.querySelectorAll(".xs-palco").forEach(function (palco) {
      var caixa = palco.getBoundingClientRect();
      var esc = caixa.width / Number(palco.dataset.largura);
      var af = palco.querySelector(".af");
      var t = palco.querySelector(".af-t");
      var top = (y - caixa.top) / esc;
      var alt = r[3] * fh / esc;
      af.style.left = t.style.left = (x - caixa.left) / esc + "px";
      af.style.top = top + "px";
      af.style.width = r[2] * fw / esc + "px";
      af.style.height = alt + "px";
      t.style.top = top + alt + 8 + "px";
    });
  }
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
