import React from "react";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
const src={full:"logo/picklellama-mark-wordmark.svg",square:"logo/picklellama-square.png",animated:"logo/picklellama-animated.gif",standing:"mascot/pose-standing.png",labcoat:"mascot/pose-labcoat.png",farm:"mascot/scene-farm.png"};
// Eye geometry per pose, as % of the image box: [cx, cy, pupil radius %, skin colour]. Measured from the PNGs.
const EYES={labcoat:{w:1024,h:1536,skin:"#728f31",pts:[[403,325],[649,325]],r:27},standing:{w:1024,h:1536,skin:"#7d973e",pts:[[483,341],[745,346]],r:29},farm:{w:1448,h:1086,skin:"#708d2e",pts:[[847,279],[982,279]],r:15}};
const reduced=()=>typeof matchMedia!=="undefined"&&matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Live eyes: pupil dots that follow the cursor, plus a periodic blink, overlaid on the static PNG. */
function Eyes({pose,size}){
  const g=EYES[pose]; const ref=React.useRef(null); const [off,setOff]=React.useState([0,0]);
  React.useEffect(()=>{ if(reduced())return; const h=e=>{const el=ref.current;if(!el)return;const b=el.getBoundingClientRect();const cx=b.left+b.width/2,cy=b.top+b.height*(g.pts[0][1]/g.h);
    const dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy)||1,m=Math.min(1,d/400);setOff([dx/d*m,dy/d*m])}; addEventListener("mousemove",h,{passive:true}); return()=>removeEventListener("mousemove",h)},[pose]);
  const scale=size/g.h; const r=g.r*scale; const travel=r*0.55;
  return <div ref={ref} style={{position:"absolute",inset:0,pointerEvents:"none"}}>
    {g.pts.map(([x,y],i)=><React.Fragment key={i}>
      <span style={{position:"absolute",left:x*scale-r,top:y*scale-r,width:r*2,height:r*2,borderRadius:"50%",background:g.skin}}/>
      <span style={{position:"absolute",left:x*scale-r*0.78+off[0]*travel,top:y*scale-r*0.78+off[1]*travel,width:r*1.56,height:r*1.56,borderRadius:"50%",background:"#231F20",transition:"left 120ms ease-out, top 120ms ease-out"}}/>
      <span style={{position:"absolute",left:x*scale-r*1.05,top:y*scale-r*1.05,width:r*2.1,height:r*2.1,borderRadius:"50%",background:g.skin,transformOrigin:"50% 15%",transform:"scaleY(0)",animation:"pl-blink 5.5s ease-in-out infinite",animationDelay:(i?0.02:0)+"s"}}/>
    </React.Fragment>)}
  </div>;
}

export function Mascot({variant="square",size=120,live=true,style}) {
  if(variant==="watermark") return <>
    <img src={root()+"assets/mascot/llama-left.svg"} alt="" aria-hidden style={{position:"absolute",left:0,bottom:0,height:"70%",width:"auto",opacity:.14,pointerEvents:"none",animation:live?"pl-peek-left 700ms var(--ease-out) both":"none"}}/>
    <img src={root()+"assets/mascot/llama-right.svg"} alt="" aria-hidden style={{position:"absolute",right:0,top:0,height:"70%",width:"auto",opacity:.14,pointerEvents:"none",animation:live?"pl-peek-right 700ms var(--ease-out) 120ms both":"none"}}/>
  </>;
  const g=EYES[variant];
  if(g&&live){
    const w=size*g.w/g.h; const farm=variant==="farm";
    return <div style={{position:"relative",width:w,height:size,flex:"none",...style}}>
      {farm&&<>
        <span aria-hidden style={{position:"absolute",left:"8%",top:"14%",width:"18%",height:"8%",borderRadius:999,background:"rgba(255,255,255,.55)",filter:"blur(6px)",animation:"pl-drift 9s ease-in-out infinite alternate"}}/>
        <span aria-hidden style={{position:"absolute",left:"34%",top:"6%",width:"14%",height:"7%",borderRadius:999,background:"rgba(255,255,255,.45)",filter:"blur(6px)",animation:"pl-drift 12s ease-in-out infinite alternate-reverse"}}/>
      </>}
      <div style={{position:"absolute",inset:0,transformOrigin:"50% 100%",animation:farm?"pl-walk 1.6s ease-in-out infinite":"pl-breathe 3.4s ease-in-out infinite"}}>
        <img src={root()+"assets/"+src[variant]} alt="PickleLlama" style={{width:"100%",height:"100%",display:"block"}}/>
        <Eyes pose={variant} size={size}/>
      </div>
    </div>;
  }
  return <img src={root()+"assets/"+src[variant]} alt="PickleLlama" style={{height:size,width:"auto",borderRadius:variant==="square"?size*.12:0,...style}}/>;
}
