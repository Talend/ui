import{j as a}from"./index-BeRoqjfO.js";import{m as A}from"./DialogBackdrop-BDgqVk1C.js";import{a as P,S as q,s as D,U as y,W as _}from"./Skeleton-XhJlLQkP.js";import"./iframe-0koiw-N4.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./index-osoKd-JR.js";import"./TalendDesignTokens-JgHEBmOa.js";const m={"rich-radio-button":"_rich-radio-button_108ms_1","rich-radio-button__icon":"_rich-radio-button__icon_108ms_21","rich-radio-button__illustration":"_rich-radio-button__illustration_108ms_27","rich-radio-button__logo":"_rich-radio-button__logo_108ms_28","rich-radio-button__wrapper":"_rich-radio-button__wrapper_108ms_32","rich-radio-button__input":"_rich-radio-button__input_108ms_46"};function O({asset:e}){return e?.illustration?a.jsx("span",{className:m["rich-radio-button__illustration"],children:a.jsx(e.illustration,{})}):e?.logo?a.jsx(D,{name:e.logo,className:m["rich-radio-button__logo"]}):e?.name?a.jsx("span",{className:m["rich-radio-button__icon"],children:y({iconSrc:e.name||"",size:"L",...e})}):null}const i=({dataFeature:e,description:B,asset:b,id:f,isChecked:C=!1,isDisabled:W=!1,isReadOnly:I=!1,name:L,onChange:v,tags:k,title:S,"data-testid":j,"data-test":x})=>a.jsxs("label",{className:m["rich-radio-button__wrapper"],children:[a.jsx("input",{className:m["rich-radio-button__input"],type:"radio",id:f,name:L,disabled:W,readOnly:I,checked:C,"data-feature":e,"data-testid":j,"data-test":x,onChange:()=>v(f),"data-checked":C,onKeyDown:t=>{t.key==="Enter"&&(t.preventDefault(),v(f))}}),a.jsx("span",{className:m["rich-radio-button"],children:a.jsxs(P,{as:"span",gap:"XS",children:[a.jsx(O,{asset:b}),a.jsx("h4",{children:S}),B&&a.jsx("p",{children:B}),k&&a.jsx(q,{as:"span",gap:"XS",wrap:"wrap",children:k.map(t=>a.jsx(A,{variant:t.variant,children:t.name},t.name))})]})})]}),w={component:i,title:"Form/RichRadioButton"},u=()=>a.jsx(i,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButton",name:"richRadioButton",onChange:()=>{},title:"This is a title"}),p=()=>a.jsx(i,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTags",name:"richRadioButtonWithTags",onChange:()=>{},tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}],title:"This is a title"}),h=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTagsAndIcon",name:"richRadioButtonWithTagsAndIcon",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),g=()=>a.jsx(i,{asset:{illustration:_.IconDefault},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonWithTagsAndIllustration",name:"richRadioButtonWithTagsAndIllustration",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),R=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonDisabled",isDisabled:!0,name:"richRadioButtonDisabled",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),T=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"richRadioButtonReadOnly",isReadOnly:!0,name:"richRadioButtonReadOnly",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]}),o=()=>a.jsx(i,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButton",isChecked:!0,name:"checkedRichRadioButton",onChange:()=>{},title:"This is a title"});o.parameters={chromatic:{disableSnapshot:!0}};const s=()=>a.jsx(i,{description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTags",isChecked:!0,name:"checkedRichRadioButtonWithTags",onChange:()=>{},tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}],title:"This is a title"});s.parameters={chromatic:{disableSnapshot:!0}};const n=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndIcon",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndIcon",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});n.parameters={chromatic:{disableSnapshot:!0}};const r=()=>a.jsx(i,{asset:{illustration:_.IconDefault},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndIllustration",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndIllustration",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});r.parameters={chromatic:{disableSnapshot:!0}};const c=()=>a.jsx(i,{asset:{logo:"talend-snowflake"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonWithTagsAndLogo",isChecked:!0,name:"checkedRichRadioButtonWithTagsAndLogo",onChange:()=>{},title:"This is a snowflake title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});c.parameters={chromatic:{disableSnapshot:!0}};const d=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonDisabled",isDisabled:!0,isChecked:!0,name:"checkedRichRadioButtonDisabled",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});d.parameters={chromatic:{disableSnapshot:!0}};const l=()=>a.jsx(i,{asset:{name:"user"},description:`Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?`,id:"checkedRichRadioButtonReadOnly",isReadOnly:!0,isChecked:!0,name:"checkedRichRadioButtonReadOnly",onChange:()=>{},title:"This is a title",tags:[{name:"Tag 1"},{name:"Tag 2",variant:"information"},{name:"Tag 3",variant:"information"}]});l.parameters={chromatic:{disableSnapshot:!0}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButton'} name={'richRadioButton'} onChange={() => {}} title="This is a title" />`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'richRadioButtonWithTags'} name={'richRadioButtonWithTags'} onChange={() => {}} tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} title="This is a title" />`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...g.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...T.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    Porro nihil delectus quaerat repellat saepe officiis id aut. 
    Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButton'} isChecked={true} name={'checkedRichRadioButton'} onChange={() => {}} title="This is a title" />`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <RichRadioButton description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Porro nihil delectus quaerat repellat saepe officiis id aut. 
        Culpa iste molestias optio nihil placeat magnam, odio modi earum est voluptas saepe?" id={'checkedRichRadioButtonWithTags'} isChecked={true} name={'checkedRichRadioButtonWithTags'} onChange={() => {}} tags={[{
  name: 'Tag 1'
}, {
  name: 'Tag 2',
  variant: 'information'
}, {
  name: 'Tag 3',
  variant: 'information'
}]} title="This is a title" />`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <RichRadioButton asset={{
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
}]} />`,...l.parameters?.docs?.source}}};const N=["DefaultStory","RichRadioButtonWithTags","RichRadioButtonWithTagsAndIcon","RichRadioButtonWithTagsAndIllustration","RichRadioButtonDisabled","RichRadioButtonReadOnly","CheckedRichRadioButton","CheckedRichRadioButtonWithTags","CheckedRichRadioButtonWithTagsAndIcon","CheckedRichRadioButtonWithTagsAndIllustration","CheckedRichRadioButtonWithTagsAndLogo","CheckedRichRadioButtonDisabled","CheckedRichRadioButtonReadOnly"],U=Object.freeze(Object.defineProperty({__proto__:null,CheckedRichRadioButton:o,CheckedRichRadioButtonDisabled:d,CheckedRichRadioButtonReadOnly:l,CheckedRichRadioButtonWithTags:s,CheckedRichRadioButtonWithTagsAndIcon:n,CheckedRichRadioButtonWithTagsAndIllustration:r,CheckedRichRadioButtonWithTagsAndLogo:c,DefaultStory:u,RichRadioButtonDisabled:R,RichRadioButtonReadOnly:T,RichRadioButtonWithTags:p,RichRadioButtonWithTagsAndIcon:h,RichRadioButtonWithTagsAndIllustration:g,__namedExportsOrder:N,default:w},Symbol.toStringTag,{value:"Module"}));export{o as C,u as D,p as R,U as S,h as a,g as b,R as c,T as d,s as e,n as f,r as g,c as h,d as i,l as j};
