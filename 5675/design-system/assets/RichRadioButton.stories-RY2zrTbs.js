import{j as i}from"./index-DqyI3zNy.js";import{m as P}from"./DialogBackdrop-Bbhqy77d.js";import{d as q,S as D,s as S,U as y,W as _}from"./Skeleton-DhSiadqt.js";import"./iframe-BqCCNGDC.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./index-3dZT5jlp.js";import"./TalendDesignTokens-JgHEBmOa.js";const o={"rich-radio-button":"_rich-radio-button_108ms_1","rich-radio-button__icon":"_rich-radio-button__icon_108ms_21","rich-radio-button__illustration":"_rich-radio-button__illustration_108ms_27","rich-radio-button__logo":"_rich-radio-button__logo_108ms_28","rich-radio-button__wrapper":"_rich-radio-button__wrapper_108ms_32","rich-radio-button__input":"_rich-radio-button__input_108ms_46"};function O({asset:e}){return e?.illustration?i.jsx("span",{className:o["rich-radio-button__illustration"],children:i.jsx(e.illustration,{})}):e?.logo?i.jsx(S,{name:e.logo,className:o["rich-radio-button__logo"]}):e?.name?i.jsx("span",{className:o["rich-radio-button__icon"],children:y({iconSrc:e.name||"",size:"L",...e})}):null}const a=({dataFeature:e,description:B,asset:W,id:f,isChecked:C=!1,isDisabled:b=!1,isReadOnly:I=!1,name:L,onChange:v,tags:k,title:j,"data-testid":x,"data-test":A})=>i.jsxs("label",{className:o["rich-radio-button__wrapper"],children:[i.jsx("input",{className:o["rich-radio-button__input"],type:"radio",id:f,name:L,disabled:b,readOnly:I,checked:C,"data-feature":e,"data-testid":x,"data-test":A,onChange:()=>v(f),"data-checked":C,onKeyDown:t=>{t.key==="Enter"&&(t.preventDefault(),v(f))}}),i.jsx("span",{className:o["rich-radio-button"],children:i.jsxs(q,{as:"span",gap:"XS",children:[i.jsx(O,{asset:W}),i.jsx("h4",{children:j}),B&&i.jsx("p",{children:B}),k&&i.jsx(D,{as:"span",gap:"XS",wrap:"wrap",children:k.map(t=>i.jsx(P,{variant:t.variant,children:t.name},t.name))})]})})]}),w={component:a,title:"Form/RichRadioButton"},s=()=>i.jsx(a,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
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
}]} />`,...T.parameters?.docs?.source}}};const N=["DefaultStory","RichRadioButtonWithTags","RichRadioButtonWithTagsAndIcon","RichRadioButtonWithTagsAndIllustration","RichRadioButtonDisabled","RichRadioButtonReadOnly","CheckedRichRadioButton","CheckedRichRadioButtonWithTags","CheckedRichRadioButtonWithTagsAndIcon","CheckedRichRadioButtonWithTagsAndIllustration","CheckedRichRadioButtonWithTagsAndLogo","CheckedRichRadioButtonDisabled","CheckedRichRadioButtonReadOnly"],U=Object.freeze(Object.defineProperty({__proto__:null,CheckedRichRadioButton:m,CheckedRichRadioButtonDisabled:R,CheckedRichRadioButtonReadOnly:T,CheckedRichRadioButtonWithTags:u,CheckedRichRadioButtonWithTagsAndIcon:p,CheckedRichRadioButtonWithTagsAndIllustration:h,CheckedRichRadioButtonWithTagsAndLogo:g,DefaultStory:s,RichRadioButtonDisabled:d,RichRadioButtonReadOnly:l,RichRadioButtonWithTags:n,RichRadioButtonWithTagsAndIcon:r,RichRadioButtonWithTagsAndIllustration:c,__namedExportsOrder:N,default:w},Symbol.toStringTag,{value:"Module"}));export{m as C,s as D,n as R,U as S,r as a,c as b,d as c,l as d,u as e,p as f,h as g,g as h,R as i,T as j};
