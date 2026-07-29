import{j as e}from"./iframe-CWCo7ykZ.js";import{E as r}from"./EditableText.component-DvRcncUX.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DCcxR7G4.js";import"./index-Be3RCHZG.js";import"./theme-Dwj7aUke.js";import"./constants-CZYEPhht.js";import"./Action.component-C2Pruoba.js";import"./ActionButton.component-SMqKQVu9.js";import"./TooltipTrigger.component-DsttEDpQ.js";import"./index-bKQTdL_z.js";import"./CircularProgress.component-CdPCIW2V.js";import"./translate-Bw3v2824.js";import"./withTranslation-DueXOWk5.js";import"./OverlayTrigger.component-sKror3P-.js";import"./RootCloseWrapper-Dj7qYGOW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dn4Pc0td.js";import"./Transition-BytmYUSd.js";import"./Transition-BKhBmWtS.js";import"./ActionSplitDropdown.component-DjR-i4Sg.js";import"./SplitButton-CkNt02FD.js";import"./inheritsLoose-DxeIgX3i.js";import"./get-6XsBgkAQ.js";import"./_baseGet-sfRMLqfN.js";import"./toString-KZigM7OW.js";import"./isSymbol-BGGx6Z8n.js";import"./eq-DVyWNhDF.js";import"./omit-BnJVre6j.js";import"./_setToString-B42zykNw.js";import"./_getTag-fmLSluek.js";import"./isArrayLike-CDET1z1l.js";import"./DropdownButton-ljWWovtg.js";import"./ActionIconToggle.component-CNs1qSEA.js";import"./Actions.component-Bt2N73dW.js";import"./FocusManager.component-8vjAA9o5.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
