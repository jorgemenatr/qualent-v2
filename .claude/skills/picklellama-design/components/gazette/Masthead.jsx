import React from "react";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
export function Masthead({issue="Vol. I, No. 3",date="Tuesday, 15 September 2026",price="Price: one spreadsheet",tagline="All the news he declined to comment on",compact=false,onClick,style}) {
  const ed={display:"flex",justifyContent:"space-between",gap:16,font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".1em",color:"var(--fg-muted)"};
  if(compact) return <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,cursor:onClick?"pointer":"default",...style}}><span style={{font:"var(--type-nameplate)",fontSize:28,fontStretch:"var(--news-stretch-plate)",textTransform:"uppercase",color:"var(--news-ink)"}}>The Daily Llama</span><span style={{font:"var(--type-kicker)",textTransform:"uppercase",letterSpacing:".12em",color:"var(--fg-muted)"}}>by</span><img src={root()+"assets/logo/wordmark.svg"} alt="PickleLlama" style={{height:16}}/></div>;
  return <header style={{display:"grid",gap:10,...style}}>
    <div style={ed}><span>{issue}</span><span>{date}</span><span>{price}</span></div>
    <div style={{height:4,background:"var(--news-rule)"}}/>
    <h1 onClick={onClick} style={{font:"var(--type-nameplate)",fontStretch:"var(--news-stretch-plate)",textTransform:"uppercase",textAlign:"center",color:"var(--news-ink)",cursor:onClick?"pointer":"default",margin:"6px 0"}}>The Daily Llama</h1>
    <div style={{...ed,justifyContent:"center",gap:24}}><span>Est. 2023, reprinted under protest</span><span>·</span><span>{tagline}</span></div>
    <div style={{height:1,background:"var(--news-rule)"}}/>
  </header>;
}
