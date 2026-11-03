// Modelo 41 · Onda

// Altura de cada barra (0 a 1) no desenho de 24 barras; as outras quantidades são sorteadas daqui
var FORMA = [.22, .38, .30, .52, .68, .46, .80, .62, .92, .74, 1, .84, .96, .70, .88, .58, .76, .50, .64, .40, .54, .30, .38, .20];

Xatspace.aoCarregar(function (d) {
  // Cada .onda diz o tamanho e a quantidade de barras: data-onda="larguraXalturaXbarras"
  Array.prototype.forEach.call(document.querySelectorAll("[data-onda]"), function (onda) {
    var p = onda.dataset.onda.split("x").map(Number);
    var mascara = "url(\"data:image/svg+xml;utf8," + encodeURIComponent(desenharBarras(p[0], p[1], p[2])) + "\")";
    Array.prototype.forEach.call(onda.querySelectorAll(".foto, .sombra"), function (el) {
      el.style.webkitMaskImage = mascara;
      el.style.maskImage = mascara;
      el.style.webkitMaskSize = p[0] + "px " + p[1] + "px";
      el.style.maskSize = p[0] + "px " + p[1] + "px";
    });
    onda.querySelector(".foto").style.backgroundPosition = "center 22%";
  });

  // Nomes longos diminuem para caber na coluna
  Xatspace.caber(document.querySelector(".desk h1 .n1"), 650, 40);
  Xatspace.caber(document.querySelector(".desk h1 .n2"), 650, 40);
  caberDoisNomes(document.querySelector(".mob h1"), 354);

  // Sem sobrenome, só o nome
  if (!d.sobrenome) {
    Array.prototype.forEach.call(document.querySelectorAll("h1 .n2"), function (el) { el.hidden = true; });
  }
});

// Barras arredondadas com a altura sorteada da FORMA
function desenharBarras(largura, altura, quantas) {
  var celula = largura / quantas;
  var barra = celula * .64;
  var s = "<svg xmlns='http://www.w3.org/2000/svg' width='" + largura + "' height='" + altura + "'>";
  for (var i = 0; i < quantas; i++) {
    var h = altura * Math.max(.1, forma(i / (quantas - 1)));
    var x = i * celula + (celula - barra) / 2;
    s += "<rect x='" + x.toFixed(2) + "' y='" + ((altura - h) / 2).toFixed(2) + "' width='" + barra.toFixed(2) +
      "' height='" + h.toFixed(2) + "' rx='" + (barra / 2).toFixed(2) + "'/>";
  }
  return s + "</svg>";
}

// Altura em qualquer ponto da onda (0 a 1), entre duas barras do desenho base
function forma(t) {
  var x = t * (FORMA.length - 1);
  var a = Math.floor(x);
  var b = Math.min(a + 1, FORMA.length - 1);
  return FORMA[a] + (FORMA[b] - FORMA[a]) * (x - a);
}

// Nome e sobrenome na mesma linha (celular): diminui os dois juntos até caber
function caberDoisNomes(el, larguraMax) {
  if (!el) return;
  if (document.fonts && document.fonts.status !== "loaded") {
    document.fonts.ready.then(function () { caberDoisNomes(el, larguraMax); });
  }
  el.style.fontSize = "";
  el.style.display = "inline-block";
  var tamanho = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > larguraMax && tamanho > 24) {
    tamanho *= 0.95;
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
