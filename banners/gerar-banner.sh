#!/bin/bash
# Gera a imagem estática (380×100) de um banner do perfil no xat: ./gerar-banner.sh 10-cartao-postal [cliente] [opções]
# Opções (em qualquer ordem): cor=<nome> (a cor do modelo, como no site: original, masculino, feminino, pastel-areia...),
# previa (avatar e etiquetas do xat simulados, só para avaliar), guia (contornos do avatar, da moldura e das etiquetas), redonda (o avatar do xat é redondo: moldura em círculo), papel (só no Cartão-postal, verso em papel), 2x (captura
# ampliada e reduz depois; o padrão é 1×, mais firme) e gif (o GIF animado, só no Cartão-postal; por padrão não sai).
# Sem cliente vale o exemplo do site (Marina). Os arquivos saem numa pasta por modelo: saida/<banner>/<cliente>-<banner>[-<cor>][-papel].png,
# e as prévias (com o avatar simulado) em previas/<banner>/.
# Pode rodar vários ao mesmo tempo: cada execução usa o seu Chrome (perfil e porta próprios) e a sua pasta de quadros.
cd "$(dirname "$0")" || exit 1
B="${1:?diga o banner, por exemplo 10-cartao-postal}"; C="${2:-marina}"; shift; shift
OP="$*"; N="$C-$B"; Q="_q$$-$RANDOM"
for o in $OP; do case "$o" in cor=*) N="$N-${o#cor=}";; esac; done
case " $OP " in *" papel "*) N="$N-papel";; esac
case " $OP " in *" previa "*) N="$N-previa";; esac
case " $OP " in *" guia "*) N="$N-guia";; esac
case " $OP " in *" redonda "*) N="$N-redonda";; esac
timeout 100 "/mnt/c/Program Files/nodejs/node.exe" gerar-banner.mjs "$B" "$C" $OP quadros=$Q 2>&1 | grep -v "^'\\\\\\|CMD.EXE\|UNC" || true
D="saida/$B"; case " $OP " in *" previa "*) D="previas/$B";; esac
mkdir -p "$D"
if [ ! -f "$Q/estatica.png" ]; then echo "FALHOU: o Chrome não gerou a imagem de $B ($C)"; rm -rf "$Q"; exit 1; fi
# Imagem estática: já sai em 380×100 (com a opção 2x, reduz de 760×200 com Lanczos)
ffmpeg -v error -y -i "$Q/estatica.png" -vf "scale=380:100:flags=lanczos" -frames:v 1 "$D/$N.png"
case " $OP " in *" gif "*)
  if ls "$Q"/q*.png >/dev/null 2>&1; then
    # GIF: uma paleta própria da animação, com a diferença entre quadros para o arquivo ficar leve
    ffmpeg -v error -y -framerate 10 -i "$Q/q%03d.png" \
      -vf "scale=380:100:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff:max_colors=200[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" \
      -loop 0 "$D/$N.gif"
  fi;;
esac
rm -rf "$Q"
ls -la "$D/$N".* | awk '{printf "%7.1f KB  %s\n", $5/1024, $9}'
