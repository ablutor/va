#!/usr/bin/env python3
"""Gera as AMOSTRAS dos banners para o site: versão reduzida (285×75) com uma marca d'água discreta, para ninguém usar a imagem sem comprar.

Os banners originais (380×100, sem marca) ficam em banners/saida/<modelo>/ e NÃO vão para o site: o autor envia manualmente.
Uso: python3 gerar-amostras.py [pasta do site, padrão ../../../xatspace-site]
Lê saida/NN-modelo/rafael-NN-modelo[-cor].png (avatar quadrado) e saida/10-cartao-postal/marina-10-cartao-postal.png (Cartão-postal);
grava <site>/public/img/banners/NN-modelo/<cor>.jpg (a cor original se chama "original").
"""
import os, re, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.join(AQUI, "../../../xatspace-site"))
DESTINO = os.path.join(SITE, "public/img/banners")
LARGURA, ALTURA = 285, 75
TEXTO = "XATSPACES"
FONTE = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def marca_dagua(img):
    """Uma única marca, discreta, no centro e levemente inclinada (claro com contorno escuro: aparece em qualquer fundo). Fica sobre
    o desenho do banner, então não dá para cortá-la sem estragar a imagem; e a miniatura pequena já impede o uso real."""
    escala = 4  # desenha grande e reduz, para a letra pequena sair suave
    w, h = img.size[0] * escala, img.size[1] * escala
    lado = int((w * w + h * h) ** 0.5) + 40
    camada = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    fonte = ImageFont.truetype(FONTE, 11 * escala)
    larg = int(d.textlength(TEXTO, font=fonte))
    pos = ((lado - larg) // 2, (lado - 11 * escala) // 2)
    d.text(pos, TEXTO, font=fonte, fill=(0, 0, 0, 70), stroke_width=int(1.4 * escala), stroke_fill=(0, 0, 0, 70))
    d.text(pos, TEXTO, font=fonte, fill=(255, 255, 255, 120))
    camada = camada.rotate(12, resample=Image.BICUBIC)
    esq, topo = (lado - w) // 2, (lado - h) // 2
    camada = camada.crop((esq, topo, esq + w, topo + h)).resize(img.size, Image.LANCZOS)
    base = img.convert("RGBA")
    base.alpha_composite(camada)
    return base.convert("RGB")


def amostra(origem, destino):
    img = Image.open(origem).convert("RGB").resize((LARGURA, ALTURA), Image.LANCZOS)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    marca_dagua(img).save(destino, "JPEG", quality=80, optimize=True, progressive=True)


def modelos():
    """As cores de cada modelo, de _cores.txt (NN-modelo cor cor ...)."""
    linhas = [l.split() for l in open(os.path.join(AQUI, "_cores.txt"), encoding="utf-8") if l.strip() and not l.startswith("#")]
    return {l[0]: l[1:] for l in linhas}


if __name__ == "__main__":
    saida = os.path.join(AQUI, "saida")
    cores = modelos()
    n = 0
    # uma pasta por modelo em saida/; o nome do arquivo é rafael-NN-modelo[-cor].png
    for modelo in sorted(cores):
        pasta = os.path.join(saida, modelo)
        for f in sorted(os.listdir(pasta)) if os.path.isdir(pasta) else []:
            if not f.startswith("rafael-" + modelo) or not f.endswith(".png") or f.endswith("-redonda.png") or "previa" in f:
                continue
            cor = f[len("rafael-" + modelo):-len(".png")].lstrip("-") or "original"
            # Modelo sem a cor original (o Livro aberto): o banner sem cor sai igual ao da primeira cor e não vira amostra
            if cor not in cores[modelo]:
                continue
            amostra(os.path.join(pasta, f), os.path.join(DESTINO, modelo, cor + ".jpg"))
            n += 1
    # Cartão-postal: um exemplo só (a Marina), vale para todas as cores
    amostra(os.path.join(saida, "10-cartao-postal", "marina-10-cartao-postal.png"), os.path.join(DESTINO, "10-cartao-postal", "original.jpg"))
    print(n + 1, "amostras em", DESTINO)
