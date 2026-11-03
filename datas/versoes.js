// Mais duas versões de cada data: outra cena e outras cores, mesmo tema.
// Cada uma vira uma "cor" do modelo no site (cor: nome da imagem, ex.: cemiterio.jpg).

/* ---------- peças novas ---------- */

function fantasma(x, y, s, rot = 0, op = .9) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${op}">
    <path d="M-30 30 V-10 C-30 -48 30 -48 30 -10 V30 Q22 21 15 30 Q7 39 0 30 Q-8 21 -15 30 Q-22 39 -30 30 Z" fill="#f4f1ff"/>
    <ellipse cx="-10" cy="-10" rx="4.5" ry="6.5" fill="#22303a"/><ellipse cx="10" cy="-10" rx="4.5" ry="6.5" fill="#22303a"/>
    <ellipse cx="0" cy="5" rx="4" ry="5" fill="#22303a"/>
  </g>`;
}

function cruz(x, y, s, cor) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M-5 0 V-30 H-17 V-39 H-5 V-52 H5 V-39 H17 V-30 H5 V0 Z" fill="${cor}"/>`;
}

function grade(x0, x1, y, h, cor) {
  let s = `<path d="M${x0} ${y - h * .25} H${x1} M${x0} ${y - h * .8} H${x1}" stroke="${cor}" stroke-width="3"/>`;
  for (let x = x0; x <= x1; x += 16) s += `<path d="M${x} ${y} V${y - h} M${x - 4} ${y - h + 2} L${x} ${y - h - 9} L${x + 4} ${y - h + 2} Z" stroke="${cor}" stroke-width="3" fill="${cor}"/>`;
  return s;
}

function aboboraLaranja(x, y, s, rosto = true) {
  const id = novoId("abl");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs><radialGradient id="${id}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffb04a"/><stop offset="1" stop-color="#e2620f"/></radialGradient></defs>
    <path d="M-6 -44 C-7 -58 2 -68 13 -70 L15 -63 C7 -60 6 -52 7 -44 Z" fill="#3f6b2a"/>
    <g fill="url(#${id})" stroke="#b84d0c" stroke-width="3">
      <ellipse cx="-28" cy="0" rx="36" ry="44"/><ellipse cx="28" cy="0" rx="36" ry="44"/><ellipse cx="0" cy="0" rx="34" ry="47"/>
    </g>
    ${rosto ? `<g fill="#3a1606"><path d="M-32 -10 L-10 -6 L-22 -26 Z"/><path d="M32 -10 L10 -6 L22 -26 Z"/><path d="M-34 12 Q0 26 34 12 Q28 34 0 36 Q-28 34 -34 12 Z"/></g>` : ""}
  </g>`;
}

function aranha(x, y, fio, cor) {
  return `<path d="M${x} 0 V${y}" stroke="${cor}" stroke-width="1.5"/>
    <g transform="translate(${x} ${y})" stroke="${cor}" stroke-width="2.5" fill="none" stroke-linecap="round">
      <path d="M-6 -2 Q-18 -14 -24 -4 M-6 2 Q-20 -2 -26 8 M-6 5 Q-16 10 -20 20 M6 -2 Q18 -14 24 -4 M6 2 Q20 -2 26 8 M6 5 Q16 10 20 20"/>
    </g>
    <ellipse cx="${x}" cy="${y + 3}" rx="9" ry="11" fill="${cor}"/><circle cx="${x}" cy="${y - 8}" r="6" fill="${cor}"/>`;
}

function floco(x, y, r, cor = "#fff", op = .9) {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3, c = Math.cos(a), s = Math.sin(a);
    d += `M${f(x)} ${f(y)} L${f(x + c * r)} ${f(y + s * r)} `;
    for (const k of [.45, .7]) {
      const bx = x + c * r * k, by = y + s * r * k, l = r * .28;
      d += `M${f(bx)} ${f(by)} L${f(bx + Math.cos(a + .7) * l)} ${f(by + Math.sin(a + .7) * l)} M${f(bx)} ${f(by)} L${f(bx + Math.cos(a - .7) * l)} ${f(by + Math.sin(a - .7) * l)} `;
    }
  }
  return `<path d="${d}" stroke="${cor}" stroke-width="${f(Math.max(1.4, r * .09))}" stroke-linecap="round" opacity="${op}"/>`;
}

function aurora(cores) {
  return cores.map(([y, amp, c, op], i) => {
    let d = `M-40 ${y}`;
    for (let x = 0; x <= 1140; x += 60) d += ` Q${x + 30} ${f(y + Math.sin(x / 160 + i) * amp - amp)} ${x + 60} ${f(y + Math.sin((x + 60) / 160 + i) * amp)}`;
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="46" stroke-linecap="round" opacity="${op}" filter="url(#desfoque)"/>`;
  }).join("");
}

function palmeira(x, y, h, inclina, cor) {
  const tx = x + inclina, ty = y - h;
  let s = `<path d="M${x - 8} ${y} Q${x + inclina * .2} ${y - h * .5} ${tx - 3} ${ty} L${tx + 3} ${ty} Q${x + inclina * .2 + 10} ${y - h * .5} ${x + 8} ${y} Z" fill="${cor}"/>`;
  for (const a of [-170, -140, -105, -70, -35, -8]) {
    const r = a * Math.PI / 180, L = h * .48;
    const ex = tx + Math.cos(r) * L, ey = ty + Math.sin(r) * L * .5 + L * .35;
    const cx = tx + Math.cos(r) * L * .5, cy = ty + Math.sin(r) * L * .6 - 10;
    s += `<path d="M${f(tx)} ${f(ty)} Q${f(cx)} ${f(cy - 14)} ${f(ex)} ${f(ey)} Q${f(cx)} ${f(cy + 4)} ${f(tx)} ${f(ty + 6)} Z" fill="${cor}"/>`;
  }
  return s;
}

