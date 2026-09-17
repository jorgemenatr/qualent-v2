import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Badge } from "../../components/core/Badge.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Figure } from "../../components/brand/Figure.jsx";
import { Mascot } from "../../components/brand/Mascot.jsx";
import { Section, SectionHead } from "./Section.jsx";
import { Reveal } from "../../components/brand/Motion.jsx";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
const clients=[["kroger.svg"],["anaconda.svg"],["cbts.webp",1],["stacking-projects.png",1],["reps.jpeg"],["torq-logistics.svg"],["buffalo-rail.svg"]];
const cases=[["Buffalo Rail & Infrastructure","Rail infrastructure investment showcase","$80M+","investment platform with interactive corridor mapping"],["Specialty sports retailer","Locker55: from Excel to intelligent inventory","25 sheets → 1","system; 10–15 min saved per order"],["Manufacturing sector","AI recruitment automation platform","40–45%","cost reduction per hire, 3× recruiter capacity"]];
const arrow=<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
function LogoRow(){
  const [hot,setHot]=React.useState(false);
  return <div onMouseEnter={()=>setHot(true)} onMouseLeave={()=>setHot(false)} style={{display:"flex",gap:44,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
    {clients.map(([s,inv],i)=><img key={s} src={root()+"assets/clients/"+s} alt="" style={{height:32,width:"auto",filter:(inv?"invert(1) ":"")+(hot?"grayscale(0)":"grayscale(1)"),opacity:hot?1:.7,transition:`filter 300ms var(--ease-out) ${i*60}ms, opacity 300ms var(--ease-out) ${i*60}ms`}}/>)}
  </div>;
}
export function Home({ onNav }) {
  return <>
    <section style={{position:"relative",overflow:"hidden",padding:"clamp(64px,10vw,128px) 0",borderBottom:"1px solid var(--border)"}}>
      <Mascot variant="watermark"/>
      <div style={{position:"relative",maxWidth:"var(--container-md)",margin:"0 auto",padding:"0 var(--gutter)",textAlign:"center",display:"grid",gap:28,justifyItems:"center"}}>
        <Eyebrow style={{animation:"pl-fade 400ms var(--ease-out) both"}}>Software & AI, minus the consulting</Eyebrow>
        <h1 style={{font:"var(--type-display)",letterSpacing:"var(--tracking-tight)",maxWidth:900,textWrap:"balance",display:"grid"}}><span style={{color:"var(--pl-lime-500)",animation:"pl-fade 520ms var(--ease-out) 100ms both"}}>What if the problems you tolerate</span><span style={{color:"var(--fg-brand)",animation:"pl-rise 520ms var(--ease-out) 300ms both"}}>are now cheaper to fix than to ignore?</span></h1>
        <p style={{font:"var(--type-lede)",color:"var(--fg-muted)",maxWidth:560,animation:"pl-rise 520ms var(--ease-out) 450ms both"}}>We solve software-shaped “blood, sweat, and spreadsheets” problems.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",animation:"pl-rise 520ms var(--ease-out) 560ms both"}}><Button size="lg" onClick={()=>onNav("talk")}>Book 17-minute diagnostic {arrow}</Button><Button size="lg" variant="outline">See our guarantee</Button></div>
      </div>
    </section>
    <Section style={{padding:"40px 0"}}>
      <p style={{textAlign:"center",fontSize:13,color:"var(--fg-muted)",marginBottom:24}}>Trusted by teams at</p>
      <LogoRow/>
    </Section>
    <Section tone="loud">
      <div style={{textAlign:"center",display:"grid",gap:12,justifyItems:"center"}}>
        <Eyebrow tone="muted" style={{color:"var(--fg-on-lime)"}}>Our guarantee</Eyebrow>
        <p style={{fontWeight:900,fontSize:"clamp(2rem,4vw,3.25rem)",lineHeight:1.05,letterSpacing:"-.02em",color:"var(--fg-brand-deep)",maxWidth:760,textWrap:"balance"}}>50% of annual cost — or we finish for free.</p>
        <p style={{fontSize:17,color:"var(--fg-on-lime)",maxWidth:480}}>If the math doesn’t work, we don’t proceed. If we can’t deliver, you don’t pay.</p>
      </div>
    </Section>
    <Section>
      <SectionHead eyebrow="Why this is possible now" title="AI changed the economics of custom software." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {[["What we do","Elite architects + AI leverage = solutions in weeks at ~10× lower cost."],["Why now","The math flipped. Fixing problems now costs less than tolerating them."],["The hidden cost","Manual work drains money. Bottlenecks cap growth. Workarounds become expensive mistakes."],["What this means","Every manual workaround is a mistake waiting to happen. Every bottleneck is a resignation waiting to happen."],["The opportunity","Fix one bottleneck. Free up capacity. Fix the next one. Repeat."],["The next step","A 17-minute call to quantify what’s worth fixing."]].map(([t,d],i)=><Reveal key={t} delay={(i%3)*90}><Card style={{height:"100%"}}><Eyebrow tone="muted">0{i+1}</Eyebrow><CardTitle>{t}</CardTitle><CardText>{d}</CardText></Card></Reveal>)}
      </div>
    </Section>
    <Section tone="subtle">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
        <div style={{display:"grid",gap:16}}>
          <Eyebrow>What we don’t do</Eyebrow>
          <h2 style={{font:"var(--type-h2)"}}>We’re not for everyone. That’s intentional.</h2>
          <ul style={{listStyle:"none",padding:0,display:"grid",gap:10}}>{["Build without talking to actual users","Proceed if the math doesn’t work","Bill for projects that don’t deliver","Speak in corporate buzzwords","Promise to be the cheapest"].map(i=><li key={i} style={{display:"flex",gap:10,alignItems:"center",fontSize:16}}><span style={{color:"var(--danger)",fontWeight:700,fontFamily:"var(--font-condensed)",textTransform:"uppercase",fontSize:13,letterSpacing:".05em"}}>We don’t</span>{i}</li>)}</ul>
        </div>
        <Card variant="label" padding={32}>
          <Eyebrow>Our promise</Eyebrow>
          <CardText style={{fontSize:16}}>If the math doesn’t work, we’ll tell you. If we can’t help, we’ll tell you that too.</CardText>
          <p style={{fontWeight:700,fontSize:24,color:"var(--fg-brand)"}}>50% of annual cost — or free.</p>
          <div><Button variant="secondary" onClick={()=>onNav("services")}>See how we work</Button></div>
        </Card>
      </div>
    </Section>
    <Section>
      <SectionHead eyebrow="What we actually do" title="Three ways in." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {[["Problem identification","Identify your top problems and quantify what they cost. If the math doesn’t work, we tell you."],["Implementation","Senior engineers + AI tools = solutions at ~10× lower cost. We build fast because we build right."],["Ongoing partnership","Long-term support to keep solutions running and evolving. We become part of your team."]].map(([t,d])=><Card key={t} variant="soft"><CardTitle>{t}</CardTitle><CardText>{d}</CardText><a href="#" onClick={e=>{e.preventDefault();onNav("services")}} style={{fontSize:14,fontWeight:600,display:"inline-flex",gap:6,alignItems:"center"}}>Learn more {arrow}</a></Card>)}
      </div>
    </Section>
    <Section tone="subtle">
      <SectionHead eyebrow="Real results" title="Not hypotheticals. Not projections." sub="Here’s what actually happened." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {cases.map(([c,t,n,r])=><Card key={t} style={{gap:16}}><Eyebrow tone="muted">{c}</Eyebrow><CardTitle>{t}</CardTitle><Figure value={n} label={r} size={34}/><a href="#" onClick={e=>{e.preventDefault();onNav("case-study")}} style={{fontSize:14,fontWeight:600,display:"inline-flex",gap:6,alignItems:"center",marginTop:"auto"}}>Read case study {arrow}</a></Card>)}
      </div>
      <div style={{textAlign:"center",marginTop:32}}><Button variant="outline" onClick={()=>onNav("proof")}>View all case studies {arrow}</Button></div>
    </Section>
    <Section>
      <SectionHead eyebrow="What you’re risking right now" title="Every day you tolerate these problems, you accept these risks." />
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
        {[["Operational risk","Manual errors and process failures that damage client relationships and cost real money."],["People risk","Burnout and frustration from talented people doing mundane work. Resignations you don’t see coming."],["Competitive risk","Capacity constraints while competitors move faster. Stuck in spreadsheet hell."]].map(([t,d],i)=><Reveal key={t} delay={i*100}><Card style={{height:"100%"}}><Badge tone="danger" variant="stamp" style={{alignSelf:"flex-start"}}>Untreated</Badge><CardTitle>{t}</CardTitle><CardText>{d}</CardText></Card></Reveal>)}
      </div>
    </Section>
    <Section tone="inverse">
      <div style={{textAlign:"center",display:"grid",gap:16,justifyItems:"center",maxWidth:600,margin:"0 auto"}}>
        <Eyebrow tone="inverse" style={{color:"var(--pl-lime-500)"}}>17 minutes to clarity</Eyebrow>
        <h2 style={{font:"var(--type-h2)",fontSize:36,color:"#fff"}}>15 minutes for us to listen. 2 minutes to talk next steps.</h2>
        <p style={{color:"var(--pl-grey-300)",fontSize:17,lineHeight:1.6}}>Walk away with a clear picture of your top problems, what they’re costing you, and whether the math works. Whether we work together or not, you’ll have what you need to act.</p>
        <Button size="lg" variant="secondary" onClick={()=>onNav("talk")}>Book your diagnostic {arrow}</Button>
      </div>
    </Section>
  </>;
}
