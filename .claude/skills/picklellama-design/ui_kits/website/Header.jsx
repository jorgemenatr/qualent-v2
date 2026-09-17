import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Wordmark } from "../../components/brand/Wordmark.jsx";
export function Header({ page, onNav }) {
  const nav = [["Process","services"],["Who we work with","who"],["Proof","proof"],["Pricing","pricing"],["Learn","learn"],["The Daily Llama","gazette"],["About","about"]];
  const [narrow,setNarrow]=React.useState(()=>typeof innerWidth!=="undefined"&&innerWidth<1040); const [open,setOpen]=React.useState(false);
  React.useEffect(()=>{const h=()=>setNarrow(innerWidth<1040);addEventListener("resize",h);return()=>removeEventListener("resize",h)},[]);
  const go=k=>{setOpen(false);onNav(k)};
  const link=([l,k],big)=><a key={k} href="#" onClick={e=>{e.preventDefault();go(k)}} style={{fontSize:big?18:14,fontWeight:600,whiteSpace:"nowrap",color:page===k?"var(--fg)":"var(--fg-muted)",textDecoration:"none",paddingBottom:2,borderBottom:page===k?"2px solid var(--primary)":"2px solid transparent"}}>{l}</a>;
  return <header style={{position:"sticky",top:0,zIndex:40,background:"color-mix(in oklab, var(--bg) 88%, transparent)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--border)"}}>
    <nav style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",gap:24}}>
      <a href="#" onClick={e=>{e.preventDefault();onNav("home")}} style={{textDecoration:"none",flex:"none"}}><Wordmark height={26}/></a>
      <div style={{display:"flex",alignItems:"center",gap:"clamp(10px,1.6vw,24px)"}}>
        {!narrow&&<div style={{display:"flex",alignItems:"center",gap:"inherit"}}>{nav.map(n=>link(n))}</div>}
        <Button size="sm" onClick={()=>go("talk")} style={{flex:"none"}}>Let’s talk</Button>
        {!narrow&&<span style={{fontSize:13,fontWeight:600,color:"var(--fg-muted)",border:"1px solid var(--border)",borderRadius:999,padding:"4px 10px",flex:"none"}}>EN</span>}
        {narrow&&<Button size="sm" variant="outline" iconOnly aria-label="Menu" onClick={()=>setOpen(o=>!o)} style={{flex:"none"}}>{open?"✕":"☰"}</Button>}
      </div>
    </nav>
    {narrow&&open&&<div style={{borderTop:"1px solid var(--border)",background:"var(--bg)",padding:"16px var(--gutter) 24px",display:"grid",gap:16}}>{nav.map(n=>link(n,true))}<span style={{fontSize:13,fontWeight:600,color:"var(--fg-muted)"}}>EN · ES</span></div>}
  </header>;
}
