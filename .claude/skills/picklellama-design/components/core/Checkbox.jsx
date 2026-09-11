import React from "react";
export function Checkbox({checked,defaultChecked=false,onChange,label,disabled,style}) {
  const [inner,setInner]=React.useState(defaultChecked);const on=checked??inner;
  const toggle=()=>{if(disabled)return;setInner(!on);onChange&&onChange(!on)};
  return <label style={{display:"inline-flex",alignItems:"center",gap:10,cursor:disabled?"default":"pointer",opacity:disabled?.5:1,fontSize:15,...style}}>
    <span role="checkbox" aria-checked={on} tabIndex={0} onClick={toggle} onKeyDown={e=>e.key===" "&&toggle()}
      style={{width:20,height:20,borderRadius:4,border:`2px solid ${on?"var(--primary)":"var(--border-strong)"}`,background:on?"var(--primary)":"var(--bg-elevated)",display:"grid",placeItems:"center",transition:"all var(--dur-fast)"}}>
      {on&&<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--primary-fg)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
    </span>{label}</label>;
}
