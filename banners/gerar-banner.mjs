// Gera o banner de 380×100 (janelinha do perfil no xat) de um modelo: a imagem estática (e, se pedir, os quadros de um GIF).
// O Chrome abre banners/<banner>.html com os dados do cliente e tira os quadros em banners/<quadros>/; o gerar-banner.sh
// monta a imagem final em banners/saida/. Pode rodar vários ao mesmo tempo: cada execução usa a sua porta e a sua pasta.
// Uso (no Windows, via WSL): node.exe gerar-banner.mjs 10-cartao-postal [cliente] [opções]
// Opções: cor=<nome> (a cor do modelo, como no site), previa (avatar e etiquetas do xat simulados por cima), guia (contornos do
// avatar, da moldura e das etiquetas), papel (só no
// Cartão-postal: verso em papel), gif (também os quadros do GIF), 2x (captura ampliada), quadros=<pasta>.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync, rmSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";

const AQUI = new URL(".", import.meta.url);
const banner = process.argv[2];
const cliente = process.argv[3] || "marina";
const opcoes = process.argv.slice(4);
const valor = nome => (opcoes.find(o => o.startsWith(nome + "=")) || "").slice(nome.length + 1);
const previa = opcoes.includes("previa");
const guia = opcoes.includes("guia");
const redonda = opcoes.includes("redonda");
const paisagem = !opcoes.includes("papel");
const gif = opcoes.includes("gif");
const cor = valor("cor");
const pastaQuadros = valor("quadros") || "_quadros";
// Por padrão a captura é em 1× (380×100 direto: o texto pequeno fica mais firme); "2x" captura ampliado e reduz depois
const escala = opcoes.includes("2x") ? 2 : 1;
const fps = 10;
if (!banner) throw new Error("diga o banner, por exemplo: 10-cartao-postal");

// Cada execução tem o seu perfil do Chrome (pasta única) e deixa o próprio Chrome escolher uma porta livre: assim execuções em
// paralelo nunca se enxergam nem trocam de página. A porta vem do arquivo DevToolsActivePort que o Chrome grava no perfil.
const perfil = tmpdir() + "/xat-banner-chrome-" + process.pid + "-" + Date.now() + "-" + Math.floor(Math.random() * 1e6);
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--remote-debugging-port=0",
  "--user-data-dir=" + perfil, "--hide-scrollbars", "--disable-lcd-text", "--allow-file-access-from-files", "about:blank"]);
const espera = ms => new Promise(r => setTimeout(r, ms));
// Apaga o perfil temporário do Chrome em qualquer saída (sem isso as falhas deixavam centenas de pastas e travavam as execuções seguintes)
const sair = codigo => { try { chrome.kill(); } catch {} setTimeout(() => { try { rmSync(perfil, { recursive: true, force: true }); } catch {} process.exit(codigo); }, 300); };
// Se a página nunca ficar pronta (por exemplo, erro de sintaxe no JavaScript do banner), desiste em vez de ficar pendurado
setTimeout(() => { console.error("TEMPO ESGOTADO: a página do banner não ficou pronta (erro no JavaScript?)"); sair(1); }, 60000);
let porta = 0, alvo;
for (let i = 0; i < 100 && !porta; i++) { await espera(150);
  try { if (existsSync(perfil + "/DevToolsActivePort")) porta = Number(readFileSync(perfil + "/DevToolsActivePort", "utf8").split("\n")[0]); } catch {} }
for (let i = 0; i < 50 && !alvo && porta; i++) { await espera(200);
  try { alvo = (await (await fetch("http://127.0.0.1:" + porta + "/json")).json()).find(t => t.type === "page"); } catch {} }
if (!alvo) { console.error("O Chrome não abriu a página de depuração"); sair(1); await espera(2000); }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let n = 0; const pend = {};
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; return; }
  // Erros da página (por exemplo, um script que parou) aparecem aqui, para não sair uma imagem quebrada em silêncio
  if (m.method === "Runtime.exceptionThrown") console.error("ERRO NA PÁGINA:", m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") console.error("console.error:", m.params.args.map(a => a.value ?? a.description).join(" "));
};
const cdp = (method, params = {}) => new Promise(r => { const id = ++n; pend[id] = r; ws.send(JSON.stringify({ id, method, params })); })
  .then(m => { if (m.error) throw new Error(method + ": " + m.error.message); return m.result; });
const avalia = async expressao => (await cdp("Runtime.evaluate", { expression: expressao, awaitPromise: true, returnByValue: true })).result.value;
const png = async () => Buffer.from((await cdp("Page.captureScreenshot", { format: "png" })).data, "base64");

await cdp("Page.enable");
await cdp("Runtime.enable");
await cdp("Emulation.setDeviceMetricsOverride", { width: 380, height: 100, deviceScaleFactor: escala, mobile: false });
const url = new URL(`${banner}.html`, AQUI).href + "?c=" + cliente + (cor ? "&cor=" + cor : "") + (previa ? "&previa=1" : "") + (guia ? "&guia=1" : "") + (redonda ? "&forma=redonda" : "") + (paisagem ? "&v=paisagem" : "");
await cdp("Page.navigate", { url });
await espera(1500);
await avalia("window.pronto || true");
await espera(600);

const saida = new URL(pastaQuadros + "/", AQUI);
rmSync(saida, { recursive: true, force: true });
mkdirSync(saida, { recursive: true });

// Banners animados (só o Cartão-postal tinha) definem render(t), CICLO e T_ESTATICA; os demais são imagens paradas
const animado = await avalia("typeof render === 'function'");
if (gif && animado) {
  const total = Math.round((await avalia("window.CICLO")) * fps);
  // O GIF começa com o banner completo (e não vazio): assim uma prévia parada mostra o banner pronto
  const inicio = await avalia("window.T_ESTATICA - 0.2");
  for (let i = 0; i < total; i++) {
    await avalia(`render(${inicio + i / fps})`);
    await espera(40);
    writeFileSync(new URL(`q${String(i).padStart(3, "0")}.png`, saida), await png());
  }
}
if (animado) await avalia(`render(${await avalia("window.T_ESTATICA")})`);
await espera(60);
writeFileSync(new URL("estatica.png", saida), await png());
console.log(banner, cliente, cor || "", "ok");
ws.close(); sair(0);
