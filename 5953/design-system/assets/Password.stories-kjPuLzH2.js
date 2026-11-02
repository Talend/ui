import{j as s}from"./index-BzMqcOs8.js";import"./DialogBackdrop-Ct8gaKao.js";import{F as a,a as l}from"./Skeleton-CTqJGsZf.js";import"./iframe-B5oaFppe.js";import"./useCopyToClipboard-CZfOK7Jo.js";import"./index-D3GzThMe.js";import"./TalendDesignTokens-JgHEBmOa.js";const t={title:"Form/Fields/Password",component:a.Password},e={render:o=>s.jsx(a.Password,{label:"Password",...o,name:"password",id:"password"})},r={render:o=>s.jsx(a.Password,{label:"Password",...o,name:"password",id:"password",defaultValue:"defaultPassword"})},d=()=>s.jsxs(l,{gap:"M",justify:"stretch",align:"stretch",children:[s.jsx(a.Password,{name:"password",label:"Password field"}),s.jsx(a.Password,{name:"password",label:"Password field disabled",disabled:!0}),s.jsx(a.Password,{name:"password",label:"Password field",readOnly:!0}),s.jsx(a.Password,{name:"password",label:"Password field filled",defaultValue:"TalendPassword2012"}),s.jsx(a.Password,{name:"password",label:"Password field filled disabled",disabled:!0,defaultValue:"TalendPassword2012"}),s.jsx(a.Password,{name:"password",label:"Password field filled read-only",readOnly:!0,defaultValue:"TalendPassword2012"}),s.jsx(a.Password,{name:"password",label:"Password with link",defaultValue:"TalendPassword2012",link:{href:"https://talend.com/reset/password",children:"Need help to log in?"}})]}),n=["Default","Filled","Password"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Form.Password label="Password" {...props} name="password" id="password" />
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Form.Password label="Password" {...props} name="password" id="password" defaultValue="defaultPassword" />
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <StackVertical gap="M" justify="stretch" align="stretch">
        <Form.Password name="password" label="Password field" />
        <Form.Password name="password" label="Password field disabled" disabled />
        <Form.Password name="password" label="Password field" readOnly />
        <Form.Password name="password" label="Password field filled" defaultValue="TalendPassword2012" />
        <Form.Password name="password" label="Password field filled disabled" disabled defaultValue="TalendPassword2012" />
        <Form.Password name="password" label="Password field filled read-only" readOnly defaultValue="TalendPassword2012" />
        <Form.Password name="password" label="Password with link" defaultValue="TalendPassword2012" link={{
    href: 'https://talend.com/reset/password',
    children: 'Need help to log in?'
  }} />
    </StackVertical>`,...d.parameters?.docs?.source}}};const f=Object.freeze(Object.defineProperty({__proto__:null,Default:e,Filled:r,Password:d,__namedExportsOrder:n,default:t},Symbol.toStringTag,{value:"Module"}));export{d as P,f as S};
