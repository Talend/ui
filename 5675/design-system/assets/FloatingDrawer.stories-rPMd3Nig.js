import{j as a}from"./index-nXv0R8um.js";import{a as x}from"./iframe-DGvyPnos.js";import{U as e}from"./DialogBackdrop-BuzytS8-.js";import{B as p,R as h}from"./Skeleton-B1IJ9vsQ.js";import"./useCopyToClipboard-CBbDwwBs.js";import{c as b}from"./index-D5CQICtx.js";import"./TalendDesignTokens-JgHEBmOa.js";const w="_area_g4lpy_1",y={area:w},t=r=>{const{children:i,className:l,...g}=r;return a.jsx("div",{...g,className:b(y.area,l),children:i})},j={component:e,title:"Navigation/FloatingDrawer",argTypes:{"aria-label":{control:{type:"text"}},visible:{control:{type:"boolean"}},header:{table:{disable:!0}},footer:{table:{disable:!0}},children:{table:{disable:!0}},disclosure:{table:{disable:!0}}},decorators:[r=>a.jsx("div",{style:{position:"relative",height:"500px",overflow:"hidden"},children:a.jsx(r,{})})]},m={"aria-label":"simple label for a11y",header:a.jsx(t,{children:"Heading"}),children:a.jsx(t,{children:"Body"}),footer:a.jsx(t,{children:"Footer"})},f={header:a.jsx(h.Text,{defaultValue:"Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",placeholder:"Type something...",label:"Iniline edit that overflows"}),children:a.jsx(h.Textarea,{defaultValue:"Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",placeholder:"Type something...",label:"Iniline edit that overflows"})},u={width:"calc(100vw - 1.25rem)",height:"calc(100vh - 1.25rem)"},o=({disclosure:r,visible:i,...l})=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...l,visible:!0})});o.args=m;const s=({disclosure:r,visible:i,...l})=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...l,visible:!0})});s.args=f;const n=()=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...m,disclosure:a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>{},children:"Open the modal"})})}),v=()=>{const[r,i]=x.useState(!1);return a.jsxs(e.Container,{children:[a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>i(!r),children:"Open the modal"}),a.jsx(e,{...m,visible:r})]})},c=()=>a.jsx(v,{}),d=()=>a.jsx(e.Container,{children:a.jsx(e,{"aria-label":"usage example",header:a.jsx(t,{children:"Heading"}),footer:a.jsx(t,{children:"Footer"}),disclosure:a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>{},children:"Open the modal"}),children:a.jsx(t,{children:"Body"})})});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  disclosure,
  visible,
  ...props
}: FloatingDrawerProps) => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...props} visible />
    </FloatingDrawer.Container>`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  disclosure,
  visible,
  ...props
}: FloatingDrawerProps) => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...props} visible />
    </FloatingDrawer.Container>`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...defaultProps} disclosure={<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
                    Open the modal
                </ButtonPrimary>} />
    </FloatingDrawer.Container>`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"() => <ControlledFloatingDrawer />",...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <FloatingDrawer.Container>
        <FloatingDrawer aria-label="usage example" header={<Area>Heading</Area>} footer={<Area>Footer</Area>} disclosure={<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
                    Open the modal
                </ButtonPrimary>}>
            <Area>Body</Area>
        </FloatingDrawer>
    </FloatingDrawer.Container>`,...d.parameters?.docs?.source}}};const F=["Simple","Overflow","WithDisclosure","WithControlledVisibility","Usage"],A=Object.freeze(Object.defineProperty({__proto__:null,Overflow:s,Simple:o,Usage:d,WithControlledVisibility:c,WithDisclosure:n,__namedExportsOrder:F,default:j},Symbol.toStringTag,{value:"Module"}));export{A as S,d as U,n as W,o as a,c as b};
