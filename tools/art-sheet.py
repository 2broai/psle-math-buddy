#!/usr/bin/env python3
"""Contact sheets of the drawn Life Skills pictures (20 per sheet, labelled) → tests/out/art-sheet-N.jpg"""
import os, sys
from PIL import Image, ImageDraw, ImageFont
root = os.path.join(os.path.dirname(__file__), '..')
src = os.path.join(root, 'img/life')
out = os.path.join(root, 'tests/out')
os.makedirs(out, exist_ok=True)
ids = sorted(f[:-5] for f in os.listdir(src) if f.endswith('.webp'))
if len(sys.argv) > 1:
    ids = [i for i in ids if any(i.startswith(p) for p in sys.argv[1:])]
W, H, PAD, LBL, COLS, ROWS = 300, 168, 6, 18, 5, 4
try:
    font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 13)
except Exception:
    font = ImageFont.load_default()
n = 0
for start in range(0, len(ids), COLS * ROWS):
    n += 1
    sheet = Image.new('RGB', (COLS * (W + PAD) + PAD, ROWS * (H + LBL + PAD) + PAD), 'white')
    d = ImageDraw.Draw(sheet)
    for k, i in enumerate(ids[start:start + COLS * ROWS]):
        x = PAD + (k % COLS) * (W + PAD)
        y = PAD + (k // COLS) * (H + LBL + PAD)
        im = Image.open(os.path.join(src, i + '.webp')).convert('RGB').resize((W, H))
        sheet.paste(im, (x, y))
        d.text((x + 2, y + H + 2), i, fill='black', font=font)
    sheet.save(os.path.join(out, f'art-sheet-{n}.jpg'), quality=82)
print(f'{n} sheet(s), {len(ids)} pictures → tests/out/art-sheet-*.jpg')
