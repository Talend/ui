import{j as n}from"./iframe-DQMeqIpM.js";import{S as t}from"./SidePanel.connect-D1WiCknY.js";import"./preload-helper-PPVm8Dsz.js";const s=[{componentId:"first",href:"/storybook"},{componentId:"second",href:"/foo"},{componentId:"configuration",href:"/configuration"}],i={title:"SidePanel"},e=()=>n.jsx(t,{actions:s}),o=()=>n.jsx(t,{actionIds:["menu:first","menu:second","menu:third"],components:{"before-actions":[{component:"FilterBar",docked:!1}]}});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"() => <SidePanel actions={actions} />",...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <SidePanel actionIds={['menu:first', 'menu:second', 'menu:third']} components={{
  'before-actions': [{
    component: 'FilterBar',
    docked: false
  }]
}} />`,...o.parameters?.docs?.source}}};const d=["Default","InjectedSettings"];export{e as Default,o as InjectedSettings,d as __namedExportsOrder,i as default};
