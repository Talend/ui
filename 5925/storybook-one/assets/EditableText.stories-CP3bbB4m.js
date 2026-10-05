import{j as e}from"./iframe-DOLJ-fPI.js";import{E as r}from"./EditableText.component-sqjHkccy.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-C0IdcxhU.js";import"./index-DH7on9Dq.js";import"./theme-CV9Ca-Q-.js";import"./constants-CZYEPhht.js";import"./Action.component-BlMA_cRs.js";import"./ActionButton.component-Co80ip6C.js";import"./TooltipTrigger.component-3r0OvBj_.js";import"./index-CEpZgdjv.js";import"./CircularProgress.component-zFiix6Je.js";import"./translate-BhUX-_0a.js";import"./withTranslation-3N-wYMGa.js";import"./OverlayTrigger.component-qw-RJj0R.js";import"./RootCloseWrapper-DQRPcFH1.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CC9mGFDv.js";import"./Transition-C_Nn8oeK.js";import"./Transition-DG3tvzIG.js";import"./ActionSplitDropdown.component-BekXhOnH.js";import"./SplitButton-D6b27zFw.js";import"./inheritsLoose-BT63Bloz.js";import"./DropdownButton-96ZRCyXT.js";import"./ActionIconToggle.component-hITRMOFK.js";import"./Actions.component-C7IVCP7j.js";import"./FocusManager.component-CjjxPLJt.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},z={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},d={render:()=>e.jsx(r,{loading:!0,...o})},i={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},c={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},m={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
