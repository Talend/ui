import{j as r}from"./index--KvFR1jg.js";import{i}from"./useCopyToClipboard-BeD991x2.js";import{t as e}from"./TalendDesignTokens-JgHEBmOa.js";import"./DialogBackdrop-DKmgnz_i.js";import{G as a,S}from"./Skeleton-y1-gpUX_.js";import"./iframe-RzlH1tvj.js";import"./index-jzd0SbQr.js";const d={title:"Icons/SizedIcon",component:a},n=o=>r.jsx(a,{size:"XS",name:o.name,color:o.color}),c=o=>r.jsx(a,{size:"S",name:o.name,color:o.color}),s=o=>r.jsx(a,{size:"M",name:o.name,color:o.color}),t=o=>r.jsx(a,{size:"L",name:o.name,color:o.color}),m={options:[e.coralColorSuccessIcon,e.coralColorAccentIcon,e.coralColorDangerIcon,e.coralColorNeutralIcon,e.coralColorWarningIcon],control:{type:"select",labels:{[e.coralColorSuccessIcon]:"Success",[e.coralColorAccentIcon]:"Accent",[e.coralColorDangerIcon]:"Danger",[e.coralColorNeutralIcon]:"Neutral",[e.coralColorWarningIcon]:"Warning"}}},g=e.coralColorNeutralIcon,u="pencil",p={color:g,name:u};n.argTypes={name:{options:i.XS,control:{type:"select"}},color:m,size:{table:{disable:!0}}};n.args=p;c.argTypes={name:{options:i.S,control:{type:"select"}},color:m,size:{table:{disable:!0}}};c.args=p;s.argTypes={name:{options:i.M,control:{type:"select"}},color:m,size:{table:{disable:!0}}};s.args=p;t.argTypes={name:{options:i.L,control:{type:"select"}},color:m,size:{table:{disable:!0}}};t.args=p;const l=()=>r.jsxs(S,{gap:"XS",children:[r.jsx(a,{size:"S",name:"note-pencil"}),r.jsx(a,{size:"M",name:"note-pencil"}),r.jsx(a,{size:"L",name:"note-pencil"})]}),z=["IconXS","IconS","IconM","IconL","Example"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'XS'>;
  color: string;
}) => {
  return <SizedIcon size="XS" name={args.name} color={args.color} />;
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'S'>;
  color: string;
}) => <SizedIcon size="S" name={args.name} color={args.color} />`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'M'>;
  color: string;
}) => <SizedIcon size="M" name={args.name} color={args.color} />`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`(args: {
  name: IconNameWithSize<'L'>;
  color: string;
}) => <SizedIcon size="L" name={args.name} color={args.color} />`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS">
        <SizedIcon size="S" name="note-pencil" />
        <SizedIcon size="M" name="note-pencil" />
        <SizedIcon size="L" name="note-pencil" />
    </StackHorizontal>`,...l.parameters?.docs?.source}}};const M=Object.freeze(Object.defineProperty({__proto__:null,Example:l,IconL:t,IconM:s,IconS:c,IconXS:n,__namedExportsOrder:z,default:d},Symbol.toStringTag,{value:"Module"}));export{l as E,n as I,M as S,c as a,s as b,t as c};
