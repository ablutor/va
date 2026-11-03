// Modelo 46 · Varal
// Campos lidos dos dados: nome, genero, frase, local, gostos (até 6), instagram, xat,
// musica.titulo/artista e fotos (perfil, verso, cenario, destaque e galeria). Sem foto
// suficiente, as fotos se repetem em ciclo para completar os polaroids.
Xatspace.aoCarregar(function (d) {
  var fem = d.genero === "f";

  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  // "Varal da Marina" / "Varal do Rafael"
  todos('[data-texto="rotulo"]', function (el) { el.textContent = "Varal d" + d.o; });

  // Frase entre aspas (as aspas vêm do CSS)
  todos(".frase", function (el) { el.textContent = (d.frase || "").trim(); });

  // Etiquetas dos gostos
  var gostos = d.gostos.slice(0, 6);
  todos('[data-texto="gostos"]', function (el) {
    el.textContent = "";
    gostos.forEach(function (g) {
      var s = document.createElement("span");
      s.textContent = g;
      el.appendChild(s);
    });
    el.hidden = !gostos.length;
  });

  // ---------- Polaroids ----------

  // Fotos sem repetir, na ordem em que melhor combinam com as legendas
  var fotos = [];
  [d.fotos.perfil, d.fotos.destaque, d.fotos.cenario, d.fotos.verso].concat(d.fotos.galeria || []).forEach(function (f) {
    if (f && fotos.indexOf(f) < 0) fotos.push(f);
  });

  // Legendas neutras para os dois gêneros; a quarta usa o primeiro gosto
  var primeiro = gostos.length ? gostos[0].toLowerCase() : "";
  var quarta = primeiro ? primeiro + " primeiro" : "só alegria";
  if (/caf[eé]/.test(primeiro)) quarta += " ☕";
  var legendas = ["eu, num dia bom", "sempre com o celular", "meu lugar feliz", quarta, "caminho de volta", "silêncio bom"];

  // Posição de cada polaroid: [esquerda, topo, largura, altura, giro]
  var slots = {
    6: [[122, 138, 320, 392, -4], [452, 183, 306, 382, -2], [1182, 163, 308, 382, 2], [1487, 105, 322, 396, 6], [100, 540, 282, 345, -3], [1422, 552, 282, 345, 2]],
    4: [[18, 62, 168, 206, -4], [205, 80, 162, 205, 3.5], [32, 566, 166, 200, -3], [208, 590, 166, 188, 4]]
  };

  todos("[data-varal]", function (parede) {
    var n = Number(parede.dataset.varal);
    parede.textContent = "";
    slots[n].forEach(function (p, i) {
      var pol = document.createElement("div");
      pol.className = "pol";
      pol.style.cssText = "left:" + p[0] + "px;top:" + p[1] + "px;width:" + p[2] + "px;height:" + p[3] + "px;transform:rotate(" + p[4] + "deg)";
      var ft = document.createElement("div");
      ft.className = "ft";
      if (fotos.length) ft.style.backgroundImage = "url('" + Xatspace.arquivo(fotos[i % fotos.length]) + "')";
      var leg = document.createElement("div");
      leg.className = "leg";
      leg.textContent = legendas[i];
      pol.appendChild(ft);
      pol.appendChild(leg);
      parede.appendChild(pol);
    });
  });

  // ---------- Luzinhas do fio ----------

  var ns = "http://www.w3.org/2000/svg";
  todos(".fios", function (svg) {
    var fio = svg.querySelector(".luzes-fio");
    var grupo = svg.querySelector(".luzes");
    var total = fio.getTotalLength();
    var largura = svg.viewBox.baseVal.width;
    var qtd = largura > 1000 ? 9 : 5;
    for (var k = 0; k < qtd; k++) {
      var pt = fio.getPointAtLength(total * (k + 0.5) / qtd);
      [["luz-halo", 20], ["luz", 8]].forEach(function (c) {
        var o = document.createElementNS(ns, "circle");
        o.setAttribute("class", c[0]);
        o.setAttribute("cx", pt.x);
        o.setAttribute("cy", pt.y + 8);
        o.setAttribute("r", largura > 1000 ? c[1] : c[1] * 0.7);
        grupo.appendChild(o);
      });
    }
  });

  // Nomes longos diminuem para caber no bilhete
  function ajustar() {
    Xatspace.caber(document.querySelector(".desk .nome"), 348);
    Xatspace.caber(document.querySelector(".mob .nome"), 288);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  statusNoXat(d);
});

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
      return m.charAt(0) === m.charAt(0).toUpperCase() ? "Offline" : "offline";
    });
  }
  el.classList.add("xs-off");
}
