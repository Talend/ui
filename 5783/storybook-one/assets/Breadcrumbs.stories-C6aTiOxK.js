import{j as e}from"./iframe-ClwiQvuW.js";import{B as s,L as n}from"./index-D0M9rX7Q.js";import{Q as a}from"./DialogBackdrop-iTyzF857.js";import"./Skeleton-BQjGtxmR.js";import"./StackItem-CsW9ssIq.js";import"./QualityBar.component-DDfEHyJh.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-CKQgpmT3.js";import"./index-D5sJf9UA.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition---za8--d.js";import"./RatioBar.component-HRRx7Vwf.js";const w={component:a,title:"Navigation/Breadcrumbs"},l=()=>e.jsx(a,{items:[{label:"Link example",href:"/"},{label:"Label",href:"/here"}]}),t=()=>e.jsx(a,{items:[{label:"Link example",href:"/"},{label:"Link example",href:"/here"},{label:"Link example",href:"/there",target:"_blank"},{label:"Link example",href:"/away"},{label:"Link example that is much too long and should create an ellipsis if all is well",href:"/more"},{label:"Label",href:"/here"}]}),r=()=>e.jsx(s,{children:e.jsx(a,{items:[{label:"Link example",as:e.jsx(n,{to:"/documentation"})},{label:"Other Link example",as:e.jsx(n,{to:"/documentation"})}]})}),o=()=>e.jsx(s,{children:e.jsx(a,{items:[{label:"Link example with a label that is too long",as:e.jsx(n,{to:"/documentation"})},{label:"Link example with a label that is still too long",as:e.jsx(n,{to:"/documentation"})},{label:"Link example with a label that is yet again too long",href:"/documentation"},{label:"Link example with a label that is still and forever too long",href:"/documentation"}]})});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <Breadcrumbs items={[{
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
