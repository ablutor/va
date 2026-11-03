#!/bin/bash
# Tira a imagem 390×844 de cada versão mobile (NN-nome-mobile.html) em img/, com o Chrome do Windows.
# Uso: ./gerar-mobile.sh                    gera todas
#      ./gerar-mobile.sh 01-fliperama-mobile   gera só essa
cd "$(dirname "$0")"
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
WIN=$(wslpath -w "$PWD" | tr '\\' '/')
mkdir -p img

ideias=("$@")
[ ${#ideias[@]} -eq 0 ] && ideias=($(ls *-mobile.html | sed 's/\.html$//'))

for t in "${ideias[@]}"; do
  timeout 90 "$CHROME" --headless=new --hide-scrollbars --allow-file-access-from-files \
    --user-data-dir="C:\\Users\\Public\\xat-ideias-$$-$t" --virtual-time-budget=6000 \
    --force-device-scale-factor=2 --window-size=390,844 \
    --screenshot="$(wslpath -w "$PWD")\\img\\$t.png" \
    "file:$WIN/$t.html" > /dev/null 2>&1
  echo "img/$t.png"
done
