Motion primitives. `Reveal` = scroll-into-view entrance (rise/fade/stamp, once). `TwoTone` = the brand headline: lime line fades in, green line rises 200ms later. `useCountUp` = tally figures. `Typed` = Oswald-caps typewriter for "DIAGNOSIS:" reveals.
Rules: UI ≤ 480ms ease-out; idle loops 3–6s; one mascot animation per page; never bounce UI (only the llama). All keyframes live in tokens/base.css and are killed by prefers-reduced-motion.
```jsx
<Reveal delay={120}><Card>…</Card></Reveal>
<TwoTone lines={["Spreadsheets?","There’s a cure."]}/>
```