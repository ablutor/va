# xatspaces

Esta pasta é o `codigo_base`: o projeto exemplo. Um cliente novo é uma cópia dela,
em `clientes/<nome-do-cliente>` na raiz de `xatspace_modelos`, com repositório Git próprio.
O exemplo fica como está. A pasta `clientes/` aqui dentro guarda só os dados de exemplo.

Modelos de xatspace para uso pessoal, em 3 categorias: Editoriais (01–10), Fofinhos (11–15)
e Pokémon (16–20). Um único código atende todos os perfis: cada pessoa é só um arquivo de dados.

```
xatspaces/
├── core/               o motor, igual para todos os modelos
│   ├── config.js       sua assinatura e o link da marca d'água
│   ├── xatspace.js     carrega o cliente, preenche a página, música e marca d'água
│   ├── base.css        estilos comuns (player, marca d'água, palco)
│   └── cores.css       as 6 paletas pastel
├── clientes/           um arquivo por cliente + uma pasta com as fotos dele
│   ├── marina.js
│   ├── rafael.js
│   └── exemplo/          fotos dos dois perfis de exemplo
└── modelos/            uma pasta por categoria, igual ao site; um modelo por pasta: index.html, style.css, script.js
    ├── gratuitos/      33 a 39 (cada data é um repositório próprio, publicado no GitHub Pages)
    ├── minimalistas/   22 a 25, 40 a 42
    ├── fofinhos/       11 a 15, 54, 56
    ├── pokemon/        16, 17
    ├── cenarios/       50 a 53
    ├── editoriais/     01 a 07, 09, 10, 43
    ├── tematicos/      08, 27, 29 a 31, 45, 46
    ├── ilustrados/     28, 32, 44, 47, 49, 55
    ├── _fofinhos/      base comum dos Fofinhos e dos Pokémon
    └── _fora-do-site/  modelos que saíram do portfólio (18 a 20)
```

## Link do cliente

```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/xatspaces/modelos/editoriais/01-revista/?c=rafael
```

- `?c=` é o nome do arquivo do cliente em `clientes/` (sem o `.js`).
- `&cor=` troca a cor só naquele link, sem mexer nos dados, o que é útil para mostrar opções ao cliente.

## Vender um xatspace novo

1. Copie `clientes/rafael.js` ou `clientes/marina.js` para `clientes/<nome>.js` e crie a pasta `clientes/<nome>/` com as fotos.
2. Preencha os dados: nome, frase, fotos, música (código do vídeo do YouTube), instagram, cor e o `xat` (o ID numérico no xat).
3. Envie para o GitHub e mande o link do modelo escolhido com `?c=<nome>`.

As fotos podem ser um caminho dentro de `clientes/` (`"bruno/perfil.jpg"`) ou um link
completo (`"https://i.imgur.com/....jpg"`).

## Status no xat

O campo `xat` é o ID numérico do dono. A página consulta esse ID e o selo mostra **online** ou **offline**. Se o ID não existe (a pessoa trocou de ID), o selo não aparece. Sem o campo, também não aparece.

## Cores

Em todos os modelos:

| Nome | Ideia |
|---|---|
| `original` | cor do desenho original (padrão) |
| `masculino` | segunda opção masculina |
| `feminino` | primeira opção feminina |
| `feminino-2` | segunda opção feminina |
| `pastel-rosa` | pastel feminino (o único pastel oferecido) |

A Galeria (05), o Grid suíço (09), os Fofinhos (11 a 15) e os Pokémon (16 a 20) não têm as cores pastel,
porque já são claros. Os Fofinhos e os Pokémon têm só `original`, `masculino`, `feminino` e `feminino-2`.
O Pikachu (16) tem só `original`: ele é amarelo e as outras cores não faziam sentido.
O nome real de cada cor fica no topo do `style.css` de cada modelo.
O Livro aberto (04) não tem `original`: todas as cores dele têm fundo pastel e a padrão é `masculino`.

Nos dados, `cor` pode ser uma cor só para todos os modelos (`cor: "pastel-areia"`) ou uma por modelo,
pelo nome da pasta, com `padrao` para os demais: `cor: { "10-cartao-postal": "pastel-areia", padrao: "" }`.

Na Capa de disco (08), `&foto=` deixa a foto igual em todas as cores e só o nome da capa leva a cor:
`pb` (preto e branco), `sepia` ou `normal` (cores de verdade da foto). Também pode ir nos dados como `foto`.
Sem ele, continua a foto tingida na cor, como antes.

## Fofinhos (modelos 11 a 15)

Família com um bichinho desenhado e animado no meio da tela e rastros das pegadas dele
passando pelo fundo. Clicar no bichinho faz ele pular e soltar corações, e o contador de
carinhos fica salvo no navegador de quem clicou. A base comum fica em `modelos/_fofinhos/`;
cada modelo só tem o desenho do bichinho, a pegada, as cores e as animações próprias.

