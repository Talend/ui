import{j as e}from"./index-DavRKjdY.js";import{a as d}from"./iframe-D2e1b4DD.js";import"./DialogBackdrop-BmrnaQ8O.js";import{O as a,a as p,Q as g,e as h,B as F}from"./Skeleton-D6Od-5tm.js";import"./useCopyToClipboard-DdQgxOE_.js";import"./index-BKsExLm4.js";import"./TalendDesignTokens-JgHEBmOa.js";import{u as S}from"./index.esm-BCo5lEbD.js";const x={title:"Form/Fields/Copy",component:a.Copy},t=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(a.Copy,{name:"copy",label:"Copy field"}),e.jsx(a.Copy,{name:"copy",label:"Copy field disabled",disabled:!0}),e.jsx(a.Copy,{name:"copy",label:"Copy field read-only",readOnly:!0})]}),o=()=>e.jsxs(p,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field"}),e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field disabled",disabled:!0}),e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field read-only",readOnly:!0})]}),r=()=>e.jsx(a.Copy,{defaultValue:"04e16f12-2b39-44c6-ab67-20da4e7d9cd5",name:"copy",label:"Copy field",prefix:"uuid"}),s=()=>{const u=()=>`${[1e7]}-1000-4000-8000-${1e11}`.replace(/[018]/g,C=>{const c=parseInt(C);return(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)}),{register:m,handleSubmit:y,setValue:f,watch:b}=S(),[n,l]=d.useState(),i=b("apiKey");return d.useEffect(()=>{l(null)},[i,l]),e.jsxs(a,{onSubmit:y(l),children:[n&&e.jsx(g,{title:"Form data",description:JSON.stringify(n,null,2),withBackground:!0}),e.jsxs(a.Row,{children:[e.jsx(a.Copy,{hideLabel:!0,label:"Key",defaultValue:"10ca0868-1010-4b4a-a2cc-ff737527a7b5",description:"This information is displayed only once.",name:"apiKey",value:i,ref:m()}),e.jsx(h,{icon:"talend-refresh",onClick:()=>f("apiKey",u()),children:"Regenerate"})]}),e.jsx(a.Buttons,{children:e.jsx(F,{type:"submit",onClick:()=>{},children:"Submit"})})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
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
}`,...s.parameters?.docs?.source}}};const j=["CopyStates","CopyStatesWithContents","CopyWithPrefix","ReactHookForm"],$=Object.freeze(Object.defineProperty({__proto__:null,CopyStates:t,CopyStatesWithContents:o,CopyWithPrefix:r,ReactHookForm:s,__namedExportsOrder:j,default:x},Symbol.toStringTag,{value:"Module"}));export{t as C,s as R,$ as S,o as a,r as b};
