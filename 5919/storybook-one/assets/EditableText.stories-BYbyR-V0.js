import{j as e}from"./iframe-SKm5afGR.js";import{E as r}from"./EditableText.component-CmYRj1SP.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-TmQiub_B.js";import"./index-v4RqFekH.js";import"./theme-7OSfQ_Pi.js";import"./constants-CZYEPhht.js";import"./Action.component-DmzN_EWn.js";import"./ActionButton.component-CmjmCagI.js";import"./TooltipTrigger.component-DQg3YoHy.js";import"./index-CPW3g4LR.js";import"./CircularProgress.component-DIb9Hk7L.js";import"./translate-CEiihR1l.js";import"./withTranslation-CU-bJQye.js";import"./OverlayTrigger.component-Bos5hxc-.js";import"./RootCloseWrapper-CZqf_b6r.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C-ecfSAo.js";import"./Transition-CfDEhTwS.js";import"./Transition-BbNCJNUs.js";import"./ActionSplitDropdown.component-BL_7AD4x.js";import"./SplitButton-DsxUKcrb.js";import"./inheritsLoose-DzhaYN07.js";import"./DropdownButton-B1nQqDKW.js";import"./ActionIconToggle.component-BUXRR5Yy.js";import"./Actions.component-ClmXVcty.js";import"./FocusManager.component-JH0l5rG_.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},z={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},d={render:()=>e.jsx(r,{loading:!0,...o})},i={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},c={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},m={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText {...props} />
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const propWithoutText = {
      ...props,
      text: ''
    };
    return <div style={{
      width: 150
    }}>
                <EditableText {...propWithoutText} />
            </div>;
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '150px'
  }}>
            <EditableText {...props} />
        </div>
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText loading {...props} />
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText disabled {...props} />
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText inProgress {...props} />
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} />
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText required={false} editMode {...props} />
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode placeholder="Enter your text here.." {...props} text="" />
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} text="" errorMessage="custom error message" />
}`,...l.parameters?.docs?.source}}};const A=["Default","WithoutValue","WithEllipsis","Loading","Disabled","InProgress","EditMode","NotRequired","Placeholder","WithError"];export{t as Default,i as Disabled,p as EditMode,n as InProgress,d as Loading,c as NotRequired,m as Placeholder,a as WithEllipsis,l as WithError,s as WithoutValue,A as __namedExportsOrder,z as default};
