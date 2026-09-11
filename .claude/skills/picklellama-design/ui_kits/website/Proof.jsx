import React from "react";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Badge } from "../../components/core/Badge.jsx";
import { Tabs } from "../../components/core/Tabs.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Figure } from "../../components/brand/Figure.jsx";
import { Section, SectionHead } from "./Section.jsx";
const studies=[["Buffalo Rail & Infrastructure Corp.","Rail infrastructure investment showcase","$80M+","Investment platform","Interactive mapping of Western Canadian energy logistics corridors.","Web platform"],["Specialty sports equipment retailer","Locker55: from Excel to intelligent inventory","25→1","Sheets replaced","AI email parsing, WhatsApp automation and barcode scanning — for $5/month.","Automation"],["Manufacturing sector","AI recruitment automation platform","3×","Recruiter capacity","WhatsApp-native screening, document verification and interview scheduling.","AI"],["Torq Energy Logistics","Interactive rail logistics platform","7","Terminals mapped","Legacy WordPress replaced with a high-performance operations platform.","Web platform"],["Enterprise software company","AI-powered HR assistant","96%","Accuracy","A Slackbot that handled 70% of HR inquiries — and knew when to stay quiet.","AI"],["National grocery retailer","Inventory reconciliation automation","9","Facilities","Eliminated quarterly shutdowns by automating reconciliation across disconnected systems.","Automation"],["National grocery retailer","Supply chain scheduling modernization","2,500","Stores","Replaced a decades-old scheduling system across 28 warehouses.","Automation"]];
export function Proof({ onNav }) {
  const [tab,setTab]=React.useState(0);const filters=["All","Automation","AI","Web platform"];
  const list=studies.filter(s=>tab===0||s[5]===filters[tab]);
  return <>
    <Section style={{borderTop:0,paddingTop:72}} narrow>
      <SectionHead eyebrow="Proof" title="Real results. Real companies." sub="Not hypotheticals. Not projections. Here’s what actually happened." />
      <Tabs items={filters.map(l=>({label:l}))} onChange={setTab} style={{maxWidth:520,margin:"0 auto"}}/>
    </Section>
    <Section style={{borderTop:0,paddingTop:0}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {list.map(([c,t,n,l,d,tag])=><Card key={t} style={{gap:14}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><Eyebrow tone="muted">{c}</Eyebrow><Badge tone={tag==="AI"?"info":tag==="Automation"?"brand":"neutral"}>{tag}</Badge></div><CardTitle>{t}</CardTitle><Figure value={n} label={l} size={36}/><CardText>{d}</CardText><a href="#" onClick={e=>{e.preventDefault();onNav("case-study")}} style={{fontSize:14,fontWeight:600,marginTop:"auto"}}>Read case study →</a></Card>)}
      </div>
    </Section>
  </>;
}
