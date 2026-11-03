// 05 · Espaço: astronautinha flutuando, estrelas piscando, foguete, cometa e planetinhas passando
(function () {
  var T = "#120d33";
  var NEON = "#7af2ff";
  var ROSA = "#ff5fd2";

  // O astronauta (desenhado em 400×400)
  var ASTRONAUTA = `
    <g class="flutua">
      <g transform="rotate(-6 200 220)">
        <!-- mochila -->
        <rect x="112" y="236" width="176" height="116" rx="36" fill="#c9c3f2" stroke="${T}" stroke-width="5"/>
        <!-- pernas -->
        <rect x="150" y="320" width="42" height="58" rx="18" fill="#f4f2ff" stroke="${T}" stroke-width="5"/>
        <rect x="208" y="320" width="42" height="58" rx="18" fill="#f4f2ff" stroke="${T}" stroke-width="5"/>
        <path d="M150 360 H192 M208 360 H250" stroke="${T}" stroke-width="4"/>
        <rect x="146" y="362" width="50" height="22" rx="10" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
        <rect x="204" y="362" width="50" height="22" rx="10" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
        <!-- braço esquerdo, acenando -->
        <g class="balanca">
          <path d="M146 276 C118 266 104 238 100 214" fill="none" stroke="${T}" stroke-width="40" stroke-linecap="round"/>
          <path d="M146 276 C118 266 104 238 100 214" fill="none" stroke="#f4f2ff" stroke-width="30" stroke-linecap="round"/>
          <circle cx="98" cy="204" r="19" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
        </g>
        <!-- braço direito -->
        <path d="M254 280 C280 290 292 310 290 330" fill="none" stroke="${T}" stroke-width="40" stroke-linecap="round"/>
        <path d="M254 280 C280 290 292 310 290 330" fill="none" stroke="#f4f2ff" stroke-width="30" stroke-linecap="round"/>
        <circle cx="290" cy="338" r="19" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
        <!-- corpo -->
        <rect x="134" y="244" width="132" height="100" rx="40" fill="#f4f2ff" stroke="${T}" stroke-width="5"/>
        <rect x="168" y="270" width="64" height="42" rx="10" fill="#d9d5fb" stroke="${T}" stroke-width="4"/>
        <circle cx="184" cy="291" r="7" fill="${NEON}"/><circle cx="200" cy="291" r="7" fill="#ffe66d"/><circle cx="216" cy="291" r="7" fill="${ROSA}"/>
        <!-- antena -->
        <path d="M200 56 V24" stroke="${T}" stroke-width="5"/>
        <circle class="luz" cx="200" cy="20" r="11" fill="${ROSA}" stroke="${T}" stroke-width="4"/>
        <!-- capacete -->
        <rect x="72" y="128" width="30" height="64" rx="12" fill="${NEON}" stroke="${T}" stroke-width="5"/>
        <rect x="298" y="128" width="30" height="64" rx="12" fill="${NEON}" stroke="${T}" stroke-width="5"/>
        <circle cx="200" cy="158" r="106" fill="#f4f2ff" stroke="${T}" stroke-width="5"/>
        <ellipse cx="200" cy="166" rx="82" ry="72" fill="#2b2470" stroke="${T}" stroke-width="5"/>
        <!-- rostinho dentro do vidro -->
        <ellipse cx="200" cy="180" rx="62" ry="56" fill="#ffd9c4"/>
        <path d="M140 160 C150 116 250 116 260 160 C240 140 226 150 214 136 C200 152 170 138 140 160 Z" fill="#6b3f2a"/>
        <ellipse cx="160" cy="204" rx="13" ry="8" fill="#ff8d9e" opacity=".7"/>
        <ellipse cx="240" cy="204" rx="13" ry="8" fill="#ff8d9e" opacity=".7"/>
        <g class="pisca">
          <ellipse cx="176" cy="184" rx="11" ry="14" fill="${T}"/><circle cx="172" cy="178" r="4.5" fill="#fff"/>
          <ellipse cx="224" cy="184" rx="11" ry="14" fill="${T}"/><circle cx="220" cy="178" r="4.5" fill="#fff"/>
        </g>
        <path d="M190 206 Q200 220 210 206 Z" fill="#c2456e" stroke="${T}" stroke-width="3.5" stroke-linejoin="round"/>
        <!-- reflexo do vidro -->
        <path d="M142 120 C156 104 180 98 200 98" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55"/>
        <circle cx="132" cy="138" r="5" fill="#fff" opacity=".55"/>
      </g>
    </g>`;

  // Disco voador com alienzinho, piscando (o bichinho pequeno do canto)
  var DISCO = `<svg viewBox="0 0 200 200">
    <g class="flutua">
      <path class="raio" d="M64 134 L36 196 H164 L136 134 Z" fill="${NEON}" opacity=".22"/>
      <path d="M44 104 C44 40 156 40 156 104 Z" fill="#bff9ff" fill-opacity=".45" stroke="${T}" stroke-width="5"/>
      <path d="M78 54 L68 34 M122 54 L132 34" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="67" cy="31" r="8" fill="${ROSA}" stroke="${T}" stroke-width="4"/><circle cx="133" cy="31" r="8" fill="${ROSA}" stroke="${T}" stroke-width="4"/>
      <ellipse cx="100" cy="88" rx="40" ry="36" fill="#9ef08a" stroke="${T}" stroke-width="5"/>
      <ellipse cx="82" cy="94" rx="8" ry="5" fill="#ff8d9e" opacity=".7"/><ellipse cx="118" cy="94" rx="8" ry="5" fill="#ff8d9e" opacity=".7"/>
      <ellipse cx="86" cy="80" rx="8" ry="10" fill="${T}"/><circle cx="83" cy="76" r="3" fill="#fff"/>
      <path d="M106 80 q8 -8 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M92 98 q8 8 16 0" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="100" cy="116" rx="84" ry="26" fill="#c9c3f2" stroke="${T}" stroke-width="5"/>
      <ellipse cx="100" cy="106" rx="56" ry="10" fill="#f4f2ff"/>
      <g class="luzes" stroke="${T}" stroke-width="3">
        <circle cx="46" cy="120" r="7" fill="#ffe66d"/><circle cx="76" cy="130" r="7" fill="${NEON}"/>
        <circle cx="124" cy="130" r="7" fill="${ROSA}"/><circle cx="154" cy="120" r="7" fill="#ffe66d"/>
      </g>
    </g></svg>`;

  var FOGUETE = `<svg viewBox="0 0 200 90">
    <path d="M150 45 C170 35 190 45 196 45 C190 45 170 55 150 45 Z" fill="#ffb347"/>
    <path class="fogo" d="M140 45 C160 30 196 40 200 45 C196 50 160 60 140 45 Z" fill="#ffe66d"/>
    <path d="M44 45 C60 18 120 16 146 26 V64 C120 74 60 72 44 45 Z" fill="#f4f2ff" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M44 45 C50 34 58 26 70 22 C62 32 60 58 70 68 C58 64 50 56 44 45 Z" fill="${ROSA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M118 26 L150 4 L146 30 Z M118 64 L150 86 L146 60 Z" fill="${ROSA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="98" cy="45" r="13" fill="${NEON}" stroke="${T}" stroke-width="4"/>
    <rect x="144" y="30" width="10" height="30" rx="3" fill="#c9c3f2" stroke="${T}" stroke-width="4"/>
  </svg>`;
  var COMETA = `<svg viewBox="0 0 240 40"><defs><linearGradient id="rabo" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${NEON}" stop-opacity="0"/></linearGradient></defs>
    <path d="M20 20 L240 6 L240 34 Z" fill="url(#rabo)" opacity=".8"/><circle cx="20" cy="20" r="12" fill="#fff"/><circle cx="20" cy="20" r="20" fill="${NEON}" opacity=".25"/></svg>`;
  var PLANETA = `<svg viewBox="0 0 120 80">
    <ellipse cx="60" cy="40" rx="58" ry="14" fill="none" stroke="#ffe66d" stroke-width="5" opacity=".9"/>
    <circle cx="60" cy="40" r="28" fill="#b98cff" stroke="${T}" stroke-width="4"/>
    <path d="M38 30 C50 36 70 36 86 30 M36 46 C52 52 70 52 84 46" stroke="#9a6cf0" stroke-width="5" fill="none"/>
    <path d="M4 40 C20 54 100 54 116 40" fill="none" stroke="#ffe66d" stroke-width="5"/></svg>`;
  var PLANETA2 = `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="#ff9f6b" stroke="${T}" stroke-width="4"/><circle cx="30" cy="32" r="6" fill="#e9774a"/><circle cx="52" cy="48" r="8" fill="#e9774a"/><circle cx="34" cy="56" r="4" fill="#e9774a"/></svg>`;

  // Estrelas espalhadas pela tela, piscando
  var estrelas = "";
  for (var i = 0; i < 140; i++) {
    var r = Math.random() < .12 ? 2.4 : 1.2;
    estrelas += `<circle class="brilha" cx="${(Math.random() * 100).toFixed(2)}%" cy="${(Math.random() * 100).toFixed(2)}%" r="${r}" fill="#fff" style="animation-delay:-${(Math.random() * 3).toFixed(2)}s;animation-duration:${(2 + Math.random() * 3).toFixed(2)}s"/>`;
  }
  var brilhos = "";
  [[6, 14], [93, 22], [12, 78], [88, 70], [50, 6], [70, 92]].forEach(function (p, n) {
    brilhos += `<path class="brilha" style="animation-delay:-${n * .7}s" transform="translate(${p[0] * 19.2} ${p[1] * 9})" d="M0 -14 C2 -3 3 -2 14 0 C3 2 2 3 0 14 C-2 3 -3 2 -14 0 C-3 -2 -2 -3 0 -14 Z" fill="${['#ffe66d', NEON, ROSA][n % 3]}"/>`;
  });

  tema({
    nome: "Rafael",
    frase: "perdido no espaço, achado no xat ★",
    foto: "../clientes/exemplo/perfil-masculino.jpg",
    gostos: ["astronomia", "games", "ficção científica", "madrugada"],
    sobre: "Passo as noites olhando pro céu e as madrugadas jogando. Se um dia eu sumir, procura em Marte. Até lá, é só me chamar por aqui.",
    fontes: "family=Orbitron:wght@700;900&family=Exo+2:wght@400;600;700&family=VT323",
    cores: {
      "fundo-1": "#0d0a2b", "fundo-2": "#2b1660", tinta: NEON, texto: "#efeaff", papel: "#1c1650", "papel-2": "#2a2270",
      destaque: ROSA, botao: "#2a2270", "botao-texto": NEON, sombra: ROSA,
      "fonte-titulo": '"Orbitron", sans-serif', "fonte-texto": '"Exo 2", sans-serif', raio: "26px"
    },
    css: `
      .ceu { background: radial-gradient(ellipse at 20% 110%, rgba(255,95,210,.28), transparent 55%),
                          radial-gradient(ellipse at 90% -10%, rgba(122,242,255,.22), transparent 50%); }
      .estrelas { position: absolute; inset: 0; width: 100%; height: 100%; }
      .brilha { animation: brilha 3s ease-in-out infinite; }
      @keyframes brilha { 50% { opacity: .15; } }
      .luz { animation: luz 1.2s steps(1) infinite; }
      @keyframes luz { 50% { fill: ${NEON}; } }
      .fogo { transform-box: fill-box; transform-origin: 0 50%; animation: fogo .25s ease-in-out infinite alternate; }
      @keyframes fogo { to { transform: scaleX(.6); } }
      .raio { animation: brilha 1.6s ease-in-out infinite; }
      .luzes circle { animation: luz 1s steps(1) infinite; }
      .luzes circle:nth-child(2n) { animation-delay: .5s; }
      .passa.cometa { transform: rotate(-12deg); }
      .passa.cometa > svg { animation: none; }

      .janela-corpo, .relogio, .cracha, .cartao, .fala { box-shadow: 6px 6px 0 var(--sombra), 0 0 26px rgba(122,242,255,.35); }
      .janela-corpo { background: color-mix(in srgb, var(--papel) 60%, transparent); }
      .aba { font-size: 13px; letter-spacing: .12em; }
      .aba.ativa { color: #fff; text-shadow: 0 0 8px ${NEON}; }
      .fala { font-size: 16px; color: #fff; border-radius: 18px 18px 4px 18px; }
      .chao { opacity: 0; }

      .relogio { padding: 14px 14px 12px; }
      .hora { font-family: "VT323", monospace; font-size: 84px; color: ${NEON}; text-shadow: 0 0 12px ${NEON};
        background: #070a1a; border: 3px solid #3a3390; border-radius: 12px; padding: 4px 0 0;
        background-image: repeating-linear-gradient(transparent 0 3px, rgba(122,242,255,.06) 3px 4px); }
      .ss { font-size: 34px; opacity: .8; }
      .data { font-family: "Orbitron"; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #c9c3f2; }
      .logo { font-size: 30px; font-weight: 900; color: #fff; text-shadow: 0 0 10px ${ROSA}, 0 0 2px ${ROSA}; }
      .cracha-foto { box-shadow: 0 0 0 5px ${ROSA}, 0 0 22px ${ROSA}; }
      .cracha-frase { color: #c9c3f2; }
      .status { color: #fff; }
      .perfil-nome, .painel-sobre h2 { color: #fff; text-shadow: 0 0 12px ${ROSA}; }
      .perfil-gostos li { color: #fff; }

      .cartao { width: 310px; }
      .cartao-nome { font-size: 28px; font-weight: 900; color: #fff; text-shadow: 0 0 10px ${ROSA}; }
      .entrar { font-size: 16px; letter-spacing: .24em; box-shadow: 0 5px 0 ${ROSA}, 0 0 18px rgba(122,242,255,.5); text-shadow: 0 0 8px ${NEON}; }
      .arte { border-radius: 50% 50% 18px 18px / 34% 34% 18px 18px; }
    `,
    decor: `<svg class="estrelas">${estrelas}</svg><svg class="estrelas" viewBox="0 0 1920 900" preserveAspectRatio="xMidYMid slice">${brilhos}</svg>`,
    passando: [
      { html: PLANETA, qtd: 2, dur: 70, topo: [10, 70], tam: [110, 170] },
      { html: PLANETA2, qtd: 2, dur: 90, topo: [20, 85], tam: [50, 80] },
      { html: FOGUETE, qtd: 1, dur: 26, topo: [12, 40], tam: [150, 180] },
      { html: COMETA, qtd: 2, dur: 14, topo: [5, 60], tam: [180, 260], classe: "cometa" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <rect width="300" height="324" fill="#0d0a2b"/>
        <circle cx="300" cy="0" r="160" fill="${NEON}" opacity=".12"/>
        ${[[30, 40], [80, 90], [250, 60], [270, 150], [40, 200], [200, 30], [140, 70], [20, 120], [260, 230]].map(function (p) { return `<circle class="brilha" cx="${p[0]}" cy="${p[1]}" r="2" fill="#fff"/>`; }).join("")}
        <ellipse cx="150" cy="380" rx="230" ry="110" fill="#b8aef0" stroke="${T}" stroke-width="4"/>
        <ellipse cx="80" cy="300" rx="22" ry="8" fill="#9a8fe0"/><ellipse cx="220" cy="292" rx="16" ry="6" fill="#9a8fe0"/>
        <g transform="translate(232 40) scale(.5)">${PLANETA.replace('<svg viewBox="0 0 120 80">', "").replace("</svg>", "")}</g>
        <g transform="translate(46 34) scale(.52)">${ASTRONAUTA}</g>
      </svg>`,
      titulo: "Rafael",
      botao: "decolar"
    },
    // Dentro da janela: superfície da lua com crateras, bandeirinha e um planeta ao longe
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      ${[[60, 60], [140, 220], [300, 40], [520, 90], [700, 40], [820, 200], [40, 380], [610, 260], [420, 180]].map(function (p, n) { return `<circle class="brilha" style="animation-delay:-${n * .4}s" cx="${p[0]}" cy="${p[1]}" r="${n % 3 ? 2 : 3.5}" fill="#fff"/>`; }).join("")}
      <g transform="translate(140 150)">
        <ellipse rx="110" ry="24" fill="none" stroke="${T}" stroke-width="13" transform="rotate(-14)"/>
        <ellipse rx="110" ry="24" fill="none" stroke="#ffe66d" stroke-width="6" transform="rotate(-14)"/>
        <circle r="62" fill="#ff9f6b" stroke="${T}" stroke-width="5"/>
        <circle cx="-18" cy="-14" r="12" fill="#e9774a"/><circle cx="22" cy="18" r="16" fill="#e9774a"/><circle cx="-24" cy="30" r="7" fill="#e9774a"/>
        <path d="M-110 0 A110 24 0 0 0 110 0" fill="none" stroke="${T}" stroke-width="13" transform="rotate(-14)"/>
        <path d="M-110 0 A110 24 0 0 0 110 0" fill="none" stroke="#ffe66d" stroke-width="6" transform="rotate(-14)"/>
      </g>
      <path d="M-20 520 C120 470 300 492 440 488 C600 484 760 462 900 500 V640 H-20 Z" fill="#b8aef0" stroke="${T}" stroke-width="5"/>
      <path d="M-20 560 C200 540 600 548 900 540" fill="none" stroke="#a196e6" stroke-width="10"/>
      <g fill="#9a8fe0" stroke="${T}" stroke-width="3">
        <ellipse cx="110" cy="540" rx="46" ry="13"/><ellipse cx="690" cy="530" rx="34" ry="10"/><ellipse cx="560" cy="590" rx="50" ry="12"/><ellipse cx="250" cy="600" rx="24" ry="7"/>
      </g>
      <g transform="translate(770 486)">
        <path d="M0 0 V-130" stroke="${T}" stroke-width="7" stroke-linecap="round"/>
        <path class="bandeira" d="M2 -128 C30 -138 50 -118 84 -126 V-80 C50 -72 30 -92 2 -82 Z" fill="${ROSA}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M40 -112 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 Z" fill="#ffe66d"/>
        <ellipse cx="0" cy="2" rx="18" ry="6" fill="#9a8fe0" stroke="${T}" stroke-width="3"/>
      </g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${ASTRONAUTA}</svg>`,
    mini: DISCO,
    fala: "missão do dia: ganhar um carinho! clica em mim",
    particulas: ["★", "✦", "♥"]
  });
})();
