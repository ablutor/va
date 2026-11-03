// Modelo 47 · Fita K7
// Lê dos dados do cliente: nome, sobrenome, local, gostos, frase, instagram, xat, musica e fotos (destaque, perfil, galeria).
// Aqui ficam o desenho da fita, o duotone da foto, os VU meters e o contador do deck.

// Desenho da fita cassete (ID_ vira um prefixo por palco, para os ids não repetirem)
function desenhoFita() {
  return `<svg class="k7" viewBox="0 0 900 580" aria-hidden="true">
  <defs>
    <linearGradient id="ID_kBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--k1)"/><stop offset=".55" style="stop-color:var(--k2)"/><stop offset="1" style="stop-color:var(--k3)"/></linearGradient>
    <linearGradient id="ID_kGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
    <linearGradient id="ID_kTrap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--k-trap1)"/><stop offset="1" style="stop-color:var(--k-trap2)"/></linearGradient>
    <linearGradient id="ID_kWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b120b"/><stop offset=".5" stop-color="#2f2015"/><stop offset="1" stop-color="#1a110a"/></linearGradient>
    <radialGradient id="ID_kPack" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#6a4328"/><stop offset=".6" stop-color="#3b2314"/><stop offset="1" stop-color="#1f1109"/></radialGradient>
    <radialGradient id="ID_kScrew" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fffdf5"/><stop offset=".55" stop-color="#b9ad90"/><stop offset="1" stop-color="#6a604a"/></radialGradient>
    <linearGradient id="ID_kMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#9c9486"/><stop offset="1" stop-color="#e9e3d3"/></linearGradient>
    <clipPath id="ID_kWinClip"><rect x="200" y="255" width="500" height="112" rx="56"/></clipPath>
    <clipPath id="ID_kBodyClip"><rect width="900" height="580" rx="30"/></clipPath>
    <filter id="ID_kPaper"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .1  0 0 0 .5 0"/></filter>
    <filter id="ID_kBlur"><feGaussianBlur stdDeviation="1.6"/></filter>
    <g id="ID_hub">
      <circle r="25" fill="#f4f1e6" stroke="#8b8573" stroke-width="2"/>
      <circle r="19" fill="#26201a"/>
      <g fill="#f4f1e6">
        <rect x="-3" y="-19" width="6" height="11" rx="1.5"/>
        <rect x="-3" y="-19" width="6" height="11" rx="1.5" transform="rotate(60)"/>
        <rect x="-3" y="-19" width="6" height="11" rx="1.5" transform="rotate(120)"/>
        <rect x="-3" y="-19" width="6" height="11" rx="1.5" transform="rotate(180)"/>
        <rect x="-3" y="-19" width="6" height="11" rx="1.5" transform="rotate(240)"/>
        <rect x="-3" y="-19" width="6" height="11" rx="1.5" transform="rotate(300)"/>
      </g>
      <circle r="8" fill="#0d0a07"/>
      <circle r="25" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1" transform="translate(-.8 -.8)"/>
    </g>
  </defs>

  <!-- carcaça -->
  <rect width="900" height="580" rx="30" fill="url(#ID_kBody)"/>
  <g clip-path="url(#ID_kBodyClip)">
    <rect width="900" height="580" filter="url(#ID_kPaper)" opacity=".5" style="mix-blend-mode:multiply"/>
    <!-- costelas internas vistas através do plástico translúcido -->
    <g opacity=".18" stroke="#8a6b34" fill="none" stroke-width="2">
      <path d="M40 420 H860"/><path d="M60 400 V560"/><path d="M840 400 V560"/>
      <circle cx="450" cy="310" r="170"/><circle cx="450" cy="310" r="180" stroke-dasharray="3 9"/>
    </g>
    <rect x="3" y="3" width="894" height="574" rx="28" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>
    <rect x="0" y="0" width="900" height="580" rx="30" fill="none" style="stroke:var(--k-borda)" stroke-width="4"/>
    <path d="M0 0 H900 V250 C650 190 250 190 0 300Z" fill="url(#ID_kGlass)" opacity=".7"/>
  </g>

  <!-- trapézio inferior -->
  <path d="M168 412 H732 L796 580 H104 Z" fill="url(#ID_kTrap)" style="stroke:var(--k-borda)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M176 418 H724 L784 576 H116 Z" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
  <!-- fita esticada -->
  <path d="M262 410 L226 486 Q214 506 205 522 H695 Q686 506 674 486 L638 410" fill="none" stroke="#1a0e07" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M263 410 L227 486 Q215 506 206 521 H694" fill="none" stroke="#7a4a2a" stroke-width="1.6" opacity=".9"/>
  <!-- rolos -->
  <g>
    <circle cx="205" cy="498" r="19" fill="url(#ID_kMetal)" stroke="#6a604a" stroke-width="2"/><circle cx="205" cy="498" r="9" fill="#2a241a"/><circle cx="205" cy="498" r="3" fill="#cfc7b2"/>
    <circle cx="695" cy="498" r="19" fill="url(#ID_kMetal)" stroke="#6a604a" stroke-width="2"/><circle cx="695" cy="498" r="9" fill="#2a241a"/><circle cx="695" cy="498" r="3" fill="#cfc7b2"/>
  </g>
  <!-- furos -->
  <g fill="#1d150d"><rect x="343" y="538" width="34" height="30" rx="6"/><rect x="433" y="538" width="34" height="30" rx="6"/><rect x="523" y="538" width="34" height="30" rx="6"/>
    <circle cx="150" cy="555" r="8"/><circle cx="750" cy="555" r="8"/><circle cx="450" cy="448" r="7"/></g>
  <g fill="none" stroke="#fff" stroke-opacity=".4"><rect x="343" y="538" width="34" height="30" rx="6" transform="translate(0 1.5)"/><rect x="433" y="538" width="34" height="30" rx="6" transform="translate(0 1.5)"/><rect x="523" y="538" width="34" height="30" rx="6" transform="translate(0 1.5)"/></g>

  <!-- etiqueta de papel -->
  <g>
    <rect x="62" y="48" width="776" height="346" rx="12" fill="#00000030" transform="translate(0 4)" filter="url(#ID_kBlur)"/>
    <rect x="62" y="48" width="776" height="346" rx="12" style="fill:var(--k-label)"/>
    <rect x="62" y="48" width="776" height="346" rx="12" filter="url(#ID_kPaper)" opacity=".55" style="mix-blend-mode:multiply"/>
    <!-- listras -->
    <clipPath id="ID_kLab"><rect x="62" y="48" width="776" height="346" rx="12"/></clipPath>
    <g clip-path="url(#ID_kLab)">
      <rect x="62" y="48" width="776" height="17" style="fill:var(--a2)"/>
      <rect x="62" y="65" width="776" height="17" style="fill:var(--a3)"/>
      <rect x="62" y="82" width="776" height="17" style="fill:var(--a1)"/>
      <path d="M62 99 H470 L456 111 H62Z" fill="#e8742a" opacity=".0"/>
      <rect x="62" y="372" width="776" height="6" style="fill:var(--a1)"/>
      <rect x="62" y="378" width="776" height="6" style="fill:var(--a3)"/>
      <rect x="62" y="384" width="776" height="10" style="fill:var(--a2)"/>
    </g>
    <!-- título manuscrito -->
    <g transform="rotate(-1 450 140)">
      <text class="k7-titulo" x="92" y="146" font-family="Caveat" font-weight="700" font-size="54" letter-spacing="1" style="fill:var(--caneta)"></text>
      <path d="M96 160 C250 150 420 168 640 156 S 560 166 420 164" fill="none" style="stroke:var(--a3)" stroke-width="3.2" stroke-linecap="round" opacity=".9"/>
    </g>
    <!-- pauta -->
    <g stroke="#6fa3b8" stroke-opacity=".75" stroke-width="1.6"><path d="M82 210 H818"/><path d="M82 244 H818"/></g>
    <path d="M118 176 V250" stroke="#d6453a" stroke-opacity=".6" stroke-width="1.6"/>
    <g font-family="Reenie Beanie" font-size="36" style="fill:var(--caneta)">
      <text class="k7-l1" x="128" y="205" transform="rotate(-.6 128 205)"></text>
      <text class="k7-l2" x="128" y="239" transform="rotate(-.4 128 239)"></text>
    </g>
    <!-- A / 90 -->
    <g>
      <circle cx="132" cy="316" r="46" style="fill:var(--a2)"/><circle cx="132" cy="316" r="40" fill="none" style="stroke:var(--k-sobre-a2)" stroke-width="2" stroke-dasharray="3 4"/>
      <text x="132" y="340" text-anchor="middle" font-family="Righteous" font-size="68" style="fill:var(--k-sobre-a2)">A</text>
      <rect x="738" y="276" width="74" height="76" rx="8" style="fill:var(--a3)"/>
      <text x="775" y="326" text-anchor="middle" font-family="Righteous" font-size="46" style="fill:var(--k-sobre-a3)">90</text>
      <text x="775" y="344" text-anchor="middle" font-family="Share Tech Mono" font-size="12" letter-spacing="3" style="fill:var(--k-sobre-a3)">MIN</text>
    </g>
  </g>

  <!-- janela -->
  <g>
    <rect x="194" y="249" width="512" height="124" rx="62" fill="#00000050"/>
    <rect x="200" y="255" width="500" height="112" rx="56" fill="url(#ID_kWin)"/>
    <g clip-path="url(#ID_kWinClip)">
      <!-- carretel esquerdo (maior) -->
      <circle cx="305" cy="311" r="53" fill="url(#ID_kPack)"/>
      <g fill="none" stroke="#000" stroke-opacity=".28"><circle cx="305" cy="311" r="46"/><circle cx="305" cy="311" r="39"/><circle cx="305" cy="311" r="33"/></g>
      <g fill="none" stroke="#c98a55" stroke-opacity=".18"><circle cx="305" cy="311" r="49"/><circle cx="305" cy="311" r="42"/><circle cx="305" cy="311" r="36"/></g>
      <path d="M268 285 A48 48 0 0 1 305 262" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>
      <g class="carretel c1"><use href="#ID_hub" x="305" y="311" transform="rotate(14 305 311)"/></g>
      <!-- carretel direito (menor) -->
      <circle cx="595" cy="311" r="38" fill="url(#ID_kPack)"/>
      <g fill="none" stroke="#000" stroke-opacity=".28"><circle cx="595" cy="311" r="34"/><circle cx="595" cy="311" r="30"/></g>
      <path d="M568 292 A34 34 0 0 1 595 278" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>
      <g class="carretel c2"><use href="#ID_hub" x="595" y="311" transform="rotate(-22 595 311)"/></g>
      <!-- fita saindo -->
      <path d="M284 361 L262 380" stroke="#24150b" stroke-width="5"/><path d="M628 345 L640 380" stroke="#24150b" stroke-width="5"/>
      <!-- régua de metragem -->
      <g stroke="#f3e6c8" stroke-opacity=".5" stroke-width="1.4"><path d="M390 262 v7 M410 262 v4 M430 262 v7 M450 262 v4 M470 262 v7 M490 262 v4"/></g>
      <path d="M200 255 H700 V300 C600 270 300 270 200 300Z" fill="url(#ID_kGlass)" opacity=".65"/>
    </g>
    <rect x="200" y="255" width="500" height="112" rx="56" fill="none" style="stroke:var(--k-borda)" stroke-width="5"/>
    <rect x="203" y="258" width="494" height="106" rx="53" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="2"/>
    <rect x="198" y="253" width="504" height="116" rx="58" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>
  </g>

  <!-- parafusos -->
  <g>
    <g id="ID_scr"><circle r="13" fill="#8d7447" opacity=".5" transform="translate(1 2)"/><circle r="12" fill="url(#ID_kScrew)" stroke="#6a604a" stroke-width="1.5"/><path d="M-8 0 H8 M0 -8 V8" stroke="#3b3426" stroke-width="3" stroke-linecap="round"/></g>
    <use href="#ID_scr" x="36" y="36" transform="rotate(20 36 36)"/>
    <use href="#ID_scr" x="864" y="36" transform="rotate(-12 864 36)"/>
    <use href="#ID_scr" x="36" y="544" transform="rotate(50 36 544)"/>
    <use href="#ID_scr" x="864" y="544" transform="rotate(5 864 544)"/>
    <circle cx="450" cy="24" r="7" fill="url(#ID_kScrew)" stroke="#6a604a"/>
  </g>
</svg>`;
}

