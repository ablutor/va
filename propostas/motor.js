/*
  Propostas "Entrar": tela de entrada com um cartão e, depois do clique, o xatspace.
  index.html?t=01-cafe            abre na tela de entrada
  index.html?t=01-cafe&tela=principal  abre direto no xatspace (para as imagens)
  Cada tema fica em temas/<id>.js e chama tema({...}).
*/
(function () {
  var params = new URLSearchParams(location.search);
  var id = params.get("t") || "01-cafe";

  var DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto",
    "setembro", "outubro", "novembro", "dezembro"];

  function $(sel) { return document.querySelector(sel); }
  function dois(n) { return (n < 10 ? "0" : "") + n; }

  // ---------- Relógio ----------

  function relogio() {
    var d = new Date();
    $(".hh").textContent = dois(d.getHours());
    $(".mm").textContent = dois(d.getMinutes());
    $(".ss").textContent = dois(d.getSeconds());
    $(".data").textContent = DIAS[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear();
  }

  // ---------- O que passa pelo fundo ----------
  // Cada item: { html, qtd, dur, topo: [min, max] em %, tam: [min, max] em px, classe }

  function passando(itens) {
    var caixa = $(".passando");
    itens.forEach(function (item) {
      for (var i = 0; i < (item.qtd || 1); i++) {
        var el = document.createElement("div");
        el.className = "passa " + (item.classe || "");
        el.innerHTML = item.html;
        var topo = item.topo || [5, 80];
        var tam = item.tam || [80, 160];
        var dur = (item.dur || 40) * (0.8 + Math.random() * 0.4);
        el.style.top = topo[0] + Math.random() * (topo[1] - topo[0]) + "%";
        el.style.setProperty("--x", Math.random() * 96 + "%");
        el.style.width = tam[0] + Math.random() * (tam[1] - tam[0]) + "px";
        el.style.animationDuration = dur + "s";
        // Espalha os itens pelo caminho, para a tela já começar com eles no meio
        el.style.animationDelay = -(dur * (i + Math.random() * 0.6) / (item.qtd || 1)) + "s";
        caixa.appendChild(el);
      }
    });
  }

  // ---------- Carinho: clicar no bichinho ----------

  function carinho(alvo, simbolos) {
    alvo.addEventListener("click", function (e) {
      alvo.classList.remove("pulando");
      void alvo.offsetWidth;
      alvo.classList.add("pulando");
      var caixa = alvo.getBoundingClientRect();
      for (var i = 0; i < 7; i++) {
        var p = document.createElement("span");
        p.className = "particula";
        p.innerHTML = simbolos[i % simbolos.length];
        p.style.left = caixa.left + caixa.width * (0.25 + Math.random() * 0.5) + "px";
        p.style.top = caixa.top + caixa.height * (0.2 + Math.random() * 0.3) + "px";
        p.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
        p.style.animationDelay = i * 0.05 + "s";
        document.body.appendChild(p);
        setTimeout(p.remove.bind(p), 1600);
      }
    });
  }

  // ---------- Palco: 1280×720 no computador, 390×844 no celular, cabendo na tela ----------

  function escala() {
    var celular = innerWidth < innerHeight;
    document.body.classList.toggle("celular", celular);
    // No celular a cena da janela fica mais estreita: corta as laterais e mantém o chão
    document.querySelectorAll(".cena > svg").forEach(function (svg) {
      if (!svg.dataset.proporcao) svg.dataset.proporcao = svg.getAttribute("preserveAspectRatio") || "xMidYMid meet";
      svg.setAttribute("preserveAspectRatio", celular ? "xMidYMax slice" : svg.dataset.proporcao);
    });
    // Com uma folga em volta, para o fundo aparecer nas bordas
    var s = celular ? Math.min(innerWidth / 390, innerHeight / 844) : Math.min(innerWidth / 1340, innerHeight / 790);
    document.documentElement.style.setProperty("--escala", s);
  }

  // ---------- Montagem ----------

  window.tema = function (t) {
    var raiz = document.documentElement;
    document.body.classList.add("tema-" + id);
    document.title = t.nome;

    if (t.fontes) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?" + t.fontes + "&display=swap";
      document.head.appendChild(link);
    }
    Object.keys(t.cores).forEach(function (k) { raiz.style.setProperty("--" + k, t.cores[k]); });
    if (t.css) {
      var estilo = document.createElement("style");
      estilo.textContent = t.css;
      document.head.appendChild(estilo);
    }

    $(".decor").innerHTML = t.decor || "";
    passando(t.passando || []);

    // Entrada
    $(".arte").innerHTML = t.entrada.arte;
    $(".cartao-nome").textContent = t.entrada.titulo || t.nome;
    $(".entrar").innerHTML = t.entrada.botao || "entrar";

    // Principal
    var abas = t.abas || ["início", "perfil", "sobre", "vídeo"];
    var paineis = ["inicio", "perfil", "sobre", "video"];
    abas.forEach(function (nome, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = nome;
      b.className = "aba" + (i === 0 ? " ativa" : "");
      b.addEventListener("click", function () {
        document.querySelectorAll(".aba").forEach(function (a) { a.classList.toggle("ativa", a === b); });
        document.querySelectorAll(".painel").forEach(function (p) {
          p.classList.toggle("ativo", p.classList.contains("painel-" + paineis[i]));
        });
      });
      $(".abas").appendChild(b);
    });

    $(".cena").innerHTML = t.cena || "";
    $(".bicho").innerHTML = t.bicho;
    $(".mini").innerHTML = t.mini || t.bicho;
    $(".fala").innerHTML = t.fala || "clica em mim!";
    $(".logo").innerHTML = t.logo || t.nome;
    $(".cracha-frase").textContent = t.frase;
    $(".cracha-foto").src = t.foto;
    $(".perfil-foto").src = t.foto;
    $(".perfil-nome").textContent = t.nome;
    $(".perfil-frase").textContent = t.frase;
    (t.gostos || []).forEach(function (g) {
      var li = document.createElement("li");
      li.textContent = g;
      $(".perfil-gostos").appendChild(li);
    });
    $(".sobre-texto").textContent = t.sobre || t.frase;

    carinho($(".bicho"), t.particulas || ["♥"]);
    carinho($(".mini"), t.particulas || ["♥"]);

    $(".entrar").addEventListener("click", function () {
      document.body.classList.add("dentro");
    });
    if (params.get("tela") === "principal") document.body.classList.add("dentro", "sem-transicao");

    relogio();
    setInterval(relogio, 1000);
    escala();
    addEventListener("resize", escala);
  };

  var s = document.createElement("script");
  s.src = "temas/" + id + ".js";
  document.body.appendChild(s);
})();
