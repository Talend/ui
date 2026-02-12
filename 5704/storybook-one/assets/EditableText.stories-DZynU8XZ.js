import{j as e}from"./iframe-CfWawTfz.js";import{E as r}from"./EditableText.component-D9Z8hCy1.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D787FrVL.js";import"./index-Da2WDrD7.js";import"./theme-DZnXLXFI.js";import"./constants-CZYEPhht.js";import"./Action.component-CvQB7n2g.js";import"./ActionButton.component-CQ7IfqeE.js";import"./TooltipTrigger.component-C_mlG1Ec.js";import"./index-bf582Dru.js";import"./CircularProgress.component-Bl-gboGZ.js";import"./translate-_-Ynof8F.js";import"./withTranslation-LpUUPLYn.js";import"./OverlayTrigger.component-7d0O78sW.js";import"./RootCloseWrapper-BvF8jVFh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CFjNdl8c.js";import"./Transition-CO_Dd883.js";import"./Transition-DqY3BSxz.js";import"./ActionSplitDropdown.component-DmzuBYmN.js";import"./SplitButton-tTvU2YaZ.js";import"./inheritsLoose-DczegdGe.js";import"./get-Boxz4RUy.js";import"./_baseGet-Bg4bRzyO.js";import"./toString-CZ1StVC9.js";import"./isSymbol-B_IhllLH.js";import"./eq-CeyCSzlA.js";import"./omit-CDk5agw1.js";import"./_baseSlice-DoFQb18h.js";import"./_getTag-C-E0KhKX.js";import"./isArrayLike-xbYlSaqA.js";import"./DropdownButton-2hY-uqx4.js";import"./ActionIconToggle.component-LHDY8e6M.js";import"./Actions.component-D_CjFFo9.js";import"./FocusManager.component-DCTseE8Q.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