function barquinho(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#071733">
    <path d="M-22 0 H22 L16 8 H-16 Z"/><path d="M0 0 V-26 M0 -24 L14 -4 H0" stroke="#071733" stroke-width="2"/>
    <circle cx="0" cy="-27" r="2.5" fill="#ffe28a" filter="url(#brilho)"/></g>`;
}

function flor5(x, y, r, cor) {
  return [0, 72, 144, 216, 288].map(a => `<ellipse cx="${f(x + Math.cos(a * Math.PI / 180) * r * .55)}" cy="${f(y + Math.sin(a * Math.PI / 180) * r * .55)}" rx="${f(r * .5)}" ry="${f(r * .32)}" transform="rotate(${a} ${f(x + Math.cos(a * Math.PI / 180) * r * .55)} ${f(y + Math.sin(a * Math.PI / 180) * r * .55)})" fill="${cor}"/>`).join("") +
    `<circle cx="${x}" cy="${y}" r="${f(r * .25)}" fill="#ffd23f"/>`;
}

function balaoFesta(x, y, r, cor, ax, ay) {
  return `<path d="M${x} ${y + r * 1.2} Q${x - 18} ${f((y + ay) / 2)} ${ax} ${ay}" stroke="#e8dcc0" stroke-width="1.3" fill="none" opacity=".7"/>
    <path d="M${x} ${y - r * 1.1} C${f(x + r * 1.05)} ${f(y - r * 1.1)} ${f(x + r)} ${f(y + r * .6)} ${x} ${f(y + r * 1.15)} C${f(x - r)} ${f(y + r * .6)} ${f(x - r * 1.05)} ${f(y - r * 1.1)} ${x} ${f(y - r * 1.1)} Z" fill="${cor}"/>
    <path d="M${x - 4} ${f(y + r * 1.25)} L${x} ${f(y + r * 1.1)} L${x + 4} ${f(y + r * 1.25)} Z" fill="${cor}"/>
    <ellipse cx="${f(x - r * .35)}" cy="${f(y - r * .45)}" rx="${f(r * .18)}" ry="${f(r * .32)}" fill="#fff" opacity=".45" transform="rotate(-25 ${f(x - r * .35)} ${f(y - r * .45)})"/>`;
}

function relogio(x, y, r) {
  let marcas = "";
  for (let i = 0; i < 60; i++) {
    const a = i / 60 * Math.PI * 2, grande = i % 5 === 0, r1 = r * (grande ? .78 : .86);
    marcas += `<line x1="${f(x + Math.sin(a) * r1)}" y1="${f(y - Math.cos(a) * r1)}" x2="${f(x + Math.sin(a) * r * .92)}" y2="${f(y - Math.cos(a) * r * .92)}" stroke="#3a1857" stroke-width="${grande ? 5 : 2}" stroke-linecap="round"/>`;
  }
  const ponteiro = (graus, L, w) => { const a = graus * Math.PI / 180; return `<line x1="${x}" y1="${y}" x2="${f(x + Math.sin(a) * L)}" y2="${f(y - Math.cos(a) * L)}" stroke="#3a1857" stroke-width="${w}" stroke-linecap="round"/>`; };
  return `<circle cx="${x}" cy="${y}" r="${r * 1.35}" fill="#f2c14e" opacity=".25" filter="url(#desfoque)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#fff6e0" stroke="#e2b84a" stroke-width="14"/>
    <circle cx="${x}" cy="${y}" r="${r - 12}" fill="none" stroke="#f2d48a" stroke-width="2"/>${marcas}
    ${ponteiro(359.5, r * .5, 9)}${ponteiro(354, r * .74, 6)}<circle cx="${x}" cy="${y}" r="8" fill="#e2b84a"/>`;
}

function sombrinha(x, y, r, rot) {
  const cores = ["#e63946", "#ffd23f", "#06d6a0", "#3a86ff", "#ff8c42", "#f15bb5", "#ffffff", "#8338ec"];
  let s = "";
  for (let i = 0; i < 8; i++) {
    const a1 = Math.PI + i * Math.PI / 8, a2 = Math.PI + (i + 1) * Math.PI / 8;
    s += `<path d="M0 0 L${f(Math.cos(a1) * r)} ${f(Math.sin(a1) * r)} Q${f(Math.cos((a1 + a2) / 2) * r * 1.08)} ${f(Math.sin((a1 + a2) / 2) * r * 1.08)} ${f(Math.cos(a2) * r)} ${f(Math.sin(a2) * r)} Z" fill="${cores[i]}"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})">${s}
    <path d="M0 -${r + 8} V${f(r * .95)} q0 10 -9 10" fill="none" stroke="#5a3b2a" stroke-width="3.5" stroke-linecap="round"/></g>`;
}

function casinha(x, y, w, h, cor, telhado = "#c8553d") {
  return `<rect x="${f(x - w / 2)}" y="${f(y - h)}" width="${w}" height="${h + 30}" fill="${cor}"/>
    <path d="M${f(x - w / 2 - 4)} ${f(y - h)} L${x} ${f(y - h - w * .35)} L${f(x + w / 2 + 4)} ${f(y - h)} Z" fill="${telhado}"/>
    <rect x="${f(x - w * .18)}" y="${f(y - h * .62)}" width="${f(w * .36)}" height="${f(h * .5)}" rx="3" fill="#ffffff" opacity=".85"/>`;
}

function pintinho(x, y, s, vira = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s * vira} ${s})">
    <path d="M-8 0 l-4 8 M-8 0 l2 8 M6 0 l-3 8 M6 0 l3 8" stroke="#ff9a3c" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="0" cy="-22" rx="26" ry="22" fill="#ffe066"/><circle cx="12" cy="-48" r="17" fill="#ffe066"/>
    <ellipse cx="-6" cy="-22" rx="13" ry="9" fill="#ffd23f" transform="rotate(-20 -6 -22)"/>
    <path d="M27 -50 L38 -46 L27 -42 Z" fill="#ff9a3c"/><circle cx="18" cy="-52" r="2.8" fill="#3a2a2a"/>
    <circle cx="12" cy="-42" r="4" fill="#ffb3c1" opacity=".7"/><path d="M8 -64 q4 -8 8 0" stroke="#ffd23f" stroke-width="3" fill="none"/>
  </g>`;
}

function cerquinha(x0, x1, y, h, cor, linha) {
  let s = `<rect x="${x0}" y="${y - h * .7}" width="${x1 - x0}" height="9" fill="${cor}" stroke="${linha}" stroke-width="2"/><rect x="${x0}" y="${y - h * .3}" width="${x1 - x0}" height="9" fill="${cor}" stroke="${linha}" stroke-width="2"/>`;
  for (let x = x0; x < x1; x += 30) s += `<path d="M${x} ${y} V${y - h + 10} L${x + 9} ${y - h} L${x + 18} ${y - h + 10} V${y} Z" fill="${cor}" stroke="${linha}" stroke-width="2"/>`;
  return s;
}

function cenoura(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 -10 Q-12 -34 -8 -46 M0 -10 Q2 -40 10 -50 M0 -10 Q12 -30 22 -36" stroke="#4f9e45" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M-11 -8 Q0 -14 11 -8 L2 22 Q0 26 -2 22 Z" fill="#ff8a2a"/>
  </g>`;
}

function balaoAr(x, y, s, cor, faixa) {
  const id = novoId("bar");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs><clipPath id="${id}"><path d="M0 60 C-80 4 -104 -60 -54 -84 C-24 -98 0 -76 0 -54 C0 -76 24 -98 54 -84 C104 -60 80 4 0 60 Z"/></clipPath></defs>
    <path d="M-34 38 L-14 96 M34 38 L14 96 M0 60 V96" stroke="#5a3b2a" stroke-width="2"/>
    <g clip-path="url(#${id})"><rect x="-110" y="-100" width="220" height="170" fill="${cor}"/>
      <path d="M-40 -100 Q-58 0 -16 70 L-4 70 Q-36 0 -22 -100 Z M40 -100 Q58 0 16 70 L4 70 Q36 0 22 -100 Z" fill="${faixa}"/>
      <ellipse cx="-50" cy="-50" rx="16" ry="26" fill="#fff" opacity=".3" transform="rotate(-30 -50 -50)"/></g>
    <rect x="-16" y="94" width="32" height="24" rx="4" fill="#9a6a3e"/><path d="M-16 102 H16" stroke="#7a4f2a" stroke-width="2"/>
  </g>`;
}

function rosa(x, y, r, cor, escura) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${cor}"/>
    <path d="M${f(x - r * .6)} ${f(y + r * .1)} A${f(r * .6)} ${f(r * .6)} 0 0 1 ${f(x + r * .55)} ${f(y - r * .2)} M${f(x - r * .3)} ${f(y + r * .35)} A${f(r * .4)} ${f(r * .4)} 0 0 0 ${f(x + r * .35)} ${f(y + r * .1)} M${f(x - r * .15)} ${f(y - r * .1)} A${f(r * .2)} ${f(r * .2)} 0 1 1 ${f(x + r * .12)} ${f(y + r * .05)}" fill="none" stroke="${escura}" stroke-width="${f(r * .14)}" stroke-linecap="round"/>`;
}

function folha(x, y, s, rot, cor) {
  return `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${s})" d="M0 0 Q10 -10 22 0 Q10 10 0 0 Z" fill="${cor}"/>`;
}

