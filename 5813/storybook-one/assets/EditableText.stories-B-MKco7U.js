import{j as e}from"./iframe-B103sUzx.js";import{E as r}from"./EditableText.component-BgdGnmc_.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-C35wTHLT.js";import"./index-DrLLf3GQ.js";import"./theme-Dr1j5G3A.js";import"./constants-CZYEPhht.js";import"./Action.component-BDIYEnlq.js";import"./ActionButton.component-Cki9NuM7.js";import"./TooltipTrigger.component-eMxhJlz6.js";import"./index-C4709orZ.js";import"./CircularProgress.component-j-bZtT2W.js";import"./translate-DRtMcB2y.js";import"./withTranslation-DYpnLnCb.js";import"./OverlayTrigger.component-kXR6qFfE.js";import"./RootCloseWrapper-BW1yOe35.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C1q8tzmP.js";import"./Transition-DeMFB2kt.js";import"./Transition-7OQpZWg0.js";import"./ActionSplitDropdown.component-DiHrIQ44.js";import"./SplitButton-Owc9Psca.js";import"./inheritsLoose-DUOmUqbJ.js";import"./get-CLIt06rP.js";import"./_baseGet-DJW8rzEv.js";import"./toString-DhzgJs-I.js";import"./isSymbol-CzF2uldG.js";import"./eq-BLBaq9xX.js";import"./omit-BvPeIEf8.js";import"./_setToString-Dh8TuV2C.js";import"./_getTag-CnFAYsTL.js";import"./isArrayLike-DpKYGo6T.js";import"./DropdownButton-nPhOik_8.js";import"./ActionIconToggle.component-DorkGkiF.js";import"./Actions.component-BDXhs-py.js";import"./FocusManager.component-BN8egDk2.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
