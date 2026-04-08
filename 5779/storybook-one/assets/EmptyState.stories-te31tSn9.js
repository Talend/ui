import{j as t}from"./iframe-BlAwZJYC.js";import{B as f,L as k}from"./index-7YTMC5wb.js";import"./DialogBackdrop-BSg65b44.js";import{E as p,m as u,n as y,o as m}from"./Skeleton-D0lLe003.js";import{S as g}from"./StackItem-DkSbbvif.js";import"./QualityBar.component-SCrntrWu.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-Bn_p-8iW.js";import"./index-BKee8JyD.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-Bz1h2jYx.js";import"./RatioBar.component-C0SvtxBD.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,O={component:p,title:"Feedback/EmptyState"},i=()=>t.jsx(p,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a dataset",onClick:()=>l("clicked")(),icon:"plus",actionType:"button"},link:{href:"https://talend.com"}}),s=()=>t.jsx(f,{children:t.jsx(p,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a preparation",icon:"plus",actionType:"link",as:t.jsx(k,{to:"/preparation/new"}),"data-feature":"Preparation empty state clicked"},link:{href:"https://talend.com"}})}),r=({illustration:a,title:e,description:d,link:S,action:h})=>t.jsx(u,{illustration:a,title:e,description:d,link:S,action:h});r.args={illustration:"DEFAULT",title:"No dataset yet",description:"Add a preparation to clean, format, and transform data prior to processing.",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Create a dataset",onClick:()=>l("clicked")(),icon:"plus",actionType:"button"}};r.argTypes={illustration:{control:{type:"select"},options:["ACTIVITY","CHART","CHECKLIST","DEFAULT","FLASK","LIGHTBULB","MESSAGE","PLUG","ROCKET","SEARCH","SETTINGS","USER","WARNING","IN_PROGRESS","UPDATE"],description:"Define the illustration"},title:{control:{type:"text"}},description:{control:{type:"text"}},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"}}};const c=()=>t.jsx(y,{title:"Create a preparation first"}),o=()=>t.jsxs(g,{gap:"XS",align:"center",justify:"spaceBetween",children:[t.jsx(p,{title:"This space is empty",description:"Any additional data here",action:{children:"Action",onClick:()=>l("clicked")(),actionType:"button"},link:{href:"https://talend.com"}}),t.jsx(u,{title:"This space is empty",description:"Any additional data here",link:{href:"https://talend.com"}}),t.jsx(y,{title:"This space is empty"})]});o.parameters={chromatic:{disableSnapshot:!0}};const n=a=>{switch(a.variant){case"L":{const{...e}=a;return t.jsx(m,{...e})}case"M":{const{...e}=a;return t.jsx(m,{...e})}case"S":{const{variant:e,title:d}=a;return t.jsx(m,{variant:e,title:d})}default:return t.jsx(t.Fragment,{})}};n.args={variant:"L",title:"Title copy",description:"Description copy",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Action",onClick:()=>l("clicked")(),actionType:"button"}};n.argTypes={variant:{options:["L","M","S"],control:{type:"select"},description:"Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead"},title:{control:{type:"text"},description:"Mandatory across variants"},description:{control:{type:"text"},description:"Mandatory for Large and Medium, unavailable for Small"},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"},description:"Optional for Large and Medium. Unavailable for Small"},illustration:{table:{disable:!0}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
  children: 'Create a dataset',
  onClick: () => action('clicked')(),
  icon: 'plus',
  actionType: 'button'
}} link={{
  href: 'https://talend.com'
}} />`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
    children: 'Create a preparation',
    icon: 'plus',
    actionType: 'link',
    as: <Link to="/preparation/new" />,
    'data-feature': 'Preparation empty state clicked'
  }} link={{
    href: 'https://talend.com'
  }} />
    </BrowserRouter>`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`({
  illustration,
  title,
  description,
  link,
  action
}: any) => {
  return <EmptyStateMedium illustration={illustration} title={title} description={description} link={link} action={action} />;
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:'() => <EmptyStateSmall title="Create a preparation first" />',...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center" justify="spaceBetween">
        <EmptyStateLarge title="This space is empty" description="Any additional data here" action={{
    children: 'Action',
    onClick: () => action('clicked')(),
    actionType: 'button'
  }} link={{
    href: 'https://talend.com'
  }} />
        <EmptyStateMedium title="This space is empty" description="Any additional data here" link={{
    href: 'https://talend.com'
  }} />
        <EmptyStateSmall title="This space is empty" />
    </StackHorizontal>`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(args: EmptyStateProps) => {
  switch (args.variant) {
    case 'L':
      {
        const {
          ...rest
        } = args;
        return <EmptyState {...rest} />;
      }
    case 'M':
      {
        const {
          ...rest
        } = args;
        return <EmptyState {...rest} />;
      }
    case 'S':
      {
        const {
          variant,
          title
        } = args;
        return <EmptyState variant={variant} title={title} />;
      }
    default:
      {
        return <></>;
      }
  }
}`,...n.parameters?.docs?.source}}};const N=["Large","LargeWithLinkButton","MediumWithAction","Small","Demo","Usage"];export{o as Demo,i as Large,s as LargeWithLinkButton,r as MediumWithAction,c as Small,n as Usage,N as __namedExportsOrder,O as default};
