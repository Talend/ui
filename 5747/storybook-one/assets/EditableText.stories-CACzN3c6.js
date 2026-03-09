import{j as e}from"./iframe-Dz_qA_Fa.js";import{E as r}from"./EditableText.component-ClUM1VkF.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-C83rHjC1.js";import"./index-BbvlCrSE.js";import"./theme-B5Br_zxa.js";import"./constants-CZYEPhht.js";import"./Action.component-Ch672Rmw.js";import"./ActionButton.component-DCYG8N9B.js";import"./TooltipTrigger.component-_c0QPveT.js";import"./index-BGgNcAF3.js";import"./CircularProgress.component-yPmQuuJb.js";import"./translate-DdOJE879.js";import"./withTranslation-CG5lIvpL.js";import"./OverlayTrigger.component-Br6J8Vkf.js";import"./RootCloseWrapper-C1JMhpOp.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-WxKj_jxf.js";import"./Transition-BZcqI1EY.js";import"./Transition-D-MPy9FH.js";import"./ActionSplitDropdown.component-B-KMBCxf.js";import"./SplitButton-D3gG5gVf.js";import"./inheritsLoose-Bun7ixcr.js";import"./get-Bs9aIrca.js";import"./_baseGet-CJVZLrYF.js";import"./toString-BNLGOlej.js";import"./isSymbol-DTXI2GwG.js";import"./eq-J5bas50k.js";import"./omit-Cc8OFDRb.js";import"./_setToString-CxIpm-1K.js";import"./_getTag-C4Wku8tT.js";import"./isArrayLike-CN1V8Fp6.js";import"./DropdownButton-BwFRaPg5.js";import"./ActionIconToggle.component-7Ltchg3h.js";import"./Actions.component-BtioUtDE.js";import"./FocusManager.component-BVrDIFsl.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
