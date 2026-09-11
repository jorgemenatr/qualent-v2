import React from "react";
export function Stamp({children,tone="danger",tilt=-3,style}) {
  const c={danger:"var(--danger)",brand:"var(--fg-brand)",ink:"var(--fg)"}[tone];
  return <span style={{display:"inline-block",font:"var(--type-stamp)",fontSize:18,textTransform:"uppercase",letterSpacing:".04em",color:c,border:`2px solid ${c}`,padding:"4px 10px",borderRadius:3,transform:`rotate(${tilt}deg)`,...style}}>{children}</span>;
}
