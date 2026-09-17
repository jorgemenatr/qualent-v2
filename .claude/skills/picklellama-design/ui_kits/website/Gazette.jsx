import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Input } from "../../components/core/Input.jsx";
import { Textarea } from "../../components/core/Textarea.jsx";
import { Label } from "../../components/core/Label.jsx";
import { Masthead } from "../../components/gazette/Masthead.jsx";
import { Kicker, Dateline, LlamaQuote, DisclaimerBand, NewsRule } from "../../components/gazette/Kicker.jsx";
import { NewsCard } from "../../components/gazette/NewsCard.jsx";
import { AdBreak } from "../../components/gazette/AdBreak.jsx";
import { Letters, Classifieds, LETTERS } from "../../components/gazette/Letters.jsx";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
export const STORIES=[
 {slug:"fourth-dispatcher",section:"News",topic:"Logistics",title:"Logistics Firm Hires Fourth Dispatcher to Manage Spreadsheet That Tracks the Other Three",place:"Hamilton, Ont.",date:"Sep 15",dek:"The workbook contains 41 tabs and one macro nobody will touch. It is opened by all four employees simultaneously each morning.",art:"pose-standing.png",issue:3},
 {slug:"phase-two-year-14",section:"News",topic:"ERP",title:"Area Distributor’s ERP Rollout Enters Its Fourteenth Year of Phase Two",place:"Red Deer, Alta.",date:"Sep 15",dek:"Officials describe the milestone as “on track.”",issue:3},
 {slug:"dispatch-540",section:"Sighting",title:"Pickle Llama Found Standing in Dispatch Office at 5:40 A.M.; Staff Unsure How He Got In",place:"Thunder Bay, Ont.",date:"Sep 15",tone:"breaking",issue:3},
 {slug:"second-deck",section:"News",topic:"Consulting",title:"Transformation Consultant Delivers 90-Slide Deck Recommending Second Deck",place:"Mississauga, Ont.",date:"Sep 1",dek:"The second deck is expected to recommend a workshop.",issue:2},
 {slug:"access-2011",section:"News",topic:"Technology",title:"Pickle Llama Opens Access Database Nobody Has Opened Since 2011; Regional IT Provider Files Complaint",place:"Saltillo, Coah.",date:"Sep 1",dek:"Asked how he opened it, he said, “I clicked it.”",art:"pose-labcoat.png",issue:2},
 {slug:"steering-nothing",section:"News",topic:"Governance",title:"Pickle Llama Walks Out of Steering Committee Mid-Sentence; Committee Continues Steering Nothing",place:"Bakersfield, Calif.",date:"Sep 1",issue:2},
 {slug:"who-funds-phase-two",section:"Investigation",title:"Who Is Really Funding Phase Two? Part One of a Series the Gazette Expects to Never Finish",place:"Undisclosed",date:"Aug 18",dek:"Documents obtained by the Gazette show a discovery phase that has itself entered discovery.",issue:1},
 {slug:"same-afternoon-fraud",section:"News",topic:"Business",title:"Pickle Llama Delivers Working Software Same Afternoon, Briefly Investigated for Fraud",place:"Fort McMurray, Alta.",date:"Aug 18",issue:1},
 {slug:"rare-photograph",section:"Archive",title:"Rare Photograph Believed to Show the Pickle Llama, Undated",place:"Location unknown",date:"Aug 18",tone:"archival",art:"pose-standing.png",issue:1},
 {slug:"clipboard-plaque",section:"News",topic:"Rail",title:"Rail Yard Inspection Clipboard Celebrates 30 Years of Service, Receives Plaque",place:"Winnipeg, Man.",date:"Aug 18",issue:1},
];
export const ISSUES=[[3,"Tuesday, 15 September 2026","The Dispatcher Issue"],[2,"Tuesday, 1 September 2026","The Consultant Issue"],[1,"Tuesday, 18 August 2026","The Inaugural Issue, Reprinted Under Protest"]];
const Paper=({children,style})=><div style={{background:"var(--news-paper)",flex:1}}><div style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"40px var(--gutter) 64px",display:"grid",gap:32,...style}}>{children}</div></div>;
const Footer=({onNav})=><div style={{display:"grid",gap:12}}><NewsRule thick/><div style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em",color:"var(--fg-muted)"}}><span>The Daily Llama is a publication of PickleLlama Studio. All events are fictional. All spreadsheets are real.</span><a href="#" onClick={e=>{e.preventDefault();onNav("gazette-archive")}} style={{color:"var(--fg)"}}>Back issues →</a></div><DisclaimerBand left="Openly AI-assisted. Editorial voice human-owned." tone="paper"/></div>;

