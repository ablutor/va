// Modelo 27 · Passaporte

// Tudo o que aparece escrito na tela e não vem direto dos dados do cliente fica aqui.
// Cada item recebe os dados do cliente (d), para montar o texto a partir deles.
var TEXTOS = {
  cabecalho: "República Federativa do Xat · Passaporte",
  cabecalhoCurto: "República do Xat · Passaporte",
  documento: "XS2026-01",
  numero: function () { return "Nº " + TEXTOS.documento; },
  numeroCurto: function () { return TEXTOS.documento; },

  // Rótulos dos campos (no celular, sem a tradução)
  rotuloTipo: "Tipo / Type",
  rotuloTipoCurto: "Tipo",
  rotuloPais: "País emissor",
  rotuloPaisCurto: "País",
  rotuloSobrenome: "Sobrenome / Surname",
  rotuloSobrenomeCurto: "Sobrenome",
  rotuloNome: "Nome / Given names",
  rotuloNomeCurto: "Nome",
  rotuloNacionalidade: "Nacionalidade",
  rotuloNascimento: "Nascimento",
  rotuloNaturalidade: "Naturalidade",
  rotuloValidade: "Validade",
  rotuloAssinatura: "Assinatura do titular",

  // Valores fixos dos campos. "nascimento" pode vir nos dados: nascimento: "10 SET 1995"
  tipo: "P",
  pais: "BRA",
  nacionalidade: function (d) { return d.genero === "f" ? "Brasileira" : "Brasileiro"; },
  nascimento: function (d) { return d.nascimento || "10 SET 1995"; },
  validade: "Para sempre",
  validadeCurta: "Sempre",

  // Página dos vistos
  tituloVistos: "Vistos / Visas",
  pagina: "07",
  carimboXat: "★ XAT ★",
  carimboEntrada: "Entrada",
  carimboOnline: "Online",
  // Aeroporto da cidade do cliente; cidade fora da lista mostra "Chegada"
  aeroportos: {
    "rio de janeiro": "Galeão",
    "sao paulo": "Guarulhos",
    "belo horizonte": "Confins",
    "recife": "Guararapes",
    "salvador": "Dois de Julho",
    "porto alegre": "Salgado Filho",
    "curitiba": "Afonso Pena",
    "fortaleza": "Pinto Martins",
    "brasilia": "JK"
  },
  aeroporto: function (d) { return TEXTOS.aeroportos[semAcento(d.local).toLowerCase()] || "Chegada"; },
  admitido: function (d) { return "Admitido · " + (TEXTOS.nascimento(d).match(/\d{4}/) || [""])[0]; },
  vistoPermanente: "Visto permanente",
  gosto1: function (d) { return d.gostos[0] || "Música"; },
  clube: "Clube de",
  gosto2: function (d) { return d.gostos[1] || "Viagem"; },
  diario: "Diário",
  citacao: function (d) { return "“" + d.destaque + "”"; },

  // Player
  trilha: "trilha da viagem",
  instagram: function (d) { return "@" + d.instagram; }
};

Xatspace.aoCarregar(function (d) {
  function valor(chave) {
    var v = TEXTOS[chave];
    return typeof v === "function" ? v(d) : v;
  }

  document.querySelectorAll("[data-texto]").forEach(function (el) {
    el.textContent = valor(el.dataset.texto);
  });

  // Data do carimbo de entrada: o dia de hoje, como 29.10.2026
  var hoje = new Date();
  document.querySelectorAll("[data-hoje]").forEach(function (el) {
    el.textContent = [hoje.getDate(), hoje.getMonth() + 1].map(function (n) { return String(n).padStart(2, "0"); }).join(".") + "." + hoje.getFullYear();
  });

  // Zona de leitura (MRZ): duas linhas montadas a partir do nome, do nascimento e dos gostos
  document.querySelectorAll("[data-mrz]").forEach(function (el) {
    el.textContent = mrz(d, Number(el.dataset.mrz)).join("\n");
  });

  // Nome longo diminui para caber na coluna
  document.querySelectorAll(".campos [data-xs='nome'], .campos [data-xs='sobrenome']").forEach(function (el) {
    Xatspace.caber(el, el.parentNode.clientWidth);
  });
});

// "P<BRASOBRENOME<<NOME<<<<" e "XS2026010BRA9509103M<GOSTO<GOSTO<<04", com o tamanho pedido
function mrz(d, tamanho) {
  var letras = function (x) { return semAcento(x || "").toUpperCase().replace(/[^A-Z0-9]+/g, "<"); };
  var linha1 = ("P<" + TEXTOS.pais + letras(d.sobrenome) + "<<" + letras(d.nome)).slice(0, tamanho);

  var nasc = TEXTOS.nascimento(d).toUpperCase().split(/\s+/);
  var meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  var data = (nasc[2] || "").slice(2) + String(meses.indexOf(nasc[1]) + 1).padStart(2, "0") + String(nasc[0] || "").padStart(2, "0");
  var linha2 = letras(TEXTOS.documento.replace(/-/g, "")) + "0" + TEXTOS.pais + data + "3" + (d.genero === "f" ? "F" : "M") + "<";
  // Gostos inteiros, enquanto couberem antes do "<<04" do fim
  d.gostos.map(letras).forEach(function (g) {
    if ((linha2 + g).length <= tamanho - 4) linha2 += g + "<";
  });

  return [completar(linha1, tamanho), completar(linha2.replace(/<$/, ""), tamanho - 2) + "04"];
}

function completar(linha, tamanho) {
  while (linha.length < tamanho) linha += "<";
  return linha;
}

function semAcento(x) { return x.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
