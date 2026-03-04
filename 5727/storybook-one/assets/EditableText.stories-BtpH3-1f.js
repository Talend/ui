import{j as e}from"./iframe-BGIuRL4S.js";import{E as r}from"./EditableText.component-BN3M8rYc.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-B0jLA45p.js";import"./index-DDnTDZUK.js";import"./theme-3R2elXtU.js";import"./constants-CZYEPhht.js";import"./Action.component-JWfbdBXF.js";import"./ActionButton.component-E5deMur2.js";import"./TooltipTrigger.component-BADEKJlr.js";import"./index-dvKqYt1u.js";import"./CircularProgress.component-CAd3ZChp.js";import"./translate-Cy2726cc.js";import"./withTranslation-BpgtAtgo.js";import"./OverlayTrigger.component-sQneb90h.js";import"./RootCloseWrapper-CFtMMLNJ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BVTCUTdV.js";import"./Transition-C6-b-Osj.js";import"./Transition-C4c_ulxf.js";import"./ActionSplitDropdown.component-C226wKn4.js";import"./SplitButton-B3syWE9i.js";import"./inheritsLoose-CJtaSU43.js";import"./get-eCwbVx25.js";import"./_baseGet-ClsFL8Gs.js";import"./toString-CCpUnVXs.js";import"./isSymbol-BVsMw-Q6.js";import"./eq-BSuxMkJX.js";import"./omit-mz8lpH4r.js";import"./_baseSlice-BPNoC_Qe.js";import"./_getTag-xIia899o.js";import"./isArrayLike-A0UH1NNY.js";import"./DropdownButton-CljZdDwa.js";import"./ActionIconToggle.component-DuJSHZaS.js";import"./Actions.component-Df6QtLw3.js";import"./FocusManager.component-CWXXiQxl.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
