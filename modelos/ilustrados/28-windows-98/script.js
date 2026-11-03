// Modelo 28 · Windows 98

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  // Nome do arquivo da foto: "rafael.jpg"
  arquivo: function (d) { return semAcento(d.nome || "foto").toLowerCase().replace(/\s+/g, "_") + ".jpg"; },
  tituloVisor: function (d) { return TEXTOS.arquivo(d) + " - Visualizador de imagens"; },
  tituloVisorCurto: function (d) { return TEXTOS.arquivo(d) + " - Visualizador"; },
  tamanhoFoto: "720 × 882 pixels",
  pesoFoto: "256 KB",
  zoom: "Zoom 100%",
  arquivoTexto: "sobre_mim.txt",
  tituloBloco: function () { return TEXTOS.arquivoTexto + " - Bloco de notas"; },
  tituloPlayer: "Xatamp 2.95",
  nomePlayer: "Xatamp",
  faixaNumero: "1. ",
  tituloCopia: "Copiando fotos...",
  // Nome do arquivo sendo copiado: o da foto de destaque do cliente
  arquivoCopia: function (d) { return (d.fotos.destaque || "foto.jpg").split("/").pop(); },
  deOndeCopia: "De 'Galeria' para 'xatspace'",
  tempoRestante: "Tempo restante: 3 segundos",
  cancelar: "Cancelar",
  iniciar: "Iniciar",

  // Menus de cada janela. A primeira letra fica sublinhada, como no Windows.
  menus: {
    visor: ["Arquivo", "Editar", "Exibir", "Ajuda"],
    visorCurto: ["Arquivo", "Editar", "Exibir"],
    bloco: ["Arquivo", "Editar", "Formatar", "Ajuda"]
  },

  // Ícones da área de trabalho, de cima para baixo. "icone" é o id do desenho no index.html (#i-...).
  icones: function (d) {
    return [
      { icone: "pc", nome: "Meu computador" },
      { icone: "pasta", nome: "Fotos do " + d.nome },
      { icone: "musica", nome: "Músicas" },
      { icone: "treino", nome: "Treino.xls" },
      { icone: "xat", nome: "xat.com" },
      { icone: "lixeira", nome: "Lixeira" }
    ];
  },

  // Linhas do Bloco de notas, com pontinhos até o valor. Linha sem valor some sozinha.
  // O status só aparece quando o cliente tem o ID do xat nos dados.
  bloco: function (d) {
    return [
      ["NOME", d.nomeCompleto],
      ["CIDADE", d.local],
      ["GOSTA DE", d.gostos.join(", ")],
      ["INSTA", d.instagram && "@" + d.instagram],
      ["STATUS", d.statusXat && "● " + d.statusXat + " no xat"]
    ];
  },
  frase: function (d) { return d.frase; }
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
    el.innerHTML = TEXTOS.menus[el.dataset.menu].map(function (m) { return "<span>" + m + "</span>"; }).join("");
  });

  document.querySelectorAll("[data-icones]").forEach(function (el) {
    var icones = valor("icones");
    el.innerHTML = icones.map(function (i) {
      return '<span class="icone"><svg><use href="#i-' + i.icone + '"/></svg><span></span></span>';
    }).join("");
    el.querySelectorAll(".icone > span").forEach(function (s, n) { s.textContent = icones[n].nome; });
  });

  // Botões da barra de tarefas: um por janela aberta (no celular, só os primeiros)
  var tarefas = [["foto", TEXTOS.arquivo(d)], ["bloco", TEXTOS.arquivoTexto], ["fones", TEXTOS.nomePlayer]];
  document.querySelectorAll("[data-tarefas]").forEach(function (el) {
    var lista = tarefas.slice(0, Number(el.dataset.tarefas) || tarefas.length);
    el.innerHTML = lista.map(function (t, n) {
      return '<span class="tarefa bt98' + (n === 0 ? " ativa" : "") + '"><svg class="ico-' + t[0] + '"><use href="#i-' + t[0] + '"/></svg><span></span></span>';
    }).join("");
    el.querySelectorAll(".tarefa > span").forEach(function (s, n) { s.textContent = lista[n][1]; });
  });

  // Alturas das barras do equalizador, como no desenho
  var alturas = [55, 75, 35, 90, 60, 45, 25, 55, 40, 20, 30, 0];
  document.querySelectorAll(".eq i").forEach(function (el, n) { el.style.height = alturas[n % alturas.length] + "%"; });

  montarBloco(d);
  relogio();
  setInterval(relogio, 15000);
  statusNoXat(d);
});

// Bloco de notas: "RÓTULO....... valor", uma linha em branco e a frase entre aspas.
// data-bloco é a largura do rótulo com os pontinhos.
function montarBloco(d) {
  document.querySelectorAll("[data-bloco]").forEach(function (el) {
    var largura = Number(el.dataset.bloco);
    var linhas = TEXTOS.bloco(d)
      .filter(function (l) { return l[1]; })
      .map(function (l) { return (l[0] + "............").slice(0, Math.max(largura, l[0].length + 1)) + " " + l[1]; });
    var frase = TEXTOS.frase(d);
    if (frase) linhas.push("", '"' + frase + '"');
    // As linhas ficam numa coluna estreita, como no desenho; o papel branco continua largo
    el.innerHTML = '<span class="linhas"></span>';
    el.firstChild.textContent = linhas.join("\n");
    var cursor = document.createElement("i");
    cursor.className = "cursor";
    el.firstChild.appendChild(cursor);
  });
}

function semAcento(x) { return x.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

// Hora de verdade na bandeja, como no Windows
function relogio() {
  var agora = new Date();
  var hora = String(agora.getHours()).padStart(2, "0") + ":" + String(agora.getMinutes()).padStart(2, "0");
  document.querySelectorAll("[data-relogio]").forEach(function (el) { el.textContent = hora; });
}

// Consulta o status no xat pelo ID do cliente e escreve no Bloco de notas.
// Sem ID, ou se o usuário não existe, o status não aparece.
function statusNoXat(d) {
  if (!d.xat) return;
  fetch("https://api.xatools.net/v1/user/" + encodeURIComponent(d.xat) + "/online")
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (!res || res.code !== 200 || !res.data) return;
      d.statusXat = res.data.online ? "online" : "offline";
      montarBloco(d);
    })
    .catch(function () {});
}
