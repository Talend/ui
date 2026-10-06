import{j as n}from"./index--KvFR1jg.js";import{r as x}from"./iframe-RzlH1tvj.js";import"./DialogBackdrop-DKmgnz_i.js";import{l as c,S as d,d as v,m as u,n as o,a as C}from"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./index-jzd0SbQr.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,B={children:"Action label",icon:"plus",action:e("Button clicked"),size:"M"},j={children:{control:{type:"text"}},icon:{control:{type:"text"},description:'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.'},size:{options:["XS","S","M"],control:{type:"select"},description:"optional, defaults to M"},onClick:{disabled:!0,description:"A callback function"},isLoading:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"}},f={component:c,title:"Clickable/ButtonIcon",args:B,argTypes:j},A=t=>{const{children:i,...I}=t;return n.jsx(c,{...I,children:i})},T=t=>{const{children:i,...I}=t;return n.jsx(o,{...I,children:i})},b=t=>{const{children:i,...I}=t;return n.jsx(u,{...I,children:i})},a=A.bind({});a.args=B;a.argTypes={...j};const s=T.bind({});s.args=B;s.argTypes={...j,isActive:{control:{type:"boolean"}}};const l=T.bind({});l.argTypes={...s.argTypes};l.args={...B,isActive:!0};const r=b.bind({});r.args=B;r.argTypes={...j,size:{options:["S","M"],control:{type:"select"},description:"optional, defaults to M"}};const g=()=>{const[t,i]=x.useState(!1);return n.jsxs(d,{gap:"XS",children:[n.jsx(c,{icon:"talend-send",onClick:e("Submitted"),type:"submit",children:"Send message"}),n.jsx(u,{icon:"talend-zoomin",onClick:e("Zoomed in"),disabled:!0,children:"Zoom in"}),n.jsx(o,{icon:"talend-collapse",onClick:()=>i(!t),isActive:t,"data-test":`test-feat-${t?"on":"off"}`,children:"Toggle drawer"})]})};g.parameters={chromatic:{disableSnapshot:!0}};const p=()=>{const[t,i]=x.useState(!1);return n.jsxs(d,{gap:"XS",children:[n.jsx(c,{icon:"talend-send",onClick:e("Submitted"),type:"submit",isLoading:!0,children:"Send message"}),n.jsx(u,{icon:"talend-zoomin",onClick:e("Zoomed in"),isLoading:!0,children:"Zoom in"}),n.jsx(o,{icon:"talend-collapse",onClick:()=>i(!t),isActive:t,isLoading:!0,children:"Toggle drawer"}),n.jsx(o,{icon:"talend-collapse",onClick:()=>i(!t),isActive:!0,isLoading:!0,children:"Toggle drawer"})]})};p.parameters={chromatic:{disableSnapshot:!0}};const S=()=>n.jsxs(d,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(C,{gap:"S",justify:"spaceAround",align:"center",children:[n.jsx("p",{children:" "}),n.jsx("h3",{children:"M"}),n.jsx("h3",{children:"S"}),n.jsx("h3",{children:"XS"})]}),n.jsxs(C,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Default"}),n.jsx(c,{icon:"plus",onClick:e("Clicked"),children:"Size M"}),n.jsx(c,{icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S"}),n.jsx(c,{size:"XS",icon:"plus",onClick:e("Clicked"),children:"Size XS"})]}),n.jsxs(C,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Floating"}),n.jsx(u,{icon:"plus",onClick:e("Clicked"),children:"Size M"}),n.jsx(u,{icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S"})]}),n.jsxs(C,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Toggle-ON"}),n.jsx(o,{isActive:!0,icon:"plus",onClick:e("Clicked"),children:"Size M + Active"}),n.jsx(o,{isActive:!0,icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S + Active"})]}),n.jsxs(C,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Toggle-OFF"}),n.jsx(o,{isActive:!1,icon:"plus",onClick:e("Clicked"),children:"Size M + Inactive"}),n.jsx(o,{isActive:!1,icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S + Inactive"})]})]});S.parameters={chromatic:{disableSnapshot:!0}};const k=()=>n.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[n.jsx(c,{icon:"plus",onClick:e("Clicked"),children:"Size M"}),n.jsx(c,{icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S"}),n.jsx(c,{icon:"plus",onClick:e("Clicked"),size:"XS",children:"Size XS"})]});k.parameters={chromatic:{disableSnapshot:!0}};const m=()=>n.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[n.jsx(o,{isActive:!1,icon:"plus",onClick:e("Clicked"),children:"Size M + Inactive"}),n.jsx(o,{isActive:!1,icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S + Inactive"}),n.jsx(o,{isActive:!0,icon:"plus",onClick:e("Clicked"),children:"Size M + Active"}),n.jsx(o,{isActive:!0,icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S + Active"})]});m.parameters={chromatic:{disableSnapshot:!0}};const h=()=>n.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[n.jsx(u,{icon:"plus",onClick:e("Clicked"),children:"Size M"}),n.jsx(u,{icon:"plus",onClick:e("Clicked"),size:"S",children:"Size S"})]});h.parameters={chromatic:{disableSnapshot:!0}};const z=()=>n.jsxs(d,{gap:"XS",align:"center",children:[n.jsx(v,{variant:"buttonIcon"}),n.jsx(v,{variant:"buttonIcon",size:"S"}),n.jsx(v,{variant:"buttonIcon",size:"XS"})]}),y=["Default","Toggle","ToggleActive","Floating","NaturalButtonProps","Loading","Variations","DefaultButtonIcon","DefaultButtonIconToggle","DefaultButtonIconFloating","ButtonIconSkeletons"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIcon {...rest}>{children}</ButtonIcon>;
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconFloating {...rest}>{children}</ButtonIconFloating>;
}`,...r.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [isActive, setActive] = useState<boolean>(false);
  return <StackHorizontal gap="XS">
            <ButtonIcon icon="talend-send" onClick={action('Submitted')} type="submit">
                Send message
            </ButtonIcon>
            <ButtonIconFloating icon="talend-zoomin" onClick={action('Zoomed in')} disabled>
                Zoom in
            </ButtonIconFloating>
            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive={isActive} data-test={\`test-feat-\${isActive ? 'on' : 'off'}\`}>
                Toggle drawer
            </ButtonIconToggle>
        </StackHorizontal>;
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [isActive, setActive] = useState<boolean>(false);
  return <StackHorizontal gap="XS">
            <ButtonIcon icon="talend-send" onClick={action('Submitted')} type="submit" isLoading>
                Send message
            </ButtonIcon>
            <ButtonIconFloating icon="talend-zoomin" onClick={action('Zoomed in')} isLoading>
                Zoom in
            </ButtonIconFloating>
            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive={isActive} isLoading>
                Toggle drawer
            </ButtonIconToggle>
            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive isLoading>
                Toggle drawer
            </ButtonIconToggle>
        </StackHorizontal>;
}`,...p.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="spaceAround" align="center">
            <p>&nbsp;</p>
            <h3>M</h3>
            <h3>S</h3>
            <h3>XS</h3>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Default</h3>
            <ButtonIcon icon="plus" onClick={action('Clicked')}>
                Size M
            </ButtonIcon>
            <ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
                Size S
            </ButtonIcon>
            <ButtonIcon size="XS" icon="plus" onClick={action('Clicked')}>
                Size XS
            </ButtonIcon>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Floating</h3>
            <ButtonIconFloating icon="plus" onClick={action('Clicked')}>
                Size M
            </ButtonIconFloating>
            <ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
                Size S
            </ButtonIconFloating>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Toggle-ON</h3>
            <ButtonIconToggle isActive icon="plus" onClick={action('Clicked')}>
                Size M + Active
            </ButtonIconToggle>
            <ButtonIconToggle isActive icon="plus" onClick={action('Clicked')} size="S">
                Size S + Active
            </ButtonIconToggle>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Toggle-OFF</h3>
            <ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')}>
                Size M + Inactive
            </ButtonIconToggle>
            <ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')} size="S">
                Size S + Inactive
            </ButtonIconToggle>
        </StackVertical>
    </StackHorizontal>`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIcon icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="XS">
            Size XS
        </ButtonIcon>
    </StackHorizontal>`,...k.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')}>
            Size M + Inactive
        </ButtonIconToggle>
        <ButtonIconToggle isActive={false} icon="plus" onClick={action('Clicked')} size="S">
            Size S + Inactive
        </ButtonIconToggle>

        <ButtonIconToggle isActive icon="plus" onClick={action('Clicked')}>
            Size M + Active
        </ButtonIconToggle>
        <ButtonIconToggle isActive icon="plus" onClick={action('Clicked')} size="S">
            Size S + Active
        </ButtonIconToggle>
    </StackHorizontal>`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIconFloating icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIconFloating>
        <ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIconFloating>
    </StackHorizontal>`,...h.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center">
        <Skeleton variant="buttonIcon" />
        <Skeleton variant="buttonIcon" size="S" />
        <Skeleton variant="buttonIcon" size="XS" />
    </StackHorizontal>`,...z.parameters?.docs?.source}}};const D=Object.freeze(Object.defineProperty({__proto__:null,ButtonIconSkeletons:z,Default:a,DefaultButtonIcon:k,DefaultButtonIconFloating:h,DefaultButtonIconToggle:m,Floating:r,Loading:p,NaturalButtonProps:g,Toggle:s,ToggleActive:l,Variations:S,__namedExportsOrder:y,default:f},Symbol.toStringTag,{value:"Module"}));export{z as B,k as D,r as F,p as L,g as N,D as S,s as T,S as V,m as a,h as b,a as c};
