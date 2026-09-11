import React from "react";
export function Separator({dashed=false,vertical=false,style}) {
  return <div role="separator" style={vertical?{width:0,alignSelf:"stretch",borderLeft:dashed?"var(--rule-dashed)":"1px solid var(--border)",...style}:{height:0,borderTop:dashed?"var(--rule-dashed)":"1px solid var(--border)",...style}}/>;
}
