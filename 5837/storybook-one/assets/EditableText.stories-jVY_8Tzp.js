import{j as e}from"./iframe-DqLkcC_p.js";import{E as r}from"./EditableText.component-CMTG4cQ0.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DQmp7pSm.js";import"./index-CUULivym.js";import"./theme-BzAhr63g.js";import"./constants-CZYEPhht.js";import"./Action.component-DkyyyqGT.js";import"./ActionButton.component-Wc-xjWvy.js";import"./TooltipTrigger.component-DXvai9iq.js";import"./index-B_XRYfHm.js";import"./CircularProgress.component-DM42CpaE.js";import"./translate-upENKyO0.js";import"./withTranslation-CYrWQw4j.js";import"./OverlayTrigger.component-mBiihvas.js";import"./RootCloseWrapper-CC0YbW_h.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BvmvrUKA.js";import"./Transition-oL0du4tN.js";import"./Transition-7_MjOcbp.js";import"./ActionSplitDropdown.component-6Eg8-CVw.js";import"./SplitButton-D-EhJxF1.js";import"./inheritsLoose-D2z94f4h.js";import"./get-vLCTdp9T.js";import"./_baseGet-CqLo12ra.js";import"./toString-XRfePjwx.js";import"./isSymbol-8uZDi99P.js";import"./eq-B-n9oN1f.js";import"./omit-D7Y82oir.js";import"./_setToString-BmXcwbXv.js";import"./_getTag-Cga9V7T2.js";import"./isArrayLike-FDbjKheZ.js";import"./DropdownButton-CIcEgCrn.js";import"./ActionIconToggle.component-dK31r8s6.js";import"./Actions.component-CKq_M3Nf.js";import"./FocusManager.component-D258sfUd.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
