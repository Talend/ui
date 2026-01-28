import{j as e}from"./iframe-Bku7JZgU.js";import{U as t}from"./DialogBackdrop-DyNbZHzC.js";import"./Skeleton-lAOX6Dys.js";import{a as n}from"./StackItem-D3oZqRlk.js";import"./QualityBar.component-DMb0rk5B.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-CenypqmD.js";import"./index-64NF8RCI.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-CaUSRA9n.js";import"./RatioBar.component-Ble0i3v5.js";const h={title:"Navigation/Stepper/Step",component:t.Step},a=()=>e.jsxs(n,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Step.Skeleton,{}),e.jsx(t.Step.Validated,{"data-index":1,title:"Lorem Ipsum"}),e.jsx(t.Step.InProgress,{"data-index":2,title:"Lorem Ipsum"}),e.jsx(t.Step.Enabled,{"data-index":3,title:"Lorem Ipsum"}),e.jsx(t.Step.Disabled,{"data-index":3,title:"Lorem Ipsum"}),e.jsx(t.Step.Disabled,{tooltip:"Here is why","data-index":3,title:"Lorem Ipsum"})]}),o=()=>e.jsxs(n,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Step.Validated,{"data-index":1,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.InProgress,{"data-index":2,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Enabled,{"data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Disabled,{"data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Disabled,{tooltip:"Here is why","data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"})]}),r=({variant:s,index:i,...d})=>{const p=t.Step[s];return p.displayName=`Step.${s}`,e.jsx(p,{"data-index":i,...d})};r.argTypes={variant:{description:"Step variation",control:{type:"select"},options:["Skeleton","Enabled","Validated","InProgress"]},index:{description:"Step number",control:{type:"number"}},title:{description:"Step title",control:{type:"text"}}};r.args={variant:"Skeleton",index:1,title:"Lorem ipsum"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Stepper.Step.Skeleton />
        <Stepper.Step.Validated data-index={1} title="Lorem Ipsum" />
        <Stepper.Step.InProgress data-index={2} title="Lorem Ipsum" />
        <Stepper.Step.Enabled data-index={3} title="Lorem Ipsum" />
        <Stepper.Step.Disabled data-index={3} title="Lorem Ipsum" />
        <Stepper.Step.Disabled tooltip="Here is why" data-index={3} title="Lorem Ipsum" />
    </StackVertical>`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Stepper.Step.Validated data-index={1} title="Lorem Ipsum dolor sit amet non consectetur" />
        <Stepper.Step.InProgress data-index={2} title="Lorem Ipsum dolor sit amet non consectetur" />
        <Stepper.Step.Enabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
        <Stepper.Step.Disabled data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
        <Stepper.Step.Disabled tooltip="Here is why" data-index={3} title="Lorem Ipsum dolor sit amet non consectetur" />
    </StackVertical>`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`({
  variant,
  index,
  ...props
}: any) => {
  const StepComponent = Stepper.Step[variant];
  StepComponent.displayName = \`Step.\${variant}\`;
  return <StepComponent data-index={index} {...props} />;
}`,...r.parameters?.docs?.source}}};const f=["Default","Overflow","Usage"];export{a as Default,o as Overflow,r as Usage,f as __namedExportsOrder,h as default};
