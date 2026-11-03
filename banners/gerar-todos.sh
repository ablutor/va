#!/bin/bash
# Regera os banners de todos os modelos (cliente rafael): o final de cada cor, em avatar quadrado e em avatar redondo (moldura
# vazia, como o xat espera), e, na cor original, as duas prévias com o avatar simulado (que vão para previas/<modelo>/). Uso: ./gerar-todos.sh [paralelismo, padrão 4] [modelo ...]  (sem modelos, vale todo NN-nome.html, menos 00 e 10)
# Pula as imagens que já existem em saida/<modelo>/ (apague-as para regerar), então dá para repetir até não faltar nenhuma.
cd "$(dirname "$0")" || exit 1
P="${1:-4}"; shift
MODELOS="$*"
[ -z "$MODELOS" ] && MODELOS=$(ls [0-9][0-9]-*.html | sed 's/\.html$//' | grep -v '^00-\|^10-')
# cores de cada modelo: as do catálogo, em _cores.txt (NN-modelo cor cor ...)
LISTA=$(mktemp)
for m in $MODELOS; do
  cores=$(grep "^$m " _cores.txt | cut -d' ' -f2- | tr ' ' '\n' | grep -v '^original$')
  echo "$m rafael" >> "$LISTA"
  echo "$m rafael redonda" >> "$LISTA"
  echo "$m rafael previa" >> "$LISTA"
  echo "$m rafael previa redonda" >> "$LISTA"
  for c in $cores; do echo "$m rafael cor=$c" >> "$LISTA"; echo "$m rafael cor=$c redonda" >> "$LISTA"; done
done
echo "$(wc -l < "$LISTA") imagens, $P de cada vez"
# tira da lista o que já existe (o nome do arquivo segue o mesmo padrão do gerar-banner.sh)
FALTA=$(mktemp)
while read -r m c op; do
  n="$c-$m"; for o in $op; do case "$o" in cor=*) n="$n-${o#cor=}";; esac; done
  case " $op " in *" previa "*) n="$n-previa";; esac; case " $op " in *" redonda "*) n="$n-redonda";; esac
  [ -f "saida/$m/$n.png" ] || [ -f "previas/$m/$n.png" ] || echo $m $c $op >> "$FALTA"
done < "$LISTA"
mv "$FALTA" "$LISTA"; echo "faltam $(wc -l < "$LISTA")"
cat "$LISTA" | xargs -P "$P" -L 1 bash -c './gerar-banner.sh "$@" >/dev/null 2>&1 || echo "FALHOU: $*"' _
rm -f "$LISTA"
true
