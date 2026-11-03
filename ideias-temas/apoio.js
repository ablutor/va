// apoio.js: ícones em SVG e barras de onda sonora das ideias de temas.
const Apoio = (() => {
  const rng = seed => { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); };
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

  return { icones, ondas };
})();
