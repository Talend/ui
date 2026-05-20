import{j as e}from"./iframe-BHNyYmnH.js";import{E as r}from"./EditableText.component-CGsiYowd.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-CRLGQTnO.js";import"./index-CjM7RE0z.js";import"./theme-CSQRXcUF.js";import"./constants-CZYEPhht.js";import"./Action.component-Bz6kRUtL.js";import"./ActionButton.component-IpEDwgct.js";import"./TooltipTrigger.component-Br6btDrg.js";import"./index-CCy5oUWi.js";import"./CircularProgress.component-wH_0fLsi.js";import"./translate-WIDpsCUC.js";import"./withTranslation-DwuNJiuX.js";import"./OverlayTrigger.component-CcmbwYTe.js";import"./RootCloseWrapper-S2ClSwjN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bzka2rP5.js";import"./Transition-KG3xiPMS.js";import"./Transition-bW7caDWR.js";import"./ActionSplitDropdown.component-CjufbVQL.js";import"./SplitButton-CsH6Huhx.js";import"./inheritsLoose-CK_T0nOw.js";import"./get-CHMwC6sW.js";import"./_baseGet-BedlkoUw.js";import"./toString-DnNoqVhG.js";import"./isSymbol-DgOvFIr6.js";import"./eq-Bl4h4C2b.js";import"./omit-B9cOHraP.js";import"./_setToString-DBxFL1_f.js";import"./_getTag-BkiVVTqL.js";import"./isArrayLike-D4mkoKrk.js";import"./DropdownButton-By-VQHak.js";import"./ActionIconToggle.component-LcOvVwur.js";import"./Actions.component-DnEXXnwT.js";import"./FocusManager.component-Be_vX8pk.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
