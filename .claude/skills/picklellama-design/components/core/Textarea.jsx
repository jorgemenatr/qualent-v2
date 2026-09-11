import React from "react";
export function Textarea({invalid=false,rows=4,style,...rest}) {
  const [focus,setFocus]=React.useState(false);
  return <textarea rows={rows} aria-invalid={invalid||undefined} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
    style={{width:"100%",padding:"10px 12px",borderRadius:"var(--radius-sm)",background:"var(--bg-elevated)",color:"var(--fg)",resize:"vertical",
      border:`1.5px solid ${invalid?"var(--danger)":focus?"var(--ring)":"var(--border)"}`,outline:"none",fontSize:15,lineHeight:1.5,fontFamily:"var(--font-sans)",
      boxShadow:focus?"var(--focus-ring)":"none",...style}} {...rest}/>;
}
