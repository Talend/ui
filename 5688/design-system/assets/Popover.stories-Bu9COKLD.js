import{j as e}from"./index-BfyV6fgH.js";import{r as u}from"./iframe-DB7vHRjW.js";import{P as o}from"./DialogBackdrop-Cck8yRo6.js";import{l as v,O as x,a as d,B as p}from"./Skeleton-DfZ5cPl-.js";import"./useCopyToClipboard-4_wheD1f.js";import"./index-BzQ6li6Y.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,C={component:o,title:"Messaging/Popover"},h=()=>e.jsx(d,{gap:"S",children:"Hello hello"}),l=u.forwardRef((n,m)=>e.jsx(p,{onClick:c("Clicked disclosure"),...n,ref:m,children:"Open popover"})),r=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(l,{}),children:"Text Content"})}),s=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(v,{onClick:c("Clicked disclosure"),icon:"question-filled",children:"Open popover"}),children:"Text Content"})}),t=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(x.Text,{name:"text",label:"Text enabled"}),children:"Text Content"})}),a=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsx(o,{"aria-label":"Custom popover",disclosure:e.jsx(l,{}),isFixed:!0,hasPadding:!1,children:"Text Content without padding"})}),i=()=>e.jsx("div",{style:{padding:"0.75rem"},children:e.jsxs(o,{"aria-label":"Custom popover",disclosure:e.jsx(l,{}),children:[n=>e.jsxs(d,{gap:"S",children:["There is some content",e.jsx(p,{onClick:()=>n?.hide(),children:"Close Me please"})]}),e.jsx(h,{})]})});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
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
    </div>`,...i.parameters?.docs?.source}}};const P=["DefaultStory","DisclosureStory","FormDisclosureStory","WithoutPaddingStory","WithFunctionAsChildren"],f=Object.freeze(Object.defineProperty({__proto__:null,DefaultStory:r,DisclosureStory:s,FormDisclosureStory:t,WithFunctionAsChildren:i,WithoutPaddingStory:a,__namedExportsOrder:P,default:C},Symbol.toStringTag,{value:"Module"}));export{r as D,t as F,f as S,a as W,s as a,i as b};
