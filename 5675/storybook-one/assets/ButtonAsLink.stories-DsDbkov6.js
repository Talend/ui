import{j as t}from"./iframe-Bku7JZgU.js";import{B as S,L as B}from"./index-D7FC9E4I.js";import"./DialogBackdrop-DyNbZHzC.js";import{i as c,j as L,k as e,n as y,o as g}from"./Skeleton-lAOX6Dys.js";import{S as A,a as n}from"./StackItem-D3oZqRlk.js";import"./QualityBar.component-DMb0rk5B.js";import{T as j}from"./Tooltip-CenypqmD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-64NF8RCI.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-CaUSRA9n.js";import"./RatioBar.component-Ble0i3v5.js";const l={children:"Link label",href:"./",target:"_blank",icon:"talend-plus",size:"M"},u={children:{control:{type:"text"}},href:{control:{type:"text"}},target:{options:["_blank","_self","_parent","_top"],control:{type:"select"},description:"optional"},icon:{control:{type:"text"},description:"optional"},size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'}},Z={component:c,title:"Clickable/ButtonAsLink",parameters:{actions:{argTypesRegex:"^on[A-Z].*"}},args:l,argTypes:u},f=r=>t.jsx(c,{...r}),x=r=>t.jsx(L,{...r}),b=r=>t.jsx(g,{...r}),T=r=>t.jsx(y,{...r}),a=f.bind({});Object.assign(a,{args:l,argTypes:u});const s=T.bind({});Object.assign(s,{args:l,argTypes:u});const o=x.bind({});Object.assign(o,{args:l,argTypes:u});const i=b.bind({});Object.assign(i,{args:l,argTypes:u});const p=r=>t.jsx(j,{title:"Relevant information about contacting the support",children:t.jsx(c,{href:"/support",target:"_blank",icon:"talend-bubbles",...r,children:"Contact support"})}),d=()=>t.jsxs(A,{gap:"S",children:[t.jsx(e,{variant:"primary",href:"https://talend.com",children:"Primary Button as link"}),t.jsx(e,{variant:"destructive",href:"https://talend.com",children:"Destructive Button as link"}),t.jsx(e,{variant:"secondary",href:"https://talend.com",children:"Secondary Button as link"}),t.jsx(e,{variant:"tertiary",href:"https://talend.com",children:"Tertiary Button as link"})]}),m=()=>t.jsx(S,{children:t.jsx(L,{as:t.jsx(B,{to:"home"}),children:"Home"})}),h=()=>t.jsx(S,{children:t.jsx(e,{variant:"destructive",icon:"talend-plus-circle",as:t.jsx(B,{to:"home"}),children:"Home"})}),k=()=>t.jsxs(A,{gap:"S",justify:"spaceBetween",align:"stretch",children:[t.jsxs(n,{gap:"S",justify:"spaceAround",align:"center",children:[t.jsx("p",{children:" "}),t.jsx("h3",{children:"M"}),t.jsx("h3",{children:"S"})]}),t.jsxs(n,{gap:"S",justify:"start",align:"center",children:[t.jsx("h3",{children:"Primary"}),t.jsx(c,{icon:"upload",href:"/",children:"Label"}),t.jsx(c,{icon:"upload",href:"/",size:"S",children:"Label"})]}),t.jsxs(n,{gap:"S",justify:"start",align:"center",children:[t.jsx("h3",{children:"Destructive"}),t.jsx(y,{icon:"upload",href:"/",children:"Label"}),t.jsx(y,{icon:"upload",href:"/",size:"S",children:"Label"})]}),t.jsxs(n,{gap:"S",justify:"start",align:"center",children:[t.jsx("h3",{children:"Secondary"}),t.jsx(L,{icon:"upload",href:"/",children:"Label"}),t.jsx(L,{icon:"upload",href:"/",size:"S",children:"Label"})]}),t.jsxs(n,{gap:"S",justify:"start",align:"center",children:[t.jsx("h3",{children:"Tertiary"}),t.jsx(g,{icon:"upload",href:"/",children:"Label"}),t.jsx(g,{icon:"upload",href:"/",size:"S",children:"Label"})]})]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  return <ButtonPrimaryAsLink {...args} />;
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => {
  return <ButtonDestructiveAsLink {...args} />;
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => {
  return <ButtonSecondaryAsLink {...args} />;
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`args => {
  return <ButtonTertiaryAsLink {...args} />;
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`(props: any) => <Tooltip title="Relevant information about contacting the support">
        <ButtonPrimaryAsLink href="/support" target="_blank" icon="talend-bubbles" {...props}>
            Contact support
        </ButtonPrimaryAsLink>
    </Tooltip>`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S">
        <ButtonAsLink variant="primary" href="https://talend.com">
            Primary Button as link
        </ButtonAsLink>
        <ButtonAsLink variant="destructive" href="https://talend.com">
            Destructive Button as link
        </ButtonAsLink>
        <ButtonAsLink variant="secondary" href="https://talend.com">
            Secondary Button as link
        </ButtonAsLink>
        <ButtonAsLink variant="tertiary" href="https://talend.com">
            Tertiary Button as link
        </ButtonAsLink>
    </StackHorizontal>`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <ButtonSecondaryAsLink as={<Link to="home" />}>Home</ButtonSecondaryAsLink>
    </BrowserRouter>`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <ButtonAsLink variant="destructive" icon="talend-plus-circle" as={<Link to="home" />}>
            Home
        </ButtonAsLink>
    </BrowserRouter>`,...h.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">
        <StackVertical gap="S" justify="spaceAround" align="center">
            <p>&nbsp;</p>
            <h3>M</h3>
            <h3>S</h3>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Primary</h3>
            <ButtonPrimaryAsLink icon="upload" href="/">
                Label
            </ButtonPrimaryAsLink>
            <ButtonPrimaryAsLink icon="upload" href="/" size="S">
                Label
            </ButtonPrimaryAsLink>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Destructive</h3>
            <ButtonDestructiveAsLink icon="upload" href="/">
                Label
            </ButtonDestructiveAsLink>
            <ButtonDestructiveAsLink icon="upload" href="/" size="S">
                Label
            </ButtonDestructiveAsLink>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Secondary</h3>
            <ButtonSecondaryAsLink icon="upload" href="/">
                Label
            </ButtonSecondaryAsLink>
            <ButtonSecondaryAsLink icon="upload" href="/" size="S">
                Label
            </ButtonSecondaryAsLink>
        </StackVertical>
        <StackVertical gap="S" justify="start" align="center">
            <h3>Tertiary</h3>
            <ButtonTertiaryAsLink icon="upload" href="/">
                Label
            </ButtonTertiaryAsLink>
            <ButtonTertiaryAsLink icon="upload" href="/" size="S">
                Label
            </ButtonTertiaryAsLink>
        </StackVertical>
    </StackHorizontal>`,...k.parameters?.docs?.source}}};const q=["PrimaryAsLink","DestructiveAsLink","SecondaryAsLink","TertiaryAsLink","TooltipButton","VariantComponent","ButtonAsRouterLink","ButtonAsRouterLinkVariant","Variations"];export{m as ButtonAsRouterLink,h as ButtonAsRouterLinkVariant,s as DestructiveAsLink,a as PrimaryAsLink,o as SecondaryAsLink,i as TertiaryAsLink,p as TooltipButton,d as VariantComponent,k as Variations,q as __namedExportsOrder,Z as default};
