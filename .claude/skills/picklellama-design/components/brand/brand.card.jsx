(async()=>{try{
let NS = ["PickleLlama","PickleLlamaDS","DS","DesignSystem"].map(k=>{try{return window[k]}catch(e){return null}}).find(v=>v&&(v.Button||v.Eyebrow)) || null;
if(!NS || !(NS.Button||NS.Eyebrow)) NS = await window.__loadDS(["./Eyebrow.jsx","./Stamp.jsx","./Wordmark.jsx","./Mascot.jsx","./Figure.jsx"]);
const {Button,Input,Textarea,Label,Select,Checkbox,Switch,Slider,Tabs,Card,CardTitle,CardText,Badge,Avatar,Separator,Table,Dialog,Eyebrow,Stamp,Wordmark,Mascot,Figure} = NS;
function App(){ return <>
<div className="row" style={{gap:24}}><Wordmark height={30}/><Mascot variant="square" size={56}/><Mascot variant="full" size={90}/><Mascot variant="animated" size={90}/><Mascot variant="standing" size={90}/><Mascot variant="labcoat" size={90}/><Mascot variant="farm" size={90}/></div>
<div className="row" style={{gap:24,alignItems:"flex-end"}}>
  <div><Eyebrow>Diagnosis:</Eyebrow><div style={{font:"var(--type-stamp)",fontSize:28,textTransform:"uppercase",marginTop:4}}>Chronic spreadsheets.</div></div>
  <Stamp>Treatable</Stamp><Stamp tone="brand" tilt={2}>Clinically proven</Stamp>
  <Figure value="$80M+" label="Investment platform"/><Figure value="0%" label="Busywork" tone="ink"/><Figure value="3×" label="Recruiter capacity" tone="lime"/>
</div>
<div style={{position:"relative",overflow:"hidden",height:110,background:"var(--bg-brand-soft)",borderRadius:12,display:"grid",placeItems:"center"}}><Mascot variant="watermark"/><Eyebrow tone="muted">Mascot watermark · 14% opacity</Eyebrow></div></>; }
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
}catch(e){console.error("card error:",e.message,e.stack)}})();
