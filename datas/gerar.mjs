// Gera as imagens das datas comemorativas direto no site (xatspace-site/public/img):
// modelos/NN-tema/<cor>.jpg (1920×900), modelos/NN-tema/mobile/<cor>.jpg (390×844 em dobro)
// e, da versão original, miniaturas/NN-tema.jpg (640×300).
// Uso (no Windows): node.exe gerar.mjs [halloween natal-aurora ...]
//   "halloween" gera as três versões; "natal-aurora", só essa; sem nomes, gera tudo.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

const AQUI = new URL(".", import.meta.url);
const SITE = "file://wsl.localhost/Ubuntu/home/albert/projetos/xatspace-site/public/img/";
const nomes = process.argv.slice(2);

const perfil = tmpdir() + "/xat-datas-chrome";
rmSync(perfil, { recursive: true, force: true });
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--remote-debugging-port=9337",
  "--user-data-dir=" + perfil, "--hide-scrollbars", "--allow-file-access-from-files", "about:blank"]);
const espera = ms => new Promise(r => setTimeout(r, ms));
let alvo;
for (let i = 0; i < 50 && !alvo; i++) { await espera(200);
  try { alvo = (await (await fetch("http://127.0.0.1:9337/json")).json()).find(t => t.type === "page"); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let n = 0; const pend = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const cdp = (method, params = {}) => new Promise(r => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params })); })
  .then(m => { if (m.error) throw new Error(method + ": " + m.error.message); return m.result; });

await cdp("Page.enable");
const tira = async (tema, opcoes) => {
  await cdp("Page.navigate", { url: new URL("cena.html?tema=" + tema, AQUI).href });
  await espera(2500);
  return Buffer.from((await cdp("Page.captureScreenshot", opcoes)).data, "base64");
};
const salva = (caminho, dados) => {
  const destino = new URL(caminho, SITE);
  mkdirSync(new URL(".", destino), { recursive: true });
  writeFileSync(destino, dados);
};
// A lista de temas (pasta e cor de cada um) vem da própria página
await cdp("Page.navigate", { url: new URL("cena.html", AQUI).href });
await espera(1500);
const todos = JSON.parse((await cdp("Runtime.evaluate", { expression: "JSON.stringify(Object.entries(TEMAS).map(([nome, t]) => [nome, t.pasta, t.cor || 'original']))" })).result.value);
const pedidos = todos.filter(([nome]) => !nomes.length || nomes.some(n => nome === n || nome.startsWith(n + "-")));
for (const [tema, id, cor] of pedidos) {
  await cdp("Emulation.setDeviceMetricsOverride", { width: 1920, height: 900, deviceScaleFactor: 1, mobile: false });
  salva(`modelos/${id}/${cor}.jpg`, await tira(tema, { format: "jpeg", quality: 90 }));
  if (cor === "original") salva(`miniaturas/${id}.jpg`, Buffer.from((await cdp("Page.captureScreenshot", { format: "jpeg", quality: 90, clip: { x: 0, y: 0, width: 1920, height: 900, scale: 1 / 3 } })).data, "base64"));
  await cdp("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  salva(`modelos/${id}/mobile/${cor}.jpg`, await tira(tema, { format: "jpeg", quality: 88 }));
  console.log(id, cor);
}
ws.close(); chrome.kill(); process.exit(0);
