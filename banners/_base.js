/* Base dos banners de 380×100: carrega os dados do cliente, resolve a cor e as fotos, e liga a simulação do xat.
   Uso no banner NN-modelo.html:
     <link rel="stylesheet" href="_base.css">   (e, para as cores pastel, <link rel="stylesheet" href="../core/cores.css">)
     <script src="_base.js"></script>
     <script>
       XB.pronto.then(function (d) {   // d = dados do cliente (nome, sobrenome, genero, local, gostos, fotos...)
         ... monte o banner usando XB.foto(d.fotos.cenario), XB.cor, XB.genero ...
         XB.pronto2();                 // chame no fim: liga a prévia/guia e avisa o gerador que a página está pronta
       });
     </script>
   Parâmetros do endereço: ?c=<cliente> (rafael, marina ou albert), &cor=<cor do modelo>, &forma=redonda (o avatar do xat é
   redondo: a classe "redonda" entra no html e em .moldura), &previa=1, &guia=1. */
(function () {
  var params = new URLSearchParams(location.search);
  var cliente = params.get("c") || "rafael";
  // Dados e fotos de cada cliente. rafael e marina são os perfis de exemplo; albert é o xatspace publicado do autor
  var BASES = {
    albert: { dados: "../../meus_exclusivos/publicado/xatspace-cartao-postal/dados.js", fotos: "../../meus_exclusivos/publicado/xatspace-cartao-postal/" }
  };
  var base = BASES[cliente] || { dados: "../clientes/" + cliente + ".js", fotos: "../clientes/" };

  var XB = window.XB = { cliente: cliente, d: null, cor: "original", genero: "m", redonda: params.get("forma") === "redonda" };
  if (XB.redonda) document.documentElement.classList.add("redonda");
  // Caminho de foto relativo ao cliente vira um caminho a partir desta pasta; links completos ficam como estão
  XB.foto = function (c) { return !c ? "" : /^(https?:|data:)/.test(c) ? c : base.fotos + c; };

  var pronto, fim;
  XB.pronto = new Promise(function (r) { pronto = r; });
  var concluido = new Promise(function (r) { fim = r; });
  window.pronto = concluido;   // o gerador espera por isto

  // O arquivo do cliente chama Xatspace.cliente({...}); aqui só guardamos os dados
  window.Xatspace = { cliente: function (d) {
    XB.d = d; XB.genero = d.genero || "m";
    var cor = params.get("cor");
    if (cor === null) cor = typeof d.cor === "string" ? d.cor : "";
    XB.cor = cor || "original";
    document.documentElement.setAttribute("data-cor", XB.cor);
    pronto(d);
  } };
  var s = document.createElement("script");
  s.src = base.dados;
  s.onerror = function () { console.error("cliente sem dados para o banner: " + cliente); };
  document.head.appendChild(s);

  // Chame no fim da montagem do banner: espera as fontes, liga a prévia e a guia e libera o gerador
  XB.pronto2 = function () {
    document.fonts.ready.then(function () {
      if (params.get("previa")) {
        var x = document.createElement("div"); x.id = "xat";
        x.innerHTML = '<div class="avatar"></div><div class="etiqueta nome"></div><div class="etiqueta status">Online Member</div>';
        document.body.appendChild(x);
        var f = XB.d.fotos && (XB.d.fotos.perfil || XB.d.fotos.destaque);
        x.querySelector(".avatar").style.backgroundImage = "url('" + XB.foto(f) + "')";
        x.querySelector(".nome").textContent = XB.d.nome;
        if (XB.redonda) x.querySelector(".avatar").style.borderRadius = "50%";
      }
      if (params.get("guia")) {
        var g = document.createElement("div"); g.id = "guia";
        g.innerHTML = '<i class="corte" style="left:0"></i><i class="corte" style="right:0"></i>' +
          '<i style="left:19px;top:10px;width:76px;height:76px' + (XB.redonda ? ';border-radius:50%' : '') + '"></i><i style="left:15px;top:6px;width:84px;height:84px' + (XB.redonda ? ';border-radius:50%' : '') + '"></i>' +
          '<i style="left:109px;top:20px;width:92px;height:44px"></i>';
        document.body.appendChild(g);
      }
      // Espera TODAS as imagens (<img> e fundos em CSS) carregarem antes de liberar a captura; sem isso, com vários banners
      // sendo gerados ao mesmo tempo, uma foto de fundo ou o avatar da prévia podia ficar de fora da imagem.
      var urls = [];
      document.querySelectorAll("*").forEach(function (el) {
        if (el.tagName === "IMG" && el.src) urls.push(el.src);
        ["", "::before", "::after"].forEach(function (pseudo) {
          var m = getComputedStyle(el, pseudo || null).backgroundImage.match(/url\((['"]?)(.*?)\1\)/g) || [];
          m.forEach(function (u) { var x = u.replace(/^url\((['"]?)/, "").replace(/(['"]?)\)$/, ""); if (!/^data:/.test(x)) urls.push(x); });
        });
      });
      var carregadas = urls.filter(function (u, i) { return urls.indexOf(u) === i; }).map(function (u) {
        return new Promise(function (ok) { var im = new Image(); im.onload = im.onerror = function () { ok(); }; im.src = u; });
      });
      Promise.all(carregadas).then(function () { setTimeout(fim, 350); });
    });
  };
})();
