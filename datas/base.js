// Molde dos xatspaces de datas comemorativas: uma cena em SVG (1100×680) recortada
// numa forma ondulada, no meio da página, e a estrelinha de sempre no canto.
// Cada tema (temas.js) só informa as cores e desenha a cena com os ajudantes daqui.

const W = 1100, H = 680;

const FORMA = "M 60 250 C 30 200 80 150 150 120 C 230 85 260 60 330 55 C 420 50 480 20 560 22 " +
  "C 650 25 700 55 780 30 C 860 5 960 20 1010 70 C 1060 120 1050 180 1040 240 C 1030 320 1075 380 1065 460 " +
  "C 1055 540 1080 600 1040 640 C 990 670 900 650 820 660 C 700 675 600 655 500 665 C 380 678 260 650 160 668 " +
  "C 90 680 40 650 45 580 C 50 500 90 450 70 380 C 55 330 85 290 60 250 Z";

// sorteio com semente: a cena sai sempre igual
function sorteio(semente) {
  return () => {
    semente = semente + 0x6D2B79F5 | 0;
    let t = Math.imul(semente ^ semente >>> 15, 1 | semente);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const f = n => +n.toFixed(1);
let _id = 0;
const novoId = p => p + (++_id);

function montaCena(tema) {
  const paradas = tema.ceu.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");
  return `<defs>
    <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">${paradas}</linearGradient>
    <clipPath id="forma"><path d="${FORMA}"/></clipPath>
    <filter id="brilho" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="brilhoForte" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="desfoque"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <g clip-path="url(#forma)"><rect width="${W}" height="${H}" fill="url(#ceu)"/>${tema.cena()}</g>`;
}

/* ---------- céu ---------- */

function estrelas(semente, n, x0, y0, x1, y1, cor = "#fff") {
  const r = sorteio(semente);
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0);
    if (r() < .12) s += brilhinho(x, y, 5 + r() * 5, cor, .9);
    else s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.7 + r() * 1.5)}" fill="${cor}" opacity="${f(.4 + r() * .6)}"/>`;
  }
  return s;
}

// estrelinha de 4 pontas
function brilhinho(x, y, t, cor = "#fff", op = 1) {
  const p = t * .22;
  return `<path d="M${f(x)} ${f(y - t)} Q${f(x + p)} ${f(y - p)} ${f(x + t)} ${f(y)} Q${f(x + p)} ${f(y + p)} ${f(x)} ${f(y + t)} Q${f(x - p)} ${f(y + p)} ${f(x - t)} ${f(y)} Q${f(x - p)} ${f(y - p)} ${f(x)} ${f(y - t)}Z" fill="${cor}" opacity="${op}"/>`;
}

function nuvem(x, y, s, cor, op = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${cor}" opacity="${op}">
    <path d="M-48 0 Q-50 -14 -34 -14 Q-30 -30 -12 -28 Q-2 -44 18 -36 Q34 -32 34 -18 Q50 -18 52 0 Z"/></g>`;
}

function lua(x, y, raio, { cor = "#fbf3c4", sombra = "#e2d68e", halo = "#fff7c8", crateras = true } = {}) {
  const id = novoId("lua");
  let c = "";
  if (crateras) c = [[-.35, -.2, .22], [.25, .3, .16], [.3, -.35, .12], [-.2, .45, .1], [.05, -.02, .09]]
    .map(([a, b, k]) => `<circle cx="${f(x + a * raio)}" cy="${f(y + b * raio)}" r="${f(k * raio)}" fill="${sombra}" opacity=".55"/>`).join("");
  return `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${halo}" stop-opacity=".7"/><stop offset=".35" stop-color="${halo}" stop-opacity=".25"/><stop offset="1" stop-color="${halo}" stop-opacity="0"/></radialGradient></defs>
    <circle cx="${x}" cy="${y}" r="${raio * 3.2}" fill="url(#${id})"/>
    <circle cx="${x}" cy="${y}" r="${raio}" fill="${cor}"/>${c}`;
}

/* ---------- árvores ---------- */

// galhos recursivos; devolve o desenho e as pontas (para pôr folhas, corações…)
function arvore(x, y, { tam = 120, larg = 22, nivel = 6, cor = "#1f1233", semente = 1, torto = .35, abre = .5, ang = -Math.PI / 2 } = {}) {
  const r = sorteio(semente);
  const pontas = [];
  let s = "";
  const galho = (x, y, ang, len, w, n) => {
    const curva = (r() - .5) * len * torto;
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    const mx = (x + x2) / 2 - Math.sin(ang) * curva, my = (y + y2) / 2 + Math.cos(ang) * curva;
    s += `<path d="M${f(x)} ${f(y)} Q${f(mx)} ${f(my)} ${f(x2)} ${f(y2)}" stroke-width="${f(Math.max(w, 1.2))}"/>`;
    if (n === 0) { pontas.push([x2, y2]); return; }
    const filhos = n >= nivel - 1 ? 2 : (r() < .45 ? 3 : 2);
    for (let i = 0; i < filhos; i++) {
      const lado = filhos === 2 ? (i ? 1 : -1) : i - 1;
      const a = ang + lado * (abre * .55 + r() * abre * .6) + (r() - .5) * .25;
      galho(x2, y2, a, len * (.66 + r() * .14), w * .64, n - 1);
    }
  };
  galho(x, y, ang, tam, larg, nivel);
  const raiz = `<path d="M${f(x - larg * 1.6)} ${y + 2} Q${f(x - larg * .4)} ${y - 4} ${f(x - larg * .45)} ${f(y - tam * .35)} L${f(x + larg * .45)} ${f(y - tam * .35)} Q${f(x + larg * .4)} ${y - 4} ${f(x + larg * 1.7)} ${y + 2} Z" fill="${cor}"/>`;
  return { svg: `<g fill="none" stroke="${cor}" stroke-linecap="round">${s}</g>${raiz}`, pontas };
}

function pinheiro(x, y, h, cor, neve) {
  const tiers = [[0, .55, .34], [.28, .8, .26], [.52, 1, .18]];
  let s = `<rect x="${f(x - h * .04)}" y="${f(y - h * .08)}" width="${f(h * .08)}" height="${f(h * .1)}" fill="${cor}"/>`;
  for (const [b, t, l] of tiers) {
    const yb = y - h * b - h * .05, yt = y - h * t, hw = h * l;
    s += `<path d="M${f(x - hw)} ${f(yb)} Q${f(x)} ${f(yb + hw * .18)} ${f(x + hw)} ${f(yb)} L${f(x)} ${f(yt)} Z" fill="${cor}"/>`;
    if (neve) {
      const k = .42, yk = yt + (yb - yt) * k, wk = hw * k;
      s += `<path d="M${f(x)} ${f(yt)} L${f(x + wk)} ${f(yk)} Q${f(x + wk * .5)} ${f(yk - 5)} ${f(x + wk * .2)} ${f(yk + 3)} Q${f(x - wk * .2)} ${f(yk - 6)} ${f(x - wk * .5)} ${f(yk + 2)} Q${f(x - wk * .8)} ${f(yk - 4)} ${f(x - wk)} ${f(yk)} Z" fill="${neve}"/>`;
    }
  }
  return s;
}

/* ---------- formas ---------- */

function coracao(x, y, s, cor, rot = 0, extra = "") {
  return `<path transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(s)})" d="M0 30 C-40 4 -52 -26 -27 -38 C-12 -45 0 -35 0 -24 C0 -35 12 -45 27 -38 C52 -26 40 4 0 30 Z" fill="${cor}" ${extra}/>`;
}

