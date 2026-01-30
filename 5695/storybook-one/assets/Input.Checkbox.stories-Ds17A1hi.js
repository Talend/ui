import{j as e,r as x}from"./iframe-BPWKJ2_o.js";import"./DialogBackdrop-CrzrVb0J.js";import{F as o,B as h,x as p}from"./Skeleton-D9kfpN0R.js";import{a as d}from"./StackItem-CWCRAuJY.js";import"./QualityBar.component-CQHjCcWe.js";import{u as m}from"./index.esm-BXNGuhA9.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-TWX-3lPp.js";import"./index-Deb_DsOu.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-5lMdqHLm.js";import"./RatioBar.component-Bc2UGGoG.js";const R={title:"Form/Fields/Checkbox",component:o.Checkbox},a=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox"}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0})]}),n=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox",disabled:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0,disabled:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0,disabled:!0})]}),i=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox",readOnly:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0,readOnly:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0,readOnly:!0})]}),s=()=>{const{register:t,handleSubmit:b}=m(),[c,k]=x.useState();return e.jsxs(o,{onSubmit:b(k),children:[c&&e.jsx(p,{title:"Form data",description:JSON.stringify(c,null,2),withBackground:!0}),e.jsxs(o.Fieldset,{legend:"Pick one or multiple options",required:!0,children:[e.jsx(o.Checkbox,{label:"Option A",...t("option-a")}),e.jsx(o.Checkbox,{label:"Option B",checked:!0,...t("option-b")})]}),e.jsx(o.Fieldset,{legend:"Pick one or multiple inline options",required:!0,children:e.jsxs(o.Row,{children:[e.jsx(o.Checkbox,{label:"Inline option A",...t("inline-option-a")}),e.jsx(o.Checkbox,{label:"Inline option B",checked:!0,...t("inline-option-b")})]})}),e.jsxs(o.Fieldset,{legend:"Read only are sent",required:!0,readOnly:!0,children:[e.jsx(o.Checkbox,{label:"Option C",...t("option-c")}),e.jsx(o.Checkbox,{label:"Option D",checked:!0,...t("option-d")})]}),e.jsxs(o.Fieldset,{legend:"Disabled are not sent",required:!0,disabled:!0,children:[e.jsx(o.Checkbox,{label:"Option E",...t("option-e",{disabled:!0})}),e.jsx(o.Checkbox,{label:"Option F",checked:!0,...t("option-f",{disabled:!0})})]}),e.jsx(o.Buttons,{children:e.jsx(h,{type:"submit",onClick:()=>{},children:"Submit"})})]})},l=()=>{const{register:t,watch:b}=m(),c=b("option-a");return e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Control checkbox state",required:!0,children:[e.jsx(o.Checkbox,{label:"Toggle all",...t("option-a")}),e.jsx(o.Checkbox,{name:"option-b",label:"Controlled checkbox",checked:c})]}),e.jsx(o.Buttons,{children:e.jsx(h,{type:"submit",onClick:()=>{},children:"Submit"})})]})},r=t=>e.jsx(o.Checkbox,{...t});r.args={label:"Checkbox",indeterminate:!1,readOnly:!1,disabled:!1};r.argTypes={label:{description:"Checkbox label",control:{type:"text"}},indeterminate:{description:"Checkbox is indeterminate or  not",control:{type:"boolean"}},checked:{description:"Checkbox is checked or not",control:{type:"boolean"}},readOnly:{description:"Checkbox is read only or not",control:{type:"boolean"}},disabled:{description:"Checkbox is disabled or not",control:{type:"boolean"}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked />
    </StackVertical>`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" disabled />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate disabled />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked disabled />
    </StackVertical>`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" readOnly />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate readOnly />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked readOnly />
    </StackVertical>`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    handleSubmit
  } = useForm();
  const [formData, setFormData] = useState<Inputs>();
  return <Form onSubmit={handleSubmit(setFormData)}>
            {formData && <InlineMessageInformation title="Form data" description={JSON.stringify(formData, null, 2)} withBackground />}
            <Form.Fieldset legend="Pick one or multiple options" required>
                <Form.Checkbox label="Option A" {...register('option-a')} />
                <Form.Checkbox label="Option B" checked {...register('option-b')} />
            </Form.Fieldset>
            <Form.Fieldset legend="Pick one or multiple inline options" required>
                <Form.Row>
                    <Form.Checkbox label="Inline option A" {...register('inline-option-a')} />
                    <Form.Checkbox label="Inline option B" checked {...register('inline-option-b')} />
                </Form.Row>
            </Form.Fieldset>
            <Form.Fieldset legend="Read only are sent" required readOnly>
                <Form.Checkbox label="Option C" {...register('option-c')} />
                <Form.Checkbox label="Option D" checked {...register('option-d')} />
            </Form.Fieldset>
            <Form.Fieldset legend="Disabled are not sent" required disabled>
                {/* @see https://github.com/react-hook-form/react-hook-form/issues/6690 */}
                <Form.Checkbox label="Option E" {...register('option-e', {
        disabled: true
      })} />
                <Form.Checkbox label="Option F" checked {...register('option-f', {
        disabled: true
      })} />
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    watch
  } = useForm();
  const optionA = watch('option-a');
  return <Form>
            <Form.Fieldset legend="Control checkbox state" required>
                <Form.Checkbox label="Toggle all" {...register('option-a')} />
                <Form.Checkbox name="option-b" label="Controlled checkbox" checked={optionA} />
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"(args: any) => <Form.Checkbox {...args} />",...r.parameters?.docs?.source}}};const P=["CheckboxFillStates","CheckboxFillStatesDisabled","CheckboxFillStatesReadonly","CheckboxReactHooksForm","CheckboxControlled","Basic"];export{r as Basic,l as CheckboxControlled,a as CheckboxFillStates,n as CheckboxFillStatesDisabled,i as CheckboxFillStatesReadonly,s as CheckboxReactHooksForm,P as __namedExportsOrder,R as default};
