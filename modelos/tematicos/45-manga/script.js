// Modelo 45 · Mangá
// Lê dos dados do cliente: nome, sobrenome, genero, local, gostos, frase/destaque, titulo (título do capítulo),
// manchete (legenda do quadro da paisagem), instagram, xat, musica e fotos (perfil, destaque, cenario, verso, galeria).
Xatspace.aoCarregar(function (d) {
  var fem = d.genero === "f";

  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  function texto(nome, valor) {
    todos('[data-texto="' + nome + '"]', function (el) { el.textContent = valor; });
  }

  // ---------- Fotos dos quadros (se faltar uma, usa outra) ----------

  function foto() {
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) return arguments[i];
    return "";
  }
  var f = d.fotos;
  var gal = f.galeria || [];
  var quadros = {
    q1: foto(f.perfil, f.destaque, gal[0]),
    q2: foto(f.destaque, f.perfil, gal[0]),
    q3: foto(f.cenario, gal[3], gal[0], f.perfil),
    q4: foto(f.verso, gal[2], f.destaque, f.perfil)
  };
  todos("[data-foto]", function (el) {
    var v = quadros[el.dataset.foto];
    if (v) el.style.backgroundImage = "url('" + Xatspace.arquivo(v) + "')";
  });

  // ---------- Textos ----------

  var gostos = d.gostos.slice(0, 6);
  var heroi = fem ? "heroína" : "herói";

  texto("cena", d.local ? d.local + ", 7h da manhã." : "7h da manhã.");
  texto("capitulo", "Capítulo 1 · " + (fem ? "a " : "o ") + heroi + " do xat");
  texto("ficha", "Ficha " + (fem ? "da heroína" : "do herói"));
  texto("dia", "E o dia só estava começando…");
  texto("legenda", d.nomeCompleto + (d.local ? ", " + d.localDe : ""));
  texto("nome-curto", d.nomeCompleto);
  texto("manchete", d.manchete || (gostos.length ? gostos.join(", ") + "." : ""));
  texto("manchete-curta", d.manchete || (gostos.length ? gostos.join(", ") + "." : ""));
  texto("balao-gosto", gostos.length ? gostos[0] + "?" : "Oi!");
  texto("balao-frase", "“" + fraseCurta(d.destaque || d.frase || "") + "”");

  // Título do capítulo: a última palavra leva o degradê
  var palavras = (d.titulo || "").trim().split(/\s+/);
  var ultima = palavras.pop();
  todos('[data-texto="titulo"]', function (el) {
    el.textContent = "";
    if (palavras.length) el.appendChild(document.createTextNode(palavras.join(" ") + " "));
    var i = document.createElement("i");
    i.textContent = ultima;
    el.appendChild(i);
  });

  // Poderes: os gostos separados por pontos
  todos('[data-texto="poderes"]', function (p) {
    p.querySelector("b").textContent = gostos.join(" · ");
    p.hidden = !gostos.length;
  });

  // Textos longos diminuem para caber no quadro
  function ajustar() {
    ajustarTitulo(document.querySelector(".desk .titulo b"), 34);
    ajustarTitulo(document.querySelector(".mob .titulo b"), 26);
    limitarLinhas(document.querySelector(".desk .ci"), 2, 11);
    limitarLinhas(document.querySelector(".mob .ci"), 2, 7);
    Xatspace.caber(document.querySelector(".desk .b1 span"), 150, 14);
    Xatspace.caber(document.querySelector(".mob .b1 span"), 56, 9);
    limitarLinhas(document.querySelector(".desk .b2 span"), 4, 14);
    limitarLinhas(document.querySelector(".mob .b2 span"), 4, 10);
    limitarLinhas(document.querySelector(".desk .q3 .nar"), 2, 12);
    limitarLinhas(document.querySelector(".mob .q3 .nar"), 3, 8);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  statusNoXat(d);
});

// Título do capítulo: tenta numa linha só (encolhendo até ~60%); se ainda não couber, quebra em até 2 linhas
function ajustarTitulo(b, minimo) {
  if (!b) return;
  var caixa = b.parentNode;
  var cs = getComputedStyle(caixa);
  var util = parseFloat(cs.maxWidth) - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) -
    parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
  b.style.whiteSpace = "nowrap";
  b.style.fontSize = "";
  var base = parseFloat(getComputedStyle(b).fontSize);
  var tamanho = base;
  while (b.scrollWidth > util && tamanho > base * 0.6) {
    tamanho *= 0.96;
    b.style.fontSize = tamanho + "px";
  }
  if (b.scrollWidth > util) {
    b.style.whiteSpace = "normal";
    limitarLinhas(b, 2, minimo);
  }
}

// A frase do balão: só a primeira frase, e no máximo ~70 letras (corta numa palavra e põe reticências)
function fraseCurta(frase) {
  var t = frase.trim();
  var primeira = t.match(/^.+?[.!?…](?=\s|$)/);
  if (primeira && primeira[0].length >= 12) t = primeira[0];
  if (t.length > 70) t = t.slice(0, 70).replace(/\s+\S*$/, "") + "…";
  return /[.!?…]$/.test(t) ? t : t + ".";
}

// Diminui a fonte até o texto ocupar no máximo esse número de linhas
function limitarLinhas(el, linhas, minimo) {
  if (!el) return;
  el.style.fontSize = "";
  var estilo = getComputedStyle(el);
  var tamanho = parseFloat(estilo.fontSize);
  var lh = estilo.lineHeight;
  var altura = /px$/.test(lh) ? parseFloat(lh) / tamanho : parseFloat(lh) || 1.2;
  // Elementos inline (span) são medidos pelo pai; padding e borda não contam como texto
  var caixa = estilo.display === "inline" ? el.parentNode : el;
  var cs = getComputedStyle(caixa);
  var extra = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
  while (caixa.offsetHeight - extra > tamanho * altura * linhas + 4 && tamanho > (minimo || 8)) {
    tamanho *= 0.94;
    el.style.fontSize = tamanho + "px";
  }
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
      return m.charAt(0) === m.charAt(0).toUpperCase() ? "Offline" : "offline";
    });
  }
  el.classList.add("xs-off");
}
