// 02 · Morango: hamster abraçando um morango gigante, piquenique, morangos e corações passando
(function () {
  var T = "#6b2d3a";

  // Morango com folhinhas, centrado em (0, 0), uns 150 de largura
  function morango(com) {
    return `
      <path d="M0 -58 C-50 -70 -78 -46 -76 -8 C-72 34 -32 70 0 78 C32 70 72 34 76 -8 C78 -46 50 -70 0 -58 Z" fill="#ff5f72" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-56 -30 C-60 -6 -50 14 -36 26" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".45"/>
      <g fill="#ffe08a" stroke="${T}" stroke-width="1.5">
        <ellipse cx="-40" cy="-26" rx="4" ry="6"/><ellipse cx="-8" cy="-34" rx="4" ry="6"/><ellipse cx="28" cy="-28" rx="4" ry="6"/><ellipse cx="52" cy="-4" rx="4" ry="6"/>
        <ellipse cx="-50" cy="8" rx="4" ry="6"/><ellipse cx="38" cy="26" rx="4" ry="6"/><ellipse cx="-22" cy="40" rx="4" ry="6"/><ellipse cx="12" cy="52" rx="4" ry="6"/>
        ${com ? "" : '<ellipse cx="-14" cy="-4" rx="4" ry="6"/><ellipse cx="18" cy="6" rx="4" ry="6"/>'}
      </g>
      <g fill="#7cc46b" stroke="${T}" stroke-width="4" stroke-linejoin="round">
        <path d="M0 -60 L-44 -74 L-22 -54 Z"/><path d="M0 -60 L44 -74 L22 -54 Z"/>
        <path d="M0 -60 L-24 -86 L-6 -56 Z"/><path d="M0 -60 L24 -86 L6 -56 Z"/>
      </g>
      <path d="M0 -62 C0 -76 4 -86 12 -92" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>`;
  }

  // O hamster (desenhado em 400×400)
  var HAMSTER = `
    <g class="respira">
      <ellipse cx="140" cy="384" rx="34" ry="14" fill="#ffc2ca" stroke="${T}" stroke-width="5"/>
      <ellipse cx="260" cy="384" rx="34" ry="14" fill="#ffc2ca" stroke="${T}" stroke-width="5"/>
      <circle cx="104" cy="132" r="36" fill="#f2b984" stroke="${T}" stroke-width="5"/>
      <circle cx="104" cy="134" r="19" fill="#ffb3bf"/>
      <circle cx="296" cy="132" r="36" fill="#f2b984" stroke="${T}" stroke-width="5"/>
      <circle cx="296" cy="134" r="19" fill="#ffb3bf"/>
      <path d="M200 104 C292 104 342 172 342 262 C342 342 292 382 200 382 C108 382 58 342 58 262 C58 172 108 104 200 104 Z" fill="#f2b984" stroke="${T}" stroke-width="5"/>
      <path d="M200 150 C270 150 318 196 318 250 C318 312 266 352 200 352 C134 352 82 312 82 250 C82 196 130 150 200 150 Z" fill="#fff4e8"/>
      <path d="M176 112 C184 124 196 126 200 116 C204 126 216 124 224 112" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round" opacity=".5"/>
      <ellipse cx="122" cy="236" rx="22" ry="12" fill="#ff8d9c" opacity=".55"/>
      <ellipse cx="278" cy="236" rx="22" ry="12" fill="#ff8d9c" opacity=".55"/>
      <g class="pisca">
        <ellipse cx="156" cy="204" rx="15" ry="18" fill="${T}"/><circle cx="150" cy="197" r="6" fill="#fff"/><circle cx="161" cy="211" r="2.5" fill="#fff"/>
        <ellipse cx="244" cy="204" rx="15" ry="18" fill="${T}"/><circle cx="238" cy="197" r="6" fill="#fff"/><circle cx="249" cy="211" r="2.5" fill="#fff"/>
      </g>
      <path d="M193 224 H207 L200 232 Z" fill="#ff7d90" stroke="${T}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M186 238 q7 9 14 0 q7 9 14 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
      <g transform="translate(200 336) scale(.9)">${morango()}</g>
      <ellipse cx="134" cy="316" rx="24" ry="20" fill="#f2b984" stroke="${T}" stroke-width="5"/>
      <ellipse cx="266" cy="316" rx="24" ry="20" fill="#f2b984" stroke="${T}" stroke-width="5"/>
      <path d="M126 306 v10 M136 304 v12 M274 306 v10 M264 304 v12" stroke="${T}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    </g>`;

  // O morango pequeno, piscando (o bichinho do canto)
  var MORANGUINHO = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <ellipse cx="100" cy="188" rx="54" ry="8" fill="${T}" opacity=".15"/>
      <g transform="translate(100 106) scale(1.05)">${morango(true)}</g>
      <ellipse cx="68" cy="118" rx="11" ry="7" fill="#fff" opacity=".45"/>
      <ellipse cx="132" cy="118" rx="11" ry="7" fill="#fff" opacity=".45"/>
      <ellipse cx="80" cy="102" rx="8" ry="10" fill="${T}"/><circle cx="77" cy="98" r="3" fill="#fff"/>
      <path d="M112 102 q10 -10 20 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 122 q8 9 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
    </g></svg>`;

  var MORANGO_PEQ = `<svg viewBox="-90 -100 180 190">${morango(true)}</svg>`;
  var CORACAO = `<svg viewBox="0 0 40 36"><path d="M20 34 C4 22 0 14 4 8 C8 2 16 2 20 9 C24 2 32 2 36 8 C40 14 36 22 20 34 Z" fill="#ffb3bf" stroke="${T}" stroke-width="3" stroke-linejoin="round"/></svg>`;
  var NUVEM = `<svg viewBox="0 0 160 80"><path d="M28 70 C4 70 6 40 28 42 C26 18 60 10 72 30 C80 8 122 8 124 36 C150 32 156 70 132 70 Z" fill="#fffaf5" stroke="${T}" stroke-width="3" stroke-opacity=".2"/></svg>`;

  tema({
    nome: "Marina",
    frase: "doce igual morango ♥",
    foto: "../clientes/exemplo/perfil-feminino.jpg",
    gostos: ["morango", "piquenique", "doces", "domingo de sol"],
    sobre: "Gosto de coisa simples: toalha xadrez na grama, cesta cheia de fruta e gente querida em volta. Se for pra escolher sobremesa, é sempre a de morango.",
    fontes: "family=Sniglet:wght@400;800&family=Quicksand:wght@500;700",
    cores: {
      "fundo-1": "#fff4f3", "fundo-2": "#ffd8de", tinta: T, papel: "#fffaf5", "papel-2": "#ffe8ea",
      destaque: "#ff5f72", botao: "#ffb3bf", sombra: "#e8899a",
      "fonte-titulo": '"Sniglet", sans-serif', "fonte-texto": '"Quicksand", sans-serif', raio: "30px"
    },
    css: `
      .ceu { background-image:
        radial-gradient(circle, rgba(255,95,114,.17) 9px, transparent 10px),
        radial-gradient(circle, rgba(255,95,114,.10) 6px, transparent 7px);
        background-size: 72px 72px; background-position: 0 0, 36px 36px; }
      .hora, .logo, .cartao-nome, .perfil-nome, .painel-sobre h2 { font-weight: 800; }
      body { font-weight: 600; }
      .aba, .fala { font-weight: 400; }
      .abas { gap: 10px; left: 30px; }
      .aba { border-radius: 99px; border-bottom: var(--borda) solid var(--tinta); margin-bottom: 10px; padding: 7px 20px; box-shadow: 0 4px 0 var(--sombra); }
      .aba:hover { padding-bottom: 7px; transform: translateY(-2px); }
      .aba.ativa { padding-bottom: 7px; background: var(--destaque); color: #fff; }
      .relogio, .cracha { outline: 3px dashed var(--botao); outline-offset: -11px; }
      .relogio { padding: 18px 12px 16px; }
      .hora { color: var(--destaque); text-shadow: 3px 3px 0 var(--tinta); }
      .ss { color: var(--tinta); text-shadow: none; }
      .cartao { outline: 3px dashed var(--botao); outline-offset: -11px; position: relative; padding-top: 30px; }
      .cartao::before { content: "♥"; position: absolute; left: 50%; top: -24px; width: 44px; height: 44px; margin-left: -22px;
        border-radius: 50%; background: var(--destaque); color: #fff; border: var(--borda) solid var(--tinta);
        font-size: 24px; line-height: 40px; }
      .entrar { border-radius: 99px; background: var(--destaque); color: #fff; }
      .fala { border-radius: 26px 26px 26px 6px; }
      .passa.morango > svg { animation: balanca 3s ease-in-out infinite; transform-origin: 50% 0; }
    `,
    passando: [
      { html: NUVEM, qtd: 4, dur: 60, topo: [6, 60], tam: [140, 220] },
      { html: MORANGO_PEQ, qtd: 6, dur: 34, topo: [8, 88], tam: [34, 52], classe: "morango" },
      { html: CORACAO, qtd: 6, dur: 28, topo: [5, 92], tam: [20, 32] }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <rect width="300" height="324" fill="#ffe8ea"/>
        <path d="M0 250 C80 228 200 236 300 220 V324 H0 Z" fill="#cfe8b8"/>
        <g fill="rgba(255,95,114,.16)">${[0, 1, 2, 3, 4].map(function (r) { return [0, 1, 2, 3, 4].map(function (c) { return `<circle cx="${c * 72 + (r % 2) * 36}" cy="${r * 60 + 10}" r="8"/>`; }).join(""); }).join("")}</g>
        <g transform="translate(29 52) scale(.61)">${HAMSTER}</g>
        <text x="150" y="44" text-anchor="middle" font-family="Sniglet" font-weight="800" font-size="25" fill="${T}">pra você ♥</text>
      </svg>`,
      botao: "entrar"
    },
    // Dentro da janela: o morro, a toalha de piquenique, a cestinha e o pote de geleia
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <defs>
        <pattern id="xadrez" width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill="#fffaf5"/>
          <rect width="22" height="44" fill="#ff8a9a" opacity=".45"/><rect width="44" height="22" fill="#ff8a9a" opacity=".45"/>
        </pattern>
      </defs>
      <g transform="translate(130 130)">
        <g class="gira"><g stroke="#ffc94d" stroke-width="10" stroke-linecap="round">
          <path d="M0 -78 V-62 M0 62 V78 M-78 0 H-62 M62 0 H78 M-55 -55 L-44 -44 M44 44 L55 55 M-55 55 L-44 44 M44 -44 L55 -55"/>
        </g></g>
        <circle r="46" fill="#ffd966" stroke="${T}" stroke-width="5"/>
        <ellipse cx="-24" cy="10" rx="9" ry="5" fill="#ff8d9c" opacity=".6"/><ellipse cx="24" cy="10" rx="9" ry="5" fill="#ff8d9c" opacity=".6"/>
        <path d="M-20 -6 q6 -7 12 0 M8 -6 q6 -7 12 0 M-8 10 q8 8 16 0" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round"/>
      </g>
      <path d="M0 470 C180 420 420 444 880 404 V620 H0 Z" fill="#d7ecc2"/>
      <path d="M0 470 C180 420 420 444 880 404" fill="none" stroke="${T}" stroke-width="4" opacity=".35"/>
      <g fill="none" stroke="#9ccf86" stroke-width="4" stroke-linecap="round">
        <path d="M60 466 l-6 -16 M68 464 l2 -18 M800 420 l-6 -16 M808 418 l2 -18 M470 440 l-4 -14 M478 438 l2 -16"/>
      </g>
      <path d="M40 620 L110 500 H770 L840 620 Z" fill="url(#xadrez)" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <g transform="translate(150 470)">
        <path d="M-62 -40 C-62 -130 62 -130 62 -40" fill="none" stroke="${T}" stroke-width="16" stroke-linecap="round"/>
        <path d="M-62 -40 C-62 -130 62 -130 62 -40" fill="none" stroke="#d9a066" stroke-width="8" stroke-linecap="round"/>
        <g transform="translate(-30 -46) scale(.32)">${morango(true)}</g>
        <g transform="translate(14 -52) scale(.34) rotate(14)">${morango(true)}</g>
        <path d="M-78 -44 H78 L64 46 H-64 Z" fill="#e3ad72" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-74 -14 H74 M-70 14 H70 M-40 -44 L-34 46 M0 -44 V46 M40 -44 L34 46" stroke="${T}" stroke-width="3" opacity=".35"/>
        <rect x="-84" y="-54" width="168" height="18" rx="9" fill="#d9a066" stroke="${T}" stroke-width="5"/>
      </g>
      <g transform="translate(740 500)">
        <path d="M-40 -70 H40 V20 C40 40 -40 40 -40 20 Z" fill="#ff7d90" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M-30 -50 V10" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5"/>
        <path d="M-50 -76 C-30 -98 30 -98 50 -76 L44 -60 C20 -70 -20 -70 -44 -60 Z" fill="url(#xadrez)" stroke="${T}" stroke-width="4" stroke-linejoin="round"/>
        <rect x="-24" y="-36" width="48" height="36" rx="8" fill="#fffaf5" stroke="${T}" stroke-width="3"/>
        <text x="0" y="-9" text-anchor="middle" font-family="Sniglet" font-size="22" fill="#ff5f72">♥</text>
      </g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${HAMSTER}</svg>`,
    mini: MORANGUINHO,
    fala: "quer um morango?<br>clica em mim!",
    particulas: ["♥", `<svg viewBox="-90 -100 180 190">${morango(true)}</svg>`, "♥"]
  });
})();
