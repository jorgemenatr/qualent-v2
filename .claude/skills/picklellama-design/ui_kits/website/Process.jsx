import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Section } from "./Section.jsx";
import { PageHero, Prose, Strong, H2, H3, NumberedList, Callout, CTA } from "./Prose.jsx";
export const STEPS=[["First meeting","We listen and produce a report on what we understood","Free","first-meeting"],["Research report","We find solutions that don’t require hiring us","$5,000 · credited if you proceed","research"],["Problem identification","We quantify problems and prioritize by ROI","Included in research","problem-identification"],["Implementation","We build, prototype-first, validated with real users","50% of annual problem cost","implementation"],["Partnership","Ongoing support and evolution","Custom","partnership"]];
export function StepRail({ active, onNav, progress }) {
  return <ol style={{listStyle:"none",padding:0,display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:0,borderTop:"1.5px dashed var(--border-strong)",paddingTop:20,position:"relative"}}>
    {progress!==undefined&&<span aria-hidden style={{position:"absolute",left:0,top:-1.5,height:1.5,width:"100%",background:"var(--primary)",transformOrigin:"left",transform:`scaleX(${progress})`,transition:"transform 300ms var(--ease-out)"}}/>}
    {STEPS.map(([t,,cost,slug],i)=>{const on=slug===active||(progress!==undefined&&progress>=(i+0.5)/5);return <li key={slug} onClick={()=>onNav(slug)} style={{cursor:"pointer",display:"grid",gap:6,padding:"0 12px 0 0"}}>
      <span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",textTransform:"uppercase",color:on?"var(--fg-brand)":"var(--fg-faint)"}}>Step 0{i+1}</span>
      <span style={{fontWeight:700,fontSize:16,color:on?"var(--fg)":"var(--fg-muted)",textDecoration:on?"underline":"none",textDecorationColor:"var(--primary)",textUnderlineOffset:6}}>{t}</span>
      <span style={{fontSize:13,color:"var(--fg-faint)"}}>{cost}</span></li>})}
  </ol>;
}
export function Process({ onNav }) {
  const [prog,setProg]=React.useState(0); const [stuck,setStuck]=React.useState(false); const secs=React.useRef([]);
  React.useEffect(()=>{const h=()=>{const els=secs.current.filter(Boolean);if(!els.length)return;const mid=innerHeight*0.45;let p=0;els.forEach((el,i)=>{const b=el.getBoundingClientRect();if(b.top<mid)p=Math.min(1,(i+Math.min(1,(mid-b.top)/b.height))/els.length)});setProg(p);setStuck(els[0].getBoundingClientRect().top<120)};addEventListener("scroll",h,{passive:true});h();return()=>removeEventListener("scroll",h)},[]);
  const S=i=>el=>{secs.current[i]=el};
  return <>
    <PageHero eyebrow="Our process" diagnosis="Chronic spreadsheets." title="There’s a story and a reason behind each step." lede="Over the years we’ve watched projects crash and burn. Learning from failure led to a process we’re proud to share — the steps we find essential for an enjoyable long-term relationship." mascot="labcoat"/>
    <div style={{position:"sticky",top:64,zIndex:30,background:"color-mix(in oklab, var(--bg) 92%, transparent)",backdropFilter:"blur(8px)",borderBottom:stuck?"1px solid var(--border)":"1px solid transparent",transition:"border-color 200ms"}}><div style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"20px var(--gutter) 16px"}}><StepRail onNav={onNav} progress={prog}/></div></div>
    <Section sectionRef={S(0)} narrow>
      <H2 eyebrow="Step 01 · First meeting">Why understanding comes first</H2>
      <Prose>
        <p>For the first year after starting PickleLlama, we pretty much exclusively worked as subcontractors for other agencies. The most painful lesson from that time: what happens when no one checks with the end user to make sure the software being built is actually what they need.</p>
        <p>One project came to a very sad end when, in the last two weeks, we were presented with a checklist of “must haves” we had never seen before. What we built could only do 20% of what we set out to build.</p>
        <p>It still recovered hundreds of hours every month. But it could have been so much more if we had only known what the client actually needed.</p>
        <Strong>That’s why every engagement starts with understanding. We produce a detailed report on what we heard you say — so we’re on the same page before anything else happens.</Strong>
      </Prose>
      <div style={{marginTop:28}}><Button variant="outline" onClick={()=>onNav("first-meeting")}>About the first meeting <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div>
    </Section>
    <Section sectionRef={S(1)} tone="subtle" narrow>
      <H2 eyebrow="Step 02 · Research report">Why we try to convince you not to hire us</H2>
      <Prose>
        <p>There aren’t many new ideas. With 8 billion people on the planet, someone else has almost certainly thought of it — which means you probably shouldn’t build it yourself.</p>
        <p>Now, you might say, “but you are in the software building business…” Yes. And here’s why we still try to convince you to buy something else first.</p>
      </Prose>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"32px 0"}}>
        <Card variant="label" padding={28}><Eyebrow tone="muted">Custom software is expensive</Eyebrow><p style={{fontWeight:700,fontSize:36,letterSpacing:"-.02em"}}>$50k–$200k</p><CardText>to build — plus maintenance, hosting, security updates, and the inevitable “can you just add this one feature”.</CardText></Card>
        <Card variant="label" padding={28}><Eyebrow>Off-the-shelf is cheap</Eyebrow><p style={{fontWeight:700,fontSize:36,letterSpacing:"-.02em",color:"var(--fg-brand)"}}>$2.4k–$24k / yr</p><CardText>Even at the high end you’d run a SaaS tool 8+ years before spending what a custom build costs — with updates and support included.</CardText></Card>
      </div>
      <H3>We’ve watched companies waste money</H3>
      <Prose style={{marginTop:12}}>
        <p>A company spent $150,000 on a custom inventory system when NetSuite would have done 95% of it for $1,500/month. Startups burn six months on internal tools Airtable could have handled in an afternoon.</p>
        <Strong>We don’t want to be part of that story. It’s bad for you, and honestly, it’s not the kind of work we find fulfilling.</Strong>
      </Prose>
      <H3>“But doesn’t this hurt your business?”</H3>
      <p style={{color:"var(--fg-muted)",margin:"12px 0 20px"}}>Actually, no. Here’s what happens when we tell someone they don’t need custom software:</p>
      <NumberedList items={[["They trust us.","When we eventually do recommend building, they know it’s because we genuinely believe it’s the right call."],["They come back.","When they do have a problem that genuinely requires custom software, guess who they call?"],["They refer others.","“These are the people who told me NOT to hire them” is a surprisingly effective endorsement."],["We work on interesting problems.","What’s left after filtering are the high-impact projects where custom software is the right answer."]]}/>
      <div style={{marginTop:28}}><Button variant="outline" onClick={()=>onNav("research")}>About the research report <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div>
    </Section>
    <Section sectionRef={S(2)} narrow>
      <H2 eyebrow="Step 03 · Problem identification">Finding the problems worth solving</H2>
      <Prose>
        <p>Most companies have dozens of problems they could throw technology at. The hard part isn’t building solutions — it’s knowing which problems are worth solving.</p>
        <p>We’ve seen companies spend months solving problems that cost them $10,000/year. We’ve also seen them ignore problems costing $500,000/year because nobody added it up.</p>
      </Prose>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:12,margin:"32px 0"}}>
        {[["Time drains","Where are your people spending hours on tasks that should take minutes?"],["Error hotspots","Where do mistakes happen most often? What do they cost to fix?"],["Bottlenecks","What’s slowing everything else down?"],["Hidden costs","What frustrations are driving good people away?"]].map(([t,d])=><Card key={t} variant="soft" padding={20}><CardTitle style={{fontSize:17}}>{t}</CardTitle><CardText style={{fontSize:14}}>{d}</CardText></Card>)}
      </div>
      <Strong>We don’t just make a list. We put numbers on everything — so you can decide what’s worth fixing and in what order.</Strong>
      <div style={{marginTop:28}}><Button variant="outline" onClick={()=>onNav("problem-identification")}>About problem identification <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div>
    </Section>
    <Section sectionRef={S(3)} tone="subtle" narrow>
      <H2 eyebrow="Step 04 · Implementation">When we build, we do it differently</H2>
      <Prose>
        <p>Building software used to be so expensive that building things just to see if they work was a luxury even large enterprises couldn’t afford. AI has changed the economics, especially for prototyping.</p>
      </Prose>
      <H3>The value of code: from caviar to canned tuna</H3>
      <Prose style={{marginTop:12}}><p>Code used to be precious. Every line expensive to write, maintain, change. That’s changing — AI generates working prototypes in hours. The value isn’t in the code anymore; it’s in understanding <em style={{color:"var(--fg)"}}>what to build</em>.</p></Prose>
      <H3>The real vulnerability of custom software</H3>
      <Prose style={{marginTop:12}}><p>Production systems still have to be reliable, secure and usable. But the most pressing vulnerability is building the <em style={{color:"var(--fg)"}}>right</em> software. We’ve seen teams deliver extremely high-quality software that solved the wrong problem — albeit very well.</p>
      <Strong>We prototype in days. We test with real users. We validate before we invest in production-quality code.</Strong></Prose>
      <div style={{marginTop:28}}><Button variant="outline" onClick={()=>onNav("implementation")}>About implementation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div>
    </Section>
    <Section sectionRef={S(4)} tone="inverse">
      <div style={{textAlign:"center",marginBottom:40,display:"grid",gap:10}}><Eyebrow tone="inverse" style={{color:"var(--pl-lime-500)"}}>The offer</Eyebrow><h2 style={{font:"var(--type-h2)",color:"#fff"}}>Five steps. One price you can predict.</h2></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:12}}>
        {STEPS.map(([t,d,cost,slug],i)=><div key={slug} onClick={()=>onNav(slug)} style={{cursor:"pointer",background:"#2A2F22",border:"1px solid #3B412F",borderRadius:"var(--radius-lg)",padding:20,display:"grid",gap:10,alignContent:"start"}}><span style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-caps)",textTransform:"uppercase",color:"var(--pl-lime-500)"}}>Step 0{i+1}</span><h3 style={{font:"var(--type-h3)",color:"#fff"}}>{t}</h3><p style={{fontSize:14,lineHeight:1.5,color:"var(--pl-grey-300)"}}>{d}</p><p style={{fontSize:13,fontWeight:600,color:"var(--pl-lime-300)",marginTop:"auto"}}>{cost}</p></div>)}
      </div>
      <div style={{maxWidth:560,margin:"40px auto 0",textAlign:"center",display:"grid",gap:12,color:"var(--pl-grey-300)"}}>
        <p style={{fontSize:22,fontWeight:700,color:"#fff"}}>You pay <span style={{color:"var(--pl-lime-500)"}}>50%</span> of the annual cost of the problem we solve.</p>
        <p style={{fontSize:15}}>$100,000 annual problem = $50,000 to fix it. Recouped in 2 years, guaranteed. Quality and completion guaranteed — at no extra charge if necessary.</p>
        <Button variant="secondary" onClick={()=>onNav("pricing")} style={{justifySelf:"center"}}>More on pricing <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button>
      </div>
    </Section>
    <CTA tone="paper" title="Ready to start with understanding?" sub="17 minutes to identify your top problems and see if the math works." onNav={onNav}/>
  </>;
}
