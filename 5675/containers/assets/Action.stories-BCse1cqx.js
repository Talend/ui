import{j as e}from"./iframe-DSAcyFY1.js";import{A as i}from"./Action.connect-EucvbpGI.js";import"./preload-helper-PPVm8Dsz.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,l={label:"Click me",icon:"talend-cog",onClick:a("You clicked me"),payload:{type:"MY SUPER REDUX ACTION"}},s={onClick:a("You clicked me"),payload:{type:"MY SUPER REDUX ACTION"}},d={title:"Action"},o=()=>e.jsxs("div",{children:[e.jsx("p",{children:"Using actionId"}),e.jsx(i,{actionId:"menu:first"}),e.jsx(i,{actionId:"menu:items"}),e.jsx(i,{actionId:"menu:items-id"}),e.jsx("p",{children:"Using pure action props"}),e.jsx(i,{...l}),e.jsx("p",{children:"Using availableExpression (4 Actions 2 hidden)"}),e.jsx(i,{...s,label:"is True expression",availableExpression:{id:"isTrueExpression",args:[!0]}}),e.jsx(i,{...s,label:"should not be displayed: false expression",availableExpression:{id:"isTrueExpression",args:[]}}),e.jsx(i,{...s,label:"model has label",availableExpression:"modelHasLabel",model:{id:"foo",label:"bar"}}),e.jsx(i,{...s,label:"should not be displayed: model without label",availableExpression:"modelHasLabel",model:{id:"bar"}}),e.jsx("p",{children:"Using actions with overlay"}),e.jsx(i,{actionId:"action:overlay"})]});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <div>
        <p>Using actionId</p>
        <Action actionId="menu:first" />
        <Action actionId="menu:items" />
        <Action actionId="menu:items-id" />
        <p>Using pure action props</p>
        <Action {...myAction} />
        <p>Using availableExpression (4 Actions 2 hidden)</p>
        <Action {...eAction} label="is True expression" availableExpression={{
    id: 'isTrueExpression',
    args: [true]
  }} />
        <Action {...eAction} label="should not be displayed: false expression" availableExpression={{
    id: 'isTrueExpression',
    args: []
  }} />
        <Action {...eAction} label="model has label" availableExpression="modelHasLabel" model={{
    id: 'foo',
    label: 'bar'
  }} />
        <Action {...eAction} label="should not be displayed: model without label" availableExpression="modelHasLabel" model={{
    id: 'bar'
  }} />
        <p>Using actions with overlay</p>
        <Action actionId="action:overlay" />
    </div>`,...o.parameters?.docs?.source}}};const c=["Default"];export{o as Default,c as __namedExportsOrder,d as default};
