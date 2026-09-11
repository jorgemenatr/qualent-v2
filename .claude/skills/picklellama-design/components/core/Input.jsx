import React from "react";
export function Input({invalid=false,style,type="text",...rest}) {
  const [focus,setFocus]=React.useState(false);
  return <input type={type} aria-invalid={invalid||undefined} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
    style={{height:40,width:"100%",padding:"0 12px",borderRadius:"var(--radius-sm)",background:"var(--bg-elevated)",color:"var(--fg)",
      border:`1.5px solid ${invalid?"var(--danger)":focus?"var(--ring)":"var(--border)"}`,outline:"none",fontSize:15,fontFamily:"var(--font-sans)",
      boxShadow:focus?"var(--focus-ring)":"none",transition:"border-color var(--dur-fast), box-shadow var(--dur-fast)",...style}} {...rest}/>;
}
