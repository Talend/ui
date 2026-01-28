import{j as c}from"./index-BjJ1gK4Q.js";import"./DialogBackdrop-DrwYyHz3.js";import{T as i,B as m}from"./Skeleton-BJ-qTseU.js";import"./iframe-BWotmeKP.js";import"./useCopyToClipboard-Bz_CjoHD.js";import"./index-CKY2Phf9.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,d={component:i,title:"Messaging/Tooltip"},e=p=>c.jsx(i,{...p,children:c.jsx(m,{onClick:l("clicked"),children:"Lorem ipsum"})}),n={title:"Relevant information about this basic button"},r={args:{...n,placement:"top"},render:e},t={args:{...n,placement:"right"},render:e},o={args:{...n,placement:"bottom"},render:e},s={args:{...n,placement:"left"},render:e},a={args:{title:"Meaningful description"},argTypes:{title:{description:"Tooltip content giving context to the disclosure"}},render:e};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: StoryFn<typeof Tooltip>) => <Tooltip {...props}>
        <ButtonPrimary onClick={action('clicked')}>Lorem ipsum</ButtonPrimary>
    </Tooltip>`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'top'
  },
  render
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'right'
  },
  render
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'bottom'
  },
  render
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    placement: 'left'
  },
  render
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Meaningful description'
  },
  argTypes: {
    title: {
      description: 'Tooltip content giving context to the disclosure'
    }
  },
  render
}`,...a.parameters?.docs?.source}}};const u=["render","Top","Right","Bottom","Left","Usage"],P=Object.freeze(Object.defineProperty({__proto__:null,Bottom:o,Left:s,Right:t,Top:r,Usage:a,__namedExportsOrder:u,default:d,render:e},Symbol.toStringTag,{value:"Module"}));export{o as B,s as L,t as R,P as S,r as T,a as U};
