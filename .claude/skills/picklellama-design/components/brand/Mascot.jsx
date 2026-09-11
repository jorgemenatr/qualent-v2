import React from "react";
const root=()=>{const l=document.querySelector('link[href$="styles.css"]');return l?l.href.replace(/styles\.css$/,""):"/"};
const src={full:"logo/picklellama-mark-wordmark.svg",square:"logo/picklellama-square.png",animated:"logo/picklellama-animated.gif",standing:"mascot/pose-standing.png",labcoat:"mascot/pose-labcoat.png",farm:"mascot/scene-farm.png"};
export function Mascot({variant="square",size=120,style}) {
  if(variant==="watermark") return <>
    <img src={root()+"assets/mascot/llama-left.svg"} alt="" aria-hidden style={{position:"absolute",left:0,bottom:0,height:"70%",width:"auto",opacity:.14,pointerEvents:"none"}}/>
    <img src={root()+"assets/mascot/llama-right.svg"} alt="" aria-hidden style={{position:"absolute",right:0,top:0,height:"70%",width:"auto",opacity:.14,pointerEvents:"none"}}/>
  </>;
  return <img src={root()+"assets/"+src[variant]} alt="PickleLlama" style={{height:size,width:"auto",borderRadius:variant==="square"?size*.12:0,...style}}/>;
}
