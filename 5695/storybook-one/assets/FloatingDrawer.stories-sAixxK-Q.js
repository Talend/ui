import{j as a,c as x,r as w}from"./iframe-BPWKJ2_o.js";import{R as e}from"./DialogBackdrop-CrzrVb0J.js";import{B as p,z as h}from"./Skeleton-D9kfpN0R.js";import"./StackItem-CWCRAuJY.js";import"./QualityBar.component-CQHjCcWe.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-TWX-3lPp.js";import"./index-Deb_DsOu.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-5lMdqHLm.js";import"./RatioBar.component-Bc2UGGoG.js";const b="_area_g4lpy_1",y={area:b},o=r=>{const{children:t,className:s,...g}=r;return a.jsx("div",{...g,className:x(y.area,s),children:t})},T={component:e,title:"Navigation/FloatingDrawer",argTypes:{"aria-label":{control:{type:"text"}},visible:{control:{type:"boolean"}},header:{table:{disable:!0}},footer:{table:{disable:!0}},children:{table:{disable:!0}},disclosure:{table:{disable:!0}}},decorators:[r=>a.jsx("div",{style:{position:"relative",height:"500px",overflow:"hidden"},children:a.jsx(r,{})})]},m={"aria-label":"simple label for a11y",header:a.jsx(o,{children:"Heading"}),children:a.jsx(o,{children:"Body"}),footer:a.jsx(o,{children:"Footer"})},j={header:a.jsx(h.Text,{defaultValue:"Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",placeholder:"Type something...",label:"Iniline edit that overflows"}),children:a.jsx(h.Textarea,{defaultValue:"Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",placeholder:"Type something...",label:"Iniline edit that overflows"})},u={width:"calc(100vw - 1.25rem)",height:"calc(100vh - 1.25rem)"},i=({disclosure:r,visible:t,...s})=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...s,visible:!0})});i.args=m;const l=({disclosure:r,visible:t,...s})=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...s,visible:!0})});l.args=j;const n=()=>a.jsx(e.Container,{style:u,children:a.jsx(e,{...m,disclosure:a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>{},children:"Open the modal"})})}),F=()=>{const[r,t]=w.useState(!1);return a.jsxs(e.Container,{children:[a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>t(!r),children:"Open the modal"}),a.jsx(e,{...m,visible:r})]})},c=()=>a.jsx(F,{}),d=()=>a.jsx(e.Container,{children:a.jsx(e,{"aria-label":"usage example",header:a.jsx(o,{children:"Heading"}),footer:a.jsx(o,{children:"Footer"}),disclosure:a.jsx(p,{"data-test":"drawer-disclosure",onClick:()=>{},children:"Open the modal"}),children:a.jsx(o,{children:"Body"})})});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  disclosure,
  visible,
  ...props
}: FloatingDrawerProps) => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...props} visible />
    </FloatingDrawer.Container>`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
  disclosure,
  visible,
  ...props
}: FloatingDrawerProps) => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...props} visible />
    </FloatingDrawer.Container>`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <FloatingDrawer.Container style={containerStyle}>
        <FloatingDrawer {...defaultProps} disclosure={<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
                    Open the modal
                </ButtonPrimary>} />
    </FloatingDrawer.Container>`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"() => <ControlledFloatingDrawer />",...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <FloatingDrawer.Container>
        <FloatingDrawer aria-label="usage example" header={<Area>Heading</Area>} footer={<Area>Footer</Area>} disclosure={<ButtonPrimary data-test="drawer-disclosure" onClick={() => {}}>
                    Open the modal
                </ButtonPrimary>}>
            <Area>Body</Area>
        </FloatingDrawer>
    </FloatingDrawer.Container>`,...d.parameters?.docs?.source}}};const V=["Simple","Overflow","WithDisclosure","WithControlledVisibility","Usage"];export{l as Overflow,i as Simple,d as Usage,c as WithControlledVisibility,n as WithDisclosure,V as __namedExportsOrder,T as default};
