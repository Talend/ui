import{e as p,o as l,j as n}from"./iframe-BfvfSxZh.js";import{A as m}from"./Action.connect-C8WNeJ3h.js";import{g as u,A as f}from"./Actions.connect-DYoV1o6w.js";import{A as g}from"./ActionDropdown.connect-BAqN6Ag-.js";import{A as h}from"./ActionSplitDropdown.connect-DkHtC62l.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-CNLJkwtc.js";import"./actionOnClick-Da85RVMt.js";const A={Action:m,Actions:f,ActionDropdown:g,ActionSplitDropdown:h};function d(t){return typeof t=="string"?{actionId:t}:t}function x(t,{actionIds:r}){const o={renderers:u(A)};if(r){o.actions={};const{left:e,right:c}=r;e&&(o.actions.left=e.map(d)),c&&(o.actions.right=c.map(d))}return o}function w(t,r,o){const e={...o,...t,...r};return delete e.actionIds,e}const i=p({mapStateToProps:x,mergeProps:w,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(l),{action:s}=__STORYBOOK_MODULE_ACTIONS__,I=[{label:"Preparations",icon:"talend-dataprep",onClick:s("Preparations clicked"),bsStyle:"primary"},{label:"Datasets",icon:"talend-datasets",onClick:s("Datasets clicked")},{label:"Favorites",icon:"talend-star",onClick:s("Favorites clicked")},{displayMode:"dropdown",label:"related items",icon:"talend-file-xls-o",items:[{label:"document 1",onClick:s("document 1 click")},{label:"document 2",onClick:s("document 2 click")}]}],_={title:"ActionBar"},a=()=>n.jsxs("div",{children:[n.jsx("p",{children:"using action ids"}),n.jsx(i,{actionIds:{left:["menu:first","menu:second","menu:third","menu:fourth"]}}),n.jsx("p",{children:"using btn groups"}),n.jsx(i,{actionIds:{left:[{displayMode:"btnGroup",actionIds:["menu:first","menu:second","menu:third"]}]}}),n.jsx("p",{children:"using dropdown"}),n.jsx(i,{actionIds:{left:[{displayMode:"dropdown",actionId:"menu:items"}]}}),n.jsx("p",{children:"using split dropdown"}),n.jsx(i,{actionIds:{left:[{displayMode:"splitDropdown",actionId:"menu:items"}]}}),n.jsx("p",{children:"Using pure component props"}),n.jsx(i,{actions:{left:I}})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div>
        <p>using action ids</p>
        <ActionBar actionIds={{
    left: ['menu:first', 'menu:second', 'menu:third', 'menu:fourth']
  }} />
        <p>using btn groups</p>
        <ActionBar actionIds={{
    left: [{
      displayMode: 'btnGroup',
      actionIds: ['menu:first', 'menu:second', 'menu:third']
    }]
  }} />
        <p>using dropdown</p>
        <ActionBar actionIds={{
    left: [{
      displayMode: 'dropdown',
      actionId: 'menu:items'
    }]
  }} />
        <p>using split dropdown</p>
        <ActionBar actionIds={{
    left: [{
      displayMode: 'splitDropdown',
      actionId: 'menu:items'
    }]
  }} />
        <p>Using pure component props</p>
        <ActionBar actions={{
    left: infos
  }} />
    </div>`,...a.parameters?.docs?.source}}};const O=["Default"];export{a as Default,O as __namedExportsOrder,_ as default};
