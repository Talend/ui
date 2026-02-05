import{j as i}from"./iframe-cBtRg4Zm.js";import"./DialogBackdrop-D-m4yJ_1.js";import{B as m}from"./Skeleton-DpHHM55B.js";import"./StackItem-Dxh24cVz.js";import"./QualityBar.component-Dnc0mEeA.js";import{T as p}from"./Tooltip-BqZxJ9l8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BBfNNNmQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-QmhJMkIM.js";import"./RatioBar.component-b914dD6v.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,B={component:p,title:"Messaging/Tooltip"},e=c=>i.jsx(p,{...c,children:i.jsx(m,{onClick:l("clicked"),children:"Lorem ipsum"})}),n={title:"Relevant information about this basic button"},r={args:{...n,placement:"top"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},t={args:{...n,placement:"right"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},o={args:{...n,placement:"bottom"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},a={args:{...n,placement:"left"},render:e,parameters:{chromatic:{disableSnapshot:!0}}},s={args:{title:"Meaningful description"},argTypes:{title:{description:"Tooltip content giving context to the disclosure"}},render:e};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`(props: StoryFn<typeof Tooltip>) => <Tooltip {...props}>
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
}`,...s.parameters?.docs?.source}}};const O=["render","Top","Right","Bottom","Left","Usage"];export{o as Bottom,a as Left,t as Right,r as Top,s as Usage,O as __namedExportsOrder,B as default,e as render};
