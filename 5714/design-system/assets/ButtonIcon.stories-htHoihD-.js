import{j as e}from"./index-BeRoqjfO.js";import{r as x}from"./iframe-0koiw-N4.js";import"./DialogBackdrop-BDgqVk1C.js";import{l as c,S as d,d as v,m as u,n,a as C}from"./Skeleton-XhJlLQkP.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./index-osoKd-JR.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,B={children:"Action label",icon:"plus",action:t("Button clicked"),size:"M"},j={children:{control:{type:"text"}},icon:{control:{type:"text"},description:'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.'},size:{options:["XS","S","M"],control:{type:"select"},description:"optional, defaults to M"},onClick:{disabled:!0,description:"A callback function"},isLoading:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"}},f={component:c,title:"Clickable/ButtonIcon",args:B,argTypes:j},A=o=>{const{children:i,...I}=o;return e.jsx(c,{...I,children:i})},T=o=>{const{children:i,...I}=o;return e.jsx(n,{...I,children:i})},b=o=>{const{children:i,...I}=o;return e.jsx(u,{...I,children:i})},a=A.bind({});a.args=B;a.argTypes={...j};const s=T.bind({});s.args=B;s.argTypes={...j,isActive:{control:{type:"boolean"}}};const l=T.bind({});l.argTypes={...s.argTypes};l.args={...B,isActive:!0};const r=b.bind({});r.args=B;r.argTypes={...j,size:{options:["S","M"],control:{type:"select"},description:"optional, defaults to M"}};const g=()=>{const[o,i]=x.useState(!1);return e.jsxs(d,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",children:"Send message"}),e.jsx(u,{icon:"talend-zoomin",onClick:t("Zoomed in"),disabled:!0,children:"Zoom in"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:o,"data-test":`test-feat-${o?"on":"off"}`,children:"Toggle drawer"})]})};g.parameters={chromatic:{disableSnapshot:!0}};const p=()=>{const[o,i]=x.useState(!1);return e.jsxs(d,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",isLoading:!0,children:"Send message"}),e.jsx(u,{icon:"talend-zoomin",onClick:t("Zoomed in"),isLoading:!0,children:"Zoom in"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:o,isLoading:!0,children:"Toggle drawer"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:!0,isLoading:!0,children:"Toggle drawer"})]})};p.parameters={chromatic:{disableSnapshot:!0}};const S=()=>e.jsxs(d,{gap:"S",justify:"spaceBetween",align:"stretch",children:[e.jsxs(C,{gap:"S",justify:"spaceAround",align:"center",children:[e.jsx("p",{children:" "}),e.jsx("h3",{children:"M"}),e.jsx("h3",{children:"S"}),e.jsx("h3",{children:"XS"})]}),e.jsxs(C,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Default"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{size:"XS",icon:"plus",onClick:t("Clicked"),children:"Size XS"})]}),e.jsxs(C,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Floating"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]}),e.jsxs(C,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-ON"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]}),e.jsxs(C,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-OFF"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"})]})]});S.parameters={chromatic:{disableSnapshot:!0}};const k=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"XS",children:"Size XS"})]});k.parameters={chromatic:{disableSnapshot:!0}};const m=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]});m.parameters={chromatic:{disableSnapshot:!0}};const h=()=>e.jsxs(d,{gap:"XS",justify:"center",align:"center",children:[e.jsx(u,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(u,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]});h.parameters={chromatic:{disableSnapshot:!0}};const z=()=>e.jsxs(d,{gap:"XS",align:"center",children:[e.jsx(v,{variant:"buttonIcon"}),e.jsx(v,{variant:"buttonIcon",size:"S"}),e.jsx(v,{variant:"buttonIcon",size:"XS"})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
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
    </StackHorizontal>`,...z.parameters?.docs?.source}}};const y=["Default","Toggle","ToggleActive","Floating","NaturalButtonProps","Loading","Variations","DefaultButtonIcon","DefaultButtonIconToggle","DefaultButtonIconFloating","ButtonIconSkeletons"],D=Object.freeze(Object.defineProperty({__proto__:null,ButtonIconSkeletons:z,Default:a,DefaultButtonIcon:k,DefaultButtonIconFloating:h,DefaultButtonIconToggle:m,Floating:r,Loading:p,NaturalButtonProps:g,Toggle:s,ToggleActive:l,Variations:S,__namedExportsOrder:y,default:f},Symbol.toStringTag,{value:"Module"}));export{z as B,k as D,r as F,p as L,g as N,D as S,s as T,S as V,m as a,h as b,a as c};
