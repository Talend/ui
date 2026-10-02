import{j as e}from"./iframe-D35tfLrh.js";import{E as r}from"./EditableText.component-B-NfCrZi.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BZG-gUIy.js";import"./index-CXWGzsSb.js";import"./theme-BLPVqtFJ.js";import"./constants-CZYEPhht.js";import"./Action.component-Bs6_evzo.js";import"./ActionButton.component-BNtHNDSZ.js";import"./TooltipTrigger.component-DAiUYdDw.js";import"./index-B73zCkzo.js";import"./CircularProgress.component-CiKlgH5y.js";import"./translate-DLUFU1WN.js";import"./withTranslation-DAWKBDwS.js";import"./OverlayTrigger.component-BG4ctf8I.js";import"./RootCloseWrapper-BDjYu1IV.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CBO-_tK4.js";import"./Transition-Bs9O9Xy1.js";import"./Transition-BZcc62nJ.js";import"./ActionSplitDropdown.component-Fk40hU5c.js";import"./SplitButton-2GvtZM0z.js";import"./inheritsLoose-qMtYIwha.js";import"./DropdownButton-BG8U4BMz.js";import"./ActionIconToggle.component-CcY1DcAt.js";import"./Actions.component-BbPcdGym.js";import"./FocusManager.component-CaSTeJxa.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},z={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},d={render:()=>e.jsx(r,{loading:!0,...o})},i={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},c={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},m={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
