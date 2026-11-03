// 07 · Música: violão fofinho, pauta ondulando no fundo, notas passando, clave de sol e teclado de piano
(function () {
  var T = "#232046";
  var ROSA = "#ff6f91";
  var MOSTARDA = "#ffd166";
  var MENTA = "#7ef0c4";

  // Notinhas desenhadas (colcheia e duas colcheias ligadas)
  function colcheia(cor) {
    return `<svg viewBox="0 0 60 90"><ellipse cx="20" cy="70" rx="15" ry="11" transform="rotate(-22 20 70)" fill="${cor}" stroke="${T}" stroke-width="3.5"/>
      <path d="M33 66 V10 C40 22 56 26 54 46 C52 36 44 32 37 30" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function ligadas(cor) {
    return `<svg viewBox="0 0 90 90"><ellipse cx="18" cy="72" rx="14" ry="10" transform="rotate(-22 18 72)" fill="${cor}" stroke="${T}" stroke-width="3.5"/>
      <ellipse cx="66" cy="62" rx="14" ry="10" transform="rotate(-22 66 62)" fill="${cor}" stroke="${T}" stroke-width="3.5"/>
      <path d="M30 68 V18 M78 58 V8" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M28 14 L80 4 V16 L28 26 Z" fill="${T}"/></svg>`;
  }
  var CLAVE = `<svg viewBox="0 0 60 120"><text x="30" y="100" text-anchor="middle" font-family="Segoe UI Symbol, Noto Music, serif" font-size="110" fill="${T}">&#x1D11E;</text></svg>`;

  // O violão (desenhado em 400×400)
  var VIOLAO = `
    <g class="notinhas" fill="${T}">
      <g class="sobe-nota"><ellipse cx="96" cy="120" rx="12" ry="9" transform="rotate(-22 96 120)" fill="${ROSA}" stroke="${T}" stroke-width="3"/><path d="M106 116 V76 C112 86 124 88 122 104" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/></g>
      <g class="sobe-nota n2"><ellipse cx="312" cy="96" rx="12" ry="9" transform="rotate(-22 312 96)" fill="${MENTA}" stroke="${T}" stroke-width="3"/><path d="M322 92 V52 C328 62 340 64 338 80" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/></g>
    </g>
    <g class="balanca">
      <!-- pezinhos -->
      <ellipse cx="166" cy="390" rx="26" ry="12" fill="${T}"/>
      <ellipse cx="234" cy="390" rx="26" ry="12" fill="${T}"/>
      <!-- bracinhos -->
      <path d="M116 300 C88 296 74 276 70 254" fill="none" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="68" cy="248" r="15" fill="${MOSTARDA}" stroke="${T}" stroke-width="5"/>
      <path d="M284 300 C312 300 326 316 330 336" fill="none" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="332" cy="342" r="15" fill="${MOSTARDA}" stroke="${T}" stroke-width="5"/>
      <!-- braço do violão e cabeça com as tarraxas -->
      <rect x="183" y="56" width="34" height="90" fill="#8a5a3e" stroke="${T}" stroke-width="5"/>
      <path d="M185 84 H215 M185 106 H215 M185 128 H215" stroke="#e6c9a8" stroke-width="3"/>
      <g fill="${MOSTARDA}" stroke="${T}" stroke-width="4"><circle cx="164" cy="26" r="9"/><circle cx="164" cy="50" r="9"/><circle cx="236" cy="26" r="9"/><circle cx="236" cy="50" r="9"/></g>
      <rect x="172" y="10" width="56" height="56" rx="14" fill="#8a5a3e" stroke="${T}" stroke-width="5"/>
      <!-- corpo -->
      <path d="M200 124 C244 124 268 154 268 190 C268 222 248 234 250 252 C252 268 288 270 288 304 C288 352 250 388 200 388 C150 388 112 352 112 304 C112 270 148 268 150 252 C152 234 132 222 132 190 C132 154 156 124 200 124 Z"
        fill="#f4a95c" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M200 138 C236 138 254 162 254 190 C254 214 238 226 238 246" fill="none" stroke="#ffc98a" stroke-width="8" stroke-linecap="round" opacity=".8"/>
      <circle cx="200" cy="192" r="34" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
      <circle cx="200" cy="192" r="22" fill="#3b2a24" stroke="${T}" stroke-width="4"/>
      <rect x="170" y="240" width="60" height="14" rx="5" fill="#6b4130" stroke="${T}" stroke-width="4"/>
      <path d="M192 64 V246 M200 64 V246 M208 64 V246" stroke="#fff6e8" stroke-width="2"/>
      <!-- rostinho -->
      <ellipse cx="148" cy="318" rx="16" ry="9" fill="${ROSA}" opacity=".55"/>
      <ellipse cx="252" cy="318" rx="16" ry="9" fill="${ROSA}" opacity=".55"/>
      <g class="pisca">
        <ellipse cx="170" cy="300" rx="13" ry="16" fill="${T}"/><circle cx="165" cy="294" r="5" fill="#fff"/>
        <ellipse cx="230" cy="300" rx="13" ry="16" fill="${T}"/><circle cx="225" cy="294" r="5" fill="#fff"/>
      </g>
      <path d="M186 322 Q200 342 214 322 Z" fill="#c2456e" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    </g>`;

  // Notinha com rostinho, piscando (o bichinho pequeno do canto)
  var NOTINHA = `<svg viewBox="0 0 200 200">
    <g class="flutua">
      <path d="M128 132 V22 C150 40 186 48 180 96 C174 74 156 66 140 62" fill="none" stroke="${T}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="86" cy="140" rx="54" ry="42" transform="rotate(-20 86 140)" fill="${ROSA}" stroke="${T}" stroke-width="5"/>
      <ellipse cx="60" cy="158" rx="10" ry="6" fill="#fff" opacity=".45"/><ellipse cx="114" cy="140" rx="10" ry="6" fill="#fff" opacity=".45"/>
      <ellipse cx="72" cy="136" rx="8" ry="10" fill="${T}"/><circle cx="69" cy="132" r="3" fill="#fff"/>
      <path d="M94 128 q9 -9 18 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M80 152 q8 9 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
    </g></svg>`;

  // Pautas ondulando atrás de tudo
  function onda(y) {
    var d = `M-480 ${y}`;
    for (var x = -480; x < 2400; x += 480) d += ` Q${x + 120} ${y - 34} ${x + 240} ${y} T${x + 480} ${y}`;
    return d;
  }
  var pautas = "";
  [170, 470, 770].forEach(function (y) {
    var linhas = "";
    for (var l = 0; l < 5; l++) linhas += `<path d="${onda(y + l * 15)}"/>`;
    pautas += `<g class="pauta">${linhas}</g>`;
  });

  // Teclado de piano na base da janela
  var teclas = "", pretas = "";
  for (var i = 0; i < 22; i++) {
    teclas += `<rect class="tecla" style="animation-delay:${(i * 0.37) % 4}s" x="${i * 40}" y="530" width="40" height="96" rx="5" fill="#fffdf7" stroke="${T}" stroke-width="4"/>`;
    if ([0, 1, 3, 4, 5].indexOf(i % 7) > -1 && i < 21) pretas += `<rect x="${i * 40 + 27}" y="530" width="26" height="58" rx="4" fill="${T}"/>`;
  }

  tema({
    nome: "Marina",
    frase: "a vida tem trilha sonora ♪",
    foto: "../clientes/exemplo/perfil-feminino.jpg",
    gostos: ["violão", "MPB", "karaokê", "vinil"],
    sobre: "Toco violão desde os doze anos e canto até no chuveiro. Tenho uma playlist pra cada humor e um disco pra cada lembrança. Me manda uma música que eu te mando outra.",
    fontes: "family=Cherry+Bomb+One&family=Quicksand:wght@500;700&family=VT323",
    cores: {
      "fundo-1": "#e6e9ff", "fundo-2": "#c9d0fa", tinta: T, papel: "#fffdf7", "papel-2": "#eef0ff",
      destaque: ROSA, botao: MOSTARDA, sombra: T, raio: "20px",
      "fonte-titulo": '"Cherry Bomb One", sans-serif', "fonte-texto": '"Quicksand", sans-serif'
    },
    css: `
      .pautas { position: absolute; inset: 0; width: 100%; height: 100%; }
      .pauta { fill: none; stroke: #8e98dc; stroke-width: 2.5; opacity: .55; animation: pauta 9s linear infinite; }
      .pauta:nth-child(2) { animation-duration: 12s; }
      @keyframes pauta { to { transform: translateX(-480px); } }
      .sobe-nota { animation: sobe-nota 2.8s ease-out infinite; }
      .n2 { animation-delay: 1.4s; }
      @keyframes sobe-nota { 0% { opacity: 0; transform: translateY(30px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(-40px); } }
      .tecla { animation: tecla 4s steps(1) infinite; }
      @keyframes tecla { 0%, 12% { fill: ${MOSTARDA}; } 13%, 100% { fill: #fffdf7; } }
      .balanca { animation-duration: 1.2s; }
      .disco { transform-box: fill-box; transform-origin: center; animation: gira 4s linear infinite; }

      .aba { background: #fffdf7; }
      .aba:nth-child(2n) { background: ${T}; color: #fff; }
      .aba.ativa { background: ${ROSA}; color: #fff; }
      .chao { opacity: 0; }
      .fala { font-weight: 400; }
      .hora, .logo, .cartao-nome, .perfil-nome, .painel-sobre h2 { font-weight: 400; }

      /* Relógio de rádio: antena, visor e equalizador */
      .relogio { position: relative; background: ${ROSA}; color: #fff; padding: 16px 16px 14px; border-radius: 28px; }
      .relogio::before { content: ""; position: absolute; right: 44px; top: -50px; width: 6px; height: 58px; border-radius: 3px;
        background: ${T}; transform: rotate(28deg); transform-origin: 50% 100%; z-index: -1; }
      .hora { font-family: "VT323", monospace; font-size: 78px; color: ${MENTA}; background: ${T}; border-radius: 14px; padding: 4px 0 0;
        text-shadow: 0 0 10px rgba(126,240,196,.6); }
      .ss { font-size: 32px; opacity: .85; }
      .data { font-weight: 700; margin-top: 10px; }
      .relogio::after { content: ""; display: block; height: 30px; margin: 10px 8px 0;
        background-image: ${Array(13).fill(`linear-gradient(${MOSTARDA}, ${MOSTARDA})`).join(",")};
        background-repeat: no-repeat;
        background-position: ${Array.from({ length: 13 }, function (_, n) { return (n * 100 / 12).toFixed(1) + "% 100%"; }).join(",")};
        background-size: ${[40, 80, 60, 100, 50, 70, 90, 40, 65, 85, 45, 75, 55].map(function (h) { return "12px " + h + "%"; }).join(",")};
        animation: eq .8s ease-in-out infinite alternate; }
      @keyframes eq { to { background-size: ${[90, 35, 85, 45, 100, 40, 55, 95, 30, 60, 90, 35, 80].map(function (h) { return "12px " + h + "%"; }).join(",")}; } }
      .logo { color: ${ROSA}; -webkit-text-stroke: 1.5px ${T}; font-size: 44px; }

      /* Entrada: ingresso com picote, disco girando */
      .cartao { border-radius: 14px; }
      .arte { border-radius: 10px; }
      .cartao-nome { border-top: 3px dashed ${T}; margin: 16px -22px 12px; padding-top: 14px; font-size: 34px; color: ${ROSA}; -webkit-text-stroke: 1.5px ${T}; }
      .entrar { letter-spacing: .06em; font-size: 20px; }
    `,
    decor: `<svg class="pautas" viewBox="0 0 1920 900" preserveAspectRatio="xMidYMid slice">${pautas}</svg>`,
    passando: [
      { html: colcheia(ROSA), qtd: 4, dur: 34, topo: [5, 85], tam: [40, 60] },
      { html: ligadas(MOSTARDA), qtd: 3, dur: 40, topo: [10, 80], tam: [60, 80] },
      { html: colcheia(MENTA), qtd: 3, dur: 28, topo: [10, 90], tam: [34, 50] },
      { html: CLAVE, qtd: 2, dur: 50, topo: [10, 70], tam: [44, 60] }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <rect width="300" height="324" fill="${MOSTARDA}"/>
        <g stroke="#ffbf3f" stroke-width="14">${[0, 1, 2, 3, 4, 5, 6, 7].map(function (n) { return `<path d="M${n * 50 - 100} 0 L${n * 50 + 60} 324"/>`; }).join("")}</g>
        <g class="disco">
          <circle cx="150" cy="148" r="128" fill="#1d1b2e" stroke="${T}" stroke-width="4"/>
          <g fill="none" stroke="#3a3758" stroke-width="2.5"><circle cx="150" cy="148" r="114"/><circle cx="150" cy="148" r="100"/><circle cx="150" cy="148" r="86"/><circle cx="150" cy="148" r="72"/></g>
          <path d="M70 80 A110 110 0 0 1 120 46" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".35"/>
          <circle cx="150" cy="148" r="48" fill="${ROSA}" stroke="${T}" stroke-width="3"/>
          <text x="150" y="140" text-anchor="middle" font-family="Cherry Bomb One" font-size="17" fill="#fff">lado A</text>
          <text x="150" y="164" text-anchor="middle" font-family="Quicksand" font-weight="700" font-size="12" fill="#fff">♪ ♫ ♪</text>
          <circle cx="150" cy="148" r="6" fill="${MOSTARDA}" stroke="${T}" stroke-width="2"/>
        </g>
        <g transform="translate(250 60) rotate(20)"><rect x="-6" y="0" width="12" height="120" rx="6" fill="#cfd3e8" stroke="${T}" stroke-width="3"/><rect x="-14" y="110" width="28" height="22" rx="4" fill="#cfd3e8" stroke="${T}" stroke-width="3"/></g>
        <text x="150" y="308" text-anchor="middle" font-family="Cherry Bomb One" font-size="21" fill="${T}">♪ tocando agora ♪</text>
      </svg>`,
      titulo: "show da Marina",
      botao: "&#9654;&#xFE0E; dar o play"
    },
    // Dentro da janela: pauta com clave de sol, notas, um microfone e o teclado de piano
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <g stroke="#8e98dc" stroke-width="3">${[0, 1, 2, 3, 4].map(function (l) { return `<path d="M30 ${84 + l * 24} H350"/>`; }).join("")}</g>
      <text x="96" y="210" text-anchor="middle" font-family="Segoe UI Symbol, Noto Music, serif" font-size="230" fill="${ROSA}" stroke="${T}" stroke-width="4" paint-order="stroke">&#x1D11E;</text>
      <g transform="translate(160 -26)">
        <ellipse cx="20" cy="194" rx="15" ry="11" transform="rotate(-22 20 194)" fill="${T}"/><path d="M33 190 V120" stroke="${T}" stroke-width="5"/>
        <ellipse cx="84" cy="170" rx="15" ry="11" transform="rotate(-22 84 170)" fill="${T}"/><ellipse cx="148" cy="146" rx="15" ry="11" transform="rotate(-22 148 146)" fill="${T}"/>
        <path d="M97 166 V96 M161 142 V72" stroke="${T}" stroke-width="5"/><path d="M95 92 L163 68 V82 L95 106 Z" fill="${T}"/>
      </g>
      <g transform="translate(790 300)">
        <path d="M0 -40 V230 M-50 230 H50" stroke="${T}" stroke-width="7" stroke-linecap="round"/>
        <rect x="-20" y="-110" width="40" height="80" rx="20" fill="#cfd3e8" stroke="${T}" stroke-width="5"/>
        <path d="M-20 -78 H20 M-20 -62 H20 M-20 -94 H20" stroke="${T}" stroke-width="2.5" opacity=".5"/>
        <rect x="-14" y="-34" width="28" height="18" rx="5" fill="${ROSA}" stroke="${T}" stroke-width="4"/>
      </g>
      ${teclas}${pretas}
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${VIOLAO}</svg>`,
    mini: NOTINHA,
    fala: "toca uma pra mim?<br>clica no violão!",
    particulas: ["♪", "♫", "♥"]
  });
})();
