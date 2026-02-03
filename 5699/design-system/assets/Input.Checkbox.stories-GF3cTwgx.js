import{j as e}from"./index-BeRoqjfO.js";import{r as x}from"./iframe-0koiw-N4.js";import"./DialogBackdrop-BDgqVk1C.js";import{O as o,B as h,a as d,Q as p}from"./Skeleton-XhJlLQkP.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./index-osoKd-JR.js";import"./TalendDesignTokens-JgHEBmOa.js";import{u as m}from"./index.esm-DLl1hCb3.js";const u={title:"Form/Fields/Checkbox",component:o.Checkbox},c=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox"}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0})]}),a=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox",disabled:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0,disabled:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0,disabled:!0})]}),n=()=>e.jsxs(d,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(o.Checkbox,{name:"checkbox",label:"Checkbox",readOnly:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Indeterminate Checkbox",indeterminate:!0,readOnly:!0}),e.jsx(o.Checkbox,{name:"checkbox",label:"Checked Checkbox",checked:!0,readOnly:!0})]}),i=()=>{const{register:t,handleSubmit:b}=m(),[l,k]=x.useState();return e.jsxs(o,{onSubmit:b(k),children:[l&&e.jsx(p,{title:"Form data",description:JSON.stringify(l,null,2),withBackground:!0}),e.jsxs(o.Fieldset,{legend:"Pick one or multiple options",required:!0,children:[e.jsx(o.Checkbox,{label:"Option A",...t("option-a")}),e.jsx(o.Checkbox,{label:"Option B",checked:!0,...t("option-b")})]}),e.jsx(o.Fieldset,{legend:"Pick one or multiple inline options",required:!0,children:e.jsxs(o.Row,{children:[e.jsx(o.Checkbox,{label:"Inline option A",...t("inline-option-a")}),e.jsx(o.Checkbox,{label:"Inline option B",checked:!0,...t("inline-option-b")})]})}),e.jsxs(o.Fieldset,{legend:"Read only are sent",required:!0,readOnly:!0,children:[e.jsx(o.Checkbox,{label:"Option C",...t("option-c")}),e.jsx(o.Checkbox,{label:"Option D",checked:!0,...t("option-d")})]}),e.jsxs(o.Fieldset,{legend:"Disabled are not sent",required:!0,disabled:!0,children:[e.jsx(o.Checkbox,{label:"Option E",...t("option-e",{disabled:!0})}),e.jsx(o.Checkbox,{label:"Option F",checked:!0,...t("option-f",{disabled:!0})})]}),e.jsx(o.Buttons,{children:e.jsx(h,{type:"submit",onClick:()=>{},children:"Submit"})})]})},s=()=>{const{register:t,watch:b}=m(),l=b("option-a");return e.jsxs(o,{children:[e.jsxs(o.Fieldset,{legend:"Control checkbox state",required:!0,children:[e.jsx(o.Checkbox,{label:"Toggle all",...t("option-a")}),e.jsx(o.Checkbox,{name:"option-b",label:"Controlled checkbox",checked:l})]}),e.jsx(o.Buttons,{children:e.jsx(h,{type:"submit",onClick:()=>{},children:"Submit"})})]})},r=t=>e.jsx(o.Checkbox,{...t});r.args={label:"Checkbox",indeterminate:!1,readOnly:!1,disabled:!1};r.argTypes={label:{description:"Checkbox label",control:{type:"text"}},indeterminate:{description:"Checkbox is indeterminate or  not",control:{type:"boolean"}},checked:{description:"Checkbox is checked or not",control:{type:"boolean"}},readOnly:{description:"Checkbox is read only or not",control:{type:"boolean"}},disabled:{description:"Checkbox is disabled or not",control:{type:"boolean"}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked />
    </StackVertical>`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" disabled />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate disabled />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked disabled />
    </StackVertical>`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Checkbox name="checkbox" label="Checkbox" readOnly />
        <Form.Checkbox name="checkbox" label="Indeterminate Checkbox" indeterminate readOnly />
        <Form.Checkbox name="checkbox" label="Checked Checkbox" checked readOnly />
    </StackVertical>`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
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
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"(args: any) => <Form.Checkbox {...args} />",...r.parameters?.docs?.source}}};const C=["CheckboxFillStates","CheckboxFillStatesDisabled","CheckboxFillStatesReadonly","CheckboxReactHooksForm","CheckboxControlled","Basic"],I=Object.freeze(Object.defineProperty({__proto__:null,Basic:r,CheckboxControlled:s,CheckboxFillStates:c,CheckboxFillStatesDisabled:a,CheckboxFillStatesReadonly:n,CheckboxReactHooksForm:i,__namedExportsOrder:C,default:u},Symbol.toStringTag,{value:"Module"}));export{r as B,c as C,I as S,a,n as b,i as c,s as d};
