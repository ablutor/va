// Gera as imagens do portfólio de um ou mais modelos, direto no site xatspace-site:
//   public/img/modelos/<modelo>/<cor>.jpg          (1920×900)
//   public/img/modelos/<modelo>/mobile/<cor>.jpg   (390×844 em dobro)
//   public/img/miniaturas/<modelo>.jpg             (640×300, da primeira cor do data-cores)
// As cores vêm do data-cores do index.html de cada modelo. Cores masculinas usam o perfil
// do Rafael e as femininas o da Marina (clientes/rafael.js e clientes/marina.js).
// Uso (no Windows, via WSL): node.exe gerar-portfolio.mjs 43-verbete 44-zine
import { spawn } from "node:child_process";
import { writeFileSync, readFileSync, mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";

const AQUI = new URL(".", import.meta.url);
const SITE = "file://wsl.localhost/Ubuntu/home/albert/projetos/xatspace-site/public/img/";
const modelos = process.argv.slice(2);
const FEMININAS = ["feminino", "feminino-2", "pastel-rosa", "pastel-lilas", "pastel-pessego"];

const perfil = tmpdir() + "/xat-portfolio-chrome";
rmSync(perfil, { recursive: true, force: true });
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--remote-debugging-port=9347",
  "--user-data-dir=" + perfil, "--hide-scrollbars", "--allow-file-access-from-files", "about:blank"]);
const espera = ms => new Promise(r => setTimeout(r, ms));
let alvo;
for (let i = 0; i < 50 && !alvo; i++) { await espera(200);
  try { alvo = (await (await fetch("http://127.0.0.1:9347/json")).json()).find(t => t.type === "page"); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let n = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const cdp = (method, params = {}) => new Promise(r => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params })); })
  .then(m => { if (m.error) throw new Error(method + ": " + m.error.message); return m.result; });
await cdp("Page.enable");

// O selo do canto abre sozinho; para a imagem sair só com o ícone, o texto é zerado
const SEM_TEXTO = ".xs-marca__t{display:none!important}.xs-marca{gap:0!important;padding:0 8px!important}";
const tira = async (url, opcoes) => {
  await cdp("Page.navigate", { url });
  await espera(2800);
  await cdp("Runtime.evaluate", { expression: "var s=document.createElement('style');s.textContent=" + JSON.stringify(SEM_TEXTO) + ";document.head.appendChild(s)" });
  await espera(300);
  return Buffer.from((await cdp("Page.captureScreenshot", opcoes)).data, "base64");
};
const salva = (caminho, dados) => {
  const destino = new URL(caminho, SITE);
  mkdirSync(new URL(".", destino), { recursive: true });
  writeFileSync(destino, dados);
};

// Modelos com movimento: no computador saem 4 quadros por cor (modelos/<modelo>/<cor>/1..4.jpg),
// em vez de uma imagem só. O mesmo vale para o config do site ('animado' no modelo ou na categoria).
// Cada tipo é um roteiro de 4 quadros: antes de cada print roda "antes" (JavaScript na página) e espera "espera" ms.
// "miniatura" marca o quadro do qual sai a miniatura (o 1º, se nenhum for marcado).
//   carinho: clica no bichinho (pulinho, corações e contador)
//   tocar:   liga o estado "tocando" como o player faz (carretéis, equalizador, luz do rádio)
//   manga:   a página se monta, fica pronta, o retrato leva um clique e depois toca a música
const QUADROS = { "54-gatinho": "carinho", "47-fita-k7": "tocar", "49-lofi": "tocar", "55-manga-2": "manga" };
const CLICAR = seletor => `var b=[].slice.call(document.querySelectorAll('${seletor}')).filter(function(e){return e.offsetParent})[0];b.click()`;
const TOCAR = "document.documentElement.classList.add('xs-tocando');[].forEach.call(document.querySelectorAll('[data-xs-player]'),function(e){e.classList.add('is-playing')})";
const ROTEIROS = {
  carinho: { zerar: true, passos: [{ espera: 0 }, { antes: CLICAR(".bicho"), espera: 150 }, { espera: 450 }, { espera: 650 }] },
  tocar: { passos: [{ espera: 0 }, { antes: TOCAR, espera: 350 }, { espera: 700 }, { espera: 700 }] },
  manga: { passos: [{ antes: "mangaEntrada()", espera: 450 }, { espera: 1900, miniatura: true }, { antes: CLICAR("[data-impacto]"), espera: 160 }, { antes: TOCAR, espera: 700 }] }
};
const jpeg = async opcoes => Buffer.from((await cdp("Page.captureScreenshot", { format: "jpeg", quality: 90, ...opcoes })).data, "base64");
const tiraQuadros = async (url, tipo) => {
  const roteiro = ROTEIROS[tipo];
  await cdp("Page.navigate", { url });
  if (roteiro.zerar) {
    // O contador de carinhos fica salvo no navegador: zera e recarrega para o 1º quadro mostrar 0
    await espera(600);
    await cdp("Runtime.evaluate", { expression: "localStorage.clear()" });
    await cdp("Page.reload");
  }
  await espera(2800);
  await cdp("Runtime.evaluate", { expression: "var s=document.createElement('style');s.textContent=" + JSON.stringify(SEM_TEXTO) + ";document.head.appendChild(s)" });
  await espera(300);
  const quadros = [];
  let miniatura = null;
  for (const [i, passo] of roteiro.passos.entries()) {
    if (passo.antes) await cdp("Runtime.evaluate", { expression: passo.antes });
    if (passo.espera) await espera(passo.espera);
    if (passo.miniatura || (i === 0 && !roteiro.passos.some(p => p.miniatura))) miniatura = await jpeg({ clip: { x: 0, y: 0, width: 1920, height: 900, scale: 1 / 3 } });
    quadros.push(await jpeg());
  }
  return { miniatura, quadros };
};

