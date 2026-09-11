import React from "react";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Badge } from "../../components/core/Badge.jsx";
import { Button } from "../../components/core/Button.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Figure } from "../../components/brand/Figure.jsx";
import { Section, SectionHead } from "./Section.jsx";
import { PageHero, Prose, Strong, H2, CheckList, Callout, CTA } from "./Prose.jsx";
export function Learn({ onNav }) { return <>
  <PageHero eyebrow="Learn" title="Research, tools and honest opinions." lede="Things we wrote down so you don’t have to sit through a meeting." center/>
  <Section><H2 eyebrow="Reports">Research reports</H2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
    {[["The build-vs-buy math for mid-market companies","Why a $200k custom build loses to a $1,500/month tool 9 times out of 10 — and the tenth time.","Sep 2026","12 min"],["What a $500k/year spreadsheet looks like","Five patterns that hide six-figure costs in ordinary workbooks.","Aug 2026","8 min"],["Prototyping with AI: from caviar to canned tuna","How code getting cheap changes what a first version should be.","Jul 2026","10 min"]].map(([t,d,date,rt])=><Card key={t} style={{gap:14}}><Badge tone="neutral">Report</Badge><CardTitle>{t}</CardTitle><CardText>{d}</CardText><div style={{display:"flex",gap:16,fontSize:13,color:"var(--fg-faint)",marginTop:"auto"}}><span>{date}</span><span>{rt} read</span></div><a href="#" style={{fontSize:14,fontWeight:600}}>Read the report →</a></Card>)}</div></Section>
  <Section tone="subtle"><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
    <Card variant="label" padding={32} style={{gap:14}}><Eyebrow>Tool</Eyebrow><CardTitle style={{fontSize:24}}>Thunk Box</CardTitle><CardText style={{fontSize:16}}>Ask a question about your business problem and get a written first opinion — no call required. Or use the worksheet to put a number on what a problem costs you.</CardText><div style={{display:"flex",gap:10}}><Button variant="secondary" onClick={()=>onNav("pricing")}>Open the worksheet</Button><Button variant="ghost">Ask a question</Button></div></Card>
    <Card variant="inverse" padding={32} style={{gap:14}}><Eyebrow tone="inverse" style={{color:"var(--pl-lime-500)"}}>Opinions</Eyebrow><CardTitle style={{fontSize:24,color:"#fff"}}>Controversial opinions</CardTitle><CardText style={{fontSize:16,color:"var(--pl-grey-300)"}}>Most AI projects shouldn’t be built. Meetings are where work goes to die. Enterprise software is usually terrible.</CardText><div><Button variant="secondary" onClick={()=>onNav("opinions")}>Read all five</Button></div></Card>
  </div></Section>
  <CTA title="Have a specific problem?" sub="17 minutes to identify your top problems and see if the math works." onNav={onNav}/>
</>; }
export function CaseStudy({ onNav }) { return <>
  <section style={{borderBottom:"1px solid var(--border)",padding:"clamp(56px,8vw,96px) 0 48px"}}><div style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)",display:"grid",gap:24}}>
    <a href="#" onClick={e=>{e.preventDefault();onNav("proof")}} style={{fontSize:14,fontWeight:600}}>← All case studies</a>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.3fr) minmax(0,1fr)",gap:48,alignItems:"end"}}>
      <div style={{display:"grid",gap:16}}><div style={{display:"flex",gap:8}}><Badge>Automation</Badge><Badge tone="neutral">Retail</Badge></div><Eyebrow tone="muted">Specialty sports equipment retailer</Eyebrow><h1 style={{font:"var(--type-h1)",letterSpacing:"var(--tracking-snug)",textWrap:"balance"}}>Locker55: from Excel to intelligent inventory.</h1><p style={{font:"var(--type-lede)",color:"var(--fg-muted)"}}>A 25-sheet, 24,000-row workbook became a full-stack inventory system with AI email parsing, WhatsApp automation and barcode scanning — for $5/month in hosting.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,background:"var(--bg-brand-loud)",borderRadius:"var(--radius-xl)",padding:28}}><Figure value="25→1" label="Sheets → system" tone="ink" size={40}/><Figure value="10–15 min" label="Saved per order" tone="ink" size={40}/><Figure value="24k" label="Rows migrated" tone="ink" size={40}/><Figure value="$5/mo" label="Hosting cost" tone="ink" size={40}/></div>
    </div></div></section>
  <Section narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2 eyebrow="Diagnosis">The problem</H2><Prose><p>Inventory, orders and supplier emails lived in one workbook that only one person understood. Every order meant retyping emails into cells; every stock count meant a weekend.</p></Prose></div>
    <div><H2 eyebrow="Prescription">What we built</H2><CheckList items={["AI parsing of supplier order emails straight into inventory","WhatsApp bot for stock checks from the shop floor","Barcode scanning on any phone","One dashboard replacing 25 sheets"]}/></div></div></Section>
  <Section tone="subtle" narrow><Callout tone="label" eyebrow="Side effects"><Prose style={{fontSize:16}}><p>10–15 minutes saved per order. Stock counts moved from weekends to a 20-minute Friday walk. The person who “owned the spreadsheet” now owns purchasing strategy instead.</p><Strong>Hosting bill: $5 a month.</Strong></Prose></Callout>
    <div style={{display:"flex",gap:8,marginTop:24,flexWrap:"wrap"}}>{["Next.js","Postgres","Claude","WhatsApp Business API","Vercel"].map(t=><Badge key={t} tone="neutral">{t}</Badge>)}</div></Section>
  <CTA title="Want similar results?" sub="Let’s discuss your challenges and explore what’s possible for your business." onNav={onNav}/>
</>; }
