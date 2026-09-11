The PickleLlama character. `watermark` recreates the site hero: two half-llamas peeking from the corners at 14% opacity (parent must be position:relative; overflow:hidden). `standing` (plain), `labcoat` (Dr. PickleLlama — use for diagnostic / process / talk pages) and `farm` (watercolour free-range scene — about, values, "who we work with") are isolated PNGs on transparent.
```jsx
<section style={{position:"relative",overflow:"hidden"}}><Mascot variant="watermark"/>…</section>
<Mascot variant="labcoat" size={320}/>
```
One character per view. Never mirror the face, recolour, or crop the head.