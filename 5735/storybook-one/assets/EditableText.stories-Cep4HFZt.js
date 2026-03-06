import{j as e}from"./iframe-6C1ykPWx.js";import{E as r}from"./EditableText.component-D3vwze7S.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-Baon3CiZ.js";import"./index-Cq7VnXI3.js";import"./theme-DO-cPuEw.js";import"./constants-CZYEPhht.js";import"./Action.component-D9mQufs9.js";import"./ActionButton.component-BY-q4ggr.js";import"./TooltipTrigger.component-BFy3cTU3.js";import"./index-BslmIV_L.js";import"./CircularProgress.component-Sihr6Bhr.js";import"./translate-BE-TYhPo.js";import"./withTranslation-CKQm43hb.js";import"./OverlayTrigger.component-Bv47wzHE.js";import"./RootCloseWrapper-Bz2qVbgv.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DttzocPT.js";import"./Transition-CoH8Ej_X.js";import"./Transition-C_9MPLqP.js";import"./ActionSplitDropdown.component-DQJ29b0w.js";import"./SplitButton-B2drXeWC.js";import"./inheritsLoose-BFjbzfgv.js";import"./get-Caf05NaP.js";import"./_baseGet-BkvsmCY6.js";import"./toString-BmH2ab_Y.js";import"./isSymbol-DXYi_rXD.js";import"./eq-B2JVFhQ7.js";import"./omit-DOIp0Mir.js";import"./_setToString-B6ffYbVG.js";import"./_getTag-DsXBrIAD.js";import"./isArrayLike-BxJVNhir.js";import"./DropdownButton-jG80Mf4A.js";import"./ActionIconToggle.component-DSmCVp0i.js";import"./Actions.component-DUF_O44g.js";import"./FocusManager.component-C_T9ShwH.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
