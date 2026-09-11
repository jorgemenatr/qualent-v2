# PickleLlama Studio — Design System

PickleLlama Studio (picklellama.studio) is a small software & AI shop for mid-market companies. They solve "software-shaped blood, sweat, and spreadsheets problems" — replacing chronic spreadsheets and manual workarounds with custom automation, priced at 50% of the problem's annual cost or free. They hate the word *consultancy*.

**The brand in one line:** a friendly pickle-shaped llama in a lab coat prescribing automation. Deadpan medical/packaging parody, plain-spoken copy, one green.

## Sources
- Brand artifacts uploaded by the team (`uploads/`): `logo.svg/.png`, `logo-square.png`, `logo-text.svg/.png` (wordmark), `picklellama-text.svg` (outline wordmark), `llama-left/right/silhouette.svg` (hero cut-outs), `picklellama-logo-animated.gif`, five mug/label designs `MugDesing-01…05.jpg`.
- Live site https://www.picklellama.studio/en (copy, nav, page structure).
- Local codebase `picklellama-website/` (Next.js 15 + Tailwind 4 + shadcn/ui "new-york", lucide icons, next-intl EN/ES). Key files: `web/src/app/globals.css`, `web/src/app/[locale]/page.tsx`, `pricing/page.tsx`, `web/src/components/layout/{header,footer}.tsx`, `web/src/components/ui/*`, `web/messages/en.json`, `web/public/clients/*`. Also `design-mockups/direction-{a,b}.html` — two earlier redesign explorations (not shipped).

> The shipped site is stock shadcn (Geist, `oklch(0.55 0.15 145)` primary, generic emerald/blue/violet/amber Tailwind accents). This system deliberately re-derives the visual language from the logo and campaign artwork instead, and treats the codebase as a source for structure, copy and component inventory.

