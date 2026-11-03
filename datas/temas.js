// As datas comemorativas. Cada tema: pasta das imagens, cores da página e do céu, e a cena.
// Área da cena: 1100×680 (os ajudantes estão em base.js).

/* ---------- peças de cada tema ---------- */

function casaAssombrada(x, y, s, cor = "#211433") {
  const p = pts => `<polygon points="${pts}" fill="${cor}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${p("-150,0 -148,-80 -92,-82 -92,0")}${p("-168,-74 -124,-128 -82,-80")}
    ${p("94,0 97,-222 139,-226 141,0")}${p("86,-214 120,-310 152,-220")}
    ${p("-96,0 -88,-152 94,-146 97,0")}${p("-118,-140 -4,-218 116,-146")}
    ${p("-72,-150 -62,-262 62,-256 74,-150")}${p("-98,-250 -8,-316 88,-256")}
    ${p("-58,-268 -58,-306 -38,-306 -38,-282")}
    ${p("-42,-300 -36,-372 34,-378 30,-300")}${p("-62,-366 14,-478 56,-372")}
    <path d="M-200 0 V-34 M-185 0 V-38 M-170 0 V-34 M-205 -24 H-150" stroke="${cor}" stroke-width="6"/>
    ${janela(-52, -112, 38, 82)}${janela(32, -112, 38, 82)}
    ${janela(-122, -58, 24, 34, { arco: false })}${janela(118, -168, 20, 30)}
    <circle cx="4" cy="-206" r="17" fill="#ffb23f" filter="url(#brilho)"/><path d="M4 -223 V-189 M-13 -206 H21" stroke="${cor}" stroke-width="3"/>
    ${janela(-32, -236, 24, 30, { arco: false })}
    ${janela(-2, -352, 26, 40)}
  </g>`;
}

function abobora(x, y, s) {
  const id = novoId("ab");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs><radialGradient id="${id}" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#ffe08a"/><stop offset=".6" stop-color="#ffa53a"/><stop offset="1" stop-color="#ff7a1a"/></radialGradient></defs>
    <path d="M-6 -44 C-7 -58 2 -68 13 -70 L15 -63 C7 -60 6 -52 7 -44 Z" fill="#2f1d22"/>
    <g fill="#2a1840" stroke="#402a5e" stroke-width="3">
      <ellipse cx="-28" cy="0" rx="36" ry="44"/><ellipse cx="28" cy="0" rx="36" ry="44"/><ellipse cx="0" cy="0" rx="34" ry="47"/>
    </g>
    <g fill="url(#${id})" filter="url(#brilho)">
      <path d="M-34 -10 L-10 -6 L-24 -26 Z"/><path d="M34 -10 L10 -6 L24 -26 Z"/><path d="M-4 0 L4 0 L0 9 Z"/>
      <path d="M-36 12 Q0 26 36 12 Q30 36 0 38 Q-30 36 -36 12 Z"/>
    </g>
    <path d="M-16 18 v8 h8 v-6 M8 20 v6 h8 v-8" fill="#2a1840"/>
  </g>`;
}

function teia(x, y, s, rot, cor = "#1e1033") {
  const raios = [0, 22.5, 45, 67.5, 90].map(a => a * Math.PI / 180);
  let d = raios.map(a => `M0 0 L${f(Math.cos(a) * 200)} ${f(Math.sin(a) * 200)}`).join(" ");
  for (const R of [36, 66, 98, 132, 168]) for (let i = 0; i < raios.length - 1; i++) {
    const a = raios[i], b = raios[i + 1], m = (a + b) / 2;
    d += ` M${f(Math.cos(a) * R)} ${f(Math.sin(a) * R)} Q${f(Math.cos(m) * R * .8)} ${f(Math.sin(m) * R * .8)} ${f(Math.cos(b) * R)} ${f(Math.sin(b) * R)}`;
  }
  return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="${d}" fill="none" stroke="${cor}" stroke-width="2.6" stroke-linecap="round"/>`;
}

function lapide(x, y, s, cor) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M-16 0 V-32 A16 16 0 0 1 16 -32 V0 Z" fill="${cor}"/>`;
}

function estrela5(x, y, R, cor, extra = "") {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * .45 : R;
    d += (i ? "L" : "M") + f(x + Math.cos(a) * r) + " " + f(y + Math.sin(a) * r);
  }
  return `<path d="${d}Z" fill="${cor}" ${extra}/>`;
}

function arvoreNatal(x, y, h) {
  const r = sorteio(12);
  const cores = ["#ff4d5e", "#ffd34d", "#4dc3ff", "#ff8ad8", "#ffffff", "#ff9a3c"];
  let s = `<rect x="${x - 14}" y="${y - h * .1}" width="28" height="${h * .12}" fill="#5b3420"/>`;
  let enfeites = "";
  for (let i = 0; i < 4; i++) {
    const yb = y - h * .08 - h * i * .2, yt = yb - h * .36, hw = h * (.36 - i * .07);
    s += `<path d="M${f(x - hw)} ${f(yb)} Q${f(x)} ${f(yb + hw * .22)} ${f(x + hw)} ${f(yb)} L${f(x)} ${f(yt)} Z" fill="#1f7a4a"/>`;
    s += `<path d="M${f(x)} ${f(yt)} L${f(x + hw)} ${f(yb)} Q${f(x + hw * .5)} ${f(yb + hw * .16)} ${f(x)} ${f(yb + hw * .22)} Z" fill="#17603a"/>`;
    s += `<path d="M${f(x - hw * .72)} ${f(yb - h * .05)} Q${f(x)} ${f(yb + h * .02)} ${f(x + hw * .62)} ${f(yb - h * .16)}" fill="none" stroke="#ffd66b" stroke-width="3.5" stroke-linecap="round"/>`;
    for (let k = 0; k < 6; k++) {
      const yy = yt + 22 + r() * (yb - yt - 26), lim = hw * (yy - yt) / (yb - yt) * .82;
      enfeites += `<circle cx="${f(x + (r() * 2 - 1) * lim)}" cy="${f(yy)}" r="${f(5 + r() * 3)}" fill="${cores[(i * 6 + k) % cores.length]}" filter="url(#brilho)"/>`;
    }
  }
  return s + enfeites + estrela5(x, y - h * .98, 26, "#ffd84a", `filter="url(#brilhoForte)"`);
}

