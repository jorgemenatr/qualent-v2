import React from "react";
export function Figure({value,label,tone="brand",size=40,style}) {
  return <div style={{display:"flex",flexDirection:"column",gap:4,...style}}>
    <span style={{fontFamily:"var(--font-sans)",fontWeight:700,fontSize:size,lineHeight:1,letterSpacing:"-.02em",color:tone==="brand"?"var(--fg-brand)":tone==="lime"?"var(--pl-lime-500)":"var(--fg)"}}>{value}</span>
    {label&&<span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",textTransform:"uppercase",color:"var(--fg-muted)"}}>{label}</span>}
  </div>;
}
