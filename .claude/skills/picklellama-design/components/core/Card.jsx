import React from "react";
export function Card({variant="default",padding=24,children,style,...rest}) {
  const v={default:{background:"var(--bg-elevated)",border:"1px solid var(--border)"},
    soft:{background:"var(--bg-brand-soft)",border:"1px solid transparent"},
    loud:{background:"var(--bg-brand-loud)",border:"1px solid transparent",color:"var(--fg-on-lime)"},
    inverse:{background:"var(--bg-inverse)",color:"var(--fg-inverse)",border:"1px solid transparent"},
    label:{background:"var(--bg-elevated)",border:"1.5px solid var(--border-strong)",borderRadius:"var(--radius-xl)"}}[variant];
  return <div data-variant={variant} style={{borderRadius:"var(--radius-lg)",padding,display:"flex",flexDirection:"column",gap:12,...v,...style}} {...rest}>{children}</div>;
}
export function CardTitle({children,style}){return <h3 style={{font:"var(--type-h3)",...style}}>{children}</h3>}
export function CardText({children,style}){return <p style={{font:"var(--type-small)",fontSize:15,color:"var(--fg-muted)",...style}}>{children}</p>}
