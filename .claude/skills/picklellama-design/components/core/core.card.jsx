(async()=>{try{
let NS = ["PickleLlama","PickleLlamaDS","DS","DesignSystem"].map(k=>{try{return window[k]}catch(e){return null}}).find(v=>v&&(v.Button||v.Eyebrow)) || null;
if(!NS || !(NS.Button||NS.Eyebrow)) NS = await window.__loadDS(["./Button.jsx","./Input.jsx","./Textarea.jsx","./Label.jsx","./Select.jsx","./Checkbox.jsx","./Switch.jsx","./Slider.jsx","./Tabs.jsx","./Card.jsx","./Badge.jsx","./Avatar.jsx","./Separator.jsx","./Table.jsx","./Dialog.jsx"]);
const {Button,Input,Textarea,Label,Select,Checkbox,Switch,Slider,Tabs,Card,CardTitle,CardText,Badge,Avatar,Separator,Table,Dialog,Eyebrow,Stamp,Wordmark,Mascot,Figure} = NS;
function App(){ return <>
<div className="row"><Button>Book 17-minute diagnostic</Button><Button variant="secondary">See our guarantee</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button><Button variant="link">Link</Button></div>
<div className="row"><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><Button iconOnly aria-label="menu">☰</Button><Button disabled>Disabled</Button></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
  <div><Label htmlFor="e" required>Work email</Label><Input id="e" placeholder="you@company.com"/></div>
  <div><Label htmlFor="s" hint="Rough is fine">Team size</Label><Select placeholder="Choose…" options={["1–10","11–50","51–200","200+"]}/></div>
  <div><Label>Invalid</Label><Input invalid defaultValue="not-an-email"/></div>
</div>
<div className="row" style={{gap:24}}><Checkbox defaultChecked label="Weekends"/><Checkbox label="Leaving at 5"/><Switch defaultChecked label="Email the report"/><div style={{flex:1,minWidth:200}}><Slider min={0} max={40} defaultValue={12} format={v=>v+" h/wk"}/></div></div>
<Tabs items={[{label:"Overview"},{label:"Results"},{label:"Stack"}]}/>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
  <Card padding={16}><CardTitle>Default</CardTitle><CardText>White on paper, 1px border.</CardText></Card>
  <Card variant="soft" padding={16}><CardTitle>Soft</CardTitle><CardText>Lime wash.</CardText></Card>
  <Card variant="loud" padding={16}><CardTitle>Loud</CardTitle><CardText style={{color:"var(--fg-on-lime)"}}>Lime-300 block.</CardText></Card>
  <Card variant="inverse" padding={16}><CardTitle>Inverse</CardTitle><CardText style={{color:"var(--pl-grey-300)"}}>Charcoal.</CardText></Card>
</div>
<div className="row"><Badge>Active</Badge><Badge tone="neutral">On hold</Badge><Badge tone="info">Completed</Badge><Badge tone="danger">Urgent</Badge><Badge tone="lime">New</Badge><Badge variant="solid">Solid</Badge><Badge tone="danger" variant="stamp">Treatable</Badge><Avatar name="John Heslop"/><Avatar name="PL" size={28}/></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
  <Table facts columns={[{key:"k",header:"Amount per serving"},{key:"v",header:"% Daily value",align:"right",mono:true}]} rows={[{k:"Efficiency",v:"100%"},{k:"Manual work",v:"0%"},{k:"Busywork",v:"0%"}]}/>
  <Dialog inline open title="Get the report" description="We'll email you the PDF. No newsletter, no drip sequence." actions={<><Button variant="ghost">Cancel</Button><Button>Send it</Button></>}><Input placeholder="you@company.com"/></Dialog>
</div></>; }
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
}catch(e){console.error("card error:",e.message,e.stack)}})();
