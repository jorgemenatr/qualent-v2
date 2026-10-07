# Qualent — landing

Sitio estático (HTML + CSS + JS, sin build). Para verlo en local:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

- `index.html`: estructura y textos en español.
- `styles.css`: estilos; los colores de marca están como variables en `:root`.
- `main.js`: animaciones (chat, contadores, scroll) y traducción al inglés (objeto `EN`).
- `assets/`: logo (color y blanco) y favicon.

Tipografías: Bricolage Grotesque (títulos), Figtree (texto) y Caveat (notas a mano), vía Google Fonts.

## Propuestas

- `assets/tokens.css`: tokens de marca (colores, tipografías, radios) compartidos por la landing y las propuestas.
- `es/qualent/la-anita/`: propuesta para La Anita (noindex). Sin menú ni footer globales.
  - Número de WhatsApp: constante `WHATSAPP_NUMBER` en `page.js`.
  - Conversación demo: lista `<ol data-chat>` en `index.html` (`msg in` = Qualent, `msg out` = candidato).
  - Sección "Prueba": oculta; se activa con `SHOW_PROOF` en `page.js`.
