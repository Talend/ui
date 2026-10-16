import{j as n}from"./index--KvFR1jg.js";import{r as v}from"./iframe-RzlH1tvj.js";import"./DialogBackdrop-DKmgnz_i.js";import{B as e,S as s,a as t,b as r,T as w,c as o,d as b,e as a,f as g}from"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./index-jzd0SbQr.js";import"./TalendDesignTokens-JgHEBmOa.js";import"./index-FaKQGoXO.js";import"./preload-helper-PPVm8Dsz.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,x={children:{control:{type:"text"}},onClick:{disabled:!0,description:"A callback function"},icon:{control:{type:"text"},description:'optional. In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In small size, it only supports SizedIcon<"S"> names.'},isLoading:{control:{type:"boolean"},description:"optional"},isDropdown:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"},focusable:{control:{type:"boolean"},description:"optional"},size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'},type:{options:["button","submit","reset"],control:{type:"select"},description:'optional (default is "button")'}},X={component:e,title:"Clickable/Button",parameters:{actions:{argTypesRegex:"^on[A-Z].*"}}},P=c=>n.jsx(e,{...c}),T=c=>n.jsx(r,{...c}),V=c=>n.jsx(o,{...c}),L=c=>n.jsx(a,{...c}),l=P.bind({});l.argTypes=x;l.args={children:"Primary",onClick:i("Button clicked"),icon:"talend-plus",isLoading:!1,size:"M"};const d=T.bind({});d.argTypes=x;d.args={children:"Destructive",onClick:i("Button clicked"),icon:"talend-plus",isLoading:!1,size:"M"};const u=V.bind({});u.argTypes=x;u.args={children:"Secondary",onClick:i("Button clicked"),icon:"talend-plus",isLoading:!1,size:"M"};const p=L.bind({});p.argTypes=x;p.args={children:"Tertiary",onClick:i("Button clicked"),icon:"talend-plus",isLoading:!1,size:"M"};const S=()=>n.jsxs(s,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Default"}),n.jsx(e,{onClick:i("Clicked"),children:"Primary M"}),n.jsx(e,{onClick:i("Clicked"),size:"S",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With icon"}),n.jsx(e,{icon:"upload",onClick:i("Clicked"),children:"Primary M"}),n.jsx(e,{onClick:i("Clicked"),size:"S",icon:"upload",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With dropdown indicator"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),children:"Primary M"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Disabled"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),disabled:!0,children:"Primary M"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",disabled:!0,children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Loading"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),isLoading:!0,children:"Primary M"}),n.jsx(e,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",isLoading:!0,children:"Primary S"})]})]});S.parameters={chromatic:{disableSnapshot:!0}};const k=()=>n.jsxs(s,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Default"}),n.jsx(r,{onClick:i("Clicked"),children:"Destructive M"}),n.jsx(r,{onClick:i("Clicked"),size:"S",children:"Destructive S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With icon"}),n.jsx(r,{icon:"upload",onClick:i("Clicked"),children:"Primary M"}),n.jsx(r,{icon:"upload",onClick:i("Clicked"),size:"S",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With dropdown indicator"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),children:"Destructive M"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",children:"Destructive S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Disabled"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),disabled:!0,children:"Destructive M"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",disabled:!0,children:"Destructive S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Loading"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),isLoading:!0,children:"Destructive M"}),n.jsx(r,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",isLoading:!0,children:"Destructive S"})]})]});k.parameters={chromatic:{disableSnapshot:!0}};const y=()=>n.jsxs(s,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Default"}),n.jsx(o,{onClick:i("Clicked"),children:"Secondary M"}),n.jsx(o,{onClick:i("Clicked"),size:"S",children:"Secondary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With icon"}),n.jsx(o,{icon:"upload",onClick:i("Clicked"),children:"Primary M"}),n.jsx(o,{icon:"upload",onClick:i("Clicked"),size:"S",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With dropdown indicator"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),children:"Secondary M"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",children:"Secondary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Disabled"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),disabled:!0,children:"Secondary M"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",disabled:!0,children:"Secondary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Loading"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),isLoading:!0,children:"Secondary M"}),n.jsx(o,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",isLoading:!0,children:"Secondary S"})]})]});y.parameters={chromatic:{disableSnapshot:!0}};const h=()=>n.jsxs(s,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Default"}),n.jsx(a,{onClick:i("Clicked"),children:"Tertiary M"}),n.jsx(a,{onClick:i("Clicked"),size:"S",children:"Tertiary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With icon"}),n.jsx(a,{icon:"upload",onClick:i("Clicked"),children:"Primary M"}),n.jsx(a,{icon:"upload",onClick:i("Clicked"),size:"S",children:"Primary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"With dropdown indicator"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),children:"Tertiary M"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",children:"Tertiary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Disabled"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),disabled:!0,children:"Tertiary M"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",disabled:!0,children:"Tertiary S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Loading"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),isLoading:!0,children:"Tertiary M"}),n.jsx(a,{icon:"upload",isDropdown:!0,onClick:i("Clicked"),size:"S",isLoading:!0,children:"Tertiary S"})]})]});h.parameters={chromatic:{disableSnapshot:!0}};const j=()=>n.jsxs(s,{gap:"XS",children:[n.jsx(b,{variant:"button"}),n.jsx(b,{variant:"button",size:"S"})]}),m=c=>n.jsx(w,{title:"Relevant information about contacting the support",children:n.jsx(e,{onClick:i("I have been clicked"),icon:"talend-bubbles",...c,children:"Contact support"})}),B={render:c=>{const[z,f]=v.useState(!1);return n.jsx(w,{title:"Relevant description of the basic button",children:n.jsx(e,{icon:"talend-check",isLoading:z,onClick:()=>{f(!0),setTimeout(()=>f(!1),3e3)},...c,children:"Async call to action"})})},parameters:{chromatic:{disableSnapshot:!0}}},C=()=>n.jsxs(s,{gap:"S",justify:"spaceBetween",align:"stretch",children:[n.jsxs(t,{gap:"S",justify:"spaceAround",align:"center",children:[n.jsx("p",{children:" "}),n.jsx("h3",{children:"M"}),n.jsx("h3",{children:"S"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Primary"}),n.jsx(e,{icon:"upload",onClick:i("Clicked"),isDropdown:!0,children:"Label"}),n.jsx(e,{icon:"upload",onClick:i("Clicked"),size:"S",isDropdown:!0,children:"Label"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Destructive"}),n.jsx(r,{icon:"upload",onClick:i("Clicked"),isDropdown:!0,children:"Label"}),n.jsx(r,{icon:"upload",onClick:i("Clicked"),size:"S",isDropdown:!0,children:"Label"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Secondary"}),n.jsx(o,{icon:"upload",onClick:i("Clicked"),isDropdown:!0,children:"Label"}),n.jsx(o,{icon:"upload",onClick:i("Clicked"),size:"S",isDropdown:!0,children:"Label"})]}),n.jsxs(t,{gap:"S",justify:"start",align:"center",children:[n.jsx("h3",{children:"Tertiary"}),n.jsx(a,{icon:"upload",onClick:i("Clicked"),isDropdown:!0,children:"Label"}),n.jsx(a,{icon:"upload",onClick:i("Clicked"),size:"S",isDropdown:!0,children:"Label"})]})]});C.parameters={chromatic:{disableSnapshot:!0}};const D=()=>n.jsxs(s,{gap:"S",children:[n.jsx(g,{variant:"primary",onClick:i("Clicked"),children:"Primary Button"}),n.jsx(g,{variant:"destructive",onClick:i("Clicked"),children:"Destructive Button"}),n.jsx(g,{variant:"secondary",onClick:i("Clicked"),children:"Secondary Button"}),n.jsx(g,{variant:"tertiary",onClick:i("Clicked"),children:"Tertiary Button"})]}),K=["Primary","Destructive","Secondary","Tertiary","PrimaryVariations","DestructiveVariations","SecondaryVariations","TertiaryVariations","SkeletonButton","TooltipButton","Loading","Variations","VariantComponent"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => {
  return <ButtonPrimary {...args} />;
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => {
  return <ButtonDestructive {...args} />;
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => {
  return <ButtonSecondary {...args} />;
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => {
  return <ButtonTertiary {...args} />;
}`,...p.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="start" align="center">
            <h3>Default</h3>
            <ButtonPrimary onClick={action('Clicked')}>Primary M</ButtonPrimary>
            <ButtonPrimary onClick={action('Clicked')} size="S">
                Primary S
            </ButtonPrimary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With icon</h3>
            <ButtonPrimary icon="upload" onClick={action('Clicked')}>
                Primary M
            </ButtonPrimary>
            <ButtonPrimary onClick={action('Clicked')} size="S" icon="upload">
                Primary S
            </ButtonPrimary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With dropdown indicator</h3>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')}>
                Primary M
            </ButtonPrimary>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S">
                Primary S
            </ButtonPrimary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Disabled</h3>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} disabled>
                Primary M
            </ButtonPrimary>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
                Primary S
            </ButtonPrimary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Loading</h3>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
                Primary M
            </ButtonPrimary>
            <ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
                Primary S
            </ButtonPrimary>
        </StackVertical>
    </StackHorizontal>`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="start" align="center">
            <h3>Default</h3>
            <ButtonDestructive onClick={action('Clicked')}>Destructive M</ButtonDestructive>
            <ButtonDestructive onClick={action('Clicked')} size="S">
                Destructive S
            </ButtonDestructive>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With icon</h3>
            <ButtonDestructive icon="upload" onClick={action('Clicked')}>
                Primary M
            </ButtonDestructive>
            <ButtonDestructive icon="upload" onClick={action('Clicked')} size="S">
                Primary S
            </ButtonDestructive>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With dropdown indicator</h3>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')}>
                Destructive M
            </ButtonDestructive>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S">
                Destructive S
            </ButtonDestructive>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Disabled</h3>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} disabled>
                Destructive M
            </ButtonDestructive>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
                Destructive S
            </ButtonDestructive>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Loading</h3>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} isLoading>
                Destructive M
            </ButtonDestructive>
            <ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
                Destructive S
            </ButtonDestructive>
        </StackVertical>
    </StackHorizontal>`,...k.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="start" align="center">
            <h3>Default</h3>
            <ButtonSecondary onClick={action('Clicked')}>Secondary M</ButtonSecondary>
            <ButtonSecondary onClick={action('Clicked')} size="S">
                Secondary S
            </ButtonSecondary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With icon</h3>
            <ButtonSecondary icon="upload" onClick={action('Clicked')}>
                Primary M
            </ButtonSecondary>
            <ButtonSecondary icon="upload" onClick={action('Clicked')} size="S">
                Primary S
            </ButtonSecondary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With dropdown indicator</h3>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')}>
                Secondary M
            </ButtonSecondary>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S">
                Secondary S
            </ButtonSecondary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Disabled</h3>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} disabled>
                Secondary M
            </ButtonSecondary>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
                Secondary S
            </ButtonSecondary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Loading</h3>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
                Secondary M
            </ButtonSecondary>
            <ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
                Secondary S
            </ButtonSecondary>
        </StackVertical>
    </StackHorizontal>`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="start" align="center">
            <h3>Default</h3>
            <ButtonTertiary onClick={action('Clicked')}>Tertiary M</ButtonTertiary>
            <ButtonTertiary onClick={action('Clicked')} size="S">
                Tertiary S
            </ButtonTertiary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With icon</h3>
            <ButtonTertiary icon="upload" onClick={action('Clicked')}>
                Primary M
            </ButtonTertiary>
            <ButtonTertiary icon="upload" onClick={action('Clicked')} size="S">
                Primary S
            </ButtonTertiary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>With dropdown indicator</h3>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')}>
                Tertiary M
            </ButtonTertiary>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S">
                Tertiary S
            </ButtonTertiary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Disabled</h3>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} disabled>
                Tertiary M
            </ButtonTertiary>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
                Tertiary S
            </ButtonTertiary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Loading</h3>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
                Tertiary M
            </ButtonTertiary>
            <ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
                Tertiary S
            </ButtonTertiary>
        </StackVertical>
    </StackHorizontal>`,...h.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  return <StackHorizontal gap="XS">
            <Skeleton variant="button" />
            <Skeleton variant="button" size="S" />
        </StackHorizontal>;
}`,...j.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`(props: Story<BaseButtonProps<AvailableSizes>>) => <Tooltip title="Relevant information about contacting the support">
        <ButtonPrimary onClick={action('I have been clicked')} icon="talend-bubbles" {...props}>
            Contact support
        </ButtonPrimary>
    </Tooltip>`,...m.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: (props: Story<BaseButtonProps<AvailableSizes>>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, isLoading] = useState(false);
    return <Tooltip title="Relevant description of the basic button">
                <ButtonPrimary icon="talend-check" isLoading={loading} onClick={() => {
        isLoading(true);
        setTimeout(() => isLoading(false), 3000);
      }} {...props}>
                    Async call to action
                </ButtonPrimary>
            </Tooltip>;
  },
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...B.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="spaceAround" align="center">
            <p>&nbsp;</p>
            <h3>M</h3>
            <h3>S</h3>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Primary</h3>
            <ButtonPrimary icon="upload" onClick={action('Clicked')} isDropdown>
                Label
            </ButtonPrimary>
            <ButtonPrimary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
                Label
            </ButtonPrimary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Destructive</h3>
            <ButtonDestructive icon="upload" onClick={action('Clicked')} isDropdown>
                Label
            </ButtonDestructive>
            <ButtonDestructive icon="upload" onClick={action('Clicked')} size="S" isDropdown>
                Label
            </ButtonDestructive>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Secondary</h3>
            <ButtonSecondary icon="upload" onClick={action('Clicked')} isDropdown>
                Label
            </ButtonSecondary>
            <ButtonSecondary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
                Label
            </ButtonSecondary>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Tertiary</h3>
            <ButtonTertiary icon="upload" onClick={action('Clicked')} isDropdown>
                Label
            </ButtonTertiary>
            <ButtonTertiary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
                Label
            </ButtonTertiary>
        </StackVertical>
    </StackHorizontal>`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S">
        <Button variant="primary" onClick={action('Clicked')}>
            Primary Button
        </Button>
        <Button variant="destructive" onClick={action('Clicked')}>
            Destructive Button
        </Button>
        <Button variant="secondary" onClick={action('Clicked')}>
            Secondary Button
        </Button>
        <Button variant="tertiary" onClick={action('Clicked')}>
            Tertiary Button
        </Button>
    </StackHorizontal>`,...D.parameters?.docs?.source}}};export{d as Destructive,k as DestructiveVariations,B as Loading,l as Primary,S as PrimaryVariations,u as Secondary,y as SecondaryVariations,j as SkeletonButton,p as Tertiary,h as TertiaryVariations,m as TooltipButton,D as VariantComponent,C as Variations,K as __namedExportsOrder,X as default};
