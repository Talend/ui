import{j as e}from"./iframe-BSz8vrfY.js";import{E as r}from"./EditableText.component-BKiiD5Df.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D41QE2CR.js";import"./index-B5UpSaAr.js";import"./theme-C0W7qRlo.js";import"./constants-CZYEPhht.js";import"./Action.component-BrhEH71p.js";import"./ActionButton.component-BTbU08-U.js";import"./TooltipTrigger.component-DUDXLG6K.js";import"./index-DSLVRfwH.js";import"./CircularProgress.component-DCy-0alI.js";import"./translate-CtJTLw1v.js";import"./withTranslation-C3cS2IQG.js";import"./OverlayTrigger.component-DvpbEPYL.js";import"./RootCloseWrapper-DB7QGOev.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B_1sO96Q.js";import"./Transition-DvW7H1s9.js";import"./Transition-DyFP2-hp.js";import"./ActionSplitDropdown.component-fddWVN-h.js";import"./SplitButton-DAYBYkMo.js";import"./inheritsLoose-jxwFaUeB.js";import"./get-CTTh00M_.js";import"./_baseGet-DMDd9vcj.js";import"./toString-DUCbBMsG.js";import"./isSymbol-iQ5ybfyV.js";import"./eq-BHBdTl8g.js";import"./omit-CeFrI3J6.js";import"./_setToString-84T2O85k.js";import"./_getTag-BOI4WlkC.js";import"./isArrayLike-Mcz7Mxgi.js";import"./DropdownButton-BwQ3aYRe.js";import"./ActionIconToggle.component-DYzNyzR9.js";import"./Actions.component-CCn5uskd.js";import"./FocusManager.component-BaIrfzYF.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
