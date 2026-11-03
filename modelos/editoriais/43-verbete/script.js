// Modelo 43 · Verbete
Xatspace.aoCarregar(function (d) {
  var fem = d.genero === "f";

  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  function minusculo(x) { return x.toLowerCase(); }

  // "praia, leitura e música"
  var gostos = d.gostos.map(minusculo).slice(0, 5);
  var lista = gostos.length > 1 ? gostos.slice(0, -1).join(", ") + " e " + gostos[gostos.length - 1] : gostos.join("");

  // ---------- Palavra de entrada ----------

  // Divide em sílabas, de um jeito simples: cada grupo de vogais é um núcleo e as
  // consoantes do meio vão para a sílaba seguinte (dígrafos e "br, tr, pl..." ficam juntos)
  var VOGAL = "aeiouáéíóúâêôãõàü";
  var JUNTAS = /^(?:[bcdfgpt][lr]|ch|lh|nh|qu|gu)$/;
  function silabas(palavra) {
    var p = palavra.toLowerCase();
    var vogal = function (c) { return VOGAL.indexOf(c) >= 0; };
    var nucleos = [];
    for (var i = 0; i < p.length; i++) {
      if (!vogal(p[i])) continue;
      var ini = i;
      // Hiato: a/e/o seguida de a/e/o não forma ditongo
      while (i + 1 < p.length && vogal(p[i + 1]) && !/[aeoáéóâêô][aeoáéóâêô]/.test(p[i] + p[i + 1])) i++;
      nucleos.push([ini, i]);
    }
    if (nucleos.length < 2) return p;
    var cortes = [];
    for (var n = 0; n < nucleos.length - 1; n++) {
      var de = nucleos[n][1] + 1, ate = nucleos[n + 1][0];
      var cons = p.slice(de, ate);
      var corte;
      if (cons.length <= 1) corte = de;
      else if (JUNTAS.test(cons.slice(-2))) corte = ate - 2;
      else corte = ate - 1;
      cortes.push(corte);
    }
    var partes = [], a = 0;
    cortes.forEach(function (c) { partes.push(p.slice(a, c)); a = c; });
    partes.push(p.slice(a));
    return partes.join("·");
  }

  var nomes = (d.nome || "").split(/\s+/).filter(Boolean);
  var silabado = nomes.map(silabas).join(" ");

  // Palavras-guia do alto da página: a anterior e a seguinte, em ordem alfabética
  var sem = (d.nome || "").normalize("NFD").replace(/[^A-Za-z]/g, "").toUpperCase().padEnd(3, "A");
  var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function vizinha(c, passo) { return A[(A.indexOf(c) + passo + 26) % 26]; }
  var tres = sem.slice(0, 3);
  var antes = tres.slice(0, 2) + vizinha(tres[2], -1);
  var depois = tres.slice(0, 2) + vizinha(tres[2], 1);

  // Número da página, o mesmo sempre para a mesma pessoa
  var soma = 0;
  for (var i = 0; i < sem.length; i++) soma += sem.charCodeAt(i) * (i + 3);
  var pagina = 100 + (soma % 800);

  function texto(nome, valor) {
    todos('[data-texto="' + nome + '"]', function (el) { el.textContent = valor; });
  }
  texto("inicial", (d.nome || "").charAt(0).toUpperCase());
  texto("silabas", silabado);
  texto("guia-esq", antes + " · " + tres);
  texto("guia-dir", tres + " · " + depois);
  texto("pagina", "página " + pagina);
  texto("pagina-curta", "pág. " + pagina);

  // ---------- Definições ----------

  function el(tag, classe, filhos) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    (filhos || []).forEach(function (f) {
      e.appendChild(typeof f === "string" ? document.createTextNode(f) : f);
    });
    return e;
  }

  function negrito(t) { return el("b", "", [t]); }

  // "Quem gosta de praia, de leitura e de música"
  function gostaDe() {
    var partes = [];
    gostos.forEach(function (g, k) {
      if (k > 0) partes.push(k === gostos.length - 1 ? " e " : ", ");
      partes.push(k === 0 ? "" : "de ");
      partes.push(negrito(g));
    });
    return partes;
  }

  var classe = fem ? "s.f." : "s.m.";
  var morador = fem ? "Moradora " : "Morador ";
  var ele = fem ? "ela" : "ele";
  var linhas = [];

  function definicao(n, cl, filhos, exemplo) {
    linhas.push(el("div", "def", [
      el("span", "n", [n + "."]),
      el("span", "", [el("span", "cl", [cl + " "])].concat(filhos))
    ]));
    if (exemplo) linhas.push(el("div", "ex", [exemplo]));
  }

  var n = 1;
  var propria = fem ? "a própria" : "o próprio";
  definicao(n++, classe,
    ["Pessoa de boa companhia; costuma aparecer no xat e ficar mais tempo do que dizia."],
    d.frase ? "“" + d.frase + "” — " + propria + "." : "");

  if (d.local) {
    definicao(n++, classe,
      [morador, negrito(d.localDe), ", lugar que " + ele + " cita com carinho."]);
  }

  if (gostos.length) {
    var tarde = gostos.length > 1 ? "entre " + gostos[0] + " e " + gostos[1] : "com " + gostos[0];
    definicao(n++, "fig.",
      ["Quem gosta ", ""].slice(0, 1).concat(["de "], gostaDe().slice(1), [", de preferência tudo no mesmo dia."]),
      d.nome + " passou a tarde " + tarde + ".");
  }

  todos('[data-texto="defs"]', function (caixa) {
    caixa.textContent = "";
    linhas.forEach(function (l) { caixa.appendChild(l.cloneNode(true)); });
  });

  // ---------- Verbetes de apoio ----------

  function linhaOpcional(nome, valor) {
    todos('[data-texto="' + nome + '"]', function (linha) {
      linha.querySelector(":scope > span").textContent = valor;
      linha.hidden = !valor;
    });
  }
  linhaOpcional("sinonimos", gostos.length ? gostos.join(", ") + "." : "");
  var tit = d.titulo + (d.local ? ", " + d.local : "");
  linhaOpcional("vertambem", tit ? tit + "." : "");
  linhaOpcional("citacao", d.citacao.texto ? "“" + d.citacao.texto + "”" + (d.citacao.autor ? " — " + d.citacao.autor : "") : "");

  // Nomes longos diminuem para caber
  function ajustar() {
    Xatspace.caber(document.querySelector(".desk .hw"), 880);
    Xatspace.caber(document.querySelector(".mob .hw"), 300);
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
