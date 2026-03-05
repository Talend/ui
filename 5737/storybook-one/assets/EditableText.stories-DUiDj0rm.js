import{j as e}from"./iframe-RgUw65v6.js";import{E as r}from"./EditableText.component-C8aIlXFI.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BuC7E58u.js";import"./index-DuKiuLaM.js";import"./theme-B84GjGRI.js";import"./constants-CZYEPhht.js";import"./Action.component-Cp3A882T.js";import"./ActionButton.component-DH_ewcRl.js";import"./TooltipTrigger.component-BQ9jb_NL.js";import"./index-CR3ImUN2.js";import"./CircularProgress.component-CvY4EAGe.js";import"./translate-CvJJhwK7.js";import"./withTranslation-Cd7UKj-O.js";import"./OverlayTrigger.component-DR2heDsy.js";import"./RootCloseWrapper-C77L2t2N.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CQcdUi3P.js";import"./Transition-CBwaArrS.js";import"./Transition-BoXVcRNz.js";import"./ActionSplitDropdown.component-SzKI3P9o.js";import"./SplitButton-DU91hRTn.js";import"./inheritsLoose-DIMPQris.js";import"./get-vL3k2tsH.js";import"./_baseGet-Ba48x7nN.js";import"./toString-CN3eaBAU.js";import"./isSymbol-C2UyLp5U.js";import"./eq-BC1O3BWQ.js";import"./omit-BUCJM0J1.js";import"./_baseSlice-7jdVvZRa.js";import"./_getTag-C_TwGE6F.js";import"./isArrayLike-CE3xx7cU.js";import"./DropdownButton-v4xa8Tac.js";import"./ActionIconToggle.component-CJyf72RA.js";import"./Actions.component-Dgcz1iPH.js";import"./FocusManager.component-DQJ7wKGh.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
