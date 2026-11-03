// 09 · Futebol de dia (alviverde): céu azul, gramado e trave, cachorrinho torcedor, placar de plaquinhas
(function () {
  var T = "#0f3b24";
  var V = "#1f9d55";
  var PELO = "#f2c38c";

  // O cachorrinho torcedor (desenhado em 400×400)
  var CACHORRO = `
    <defs>
      <clipPath id="cachecol09"><path d="M110 246 C150 270 250 270 290 246 L294 276 C250 300 150 300 106 276 Z M120 270 L152 278 L140 352 L108 346 Z"/></clipPath>
    </defs>
    <g class="balanca" style="transform-origin: 290px 320px"><path d="M286 326 C330 320 344 290 336 262" fill="none" stroke="${T}" stroke-width="26" stroke-linecap="round"/><path d="M286 326 C330 320 344 290 336 262" fill="none" stroke="${PELO}" stroke-width="15" stroke-linecap="round"/></g>
    <g class="respira">
      <ellipse cx="150" cy="378" rx="36" ry="19" fill="${PELO}" stroke="${T}" stroke-width="5"/>
      <ellipse cx="250" cy="378" rx="36" ry="19" fill="${PELO}" stroke="${T}" stroke-width="5"/>
      <path d="M124 246 C110 300 112 346 126 372 H274 C288 346 290 300 276 246 Z" fill="${V}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M126 372 H274" stroke="#fff" stroke-width="8" opacity=".9"/>
      <text x="200" y="350" text-anchor="middle" font-family="Bungee" font-size="46" fill="#fff" stroke="${T}" stroke-width="2">10</text>
      <ellipse cx="114" cy="322" rx="22" ry="24" fill="${PELO}" stroke="${T}" stroke-width="5"/>
      <g class="bandeira">
        <path d="M322 250 L336 60" stroke="${T}" stroke-width="10" stroke-linecap="round"/>
        <path d="M322 250 L336 60" stroke="#c9a06a" stroke-width="5" stroke-linecap="round"/>
        <g class="tremula">
          <path d="M336 66 C364 54 386 82 418 70 L414 140 C384 152 362 124 332 136 Z" fill="#fff" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
          <path d="M335 90 C364 78 386 106 417 94 L416 116 C386 128 362 102 334 114 Z" fill="${V}"/>
          <path d="M336 66 C364 54 386 82 418 70 L414 140 C384 152 362 124 332 136 Z" fill="none" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        </g>
        <path d="M268 282 C292 270 306 250 318 236" fill="none" stroke="${T}" stroke-width="34" stroke-linecap="round"/>
        <path d="M268 282 C292 270 306 250 318 236" fill="none" stroke="${PELO}" stroke-width="24" stroke-linecap="round"/>
        <circle cx="324" cy="230" r="22" fill="${PELO}" stroke="${T}" stroke-width="5"/>
      </g>
      <path d="M110 246 C150 270 250 270 290 246 L294 276 C250 300 150 300 106 276 Z M120 270 L152 278 L140 352 L108 346 Z" fill="#fff"/>
      <g clip-path="url(#cachecol09)" fill="${V}">
        <rect x="100" y="230" width="22" height="140"/><rect x="144" y="230" width="22" height="140"/><rect x="188" y="230" width="22" height="140"/><rect x="232" y="230" width="22" height="140"/><rect x="276" y="230" width="22" height="140"/>
        <rect x="90" y="300" width="80" height="16" transform="rotate(10 130 308)"/>
      </g>
      <path d="M110 246 C150 270 250 270 290 246 L294 276 C250 300 150 300 106 276 Z M120 270 L152 278 L140 352 L108 346 Z" fill="none" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M110 348 l-4 12 M122 350 l-2 12 M134 352 l0 12" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g class="respira" style="animation-delay: -.4s">
      <path d="M124 92 C82 84 60 148 76 204 C84 230 116 222 122 196 C128 164 136 120 124 92 Z" fill="#b9784a" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M276 92 C318 84 340 148 324 204 C316 230 284 222 278 196 C272 164 264 120 276 92 Z" fill="#b9784a" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="200" cy="164" rx="112" ry="102" fill="${PELO}" stroke="${T}" stroke-width="5"/>
      <ellipse cx="246" cy="150" rx="40" ry="34" fill="#e0a067"/>
      <path d="M180 64 C190 50 204 52 206 66 C214 54 230 60 224 74" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="200" cy="212" rx="58" ry="42" fill="#fff3e0" stroke="${T}" stroke-width="4"/>
      <ellipse cx="136" cy="206" rx="18" ry="10" fill="#ff8d8d" opacity=".55"/>
      <ellipse cx="264" cy="206" rx="18" ry="10" fill="#ff8d8d" opacity=".55"/>
      <g class="pisca">
        <ellipse cx="156" cy="160" rx="15" ry="19" fill="${T}"/><circle cx="150" cy="152" r="6.5" fill="#fff"/><circle cx="161" cy="168" r="3" fill="#fff"/>
        <ellipse cx="244" cy="160" rx="15" ry="19" fill="${T}"/><circle cx="238" cy="152" r="6.5" fill="#fff"/><circle cx="249" cy="168" r="3" fill="#fff"/>
      </g>
      <path d="M184 194 C184 184 216 184 216 194 C216 204 204 210 200 210 C196 210 184 204 184 194 Z" fill="${T}"/>
      <circle cx="194" cy="192" r="3.5" fill="#fff" opacity=".8"/>
      <path d="M200 210 V222 M182 220 Q191 232 200 222 Q209 232 218 220" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M192 228 C192 246 208 246 208 228" fill="#ff7f8e" stroke="${T}" stroke-width="3.5"/>
    </g>`;

  // Escudo inventado: verde com faixa branca na diagonal, a inicial e uma estrela
  function escudo(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <defs><clipPath id="esc09-${x}"><path d="M-48 -54 H48 V6 C48 40 24 58 0 68 C-24 58 -48 40 -48 6 Z"/></clipPath></defs>
      <path d="M-48 -54 H48 V6 C48 40 24 58 0 68 C-24 58 -48 40 -48 6 Z" fill="${V}"/>
      <path d="M-70 30 L40 -80 L70 -50 L-40 60 Z" fill="#fff" clip-path="url(#esc09-${x})"/>
      <circle cx="0" cy="2" r="26" fill="${V}" stroke="#fff" stroke-width="5"/>
      <text x="0" y="14" text-anchor="middle" font-family="Bungee" font-size="32" fill="#fff">R</text>
      <path d="M-48 -54 H48 V6 C48 40 24 58 0 68 C-24 58 -48 40 -48 6 Z" fill="none" stroke="${T}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M0 -88 L7 -74 L22 -73 L11 -63 L14 -48 L0 -56 L-14 -48 L-11 -63 L-22 -73 L-7 -74 Z" fill="#ffd34d" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    </g>`;
  }

  // A chuteira piscando (o bichinho pequeno do canto)
  var CHUTEIRA = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <ellipse cx="100" cy="186" rx="76" ry="8" fill="${T}" opacity=".18"/>
      <path d="M22 132 C20 92 34 54 62 46 L104 46 C114 46 118 58 118 70 C140 84 184 92 184 132 C184 152 170 160 152 160 H42 C28 160 22 148 22 132 Z" fill="${V}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M62 46 L104 46 C114 46 118 58 118 70 L60 70 Z" fill="#fff" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M78 74 L98 96 M92 70 L112 90 M70 86 L104 82 M84 98 L118 94" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <path d="M22 140 H184" stroke="#fff" stroke-width="7"/>
      <path d="M20 160 H186" stroke="${T}" stroke-width="5"/>
      <g fill="${T}"><rect x="36" y="160" width="12" height="14" rx="3"/><rect x="74" y="160" width="12" height="14" rx="3"/><rect x="120" y="160" width="12" height="14" rx="3"/><rect x="156" y="160" width="12" height="14" rx="3"/></g>
      <ellipse cx="112" cy="124" rx="10" ry="6" fill="#ff8d8d" opacity=".6"/>
      <ellipse cx="170" cy="124" rx="9" ry="6" fill="#ff8d8d" opacity=".6"/>
      <ellipse cx="128" cy="110" rx="7" ry="9" fill="${T}"/><circle cx="125" cy="106" r="3" fill="#fff"/>
      <path d="M150 110 q8 -9 16 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M134 126 q8 9 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
    </g></svg>`;

  var NUVEM = `<svg viewBox="0 0 180 90"><path d="M30 80 C4 80 4 46 30 48 C28 20 66 10 80 34 C90 8 136 8 138 40 C166 34 174 80 146 80 Z" fill="#fff"/><path d="M30 80 H146" stroke="#cfe6f5" stroke-width="6" stroke-linecap="round"/></svg>`;
  var AVIAO = `<svg viewBox="0 0 560 100">
    <path d="M118 46 C140 40 150 52 172 46" fill="none" stroke="${T}" stroke-width="2.5"/>
    <g class="faixa09">
      <path d="M172 22 C250 10 320 34 400 22 C460 14 510 28 548 22 L548 72 C510 78 460 64 400 72 C320 84 250 60 172 72 Z" fill="#fff" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M172 22 V72" stroke="${V}" stroke-width="10"/>
      <text x="364" y="58" text-anchor="middle" font-family="Bungee" font-size="28" fill="${V}">VAI, MEU TIME!</text>
    </g>
    <g>
      <path d="M20 46 C20 34 40 30 64 30 H100 C112 30 118 40 118 46 C118 54 110 60 100 60 H40 C28 60 20 56 20 46 Z" fill="#fff" stroke="${T}" stroke-width="4"/>
      <path d="M58 46 L74 12 H90 L84 46 Z M58 48 L74 78 H90 L84 48 Z" fill="${V}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M100 30 L108 10 H118 L116 34" fill="${V}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="40" cy="42" r="6" fill="#9fd6ff" stroke="${T}" stroke-width="3"/>
      <rect x="10" y="30" width="6" height="32" rx="3" fill="${T}" class="helice"/>
    </g>
  </svg>`;

  // Arquibancada ao fundo: fileiras de torcedores em verde e branco
  function torcida(largura, y0, fileiras) {
    var s = "";
    for (var f = 0; f < fileiras; f++) {
      for (var x = (f % 2) * 9; x < largura; x += 18) {
        var n = Math.sin(x * 12.9 + f * 78.2) * 43758.5;
        var r = n - Math.floor(n);
        var cor = r < .45 ? V : r < .8 ? "#fff" : "#f2c38c";
        s += `<circle cx="${x}" cy="${y0 + f * 15}" r="6" fill="${cor}"/>`;
      }
    }
    return s;
  }

  // Gramado em perspectiva: faixas que abrem em direção à frente
  var faixas = "";
  for (var i = -8; i < 8; i++) {
    var a = 440 + i * 70, b = 440 + i * 190;
    faixas += `<path d="M${a} 300 L${a + 70} 300 L${b + 190} 620 L${b} 620 Z" fill="${i % 2 ? "#4cb25d" : "#5cc26c"}"/>`;
  }

  // Rede da trave
  var rede = "";
  for (var k = 0; k <= 10; k++) rede += `<path d="M${84 + k * 22} 196 L${104 + k * 18} 170" />`;
  for (var m = 0; m <= 8; m++) rede += `<path d="M${84 + m * 0} ${196 + m * 20} L${104} ${170 + m * 20}"/><path d="M84 ${196 + m * 20} H304"/>`;
  for (var q = 0; q <= 10; q++) rede += `<path d="M${84 + q * 22} 196 V356"/>`;

  tema({
    nome: "Rafael",
    frase: "de pai pra filho, de coração",
    foto: "../clientes/exemplo/sentado-masculino.jpg",
    gostos: ["futebol", "pelada de domingo", "álbum de figurinhas", "camisa 10"],
    sobre: "Aprendi a torcer antes de aprender a ler. Domingo é dia de jogo, de reunir a família e de gritar gol até perder a voz.",
    fontes: "family=Bungee&family=Barlow+Condensed:wght@600;700&family=Barlow:wght@500;700",
    cores: {
      "fundo-1": "#7ccbff", "fundo-2": "#d8f1ff", tinta: T, papel: "#ffffff", "papel-2": "#e3f5e8",
      destaque: V, botao: "#ffffff", "botao-texto": T, sombra: T, borda: "4px", raio: "14px",
      "fonte-titulo": '"Bungee", sans-serif', "fonte-texto": '"Barlow", sans-serif'
    },
    css: `
      .decor svg { position: absolute; left: 0; bottom: 0; width: 100%; height: 100%; }
      .raios { transform-origin: 150px 120px; animation: gira 40s linear infinite; }
      .tremula { transform-box: fill-box; transform-origin: 0 50%; animation: tremula 1.4s ease-in-out infinite; }
      @keyframes tremula { 50% { transform: skewY(-6deg) scaleX(.94); } }
      .bandeira { transform-origin: 300px 270px; animation: aceno 1.8s ease-in-out infinite; }
      @keyframes aceno { 50% { transform: rotate(-7deg); } }
      .faixa09 { transform-box: fill-box; transform-origin: 0 50%; animation: tremula 1.6s ease-in-out infinite; }
      .helice { transform-box: fill-box; transform-origin: center; animation: helice .25s linear infinite; }
      @keyframes helice { 50% { transform: scaleY(.15); } }
      .passa.aviao > svg { animation-duration: 3s; }

      /* Entrada: figurinha de álbum */
      .cartao { background: repeating-linear-gradient(90deg, ${V} 0 24px, #26ad60 24px 48px); color: #fff; border-radius: 16px; box-shadow: 8px 8px 0 ${T}; position: relative; }
      .cartao::after { content: ""; position: absolute; right: -4px; top: -4px; width: 46px; height: 46px; background: linear-gradient(225deg, #7ccbff 50%, #e9f0ec 50%); border-bottom-left-radius: 12px; box-shadow: -3px 3px 0 ${T}; }
      .arte { border: 6px solid #fff; border-radius: 10px; outline: 4px solid ${T}; }
      .cartao-nome { color: #fff; font-size: 34px; margin: 16px 0 4px; text-shadow: 3px 3px 0 ${T}; }
      .cartao-nome::after { content: "camisa 10 · meia · 1,78 m"; display: block; margin: 8px 0 14px; font-family: "Barlow Condensed"; font-weight: 700; font-size: 16px; letter-spacing: .14em; text-transform: uppercase; text-shadow: none; color: #eafff0; }
      .entrar { font-family: Bungee; font-size: 17px; letter-spacing: .08em; border-radius: 99px; }

      .aba { font-family: "Barlow Condensed"; font-weight: 700; font-size: 19px; letter-spacing: .12em; border-radius: 14px 14px 0 0; }
      .aba.ativa { background: ${V}; color: #fff; }
      .fala { font-family: "Barlow Condensed"; font-weight: 700; font-size: 23px; text-transform: uppercase; letter-spacing: .02em; }
      .chao { opacity: .22; }
      .sobre-texto, .perfil-frase { font-weight: 500; }

      /* Relógio: placar de plaquinhas */
      .relogio { background: ${T}; color: #fff; padding: 10px 14px 14px; }
      .relogio::before { content: "TEMPO DE JOGO"; display: block; margin-bottom: 8px; font-family: "Barlow Condensed"; font-weight: 700; font-size: 16px; letter-spacing: .24em; color: #ffd34d; }
      .hora { font-size: 46px; display: flex; justify-content: center; align-items: center; gap: 6px; }
      .hh, .mm { background: #fff; color: ${T}; border-radius: 8px; padding: 6px 10px 2px; box-shadow: inset 0 -5px 0 #cfe3d5; }
      .sep { color: #ffd34d; }
      .ss { font-size: 20px; background: ${V}; color: #fff; border-radius: 6px; padding: 4px 6px 1px; opacity: 1; margin-left: 2px; }
      .data { font-family: "Barlow Condensed"; font-weight: 600; font-size: 17px; letter-spacing: .08em; text-transform: uppercase; margin-top: 10px; }

      .cracha { background: linear-gradient(${V} 0 74px, #fff 74px); }
      .cracha-foto { border-radius: 16px; box-shadow: 0 0 0 5px #fff; transform: rotate(-3deg); }
      .status { background: #fff; }
      .logo { font-size: 34px; margin-top: 12px; }
      .cracha-frase { font-weight: 700; }
    `,
    decor: `<svg viewBox="0 0 1920 900" preserveAspectRatio="xMidYMax slice">
      <g class="raios" fill="#fffbe0" opacity=".4">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (r) { return `<path d="M150 120 L${150 + Math.cos(r * .5236) * 260 - Math.sin(r * .5236) * 30} ${120 + Math.sin(r * .5236) * 260 + Math.cos(r * .5236) * 30} L${150 + Math.cos(r * .5236) * 260 + Math.sin(r * .5236) * 30} ${120 + Math.sin(r * .5236) * 260 - Math.cos(r * .5236) * 30} Z"/>`; }).join("")}</g>
      <circle cx="150" cy="120" r="70" fill="#ffe066" stroke="#ffc93c" stroke-width="10"/>
      <path d="M0 790 Q480 760 960 780 T1920 770 V900 H0 Z" fill="#3fa451"/>
      <path d="M0 830 Q480 810 960 826 T1920 818 V900 H0 Z" fill="#4cb25d"/>
      <path d="M0 790 Q480 760 960 780 T1920 770" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/>
    </svg>`,
    passando: [
      { html: NUVEM, qtd: 5, dur: 70, topo: [4, 70], tam: [150, 260] },
      { html: AVIAO, qtd: 1, dur: 30, topo: [3, 5], tam: [520, 520], classe: "aviao" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <defs><linearGradient id="ceu09" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ccbff"/><stop offset="1" stop-color="#d8f1ff"/></linearGradient></defs>
        <rect width="300" height="324" fill="url(#ceu09)"/>
        <rect y="150" width="300" height="40" fill="#e3ece6"/>
        <g opacity=".9">${torcida(300, 158, 3)}</g>
        <rect y="190" width="300" height="134" fill="#4cb25d"/>
        <path d="M0 214 H300" stroke="#fff" stroke-width="3"/>
        <circle cx="244" cy="40" r="24" fill="#ffe066" stroke="#ffc93c" stroke-width="5"/>
        ${escudo(46, 62, .5)}
        <g transform="translate(46 96) scale(.52)">${CACHORRO}</g>
        <rect x="0" y="286" width="300" height="38" fill="${T}"/>
        <text x="150" y="313" text-anchor="middle" font-family="Bungee" font-size="20" fill="#fff" letter-spacing="2">MEU TIME ★ 10</text>
      </svg>`,
      titulo: "Rafael",
      botao: "vamos jogar"
    },
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%" preserveAspectRatio="xMidYMax slice">
      <defs><linearGradient id="ceu09b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad7ff"/><stop offset="1" stop-color="#e6f6ff"/></linearGradient></defs>
      <rect width="880" height="620" fill="url(#ceu09b)"/>
      <path d="M-10 150 L890 150 L890 300 L-10 300 Z" fill="#e3ece6"/>
      <path d="M-10 150 H890" stroke="${T}" stroke-width="4"/>
      <g opacity=".95">${torcida(890, 168, 8)}</g>
      <rect x="0" y="282" width="880" height="20" fill="${V}"/>
      <text x="440" y="298" text-anchor="middle" font-family="Barlow Condensed" font-weight="700" font-size="17" letter-spacing="6" fill="#fff">★ AQUI É RAFAEL ★ CAMISA 10 ★ AQUI É RAFAEL ★ CAMISA 10 ★</text>
      ${faixas}
      <path d="M0 302 H880" stroke="${T}" stroke-width="4"/>
      <g fill="none" stroke="#fff" stroke-width="4" opacity=".9">
        <path d="M0 340 H880"/>
        <path d="M150 340 L60 470 H820 L730 340"/>
        <path d="M330 470 Q440 520 550 470"/>
      </g>
      <g fill="none" stroke="#fff" stroke-width="1.6" opacity=".85">${rede}</g>
      <g fill="none" stroke-linecap="round">
        <path d="M84 356 V196 H304 V356" stroke="${T}" stroke-width="16"/>
        <path d="M84 356 V196 H304 V356" stroke="#fff" stroke-width="9"/>
        <path d="M84 196 L104 170 H324 L304 196 M324 170 V336" stroke="#fff" stroke-width="5"/>
      </g>
      <g transform="translate(800 400)">
        <path d="M0 0 V-110" stroke="${T}" stroke-width="8" stroke-linecap="round"/>
        <path d="M0 0 V-110" stroke="#ffd34d" stroke-width="4" stroke-linecap="round"/>
        <path class="tremula" d="M2 -108 C24 -114 40 -98 62 -104 L60 -66 C40 -60 24 -76 2 -70 Z" fill="${V}" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <ellipse cx="0" cy="2" rx="18" ry="5" fill="${T}" opacity=".2"/>
      </g>
      <g transform="translate(640 520)"><circle r="22" fill="#fff" stroke="${T}" stroke-width="4"/><path d="M0 -10 L9 -3 L6 8 H-6 L-9 -3 Z" fill="${T}"/></g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${CACHORRO}</svg>`,
    mini: CHUTEIRA,
    fala: "é gol!<br>clica em mim!",
    particulas: ["★", "♥", "★"]
  });
})();
