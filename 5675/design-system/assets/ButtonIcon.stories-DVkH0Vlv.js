import{j as e}from"./index-DqyI3zNy.js";import{a as x}from"./iframe-BqCCNGDC.js";import"./DialogBackdrop-Bbhqy77d.js";import{l as c,m as o,n as u,S as d,d as S,e as v}from"./Skeleton-DhSiadqt.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./index-3dZT5jlp.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,B={children:"Action label",icon:"plus",action:t("Button clicked"),size:"M"},j={children:{control:{type:"text"}},icon:{control:{type:"text"},description:'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.'},size:{options:["XS","S","M"],control:{type:"select"},description:"optional, defaults to M"},onClick:{disabled:!0,description:"A callback function"},isLoading:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"}},f={component:c,title:"Clickable/ButtonIcon",args:B,argTypes:j},A=n=>{const{children:i,...g}=n;return e.jsx(c,{...g,children:i})},T=n=>{const{children:i,...g}=n;return e.jsx(o,{...g,children:i})},y=n=>{const{children:i,...g}=n;return e.jsx(u,{...g,children:i})},a=A.bind({});a.args=B;a.argTypes={...j};const s=T.bind({});s.args=B;s.argTypes={...j,isActive:{control:{type:"boolean"}}};const l=T.bind({});l.argTypes={...s.argTypes};l.args={...B,isActive:!0};const r=y.bind({});r.args=B;r.argTypes={...j,size:{options:["S","M"],control:{type:"select"},description:"optional, defaults to M"}};const p=()=>{const[n,i]=x.useState(!1);return e.jsxs(d,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",children:"Send message"}),e.jsx(u,{icon:"talend-zoomin",onClick:t("Zoomed in"),disabled:!0,children:"Zoom in"}),e.jsx(o,{icon:"talend-collapse",onClick:()=>i(!n),isActive:n,"data-test":`test-feat-${n?"on":"off"}`,children:"Toggle drawer"})]})},k=()=>{const[n,i]=x.useState(!1);return e.jsxs(d,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",isLoading:!0,children:"Send message"}),e.jsx(u,{icon:"talend-zoomin",onClick:t("Zoomed in"),isLoading:!0,children:"Zoom in"}),e.jsx(o,{icon:"talend-collapse",onClick:()=>i(!n),isActive:n,isLoading:!0,children:"Toggle drawer"}),e.jsx(o,{icon:"talend-collapse",onClick:()=>i(!n),isActive:!0,isLoading:!0,children:"Toggle drawer"})]})},I=()=>e.jsxs(d,{gap:"S",justify:"spaceBetween",align:"stretch",children:[e.jsxs(S,{gap:"S",justify:"spaceAround",align:"center",children:[e.jsx("p",{children:" "}),e.jsx("h3",{children:"M"}),e.jsx("h3",{children:"S"}),e.jsx("h3",{children:"XS"})]}),e.jsxs(S,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Default"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{size:"XS",icon:"plus",onClick:t("Clicked"),children:"Size XS"})]}),e.jsxs(S,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Floating"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]}),e.jsxs(S,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-ON"}),e.jsx(o,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(o,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]}),e.jsxs(S,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-OFF"}),e.jsx(o,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(o,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"})]})]}),m=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"XS",children:"Size XS"})]}),C=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(o,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(o,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"}),e.jsx(o,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(o,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]}),z=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(u,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]}),h=()=>e.jsxs(d,{gap:"XS",align:"center",children:[e.jsx(v,{variant:"buttonIcon"}),e.jsx(v,{variant:"buttonIcon",size:"S"}),e.jsx(v,{variant:"buttonIcon",size:"XS"})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
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
}`,...r.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
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
}`,...p.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
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
}`,...k.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
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
    </StackHorizontal>`,...I.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIcon icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="XS">
            Size XS
        </ButtonIcon>
    </StackHorizontal>`,...m.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
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
    </StackHorizontal>`,...C.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIconFloating icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIconFloating>
        <ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIconFloating>
    </StackHorizontal>`,...z.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center">
        <Skeleton variant="buttonIcon" />
        <Skeleton variant="buttonIcon" size="S" />
        <Skeleton variant="buttonIcon" size="XS" />
    </StackHorizontal>`,...h.parameters?.docs?.source}}};const b=["Default","Toggle","ToggleActive","Floating","NaturalButtonProps","Loading","Variations","DefaultButtonIcon","DefaultButtonIconToggle","DefaultButtonIconFloating","ButtonIconSkeletons"],D=Object.freeze(Object.defineProperty({__proto__:null,ButtonIconSkeletons:h,Default:a,DefaultButtonIcon:m,DefaultButtonIconFloating:z,DefaultButtonIconToggle:C,Floating:r,Loading:k,NaturalButtonProps:p,Toggle:s,ToggleActive:l,Variations:I,__namedExportsOrder:b,default:f},Symbol.toStringTag,{value:"Module"}));export{h as B,m as D,r as F,k as L,p as N,D as S,s as T,I as V,C as a,z as b,a as c};
