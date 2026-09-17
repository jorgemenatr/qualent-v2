import React from "react";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
export function Section({ tone="default", children, style, narrow=false, sectionRef }) {
  const bg={default:"transparent",subtle:"var(--bg-subtle)",soft:"var(--bg-brand-soft)",loud:"var(--bg-brand-loud)",inverse:"var(--bg-inverse)"}[tone];
  return <section ref={sectionRef} style={{background:bg,color:tone==="inverse"?"var(--fg-inverse)":tone==="loud"?"var(--fg-on-lime)":"inherit",borderTop:"1px solid var(--border)",padding:"var(--section-y) 0",...style}}>
    <div style={{maxWidth:narrow?"var(--container-sm)":"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)"}}>{children}</div>
  </section>;
}
export function SectionHead({ eyebrow, title, sub, center=true, inverse=false }) {
  return <div style={{maxWidth:640,margin:center?"0 auto 40px":"0 0 40px",textAlign:center?"center":"left",display:"grid",gap:12}}>
    {eyebrow&&<Eyebrow tone={inverse?"inverse":"brand"}>{eyebrow}</Eyebrow>}
    <h2 style={{font:"var(--type-h2)",letterSpacing:"var(--tracking-snug)",textWrap:"balance"}}>{title}</h2>
    {sub&&<p style={{font:"var(--type-lede)",color:inverse?"var(--pl-grey-300)":"var(--fg-muted)"}}>{sub}</p>}
  </div>;
}
