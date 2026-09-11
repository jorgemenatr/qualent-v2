import React from "react";
export function Switch({checked,defaultChecked=false,onChange,label,disabled,style}) {
  const [inner,setInner]=React.useState(defaultChecked);const on=checked??inner;
  const toggle=()=>{if(disabled)return;setInner(!on);onChange&&onChange(!on)};
  return <label style={{display:"inline-flex",alignItems:"center",gap:10,cursor:disabled?"default":"pointer",opacity:disabled?.5:1,fontSize:15,...style}}>
    <span role="switch" aria-checked={on} tabIndex={0} onClick={toggle} onKeyDown={e=>e.key===" "&&toggle()}
      style={{width:40,height:22,borderRadius:999,background:on?"var(--primary)":"var(--border-strong)",position:"relative",transition:"background var(--dur-base)"}}>
      <span style={{position:"absolute",top:2,left:on?20:2,width:18,height:18,borderRadius:999,background:"#fff",boxShadow:"var(--shadow-xs)",transition:"left var(--dur-base) var(--ease-out)"}}/>
    </span>{label}</label>;
}
