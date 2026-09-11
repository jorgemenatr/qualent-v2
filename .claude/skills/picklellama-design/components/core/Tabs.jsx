import React from "react";
export function Tabs({items=[],defaultIndex=0,onChange,style}) {
  const [i,setI]=React.useState(defaultIndex);
  return <div style={style}>
    <div role="tablist" style={{display:"flex",gap:4,borderBottom:"1.5px solid var(--border)"}}>
      {items.map((it,k)=><button key={k} role="tab" aria-selected={i===k} onClick={()=>{setI(k);onChange&&onChange(k)}}
        style={{background:"none",border:0,padding:"10px 14px",marginBottom:-1.5,cursor:"pointer",fontSize:15,fontWeight:600,color:i===k?"var(--fg-brand)":"var(--fg-muted)",
          borderBottom:`2.5px solid ${i===k?"var(--primary)":"transparent"}`,transition:"color var(--dur-fast)"}}>{it.label}</button>)}
    </div>
    {items[i]&&items[i].content&&<div role="tabpanel" style={{paddingTop:16}}>{items[i].content}</div>}
  </div>;
}
