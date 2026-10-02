import{j as e}from"./iframe-C-9kQODR.js";import{E as r}from"./EditableText.component-76BsPbU9.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DGCwTwtK.js";import"./index-BK51yajs.js";import"./theme-WHaicbIp.js";import"./constants-CZYEPhht.js";import"./Action.component-BjAMG_ZF.js";import"./ActionButton.component-CUg2AdBE.js";import"./TooltipTrigger.component-DyjXoEbt.js";import"./index-dfuQwTs3.js";import"./CircularProgress.component-foM_9Sue.js";import"./translate-B0yzPrEz.js";import"./withTranslation-CPWrGa1d.js";import"./OverlayTrigger.component-C7Jj0kO7.js";import"./RootCloseWrapper-BTxbnbsg.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Kj8j2gRp.js";import"./Transition-D56y22qT.js";import"./Transition-DrxYc5lb.js";import"./ActionSplitDropdown.component-DtcYhR-X.js";import"./SplitButton-gfsuCrOm.js";import"./inheritsLoose-D_-G8W1w.js";import"./DropdownButton-C2XUli1f.js";import"./ActionIconToggle.component-DxAW4lMc.js";import"./Actions.component-BPbv0qWI.js";import"./FocusManager.component-CvwChARL.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},z={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},d={render:()=>e.jsx(r,{loading:!0,...o})},i={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},c={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},m={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText loading {...props} />
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText disabled {...props} />
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText inProgress {...props} />
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} />
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText required={false} editMode {...props} />
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode placeholder="Enter your text here.." {...props} text="" />
}`,...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <EditableText editMode {...props} text="" errorMessage="custom error message" />
}`,...l.parameters?.docs?.source}}};const A=["Default","WithoutValue","WithEllipsis","Loading","Disabled","InProgress","EditMode","NotRequired","Placeholder","WithError"];export{t as Default,i as Disabled,p as EditMode,n as InProgress,d as Loading,c as NotRequired,m as Placeholder,a as WithEllipsis,l as WithError,s as WithoutValue,A as __namedExportsOrder,z as default};
