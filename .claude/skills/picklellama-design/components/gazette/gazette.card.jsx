(async()=>{try{
let NS = ["PickleLlama","PickleLlamaDS","DS","DesignSystem"].map(k=>{try{return window[k]}catch(e){return null}}).find(v=>v&&v.Masthead) || null;
if(!NS) NS = await window.__loadDS(["./Masthead.jsx","./Kicker.jsx","./NewsCard.jsx","./AdBreak.jsx","./Letters.jsx"]);
const {Masthead,Kicker,Dateline,LlamaQuote,DisclaimerBand,NewsCard,AdBreak,Letters,Classifieds} = NS;
function App(){ return <>
  <Masthead/>
  <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:20}}>
    <NewsCard size="lg" story={{section:"News",topic:"Logistics",title:"Logistics Firm Hires Fourth Dispatcher to Manage Spreadsheet That Tracks the Other Three",place:"Hamilton, Ont.",date:"Tuesday",dek:"The workbook contains 41 tabs and one macro nobody will touch.",art:"pose-standing.png"}}/>
    <div style={{display:"grid",gap:16,alignContent:"start"}}><LlamaQuote context="The Pickle Llama, asked whether the spreadsheet could be replaced">Yes.</LlamaQuote><NewsCard size="sm" story={{section:"Sighting",title:"Pickle Llama Found Standing in Dispatch Office at 5:40 A.M.; Staff Unsure How He Got In",place:"Thunder Bay, Ont.",tone:"breaking"}}/></div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><AdBreak kind="pharma"/><AdBreak kind="political"/><AdBreak kind="farms"/><AdBreak kind="lawyer"/></div>
  <Letters/>
  <Classifieds/>
</>; }
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
}catch(e){console.error("card error:",e.message,e.stack)}})();