function rodaGigante(x, y, r) {
  const cores = ["#e63946", "#ffd23f", "#06d6a0", "#3a86ff", "#f15bb5", "#ff8c42"];
  let s = `<path d="M${x - r * .55} ${y + r + 60} L${x} ${y} L${x + r * .55} ${y + r + 60}" stroke="#1a1238" stroke-width="10" fill="none"/>`;
  s += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#1a1238" stroke-width="6"/><circle cx="${x}" cy="${y}" r="${r * .8}" fill="none" stroke="#1a1238" stroke-width="3"/>`;
  let luzes = "", cabines = "";
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2, cx = x + Math.cos(a) * r, cy = y + Math.sin(a) * r;
    s += `<line x1="${x}" y1="${y}" x2="${f(cx)}" y2="${f(cy)}" stroke="#1a1238" stroke-width="2.5"/>`;
    cabines += `<path d="M${f(cx)} ${f(cy)} v10" stroke="#1a1238" stroke-width="2"/><rect x="${f(cx - 13)}" y="${f(cy + 10)}" width="26" height="20" rx="5" fill="${cores[i % 6]}"/>`;
  }
  for (let i = 0; i < 36; i++) {
    const a = i / 36 * Math.PI * 2;
    luzes += `<circle cx="${f(x + Math.cos(a) * r)}" cy="${f(y + Math.sin(a) * r)}" r="3" fill="#fff1b8" filter="url(#brilho)"/>`;
  }
  return s + cabines + luzes + `<circle cx="${x}" cy="${y}" r="10" fill="#1a1238"/>`;
}

function barraca(x, y, w, c1, c2) {
  const h = 70, topo = y - h - 40;
  let listras = "";
  const n = 6;
  for (let i = 0; i < n; i++) {
    const a = x - w / 2 - 10 + i * (w + 20) / n, b = a + (w + 20) / n;
    const ta = x - w * .25 + i * (w * .5) / n, tb = ta + (w * .5) / n;
    listras += `<path d="M${f(ta)} ${topo} L${f(tb)} ${topo} L${f(b)} ${y - h} L${f(a)} ${y - h} Z" fill="${i % 2 ? c2 : c1}"/>`;
  }
  let babado = "";
  for (let i = 0; i < n; i++) {
    const a = x - w / 2 - 10 + i * (w + 20) / n, b = a + (w + 20) / n;
    babado += `<path d="M${f(a)} ${y - h} Q${f((a + b) / 2)} ${y - h + 20} ${f(b)} ${y - h} Z" fill="${i % 2 ? c2 : c1}"/>`;
  }
  let luz = "";
  for (let i = 0; i < 6; i++) luz += `<circle cx="${f(x - w / 2 + 8 + i * (w - 16) / 5)}" cy="${y - h + 26}" r="3" fill="#fff1b8" filter="url(#brilho)"/>`;
  return `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h + 20}" fill="#2a1a3a"/>
    <rect x="${x - w / 2 + 8}" y="${y - h + 12}" width="${w - 16}" height="${h - 34}" fill="#ffcf7a" opacity=".85" filter="url(#brilho)"/>
    <rect x="${x - w / 2 - 6}" y="${y - 24}" width="${w + 12}" height="12" fill="#6b3b22"/>
    ${listras}${babado}${luz}`;
}

