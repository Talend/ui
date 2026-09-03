import{j as e}from"./iframe-DQgfJw67.js";import{E as r}from"./EditableText.component-fVbrOhvv.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DZyar7PT.js";import"./index-CncI1Mj4.js";import"./theme-DI8-UJzN.js";import"./constants-CZYEPhht.js";import"./Action.component-CmH1MtAx.js";import"./ActionButton.component-AsICv5PP.js";import"./TooltipTrigger.component-B8TTpdzm.js";import"./index-DrrsYP9K.js";import"./CircularProgress.component-lrWQ3-22.js";import"./translate-DiI_Es12.js";import"./withTranslation-5PR4BJ6-.js";import"./OverlayTrigger.component-BVf8SOUy.js";import"./RootCloseWrapper-BV5D6_Gk.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-sVDanUzs.js";import"./Transition-DmNqRhFd.js";import"./Transition-C453gXLR.js";import"./ActionSplitDropdown.component-BSp9Na7X.js";import"./SplitButton-CEa8ibQT.js";import"./inheritsLoose-Dv8TIbRQ.js";import"./get-ClAVEm52.js";import"./_baseGet-CUFEkqTw.js";import"./toString-DozcUBT0.js";import"./isSymbol-CVtcgdPj.js";import"./eq-DGfcdYR8.js";import"./omit-ejUvHiJ5.js";import"./_setToString-DxntCt01.js";import"./_getTag-DVBlZYjA.js";import"./isArrayLike-CLJp57Ut.js";import"./DropdownButton-pzd5K3ei.js";import"./ActionIconToggle.component-B0-5UtJT.js";import"./Actions.component-rBGQUexS.js";import"./FocusManager.component-W0S9WzNH.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
