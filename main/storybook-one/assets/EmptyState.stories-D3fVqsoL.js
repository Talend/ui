import{j as i}from"./iframe-BIQdka0S.js";import{B as P,L as V}from"./index-hIGc9mXS.js";import"./DialogBackdrop-CLocgwTr.js";import{E as T,m as D,n as N,o as L}from"./Skeleton-DXH-WuXo.js";import{S as j}from"./StackItem-CdXvWGX0.js";import"./QualityBar.component-QMP15WVC.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-BxZe7Ex5.js";import"./index-zCjvTWZI.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-CZ1LJOWj.js";import"./RatioBar.component-oiNmnVL-.js";let g;const M=new Uint8Array(16);function w(){if(!g&&(g=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!g))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return g(M)}const a=[];for(let t=0;t<256;++t)a.push((t+256).toString(16).slice(1));function x(t,e=0){return a[t[e+0]]+a[t[e+1]]+a[t[e+2]]+a[t[e+3]]+"-"+a[t[e+4]]+a[t[e+5]]+"-"+a[t[e+6]]+a[t[e+7]]+"-"+a[t[e+8]]+a[t[e+9]]+"-"+a[t[e+10]]+a[t[e+11]]+a[t[e+12]]+a[t[e+13]]+a[t[e+14]]+a[t[e+15]]}const U=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),k={randomUUID:U};function W(t,e,n){if(k.randomUUID&&!t)return k.randomUUID();t=t||{};const r=t.random||(t.rng||w)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,x(r)}var B=t=>t.transports!==void 0,H=()=>Math.random().toString(16).slice(2),$=class{constructor(t={}){this.sender=H(),this.events={},this.data={},this.transports=[],this.isAsync=t.async||!1,B(t)?(this.transports=t.transports||[],this.transports.forEach(e=>{e.setHandler(n=>this.handleEvent(n))})):this.transports=t.transport?[t.transport]:[],this.transports.forEach(e=>{e.setHandler(n=>this.handleEvent(n))})}get hasTransport(){return this.transports.length>0}addListener(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)}emit(t,...e){let n={type:t,args:e,from:this.sender},r={};e.length>=1&&e[0]&&e[0].options&&(r=e[0].options);let c=()=>{this.transports.forEach(m=>{m.send(n,r)}),this.handleEvent(n)};this.isAsync?setImmediate(c):c()}last(t){return this.data[t]}eventNames(){return Object.keys(this.events)}listenerCount(t){let e=this.listeners(t);return e?e.length:0}listeners(t){return this.events[t]||void 0}once(t,e){let n=this.onceListener(t,e);this.addListener(t,n)}removeAllListeners(t){t?this.events[t]&&delete this.events[t]:this.events={}}removeListener(t,e){let n=this.listeners(t);n&&(this.events[t]=n.filter(r=>r!==e))}on(t,e){this.addListener(t,e)}off(t,e){this.removeListener(t,e)}handleEvent(t){let e=this.listeners(t.type);e&&e.length&&e.forEach(n=>{n.apply(t,t.args)}),this.data[t.type]=t.args}onceListener(t,e){let n=(...r)=>(this.removeListener(t,n),e(...r));return n}};const{global:I}=__STORYBOOK_MODULE_GLOBAL__;function G(){let t={setHandler:()=>{},send:()=>{}};return new $({transport:t})}var F=class{constructor(){this.getChannel=()=>{if(!this.channel){let t=G();return this.setChannel(t),t}return this.channel},this.getServerChannel=()=>{if(!this.serverChannel)throw new Error("Accessing non-existent serverChannel");return this.serverChannel},this.ready=()=>this.promise,this.hasChannel=()=>!!this.channel,this.hasServerChannel=()=>!!this.serverChannel,this.setChannel=t=>{this.channel=t,this.resolve()},this.setServerChannel=t=>{this.serverChannel=t},this.promise=new Promise(t=>{this.resolve=()=>t(this.getChannel())})}},O="__STORYBOOK_ADDONS_PREVIEW";function K(){return I[O]||(I[O]=new F),I[O]}var Y=K(),z=class extends Error{constructor(){super(...arguments),this.data={},this.documentation=!1,this.fromStorybook=!0}get fullErrorCode(){let t=String(this.code).padStart(4,"0");return`SB_${this.category}_${t}`}get name(){let t=this.constructor.name;return`${this.fullErrorCode} (${t})`}get message(){let t;return this.documentation===!0?t=`https://storybook.js.org/error/${this.fullErrorCode}`:typeof this.documentation=="string"?t=this.documentation:Array.isArray(this.documentation)&&(t=`
${this.documentation.map(e=>`	- ${e}`).join(`
`)}`),`${this.template()}${t!=null?`

More info: ${t}
`:""}`}};function X(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=Array.from(typeof t=="string"?[t]:t);r[r.length-1]=r[r.length-1].replace(/\r?\n([\t ]*)$/,"");var c=r.reduce(function(s,d){var p=d.match(/\n([\t ]+|(?!\s).)/g);return p?s.concat(p.map(function(R){var l,o;return(o=(l=R.match(/[\t ]/g))===null||l===void 0?void 0:l.length)!==null&&o!==void 0?o:0})):s},[]);if(c.length){var m=new RegExp(`
[	 ]{`+Math.min.apply(Math,c)+"}","g");r=r.map(function(s){return s.replace(m,`
`)})}r[0]=r[0].replace(/^\r?\n/,"");var u=r[0];return e.forEach(function(s,d){var p=u.match(/(?:^|\n)( *)$/),R=p?p[1]:"",l=s;typeof s=="string"&&s.includes(`
`)&&(l=String(s).split(`
`).map(function(o,y){return y===0?o:""+R+o}).join(`
`)),u+=l+r[d+1]}),u}var q=(t=>(t.PREVIEW_CLIENT_LOGGER="PREVIEW_CLIENT-LOGGER",t.PREVIEW_CHANNELS="PREVIEW_CHANNELS",t.PREVIEW_CORE_EVENTS="PREVIEW_CORE-EVENTS",t.PREVIEW_INSTRUMENTER="PREVIEW_INSTRUMENTER",t.PREVIEW_API="PREVIEW_API",t.PREVIEW_REACT_DOM_SHIM="PREVIEW_REACT-DOM-SHIM",t.PREVIEW_ROUTER="PREVIEW_ROUTER",t.PREVIEW_THEMING="PREVIEW_THEMING",t.RENDERER_HTML="RENDERER_HTML",t.RENDERER_PREACT="RENDERER_PREACT",t.RENDERER_REACT="RENDERER_REACT",t.RENDERER_SERVER="RENDERER_SERVER",t.RENDERER_SVELTE="RENDERER_SVELTE",t.RENDERER_VUE="RENDERER_VUE",t.RENDERER_VUE3="RENDERER_VUE3",t.RENDERER_WEB_COMPONENTS="RENDERER_WEB-COMPONENTS",t))(q||{}),J=class extends z{constructor(t){super(),this.data=t,this.category="PREVIEW_API",this.code=2,this.documentation="https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function"}template(){return X`
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
    `}};const{global:b}=__STORYBOOK_MODULE_GLOBAL__;var Q="storybook/actions",Z=`${Q}/action-event`,tt={depth:10,clearOnStoryChange:!0,limit:50},C=(t,e)=>{let n=Object.getPrototypeOf(t);return!n||e(n)?n:C(n,e)},et=t=>!!(typeof t=="object"&&t&&C(t,e=>/^Synthetic(?:Base)?Event$/.test(e.constructor.name))&&typeof t.persist=="function"),nt=t=>{if(et(t)){let e=Object.create(t.constructor.prototype,Object.getOwnPropertyDescriptors(t));e.persist();let n=Object.getOwnPropertyDescriptor(e,"view"),r=n?.value;return typeof r=="object"&&r?.constructor.name==="Window"&&Object.defineProperty(e,"view",{...n,value:Object.create(r.constructor.prototype)}),e}return t},rt=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?W():Date.now().toString(36)+Math.random().toString(36).substring(2);function A(t,e={}){let n={...tt,...e},r=function(...c){if(e.implicit){let l=("__STORYBOOK_PREVIEW__"in b?b.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(o=>o.phase==="playing"||o.phase==="rendering");if(l){let o=!window?.FEATURES?.disallowImplicitActionsInRenderV8,y=new J({phase:l.phase,name:t,deprecated:o});if(o)console.warn(y);else throw y}}let m=Y.getChannel(),u=rt(),s=5,d=c.map(nt),p=c.length>1?d:d[0],R={id:u,count:0,data:{name:t,args:p},options:{...n,maxDepth:s+(n.depth||3),allowFunction:n.allowFunction||!1}};m.emit(Z,R)};return r.isAction=!0,r}const yt={component:T,title:"Feedback/EmptyState"},S=()=>i.jsx(T,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a dataset",onClick:()=>A("clicked"),icon:"plus",actionType:"button"},link:{href:"https://talend.com"}}),f=()=>i.jsx(P,{children:i.jsx(T,{title:"No preparations yet",description:"Add a preparation to clean, format, and transform data prior to processing.",action:{children:"Create a preparation",icon:"plus",actionType:"link",as:i.jsx(V,{to:"/preparation/new"}),"data-feature":"Preparation empty state clicked"},link:{href:"https://talend.com"}})}),h=({illustration:t,title:e,description:n,link:r,action:c})=>i.jsx(D,{illustration:t,title:e,description:n,link:r,action:c});h.args={illustration:"DEFAULT",title:"No dataset yet",description:"Add a preparation to clean, format, and transform data prior to processing.",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Create a dataset",onClick:()=>A("clicked"),icon:"plus",actionType:"button"}};h.argTypes={illustration:{control:{type:"select"},options:["ACTIVITY","CHART","CHECKLIST","DEFAULT","FLASK","LIGHTBULB","MESSAGE","PLUG","ROCKET","SEARCH","SETTINGS","USER","WARNING","IN_PROGRESS","UPDATE"],description:"Define the illustration"},title:{control:{type:"text"}},description:{control:{type:"text"}},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"}}};const _=()=>i.jsx(N,{title:"Create a preparation first"}),v=()=>i.jsxs(j,{gap:"XS",align:"center",justify:"spaceBetween",children:[i.jsx(T,{title:"This space is empty",description:"Any additional data here",action:{children:"Action",onClick:()=>A("clicked"),actionType:"button"},link:{href:"https://talend.com"}}),i.jsx(D,{title:"This space is empty",description:"Any additional data here",link:{href:"https://talend.com"}}),i.jsx(N,{title:"This space is empty"})]}),E=t=>{switch(t.variant){case"L":{const{...e}=t;return i.jsx(L,{...e})}case"M":{const{...e}=t;return i.jsx(L,{...e})}case"S":{const{variant:e,title:n}=t;return i.jsx(L,{variant:e,title:n})}default:return i.jsx(i.Fragment,{})}};E.args={variant:"L",title:"Title copy",description:"Description copy",link:{href:"https://talend.com","data-feature":"Feature name"},action:{children:"Action",onClick:()=>A("clicked"),actionType:"button"}};E.argTypes={variant:{options:["L","M","S"],control:{type:"select"},description:"Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead"},title:{control:{type:"text"},description:"Mandatory across variants"},description:{control:{type:"text"},description:"Mandatory for Large and Medium, unavailable for Small"},link:{control:{type:"object"},description:"Optional for Large and Medium, unavailable for Small"},action:{control:{type:"object"},description:"Optional for Large and Medium. Unavailable for Small"},illustration:{table:{disable:!0}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
  children: 'Create a dataset',
  onClick: () => sbAction('clicked'),
  icon: 'plus',
  actionType: 'button'
}} link={{
  href: 'https://talend.com'
}} />`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <EmptyStateLarge title="No preparations yet" description="Add a preparation to clean, format, and transform data prior to processing." action={{
    children: 'Create a preparation',
    icon: 'plus',
    actionType: 'link',
    as: <Link to="/preparation/new" />,
    'data-feature': 'Preparation empty state clicked'
  }} link={{
    href: 'https://talend.com'
  }} />
    </BrowserRouter>`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`({
  illustration,
  title,
  description,
  link,
  action
}: any) => {
  return <EmptyStateMedium illustration={illustration} title={title} description={description} link={link} action={action} />;
}`,...h.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:'() => <EmptyStateSmall title="Create a preparation first" />',..._.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="XS" align="center" justify="spaceBetween">
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
    </StackHorizontal>`,...v.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`(args: EmptyStateProps) => {
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
}`,...E.parameters?.docs?.source}}};const gt=["Large","LargeWithLinkButton","MediumWithAction","Small","Demo","Usage"];export{v as Demo,S as Large,f as LargeWithLinkButton,h as MediumWithAction,_ as Small,E as Usage,gt as __namedExportsOrder,yt as default};