function bonecoDeNeve(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-30 -120 L-78 -150 M-62 -140 L-70 -160 M30 -120 L76 -146 M60 -136 L72 -154" stroke="#5b3420" stroke-width="5" stroke-linecap="round"/>
    <circle cx="0" cy="-48" r="50" fill="#fbfdff"/><circle cx="0" cy="-122" r="36" fill="#fbfdff"/><circle cx="0" cy="-180" r="27" fill="#fbfdff"/>
    <path d="M18 -86 A50 50 0 0 1 14 -2 A50 50 0 0 0 18 -86 Z M20 -150 A36 36 0 0 1 22 -94 A40 40 0 0 0 20 -150 Z" fill="#dbe6f5"/>
    <path d="M-28 -150 Q0 -138 28 -150 L28 -140 Q0 -128 -28 -140 Z M12 -142 L22 -100 L34 -102 L24 -144 Z" fill="#e8324a"/>
    <rect x="-30" y="-206" width="60" height="7" rx="3" fill="#1d2233"/><rect x="-20" y="-240" width="40" height="36" rx="3" fill="#1d2233"/><rect x="-20" y="-216" width="40" height="7" fill="#e8324a"/>
    <circle cx="-9" cy="-184" r="3.5" fill="#1d2233"/><circle cx="9" cy="-184" r="3.5" fill="#1d2233"/>
    <path d="M0 -178 L26 -172 L0 -170 Z" fill="#ff8a2a"/>
    <circle cx="0" cy="-122" r="4" fill="#1d2233"/><circle cx="0" cy="-104" r="4" fill="#1d2233"/><circle cx="0" cy="-62" r="4.5" fill="#1d2233"/><circle cx="0" cy="-40" r="4.5" fill="#1d2233"/>
  </g>`;
}

function casinhaNeve(x, y, s, parede, telhado) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="22" y="-96" width="14" height="30" fill="${telhado}"/><rect x="20" y="-100" width="18" height="6" rx="3" fill="#fff"/>
    <rect x="-45" y="-58" width="90" height="58" fill="${parede}"/>
    <path d="M-56 -54 L0 -94 L56 -54 Z" fill="${telhado}"/>
    <path d="M-60 -52 Q-58 -60 -50 -60 L0 -98 L50 -60 Q58 -60 60 -52 Q48 -56 40 -50 Q30 -58 20 -52 Q0 -60 -14 -52 Q-30 -60 -40 -52 Q-50 -58 -60 -52 Z" fill="#fff"/>
    <rect x="-34" y="-42" width="22" height="20" fill="#ffc861" filter="url(#brilho)"/><path d="M-23 -42 V-22 M-34 -32 H-12" stroke="${parede}" stroke-width="2.5"/>
    <rect x="10" y="-36" width="22" height="36" rx="2" fill="#6b3b22"/><circle cx="27" cy="-18" r="2" fill="#ffd66b"/>
  </g>`;
}

function presente(x, y, w, h, cor, fita) {
  return `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${cor}"/>
    <rect x="${x - 4}" y="${y - h}" width="8" height="${h}" fill="${fita}"/><rect x="${x - w / 2}" y="${y - h * .62}" width="${w}" height="7" fill="${fita}"/>
    <path d="M${x} ${y - h} C${x - 18} ${y - h - 18} ${x - 22} ${y - h - 2} ${x} ${y - h} C${x + 18} ${y - h - 18} ${x + 22} ${y - h - 2} ${x} ${y - h} Z" fill="none" stroke="${fita}" stroke-width="4"/>`;
}

