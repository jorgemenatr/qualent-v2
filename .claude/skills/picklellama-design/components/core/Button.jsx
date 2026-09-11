import React from "react";
const base = {display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,whiteSpace:"nowrap",borderRadius:"var(--radius-sm)",fontFamily:"var(--font-sans)",fontWeight:600,cursor:"pointer",border:"1.5px solid transparent",transition:"background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast)",textDecoration:"none",lineHeight:1};
const sizes = {sm:{height:32,padding:"0 12px",fontSize:14},md:{height:40,padding:"0 18px",fontSize:15},lg:{height:48,padding:"0 24px",fontSize:17}};
const variants = {
  primary:{bg:"var(--primary)",fg:"var(--primary-fg)",hover:"var(--primary-hover)"},
  secondary:{bg:"var(--secondary)",fg:"var(--secondary-fg)",hover:"var(--secondary-hover)"},
  outline:{bg:"transparent",fg:"var(--fg)",border:"var(--border-strong)",hover:"var(--bg-elevated)"},
  ghost:{bg:"transparent",fg:"var(--fg)",hover:"var(--bg-subtle)"},
  danger:{bg:"var(--danger)",fg:"#fff",hover:"color-mix(in oklab, var(--danger) 85%, black)"},
  link:{bg:"transparent",fg:"var(--link)",hover:"transparent",underline:true},
};
export function Button({variant="primary",size="md",disabled=false,iconOnly=false,children,style,as="button",href,onClick,type="button",...rest}) {
  const [hover,setHover]=React.useState(false);const [down,setDown]=React.useState(false);
  const v=variants[variant]||variants.primary, s=sizes[size]||sizes.md;
  const st={...base,...s,background:hover&&!disabled?v.hover:v.bg,color:v.fg,borderColor:v.border||"transparent",
    padding:iconOnly?0:s.padding,width:iconOnly?s.height:undefined,opacity:disabled?.5:1,pointerEvents:disabled?"none":"auto",
    transform:down?"translateY(1px)":"none",textDecoration:v.underline&&hover?"underline":"none",...style};
  const Tag = as==="a"||href?"a":"button";
  return React.createElement(Tag,{href,type:Tag==="button"?type:undefined,disabled,onClick,style:st,"data-variant":variant,"data-size":size,
    onMouseEnter:()=>setHover(true),onMouseLeave:()=>{setHover(false);setDown(false)},onMouseDown:()=>setDown(true),onMouseUp:()=>setDown(false),...rest},children);
}
