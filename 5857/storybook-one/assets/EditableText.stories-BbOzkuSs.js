import{j as e}from"./iframe-D-blrJ-o.js";import{E as r}from"./EditableText.component-C1N7J6mI.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-CIGG43mj.js";import"./index-C8-AnYno.js";import"./theme-CAXbUl-6.js";import"./constants-CZYEPhht.js";import"./Action.component-BBEYvhF1.js";import"./ActionButton.component-NL6_EwV_.js";import"./TooltipTrigger.component-DMbfnZpY.js";import"./index-lIvj0yXg.js";import"./CircularProgress.component-YCw1GpO-.js";import"./translate-cma22zhb.js";import"./withTranslation-C_HRI0RV.js";import"./OverlayTrigger.component-CXTKhBbT.js";import"./RootCloseWrapper-RrEZAO_q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dwnv9pdF.js";import"./Transition-BDadDiAh.js";import"./Transition-B-69Sh4H.js";import"./ActionSplitDropdown.component-GCAMmQRB.js";import"./SplitButton-B9c5f5NT.js";import"./inheritsLoose-Dp07B8_F.js";import"./get-DhnSccqV.js";import"./_baseGet-NFp1u5HG.js";import"./toString-BTfYpm0t.js";import"./isSymbol-fqM6njwu.js";import"./eq-J4RZavgT.js";import"./omit-SqwbWo4S.js";import"./_setToString-Cp67bGf8.js";import"./_getTag-C64CVJ8L.js";import"./isArrayLike-CpbMogeV.js";import"./DropdownButton-BocLSqvv.js";import"./ActionIconToggle.component-C2V0JP5p.js";import"./Actions.component-BgzTKYXl.js";import"./FocusManager.component-DpevrPys.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
