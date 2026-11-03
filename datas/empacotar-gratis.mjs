// Monta um site estático por data gratuita, em modelos/gratuitos/<pasta>/.
// Cada pasta é um GitHub Pages: a raiz é a versão original e as outras
// versões ficam em subpastas (cemiterio/, lareira/, …).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const destino = join(aqui, "..", "modelos", "gratuitos");
const base = readFileSync(join(aqui, "base.js"), "utf8");
const temas = readFileSync(join(aqui, "temas.js"), "utf8");
const versoes = readFileSync(join(aqui, "versoes.js"), "utf8");

const pecas = temas.slice(0, temas.indexOf("const TEMAS")) + "\n" + versoes.slice(0, versoes.indexOf("Object.assign"));

const feriados = [
  ["33-halloween", "Halloween", [["halloween", "original"], ["halloween-cemiterio", "cemiterio"], ["halloween-aboboras", "aboboras"]]],
  ["34-natal", "Natal", [["natal", "original"], ["natal-lareira", "lareira"], ["natal-aurora", "aurora"]]],
  ["35-reveillon", "Réveillon", [["reveillon", "original"], ["reveillon-praia", "praia"], ["reveillon-meia-noite", "meia-noite"]]],
  ["36-carnaval", "Carnaval", [["carnaval", "original"], ["carnaval-olinda", "olinda"], ["carnaval-plumas", "plumas"]]],
  ["37-pascoa", "Páscoa", [["pascoa", "original"], ["pascoa-pintinhos", "pintinhos"], ["pascoa-jardim", "jardim"]]],
  ["38-dia-dos-namorados", "Dia dos Namorados", [["namorados", "original"], ["namorados-baloes", "baloes"], ["namorados-rosas", "rosas"]]],
  ["39-festa-junina", "Festa Junina", [["junina", "original"], ["junina-arraia", "arraia"], ["junina-baloes", "baloes"]]],
];

