import React from "react";
export function Select({options=[],placeholder,invalid=false,style,...rest}) {
  const [focus,setFocus]=React.useState(false);
  return <div style={{position:"relative",width:"100%"}}>
    <select onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} defaultValue={placeholder?"":undefined}
      style={{appearance:"none",height:40,width:"100%",padding:"0 36px 0 12px",borderRadius:"var(--radius-sm)",background:"var(--bg-elevated)",color:"var(--fg)",
        border:`1.5px solid ${invalid?"var(--danger)":focus?"var(--ring)":"var(--border)"}`,outline:"none",fontSize:15,fontFamily:"var(--font-sans)",boxShadow:focus?"var(--focus-ring)":"none",...style}} {...rest}>
      {placeholder&&<option value="" disabled>{placeholder}</option>}
      {options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position:"absolute",right:12,top:12,pointerEvents:"none",color:"var(--fg-muted)"}}><path d="m6 9 6 6 6-6"/></svg>
  </div>;
}
