// 08 · Futebol à noite (rubro-negro): estádio com refletores, bola fofa de chuteira, placar de LED
(function () {
  var T = "#140a0d";
  var V = "#e01b2c";

  // Número pseudoaleatório fixo, para a torcida sair igual em toda imagem
  function sorte(n) { var x = Math.sin(n * 91.7) * 4375.85; return x - Math.floor(x); }

  // A bola (desenhada em 400×400)
  var BOLA = `
    <defs><clipPath id="bola08"><circle cx="200" cy="196" r="128"/></clipPath></defs>
    <g class="respira">
      <path d="M168 300 L162 352 M232 300 L238 352" stroke="${T}" stroke-width="12" stroke-linecap="round"/>
      <g id="chuteira08">
        <path d="M124 366 C124 346 148 342 168 348 L180 352 C192 358 190 384 172 384 L134 384 C124 384 122 376 124 366 Z" fill="#1d1a1c" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M140 352 L150 370 M154 350 L162 368" stroke="${V}" stroke-width="5" stroke-linecap="round"/>
        <g fill="${T}"><rect x="132" y="383" width="8" height="8" rx="2"/><rect x="150" y="383" width="8" height="8" rx="2"/><rect x="168" y="383" width="8" height="8" rx="2"/></g>
      </g>
      <use href="#chuteira08" transform="translate(400 0) scale(-1 1)"/>
      <circle cx="200" cy="196" r="128" fill="#fffdf8"/>
      <g clip-path="url(#bola08)">
        <g fill="#2a2427">
          <path d="M200 58 L232 82 L220 118 L180 118 L168 82 Z"/>
          <path d="M60 172 L92 160 L112 190 L94 222 L62 214 Z"/>
          <path d="M340 172 L308 160 L288 190 L306 222 L338 214 Z"/>
          <path d="M150 330 L172 304 L228 304 L250 330 L200 352 Z"/>
        </g>
        <g fill="none" stroke="#2a2427" stroke-width="4" opacity=".55">
          <path d="M168 82 L120 82 L92 160 M232 82 L280 82 L308 160 M112 190 L134 260 L172 304 M288 190 L266 260 L228 304 M94 222 L80 290 M306 222 L320 290"/>
        </g>
      </g>
      <circle cx="200" cy="196" r="128" fill="none" stroke="${T}" stroke-width="6"/>
      <path d="M150 104 C170 92 196 88 214 90" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".8"/>
      <path d="M318 150 C336 136 362 132 372 140 M318 164 C344 164 362 180 362 196" fill="none" stroke="${T}" stroke-width="16" stroke-linecap="round"/>
      <path d="M318 150 C336 136 362 132 372 140 M318 164 C344 164 362 180 362 196" fill="none" stroke="${V}" stroke-width="8" stroke-linecap="round"/>
      <path d="M76 152 C140 120 260 120 324 152 L320 182 C258 152 142 152 80 182 Z" fill="${V}" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M78 166 C140 136 260 136 322 166" fill="none" stroke="${T}" stroke-width="7"/>
      <ellipse cx="130" cy="258" rx="19" ry="10" fill="#ff7a8a" opacity=".5"/>
      <ellipse cx="270" cy="258" rx="19" ry="10" fill="#ff7a8a" opacity=".5"/>
      <path d="M144 194 Q160 184 176 194 M224 194 Q240 184 256 194" fill="none" stroke="${T}" stroke-width="5.5" stroke-linecap="round"/>
      <g class="pisca">
        <ellipse cx="160" cy="226" rx="16" ry="20" fill="${T}"/><circle cx="154" cy="218" r="6.5" fill="#fff"/><circle cx="166" cy="234" r="3" fill="#fff"/>
        <ellipse cx="240" cy="226" rx="16" ry="20" fill="${T}"/><circle cx="234" cy="218" r="6.5" fill="#fff"/><circle cx="246" cy="234" r="3" fill="#fff"/>
      </g>
      <path d="M178 258 Q200 286 222 258 Z" fill="#b0283a" stroke="${T}" stroke-width="4.5" stroke-linejoin="round"/>
    </g>`;

  // Escudo inventado: listras rubro-negras, a inicial e uma estrela
  function escudo(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <defs><clipPath id="esc08-${x}"><path d="M0 -60 L52 -46 L48 8 C42 38 22 56 0 66 C-22 56 -42 38 -48 8 L-52 -46 Z"/></clipPath></defs>
      <path d="M0 -60 L52 -46 L48 8 C42 38 22 56 0 66 C-22 56 -42 38 -48 8 L-52 -46 Z" fill="${V}"/>
      <g clip-path="url(#esc08-${x})" fill="#1d1a1c"><rect x="-60" y="-70" width="20" height="140"/><rect x="-20" y="-70" width="20" height="140"/><rect x="20" y="-70" width="20" height="140"/></g>
      <rect x="-50" y="-22" width="100" height="36" fill="#fffdf8"/>
      <text x="0" y="8" text-anchor="middle" font-family="Anton" font-size="32" fill="${T}">R·10</text>
      <path d="M0 -60 L52 -46 L48 8 C42 38 22 56 0 66 C-22 56 -42 38 -48 8 L-52 -46 Z" fill="none" stroke="${T}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M0 -94 L7 -80 L22 -79 L11 -69 L14 -54 L0 -62 L-14 -54 L-11 -69 L-22 -79 L-7 -80 Z" fill="#ffd34d" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
    </g>`;
  }

  // Troféu piscando (o bichinho pequeno do canto)
  var TROFEU = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <ellipse cx="100" cy="190" rx="56" ry="8" fill="#000" opacity=".3"/>
      <path d="M54 56 C14 52 18 112 66 108 M146 56 C186 52 182 112 134 108" fill="none" stroke="${T}" stroke-width="16" stroke-linecap="round"/>
      <path d="M54 56 C14 52 18 112 66 108 M146 56 C186 52 182 112 134 108" fill="none" stroke="#f5c542" stroke-width="7" stroke-linecap="round"/>
      <rect x="86" y="128" width="28" height="34" fill="#e0a92e" stroke="${T}" stroke-width="5"/>
      <rect x="58" y="158" width="84" height="28" rx="6" fill="#1d1a1c" stroke="${T}" stroke-width="5"/>
      <rect x="76" y="166" width="48" height="12" rx="3" fill="${V}"/>
      <path d="M46 34 H154 C154 106 128 134 100 134 C72 134 46 106 46 34 Z" fill="#f5c542" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M60 46 C60 76 66 96 78 110" fill="none" stroke="#fff3c4" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="76" cy="92" rx="10" ry="6" fill="#ff7a8a" opacity=".55"/>
      <ellipse cx="124" cy="92" rx="10" ry="6" fill="#ff7a8a" opacity=".55"/>
      <ellipse cx="84" cy="74" rx="7" ry="9" fill="${T}"/><circle cx="81" cy="70" r="3" fill="#fff"/>
      <path d="M108 74 q8 -9 16 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 96 q8 9 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M150 18 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" fill="#fff3c4"/>
    </g></svg>`;

  var FLAMULA = `<svg viewBox="0 0 80 64"><path d="M7 4 V62" stroke="#d9d2cc" stroke-width="4" stroke-linecap="round"/><path d="M9 6 L76 22 L9 38 Z" fill="${V}" stroke="${T}" stroke-width="3" stroke-linejoin="round"/><path d="M9 14 L44 22 L9 30 Z" fill="#1d1a1c"/></svg>`;
  var BOLINHA = `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#fffdf8" stroke="${T}" stroke-width="3"/><path d="M20 10 L28 16 L25 25 H15 L12 16 Z" fill="#2a2427"/><path d="M20 10 V3 M28 16 L35 13 M25 25 L30 32 M15 25 L10 32 M12 16 L5 13" stroke="#2a2427" stroke-width="2.5"/></svg>`;
  function confete(cor) { return `<svg viewBox="0 0 10 14"><rect width="10" height="14" rx="1.5" fill="${cor}"/></svg>`; }

  // Torcida em silhueta: fileiras de cabeças, algumas com braço levantado
  function torcida(x0, y0, largura, fileiras, passo, cores) {
    var s = "";
    for (var f = 0; f < fileiras; f++) {
      for (var x = x0 + (f % 2) * passo / 2; x < x0 + largura; x += passo) {
        var n = x * 7 + f * 131;
        var cor = cores[Math.floor(sorte(n) * cores.length)];
        var y = y0 + f * passo * .9 + sorte(n + 3) * 4;
        s += `<circle cx="${x}" cy="${y}" r="${passo * .32}" fill="${cor}"/><rect x="${x - passo * .42}" y="${y + passo * .26}" width="${passo * .84}" height="${passo}" rx="${passo * .3}" fill="${cor}"/>`;
        if (sorte(n + 9) > .82) s += `<path d="M${x + passo * .3} ${y + passo * .4} L${x + passo * .5} ${y - passo * .7}" stroke="${cor}" stroke-width="${passo * .2}" stroke-linecap="round"/>`;
      }
    }
    return s;
  }

  // Refletor: torre, grade de lâmpadas e o facho de luz
  function refletor(x, y, lado, alcance) {
    var lamp = "";
    for (var i = 0; i < 4; i++) for (var j = 0; j < 3; j++) lamp += `<circle cx="${x - 30 + i * 20}" cy="${y + 12 + j * 18}" r="7" fill="#fff8d6"/>`;
    return `<polygon points="${x - 40},${y + 30} ${x + 40},${y + 30} ${x + lado * alcance + 260},${y + 900} ${x + lado * alcance - 260},${y + 900}" fill="url(#facho08)" class="facho"/>
      <rect x="${x - 4}" y="${y + 60}" width="8" height="900" fill="#0a0812"/>
      <rect x="${x - 44}" y="${y}" width="88" height="66" rx="6" fill="#0a0812" stroke="#3a2a3a" stroke-width="3"/>${lamp}`;
  }

  var estrelas = "";
  for (var e = 0; e < 70; e++) estrelas += `<circle cx="${sorte(e) * 1920}" cy="${sorte(e + 50) * 420}" r="${1 + sorte(e + 99) * 1.6}" fill="#fff" opacity="${.3 + sorte(e + 7) * .6}"/>`;

  var faixa = "";
  for (var k = 0; k < 6; k++) faixa += `<text x="${k * 300 + 10}" y="404" font-family="Anton" font-size="22" letter-spacing="2" fill="${k % 2 ? "#fffdf8" : V}">RAFAEL ★ CAMISA 10 ★</text>`;

  var gramado = "";
  for (var g = 0; g < 7; g++) gramado += `<rect x="0" y="${418 + g * 30}" width="880" height="30" fill="${g % 2 ? "#2b7d3c" : "#32904a"}"/>`;

  tema({
    nome: "Rafael",
    frase: "é dia de jogo, é dia de festa",
    foto: "../clientes/exemplo/perfil-masculino.jpg",
    gostos: ["futebol", "arquibancada", "churrasco", "camisa 10"],
    sobre: "Arquibancada é minha segunda casa. Se tem jogo, eu tô lá: cantando do primeiro ao último minuto, ganhando ou perdendo.",
    fontes: "family=Anton&family=Oswald:wght@400;600;700&family=Orbitron:wght@700;900",
    cores: {
      "fundo-1": "#070914", "fundo-2": "#2c0a12", tinta: T, papel: "#fbf6f0", "papel-2": "#f3dfdc",
      destaque: V, botao: V, "botao-texto": "#fffdf8", sombra: V, borda: "4px", raio: "8px",
      "fonte-titulo": '"Anton", sans-serif', "fonte-texto": '"Oswald", sans-serif'
    },
    css: `
      .decor svg { position: absolute; inset: 0; width: 100%; height: 100%; }
      .facho { animation: facho 5s ease-in-out infinite; transform-box: fill-box; }
      @keyframes facho { 50% { opacity: .55; } }
      .passa.rola > svg { animation: gira 2.4s linear infinite reverse; }

      /* Entrada: ingresso com picote e os recortes laterais */
      .entrada { filter: drop-shadow(8px 8px 0 ${V}); }
      .cartao { position: relative; box-shadow: none; padding-bottom: 20px;
        -webkit-mask: radial-gradient(circle at 0 314px, transparent 15px, #000 16px) left / 51% 100% no-repeat,
                      radial-gradient(circle at 100% 314px, transparent 15px, #000 16px) right / 51% 100% no-repeat; }
      .arte { border-radius: 4px; }
      .cartao-nome { margin: 16px -22px 12px; padding-top: 14px; border-top: 3px dashed ${T}; font-size: 40px; letter-spacing: .04em; text-transform: uppercase; }
      .cartao-nome::after { content: "setor norte · fila 10 · cadeira 7"; display: block; margin-top: 6px; font-family: Oswald; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; opacity: .7; }
      .entrar { border-radius: 4px; font-family: Oswald; font-weight: 700; letter-spacing: .2em; box-shadow: 0 5px 0 ${T}; }

      .aba { font-family: Oswald; font-weight: 700; letter-spacing: .14em; background: #1d1a1c; color: #fffdf8; border-radius: 6px 6px 0 0; }
      .aba.ativa { background: ${V}; color: #fffdf8; }
      .fala { font-family: Oswald; font-weight: 600; text-transform: uppercase; border-radius: 10px 10px 10px 2px; }
      .chao { opacity: .35; background: #0b2a12; }
      .perfil-nome, .painel-sobre h2 { text-transform: uppercase; letter-spacing: .02em; }

      /* Relógio: placar de estádio com LED */
      .relogio { background: #0d0b0e radial-gradient(#ffffff10 1px, transparent 1.5px) 0 0 / 6px 6px; color: #ff4430; border-color: #2c2629; box-shadow: 6px 6px 0 ${V}; padding-top: 10px; }
      .relogio::before { content: "CASA  3  ×  0  VISITANTE"; display: block; margin: 0 6px 8px; padding: 3px 0 5px; border-bottom: 2px solid #2c2629; font-family: Oswald; font-weight: 700; font-size: 15px; letter-spacing: .14em; color: #ffd34d; white-space: pre; }
      .hora { font-family: Orbitron; font-weight: 900; font-size: 52px; text-shadow: 0 0 12px #ff3a2a, 0 0 2px #ff9a8a; }
      .ss { font-size: 22px; opacity: .85; }
      .data { color: #f3e9e4; font-family: Oswald; font-weight: 400; text-transform: uppercase; letter-spacing: .08em; font-size: 14px; }

      .cracha { overflow: hidden; }
      .cracha::after { content: "10"; position: absolute; right: -6px; bottom: -34px; font-family: Anton; font-size: 150px; color: ${V}; opacity: .1; pointer-events: none; }
      .cracha-foto { border-radius: 10px; box-shadow: 0 0 0 5px ${V}; }
      .logo { font-size: 44px; letter-spacing: .04em; text-transform: uppercase; }
      .cracha-frase { text-transform: uppercase; letter-spacing: .06em; font-size: 14px; }
    `,
    decor: `<svg viewBox="0 0 1920 900" preserveAspectRatio="xMidYMax slice">
      <defs><linearGradient id="facho08" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".34"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient></defs>
      ${estrelas}
      ${refletor(120, 40, 1, 420)}${refletor(1800, 40, -1, 420)}
      <path d="M0 760 Q960 700 1920 760 V900 H0 Z" fill="#12070c"/>
      ${torcida(-10, 772, 1940, 5, 34, ["#1b0b11", "#24101a", "#3a0f18", "#1b0b11"])}
    </svg>`,
    passando: [
      { html: FLAMULA, qtd: 5, dur: 34, topo: [6, 60], tam: [56, 84] },
      { html: BOLINHA, qtd: 2, dur: 20, topo: [74, 88], tam: [40, 54], classe: "rola" },
      { html: confete(V), qtd: 10, dur: 13, tam: [8, 13], classe: "cai" },
      { html: confete("#fffdf8"), qtd: 8, dur: 15, tam: [8, 12], classe: "cai" },
      { html: confete("#ffd34d"), qtd: 4, dur: 14, tam: [7, 11], classe: "cai" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <defs><linearGradient id="ceu08" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0d22"/><stop offset="1" stop-color="#3a0d18"/></linearGradient></defs>
        <rect width="300" height="324" fill="url(#ceu08)"/>
        <polygon points="40,20 70,20 210,324 -60,324" fill="#fff6c8" opacity=".14"/>
        <polygon points="230,20 260,20 360,324 90,324" fill="#fff6c8" opacity=".14"/>
        <g fill="#fff8d6"><circle cx="48" cy="22" r="5"/><circle cx="62" cy="22" r="5"/><circle cx="238" cy="22" r="5"/><circle cx="252" cy="22" r="5"/></g>
        <rect x="0" y="262" width="300" height="62" fill="#2b7d3c"/><rect x="0" y="282" width="300" height="20" fill="#32904a"/>
        <path d="M0 262 H300" stroke="#fff" stroke-width="3" opacity=".7"/>
        ${escudo(56, 92, .62)}
        <text x="104" y="74" font-family="Anton" font-size="26" fill="#fffdf8" letter-spacing="1">INGRESSO</text>
        <text x="104" y="98" font-family="Oswald" font-weight="600" font-size="14" fill="#ffd34d" letter-spacing="2">CLÁSSICO · 21H30</text>
        <g transform="translate(78 128) scale(.4)">${BOLA}</g>
      </svg>`,
      titulo: "Rafael",
      botao: "entrar em campo"
    },
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="noite08" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0d22"/><stop offset="1" stop-color="#2a0c16"/></linearGradient>
        <linearGradient id="luz08" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".32"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="880" height="620" fill="url(#noite08)"/>
      ${estrelas.replace(/cy="(\d+(\.\d+)?)/g, function (m, y) { return 'cy="' + y * .4; })}
      <rect x="0" y="236" width="880" height="150" fill="#12070c"/>
      ${torcida(-6, 250, 900, 5, 26, ["#170910", "#200d16", "#3a0e1a", "#170910", "#4a111d"])}
      <rect x="0" y="380" width="880" height="38" fill="#0d0b0e"/>
      ${faixa}
      <path d="M0 380 H880 M0 418 H880" stroke="${T}" stroke-width="4"/>
      ${gramado}
      <path d="M0 440 H880 M440 440 V620" stroke="#fff" stroke-width="4" opacity=".75"/>
      <ellipse cx="440" cy="560" rx="210" ry="56" fill="none" stroke="#fff" stroke-width="4" opacity=".75"/>
      <g transform="translate(70 26)">
        <rect x="-4" y="60" width="8" height="190" fill="#0a0812"/>
        <rect x="-44" y="0" width="88" height="64" rx="6" fill="#0a0812" stroke="#3a2a3a" stroke-width="3"/>
        <g fill="#fff8d6">${[0, 1, 2, 3].map(function (i) { return [0, 1, 2].map(function (j) { return `<circle cx="${-30 + i * 20}" cy="${12 + j * 18}" r="7"/>`; }).join(""); }).join("")}</g>
        <polygon points="-40,40 40,40 420,594 60,594" fill="url(#luz08)" class="facho"/>
      </g>
      <g transform="translate(810 26)">
        <rect x="-4" y="60" width="8" height="190" fill="#0a0812"/>
        <rect x="-44" y="0" width="88" height="64" rx="6" fill="#0a0812" stroke="#3a2a3a" stroke-width="3"/>
        <g fill="#fff8d6">${[0, 1, 2, 3].map(function (i) { return [0, 1, 2].map(function (j) { return `<circle cx="${-30 + i * 20}" cy="${12 + j * 18}" r="7"/>`; }).join(""); }).join("")}</g>
        <polygon points="-40,40 40,40 -60,594 -420,594" fill="url(#luz08)" class="facho"/>
      </g>
      ${escudo(170, 160, .8)}
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${BOLA}</svg>`,
    mini: TROFEU,
    logo: "Rafael",
    fala: "bora pro jogo?<br>clica em mim!",
    particulas: ["★", BOLINHA, "★", "♥"]
  });
})();