const corpos = new Map();
for (const fonte of [temas, versoes]) {
  for (const chave of fonte.match(/^(?:  [a-z0-9-]+|  "[a-z0-9-]+"): \{/gm) || []) {
    const nome = chave.match(/[a-z0-9-]+/)[0];
    const abre = fonte.indexOf(chave) + chave.lastIndexOf("{");
    corpos.set(nome, fonte.slice(abre, fimDoObjeto(fonte, abre) + 1));
  }
}

const style = `html, body { margin: 0; height: 100%; }
body {
  background: var(--fundo, #120a24);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.cena {
  display: block;
  width: min(1100px, 94vw);
  height: auto;
  filter: drop-shadow(0 24px 50px rgba(0, 0, 0, .35));
}

.xs-marca {
  position: fixed;
  z-index: 50;
  right: 18px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 0;
  height: 32px;
  padding: 0 8px;
  border-radius: 99px;
  border: 1.5px solid color-mix(in srgb, var(--xs-marca-cor, #fff) 35%, transparent);
  background: color-mix(in srgb, var(--xs-marca-fundo, #000) 75%, transparent);
  color: var(--xs-marca-cor, #fff);
  font: 700 11.5px/1 system-ui, sans-serif;
  letter-spacing: .02em;
  text-decoration: none;
  opacity: .9;
  box-shadow: 0 4px 14px rgba(0, 0, 0, .14);
  backdrop-filter: blur(6px);
  transition: opacity 250ms ease, gap 300ms ease, padding 300ms ease;
}
.xs-marca svg {
  flex: none;
  width: 16px;
  height: 16px;
  fill: var(--xs-marca-destaque, currentColor);
  animation: xs-brilho 2.8s ease-in-out infinite;
}
@keyframes xs-brilho {
  0%, 70%, 100% { transform: scale(1) rotate(0); }
  80% { transform: scale(1.35) rotate(20deg); }
  90% { transform: scale(.95) rotate(0); }
}
.xs-marca__t { max-width: 0; overflow: hidden; white-space: nowrap; transition: max-width 350ms ease; }
.xs-marca:hover, .xs-marca:focus-visible {
  opacity: 1;
  gap: 7px;
  padding: 0 13px 0 9px;
}
.xs-marca:hover .xs-marca__t, .xs-marca:focus-visible .xs-marca__t { max-width: 220px; }
`;

const pagina = `const tema = TEMAS[window.VERSAO];
if (!tema) throw new Error("Versão desconhecida: " + window.VERSAO);
document.title = "xatspaces · " + tema.titulo;
document.body.style.setProperty("--fundo", tema.pagina);
document.querySelector(".cena").innerHTML = montaCena(tema);

const selo = document.createElement("a");
selo.className = "xs-marca";
selo.href = "https://xatspaces.com/";
selo.target = "_blank";
selo.rel = "noopener";
selo.title = selo.ariaLabel = "Quero um xatspace assim";
selo.style.cssText = "--xs-marca-fundo:" + tema.selo.fundo + ";--xs-marca-cor:" + tema.selo.cor + ";--xs-marca-destaque:" + tema.selo.destaque;
selo.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5z"/><path d="M19 15.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z" opacity=".6"/></svg><span class="xs-marca__t">Quero um xatspace assim</span>';
document.body.appendChild(selo);
`;

function html(versao, prefixo) {
  const sobe = prefixo ? "../" : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>xatspaces</title>
<link rel="stylesheet" href="${sobe}style.css">
</head>
<body>
<svg class="cena" viewBox="0 0 1100 680" xmlns="http://www.w3.org/2000/svg"></svg>
<script>window.VERSAO = ${JSON.stringify(versao)};</script>
<script src="${sobe}cena.js"></script>
<script src="${sobe}pagina.js"></script>
</body>
</html>
`;
}

for (const [pasta, nome, lista] of feriados) {
  const raiz = join(destino, pasta);
  const entradas = lista.map(([chave, id]) => {
    const corpo = corpos.get(chave);
    if (!corpo) throw new Error("cena não encontrada: " + chave);
    return `  ${JSON.stringify(id)}: ${corpo}`;
  });
  const cena = `// ${nome}. Cada chave é uma versão publicada no GitHub Pages.\n` + base + "\n" + pecas + "\nconst TEMAS = {\n" + entradas.join(",\n") + "\n};\n";
  mkdirSync(raiz, { recursive: true });
  writeFileSync(join(raiz, "cena.js"), cena);
  writeFileSync(join(raiz, "pagina.js"), pagina);
  writeFileSync(join(raiz, "style.css"), style);
  writeFileSync(join(raiz, ".nojekyll"), "");
  writeFileSync(join(raiz, "index.html"), html("original", ""));
  writeFileSync(join(raiz, "README.md"), readme(nome, pasta, lista));
  for (const [, id] of lista) {
    if (id === "original") continue;
    const dir = join(raiz, id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html(id, "../"));
  }
  console.log(pasta, lista.map(([, id]) => id).join(", "));
}

function readme(nome, pasta, lista) {
  const linhas = lista.map(([, id]) => "- `" + (id === "original" ? "/" : "/" + id + "/") + "`");
  return `# ${nome}

Xatspace gratuito. Cada versão é uma página deste site:

${linhas.join("\n")}

A raiz do repositório é o GitHub Pages (branch main, pasta /).
`;
}

function fimDoObjeto(src, inicio) {
  let i = inicio;
  let depth = 0;
  const stack = [{ type: "code", depth: 0 }];
  const topo = () => stack[stack.length - 1];
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    const t = topo();
    if (t.type === "line") { if (c === "\n") stack.pop(); i++; continue; }
    if (t.type === "block") { if (c === "*" && n === "/") { stack.pop(); i += 2; continue; } i++; continue; }
    if (t.type === "sq" || t.type === "dq") {
      const q = t.type === "sq" ? "'" : '"';
      if (c === "\\") { i += 2; continue; }
      if (c === q) stack.pop();
      i++;
      continue;
    }
    if (t.type === "tpl") {
      if (c === "\\") { i += 2; continue; }
      if (c === "`") { stack.pop(); i++; continue; }
      if (c === "$" && n === "{") { stack.push({ type: "code", depth }); depth++; i += 2; continue; }
      i++;
      continue;
    }
    if (c === "/" && n === "/") { stack.push({ type: "line", depth }); i += 2; continue; }
    if (c === "/" && n === "*") { stack.push({ type: "block", depth }); i += 2; continue; }
    if (c === "'") { stack.push({ type: "sq", depth }); i++; continue; }
    if (c === '"') { stack.push({ type: "dq", depth }); i++; continue; }
    if (c === "`") { stack.push({ type: "tpl", depth }); i++; continue; }
    if (c === "{") { depth++; i++; continue; }
    if (c === "}") {
      depth--;
      i++;
      if (stack.length > 1 && topo().type === "code" && depth === topo().depth) { stack.pop(); continue; }
      if (depth === 0) return i - 1;
      continue;
    }
    i++;
  }
  throw new Error("objeto sem fim, a partir de " + inicio);
}
