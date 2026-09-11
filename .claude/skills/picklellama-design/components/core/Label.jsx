import React from "react";
export function Label({children,hint,required,style,...rest}) {
  return <label style={{display:"flex",flexDirection:"column",gap:4,marginBottom:6,fontSize:14,fontWeight:600,color:"var(--fg)",...style}} {...rest}>
    <span>{children}{required&&<span style={{color:"var(--danger)"}}> *</span>}</span>
    {hint&&<span style={{fontWeight:400,color:"var(--fg-muted)",fontSize:13}}>{hint}</span>}
  </label>;
}
