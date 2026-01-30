import{j as i}from"./index-ezWhUaUG.js";import{B as C,L as j}from"./index-dwteCaD7.js";import{d as V}from"./index-DrFu-skq.js";import"./DialogBackdrop-BEiEofEA.js";import{E as u,S as M,y as O,z as b,A as S}from"./Skeleton-CCG0GZp1.js";import"./iframe-DtIjfOV1.js";import"./useCopyToClipboard-DG0W1111.js";import"./index-D7QZZOrd.js";import"./TalendDesignTokens-JgHEBmOa.js";let m;const w=new Uint8Array(16);function x(){if(!m&&(m=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!m))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return m(w)}const a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));function U(t,e=0){return a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]}const W=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),A={randomUUID:W};function B(t,e,n){if(A.randomUUID&&!t)return A.randomUUID();t=t||{};const r=t.random||(t.rng||x)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,U(r)}var H=t=>t.transports!==void 0,$=()=>Math.random().toString(16).slice(2),G=class{constructor(t={}){this.sender=$(),this.events={},this.data={},this.transports=[],this.isAsync=t.async||!1,H(t)?(this.transports=t.transports||[],this.transports.forEach(e=>{e.setHandler(n=>this.handleEvent(n))})):this.transports=t.transport?[t.transport]:[],this.transports.forEach(e=>{e.setHandler(n=>this.handleEvent(n))})}get hasTransport(){return this.transports.length>0}addListener(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)}emit(t,...e){let n={type:t,args:e,from:this.sender},r={};e.length>=1&&e[0]&&e[0].options&&(r=e[0].options);let o=()=>{this.transports.forEach(y=>{y.send(n,r)}),this.handleEvent(n)};this.isAsync?setImmediate(o):o()}last(t){return this.data[t]}eventNames(){return Object.keys(this.events)}listenerCount(t){let e=this.listeners(t);return e?e.length:0}listeners(t){return this.events[t]||void 0}once(t,e){let n=this.onceListener(t,e);this.addListener(t,n)}removeAllListeners(t){t?this.events[t]&&delete this.events[t]:this.events={}}removeListener(t,e){let n=this.listeners(t);n&&(this.events[t]=n.filter(r=>r!==e))}on(t,e){this.addListener(t,e)}off(t,e){this.removeListener(t,e)}handleEvent(t){let e=this.listeners(t.type);e&&e.length&&e.forEach(n=>{n.apply(t,t.args)}),this.data[t.type]=t.args}onceListener(t,e){let n=(...r)=>(this.removeListener(t,n),e(...r));return n}};const{global:g}=__STORYBOOK_MODULE_GLOBAL__;function F(){let t={setHandler:()=>{},send:()=>{}};return new G({transport:t})}var K=class{constructor(){this.getChannel=()=>{if(!this.channel){let t=F();return this.setChannel(t),t}return this.channel},this.getServerChannel=()=>{if(!this.serverChannel)throw new Error("Accessing non-existent serverChannel");return this.serverChannel},this.ready=()=>this.promise,this.hasChannel=()=>!!this.channel,this.hasServerChannel=()=>!!this.serverChannel,this.setChannel=t=>{this.channel=t,this.resolve()},this.setServerChannel=t=>{this.serverChannel=t},this.promise=new Promise(t=>{this.resolve=()=>t(this.getChannel())})}},f="__STORYBOOK_ADDONS_PREVIEW";function z(){return g[f]||(g[f]=new K),g[f]}var Y=z(),X=class extends Error{constructor(){super(...arguments),this.data={},this.documentation=!1,this.fromStorybook=!0}get fullErrorCode(){let t=String(this.code).padStart(4,"0");return`SB_${this.category}_${t}`}get name(){let t=this.constructor.name;return`${this.fullErrorCode} (${t})`}get message(){let t;return this.documentation===!0?t=`https://storybook.js.org/error/${this.fullErrorCode}`:typeof this.documentation=="string"?t=this.documentation:Array.isArray(this.documentation)&&(t=`
${this.documentation.map(e=>`	- ${e}`).join(`
`)}`),`${this.template()}${t!=null?`

More info: ${t}
`:""}`}},q=(t=>(t.PREVIEW_CLIENT_LOGGER="PREVIEW_CLIENT-LOGGER",t.PREVIEW_CHANNELS="PREVIEW_CHANNELS",t.PREVIEW_CORE_EVENTS="PREVIEW_CORE-EVENTS",t.PREVIEW_INSTRUMENTER="PREVIEW_INSTRUMENTER",t.PREVIEW_API="PREVIEW_API",t.PREVIEW_REACT_DOM_SHIM="PREVIEW_REACT-DOM-SHIM",t.PREVIEW_ROUTER="PREVIEW_ROUTER",t.PREVIEW_THEMING="PREVIEW_THEMING",t.RENDERER_HTML="RENDERER_HTML",t.RENDERER_PREACT="RENDERER_PREACT",t.RENDERER_REACT="RENDERER_REACT",t.RENDERER_SERVER="RENDERER_SERVER",t.RENDERER_SVELTE="RENDERER_SVELTE",t.RENDERER_VUE="RENDERER_VUE",t.RENDERER_VUE3="RENDERER_VUE3",t.RENDERER_WEB_COMPONENTS="RENDERER_WEB-COMPONENTS",t))(q||{}),J=class extends X{constructor(t){super(),this.data=t,this.category="PREVIEW_API",this.code=2,this.documentation="https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function"}template(){return V`
      We detected that you use an implicit action arg during ${this.data.phase} of your story.  
      ${this.data.deprecated?`
This is deprecated and won't work in Storybook 8 anymore.
`:""}
      Please provide an explicit spy to your args like this:
        import { fn } from '@storybook/test';
        ... 
        args: {
         ${this.data.name}: fn()
        }
    `}};const{global:L}=__STORYBOOK_MODULE_GLOBAL__;var Q="storybook/actions",Z=`${Q}/action-event`,tt={depth:10,clearOnStoryChange:!0,limit:50},I=(t,e)=>{let n=Object.getPrototypeOf(t);return!n||e(n)?n:I(n,e)},et=t=>!!(typeof t=="object"&&t&&I(t,e=>/^Synthetic(?:Base)?Event$/.test(e.constructor.name))&&typeof t.persist=="function"),nt=t=>{if(et(t)){let e=Object.create(t.constructor.prototype,Object.getOwnPropertyDescriptors(t));e.persist();let n=Object.getOwnPropertyDescriptor(e,"view"),r=n?.value;return typeof r=="object"&&r?.constructor.name==="Window"&&Object.defineProperty(e,"view",{...n,value:Object.create(r.constructor.prototype)}),e}return t},rt=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?B():Date.now().toString(36)+Math.random().toString(36).substring(2);function R(t,e={}){let n={...tt,...e},r=function(...o){if(e.implicit){let T=("__STORYBOOK_PREVIEW__"in L?L.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(p=>p.phase==="playing"||p.phase==="rendering");if(T){let p=!window?.FEATURES?.disallowImplicitActionsInRenderV8,v=new J({phase:T.phase,name:t,deprecated:p});if(p)console.warn(v);else throw v}}let y=Y.getChannel(),k=rt(),D=5,_=o.map(nt),N=o.length>1?_:_[0],P={id:k,count:0,data:{name:t,args:N},options:{...n,maxDepth:D+(n.depth||3),allowFunction:n.allowFunction||!1}};y.emit(Z,P)};return r.isAction=!0,r}const at={component:u,title:"Feedback/EmptyState"},d=()=>i.jsx(u,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a dataset",onClick:()=>R("clicked"),icon:"plus",actionType:"button"},link:{href:"https://talend.com"}}),h=()=>i.jsx(C,{children:i.jsx(u,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a preparation",icon:"plus",actionType:"link",as:i.jsx(j,{to:"/preparation/new"}),"data-feature":"Preparation empty state clicked"},link:{href:"https://talend.com"}})}),s=({illustration:t,title:e,description:n,link:r,action:o})=>i.jsx(O,{illustration:t,title:e,description:n,link:r,action:o});s.args={illustration:"DEFAULT",title:"No dataset yet",description:"Add a preparation to clean, format, and transform data prior to processing.",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Create a dataset",onClick:()=>R("clicked"),icon:"plus",actionType:"button"}};s.argTypes={illustration:{control:{type:"select"},options:["ACTIVITY","CHART","CHECKLIST","DEFAULT","FLASK","LIGHTBULB","MESSAGE","PLUG","ROCKET","SEARCH","SETTINGS","USER","WARNING","IN_PROGRESS","UPDATE"],description:"Define the illustration"},title:{control:{type:"text"}},description:{control:{type:"text"}},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"}}};const E=()=>i.jsx(b,{title:"Create a preparation first"}),l=()=>i.jsxs(M,{gap:"XS",align:"center",justify:"spaceBetween",children:[i.jsx(u,{title:"This space is empty",description:"Any additional data here",action:{children:"Action",onClick:()=>R("clicked"),actionType:"button"},link:{href:"https://talend.com"}}),i.jsx(O,{title:"This space is empty",description:"Any additional data here",link:{href:"https://talend.com"}}),i.jsx(b,{title:"This space is empty"})]});l.parameters={chromatic:{disableSnapshot:!0}};const c=t=>{switch(t.variant){case"L":{const{...e}=t;return i.jsx(S,{...e})}case"M":{const{...e}=t;return i.jsx(S,{...e})}case"S":{const{variant:e,title:n}=t;return i.jsx(S,{variant:e,title:n})}default:return i.jsx(i.Fragment,{})}};c.args={variant:"L",title:"Title copy",description:"Description copy",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Action",onClick:()=>R("clicked"),actionType:"button"}};c.argTypes={variant:{options:["L","M","S"],control:{type:"select"},description:"Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead"},title:{control:{type:"text"},description:"Mandatory across variants"},description:{control:{type:"text"},description:"Mandatory for Large and Medium, unavailable for Small"},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"},description:"Optional for Large and Medium. Unavailable for Small"},illustration:{table:{disable:!0}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
  children: 'Create a dataset',
  onClick: () => sbAction('clicked'),
  icon: 'plus',
  actionType: 'button'
}} link={{
  href: 'https://talend.com'
}} />`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
    children: 'Create a preparation',
    icon: 'plus',
    actionType: 'link',
    as: <Link to="/preparation/new" />,
    'data-feature': 'Preparation empty state clicked'
  }} link={{
    href: 'https://talend.com'
  }} />
    </BrowserRouter>`,...h.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  illustration,
  title,
  description,
  link,
  action
}: any) => {
  return <EmptyStateMedium illustration={illustration} title={title} description={description} link={link} action={action} />;
}`,...s.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:'() => <EmptyStateSmall title="Create a preparation first" />',...E.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center" justify="spaceBetween">
        <EmptyStateLarge title="This space is empty" description="Any additional data here" action={{
    children: 'Action',
    onClick: () => sbAction('clicked'),
    actionType: 'button'
  }} link={{
    href: 'https://talend.com'
  }} />
        <EmptyStateMedium title="This space is empty" description="Any additional data here" link={{
    href: 'https://talend.com'
  }} />
        <EmptyStateSmall title="This space is empty" />
    </StackHorizontal>`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(args: EmptyStateProps) => {
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
}`,...c.parameters?.docs?.source}}};const it=["Large","LargeWithLinkButton","MediumWithAction","Small","Demo","Usage"],ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,Large:d,LargeWithLinkButton:h,MediumWithAction:s,Small:E,Usage:c,__namedExportsOrder:it,default:at},Symbol.toStringTag,{value:"Module"}));export{l as D,d as L,s as M,ut as S,c as U,E as a,h as b};
