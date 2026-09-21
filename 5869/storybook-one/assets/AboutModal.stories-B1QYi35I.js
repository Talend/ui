import{j as e,c as S,aa as a,ab as C}from"./iframe-BQ6GoR_5.js";import{D as E}from"./Dialog.component-DoYdnXR5.js";import"./index-D7kuL6rg.js";import{S as l}from"./Skeleton.component-DZqA_dzJ.js";import{I as k}from"./constants-CZYEPhht.js";import{g as M,a as R}from"./translate-DReBwGmt.js";import{w}from"./withTranslation-D7xvxPha.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-l344p9qu.js";import"./ActionButton.component-CPgdJaw-.js";import"./TooltipTrigger.component-BVXAPqdw.js";import"./index-DRb_0Z3K.js";import"./CircularProgress.component-BtPFZobs.js";import"./OverlayTrigger.component-YEmToyAK.js";import"./RootCloseWrapper-CciQVrFX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_LZOrNA7.js";import"./Transition-yWYMS89P.js";import"./Transition-Cf2GXXoK.js";import"./ActionSplitDropdown.component-CFwDdFxB.js";import"./SplitButton-BD1oC3cS.js";import"./inheritsLoose-4yQX7ab8.js";import"./DropdownButton-BpAwFV83.js";import"./ActionIconToggle.component-MFJTDnGB.js";import"./ActionBar.component-BdpaODRg.js";import"./Actions.component-DThssFMG.js";import"./Progress.component-dbQeEeHg.js";import"./Modal-B-8kc_qp.js";import"./removeClass-B-DUduzN.js";import"./theme-DR8nny8b.js";const T={"about-dialog":"_about-dialog_m6fsw_2","about-logo":"_about-logo_m6fsw_8","about-excerpt":"_about-excerpt_m6fsw_12","about-versions":"_about-versions_m6fsw_15"},D=M(),O=()=>({name:{key:"name",label:D.t("tui-components:SERVICE",{defaultValue:"Service"})},build:{key:"build",label:D.t("tui-components:BUILD_ID",{defaultValue:"Build ID"})},version:{key:"version",label:D.t("tui-components:VERSION",{defaultValue:"Version"})}});function c({text:r="",loading:o,size:i=l.SIZES.medium}){return o?e.jsx(l,{type:l.TYPES.text,size:i}):r}function p({definition:r=Object.values(O()),services:o=[],loading:i=!1}){return!o||!o.length?null:e.jsxs("table",{className:S(T["about-versions"],"about-versions","table table-striped"),children:[e.jsx("thead",{children:e.jsx("tr",{children:r.map(t=>e.jsx("th",{children:t.label},t.key))})}),e.jsx("tbody",{children:(i?[{name:"loading-first"},{name:"loading-second"},{name:"loading-third"}]:o).map(t=>e.jsx("tr",{children:r.map(u=>e.jsx("td",{children:e.jsx(c,{loading:i,text:t[u.key]})},u.key))},t.name))})]})}c.propTypes={text:a.string,loading:a.bool,size:a.string};p.propTypes={services:a.arrayOf(a.shape({name:a.string,version:a.string,build:a.string})),definition:a.arrayOf(a.shape({key:a.string,label:a.string})),loading:a.bool};function _({services:r,expanded:o,definition:i,show:t,product:u,version:A,loading:j,icon:y,copyrights:N,onToggle:V,onHide:P,t:d}){const L={actions:{center:[{label:o?d("LESS",{defaultValue:"Less"}):d("MORE",{defaultValue:"More"}),className:"btn-default btn-inverse",onClick:V}]}};return e.jsx(E,{header:d("ABOUT_HEADER",{defaultValue:"About {{product}}",product:u}),className:S(T["about-dialog"],"about-dialog"),type:E.TYPES.INFORMATIVE,onHide:P,actionbar:L,show:t,children:e.jsxs("div",{children:[e.jsx(C,{name:y,className:S(T["about-logo"],"about-logo"),"data-testid":"icon"}),e.jsxs("div",{className:S(T["about-excerpt"],"about-excerpt"),children:[A&&e.jsx("div",{children:e.jsx(c,{text:d("ABOUT_VERSION_NAME",{defaultValue:"Version: {{version}}",version:A,interpolation:{escapeValue:!1}}),size:l.SIZES.xlarge,loading:j})}),e.jsx("div",{children:e.jsx(c,{text:N||d("ABOUT_COPYRIGHTS",{defaultValue:"© {{year}} Talend. All rights reserved.",year:new Date().getFullYear()}),size:l.SIZES.large,loading:j})})]}),o&&e.jsx(p,{t:d,loading:j,services:r,definition:i})]})})}_.displayName="AboutDialog";_.defaultProps={t:R()};const s=w(k)(_);p.Text=c;p.getColumnHeaders=O;s.Table=p;const{fn:H}=__STORYBOOK_MODULE_TEST__,n={show:!0,onToggle:()=>H("onToggle"),version:"Summer '18",icon:"talend-tdp-colored",services:["API","Dataset","Preparation","Transformation"].map(r=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name:r}))},I=["API","Dataset","Preparation","Transformation","service2","service3","service4","service5","service6","service7","service8","service9","service12","service13","service14","service15","service16","service17","service18","service19"].map(r=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name:r})),{name:W,version:B}=s.Table.getColumnHeaders(),ve={title:"Components/Layout/Modals/AboutModal",component:s,tags:["autodocs"],decorators:[r=>e.jsxs("div",{children:[e.jsx("h1",{children:"AboutDialog"}),r()]})]},m={args:n,render:r=>e.jsx(s,{...r})},g={args:{...n,version:null},render:r=>e.jsx(s,{...r})},x={args:{...n,loading:!0},render:r=>e.jsx(s,{...r})},b={args:{...n,expanded:!0},render:r=>e.jsx(s,{...r})},f={args:{...n,expanded:!0,services:I},render:r=>e.jsx(s,{...r})},v={args:{...n,expanded:!0,services:I,definition:[W,B]},render:r=>e.jsx(s,{...r})},h={args:{...n,expanded:!0,loading:!0},render:r=>e.jsx(s,{...r})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: props,
  render: args => <AboutDialog {...args} />
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}};const he=["Default","WithoutTheVersion","Loading","Expanded","ExpandedWithLotOfServices","WithCustomDefinition","ExpandedLoading"];export{m as Default,b as Expanded,h as ExpandedLoading,f as ExpandedWithLotOfServices,x as Loading,v as WithCustomDefinition,g as WithoutTheVersion,he as __namedExportsOrder,ve as default};
