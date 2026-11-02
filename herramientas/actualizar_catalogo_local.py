"""Regenera la copia para apertura con doble clic tras editar data/catalogo_juego.json."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalogo = json.loads((root / 'data/catalogo_juego.json').read_text(encoding='utf-8'))
contenido = json.dumps(catalogo, ensure_ascii=True, separators=(',', ':'))
(root / 'js/catalogo_local.js').write_text(
    'window.iniciarDeusAbsens(' + contenido + ');\n', encoding='utf-8'
)
