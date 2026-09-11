import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Table } from "../../components/core/Table.jsx";
import { Slider } from "../../components/core/Slider.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Figure } from "../../components/brand/Figure.jsx";
import { Stamp } from "../../components/brand/Stamp.jsx";
import { Section, SectionHead } from "./Section.jsx";
export function Pricing({ onNav }) {
  const [hrs,setHrs]=React.useState(15);const [rate,setRate]=React.useState(45);
  const annual=hrs*52*rate; const fmt=n=>"$"+Math.round(n).toLocaleString();
  return <>
    <Section style={{borderTop:0,paddingTop:72}} narrow>
      <SectionHead eyebrow="Pricing" title="You pay 50% of what the problem costs you every year." sub="If we can’t deliver, you don’t pay. If the math doesn’t work, we won’t start." />
      <Card variant="label" padding={0} style={{overflow:"hidden",maxWidth:760,margin:"0 auto"}}>
        <div style={{background:"var(--bg-brand)",color:"var(--fg-on-brand)",padding:"12px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><Eyebrow tone="inverse">Cost worksheet</Eyebrow><Stamp tone="ink" tilt={2} style={{color:"#fff",borderColor:"#fff",fontSize:14}}>Example</Stamp></div>
        <div style={{padding:28,display:"grid",gap:20}}>
          <div><div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:600,marginBottom:8}}><span>Hours of manual work per week</span></div><Slider min={1} max={60} value={hrs} onChange={setHrs} format={v=>v+" h"}/></div>
          <div><div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:600,marginBottom:8}}><span>Loaded hourly cost</span></div><Slider min={20} max={150} value={rate} onChange={setRate} format={v=>"$"+v}/></div>
          <Table facts columns={[{key:"k",header:"Line item"},{key:"v",header:"Per year",align:"right",mono:true}]} rows={[{k:"What the problem costs you",v:fmt(annual)},{k:"What you pay us (50%)",v:fmt(annual/2)},{k:"You keep",v:fmt(annual/2)+" / yr, forever"}]}/>
          <div style={{display:"flex",gap:40,alignItems:"flex-end",flexWrap:"wrap"}}><Figure value={fmt(annual)} label="Problem cost / yr" tone="ink" size={36}/><Figure value={fmt(annual/2)} label="Our fee, once" size={36}/></div>
        </div>
      </Card>
    </Section>
    <Section tone="subtle">
      <SectionHead eyebrow="Why this works" title="Aligned incentives, no surprises." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {[["We quantify first","Before any proposal we measure what the problem costs. No number, no project."],["Fixed price, fixed scope","Half the annual cost. Not hourly, not retainers, not ‘phase two’."],["Guaranteed","If we can’t deliver what we scoped, we finish for free."]].map(([t,d])=><Card key={t}><CardTitle>{t}</CardTitle><CardText>{d}</CardText></Card>)}
      </div>
    </Section>
    <Section>
      <div style={{textAlign:"center",display:"grid",gap:16,justifyItems:"center"}}>
        <h2 style={{font:"var(--type-h2)"}}>Ready to run the numbers?</h2>
        <p style={{color:"var(--fg-muted)",font:"var(--type-lede)"}}>A 17-minute call to quantify what’s worth fixing.</p>
        <Button size="lg" onClick={()=>onNav("talk")}>Book your diagnostic →</Button>
      </div>
    </Section>
  </>;
}
