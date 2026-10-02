import{j as e}from"./iframe-CznhUcwq.js";import{E as r}from"./EditableText.component-Bqj9wvkk.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D_SXO69o.js";import"./index-BTM52Cfh.js";import"./theme-CWGwz770.js";import"./constants-CZYEPhht.js";import"./Action.component-BzZnaSZL.js";import"./ActionButton.component-p2-A9FgF.js";import"./TooltipTrigger.component-B2rRzx3C.js";import"./index-CgexE0x5.js";import"./CircularProgress.component-B__yXDi1.js";import"./translate-BYv7b2G_.js";import"./withTranslation-C5GK5G2e.js";import"./OverlayTrigger.component-CHKp6rXU.js";import"./RootCloseWrapper-CL1PWpHT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BBcaJJAg.js";import"./Transition-xqwoA6kd.js";import"./Transition-CpxPvNtk.js";import"./ActionSplitDropdown.component-B9aqV25q.js";import"./SplitButton-D_XmFbeu.js";import"./inheritsLoose-C8vUFnnV.js";import"./DropdownButton-BxODINrY.js";import"./ActionIconToggle.component-4h2ERYxG.js";import"./Actions.component-BmI8b1sZ.js";import"./FocusManager.component-C5C0ANwX.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},z={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},d={render:()=>e.jsx(r,{loading:!0,...o})},i={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},c={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},m={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