// Os modelos ficam em modelos/<categoria>/<modelo>/; acha a categoria pelo nome do modelo
const pasta = modelo => {
  const categoria = readdirSync(new URL("modelos/", AQUI)).find(c => existsSync(new URL(`modelos/${c}/${modelo}/index.html`, AQUI)));
  if (!categoria) throw new Error("modelo não encontrado: " + modelo);
  return `modelos/${categoria}/${modelo}`;
};

// Fotos de exemplo de cada modelo, para as imagens do portfólio não repetirem a mesma paisagem (nem a foto do autor).
// cenario = fotos.cenario; g3 e g4 = as duas fotos de paisagem da galeria (fotos.galeria[3] e [4]). Caminhos como nos dados dos
// clientes (a partir de clientes/). O motor não muda: a troca é feita na página, antes de o arquivo do cliente ser lido.
const FOTOS = {
  "02-folha-de-contato": { g3: "exemplo/estrada-deserto.jpg", g4: "exemplo/baloes.jpg" },
  "04-livro-aberto": { cenario: "exemplo/lago.jpg" },
  "06-cinema": { cenario: "exemplo/estrada-deserto.jpg" },
  "10-cartao-postal": { cenario: "exemplo/igreja.jpg" },
  "29-mural-de-cortica": { cenario: "exemplo/montanhas-nuvens.jpg" },
  "31-quadrinhos": { cenario: "exemplo/cidade.jpg" },
  "45-manga": { cenario: "exemplo/montanhas.jpg", g3: "exemplo/cidade.jpg", g4: "exemplo/lago.jpg" },
  "46-varal": { cenario: "exemplo/estrada.jpg", g3: "exemplo/baloes.jpg", g4: "exemplo/carro.jpg" },
  "55-manga-2": { cenario: "exemplo/carro.jpg", g3: "exemplo/estrada-deserto.jpg", g4: "exemplo/montanhas-nuvens.jpg" }
};
// Parâmetros extras no endereço de cada modelo: o Hora fica parado numa hora bonita, para a imagem não mudar a cada geração
const EXTRA = { "42-hora": "&hora=10:09" };
const trocaFotos = f => `(function(f){var x;Object.defineProperty(window,"Xatspace",{configurable:true,get:function(){return x},set:function(v){x=v;var o=v.cliente;v.cliente=function(d){if(d&&d.fotos){if(f.cenario)d.fotos.cenario=f.cenario;if(d.fotos.galeria){if(f.g3)d.fotos.galeria[3]=f.g3;if(f.g4)d.fotos.galeria[4]=f.g4}}return o.apply(this,arguments)}}})})(${JSON.stringify(f)})`;

for (const modelo of modelos) {
  const troca = FOTOS[modelo] ? (await cdp("Page.addScriptToEvaluateOnNewDocument", { source: trocaFotos(FOTOS[modelo]) })).identifier : null;
  const html = readFileSync(new URL(`${pasta(modelo)}/index.html`, AQUI), "utf8");
  const cores = html.match(/data-cores="([^"]+)"/)[1].split(/\s+/);
  for (const cor of cores) {
    const cliente = FEMININAS.includes(cor) ? "marina" : "rafael";
    const url = new URL(`${pasta(modelo)}/index.html?c=${cliente}&cor=${cor}${EXTRA[modelo] || ""}`, AQUI).href;
    await cdp("Emulation.setDeviceMetricsOverride", { width: 1920, height: 900, deviceScaleFactor: 1, mobile: false });
    if (QUADROS[modelo]) {
      const { miniatura, quadros } = await tiraQuadros(url, QUADROS[modelo]);
      quadros.forEach((q, i) => salva(`modelos/${modelo}/${cor}/${i + 1}.jpg`, q));
      if (cor === cores[0]) salva(`miniaturas/${modelo}.jpg`, miniatura);
    } else {
      salva(`modelos/${modelo}/${cor}.jpg`, await tira(url, { format: "jpeg", quality: 90 }));
      if (cor === cores[0]) salva(`miniaturas/${modelo}.jpg`, await jpeg({ clip: { x: 0, y: 0, width: 1920, height: 900, scale: 1 / 3 } }));
    }
    await cdp("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    salva(`modelos/${modelo}/mobile/${cor}.jpg`, await tira(url, { format: "jpeg", quality: 88 }));
    console.log(modelo, cor);
  }
  if (troca) await cdp("Page.removeScriptToEvaluateOnNewDocument", { identifier: troca });
}
ws.close(); chrome.kill(); process.exit(0);
