# Design directions for picklellama.studio

Two competing redesigns, built as working prototypes rather than pictures.
Open `index.html`, or either file directly.

| File | Direction |
|---|---|
| `direction-a-worksheet.html` | **A — Worksheet.** Quiet, precise, document-like. Hero is a live cost worksheet. |
| `direction-b-yard.html` | **B — Yard.** Industrial wayfinding: signage type, full-bleed colour bands. |

Each file contains both a Home and a Proof page (toggle bottom-right) and a real
EN/ES switch in the header. Copy and case-study figures are the real ones from
`web/messages/*.json` and `web/content/case-studies/`.

Client logos are placeholder wordmarks; the real SVGs live in `web/public/clients/`.

Nothing here is wired into the Next.js app — these are standalone files for review.