function taca(x, y, s, rot) {
  const id = novoId("champ");
  const bolhas = [[-4, -128], [5, -116], [-2, -104], [4, -136], [0, -96]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#fff8d8"/>`).join("");
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a3"/><stop offset="1" stop-color="#f2b33d"/></linearGradient></defs>
    <path d="M-15 -142 L15 -142 C15 -116 11 -98 3 -89 L-3 -89 C-11 -98 -15 -116 -15 -142 Z" fill="url(#${id})" opacity=".95"/>${bolhas}
    <path d="M-17 -175 L17 -175 C17 -122 12 -96 3 -86 L3 -18 L24 -6 Q0 0 -24 -6 L-3 -18 L-3 -86 C-12 -96 -17 -122 -17 -175 Z" fill="#ffffff" fill-opacity=".1" stroke="#ffffff" stroke-opacity=".85" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-11 -168 C-11 -130 -8 -110 -3 -100" stroke="#fff" stroke-opacity=".6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>`;
}

function predios(semente, x0, x1, base, cor) {
  const r = sorteio(semente);
  let s = "", luzes = "";
  for (let x = x0; x < x1;) {
    const w = 26 + r() * 34, h = 30 + r() * 95;
    s += `<rect x="${f(x)}" y="${f(base - h)}" width="${f(w + 1)}" height="${f(h + 2)}" fill="${cor}"/>`;
    for (let yy = base - h + 8; yy < base - 6; yy += 10) for (let xx = x + 5; xx < x + w - 6; xx += 8)
      if (r() < .3) luzes += `<rect x="${f(xx)}" y="${f(yy)}" width="3.5" height="4.5" fill="#ffd77a" opacity="${f(.5 + r() * .5)}"/>`;
    x += w;
  }
  return s + luzes;
}

function pena(x, y, L, ang, cor) {
  const w = L * .2;
  return `<g transform="translate(${x} ${y}) rotate(${ang})">
    <path d="M0 0 C${f(w * 1.3)} ${f(-L * .3)} ${f(w * 1.2)} ${f(-L * .78)} 0 ${-L} C${f(-w * 1.2)} ${f(-L * .78)} ${f(-w * 1.3)} ${f(-L * .3)} 0 0 Z" fill="${cor}"/>
    <path d="M0 0 L0 ${f(-L * .95)}" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>
  </g>`;
}

function mascara(x, y, s) {
  const id = novoId("masc");
  const brilhos = [-120, -96, -70, 70, 96, 120].map((a, i) => `<circle cx="${a}" cy="${-40 + Math.abs(a) * .12 - 18 + (i % 3) * 2}" r="4" fill="#fff6c2"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a2be2"/><stop offset=".55" stop-color="#d21f8c"/><stop offset="1" stop-color="#ff4f6a"/></linearGradient></defs>
    <path d="M-118 40 L-170 150" stroke="#ffd166" stroke-width="10" stroke-linecap="round"/>
    ${pena(118, -40, 170, -8, "#2ec4b6")}${pena(124, -36, 150, 20, "#ffbe0b")}${pena(110, -44, 140, -34, "#3a86ff")}${pena(130, -30, 120, 44, "#ff006e")}${pena(100, -46, 110, -56, "#8ac926")}
    <path fill-rule="evenodd" fill="url(#${id})" stroke="#ffd166" stroke-width="6" stroke-linejoin="round"
      d="M-150 -20 C-140 -72 -60 -82 0 -50 C60 -82 140 -72 150 -20 C155 30 110 70 60 60 C30 55 15 35 0 35 C-15 35 -30 55 -60 60 C-110 70 -155 30 -150 -20 Z
         M-106 -12 C-96 -40 -50 -40 -34 -8 C-50 12 -96 12 -106 -12 Z M106 -12 C96 -40 50 -40 34 -8 C50 12 96 12 106 -12 Z"/>
    <path d="M-106 -12 C-96 -40 -50 -40 -34 -8 M106 -12 C96 -40 50 -40 34 -8" fill="none" stroke="#ffd166" stroke-width="4"/>
    ${brilhos}${estrela5(0, -8, 12, "#ffd166")}
  </g>`;
}

function casario(semente, base) {
  const r = sorteio(semente);
  const cores = ["#2ec4b6", "#ff9f1c", "#e71d73", "#8338ec", "#ffbe0b", "#3a86ff", "#06d6a0", "#f15bb5"];
  let s = "", x = -10, i = 0;
  while (x < 1110) {
    const w = 96 + r() * 40, h = 150 + r() * 70, c = cores[(i + 3) % cores.length], topo = base - h;
    s += `<rect x="${f(x)}" y="${f(topo)}" width="${f(w + 1)}" height="${f(h)}" fill="${c}"/>`;
    s += r() < .45
      ? `<path d="M${f(x - 4)} ${f(topo + 2)} L${f(x + w / 2)} ${f(topo - 30)} L${f(x + w + 4)} ${f(topo + 2)} Z" fill="${c}" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>`
      : `<rect x="${f(x - 4)}" y="${f(topo - 10)}" width="${f(w + 8)}" height="14" fill="#fff"/>`;
    for (const yy of [topo + 26, topo + 92]) for (const xx of [x + w * .28, x + w * .72]) {
      s += `<rect x="${f(xx - 12)}" y="${f(yy)}" width="24" height="40" rx="12" fill="#2b2d5c" stroke="#fff" stroke-width="4"/>`;
    }
    s += `<path d="M${f(x + 8)} ${f(topo + 70)} H${f(x + w - 8)}" stroke="#fff" stroke-width="4"/>`;
    x += w; i++;
  }
  return s;
}

function ovo(x, y, s, rot, base, enfeite, padrao) {
  const id = novoId("ovo");
  const d = "M0 -50 C28 -50 40 -5 40 15 C40 40 22 52 0 52 C-22 52 -40 40 -40 15 C-40 -5 -28 -50 0 -50 Z";
  let p = "";
  if (padrao === "zigue") p = `<path d="M-45 0 L-35 -12 L-25 0 L-15 -12 L-5 0 L5 -12 L15 0 L25 -12 L35 0 L45 -12 V8 L35 20 L25 8 L15 20 L5 8 L-5 20 L-15 8 L-25 20 L-35 8 L-45 20 Z" fill="${enfeite}"/>`;
  if (padrao === "bolinhas") p = [[-16, -22], [12, -30], [20, 4], [-22, 12], [0, -6], [4, 32], [-12, 34], [28, 26]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7" fill="${enfeite}"/>`).join("");
  if (padrao === "listras") p = `<path d="M-45 -24 Q0 -14 45 -24 V-14 Q0 -4 -45 -14 Z M-45 10 Q0 20 45 10 V22 Q0 32 -45 22 Z" fill="${enfeite}"/><path d="M-45 -2 H45" stroke="#fff" stroke-width="4" stroke-dasharray="4 7"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
    <path d="${d}" fill="${base}"/><g clip-path="url(#${id})">${p}<ellipse cx="22" cy="10" rx="20" ry="48" fill="#000" opacity=".07"/></g>
    <ellipse cx="-16" cy="-24" rx="7" ry="13" fill="#fff" opacity=".45" transform="rotate(20 -16 -24)"/>
  </g>`;
}

function coelho(x, y, s) {
  const formas = `<ellipse cx="-15" cy="-6" rx="38" ry="10"/><ellipse cx="-15" cy="-45" rx="55" ry="45"/><ellipse cx="15" cy="-62" rx="44" ry="54"/>
    <ellipse cx="22" cy="-188" rx="12" ry="44" transform="rotate(-20 22 -188)"/><ellipse cx="46" cy="-194" rx="13" ry="46" transform="rotate(-4 46 -194)"/>
    <ellipse cx="50" cy="-126" rx="37" ry="33"/><ellipse cx="80" cy="-116" rx="17" ry="15"/><ellipse cx="50" cy="-8" rx="21" ry="9"/><circle cx="-72" cy="-40" r="16"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g fill="#d9c3ad" stroke="#d9c3ad" stroke-width="7">${formas}</g>
    <g fill="#fffaf3">${formas}</g>
    <ellipse cx="46" cy="-190" rx="6" ry="32" transform="rotate(-4 46 -190)" fill="#f8bfd0"/>
    <path d="M-38 -14 Q-8 -40 -18 -86" fill="none" stroke="#ead8c5" stroke-width="4" stroke-linecap="round"/>
    <circle cx="62" cy="-133" r="5" fill="#3a2a2a"/><circle cx="64" cy="-135" r="1.6" fill="#fff"/>
    <ellipse cx="95" cy="-120" rx="5" ry="4" fill="#f28fae"/><circle cx="68" cy="-112" r="8" fill="#f8bfd0" opacity=".6"/>
  </g>`;
}

function cesta(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-62 -40 C-62 -130 62 -130 62 -40" fill="none" stroke="#b47a43" stroke-width="10"/>
    ${ovo(-30, -52, .55, -15, "#ffcf5c", "#ff7aa8", "zigue")}${ovo(2, -60, .6, 4, "#9ad8ff", "#ffffff", "bolinhas")}${ovo(32, -50, .55, 18, "#c7a6ff", "#ffe066", "listras")}
    <path d="M-72 -42 H72 L60 0 Q0 10 -60 0 Z" fill="#c98b4f"/>
    <path d="M-68 -28 H68 M-64 -14 H64 M-48 -42 L-44 2 M-24 -42 L-22 4 M0 -42 V5 M24 -42 L22 4 M48 -42 L44 2" stroke="#a86f3a" stroke-width="3"/>
    <rect x="-76" y="-48" width="152" height="12" rx="6" fill="#b47a43"/>
  </g>`;
}

function flor(x, y, s, cor) {
  const p = [0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-9" rx="6" ry="9" transform="rotate(${a})" fill="${cor}"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 V26" stroke="#4f9e45" stroke-width="3"/>${p}<circle r="5" fill="#ffd23f"/></g>`;
}

function tulipa(x, y, s, cor) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 Q-4 30 0 60" fill="none" stroke="#4f9e45" stroke-width="4"/><path d="M0 50 Q-24 30 -20 14 Q-6 30 0 50 Z" fill="#5fb34f"/>
    <path d="M-14 -22 Q-16 0 0 2 Q16 0 14 -22 L8 -12 L0 -26 L-8 -12 Z" fill="${cor}"/>
  </g>`;
}

function borboleta(x, y, s, cor, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="${cor}">
    <ellipse cx="-11" cy="-8" rx="12" ry="9" transform="rotate(-30 -11 -8)"/><ellipse cx="11" cy="-8" rx="12" ry="9" transform="rotate(30 11 -8)"/>
    <ellipse cx="-8" cy="7" rx="8" ry="6" transform="rotate(25 -8 7)"/><ellipse cx="8" cy="7" rx="8" ry="6" transform="rotate(-25 8 7)"/>
    <ellipse rx="2.5" ry="11" fill="#5a3b2a"/>
  </g>`;
}

function banco(x, y, s, cor) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${cor}">
    <rect x="-70" y="-46" width="140" height="8" rx="2"/><rect x="-70" y="-64" width="140" height="7" rx="2"/><rect x="-70" y="-80" width="140" height="7" rx="2"/>
    <rect x="-62" y="-82" width="6" height="82"/><rect x="56" y="-82" width="6" height="82"/><rect x="-40" y="-42" width="5" height="42"/><rect x="35" y="-42" width="5" height="42"/>
  </g>`;
}

function balaoCoracao(x, y, s, cor, ax, ay) {
  return `<path d="M${x} ${y + 30 * s} C${x - 30} ${f((y + ay) / 2)} ${ax + 20} ${f((y + ay) / 2 + 40)} ${ax} ${ay}" fill="none" stroke="#2b0a22" stroke-width="1.6"/>
    ${coracao(x, y, s, cor)}<ellipse cx="${f(x - 18 * s)}" cy="${f(y - 20 * s)}" rx="${f(7 * s)}" ry="${f(11 * s)}" fill="#fff" opacity=".4" transform="rotate(-30 ${f(x - 18 * s)} ${f(y - 20 * s)})"/>`;
}

function varal(ax, ay, bx, by, cair, semente) {
  const r = sorteio(semente);
  const cores = ["#e63946", "#ffd23f", "#3a86ff", "#06d6a0", "#ff8c42", "#f15bb5", "#ffffff"];
  const cx = (ax + bx) / 2, cy = (ay + by) / 2 + cair * 2;
  const P = t => [(1 - t) ** 2 * ax + 2 * (1 - t) * t * cx + t * t * bx, (1 - t) ** 2 * ay + 2 * (1 - t) * t * cy + t * t * by];
  const n = Math.round(Math.hypot(bx - ax, by - ay) / 36);
  let s = `<path d="M${ax} ${ay} Q${f(cx)} ${f(cy)} ${bx} ${by}" fill="none" stroke="#f3e6c8" stroke-width="1.8"/>`;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = P((i + .12) / n), [x2, y2] = P((i + .88) / n), c = cores[(i + Math.floor(r() * 2)) % cores.length];
    s += `<path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)} L${f((x1 + x2) / 2)} ${f((y1 + y2) / 2 + 34)} Z" fill="${c}"/>`;
    if (r() < .3) s += `<circle cx="${f((x1 + x2) / 2)}" cy="${f((y1 + y2) / 2 + 10)}" r="3" fill="${c === "#ffffff" ? "#e63946" : "#fff"}"/>`;
  }
  return s;
}

