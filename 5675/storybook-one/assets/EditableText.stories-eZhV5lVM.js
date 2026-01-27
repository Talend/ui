import{j as e}from"./iframe-jBdAviOK.js";import{E as r}from"./EditableText.component-B--npU1I.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D5lAIBRU.js";import"./index-BrWIkuKz.js";import"./theme-BL0Anhlu.js";import"./constants-CZYEPhht.js";import"./Action.component-D7YnYMrZ.js";import"./ActionButton.component-C5JV4tjE.js";import"./TooltipTrigger.component-BXqDA9l2.js";import"./index-NQu-qG2g.js";import"./CircularProgress.component-8dLlgufm.js";import"./translate-921hfUGs.js";import"./withTranslation-CzsoIku5.js";import"./OverlayTrigger.component-DfTxmYyS.js";import"./RootCloseWrapper-CKQqWj4X.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bn8Lv4IE.js";import"./Transition-OJ4_kF-v.js";import"./Transition-DC_Nj6xN.js";import"./ActionSplitDropdown.component-DD3Rf5MG.js";import"./SplitButton-CL2Q7Cit.js";import"./inheritsLoose-CAJZymaM.js";import"./get-jEP8xMl_.js";import"./_baseGet-u5avH9tD.js";import"./toString-BX93RoAV.js";import"./isSymbol-CvtXITru.js";import"./eq-D9JUUvu0.js";import"./omit-DPJAlTWZ.js";import"./_setToString-Ce43QsYj.js";import"./_getTag-D1QWKMPg.js";import"./isArrayLike-CxvCEo1J.js";import"./DropdownButton-CNxduld3.js";import"./ActionIconToggle.component-C0OGhigD.js";import"./Actions.component-BQZQRpFu.js";import"./FocusManager.component-DKDjWtMo.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
