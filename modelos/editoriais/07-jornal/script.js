// Modelo 07 · Jornal
Xatspace.aoCarregar(function (d) {
  var fem = d.genero === "f";
  var hoje = new Date();

  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  // "fotografia, treino e música"
  var g = d.gostos.map(function (x) { return x.toLowerCase(); });
  var gostos = g.length > 1 ? g.slice(0, -1).join(", ") + " e " + g[g.length - 1] : g.join("");

  // "do Rio de Janeiro", "do Recife", "de São Paulo"...
  function deLocal(local) {
    if (/^(Rio|Recife|Porto|Crato|Cabo|Gama|Guarujá)\b/i.test(local)) return "do " + local;
    if (/^(Bahia|Paraíba|Serra)\b/i.test(local)) return "da " + local;
    return "de " + local;
  }

  // Palavras que mudam com o gênero
  var entrevistado = fem ? "A entrevistada" : "O entrevistado";
  var morador = fem ? "moradora" : "morador";
  var encontrado = fem ? "Encontrada" : "Encontrado";

  // Data de hoje: "quarta-feira, 28 de outubro de 2026" e "28 out 2026"
  var longa = hoje.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  var mes = hoje.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  var curta = hoje.getDate() + " " + mes + " " + hoje.getFullYear();
  var diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
  var virgula = d.local ? ", " : "";
  todos('[data-data="longa"]', function (el) { el.textContent = virgula + longa; });
  todos('[data-data="curta"]', function (el) { el.textContent = virgula + curta; });

  // Texto da matéria, montado com os dados do cliente
  var quem = d.nomeCompleto + (d.local ? ", " + morador + " " + deLocal(d.local) + "," : ",");
  var semana = gostos ? " divide a semana entre " + gostos + "." : " topou falar com a reportagem.";
  var abertura = quem + semana + " " + encontrado +
    " no xat nesta " + diaSemana + ", recebeu a equipe com bom humor.";
  var poema = d.citacao.texto
    ? "Segundo fontes próximas, " + entrevistado.toLowerCase() + " carrega no bolso " +
      (d.citacao.autor ? "um poema de " + d.citacao.autor : "uma frase") + ": “" + d.citacao.texto + "”"
    : "";

  todos('[data-texto="abertura"]', function (el) { el.textContent = abertura; });
  todos('[data-texto="abertura-curta"]', function (el) { el.textContent = quem + semana; });
  todos('[data-texto="poema"]', function (el) {
    el.textContent = poema;
    el.hidden = !poema;
  });
  // Na linha fina a frase vem entre aspas, sem o ponto final
  todos('.deck [data-xs="frase"]', function (el) {
    el.textContent = (d.frase || "").replace(/[.\s]+$/, "");
  });
  todos('[data-texto="entrevistado"]', function (el) { el.textContent = entrevistado; });
  todos('[data-texto="gostos"]', function (el) {
    el.querySelector(":scope > span").textContent = gostos + ".";
    if (!gostos) el.querySelector("b").hidden = el.querySelector(":scope > span").hidden = true;
  });

  // Nomes e manchetes longas diminuem para caber na página
  // (de novo quando as fontes terminam de carregar, porque a largura muda)
  function ajustar() {
    Xatspace.caber(document.querySelector(".desk .mast > span"), 1380);
    Xatspace.caber(document.querySelector(".mob .mast > span"), 354);
    limitarLinhas(document.querySelector(".desk .head"), 2);
    limitarLinhas(document.querySelector(".mob .head"), 3);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  statusNoXat(d, function (ligado) {
    var comStatus = quem + semana + " " + encontrado + (ligado ? " online" : " offline") +
      " no xat nesta " + diaSemana + ", recebeu a equipe com bom humor.";
    todos('[data-texto="abertura"]', function (el) { el.textContent = comStatus; });
  });
});

// Diminui a fonte até o texto ocupar no máximo esse número de linhas
function limitarLinhas(el, linhas) {
  if (!el) return;
  el.style.fontSize = "";
  var tamanho = parseFloat(getComputedStyle(el).fontSize);
  var lh = getComputedStyle(el).lineHeight;
  var altura = /px$/.test(lh) ? parseFloat(lh) / tamanho : parseFloat(lh) || 1.1;
  while (el.offsetHeight > tamanho * altura * linhas + 2 && tamanho > 14) {
    tamanho *= 0.95;
    el.style.fontSize = tamanho + "px";
  }
}

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
