import{j as e}from"./index-B-4QAGRT.js";import{B as n,L as s}from"./index-zQlFbBTw.js";import{R as o}from"./DialogBackdrop-9Sis8N-G.js";import"./Skeleton-QTANCvJ0.js";import"./iframe-Bzc6Acpn.js";import"./useCopyToClipboard-5SsFVDgy.js";import"./index-BBitzEYX.js";import"./TalendDesignTokens-JgHEBmOa.js";const i={component:o,title:"Navigation/Breadcrumbs"},a=()=>e.jsx(o,{items:[{label:"Link example",href:"/"},{label:"Label",href:"/here"}]}),l=()=>e.jsx(o,{items:[{label:"Link example",href:"/"},{label:"Link example",href:"/here"},{label:"Link example",href:"/there",target:"_blank"},{label:"Link example",href:"/away"},{label:"Link example that is much too long and should create an ellipsis if all is well",href:"/more"},{label:"Label",href:"/here"}]}),t=()=>e.jsx(n,{children:e.jsx(o,{items:[{label:"Link example",as:e.jsx(s,{to:"/documentation"})},{label:"Other Link example",as:e.jsx(s,{to:"/documentation"})}]})}),r=()=>e.jsx(n,{children:e.jsx(o,{items:[{label:"Link example with a label that is too long",as:e.jsx(s,{to:"/documentation"})},{label:"Link example with a label that is still too long",as:e.jsx(s,{to:"/documentation"})},{label:"Link example with a label that is yet again too long",href:"/documentation"},{label:"Link example with a label that is still and forever too long",href:"/documentation"}]})});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
  label: 'Link example',
  href: '/'
}, {
  label: 'Label',
  href: '/here'
}]} />`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
  label: 'Link example',
  href: '/'
}, {
  label: 'Link example',
  href: '/here'
}, {
  label: 'Link example',
  href: '/there',
  target: '_blank'
}, {
  label: 'Link example',
  href: '/away'
}, {
  label: 'Link example that is much too long and should create an ellipsis if all is well',
  href: '/more'
}, {
  label: 'Label',
  href: '/here'
}]} />`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <Breadcrumbs items={[{
    label: 'Link example',
    as: <Link to="/documentation" />
  }, {
    label: 'Other Link example',
    as: <Link to="/documentation" />
  }]} />
    </BrowserRouter>`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <Breadcrumbs items={[{
    label: 'Link example with a label that is too long',
    as: <Link to="/documentation" />
  }, {
    label: 'Link example with a label that is still too long',
    as: <Link to="/documentation" />
  }, {
    label: 'Link example with a label that is yet again too long',
    href: '/documentation'
  }, {
    label: 'Link example with a label that is still and forever too long',
    href: '/documentation'
  }]} />
    </BrowserRouter>`,...r.parameters?.docs?.source}}};const m=["Basic","Advanced","Usage","FullWidth"],k=Object.freeze(Object.defineProperty({__proto__:null,Advanced:l,Basic:a,FullWidth:r,Usage:t,__namedExportsOrder:m,default:i},Symbol.toStringTag,{value:"Module"}));export{l as A,a as B,r as F,k as S,t as U};
