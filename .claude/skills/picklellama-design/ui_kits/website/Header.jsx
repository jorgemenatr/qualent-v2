import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Wordmark } from "../../components/brand/Wordmark.jsx";
export function Header({ page, onNav }) {
  const nav = [["Process","services"],["Who we work with","who"],["Proof","proof"],["Pricing","pricing"],["Learn","learn"],["About","about"]];
  return <header style={{position:"sticky",top:0,zIndex:40,background:"color-mix(in oklab, var(--bg) 88%, transparent)",backdropFilter:"blur(10px)",borderBottom:"1px solid var(--border)"}}>
    <nav style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",gap:24}}>
      <a href="#" onClick={e=>{e.preventDefault();onNav("home")}} style={{textDecoration:"none",flex:"none"}}><Wordmark height={26}/></a>
      <div style={{display:"flex",alignItems:"center",gap:"clamp(12px,2vw,28px)",minWidth:0,overflow:"hidden"}}>
        {nav.map(([l,k])=><a key={k} href="#" onClick={e=>{e.preventDefault();onNav(k)}} style={{fontSize:14,fontWeight:600,whiteSpace:"nowrap",color:page===k?"var(--fg)":"var(--fg-muted)",textDecoration:"none",paddingBottom:2,borderBottom:page===k?"2px solid var(--primary)":"2px solid transparent"}}>{l}</a>)}
        <Button size="sm" onClick={()=>onNav("talk")}>Let’s talk</Button>
        <span style={{fontSize:13,fontWeight:600,color:"var(--fg-muted)",border:"1px solid var(--border)",borderRadius:999,padding:"4px 10px"}}>EN</span>
      </div>
    </nav>
  </header>;
}
