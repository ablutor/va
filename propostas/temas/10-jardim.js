// 10 · Jardim: abelhinha voando perto do girassol, favos de mel no fundo, flores e borboletas passando
(function () {
  var T = "#4b3416";
  var MEL = "#ffcf3a";

  // A abelhinha (desenhada em 400×400)
  var ABELHA = `
    <defs><clipPath id="corpo10"><ellipse cx="200" cy="222" rx="128" ry="118"/></clipPath></defs>
    <g class="flutua">
      <g class="asa asa-esq"><ellipse cx="118" cy="104" rx="58" ry="80" transform="rotate(-32 118 104)" fill="#eaf7ff" fill-opacity=".92" stroke="${T}" stroke-width="5"/><path d="M104 64 C112 96 128 120 146 140" fill="none" stroke="#bfe4f7" stroke-width="5" stroke-linecap="round"/></g>
      <g class="asa asa-dir"><ellipse cx="282" cy="104" rx="58" ry="80" transform="rotate(32 282 104)" fill="#eaf7ff" fill-opacity=".92" stroke="${T}" stroke-width="5"/><path d="M296 64 C288 96 272 120 254 140" fill="none" stroke="#bfe4f7" stroke-width="5" stroke-linecap="round"/></g>
      <g class="respira">
        <path d="M190 336 L200 368 L210 336 Z" fill="${T}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <ellipse cx="166" cy="340" rx="14" ry="9" fill="${T}"/><ellipse cx="234" cy="340" rx="14" ry="9" fill="${T}"/>
        <path d="M170 112 C160 80 146 60 128 48 M230 112 C240 80 254 60 272 48" fill="none" stroke="${T}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="124" cy="44" r="15" fill="${MEL}" stroke="${T}" stroke-width="5"/><circle cx="276" cy="44" r="15" fill="${MEL}" stroke="${T}" stroke-width="5"/>
        <ellipse cx="200" cy="222" rx="128" ry="118" fill="${MEL}"/>
        <g clip-path="url(#corpo10)" fill="#6b4a1c">
          <path d="M60 262 C120 280 280 280 340 262 V296 C280 314 120 314 60 296 Z"/>
          <path d="M60 318 C120 336 280 336 340 318 V360 H60 Z"/>
          <ellipse cx="150" cy="140" rx="58" ry="34" fill="#fff3b8" opacity=".55"/>
        </g>
        <ellipse cx="200" cy="222" rx="128" ry="118" fill="none" stroke="${T}" stroke-width="5"/>
        <ellipse cx="70" cy="240" rx="18" ry="24" fill="${MEL}" stroke="${T}" stroke-width="5" transform="rotate(20 70 240)"/>
        <ellipse cx="330" cy="240" rx="18" ry="24" fill="${MEL}" stroke="${T}" stroke-width="5" transform="rotate(-20 330 240)"/>
        <ellipse cx="136" cy="222" rx="19" ry="11" fill="#ff8d8d" opacity=".6"/>
        <ellipse cx="264" cy="222" rx="19" ry="11" fill="#ff8d8d" opacity=".6"/>
        <g class="pisca">
          <ellipse cx="160" cy="190" rx="16" ry="20" fill="${T}"/><circle cx="154" cy="182" r="6.5" fill="#fff"/><circle cx="165" cy="198" r="3" fill="#fff"/>
          <ellipse cx="240" cy="190" rx="16" ry="20" fill="${T}"/><circle cx="234" cy="182" r="6.5" fill="#fff"/><circle cx="245" cy="198" r="3" fill="#fff"/>
        </g>
        <path d="M184 222 Q200 242 216 222" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      </g>
    </g>`;

  // Girassol: pétalas em volta do miolo de sementes
  function girassol(x, y, s, giro) {
    var petalas = "";
    for (var i = 0; i < 16; i++) petalas += `<ellipse cx="0" cy="-70" rx="17" ry="40" transform="rotate(${i * 22.5})" fill="${i % 2 ? "#ffc21f" : "#ffd84d"}" stroke="${T}" stroke-width="4"/>`;
    var sementes = "";
    for (var j = 0; j < 22; j++) {
      var r = 8 + (j % 4) * 9, a = j * 2.4;
      sementes += `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="3.4" fill="#4e2f12"/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${giro || 0})">${petalas}
      <circle r="48" fill="#8a5420" stroke="${T}" stroke-width="5"/>${sementes}</g>`;
  }

  function haste(x, y1, y2, curva) {
    return `<path d="M${x} ${y2} C${x + curva} ${(y1 + y2) / 2} ${x - curva} ${(y1 + y2) / 2} ${x} ${y1}" fill="none" stroke="${T}" stroke-width="16" stroke-linecap="round"/>
      <path d="M${x} ${y2} C${x + curva} ${(y1 + y2) / 2} ${x - curva} ${(y1 + y2) / 2} ${x} ${y1}" fill="none" stroke="#5aa64a" stroke-width="8" stroke-linecap="round"/>`;
  }

  function folha(x, y, giro, tam) {
    return `<path d="M0 0 C${tam * .3} ${-tam * .5} ${tam * .9} ${-tam * .5} ${tam} 0 C${tam * .9} ${tam * .4} ${tam * .3} ${tam * .4} 0 0 Z" transform="translate(${x} ${y}) rotate(${giro})" fill="#7cc35e" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>`;
  }

  // Florzinha de cinco pétalas
  function flor(x, y, s, cor) {
    var p = "";
    for (var i = 0; i < 5; i++) p += `<circle cx="0" cy="-15" r="11" transform="rotate(${i * 72})" fill="${cor}" stroke="${T}" stroke-width="3"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="9" fill="${MEL}" stroke="${T}" stroke-width="3"/></g>`;
  }

  function tulipa(x, y, s, cor) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 V60" stroke="${T}" stroke-width="9" stroke-linecap="round"/><path d="M0 0 V60" stroke="#5aa64a" stroke-width="4"/>
      <path d="M-20 -30 L-10 -14 L0 -32 L10 -14 L20 -30 C24 -6 14 6 0 6 C-14 6 -24 -6 -20 -30 Z" fill="${cor}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    </g>`;
  }

  // A florzinha piscando (o bichinho pequeno do canto)
  var FLORZINHA = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <ellipse cx="100" cy="190" rx="58" ry="9" fill="${T}" opacity=".15"/>
      <path d="M100 190 V110" stroke="${T}" stroke-width="12" stroke-linecap="round"/><path d="M100 190 V110" stroke="#5aa64a" stroke-width="6"/>
      ${folha(100, 160, -150, 52)}${folha(100, 150, -30, 52)}
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { return `<ellipse cx="0" cy="-48" rx="20" ry="30" transform="translate(100 82) rotate(${i * 45})" fill="#ffb3c6" stroke="${T}" stroke-width="4"/>`; }).join("")}
      <circle cx="100" cy="82" r="40" fill="${MEL}" stroke="${T}" stroke-width="5"/>
      <ellipse cx="78" cy="94" rx="9" ry="6" fill="#ff8d8d" opacity=".6"/>
      <ellipse cx="122" cy="94" rx="9" ry="6" fill="#ff8d8d" opacity=".6"/>
      <ellipse cx="86" cy="78" rx="6" ry="8" fill="${T}"/><circle cx="84" cy="75" r="2.5" fill="#fff"/>
      <path d="M106 79 q7 -8 14 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M93 96 q7 8 14 0" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
    </g></svg>`;

  function borboleta(cor) {
    return `<svg viewBox="0 0 80 70"><g class="bate">
      <path d="M40 34 C24 4 2 6 6 26 C8 38 24 40 40 36 Z" fill="${cor}" stroke="${T}" stroke-width="3"/>
      <path d="M40 34 C56 4 78 6 74 26 C72 38 56 40 40 36 Z" fill="${cor}" stroke="${T}" stroke-width="3"/>
      <path d="M40 38 C28 44 18 58 26 62 C34 66 40 52 40 40 Z M40 38 C52 44 62 58 54 62 C46 66 40 52 40 40 Z" fill="${cor}" stroke="${T}" stroke-width="3" opacity=".85"/>
      <circle cx="20" cy="22" r="5" fill="#fff" opacity=".7"/><circle cx="60" cy="22" r="5" fill="#fff" opacity=".7"/>
    </g><path d="M40 22 V54" stroke="${T}" stroke-width="5" stroke-linecap="round"/><path d="M40 22 C36 12 32 8 28 6 M40 22 C44 12 48 8 52 6" fill="none" stroke="${T}" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  }

  function florSolta(cor) { return `<svg viewBox="-34 -34 68 68">${flor(0, 0, 1.15, cor)}</svg>`; }

  var FAVO = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23f0b928' stroke-opacity='.45' stroke-width='3'/%3E%3C/svg%3E\")";

  // Canteiro do pé da janela: tulipas e florzinhas misturadas
  var canteiro = "";
  var cores = ["#ff8fab", "#ffffff", "#c9a2ff", "#ff8fab", "#ffb35c"];
  for (var c = 0; c < 15; c++) {
    var cx = 20 + c * 60 + (c % 2) * 14;
    canteiro += c % 3 === 1 ? flor(cx, 548 + (c % 2) * 10, 1.1, cores[c % 5]) : tulipa(cx, 540 + (c % 2) * 12, 1, cores[c % 5]);
  }

  tema({
    nome: "Marina",
    frase: "florescendo no meu tempo",
    foto: "../clientes/exemplo/em-pe-feminina-2.jpg",
    gostos: ["girassóis", "mel", "jardinagem", "dias de sol"],
    sobre: "Gosto de coisa simples: terra nas mãos, sol na janela e flor nascendo no vaso. Cada dia é um pouquinho de jardim.",
    fontes: "family=Sniglet:wght@400;800&family=Quicksand:wght@500;700",
    cores: {
      "fundo-1": "#fff8dc", "fundo-2": "#ffe594", tinta: T, papel: "#fffdf3", "papel-2": "#fff0bd",
      destaque: "#f5a623", botao: MEL, sombra: T, raio: "24px",
      "fonte-titulo": '"Sniglet", sans-serif', "fonte-texto": '"Quicksand", sans-serif'
    },
    css: `
      .ceu { background-image: ${FAVO}; background-size: 56px 100px; }
      .decor svg { position: absolute; left: 0; bottom: 0; width: 100%; height: 100%; }
      .hora, .logo, .cartao-nome, .perfil-nome, .painel-sobre h2, .fala, .aba, .entrar { font-weight: 800; }
      .asa { transform-box: fill-box; animation: asa .18s ease-in-out infinite alternate; }
      .asa-esq { transform-origin: 100% 100%; }
      .asa-dir { transform-origin: 0 100%; }
      @keyframes asa { to { transform: rotate(-14deg) scaleY(.9); } }
      .asa-dir { animation-name: asa-dir; }
      @keyframes asa-dir { to { transform: rotate(14deg) scaleY(.9); } }
      .bate { transform-box: fill-box; transform-origin: center; animation: bate .35s ease-in-out infinite alternate; }
      @keyframes bate { to { transform: scaleX(.55); } }
      .passa.florsolta > svg { animation: gira 12s linear infinite; }
      .balanca-flor { transform-box: fill-box; transform-origin: 50% 100%; animation: balanca 4s ease-in-out infinite; }
      .rastro { stroke-dasharray: 2 14; animation: rastro 1.2s linear infinite; }
      @keyframes rastro { to { stroke-dashoffset: -32; } }

      /* Entrada: cartão em arco, como a janelinha de um jardim */
      .cartao { border-radius: 160px 160px 26px 26px; padding-top: 26px; }
      .arte { border-radius: 130px 130px 14px 14px; }
      .entrar { border-radius: 99px; letter-spacing: .1em; }
      .cartao-nome { font-size: 36px; }

      .aba { border-radius: 20px 20px 0 0; background: #fff0bd; text-transform: lowercase; letter-spacing: .04em; font-size: 18px; }
      .aba.ativa { background: ${MEL}; }
      .janela-corpo { border-radius: 30px; }
      .fala { border-radius: 24px 24px 24px 6px; }
      .bicho { width: 340px; margin-left: -130px; bottom: 150px; }
      .fala { max-width: 280px; }
      .chao { width: 220px; margin-left: -110px; bottom: 30px; opacity: .1; }

      /* Relógio em cima de um favo */
      .relogio { background: #fff8dc ${FAVO}; background-size: 28px 50px; border-radius: 28px; }
      .relogio::before { content: "✿ hora do jardim ✿"; display: block; margin-bottom: 2px; font-family: Sniglet; font-size: 15px; color: #c98a10; }
      .hora { font-size: 62px; }
      .data { font-weight: 700; }

      /* Foto do crachá em hexágono */
      .cracha { border-radius: 28px; }
      .cracha-foto { width: 128px; height: 140px; border: 0; padding: 6px; border-radius: 0; background: ${MEL};
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); box-shadow: none; }
      .perfil-foto { box-shadow: 8px 8px 0 ${MEL}; border-radius: 120px 120px 20px 20px; }
      .perfil-gostos li { background: #fff0bd; }
    `,
    decor: `<svg viewBox="0 0 1920 900" preserveAspectRatio="xMidYMax slice">
      <path d="M0 820 Q240 790 480 812 T960 806 T1440 812 T1920 800 V900 H0 Z" fill="#8fcf6a" stroke="${T}" stroke-width="4"/>
      <g class="balanca-flor">${haste(110, 520, 900, 30)}${folha(112, 700, -150, 90)}${folha(112, 640, -30, 80)}${girassol(110, 500, 1.15, 0)}</g>
      <g class="balanca-flor" style="animation-delay:-1.5s">${haste(1810, 560, 900, -30)}${folha(1808, 720, -30, 90)}${folha(1808, 660, -150, 80)}${girassol(1810, 540, 1, 10)}</g>
      ${flor(260, 850, 1.3, "#ff8fab")}${flor(330, 868, 1.1, "#fff")}${flor(1620, 852, 1.3, "#c9a2ff")}${flor(1690, 870, 1.1, "#ff8fab")}
    </svg>`,
    passando: [
      { html: borboleta("#ffb3c6"), qtd: 3, dur: 26, topo: [8, 75], tam: [64, 90] },
      { html: borboleta("#bfe0ff"), qtd: 2, dur: 30, topo: [8, 75], tam: [56, 78] },
      { html: florSolta("#ff8fab"), qtd: 3, dur: 34, topo: [5, 85], tam: [26, 40], classe: "florsolta" },
      { html: florSolta("#ffffff"), qtd: 3, dur: 38, topo: [5, 85], tam: [24, 36], classe: "florsolta" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <defs><linearGradient id="ceu10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdeeff"/><stop offset="1" stop-color="#fff6d0"/></linearGradient></defs>
        <rect width="300" height="324" fill="url(#ceu10)"/>
        <circle cx="150" cy="60" r="26" fill="#fff3b0"/>
        <path d="M0 250 Q80 220 150 240 T300 232 V324 H0 Z" fill="#8fcf6a" stroke="${T}" stroke-width="3"/>
        ${haste(60, 150, 330, 14)}${folha(60, 250, -150, 50)}${girassol(60, 140, .62, 0)}
        ${tulipa(200, 280, .9, "#ff8fab")}${tulipa(250, 290, .8, "#c9a2ff")}${flor(140, 300, .9, "#fff")}${flor(280, 270, .8, "#ff8fab")}
        <path class="rastro" d="M100 150 C130 110 150 170 175 140" fill="none" stroke="${T}" stroke-width="3" stroke-linecap="round"/>
        <g transform="translate(150 78) scale(.38)">${ABELHA}</g>
      </svg>`,
      botao: "entrar"
    },
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%" preserveAspectRatio="xMidYMax slice">
      <path d="M0 470 Q220 420 440 452 T880 440 V620 H0 Z" fill="#a6dc7e"/>
      <path d="M0 520 Q220 490 440 510 T880 500 V620 H0 Z" fill="#8fcf6a" stroke="${T}" stroke-width="4"/>
      <g class="balanca-flor" style="animation-duration:5s">${haste(150, 250, 640, 40)}${folha(152, 420, -150, 110)}${folha(152, 360, -30, 96)}${girassol(150, 220, 1.35, -8)}</g>
      <path class="rastro" d="M250 230 C320 170 330 300 400 250 S470 200 430 300" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round" opacity=".6"/>
      ${canteiro}
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${ABELHA}</svg>`,
    mini: FLORZINHA,
    fala: "bzzz! quer mel?<br>clica em mim!",
    particulas: ["♥", "✿", "♥", "❀"]
  });
})();
