#!/bin/bash
# Tira as duas imagens de cada tema (entrada e principal) com o Chrome do Windows:
# imagens/ no computador (1920×900) e imagens/celular/ (390×844 em dobro).
# Uso: ./gerar.sh            gera todos os temas
#      ./gerar.sh 01-cafe    gera só esse
cd "$(dirname "$0")"
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
WIN=$(wslpath -w "$PWD" | tr '\\' '/')
mkdir -p imagens/celular

temas=("$@")
[ ${#temas[@]} -eq 0 ] && temas=($(ls temas | sed 's/\.js$//'))

foto() { # tema tela pasta página tamanho escala
  timeout 90 "$CHROME" --headless=new --hide-scrollbars --allow-file-access-from-files \
    --user-data-dir="C:\\Users\\Public\\xat-propostas-$1" --virtual-time-budget=5000 \
    --window-size=$5 --force-device-scale-factor=$6 --screenshot="$(wslpath -w "$PWD/$3")\\$1-$2.png" \
    "file:$WIN/$4?t=$1&tela=$2&foto" > /dev/null 2>&1
  echo "$3/$1-$2.png"
}

# O Chrome não abre janela com menos de 500 px de largura: o celular vai num iframe de 390×844
# (celular.html) e a imagem é cortada depois.
corta() {
  python3 -c "import sys; from PIL import Image; im = Image.open(sys.argv[1]); im.crop((0, 0, 780, 1688)).save(sys.argv[1])" "$1"
}

for t in "${temas[@]}"; do
  for tela in entrada principal; do
    foto "$t" "$tela" imagens index.html 1920,900 1
    foto "$t" "$tela" imagens/celular celular.html 600,844 2 && corta "imagens/celular/$t-$tela.png"
  done
done
