import{j as e,r as u}from"./iframe-BXejucuQ.js";import{P as o}from"./DialogBackdrop-DY3ob1Ct.js";import{f as v,J as x,B as d}from"./Skeleton-BZy3PJWR.js";import{a as l}from"./StackItem-Dy4xUJxP.js";import"./QualityBar.component-DXGYSPWA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-D-wdZ_Tw.js";import"./index-DkODryLG.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BjI2T3UQ.js";import"./RatioBar.component-WxqsZryu.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,B={component:o,title:"Messaging/Popover"},C=()=>e.jsx(l,{gap:"S",children:"Hello hello"}),n=u.forwardRef((p,m)=>e.jsx(d,{onClick:c("Clicked disclosure"),...p,ref:m,children:"Open popover"})),r=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),children:"Text Content"})}),s=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(v,{onClick:c("Clicked disclosure"),icon:"question-filled",children:"Open popover"}),children:"Text Content"})}),t=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(x.Text,{name:"text",label:"Text enabled"}),children:"Text Content"})}),i=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),isFixed:!0,hasPadding:!1,children:"Text Content without padding"})}),a=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsxs(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),children:[p=>e.jsxs(l,{gap:"S",children:["There is some content",e.jsx(d,{onClick:()=>p?.hide(),children:"Close Me please"})]}),e.jsx(C,{})]})});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
            Text Content
        </Popover>
    </div>`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<ButtonIcon onClick={action('Clicked disclosure')} icon="question-filled">
                    Open popover
                </ButtonIcon>}>
            Text Content
        </Popover>
    </div>`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<Form.Text name="text" label="Text enabled" />}>
            Text Content
        </Popover>
    </div>`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />} isFixed hasPadding={false}>
            Text Content without padding
        </Popover>
    </div>`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
            {(popover: PopoverStateReturn) => <StackVertical gap="S">
                    There is some content
                    <ButtonPrimary onClick={() => popover?.hide()}>Close Me please</ButtonPrimary>
                </StackVertical>}
            <EasyPopover />
        </Popover>
    </div>`,...a.parameters?.docs?.source}}};const F=["DefaultStory","DisclosureStory","FormDisclosureStory","WithoutPaddingStory","WithFunctionAsChildren"];export{r as DefaultStory,s as DisclosureStory,t as FormDisclosureStory,a as WithFunctionAsChildren,i as WithoutPaddingStory,F as __namedExportsOrder,B as default};