## Index
| Path | What |
|---|---|
| `styles.css` | Entry — `@import`s every token file |
| `tokens/fonts.css` | Google Fonts import (Source Sans 3, Oswald, IBM Plex Mono) |
| `tokens/colors.css` | Palette + semantic aliases, light and `.dark` |
| `tokens/typography.css` | Families, scale, weights, `--type-*` role shorthands |
| `tokens/spacing.css` | Spacing, layout, radii, shadows, motion, focus |
| `tokens/base.css` | Resets + link colours |
| `guidelines/*.html` | 15 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/core/` | Button, Input, Textarea, Label, Select, Checkbox, Switch, Slider, Tabs, Card, Badge, Avatar, Separator, Table, Dialog |
| `components/brand/` | Eyebrow, Stamp, Wordmark, Mascot, Figure |
| `components/dev-loader.js` | Dev-only fallback that transpiles the `.jsx` in-page when `_ds_bundle.js` is absent |
| `ui_kits/website/` | Click-through site, 16 views — see its README for the slug list |
| `slides/` | 6 slide templates 1280×720 |
| `templates/campaign/` | Mug-style social/print pieces |
| `assets/logo/`, `assets/mascot/`, `assets/campaigns/`, `assets/clients/`, `assets/picklellama-qr.png` | Visual assets |
| `SKILL.md` | Agent skill wrapper |

## Content fundamentals
- **Voice:** plain, dry, confident. Short declaratives. "If the math doesn't work, we don't proceed. If we can't deliver, you don't pay." Never corporate buzzwords (it's literally on the "we don't" list). Say *spreadsheet*, not *data layer*.
- **Person:** "we" for PickleLlama, "you" for the reader. Never "clients", never "solutions" as a noun without a concrete object.
- **Numbers do the talking:** "$80M+", "25-sheet, 24,000-row workbook", "17-minute diagnostic", "50% of annual cost — or free". Quantify or cut.
- **Parody register (core voice, per the team):** medical and packaging language played straight — *Diagnosis: chronic spreadsheets. Prescription: automation. Side effects may include weekends. Serving size: 1 workflow. Free-range software.* One joke per surface; the copy around it stays sober.
- **Casing:** sentence case for headings and buttons. UPPERCASE only in the condensed Oswald eyebrow/label style (DIAGNOSIS:, AMOUNT PER SERVING). Wordmark never typed — always the SVG.
- **Punctuation:** em dashes, full stops on headlines ("There's a cure."), the odd question as headline. Footnote-style asterisks for jokes ("*may vary depending on your boss").
- **Emoji:** none. Icons are line icons (lucide), not emoji.
- **Bilingual:** EN/ES via next-intl; leave room for ~20% longer Spanish strings.

## Visual foundations
- **Colour:** one hue. Pickle green `#789338` is the primary; lime `#C4D46A`/`#D8E48C` is the loud secondary (headlines, blocks); dark olive `#4B5E33` for depth. Charcoal `#3A3A38` for text (not black). Backgrounds are warm paper `#F4F5EE` with white cards — never pure grey. Llama grey `#B9BDBC` is reserved for the mascot. Coral and periwinkle come from illustration props on mug 01 and are used only for illustration and semantic states (danger/info), never as brand colour. Dark mode swaps to olive-black `#1B1E15` and makes lime the primary.
- **Type:** Source Sans 3 (humanist, stands in for the Myriad Pro used in the artwork) for everything; Oswald caps for eyebrows/labels/stamps (stands in for the condensed grotesque on mugs 04/05); IBM Plex Mono for figures. Headlines bold, tight (−0.03em), often two-tone (lime line + green line). Body 16/1.5, lede 20/1.65.
- **Layout:** 1152px container (matches `max-w-6xl`), fluid gutter, sections separated by 1px hairlines with generous 64–96px padding. Centered section heads with an eyebrow.
- **Backgrounds:** paper. One accent band per page section rhythm — lime-300 (guarantee), charcoal (final CTA), pickle green (label headers). Mascot halves as a 14% watermark in heroes. No gradients, no blurred blobs (the current site's blobs are dropped).
- **Cards:** white, 16px radius, 1px grey-300 border, no shadow. Variants: lime wash, lime loud, charcoal inverse, and the "label" frame (24px radius, 1.5–2.5px strong border, dashed inner rules) borrowed from the mug labels. **Never** the coloured-left-border card.
- **Shape language:** soft label corners (16–32px on large frames), 6px on controls, pills only for badges. Organic blobs appear only in campaign art (mug 01/02).
- **Borders & rules:** hairline `#D3D6D2`; dashed 1.5px rules inside labels; thick 3px black rule on "facts" tables.
- **Shadows:** rare. Warm-tinted (`rgb(35 40 25 / α)`), only for dialogs and floating layers.
- **Motion:** 120–200ms ease-out; buttons darken one step on hover and drop 1px on press; switches slide. No bounces in UI; the animated GIF mascot is the only "character" motion.
- **Hover:** darker fill (primary→pickle-700), underline on links, `grayscale→colour` on client logos.
- **Focus:** 3px soft green ring.
- **Imagery:** flat vector illustration with hand-drawn line quality (the mascot); watercolour landscape on the farm label. Client logos greyscale at 70%.
- **Transparency/blur:** only the sticky header (88% paper + 10px blur).

## Iconography
- The site uses **lucide-react** (stroke 2, 16–24px). Use lucide via CDN (`https://unpkg.com/lucide@latest`) in prototypes; the components here inline a few tiny stroke paths (chevron, check, arrow) in the same style.
- Campaign art uses custom line icons (calendar, clock, sparkle, pill, shield-check) in the same 2px stroke — they exist only inside the mug JPGs. **Ask for the source SVGs.**
- No icon font, no emoji, no unicode-as-icon except "→" in inline text links and "✓" inside checkboxes on print pieces.
- Client logos: `assets/clients/` (Kroger, Anaconda, CBTS, Stacking Projects, REPS, Torq, Buffalo Rail). CBTS and Stacking Projects are white-on-transparent — invert them on light backgrounds.

## Mascot usage
- **Primary mark:** `assets/logo/picklellama-mark-wordmark.svg` (character + wordmark). **Square:** `picklellama-square.png` for avatars/favicons (round corners 12%). **Wordmark:** `wordmark.svg` in header with a typeset ".Studio" suffix (Source Sans 3 600).
- **Watermark:** `llama-left.svg` bottom-left, `llama-right.svg` top-right, 12–15% opacity, hidden under 768px (matches `hero-background.tsx`).
- **Poses:** `assets/mascot/pose-standing.png` (default character), `pose-labcoat.png` (Dr. PickleLlama — prescription/lab campaigns, contact pages, closing slides), `scene-farm.png` (watercolour landscape for "free-range software" pieces). Transparent 1024×1536 PNGs; keep ≤ 600px tall on screen.
- Never recolour, outline, flip the face, or set the wordmark in a font. Minimum size 32px for the square mark.
- Clear space: one "pickle width" around the full mark.

## Intentional additions (not in the codebase)
Eyebrow, Stamp, Figure, Wordmark, Mascot — brand primitives extracted from the campaign artwork so the site can carry the mug voice. Table `facts` prop and Card `label` variant likewise. `Checkbox` is added (shadcn set in repo lacks it; the labels use checklists).

## Not built / caveats
- **Fonts are substitutions.** Original artwork used licensed faces (Myriad Pro-like + condensed grotesque); designer unavailable. Replace `tokens/fonts.css` with `@font-face` when files arrive.
- Shadcn families present in the repo but not recreated: Sheet, DropdownMenu, AlertDialog, Collapsible, Avatar-with-image edge cases. Add on request.
- UI kit covers 16 views: Home, Process + 5 step pages, Who we work with, Proof + case study, Pricing, Learn, Opinions, About, Careers, Talk. Not covered: Thunk Box tools, Compass, client projects portal, auth, legal pages.
