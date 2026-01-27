import{j as e}from"./index-DqyI3zNy.js";import{a as m}from"./iframe-BqCCNGDC.js";import{u as h}from"./index.esm-BtD1NgiN.js";import"./DialogBackdrop-Bbhqy77d.js";import{O as t,d as l,Q as w,B as y}from"./Skeleton-DhSiadqt.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./index-3dZT5jlp.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,b={component:t.Text,title:"Form/Affix"},o=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Text,{name:"text",label:"Select affix",placeholder:"ex: talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"https://",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"https://"}),e.jsx("option",{children:"http://"})]})}}),e.jsx(t.Text,{name:"text",label:"Text affix",placeholder:"ex: talend",prefix:{type:"text",children:"https://"}}),e.jsx(t.Text,{name:"text",label:"Button affix",placeholder:"ex: 4874-48f4-vh34-284h",defaultValue:"4874-48f4-vh34-284h",readOnly:!0,prefix:{type:"button",children:"copy",icon:"copy",onClick:()=>i("Copied")}})]}),r=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Text,{name:"text",label:"Select prefix and input text",placeholder:"www.talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"France (+33)"}),e.jsx("option",{children:"UK (+31)"})]})}}),e.jsxs(t.Select,{name:"select",label:"Select suffix and select input",placeholder:"www.talend.com",suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:".com"}),e.jsx("option",{children:".org"})]})},children:[e.jsx("option",{children:"www.talend"}),e.jsx("option",{children:"www.stitch"})]}),e.jsx(t.Text,{name:"text",label:"Disabled select prefix",placeholder:"www.talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",disabled:!0,children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"France (+33)"}),e.jsx("option",{children:"UK (+31)"})]})}}),e.jsxs(t.Select,{name:"select",label:"Disabled select suffix",placeholder:"www.talend.com",suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",disabled:!0,children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:".com"}),e.jsx("option",{children:".org"})]})},children:[e.jsx("option",{children:"www.talend"}),e.jsx("option",{children:"www.stitch"})]}),e.jsx(t.Text,{name:"text",label:"Read-only select prefix",placeholder:"www.talend.com",readOnly:!0,prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"France (+33)"}),e.jsx("option",{children:"UK (+31)"})]})}}),e.jsxs(t.Select,{name:"select",label:"Read-only select suffix",placeholder:"www.talend",defaultValue:"www.talend",readOnly:!0,suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:".com"}),e.jsx("option",{children:".org"})]})},children:[e.jsx("option",{children:"www.talend"}),e.jsx("option",{children:"www.stitch"})]})]}),n=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Text,{name:"text",label:"Button prefix with icon and input text",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>i("prefix clicked"),children:"Copy",icon:"copy"}}),e.jsxs(t.Select,{name:"select",label:"Select suffix and select input",defaultValue:"Dataset 001",suffix:{type:"button",onClick:()=>i("suffix clicked"),children:"Check dataset"},children:[e.jsx("option",{children:"Dataset 001"}),e.jsx("option",{children:"Dataset 002"})]}),e.jsx(t.Text,{name:"text",label:"Button affix with dropdown",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>i("prefix clicked"),children:"https://",icon:"locker-closed",isDropdown:!0}}),e.jsx(t.Text,{name:"text",label:"Button affix with icon and hidden text",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>i("prefix clicked"),children:"Copy",icon:"copy",hideText:!0}}),e.jsx(t.Text,{name:"text",label:"Button affix disabled",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>i("prefix clicked"),children:"Copy",icon:"copy",disabled:!0}})]}),a=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Text,{name:"text",label:"Text prefix with input text",placeholder:"ex: 06 19 19 19 19",prefix:{type:"text",children:"France (+33)"}}),e.jsxs(t.Select,{name:"text",label:"Text suffix with select input",placeholder:"Authorized domain list",defaultValue:"www.talend",suffix:{type:"text",children:".com"},children:[e.jsx("option",{children:"www.talend"}),e.jsx("option",{children:"www.stitch"})]}),e.jsx(t.Text,{name:"text",label:"Text affix with icon",placeholder:"ex: talend.com",prefix:{type:"text",children:"https://",icon:"locker-closed"}}),e.jsx(t.Text,{name:"text",label:"Text affix with icon and hidden text",placeholder:"ex: https://talend.com",prefix:{type:"text",children:"Address to share",icon:"export",hideText:!0}})]}),c=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Datalist,{name:"column",label:"Input",values:["Id","Name","Country","Age"],multiple:!0,prefix:{type:"select",label:"type",name:"type",defaultValue:"Column",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"Value"}),e.jsx("option",{children:"Column"})]})}}),e.jsxs(t.Select,{name:"column",label:"Input",multiple:!0,prefix:{type:"select",label:"type",name:"type",defaultValue:"Column",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"Value"}),e.jsx("option",{children:"Column"})]})},children:[e.jsx("option",{children:"Id"}),e.jsx("option",{children:"Name"}),e.jsx("option",{selected:!0,children:"Country"}),e.jsx("option",{children:"Age"})]})]}),p=()=>e.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsx(t.Text,{name:"generatedId",label:"Button prefix and suffix on a single field",prefix:{type:"button",children:"Copy",icon:"copy",onClick:()=>i("Copied")},suffix:{type:"button",children:"Create a new ID",icon:"restart",onClick:()=>i("Refreshed"),hideText:!0}}),e.jsxs(t.Select,{name:"fakeDomain",label:"Select prefix, text suffix",suffix:{type:"text",children:".com"},prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"https://",children:e.jsxs(e.Fragment,{children:[e.jsx("option",{children:"https://"}),e.jsx("option",{children:"http://"})]})},children:[e.jsx("option",{children:"domain-name.com"}),e.jsx("option",{selected:!0,children:"talend.com"})]}),e.jsx(t.Number,{name:"value",label:"Text prefix, text suffix",prefix:{type:"text",children:"$"},suffix:{type:"text",children:".00"}})]}),s=()=>{const{register:d,handleSubmit:u,watch:S}=h(),[x,f]=m.useState();return e.jsxs(t,{onSubmit:u(f),children:[x&&e.jsx(w,{title:"Form data",description:JSON.stringify(x,null,2),withBackground:!0}),e.jsx(t.Text,{label:"API Key",prefix:{...d("prefix"),type:"select",label:"Type",children:[e.jsx("option",{value:"Public",children:"Public"},"public"),e.jsx("option",{value:"Private",children:"Private"},"private")],defaultValue:"Public"},suffix:{type:"button",onClick:()=>{},icon:"talend-files-o",hideText:!0,children:"Do something"},description:"The input seems readonly and the value is not displayed while submitting the form",defaultValue:42,...d("apiKey")}),e.jsx(t.Buttons,{children:e.jsx(y,{type:"submit",onClick:()=>{},children:"Submit"})})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Text name="text" label="Select affix" placeholder="ex: talend.com" prefix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: 'https://',
    children: <>
                        <option>https://</option>
                        <option>http://</option>
                    </>
  }} />
        <Form.Text name="text" label="Text affix" placeholder="ex: talend" prefix={{
    type: 'text',
    children: 'https://'
  }} />
        <Form.Text name="text" label="Button affix" placeholder="ex: 4874-48f4-vh34-284h" defaultValue="4874-48f4-vh34-284h" readOnly prefix={{
    type: 'button',
    children: 'copy',
    icon: 'copy',
    onClick: () => action('Copied')
  }} />
    </StackVertical>`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Text name="text" label="Select prefix and input text" placeholder="www.talend.com" prefix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: 'France (+33)',
    children: <>
                        <option>France (+33)</option>
                        <option>UK (+31)</option>
                    </>
  }} />
        <Form.Select name="select" label="Select suffix and select input" placeholder="www.talend.com" suffix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: '.com',
    children: <>
                        <option>.com</option>
                        <option>.org</option>
                    </>
  }}>
            <option>www.talend</option>
            <option>www.stitch</option>
        </Form.Select>
        <Form.Text name="text" label="Disabled select prefix" placeholder="www.talend.com" prefix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: 'France (+33)',
    disabled: true,
    children: <>
                        <option>France (+33)</option>
                        <option>UK (+31)</option>
                    </>
  }} />
        <Form.Select name="select" label="Disabled select suffix" placeholder="www.talend.com" suffix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: '.com',
    disabled: true,
    children: <>
                        <option>.com</option>
                        <option>.org</option>
                    </>
  }}>
            <option>www.talend</option>
            <option>www.stitch</option>
        </Form.Select>
        <Form.Text name="text" label="Read-only select prefix" placeholder="www.talend.com" readOnly prefix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: 'France (+33)',
    children: <>
                        <option>France (+33)</option>
                        <option>UK (+31)</option>
                    </>
  }} />
        <Form.Select name="select" label="Read-only select suffix" placeholder="www.talend" defaultValue="www.talend" readOnly suffix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: '.com',
    children: <>
                        <option>.com</option>
                        <option>.org</option>
                    </>
  }}>
            <option>www.talend</option>
            <option>www.stitch</option>
        </Form.Select>
    </StackVertical>`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Text name="text" label="Button prefix with icon and input text" placeholder="www.talend.com" prefix={{
    type: 'button',
    onClick: () => action('prefix clicked'),
    children: 'Copy',
    icon: 'copy'
  }} />
        <Form.Select name="select" label="Select suffix and select input" defaultValue="Dataset 001" suffix={{
    type: 'button',
    onClick: () => action('suffix clicked'),
    children: 'Check dataset'
  }}>
            <option>Dataset 001</option>
            <option>Dataset 002</option>
        </Form.Select>
        <Form.Text name="text" label="Button affix with dropdown" placeholder="www.talend.com" prefix={{
    type: 'button',
    onClick: () => action('prefix clicked'),
    children: 'https://',
    icon: 'locker-closed',
    isDropdown: true
  }} />
        <Form.Text name="text" label="Button affix with icon and hidden text" placeholder="www.talend.com" prefix={{
    type: 'button',
    onClick: () => action('prefix clicked'),
    children: 'Copy',
    icon: 'copy',
    hideText: true
  }} />
        <Form.Text name="text" label="Button affix disabled" placeholder="www.talend.com" prefix={{
    type: 'button',
    onClick: () => action('prefix clicked'),
    children: 'Copy',
    icon: 'copy',
    disabled: true
  }} />
    </StackVertical>`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Text name="text" label="Text prefix with input text" placeholder="ex: 06 19 19 19 19" prefix={{
    type: 'text',
    children: 'France (+33)'
  }} />
        <Form.Select name="text" label="Text suffix with select input" placeholder="Authorized domain list" defaultValue="www.talend" suffix={{
    type: 'text',
    children: '.com'
  }}>
            <option>www.talend</option>
            <option>www.stitch</option>
        </Form.Select>
        <Form.Text name="text" label="Text affix with icon" placeholder="ex: talend.com" prefix={{
    type: 'text',
    children: 'https://',
    icon: 'locker-closed'
  }} />
        <Form.Text name="text" label="Text affix with icon and hidden text" placeholder="ex: https://talend.com" prefix={{
    type: 'text',
    children: 'Address to share',
    icon: 'export',
    hideText: true
  }} />
    </StackVertical>`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Datalist name="column" label="Input" values={['Id', 'Name', 'Country', 'Age']} multiple prefix={{
    type: 'select',
    label: 'type',
    name: 'type',
    defaultValue: 'Column',
    children: <>
                        <option>Value</option>
                        <option>Column</option>
                    </>
  }} />
        <Form.Select name="column" label="Input" multiple prefix={{
    type: 'select',
    label: 'type',
    name: 'type',
    defaultValue: 'Column',
    children: <>
                        <option>Value</option>
                        <option>Column</option>
                    </>
  }}>
            <option>Id</option>
            <option>Name</option>
            <option selected>Country</option>
            <option>Age</option>
        </Form.Select>
    </StackVertical>`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Text name="generatedId" label="Button prefix and suffix on a single field" prefix={{
    type: 'button',
    children: 'Copy',
    icon: 'copy',
    onClick: () => action('Copied')
  }} suffix={{
    type: 'button',
    children: 'Create a new ID',
    icon: 'restart',
    onClick: () => action('Refreshed'),
    hideText: true
  }} />
        <Form.Select name="fakeDomain" label="Select prefix, text suffix" suffix={{
    type: 'text',
    children: '.com'
  }} prefix={{
    type: 'select',
    label: 'prefix',
    name: 'prefix',
    required: true,
    defaultValue: 'https://',
    children: <>
                        <option>https://</option>
                        <option>http://</option>
                    </>
  }}>
            <option>domain-name.com</option>
            <option selected>talend.com</option>
        </Form.Select>
        <Form.Number name="value" label="Text prefix, text suffix" prefix={{
    type: 'text',
    children: '$'
  }} suffix={{
    type: 'text',
    children: '.00'
  }} />
    </StackVertical>`,...p.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const {
    register,
    handleSubmit,
    watch
  } = useForm();
  const [formData, setFormData] = useState();
  return <Form onSubmit={handleSubmit(setFormData)}>
            {formData && <InlineMessageInformation title={'Form data'} description={JSON.stringify(formData, null, 2)} withBackground />}
            <Form.Text label="API Key" prefix={{
      ...register('prefix'),
      type: 'select',
      label: 'Type',
      children: [<option key="public" value="Public">
                            Public
                        </option>, <option key="private" value="Private">
                            Private
                        </option>],
      defaultValue: 'Public'
    }} suffix={{
      type: 'button',
      onClick: () => {},
      icon: 'talend-files-o',
      hideText: true,
      children: 'Do something'
    }} description="The input seems readonly and the value is not displayed while submitting the form" defaultValue={42} {...register('apiKey')} />
            <Form.Buttons>
                <ButtonPrimary type="submit" onClick={() => {}}>
                    Submit
                </ButtonPrimary>
            </Form.Buttons>
        </Form>;
}`,...s.parameters?.docs?.source}}};const j=["QuickStart","AffixSelect","AffixButton","AffixText","DatalistAffix","Mix","ReactHookForm"],A=Object.freeze(Object.defineProperty({__proto__:null,AffixButton:n,AffixSelect:r,AffixText:a,DatalistAffix:c,Mix:p,QuickStart:o,ReactHookForm:s,__namedExportsOrder:j,default:b},Symbol.toStringTag,{value:"Module"}));export{r as A,c as D,p as M,o as Q,s as R,A as S,n as a,a as b};
