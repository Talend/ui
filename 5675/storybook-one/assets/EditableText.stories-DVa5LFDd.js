import{j as e}from"./iframe-BBf9rzxA.js";import{E as r}from"./EditableText.component-sGcDKNJC.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-D0yTK3Tj.js";import"./index-DAqxfM7Q.js";import"./theme-C4w-c8M9.js";import"./constants-CZYEPhht.js";import"./Action.component-Cz8Igo4J.js";import"./ActionButton.component-D9c99jvM.js";import"./TooltipTrigger.component-gDCERbUQ.js";import"./index-D3rKfqfq.js";import"./CircularProgress.component-CP7cXXJs.js";import"./translate-DcFpjhI3.js";import"./withTranslation-Tch9Q_mc.js";import"./OverlayTrigger.component-kuFDFFVI.js";import"./RootCloseWrapper-D3cfPY5q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-f2TN8igf.js";import"./Transition-BOfoCdDz.js";import"./Transition-Bz4l5973.js";import"./ActionSplitDropdown.component-8m2MMfat.js";import"./SplitButton-MWoh9VS5.js";import"./inheritsLoose-CDvLJTBf.js";import"./get-D4npDK4m.js";import"./_baseGet-BLHmTq3h.js";import"./toString-CYYtD2UM.js";import"./isSymbol-d6VGNOms.js";import"./eq-BfMl4R98.js";import"./omit-D2aDgycu.js";import"./_setToString-DGfO32Ln.js";import"./_getTag-BQmqoArp.js";import"./isArrayLike-CGt-7ZY7.js";import"./DropdownButton-20PkRYW5.js";import"./ActionIconToggle.component-CW6o58yd.js";import"./Actions.component-D8eQ-2cD.js";import"./FocusManager.component-ZobH5sk1.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
