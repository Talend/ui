import{j as e}from"./iframe-a6xiEYuy.js";import{E as r}from"./EditableText.component-DLld7gej.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DRPinVx-.js";import"./index-DwwAVDLO.js";import"./theme-BsVFmEJs.js";import"./constants-CZYEPhht.js";import"./Action.component-DqtUqR0u.js";import"./ActionButton.component-cKy5g6LW.js";import"./TooltipTrigger.component-CITdH7pE.js";import"./index-BTcVgyDx.js";import"./CircularProgress.component-CH-1GiuP.js";import"./translate-BdRXs8yh.js";import"./withTranslation-BB2aKQbx.js";import"./OverlayTrigger.component-tx3JvTPu.js";import"./RootCloseWrapper-C0sV5jo_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CerpRm2L.js";import"./Transition-D3zIP1lt.js";import"./Transition-D5bVNl6N.js";import"./ActionSplitDropdown.component-CxbDpLXj.js";import"./SplitButton-CrIWYVRv.js";import"./inheritsLoose-CKfnZvzy.js";import"./get-CuuORsUe.js";import"./_baseGet-Cz2lJXYo.js";import"./toString-DtB-B3f9.js";import"./isSymbol-Cg5qelfb.js";import"./eq-n8YMwXX5.js";import"./omit-DbcP29q1.js";import"./_setToString-ubMkSUoF.js";import"./_getTag-EwqW6hLy.js";import"./isArrayLike-DJHIFDtz.js";import"./DropdownButton-DpMSfSHH.js";import"./ActionIconToggle.component-ChddMXPM.js";import"./Actions.component-2tUNKz7v.js";import"./FocusManager.component-DWc_wsCd.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
