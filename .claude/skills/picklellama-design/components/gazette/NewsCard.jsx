import React from "react";
import { Kicker, Dateline } from "./Kicker.jsx";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
export function NewsCard({story,size="md",onClick,style}) {
  const {section,topic,title,place,date,dek,art,tone}=story;
  const h={lg:"var(--type-news-h1)",md:"var(--type-news-h2)",sm:"var(--type-news-h3)"}[size];
  return <article onClick={onClick} style={{display:"grid",gap:12,cursor:onClick?"pointer":"default",alignContent:"start",...style}}>
    {art&&<div style={{aspectRatio:size==="lg"?"16/9":"4/3",background:"var(--bg-brand-soft)",overflow:"hidden",display:"grid",placeItems:"center",position:"relative"}}><img src={root()+"assets/mascot/"+art} alt="" style={{height:"88%",width:"auto",objectFit:"contain",filter:tone==="archival"?"grayscale(1) contrast(1.1) sepia(.25)":"none"}}/>{tone==="archival"&&<span style={{position:"absolute",inset:0,background:"repeating-radial-gradient(circle at 30% 20%, rgba(0,0,0,.08) 0 1px, transparent 1px 3px)",mixBlendMode:"multiply"}}/>}</div>}
    <Kicker section={section} topic={topic} tone={tone==="breaking"?"breaking":undefined}/>
    <h3 style={{font:h,fontStretch:"var(--news-stretch-head)",letterSpacing:"-.01em",textWrap:"balance",color:"var(--news-ink)"}}>{title}</h3>
    {dek&&<p style={{font:"var(--type-news-body)",color:"var(--fg-muted)"}}>{dek}</p>}
    <Dateline place={place} time={date}/>
  </article>;
}