function balaoJunino(x, y, s, cores) {
  const id = novoId("bj");
  const d = "M0 -60 C25 -60 40 -30 38 0 C36 25 18 45 8 55 L-8 55 C-18 45 -36 25 -38 0 C-40 -30 -25 -60 0 -60 Z";
  const faixas = cores.map((c, i) => `<rect x="-45" y="${-62 + i * 20}" width="90" height="20" fill="${c}"/>`).join("");
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs><clipPath id="${id}"><path d="${d}"/></clipPath><radialGradient id="${id}l" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#fff3c4" stop-opacity=".7"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient></defs>
    <g clip-path="url(#${id})">${faixas}<rect x="-45" y="-62" width="90" height="120" fill="url(#${id}l)"/></g>
    <rect x="-9" y="54" width="18" height="5" fill="#6b4a2a"/>
    <path d="M0 62 Q6 70 0 80 Q-6 70 0 62 Z" fill="#ffcf4a" filter="url(#brilho)"/>
  </g>`;
}

function capelinha(x, y, s, cor) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${cor}">
    <rect x="-60" y="-90" width="120" height="90"/><path d="M-72 -86 L0 -140 L72 -86 Z"/>
    <rect x="-22" y="-200" width="44" height="80"/><path d="M-28 -196 L0 -232 L28 -196 Z"/>
    <path d="M0 -232 V-262 M-11 -250 H11" stroke="${cor}" stroke-width="5"/>
    ${janela(0, -186, 18, 26, { cruz: false, grade: cor })}
    <path d="M-16 0 V-40 A16 16 0 0 1 16 -40 V0 Z" fill="#ffb347" filter="url(#brilho)"/>
    <circle cx="0" cy="-110" r="11" fill="#ffd27a" filter="url(#brilho)"/>
    ${janela(-38, -64, 16, 28, { cruz: false, grade: cor })}${janela(38, -64, 16, 28, { cruz: false, grade: cor })}
  </g>`;
}

