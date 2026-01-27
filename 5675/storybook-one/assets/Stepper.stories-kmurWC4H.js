import{j as e}from"./iframe-DIB3-0BR.js";import{U as t,D as l}from"./DialogBackdrop-RDLrSwsF.js";import"./Skeleton-BFPFErrJ.js";import{a as d}from"./StackItem-qSIpPSEC.js";import"./QualityBar.component-D1Er04NA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-DQ7pcu8v.js";import"./index-D8uPicF6.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-Dw8bnBfP.js";import"./RatioBar.component-D-VTL4ax.js";const C={title:"Navigation/Stepper/Stepper",component:t},p=()=>e.jsxs(t,{children:[e.jsx(t.Step.Validated,{title:"Validated step"}),e.jsx(t.Step.InProgress,{title:"Current step"}),e.jsx(t.Step.Enabled,{title:"Next step"}),e.jsx(t.Step.Enabled,{title:"Next step"})]}),a=()=>e.jsxs(t.Horizontal,{children:[e.jsx(t.Step.Validated,{title:"Validated step"}),e.jsx(t.Step.InProgress,{title:"Current step"}),e.jsx(t.Step.Enabled,{title:"Next step"})]}),s=()=>e.jsxs(d,{gap:"M",justify:"center",align:"center",children:[e.jsx("h4",{children:"Vertical stepper"}),e.jsxs(t,{children:[e.jsx(t.Step.Validated,{title:"Validated step with copy that breaks the width limit"}),e.jsx(t.Step.InProgress,{title:"Current step with copy that breaks the width limit"})]}),e.jsx(l,{}),e.jsx("h4",{children:"Horizontal stepper"}),e.jsxs(t.Horizontal,{children:[e.jsx(t.Step.Validated,{title:"Validated step with copy that breaks the width limit"}),e.jsx(t.Step.InProgress,{title:"Current step with copy that breaks the width limit"})]})]}),r=({variant:i,...o})=>{const n=t[i];return n.displayName=`Stepper.${i}`,e.jsxs(n,{...o,children:[e.jsx(t.Step.Validated,{title:"Validated"}),e.jsx(t.Step.InProgress,{title:"In progress"}),e.jsx(t.Step.Enabled,{title:"Enabled"})]})};r.args={variant:"Vertical",currentStepIndex:1};r.argTypes={variant:{description:"Stepper variation",options:["Vertical","Horizontal"],control:{type:"select"}},currentStepIndex:{description:"Current step index",control:{type:"number"}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <Stepper>
        <Stepper.Step.Validated title="Validated step" />
        <Stepper.Step.InProgress title="Current step" />
        <Stepper.Step.Enabled title="Next step" />
        <Stepper.Step.Enabled title="Next step" />
    </Stepper>`,...p.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Stepper.Horizontal>
        <Stepper.Step.Validated title="Validated step" />
        <Stepper.Step.InProgress title="Current step" />
        <Stepper.Step.Enabled title="Next step" />
    </Stepper.Horizontal>`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="center" align="center">
        <h4>Vertical stepper</h4>
        <Stepper>
            <Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />
            <Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />
        </Stepper>
        <Divider />
        <h4>Horizontal stepper</h4>
        <Stepper.Horizontal>
            <Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />
            <Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />
        </Stepper.Horizontal>
    </StackVertical>`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`({
  variant,
  ...props
}: any) => {
  const StepperComponent = Stepper[variant];
  StepperComponent.displayName = \`Stepper.\${variant}\`;
  return <StepperComponent {...props}>
            <Stepper.Step.Validated title="Validated" />
            <Stepper.Step.InProgress title="In progress" />
            <Stepper.Step.Enabled title="Enabled" />
        </StepperComponent>;
}`,...r.parameters?.docs?.source}}};const I=["Vertical","Horizontal","Overflows","Usage"];export{a as Horizontal,s as Overflows,r as Usage,p as Vertical,I as __namedExportsOrder,C as default};
