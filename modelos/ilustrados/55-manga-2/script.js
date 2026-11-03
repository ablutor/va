// Modelo 55 · Mangá 2
// Lê dos dados do cliente: nome, sobrenome, frase, titulo (efeito sonoro e título do capítulo), local (legenda da paisagem),
// gostos (habilidades especiais), instagram, xat (selo online), musica e fotos (perfil e cenario).
Xatspace.aoCarregar(function (d) {
  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  function primeiro() {
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) return arguments[i];
    return "";
  }

  // ---------- Fotos dos quadros (se faltar uma, usa outra) ----------

  var f = d.fotos;
  var gal = f.galeria || [];
  var retrato = primeiro(f.perfil, f.destaque, gal[0]);
  var cenario = primeiro(f.cenario, gal[3], gal[4], gal[0], f.verso);

  function porFoto(sel, caminho, variavel, padrao) {
    if (!caminho) return;
    var url = Xatspace.arquivo(caminho);
    todos(sel, function (el) { el.style.backgroundImage = "url('" + url + "')"; });
    brilhoDaFoto(url, variavel, padrao);
  }
  porFoto(".p1 .foto i", retrato, "--foto-brilho", 1.4);
  porFoto(".cena-foto i", cenario, "--cena-brilho", 1.3);

  // O brilho da foto em preto e branco muda com a foto: escura clareia, clara não estoura.
  // Mede a luminosidade média num canvas pequeno; se o navegador não deixar (foto de outro
  // site), fica o valor padrão.
  function brilhoDaFoto(url, variavel, padrao) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      try {
        var c = document.createElement("canvas");
        c.width = c.height = 24;
        var x = c.getContext("2d");
        x.drawImage(img, 0, 0, 24, 24);
        var px = x.getImageData(0, 0, 24, 24).data;
        var soma = 0;
        for (var i = 0; i < px.length; i += 4) soma += (0.3 * px[i] + 0.59 * px[i + 1] + 0.11 * px[i + 2]) / 255;
        var lum = soma / (px.length / 4);
        var b = Math.max(0.95, Math.min(1.6, 1 + (0.3 - lum) * 3.5));
        document.documentElement.style.setProperty(variavel, b.toFixed(2));
      } catch (e) {
        document.documentElement.style.setProperty(variavel, padrao);
      }
    };
    img.src = url;
  }

  // ---------- Balão de fala: as duas últimas palavras ganham o marca-texto ----------

  var frase = (d.frase || d.destaque || "").trim();
  todos("[data-fala]", function (el) {
    el.textContent = "";
    var p = frase.split(/\s+/);
    var n = p.length > 4 ? 2 : 0;
    if (n) el.appendChild(document.createTextNode(p.slice(0, -n).join(" ") + " "));
    var m = document.createElement(n ? "mark" : "span");
    m.textContent = p.slice(-n || 0).join(" ");
    if (n) el.appendChild(m);
    else el.textContent = frase;
  });
  document.querySelectorAll(".balao-fala").forEach(function (b) { b.hidden = !frase; });

  // Balão de pensamento: xícara para quem gosta de café, senão uma notinha
  var gostos = (d.gostos || []).filter(Boolean).slice(0, 3);
  var cafe = /caf[eé]/i.test((gostos[0] || "") + " " + (gostos[1] || ""));
  todos(".pensa", function (el) { el.classList.toggle("nota", !cafe); });

  // ---------- Habilidades especiais: os gostos ----------

  var SEM = function (t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var ICONES = {
    cafe: '<svg viewBox="0 0 40 40"><path class="sol" d="M7 17 H28 V25 C28 31 24 35 17.5 35 C11 35 7 31 7 25Z"/><path d="M28 19.5 H31 C36 19.5 36 29 30 29 H27.5"/><path d="M13 12 C10 9 16 7 13 3"/><path d="M21 12 C18 9 24 7 21 3"/></svg>',
    trilha: '<svg viewBox="0 0 40 40"><path class="sol" d="M3 33 L15 11 L22 22 L26 16 L37 33Z"/><circle class="sol" cx="30" cy="8" r="3"/></svg>',
    musica: '<svg viewBox="0 0 40 40"><path d="M14 31 V9 L31 5 V27"/><ellipse class="sol" cx="10" cy="32" rx="6.5" ry="5"/><ellipse class="sol" cx="27" cy="28" rx="6.5" ry="5"/></svg>',
    praia: '<svg viewBox="0 0 40 40"><circle class="sol" cx="27" cy="12" r="6"/><path d="M3 26 Q9 21 15 26 T27 26 T38 26"/><path d="M3 33 Q9 28 15 33 T27 33 T38 33"/></svg>',
    leitura: '<svg viewBox="0 0 40 40"><path class="sol" d="M5 9 Q13 6 20 11 Q27 6 35 9 V31 Q27 28 20 33 Q13 28 5 31Z"/><path d="M20 11 V33" stroke="#000" stroke-width="2" style="stroke:var(--tinta)"/></svg>',
    viagem: '<svg viewBox="0 0 40 40"><path class="sol" d="M4 22 L36 6 L28 34 L19 25 L14 32 L14 23Z"/></svg>',
    jogo: '<svg viewBox="0 0 40 40"><rect class="sol" x="4" y="12" width="32" height="18" rx="9"/><path d="M12 17 V25 M8 21 H16" style="stroke:var(--tinta)"/><circle cx="28" cy="19" r="1.8" style="fill:var(--tinta)"/><circle cx="32" cy="23" r="1.8" style="fill:var(--tinta)"/></svg>',
    padrao: '<svg viewBox="0 0 40 40"><path class="sol" d="M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3Z"/></svg>'
  };
  var TIPOS = [
    [/caf[eé]|ch[aá]\b|expresso/i, "cafe", "コーヒー", "Combustível de toda manhã."],
    [/trilha|caminhada|aventura|montanha|natureza|camping/i, "trilha", "トレイル", "Um passo de cada vez."],
    [/m[uú]sica|show|violao|violão|cantar|banda|rock|samba/i, "musica", "音楽", "Fones sempre no último volume."],
    [/praia|mar\b|surf|sol\b|ver[aã]o|piscina/i, "praia", "ビーチ", "Pés na areia, cabeça leve."],
    [/leitura|livro|ler\b|poesia/i, "leitura", "読書", "Só mais um capítulo."],
    [/viag|mochil|turismo/i, "viagem", "旅", "Mala sempre pronta."],
    [/jogo|game|videogame/i, "jogo", "ゲーム", "Só mais uma partida."]
  ];
  function tipo(nome) {
    for (var i = 0; i < TIPOS.length; i++) if (TIPOS[i][0].test(nome) || TIPOS[i][0].test(SEM(nome))) return TIPOS[i];
    return [null, "padrao", "特技", "Especialidade da casa."];
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var habilidades = gostos.length ? gostos : ["Papo", "Música", "Amigos"];
  var html = habilidades.map(function (g) {
    var t = tipo(g);
    return '<div class="hab"><span class="nv">★★★★★</span>' +
      '<div class="linha"><div class="ic">' + ICONES[t[1]] + '</div>' +
      '<div class="tx"><h3>' + esc(g) + "<small>" + t[2] + "</small></h3></div></div>" +
      "<p>" + t[3] + "</p></div>";
  }).join("");
  todos(".habs", function (el) { el.innerHTML = html; });

  // ---------- Ajustes de tamanho para textos longos ----------

  // Diminui a fonte até o texto caber na altura (texto na vertical ou em caixa de altura fixa)
  function caberAltura(el, max, minimo, medir) {
    if (!el) return;
    el.style.fontSize = "";
    var tamanho = parseFloat(getComputedStyle(el).fontSize);
    var alvo = medir || el;
    while (alvo.scrollHeight > max && tamanho > (minimo || 8)) {
      tamanho *= 0.95;
      el.style.fontSize = tamanho + "px";
    }
  }

  function ajustar() {
    // O sobrenome encolhe primeiro; o nome gigante usa o espaço que sobra ao lado dele
    ["desk", "mob"].forEach(function (t) {
      var desk = t === "desk";
      var lima = document.querySelector("." + t + " .lima");
      var larg = 0;
      if (lima && !lima.hidden) {
        Xatspace.caber(lima, desk ? 270 : 120, desk ? 30 : 16);
        larg = lima.offsetWidth - (desk ? 56 : 28);
      }
      Xatspace.caber(document.querySelector("." + t + " .nome-g"), (desk ? 770 : 336) - larg, desk ? 60 : 30);
    });
    // Efeito sonoro e título do capítulo (na vertical) encolhem pela altura
    caberAltura(document.querySelector(".desk .sfx-vert"), 440, 28);
    caberAltura(document.querySelector(".mob .sfx-vert"), 200, 16);
    caberAltura(document.querySelector(".desk .fita .vert"), 270, 16);
    caberAltura(document.querySelector(".mob .fita .vert"), 84, 9);
    // Frase no balão: diminui até caber
    caberAltura(document.querySelector(".desk .fala"), 138, 14, document.querySelector(".desk .fala span"));
    caberAltura(document.querySelector(".mob .fala"), 66, 9, document.querySelector(".mob .fala span"));
    // Título da música e @instagram numa linha só
    Xatspace.caber(document.querySelector(".desk .titulo-m span"), 312, 22);
    Xatspace.caber(document.querySelector(".mob .titulo-m span"), 186, 13);
    Xatspace.caber(document.querySelector(".desk .ig b"), 176, 16);
    Xatspace.caber(document.querySelector(".mob .ig b"), 112, 12);
    Xatspace.caber(document.querySelector(".desk .legenda span"), 440, 14);
    todos(".desk .hab h3", function (h) { Xatspace.caber(h, 160, 22); });
    todos(".mob .hab h3", function (h) { Xatspace.caber(h, 60, 11); });
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  // No celular o título do capítulo é curto: corta com reticências
  todos(".mob .fita [data-xs]", function (el) {
    var t = (d.titulo || "").trim();
    if (t.length > 16) el.textContent = t.slice(0, 15).replace(/\s+$/, "") + "…";
  });

  // Sem ID no xat o selo online não aparece; o quadro de baixo se reorganiza
  if (!d.xat) todos(".p6", function (el) { el.classList.add("sem-status"); });
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

// ---------- Movimento ----------

var semMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var raizManga = document.documentElement;
var tempoEntrada = 0;

// Entrada: os quadros chegam um a um, depois o ドン e o nome. Chame de novo para repetir.
window.mangaEntrada = function () {
  if (semMovimento) return;
  raizManga.classList.remove("manga-prep", "manga-entra");
  void raizManga.offsetWidth;
  raizManga.classList.add("manga-entra");
  clearTimeout(tempoEntrada);
  // Depois da animação a classe sai: a página parada é o estado normal
  tempoEntrada = setTimeout(function () { raizManga.classList.remove("manga-entra"); }, 1900);
};

// Clique (ou Enter/Espaço) no retrato: tremor, linhas explodindo e efeito sonoro
(function () {
  var tempo = 0;
  function impacto(el) {
    el.classList.remove("impacto");
    void el.offsetWidth;
    el.classList.add("impacto");
    clearTimeout(tempo);
    tempo = setTimeout(function () {
      document.querySelectorAll("[data-impacto]").forEach(function (e) { e.classList.remove("impacto"); });
    }, 800);
  }
  document.querySelectorAll("[data-impacto]").forEach(function (el) {
    el.addEventListener("click", function () { impacto(el); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        impacto(el);
      }
    });
  });
})();

// Esconde os quadros logo no carregamento e só começa a entrada com as fontes prontas
if (!semMovimento) {
  raizManga.classList.add("manga-prep");
  Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(function (ok) { setTimeout(ok, 1500); })
  ]).then(function () {
    requestAnimationFrame(function () { requestAnimationFrame(window.mangaEntrada); });
  });
}
