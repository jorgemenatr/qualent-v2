import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Card, CardTitle, CardText } from "../../components/core/Card.jsx";
import { Section } from "./Section.jsx";
import { StepRail } from "./Process.jsx";
import { PageHero, Prose, Strong, H2, CheckList, NumberedList, Callout, CTA } from "./Prose.jsx";
const Rail=({slug,onNav})=><Section style={{borderTop:0,paddingTop:32,paddingBottom:32}}><StepRail active={slug} onNav={onNav}/></Section>;

export function FirstMeeting({ onNav }) { return <>
  <PageHero eyebrow="Step 01 · First meeting" title="Getting on the same page." lede="Every engagement starts with understanding. We produce a detailed report on what we heard you say — so we’re aligned before anything else happens." cost="Free · 17-minute diagnostic call" mascot="labcoat"/>
  <Rail slug="first-meeting" onNav={onNav}/>
  <Section narrow><H2>What happens</H2><NumberedList items={[["17-minute call","We ask about your biggest problems and what they’re costing you. No small talk, no padding."],["We listen","No pitching, no selling. We’re trying to figure out if we can actually help — not convince you to hire us."],["Written report","Within 48 hours you receive a summary of what we understood. Your chance to correct us before we go further.","48 hours"]]}/></Section>
  <Section tone="subtle" narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2>What you get</H2><CheckList items={["A written report summarizing what we heard","Clarity on whether we’re aligned on the problem","Honest assessment of whether we can help","Initial thoughts on approach (if relevant)","No obligation — just understanding"]}/></div>
    <Callout eyebrow="Why we do this"><Prose style={{fontSize:16}}><p>When expectations don’t match reality, everyone loses. Early on, we worked a project without direct access to the end client. In the last two weeks we discovered a list of “must haves” we’d never seen. What we built covered 20% of what was needed.</p><Strong>Now we make sure we’re on the same page before any money changes hands.</Strong></Prose></Callout>
  </div></Section>
  <CTA title="Ready to start?" sub="17 minutes to identify your top problems and see if we can help." onNav={onNav}/>
</>; }

export function Research({ onNav }) { return <>
  <PageHero eyebrow="Step 02 · Research report" title="Finding solutions without us." lede="Before we build anything, we exhaustively research options for solving your problems without hiring us." cost="$5,000 · rolled into the project budget if you proceed"/>
  <Rail slug="research" onNav={onNav}/>
  <Section narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2>What we research</H2><CheckList items={["Every relevant off-the-shelf tool we can find","How well each tool solves your specific problem (percentage fit)","Integration options to make existing tools work together","Total cost of ownership comparisons (buy vs. build)","Our honest recommendation — even if that’s “don’t hire us”"]}/></div>
    <div><H2>What you get</H2><CheckList items={["Comprehensive written report (typically 15–30 pages)","Tool-by-tool analysis with pros and cons","Cost comparison over 1, 3 and 5 years","Integration architecture recommendations","A clear recommendation you can share with stakeholders"]}/></div>
  </div></Section>
  <Section tone="subtle"><H2>When we recommend building</H2><p style={{color:"var(--fg-muted)",marginTop:-16,marginBottom:28}}>Custom software is the right answer when:</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:16}}>
    {[["Your process is genuinely unique","No existing tool fits your workflow. Rarer than you think — but it happens."],["Integration is too complex","Off-the-shelf can’t handle the connections you need between systems."],["The software IS the advantage","It’s core to your business, not just supporting it."],["Scale exceeds SaaS","Volume or performance makes off-the-shelf cost-prohibitive."],["Security or compliance","Third-party tools can’t meet your regulatory obligations."],["You’ve outgrown the tools","You started off-the-shelf, it worked, and now you’ve hit its limits."]].map(([t,d])=><Card key={t}><CardTitle>{t}</CardTitle><CardText>{d}</CardText></Card>)}</div>
    <Strong><span style={{display:"block",marginTop:28}}>When we recommend building, you’ll know exactly why — and you’ll have documentation showing we tried to find a cheaper path first.</span></Strong>
  </Section>
  <Section narrow><Callout tone="label" eyebrow="About the $5,000"><Prose style={{fontSize:16}}><p>This isn’t a deposit or a commitment. It’s payment for real work: thorough research, analysis, and a report you can use regardless of what you decide next.</p><p>If you proceed to implementation with us, we credit the full $5,000 toward your project budget.</p><Strong>Either way, you walk away with a clear picture of your options.</Strong></Prose></Callout></Section>
  <CTA title="Ready to find out what’s possible?" sub="Start with a free diagnostic to see if research makes sense for your situation." onNav={onNav}/>
</>; }

