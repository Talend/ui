import{j as t,t as l}from"./iframe-DRCDqYKx.js";import{D as m}from"./DialogBackdrop-CHnfAQ1W.js";import{B as u}from"./Skeleton-D2WvrjHU.js";import{b as p,a as r,S as d,p as S,o as j,c as h,d as x,s as w,e as k,j as b,h as z}from"./StackItem-BAiyfTPs.js";import"./QualityBar.component-BDcgQgqR.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip--vE932z8.js";import"./index-DDH2bbOn.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DAA4VcSW.js";import"./RatioBar.component-BiejovRW.js";const M={component:d,title:"Layout/Stack",subcomponents:{StackVertical:r,StackItem:p}},g={as:{options:[...S],control:{type:"select"}},justify:{options:Object.keys(b),control:{type:"select"}},align:{options:Object.keys(h),control:{type:"select"}},gap:{options:Object.keys(k),control:{type:"select"},description:"MANDATORY. Can also be set as an object `{ x: SizeToken, y: SizeToken }`"},padding:{options:Object.keys(k),control:{type:"select"},description:"Can also be set as an object `{ x: SizeToken, y: SizeToken }` or `{top: SizeToken, left: SizeToken, right: SizeToken, bottom: SizeToken}`"},margin:{options:Object.keys(w),control:{type:"select"},description:"Can also be set as an object `{ x: SizeToken, y: SizeToken }` or `{top: SizeToken, left: SizeToken, right: SizeToken, bottom: SizeToken}`"},wrap:{options:["nowrap","wrap","wrapReverse"],control:{type:"select"}},isFullWidth:{control:{type:"boolean"}},alignContent:{options:Object.keys(x),control:{type:"select"}},display:{options:["block","inline"],control:{type:"select"}},role:{control:{type:"text"}}},T={...g,height:{options:Object.keys(z),control:{type:"select"}}};function e({width:i}){return t.jsx("div",{style:{width:i,height:l.coralSizingS,borderRadius:l.coralRadiusM,background:l.coralColorAccentBackground,border:`${l.coralBorderSDashed} ${l.coralColorAccentBorder}`}})}const y=i=>t.jsxs(d,{...i,children:[t.jsx(e,{width:"60%"}),t.jsx(e,{width:"40%"}),t.jsx(e,{width:"100%"})]}),s=y.bind({});s.argTypes=g;s.args={as:"div",gap:"S",justify:"start",align:"start",wrap:"nowrap",isFullWidth:!1,alignContent:"start",display:"block",role:""};const n=y.bind({});n.argTypes=g;n.args={gap:{x:"S",y:"XS"},padding:{top:0,right:"M",bottom:"S",left:"S"}};const L=i=>t.jsxs(r,{...i,children:[t.jsx(e,{width:"60%"}),t.jsx(e,{width:"40%"}),t.jsx(e,{width:"100%"})]}),o=L.bind({});o.argTypes=T;o.args={gap:"S"};const c=()=>t.jsxs(r,{gap:"M",as:"article",align:"stretch",children:[t.jsxs(d,{gap:"S",padding:"S",justify:"center",align:"center",children:[t.jsx(p,{align:"end",grow:!0,children:t.jsxs(r,{gap:"XS",as:"ul",children:[t.jsx("li",{children:"List entry"}),t.jsx("li",{children:"List entry 2"}),t.jsx("li",{children:"List entry 3"})]})}),t.jsxs(r,{gap:"XS",as:"ul",children:[t.jsx("li",{children:"List entry"}),t.jsx(p,{align:"center",grow:!0,as:"li",children:"List entry 2"}),t.jsx("li",{children:"List entry 3"})]}),t.jsxs(r,{gap:"XS",as:"ul",children:[t.jsx("li",{children:"List entry"}),t.jsx("li",{children:"List entry 2"}),t.jsx("li",{children:"List entry 3"}),t.jsx("li",{children:"List entry 4"})]})]}),t.jsx(m,{}),t.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[t.jsx("p",{children:"Lorem ipsum dolor sit amet."}),t.jsx(u,{onClick:()=>{},children:"Click here"})]})]}),a=i=>t.jsxs(r,{gap:"XS",as:"ul",align:"stretch",children:[t.jsx("li",{children:t.jsx(e,{width:"3.75rem"})}),t.jsx(p,{...i,children:t.jsx(e,{width:"100%"})}),t.jsx("li",{children:t.jsx(e,{width:"5rem"})})]});a.args={grow:!0,shrink:!1,align:"center",overflow:"auto",as:"li",isFullWidth:!1};a.argTypes={grow:{control:{type:"boolean"}},shrink:{control:{type:"boolean"}},align:{options:Object.keys(h),control:{type:"select"}},overflow:{options:Object.keys(j),control:{type:"select"}},as:{options:[...S],control:{type:"select"}},isFullWidth:{control:{type:"boolean"}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => <StackHorizontal {...args}>
        <Block width="60%" />
        <Block width="40%" />
        <Block width="100%" />
    </StackHorizontal>`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => <StackHorizontal {...args}>
        <Block width="60%" />
        <Block width="40%" />
        <Block width="100%" />
    </StackHorizontal>`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => <StackVertical {...args}>
        <Block width="60%" />
        <Block width="40%" />
        <Block width="100%" />
    </StackVertical>`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  return <StackVertical gap="M" as="article" align="stretch">
            <StackHorizontal gap="S" padding="S" justify="center" align="center">
                <StackItem align="end" grow>
                    <StackVertical gap="XS" as="ul">
                        <li>List entry</li>
                        <li>List entry 2</li>
                        <li>List entry 3</li>
                    </StackVertical>
                </StackItem>
                <StackVertical gap="XS" as="ul">
                    <li>List entry</li>
                    <StackItem align="center" grow as="li">
                        List entry 2
                    </StackItem>
                    <li>List entry 3</li>
                </StackVertical>
                <StackVertical gap="XS" as="ul">
                    <li>List entry</li>
                    <li>List entry 2</li>
                    <li>List entry 3</li>
                    <li>List entry 4</li>
                </StackVertical>
            </StackHorizontal>
            <Divider />
            <StackHorizontal gap="XS" justify="center" align="center">
                <p>Lorem ipsum dolor sit amet.</p>
                <ButtonPrimary onClick={() => {}}>Click here</ButtonPrimary>
            </StackHorizontal>
        </StackVertical>;
}`,...c.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  return <StackVertical gap="XS" as="ul" align="stretch">
            <li>
                <Block width="3.75rem" />
            </li>
            <StackItem {...args}>
                <Block width="100%" />
            </StackItem>
            <li>
                <Block width="5rem" />
            </li>
        </StackVertical>;
}`,...a.parameters?.docs?.source}}};const R=["TestHorizontal","TestHorizontalWithExplicitSpacing","TestVertical","StackNesting","StackWithStackItem"];export{c as StackNesting,a as StackWithStackItem,s as TestHorizontal,n as TestHorizontalWithExplicitSpacing,o as TestVertical,R as __namedExportsOrder,M as default};
