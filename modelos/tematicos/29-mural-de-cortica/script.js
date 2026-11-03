// Modelo 29 · Mural de cortiça

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Rótulo do ingresso, acima do nome da música
  ingresso: "Admit one · tocando",
  arroba: function (d) { return "@" + d.instagram; },

  // Legendas das polaroides, na ordem das fotos: perfil, destaque, verso e cenario.
  // Uma lista para cada gênero (genero: "f" nos dados usa a segunda).
  legendas: {
    m: ["modo sério: ON", "um degrau de cada vez", "branco básico, nada básico", "próxima trilha ▲"],
    f: ["bom dia, sol ☀", "espelho, espelho meu", "look aprovado ✓", "pé na estrada"]
  },

  // Linhas da ficha pautada. Linha sem valor some sozinha.
  ficha: function (d) {
    return [
      d.nomeCompleto,
      d.local,
      d.gostos.length && "gosta de: " + d.gostos.map(minusculo).join(" · "),
      d.instagram && "@" + d.instagram
    ];
  }
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  var legendas = TEXTOS.legendas[d.genero === "f" ? "f" : "m"];
  document.querySelectorAll("[data-legenda]").forEach(function (el) {
    el.textContent = legendas[Number(el.dataset.legenda)] || "";
    // Legenda comprida diminui para caber na polaroide
    Xatspace.caber(el, el.parentNode.clientWidth - 6, 9);
  });

  // Nome em letras recortadas: cada letra num pedaço de papel diferente (cores e fontes no CSS)
  document.querySelectorAll("[data-recorte]").forEach(function (el) {
    el.textContent = "";
    Array.from((d.nome || "").toUpperCase()).forEach(function (letra) {
      var s = document.createElement("span");
      s.textContent = letra;
      if (letra === " ") s.className = "espaco";
      el.appendChild(s);
    });
  });

  document.querySelectorAll("[data-ficha]").forEach(function (el) {
    el.textContent = "";
    valor("ficha").filter(Boolean).forEach(function (linha) {
      var p = document.createElement("p");
      p.textContent = linha;
      el.appendChild(p);
    });
  });
});

function minusculo(x) { return x.toLowerCase(); }
