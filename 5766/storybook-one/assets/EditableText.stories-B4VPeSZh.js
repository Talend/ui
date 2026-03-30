import{j as e}from"./iframe-CPxLBC5O.js";import{E as r}from"./EditableText.component-gQMtiGNw.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-EqeNPg_B.js";import"./index-deZpcOOS.js";import"./theme-CBfSNsEl.js";import"./constants-CZYEPhht.js";import"./Action.component-D4r-jbCI.js";import"./ActionButton.component-C9hV4DYD.js";import"./TooltipTrigger.component-DTQC3xBu.js";import"./index-CNqTy3se.js";import"./CircularProgress.component-BhsKU7ot.js";import"./translate-Bh6O5sXJ.js";import"./withTranslation-Jim-bBZE.js";import"./OverlayTrigger.component-Biw8hDNM.js";import"./RootCloseWrapper-BJQPyziT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D4VIV8Qx.js";import"./Transition-C7NRlE02.js";import"./Transition-ECqydgiu.js";import"./ActionSplitDropdown.component-y0obZlLL.js";import"./SplitButton-dqnbmJth.js";import"./inheritsLoose-hQ-uK37r.js";import"./get-B6tCSfMU.js";import"./_baseGet-CBhhvZNo.js";import"./toString-haM-zpMe.js";import"./isSymbol-D7pS_NzT.js";import"./eq-DO5Ji_y7.js";import"./omit-DiwhPy9B.js";import"./_setToString-acJ9qpHd.js";import"./_getTag-DUouNTsr.js";import"./isArrayLike-DMZ1QFa6.js";import"./DropdownButton-KjeEryCO.js";import"./ActionIconToggle.component-Duiw98n4.js";import"./Actions.component-BMZVCL3R.js";import"./FocusManager.component-DkoHhzfl.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
