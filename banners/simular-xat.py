# Simula o que o xat desenha por cima do banner (avatar à esquerda e as etiquetas de nome e status), só para avaliar
# o desenho. As posições vêm de um print do perfil. Uso: python3 simular-xat.py saida/albert-10-cartao-postal.png avatar.jpg Albert
import sys
from PIL import Image, ImageDraw, ImageFont

entrada, avatar, nome = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else "Albert"
b = Image.open(entrada).convert("RGBA")
av = Image.open(avatar).convert("RGB")
lado = min(av.size)
av = av.crop((0, 60, lado, 60 + lado)).resize((88, 88))
b.paste(av, (0, 6))
ov = Image.new("RGBA", b.size, (0, 0, 0, 0))
d = ImageDraw.Draw(ov)
fonte = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
f, g = ImageFont.truetype(fonte, 13), ImageFont.truetype(fonte, 11)
d.rounded_rectangle((104, 17, 104 + 8 + int(d.textlength(nome, font=f)) + 8, 39), 3, fill=(60, 60, 60, 170))
d.text((111, 19), nome, font=f, fill="white")
d.rounded_rectangle((104, 46, 198, 64), 3, fill=(60, 60, 60, 170))
d.text((110, 48), "Online Member", font=g, fill="white")
b.alpha_composite(ov)
b.convert("RGB").resize((1140, 300), Image.NEAREST).save(entrada.replace(".png", "-simulacao-xat.png"))
