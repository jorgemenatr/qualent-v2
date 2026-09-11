import React from "react";
import { Mascot } from "../../components/brand/Mascot.jsx";
export function Footer({ onNav=()=>{} }) {
  const cols = {Process:[["First meeting","first-meeting"],["Research report","research"],["Problem identification","problem-identification"],["Implementation","implementation"],["Partnership","partnership"]],Resources:[["Learn","learn"],["Pricing","pricing"],["Controversial opinions","opinions"],["Proof","proof"]],Company:[["About","about"],["Who we work with","who"],["Careers","careers"],["Contact","talk"]]};
  return <footer style={{borderTop:"1px solid var(--border)",background:"var(--bg-subtle)"}}>
    <div style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"56px var(--gutter) 32px",display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr 1fr",gap:32}}>
      <div><Mascot variant="full" size={150}/></div>
      {Object.entries(cols).map(([h,items])=><div key={h}><h3 style={{fontSize:14,fontWeight:700,marginBottom:14}}>{h}</h3><ul style={{listStyle:"none",padding:0,display:"grid",gap:10}}>{items.map(([i,k])=><li key={k}><a href="#" onClick={e=>{e.preventDefault();onNav(k)}} style={{fontSize:14,color:"var(--fg-muted)"}}>{i}</a></li>)}</ul></div>)}
    </div>
    <div style={{maxWidth:"var(--container-md)",margin:"0 auto",padding:"20px var(--gutter) 32px",borderTop:"1px solid var(--border)",fontSize:13,color:"var(--fg-muted)",display:"flex",justifyContent:"space-between"}}><span>© 2026 PickleLlama. All rights reserved.</span><span>Feel better. Work smarter.</span></div>
  </footer>;
}
