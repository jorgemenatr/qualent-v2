import React from "react";
export function Avatar({name="",src,size=36,style}) {
  const initials=name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  return <span style={{width:size,height:size,borderRadius:999,overflow:"hidden",display:"grid",placeItems:"center",background:"var(--primary)",color:"var(--primary-fg)",fontSize:size*.38,fontWeight:700,flex:"none",...style}}>
    {src?<img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:initials}</span>;
}
