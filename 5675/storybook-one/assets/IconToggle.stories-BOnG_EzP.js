import{j as e,r as s}from"./iframe-BrV_C0lS.js";import{A as t}from"./ActionIconToggle.component-Tr4QZC5x.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D7vK3zVi.js";import"./TooltipTrigger.component-xTn3JdoU.js";import"./OverlayTrigger.component-BFqpcy8S.js";import"./RootCloseWrapper-Cplz5Qvz.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CWstWGjk.js";import"./Transition-C2lqVYsH.js";import"./Transition-DEWbpGS1.js";const p={icon:"talend-panel-opener-right",id:"my-inactive-action",label:"Click me, I'm inactive","data-feature":"actionicontoggle",onClick:()=>console.log("You clicked the inactive button"),tooltipPlacement:"top"},d={active:!0,icon:"talend-panel-opener-right",id:"my-active-action",label:"Click me, I'm inactive","data-feature":"actionicontoggle",onClick:()=>console.log("You clicked the active button"),tooltipPlacement:"top"},c="Action 1",i="Action 2",g=()=>{const[o,r]=s.useState(c),l={icon:"talend-panel-opener-right",tooltipPlacement:"top"};return e.jsxs(s.Fragment,{children:[e.jsx("p",{children:"Switch Button"}),e.jsx(t,{...l,label:c,active:o===c,disabled:o===c,onClick:()=>r(c)}),e.jsx(t,{...l,label:i,active:o===i,disabled:o===i,onClick:()=>r(i)})]})},f={title:"Components/Actions/IconToggle",component:t,tags:["autodocs"],decorators:[o=>e.jsx("div",{className:"col-lg-offset-2 col-lg-8",children:o()})]},n={render:()=>e.jsx("div",{children:e.jsx(g,{})})},a={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"Inactive (By default)"}),e.jsx(t,{...p}),e.jsx("p",{children:"Active"}),e.jsx(t,{...d}),e.jsx("p",{children:"With tick"}),e.jsx(t,{...p,tick:!0}),e.jsx("p",{children:"Active with tick"}),e.jsx(t,{...d,tick:!0})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <DisableActionIconToggle />
        </div>
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <p>Inactive (By default)</p>
            <ActionIconToggle {...inactiveIconToggle} />

            <p>Active</p>
            <ActionIconToggle {...activeIconToggle} />

            <p>With tick</p>
            <ActionIconToggle {...inactiveIconToggle} tick />

            <p>Active with tick</p>
            <ActionIconToggle {...activeIconToggle} tick />
        </div>
}`,...a.parameters?.docs?.source}}};const C=["DisableTheButtons","Default"];export{a as Default,n as DisableTheButtons,C as __namedExportsOrder,f as default};
