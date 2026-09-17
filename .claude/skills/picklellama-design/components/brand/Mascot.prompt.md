The PickleLlama character. `watermark` recreates the site hero: two half-llamas peeking from the corners at 14% opacity (parent must be position:relative; overflow:hidden). `standing` (plain), `labcoat` (Dr. PickleLlama — use for diagnostic / process / talk pages) and `farm` (watercolour free-range scene — about, values, "who we work with") are isolated PNGs on transparent.
```jsx
<section style={{position:"relative",overflow:"hidden"}}><Mascot variant="watermark"/>…</section>
<Mascot variant="labcoat" size={320}/>
```
One character per view. Never mirror the face, recolour, or crop the head.

**Motion (built in, `live` prop):** watermark halves peek in from the corners on load (700ms). Posed characters get a 3.4s breathe (farm: a gentle 1.6s walk bob + drifting clouds), a blink every ~5.5s, and pupils that follow the cursor within a few px. The eyes are DOM overlays positioned from measured coordinates in the PNGs — if you swap artwork, update `EYES`. Idle loops only; never bounce or spin the character.