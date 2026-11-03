// Modelo 44 · Zine
Xatspace.aoCarregar(function (d) {
  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  function criar(tag, texto, classe) {
    var el = document.createElement(tag);
    if (texto) el.textContent = texto;
    if (classe) el.className = classe;
    return el;
  }

  var nome = d.nome || "";
  var gostos = d.gostos.slice(0, 6).map(function (x) { return x.toLowerCase(); });

  // ---------- Nome grande, em duas linhas: "MARI" e "NA" ----------

  // Quebra depois de uma vogal perto de 60% do nome (ma·ri·na, ra·fa·el, bru·no)
  function partirNome(n) {
    if (n.length <= 3) return [n, ""];
    var alvo = Math.round(n.length * 0.6);
    var corte = alvo;
    [0, -1, 1].some(function (delta) {
      var i = alvo + delta;
      if (i >= 2 && i <= n.length - 2 && /[aeiouáàâãéêíóôõú]/i.test(n.charAt(i - 1))) {
        corte = i;
        return true;
      }
    });
    return [n.slice(0, corte), n.slice(corte)];
  }

  var partes = partirNome(nome);
  todos('[data-texto="nome"]', function (el) {
    el.textContent = "";
    // Nome curto cabe numa linha só e cresce
    el.classList.toggle("so", !partes[1]);
    el.appendChild(document.createTextNode(partes[0]));
    if (partes[1]) el.appendChild(criar("span", partes[1]));
  });

  // ---------- Lugar, em letras de bilhete de resgate ----------

  todos('[data-texto="local"]', function (el) {
    el.textContent = "";
    d.local.toUpperCase().split("").forEach(function (c) {
      el.appendChild(c === " " ? criar("b", "", "vazio") : criar("b", c));
    });
  });

  // ---------- Frase, com duas palavras marcadas de amarelo ----------

  // Marca as duas palavras mais longas (a partir de 4 letras)
  function marcar(el, texto) {
    var pedacos = texto.split(/([A-Za-zÀ-ÿ]+)/);
    var palavras = [];
    pedacos.forEach(function (p, i) {
      if (i % 2 && p.length >= 4) palavras.push({ i: i, n: p.length });
    });
    var alvo = palavras
      .slice()
      .sort(function (a, b) { return b.n - a.n || a.i - b.i; })
      .slice(0, 2)
      .map(function (p) { return p.i; });
    el.textContent = "";
    el.appendChild(document.createTextNode("“"));
    pedacos.forEach(function (p, i) {
      if (alvo.indexOf(i) >= 0) el.appendChild(criar("mark", p));
      else if (p) el.appendChild(document.createTextNode(p));
    });
    el.appendChild(document.createTextNode("”"));
  }

  todos('[data-texto="frase"]', function (el) {
    if (d.frase) marcar(el, d.frase);
    else el.hidden = true;
  });

  // ---------- Bilhete: o que a pessoa gosta e onde achar ----------

  function lista(fim) {
    var el = criar("span");
    gostos.forEach(function (g, i) {
      if (i) el.appendChild(document.createTextNode(i === gostos.length - 1 ? " e " : ", "));
      el.appendChild(criar("u", g));
    });
    el.appendChild(document.createTextNode(fim));
    return el;
  }

  function sobre(el, rotuloInsta) {
    el.textContent = "";
    el.appendChild(document.createTextNode("tá no xat desde "));
    el.appendChild(criar("u", "sempre"));
    el.appendChild(document.createTextNode("."));
    if (gostos.length) {
      el.appendChild(document.createTextNode(" gosta de "));
      el.appendChild(lista("."));
    }
    if (d.instagram) {
      el.appendChild(document.createTextNode(" " + rotuloInsta + ": "));
      var a = criar("a", "@" + d.instagram);
      a.href = d.instagramUrl;
      a.target = "_blank";
      a.rel = "noopener";
      el.appendChild(a);
    }
  }

  todos('[data-texto="sobre"]', function (el) { sobre(el, "instagram"); });
  todos('[data-texto="sobre-curto"]', function (el) { sobre(el, "insta"); });

  todos('[data-texto="assina"]', function (el) {
    el.textContent = "xerox · por " + d.nomeCompleto;
  });

  // ---------- Faixa que corre embaixo ----------

  var itens = ["zine d" + d.o + " " + nome].concat(gostos, ["cola e tesoura"]);

  function faixa() {
    todos(".faixa .fx", function (fx) {
      var largura = fx.parentNode.offsetWidth;
      function sequencia() {
        itens.forEach(function (t) {
          fx.appendChild(criar("span", t));
          fx.appendChild(criar("em", "✶"));
        });
      }
      fx.textContent = "";
      sequencia();
      // Repete até a metade passar da largura da faixa, e duplica para o laço fechar sem emenda
      for (var n = 0; fx.offsetWidth < largura * 1.2 && n < 20; n++) sequencia();
      Array.prototype.slice.call(fx.children).forEach(function (c) {
        fx.appendChild(c.cloneNode(true));
      });
      fx.style.animationDuration = Math.max(10, fx.offsetWidth / 2 / 55) + "s";
    });
  }

  // ---------- Ajustes de tamanho ----------

  // Diminui a fonte até o elemento caber na altura
  function caberAltura(el, maximo, minimo) {
    if (!el) return;
    el.style.fontSize = "";
    var tamanho = parseFloat(getComputedStyle(el).fontSize);
    while (el.offsetHeight > maximo && tamanho > minimo) {
      tamanho *= 0.95;
      el.style.fontSize = tamanho + "px";
    }
  }

  // Nomes, lugares e textos longos diminuem para caber na colagem
  // (de novo quando as fontes terminam de carregar, porque a largura muda)
  function ajustar() {
    Xatspace.caber(document.querySelector(".desk .nome"), 740, 60);
    Xatspace.caber(document.querySelector(".mob .nome"), 364, 30);
    Xatspace.caber(document.querySelector(".desk .lt"), 440, 16);
    Xatspace.caber(document.querySelector(".mob .lt"), 222, 9);
    caberAltura(document.querySelector(".desk .frase"), 168, 22);
    caberAltura(document.querySelector(".mob .frase"), 82, 13);
    caberAltura(document.querySelector(".desk .sobre"), 118, 11);
    caberAltura(document.querySelector(".mob .sobre"), 60, 8);
    faixa();
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
      if (m.charAt(0) === m.charAt(0).toUpperCase()) return "Offline";
      return "offline";
    });
  }
  el.classList.add("xs-off");
}