| Modelo | Bichinho | Pegada |
|---|---|---|
| 11 | Coelhinho | coelho |
| 12 | Pinguim | ave de 3 dedos |
| 13 | Raposinha | raposa |
| 14 | Patinho | pata com membrana |
| 15 | Panda | urso |
| 56 | Ursinha do arco-íris | ursinho com almofada de coração |

A Ursinha do arco-íris (56) é a Ursinha Carinhosa rosa com o arco-íris na barriga, em pé numa nuvem,
segurando um pirulito. Foi vetorizada a partir de uma imagem de referência dos Ursinhos Carinhosos
(todos têm o mesmo formato; só a cor e o desenho da barriga mudam). As cores trocam só o céu em degradê.
Os Ursinhos Carinhosos (Care Bears) são personagens registrados da Cloudco: **só para uso pessoal, não vender.**

## Pokémon (modelos 16 a 20)

Pikachu, Chikorita, Squirtle, Jigglypuff e Psyduck, com os mesmos recursos dos Fofinhos.
São personagens registrados da Nintendo / The Pokémon Company: **só para uso pessoal, não vender.**
Padrão: cada Pokémon é vetorizado a partir de uma imagem de referência, com o **contorno fino do Pikachu**
(uns 2–3 px na tela). Pikachu e Chikorita já seguem o padrão; Squirtle, Jigglypuff e Psyduck ainda vão ser refeitos.

## Temas com foto (modelos 50 a 53)

Cada um usa uma foto real que fica na própria pasta do modelo (o tema é fixo; a foto do cliente
entra só no perfil). As três cores (`original`, `masculino`, `feminino`) mudam só a paleta.
Não têm versões pastel. Clicar no ID copia o número.

| Modelo | Tema | Foto |
|---|---|---|
| 50 | Praia ao pôr do sol, cartão claro | `praia.jpg` |
| 51 | Café, foto larga e três colunas | `cafe.jpg` |
| 52 | Pé na estrada, pôster e blocos | `estrada.jpg` e `capa.jpg` |
| 53 | Rua noturna de cidade grande, com neon | `rua.jpg` |

As fotos são do Unsplash (licença de uso comercial livre, sem crédito obrigatório):
praia `photo-1507525428034-b723cf961d3e`, café `photo-1495474472287-4d71bcdd2085`,
estrada `photo-1500530855697-b586d89ba3ee`, capa `photo-1506905925346-21bda4d32df4`,
rua `photo-1534270804882-6b5048b1c1fc` (em `https://unsplash.com/photos/`).

## Palco no celular

O desenho do celular tem tamanho fixo (em geral 390×844) e cabe inteiro na tela.
A escala é a menor entre a largura e a altura, e o palco fica centralizado.
A página não rola: nome, fotos, textos e player permanecem visíveis.

Num aparelho mais baixo, o desenho encolhe e o fundo aparece nas laterais.
Num aparelho mais alto, o desenho ocupa a largura e o fundo aparece em cima e embaixo.

## Selo no canto

Cada xatspace tem um selo pequeno e discreto no canto: só um ícone de brilho, sem nome.
Ao passar o mouse ele mostra "Quero um xatspace assim" e leva para o seu perfil.
O link e o texto ficam em `core/config.js`. Para tirar o selo de um perfil, use `semMarca: true` nos dados dele.

## Portfólio

As imagens dos modelos ficam no site Laravel `xatspace-site`, em `public/img/modelos/` e
`public/img/miniaturas/`. Este repositório guarda só o HTML, o CSS e o JavaScript.
Se um modelo mudar, as imagens dele precisam ser geradas de novo lá
(`node.exe gerar-portfolio.mjs 32-windows-xp`, só com o nome do modelo, sem a categoria).

## Tudo editável

Cada modelo é uma versão base só, sem cópia por cor. Para mudar um xatspace:

- **Cores**: blocos de variáveis no topo do `style.css` (`[data-cor="..."]`). A lista de cores do modelo fica no `data-cores` do `<html>`.
- **Textos do cliente**: os dados em `clientes/<nome>.js` (nome, frase, local, gostos, instagram, música...).
- **Textos fixos do tema** (títulos de janela, rótulos, legendas): o objeto `TEXTOS` no topo do `script.js`, nos modelos que têm.
- **Fotos**: `fotos` nos dados do cliente. Molduras, janelas, cartões e balões são HTML e CSS, com o miolo vazio;
  a foto só ocupa o espaço de dentro. Nenhum texto fica desenhado em imagem.

## Testar no computador

Basta abrir `modelos/<categoria>/NN-nome/index.html` no navegador (com `?cor=` para outra cor), sem precisar de servidor.
A música só toca depois de um clique, por regra dos navegadores. Dentro do xat, o clique no player libera o som.

## Para o futuro

Hoje os dados vêm dos arquivos em `clientes/`. Para buscar os dados de uma planilha
ou do Supabase, só a função `carregarCliente()` em `core/xatspace.js` precisa mudar:
os campos continuam os mesmos e os modelos não precisam ser mexidos.
