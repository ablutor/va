// Modelo 30 · Letreiro neon

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Selo de status no xat (só aparece quando o cliente tem o campo "xat")
  online: "● online no xat",
  offline: "● offline no xat",
  // Entre o nome da música e o do artista, no player do computador
  separador: " — ",
  // Frase entre aspas curvas
  frase: function (d) { return d.frase ? "“" + d.frase.trim() + "”" : ""; }
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  // Nome comprido diminui para caber no letreiro
  Xatspace.caber(document.querySelector(".desk .nome"), 860, 60);
  Xatspace.caber(document.querySelector(".mob .nome"), 350, 40);

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
        if (!ligado) {
          el.textContent = TEXTOS.offline;
          el.classList.add("xs-off");
        }
        el.hidden = false;
      });
    })
    .catch(function () {});
}