function morcego(x, y, s, rot = 0, cor = "#1c0f2e") {
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="${cor}" d="M0 -6 C2 -10 4 -13 5 -17 L7 -10 C14 -15 25 -21 39 -18 C47 -16 53 -11 55 -6 C47 -9 42 -5 40 -1 C34 -5 28 -3 26 3 C20 -1 14 1 10 7 C6 4 3 8 0 14 C-3 8 -6 4 -10 7 C-14 1 -20 -1 -26 3 C-28 -3 -34 -5 -40 -1 C-42 -5 -47 -9 -55 -6 C-53 -11 -47 -16 -39 -18 C-25 -21 -14 -15 -7 -10 L-5 -17 C-4 -13 -2 -10 0 -6 Z"/>`;
}

function confetes(semente, n, x0, y0, x1, y1, cores) {
  const r = sorteio(semente);
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), c = cores[Math.floor(r() * cores.length)];
    if (r() < .35) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(2.5 + r() * 3)}" fill="${c}"/>`;
    else s += `<rect x="${f(x)}" y="${f(y)}" width="${f(6 + r() * 7)}" height="${f(3 + r() * 3)}" rx="1" fill="${c}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  return s;
}

// fita encaracolada (serpentina): uma linha que anda e dá voltinhas
function serpentina(x0, y0, x1, y1, voltas, raio, cor, larg = 4) {
  const pts = [];
  for (let i = 0; i <= voltas * 24; i++) {
    const t = i / (voltas * 24), a = t * voltas * Math.PI * 2;
    pts.push([x0 + (x1 - x0) * t + Math.cos(a) * raio, y0 + (y1 - y0) * t + Math.sin(a) * raio]);
  }
  return `<polyline points="${pts.map(p => f(p[0]) + "," + f(p[1])).join(" ")}" fill="none" stroke="${cor}" stroke-width="${larg}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

// fogos: raios saindo do centro, com pontinhas
function fogos(x, y, raio, cor, semente, n = 28) {
  const r = sorteio(semente);
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + r() * .1, k = .75 + r() * .3;
    const a1 = raio * .28, a2 = raio * k;
    const cx = Math.cos(a), cy = Math.sin(a);
    s += `<line x1="${f(x + cx * a1)}" y1="${f(y + cy * a1)}" x2="${f(x + cx * a2)}" y2="${f(y + cy * a2 + raio * .08 * k)}" stroke-width="2.2"/>`;
    s += `<circle cx="${f(x + cx * (a2 + 6))}" cy="${f(y + cy * (a2 + 6) + raio * .1)}" r="2.6" fill="${cor}" stroke="none"/>`;
  }
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * Math.PI * 2;
    s += `<circle cx="${f(x + Math.cos(a) * raio * .18)}" cy="${f(y + Math.sin(a) * raio * .18)}" r="1.8" fill="#fff" stroke="none"/>`;
  }
  return `<g stroke="${cor}" stroke-linecap="round" filter="url(#brilho)">${s}</g>`;
}

// janela iluminada com arco em cima (x = centro, y = topo)
function janela(x, y, w, h, { arco = true, cruz = true, cor = "#ffb23f", grade = "#24163a" } = {}) {
  const l = x - w / 2, rr = x + w / 2, topo = arco ? `L${f(l)} ${f(y + w / 2)} A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(rr)} ${f(y + w / 2)}` : `L${f(l)} ${f(y)} L${f(rr)} ${f(y)}`;
  let s = `<path d="M${f(l)} ${f(y + h)} ${topo} L${f(rr)} ${f(y + h)} Z" fill="${cor}" filter="url(#brilho)"/>`;
  if (cruz) s += `<path d="M${f(x)} ${f(y + 2)} V${f(y + h)} M${f(l)} ${f(y + h * .55)} H${f(rr)}" stroke="${grade}" stroke-width="${f(Math.max(2, w * .09))}"/>`;
  return s;
}
