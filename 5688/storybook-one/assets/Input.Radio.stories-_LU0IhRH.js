import{j as e,r as u}from"./iframe-DRCDqYKx.js";import"./DialogBackdrop-CHnfAQ1W.js";import{F as o,x as m,B as b}from"./Skeleton-D2WvrjHU.js";import{a as d}from"./StackItem-BAiyfTPs.js";import"./QualityBar.component-BDcgQgqR.js";import{u as R}from"./index.esm-CfInih9k.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip--vE932z8.js";import"./index-DDH2bbOn.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DAA4VcSW.js";import"./RatioBar.component-BiejovRW.js";const D={title:"Form/Fields/Radio",component:o.Radio},t=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Radio,{name:"radio-one",value:"option-a",label:"Radio"}),e.jsx(o.Radio,{name:"radio-one",value:"option-b",label:"Checked Radio",defaultChecked:!0})]}),r=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Radio,{name:"radio-two",value:"option-a",label:"Radio",disabled:!0}),e.jsx(o.Radio,{name:"radio-two",value:"option-b",label:"Checked Radio",defaultChecked:!0,disabled:!0})]}),l=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Radio,{name:"radio-three",value:"option-a",label:"Radio",readOnly:!0}),e.jsx(o.Radio,{name:"radio-three",value:"option-b",label:"Checked Radio",defaultChecked:!0,readOnly:!0})]}),n=()=>{const{register:a,handleSubmit:c}=R(),[s,p]=u.useState();return e.jsxs(o,{onSubmit:c(p),children:[s&&e.jsx(m,{title:"Form data",description:JSON.stringify(s,null,2),withBackground:!0}),e.jsxs(o.Fieldset,{legend:"Pick one option",required:!0,children:[e.jsx(o.Radio,{label:"Option A",value:"option-a",...a("option")}),e.jsx(o.Radio,{label:"Option B",value:"option-b",defaultChecked:!0,...a("option")})]}),e.jsx(o.Fieldset,{legend:"Pick one inline option",required:!0,children:e.jsxs(o.Row,{children:[e.jsx(o.Radio,{label:"Inline option A",value:"option-a",...a("inline-option")}),e.jsx(o.Radio,{label:"Inline option B",value:"option-b",defaultChecked:!0,...a("inline-option")})]})}),e.jsxs(o.Fieldset,{legend:"Read only are sent",required:!0,readOnly:!0,children:[e.jsx(o.Radio,{label:"Option C",value:"option-c",...a("readonly-option")}),e.jsx(o.Radio,{label:"Option D",value:"option-d",checked:!0,...a("readonly-option")})]}),e.jsxs(o.Fieldset,{legend:"Disabled are not sent",required:!0,disabled:!0,children:[e.jsx(o.Radio,{label:"Option E",value:"option-e",disabled:!0,...a("disabled-inline-option")}),e.jsx(o.Radio,{label:"Option F",value:"option-f",checked:!0,disabled:!0,...a("disabled-inline-option")})]}),e.jsx(o.Buttons,{children:e.jsx(b,{onClick:()=>{},type:"submit",children:"Submit"})})]})},i=a=>e.jsx(o.Radio,{...a});i.args={label:"Radio",checked:!1,readOnly:!1,disabled:!1};i.argTypes={label:{description:"Radio label",control:{type:"text"}},checked:{description:"Radio is checked or  not",control:{type:"boolean"}},readOnly:{description:"Radio is read only or not",control:{type:"boolean"}},disabled:{description:"Radio is disabled or not",control:{type:"boolean"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Radio name="radio-one" value="option-a" label="Radio" />
        <Form.Radio name="radio-one" value="option-b" label="Checked Radio" defaultChecked />
    </StackVertical>`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Radio name="radio-two" value="option-a" label="Radio" disabled />
        <Form.Radio name="radio-two" value="option-b" label="Checked Radio" defaultChecked disabled />
    </StackVertical>`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Radio name="radio-three" value="option-a" label="Radio" readOnly />
        <Form.Radio name="radio-three" value="option-b" label="Checked Radio" defaultChecked readOnly />
    </StackVertical>`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    handleSubmit
  } = useForm<Inputs>();
  const [formData, setFormData] = useState<null | Inputs>();
  return <Form onSubmit={handleSubmit(setFormData)}>
            {formData && <InlineMessageInformation title={'Form data'} description={JSON.stringify(formData, null, 2)} withBackground />}
            <Form.Fieldset legend="Pick one option" required>
                <Form.Radio label="Option A" value="option-a" {...register('option')} />
                <Form.Radio label="Option B" value="option-b" defaultChecked {...register('option')} />
            </Form.Fieldset>
            <Form.Fieldset legend="Pick one inline option" required>
                <Form.Row>
                    <Form.Radio label="Inline option A" value="option-a" {...register('inline-option')} />
                    <Form.Radio label="Inline option B" value="option-b" defaultChecked {...register('inline-option')} />
                </Form.Row>
            </Form.Fieldset>
            <Form.Fieldset legend="Read only are sent" required readOnly>
                <Form.Radio label="Option C" value="option-c" {...register('readonly-option')} />
                <Form.Radio label="Option D" value="option-d" checked {...register('readonly-option')} />
            </Form.Fieldset>
            <Form.Fieldset legend="Disabled are not sent" required disabled>
                <Form.Radio label="Option E" value="option-e" disabled {...register('disabled-inline-option')} />
                <Form.Radio label="Option F" value="option-f" checked disabled {...register('disabled-inline-option')} />
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonPrimary onClick={() => {}} type="submit">
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"(args: any) => <Form.Radio {...args} />",...i.parameters?.docs?.source}}};const I=["RadioFillStates","RadioFillStatesDisabled","RadioFillStatesReadonly","RadioReactHooksForm","Basic"];export{i as Basic,t as RadioFillStates,r as RadioFillStatesDisabled,l as RadioFillStatesReadonly,n as RadioReactHooksForm,I as __namedExportsOrder,D as default};
