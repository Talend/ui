import{F as t,j as e,J as g,r as u,K as w,S}from"./iframe-cBtRg4Zm.js";import{u as m}from"./index.esm-TRrikIvv.js";import"./preload-helper-PPVm8Dsz.js";const k={title:"Form/Fields/ToggleSwitch",component:t.ToggleSwitch},i=()=>e.jsxs(S,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"ToggleSwitch"}),e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"ToggleSwitch disabled",disabled:!0}),e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"ToggleSwitch read-only",readOnly:!0}),e.jsx(t.ToggleSwitch,{name:"time",label:"ToggleSwitch checked",defaultChecked:!0}),e.jsx(t.ToggleSwitch,{name:"time",label:"ToggleSwitch checked disabled",defaultChecked:!0,disabled:!0}),e.jsx(t.ToggleSwitch,{name:"time",label:"ToggleSwitch checked read-only",defaultChecked:!0,readOnly:!0})]}),a=()=>e.jsxs(e.Fragment,{children:[e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"ToggleSwitch inline",isInline:!0}),e.jsx("span",{children:" "}),e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"ToggleSwitch inline",isInline:!0,defaultChecked:!0})]}),r=()=>e.jsx("div",{style:{width:"200px"},children:e.jsx(t.ToggleSwitch,{placeholder:"Placeholder",name:"time",label:"Label with a lot of content, too much probably, and most certainly enough to generate a line break in this small box."})}),c=()=>{const{register:l,watch:s}=m(),d=s("option-a");return e.jsxs(t,{children:[e.jsxs(t.Fieldset,{legend:"Control switch state",required:!0,children:[e.jsx(t.ToggleSwitch,{label:"Toggle all",...l("option-a")}),e.jsx(t.ToggleSwitch,{label:"Controlled switch",checked:d,...l("option-b")})]}),e.jsx(t.Buttons,{children:e.jsx(g,{onClick:()=>{},type:"submit",children:"Submit"})})]})},n=()=>{const{register:l,handleSubmit:s,watch:d}=m(),[h,p]=u.useState(),o=d();return e.jsxs(t,{onSubmit:s(p),children:[h&&e.jsx(w,{title:"Form data",description:JSON.stringify(h,null,2),withBackground:!0}),e.jsxs(t.Fieldset,{legend:"Enabled",children:[e.jsx(t.ToggleSwitch,{label:"Option a",...l("option-a"),checked:o["option-a"]}),e.jsx(t.ToggleSwitch,{label:"Option b",defaultChecked:!0,...l("option-b"),checked:o["option-b"]})]}),e.jsxs(t.Fieldset,{legend:"Read only",readOnly:!0,children:[e.jsx(t.ToggleSwitch,{label:"Option c",...l("option-c"),checked:o["option-c"]}),e.jsx(t.ToggleSwitch,{label:"Option d",defaultChecked:!0,...l("option-d"),checked:o["option-d"]})]}),e.jsxs(t.Fieldset,{legend:"Disabled",disabled:!0,children:[e.jsx(t.ToggleSwitch,{label:"Option e",disabled:!0,...l("option-e"),checked:o["option-e"]}),e.jsx(t.ToggleSwitch,{label:"Option f",defaultChecked:!0,disabled:!0,...l("option-f"),checked:o["option-f"]})]}),e.jsx(t.Buttons,{children:e.jsx(g,{onClick:()=>{},type:"submit",children:"Submit"})})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch" />
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch disabled" disabled />
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch read-only" readOnly />
        <Form.ToggleSwitch name="time" label="ToggleSwitch checked" defaultChecked />
        <Form.ToggleSwitch name="time" label="ToggleSwitch checked disabled" defaultChecked disabled />
        <Form.ToggleSwitch name="time" label="ToggleSwitch checked read-only" defaultChecked readOnly />
    </StackVertical>`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <>
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch inline" isInline />
        <span> </span>
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="ToggleSwitch inline" isInline defaultChecked />
    </>`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
  width: '200px'
}}>
        <Form.ToggleSwitch placeholder="Placeholder" name="time" label="Label with a lot of content, too much probably, and most certainly enough to generate a line break in this small box." />
    </div>`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    watch
  } = useForm();
  const optionA = watch('option-a');
  return <Form>
            <Form.Fieldset legend="Control switch state" required>
                <Form.ToggleSwitch label="Toggle all" {...register('option-a')} />
                <Form.ToggleSwitch label="Controlled switch" checked={optionA} {...register('option-b')} />
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonPrimary onClick={() => {}} type="submit">
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...c.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    handleSubmit,
    watch
  } = useForm<Inputs>();
  const [formData, setFormData] = useState<null | Inputs>();
  const watchAllFields = watch();
  return <Form onSubmit={handleSubmit(setFormData)}>
            {formData && <InlineMessageInformation title={'Form data'} description={JSON.stringify(formData, null, 2)} withBackground />}
            <Form.Fieldset legend="Enabled">
                <Form.ToggleSwitch label="Option a" {...register('option-a')} checked={watchAllFields['option-a']} />
                <Form.ToggleSwitch label="Option b" defaultChecked {...register('option-b')} checked={watchAllFields['option-b']} />
            </Form.Fieldset>
            <Form.Fieldset legend="Read only" readOnly>
                <Form.ToggleSwitch label="Option c" {...register('option-c')} checked={watchAllFields['option-c']} />
                <Form.ToggleSwitch label="Option d" defaultChecked {...register('option-d')} checked={watchAllFields['option-d']} />
            </Form.Fieldset>
            <Form.Fieldset legend="Disabled" disabled>
                <Form.ToggleSwitch label="Option e" disabled {...register('option-e')} checked={watchAllFields['option-e']} />
                <Form.ToggleSwitch label="Option f" defaultChecked disabled {...register('option-f')} checked={watchAllFields['option-f']} />
            </Form.Fieldset>
            <Form.Buttons>
                <ButtonPrimary onClick={() => {}} type="submit">
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...n.parameters?.docs?.source}}};const x=["ToggleSwitchStates","ToggleSwitchInline","ToggleSwitchWithLongLabel","ToggleSwitchControlled","ToggleSwitchReactHooksForm"];export{c as ToggleSwitchControlled,a as ToggleSwitchInline,n as ToggleSwitchReactHooksForm,i as ToggleSwitchStates,r as ToggleSwitchWithLongLabel,x as __namedExportsOrder,k as default};
