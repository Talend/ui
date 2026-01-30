import{j as e,r as d}from"./iframe-ChHbVRNu.js";import"./DialogBackdrop-EiWX6JkY.js";import{F as a,x as h,c as g,B as F}from"./Skeleton-DKpQQpA8.js";import{a as p}from"./StackItem-CrvFkQM1.js";import"./QualityBar.component-DhdUBXKt.js";import{u as x}from"./index.esm-BIPXVIy6.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-BJlvXTFv.js";import"./index-Dfne0w1T.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-r4xo0oMn.js";import"./RatioBar.component-DRqswj4i.js";const v={title:"Form/Fields/Copy",component:a.Copy},t=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(a.Copy,{name:"copy",label:"Copy field"}),e.jsx(a.Copy,{name:"copy",label:"Copy field disabled",disabled:!0}),e.jsx(a.Copy,{name:"copy",label:"Copy field read-only",readOnly:!0})]}),o=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field"}),e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field disabled",disabled:!0}),e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field read-only",readOnly:!0})]}),r=()=>e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field",prefix:"uuid"}),s=()=>{const m=()=>`${[1e7]}-1000-4000-8000-${1e11}`.replace(/[018]/g,C=>{const c=parseInt(C);return(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)}),{register:u,handleSubmit:y,setValue:f,watch:b}=x(),[l,i]=d.useState(),n=b("apiKey");return d.useEffect(()=>{i(null)},[n,i]),e.jsxs(a,{onSubmit:y(i),children:[l&&e.jsx(h,{title:"Form data",description:JSON.stringify(l,null,2),withBackground:!0}),e.jsxs(a.Row,{children:[e.jsx(a.Copy,{hideLabel:!0,label:"Key",defaultValue:"10ca0868-1010-4b4a-a2cc-ff737527a7b5",description:"This information is displayed only once.",name:"apiKey",value:n,ref:u()}),e.jsx(g,{icon:"talend-refresh",onClick:()=>f("apiKey",m()),children:"Regenerate"})]}),e.jsx(a.Buttons,{children:e.jsx(F,{type:"submit",onClick:()=>{},children:"Submit"})})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Copy name="copy" label="Copy field" />
        <Form.Copy name="copy" label="Copy field disabled" disabled />
        <Form.Copy name="copy" label="Copy field read-only" readOnly />
    </StackVertical>`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Copy defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5" name="copy" label="Copy field" />
        <Form.Copy defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5" name="copy" label="Copy field disabled" disabled />
        <Form.Copy defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5" name="copy" label="Copy field read-only" readOnly />
    </StackVertical>`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:'() => <Form.Copy defaultValue="04e16f12-2b39-44c6-ab67-20da4e7d9cd5" name="copy" label="Copy field" prefix="uuid" />',...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const getUUID = () => \`\${[1e7]}-\${1e3}-\${4e3}-\${8e3}-\${1e11}\`.replace(/[018]/g, c => {
    const convertedC = parseInt(c);
    return (convertedC ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> convertedC / 4).toString(16);
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm<CopyFormData>();
  const [formData, setFormData] = useState<null | CopyFormData>();
  const inputValue = watch('apiKey');
  useEffect(() => {
    setFormData(null);
  }, [inputValue, setFormData]);
  return <Form onSubmit={handleSubmit(setFormData)}>
            {formData && <InlineMessageInformation title={'Form data'} description={JSON.stringify(formData, null, 2)} withBackground />}
            <Form.Row>
                <Form.Copy hideLabel label={'Key'} defaultValue="10ca0868-1010-4b4a-a2cc-ff737527a7b5" description={'This information is displayed only once.'} name="apiKey" value={inputValue} ref={register()} />
                <ButtonTertiary icon="talend-refresh" onClick={() => setValue('apiKey', getUUID())}>
                    Regenerate
                </ButtonTertiary>
            </Form.Row>
            <Form.Buttons>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...s.parameters?.docs?.source}}};const M=["CopyStates","CopyStatesWithContents","CopyWithPrefix","ReactHookForm"];export{t as CopyStates,o as CopyStatesWithContents,r as CopyWithPrefix,s as ReactHookForm,M as __namedExportsOrder,v as default};
