Data table; set `mono` on numeric columns and `facts` for the nutrition-label thick header rule.
```jsx
<Table facts columns={[{key:"k",header:"Amount per serving"},{key:"v",header:"% Daily value",align:"right",mono:true}]} rows={[{k:"Efficiency",v:"100%"},{k:"Busywork",v:"0%"}]}/>
```