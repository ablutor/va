// 03 · Lagoa: sapinho com florzinha na cabeça numa vitória-régia, libélulas e folhinhas passando
(function () {
  var T = "#2c5a4b";

  // Florzinha de cinco pétalas, centrada em (0, 0)
  function flor(cor) {
    var p = "";
    for (var i = 0; i < 5; i++) p += `<ellipse cx="0" cy="-13" rx="9" ry="13" transform="rotate(${i * 72})"/>`;
    return `<g fill="${cor || "#ffb3c7"}" stroke="${T}" stroke-width="3.5">${p}</g>
      <circle r="8" fill="#ffd966" stroke="${T}" stroke-width="3.5"/>`;
  }

  // Vitória-régia com o corte, centrada em (0, 0), 350×80
  function folha(rx, ry, cor, corte) {
    corte = corte || 0;
    var a1 = (corte - 24) * Math.PI / 180, a2 = (corte + 34) * Math.PI / 180;
    return `<path d="M0 0 L${rx * Math.cos(a1)} ${ry * Math.sin(a1)} A${rx} ${ry} 0 1 0 ${rx * Math.cos(a2)} ${ry * Math.sin(a2)} Z"
      fill="${cor || "#6cc27a"}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M0 0 L${-rx * .8} ${-ry * .3} M0 0 L${-rx * .5} ${ry * .6} M0 0 L${rx * .3} ${ry * .75} M0 0 L${-rx * .1} ${-ry * .7} M0 0 L${rx * .55} ${-ry * .55}"
      stroke="#a6e0a0" stroke-width="3" stroke-linecap="round"/>`;
  }

  // O sapinho (desenhado em 400×400)
  var SAPO = `
    <g transform="translate(200 352)">${folha(178, 40, "", -76)}</g>
    <g class="respira">
      <ellipse cx="104" cy="316" rx="52" ry="34" fill="#86cf82" stroke="${T}" stroke-width="5"/>
      <ellipse cx="296" cy="316" rx="52" ry="34" fill="#86cf82" stroke="${T}" stroke-width="5"/>
      <ellipse cx="200" cy="290" rx="112" ry="70" fill="#8fd68a" stroke="${T}" stroke-width="5"/>
      <ellipse cx="200" cy="300" rx="70" ry="48" fill="#eaf8d8"/>
      <circle cx="138" cy="132" r="44" fill="#8fd68a" stroke="${T}" stroke-width="5"/>
      <circle cx="262" cy="132" r="44" fill="#8fd68a" stroke="${T}" stroke-width="5"/>
      <ellipse cx="200" cy="204" rx="134" ry="88" fill="#8fd68a" stroke="${T}" stroke-width="5"/>
      <circle cx="138" cy="132" r="41.5" fill="#8fd68a"/>
      <circle cx="262" cy="132" r="41.5" fill="#8fd68a"/>
      <g class="pisca">
        <circle cx="140" cy="136" r="24" fill="${T}"/><circle cx="132" cy="127" r="9" fill="#fff"/><circle cx="148" cy="146" r="4" fill="#fff"/>
        <circle cx="260" cy="136" r="24" fill="${T}"/><circle cx="252" cy="127" r="9" fill="#fff"/><circle cx="268" cy="146" r="4" fill="#fff"/>
      </g>
      <ellipse cx="112" cy="206" rx="22" ry="12" fill="#ff9fb9" opacity=".85"/>
      <ellipse cx="288" cy="206" rx="22" ry="12" fill="#ff9fb9" opacity=".85"/>
      <path d="M150 208 Q200 248 250 208" fill="#ff8fa8" stroke="${T}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M150 208 Q200 222 250 208" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="186" cy="176" r="3" fill="${T}"/><circle cx="214" cy="176" r="3" fill="${T}"/>
      <g fill="#86cf82" stroke="${T}" stroke-width="5">
        <ellipse cx="156" cy="346" rx="28" ry="14"/><ellipse cx="244" cy="346" rx="28" ry="14"/>
      </g>
      <path d="M142 346 v-6 M156 344 v-8 M170 346 v-6 M230 346 v-6 M244 344 v-8 M258 346 v-6" stroke="${T}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
      <g transform="translate(200 110)">
        <path d="M0 6 C10 -6 30 -8 38 0 C28 8 10 10 0 6 Z" fill="#6cc27a" stroke="${T}" stroke-width="3.5" stroke-linejoin="round"/>
        <g class="balanca">${flor()}</g>
      </g>
    </g>`;

  // O caracol, piscando (o bichinho do canto)
  var CARACOL = `<svg viewBox="0 0 220 200">
    <g class="respira">
      <ellipse cx="110" cy="184" rx="80" ry="9" fill="${T}" opacity=".15"/>
      <path d="M30 176 C20 176 18 160 30 156 L150 150 C150 120 156 92 162 70 C166 54 196 54 200 74 C204 96 190 120 186 176 Z" fill="#ffe3a8" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M170 64 L160 30 M190 62 L200 28" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="160" cy="28" r="7" fill="${T}"/><circle cx="200" cy="26" r="7" fill="${T}"/>
      <circle cx="98" cy="112" r="64" fill="#ffb3c7" stroke="${T}" stroke-width="5"/>
      <path d="M98 112 m0 0 c8 0 10 12 0 14 c-16 2 -20 -20 -4 -26 c22 -8 36 18 26 34 c-14 22 -50 18 -56 -8 c-8 -32 22 -54 50 -46" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="166" cy="104" rx="9" ry="5" fill="#ff8fa8" opacity=".6"/>
      <circle cx="176" cy="84" r="6" fill="${T}"/><circle cx="174" cy="82" r="2.2" fill="#fff"/>
      <path d="M186 84 q5 -6 10 0" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
      <path d="M178 100 q6 6 12 0" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
    </g></svg>`;

  var LIBELULA = `<svg viewBox="0 0 120 70">
    <g fill="#d8f4ff" fill-opacity=".85" stroke="${T}" stroke-width="2.5">
      <ellipse cx="44" cy="20" rx="30" ry="10" transform="rotate(-18 44 20)"/><ellipse cx="44" cy="44" rx="30" ry="10" transform="rotate(18 44 44)"/>
      <ellipse cx="70" cy="20" rx="26" ry="9" transform="rotate(18 70 20)"/><ellipse cx="70" cy="44" rx="26" ry="9" transform="rotate(-18 70 44)"/>
    </g>
    <path d="M14 32 H96" stroke="${T}" stroke-width="10" stroke-linecap="round"/>
    <path d="M14 32 H96" stroke="#4fb7c9" stroke-width="5" stroke-linecap="round"/>
    <circle cx="20" cy="32" r="9" fill="#4fb7c9" stroke="${T}" stroke-width="2.5"/>
    <circle cx="17" cy="29" r="2.5" fill="${T}"/></svg>`;
  var FOLHINHA = `<svg viewBox="0 0 50 40"><path d="M4 30 C10 6 36 2 46 6 C42 24 24 38 4 30 Z" fill="#9bd68c" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><path d="M4 30 C18 22 30 14 42 8" fill="none" stroke="${T}" stroke-width="2.5"/></svg>`;
  var NUVEM = `<svg viewBox="0 0 160 80"><path d="M28 70 C4 70 6 40 28 42 C26 18 60 10 72 30 C80 8 122 8 124 36 C150 32 156 70 132 70 Z" fill="#f6fffb" stroke="${T}" stroke-width="3" stroke-opacity=".2"/></svg>`;

  // Taboas (juncos) para os cantos de baixo da tela e para a cena
  function taboas(n, alt) {
    var s = "";
    for (var i = 0; i < n; i++) {
      var x = 20 + i * 26, h = alt - (i % 3) * 40;
      s += `<path d="M${x} ${alt + 20} C${x - 4} ${alt - h / 2} ${x + 6} ${alt - h + 60} ${x + (i % 2 ? 10 : -6)} ${alt - h + 20}" fill="none" stroke="#5fae6c" stroke-width="7" stroke-linecap="round"/>`;
      if (i % 2 === 0) s += `<rect x="${x - 11}" y="${alt - h + 30}" width="20" height="56" rx="10" fill="#a8744e" stroke="${T}" stroke-width="3.5" transform="rotate(${i % 4 ? 4 : -4} ${x} ${alt - h + 58})"/>`;
    }
    return s;
  }

  tema({
    nome: "Marina",
    frase: "de folha em folha, sem pressa",
    foto: "../clientes/exemplo/em-pe-feminina.jpg",
    gostos: ["natureza", "plantinhas", "chá gelado", "dia nublado"],
    sobre: "Meu lugar favorito é perto da água, ouvindo os sapinhos e o vento nas folhas. Cuido de umas vinte plantas em casa e dou nome pra todas.",
    fontes: "family=Grandstander:wght@700;800&family=Mali:wght@500;700",
    cores: {
      "fundo-1": "#e9f8f0", "fundo-2": "#bfe7d8", tinta: T, papel: "#f8fff9", "papel-2": "#dff4e6",
      destaque: "#ff9fb9", botao: "#a9e0b4", sombra: "#4f9c84",
      "fonte-titulo": '"Grandstander", sans-serif', "fonte-texto": '"Mali", sans-serif', raio: "34px"
    },
    css: `
      .ceu { background-image:
        radial-gradient(circle, transparent 20px, rgba(255,255,255,.55) 21px, transparent 24px, transparent 36px, rgba(255,255,255,.35) 37px, transparent 40px);
        background-size: 180px 150px; }
      .ceu .taboa { position: absolute; bottom: -20px; width: 240px; height: 360px; }
      .ceu .taboa.dir { right: -10px; transform: scaleX(-1); }
      .ceu .taboa.esq { left: -10px; }
      .hora, .logo, .cartao-nome, .perfil-nome, .painel-sobre h2 { font-weight: 800; }
      .aba { border-radius: 26px 6px 0 0; font-weight: 700; }
      .aba.ativa { background: var(--papel); }
      .janela-corpo { border-radius: 40px; }
      .relogio { border-radius: 80px; padding: 20px 12px 16px; background: #6cc27a; color: #fff; }
      .relogio .hora { text-shadow: 3px 3px 0 var(--tinta); }
      .relogio .data { color: var(--tinta); background: var(--papel); display: inline-block; padding: 3px 12px; border-radius: 99px; border: 2px solid var(--tinta); font-size: 14px; }
      .cracha { border-radius: 40px; }
      .cracha-foto { box-shadow: 0 0 0 5px var(--botao); }
      .cartao { border-radius: 110px 18px 110px 18px; padding: 34px 26px 28px; }
      .arte { border-radius: 90px 12px 90px 12px; }
      .entrar { border-radius: 99px; }
      .fala { border-radius: 26px 26px 26px 6px; }
      .chao { background: none; border: 4px solid #fff; opacity: .5; width: 380px; margin-left: -190px; height: 40px; bottom: 44px; }
      .passa.folhinha > svg { animation: gira 7s linear infinite; }
      .passa.libelula > svg { animation: zigue 1.6s ease-in-out infinite; }
      @keyframes zigue { 25% { transform: translateY(-14px) rotate(-6deg); } 75% { transform: translateY(10px) rotate(4deg); } }
      .agua { animation: agua 4s ease-in-out infinite; }
      @keyframes agua { 50% { transform: translateX(-14px); } }
    `,
    decor: `<svg class="taboa esq" viewBox="0 0 240 360">${taboas(8, 340)}</svg><svg class="taboa dir" viewBox="0 0 240 360">${taboas(7, 340)}</svg>`,
    passando: [
      { html: NUVEM, qtd: 4, dur: 62, topo: [4, 50], tam: [140, 220] },
      { html: LIBELULA, qtd: 3, dur: 22, topo: [10, 70], tam: [70, 100], classe: "libelula" },
      { html: FOLHINHA, qtd: 7, dur: 30, topo: [8, 90], tam: [26, 40], classe: "folhinha" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <rect width="300" height="324" fill="#dff4e6"/>
        <rect y="190" width="300" height="134" fill="#9bdcce"/>
        <path d="M0 190 Q38 182 75 190 T150 190 T225 190 T300 190" fill="none" stroke="${T}" stroke-width="3"/>
        <g fill="none" stroke="#fff" stroke-width="3" opacity=".7"><ellipse cx="60" cy="270" rx="34" ry="7"/><ellipse cx="250" cy="236" rx="26" ry="6"/></g>
        <g transform="translate(26 62) scale(.62)">${SAPO}</g>
        <text x="150" y="50" text-anchor="middle" font-family="Grandstander" font-weight="800" font-size="25" fill="${T}">croac! ♥</text>
      </svg>`,
      botao: "pular pra dentro"
    },
    // Dentro da janela: a margem com morrinho, a água, folhas boiando e taboas nos lados
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <path d="M0 420 C140 370 300 400 440 380 C600 358 740 390 880 360 V620 H0 Z" fill="#c7ebb6"/>
      <path d="M0 420 C140 370 300 400 440 380 C600 358 740 390 880 360" fill="none" stroke="${T}" stroke-width="4" opacity=".3"/>
      <path d="M0 450 Q55 440 110 450 T220 450 T330 450 T440 450 T550 450 T660 450 T770 450 T880 450 V620 H0 Z" fill="#9bdcce"/>
      <path d="M0 450 Q55 440 110 450 T220 450 T330 450 T440 450 T550 450 T660 450 T770 450 T880 450" fill="none" stroke="${T}" stroke-width="4"/>
      <g class="agua" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7">
        <path d="M60 500 h60 M90 580 h40 M700 590 h70 M560 520 h40 M300 600 h50"/>
      </g>
      <g transform="translate(120 548)">${folha(70, 18, "#7ccc84")}<g transform="translate(-10 -12) scale(1.1)">${flor("#fff")}</g></g>
      <g transform="translate(730 500)">${folha(60, 15)}</g>
      <g transform="translate(790 590)">${folha(46, 12, "#7ccc84")}</g>
      <g transform="translate(-10 160)">${taboas(4, 300)}</g>
      <g transform="translate(890 190) scale(-1 1)">${taboas(3, 280)}</g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${SAPO}</svg>`,
    mini: CARACOL,
    fala: "croac!<br>clica em mim ♥",
    particulas: ["♥", `<svg viewBox="-30 -30 60 60">${flor()}</svg>`, "♥"]
  });
})();
