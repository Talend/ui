import{j as e}from"./iframe-rcbdjyh0.js";import{E as r}from"./EditableText.component-Bj94c2zu.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BVQpKunZ.js";import"./index-C3Pb3PUj.js";import"./theme-DhFfYXOr.js";import"./constants-CZYEPhht.js";import"./Action.component-DodTS3cT.js";import"./ActionButton.component-BnfaDICA.js";import"./TooltipTrigger.component-BQEDq8Ni.js";import"./index-BbWLOxH9.js";import"./CircularProgress.component-DKXr6UXW.js";import"./translate-BK16wNsJ.js";import"./withTranslation-RtkcgpcX.js";import"./OverlayTrigger.component-DSaE6koc.js";import"./RootCloseWrapper-CaRqAQd6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BaDRcFjQ.js";import"./Transition-CLi3r_Mg.js";import"./Transition-DIYpAYhp.js";import"./ActionSplitDropdown.component-KvS3iaZW.js";import"./SplitButton-oQtMwEHI.js";import"./inheritsLoose-7iwQTnFx.js";import"./get-C09BkURI.js";import"./_baseGet-C11ef2gr.js";import"./toString-BX2Xe3RA.js";import"./isSymbol-C7eRzt_H.js";import"./eq-C1mzgYra.js";import"./omit-CT9o4-Oo.js";import"./_setToString-yrwp8C8e.js";import"./_getTag-BeKiPZ6S.js";import"./isArrayLike-CgqB0nhw.js";import"./DropdownButton-DkLmTM9_.js";import"./ActionIconToggle.component-CVBydy35.js";import"./Actions.component-jMwCncJt.js";import"./FocusManager.component-DAb9QZwA.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
