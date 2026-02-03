import{j as e}from"./iframe-cBtRg4Zm.js";import{B as s,L as n}from"./index-D7Ofjx8s.js";import{Q as a}from"./DialogBackdrop-D-m4yJ_1.js";import"./Skeleton-DpHHM55B.js";import"./StackItem-Dxh24cVz.js";import"./QualityBar.component-Dnc0mEeA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-BqZxJ9l8.js";import"./index-BBfNNNmQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-QmhJMkIM.js";import"./RatioBar.component-b914dD6v.js";const w={component:a,title:"Navigation/Breadcrumbs"},l=()=>e.jsx(a,{items:[{label:"Link example",href:"/"},{label:"Label",href:"/here"}]}),t=()=>e.jsx(a,{items:[{label:"Link example",href:"/"},{label:"Link example",href:"/here"},{label:"Link example",href:"/there",target:"_blank"},{label:"Link example",href:"/away"},{label:"Link example that is much too long and should create an ellipsis if all is well",href:"/more"},{label:"Label",href:"/here"}]}),r=()=>e.jsx(s,{children:e.jsx(a,{items:[{label:"Link example",as:e.jsx(n,{to:"/documentation"})},{label:"Other Link example",as:e.jsx(n,{to:"/documentation"})}]})}),o=()=>e.jsx(s,{children:e.jsx(a,{items:[{label:"Link example with a label that is too long",as:e.jsx(n,{to:"/documentation"})},{label:"Link example with a label that is still too long",as:e.jsx(n,{to:"/documentation"})},{label:"Link example with a label that is yet again too long",href:"/documentation"},{label:"Link example with a label that is still and forever too long",href:"/documentation"}]})});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
  label: 'Link example',
  href: '/'
}, {
  label: 'Label',
  href: '/here'
}]} />`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
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
}]} />`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <Breadcrumbs items={[{
    label: 'Link example',
    as: <Link to="/documentation" />
  }, {
    label: 'Other Link example',
    as: <Link to="/documentation" />
  }]} />
    </BrowserRouter>`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
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
    </BrowserRouter>`,...o.parameters?.docs?.source}}};const B=["Basic","Advanced","Usage","FullWidth"];export{t as Advanced,l as Basic,o as FullWidth,r as Usage,B as __namedExportsOrder,w as default};
