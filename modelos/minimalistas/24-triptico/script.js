// Modelo 24 · Tríptico
//
// As três fotos vêm dos dados do cliente, da esquerda para a direita (no celular, de cima para baixo):
// fotos.verso, fotos.perfil e fotos.destaque. Faltando alguma, usa as da galeria.

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
var TEXTOS = {
  // Numeração dos três painéis, embaixo das fotos
  numeros: "I — II — III"
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  // Painel sem foto própria pega a próxima foto da galeria que ainda não está na tela
  var usadas = [];
  document.querySelectorAll(".painel img").forEach(function (img) {
    if (img.getAttribute("src")) usadas.push(img.getAttribute("src"));
  });
  var galeria = (d.fotos.galeria || []).map(Xatspace.arquivo).filter(function (f) {
    return usadas.indexOf(f) < 0;
  });
  ["p1", "p2", "p3"].forEach(function (painel, i) {
    var foto = galeria[i] || Xatspace.arquivo(d.fotos.perfil);
    document.querySelectorAll("." + painel + " img").forEach(function (img) {
      if (!img.getAttribute("src") && foto) img.src = foto;
    });
  });

  // Nome grande demais diminui até caber
  Xatspace.caber(document.querySelector(".desk .nm"), 560, 8);
  Xatspace.caber(document.querySelector(".mob .nm"), 230, 7);
});
