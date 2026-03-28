import{j as e}from"./iframe-DZbVhgSq.js";import{E as r}from"./EditableText.component-DbkWkitb.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-B2jQE8az.js";import"./index-DyMPaTFk.js";import"./theme-DVMl23xe.js";import"./constants-CZYEPhht.js";import"./Action.component-CM_yy-Ch.js";import"./ActionButton.component-DqTy6pFj.js";import"./TooltipTrigger.component-BhCVnRoV.js";import"./index-B5IEsJlc.js";import"./CircularProgress.component-DulLwRMd.js";import"./translate-BPs01qDA.js";import"./withTranslation-smRg6hW0.js";import"./OverlayTrigger.component-Oh62E1hX.js";import"./RootCloseWrapper-BLTTc6a5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DgMVFoSo.js";import"./Transition-stKwlJ-Q.js";import"./Transition-ChCIhTF-.js";import"./ActionSplitDropdown.component-7OFyWLvE.js";import"./SplitButton-BDlJUCCc.js";import"./inheritsLoose-G35GzxTI.js";import"./get-DQh4jKHT.js";import"./_baseGet-B6sZByIR.js";import"./toString-DRypW0xg.js";import"./isSymbol-utH3E145.js";import"./eq-Gtm29xL-.js";import"./omit-DfWDWnZr.js";import"./_setToString-Cb9q76qX.js";import"./_getTag-Dflrppun.js";import"./isArrayLike-BA1-QX5o.js";import"./DropdownButton-CbhGUKqD.js";import"./ActionIconToggle.component-Bk-X4e1M.js";import"./Actions.component-BG2Hz-Vd.js";import"./FocusManager.component-D3zd-vM3.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