function chapeuPalha(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="48" ry="12" fill="#d9a441"/><path d="M-24 -2 Q-24 -36 0 -38 Q24 -36 24 -2 Z" fill="#e9c46a"/>
    <path d="M-24 -10 Q0 -4 24 -10 L24 -2 Q0 4 -24 -2 Z" fill="#c1121f"/>
    <path d="M-40 -2 Q0 8 40 -2 M-16 -26 Q0 -22 16 -26" stroke="#b5832a" stroke-width="2" fill="none"/>
  </g>`;
}

const morro = (pico, altura, largura, base) => {
  let d = `M-10 680 L-10 ${base}`;
  for (let x = -10; x <= 1110; x += 20) d += ` L${x} ${f(base - altura * Math.exp(-(((x - pico) / largura) ** 2)))}`;
  return { d: d + " L1110 680 Z", y: x => base - altura * Math.exp(-(((x - pico) / largura) ** 2)) };
};

/* ---------- as versões ---------- */

Object.assign(TEMAS, {
  "halloween-cemiterio": {
    pasta: "33-halloween", cor: "cemiterio", titulo: "Halloween · Cemitério",
    selo: { fundo: "#123036", cor: "#d9fff0", destaque: "#8fe3b5" },
    pagina: fundoPagina("#16343c", "#0a191e"),
    ceu: [[0, "#14303d"], [.5, "#3f7f7a"], [.8, "#8fd1b0"], [1, "#c8f0c8"]],
    cena() {
      const sil = "#10222a";
      const arv = arvore(150, 610, { tam: 120, larg: 24, nivel: 5, cor: sil, semente: 31, torto: .7, abre: .6 });
      const neblina = [[300, 560, 380], [800, 575, 420], [550, 610, 500]].map(([x, y, rx]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="30" fill="#e6fff4" opacity=".18" filter="url(#desfoque)"/>`).join("");
      return [
        estrelas(44, 40, 0, 0, 1100, 260, "#e6fff4"),
        lua(560, 190, 78, { cor: "#f2fff0", sombra: "#d3ecd8", halo: "#e8fff0" }),
        morcego(380, 120, .6, -6, sil), morcego(760, 150, .45, 8, sil),
        `<path d="M0 560 C200 530 360 545 560 540 C760 535 920 520 1100 540 V680 H0Z" fill="#2c5a5a"/>`,
        grade(250, 1000, 560, 70, "#1b3a40"),
        arv.svg,
        `<path d="M0 600 C180 588 400 594 560 598 C760 602 920 590 1100 596 V680 H0Z" fill="${sil}"/>`,
        lapide(330, 604, 1.4, sil), cruz(420, 604, 1.2, sil), lapide(520, 606, 1.1, sil), cruz(640, 604, 1.5, sil), lapide(740, 604, 1.3, sil), cruz(850, 602, 1, sil), lapide(940, 604, 1.6, sil),
        neblina,
        fantasma(470, 360, 1.3, -8, .85), fantasma(700, 300, .9, 10, .75), fantasma(880, 420, .7, -4, .6),
        aboboraLaranja(230, 640, .45), aboboraLaranja(600, 646, .38, false),
      ].join("");
    },
  },

  "halloween-aboboras": {
    pasta: "33-halloween", cor: "aboboras", titulo: "Halloween · Abóboras",
    selo: { fundo: "#3a1530", cor: "#ffe3c4", destaque: "#ff8c2a" },
    pagina: fundoPagina("#3d1630", "#1c0817"),
    ceu: [[0, "#3b1f4a"], [.4, "#a63d6b"], [.75, "#ff8c42"], [1, "#ffd27a"]],
    cena() {
      const sil = "#2a0f22";
      let vinhas = "";
      for (const [x1, x2, y] of [[60, 420, 610], [380, 760, 620], [700, 1060, 606]])
        vinhas += `<path d="M${x1} ${y} C${x1 + 80} ${y - 30} ${x1 + 160} ${y + 24} ${(x1 + x2) / 2} ${y} S${x2 - 60} ${y - 26} ${x2} ${y + 4}" fill="none" stroke="#3f6b2a" stroke-width="5"/>`;
      return [
        lua(560, 330, 120, { cor: "#ffd98a", sombra: "#f2b85c", halo: "#ffe1a0" }),
        morcego(470, 280, 1, -10, sil), morcego(620, 250, .7, 6, sil), morcego(700, 330, .5, -4, sil), morcego(300, 160, .45, 4, sil), morcego(880, 200, .55, -8, sil),
        `<path d="M0 520 C150 480 300 500 460 505 C640 510 800 470 1100 500 V680 H0Z" fill="#6b2a4a"/>`,
        [140, 175, 210, 245].map(x => `<path d="M${x} 540 V470" stroke="${sil}" stroke-width="7"/>`).join("") + `<path d="M130 492 L255 486 M130 516 L255 512" stroke="${sil}" stroke-width="6"/>`,
        `<path d="M0 580 C200 560 400 572 560 570 C760 568 920 556 1100 566 V680 H0Z" fill="${sil}"/>`,
        vinhas,
        aboboraLaranja(150, 620, .7), aboboraLaranja(330, 640, .55, false), aboboraLaranja(560, 610, 1.05),
        `<path transform="translate(560 552)" d="M-70 0 Q0 -12 70 0 Q30 -6 20 -16 L6 -90 L-2 -96 L-14 -60 L-24 -14 Q-40 -6 -70 0 Z" fill="#1d0b18"/><path transform="translate(560 552)" d="M-24 -16 Q0 -8 22 -16 L20 -26 Q0 -18 -22 -26 Z" fill="#8e44ad"/>`,
        aboboraLaranja(780, 632, .6), aboboraLaranja(940, 616, .78), aboboraLaranja(1040, 646, .45, false),
        aranha(860, 120, 0, sil), teia(1070, 40, .9, 90, sil),
      ].join("");
    },
  },

  "natal-lareira": {
    pasta: "34-natal", cor: "lareira", titulo: "Natal · Lareira",
    selo: { fundo: "#3a1418", cor: "#ffe8d6", destaque: "#ffcf5a" },
    pagina: fundoPagina("#3a1418", "#1a0709"),
    ceu: [[0, "#7a2632"], [1, "#5e1c26"]],
    cena() {
      let listras = "";
      for (let x = 0; x < 1100; x += 44) listras += `<rect x="${x}" y="0" width="16" height="470" fill="#fff" opacity=".05"/>`;
      let tabuas = "";
      for (let y = 615; y < 680; y += 18) tabuas += `<path d="M0 ${y} H1100" stroke="#4a2c1d" stroke-width="2"/>`;
      let meias = "";
      [[470, "#c1121f"], [550, "#1f7a4a"], [630, "#c1121f"]].forEach(([x, c]) => {
        meias += `<path d="M${x} 312 v6" stroke="#e8d5b5" stroke-width="2"/><path d="M${x - 14} 318 h28 v48 q0 6 6 10 l14 10 q8 8 0 16 q-6 6 -16 2 l-30 -16 q-2 -2 -2 -6 Z" fill="${c}"/><rect x="${x - 17}" y="314" width="34" height="14" rx="5" fill="#fff6ea"/>`;
      });
      let guirlanda = "";
      for (let i = 0; i < 28; i++) {
        const a = i / 28 * Math.PI * 2;
        guirlanda += `<circle cx="${f(550 + Math.cos(a) * 52)}" cy="${f(180 + Math.sin(a) * 52)}" r="15" fill="${i % 2 ? "#1f6b46" : "#2a8a58"}"/>`;
      }
      for (let i = 0; i < 9; i++) {
        const a = i / 9 * Math.PI * 2 + .3;
        guirlanda += `<circle cx="${f(550 + Math.cos(a) * 54)}" cy="${f(180 + Math.sin(a) * 54)}" r="5" fill="#e63946"/>`;
      }
      let festao = "";
      for (let i = 0; i < 9; i++) festao += `<circle cx="${388 + i * 40}" cy="${306 + (i % 2) * 6}" r="5" fill="${["#ffd34d", "#ff4d5e", "#4dc3ff"][i % 3]}" filter="url(#brilho)"/>`;
      return [
        listras,
        `<rect x="0" y="470" width="1100" height="140" fill="#4a2318"/><path d="M0 470 H1100" stroke="#2e140d" stroke-width="6"/>`,
        `<rect x="0" y="606" width="1100" height="80" fill="#6b4430"/>`, tabuas,
        `<rect x="110" y="120" width="190" height="250" rx="6" fill="#f3e9da"/><rect x="124" y="134" width="162" height="222" fill="#0e2350"/>`,
        estrelas(61, 18, 128, 140, 282, 280) + floco(170, 200, 12) + floco(240, 270, 9) + floco(200, 320, 7),
        `<path d="M124 330 Q205 300 286 330 V356 H124 Z" fill="#f4f8ff"/><path d="M205 134 V356 M124 245 H286" stroke="#f3e9da" stroke-width="10"/>`,
        `<rect x="100" y="364" width="210" height="14" rx="4" fill="#e3d6c3"/>`,
        guirlanda, `<path d="M550 222 l-22 14 l4 -22 Z M550 222 l22 14 l-4 -22 Z" fill="#c1121f"/><circle cx="550" cy="222" r="7" fill="#e63946"/>`,
        `<rect x="380" y="320" width="340" height="290" fill="#d9cbb6"/><rect x="360" y="296" width="380" height="26" rx="4" fill="#efe4d3"/>`,
        `<path d="M430 610 V440 Q550 390 670 440 V610 Z" fill="#22140f"/>`,
        `<g transform="translate(550 604) scale(.55) translate(-560 -618)">${fogueira(560, 618)}</g>`,
        festao, meias,
        `<rect x="402" y="262" width="12" height="34" fill="#fff6ea"/><path d="M408 262 q-5 -10 0 -16 q5 6 0 16 Z" fill="#ffcf4a" filter="url(#brilho)"/>`,
        `<rect x="686" y="262" width="12" height="34" fill="#fff6ea"/><path d="M692 262 q-5 -10 0 -16 q5 6 0 16 Z" fill="#ffcf4a" filter="url(#brilho)"/>`,
        `<ellipse cx="550" cy="650" rx="230" ry="26" fill="#a33a3a" opacity=".85"/>`,
        arvoreNatal(920, 640, 400),
        presente(860, 652, 50, 40, "#ffd34d", "#c1121f"), presente(990, 656, 60, 34, "#4dc3ff", "#ffffff"),
      ].join("");
    },
  },

  "natal-aurora": {
    pasta: "34-natal", cor: "aurora", titulo: "Natal · Aurora",
    selo: { fundo: "#0b2a36", cor: "#dffaf3", destaque: "#7cf0c8" },
    pagina: fundoPagina("#0f3240", "#06161d"),
    ceu: [[0, "#071a2b"], [.55, "#0f3b4f"], [1, "#3a7f8a"]],
    cena() {
      const r = sorteio(8);
      let pinhos = "";
      for (let x = -20; x < 1120; x += 34 + r() * 22) pinhos += pinheiro(x, 560 + r() * 14, 80 + r() * 70, "#0b2433", "#e3f4f8");
      let flocos = "";
      for (let i = 0; i < 18; i++) flocos += floco(r() * 1100, r() * 560, 5 + r() * 12, "#fff", .5 + r() * .5);
      return [
        estrelas(71, 120, 0, 0, 1100, 360),
        aurora([[150, 30, "#5cf2b0", .5], [210, 40, "#7c5cff", .4], [120, 26, "#38e0d0", .35]]),
        `<path d="M0 470 L120 360 L200 420 L330 280 L460 430 L560 330 L700 450 L820 300 L960 420 L1100 340 V680 H0Z" fill="#244a5e"/>`,
        `<path d="M300 310 L330 280 L362 318 L346 312 L330 322 L314 312 Z M532 356 L560 330 L590 360 L574 354 L560 364 L546 354 Z M792 328 L820 300 L852 332 L836 326 L820 336 L804 326 Z" fill="#eaf7fb"/>`,
        `<path d="M0 520 C200 500 380 520 560 512 C760 504 920 520 1100 510 V680 H0Z" fill="#cfe6ef"/>`,
        pinhos,
        `<g transform="translate(560 618)"><rect x="-80" y="-80" width="160" height="80" fill="#5b3420"/><path d="M-80 -60 H80 M-80 -40 H80 M-80 -20 H80" stroke="#46271a" stroke-width="3"/>
          <path d="M-100 -76 L0 -140 L100 -76 Z" fill="#3b2216"/><path d="M-104 -72 Q-60 -86 -20 -76 Q20 -90 60 -76 Q90 -84 104 -72 L0 -146 Z" fill="#f4fbff"/>
          <rect x="40" y="-150" width="22" height="40" fill="#3b2216"/><rect x="36" y="-156" width="30" height="8" rx="4" fill="#fff"/>
          <rect x="-58" y="-60" width="34" height="30" fill="#ffc861" filter="url(#brilho)"/><rect x="20" y="-62" width="28" height="62" fill="#2a160e"/><circle cx="42" cy="-30" r="3" fill="#ffd66b"/>
          <path d="M-41 -60 V-30 M-58 -45 H-24" stroke="#5b3420" stroke-width="3"/></g>`,
        `<circle cx="660" cy="430" r="30" fill="#fff" opacity=".06" filter="url(#desfoque)"/><path d="M611 468 Q600 440 618 420 Q636 400 622 372" stroke="#e8f3f8" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round" filter="url(#desfoque)"/>`,
        `<path d="M0 610 C200 594 400 610 560 618 C740 626 900 600 1100 606 V680 H0Z" fill="#eef8fc"/>`,
        pinheiro(150, 640, 170, "#0e3040", "#fff"), pinheiro(960, 640, 190, "#0e3040", "#fff"),
        flocos,
      ].join("");
    },
  },

  "reveillon-praia": {
    pasta: "35-reveillon", cor: "praia", titulo: "Réveillon · Praia",
    selo: { fundo: "#0a2a4a", cor: "#e3f6ff", destaque: "#9fe8ff" },
    pagina: fundoPagina("#0d2f52", "#041326"),
    ceu: [[0, "#04122b"], [.55, "#0d2f5a"], [.85, "#1f5a85"], [1, "#3d7fa6"]],
    cena() {
      const bursts = [[260, 170, 90, "#ffffff", 11], [520, 120, 120, "#ffd36b", 12], [790, 160, 100, "#9fe8ff", 13], [410, 280, 55, "#ff9ad5", 14], [930, 270, 60, "#ffd36b", 15]];
      let ondas = "";
      for (let i = 0; i < 4; i++) ondas += `<path d="M-20 ${560 + i * 14} Q${120 + i * 40} ${548 + i * 14} 260 ${560 + i * 14} T540 ${560 + i * 14} T820 ${560 + i * 14} T1120 ${560 + i * 14}" stroke="#e8f6ff" stroke-width="${2.5 - i * .4}" fill="none" opacity="${.55 - i * .1}"/>`;
      return [
        estrelas(91, 60, 0, 0, 1100, 380),
        bursts.map(([x, y, R, c, sd]) => fogos(x, y, R, c, sd, 32)).join(""),
        `<rect x="0" y="450" width="1100" height="230" fill="#0b2a52"/>`,
        bursts.map(([x, , R, c]) => [0, 1, 2, 3, 4].map(i => `<rect x="${f(x - R * (.3 - i * .05))}" y="${462 + i * 16}" width="${f(R * (.6 - i * .1))}" height="3" rx="1.5" fill="${c}" opacity="${f(.5 - i * .09)}"/>`).join("")).join(""),
        barquinho(170, 452, .9), barquinho(640, 450, .7), barquinho(980, 452, .8),
        ondas,
        `<path d="M0 600 C200 582 380 596 560 588 C760 580 920 596 1100 586 V680 H0Z" fill="#c9b18a"/><path d="M0 630 C240 616 520 632 760 622 C900 616 1000 626 1100 620 V680 H0Z" fill="#b39a74"/>`,
        [[420, 594], [440, 598], [700, 590], [716, 594]].map(([x, y]) => flor5(x, y, 9, "#ffffff")).join(""),
        palmeira(80, 640, 300, 50, "#06162e"), palmeira(1010, 650, 260, -60, "#06162e"), palmeira(1070, 650, 200, -20, "#06162e"),
      ].join("");
    },
  },

  "reveillon-meia-noite": {
    pasta: "35-reveillon", cor: "meia-noite", titulo: "Réveillon · Meia-noite",
    selo: { fundo: "#2a1144", cor: "#fff2d0", destaque: "#f2c14e" },
    pagina: fundoPagina("#33154f", "#140722"),
    ceu: [[0, "#1a0b2e"], [.6, "#3a1857"], [1, "#5e2a6e"]],
    cena() {
      const ouro = ["#f2c14e", "#ffe08a", "#ffffff", "#d9dce6"];
      return [
        estrelas(101, 70, 0, 0, 1100, 680, "#ffe9b0"),
        serpentina(60, 90, 420, 40, 7, 12, "#f2c14e", 3.5), serpentina(680, 40, 1060, 110, 7, 12, "#d9dce6", 3.5),
        relogio(550, 320, 170),
        balaoFesta(170, 260, 52, "#f2c14e", 210, 640), balaoFesta(250, 330, 44, "#d9dce6", 210, 640), balaoFesta(120, 380, 40, "#8e5bd6", 210, 640),
        balaoFesta(930, 250, 54, "#d9dce6", 900, 640), balaoFesta(850, 340, 46, "#f2c14e", 900, 640), balaoFesta(1000, 370, 40, "#8e5bd6", 900, 640),
        confetes(102, 130, 30, 30, 1070, 660, ouro),
        brilhinho(350, 150, 14, "#ffe9b0"), brilhinho(760, 520, 12, "#ffe9b0"), brilhinho(400, 560, 9, "#fff"), brilhinho(720, 110, 9, "#fff"),
      ].join("");
    },
  },

  "carnaval-olinda": {
    pasta: "36-carnaval", cor: "olinda", titulo: "Carnaval · Olinda",
    selo: { fundo: "#0f4d5c", cor: "#e9fdff", destaque: "#ffd23f" },
    pagina: fundoPagina("#125a6a", "#072b33"),
    ceu: [[0, "#1fb5c8"], [.6, "#8ee3e8"], [1, "#fff1c1"]],
    cena() {
      const m = morro(560, 250, 330, 590);
      const cores = ["#ff9f1c", "#e71d73", "#3a86ff", "#ffbe0b", "#06d6a0", "#8338ec", "#f15bb5", "#2ec4b6"];
      let casas = "";
      [100, 170, 240, 310, 390, 730, 810, 880, 950, 1020].forEach((x, i) => { casas += casinha(x, m.y(x) + 14, 58, 46, cores[i % cores.length]); });
      [440, 680].forEach((x, i) => { casas += casinha(x, m.y(x) + 12, 50, 40, cores[(i + 3) % cores.length]); });
      const ig = `<g transform="translate(560 ${f(m.y(560) + 6)})" fill="#fffaf0">
        <rect x="-60" y="-70" width="120" height="70"/><path d="M-60 -70 L0 -100 L60 -70 Z"/>
        <rect x="-82" y="-118" width="30" height="118"/><rect x="52" y="-118" width="30" height="118"/>
        <path d="M-86 -118 L-67 -144 L-48 -118 Z M48 -118 L67 -144 L86 -118 Z" fill="#c8553d"/>
        <path d="M-12 0 V-30 A12 12 0 0 1 12 -30 V0 Z" fill="#7a4a2a"/><circle cx="0" cy="-58" r="9" fill="#9fd8e8"/>
        <rect x="-73" y="-100" width="12" height="16" rx="6" fill="#7a4a2a"/><rect x="61" y="-100" width="12" height="16" rx="6" fill="#7a4a2a"/></g>`;
      return [
        `<circle cx="900" cy="120" r="56" fill="#fff4b0"/><circle cx="900" cy="120" r="110" fill="#fff4b0" opacity=".3" filter="url(#desfoque)"/>`,
        nuvem(220, 110, 1.2, "#fff", .9), nuvem(640, 80, .9, "#fff", .85),
        `<path d="${m.d}" fill="#3aa06a"/>`, ig, casas,
        `<path d="M0 620 C200 600 400 616 560 612 C760 608 920 600 1100 610 V680 H0Z" fill="#2b7f52"/>`,
        sombrinha(200, 250, 60, -18), sombrinha(380, 160, 44, 12), sombrinha(760, 230, 66, 16), sombrinha(980, 300, 42, -10), sombrinha(560, 470, 36, 8), sombrinha(130, 480, 40, 14),
        serpentina(300, 330, 520, 280, 4, 10, "#e71d73", 3.5), serpentina(640, 380, 900, 420, 4, 10, "#8338ec", 3.5),
        confetes(121, 150, 30, 30, 1070, 660, cores.concat("#ffffff")),
      ].join("");
    },
  },

  "carnaval-plumas": {
    pasta: "36-carnaval", cor: "plumas", titulo: "Carnaval · Plumas",
    selo: { fundo: "#2a0b52", cor: "#fff0d6", destaque: "#ffd166" },
    pagina: fundoPagina("#2e0d55", "#12042a"),
    ceu: [[0, "#0b0630"], [.6, "#2a0b52"], [1, "#5a1470"]],
    cena() {
      const cores = ["#ffd166", "#ff4fa3", "#2ec4b6", "#8338ec", "#ff9f1c", "#3a86ff"];
      let feixes = "";
      [[180, "#ff4fa3"], [420, "#2ec4b6"], [700, "#ffd166"], [930, "#8338ec"]].forEach(([x, c], i) => {
        const topo = i % 2 ? 1100 - x * .3 : x * .5;
        feixes += `<path d="M${x - 20} 690 L${x + 20} 690 L${f(topo + 120)} -20 L${f(topo - 120)} -20 Z" fill="${c}" opacity=".14"/>`;
      });
      let leque = "";
      for (let i = 0; i < 15; i++) leque += pena(550, 500, 300 - Math.abs(i - 7) * 14, -84 + i * 12, cores[i % cores.length]);
      let pedras = "";
      for (let i = 0; i < 9; i++) pedras += `<circle cx="${430 + i * 30}" cy="${f(500 + Math.abs(i - 4) * 2)}" r="7" fill="${cores[(i + 1) % cores.length]}" stroke="#fff6c2" stroke-width="2"/>`;
      return [
        feixes,
        confetes(131, 110, 30, 30, 1070, 640, ["#ffd166", "#ffffff", "#ff4fa3", "#2ec4b6"]),
        leque,
        `<path d="M410 520 Q550 470 690 520 L680 540 Q550 494 420 540 Z" fill="#ffd166" stroke="#c99a2e" stroke-width="3"/>`, pedras,
        `<g transform="translate(200 360) rotate(-16) scale(.55)">${mascara(0, 0, 1)}</g>`, `<g transform="translate(900 380) rotate(14) scale(.5)">${mascara(0, 0, 1)}</g>`,
        `<path d="M0 600 C200 586 400 596 560 590 C760 584 920 596 1100 590 V680 H0Z" fill="#1a0538"/>`,
        Array.from({ length: 22 }, (_, i) => `<circle cx="${30 + i * 50}" cy="${612 + (i % 2) * 6}" r="4" fill="${cores[i % cores.length]}" filter="url(#brilho)"/>`).join(""),
        brilhinho(300, 120, 12, "#fff"), brilhinho(820, 140, 14, "#ffd166"), brilhinho(160, 220, 8, "#fff"), brilhinho(980, 200, 9, "#fff"),
      ].join("");
    },
  },

  "pascoa-pintinhos": {
    pasta: "37-pascoa", cor: "pintinhos", titulo: "Páscoa · Pintinhos",
    selo: { fundo: "#ffffff", cor: "#6b5a8a", destaque: "#b18cff" },
    pagina: fundoPagina("#fbf4ff", "#efe4f7"),
    ceu: [[0, "#d9c7ff"], [.6, "#ffe1d6"], [1, "#fff4dd"]],
    cena() {
      const r = sorteio(141);
      const arco = ["#ffb3c7", "#ffd6a5", "#fdffb6", "#caffbf", "#a0e7ff", "#cdb4ff"].map((c, i) => `<path d="M${180 + i * 18} 520 A${370 - i * 18} ${330 - i * 18} 0 0 1 ${920 - i * 18} 520" fill="none" stroke="${c}" stroke-width="18"/>`).join("");
      let flores = "";
      for (let i = 0; i < 28; i++) {
        const x = 40 + r() * 1020, y = 560 + r() * 90;
        if (x > 380 && x < 740) continue;
        flores += flor(f(x), f(y), .6 + r() * .4, ["#ffffff", "#ffb3c7", "#cdb4ff", "#ffe066"][i % 4]);
      }
      return [
        arco,
        nuvem(240, 520, 1.6, "#fff", .95), nuvem(860, 520, 1.6, "#fff", .95), nuvem(560, 120, 1.1, "#fff", .9),
        `<path d="M0 500 C180 470 360 490 560 500 C760 510 920 480 1100 495 V680 H0Z" fill="#bfe8c7"/>`,
        `<path d="M0 580 C200 556 400 572 560 576 C760 580 920 560 1100 570 V680 H0Z" fill="#9fd8a8"/>`,
        ovo(470, 560, 1.35, -10, "#ffd6a5", "#ff8fab", "zigue"), ovo(650, 556, 1.35, 12, "#a0e7ff", "#ffffff", "bolinhas"), ovo(560, 540, 1.7, 0, "#cdb4ff", "#ffe066", "listras"),
        `<path d="M520 470 q40 -30 80 0 q-40 -6 -40 20 q0 -26 -40 -20 Z" fill="#ff8fab"/>`,
        pintinho(290, 640, 1.6), pintinho(830, 646, 1.5, -1), pintinho(390, 656, 1, -1),
        `<g transform="translate(950 652) scale(1.4)"><path d="M-34 -6 Q-34 -40 0 -40 Q34 -40 34 -6 Z" fill="#fff8ec"/>${pintinho(0, -16, .7)}<path d="M-36 -10 L-26 -22 L-16 -10 L-6 -22 L4 -10 L14 -22 L24 -10 L36 -20 V4 Q0 16 -36 4 Z" fill="#fff8ec" stroke="#eadcc6" stroke-width="2"/></g>`,
        flores,
        borboleta(200, 300, .9, "#ff9ec1", -10), borboleta(900, 260, .8, "#a0e7ff", 12),
      ].join("");
    },
  },

  "pascoa-jardim": {
    pasta: "37-pascoa", cor: "jardim", titulo: "Páscoa · Jardim",
    selo: { fundo: "#ffffff", cor: "#5a6b4a", destaque: "#ff9f68" },
    pagina: fundoPagina("#fbfff6", "#e8f4e6"),
    ceu: [[0, "#bfeee0"], [.6, "#e9fbef"], [1, "#fffbe6"]],
    cena() {
      const r = sorteio(151);
      const arv = arvore(300, 600, { tam: 120, larg: 22, nivel: 6, cor: "#8a5a3c", semente: 17, torto: .3, abre: .6 });
      let flores = "";
      for (const [x, y] of arv.pontas) for (let k = 0; k < 3; k++)
        flores += `<circle cx="${f(x + (r() - .5) * 34)}" cy="${f(y + (r() - .5) * 30)}" r="${f(9 + r() * 9)}" fill="${["#ffc2d6", "#ffe0ec", "#ff9fbf", "#ffffff"][Math.floor(r() * 4)]}"/>`;
      let pendurados = "";
      arv.pontas.filter((_, i) => i % 6 === 2).slice(0, 6).forEach(([x, y], i) => {
        const cores = [["#ffd166", "#ff7aa8"], ["#9ad8ff", "#ffffff"], ["#c7a6ff", "#ffe066"], ["#b8f2a8", "#ff7aa8"]][i % 4];
        pendurados += `<path d="M${f(x)} ${f(y)} V${f(y + 40)}" stroke="#a07050" stroke-width="1.5"/>${ovo(f(x), f(y + 58), .4, 0, cores[0], cores[1], ["zigue", "bolinhas", "listras"][i % 3])}`;
      });
      let moitas = "";
      for (const [x, y, s] of [[820, 560, 1], [900, 550, 1.2], [980, 566, .9]]) moitas += `<circle cx="${x}" cy="${y}" r="${46 * s}" fill="#6fb85c"/><circle cx="${x - 20 * s}" cy="${y - 14 * s}" r="${30 * s}" fill="#7cc46a"/>`;
      return [
        `<circle cx="900" cy="130" r="48" fill="#fff1a8"/><circle cx="900" cy="130" r="100" fill="#fff4b8" opacity=".4" filter="url(#desfoque)"/>`,
        nuvem(600, 110, 1.2, "#fff", .95), nuvem(140, 150, .8, "#fff", .9),
        `<path d="M0 520 C200 500 380 516 560 512 C760 508 920 500 1100 512 V680 H0Z" fill="#b5e3a0"/>`,
        arv.svg, flores, pendurados,
        `<g transform="translate(920 560) scale(-.8 .8)">${coelho(0, 0, 1)}</g>`, moitas,
        cerquinha(0, 1110, 600, 80, "#fff8ec", "#e2d2b8"),
        `<path d="M0 600 C200 590 400 600 560 596 C760 592 920 600 1100 594 V680 H0Z" fill="#8a6a4a"/>`,
        [120, 200, 280, 600, 680, 760, 840].map((x, i) => cenoura(x, 626 + (i % 2) * 14, .9)).join(""),
        `<path d="M0 660 C300 652 700 664 1100 656 V680 H0Z" fill="#7cc46a"/>`,
        borboleta(560, 260, .9, "#ff9f68", -14), borboleta(700, 340, .7, "#9ad8ff", 10),
      ].join("");
    },
  },

  "namorados-baloes": {
    pasta: "38-dia-dos-namorados", cor: "baloes", titulo: "Dia dos Namorados · Balões",
    selo: { fundo: "#4a1a3c", cor: "#ffe3ec", destaque: "#ff8fb1" },
    pagina: fundoPagina("#4a1a3c", "#22091b"),
    ceu: [[0, "#9fb4ff"], [.5, "#f6c1e0"], [1, "#ffe3cf"]],
    cena() {
      let coracoes = "";
      const r = sorteio(161);
      for (let i = 0; i < 12; i++) coracoes += coracao(80 + r() * 940, 60 + r() * 380, .1 + r() * .12, "#ffffff", (r() - .5) * 40, `opacity="${f(.4 + r() * .4)}"`);
      return [
        nuvem(200, 140, 1.4, "#fff", .85), nuvem(820, 110, 1.2, "#fff", .8), nuvem(560, 420, 1.6, "#fff", .6), nuvem(980, 380, .9, "#fff", .7),
        coracoes,
        balaoAr(320, 230, 1.15, "#ff4d6d", "#ffd6e0"), balaoAr(700, 170, .8, "#ff8fb1", "#ffffff"), balaoAr(900, 330, .55, "#c9184a", "#ffb3c1"), balaoAr(530, 360, .45, "#ffb3c1", "#ff4d6d"),
        `<path d="M0 560 C180 520 340 540 520 546 C700 552 860 520 1100 540 V680 H0Z" fill="#f2a7c3"/>`,
        `<path d="M0 610 C220 586 420 600 600 596 C780 592 940 584 1100 592 V680 H0Z" fill="#c9799e"/>`,
        `<path d="M0 650 C300 636 700 650 1100 640 V680 H0Z" fill="#8a3b66"/>`,
      ].join("");
    },
  },

  "namorados-rosas": {
    pasta: "38-dia-dos-namorados", cor: "rosas", titulo: "Dia dos Namorados · Rosas",
    selo: { fundo: "#3a0f2a", cor: "#ffe0e8", destaque: "#ff5c8a" },
    pagina: fundoPagina("#3d0f2c", "#1a0513"),
    ceu: [[0, "#2b0f2e"], [.55, "#6a1f4a"], [1, "#c2456e"]],
    cena() {
      const r = sorteio(171);
      let arco = "";
      for (let i = 0; i <= 40; i++) {
        const t = i / 40, a = Math.PI * (1 - t), x = 550 + Math.cos(a) * 200, y = 400 - Math.sin(a) * 200;
        const px = t < .02 || t > .98 ? 0 : 1;
        arco += folha(x + (r() - .5) * 30, y + (r() - .5) * 30, 1 + r(), r() * 360, r() < .5 ? "#2f6b3a" : "#3f8a4a");
        if (px && i % 2 === 0) arco += rosa(f(x + (r() - .5) * 20), f(y + (r() - .5) * 20), 12 + r() * 7, ["#e63962", "#ff6b8b", "#c9184a", "#ff9fb4"][i % 4], "#8a0f30");
      }
      for (const lado of [350, 750]) for (let y = 420; y < 600; y += 22) {
        arco += folha(lado + (r() - .5) * 26, y, 1 + r() * .6, r() * 360, "#2f6b3a");
        if (r() < .55) arco += rosa(f(lado + (r() - .5) * 22), y, 10 + r() * 6, ["#e63962", "#ff6b8b", "#ff9fb4"][Math.floor(r() * 3)], "#8a0f30");
      }
      let vagalumes = "", petalas = "";
      for (let i = 0; i < 26; i++) vagalumes += `<circle cx="${f(r() * 1100)}" cy="${f(200 + r() * 420)}" r="${f(1.6 + r() * 2)}" fill="#ffe9a8" filter="url(#brilho)"/>`;
      for (let i = 0; i < 16; i++) { const x = f(r() * 1100), y = f(80 + r() * 520); petalas += `<ellipse cx="${x}" cy="${y}" rx="6" ry="3.5" fill="#ff8fab" opacity=".85" transform="rotate(${f(r() * 180)} ${x} ${y})"/>`; }
      return [
        estrelas(172, 50, 0, 0, 1100, 300, "#ffe0ec"),
        lua(840, 130, 44, { cor: "#ffe8ee", sombra: "#f6cbd6", halo: "#ffd0dc" }),
        `<path d="M0 600 C200 586 400 596 560 600 C760 604 920 588 1100 596 V680 H0Z" fill="#1f0a1c"/>`,
        `<path d="M500 680 L520 600 L580 600 L600 680 Z" fill="#3a1830"/>`,
        `<path d="M350 600 V420 A200 200 0 0 1 750 420 V600" fill="none" stroke="#2a1426" stroke-width="12"/>`,
        arco,
        coracao(550, 330, .5, "#ff5c8a", 0, `filter="url(#brilho)"`),
        vagalumes,
        [[120, 620], [210, 640], [900, 630], [990, 612]].map(([x, y]) => rosa(x, y, 16, "#e63962", "#8a0f30")).join(""),
        petalas,
      ].join("");
    },
  },

  "junina-arraia": {
    pasta: "39-festa-junina", cor: "arraia", titulo: "Festa Junina · Arraiá",
    selo: { fundo: "#2a1640", cor: "#fff0dc", destaque: "#ffb26b" },
    pagina: fundoPagina("#30184a", "#140a22"),
    ceu: [[0, "#1b1446"], [.5, "#5b2a6e"], [.85, "#e0705a"], [1, "#ffb26b"]],
    cena() {
      return [
        estrelas(181, 60, 0, 0, 1100, 300),
        lua(330, 360, 28, { cor: "#fff3d6", sombra: "#eadcb8", halo: "#fff0c8" }),
        rodaGigante(820, 290, 170),
        varal(20, 90, 640, 120, 50, 3), varal(40, 200, 660, 230, 40, 4),
        balaoJunino(560, 330, .5, ["#e63946", "#ffd23f", "#3a86ff", "#ffd23f", "#e63946", "#06d6a0"]),
        `<path d="M0 560 C200 546 400 556 560 552 C760 548 920 556 1100 550 V680 H0Z" fill="#241434"/>`,
        barraca(170, 620, 150, "#e63946", "#fff3e0"), barraca(380, 626, 160, "#3a86ff", "#ffd23f"), barraca(600, 620, 150, "#06d6a0", "#fff3e0"),
        `<path d="M0 640 C300 630 700 644 1100 636 V680 H0Z" fill="#1a0e26"/>`,
        `<g transform="translate(940 650) scale(.4) translate(-560 -618)">${fogueira(560, 618)}</g>`,
      ].join("");
    },
  },

  "junina-baloes": {
    pasta: "39-festa-junina", cor: "baloes", titulo: "Festa Junina · Balões",
    selo: { fundo: "#0a3a44", cor: "#fff4d6", destaque: "#e9c46a" },
    pagina: fundoPagina("#0e4250", "#051c22"),
    ceu: [[0, "#062a33"], [.6, "#0f4c5c"], [1, "#2a7f7a"]],
    cena() {
      const vila = morro(700, 90, 380, 560);
      let casas = "";
      [430, 500, 570, 820, 890, 960].forEach((x, i) => {
        const y = vila.y(x) + 10;
        casas += `<rect x="${x - 22}" y="${f(y - 30)}" width="44" height="40" fill="#0b2a2e"/><path d="M${x - 26} ${f(y - 30)} L${x} ${f(y - 48)} L${x + 26} ${f(y - 30)} Z" fill="#0b2a2e"/><rect x="${x - 8}" y="${f(y - 20)}" width="12" height="12" fill="#ffd27a" filter="url(#brilho)"/>`;
      });
      const igY = vila.y(700) + 8;
      casas += `<g fill="#0b2a2e"><rect x="670" y="${f(igY - 50)}" width="60" height="58"/><path d="M664 ${f(igY - 50)} L700 ${f(igY - 76)} L736 ${f(igY - 50)} Z"/><rect x="690" y="${f(igY - 110)}" width="20" height="40"/><path d="M700 ${f(igY - 140)} V${f(igY - 110)} M692 ${f(igY - 130)} H708" stroke="#0b2a2e" stroke-width="4"/></g><circle cx="700" cy="${f(igY - 30)}" r="7" fill="#ffd27a" filter="url(#brilho)"/>`;
      let milharal = "";
      for (const [x, h, sd] of [[60, 200, 11], [120, 230, 12], [180, 190, 13], [960, 210, 14], [1020, 240, 15], [1080, 200, 16]]) milharal += milho(x, 640, h, "#0a2a1e", sd);
      return [
        estrelas(191, 110, 0, 0, 1100, 460, "#fff6d8"),
        lua(880, 110, 34, { cor: "#fff3d6", crateras: false, halo: "#fff3c8" }), `<circle cx="897" cy="100" r="31" fill="#072c35"/>`,
        balaoJunino(560, 250, 1.5, ["#e63946", "#ffd23f", "#06d6a0", "#3a86ff", "#ffd23f", "#e63946"]),
        balaoJunino(290, 180, .6, ["#ff8c42", "#ffffff", "#f15bb5", "#ffffff", "#ff8c42", "#ffd23f"]),
        balaoJunino(380, 340, .4, ["#06d6a0", "#ffd23f", "#e63946", "#ffd23f", "#06d6a0", "#3a86ff"]),
        balaoJunino(780, 330, .5, ["#3a86ff", "#ffffff", "#e63946", "#ffffff", "#3a86ff", "#ffd23f"]),
        balaoJunino(980, 220, .35, ["#ffd23f", "#e63946", "#ffd23f", "#e63946", "#ffd23f", "#e63946"]),
        balaoJunino(180, 400, .3, ["#f15bb5", "#ffffff", "#f15bb5", "#ffffff", "#f15bb5", "#ffffff"]),
        `<path d="${vila.d}" fill="#12404a"/>`, casas,
        `<path d="M0 600 C200 586 400 600 560 604 C760 608 920 592 1100 600 V680 H0Z" fill="#082026"/>`,
        milharal,
        `<rect x="300" y="560" width="10" height="90" fill="#3a2a1a"/><rect x="290" y="580" width="140" height="8" fill="#3a2a1a"/><rect x="420" y="570" width="10" height="80" fill="#3a2a1a"/>`,
        chapeuPalha(305, 562, .9),
      ].join("");
    },
  },
});
