import{j as e}from"./iframe-ClwiQvuW.js";import{E as r}from"./EditableText.component-CemKOGcl.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-wC8qtuP2.js";import"./index-7y6ddTMf.js";import"./theme-mdpk5Co_.js";import"./constants-CZYEPhht.js";import"./Action.component-COt4aSUS.js";import"./ActionButton.component-DNHUGPUo.js";import"./TooltipTrigger.component-BN083zYm.js";import"./index-CLtx60LD.js";import"./CircularProgress.component-qzTAJBf2.js";import"./translate-BfPhMm57.js";import"./withTranslation-BIWn5jQg.js";import"./OverlayTrigger.component-MUQ8_z9F.js";import"./RootCloseWrapper-BoboON3c.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-h7gd74W5.js";import"./Transition-Bf0qge6K.js";import"./Transition---za8--d.js";import"./ActionSplitDropdown.component-BAwgcGJh.js";import"./SplitButton-BFJK08Uv.js";import"./inheritsLoose-YZW0AQD1.js";import"./get-qjTxH1UM.js";import"./_baseGet-DLgWQ6xw.js";import"./toString-D_VnQXZr.js";import"./isSymbol-Ci3-tn5K.js";import"./eq-DxUMTyYi.js";import"./omit-CqGaiuAp.js";import"./_setToString-CLs8CHo9.js";import"./_getTag-BDcriQaX.js";import"./isArrayLike-yJgkhWh3.js";import"./DropdownButton-2l66evjG.js";import"./ActionIconToggle.component-DTQZPLiP.js";import"./Actions.component-DSwU-3xS.js";import"./FocusManager.component-Bo0tvm4U.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
