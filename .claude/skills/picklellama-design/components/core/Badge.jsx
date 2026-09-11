import React from "react";
export function Badge({tone="brand",variant="soft",children,style}) {
  const t={brand:["var(--success-soft)","var(--fg-brand-deep)","var(--primary)"],neutral:["var(--bg-subtle)","var(--fg-muted)","var(--fg-muted)"],danger:["var(--danger-soft)","var(--danger)","var(--danger)"],info:["var(--info-soft)","var(--info)","var(--info)"],lime:["var(--bg-brand-loud)","var(--fg-on-lime)","var(--pl-lime-500)"]}[tone];
  const solid=variant==="solid",stamp=variant==="stamp";
  return <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:stamp?"4px 8px":"3px 10px",borderRadius:stamp?3:999,
    fontFamily:stamp?"var(--font-condensed)":"var(--font-sans)",fontSize:stamp?13:12,fontWeight:600,textTransform:stamp?"uppercase":"none",letterSpacing:stamp?".06em":0,
    background:solid?t[2]:stamp?"transparent":t[0],color:solid?"#fff":t[1],border:stamp?`1.5px solid ${t[2]}`:"none",transform:stamp?"rotate(-2deg)":"none",...style}}>{children}</span>;
}
