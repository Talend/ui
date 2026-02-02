import{j as e}from"./iframe-cBtRg4Zm.js";import{E as r}from"./EditableText.component-DXnvgoTV.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-Dkla9Zfi.js";import"./index-CopqRmGV.js";import"./theme-IDDytecF.js";import"./constants-CZYEPhht.js";import"./Action.component-DbfWXAi7.js";import"./ActionButton.component-BbFZmfp2.js";import"./TooltipTrigger.component-BEpC4Cbd.js";import"./index-_4Lt4aG8.js";import"./CircularProgress.component-CJXktRGh.js";import"./translate-am4PfflD.js";import"./withTranslation-BL7gA-bp.js";import"./OverlayTrigger.component-CafacX6_.js";import"./RootCloseWrapper-B9V3vXXh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-RafO5SjG.js";import"./Transition-D7Ms2Ah2.js";import"./Transition-QmhJMkIM.js";import"./ActionSplitDropdown.component-C5oizYOJ.js";import"./SplitButton-Bri9k3Vu.js";import"./inheritsLoose-CFk7qFMH.js";import"./get-DpZIkRWq.js";import"./_baseGet-bDt8gzSb.js";import"./toString-Dopjm_6L.js";import"./isSymbol-hEzy1n5Y.js";import"./eq-DmJpQRp3.js";import"./omit-DZjDjx7f.js";import"./_baseSlice-BFLcj3sE.js";import"./_getTag-D1YAmZF8.js";import"./isArrayLike-XKLyq0p9.js";import"./DropdownButton-DJxVuDn4.js";import"./ActionIconToggle.component-DocL8DWD.js";import"./Actions.component-CDUYopll.js";import"./FocusManager.component-YCWWKH36.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText loading {...props} />
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText disabled {...props} />
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText inProgress {...props} />
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} />
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText required={false} editMode {...props} />
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode placeholder="Enter your text here.." {...props} text="" />
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} text="" errorMessage="custom error message" />
}`,...l.parameters?.docs?.source}}};const Y=["Default","WithoutValue","WithEllipsis","Loading","Disabled","InProgress","EditMode","NotRequired","Placeholder","WithError"];export{t as Default,d as Disabled,p as EditMode,n as InProgress,i as Loading,m as NotRequired,c as Placeholder,a as WithEllipsis,l as WithError,s as WithoutValue,Y as __namedExportsOrder,X as default};
