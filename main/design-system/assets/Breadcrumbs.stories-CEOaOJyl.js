import{j as e}from"./index--KvFR1jg.js";import{B as s,L as o}from"./chunk-OB3PAWPO-Cwc8rhMw.js";import{K as r}from"./DialogBackdrop-DKmgnz_i.js";import"./Skeleton-y1-gpUX_.js";import"./iframe-RzlH1tvj.js";import"./useCopyToClipboard-BeD991x2.js";import"./index-jzd0SbQr.js";import"./TalendDesignTokens-JgHEBmOa.js";const i={component:r,title:"Navigation/Breadcrumbs"},a=()=>e.jsx(r,{items:[{label:"Link example",href:"/"},{label:"Label",href:"/here"}]}),l=()=>e.jsx(r,{items:[{label:"Link example",href:"/"},{label:"Link example",href:"/here"},{label:"Link example",href:"/there",target:"_blank"},{label:"Link example",href:"/away"},{label:"Link example that is much too long and should create an ellipsis if all is well",href:"/more"},{label:"Label",href:"/here"}]}),t=()=>e.jsx(s,{children:e.jsx(r,{items:[{label:"Link example",as:e.jsx(o,{to:"/documentation"})},{label:"Other Link example",as:e.jsx(o,{to:"/documentation"})}]})}),n=()=>e.jsx(s,{children:e.jsx(r,{items:[{label:"Link example with a label that is too long",as:e.jsx(o,{to:"/documentation"})},{label:"Link example with a label that is still too long",as:e.jsx(o,{to:"/documentation"})},{label:"Link example with a label that is yet again too long",href:"/documentation"},{label:"Link example with a label that is still and forever too long",href:"/documentation"}]})}),m=["Basic","Advanced","Usage","FullWidth"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
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
    </BrowserRouter>`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
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
    </BrowserRouter>`,...n.parameters?.docs?.source}}};const k=Object.freeze(Object.defineProperty({__proto__:null,Advanced:l,Basic:a,FullWidth:n,Usage:t,__namedExportsOrder:m,default:i},Symbol.toStringTag,{value:"Module"}));export{l as A,a as B,n as F,k as S,t as U};
