import{j as n}from"./iframe-D7nf90uh.js";import{S as t}from"./SidePanel.connect-CkR1wpps.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-Cf5iRJkC.js";const r=[{componentId:"first",href:"/storybook"},{componentId:"second",href:"/foo"},{componentId:"configuration",href:"/configuration"}],d={title:"SidePanel"},e=()=>n.jsx(t,{actions:r}),o=()=>n.jsx(t,{actionIds:["menu:first","menu:second","menu:third"],components:{"before-actions":[{component:"FilterBar",docked:!1}]}});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"() => <SidePanel actions={actions} />",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <SidePanel actionIds={['menu:first', 'menu:second', 'menu:third']} components={{
  'before-actions': [{
    component: 'FilterBar',
    docked: false
  }]
}} />`,...o.parameters?.docs?.source}}};const m=["Default","InjectedSettings"];export{e as Default,o as InjectedSettings,m as __namedExportsOrder,d as default};
