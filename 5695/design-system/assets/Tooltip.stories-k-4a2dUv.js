import{j as c}from"./index-BeRoqjfO.js";import"./DialogBackdrop-BDgqVk1C.js";import{T as i,B as m}from"./Skeleton-XhJlLQkP.js";import"./iframe-0koiw-N4.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./index-osoKd-JR.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,d={component:i,title:"Messaging/Tooltip"},e=p=>c.jsx(i,{...p,children:c.jsx(m,{onClick:l("clicked"),children:"Lorem ipsum"})}),n={title:"Relevant information about this basic button"},r={args:{...n,placement:"top"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},t={args:{...n,placement:"right"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},o={args:{...n,placement:"bottom"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},a={args:{...n,placement:"left"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},s={args:{title:"Meaningful description"},argTypes:{title:{description:"Tooltip content giving context to the disclosure"}},render:e};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: StoryFn<typeof Tooltip>) => <Tooltip {...props}>
        <ButtonPrimary onClick={action('clicked')}>Lorem ipsum</ButtonPrimary>
    </Tooltip>`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'top'
  },
  render,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'right'
  },
  render,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'bottom'
  },
  render,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'left'
  },
  render,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Meaningful description'
  },
  argTypes: {
    title: {
      description: 'Tooltip content giving context to the disclosure'
    }
  },
  render
}`,...s.parameters?.docs?.source}}};const u=["render","Top","Right","Bottom","Left","Usage"],y=Object.freeze(Object.defineProperty({__proto__:null,Bottom:o,Left:a,Right:t,Top:r,Usage:s,__namedExportsOrder:u,default:d,render:e},Symbol.toStringTag,{value:"Module"}));export{o as B,a as L,t as R,y as S,r as T,s as U};
