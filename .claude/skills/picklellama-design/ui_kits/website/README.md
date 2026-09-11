# Website UI kit — picklellama.studio

Click-through recreation of the marketing site's core views, rebuilt on the new brand tokens.

**Source of truth:** `picklellama-website/web/src/app/[locale]/page.tsx`, `pricing/page.tsx`, `components/layout/{header,footer}.tsx`, copy from `web/messages/en.json` and the live site.

**What changed vs. the live site (intentionally):** the current build is stock shadcn (Geist, generic Tailwind emerald/blue/violet/amber accents, coloured-left-border cards, blurred green blobs). This kit keeps the same page structure and copy but applies the brand as defined by the logo and mug/label campaigns: paper background, pickle/lime greens only, Source Sans 3 + Oswald eyebrows, flat cards, mascot watermark hero, parody-packaging "label" card on Pricing.

Screens: `Home`, `Proof` + `CaseStudy`, `Pricing` (live worksheet), `Talk` (form → confirmation), `Process` + five step pages (`Steps.jsx`: FirstMeeting, Research, ProblemId, Implementation, Partnership — shared `StepRail`), `Who`, `About`, `Careers`, `Opinions`, `Learn`. Chrome: `Header`, `Footer`, `Section`; page primitives in `Prose.jsx` (PageHero with mascot pose, Prose, H2/H3, CheckList, NumberedList, Callout, CTA).

Mascot poses: lab coat on process/diagnostic pages, farm scene on partnership/who-we-work-with, plain standing on About. One character per page.

Navigate with `#slug` (home, services, first-meeting, research, problem-identification, implementation, partnership, who, proof, case-study, pricing, learn, opinions, about, careers, talk).