function milho(x, y, h, cor, semente) {
  const r = sorteio(semente);
  let s = `<path d="M${x} ${y} Q${x + 8} ${y - h * .5} ${x + 4} ${y - h}" fill="none" stroke="${cor}" stroke-width="7" stroke-linecap="round"/>`;
  for (let i = 0; i < 6; i++) {
    const sy = y - h * (.15 + i * .14), sx = x + 5, dir = i % 2 ? 1 : -1, L = 70 + r() * 40;
    s += `<path d="M${sx} ${f(sy)} Q${f(sx + dir * L * .5)} ${f(sy - 40)} ${f(sx + dir * L)} ${f(sy + 6)} Q${f(sx + dir * L * .5)} ${f(sy - 24)} ${sx} ${f(sy + 10)} Z" fill="${cor}"/>`;
  }
  s += `<path d="M${x + 4} ${y - h} l-12 -26 M${x + 4} ${y - h} l2 -30 M${x + 4} ${y - h} l14 -24" stroke="${cor}" stroke-width="3" stroke-linecap="round"/>`;
  s += `<ellipse cx="${x + 18}" cy="${f(y - h * .45)}" rx="9" ry="24" fill="#e9b949" transform="rotate(16 ${x + 18} ${f(y - h * .45)})"/>`;
  s += `<path d="M${x + 6} ${f(y - h * .3)} Q${x + 30} ${f(y - h * .38)} ${x + 26} ${f(y - h * .58)} Q${x + 14} ${f(y - h * .4)} ${x + 6} ${f(y - h * .38)} Z" fill="${cor}"/>`;
  return s;
}

function fogueira(x, y) {
  const r = sorteio(77);
  const lingua = (dx, w, h, lean, cor) => {
    const a = x + dx;
    return `<path d="M${f(a - w / 2)} ${y} C${f(a - w / 2)} ${f(y - h * .5)} ${f(a + lean - w * .15)} ${f(y - h * .6)} ${f(a + lean)} ${f(y - h)} C${f(a + lean + w * .2)} ${f(y - h * .55)} ${f(a + w / 2)} ${f(y - h * .45)} ${f(a + w / 2)} ${y} Z" fill="${cor}"/>`;
  };
  const tora = (ang, c = "#6b3a1f") => `<g transform="translate(${x} ${y + 6}) rotate(${ang})"><rect x="-80" y="-10" width="160" height="20" rx="10" fill="${c}"/><circle cx="72" cy="0" r="9" fill="#b0703f"/><circle cx="72" cy="0" r="4" fill="#7a4524"/></g>`;
  let faisca = "";
  for (let i = 0; i < 26; i++) faisca += `<circle cx="${f(x + (r() - .5) * 220)}" cy="${f(y - 120 - r() * 220)}" r="${f(1.2 + r() * 2.2)}" fill="${r() < .5 ? "#ffd166" : "#ff8c42"}" filter="url(#brilho)"/>`;
  return `<ellipse cx="${x}" cy="${y + 4}" rx="320" ry="70" fill="#ff8c3a" opacity=".22" filter="url(#desfoque)"/>
    <circle cx="${x}" cy="${y - 70}" r="150" fill="#ff9a3c" opacity=".22" filter="url(#desfoque)"/>
    ${tora(-18)}${tora(18, "#5e3219")}
    <g filter="url(#brilho)">
      ${lingua(-46, 60, 120, -10, "#e8412c")}${lingua(-10, 80, 190, 6, "#e8412c")}${lingua(36, 64, 140, 12, "#e8412c")}
      ${lingua(-28, 54, 110, -6, "#ff8c2a")}${lingua(4, 66, 150, 4, "#ff8c2a")}${lingua(32, 44, 100, 10, "#ff8c2a")}
      ${lingua(-10, 40, 80, -4, "#ffd54a")}${lingua(12, 40, 100, 6, "#ffd54a")}
    </g>
    ${tora(-6, "#7a4524")}${faisca}`;
}

