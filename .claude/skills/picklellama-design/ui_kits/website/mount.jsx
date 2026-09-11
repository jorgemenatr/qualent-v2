(async()=>{try{
  const {App} = await window.__loadDS(["./App.jsx"]);
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
}catch(e){console.error("kit error:",e.message,e.stack)}})();
