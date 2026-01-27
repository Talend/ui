import{j as e}from"./index-nXv0R8um.js";import"./DialogBackdrop-BuzytS8-.js";import{a5 as a,a as s,Q as o,a6 as c,a7 as l,P as m,a8 as d}from"./Skeleton-B1IJ9vsQ.js";import"./iframe-DGvyPnos.js";import"./useCopyToClipboard-CBbDwwBs.js";import"./index-D5CQICtx.js";import"./TalendDesignTokens-JgHEBmOa.js";import{B as h,L as v}from"./index-CQnPmphP.js";const L={component:a,title:"Messaging/InlineMessage"},t=()=>e.jsxs(s,{gap:"XS",children:[e.jsx(o,{title:"Lorem ipsum",link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(c,{title:"Lorem ipsum",link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(l,{title:"Lorem ipsum",link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(m,{title:"Lorem ipsum",link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(d,{title:"Lorem ipsum",link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."})]}),r=()=>e.jsxs(s,{gap:"XS",children:[e.jsx(o,{title:"Lorem ipsum",withBackground:!0,link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(c,{title:"Lorem ipsum",withBackground:!0,link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(l,{title:"Lorem ipsum",withBackground:!0,link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(m,{title:"Lorem ipsum",withBackground:!0,link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."}),e.jsx(d,{title:"Lorem ipsum",withBackground:!0,link:{href:"https://talend.com",children:"Learn more"},description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."})]}),k=p=>{const{variant:u="information",...g}=p;return e.jsx(a,{...g,variant:u})},i=k.bind({});i.args={variant:"information",title:"Lorem ipsum",description:"dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."};const n=()=>e.jsx(h,{children:e.jsx(a,{withBackground:!0,description:"Inline message with a Router Link",variant:"information",link:{as:e.jsx(v,{to:"/documentation"}),children:"See more"}})});t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <StackVertical gap="XS">
        <InlineMessageInformation title="Lorem ipsum" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageSuccess title="Lorem ipsum" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageWarning title="Lorem ipsum" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageDestructive title="Lorem ipsum" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageBeta title="Lorem ipsum" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
    </StackVertical>`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <StackVertical gap="XS">
        <InlineMessageInformation title="Lorem ipsum" withBackground link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageSuccess title="Lorem ipsum" withBackground link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageWarning title="Lorem ipsum" withBackground link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageDestructive title="Lorem ipsum" withBackground link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
        <InlineMessageBeta title="Lorem ipsum" withBackground link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
    </StackVertical>`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`args => {
  const {
    variant = 'information',
    ...rest
  } = args;
  return <InlineMessage {...rest} variant={variant} />;
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <InlineMessage withBackground description="Inline message with a Router Link" variant="information" link={{
    as: <RouterLink to="/documentation" />,
    children: 'See more'
  }} />
    </BrowserRouter>`,...n.parameters?.docs?.source}}};const I=["DefaultDemo","BackgroundDemo","Variant","WithRouterLink"],R=Object.freeze(Object.defineProperty({__proto__:null,BackgroundDemo:r,DefaultDemo:t,Variant:i,WithRouterLink:n,__namedExportsOrder:I,default:L},Symbol.toStringTag,{value:"Module"}));export{r as B,t as D,R as S,i as V,n as W};
