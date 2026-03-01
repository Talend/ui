import{j as e,r as x}from"./iframe-cBtRg4Zm.js";import"./DialogBackdrop-D-m4yJ_1.js";import{j as c,S as v,k as a,l as n}from"./Skeleton-DpHHM55B.js";import{S as l,a as p}from"./StackItem-Dxh24cVz.js";import"./QualityBar.component-Dnc0mEeA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-BqZxJ9l8.js";import"./index-BBfNNNmQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-QmhJMkIM.js";import"./RatioBar.component-b914dD6v.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,z={children:"Action label",icon:"plus",action:t("Button clicked"),size:"M"},j={children:{control:{type:"text"}},icon:{control:{type:"text"},description:'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.'},size:{options:["XS","S","M"],control:{type:"select"},description:"optional, defaults to M"},onClick:{disabled:!0,description:"A callback function"},isLoading:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"}},Z={component:c,title:"Clickable/ButtonIcon",args:z,argTypes:j},T=o=>{const{children:i,...g}=o;return e.jsx(c,{...g,children:i})},A=o=>{const{children:i,...g}=o;return e.jsx(n,{...g,children:i})},f=o=>{const{children:i,...g}=o;return e.jsx(a,{...g,children:i})},r=T.bind({});r.args=z;r.argTypes={...j};const s=A.bind({});s.args=z;s.argTypes={...j,isActive:{control:{type:"boolean"}}};const u=A.bind({});u.argTypes={...s.argTypes};u.args={...z,isActive:!0};const d=f.bind({});d.args=z;d.argTypes={...j,size:{options:["S","M"],control:{type:"select"},description:"optional, defaults to M"}};const S=()=>{const[o,i]=x.useState(!1);return e.jsxs(l,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",children:"Send message"}),e.jsx(a,{icon:"talend-zoomin",onClick:t("Zoomed in"),disabled:!0,children:"Zoom in"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:o,"data-test":`test-feat-${o?"on":"off"}`,children:"Toggle drawer"})]})};S.parameters={chromatic:{disableSnapshot:!0}};const k=()=>{const[o,i]=x.useState(!1);return e.jsxs(l,{gap:"XS",children:[e.jsx(c,{icon:"talend-send",onClick:t("Submitted"),type:"submit",isLoading:!0,children:"Send message"}),e.jsx(a,{icon:"talend-zoomin",onClick:t("Zoomed in"),isLoading:!0,children:"Zoom in"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:o,isLoading:!0,children:"Toggle drawer"}),e.jsx(n,{icon:"talend-collapse",onClick:()=>i(!o),isActive:!0,isLoading:!0,children:"Toggle drawer"})]})};k.parameters={chromatic:{disableSnapshot:!0}};const m=()=>e.jsxs(l,{gap:"S",justify:"spaceBetween",align:"stretch",children:[e.jsxs(p,{gap:"S",justify:"spaceAround",align:"center",children:[e.jsx("p",{children:" "}),e.jsx("h3",{children:"M"}),e.jsx("h3",{children:"S"}),e.jsx("h3",{children:"XS"})]}),e.jsxs(p,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Default"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{size:"XS",icon:"plus",onClick:t("Clicked"),children:"Size XS"})]}),e.jsxs(p,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Floating"}),e.jsx(a,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(a,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]}),e.jsxs(p,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-ON"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]}),e.jsxs(p,{gap:"S",justify:"start",align:"center",children:[e.jsx("h3",{children:"Toggle-OFF"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"})]})]});m.parameters={chromatic:{disableSnapshot:!0}};const h=()=>e.jsxs(l,{gap:"XS",justify:"center",align:"center",children:[e.jsx(c,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"}),e.jsx(c,{icon:"plus",onClick:t("Clicked"),size:"XS",children:"Size XS"})]});h.parameters={chromatic:{disableSnapshot:!0}};const I=()=>e.jsxs(l,{gap:"XS",justify:"center",align:"center",children:[e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),children:"Size M + Inactive"}),e.jsx(n,{isActive:!1,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Inactive"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),children:"Size M + Active"}),e.jsx(n,{isActive:!0,icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S + Active"})]});I.parameters={chromatic:{disableSnapshot:!0}};const C=()=>e.jsxs(l,{gap:"XS",justify:"center",align:"center",children:[e.jsx(a,{icon:"plus",onClick:t("Clicked"),children:"Size M"}),e.jsx(a,{icon:"plus",onClick:t("Clicked"),size:"S",children:"Size S"})]});C.parameters={chromatic:{disableSnapshot:!0}};const B=()=>e.jsxs(l,{gap:"XS",align:"center",children:[e.jsx(v,{variant:"buttonIcon"}),e.jsx(v,{variant:"buttonIcon",size:"S"}),e.jsx(v,{variant:"buttonIcon",size:"XS"})]});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIcon {...rest}>{children}</ButtonIcon>;
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;
}`,...s.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => {
  const {
    children,
    ...rest
  } = args;
  return <ButtonIconFloating {...rest}>{children}</ButtonIconFloating>;
}`,...d.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
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
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
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
}`,...k.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
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
    </StackHorizontal>`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIcon icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIcon>
        <ButtonIcon icon="plus" onClick={action('Clicked')} size="XS">
            Size XS
        </ButtonIcon>
    </StackHorizontal>`,...h.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
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
    </StackHorizontal>`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" justify="center" align="center">
        <ButtonIconFloating icon="plus" onClick={action('Clicked')}>
            Size M
        </ButtonIconFloating>
        <ButtonIconFloating icon="plus" onClick={action('Clicked')} size="S">
            Size S
        </ButtonIconFloating>
    </StackHorizontal>`,...C.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center">
        <Skeleton variant="buttonIcon" />
        <Skeleton variant="buttonIcon" size="S" />
        <Skeleton variant="buttonIcon" size="XS" />
    </StackHorizontal>`,...B.parameters?.docs?.source}}};const N=["Default","Toggle","ToggleActive","Floating","NaturalButtonProps","Loading","Variations","DefaultButtonIcon","DefaultButtonIconToggle","DefaultButtonIconFloating","ButtonIconSkeletons"];export{B as ButtonIconSkeletons,r as Default,h as DefaultButtonIcon,C as DefaultButtonIconFloating,I as DefaultButtonIconToggle,d as Floating,k as Loading,S as NaturalButtonProps,s as Toggle,u as ToggleActive,m as Variations,N as __namedExportsOrder,Z as default};
