import{j as r}from"./index-Dhfj2E11.js";import{i}from"./useCopyToClipboard-Bw1cKZv-.js";import{t as e}from"./TalendDesignTokens-JgHEBmOa.js";import"./DialogBackdrop-5SPCz04Q.js";import{p as a,S}from"./Skeleton-B3m-S_Aq.js";import"./iframe-Bhwq12Bt.js";import"./index-D8nj1xkF.js";const d={title:"Icons/SizedIcon",component:a},c=o=>r.jsx(a,{size:"XS",name:o.name,color:o.color}),s=o=>r.jsx(a,{size:"S",name:o.name,color:o.color}),n=o=>r.jsx(a,{size:"M",name:o.name,color:o.color}),t=o=>r.jsx(a,{size:"L",name:o.name,color:o.color}),m={options:[e.coralColorSuccessIcon,e.coralColorAccentIcon,e.coralColorDangerIcon,e.coralColorNeutralIcon,e.coralColorWarningIcon],control:{type:"select",labels:{[e.coralColorSuccessIcon]:"Success",[e.coralColorAccentIcon]:"Accent",[e.coralColorDangerIcon]:"Danger",[e.coralColorNeutralIcon]:"Neutral",[e.coralColorWarningIcon]:"Warning"}}},g=e.coralColorNeutralIcon,u="pencil",p={color:g,name:u};c.argTypes={name:{options:i.XS,control:{type:"select"}},color:m,size:{table:{disable:!0}}};c.args=p;s.argTypes={name:{options:i.S,control:{type:"select"}},color:m,size:{table:{disable:!0}}};s.args=p;n.argTypes={name:{options:i.M,control:{type:"select"}},color:m,size:{table:{disable:!0}}};n.args=p;t.argTypes={name:{options:i.L,control:{type:"select"}},color:m,size:{table:{disable:!0}}};t.args=p;const l=()=>r.jsxs(S,{gap:"XS",children:[r.jsx(a,{size:"S",name:"note-pencil"}),r.jsx(a,{size:"M",name:"note-pencil"}),r.jsx(a,{size:"L",name:"note-pencil"})]});c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'XS'>;
  color: string;
}) => {
  return <SizedIcon size="XS" name={args.name} color={args.color} />;
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'S'>;
  color: string;
}) => <SizedIcon size="S" name={args.name} color={args.color} />`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'M'>;
  color: string;
}) => <SizedIcon size="M" name={args.name} color={args.color} />`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'L'>;
  color: string;
}) => <SizedIcon size="L" name={args.name} color={args.color} />`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS">
        <SizedIcon size="S" name="note-pencil" />
        <SizedIcon size="M" name="note-pencil" />
        <SizedIcon size="L" name="note-pencil" />
    </StackHorizontal>`,...l.parameters?.docs?.source}}};const z=["IconXS","IconS","IconM","IconL","Example"],M=Object.freeze(Object.defineProperty({__proto__:null,Example:l,IconL:t,IconM:n,IconS:s,IconXS:c,__namedExportsOrder:z,default:d},Symbol.toStringTag,{value:"Module"}));export{l as E,c as I,M as S,s as a,n as b,t as c};
