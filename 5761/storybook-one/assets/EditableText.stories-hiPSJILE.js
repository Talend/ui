import{j as e}from"./iframe-B4qnySQT.js";import{E as r}from"./EditableText.component-C5nb7EIO.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BYVSqbiw.js";import"./index-DPNAW96s.js";import"./theme-B-Y9eRaQ.js";import"./constants-CZYEPhht.js";import"./Action.component-BWlBSARz.js";import"./ActionButton.component-mis2utRY.js";import"./TooltipTrigger.component-xiHfIBBM.js";import"./index-DgGM3Yga.js";import"./CircularProgress.component-yuuTg9Ca.js";import"./translate-D3JO2TfR.js";import"./withTranslation-BqFrxFwI.js";import"./OverlayTrigger.component-D8Yj_q1l.js";import"./RootCloseWrapper-DDohZBZW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B2Cn2r-I.js";import"./Transition-DqVzSKkG.js";import"./Transition-DmEinDrA.js";import"./ActionSplitDropdown.component-BNYNsOCp.js";import"./SplitButton-CHoaJRzX.js";import"./inheritsLoose-DhlgcSQA.js";import"./get-Cp5WvLx4.js";import"./_baseGet-Ca_R9usK.js";import"./toString-BY9RXH1D.js";import"./isSymbol-DcRtttP9.js";import"./eq-B6WRamrM.js";import"./omit-muK3dr0k.js";import"./_setToString-B4bSgU0r.js";import"./_getTag-Dd-sPh7z.js";import"./isArrayLike-DbsxgW-k.js";import"./DropdownButton-DxeyHX32.js";import"./ActionIconToggle.component-C1qDwjv-.js";import"./Actions.component-XoFBT-WO.js";import"./FocusManager.component-DIBvPcBo.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
