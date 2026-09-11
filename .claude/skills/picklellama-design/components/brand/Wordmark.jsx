import React from "react";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
export function Wordmark({height=28,suffix=".Studio",style}) {
  return <span style={{display:"inline-flex",alignItems:"baseline",gap:2,...style}}>
    <img src={root()+"assets/logo/wordmark.svg"} alt="PickleLlama" style={{height,width:"auto",transform:"translateY(1px)"}}/>
    {suffix&&<span style={{fontFamily:"var(--font-sans)",fontWeight:600,fontSize:height*.9,color:"var(--fg)",letterSpacing:"-.02em"}}>{suffix}</span>}
  </span>;
}
