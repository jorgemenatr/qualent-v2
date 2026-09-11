import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Input } from "../../components/core/Input.jsx";
import { Textarea } from "../../components/core/Textarea.jsx";
import { Label } from "../../components/core/Label.jsx";
import { Select } from "../../components/core/Select.jsx";
import { Checkbox } from "../../components/core/Checkbox.jsx";
import { Card } from "../../components/core/Card.jsx";
import { Eyebrow } from "../../components/brand/Eyebrow.jsx";
import { Mascot } from "../../components/brand/Mascot.jsx";
import { Section } from "./Section.jsx";
export function Talk() {
  const [sent,setSent]=React.useState(false);
  return <Section style={{borderTop:0,paddingTop:72}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:56,alignItems:"start"}}>
      <div style={{display:"grid",gap:20}}>
        <Eyebrow>Let’s talk</Eyebrow>
        <h1 style={{font:"var(--type-h1)",letterSpacing:"var(--tracking-snug)"}}>17 minutes. No pitch.</h1>
        <p style={{font:"var(--type-lede)",color:"var(--fg-muted)"}}>15 minutes for us to listen. 2 minutes to talk next steps. You leave with a number, whether or not we work together.</p>
        <Mascot variant="labcoat" size={320}/>
      </div>
      <Card padding={32}>
        {sent?<div style={{display:"grid",gap:12,textAlign:"center",padding:24}}><Eyebrow>Prescription sent</Eyebrow><h3 style={{font:"var(--type-h2)"}}>We’ll be in touch within one business day.</h3><p style={{color:"var(--fg-muted)"}}>Side effects may include weekends.</p></div>:
        <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:"grid",gap:18}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div><Label htmlFor="n" required>Name</Label><Input id="n" placeholder="Jane Doe"/></div><div><Label htmlFor="e" required>Work email</Label><Input id="e" type="email" placeholder="jane@company.com"/></div></div>
          <div><Label htmlFor="c">Company</Label><Input id="c"/></div>
          <div><Label htmlFor="s" hint="Rough is fine">Team size</Label><Select id="s" placeholder="Choose…" options={["1–10","11–50","51–200","200+"]}/></div>
          <div><Label htmlFor="m">What’s the spreadsheet doing to you?</Label><Textarea id="m" rows={4} placeholder="Too many tabs. Not enough hours."/></div>
          <Checkbox label="Send me the research report too"/>
          <Button size="lg" type="submit">Book 17-minute diagnostic →</Button>
        </form>}
      </Card>
    </div>
  </Section>;
}
