import React from "react";
export function Table({columns=[],rows=[],facts=false,style}) {
  return <table style={{width:"100%",borderCollapse:"collapse",fontSize:15,...style}}>
    <thead><tr>{columns.map((c,i)=><th key={i} style={{textAlign:c.align||"left",padding:"10px 12px",fontSize:13,fontWeight:600,color:"var(--fg-muted)",borderBottom:facts?"3px solid var(--fg)":"1.5px solid var(--border)"}}>{c.header}</th>)}</tr></thead>
    <tbody>{rows.map((r,ri)=><tr key={ri}>{columns.map((c,ci)=><td key={ci} style={{padding:"12px",textAlign:c.align||"left",borderBottom:"1px solid var(--border)",fontFamily:c.mono?"var(--font-mono)":"inherit",fontWeight:c.mono?500:400}}>{r[c.key]}</td>)}</tr>)}</tbody>
  </table>;
}
