// Modelo 31 · Quadrinhos

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Caixa de narração do quadro da foto de perfil: "Capítulo 1 · Belo Horizonte"
  capitulo: function (d) { return "Capítulo 1" + (d.local ? " · " + d.local : ""); },

  // Capa do gibi
  chamada: "As incríveis aventuras de",
  numero: "Edição 01",
  preco: "R$ 0,50",
  // A data da edição é o mês e o ano de hoje
  meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  data: function () { var hoje = new Date(); return TEXTOS.meses[hoje.getMonth()] + " " + hoje.getFullYear(); },
  edicao: function () { return [TEXTOS.numero, TEXTOS.data(), TEXTOS.preco].join(" · "); },
  edicaoCurta: function () { return TEXTOS.numero + " · " + TEXTOS.data(); },

  // Balão da frase
  frase: function (d) { return d.frase || d.destaque || ""; },

  // Quadro do xat
  noXat: "Enquanto isso, no xat…",
  noXatCurto: "No xat…",
  online: "Tô online!",

  // Quadro da foto de destaque: muda com o gênero
  treino: function (d) { return d.genero === "f" ? "Look do dia." : "Hora do treino."; },
  sfxTreino: function (d) { return d.genero === "f" ? "WOW!" : "POW!"; },

  // Quadro da paisagem
  fotografia: "Fotografia: o superpoder secreto.",
  sfxFoto: "CLICK!",

  // Quadro da música
  som: "♪ Tum tum tss ♪",
  continua: "Continua…"
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  // Textos longos diminuem para caber
  function ajustar() {
    Xatspace.caber(document.querySelector(".desk .nome"), 760, 60);
    Xatspace.caber(document.querySelector(".mob .nome"), 340, 28);
    Xatspace.caber(document.querySelector(".desk .q-perfil .nar"), 480, 12);
    Xatspace.caber(document.querySelector(".mob .q-perfil .nar"), 340, 9);
    Xatspace.caber(document.querySelector(".desk .q-som .faixa b"), 230, 12);
    Xatspace.caber(document.querySelector(".mob .q-som .faixa b"), 190, 10);
    Xatspace.caber(document.querySelector(".desk .continua"), 400, 14);
    limitarLinhas(document.querySelector(".desk .bal-frase span"), 4, 13);
    limitarLinhas(document.querySelector(".mob .bal-frase span"), 4, 10);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  statusNoXat(d);
});

// Diminui a fonte até o texto ocupar no máximo esse número de linhas
function limitarLinhas(el, linhas, minimo) {
  if (!el) return;
  el.style.fontSize = "";
  var estilo = getComputedStyle(el);
  var tamanho = parseFloat(estilo.fontSize);
  var lh = parseFloat(estilo.lineHeight) || tamanho * 1.2;
  var proporcao = lh / tamanho;
  while (el.offsetHeight > tamanho * proporcao * linhas + 2 && tamanho > (minimo || 8)) {
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

// "Tô online!" vira "Tô offline!"
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