export function ProblemId({ onNav }) { return <>
  <PageHero eyebrow="Step 03 · Problem identification" title="Problem identification as a service." lede="Before we build anything, we help you figure out what’s actually worth building. Not every problem needs a custom solution — we help you prioritize the ones that do." cost="Included in the research phase"/>
  <Rail slug="problem-identification" onNav={onNav}/>
  <Section narrow><H2>The challenge</H2><Prose><p>Most companies have dozens of problems they could throw technology at. The hard part isn’t building solutions — it’s knowing which problems are worth solving.</p><p>We’ve seen too many companies waste months (and millions) building the wrong thing because they jumped straight to “solution mode”.</p><Strong>The most expensive software is software that solves the wrong problem — no matter how well it’s built.</Strong></Prose></Section>
  <Section tone="subtle" narrow><H2>What we do</H2><NumberedList items={[["Process mapping","We map your current processes to see where time and money leak. We talk to the people who actually do the work."],["Problem quantification","How much is this costing you per month? Per year? In money, time, frustration?"],["Opportunity prioritization","We rank automation opportunities by impact, complexity, risk and dependencies."],["ROI assessment","Real return for each opportunity, including hidden costs like training, integration and maintenance."],["Roadmap development","A prioritized action plan — so you know what to tackle first."]]}/></Section>
  <Section narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2>What you get</H2><CheckList items={["Detailed assessment of your current operational challenges","Prioritized automation opportunities with ROI estimates","Clear cost/benefit analysis for each problem","Build vs. buy recommendations","Sequenced roadmap with implementation phases","Executive summary for stakeholder alignment"]}/></div>
    <Callout eyebrow="Why this matters"><Prose style={{fontSize:16}}><p>Without it you might build a perfect solution to the wrong problem. Or solve a $10,000/year problem for $50,000.</p><p>If we can’t find a problem worth solving, we’ll tell you — and you’ll have documentation proving it.</p><Strong>The goal isn’t to generate work. It’s to find the highest-impact opportunities where custom software genuinely makes sense.</Strong></Prose></Callout>
  </div></Section>
  <CTA title="Ready to identify what’s worth fixing?" sub="Start with a free diagnostic to understand your situation." onNav={onNav}/>
</>; }

export function Implementation({ onNav }) { return <>
  <PageHero eyebrow="Step 04 · Implementation" title="Building the right thing." lede="Fast, focused work that turns your biggest pain points into working solutions. We prototype in days and validate before we invest in production code." cost="50% of the annual problem cost"/>
  <Rail slug="implementation" onNav={onNav}/>
  <Section narrow><H2>How it works</H2><NumberedList items={[["Define","Focused kickoff on the specific problem. No endless discovery — just enough to move with confidence.","1–2 days"],["Prototype","A working prototype you can actually use. Not wireframes — real, functional software.","3–5 days"],["Validate","Test with real users. Iterate. Make sure we’re building the right thing before production quality.","1–2 weeks"],["Production","Build the real thing, properly. Reliable, secure, scalable, maintainable.","2–4 weeks"],["Launch","Deploy and make sure it works in the real world. We stick around until it does.","1 week"]]}/></Section>
  <Section tone="subtle" narrow><H2>Why prototype first</H2><Prose><p>The most pressing vulnerability of custom software is building the <em style={{color:"var(--fg)"}}>wrong</em> software. We’ve seen teams deliver extremely high-quality software that solved the wrong problem.</p><p>AI lets us bootstrap ideas into working test articles in days. We prove or disprove our assumptions before investing in production code.</p></Prose>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:28}}>{["Fewer expensive mistakes","Faster time to value","Confidence we’re building the right thing"].map(b=><Card key={b} variant="soft" padding={20}><CardTitle style={{fontSize:17}}>{b}</CardTitle></Card>)}</div></Section>
  <Section narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2>What we build</H2><CheckList items={["Custom AI assistants and chatbots","Process automation workflows","Data pipelines and integrations","Internal tools and dashboards","Document processing systems","Reporting and analytics"]}/></div>
    <Callout tone="label" eyebrow="Pricing"><p style={{fontWeight:700,fontSize:32,letterSpacing:"-.02em",color:"var(--fg-brand)"}}>50% of the annual problem cost</p><p style={{color:"var(--fg-muted)"}}>$100,000 annual problem = $50,000 to fix it.</p><p style={{fontSize:14,color:"var(--fg-muted)"}}>We guarantee quality and completion — at no extra charge if necessary.</p><div><Button variant="outline" size="sm" onClick={()=>onNav("pricing")}>More on pricing <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div></Callout>
  </div></Section>
  <CTA title="Ready to build?" sub="Start with a free diagnostic to discuss your project and see if the math works." onNav={onNav}/>
</>; }

export function Partnership({ onNav }) { return <>
  <PageHero eyebrow="Step 05 · Partnership" title="We don’t disappear after launch." lede="Solutions need to evolve, and we become an extension of your team." cost="Custom arrangements based on your needs" mascot="farm"/>
  <Rail slug="partnership" onNav={onNav}/>
  <Section narrow><H2>What’s included</H2><NumberedList items={[["Maintenance and support","Bug fixes, security updates, and making sure nothing breaks."],["Continuous improvement","We watch how people actually use the software and make it better."],["New feature development","As your needs evolve, so does the software."],["Strategic guidance","Technology decisions as your business grows."],["Priority response","When something breaks, you go to the front of the line."]]}/></Section>
  <Section tone="subtle" narrow><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
    <div><H2>How it works</H2><CheckList items={["Monthly retainer for ongoing development and support","Quarterly strategy sessions to plan what’s next","Priority response for issues and urgent needs","Proactive monitoring and optimization","Regular check-ins to ensure alignment"]}/></div>
    <Callout tone="label" eyebrow="No long-term commitment"><Prose style={{fontSize:16}}><p>We earn your business every month by delivering value. If it’s not working, you can walk away with 30 days notice.</p><p>Software isn’t a one-time purchase. The best software gets better because someone is watching how it’s used. The worst gets abandoned and slowly becomes a liability.</p><Strong>We prefer to stick around and make sure what we built keeps delivering.</Strong></Prose></Callout>
  </div></Section>
  <CTA title="Want to discuss ongoing support?" sub="Start with a conversation about your needs and what partnership might look like." onNav={onNav}/>
</>; }
