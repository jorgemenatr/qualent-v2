import React from "react";
import { Kicker, NewsRule } from "./Kicker.jsx";
export const LETTERS=[["Saltillo, Coah.","I have 41 tabs and one of them is called ‘FINAL_v7_USE_THIS’. There is also a ‘FINAL_v8’. Which one is final?","Neither. Ask Gary."],["Hamilton, Ont.","Our ERP go-live has been ‘next quarter’ for eleven quarters. Is this normal?","It is common. It is not normal."],["Red Deer, Alta.","My controller is the only person who knows where the file is. She is retiring in March.","Back her up. Then the file."],["Bakersfield, Calif.","The consultant says we need a Phase Two before we can define Phase One. Thoughts?","There is no Phase Two."],["Thunder Bay, Ont.","Every morning the workbook asks whether I want to save changes. I have never made changes.","It knows."]];
export function Letters({items=LETTERS,columns=2,style}) {
  return <section style={{display:"grid",gap:16,...style}}>
    <Kicker section="Letters" topic="Readers write in. He answers in seven words or fewer."/>
    <div style={{columns,columnGap:32,columnRule:"1px solid var(--border-strong)"}}>
      {items.map(([place,q,a],i)=><div key={i} style={{breakInside:"avoid",display:"grid",gap:8,paddingBottom:16,marginBottom:16,borderBottom:"1px dashed var(--border-strong)"}}>
        <p style={{font:"var(--type-news-small)",fontSize:14,lineHeight:1.5}}><b style={{textTransform:"uppercase",letterSpacing:".04em",fontSize:12}}>{place} —</b> {q}</p>
        <p style={{font:"800 16px/1.2 var(--font-news)",fontStretch:"85%",color:"var(--fg-brand)",display:"flex",gap:8}}><span style={{color:"var(--fg-faint)",fontWeight:600,fontSize:11,letterSpacing:".1em",paddingTop:3}}>THE LLAMA:</span>{a}</p>
      </div>)}
    </div>
  </section>;
}
export const CLASSIFIEDS=["WANTED: anyone who knows the password to the shared drive. Serious inquiries. Ask for Doreen.","FOR SALE: 90-slide transformation deck, lightly used, recommends second deck. OBO.","LOST: Phase One. Last seen 2019. Answers to ‘Discovery’.","FOUND: macro, 2009, author Gary. Do not touch. Do not ask.","SEEKING: fifth dispatcher to track the fourth. Must love tabs.","NOTICE: steering committee will meet Thursday to steer. Agenda TBD.","FREE: clipboard, 30 yrs service, plaque included. Some wear.","HELP WANTED: someone to open the Access database. Llama unavailable."];
export function Classifieds({items=CLASSIFIEDS,columns=3,style}) {
  return <section style={{display:"grid",gap:12,...style}}>
    <Kicker section="Classifieds"/><NewsRule/>
    <div style={{columns,columnGap:20,columnRule:"1px solid var(--border)",font:"var(--type-classified)"}}>
      {items.map((t,i)=><p key={i} style={{breakInside:"avoid",margin:"0 0 10px",paddingBottom:10,borderBottom:"1px dotted var(--border-strong)"}}><b>{t.split(":")[0]}:</b>{t.slice(t.indexOf(":")+1)}</p>)}
    </div>
  </section>;
}
