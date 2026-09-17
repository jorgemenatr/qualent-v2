import React from "react";
export function Stamp({children,tone="danger",tilt=-3,live=true,style}) {
  const c={danger:"var(--danger)",brand:"var(--fg-brand)",ink:"var(--fg)"}[tone];
  const ref=React.useRef(null); const [on,setOn]=React.useState(!live);
  React.useEffect(()=>{if(!live)return;const el=ref.current;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.6});io.observe(el);return()=>io.disconnect()},[]);
  return <span ref={ref} style={{display:"inline-block",font:"var(--type-stamp)",fontSize:18,textTransform:"uppercase",letterSpacing:".04em",color:c,border:`2px solid ${c}`,padding:"4px 10px",borderRadius:3,
    transform:`rotate(${tilt}deg)`,opacity:on?1:0,animation:on&&live?"pl-stamp 420ms cubic-bezier(.2,.9,.3,1.2) both":"none",...style}}>{children}</span>;
}
