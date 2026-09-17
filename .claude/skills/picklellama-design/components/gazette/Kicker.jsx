import React from "react";
export function Kicker({section="News",topic,tone,style}) {
  const bg={ad:"transparent",breaking:"var(--news-red)"}[tone]||"var(--news-ink)";
  return <span style={{display:"inline-flex",alignItems:"center",gap:8,font:"var(--type-kicker)",textTransform:"uppercase",letterSpacing:".12em",...style}}>
    <span style={{padding:"6px 8px",whiteSpace:"nowrap",background:bg,color:tone==="ad"?"var(--fg-muted)":"var(--bg)",border:tone==="ad"?"1px solid var(--border-strong)":"none"}}>{section}</span>
    {topic&&<span style={{color:"var(--fg-brand)"}}>{topic}</span>}
  </span>;
}
export function Dateline({place,byline="By Gazette staff",time,style}) {
  return <div style={{font:"var(--type-dateline)",textTransform:"uppercase",letterSpacing:".08em",color:"var(--fg-muted)",display:"flex",gap:8,flexWrap:"wrap",...style}}><span style={{color:"var(--fg)"}}>{place}</span><span>—</span><span>{byline}</span>{time&&<><span>·</span><span>{time}</span></>}</div>;
}
export function LlamaQuote({children,context="The Pickle Llama",style}) {
  return <figure style={{margin:0,padding:"20px 28px",borderTop:"4px solid var(--news-rule)",borderBottom:"1px solid var(--news-rule)",textAlign:"center",display:"grid",gap:10,...style}}>
    <blockquote style={{margin:0,font:"var(--type-llama-quote)",color:"var(--fg)"}}>“{children}”</blockquote>
    <figcaption style={{font:"var(--type-kicker)",textTransform:"uppercase",letterSpacing:".1em",color:"var(--fg-muted)"}}>{context}</figcaption>
  </figure>;
}
export function DisclaimerBand({left,right="Ask your boss about PickleLlama",tone="ink",style}) {
  const bg={ink:"var(--news-ink)",red:"var(--news-red)",green:"var(--bg-brand)",paper:"var(--bg-subtle)"}[tone];
  return <div style={{display:"flex",justifyContent:"space-between",gap:16,flexWrap:"wrap",font:"var(--type-news-small)",fontSize:11,textTransform:"uppercase",letterSpacing:".06em",background:bg,color:tone==="paper"?"var(--fg-muted)":"var(--bg)",padding:"8px 12px",...style}}><span>{left}</span><span style={{opacity:.8}}>{right}</span></div>;
}
export function NewsRule({thick=false,dashed=false,style}) {
  return <div style={dashed?{borderTop:"1px dashed var(--border-strong)",...style}:{height:thick?4:1,background:"var(--news-rule)",...style}}/>;
}
