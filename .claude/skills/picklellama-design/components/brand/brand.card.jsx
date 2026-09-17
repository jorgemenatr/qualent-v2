(async()=>{try{
let NS = ["PickleLlama","PickleLlamaDS","DS","DesignSystem"].map(k=>{try{return window[k]}catch(e){return null}}).find(v=>v&&(v.Button||v.Eyebrow)) || null;
if(!NS || !(NS.Button||NS.Eyebrow)) NS = await window.__loadDS(["./Eyebrow.jsx","./Stamp.jsx","./Wordmark.jsx","./Mascot.jsx","./Figure.jsx","./Motion.jsx"]);
const {Button,Input,Textarea,Label,Select,Checkbox,Switch,Slider,Tabs,Card,CardTitle,CardText,Badge,Avatar,Separator,Table,Dialog,Eyebrow,Stamp,Wordmark,Mascot,Figure} = NS;
function App(){ return <>
<div className="row" style={{gap:24}}><Wordmark height={30}/><Mascot variant="square" size={56}/><Mascot variant="full" size={90}/><Mascot variant="animated" size={90}/><Mascot variant="standing" size={90}/><Mascot variant="labcoat" size={90}/><Mascot variant="farm" size={90}/></div>
<div className="row" style={{gap:24,alignItems:"flex-end"}}>
  <div><Eyebrow>Diagnosis:</Eyebrow><div style={{font:"var(--type-stamp)",fontSize:28,textTransform:"uppercase",marginTop:4}}>Chronic spreadsheets.</div></div>
  <Stamp>Treatable</Stamp><Stamp tone="brand" tilt={2}>Clinically proven</Stamp>
  <Figure value="$80M+" label="Investment platform"/><Figure value="0%" label="Busywork" tone="ink"/><Figure value="3×" label="Recruiter capacity" tone="lime"/>
</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
  <div style={{position:"relative",overflow:"hidden",height:150,background:"var(--bg-brand-soft)",borderRadius:12,display:"grid",placeItems:"center"}}><Mascot variant="watermark"/><Eyebrow tone="muted">Watermark peeks in · 700ms</Eyebrow></div>
  <div style={{height:150,background:"var(--bg-elevated)",border:"1px solid var(--border)",borderRadius:12,display:"flex",alignItems:"center",gap:16,padding:"0 16px"}}><Mascot variant="labcoat" size={130}/><div style={{display:"grid",gap:8}}><Eyebrow>Live eyes</Eyebrow><span style={{fontSize:13,color:"var(--fg-muted)"}}>Breathes · blinks · pupils follow the cursor</span><span style={{fontSize:22}}><Typed text="Chronic spreadsheets."/></span></div></div>
</div>
<TwoTone lines={["Spreadsheets?","There’s a cure."]} size="700 40px/1.02 var(--font-sans)"/></>; }
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
}catch(e){console.error("card error:",e.message,e.stack)}})();
