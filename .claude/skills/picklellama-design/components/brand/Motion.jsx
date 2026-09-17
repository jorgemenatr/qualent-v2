import React from "react";
/** Runs children's entrance animation once when scrolled into view. */
export function Reveal({children,delay=0,anim="pl-rise",style,as="div",threshold=0.25}) {
  const ref=React.useRef(null); const [on,setOn]=React.useState(false);
  React.useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold});io.observe(el);return()=>io.disconnect()},[]);
  return React.createElement(as,{ref,style:{opacity:on?undefined:0,animation:on?`${anim} 480ms var(--ease-out) ${delay}ms both`:"none",...style}},children);
}
/** Two-tone headline: lime line fades, green line rises 200ms later. Pass lines as children array. */
export function TwoTone({lines,size="var(--type-display)",colors=["var(--pl-lime-500)","var(--fg-brand)"],style}) {
  return <h1 style={{font:size,letterSpacing:"var(--tracking-tight)",display:"grid",...style}}>
    {lines.map((l,i)=><span key={i} style={{color:colors[i%colors.length],animation:`${i?"pl-rise":"pl-fade"} 520ms var(--ease-out) ${i*200}ms both`}}>{l}</span>)}
  </h1>;
}
/** Counts a number up to value whenever it changes. */
export function useCountUp(value,ms=420){
  const [v,setV]=React.useState(value); const from=React.useRef(value);
  React.useEffect(()=>{const a=from.current,b=value,t0=performance.now();let raf;const tick=t=>{const p=Math.min(1,(t-t0)/ms),e=1-Math.pow(1-p,3);setV(a+(b-a)*e);if(p<1)raf=requestAnimationFrame(tick);else from.current=b};raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[value]);
  return v;
}
/** Oswald-caps text that types itself in, like a stamped form field. */
export function Typed({text,delay=0,speed=38,style}){
  const [n,setN]=React.useState(0);
  React.useEffect(()=>{setN(0);let i=0;const t0=setTimeout(()=>{const id=setInterval(()=>{i++;setN(i);if(i>=text.length)clearInterval(id)},speed);},delay);return()=>clearTimeout(t0)},[text]);
  return <span style={{font:"var(--type-stamp)",fontSize:"inherit",textTransform:"uppercase",...style}}>{text.slice(0,n)}<span aria-hidden style={{display:"inline-block",width:"0.08em",height:"0.9em",background:"currentColor",marginLeft:2,verticalAlign:"-0.1em",animation:"pl-caret 0.8s steps(1) infinite",opacity:n>=text.length?0:1}}/></span>;
}