/* ---------- os temas ---------- */

const fundoPagina = (meio, borda) => `radial-gradient(ellipse 75% 85% at 50% 42%, ${meio} 0%, ${borda} 70%)`;

const TEMAS = {
  halloween: {
    pasta: "33-halloween", titulo: "Halloween",
    selo: { fundo: "#2a1745", cor: "#f3d9ff", destaque: "#ffb23f" },
    pagina: fundoPagina("#2b1746", "#110a22"),
    ceu: [[0, "#f7a3dc"], [.42, "#c47cc4"], [.72, "#7f5698"], [1, "#3d2659"]],
    cena() {
      const sil = "#211433";
      const longe1 = arvore(110, 575, { tam: 62, larg: 8, nivel: 6, cor: "#4e3070", semente: 4, torto: .6 });
      const longe2 = arvore(990, 572, { tam: 68, larg: 9, nivel: 6, cor: "#4e3070", semente: 9, torto: .6 });
      const grande = arvore(780, 610, { tam: 130, larg: 26, nivel: 5, cor: sil, semente: 7, torto: .6, abre: .55 });
      return [
        nuvem(560, 92, .9, "#ffc4ec", .75), nuvem(710, 130, 1.4, "#f6b3e6", .65), nuvem(960, 300, .9, "#f0b0e2", .5), nuvem(250, 200, .8, "#f6b3e6", .55),
        lua(880, 118, 42),
        morcego(530, 140, .55, -8, sil), morcego(500, 235, 1.25, 4, sil), morcego(575, 330, .5, 10, sil), morcego(905, 235, .6, -6, sil),
        `<path d="M0 560 C120 525 220 545 330 535 C470 520 560 548 700 540 C840 530 950 512 1100 545 V680 H0Z" fill="#5a3a78" opacity=".55"/>`,
        longe1.svg, longe2.svg,
        casaAssombrada(300, 598, .86, sil),
        lapide(470, 600, 1, sil), lapide(505, 604, .75, sil),
        grande.svg,
        `<path d="M0 600 C110 578 220 576 330 590 C460 604 560 592 650 598 C760 608 880 594 1000 600 C1050 603 1080 598 1100 600 V680 H0Z" fill="#170c28"/>`,
        abobora(150, 616, .55), abobora(560, 606, .82), abobora(915, 614, .62),
        teia(50, 60, 1, 0), teia(1070, 40, 1, 90),
      ].join("");
    },
  },

  natal: {
    pasta: "34-natal", titulo: "Natal",
    selo: { fundo: "#13284f", cor: "#e3edf9", destaque: "#ffd84a" },
    pagina: fundoPagina("#16305e", "#08132b"),
    ceu: [[0, "#0d2150"], [.5, "#21508f"], [.82, "#6f9bd4"], [1, "#a9c6ea"]],
    cena() {
      const r = sorteio(3);
      let pinheiros = "";
      for (const [x, h] of [[90, 80], [130, 60], [700, 70], [745, 95], [790, 66], [960, 84], [1010, 64], [1050, 90]]) pinheiros += pinheiro(x, 462, h, "#2a4f86", "#e7f0fb");
      let neve = "";
      for (let i = 0; i < 110; i++) neve += `<circle cx="${f(r() * 1100)}" cy="${f(r() * 640)}" r="${f(1.2 + r() * 2.6)}" fill="#fff" opacity="${f(.5 + r() * .5)}"/>`;
      return [
        estrelas(5, 90, 0, 0, 1100, 380),
        lua(900, 115, 36, { cor: "#f4f7ff", sombra: "#d9e2f5", halo: "#e9f0ff" }),
        `<path d="M0 470 C150 430 260 450 380 440 C520 428 640 465 780 450 C900 438 1000 420 1100 445 V680 H0Z" fill="#c4d8f1"/>`,
        pinheiros,
        `<path d="M0 548 C140 505 280 520 420 532 C560 544 700 520 820 530 C940 540 1020 520 1100 528 V680 H0Z" fill="#e3edf9"/>`,
        casinhaNeve(190, 555, 1, "#b8434f", "#6e2433"), casinhaNeve(310, 548, .8, "#4a7bb8", "#28406b"),
        pinheiro(105, 560, 120, "#1d4f3e", "#fff"), pinheiro(985, 562, 130, "#1d4f3e", "#fff"),
        arvoreNatal(560, 612, 360),
        `<path d="M0 604 C200 578 380 604 560 600 C760 596 900 582 1100 598 V680 H0Z" fill="#f6f9ff"/>`,
        presente(500, 622, 46, 38, "#e8324a", "#ffd34d"), presente(612, 626, 56, 30, "#3a86ff", "#ffffff"), presente(658, 628, 34, 26, "#ffd34d", "#e8324a"),
        bonecoDeNeve(840, 630, .95),
        neve,
      ].join("");
    },
  },

  reveillon: {
    pasta: "35-reveillon", titulo: "Réveillon",
    selo: { fundo: "#141a46", cor: "#e6e9ff", destaque: "#ffd36b" },
    pagina: fundoPagina("#18205a", "#070b22"),
    ceu: [[0, "#060b26"], [.45, "#141c52"], [.72, "#3a2d74"], [.8, "#7a3f86"], [1, "#7a3f86"]],
    cena() {
      const bursts = [[300, 150, 95, "#ffd36b", 1], [560, 115, 125, "#ff6fb8", 2], [830, 170, 100, "#6fe3ff", 3], [430, 300, 62, "#b4ff8a", 4], [960, 92, 58, "#fff2b0", 5], [700, 305, 66, "#ffa25a", 6]];
      return [
        estrelas(8, 80, 0, 0, 1100, 420),
        bursts.map(([x, y, , c]) => `<path d="M${x + 20} 500 Q${x + 8} ${(y + 500) / 2} ${x} ${y + 20}" stroke="${c}" stroke-width="1.6" fill="none" opacity=".35"/>`).join(""),
        bursts.map(([x, y, R, c, sd]) => fogos(x, y, R, c, sd)).join(""),
        `<rect x="0" y="500" width="1100" height="180" fill="#1a1a4d"/>`,
        bursts.map(([x, , R, c]) => [0, 1, 2, 3, 4, 5].map(i => `<rect x="${f(x - R * (.3 - i * .04))}" y="${512 + i * 14}" width="${f(R * (.6 - i * .08))}" height="3" rx="1.5" fill="${c}" opacity="${f(.55 - i * .08)}"/>`).join("")).join(""),
        `<path d="M0 500 V430 C30 420 50 400 70 395 C110 330 150 296 190 300 C232 306 248 360 256 420 C262 460 280 488 300 500 Z" fill="#0b0f2e"/>`,
        `<path d="M270 500 C300 455 340 438 384 446 C420 452 440 480 462 500 Z" fill="#0b0f2e"/>`,
        `<path d="M192 302 L380 446" stroke="#0b0f2e" stroke-width="1.5"/><rect x="278" y="364" width="12" height="8" rx="2" fill="#0b0f2e" transform="rotate(37 284 368)"/>`,
        predios(21, 600, 1110, 502, "#0b0f2e"),
        `<path d="M0 612 C200 596 420 606 600 600 C780 594 940 606 1100 598 V680 H0Z" fill="#090d26"/>`,
        taca(900, 640, 1, 14), taca(990, 640, 1, -14),
        brilhinho(945, 462, 14, "#fff6c8"), brilhinho(922, 440, 7, "#fff"), brilhinho(970, 436, 8, "#fff"),
      ].join("");
    },
  },

  carnaval: {
    pasta: "36-carnaval", titulo: "Carnaval",
    selo: { fundo: "#3f0f5c", cor: "#ffe3f1", destaque: "#ff4f9a" },
    pagina: fundoPagina("#3f0f5c", "#1c0530"),
    ceu: [[0, "#ff3d8b"], [.45, "#ff7a45"], [.8, "#ffc23d"], [1, "#ffe07a"]],
    cena() {
      let raios = "";
      for (let i = 0; i < 24; i += 2) {
        const a = i / 24 * Math.PI * 2, b = (i + 1) / 24 * Math.PI * 2;
        raios += `<path d="M550 290 L${f(550 + Math.cos(a) * 900)} ${f(290 + Math.sin(a) * 900)} L${f(550 + Math.cos(b) * 900)} ${f(290 + Math.sin(b) * 900)} Z" fill="#fff" opacity=".12"/>`;
      }
      const cores = ["#ffffff", "#2ec4b6", "#3a86ff", "#8338ec", "#ffbe0b", "#06d6a0", "#ff006e"];
      return [
        raios,
        serpentina(90, 130, 480, 70, 7, 14, "#2ec4b6", 4), serpentina(640, 60, 1050, 150, 7, 14, "#8338ec", 4),
        serpentina(60, 330, 330, 400, 5, 12, "#3a86ff", 4), serpentina(800, 330, 1060, 280, 5, 12, "#06d6a0", 4),
        confetes(14, 140, 40, 30, 1060, 470, cores),
        mascara(540, 270, 1.05),
        casario(5, 690),
        confetes(15, 50, 40, 470, 1060, 660, cores),
      ].join("");
    },
  },

  pascoa: {
    pasta: "37-pascoa", titulo: "Páscoa",
    selo: { fundo: "#ffffff", cor: "#7a5a8a", destaque: "#ff7aa8" },
    pagina: fundoPagina("#fffaf1", "#f3e3ee"),
    ceu: [[0, "#9fd8f7"], [.55, "#d4effc"], [1, "#fff6dc"]],
    cena() {
      const r = sorteio(19);
      let raios = "";
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2;
        raios += `<path d="M${f(240 + Math.cos(a) * 62)} ${f(175 + Math.sin(a) * 62)} L${f(240 + Math.cos(a) * 86)} ${f(175 + Math.sin(a) * 86)}" stroke="#ffd95a" stroke-width="6" stroke-linecap="round"/>`;
      }
      let flores = "";
      const coresFlor = ["#ffffff", "#ffb3c7", "#ffe066", "#c7a6ff"];
      for (let i = 0; i < 34; i++) {
        const x = 40 + r() * 1020, y = 540 + r() * 110;
        if (x > 340 && x < 760 && y < 600) continue;
        flores += flor(f(x), f(y), .7 + r() * .4, coresFlor[i % 4]);
      }
      let grama = "";
      for (let x = 0; x < 1100; x += 9) grama += `<path d="M${x} 680 Q${x + 3} ${f(650 - r() * 14)} ${x + 6 + r() * 6} ${f(632 - r() * 18)} Q${x + 7} 655 ${x + 10} 680 Z" fill="${r() < .5 ? "#6fb85c" : "#7cc46a"}"/>`;
      return [
        lua(240, 175, 52, { cor: "#fff1a8", halo: "#fff4b8", crateras: false }), raios,
        nuvem(470, 110, 1.3, "#fff", .95), nuvem(820, 80, 1, "#fff", .9), nuvem(960, 190, .8, "#fff", .85),
        borboleta(640, 240, 1, "#ff9ec1", -12), borboleta(760, 300, .8, "#ffd166", 14), borboleta(320, 300, .7, "#a5d8ff", 8),
        `<path d="M0 440 C150 400 300 420 430 445 C560 470 700 410 860 420 C980 428 1050 440 1100 450 V680 H0Z" fill="#c4e6a6"/>`,
        `<path d="M0 520 C160 480 330 500 480 520 C640 540 780 490 930 500 C1020 506 1070 515 1100 520 V680 H0Z" fill="#a2d688"/>`,
        tulipa(140, 520, 1, "#ff6f91"), tulipa(170, 530, .85, "#ffd166"), tulipa(990, 512, 1, "#c77dff"), tulipa(1020, 525, .8, "#ff6f91"),
        `<path d="M0 590 C180 566 360 580 540 588 C720 596 880 570 1100 580 V680 H0Z" fill="#86c870"/>`,
        flores,
        coelho(430, 620, 1.15),
        cesta(690, 626, 1.05),
        ovo(170, 640, .7, -12, "#ff9ec1", "#fff", "listras"), ovo(860, 636, .75, 10, "#ffe066", "#7bdff2", "bolinhas"),
        ovo(950, 652, .6, -8, "#b8f2a8", "#ff7aa8", "zigue"), ovo(280, 656, .55, 14, "#c7a6ff", "#fff", "bolinhas"),
        grama,
      ].join("");
    },
  },

  namorados: {
    pasta: "38-dia-dos-namorados", titulo: "Dia dos Namorados",
    selo: { fundo: "#43112f", cor: "#ffd9e2", destaque: "#ff6b8b" },
    pagina: fundoPagina("#43112f", "#1f0716"),
    ceu: [[0, "#5c1f5e"], [.35, "#b8407a"], [.65, "#f07a7c"], [.86, "#ffb48a"], [1, "#ffd9a6"]],
    cena() {
      const r = sorteio(41);
      const sil = "#2b0a22";
      const tr = arvore(810, 546, { tam: 95, larg: 22, nivel: 6, cor: sil, semente: 22, torto: .4, abre: .55 });
      const rosas = ["#ff4d6d", "#ff758f", "#ff8fa3", "#c9184a", "#ffb3c1", "#e5383b"];
      let folhas = "";
      for (const [x, y] of tr.pontas) for (let k = 0; k < 2; k++)
        folhas += coracao(x + (r() - .5) * 26, y + (r() - .5) * 26, .26 + r() * .2, rosas[Math.floor(r() * rosas.length)], (r() - .5) * 40);
      let caindo = "";
      for (let i = 0; i < 10; i++) caindo += coracao(680 + r() * 340, 300 + r() * 260, .12 + r() * .1, rosas[i % rosas.length], (r() - .5) * 60, `opacity=".85"`);
      let flutuando = "";
      for (let i = 0; i < 14; i++) flutuando += coracao(80 + r() * 600, 60 + r() * 360, .1 + r() * .14, "#ffd0dc", (r() - .5) * 40, `opacity="${f(.25 + r() * .35)}"`);
      let luzes = `<path d="M70 70 Q550 210 1040 60" fill="none" stroke="${sil}" stroke-width="1.6"/>`;
      for (let i = 1; i < 22; i++) {
        const t = i / 22, x = (1 - t) ** 2 * 70 + 2 * (1 - t) * t * 550 + t * t * 1040, y = (1 - t) ** 2 * 70 + 2 * (1 - t) * t * 210 + t * t * 60;
        luzes += `<circle cx="${f(x)}" cy="${f(y + 6)}" r="4.5" fill="#fff1c1" filter="url(#brilho)"/>`;
      }
      return [
        `<circle cx="470" cy="560" r="230" fill="#ffd9a6" opacity=".35" filter="url(#desfoque)"/><circle cx="470" cy="560" r="105" fill="#fff0c8"/>`,
        flutuando, luzes,
        `<path d="M0 575 C180 540 320 560 480 556 C640 552 760 530 900 538 C1000 544 1060 550 1100 556 V680 H0Z" fill="#b9587a"/>`,
        `<path d="M0 640 C200 620 420 600 600 590 C720 580 800 546 880 545 C980 544 1050 560 1100 566 V680 H0Z" fill="${sil}"/>`,
        tr.svg, folhas, caindo,
        banco(700, 586, 1, sil),
        balaoCoracao(560, 300, 1.05, "#ff2e63", 670, 540), balaoCoracao(640, 235, .85, "#ff6b8b", 676, 540), balaoCoracao(470, 375, .7, "#e5383b", 664, 540),
      ].join("");
    },
  },

  junina: {
    pasta: "39-festa-junina", titulo: "Festa Junina",
    selo: { fundo: "#1d2156", cor: "#fff1d6", destaque: "#ffb347" },
    pagina: fundoPagina("#1d2156", "#0a0c24"),
    ceu: [[0, "#0a1240"], [.5, "#1d2a6e"], [.82, "#4a3a7e"], [1, "#8a4a6e"]],
    cena() {
      return [
        estrelas(27, 110, 0, 0, 1100, 450),
        lua(760, 345, 26, { cor: "#fff5d6", sombra: "#eadfb8", halo: "#fff3c8" }),
        balaoJunino(230, 250, .8, ["#e63946", "#ffd23f", "#3a86ff", "#ffd23f", "#e63946", "#06d6a0"]),
        balaoJunino(420, 395, .5, ["#ff8c42", "#ffffff", "#f15bb5", "#ffffff", "#ff8c42", "#ffd23f"]),
        balaoJunino(960, 300, .65, ["#06d6a0", "#ffd23f", "#e63946", "#ffd23f", "#06d6a0", "#3a86ff"]),
        varal(20, 60, 1080, 70, 60, 1), varal(30, 150, 1070, 150, 55, 2),
        `<path d="M0 560 C150 520 290 535 420 555 C560 575 700 560 840 540 C960 525 1040 540 1100 548 V680 H0Z" fill="#1c1a42"/>`,
        capelinha(190, 572, .95, "#171535"),
        milho(910, 600, 190, "#11241c", 3), milho(965, 610, 220, "#0f2018", 5), milho(1025, 604, 180, "#11241c", 7), milho(1070, 612, 200, "#0f2018", 9),
        `<path d="M0 610 C200 592 400 600 560 604 C740 608 900 592 1100 600 V680 H0Z" fill="#110f28"/>`,
        fogueira(560, 618),
      ].join("");
    },
  },
};
