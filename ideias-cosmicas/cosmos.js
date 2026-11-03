// cosmos.js: as cenas espaciais das ideias cósmicas, desenhadas em <canvas> com ruído.
// Tudo usa semente fixa, então cada imagem sai igual toda vez que é gerada.
const Cosmos = (() => {
  // ---------- números ----------
  const rng = seed => { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); };
  const hash = (x, y, z, s) => {
    let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1103515245) ^ Math.imul(s, 1442695041);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  const sm = t => t * t * (3 - 2 * t);
  const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const mix = (a, b, t) => a + (b - a) * t;
  function ruido(x, y, z, s) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const u = sm(x - xi), v = sm(y - yi), w = sm(z - zi);
    const a = mix(mix(hash(xi, yi, zi, s), hash(xi + 1, yi, zi, s), u), mix(hash(xi, yi + 1, zi, s), hash(xi + 1, yi + 1, zi, s), u), v);
    const b = mix(mix(hash(xi, yi, zi + 1, s), hash(xi + 1, yi, zi + 1, s), u), mix(hash(xi, yi + 1, zi + 1, s), hash(xi + 1, yi + 1, zi + 1, s), u), v);
    return mix(a, b, w);
  }
  // fbm normalizado e esticado para ocupar melhor o intervalo 0..1
  function fbm(x, y, z = 0, s = 0, oct = 5) {
    let t = 0, a = .5, n = 0;
    for (let i = 0; i < oct; i++) { t += a * ruido(x, y, z, s + i * 31); n += a; a *= .5; x *= 2.03; y *= 2.03; z *= 2.03; }
    return cl((t / n - .5) * 1.7 + .5);
  }

  // ---------- cores ----------
  const hex = h => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map(c => c + c).join(""); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgba = (h, a) => { const [r, g, b] = typeof h === "string" ? hex(h) : h; return `rgba(${r},${g},${b},${a})`; };
  // rampa([[0,"#000"],[.5,"#f80"],[1,"#fff"]]) -> t => [r,g,b]
  function rampa(paradas) {
    const p = paradas.map(([t, c]) => [t, hex(c)]);
    return t => {
      if (t <= p[0][0]) return p[0][1];
      for (let i = 1; i < p.length; i++) if (t <= p[i][0]) {
        const k = (t - p[i - 1][0]) / (p[i][0] - p[i - 1][0]), a = p[i - 1][1], b = p[i][1];
        return [mix(a[0], b[0], k), mix(a[1], b[1], k), mix(a[2], b[2], k)];
      }
      return p[p.length - 1][1];
    };
  }

  // ---------- telas ----------
  // tela("#id") devolve { ctx, w, h } com o canvas do tamanho do elemento
  function tela(sel) {
    const c = typeof sel === "string" ? document.querySelector(sel) : sel;
    const w = c.clientWidth || c.parentElement.clientWidth, h = c.clientHeight || c.parentElement.clientHeight;
    c.width = w; c.height = h;
    const ctx = c.getContext("2d"); ctx.imageSmoothingQuality = "high";
    return { ctx, w, h, c };
  }
  // camada de pixels em resolução reduzida (esc), devolvida como canvas para desenhar esticado
  function camada(w, h, esc, fn) {
    const cw = Math.ceil(w / esc), ch = Math.ceil(h / esc), cv = document.createElement("canvas");
    cv.width = cw; cv.height = ch;
    const cx = cv.getContext("2d"), img = cx.createImageData(cw, ch), d = img.data;
    for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) {
      const v = fn(i * esc, j * esc); if (!v) continue;
      const p = (j * cw + i) * 4;
      d[p] = v[0]; d[p + 1] = v[1]; d[p + 2] = v[2]; d[p + 3] = (v[3] ?? 1) * 255;
    }
    cx.putImageData(img, 0, 0);
    return cv;
  }
  const pinta = (ctx, cv, x, y, w, h, modo = "source-over", alfa = 1, blur = 0) => {
    ctx.save(); ctx.globalCompositeOperation = modo; ctx.globalAlpha = alfa;
    if (blur) ctx.filter = `blur(${blur}px)`;
    ctx.imageSmoothingQuality = "high"; ctx.drawImage(cv, x, y, w, h); ctx.restore();
  };

  // ---------- céu ----------
  function gradiente(ctx, w, h, paradas, x0 = 0, y0 = 0, x1 = 0, y1 = h) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    paradas.forEach(([t, c]) => g.addColorStop(t, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function brilho(ctx, x, y, r, cor, a = 1, modo = "screen") {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(cor, a)); g.addColorStop(.25, rgba(cor, a * .35)); g.addColorStop(1, rgba(cor, 0));
    ctx.save(); ctx.globalCompositeOperation = modo; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  }
  function cruz(ctx, x, y, r, cor, a = 1, giro = 0) {
    ctx.save(); ctx.globalCompositeOperation = "screen"; ctx.translate(x, y); ctx.rotate(giro);
    for (let k = 0; k < 2; k++) {
      const g = ctx.createLinearGradient(-r, 0, r, 0);
      g.addColorStop(0, rgba(cor, 0)); g.addColorStop(.5, rgba(cor, a)); g.addColorStop(1, rgba(cor, 0));
      ctx.fillStyle = g; ctx.fillRect(-r, -.6, r * 2, 1.2); ctx.rotate(Math.PI / 2);
    }
    ctx.restore();
  }
  // estrelas(ctx,w,h,{n, semente, max, cores, densidade:(x,y)=>0..1, cruz})
  function estrelas(ctx, w, h, o = {}) {
    const r = rng(o.semente || 7), n = o.n || 400, max = o.max || 1.6, cores = o.cores || ["#ffffff", "#d6e4ff", "#fff0d6"];
    const x0 = o.x || 0, y0 = o.y || 0;
    for (let i = 0; i < n; i++) {
      const x = x0 + r() * w, y = y0 + r() * h;
      const t = Math.pow(r(), o.pot || 6), rad = .3 + t * max, a = (o.alfa || 1) * (.3 + .7 * r()), cor = cores[Math.floor(r() * cores.length)];
      if (o.densidade && r() > o.densidade(x, y)) continue;
      ctx.globalAlpha = a; ctx.fillStyle = cor;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
      if (t > .35) brilho(ctx, x, y, rad * 7, cor, a * .45);
      if (t > .82 && o.cruz !== false) cruz(ctx, x, y, rad * 10, cor, a * .55, o.giro || 0);
    }
    ctx.globalAlpha = 1;
  }
  // nuvens de gás coloridas com distorção de domínio
  function nebulosa(ctx, w, h, o) {
    const f = o.freq || 1 / 420, s = o.semente || 1, cor = rampa(o.cores), mask = o.mascara || (() => 1);
    const lim = o.limiar ?? .4, suave = o.suave ?? .4, forca = o.forca ?? 1, torc = o.torcao ?? 2.6;
    const cv = camada(w, h, o.esc || 4, (x, y) => {
      const m = mask(x, y); if (m <= .003) return null;
      const X = x * f, Y = y * f;
      const qx = fbm(X, Y, 0, s, 4), qy = fbm(X + 5.2, Y + 1.3, 0, s + 3, 4);
      const n = fbm(X + torc * qx, Y + torc * qy, 0, s + 9, o.oitavas || 6);
      const d = ss(lim, lim + suave, n) * m * forca; if (d <= .002) return null;
      const c = cor(cl(o.tom ? o.tom(x, y, n, qx, qy) : n));
      return [c[0], c[1], c[2], cl(d * (.35 + .65 * n))];
    });
    if (o.halo !== 0) pinta(ctx, cv, 0, 0, w, h, o.modo || "screen", (o.alfa ?? 1) * .8, o.halo || 14);
    pinta(ctx, cv, 0, 0, w, h, o.modo || "screen", o.alfa ?? 1, o.blur ?? 1);
  }
  // faixas escuras de poeira (escurecem o que já foi desenhado)
  function poeira(ctx, w, h, o) {
    const f = o.freq || 1 / 300, s = o.semente || 5, mask = o.mascara || (() => 1), cor = hex(o.cor || "#000000");
    const cv = camada(w, h, o.esc || 4, (x, y) => {
      const m = mask(x, y); if (m <= .003) return null;
      const q = fbm(x * f, y * f, 0, s, 4);
      const n = fbm(x * f * 1.6 + q * 2, y * f * 1.6 - q, 0, s + 4, 5);
      const d = ss(o.limiar ?? .5, (o.limiar ?? .5) + (o.suave ?? .25), n) * m * (o.forca ?? .8);
      return d > .003 ? [cor[0], cor[1], cor[2], cl(d)] : null;
    });
    pinta(ctx, cv, 0, 0, w, h, "source-over", 1, o.blur || 0);
  }
  // grãos de poeira estelar flutuando (pontinhos desfocados)
  function graos(ctx, w, h, o = {}) {
    const r = rng(o.semente || 99);
    ctx.save(); ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < (o.n || 60); i++) {
      const x = r() * w, y = r() * h, rad = (o.min || 1) + r() * (o.max || 3), cor = (o.cores || ["#ffffff"])[Math.floor(r() * (o.cores || [1]).length)];
      if (o.densidade && r() > o.densidade(x, y)) continue;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 2.4);
      const a = (o.alfa || .6) * (.3 + .7 * r());
      g.addColorStop(0, rgba(cor, a)); g.addColorStop(.4, rgba(cor, a * .4)); g.addColorStop(1, rgba(cor, 0));
      ctx.fillStyle = g; ctx.fillRect(x - rad * 2.4, y - rad * 2.4, rad * 4.8, rad * 4.8);
    }
    ctx.restore();
  }

  // ---------- planetas ----------
  const norm = v => { const l = Math.hypot(...v); return v.map(c => c / l); };
  // planeta(ctx,{x,y,r,textura:(sx,sy,sz,lat,lon)=>[r,g,b,emissao], luz:[x,y,z], atmosfera:"#hex", halo})
  function planeta(ctx, o) {
    const { x, y, r } = o, L = norm(o.luz || [-.6, -.45, .66]), inc = o.inclinacao || 0, rot = o.rotacao || 0;
    const ci = Math.cos(inc), si = Math.sin(inc), atm = o.atmosfera ? hex(o.atmosfera) : null, halo = o.halo ?? .14;
    const m = 1 + (atm ? halo * 1.6 : 0), tam = r * m;
    const cv = camada(tam * 2, tam * 2, o.esc || 1, (px, py) => {
      const nx = (px - tam) / r, ny = (py - tam) / r, d2 = nx * nx + ny * ny, d = Math.sqrt(d2);
      const lado = (nx * L[0] + ny * L[1]) / (d || 1);
      if (d > 1) { // halo de atmosfera
        if (!atm) return null;
        const t = (d - 1) / halo, a = Math.exp(-t * t * 1.4) * ss(-.55, .7, lado + L[2] * .5) * (o.forcaHalo ?? .9);
        return a > .004 ? [atm[0], atm[1], atm[2], a] : null;
      }
      const nz = Math.sqrt(1 - d2);
      const gx = nx * ci - ny * si, gy = nx * si + ny * ci;
      const lat = Math.asin(cl(gy, -1, 1)), lon = Math.atan2(gx, nz) + rot;
      const sx = Math.cos(lat) * Math.sin(lon), sy = Math.sin(lat), sz = Math.cos(lat) * Math.cos(lon);
      const t = o.textura(sx, sy, sz, lat, lon);
      const dif = nx * L[0] + ny * L[1] + nz * L[2];
      const k = ss(-.12, .6, dif) * (o.forte ?? 1.05) * (.62 + .38 * Math.pow(nz, .45)) + (o.ambiente ?? .025);
      const em = t[3] || 0;
      let R = t[0] * k + t[0] * em, G = t[1] * k + t[1] * em, B = t[2] * k + t[2] * em;
      if (atm) { const rim = Math.pow(1 - nz, 2.6) * ss(-.3, .5, dif + .2) * .9; R = mix(R, atm[0], rim); G = mix(G, atm[1], rim); B = mix(B, atm[2], rim); }
      const borda = cl((1 - d) * r / 1.3);
      if (atm && borda < 1) { // funde a borda com o halo, sem deixar uma linha escura entre os dois
        const ha = ss(-.55, .7, lado + L[2] * .5) * (o.forcaHalo ?? .9), a = borda + (1 - borda) * ha, k2 = borda / (a || 1);
        return [mix(atm[0], cl(R, 0, 255), k2), mix(atm[1], cl(G, 0, 255), k2), mix(atm[2], cl(B, 0, 255), k2), a];
      }
      return [cl(R, 0, 255), cl(G, 0, 255), cl(B, 0, 255), borda];
    });
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2);
  }
  // anéis: desenhe a parte "tras" antes do planeta e a "frente" depois
  function aneis(ctx, o) {
    const s = o.semente || 2, cor = rampa(o.cores || [[0, "#8a6b4a"], [.5, "#e8cfa0"], [1, "#b89366"]]);
    ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.angulo || 0);
    ctx.beginPath(); if (o.parte === "tras") ctx.rect(-4000, -4000, 8000, 4000); else ctx.rect(-4000, 0, 8000, 4000); ctx.clip();
    ctx.scale(1, o.achatamento || .25);
    const n = 220, de = o.de || 1.3, ate = o.ate || 2.3;
    for (let i = 0; i < n; i++) {
      const t = i / n, rr = o.r * (de + (ate - de) * t);
      let dens = .25 + .75 * fbm(t * 9, 0, 0, s, 3);
      dens *= 1 - ss(.55, .58, t) * (1 - ss(.62, .66, t)) * .92;   // a divisão escura
      dens *= ss(0, .06, t) * (1 - ss(.94, 1, t));
      const c = cor(t);
      ctx.strokeStyle = rgba(c, dens * (o.alfa || .85)); ctx.lineWidth = o.r * (ate - de) / n * 1.8;
      ctx.beginPath(); ctx.arc(0, 0, rr, 0, 7); ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- fenômenos ----------
  // buraco negro com disco de acreção visto quase de lado
  function buracoNegro(ctx, o) {
    const { x, y, r } = o, R = (o.disco || 5) * r, ach = o.achatamento || .2, ca = Math.cos(o.angulo || 0), sa = Math.sin(o.angulo || 0);
    const cor = rampa(o.cores || [[0, "#3a0d00"], [.3, "#c2410c"], [.6, "#ffb347"], [.85, "#ffe7b0"], [1, "#ffffff"]]);
    const s = o.semente || 4, tam = R * 1.05;
    const cv = camada(tam * 2, tam * 2, o.esc || 1, (px, py) => {
      const dx = px - tam, dy = py - tam, u = dx * ca + dy * sa, v = -dx * sa + dy * ca;
      const d = Math.hypot(u, v) / r, th = Math.atan2(v, u);
      let I = 0;
      // disco no plano
      const rho = Math.hypot(u, v / ach) / r, ph = Math.atan2(v / ach, u);
      if (rho > 1.4 && rho < R / r) {
        const frente = v > 0;
        if (frente || d > 1) {
          const n = fbm(rho * 4.2, Math.cos(ph) * 1.4, Math.sin(ph) * 1.4, s, 4);
          const queda = ss(1.4, 2.1, rho) * Math.pow(2.1 / Math.max(rho, 2.1), 1.9) * (1 - ss(R / r * .8, R / r, rho));
          const dop = 1 + .55 * -Math.cos(ph);
          I += queda * (.35 + 1.1 * n) * dop * (frente && o.frente === false && d < 1.05 ? 0 : 1);
        }
      }
      // imagem do disco de trás curvada pela gravidade (o anel que abraça a sombra)
      if (d > 1) {
        const n2 = fbm(d * 7, Math.cos(th) * 2.2, Math.sin(th) * 2.2, s + 7, 4);
        const topo = .45 + .55 * ss(-.2, -1, Math.sin(th));  // mais forte em cima
        const baixo = .3 * ss(.2, 1, Math.sin(th));
        I += Math.exp(-Math.pow((d - 1.18) / (.16 + .1 * topo), 2)) * (topo + baixo) * (.5 + .9 * n2) * 1.15 * (1 + .35 * -Math.cos(th));
        I += Math.exp(-Math.pow((d - 1.035) / .022, 2)) * 1.5;   // anel de fótons
      }
      if (d < 1) { const a = cl(I * 1.3), c = cor(cl(I * .85)); return [c[0] * a, c[1] * a, c[2] * a, 1]; }
      if (I < .004) return null;
      const c = cor(cl(I * .85));
      return [c[0], c[1], c[2], cl(I * 1.4)];
    });
    brilho(ctx, x, y, R * .9, o.brilho || "#ff7a1a", .28);
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2);
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2, "screen", .55, 10);
  }
  // cortinas de aurora boreal
  function aurora(ctx, w, h, o) {
    const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    const c = cv.getContext("2d"); c.globalCompositeOperation = "lighter";
    const [c0, c1, c2] = o.cores || ["#5dffb0", "#2fd3c8", "#d45cff"];
    for (const k of o.camadas) {
      const s = k.semente || 1;
      for (let x = 0; x < w; x++) {
        const by = k.base + (fbm(x * k.freq, 0, 0, s, 3) - .5) * k.amp * 2 + Math.sin(x * k.freq * 5 + s) * k.amp * .35;
        let I = Math.pow(ss(.3, .72, fbm(x * k.freq * 1.6, 3.3, 0, s + 5, 3)), 1.4) * (.3 + .7 * fbm(x * .05, 7.7, 0, s + 11, 2)) * k.forca;
        if (k.janela) I *= k.janela(x);
        if (I < .01) continue;
        const alt = k.alt * (.55 + .75 * fbm(x * .008, 1.1, 0, s + 3, 3));
        const T = alt + 50, q = 50 / T, g = c.createLinearGradient(0, by + 50, 0, by - alt);
        g.addColorStop(0, rgba(c0, 0)); g.addColorStop(q * .9, rgba(c0, I * .45)); g.addColorStop(q, rgba(c0, I)); g.addColorStop(q + (1 - q) * .3, rgba(c1, I * .6));
        g.addColorStop(q + (1 - q) * .75, rgba(c2, I * .25)); g.addColorStop(1, rgba(c2, 0));
        c.fillStyle = g; c.fillRect(x, by - alt, 1.3, T);
      }
    }
    pinta(ctx, cv, 0, 0, w, h, "screen", 1, 9);
    pinta(ctx, cv, 0, 0, w, h, "screen", .7, 1.4);
  }
  // linha de montanhas: devolve a função altura(x)
  function montanhas(ctx, w, h, o) {
    const s = o.semente || 8, alt = x => {
      const n = fbm(x * o.freq, 0, 0, s, 5), rid = 1 - Math.abs(fbm(x * o.freq * .7, 9, 0, s + 2, 4) * 2 - 1);
      return o.base - (n * .55 + Math.pow(rid, 1.8) * .7) * o.amp;
    };
    ctx.save(); ctx.beginPath(); ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 2) ctx.lineTo(x, alt(x));
    ctx.lineTo(w, h); ctx.closePath();
    const g = ctx.createLinearGradient(0, o.base - o.amp, 0, o.base);
    (o.gradiente || [[0, "#1b2433"], [1, "#05080d"]]).forEach(([t, c]) => g.addColorStop(t, c));
    ctx.fillStyle = g; ctx.fill();
    if (o.neve) { // neve só nos picos, com encostas claras e escuras
      const claro = hex(o.neve), escuro = hex(o.sombra || "#2a4558");
      const cvn = camada(w, h, 1, (x, y) => {
        const a = alt(x); if (y < a - 1) return null;
        const pico = o.base - a - o.amp * (o.linhaNeve ?? .45); if (pico <= 0) return null;
        const prof = y - a, n = fbm(x / 34 + y / 60, y / 34, 0, s + 6, 4);
        const lim = pico * (.55 + .7 * n); if (prof > lim) return null;
        const inc = (alt(x + 5) - alt(x - 5)) / 10 * 2.2 + (fbm(x / 10 - y / 16, y / 40, 0, s + 9, 3) - .5) * 1.1;
        const k = ss(-.6, .6, inc), c = [mix(escuro[0], claro[0], k), mix(escuro[1], claro[1], k), mix(escuro[2], claro[2], k)];
        return [c[0], c[1], c[2], ss(lim, lim * .8, prof) * ss(-1, 1.2, y - a) * (o.forcaNeve ?? .9)];
      });
      pinta(ctx, cvn, 0, 0, w, h);
    }
    ctx.restore();
    return alt;
  }
  // espelha a faixa acima de yH para baixo (lago)
  function reflexo(ctx, w, yH, alt, o = {}) {
    ctx.save(); ctx.globalAlpha = o.alfa ?? .5; ctx.filter = `blur(${o.blur ?? 2}px)`;
    ctx.translate(0, yH * 2); ctx.scale(1, -1);
    ctx.drawImage(ctx.canvas, 0, yH - alt, w, alt, 0, yH - alt, w, alt);
    ctx.restore();
    const r = rng(o.semente || 4); ctx.save(); ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < (o.linhas || 70); i++) {
      const y = yH + 4 + Math.pow(r(), 1.6) * alt, x = r() * w, l = 30 + r() * 160;
      ctx.fillStyle = rgba(o.cor || "#ffffff", .05 + r() * .07); ctx.fillRect(x, y, l, 1);
    }
    ctx.restore();
  }
  // galáxia espiral vista de leve inclinação
  function galaxia(ctx, o) {
    const { x, y, r } = o, ach = o.achatamento || .55, ca = Math.cos(o.angulo || 0), sa = Math.sin(o.angulo || 0);
    const nucleo = hex(o.nucleo || "#ffe2a8"), braco = hex(o.braco || "#6fd6ff"), s = o.semente || 3, B = o.bracos || 2, k = o.enrolar || 3.2;
    const tam = r * 1.25;
    const cv = camada(tam * 2, tam * 2, o.esc || 1, (px, py) => {
      const dx = px - tam, dy = py - tam, u = (dx * ca + dy * sa) / r, v = (-dx * sa + dy * ca) / r / ach;
      const rho = Math.hypot(u, v), ph = Math.atan2(v, u); if (rho > 1.2) return null;
      const esp = (Math.cos(B * (ph - Math.log(rho + .04) * k)) + 1) / 2;
      const n = fbm(u * 6, v * 6, 0, s, 5), n2 = fbm(u * 14, v * 14, 0, s + 4, 3);
      const disco = Math.exp(-rho * (o.queda || 2.6)) * (1 - ss(.85, 1.2, rho));
      const arm = Math.pow(esp, 2.4) * disco * (.35 + 1.3 * n) * 2.1;
      const pista = Math.pow((Math.cos(B * (ph - Math.log(rho + .04) * k) - .55) + 1) / 2, 7) * ss(.08, .3, rho) * (.5 + n2);
      const bojo = Math.exp(-Math.pow(rho / .16, 2)) * 1.4 + Math.exp(-rho * 7) * .5;
      const fundo = disco * .22 * (.6 + n);
      let I = (arm + fundo) * (1 - pista * .75) + bojo;
      const t = cl(bojo * 1.6 + Math.exp(-rho * 5) * .5);
      return I < .004 ? null : [mix(braco[0], nucleo[0], t), mix(braco[1], nucleo[1], t), mix(braco[2], nucleo[2], t), cl(I)];
    });
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2, "screen", 1, 6);
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2, "screen", .9);
    // aglomerados rosados e estrelas jovens ao longo dos braços
    const rr = rng(s + 50);
    for (let i = 0; i < (o.nos || 260); i++) {
      const rho = .12 + Math.pow(rr(), .8) * .85, j = Math.floor(rr() * B), ph = Math.log(rho + .04) * k + j * Math.PI * 2 / B + (rr() - .5) * .5;
      const u = Math.cos(ph) * rho, v = Math.sin(ph) * rho * ach, px = x + (u * ca - v * sa) * r, py = y + (u * sa + v * ca) * r;
      const rosa = rr() < .45, rad = .5 + rr() * (rosa ? 1.6 : 1.1);
      brilho(ctx, px, py, rad * 4, rosa ? (o.rosa || "#ff7ab8") : "#e8f6ff", .55 + rr() * .4);
    }
  }
  // eclipse total: lua escura, coroa e o "anel de diamante"
  function eclipse(ctx, o) {
    const { x, y, r } = o, s = o.semente || 6, tam = r * (o.alcance || 3.2), cor = rampa(o.cores || [[0, "#000000"], [.35, "#7a5a2e"], [.7, "#f3d9a4"], [1, "#ffffff"]]);
    const prom = hex(o.proeminencia || "#ff5a6e");
    const cv = camada(tam * 2, tam * 2, o.esc || 1, (px, py) => {
      const dx = px - tam, dy = py - tam, d = Math.hypot(dx, dy) / r, th = Math.atan2(dy, dx);
      if (d < 1) return [3, 3, 5, cl((1 - d) * r / 1.2)];
      const c3 = Math.cos(th), s3 = Math.sin(th);
      const larga = fbm(c3 * 1.6, s3 * 1.6, 0, s, 3), raio = fbm(c3 * 18, s3 * 18, d * .35, s + 5, 3);
      const comp = .18 + 1.6 * Math.pow(larga, 3) * (.6 + .4 * Math.abs(c3));
      let I = Math.exp(-(d - 1) / comp) * (.35 + .9 * raio) * .9 + Math.exp(-(d - 1) / .05) * 1.2;
      // proeminências: chamas rosadas grudadas na borda
      const p = fbm(c3 * 9, s3 * 9, 0, s + 21, 3);
      const P = ss(.8, .9, p) * Math.exp(-Math.pow((d - 1) / .03, 2) * .9) * .85;
      const c = cor(cl(I * .75)), a = cl(I * 1.25);
      return [mix(c[0], prom[0], P), mix(c[1], prom[1], P), mix(c[2], prom[2], P), cl(a + P)];
    });
    brilho(ctx, x, y, r * 4, o.brilho || "#f6e2b8", .16);
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2, "screen", .7, 8);
    pinta(ctx, cv, x - tam, y - tam, tam * 2, tam * 2);
    if (o.diamante != null) {
      const px = x + Math.cos(o.diamante) * r * 1.01, py = y + Math.sin(o.diamante) * r * 1.01;
      brilho(ctx, px, py, r * .9, "#fff6e0", .75);
      ctx.fillStyle = "#030305"; ctx.beginPath(); ctx.arc(x, y, r * .985, 0, 7); ctx.fill();   // a lua continua escura por cima do brilho
      brilho(ctx, px, py, r * .22, "#ffffff", 1); brilho(ctx, px, py, r * .5, "#fff6e0", .5);
      cruz(ctx, px, py, r * 1.5, "#fff8ea", .7, .25); cruz(ctx, px, py, r * .8, "#fff8ea", .45, 1.03);
    }
  }
  // cometa com cauda curva
  function cometa(ctx, o) {
    const { x, y, ang = -2.6, comp = 260, cor = "#bff3ff" } = o;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 3; i++) {
      const g = ctx.createLinearGradient(0, 0, comp * (1 - i * .2), 0);
      g.addColorStop(0, rgba(i === 2 ? "#ffffff" : cor, .7 - i * .15)); g.addColorStop(1, rgba(cor, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -1.5 - i);
      ctx.quadraticCurveTo(comp * .5, -8 - i * 6, comp * (1 - i * .2), -14 - i * 14);
      ctx.lineTo(comp * (1 - i * .2), 10 + i * 4); ctx.quadraticCurveTo(comp * .5, 4, 0, 1.5 + i); ctx.fill();
    }
    ctx.restore();
    brilho(ctx, x, y, 22, "#ffffff", .9); brilho(ctx, x, y, 60, cor, .35);
  }
  // estrela cadente
  function cadente(ctx, x, y, comp, ang, cor = "#ffffff") {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalCompositeOperation = "screen";
    const g = ctx.createLinearGradient(0, 0, comp, 0); g.addColorStop(0, rgba(cor, .9)); g.addColorStop(1, rgba(cor, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -1.2); ctx.lineTo(comp, 0); ctx.lineTo(0, 1.2); ctx.fill(); ctx.restore();
    brilho(ctx, x, y, 10, cor, .9);
  }

  // ---------- ícones ----------
  const ICONES = {
    play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    prev: '<path d="M18 6v12l-9-6zM6 6v12" />',
    next: '<path d="M6 6v12l9-6zM18 6v12" />',
    heart: '<path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 3 4.8 6.3 4.6c2-.1 3.7 1 4.6 2.6.9-1.6 2.6-2.7 4.6-2.6 3.3.2 5.1 3.6 3.5 6.8C19 15.6 12 20 12 20z"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2.5"/><path d="M5 15.5V6.5A1.5 1.5 0 0 1 6.5 5h9"/>',
    note: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    spark: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" fill="currentColor" stroke="none"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
    insta: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".9" fill="currentColor"/>',
    pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    volume: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
    orbit: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-25 12 12)"/>',
    shuffle: '<path d="M4 7h3.5c4 0 5 10 9 10H20M4 17h3.5c1.4 0 2.4-1.2 3.3-2.8M13.2 9.8C14.1 8.2 15.1 7 16.5 7H20M17.5 4.5L20 7l-2.5 2.5M17.5 14.5L20 17l-2.5 2.5"/>',
    signal: '<path d="M5 19v-3M9.5 19v-6M14 19V9M18.5 19V5"/>',
  };
  function icones() {
    document.querySelectorAll("i[data-i]").forEach(el => {
      el.outerHTML = `<svg class="ic ${el.className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${el.dataset.p || 1.7}" stroke-linecap="round" stroke-linejoin="round">${ICONES[el.dataset.i]}</svg>`;
    });
  }
  // barras de onda sonora: <div class="onda" data-n="48" data-p=".38">
  function ondas() {
    document.querySelectorAll(".onda").forEach((el, k) => {
      const n = +el.dataset.n || 40, p = +el.dataset.p || .4, r = rng(30 + k);
      el.innerHTML = Array.from({ length: n }, (_, i) => {
        const h = 18 + 82 * Math.abs(Math.sin(i * .55 + k) * .6 + (r() - .5) * .7);
        return `<b style="height:${Math.min(100, h).toFixed(0)}%" class="${i / n < p ? "on" : ""}"></b>`;
      }).join("");
    });
  }

  return { rng, fbm, ss, cl, mix, hex, rgba, rampa, tela, camada, pinta, gradiente, brilho, cruz, estrelas, nebulosa, poeira, graos,
    planeta, aneis, buracoNegro, aurora, montanhas, reflexo, galaxia, eclipse, cometa, cadente, icones, ondas };
})();
