import React from "react";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Mascot } from "../../components/brand/Mascot.jsx";
export function PageHero({ eyebrow, title, lede, cost, mascot, children, center=false }) {
  return <section style={{position:"relative",overflow:"hidden",padding:"clamp(56px,8vw,96px) 0 clamp(40px,6vw,64px)",borderBottom:"1px solid var(--border)"}}>
    {!mascot&&<Mascot variant="watermark"/>}
    <div style={{position:"relative",maxWidth:"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)",display:"grid",gridTemplateColumns:mascot?"minmax(0,1.4fr) minmax(0,1fr)":"1fr",gap:40,alignItems:"center"}}>
      <div style={{display:"grid",gap:20,textAlign:center?"center":"left",justifyItems:center?"center":"start",maxWidth:760,margin:center?"0 auto":0}}>
        {eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}
        <h1 style={{font:"var(--type-h1)",letterSpacing:"var(--tracking-snug)",textWrap:"balance"}}>{title}</h1>
        {lede&&<p style={{font:"var(--type-lede)",color:"var(--fg-muted)",maxWidth:640}}>{lede}</p>}
        {cost&&<p style={{display:"inline-flex",alignItems:"center",gap:10,fontWeight:600,fontSize:16,background:"var(--bg-brand-soft)",color:"var(--fg-brand-deep)",padding:"8px 14px",borderRadius:"var(--radius-sm)"}}>{cost}</p>}
        {children}
      </div>
      {mascot&&<div style={{display:"flex",justifyContent:"center"}}><Mascot variant={mascot} size={mascot==="farm"?300:340}/></div>}
    </div>
  </section>;
}
export function Prose({ children, style }) {
  return <div style={{display:"grid",gap:18,fontSize:17,lineHeight:1.65,color:"var(--fg-muted)",maxWidth:"66ch",...style}}>{children}</div>;
}
export function Strong({ children }) { return <p style={{color:"var(--fg)",fontWeight:600}}>{children}</p>; }
export function H2({ children, eyebrow }) {
  return <div style={{display:"grid",gap:10,marginBottom:28}}>{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}<h2 style={{font:"var(--type-h2)",letterSpacing:"var(--tracking-snug)",textWrap:"balance"}}>{children}</h2></div>;
}
export function H3({ children }) { return <h3 style={{font:"var(--type-h3)",fontSize:22,marginTop:12}}>{children}</h3>; }
export function CheckList({ items, tone="brand" }) {
  const ic = tone==="danger"
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" style={{flex:"none",marginTop:3}}><path d="M5 12h14"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flex:"none",marginTop:3}}><path d="M20 6 9 17l-5-5"/></svg>;
  return <ul style={{listStyle:"none",padding:0,display:"grid",gap:0}}>{items.map((it,i)=><li key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)",fontSize:16,lineHeight:1.5,color:"var(--fg-muted)"}}>{ic}<span>{it}</span></li>)}</ul>;
}
export function NumberedList({ items }) {
  return <ol style={{listStyle:"none",padding:0,display:"grid",gap:18}}>{items.map(([t,d,meta],i)=><li key={i} style={{display:"grid",gridTemplateColumns:"40px 1fr",gap:16}}>
    <span style={{width:40,height:40,borderRadius:999,background:"var(--primary)",color:"var(--primary-fg)",display:"grid",placeItems:"center",fontFamily:"var(--font-condensed)",fontWeight:600,fontSize:17}}>{String(i+1).padStart(2,"0")}</span>
    <div style={{display:"grid",gap:4}}><div style={{display:"flex",gap:12,alignItems:"baseline",flexWrap:"wrap"}}><h3 style={{font:"var(--type-h3)"}}>{t}</h3>{meta&&<span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",textTransform:"uppercase",color:"var(--fg-faint)"}}>{meta}</span>}</div><p style={{color:"var(--fg-muted)",lineHeight:1.55}}>{d}</p></div></li>)}</ol>;
}
export function Callout({ eyebrow, children, tone="soft" }) {
  return <div style={{background:tone==="soft"?"var(--bg-brand-soft)":"var(--bg-elevated)",border:tone==="label"?"1.5px solid var(--border-strong)":"1px solid transparent",borderRadius:tone==="label"?"var(--radius-xl)":"var(--radius-lg)",padding:28,display:"grid",gap:12}}>{eyebrow&&<Eyebrow>{eyebrow}</Eyebrow>}{children}</div>;
}
export function CTA({ title, sub, button, onNav, note, tone="inverse" }) {
  const inv=tone==="inverse";
  return <section style={{background:inv?"var(--bg-inverse)":"transparent",borderTop:"1px solid var(--border)",padding:"var(--section-y) 0"}}>
    <div style={{maxWidth:600,margin:"0 auto",padding:"0 var(--gutter)",textAlign:"center",display:"grid",gap:16,justifyItems:"center",color:inv?"#fff":"inherit"}}>
      <h2 style={{font:"var(--type-h2)",fontSize:34,letterSpacing:"var(--tracking-snug)",textWrap:"balance"}}>{title}</h2>
      {sub&&<p style={{fontSize:17,lineHeight:1.6,color:inv?"var(--pl-grey-300)":"var(--fg-muted)"}}>{sub}</p>}
      <button onClick={()=>onNav("talk")} style={{height:48,padding:"0 24px",borderRadius:"var(--radius-sm)",border:0,cursor:"pointer",fontWeight:600,fontSize:17,display:"inline-flex",alignItems:"center",gap:8,background:inv?"var(--pl-lime-500)":"var(--primary)",color:inv?"var(--pl-pickle-900)":"var(--primary-fg)"}}>{button||"Book your diagnostic"} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
      {note&&<p style={{fontSize:14,color:inv?"var(--pl-grey-500)":"var(--fg-faint)"}}>{note}</p>}
    </div>
  </section>;
}
