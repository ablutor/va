// Modelo 42 · Hora
//
// A hora é a do aparelho de quem abre a página. Para mostrar o modelo parado numa hora bonita
// (portfólio), use ?hora=10:09 ou ?hora=10:09:25 no link.

Xatspace.aoCarregar(function (d) {
  var pedida = (new URLSearchParams(location.search).get("hora") || "").match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);

  function agora() {
    var t = new Date();
    if (pedida) t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), +pedida[1], +pedida[2], +(pedida[3] || 0));
    return t;
  }

  var minutoAnterior = -1;
  function marcar() {
    var t = agora();
    var todos = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };

    if (t.getMinutes() !== minutoAnterior) {
      minutoAnterior = t.getMinutes();
      todos("[data-hora]", function (el) { el.textContent = String(t.getHours()).padStart(2, "0"); });
      todos("[data-minuto]", function (el) { el.textContent = String(t.getMinutes()).padStart(2, "0"); });
      var data = t.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
      todos("[data-data]", function (el) { el.textContent = data; });
    }
  }

  marcar();
  // Com ?hora= o relógio fica parado
  if (!pedida) setInterval(marcar, 1000);

  // Nome grande demais diminui até caber
  Xatspace.caber(document.querySelector(".desk .nm"), 1100, 12);
  Xatspace.caber(document.querySelector(".mob .nm"), 350, 9);
  if (!d.sobrenome) {
    Array.prototype.forEach.call(document.querySelectorAll(".nome"), function (el) { el.textContent = d.nome || ""; });
  }
});

Xatspace.aoCarregar(function (d) {
  statusNoXat(d);
});

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
