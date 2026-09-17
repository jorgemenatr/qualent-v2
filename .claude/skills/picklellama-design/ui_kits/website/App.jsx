import React from "react";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Home } from "./Home.jsx";
import { Proof } from "./Proof.jsx";
import { Pricing } from "./Pricing.jsx";
import { Talk } from "./Talk.jsx";
import { Process } from "./Process.jsx";
import { FirstMeeting, Research, ProblemId, Implementation, Partnership } from "./Steps.jsx";
import { Who } from "./Who.jsx";
import { About, Careers, Opinions } from "./About.jsx";
import { Learn, CaseStudy } from "./Learn.jsx";
import { GazetteFront, GazetteArticle, GazetteLetters, GazetteArchive } from "./Gazette.jsx";
export function App() {
  const [page,setPage]=React.useState(()=>location.hash.replace("#","")||"home");
  const nav=p=>{setPage(p);location.hash=p;window.scrollTo(0,0)};
  React.useEffect(()=>{const h=()=>setPage(location.hash.replace("#","")||"home");addEventListener("hashchange",h);return()=>removeEventListener("hashchange",h)},[]);
  const pages={home:Home,proof:Proof,"case-study":CaseStudy,pricing:Pricing,talk:Talk,services:Process,"first-meeting":FirstMeeting,research:Research,"problem-identification":ProblemId,implementation:Implementation,partnership:Partnership,who:Who,about:About,careers:Careers,opinions:Opinions,learn:Learn,gazette:GazetteFront,"gazette-article":GazetteArticle,"gazette-letters":GazetteLetters,"gazette-archive":GazetteArchive};
  const Page=pages[page]||Home;
  const navKey={"first-meeting":"services",research:"services","problem-identification":"services",implementation:"services",partnership:"services","case-study":"proof",careers:"about",opinions:"learn","gazette-article":"gazette","gazette-letters":"gazette","gazette-archive":"gazette"}[page]||page;
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <Header page={navKey} onNav={nav}/>
    <main style={{flex:1}}><Page onNav={nav}/></main>
    <Footer onNav={nav}/>
  </div>;
}
