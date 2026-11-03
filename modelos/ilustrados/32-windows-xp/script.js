// Modelo 32 · Windows XP

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Nome do arquivo da foto: "rafael.jpg"
  arquivo: function (d) { return semAcento(d.nome || "foto").toLowerCase().replace(/\s+/g, "_") + ".jpg"; },
  tituloVisor: function (d) { return TEXTOS.arquivo(d) + " - Visualizador de imagens e fax do Windows"; },
  tituloVisorCurto: function (d) { return TEXTOS.arquivo(d) + " - Visualizador de imagens"; },
  arquivoTexto: "sobre_mim.txt",
  tituloBloco: function () { return TEXTOS.arquivoTexto + " - Bloco de notas"; },
  tituloPlayer: "Windows Media Player",
  tituloMsn: "MSN Messenger",
  entrou: "acabou de entrar.",
  iniciar: "iniciar",
  menu: ["Arquivo", "Editar", "Formatar", "Exibir", "Ajuda"],

  // Ícones da área de trabalho, de cima para baixo. "icone" é o id do desenho no index.html (#i-...).
  icones: [
    { icone: "pc", nome: "Meu computador" },
    { icone: "pasta", nome: "Minhas fotos" },
    { icone: "musica", nome: "Minhas músicas" },
    { icone: "msn", nome: "MSN Messenger" },
    { icone: "ie", nome: "Internet Explorer" },
    { icone: "lixeira", nome: "Lixeira" }
  ],

  // Linhas do Bloco de notas. Linha sem valor some sozinha.
  bloco: function (d) {
    return [
      ["nome", d.nomeCompleto],
      ["cidade", d.local],
      ["gosta de", d.gostos.map(minusculo).join(", ")],
      ["insta", d.instagram && "@" + d.instagram]
    ];
  },
  // No celular cabem menos gostos e a frase curta
  blocoCurto: function (d) {
    return [
      ["nome", d.nomeCompleto],
      ["cidade", d.local],
      ["gosta de", d.gostos.slice(0, 3).map(minusculo).join(", ")],
      ["insta", d.instagram && "@" + d.instagram]
    ];
  },
  frase: function (d) { return d.frase; },
  fraseCurta: function (d) { return d.destaque; }
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  document.querySelectorAll("[data-menu]").forEach(function (el) {
    el.innerHTML = TEXTOS.menu.map(function (m) { return "<span>" + m + "</span>"; }).join("");
  });

  document.querySelectorAll("[data-icones]").forEach(function (el) {
    el.innerHTML = TEXTOS.icones.map(function (i) {
      return '<span class="icone"><svg><use href="#i-' + i.icone + '"/></svg><span></span></span>';
    }).join("");
    el.querySelectorAll(".icone > span").forEach(function (s, n) { s.textContent = TEXTOS.icones[n].nome; });
  });

  // Botões da barra de tarefas: um por janela aberta (no celular, só o primeiro)
  var tarefas = [["foto", TEXTOS.arquivo(d)], ["bloco", TEXTOS.arquivoTexto], ["wmp", TEXTOS.tituloPlayer]];
  document.querySelectorAll("[data-tarefas]").forEach(function (el) {
    var lista = tarefas.slice(0, Number(el.dataset.tarefas) || tarefas.length);
    el.innerHTML = lista.map(function (t, n) {
      return '<span class="tarefa' + (n === 0 ? " ativa" : "") + '"><svg><use href="#i-' + t[0] + '"/></svg><span></span></span>';
    }).join("");
    el.querySelectorAll(".tarefa > span").forEach(function (s, n) { s.textContent = lista[n][1]; });
  });

  // Bloco de notas: "rótulo: valor", uma linha em branco e a frase entre aspas
  document.querySelectorAll("[data-bloco]").forEach(function (el) {
    var curto = el.dataset.bloco === "curto";
    var linhas = valor(curto ? "blocoCurto" : "bloco")
      .filter(function (l) { return l[1]; })
      .map(function (l) { return l[0] + ": " + l[1]; });
    var frase = valor(curto ? "fraseCurta" : "frase");
    if (frase) linhas.push("", '"' + frase + '"');
    el.textContent = linhas.join("\n");
    var cursor = document.createElement("i");
    cursor.className = "cursor";
    el.appendChild(cursor);
  });

  relogio();
  setInterval(relogio, 15000);
  statusNoXat(d);
});

function minusculo(x) { return x.toLowerCase(); }

function semAcento(x) { return x.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

// Hora de verdade na bandeja, como no Windows
function relogio() {
  var agora = new Date();
  var hora = String(agora.getHours()).padStart(2, "0") + ":" + String(agora.getMinutes()).padStart(2, "0");
  document.querySelectorAll("[data-relogio]").forEach(function (el) { el.textContent = hora; });
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
        if (!ligado) {
          el.textContent = "● offline no xat";
          el.classList.add("xs-off");
        }
        el.hidden = false;
      });
    })
    .catch(function () {});
}
