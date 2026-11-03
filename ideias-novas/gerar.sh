#!/bin/bash
# Tira a imagem 1920×900 de cada ideia (NN-nome.html) em img/, com o Chrome do Windows.
# Uso: ./gerar.sh            gera todas
#      ./gerar.sh 01-fliperama   gera só essa
cd "$(dirname "$0")"
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
WIN=$(wslpath -w "$PWD" | tr '\\' '/')
mkdir -p img

ideias=("$@")
[ ${#ideias[@]} -eq 0 ] && ideias=($(ls *.html | grep -v -- "-mobile.html" | sed "s/\.html$//"))

for t in "${ideias[@]}"; do
  # perfil de Chrome próprio por execução, para poder rodar várias ao mesmo tempo
  timeout 90 "$CHROME" --headless=new --hide-scrollbars --allow-file-access-from-files \
    --user-data-dir="C:\\Users\\Public\\xat-ideias-$$-$t" --virtual-time-budget=6000 \
    --window-size=1920,900 --screenshot="$(wslpath -w "$PWD")\\img\\$t.png" \
    "file:$WIN/$t.html" > /dev/null 2>&1
  echo "img/$t.png"
done
