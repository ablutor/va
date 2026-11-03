// 06 · Grafite: muro de tijolos com tags e respingos, latinha de spray de boné, pombos e aviõezinhos passando
(function () {
  var T = "#0d0d0f";
  var ROSA = "#ff2e88";
  var AMARELO = "#ffe600";
  var CIANO = "#00e5ff";

  // Respingo de tinta: um borrão com gotinhas em volta e, às vezes, um escorrido
  function respingo(x, y, r, cor, escorre) {
    var s = `<g fill="${cor}"><circle cx="${x}" cy="${y}" r="${r}"/>`;
    for (var i = 0; i < 9; i++) {
      var a = i * 0.7 + r;
      var d = r * (1.15 + (i % 3) * .35);
      s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${(r * (.12 + (i % 4) * .06)).toFixed(1)}"/>`;
    }
    if (escorre) s += `<rect x="${x - r * .18}" y="${y}" width="${r * .3}" height="${r * 2.6}" rx="${r * .15}"/><circle cx="${x - r * .03}" cy="${y + r * 2.6}" r="${r * .22}"/>`;
    return s + "</g>";
  }

  // Texto pichado com contorno e tinta escorrendo embaixo
  function tag(texto, x, y, tam, giro, cor, escorridos) {
    var s = `<g transform="translate(${x} ${y}) rotate(${giro})">`;
    (escorridos || []).forEach(function (e) {
      s += `<rect x="${e[0]}" y="-${tam * .18}" width="${tam * .06}" height="${e[1]}" rx="${tam * .03}" fill="${cor}"/><circle cx="${e[0] + tam * .03}" cy="${e[1] - tam * .18}" r="${tam * .045}" fill="${cor}"/>`;
    });
    return s + `<text text-anchor="middle" font-family="Sedgwick Ave Display" font-size="${tam}" fill="${cor}" stroke="${T}" stroke-width="${tam * .06}" paint-order="stroke" stroke-linejoin="round">${texto}</text></g>`;
  }

  // A latinha de spray (desenhada em 400×400)
  var LATA = `
    <g class="nevoa">
      <circle cx="292" cy="112" r="26" fill="${CIANO}" opacity=".85"/>
      <circle cx="330" cy="92" r="34" fill="${AMARELO}" opacity=".8"/>
      <circle cx="338" cy="138" r="24" fill="${ROSA}" opacity=".8"/>
      <circle cx="372" cy="112" r="22" fill="${CIANO}" opacity=".7"/>
      <g fill="${T}" opacity=".7"><circle cx="300" cy="74" r="3"/><circle cx="384" cy="78" r="4"/><circle cx="396" cy="140" r="3"/><circle cx="362" cy="164" r="4"/><circle cx="318" cy="166" r="2.5"/></g>
    </g>
    <g class="respira">
      <!-- tênis -->
      <path d="M170 350 V372 M230 350 V372" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <path d="M134 386 C134 366 150 362 172 364 C186 366 196 376 196 386 Z" fill="#fff" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M266 386 C266 366 250 362 228 364 C214 366 204 376 204 386 Z" fill="#fff" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M134 386 H196 M204 386 H266" stroke="${ROSA}" stroke-width="7" stroke-linecap="round"/>
      <path d="M160 370 l8 -4 M174 372 l8 -4 M240 370 l-8 -4 M226 372 l-8 -4" stroke="${T}" stroke-width="3" stroke-linecap="round"/>
      <!-- braço esquerdo, acenando -->
      <g class="balanca">
        <path d="M134 240 C106 228 92 206 90 184" fill="none" stroke="${T}" stroke-width="14" stroke-linecap="round"/>
        <circle cx="90" cy="176" r="17" fill="#fff" stroke="${T}" stroke-width="5"/>
      </g>
      <!-- ombro de metal, bico e corpo -->
      <path d="M128 168 C128 118 272 118 272 168 Z" fill="#cfd0d6" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <rect x="226" y="108" width="28" height="30" rx="6" fill="#fff" stroke="${T}" stroke-width="5"/>
      <circle cx="254" cy="120" r="3" fill="${T}"/>
      <rect x="128" y="152" width="144" height="208" rx="24" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
      <path d="M131 156 H269 V184 Q269 190 263 190 V212 Q257 222 251 212 V192 Q244 184 238 192 V232 Q231 242 224 232 V192 Q214 184 206 192 V200 Q200 208 194 200 V192 Q182 184 172 194 V220 Q165 228 158 220 V192 Q148 184 138 192 Q131 192 131 186 Z" fill="${CIANO}"/>
      <rect x="128" y="300" width="144" height="34" fill="${T}"/>
      <g fill="${AMARELO}" font-family="Permanent Marker" font-size="22"><text x="200" y="326" text-anchor="middle">★ SPRAY ★</text></g>
      <rect x="126" y="334" width="148" height="28" rx="12" fill="#cfd0d6" stroke="${T}" stroke-width="5"/>
      <rect x="140" y="202" width="11" height="90" rx="5.5" fill="#fff" opacity=".4"/>
      <!-- rosto -->
      <ellipse cx="160" cy="270" rx="13" ry="8" fill="#ffb3d1" opacity=".9"/>
      <ellipse cx="240" cy="270" rx="13" ry="8" fill="#ffb3d1" opacity=".9"/>
      <g class="pisca">
        <ellipse cx="174" cy="250" rx="13" ry="16" fill="${T}"/><circle cx="169" cy="244" r="5" fill="#fff"/>
        <ellipse cx="226" cy="250" rx="13" ry="16" fill="${T}"/><circle cx="221" cy="244" r="5" fill="#fff"/>
      </g>
      <path d="M184 272 Q200 292 216 272 Z" fill="#5a0f2c" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M192 276 H208" stroke="#fff" stroke-width="4"/>
      <!-- boné virado para trás -->
      <path d="M124 150 C118 92 214 82 224 140 Z" fill="${AMARELO}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M130 144 L78 156 C68 158 70 172 80 170 L134 160 Z" fill="${AMARELO}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M170 98 C178 112 180 128 178 142" fill="none" stroke="${T}" stroke-width="3.5"/>
      <circle cx="172" cy="96" r="6" fill="${ROSA}" stroke="${T}" stroke-width="3.5"/>
      <!-- braço direito apertando o bico -->
      <path d="M270 236 C298 214 290 150 258 104" fill="none" stroke="${T}" stroke-width="14" stroke-linecap="round"/>
      <circle cx="254" cy="100" r="17" fill="#fff" stroke="${T}" stroke-width="5"/>
    </g>`;

  // Pombo de bandana, piscando (o bichinho pequeno do canto)
  var POMBO = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <path d="M82 176 V190 M74 192 H92 M118 176 V190 M110 192 H128" stroke="#f08a5d" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="100" cy="134" rx="58" ry="48" fill="#a2a3ae" stroke="${T}" stroke-width="5"/>
      <path d="M46 120 C30 138 40 170 70 166 C60 150 58 132 46 120 Z" fill="#83848f" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M154 120 C170 138 160 170 130 166 C140 150 142 132 154 120 Z" fill="#83848f" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M58 140 l12 6 M60 152 l12 4 M142 140 l-12 6 M140 152 l-12 4" stroke="${T}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="100" cy="66" r="44" fill="#b0b1bc" stroke="${T}" stroke-width="5"/>
      <path d="M62 86 C80 104 120 104 138 86 C136 100 128 108 120 112 H80 C72 108 64 100 62 86 Z" fill="#5fd3a8" opacity=".85"/>
      <path d="M64 100 L100 132 L136 100 Z" fill="${ROSA}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <g fill="#fff"><circle cx="88" cy="108" r="3"/><circle cx="112" cy="108" r="3"/><circle cx="100" cy="120" r="3"/></g>
      <ellipse cx="72" cy="74" rx="9" ry="6" fill="#ffb3d1"/><ellipse cx="128" cy="74" rx="9" ry="6" fill="#ffb3d1"/>
      <circle cx="80" cy="60" r="10" fill="#ff8a3d" stroke="${T}" stroke-width="4"/><circle cx="80" cy="60" r="5" fill="${T}"/><circle cx="78" cy="58" r="2" fill="#fff"/>
      <path d="M112 60 q9 -9 18 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 70 L108 70 L100 84 Z" fill="#4a4a52" stroke="${T}" stroke-width="3.5" stroke-linejoin="round"/>
      <ellipse cx="100" cy="70" rx="7" ry="3" fill="#f2f2f2"/>
    </g></svg>`;

  var POMBO_VOANDO = `<svg viewBox="0 0 120 70">
    <path class="asa" d="M58 34 C50 10 30 4 18 6 C34 16 40 26 46 36 Z" fill="#7d7e88" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 38 C30 30 70 28 88 36 C96 40 96 46 88 48 C70 52 34 50 20 38 Z" fill="#a2a3ae" stroke="${T}" stroke-width="3"/>
    <path d="M86 40 L104 30 L108 50 Z" fill="#83848f" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="26" cy="36" r="11" fill="#b0b1bc" stroke="${T}" stroke-width="3"/>
    <path d="M16 36 L8 38 L16 40 Z" fill="#4a4a52"/>
    <circle cx="23" cy="33" r="2.4" fill="${T}"/>
    <path class="asa" d="M60 34 C64 12 80 6 92 8 C80 18 74 28 70 38 Z" fill="#83848f" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
  </svg>`;
  var AVIAOZINHO = `<svg viewBox="0 0 100 60"><path d="M4 30 L96 6 L60 54 L48 36 Z" fill="#fff" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><path d="M48 36 L96 6 L40 42 Z" fill="#dcdce2" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><path d="M4 30 L48 36" stroke="${T}" stroke-width="2"/></svg>`;
  function nuvemSpray(cor) {
    return `<svg viewBox="0 0 200 120"><g fill="${cor}" filter="url(#borra)" opacity=".55"><circle cx="60" cy="64" r="38"/><circle cx="110" cy="50" r="44"/><circle cx="150" cy="70" r="32"/></g></svg>`;
  }

  // O muro (padrão de tijolos), sujeira nas bordas e as pichações nas laterais
  var muro = `<svg class="muro" width="100%" height="100%">
    <defs>
      <pattern id="tijolo" width="128" height="64" patternUnits="userSpaceOnUse">
        <rect width="128" height="64" fill="#3c3b40"/>
        <rect x="3" y="3" width="122" height="26" rx="2" fill="#5e5c62"/>
        <rect x="-61" y="35" width="122" height="26" rx="2" fill="#56545a"/>
        <rect x="67" y="35" width="122" height="26" rx="2" fill="#625f66"/>
      </pattern>
      <radialGradient id="sujeira" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
      <filter id="borra"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#tijolo)"/>
    <rect width="100%" height="100%" fill="url(#sujeira)"/>
  </svg>`;
  var pichacoes = `<svg class="muro" viewBox="0 0 1920 900" preserveAspectRatio="xMidYMid slice">
    ${respingo(150, 160, 34, CIANO, true)}${respingo(1780, 120, 26, ROSA, true)}${respingo(90, 640, 22, AMARELO)}
    ${respingo(1840, 720, 30, CIANO, true)}${respingo(1700, 470, 14, AMARELO)}${respingo(260, 470, 12, ROSA)}
    ${tag("ZN", 150, 380, 190, -10, ROSA, [[-40, 70], [10, 110], [52, 60]])}
    ${tag("rafa", 150, 800, 120, -6, AMARELO, [[-30, 60], [40, 90]])}
    ${tag("vai!", 1790, 600, 120, 8, CIANO, [[-20, 80], [30, 50]])}
    <g transform="translate(1770 300) rotate(10)" fill="none" stroke="${AMARELO}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M-60 30 L-50 -30 L-20 0 L0 -40 L20 0 L50 -30 L60 30 Z"/><circle cx="-50" cy="-42" r="7"/><circle cx="0" cy="-54" r="7"/><circle cx="50" cy="-42" r="7"/>
    </g>
    <path d="M40 520 C120 500 180 540 250 500 l-20 -24 m20 24 l-28 14" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>
    <g fill="none" stroke="#fff" stroke-width="5" opacity=".7"><path d="M1660 820 l20 -40 l20 40 l20 -40 l20 40"/><circle cx="1880" cy="420" r="18"/></g>
  </svg>`;

  // Partículas do carinho: respingos de tinta
  function gota(cor) {
    return `<svg viewBox="0 0 40 40"><path d="M20 4 C24 12 34 10 32 18 C40 22 34 30 28 30 C28 38 18 38 16 32 C8 36 2 28 8 22 C2 16 10 8 16 12 C16 6 18 4 20 4 Z" fill="${cor}" stroke="${T}" stroke-width="2.5"/></svg>`;
  }

  tema({
    nome: "Rafael",
    frase: "a rua é minha galeria",
    foto: "../clientes/exemplo/em-pe-masculino.jpg",
    gostos: ["grafite", "skate", "rap", "tênis"],
    sobre: "Cresci vendo os muros da cidade virarem arte. Hoje carrego um caderno de rascunhos no bolso e uma lata na mochila. Respeita o rolê e chega junto.",
    fontes: "family=Sedgwick+Ave+Display&family=Permanent+Marker&family=Black+Ops+One&family=Rubik:wght@400;700;900",
    cores: {
      "fundo-1": "#3c3b40", "fundo-2": "#2a292e", tinta: T, texto: "#f4f4f0", papel: "#1e1e24", "papel-2": "#2b2b33",
      destaque: ROSA, botao: AMARELO, "botao-texto": T, sombra: CIANO, borda: "4px", raio: "6px",
      "fonte-titulo": '"Permanent Marker", cursive', "fonte-texto": '"Rubik", sans-serif'
    },
    css: `
      .muro { position: absolute; inset: 0; width: 100%; height: 100%; }
      .nevoa { transform-box: fill-box; transform-origin: 0 60%; animation: nevoa 1.4s ease-in-out infinite; }
      @keyframes nevoa { 0% { transform: scale(.75); opacity: .5; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(.75); opacity: .5; } }
      .asa { transform-box: fill-box; transform-origin: 50% 100%; animation: asa .35s ease-in-out infinite alternate; }
      @keyframes asa { to { transform: scaleY(-.6); } }
      .passa.spray > svg { animation-duration: 7s; }

      .janela-corpo { background: rgba(22,22,26,.9); backdrop-filter: none; box-shadow: 10px 10px 0 ${CIANO}; }
      .abas { bottom: calc(100% + 8px); gap: 12px; }
      .aba { margin: 0; border-bottom: 4px solid ${T}; border-radius: 3px; background: ${AMARELO}; color: ${T};
        font-size: 19px; letter-spacing: .04em; box-shadow: 4px 4px 0 ${T}; transform: rotate(-2deg); }
      .aba:nth-child(2n) { transform: rotate(2deg); }
      .aba:hover { padding-bottom: 8px; transform: rotate(0) scale(1.06); }
      .aba.ativa { background: ${ROSA}; color: #fff; padding-bottom: 8px; }
      .fala { background: #fff; color: ${T}; font-family: "Permanent Marker"; font-size: 21px; border-radius: 6px; box-shadow: 5px 5px 0 ${ROSA}; }
      .chao { background: #000; opacity: .45; }

      .relogio { background: ${AMARELO}; color: ${T}; box-shadow: 8px 8px 0 ${ROSA}; transform: rotate(2deg); border-radius: 4px; }
      .hora { font-family: "Black Ops One", sans-serif; font-size: 66px; }
      .ss { font-size: 26px; opacity: 1; color: ${ROSA}; -webkit-text-stroke: 1px ${T}; }
      .data { font-family: "Permanent Marker"; font-weight: 400; font-size: 16px; text-transform: lowercase; }
      .cracha { transform: rotate(-1.5deg); box-shadow: 8px 8px 0 ${CIANO}; border-radius: 4px; }
      .cracha-foto { border-radius: 8px; box-shadow: 0 0 0 5px ${ROSA}; transform: rotate(-3deg); }
      .logo { font-family: "Sedgwick Ave Display"; font-size: 64px; color: ${ROSA}; transform: rotate(-6deg);
        text-shadow: 3px 3px 0 ${T}, -2px -2px 0 ${T}, 2px -2px 0 ${T}, -2px 2px 0 ${T}, 5px 6px 0 ${AMARELO}; margin: 8px 0 6px; }
      .cracha-frase { font-family: "Permanent Marker"; font-size: 17px; }
      .status { background: ${T}; color: #fff; border-color: ${CIANO}; }
      .perfil-nome, .painel-sobre h2 { font-family: "Sedgwick Ave Display"; color: ${AMARELO}; font-size: 72px; text-shadow: 4px 4px 0 ${ROSA}; }
      .perfil-foto { border-radius: 4px; box-shadow: 10px 10px 0 ${ROSA}; transform: rotate(-2deg); }
      .perfil-gostos li { background: transparent; color: #fff; border: 3px solid ${CIANO}; font-family: "Permanent Marker"; font-weight: 400; }
      .video { border-color: #fff; }

      /* Entrada: um adesivo "olá, eu sou" colado torto no muro, com a ponta descolando */
      .cartao { padding: 0 0 22px; background: #fff; border-radius: 20px; overflow: hidden; position: relative;
        transform: scale(var(--escala)) rotate(-4deg); box-shadow: 10px 12px 0 rgba(0,0,0,.5); }
      .cartao::after { content: ""; position: absolute; right: 0; bottom: 0; width: 46px; height: 46px;
        background: linear-gradient(-45deg, #3c3b40 50%, #d6d6dc 50%); border-top-left-radius: 8px; }
      .arte { border: 0; border-radius: 0; aspect-ratio: 300 / 316; background: #fff; }
      .cartao-nome { margin: 2px 0 12px; font-family: "Permanent Marker"; font-size: 50px; color: ${T}; transform: rotate(-3deg); }
      .entrar { width: calc(100% - 64px); margin-right: 20px; font-family: "Permanent Marker"; font-size: 22px; letter-spacing: .08em;
        border-radius: 4px; box-shadow: 0 5px 0 ${T}; }
    `,
    decor: muro + pichacoes,
    passando: [
      { html: nuvemSpray(ROSA), qtd: 2, dur: 50, topo: [5, 70], tam: [220, 320], classe: "spray" },
      { html: nuvemSpray(CIANO), qtd: 2, dur: 60, topo: [20, 85], tam: [200, 300], classe: "spray" },
      { html: POMBO_VOANDO, qtd: 3, dur: 24, topo: [4, 40], tam: [90, 130] },
      { html: AVIAOZINHO, qtd: 2, dur: 32, topo: [30, 85], tam: [60, 90] }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 316">
        <rect width="300" height="112" fill="${ROSA}"/>
        <text x="150" y="70" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="64" fill="#fff" letter-spacing="2">OLÁ</text>
        <text x="150" y="98" text-anchor="middle" font-family="Rubik" font-weight="700" font-size="21" fill="#fff" letter-spacing="3">EU SOU</text>
        ${respingo(60, 210, 16, CIANO)}${respingo(250, 160, 10, AMARELO)}
        <g transform="translate(46 116) scale(.5)">${LATA}</g>
      </svg>`,
      titulo: "Rafael",
      botao: "chega mais"
    },
    // Dentro da janela: um grafite grande com o nome, calçada, cone e caixa de som
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <defs><linearGradient id="peca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${CIANO}"/><stop offset=".55" stop-color="#8b5cff"/><stop offset="1" stop-color="${ROSA}"/></linearGradient></defs>
      ${respingo(120, 120, 20, AMARELO, true)}${respingo(770, 90, 16, CIANO, true)}${respingo(700, 400, 10, ROSA)}
      <g transform="translate(440 236) rotate(-5)">
        <g fill="${ROSA}"><rect x="-196" y="-30" width="9" height="84" rx="4.5"/><circle cx="-191.5" cy="56" r="8"/><rect x="-40" y="-30" width="9" height="60" rx="4.5"/><circle cx="-35.5" cy="32" r="8"/><rect x="176" y="-30" width="9" height="100" rx="4.5"/><circle cx="180.5" cy="72" r="8"/></g>
        <text text-anchor="middle" font-family="Sedgwick Ave Display" font-size="220" fill="${T}" transform="translate(12 12)">Rafa</text>
        <text text-anchor="middle" font-family="Sedgwick Ave Display" font-size="220" fill="url(#peca)" stroke="#fff" stroke-width="7" paint-order="stroke">Rafa</text>
      </g>
      <g fill="${AMARELO}"><path d="M70 300 l8 18 20 2 -15 13 5 20 -18 -11 -18 11 5 -20 -15 -13 20 -2 Z"/><path d="M812 250 l6 13 14 1 -11 9 4 14 -13 -8 -13 8 4 -14 -11 -9 14 -1 Z"/></g>
      <rect x="0" y="520" width="880" height="100" fill="#4a4950"/>
      <rect x="0" y="512" width="880" height="16" fill="#77767e" stroke="${T}" stroke-width="4"/>
      <path d="M200 528 l20 40 -10 30 M640 528 l-14 36 18 40" fill="none" stroke="${T}" stroke-width="3" opacity=".6"/>
      <g transform="translate(110 512)">
        <rect x="-70" y="-84" width="140" height="84" rx="10" fill="#26262c" stroke="${T}" stroke-width="5"/>
        <path d="M-40 -84 V-104 H40 V-84" fill="none" stroke="${T}" stroke-width="7"/>
        <circle cx="-38" cy="-38" r="24" fill="#3a3a42" stroke="${CIANO}" stroke-width="5"/><circle cx="-38" cy="-38" r="9" fill="${CIANO}"/>
        <circle cx="38" cy="-38" r="24" fill="#3a3a42" stroke="${CIANO}" stroke-width="5"/><circle cx="38" cy="-38" r="9" fill="${CIANO}"/>
        <rect x="-18" y="-76" width="36" height="12" rx="3" fill="${AMARELO}"/>
        <g class="som" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M80 -70 q12 14 0 28"/><path d="M92 -80 q20 24 0 48"/></g>
      </g>
      <g transform="translate(780 512)">
        <path d="M-18 -110 L18 -110 L44 -6 H-44 Z" fill="#ff7a1a" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-26 -60 H26 L32 -38 H-32 Z" fill="#fff"/>
        <rect x="-56" y="-10" width="112" height="14" rx="4" fill="#ff7a1a" stroke="${T}" stroke-width="5"/>
      </g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${LATA}</svg>`,
    mini: POMBO,
    fala: "e aí, firmeza?<br>clica em mim!",
    particulas: [gota(ROSA), gota(AMARELO), gota(CIANO)]
  });
})();
