import{j as t}from"./index-BKmC8BMb.js";import{B as f,L as g}from"./index-BhHP5Aqg.js";import"./DialogBackdrop-Cbd085Ma.js";import{E as p,S as k,y as u,z as y,A as m}from"./Skeleton-3zSxPD92.js";import"./iframe-6xoihbFb.js";import"./useCopyToClipboard-B_5KTjks.js";import"./index-BKlMgWzD.js";import"./TalendDesignTokens-JgHEBmOa.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,E={component:p,title:"Feedback/EmptyState"},i=()=>t.jsx(p,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a dataset",onClick:()=>l("clicked")(),icon:"plus",actionType:"button"},link:{href:"https://talend.com"}}),s=()=>t.jsx(f,{children:t.jsx(p,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a preparation",icon:"plus",actionType:"link",as:t.jsx(g,{to:"/preparation/new"}),"data-feature":"Preparation empty state clicked"},link:{href:"https://talend.com"}})}),a=({illustration:n,title:e,description:d,link:S,action:h})=>t.jsx(u,{illustration:n,title:e,description:d,link:S,action:h});a.args={illustration:"DEFAULT",title:"No dataset yet",description:"Add a preparation to clean, format, and transform data prior to processing.",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Create a dataset",onClick:()=>l("clicked")(),icon:"plus",actionType:"button"}};a.argTypes={illustration:{control:{type:"select"},options:["ACTIVITY","CHART","CHECKLIST","DEFAULT","FLASK","LIGHTBULB","MESSAGE","PLUG","ROCKET","SEARCH","SETTINGS","USER","WARNING","IN_PROGRESS","UPDATE"],description:"Define the illustration"},title:{control:{type:"text"}},description:{control:{type:"text"}},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"}}};const c=()=>t.jsx(y,{title:"Create a preparation first"}),o=()=>t.jsxs(k,{gap:"XS",align:"center",justify:"spaceBetween",children:[t.jsx(p,{title:"This space is empty",description:"Any additional data here",action:{children:"Action",onClick:()=>l("clicked")(),actionType:"button"},link:{href:"https://talend.com"}}),t.jsx(u,{title:"This space is empty",description:"Any additional data here",link:{href:"https://talend.com"}}),t.jsx(y,{title:"This space is empty"})]});o.parameters={chromatic:{disableSnapshot:!0}};const r=n=>{switch(n.variant){case"L":{const{...e}=n;return t.jsx(m,{...e})}case"M":{const{...e}=n;return t.jsx(m,{...e})}case"S":{const{variant:e,title:d}=n;return t.jsx(m,{variant:e,title:d})}default:return t.jsx(t.Fragment,{})}};r.args={variant:"L",title:"Title copy",description:"Description copy",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Action",onClick:()=>l("clicked")(),actionType:"button"}};r.argTypes={variant:{options:["L","M","S"],control:{type:"select"},description:"Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead"},title:{control:{type:"text"},description:"Mandatory across variants"},description:{control:{type:"text"},description:"Mandatory for Large and Medium, unavailable for Small"},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"},description:"Optional for Large and Medium. Unavailable for Small"},illustration:{table:{disable:!0}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
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
    </BrowserRouter>`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  illustration,
  title,
  description,
  link,
  action
}: any) => {
  return <EmptyStateMedium illustration={illustration} title={title} description={description} link={link} action={action} />;
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:'() => <EmptyStateSmall title="Create a preparation first" />',...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center" justify="spaceBetween">
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
    </StackHorizontal>`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(args: EmptyStateProps) => {
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
}`,...r.parameters?.docs?.source}}};const L=["Large","LargeWithLinkButton","MediumWithAction","Small","Demo","Usage"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,Large:i,LargeWithLinkButton:s,MediumWithAction:a,Small:c,Usage:r,__namedExportsOrder:L,default:E},Symbol.toStringTag,{value:"Module"}));export{o as D,i as L,a as M,_ as S,r as U,c as a,s as b};
