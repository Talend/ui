import{j as e}from"./iframe-BqWCCsDL.js";import{E as r}from"./EditableText.component-C_tieJJW.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D_mZOzFV.js";import"./index-xzXCkAHM.js";import"./theme-4HAfHMSd.js";import"./constants-CZYEPhht.js";import"./Action.component-BuAQFmZU.js";import"./ActionButton.component-aBNqwcau.js";import"./TooltipTrigger.component-DccGE_fb.js";import"./index-C2Izrgqa.js";import"./CircularProgress.component-0MMSHmti.js";import"./translate-BVVRSOsh.js";import"./withTranslation-BAxK1D91.js";import"./OverlayTrigger.component-28qePXrx.js";import"./RootCloseWrapper-UHfWJoQo.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D_hQj0VP.js";import"./Transition-Cu-CicM_.js";import"./Transition-Em4fwuWs.js";import"./ActionSplitDropdown.component-cT17gFt-.js";import"./SplitButton-DSwLULBF.js";import"./inheritsLoose-DLFSINMF.js";import"./get-Dx5XbnSB.js";import"./_baseGet-CdnBnxpc.js";import"./toString-B2BNrrUM.js";import"./isSymbol-CtaomC-F.js";import"./eq-BMdSP8iB.js";import"./omit-C0QUnnF3.js";import"./_setToString-DixzDcZd.js";import"./_getTag-DT6N4jPe.js";import"./isArrayLike-CCv4fVuZ.js";import"./DropdownButton-6Etz-8PM.js";import"./ActionIconToggle.component-CLnn2DQN.js";import"./Actions.component-BLozSqqY.js";import"./FocusManager.component-DY1GS63J.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
