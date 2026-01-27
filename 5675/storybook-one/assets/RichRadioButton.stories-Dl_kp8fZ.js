import{j as i}from"./iframe-BeUrxS75.js";import{T as P}from"./DialogBackdrop-x4OTOzlE.js";import{h as q,O as D,P as _}from"./Skeleton-CXA10cMH.js";import{a as y,S}from"./StackItem-DJTmFzN6.js";import"./QualityBar.component-COfHaiIR.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-bt00C8QA.js";import"./index-CNWlF1CT.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-CVbE3JtA.js";import"./RatioBar.component-Djoh8F-5.js";const o={"rich-radio-button":"_rich-radio-button_108ms_1","rich-radio-button__icon":"_rich-radio-button__icon_108ms_21","rich-radio-button__illustration":"_rich-radio-button__illustration_108ms_27","rich-radio-button__logo":"_rich-radio-button__logo_108ms_28","rich-radio-button__wrapper":"_rich-radio-button__wrapper_108ms_32","rich-radio-button__input":"_rich-radio-button__input_108ms_46"};function O({asset:t}){return t?.illustration?i.jsx("span",{className:o["rich-radio-button__illustration"],children:i.jsx(t.illustration,{})}):t?.logo?i.jsx(q,{name:t.logo,className:o["rich-radio-button__logo"]}):t?.name?i.jsx("span",{className:o["rich-radio-button__icon"],children:D({iconSrc:t.name||"",size:"L",...t})}):null}const a=({dataFeature:t,description:B,asset:W,id:f,isChecked:C=!1,isDisabled:b=!1,isReadOnly:I=!1,name:L,onChange:v,tags:k,title:x,"data-testid":A,"data-test":j})=>i.jsxs("label",{className:o["rich-radio-button__wrapper"],children:[i.jsx("input",{className:o["rich-radio-button__input"],type:"radio",id:f,name:L,disabled:b,readOnly:I,checked:C,"data-feature":t,"data-testid":A,"data-test":j,onChange:()=>v(f),"data-checked":C,onKeyDown:e=>{e.key==="Enter"&&(e.preventDefault(),v(f))}}),i.jsx("span",{className:o["rich-radio-button"],children:i.jsxs(y,{as:"span",gap:"XS",children:[i.jsx(O,{asset:W}),i.jsx("h4",{children:x}),B&&i.jsx("p",{children:B}),k&&i.jsx(S,{as:"span",gap:"XS",wrap:"wrap",children:k.map(e=>i.jsx(P,{variant:e.variant,children:e.name},e.name))})]})})]}),Q={component:a,title:"Form/RichRadioButton"},s=()=>i.jsx(a,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButton",name:"richRadioButton",onChange:()=>{},title:"This is a title"}),n=()=>i.jsx(a,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTags",name:"richRadioButtonWithTags",onChange:()=>{},tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}],title:"This is a title"}),r=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTagsAndIcon",name:"richRadioButtonWithTagsAndIcon",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),c=()=>i.jsx(a,{asset:{illustration:_.IconDefault},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTagsAndIllustration",name:"richRadioButtonWithTagsAndIllustration",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),d=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonDisabled",isDisabled:!0,name:"richRadioButtonDisabled",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),l=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonReadOnly",isReadOnly:!0,name:"richRadioButtonReadOnly",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),m=()=>i.jsx(a,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButton",isChecked:!0,name:"checkedRichRadioButton",onChange:()=>{},title:"This is a title"}),u=()=>i.jsx(a,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTags",isChecked:!0,name:"checkedRichRadioButtonWithTags",onChange:()=>{},tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}],title:"This is a title"}),p=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndIcon",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndIcon",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),h=()=>i.jsx(a,{asset:{illustration:_.IconDefault},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndIllustration",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndIllustration",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),g=()=>i.jsx(a,{asset:{logo:"talend-snowflake"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndLogo",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndLogo",onChange:()=>{},title:"This is a snowflake title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),R=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonDisabled",isDisabled:!0,isChecked:!0,name:"checkedRichRadioButtonDisabled",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),T=()=>i.jsx(a,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonReadOnly",isReadOnly:!0,isChecked:!0,name:"checkedRichRadioButtonReadOnly",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButton'} name={'richRadioButton'} onChange={() => {}} title="This is a title" />`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonWithTags'} name={'richRadioButtonWithTags'} onChange={() => {}} tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} title="This is a title" />`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonWithTagsAndIcon'} name={'richRadioButtonWithTagsAndIcon'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  illustration: Illustration.IconDefault
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonWithTagsAndIllustration'} name={'richRadioButtonWithTagsAndIllustration'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonDisabled'} isDisabled={true} name={'richRadioButtonDisabled'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonReadOnly'} isReadOnly={true} name={'richRadioButtonReadOnly'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButton'} isChecked={true} name={'checkedRichRadioButton'} onChange={() => {}} title="This is a title" />`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonWithTags'} isChecked={true} name={'checkedRichRadioButtonWithTags'} onChange={() => {}} tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} title="This is a title" />`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonWithTagsAndIcon'} isChecked={true} name={'checkedRichRadioButtonWithTagsAndIcon'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  illustration: Illustration.IconDefault
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonWithTagsAndIllustration'} isChecked={true} name={'checkedRichRadioButtonWithTagsAndIllustration'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  logo: 'talend-snowflake'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonWithTagsAndLogo'} isChecked={true} name={'checkedRichRadioButtonWithTagsAndLogo'} onChange={() => {}} title="This is a snowflake title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...g.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonDisabled'} isDisabled={true} isChecked={true} name={'checkedRichRadioButtonDisabled'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
  name: 'user'
}} description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonReadOnly'} isReadOnly={true} isChecked={true} name={'checkedRichRadioButtonReadOnly'} onChange={() => {}} title="This is a title" tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} />`,...T.parameters?.docs?.source}}};const U=["DefaultStory","RichRadioButtonWithTags","RichRadioButtonWithTagsAndIcon","RichRadioButtonWithTagsAndIllustration","RichRadioButtonDisabled","RichRadioButtonReadOnly","CheckedRichRadioButton","CheckedRichRadioButtonWithTags","CheckedRichRadioButtonWithTagsAndIcon","CheckedRichRadioButtonWithTagsAndIllustration","CheckedRichRadioButtonWithTagsAndLogo","CheckedRichRadioButtonDisabled","CheckedRichRadioButtonReadOnly"];export{m as CheckedRichRadioButton,R as CheckedRichRadioButtonDisabled,T as CheckedRichRadioButtonReadOnly,u as CheckedRichRadioButtonWithTags,p as CheckedRichRadioButtonWithTagsAndIcon,h as CheckedRichRadioButtonWithTagsAndIllustration,g as CheckedRichRadioButtonWithTagsAndLogo,s as DefaultStory,d as RichRadioButtonDisabled,l as RichRadioButtonReadOnly,n as RichRadioButtonWithTags,r as RichRadioButtonWithTagsAndIcon,c as RichRadioButtonWithTagsAndIllustration,U as __namedExportsOrder,Q as default};
