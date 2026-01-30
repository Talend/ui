import{j as e}from"./iframe-DRCDqYKx.js";import{E as r}from"./EditableText.component-tn-SFDGV.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-CT9l-lWy.js";import"./index-BIily9ko.js";import"./theme-CzxyoK-X.js";import"./constants-CZYEPhht.js";import"./Action.component-CJ9_2or_.js";import"./ActionButton.component-1Icy61zR.js";import"./TooltipTrigger.component-Bqma5M62.js";import"./index-SGcJ9lCQ.js";import"./CircularProgress.component-nXeNfRZW.js";import"./translate-CgWnTO0f.js";import"./withTranslation-CwRJApAz.js";import"./OverlayTrigger.component-DnlNtOeW.js";import"./RootCloseWrapper-CKSfp_mT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CW79-Ycx.js";import"./Transition-yFpeChhI.js";import"./Transition-DAA4VcSW.js";import"./ActionSplitDropdown.component-IXc4gLWS.js";import"./SplitButton-DWHaX3fp.js";import"./inheritsLoose-DFSzpK5W.js";import"./get-BnUbLWFW.js";import"./_baseGet-MR6lSUTo.js";import"./toString-CSJO3U6T.js";import"./isSymbol-DlwjzEhs.js";import"./eq-BrCzcbIc.js";import"./omit-BXo64jaB.js";import"./_baseSlice-BE1vJk-8.js";import"./_getTag-CKy82HA6.js";import"./isArrayLike-C3kMs0g0.js";import"./DropdownButton-BAhn8q_j.js";import"./ActionIconToggle.component-B-AUkd0L.js";import"./Actions.component-Bp7xE756.js";import"./FocusManager.component-DQsDYyE7.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
