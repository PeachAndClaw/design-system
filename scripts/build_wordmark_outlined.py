#!/usr/bin/env python3
"""Build the approved Peach & Claw wordmark with all letters outlined."""
from pathlib import Path
import sys

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path(sys.argv[1])


def text_paths(font_path, text, x, baseline, size, fill, tracking=0, shear=0):
    font = TTFont(font_path)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    units = font["head"].unitsPerEm
    scale = size / units
    cursor = x
    chunks = []
    for char in text:
        glyph_name = cmap[ord(char)]
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        transform = (scale, 0, -shear * scale, -scale, cursor + shear * baseline, baseline)
        glyph.draw(TransformPen(pen, transform))
        d = pen.getCommands()
        if d:
            chunks.append(f'<path d="{d}" fill="{fill}"/>')
        cursor += glyph.width * scale + tracking
    return "".join(chunks), cursor


def monogram(stroke, accent):
    return f'''<g transform="translate(50 50) scale(.5)">
    <path d="M350 113c-38-31-84-43-132-34C126 96 76 166 76 256s50 160 142 177c48 9 94-3 132-34" fill="none" stroke="{stroke}" stroke-width="48" stroke-linecap="round"/>
    <path d="M193 404V108h76c73 0 117 39 117 103 0 65-44 105-117 105h-76" fill="none" stroke="{stroke}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M318 151l-49 122" fill="none" stroke="{accent}" stroke-width="18" stroke-linecap="round"/>
  </g>'''


def build(name, background, foreground, accent):
    fraunces = FONT_DIR / "fraunces-650.ttf"
    archivo = FONT_DIR / "archivo-700.ttf"
    peach, x = text_paths(fraunces, "Peach", 350, 228, 134, foreground, tracking=-4)
    amp, x = text_paths(fraunces, "&", x + 26, 228, 126, accent, shear=.12)
    claw, _ = text_paths(archivo, "Claw", x + 32, 228, 111, foreground, tracking=-2)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 360" role="img" aria-labelledby="title">
  <title id="title">Logotype Peach &amp; Claw — lettres vectorisées</title>
  <rect width="1600" height="360" fill="{background}"/>
  {monogram(foreground, accent)}
  {peach}{amp}{claw}
</svg>\n'''
    (ROOT / "assets" / "logo" / name).write_text(svg, encoding="utf-8")


build("wordmark-approved-dark.svg", "#0C090A", "#F6C2AE", "#EB716A")
build("wordmark-approved-light.svg", "#F6DDD2", "#0C090A", "#A8434E")
build("wordmark-final-dark.svg", "#0C090A", "#F6C2AE", "#EB716A")
build("wordmark-final-light.svg", "#F6DDD2", "#0C090A", "#A8434E")