export function GazetteFront({ onNav }) {
  const [lead,...rest]=STORIES.filter(s=>s.issue===3); const older=STORIES.filter(s=>s.issue<3).slice(0,4);
  const open=s=>()=>onNav("gazette-article");
  return <Paper>
    <Masthead/>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.6fr) minmax(0,1fr)",gap:36,alignItems:"start"}}>
      <NewsCard size="lg" story={lead} onClick={open(lead)}/>
      <div style={{display:"grid",gap:20,alignContent:"start",borderLeft:"1px solid var(--news-rule)",paddingLeft:28}}>
        <LlamaQuote context="The Pickle Llama, asked whether the spreadsheet could be replaced">Yes.</LlamaQuote>
        {rest.map(s=><React.Fragment key={s.slug}><NewsCard size="sm" story={s} onClick={open(s)}/><NewsRule dashed/></React.Fragment>)}
        <div style={{display:"grid",gap:8}}><Kicker section="Subscribe"/><p style={{font:"var(--type-news-body)"}}>The full paper, biweekly. Lead story, one ad break, one letter, the real column.</p><div style={{display:"flex",gap:8}}><Input placeholder="you@company.com" style={{height:40}}/><Button>Subscribe</Button></div><p style={{font:"var(--type-news-small)",color:"var(--fg-faint)"}}>Price: one spreadsheet. We will not ask for it.</p></div>
      </div>
    </div>
    <AdBreak kind="pharma"/>
    <div style={{display:"grid",gap:16}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}><Kicker section="Previously" topic="From back issues"/><a href="#" onClick={e=>{e.preventDefault();onNav("gazette-archive")}} style={{font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em"}}>All issues →</a></div><NewsRule/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24}}>{older.map(s=><NewsCard key={s.slug} size="sm" story={s} onClick={open(s)}/>)}</div></div>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.4fr) minmax(0,1fr)",gap:36,alignItems:"start"}}>
      <Letters items={LETTERS.slice(0,3)}/>
      <div style={{display:"grid",gap:14,background:"var(--bg-elevated)",border:"1px solid var(--border-strong)",padding:24}}><Kicker section="From the desk of" topic="John Heslop · The real column"/><h3 style={{font:"var(--type-news-h3)",fontStretch:"85%"}}>Why we let an AI-generated llama do our marketing</h3><p style={{font:"var(--type-news-body)",color:"var(--fg-muted)"}}>Satire is specific by definition, and specificity is what separates this from generic AI content. Every joke in this paper maps to a real operational pain we have actually seen…</p><a href="#" onClick={e=>{e.preventDefault();onNav("gazette-article")}} style={{font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em"}}>Read the column →</a></div>
    </div>
    <Classifieds/>
    <div style={{display:"flex",gap:8,justifyContent:"center"}}><Button variant="outline" onClick={()=>onNav("gazette-letters")}>Write to the editor</Button></div>
    <Footer onNav={onNav}/>
  </Paper>;
}

export function GazetteArticle({ onNav }) {
  const s=STORIES[0];
  return <Paper>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}><Masthead compact onClick={()=>onNav("gazette")}/><span style={{font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em",color:"var(--fg-muted)"}}>Vol. I, No. 3 · Tuesday, 15 September 2026</span></div>
    <NewsRule thick/>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.5fr) minmax(0,1fr)",gap:40,alignItems:"start"}}>
      <article style={{display:"grid",gap:20,minWidth:0,gridTemplateColumns:"minmax(0,1fr)"}}>
        <Kicker section={s.section} topic={s.topic}/>
        <h1 style={{font:"var(--type-news-h1)",fontStretch:"var(--news-stretch-head)",letterSpacing:"-.015em",textWrap:"balance",color:"var(--news-ink)"}}>{s.title}</h1>
        <p style={{font:"var(--type-news-body)",fontSize:19,color:"var(--fg-muted)"}}>Management describes the role as “critical.”</p>
        <Dateline place={s.place} time="Tuesday, 6:12 a.m."/>
        <div style={{aspectRatio:"16/9",background:"var(--bg-brand-soft)",display:"grid",placeItems:"center",position:"relative"}}><img src={root()+"assets/mascot/pose-standing.png"} alt="The Pickle Llama, photographed in the dispatch office before it opened." style={{height:"90%",maxWidth:"100%",objectFit:"contain"}}/><span style={{position:"absolute",left:0,right:0,bottom:0,padding:"6px 10px",font:"var(--type-news-small)",fontSize:11,background:"rgba(35,31,32,.75)",color:"#fff",textTransform:"uppercase",letterSpacing:".06em"}}>The Llama in the dispatch office, before it opened. Staff do not know how. — Gazette photo</span></div>
        <div style={{font:"var(--type-news-body)",fontSize:17,lineHeight:1.65,columns:2,columnGap:32,columnRule:"1px solid var(--border-strong)",color:"var(--fg)",minWidth:0,maxWidth:"100%"}}>
          <p style={{marginBottom:16}}><span style={{float:"left",font:"900 60px/.8 var(--font-news)",fontStretch:"80%",padding:"6px 8px 0 0"}}>A</span> regional freight company confirmed Tuesday that its newest dispatcher will be responsible for maintaining the spreadsheet that tracks what the other three dispatchers are doing, a role management described as “critical.”</p>
          <p style={{marginBottom:16}}>The workbook, which reportedly contains 41 tabs and one macro nobody will touch, is opened by all four employees simultaneously each morning, at which point it asks whether they want to save changes.</p>
          <p style={{marginBottom:16}}>“We looked at replacing it,” said the operations manager, who asked not to be named because she was, at the time, inside the spreadsheet. “The vendor quoted eighteen months. Six of those were discovery.”</p>
          <p style={{marginBottom:16}}>The Pickle Llama, who was observed in the dispatch office before it opened, declined to comment on the hire. Asked whether the spreadsheet could be replaced, he said, “Yes.” He then left.</p>
          <p>A company spokesperson later confirmed that the spreadsheet had, in fact, been replaced, and that nobody saw it happen.</p>
        </div>
        <LlamaQuote context="The Pickle Llama, leaving">Yes.</LlamaQuote>
        <DisclaimerBand left="Sponsored: PickleLlama Automation. Side effects may include weekends." tone="paper"/>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em",color:"var(--fg-muted)"}}><span>Share:</span><Button variant="outline" size="sm">LinkedIn</Button><Button variant="outline" size="sm">Copy link</Button><span style={{marginLeft:"auto"}}>Filed under Logistics · The Spreadsheet</span></div>
      </article>
      <aside style={{display:"grid",gap:24,alignContent:"start",minWidth:0,borderLeft:"1px solid var(--news-rule)",paddingLeft:28}}>
        <AdBreak kind="lawyer"/>
        <div style={{display:"grid",gap:14}}><Kicker section="More" topic="In this issue"/>{STORIES.filter(x=>x.issue===3&&x.slug!==s.slug).map(x=><React.Fragment key={x.slug}><NewsCard size="sm" story={{...x,art:undefined}} onClick={()=>onNav("gazette-article")}/><NewsRule dashed/></React.Fragment>)}</div>
        <div style={{display:"grid",gap:10}}><Kicker section="Cast" topic="Who’s who"/>{[["The Spreadsheet","Arch-enemy. 41 tabs. One macro."],["The Vendor","18 months, $600K, six months of discovery."],["The Dispatcher","Holding it together with a workbook and a group chat."]].map(([n,d])=><p key={n} style={{font:"var(--type-news-small)",fontSize:14}}><b>{n}</b> — {d}</p>)}</div>
      </aside>
    </div>
    <Footer onNav={onNav}/>
  </Paper>;
}

export function GazetteLetters({ onNav }) {
  const [sent,setSent]=React.useState(false);
  return <Paper>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}><Masthead compact onClick={()=>onNav("gazette")}/><Kicker section="Letters" topic="To the editor"/></div>
    <NewsRule thick/>
    <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.5fr) minmax(0,1fr)",gap:40,alignItems:"start"}}>
      <div style={{display:"grid",gap:24}}><h1 style={{font:"var(--type-news-h1)",fontStretch:"var(--news-stretch-head)",textWrap:"balance"}}>Readers write in with spreadsheet horror stories. The Llama answers in seven words or fewer.</h1><Letters/></div>
      <aside style={{display:"grid",gap:20,alignContent:"start",background:"var(--bg-elevated)",border:"1.5px solid var(--border-strong)",padding:28}}>
        <Kicker section="Write in"/>
        {sent?<div style={{display:"grid",gap:10}}><h3 style={{font:"var(--type-news-h3)",fontStretch:"85%"}}>Received.</h3><p style={{font:"var(--type-news-body)",color:"var(--fg-muted)"}}>The Llama has read it. He has not commented. If he does, it will be in the next issue, in seven words or fewer.</p></div>:
        <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:"grid",gap:14}}>
          <div><Label htmlFor="pl">Dateline (your town)</Label><Input id="pl" placeholder="Red Deer, Alta."/></div>
          <div><Label htmlFor="lt" hint="Real pain preferred. Names of real vendors will be removed.">Your spreadsheet horror story</Label><Textarea id="lt" rows={6} placeholder="We have a tab called FINAL_v7_USE_THIS…"/></div>
          <div><Label htmlFor="em" hint="Only if you want to know when it runs">Email</Label><Input id="em" type="email" placeholder="you@company.com"/></div>
          <Button type="submit">Send to the editor</Button>
          <p style={{font:"var(--type-news-small)",color:"var(--fg-faint)"}}>By writing in you agree your story may be printed, lightly edited, and answered tersely.</p>
        </form>}
      </aside>
    </div>
    <AdBreak kind="farms"/>
    <Footer onNav={onNav}/>
  </Paper>;
}

export function GazetteArchive({ onNav }) {
  return <Paper>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}><Masthead compact onClick={()=>onNav("gazette")}/><Kicker section="Archive" topic="Back issues"/></div>
    <NewsRule thick/>
    {ISSUES.map(([n,date,name])=>{const list=STORIES.filter(s=>s.issue===n);return <section key={n} style={{display:"grid",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:24,alignItems:"baseline"}}><span style={{font:"900 64px/.9 var(--font-news)",fontStretch:"75%",color:"var(--news-ink)"}}>No. {n}</span><div style={{display:"grid",gap:4}}><h2 style={{font:"var(--type-news-h2)",fontStretch:"85%"}}>{name}</h2><span style={{font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em",color:"var(--fg-muted)"}}>{date} · {list.length} stories · one ad break · one letter</span></div></div>
      <NewsRule/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:24}}>{list.map(s=><NewsCard key={s.slug} size="sm" story={{...s,art:undefined}} onClick={()=>onNav("gazette-article")}/>)}</div>
      <div><Button variant="outline" size="sm" onClick={()=>onNav("gazette")}>Read issue No. {n} →</Button></div>
    </section>})}
    <Footer onNav={onNav}/>
  </Paper>;
}
