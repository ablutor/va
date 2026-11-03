// Modelo 49 · Madrugada lo-fi
// Lê dos dados do cliente: nome, sobrenome, local, gostos, frase/destaque, instagram, xat, musica e fotos (perfil, destaque, galeria).
// A cena (janela, cidade, chuva, mesa, gato, plantas) é decorativa e fixa; é desenhada aqui, uma vez para cada palco.

var NS = "http://www.w3.org/2000/svg";

function mk(tag, attrs, pai) {
  var e = document.createElementNS(NS, tag);
  for (var k in attrs) e.setAttribute(k, attrs[k]);
  if (pai) pai.appendChild(e);
  return e;
}

// Sorteio com semente fixa: a cena sai igual a cada vez que a página abre
function sorteio(semente) {
  var s = semente;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ---------- Cena ----------

// Parâmetros de cada palco (p é o prefixo dos ids no index.html)
var CENAS = {
  d: {
    vidro: { x: 1114, y: 74, w: 702, h: 562 }, chao: 636, estrelas: 90, altoEstrelas: 300,
    cintila: [[1240, 130], [1560, 120], [1400, 230]],
    predios: [
      { c: "cd1", min: 110, max: 230, wmin: 26, wmax: 56, luz: .10 },
      { c: "cd2", min: 150, max: 300, wmin: 30, wmax: 64, luz: .18 },
      { c: "cd3", min: 130, max: 330, wmin: 36, wmax: 80, luz: .28 }
    ],
    janela: { dx: 11, dy: 13, w: 5, h: 7, ox: 6, oy: 10, fim: 6 }, antena: 18, x0: 1104,
    neblina: { y: 500, h: 136 },
    chuva: { tile: 190, n: 62, comp: [14, 52], x0: 1090, x1: 1900, dur: 1.5, esp: 1 },
    gotas: { n: 46, x: [1124, 806], y: [90, 530], r: [1.8, 4.6], traco: [18, 60], bw: .7 },
    bokeh: [[1260, 540, 16, "lj-a"], [1330, 500, 10, "lj-b"], [1700, 560, 14, "lj-c"], [1560, 520, 9, "lj-a"], [1180, 470, 12, "lj-b"]],
    jiboia: { bx: 740, by: 654, f: [[-60, 50], [-35, 64], [-15, 56], [10, 60], [35, 52], [62, 46], [-85, 34], [85, 30]], k: 1.5, kc: 1.4, ls: 2.4, lf: .55,
      pend: [[706, 666, -30, 36, 22], [774, 668, 40, 36, 22]] },
    grande: { bx: 1858, by: 644, f: [[-78, 170, -12], [-58, 230, -4], [-38, 300, 6], [-20, 250, 2], [-4, 340, 0], [14, 280, 8], [32, 330, 10], [52, 230, 6], [72, 170, 12], [-100, 120, -20], [90, 120, 12], [-46, 160, 0], [24, 170, 0]] },
    fio: { nails: [[-10, 62], [290, 84], [650, 74], [1010, 90]], sag: 84, n: 11, hw: 48, r: 15, dy: 7, rx: 3.2, ry: 4.4 }
  },
  m: {
    vidro: { x: 24, y: 22, w: 342, h: 178 }, chao: 200, estrelas: 60, altoEstrelas: 110,
    cintila: [],
    predios: [
      { c: "cd1", min: 36, max: 80, wmin: 16, wmax: 34, luz: .10 },
      { c: "cd2", min: 50, max: 104, wmin: 18, wmax: 40, luz: .18 },
      { c: "cd3", min: 40, max: 118, wmin: 22, wmax: 46, luz: .28 }
    ],
    janela: { dx: 7, dy: 8, w: 3, h: 4, ox: 4, oy: 6, fim: 4 }, antena: 9, x0: 14,
    neblina: { y: 150, h: 50 },
    chuva: { tile: 100, n: 34, comp: [9, 31], x0: 14, x1: 400, dur: 1.4, esp: .8 },
    gotas: { n: 18, x: [30, 330], y: [30, 130], r: [1.4, 3], traco: [10, 28], bw: .5 },
    bokeh: [[70, 170, 8, "lj-a"], [120, 160, 5, "lj-b"], [290, 172, 7, "lj-c"], [230, 168, 5, "lj-a"]],
    jiboia: { bx: 98, by: 577, f: [[-60, 26], [-35, 32], [-12, 28], [12, 30], [36, 26], [62, 22]], k: 1.4, kc: 1.2, ls: 1.4, lf: .6,
      pend: [[84, 584, -12, 14, 10], [112, 584, 14, 14, 10]] },
    grande: null,
    fio: { nails: [[-10, 228], [100, 240], [290, 232], [400, 242]], sag: 36, n: 9, hw: 48, r: 8, dy: 4, rx: 1.8, ry: 2.6 }
  }
};

var VERDES = ["#3f9a7e", "#2f7f6c", "#52b08f", "#2a6a5f"];
var VERDES_G = ["#2f8a73", "#3aa085", "#27705f", "#46b295"];

function folha(pai, x, y, ang, len, cor, brilho) {
  var w = len * .36;
  var g = mk("g", { transform: "translate(" + x + " " + y + ") rotate(" + ang + ")" }, pai);
  mk("path", { d: "M0 0C" + len * .25 + " " + -w + " " + len * .8 + " " + -w * .85 + " " + len + " 0C" + len * .8 + " " + w * .85 + " " + len * .25 + " " + w + " 0 0z", fill: cor }, g);
  mk("path", { d: "M0 0L" + len * .96 + " 0", stroke: brilho, "stroke-width": Math.max(.8, len / 40), opacity: .55, fill: "none" }, g);
  if (len > 30) {
    mk("path", { d: "M" + len * .2 + " 0L" + len * .46 + " " + -w * .62 + "M" + len * .2 + " 0L" + len * .46 + " " + w * .62 + "M" + len * .48 + " 0L" + len * .72 + " " + -w * .5 + "M" + len * .48 + " 0L" + len * .72 + " " + w * .5, stroke: brilho, "stroke-width": .9, opacity: .35, fill: "none" }, g);
  }
}

function bez(a, c, b, t) {
  var u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

function construirCena(p) {
  var c = CENAS[p];
  var rnd = sorteio(11);
  var pick = function (a) { return a[Math.floor(rnd() * a.length)]; };
  var $ = function (id) { return document.getElementById(p + "-" + id); };
  var v = c.vidro;

  // Estrelas
  var est = $("stars");
  for (var i = 0; i < c.estrelas; i++) {
    var r = rnd() < .15 ? (p === "d" ? 1.8 : 1.3) : rnd() * (p === "d" ? 1.1 : .8) + (p === "d" ? .4 : .3);
    mk("circle", { cx: (v.x + rnd() * v.w).toFixed(1), cy: (v.y + rnd() * c.altoEstrelas).toFixed(1), r: r.toFixed(2), fill: "#fff", opacity: (.35 + rnd() * .6).toFixed(2) }, est);
  }
  c.cintila.forEach(function (s) {
    var x = s[0], y = s[1];
    mk("path", { d: "M" + x + " " + (y - 7) + "Q" + x + " " + y + " " + (x + 7) + " " + y + "Q" + x + " " + y + " " + x + " " + (y + 7) + "Q" + x + " " + y + " " + (x - 7) + " " + y + "Q" + x + " " + y + " " + x + " " + (y - 7) + "z", fill: "#fff", opacity: .9 }, est);
  });

  // Cidade em três camadas, com janelinhas acesas (algumas piscam)
  var cidade = $("city");
  var jan = c.janela;
  var luzes = ["lj-a", "lj-a", "lj-a", "lj-b", "lj-c", "lj-d"];
  c.predios.forEach(function (L) {
    var x = c.x0;
    while (x < v.x + v.w) {
      var w = L.wmin + rnd() * (L.wmax - L.wmin);
      var h = L.min + rnd() * (L.max - L.min);
      mk("rect", { x: x, y: c.chao - h, width: w, height: h, class: L.c }, cidade);
      if (rnd() < .25) mk("rect", { x: x + w * .45, y: c.chao - h - c.antena, width: p === "d" ? 2 : 1.4, height: c.antena, class: L.c }, cidade);
      if (p === "d" && rnd() < .2) mk("rect", { x: x + 4, y: c.chao - h - 6, width: w * .4, height: 6, class: L.c }, cidade);
      for (var yy = c.chao - h + jan.oy; yy < c.chao - jan.fim; yy += jan.dy) {
        for (var xx = x + jan.ox; xx < x + w - jan.ox - 2; xx += jan.dx) {
          if (rnd() < L.luz) {
            var cl = pick(luzes);
            var pisca = rnd() < .09 ? (rnd() < .5 ? " tw" : " tw t2") : "";
            mk("rect", { x: xx, y: yy, width: jan.w, height: jan.h, class: cl + pisca, opacity: (.55 + rnd() * .45).toFixed(2) }, cidade);
          }
        }
      }
      x += w + (rnd() < .3 ? rnd() * (p === "d" ? 6 : 4) : 0);
    }
  });

  // Neblina na base da cidade
  var defs = $("city").closest("svg").querySelector("defs");
  var g = mk("linearGradient", { id: p + "-fog", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  mk("stop", { offset: 0, style: "stop-color:var(--fog);stop-opacity:0" }, g);
  mk("stop", { offset: 1, style: "stop-color:var(--fog);stop-opacity:.38" }, g);
  mk("rect", { x: v.x, y: c.neblina.y, width: v.w, height: c.neblina.h, fill: "url(#" + p + "-fog)" }, cidade);

  // Chuva: um bloco de riscos que se repete na vertical, deslizando um bloco inteiro por volta (volta sem emenda)
  var ch = c.chuva;
  var chuva = $("rain");
  var camadas = [{ dur: ch.dur, fino: 1, cl: "" }, { dur: ch.dur * 1.7, fino: .7, cl: "" }];
  camadas.forEach(function (cam, ci) {
    var tile = ch.tile * (ci ? .8 : 1);
    var dx = -tile * .22;
    var grupo = mk("g", { class: "chuva", style: "--dx:" + dx.toFixed(1) + "px;--dy:" + tile + "px;--dur:" + cam.dur.toFixed(2) + "s" }, chuva);
    var base = [];
    for (var i = 0; i < Math.round(ch.n * (ci ? .6 : 1)); i++) {
      base.push({ x: ch.x0 + rnd() * (ch.x1 - ch.x0), y: rnd() * tile, l: ch.comp[0] + rnd() * (ch.comp[1] - ch.comp[0]), w: (rnd() < .2 ? 1.5 : 1) * ch.esp * cam.fino, o: (.12 + rnd() * .28) * (ci ? .8 : 1) });
    }
    var tiles = Math.ceil(v.h / tile) + 2;
    for (var t = -1; t < tiles; t++) {
      base.forEach(function (b) {
        var y = b.y + t * tile;
        mk("line", { x1: b.x.toFixed(1), y1: y.toFixed(1), x2: (b.x - b.l * .22).toFixed(1), y2: (y + b.l).toFixed(1), stroke: "#cfd8ff", "stroke-width": b.w, opacity: b.o.toFixed(2) }, grupo);
      });
    }
  });

  // Gotas no vidro
  var gt = c.gotas, gotas = $("drops"), lista = [];
  for (var i = 0; i < gt.n; i++) {
    var x = gt.x[0] + rnd() * gt.x[1], y = gt.y[0] + rnd() * gt.y[1], r = gt.r[0] + rnd() * gt.r[1];
    lista.push([x, y, r]);
    if (rnd() < .4) {
      var l = gt.traco[0] + rnd() * gt.traco[1];
      mk("path", { d: "M" + x + " " + (y - l) + "Q" + (x + (rnd() * 6 - 3)) + " " + (y - l / 2) + " " + x + " " + y, stroke: "rgba(205,220,255,.28)", "stroke-width": Math.max(p === "d" ? 1 : .8, r * .4), fill: "none", "stroke-linecap": "round" }, gotas);
    }
  }
  lista.forEach(function (d) {
    mk("ellipse", { cx: d[0], cy: d[1], rx: d[2], ry: d[2] * 1.25, fill: "url(#" + p + "-drop)", stroke: "rgba(220,230,255,.45)", "stroke-width": gt.bw }, gotas);
    mk("circle", { cx: d[0] - d[2] * .3, cy: d[1] - d[2] * .4, r: Math.max(.5, d[2] * .22), fill: "#fff", opacity: .9 }, gotas);
  });
  c.bokeh.forEach(function (b) {
    mk("circle", { cx: b[0], cy: b[1], r: b[2], class: b[3], opacity: .12, filter: "url(#" + p + (p === "d" ? "-blur2" : "-blur1") + ")" }, gotas);
  });

  // Jiboia na mesa
  var j = c.jiboia, p1 = $("plant1");
  j.f.forEach(function (a, i) {
    var len = a[1], rad = a[0] * Math.PI / 180;
    var ex = j.bx + Math.sin(rad) * len * j.k, ey = j.by - Math.cos(rad) * len * j.k;
    mk("path", { d: "M" + j.bx + " " + j.by + "Q" + (j.bx + Math.sin(rad) * len) + " " + (j.by - len * j.kc) + " " + ex + " " + ey, stroke: "#3f9a7e", "stroke-width": j.ls, fill: "none" }, p1);
    folha(p1, ex, ey, a[0] - 90 + (a[0] > 0 ? 30 : -30) + (i % 2 ? 20 : -20), len * j.lf, VERDES[i % 4], "#d8ffe9");
  });
  j.pend.forEach(function (t, i) {
    var dx = t[2], dy = t[3];
    mk("path", { d: "M" + t[0] + " " + t[1] + "Q" + (t[0] + dx) + " " + (t[1] + dy * .55) + " " + (t[0] + dx * .8) + " " + (t[1] + dy), stroke: "#2f6f5a", "stroke-width": p === "d" ? 2 : 1.2, fill: "none" }, p1);
    folha(p1, t[0] + dx * .8, t[1] + dy, 90 + (dx > 0 ? -20 : 20), t[4], VERDES[i], "#d8ffe9");
  });

  // Planta grande ao lado da janela (só no computador)
  if (c.grande) {
    var gr = c.grande, p2 = $("plant2");
    gr.f.forEach(function (b) {
      var len = b[1], rad = b[0] * Math.PI / 180;
      var ex = gr.bx + Math.sin(rad) * len, ey = gr.by - Math.cos(rad) * len;
      mk("path", { d: "M" + gr.bx + " " + gr.by + "Q" + (gr.bx + Math.sin(rad) * len * .2) + " " + (gr.by - len * .6) + " " + ex + " " + ey, stroke: "#3aa085", "stroke-width": 4, fill: "none" }, p2);
      folha(p2, ex, ey, b[0] - 90 + b[2] * 3, len * .5, pick(VERDES_G), "#e4fff0");
    });
  }

  // Varal de luzes (pisca-pisca)
  var f = c.fio, fio = $("wireG"), mids = [];
  var d = "M" + f.nails[0][0] + " " + f.nails[0][1];
  for (var i = 0; i < 3; i++) {
    var a = f.nails[i], b = f.nails[i + 1], ct = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + f.sag];
    d += "Q" + ct[0] + " " + ct[1] + " " + b[0] + " " + b[1];
    mids.push(bez(a, ct, b, .5));
  }
  mk("path", { d: d, stroke: "#0f0b26", "stroke-width": p === "d" ? 2.6 : 1.6, fill: "none" }, fio);
  var cont = 0;
  for (var i = 0; i < 3; i++) {
    var a = f.nails[i], b = f.nails[i + 1], ct = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + f.sag];
    var n = (p === "m" && i !== 1) ? 6 : f.n;
    for (var k = 1; k <= n; k++) {
      var pt = bez(a, ct, b, k / (n + 1));
      // O quadro fica no meio de cada vão: sem lâmpadas atrás dele
      if (Math.abs(pt[0] - mids[i][0]) < (p === "d" ? f.hw : (i === 1 ? 48 : 26))) continue;
      var rosa = k % 2 === 0;
      var lamp = mk("g", { class: "pc" + (cont % 3 === 1 ? " p2" : cont % 3 === 2 ? " p3" : "") }, fio);
      cont++;
      mk("circle", { cx: pt[0], cy: pt[1] + f.dy, r: f.r, fill: "url(#" + p + (rosa ? "-bulbP" : "-bulb") + ")", opacity: .75 }, lamp);
      mk("ellipse", { cx: pt[0], cy: pt[1] + f.dy, rx: f.rx, ry: f.ry, style: "fill:" + (rosa ? "var(--bb1)" : "#fff2c4") }, lamp);
      mk("rect", { x: pt[0] - f.rx * .6, y: pt[1] - 1, width: f.rx * 1.2, height: f.rx * 1.2, fill: "#0f0b26" }, fio);
    }
    mk("circle", { cx: f.nails[i + 1][0], cy: f.nails[i + 1][1], r: p === "d" ? 4 : 2.4, fill: "#8a78c0" }, fio);
  }
}

construirCena("d");
construirCena("m");

// ---------- Ajustes de texto ----------

// Diminui a fonte até o texto caber na altura do bilhete
function caberNoBilhete(bilhete, minimo) {
  var texto = bilhete.querySelector("span");
  if (!texto) return;
  bilhete.style.fontSize = "";
  var cs = getComputedStyle(bilhete);
  var tamanho = parseFloat(cs.fontSize);
  var util = bilhete.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  texto.style.cssText = "";
  while (texto.scrollHeight > util + 1 && tamanho > minimo) {
    tamanho *= 0.95;
    bilhete.style.fontSize = tamanho + "px";
  }
  // Frase enorme: no tamanho mínimo, corta com reticências na última linha que cabe
  if (texto.scrollHeight > util + 1) {
    var linha = tamanho * (parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 1);
    texto.style.cssText = "display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:" + Math.max(1, Math.floor(util / linha));
  }
}

// O neon tem o contorno apagado por baixo; os dois precisam do mesmo tamanho
function caberNeon(neon, largura, minimo) {
  var aceso = neon.querySelector(".t:not(.off)");
  var apagado = neon.querySelector(".t.off");
  function medir() {
    Xatspace.caber(aceso, largura, minimo);
    apagado.style.fontSize = aceso.style.fontSize;
  }
  medir();
  if (document.fonts) document.fonts.ready.then(medir);
}

// Nome comprido: encolhe; se ainda assim não couber, fica só o primeiro nome e o último sobrenome
function caberNome(el, completo, largura, minimo) {
  if (!el) return;
  el.textContent = completo;
  Xatspace.caber(el, largura, minimo);
  if (el.scrollWidth > largura + 1) {
    var p = completo.split(/\s+/);
    if (p.length > 2) {
      el.textContent = p[0] + " " + p[p.length - 1];
      Xatspace.caber(el, largura, minimo);
    }
  }
}

// Adesivos: diminui a letra de todos juntos até os nomes caberem, sem reticências
function caberAdesivos(caixa, minimo) {
  var itens = caixa.querySelectorAll(".st");
  if (!itens.length) return;
  itens.forEach(function (s) { s.style.fontSize = ""; });
  var tam = parseFloat(getComputedStyle(itens[0]).fontSize);
  function corta() {
    return Array.prototype.some.call(itens, function (s) {
      var lb = s.querySelector(".lb");
      return lb.scrollWidth > lb.clientWidth;
    });
  }
  var mudou = false;
  while (corta() && tam > minimo) {
    tam *= 0.94;
    mudou = true;
    itens.forEach(function (s) { s.style.fontSize = tam + "px"; });
  }
  // Folga de um passo: a reticência aparece com 1px de sobra
  if (mudou) itens.forEach(function (s) { s.style.fontSize = tam * 0.97 + "px"; });
}

// Título e artista do rádio: se não cabem, rolam de um lado ao outro (mede de novo a cada troca de música)
function rolagem(caixa) {
  var span = caixa.querySelector("span");
  function medir() {
    caixa.classList.remove("rola");
    var sobra = span.scrollWidth - caixa.clientWidth;
    if (sobra > 1) {
      caixa.style.setProperty("--rola", -Math.ceil(sobra + 4) + "px");
      caixa.classList.add("rola");
    }
  }
  medir();
  if (window.MutationObserver) new MutationObserver(medir).observe(span, { childList: true, characterData: true, subtree: true });
  if (document.fonts) document.fonts.ready.then(medir);
}

// ---------- Gostos: um adesivo para cada um ----------

var ICONES = {
  mar: { bg: "#bfe9f5", cor: "#1d6c8a", d: '<path d="M2 15c2.5-3 5-3 7.5 0s5 3 7.5 0 3-2.5 5-1.5"/><path d="M2 20c2.5-3 5-3 7.5 0s5 3 7.5 0 3-2.5 5-1.5"/><circle cx="17" cy="6" r="3" fill="#ffd36e" stroke="#e8a13a"/>' },
  livro: { bg: "#ffd9e4", cor: "#a63a68", d: '<path d="M3 5.5C6 4 9 4.2 12 6c3-1.8 6-2 9-.5V19c-3-1.5-6-1.3-9 .5-3-1.8-6-2-9-.5z"/><path d="M12 6v13.5"/>' },
  musica: { bg: "#dcd2ff", cor: "#5a3fb0", d: '<path d="M9 17V5l11-2v12"/><circle cx="6.5" cy="17.5" r="3" fill="#5a3fb0"/><circle cx="17.5" cy="15.5" r="3" fill="#5a3fb0"/>' },
  cafe: { bg: "#ffe2c2", cor: "#8a4a1c", d: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4"/>' },
  trilha: { bg: "#cdeed6", cor: "#2c7a4a", d: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M9 8l2 3"/>' },
  viagem: { bg: "#cfe6ff", cor: "#2a5fa8", d: '<path d="M21 3L3 10l7 3 3 7z"/><path d="M10 13l11-10"/>' },
  filme: { bg: "#ffd6d6", cor: "#a63a3a", d: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 6l2 4M12 6l2 4M17 6l2 4"/>' },
  jogo: { bg: "#e3d6ff", cor: "#5a3fb0", d: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="16" cy="11" r="1" fill="#5a3fb0"/><circle cx="18.5" cy="14" r="1" fill="#5a3fb0"/>' },
  foto: { bg: "#d9f0f2", cor: "#1d6c78", d: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>' },
  comida: { bg: "#ffe8b8", cor: "#9a5a10", d: '<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 21V3c-2 1-3 4-3 8h3"/>' },
  arte: { bg: "#ffd9ee", cor: "#a63a8a", d: '<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.6-1.3.3-2.5 1.7-2.5H18a3 3 0 0 0 3-3C21 7 17 3 12 3z"/><circle cx="8" cy="11" r="1.2" fill="#a63a8a"/><circle cx="12" cy="7.5" r="1.2" fill="#a63a8a"/><circle cx="16" cy="10" r="1.2" fill="#a63a8a"/>' },
  esporte: { bg: "#d7f3d0", cor: "#2c7a2c", d: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>' },
  estrela: { bg: "#fff0b8", cor: "#9a7410", d: '<path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/>' },
  coracao: { bg: "#ffd2e0", cor: "#b02a58", d: '<path d="M12 20C4 14 3 10 3 8a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 2-1 6-9 12z"/>' }
};

var PALAVRAS = [
  [/praia|mar\b|mares|sol\b|surf|ondas|litoral|oceano|nadar|natacao/, "mar"],
  [/leitura|ler\b|livro|poesia|escrever|escrita/, "livro"],
  [/musica|som\b|show|cantar|banda|violao|piano|rock|samba|pagode|dj\b/, "musica"],
  [/cafe|cha\b|chocolate|padaria/, "cafe"],
  [/trilha|natureza|montanha|camping|acampar|caminhada|aventura|campo|mato|floresta/, "trilha"],
  [/viagem|viajar|viagens|aviao|turismo|mochil/, "viagem"],
  [/filme|cinema|serie|netflix|tv\b|anime/, "filme"],
  [/game|jogo|video ?game|playstation|xbox|rpg/, "jogo"],
  [/foto|fotografia|camera|cinegrafia/, "foto"],
  [/comida|cozinha|cozinhar|culinaria|churrasco|pizza|gastronomia|doce|bolo/, "comida"],
  [/arte|desenho|desenhar|pintura|pintar|design|artesanato/, "arte"],
  [/futebol|esporte|treino|academia|corrida|correr|volei|basquete|bike|ciclismo|skate|danca/, "esporte"]
];

function icone(gosto, i) {
  var t = gosto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (var k = 0; k < PALAVRAS.length; k++) {
    if (PALAVRAS[k][0].test(t)) return ICONES[PALAVRAS[k][1]];
  }
  return i % 2 ? ICONES.coracao : ICONES.estrela;
}

function adesivo(gosto, i) {
  var ic = icone(gosto, i);
  var el = document.createElement("div");
  el.className = "st";
  var bola = document.createElement("span");
  bola.className = "ic";
  bola.style.background = ic.bg;
  bola.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="' + ic.cor + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ic.d + "</svg>";
  var nome = document.createElement("span");
  nome.className = "lb";
  nome.textContent = gosto;
  el.appendChild(bola);
  el.appendChild(nome);
  return el;
}

// ---------- Dados do cliente ----------

Xatspace.aoCarregar(function (d) {
  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  // Retrato: foto de perfil; se faltar, a de destaque ou a primeira da galeria
  var f = d.fotos || {};
  var retrato = f.perfil || f.destaque || (f.galeria || [])[0] || "";
  todos("[data-retrato]", function (img) {
    if (retrato) img.src = Xatspace.arquivo(retrato);
    img.alt = d.nomeCompleto || "";
  });

  // Frase no bilhete
  var frase = d.frase || d.destaque || "";
  todos('[data-texto="frase"]', function (el) { el.textContent = frase; });
  todos(".postit", function (el) { el.hidden = !frase; });

  // Gostos: até três adesivos. No computador ficam em duas gavetas (2 + 1); no celular, numa fileira.
  var gostos = (d.gostos || []).slice(0, 3);
  todos(".gostos", function (caixa) {
    caixa.textContent = "";
    var ini = 0, fim = 3;
    if (caixa.classList.contains("ga")) fim = 2;
    if (caixa.classList.contains("gb")) ini = 2;
    gostos.slice(ini, fim).forEach(function (g, i) { caixa.appendChild(adesivo(g, ini + i)); });
  });

  // Textos que podem ser longos
  function ajustar() {
    caberNeon(document.querySelector(".desk .neon"), 286, 30);
    caberNeon(document.querySelector(".mob .neon"), 196, 22);
    caberNome(document.querySelector(".desk .quadro .nome span"), d.nomeCompleto, 252, 20);
    caberNome(document.querySelector(".mob .quadro .nome span"), d.nomeCompleto, 156, 15);
    caberNome(document.querySelector(".desk .plate .nm"), d.nomeCompleto, 318, 20);
    todos(".gostos", function (c) { caberAdesivos(c, c.closest(".desk") ? 14 : 10); });
    caberNoBilhete(document.querySelector(".desk .postit"), 17);
    caberNoBilhete(document.querySelector(".mob .postit"), 11);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);
  todos(".visor .ti, .visor .ar", rolagem);

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
