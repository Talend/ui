import{j as e,r as u}from"./iframe-CfWawTfz.js";import{P as o}from"./DialogBackdrop-BORENU0g.js";import{j as v,F as x,B as d}from"./Skeleton-WqWGNSGs.js";import{a as c}from"./StackItem-DxCmUS5t.js";import"./QualityBar.component-BEOa_2t1.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-CCa96Lmg.js";import"./index-mnPuEzeF.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DqY3BSxz.js";import"./RatioBar.component-Cq1ZosWw.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,_={component:o,title:"Messaging/Popover"},h=()=>e.jsx(c,{gap:"S",children:"Hello hello"}),n=u.forwardRef((p,m)=>e.jsx(d,{onClick:l("Clicked disclosure"),...p,ref:m,children:"Open popover"})),r=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),children:"Text Content"})});r.parameters={chromatic:{disableSnapshot:!0}};const s=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(v,{onClick:l("Clicked disclosure"),icon:"question-filled",children:"Open popover"}),children:"Text Content"})});s.parameters={chromatic:{disableSnapshot:!0}};const t=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(x.Text,{name:"text",label:"Text enabled"}),children:"Text Content"})});t.parameters={chromatic:{disableSnapshot:!0}};const a=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),isFixed:!0,hasPadding:!1,children:"Text Content without padding"})});a.parameters={chromatic:{disableSnapshot:!0}};const i=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsxs(o,{"aria-label":"Custom popover",disclosure:e.jsx(n,{}),children:[p=>e.jsxs(c,{gap:"S",children:["There is some content",e.jsx(d,{onClick:()=>p?.hide(),children:"Close Me please"})]}),e.jsx(h,{})]})});i.parameters={chromatic:{disableSnapshot:!0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
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
    </div>`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />} isFixed hasPadding={false}>
            Text Content without padding
        </Popover>
    </div>`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
            {(popover: PopoverStateReturn) => <StackVertical gap="S">
                    There is some content
                    <ButtonPrimary onClick={() => popover?.hide()}>Close Me please</ButtonPrimary>
                </StackVertical>}
            <EasyPopover />
        </Popover>
    </div>`,...i.parameters?.docs?.source}}};const B=["DefaultStory","DisclosureStory","FormDisclosureStory","WithoutPaddingStory","WithFunctionAsChildren"];export{r as DefaultStory,s as DisclosureStory,t as FormDisclosureStory,i as WithFunctionAsChildren,a as WithoutPaddingStory,B as __namedExportsOrder,_ as default};
