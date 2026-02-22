import{j as e}from"./iframe-CBPnIo_q.js";import{E as r}from"./EditableText.component-Bbjgp9up.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BxeqfJ89.js";import"./index-Dvwmyln6.js";import"./theme-DjWxLJoY.js";import"./constants-CZYEPhht.js";import"./Action.component-hAWodN4y.js";import"./ActionButton.component-BQADwHW4.js";import"./TooltipTrigger.component-B7TCfnSH.js";import"./index-CWrd71Ec.js";import"./CircularProgress.component-CyfyM4xX.js";import"./translate-Bth8mwBJ.js";import"./withTranslation-C5wfFNmc.js";import"./OverlayTrigger.component-C_ZmJESS.js";import"./RootCloseWrapper-u9EmCT3r.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-YuUD0WGQ.js";import"./Transition-B5pnczL5.js";import"./Transition-CIj1qIVq.js";import"./ActionSplitDropdown.component-CGv72myh.js";import"./SplitButton-ClPxxiTL.js";import"./inheritsLoose-D4zmiq0K.js";import"./get-BBk9fHjl.js";import"./_baseGet-Cc2vc2LS.js";import"./toString-VLAAfG_f.js";import"./isSymbol-CRdirWIJ.js";import"./eq-Bg_GhI-V.js";import"./omit-CaydZ5de.js";import"./_baseSlice-BHEWSlEw.js";import"./_getTag-DFlPA5Nn.js";import"./isArrayLike-DD_KOnF7.js";import"./DropdownButton-TUJqehJ9.js";import"./ActionIconToggle.component-PynEp8OQ.js";import"./Actions.component-DKD2ljSi.js";import"./FocusManager.component-D0T81Ysx.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
