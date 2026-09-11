import React from "react";
import { Button } from "./Button.jsx";
export function Dialog({open,onClose,title,description,children,actions,inline=false}) {
  if(!open) return null;
  const panel=<div role="dialog" aria-modal="true" style={{width:"min(480px,92vw)",background:"var(--bg-elevated)",borderRadius:"var(--radius-lg)",padding:28,boxShadow:"var(--shadow-lg)",display:"flex",flexDirection:"column",gap:12,border:"1px solid var(--border)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
      <h2 style={{font:"var(--type-h2)",fontSize:22}}>{title}</h2>
      <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Close">✕</Button>
    </div>
    {description&&<p style={{color:"var(--fg-muted)",fontSize:15,lineHeight:1.5}}>{description}</p>}
    {children}
    {actions&&<div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:8}}>{actions}</div>}
  </div>;
  if(inline) return panel;
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgb(35 40 25 / .45)",display:"grid",placeItems:"center",zIndex:50}}><div onClick={e=>e.stopPropagation()}>{panel}</div></div>;
}
