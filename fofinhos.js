/*
  Comportamento comum da família "Fofinhos":
  - rastros de pegadas que aparecem e somem no fundo
  - carinho: clicar no bichinho faz ele pular, soltar corações e contar (o contador fica no balão)
*/
(function () {
  var NS = "http://www.w3.org/2000/svg";

  // ---------- Pegadas ----------

  function novoRastro(caixa) {
    var largura = caixa.clientWidth;
    var altura = caixa.clientHeight;
    var passos = 9 + Math.floor(Math.random() * 6);
    var distancia = 46;
    var angulo = Math.random() * Math.PI * 2;
    var dx = Math.cos(angulo);
    var dy = Math.sin(angulo);

    // Começa num ponto que deixa o rastro inteiro dentro da tela
    var x = Math.random() * largura;
    var y = Math.random() * altura;
    x = Math.min(Math.max(x, 40), largura - 40) - dx * distancia * passos / 2;
    y = Math.min(Math.max(y, 40), altura - 40) - dy * distancia * passos / 2;

    var rastro = document.createElement("div");
    rastro.className = "rastro";
    var ciclo = passos * 0.4 + 4;
    rastro.style.setProperty("--ciclo", ciclo + "s");

    for (var i = 0; i < passos; i++) {
      // Pés alternados, um de cada lado da linha
      var lado = i % 2 ? 1 : -1;
      var px = x + dx * distancia * i - dy * 12 * lado;
      var py = y + dy * distancia * i + dx * 12 * lado;
      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      var use = document.createElementNS(NS, "use");
      use.setAttribute("href", "#pegada");
      svg.appendChild(use);
      svg.style.left = px + "px";
      svg.style.top = py + "px";
      svg.style.setProperty("--giro", (angulo * 180 / Math.PI + 90) + "deg");
      svg.style.animationDelay = i * 0.4 + "s";
      rastro.appendChild(svg);
    }

    caixa.appendChild(rastro);
    // Quando o rastro termina, outro aparece em outro lugar
    setTimeout(function () {
      rastro.remove();
      novoRastro(caixa);
    }, ciclo * 1000);
  }

  function iniciarPegadas() {
    var caixas = document.querySelectorAll("[data-pegadas]");
    Array.prototype.forEach.call(caixas, function (caixa) {
      var total = Number(caixa.dataset.pegadas) || 5;
      for (var i = 0; i < total; i++) {
        // Começam em tempos diferentes para não piscarem juntos
        setTimeout(novoRastro, i * 1300, caixa);
      }
    });
  }

  // ---------- Carinho ----------

  function iniciarCarinho(d) {
    var chave = "xs-carinhos-" + (d.id || "x");
    var total = 0;
    try { total = Number(localStorage.getItem(chave)) || 0; } catch (e) {}

    function mostrar() {
      document.querySelectorAll("[data-carinhos]").forEach(function (el) {
        el.textContent = total;
      });
    }

    document.querySelectorAll(".bicho").forEach(function (bicho) {
      var volta = null;
      bicho.addEventListener("click", function () {
        total += 1;
        try { localStorage.setItem(chave, total); } catch (e) {}
        mostrar();

        // Reinicia a animação do pulinho
        bicho.classList.remove("pulo");
        void bicho.offsetWidth;
        bicho.classList.add("pulo", "feliz");
        clearTimeout(volta);
        volta = setTimeout(function () { bicho.classList.remove("feliz"); }, 1400);

        for (var i = 0; i < 4; i++) {
          var c = document.createElement("span");
          c.className = "coracao";
          c.textContent = "♥";
          c.style.left = 30 + Math.random() * 40 + "%";
          c.style.top = 10 + Math.random() * 20 + "%";
          c.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
          c.style.animationDelay = i * 90 + "ms";
          bicho.appendChild(c);
          setTimeout(c.remove.bind(c), 1500 + i * 90);
        }
      });
    });
    mostrar();
  }

  // Copia o desenho do bichinho (template#bichinho) para cada lugar onde ele aparece
  function desenharBichinhos() {
    var modelo = document.getElementById("bichinho");
    if (!modelo) return;
    document.querySelectorAll(".bicho").forEach(function (bicho) {
      bicho.insertBefore(modelo.content.cloneNode(true), bicho.firstChild);
    });
  }

  function preencherGostos(d) {
    document.querySelectorAll("[data-gostos]").forEach(function (ul) {
      ul.innerHTML = "";
      d.gostos.forEach(function (g) {
        var li = document.createElement("li");
        li.textContent = g;
        ul.appendChild(li);
      });
    });
  }

  Xatspace.aoCarregar(function (d) {
    desenharBichinhos();
    preencherGostos(d);
    iniciarCarinho(d);
    iniciarPegadas();
  });
})();
