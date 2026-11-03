// 04 · Fundo do mar: polvinho de chapéu de marinheiro, bolhas subindo e peixinhos passando
(function () {
  var T = "#123d5a";
  var LATAO = "#e8b95a";

  // Um tentáculo: contorno e cor, com a ponta enrolada
  function tentaculo(d, atraso) {
    return `<g class="tent" style="animation-delay:${atraso}s">
      <path d="${d}" fill="none" stroke="${T}" stroke-width="42" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="#ff8e7a" stroke-width="32" stroke-linecap="round"/>
    </g>`;
  }

  // O polvinho (desenhado em 400×400)
  var POLVO = `
    <g class="respira">
      ${tentaculo("M112 240 C86 296 44 312 54 346 C60 366 86 360 84 344", 0)}
      ${tentaculo("M150 256 C140 306 116 344 132 368 C142 380 160 372 156 360", .4)}
      ${tentaculo("M250 256 C260 306 284 344 268 368 C258 380 240 372 244 360", .8)}
      ${tentaculo("M288 240 C314 296 356 312 346 346 C340 366 314 360 316 344", 1.2)}
      ${tentaculo("M186 262 C184 318 166 352 184 376", .6)}
      ${tentaculo("M214 262 C216 318 234 352 216 376", 1)}
      <path d="M200 66 C292 66 334 138 334 206 C334 262 296 286 200 286 C104 286 66 262 66 206 C66 138 108 66 200 66 Z" fill="#ff8e7a" stroke="${T}" stroke-width="5"/>
      <g fill="#ffb3a3"><circle cx="112" cy="166" r="12"/><circle cx="292" cy="150" r="9"/><circle cx="276" cy="122" r="6"/><circle cx="130" cy="136" r="6"/></g>
      <path d="M104 132 C110 110 124 96 140 88" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".45"/>
      <ellipse cx="124" cy="234" rx="22" ry="12" fill="#ff5f7a" opacity=".45"/>
      <ellipse cx="276" cy="234" rx="22" ry="12" fill="#ff5f7a" opacity=".45"/>
      <g class="pisca">
        <ellipse cx="156" cy="206" rx="18" ry="22" fill="${T}"/><circle cx="149" cy="197" r="7" fill="#fff"/><circle cx="162" cy="216" r="3" fill="#fff"/>
        <ellipse cx="244" cy="206" rx="18" ry="22" fill="${T}"/><circle cx="237" cy="197" r="7" fill="#fff"/><circle cx="250" cy="216" r="3" fill="#fff"/>
      </g>
      <path d="M184 238 C188 252 212 252 216 238 Z" fill="#c2384f" stroke="${T}" stroke-width="4.5" stroke-linejoin="round"/>
      <g transform="rotate(12 228 76)">
        <path d="M184 78 C184 44 272 44 272 78 Z" fill="#fff" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <rect x="178" y="70" width="100" height="18" rx="9" fill="#2d77b6" stroke="${T}" stroke-width="5"/>
        <path d="M262 82 l22 14 l-6 -18" fill="#2d77b6" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <text x="228" y="66" text-anchor="middle" font-family="Lilita One" font-size="20" fill="#2d77b6">★</text>
      </g>
    </g>
    <g fill="none" stroke="#fff" stroke-width="3.5">
      <circle class="bolhinha" cx="330" cy="120" r="10"/><circle class="bolhinha b2" cx="350" cy="80" r="6"/><circle class="bolhinha b3" cx="338" cy="44" r="8"/>
    </g>`;

  // O baiacu, piscando (o bichinho do canto)
  var espinhos = "";
  for (var i = 0; i < 14; i++) {
    var a = i / 14 * Math.PI * 2;
    var x = 96 + Math.cos(a) * 62, y = 106 + Math.sin(a) * 62;
    espinhos += `<path d="M${x - Math.sin(a) * 7} ${y + Math.cos(a) * 7} L${96 + Math.cos(a) * 80} ${106 + Math.sin(a) * 80} L${x + Math.sin(a) * 7} ${y - Math.cos(a) * 7} Z"/>`;
  }
  var BAIACU = `<svg viewBox="0 0 200 200">
    <g class="flutua">
      <path d="M150 106 L190 80 L184 106 L190 132 Z" fill="#ffc94d" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <g fill="#fff3c4" stroke="${T}" stroke-width="3.5" stroke-linejoin="round">${espinhos}</g>
      <circle cx="96" cy="106" r="64" fill="#ffd966" stroke="${T}" stroke-width="5"/>
      <path d="M44 126 C60 162 132 162 148 126 C132 146 60 146 44 126 Z" fill="#fff3c4"/>
      <path d="M120 112 C140 100 150 116 136 126" fill="#ffc94d" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="54" cy="114" rx="11" ry="7" fill="#ff8e7a" opacity=".6"/>
      <ellipse cx="106" cy="118" rx="11" ry="7" fill="#ff8e7a" opacity=".6"/>
      <ellipse cx="62" cy="92" rx="9" ry="11" fill="${T}"/><circle cx="59" cy="88" r="3.5" fill="#fff"/>
      <path d="M88 92 q10 -10 20 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="80" cy="118" rx="7" ry="6" fill="#c2384f" stroke="${T}" stroke-width="3.5"/>
    </g></svg>`;

  function peixe(cor, listra) {
    return `<svg viewBox="0 0 90 56">
      <path d="M62 28 L88 10 L84 28 L88 46 Z" fill="${cor}" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="38" cy="28" rx="32" ry="22" fill="${cor}" stroke="${T}" stroke-width="3"/>
      <path d="M44 8 C46 18 46 38 44 48" fill="none" stroke="${listra}" stroke-width="7"/>
      <path d="M32 6 C40 0 52 2 56 10" fill="${cor}" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="20" cy="24" r="5" fill="${T}"/><circle cx="18.5" cy="22.5" r="1.8" fill="#fff"/>
      <path d="M10 34 q4 3 8 0" fill="none" stroke="${T}" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
  }
  var BOLHA = `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="3"/><path d="M11 16 C12 12 15 10 18 9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`;

  // Algas balançando, enraizadas em (x, y)
  function alga(x, y, h, cor, atraso) {
    return `<path class="balanca" style="animation-delay:${atraso}s" d="M${x} ${y} C${x - 20} ${y - h * .3} ${x + 22} ${y - h * .55} ${x} ${y - h * .8} C${x - 12} ${y - h * .9} ${x - 6} ${y - h} ${x + 4} ${y - h}" fill="none" stroke="${cor}" stroke-width="12" stroke-linecap="round"/>`;
  }
  function algas(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})">${alga(0, 0, 220, "#3fae86", 0)}${alga(26, 0, 170, "#5cc79a", .7)}${alga(-24, 0, 140, "#2e9a74", 1.3)}${alga(50, 0, 120, "#3fae86", .4)}</g>`;
  }

  // Coral ramificado, base em (x, y)
  function coral(x, y, s, cor) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0 0 V-60 M0 -40 C-30 -50 -36 -80 -34 -100 M0 -60 C24 -76 30 -96 26 -120 M-18 -62 C-46 -66 -56 -60 -64 -80 M14 -88 C36 -90 44 -100 52 -110 M0 -60 V-110" stroke="${T}" stroke-width="22"/>
      <path d="M0 0 V-60 M0 -40 C-30 -50 -36 -80 -34 -100 M0 -60 C24 -76 30 -96 26 -120 M-18 -62 C-46 -66 -56 -60 -64 -80 M14 -88 C36 -90 44 -100 52 -110 M0 -60 V-110" stroke="${cor}" stroke-width="13"/>
    </g>`;
  }

  // Raios de luz descendo do topo
  var raios = "";
  [8, 24, 44, 62, 80].forEach(function (x, i) {
    raios += `<polygon points="${x * 19.2},0 ${x * 19.2 + 90},0 ${x * 19.2 + 260},900 ${x * 19.2 + 60},900" fill="#fff" opacity="${i % 2 ? .07 : .1}"/>`;
  });

  tema({
    nome: "Rafael",
    frase: "mergulho de cabeça em tudo",
    foto: "../clientes/exemplo/perfil-masculino.jpg",
    gostos: ["surf", "mergulho", "praia", "games"],
    sobre: "Se tem mar, eu tô perto. Mergulho desde moleque e ainda fico bobo toda vez que um peixe passa do meu lado. Fora d'água, é video game e música alta.",
    fontes: "family=Lilita+One&family=Varela+Round",
    cores: {
      "fundo-1": "#3cc3cf", "fundo-2": "#0f5d82", tinta: T, papel: "#f3fdff", "papel-2": "#d3f2f5",
      destaque: "#ff8e7a", botao: "#7fd6dc", sombra: "#0b2f45",
      "fonte-titulo": '"Lilita One", sans-serif', "fonte-texto": '"Varela Round", sans-serif', raio: "22px", borda: "4px"
    },
    css: `
      .ceu .raios { position: absolute; inset: 0; width: 100%; height: 100%; animation: raios 9s ease-in-out infinite alternate; }
      @keyframes raios { to { transform: translateX(-60px); } }
      .ceu .areia { position: absolute; left: 0; bottom: 0; width: 100%; height: 90px; }
      .ceu .algas-esq { position: absolute; left: 0; bottom: 20px; width: 260px; height: 300px; }
      .ceu .algas-dir { position: absolute; right: 0; bottom: 20px; width: 260px; height: 300px; }
      .logo, .cartao-nome, .perfil-nome, .painel-sobre h2, .hora { letter-spacing: .02em; }
      .aba { background: #2d77b6; color: #fff; border-radius: 14px 14px 0 0; letter-spacing: .1em; }
      .aba.ativa { color: var(--tinta); }
      .relogio, .cracha, .cartao {
        background-color: var(--papel);
        background-image: radial-gradient(circle, ${LATAO} 4px, ${T} 5px, transparent 6px), radial-gradient(circle, ${LATAO} 4px, ${T} 5px, transparent 6px),
          radial-gradient(circle, ${LATAO} 4px, ${T} 5px, transparent 6px), radial-gradient(circle, ${LATAO} 4px, ${T} 5px, transparent 6px);
        background-size: 14px 14px; background-repeat: no-repeat;
        background-position: 8px 8px, calc(100% - 8px) 8px, 8px calc(100% - 8px), calc(100% - 8px) calc(100% - 8px);
      }
      .relogio { background-color: ${T}; color: #7ff0f0; padding: 14px 26px 18px; }
      .relogio .hora { text-shadow: 0 0 14px rgba(127,240,240,.6); }
      .relogio .data { color: #d3f2f5; font-size: 14px; }
      .cracha-foto { box-shadow: 0 0 0 7px ${LATAO}, 0 0 0 10px ${T}; }
      .cartao { padding-top: 28px; }
      .arte { aspect-ratio: 1; border-radius: 50%; border-width: 5px; box-shadow: 0 0 0 9px ${LATAO}, 0 0 0 13px ${T}; margin: 10px; }
      .cartao-nome { margin-top: 22px; }
      .entrar { background: var(--destaque); }
      .fala { border-radius: 24px 24px 24px 4px; }
      .tent { transform-box: fill-box; transform-origin: 50% 0; animation: tent 2.6s ease-in-out infinite; }
      @keyframes tent { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
      .bolhinha { animation: bolhinha 2.4s ease-in infinite; }
      .b2 { animation-delay: .8s; } .b3 { animation-delay: 1.6s; }
      @keyframes bolhinha { from { opacity: 0; transform: translateY(40px); } 30% { opacity: 1; } to { opacity: 0; transform: translateY(-40px); } }
      .passa.bolha > svg { animation: boia 3s ease-in-out infinite; }
    `,
    decor: `<svg class="raios" viewBox="0 0 1920 900" preserveAspectRatio="none">${raios}</svg>
      <svg class="algas-esq" viewBox="0 0 260 300">${algas(60, 300, 1)}${algas(170, 300, .7)}</svg>
      <svg class="algas-dir" viewBox="0 0 260 300">${algas(90, 300, .8)}${algas(200, 300, 1.05)}</svg>
      <svg class="areia" viewBox="0 0 1920 90" preserveAspectRatio="none"><path d="M0 40 C300 10 600 50 960 30 C1300 10 1600 50 1920 26 V90 H0 Z" fill="#f2d79b"/><path d="M0 40 C300 10 600 50 960 30 C1300 10 1600 50 1920 26" fill="none" stroke="${T}" stroke-width="3" opacity=".4"/></svg>`,
    passando: [
      { html: BOLHA, qtd: 14, dur: 16, tam: [14, 34], classe: "sobe bolha" },
      { html: peixe("#ffd966", "#fff"), qtd: 3, dur: 26, topo: [10, 70], tam: [60, 90] },
      { html: peixe("#ff8e7a", "#fff3c4"), qtd: 3, dur: 32, topo: [15, 80], tam: [50, 80] },
      { html: peixe("#b48cff", "#fff"), qtd: 2, dur: 38, topo: [20, 60], tam: [40, 60] }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 300">
        <defs><linearGradient id="agua-e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe3ea"/><stop offset="1" stop-color="#3cb6c9"/></linearGradient></defs>
        <rect width="300" height="300" fill="url(#agua-e)"/>
        <path d="M0 250 C80 236 200 258 300 240 V300 H0 Z" fill="#f2d79b"/>
        ${algas(40, 280, .45)}${algas(262, 286, .38)}
        <g transform="translate(52 42) scale(.5)">${POLVO}</g>
      </svg>`,
      titulo: "Rafael",
      botao: "mergulhar"
    },
    // Dentro da janela: água clara, areia, corais, algas, conchas e uma estrela-do-mar
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <defs><linearGradient id="agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3fbfb"/><stop offset="1" stop-color="#9fe2e8"/></linearGradient></defs>
      <rect width="880" height="620" fill="url(#agua)" opacity=".75"/>
      <g fill="#fff" opacity=".35"><polygon points="120,0 190,0 330,620 220,620"/><polygon points="560,0 610,0 720,620 640,620"/></g>
      ${algas(60, 520, .9)}${algas(820, 500, .75)}
      ${coral(150, 520, 1, "#ff8fb8")}${coral(740, 520, .8, "#ffb067")}
      <path d="M0 500 C150 470 300 494 440 480 C600 462 740 492 880 470 V620 H0 Z" fill="#f2d79b"/>
      <path d="M0 500 C150 470 300 494 440 480 C600 462 740 492 880 470" fill="none" stroke="${T}" stroke-width="4"/>
      <g fill="#e2c07e"><circle cx="90" cy="560" r="4"/><circle cx="330" cy="590" r="3"/><circle cx="610" cy="560" r="4"/><circle cx="790" cy="590" r="3"/><circle cx="500" cy="600" r="3"/></g>
      <g transform="translate(96 568) rotate(-12)">
        <path d="M0 -26 L8 -8 L28 -8 L12 4 L18 24 L0 12 L-18 24 L-12 4 L-28 -8 L-8 -8 Z" fill="#ffb067" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <circle cx="-5" cy="-2" r="2.5" fill="${T}"/><circle cx="5" cy="-2" r="2.5" fill="${T}"/>
      </g>
      <g transform="translate(790 560)">
        <path d="M-30 14 C-34 -20 34 -20 30 14 Z" fill="#ffe3e8" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M0 14 V-12 M-14 14 L-20 -6 M14 14 L20 -6" stroke="${T}" stroke-width="3" opacity=".5"/>
      </g>
      <ellipse cx="660" cy="540" rx="36" ry="18" fill="#9fb3bf" stroke="${T}" stroke-width="4"/>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${POLVO}</svg>`,
    mini: BAIACU,
    fala: "blub blub!<br>clica em mim",
    particulas: [BOLHA, "♥", BOLHA]
  });
})();
