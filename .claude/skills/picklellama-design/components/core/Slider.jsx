import React from "react";
export function Slider({min=0,max=100,step=1,value,defaultValue=50,onChange,format=v=>v,style}) {
  const [inner,setInner]=React.useState(defaultValue);const v=value??inner;const pct=((v-min)/(max-min))*100;
  return <div style={{display:"flex",alignItems:"center",gap:12,...style}}>
    <input type="range" min={min} max={max} step={step} value={v} onChange={e=>{const n=+e.target.value;setInner(n);onChange&&onChange(n)}}
      style={{flex:1,appearance:"none",height:6,borderRadius:999,outline:"none",cursor:"pointer",
        background:`linear-gradient(90deg, var(--primary) ${pct}%, var(--border) ${pct}%)`,accentColor:"var(--primary)"}}/>
    <span style={{font:"var(--type-figure)",fontSize:15,minWidth:48,textAlign:"right"}}>{format(v)}</span>
  </div>;
}
