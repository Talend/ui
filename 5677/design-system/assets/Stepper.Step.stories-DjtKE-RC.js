import{j as e}from"./index-B-4QAGRT.js";import{V as t}from"./DialogBackdrop-9Sis8N-G.js";import{a as p}from"./Skeleton-QTANCvJ0.js";import"./iframe-Bzc6Acpn.js";import"./useCopyToClipboard-5SsFVDgy.js";import"./index-BBitzEYX.js";import"./TalendDesignTokens-JgHEBmOa.js";const l={title:"Navigation/Stepper/Step",component:t.Step},a=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Step.Skeleton,{}),e.jsx(t.Step.Validated,{"data-index":1,title:"Lorem Ipsum"}),e.jsx(t.Step.InProgress,{"data-index":2,title:"Lorem Ipsum"}),e.jsx(t.Step.Enabled,{"data-index":3,title:"Lorem Ipsum"}),e.jsx(t.Step.Disabled,{"data-index":3,title:"Lorem Ipsum"}),e.jsx(t.Step.Disabled,{tooltip:"Here is why","data-index":3,title:"Lorem Ipsum"})]}),o=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Step.Validated,{"data-index":1,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.InProgress,{"data-index":2,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Enabled,{"data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Disabled,{"data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"}),e.jsx(t.Step.Disabled,{tooltip:"Here is why","data-index":3,title:"Lorem Ipsum dolor sit amet non consectetur"})]}),r=({variant:s,index:i,...d})=>{const n=t.Step[s];return n.displayName=`Step.${s}`,e.jsx(n,{"data-index":i,...d})};r.argTypes={variant:{description:"Step variation",control:{type:"select"},options:["Skeleton","Enabled","Validated","InProgress"]},index:{description:"Step number",control:{type:"number"}},title:{description:"Step title",control:{type:"text"}}};r.args={variant:"Skeleton",index:1,title:"Lorem ipsum"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
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
}`,...r.parameters?.docs?.source}}};const m=["Default","Overflow","Usage"],L=Object.freeze(Object.defineProperty({__proto__:null,Default:a,Overflow:o,Usage:r,__namedExportsOrder:m,default:l},Symbol.toStringTag,{value:"Module"}));export{a as D,o as O,L as S,r as U};