Xatspace.aoCarregar(function (d) {
  var ano = new Date().getFullYear();

  function todos(sel, fn) {
    document.querySelectorAll(sel).forEach(fn);
  }

  // ---------- Duotone da foto: lê as cores da paleta e ajusta o filtro ----------

  function corDaVariavel(nome, padrao) {
    var el = document.createElement("i");
    el.style.color = "var(" + nome + ")";
    document.body.appendChild(el);
    var c = getComputedStyle(el).color;
    el.remove();
    try {
      var cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      var cx = cv.getContext("2d", { willReadFrequently: true });
      cx.fillStyle = c;
      cx.fillRect(0, 0, 1, 1);
      var p = cx.getImageData(0, 0, 1, 1).data;
      return [p[0] / 255, p[1] / 255, p[2] / 255];
    } catch (e) {
      return padrao;
    }
  }

  function duotone() {
    var a = corDaVariavel("--duo-a", [.05, .16, .19]);
    var b = corDaVariavel("--duo-b", [.91, .45, .16]);
    var c = corDaVariavel("--duo-c", [1, .88, .6]);
    ["R", "G", "B"].forEach(function (canal, i) {
      var meio = a[i] + (b[i] - a[i]) * 0.2;
      var f = document.querySelector("#duo-k7 feFunc" + canal);
      f.setAttribute("tableValues", [a[i], meio, b[i], c[i]].map(function (v) { return v.toFixed(3); }).join(" "));
    });
  }
  duotone();

  // ---------- Textos de ano ----------

  todos("[data-ano]", function (el) { el.textContent = ano; });

  // ---------- Foto do encarte (se faltar uma, usa outra) ----------

  var f = d.fotos;
  var gal = f.galeria || [];
  var foto = f.destaque || f.perfil || gal[0] || "";
  var ePerfil = !f.destaque && !!f.perfil;
  todos("[data-foto]", function (el) {
    if (foto) el.style.backgroundImage = "url('" + Xatspace.arquivo(foto) + "')";
    var mobile = !!el.closest(".mob");
    // Rosto fica no alto da foto de corpo inteiro; no retrato, um pouco mais abaixo
    el.style.backgroundPosition = (mobile ? "54%" : "50%") + (ePerfil ? " 14%" : " 2%");
  });

  // ---------- A fita cassete ----------

  todos(".cassete", function (el, i) {
    el.innerHTML = desenhoFita().replace(/ID_/g, "k" + i + "-");
  });

  var nomeFita = (d.nome || d.nomeCompleto || "").toUpperCase();
  todos(".k7-titulo", function (el) {
    el.textContent = (nomeFita ? nomeFita + " · " : "") + "MIX " + ano + " · LADO A";
  });

  // A frase vai na etiqueta, em até 2 linhas: quebra na primeira frase ou no meio
  function linhasDaFrase(frase) {
    var t = (frase || "").trim();
    if (!t) return ["", ""];
    var frases = t.match(/[^.!?…]+[.!?…]+|\S[^.!?…]*$/g) || [t];
    frases = frases.map(function (s) { return s.trim(); }).filter(Boolean);
    if (frases.length >= 2) return [frases[0], frases.slice(1).join(" ")];
    if (t.length > 30) {
      var meio = t.length / 2, melhor = -1, dist = 1e9;
      for (var i = 0; i < t.length; i++) {
        if (t[i] === " " && Math.abs(i - meio) < dist) { dist = Math.abs(i - meio); melhor = i; }
      }
      if (melhor > 0) return [t.slice(0, melhor), t.slice(melhor + 1)];
    }
    return [t, ""];
  }
  var linhas = linhasDaFrase(d.frase);
  todos(".k7-l1", function (el) { el.textContent = linhas[0]; });
  todos(".k7-l2", function (el) { el.textContent = linhas[1]; });

  // Diminui a escrita da etiqueta até caber; se ainda passar, corta com reticências
  function caberSvg(el, largura, base, minimo) {
    var texto = el.textContent;
    var tam = base;
    el.setAttribute("font-size", tam);
    while (el.getComputedTextLength() > largura && tam > minimo) {
      tam -= 1;
      el.setAttribute("font-size", tam);
    }
    while (el.getComputedTextLength() > largura && texto.length > 4) {
      texto = texto.slice(0, -2).replace(/\s+\S*$/, "") + "…";
      el.textContent = texto;
    }
  }

  // ---------- Nome na lombada e no encarte ----------

  function caberLinha(el, max, minimo) {
    if (!el) return;
    el.style.width = "auto";
    el.style.fontSize = "";
    var tam = parseFloat(getComputedStyle(el).fontSize);
    el.style.whiteSpace = "nowrap";
    while (el.offsetWidth > max && tam > minimo) {
      tam *= 0.96;
      el.style.fontSize = tam + "px";
    }
  }

  function ajustar() {
    todos(".k7-titulo", function (el) { caberSvg(el, 640, 54, 30); });
    todos(".k7-l1, .k7-l2", function (el) { caberSvg(el, 690, 36, 22); });
    caberLinha(document.querySelector(".desk .jspine .txt"), 520, 16);
    caberLinha(document.querySelector(".mob .jspine .txt"), 320, 9);
    Xatspace.caber(document.querySelector(".desk .n1"), 372, 36);
    Xatspace.caber(document.querySelector(".desk .n2"), 230, 26);
    Xatspace.caber(document.querySelector(".mob .n1"), 130, 14);
    Xatspace.caber(document.querySelector(".mob .n2"), 130, 12);
  }
  ajustar();
  if (document.fonts) document.fonts.ready.then(ajustar);

  // ---------- Códigos das faixas: A1, A2... só nas que aparecem ----------

  todos(".faixas", function (lista) {
    var n = 0;
    lista.querySelectorAll(".faixa").forEach(function (fx) {
      fx.classList.remove("sel-2", "sel-3", "sel-4");
      if (fx.hidden) return;
      n++;
      fx.querySelector(".cod").textContent = "A" + n;
      if (n > 1) fx.classList.add("sel-" + n);
    });
  });

  // ---------- Código de barras do encarte ----------

  todos(".barcode", function (svg) {
    var w = Number(svg.getAttribute("width")), h = Number(svg.getAttribute("height"));
    var larguras = [2, 1, 3, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 1, 2, 2, 1, 1, 3, 1, 2, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1];
    var total = larguras.reduce(function (a, b) { return a + b; }, 0);
    var u = w / total, x = 0, html = "";
    var alto = h > 30 ? h - 8 : h;
    larguras.forEach(function (k, i) {
      if (i % 2 === 0) html += '<rect x="' + x.toFixed(1) + '" y="0" width="' + (k * u).toFixed(1) + '" height="' + alto + '"/>';
      x += k * u;
    });
    if (h > 30) html += '<text x="0" y="' + (h - 1) + '" font-family="Share Tech Mono" font-size="8" letter-spacing="2.4">0 07 ' + ano + ' 90 4</text>';
    svg.innerHTML = html;
  });

  // ---------- Equalizador do display ----------

  todos("[data-barras]", function (el) {
    var alturas = [8, 14, 20, 13, 22, 17, 10, 19, 24, 16, 12, 21, 15, 9, 18, 23, 14, 11, 19, 13, 8, 17];
    var n = Number(el.dataset.barras) || alturas.length;
    var html = "";
    for (var i = 0; i < n; i++) html += '<i style="height:' + (alturas[i % alturas.length] * 0.9) + 'px"></i>';
    el.innerHTML = html;
  });

  // ---------- VU meters de agulha ----------

  var contaVu = 0;
  todos(".vu svg", function (svg, i) {
    contaVu++;
    var id = "vu" + contaVu;
    var ladoR = svg.parentNode.previousElementSibling && svg.parentNode.previousElementSibling.classList.contains("vu");
    var cx = 74, cy = 150, R = 104, h = "";
    function pt(a, r) { var t = (a - 90) * Math.PI / 180; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }
    h += '<defs><linearGradient id="' + id + 'f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--k1)"/><stop offset="1" style="stop-color:var(--k3)"/></linearGradient><clipPath id="' + id + 'c"><rect width="148" height="134" rx="4"/></clipPath></defs>';
    h += '<rect width="148" height="134" rx="4" fill="url(#' + id + 'f)"/><g clip-path="url(#' + id + 'c)">';
    var p0 = pt(14, R - 8), p1 = pt(44, R - 8), pa = pt(-44, R - 8);
    h += '<path d="M' + pa[0] + ' ' + pa[1] + ' A' + (R - 8) + ' ' + (R - 8) + ' 0 0 1 ' + p0[0] + ' ' + p0[1] + '" fill="none" style="stroke:var(--tinta)" stroke-width="2"/>';
    h += '<path d="M' + p0[0] + ' ' + p0[1] + ' A' + (R - 8) + ' ' + (R - 8) + ' 0 0 1 ' + p1[0] + ' ' + p1[1] + '" fill="none" style="stroke:var(--a3)" stroke-width="6"/>';
    for (var k = 0; k <= 24; k++) {
      var a = -44 + k * (88 / 24), maj = k % 4 === 0, p = pt(a, R - 8), q = pt(a, R - (maj ? 22 : 16));
      h += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" style="stroke:' + (a > 14 ? "var(--a3)" : "var(--tinta)") + '" stroke-width="' + (maj ? 2 : 1) + '"/>';
    }
    [["20", -42], ["10", -28], ["7", -17], ["5", -6], ["3", 5], ["0", 17], ["+3", 32]].forEach(function (l) {
      var p = pt(l[1], R - 34);
      h += '<text x="' + p[0] + '" y="' + (p[1] + 3) + '" text-anchor="middle" font-family="Share Tech Mono" font-size="10" style="fill:' + (l[1] > 14 ? "var(--a3)" : "var(--tinta)") + '">' + l[0] + '</text>';
    });
    h += '<text x="74" y="86" text-anchor="middle" font-family="Righteous" font-size="26" style="fill:var(--tinta)" opacity=".85">VU</text>';
    h += '<text x="14" y="124" font-family="Share Tech Mono" font-size="11" letter-spacing="2" style="fill:var(--tinta)">' + (ladoR ? "R" : "L") + '</text>';
    h += '<text x="134" y="124" text-anchor="end" font-family="Share Tech Mono" font-size="9" letter-spacing="2" style="fill:var(--tinta)" opacity=".7">dB</text>';
    h += '<g class="agulha"><line x1="77" y1="153" x2="77" y2="50" stroke="#000" stroke-opacity=".28" stroke-width="2.5"/><line x1="74" y1="150" x2="74" y2="46" stroke="#1a1410" stroke-width="2"/></g>';
    h += '<rect x="0" y="120" width="148" height="14" fill="#2a2018"/><rect x="0" y="118" width="148" height="3" fill="#000" opacity=".25"/>';
    h += '<path d="M0 0 H148 V44 C96 30 40 38 0 62Z" fill="#fff" opacity=".22"/></g>';
    h += '<rect width="148" height="134" rx="4" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="2"/>';
    svg.innerHTML = h;
  });

  // ---------- Tecla STOP: pausa a música (se estiver tocando) ----------

  todos("[data-k-stop]", function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!document.documentElement.classList.contains("xs-tocando")) return;
      var tocar = b.closest(".deck").querySelector("[data-xs-tocar]");
      if (tocar) tocar.click();
    });
  });

  // ---------- Contador de 4 dígitos e tempo restante ----------

  function segundos(t) {
    var p = String(t || "0:00").split(":");
    return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0);
  }
  function dois(n) { return String(n).padStart(2, "0"); }

  setInterval(function () {
    todos(".deck", function (deck) {
      var agora = segundos((deck.querySelector("[data-xs-tempo]") || {}).textContent);
      var total = segundos((deck.querySelector("[data-xs-duracao]") || {}).textContent);
      var c = deck.querySelector("[data-contador]");
      if (c) c.textContent = dois(Math.floor(agora / 60) % 100) + dois(agora % 60);
      var r = deck.querySelector("[data-resta]");
      if (r) {
        var falta = Math.max(0, total - agora);
        r.textContent = "-" + Math.floor(falta / 60) + ":" + dois(falta % 60);
      }
    });
  }, 400);

  statusNoXat(d);
});

// Consulta o status no xat pelo ID do cliente.
// Sem ID, ou se o usuário não existe, o status não aparece.
function statusNoXat(d) {
  if (!d.xat) return;
  fetch("https://api.xatools.net/v1/user/" + encodeURIComponent(d.xat) + "/online")
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (!res || res.code !== 200 || !res.data) return;
      var ligado = !!res.data.online;
      document.querySelectorAll("[data-xs-se='online']").forEach(function (el) {
        if (!ligado) marcarOffline(el);
        el.hidden = false;
      });
    })
    .catch(function () {});
}

function marcarOffline(el) {
  var textos = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  var pedaco;
  while ((pedaco = textos.nextNode())) {
    pedaco.nodeValue = pedaco.nodeValue.replace(/\bonline\b/gi, function (m) {
      if (m === m.toUpperCase()) return "OFFLINE";
      return m.charAt(0) === m.charAt(0).toUpperCase() ? "Offline" : "offline";
    });
  }
  el.classList.add("xs-off");
}
