// 01 · Cafeteria: xícara fofinha com vapor, toalha xadrez, grãos de café passando
(function () {
  var T = "#5b3a2b";

  // A xícara (desenhada em 400×400)
  var XICARA = `
    <g class="respira">
      <ellipse cx="200" cy="352" rx="160" ry="30" fill="#fffaf3" stroke="${T}" stroke-width="5"/>
      <ellipse cx="200" cy="348" rx="96" ry="13" fill="#f0dcc6"/>
      <path d="M312 180 C392 168 396 286 296 292" fill="none" stroke="${T}" stroke-width="32" stroke-linecap="round"/>
      <path d="M312 180 C392 168 396 286 296 292" fill="none" stroke="#f8c3bb" stroke-width="20" stroke-linecap="round"/>
      <path d="M78 150 C78 262 116 342 200 342 C284 342 322 262 322 150 Z" fill="#f8c3bb" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M86 214 C126 230 274 230 314 214 L310 238 C270 254 130 254 90 238 Z" fill="#fffaf3" opacity=".9"/>
      <g fill="#e9897a"><circle cx="118" cy="232" r="5"/><circle cx="160" cy="240" r="5"/><circle cx="240" cy="240" r="5"/><circle cx="282" cy="232" r="5"/></g>
      <ellipse cx="200" cy="150" rx="122" ry="30" fill="#fffaf3" stroke="${T}" stroke-width="5"/>
      <ellipse cx="200" cy="154" rx="104" ry="21" fill="#8a5a3e"/>
      <path d="M200 166 C170 150 176 136 190 140 C196 142 199 146 200 149 C201 146 204 142 210 140 C224 136 230 150 200 166 Z" fill="#f4dfc4"/>
      <ellipse cx="128" cy="284" rx="18" ry="10" fill="#ff8d8d" opacity=".55"/>
      <ellipse cx="272" cy="284" rx="18" ry="10" fill="#ff8d8d" opacity=".55"/>
      <g class="pisca">
        <ellipse cx="160" cy="268" rx="13" ry="16" fill="${T}"/><circle cx="155" cy="262" r="5" fill="#fff"/>
        <ellipse cx="240" cy="268" rx="13" ry="16" fill="${T}"/><circle cx="235" cy="262" r="5" fill="#fff"/>
      </g>
      <path d="M186 290 q7 9 14 0 q7 9 14 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
    </g>
    <g fill="none" stroke="#d6b096" stroke-width="9" stroke-linecap="round">
      <path class="vapor" d="M160 112 C140 88 180 74 160 46"/>
      <path class="vapor v2" d="M204 104 C184 76 226 62 204 26"/>
      <path class="vapor v3" d="M246 112 C226 88 266 74 246 46"/>
    </g>`;

  // O biscoito amigo, piscando (o bichinho pequeno do canto)
  var BISCOITO = `<svg viewBox="0 0 200 200">
    <g class="balanca">
      <ellipse cx="100" cy="184" rx="60" ry="9" fill="${T}" opacity=".15"/>
      <circle cx="100" cy="104" r="76" fill="#e9b678" stroke="${T}" stroke-width="5"/>
      <circle cx="100" cy="104" r="62" fill="#f2c88f"/>
      <g fill="${T}"><ellipse cx="58" cy="70" rx="8" ry="6"/><ellipse cx="146" cy="78" rx="7" ry="6"/><ellipse cx="70" cy="146" rx="8" ry="6"/><ellipse cx="136" cy="144" rx="7" ry="5"/><ellipse cx="102" cy="48" rx="6" ry="5"/></g>
      <ellipse cx="70" cy="118" rx="12" ry="7" fill="#ff8d8d" opacity=".55"/>
      <ellipse cx="130" cy="118" rx="12" ry="7" fill="#ff8d8d" opacity=".55"/>
      <ellipse cx="80" cy="100" rx="8" ry="10" fill="${T}"/><circle cx="77" cy="96" r="3" fill="#fff"/>
      <path d="M112 100 q10 -10 20 0" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round"/>
      <path d="M92 122 q8 9 16 0" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round"/>
    </g></svg>`;

  var GRAO = `<svg viewBox="0 0 40 50"><g transform="rotate(25 20 25)"><ellipse cx="20" cy="25" rx="15" ry="21" fill="#8a5a3e" stroke="${T}" stroke-width="3"/><path d="M15 7 C27 18 12 31 24 43" stroke="${T}" stroke-width="3" fill="none"/></g></svg>`;
  var NUVEM = `<svg viewBox="0 0 160 80"><path d="M28 70 C4 70 6 40 28 42 C26 18 60 10 72 30 C80 8 122 8 124 36 C150 32 156 70 132 70 Z" fill="#fffaf3" stroke="${T}" stroke-width="3" stroke-opacity=".25"/></svg>`;

  // Bandeirinhas no topo da tela
  var varal = "";
  for (var i = 0; i < 24; i++) {
    var x = i * 84;
    var cor = ["#f8c3bb", "#fffaf3", "#e9b678"][i % 3];
    varal += `<path d="M${x + 6} ${18 + Math.sin(i) * 2} L${x + 42} ${70} L${x + 78} ${18 + Math.sin(i + 1) * 2} Z" fill="${cor}" stroke="${T}" stroke-width="2.5" stroke-linejoin="round"/>`;
  }

  tema({
    nome: "Marina",
    frase: "café quentinho e conversa boa ♥",
    foto: "../clientes/exemplo/perfil-feminino.jpg",
    gostos: ["café", "livros", "chuva", "bolo de cenoura"],
    sobre: "Sou do tipo que acorda pensando no café e dorme pensando no próximo. Aqui é meu cantinho: senta, pega uma xícara e fica à vontade.",
    fontes: "family=Baloo+2:wght@600;800&family=Nunito:wght@400;700;800",
    cores: {
      "fundo-1": "#fdf3e6", "fundo-2": "#f3dcc2", tinta: T, papel: "#fffaf3", "papel-2": "#fbe9dc",
      destaque: "#e9897a", botao: "#f8c3bb", sombra: T,
      "fonte-titulo": '"Baloo 2", sans-serif', "fonte-texto": '"Nunito", sans-serif', raio: "22px"
    },
    css: `
      .ceu { background-image:
        linear-gradient(90deg, rgba(233,137,122,.13) 50%, transparent 50%),
        linear-gradient(rgba(233,137,122,.13) 50%, transparent 50%);
        background-size: 64px 64px; }
      .varal { position: absolute; left: 0; top: -6px; width: 2016px; height: 80px; }
      .hora, .logo, .cartao-nome { font-weight: 800; }
      .vapor { animation: vapor 2.6s ease-in-out infinite; }
      .v2 { animation-delay: .5s; } .v3 { animation-delay: 1s; }
      @keyframes vapor { 0% { opacity: 0; transform: translateY(16px); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(-22px); } }
      .passa.grao > svg { animation: gira 9s linear infinite; }
    `,
    decor: `<svg class="varal" viewBox="0 0 2016 80"><path d="M0 18 Q1008 30 2016 18" fill="none" stroke="${T}" stroke-width="2.5"/>${varal}</svg>`,
    passando: [
      { html: NUVEM, qtd: 4, dur: 55, topo: [8, 70], tam: [140, 230] },
      { html: GRAO, qtd: 7, dur: 30, topo: [10, 90], tam: [22, 36], classe: "grao" }
    ],
    entrada: {
      arte: `<svg viewBox="0 0 300 324">
        <rect width="300" height="324" fill="#fbe9dc"/>
        <g fill="rgba(233,137,122,.16)">${[0, 1, 2, 3, 4, 5].map(function (n) { return `<rect x="${n * 60}" width="30" height="324"/><rect y="${n * 60}" width="300" height="30"/>`; }).join("")}</g>
        <g transform="translate(35 52) scale(.58)">${XICARA}</g>
        <text x="150" y="40" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="24" fill="${T}">aberto ♥</text>
      </svg>`,
      botao: "entrar"
    },
    // Dentro da janela: o balcão de madeira, o quadro do cardápio e um vasinho
    cena: `<svg viewBox="0 0 880 620" style="inset:0;width:100%;height:100%">
      <rect x="0" y="520" width="880" height="100" fill="#dcaa7c"/>
      <path d="M0 520 H880" stroke="${T}" stroke-width="5"/>
      <path d="M0 556 H880 M0 592 H880" stroke="${T}" stroke-width="2" opacity=".25"/>
      <g transform="rotate(-3 160 190)">
        <path d="M110 62 L160 30 L210 62" fill="none" stroke="${T}" stroke-width="3"/>
        <circle cx="160" cy="30" r="6" fill="${T}"/>
        <rect x="52" y="62" width="216" height="250" rx="14" fill="#c98f5f" stroke="${T}" stroke-width="5"/>
        <rect x="66" y="76" width="188" height="222" rx="6" fill="#3f4b45"/>
        <g font-family="Baloo 2" font-weight="600" fill="#fdf3e6">
          <text x="160" y="116" text-anchor="middle" font-size="28" font-weight="800">cardápio</text>
          <text x="84" y="164" font-size="19">café ......... ♥</text>
          <text x="84" y="200" font-size="19">bolo ......... ♥</text>
          <text x="84" y="236" font-size="19">chá ........... ♥</text>
          <text x="84" y="272" font-size="19" fill="#f8c3bb">abraço ..grátis</text>
        </g>
      </g>
      <g transform="translate(770 430)">
        <path d="M0 0 C-30 -40 -10 -80 4 -86 M0 0 C24 -30 40 -60 30 -84 M0 0 C-4 -36 -30 -50 -44 -46" fill="none" stroke="#6f9a6a" stroke-width="7" stroke-linecap="round"/>
        <g fill="#8fbf86" stroke="${T}" stroke-width="3">
          <ellipse cx="4" cy="-90" rx="12" ry="20"/><ellipse cx="32" cy="-88" rx="11" ry="19" transform="rotate(20 32 -88)"/><ellipse cx="-46" cy="-50" rx="18" ry="10"/><ellipse cx="-18" cy="-40" rx="10" ry="16" transform="rotate(-30 -18 -40)"/>
        </g>
        <path d="M-40 0 H40 L30 90 H-30 Z" fill="#e9897a" stroke="${T}" stroke-width="5" stroke-linejoin="round"/>
        <rect x="-46" y="-6" width="92" height="20" rx="6" fill="#f8c3bb" stroke="${T}" stroke-width="5"/>
      </g>
    </svg>`,
    bicho: `<svg viewBox="0 0 400 400">${XICARA}</svg>`,
    mini: BISCOITO,
    fala: "aceita um cafezinho?<br>clica em mim!",
    particulas: ["♥", "☕", "♥"]
  });
})();
