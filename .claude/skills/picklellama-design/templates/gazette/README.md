# The Daily Llama — templates

Newspaper-parody layer for the Gazette content program (brief v0.2). Type: Archivo 900 @80% width for the nameplate, 800 @75% for heads, 400 body; Oswald for kickers/datelines; IBM Plex Mono for classifieds and "documents". Paper is `--news-paper` (#F7F5EC), ink is `--news-ink` (#231F20 — true near-black, not the site charcoal). Every tile carries the masthead strip and ends in a black DisclaimerBand whose right side is always "Ask your boss about PickleLlama" — his only permitted CTA, always fine print.

**Social (1080² unless noted):** news card (+1080×1350, +LinkedIn 1200×627), pharma ad (+portrait), Farms PSA (+portrait), political attack ad, injury-lawyer ad, letters, classifieds, archival photo, investigation carousel (4 tiles).
**Email:** `email-newsletter.html` — 600px single column, table layout, Archivo with Arial fallbacks, dark-mode overrides, alt text on every image. Structure per brief §7.3: lead → ad break → letter → real column → fine-print footer.

**Character use:** only the three existing poses are available (standing, lab coat, farm scene). Templates have slots for the brief's six-pose library (monitor, chewing, walking away, spit, truck) — swap the `<img>` when art arrives. Villains may be drawn (per the team) but here appear only as objects: the spreadsheet grid, the redacted SOW, the deck.