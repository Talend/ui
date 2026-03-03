import{j as e,c as S,at as a,au as C}from"./iframe-DLNvOUB0.js";import{D as E}from"./Dialog.component-Dl1-MyZt.js";import"./index-BayEts6e.js";import{S as l}from"./Skeleton.component-BCP_tymf.js";import{I as k}from"./constants-CZYEPhht.js";import{g as M,a as R}from"./translate-DzrbyU4a.js";import{w}from"./withTranslation-CvaP5PxU.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Be-HZH7n.js";import"./ActionButton.component-tP9JPag2.js";import"./TooltipTrigger.component-D8Bc8a6o.js";import"./index-B41yblyX.js";import"./CircularProgress.component-0xB_c5z_.js";import"./OverlayTrigger.component-Cd2iG2yL.js";import"./RootCloseWrapper-gxGhI_cZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CjhE3iYr.js";import"./Transition-CBBi_-lk.js";import"./Transition-Bfnhv3KJ.js";import"./ActionSplitDropdown.component-BcjQPHz0.js";import"./SplitButton-B4P5n9I3.js";import"./inheritsLoose-D8OOErJR.js";import"./get-DvH0MHqO.js";import"./_baseGet-BQKmBcvz.js";import"./toString-PTKgs-Bb.js";import"./isSymbol-DQOFvlp-.js";import"./eq-BPNOT68H.js";import"./omit-C8EJGJPj.js";import"./_baseSlice-BPJPZi7x.js";import"./_getTag-BYGoso54.js";import"./isArrayLike-DAxrnkzW.js";import"./DropdownButton-BYvZYhNn.js";import"./ActionIconToggle.component-IhX4fhkP.js";import"./ActionBar.component-kTWe8agS.js";import"./Actions.component-JQaUe7Sj.js";import"./Progress.component-Ur-pg0t0.js";import"./Modal-eHx2bUUz.js";import"./removeClass-B-DUduzN.js";import"./theme-BE0pQPy_.js";const T={"about-dialog":"_about-dialog_m6fsw_2","about-logo":"_about-logo_m6fsw_8","about-excerpt":"_about-excerpt_m6fsw_12","about-versions":"_about-versions_m6fsw_15"},D=M(),O=()=>({name:{key:"name",label:D.t("tui-components:SERVICE",{defaultValue:"Service"})},build:{key:"build",label:D.t("tui-components:BUILD_ID",{defaultValue:"Build ID"})},version:{key:"version",label:D.t("tui-components:VERSION",{defaultValue:"Version"})}});function p({text:r="",loading:o,size:i=l.SIZES.medium}){return o?e.jsx(l,{type:l.TYPES.text,size:i}):r}function c({definition:r=Object.values(O()),services:o=[],loading:i=!1}){return!o||!o.length?null:e.jsxs("table",{className:S(T["about-versions"],"about-versions","table table-striped"),children:[e.jsx("thead",{children:e.jsx("tr",{children:r.map(t=>e.jsx("th",{children:t.label},t.key))})}),e.jsx("tbody",{children:(i?[{name:"loading-first"},{name:"loading-second"},{name:"loading-third"}]:o).map(t=>e.jsx("tr",{children:r.map(m=>e.jsx("td",{children:e.jsx(p,{loading:i,text:t[m.key]})},m.key))},t.name))})]})}p.propTypes={text:a.string,loading:a.bool,size:a.string};c.propTypes={services:a.arrayOf(a.shape({name:a.string,version:a.string,build:a.string})),definition:a.arrayOf(a.shape({key:a.string,label:a.string})),loading:a.bool};function _({services:r,expanded:o,definition:i,show:t,product:m,version:A,loading:j,icon:y,copyrights:N,onToggle:V,onHide:P,t:d}){const L={actions:{center:[{label:o?d("LESS",{defaultValue:"Less"}):d("MORE",{defaultValue:"More"}),className:"btn-default btn-inverse",onClick:V}]}};return e.jsx(E,{header:d("ABOUT_HEADER",{defaultValue:"About {{product}}",product:m}),className:S(T["about-dialog"],"about-dialog"),type:E.TYPES.INFORMATIVE,onHide:P,actionbar:L,show:t,children:e.jsxs("div",{children:[e.jsx(C,{name:y,className:S(T["about-logo"],"about-logo"),"data-testid":"icon"}),e.jsxs("div",{className:S(T["about-excerpt"],"about-excerpt"),children:[A&&e.jsx("div",{children:e.jsx(p,{text:d("ABOUT_VERSION_NAME",{defaultValue:"Version: {{version}}",version:A,interpolation:{escapeValue:!1}}),size:l.SIZES.xlarge,loading:j})}),e.jsx("div",{children:e.jsx(p,{text:N||d("ABOUT_COPYRIGHTS",{defaultValue:"© {{year}} Talend. All rights reserved.",year:new Date().getFullYear()}),size:l.SIZES.large,loading:j})})]}),o&&e.jsx(c,{t:d,loading:j,services:r,definition:i})]})})}_.displayName="AboutDialog";_.defaultProps={t:R()};const s=w(k)(_);c.Text=p;c.getColumnHeaders=O;s.Table=c;const{fn:H}=__STORYBOOK_MODULE_TEST__,n={show:!0,onToggle:()=>H("onToggle"),version:"Summer '18",icon:"talend-tdp-colored",services:["API","Dataset","Preparation","Transformation"].map(r=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name:r}))},I=["API","Dataset","Preparation","Transformation","service2","service3","service4","service5","service6","service7","service8","service9","service12","service13","service14","service15","service16","service17","service18","service19"].map(r=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name:r})),{name:W,version:B}=s.Table.getColumnHeaders(),Oe={title:"Components/Layout/Modals/AboutModal",component:s,tags:["autodocs"],decorators:[r=>e.jsxs("div",{children:[e.jsx("h1",{children:"AboutDialog"}),r()]})]},u={args:n,render:r=>e.jsx(s,{...r})},g={args:{...n,version:null},render:r=>e.jsx(s,{...r})},x={args:{...n,loading:!0},render:r=>e.jsx(s,{...r})},b={args:{...n,expanded:!0},render:r=>e.jsx(s,{...r})},f={args:{...n,expanded:!0,services:I},render:r=>e.jsx(s,{...r})},v={args:{...n,expanded:!0,services:I,definition:[W,B]},render:r=>e.jsx(s,{...r})},h={args:{...n,expanded:!0,loading:!0},render:r=>e.jsx(s,{...r})};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: props,
  render: args => <AboutDialog {...args} />
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    version: null
  },
  render: args => <AboutDialog {...args} />
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    loading: true
  },
  render: args => <AboutDialog {...args} />
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    expanded: true
  },
  render: args => <AboutDialog {...args} />
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    expanded: true,
    services
  },
  render: args => <AboutDialog {...args} />
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    expanded: true,
    services,
    definition: [name, version]
  },
  render: args => <AboutDialog {...args} />
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...props,
    expanded: true,
    loading: true
  },
  render: args => <AboutDialog {...args} />
}`,...h.parameters?.docs?.source}}};const Ie=["Default","WithoutTheVersion","Loading","Expanded","ExpandedWithLotOfServices","WithCustomDefinition","ExpandedLoading"];export{u as Default,b as Expanded,h as ExpandedLoading,f as ExpandedWithLotOfServices,x as Loading,v as WithCustomDefinition,g as WithoutTheVersion,Ie as __namedExportsOrder,Oe as default};
