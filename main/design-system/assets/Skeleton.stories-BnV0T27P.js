import{j as e}from"./index-D7mHjmc3.js";import"./DialogBackdrop-37eb9yoP.js";import{F as j,a as k,d as s,G as h,H as c,S as m,J as x,K as u,M as z,N as y}from"./Skeleton-J-GOWQMf.js";import"./iframe-ChWwpfwL.js";import"./useCopyToClipboard-D5J2YMOK.js";import"./index-Di2Kmz2v.js";import"./TalendDesignTokens-JgHEBmOa.js";const X={title:"Feedback/Skeleton",component:j},B=t=>e.jsx(x,{...t}),v=t=>e.jsx(u,{...t}),H=t=>e.jsx(h,{...t}),M=t=>e.jsx(c,{...t}),I=t=>e.jsx(y,{...t}),b=t=>e.jsx(z,{...t}),a=B.bind({});a.args={size:"M"};a.argTypes={size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'}};const r=v.bind({});r.args={size:"M"};r.argTypes={size:{options:["M","S","XS"],control:{type:"select"},description:'optional (default is "M")'}};const o=H.bind({});o.args={size:"L"};o.argTypes={size:{options:["L","M","S"],control:{type:"select"},description:'optional (default is "L")'},width:{options:["100","XL","L","M","S","XS"],control:{type:"select"},description:"optional"}};const n=M.bind({});n.args={size:"M"};n.argTypes={size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'},width:{options:["100","XL","L","M","S","XS"],control:{type:"select"},description:"optional"}};const i=I.bind({});i.args={isCircle:!0,height:"3rem",width:"20%"};const l=b.bind({}),S=()=>e.jsxs(m,{gap:"XS",align:"center",children:[e.jsx(x,{}),e.jsx(x,{size:"S"})]}),p=()=>e.jsxs(m,{gap:"XS",align:"center",children:[e.jsx(u,{}),e.jsx(u,{size:"S"}),e.jsx(u,{size:"XS"})]}),d=()=>e.jsxs(k,{gap:"XS",align:"stretch",children:[e.jsx(s,{variant:"heading"}),e.jsx(s,{variant:"paragraph"}),e.jsxs(k,{gap:"XS",padding:{y:"XS",x:0},children:[e.jsx(s,{variant:"heading",size:"M"}),e.jsx(s,{variant:"paragraph"}),e.jsx(s,{variant:"paragraph"}),e.jsx(s,{variant:"button"})]})]}),g=()=>e.jsxs(k,{gap:"XS",align:"stretch",children:[e.jsx(h,{}),e.jsxs(k,{gap:"XXS",children:[e.jsx(c,{}),e.jsx(c,{}),e.jsx(c,{})]}),e.jsxs(m,{gap:"XS",justify:"end",children:[e.jsx("div",{style:{width:"50%"}}),e.jsxs(m,{gap:"XS",align:"center",children:[e.jsx(c,{size:"S"}),e.jsx(x,{})]})]})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonButton {...args} />;
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonButtonIcon {...args} />;
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonHeading {...args} />;
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonParagraph {...args} />;
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonSized {...args} />;
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => {
  return <SkeletonInput {...args} />;
}`,...l.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center">
        <SkeletonButton />
        <SkeletonButton size="S" />
    </StackHorizontal>`,...S.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center">
        <SkeletonButtonIcon />
        <SkeletonButtonIcon size="S" />
        <SkeletonButtonIcon size="XS" />
    </StackHorizontal>`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <StackVertical gap="XS" align="stretch">
        <Skeleton variant="heading" />
        <Skeleton variant="paragraph" />
        <StackVertical gap="XS" padding={{
    y: 'XS',
    x: 0
  }}>
            <Skeleton variant="heading" size="M" />
            <Skeleton variant="paragraph" />
            <Skeleton variant="paragraph" />
            <Skeleton variant="button" />
        </StackVertical>
    </StackVertical>`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => <StackVertical gap="XS" align="stretch">
        <SkeletonHeading />
        <StackVertical gap="XXS">
            <SkeletonParagraph />
            <SkeletonParagraph />
            <SkeletonParagraph />
        </StackVertical>
        <StackHorizontal gap="XS" justify="end">
            <div style={{
      width: '50%'
    }} />
            <StackHorizontal gap="XS" align="center">
                <SkeletonParagraph size="S" />
                <SkeletonButton />
            </StackHorizontal>
        </StackHorizontal>
    </StackVertical>`,...g.parameters?.docs?.source}}};const f=["SkeletonButtonStory","SkeletonButtonIconStory","SkeletonHeadingStory","SkeletonParagraphStory","SkeletonSizedStory","SkeletonInputStory","SkeletonButtons","SkeletonButtonIcons","ButtonVariants","CompositionExample"],E=Object.freeze(Object.defineProperty({__proto__:null,ButtonVariants:d,CompositionExample:g,SkeletonButtonIconStory:r,SkeletonButtonIcons:p,SkeletonButtonStory:a,SkeletonButtons:S,SkeletonHeadingStory:o,SkeletonInputStory:l,SkeletonParagraphStory:n,SkeletonSizedStory:i,__namedExportsOrder:f,default:X},Symbol.toStringTag,{value:"Module"}));export{d as B,g as C,E as S,a,r as b,o as c,n as d,l as e,i as f};
