import{j as i}from"./iframe-BeUrxS75.js";import"./DialogBackdrop-x4OTOzlE.js";import{B as m}from"./Skeleton-CXA10cMH.js";import"./StackItem-DJTmFzN6.js";import"./QualityBar.component-COfHaiIR.js";import{T as p}from"./Tooltip-bt00C8QA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CNWlF1CT.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-CVbE3JtA.js";import"./RatioBar.component-Djoh8F-5.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,O={component:p,title:"Messaging/Tooltip"},e=c=>i.jsx(p,{...c,children:i.jsx(m,{onClick:l("clicked"),children:"Lorem ipsum"})}),a={title:"Relevant information about this basic button"},r={args:{...a,placement:"top"},render:e},t={args:{...a,placement:"right"},render:e},o={args:{...a,placement:"bottom"},render:e},s={args:{...a,placement:"left"},render:e},n={args:{title:"Meaningful description"},argTypes:{title:{description:"Tooltip content giving context to the disclosure"}},render:e};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: StoryFn<typeof Tooltip>) => <Tooltip {...props}>
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
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Meaningful description'
  },
  argTypes: {
    title: {
      description: 'Tooltip content giving context to the disclosure'
    }
  },
  render
}`,...n.parameters?.docs?.source}}};const b=["render","Top","Right","Bottom","Left","Usage"];export{o as Bottom,s as Left,t as Right,r as Top,n as Usage,b as __namedExportsOrder,O as default,e as render};
