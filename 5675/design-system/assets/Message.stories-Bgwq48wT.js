import{j as t}from"./index-Dhfj2E11.js";import{M as y,w as m,x as f,y as r,z as u,A as S,C as k,E as C,F as p,G as D,H as g,I as M,J as b,K as h}from"./DialogBackdrop-5SPCz04Q.js";import{S as i}from"./Skeleton-B3m-S_Aq.js";import"./iframe-Bhwq12Bt.js";import"./useCopyToClipboard-Bw1cKZv-.js";import"./index-D8nj1xkF.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,T={component:y,title:"Messaging/Message"},n=()=>t.jsxs(i,{gap:"M",children:[t.jsx(m,{title:"All good",titleInfo:"system",description:"This component is well configured",link:{href:"https://talend.com",children:"Learn more"},action:{children:"See",onClick:e("action clicked")},additionalIconAction:{children:"Dismiss",onClick:e("dismiss clicked"),icon:"trash"},children:t.jsxs(i,{gap:"S",children:[t.jsx(f,{children:"Good"})," ",t.jsx(r,{children:"Default"})]})}),t.jsx(u,{title:"Very very long title with reflow because it’s too long please don’t do that it’s way too long.",titleInfo:"1 minute ago",description:"There is an issue with the component configuration",link:{href:"https://talend.com",children:"Learn more"},additionalIconAction:{children:"Dismiss",onClick:e("dismiss clicked"),icon:"trash"},children:t.jsxs(i,{gap:"S",children:[t.jsx(S,{children:"Error"})," ",t.jsx(r,{children:"Default"})]})}),t.jsx(k,{title:"Type incompatibilities",description:"Maybe resolve this issue before doing anything else",link:{href:"https://talend.com",children:"Learn more"},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]},children:t.jsxs(i,{gap:"S",children:[t.jsx(C,{children:"Bindings"})," ",t.jsx(r,{children:"Default"})]})}),t.jsx(p,{title:"Auto mapping",description:"Some fields has been auto mapped",link:{href:"https://talend.com",children:"Learn more"},action:{children:"Dismiss",onClick:e("action clicked")},children:t.jsx(i,{gap:"S",children:t.jsx(r,{children:"Default"})})})]}),a=()=>t.jsxs(i,{gap:"M",children:[t.jsx(m,{link:{href:"https://talend.com",children:"Learn more"},description:"This component is well configured",children:t.jsx(D,{children:"Beta"})}),t.jsx(u,{description:"There is an issue with the component configuration",action:{children:"See",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}}),t.jsx(k,{description:"Maybe resolve this issue before doing anything else"}),t.jsx(p,{title:"Auto mapping",description:"Some fields has been auto mapped"})]}),A=d=>t.jsx(p,{...d}),o=A.bind({});o.argTypes={action:{control:{type:"object"}},additionalDropdownActions:{control:{type:"object"}},title:{control:{type:"text"}},description:{control:{type:"text"}},link:{control:{type:"object"}},children:{control:{type:"text"},description:"optional"}};o.args={action:{children:"See",onClick:()=>{}},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]},title:"Information Title",description:"Maybe resolve this issue before doing anything else",link:{href:"https://talend.com",children:"Learn more"}};const c=()=>t.jsxs(i,{gap:"M",children:[t.jsx(g,{description:"Try resolving it this way or consult the documentation for more info.",title:"Success",action:{children:"See all (3)",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}}),t.jsx(M,{title:"Error",description:"(n) input fields have been automatically mapped to an output.",action:{children:"See all (3)",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}}),t.jsx(b,{title:"Warning",description:"Try resolving it this way or consult the documentation for more info.",action:{children:"See all (3)",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}}),t.jsx(h,{description:"(n) input fields have been automatically mapped to an output.",title:"Information",action:{children:"See all (3)",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}})]}),s=()=>t.jsxs(i,{gap:"M",children:[t.jsx(g,{action:{children:"See all (3)",onClick:e("action clicked")},title:"Success",description:"(n) input fields have been automatically mapped to an output."}),t.jsx(b,{title:"Warning",description:"Try resolving it this way or consult the documentation for more info.",action:{children:"See all (3)",onClick:e("action clicked")},additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}})]}),x=d=>t.jsx(h,{...d}),l=x.bind({});l.args={action:{children:"See",onClick:()=>{}},title:"Information Title",description:"Maybe resolve this issue before doing anything else",additionalDropdownActions:{"aria-label":"Additional actions",items:[{label:"Select all",type:"button",onClick:e("select all clicked")},{label:"Dismiss",type:"button",onClick:e("dismiss clicked")},{label:"Delete",type:"button",onClick:e("delete clicked")}]}};l.argTypes={action:{control:{type:"object"}},title:{control:{type:"text"}},description:{control:{type:"text"}},additionalDropdownActions:{control:{type:"object"}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="M">
        <MessageSuccess title="All good" titleInfo="system" description="This component is well configured" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} action={{
    children: 'See',
    onClick: action('action clicked')
  }} additionalIconAction={{
    children: 'Dismiss',
    onClick: action('dismiss clicked'),
    icon: 'trash'
  }}>
            <StackHorizontal gap="S">
                <TagSuccess>Good</TagSuccess> <TagDefault>Default</TagDefault>
            </StackHorizontal>
        </MessageSuccess>
        <MessageDestructive title="Very very long title with reflow because it’s too long please don’t do that it’s way too long." titleInfo="1 minute ago" description="There is an issue with the component configuration" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} additionalIconAction={{
    children: 'Dismiss',
    onClick: action('dismiss clicked'),
    icon: 'trash'
  }}>
            <StackHorizontal gap="S">
                <TagDestructive>Error</TagDestructive> <TagDefault>Default</TagDefault>
            </StackHorizontal>
        </MessageDestructive>
        <MessageWarning title="Type incompatibilities" description="Maybe resolve this issue before doing anything else" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }}>
            <StackHorizontal gap="S">
                <TagWarning>Bindings</TagWarning> <TagDefault>Default</TagDefault>
            </StackHorizontal>
        </MessageWarning>
        <MessageInformation title="Auto mapping" description="Some fields has been auto mapped" link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} action={{
    children: 'Dismiss',
    onClick: action('action clicked')
  }}>
            <StackHorizontal gap="S">
                <TagDefault>Default</TagDefault>
            </StackHorizontal>
        </MessageInformation>
    </StackHorizontal>`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="M">
        <MessageSuccess link={{
    href: 'https://talend.com',
    children: 'Learn more'
  }} description="This component is well configured">
            <TagBeta>Beta</TagBeta>
        </MessageSuccess>
        <MessageDestructive description="There is an issue with the component configuration" action={{
    children: 'See',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
        <MessageWarning description="Maybe resolve this issue before doing anything else" />
        <MessageInformation title="Auto mapping" description="Some fields has been auto mapped" />
    </StackHorizontal>`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => {
  return <MessageInformation {...args} />;
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="M">
        <MessageCollectionSuccess description="Try resolving it this way or consult the documentation for more info." title="Success" action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
        <MessageCollectionDestructive title="Error" description="(n) input fields have been automatically mapped to an output." action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
        <MessageCollectionWarning title="Warning" description="Try resolving it this way or consult the documentation for more info." action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
        <MessageCollectionInformation description="(n) input fields have been automatically mapped to an output." title="Information" action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
    </StackHorizontal>`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="M">
        <MessageCollectionSuccess action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} title="Success" description="(n) input fields have been automatically mapped to an output." />
        <MessageCollectionWarning title="Warning" description="Try resolving it this way or consult the documentation for more info." action={{
    children: 'See all (3)',
    onClick: action('action clicked')
  }} additionalDropdownActions={{
    'aria-label': 'Additional actions',
    items: [{
      label: 'Select all',
      type: 'button',
      onClick: action('select all clicked')
    }, {
      label: 'Dismiss',
      type: 'button',
      onClick: action('dismiss clicked')
    }, {
      label: 'Delete',
      type: 'button',
      onClick: action('delete clicked')
    }]
  }} />
    </StackHorizontal>`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => {
  return <MessageCollectionInformation {...args} />;
}`,...l.parameters?.docs?.source}}};const j=["DefaultMessageDemo","WithPropVariation","MessageInformationTemplateStory","DefaultMessageCollectionDemo","MessageCollectionWithPropVariation","MessageCollectionInformationTemplateStory"],L=Object.freeze(Object.defineProperty({__proto__:null,DefaultMessageCollectionDemo:c,DefaultMessageDemo:n,MessageCollectionInformationTemplateStory:l,MessageCollectionWithPropVariation:s,MessageInformationTemplateStory:o,WithPropVariation:a,__namedExportsOrder:j,default:T},Symbol.toStringTag,{value:"Module"}));export{n as D,o as M,L as S,a as W,c as a,s as b,l as c};
