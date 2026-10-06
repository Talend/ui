import{j as e}from"./index--KvFR1jg.js";import{r as u}from"./iframe-RzlH1tvj.js";import{P as n}from"./DialogBackdrop-DKmgnz_i.js";import{l as v,F as x,a as l,B as d}from"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./index-jzd0SbQr.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,h={component:n,title:"Messaging/Popover"},C=()=>e.jsx(l,{gap:"S",children:"Hello hello"}),p=u.forwardRef((i,m)=>e.jsx(d,{onClick:c("Clicked disclosure"),...i,ref:m,children:"Open popover"})),o=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(n,{"aria-label":"Custom popover",disclosure:e.jsx(p,{}),children:"Text Content"})});o.parameters={chromatic:{disableSnapshot:!0}};const r=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(n,{"aria-label":"Custom popover",disclosure:e.jsx(v,{onClick:c("Clicked disclosure"),icon:"question-filled",children:"Open popover"}),children:"Text Content"})});r.parameters={chromatic:{disableSnapshot:!0}};const s=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(n,{"aria-label":"Custom popover",disclosure:e.jsx(x.Text,{name:"text",label:"Text enabled"}),children:"Text Content"})});s.parameters={chromatic:{disableSnapshot:!0}};const t=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(n,{"aria-label":"Custom popover",disclosure:e.jsx(p,{}),isFixed:!0,hasPadding:!1,children:"Text Content without padding"})});t.parameters={chromatic:{disableSnapshot:!0}};const a=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsxs(n,{"aria-label":"Custom popover",disclosure:e.jsx(p,{}),children:[i=>e.jsxs(l,{gap:"S",children:["There is some content",e.jsx(d,{onClick:()=>i?.hide(),children:"Close Me please"})]}),e.jsx(C,{})]})});a.parameters={chromatic:{disableSnapshot:!0}};const S=["DefaultStory","DisclosureStory","FormDisclosureStory","WithoutPaddingStory","WithFunctionAsChildren"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
            Text Content
        </Popover>
    </div>`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<ButtonIcon onClick={action('Clicked disclosure')} icon="question-filled">
                    Open popover
                </ButtonIcon>}>
            Text Content
        </Popover>
    </div>`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<Form.Text name="text" label="Text enabled" />}>
            Text Content
        </Popover>
    </div>`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />} isFixed hasPadding={false}>
            Text Content without padding
        </Popover>
    </div>`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0.75rem'
}}>
        <Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
            {(popover: PopoverStateReturn) => <StackVertical gap="S">
                    There is some content
                    <ButtonPrimary onClick={() => popover?.hide()}>Close Me please</ButtonPrimary>
                </StackVertical>}
            <EasyPopover />
        </Popover>
    </div>`,...a.parameters?.docs?.source}}};const O=Object.freeze(Object.defineProperty({__proto__:null,DefaultStory:o,DisclosureStory:r,FormDisclosureStory:s,WithFunctionAsChildren:a,WithoutPaddingStory:t,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{o as D,s as F,O as S,t as W,r as a,a as b};
