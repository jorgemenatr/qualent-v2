import React from "react";
export function Eyebrow({children,tone="brand",style}) {
  return <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",textTransform:"uppercase",color:tone==="brand"?"var(--fg-brand)":tone==="inverse"?"var(--fg-inverse)":"var(--fg-muted)",display:"inline-block",...style}}>{children}</span>;
}
