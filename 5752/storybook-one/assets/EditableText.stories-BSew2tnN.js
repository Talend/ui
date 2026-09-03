import{j as e}from"./iframe-iRAzPMY8.js";import{E as r}from"./EditableText.component-BpInlGru.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-fiKEWpb3.js";import"./index-CoeS2ufb.js";import"./theme-DkX-pT0S.js";import"./constants-CZYEPhht.js";import"./Action.component-TvI6aE1g.js";import"./ActionButton.component-C-MA_r8j.js";import"./TooltipTrigger.component-Bb4l9GJn.js";import"./index-DtBEJcaV.js";import"./CircularProgress.component-hAIB16uf.js";import"./translate-CXTmblci.js";import"./withTranslation-BNHcusKW.js";import"./OverlayTrigger.component-CaaWVcUe.js";import"./RootCloseWrapper-BdzZZqCI.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_KIwtImD.js";import"./Transition-DjCDrLBR.js";import"./Transition-BYvXW3PW.js";import"./ActionSplitDropdown.component-Lbw5668r.js";import"./SplitButton-COJ8E7lV.js";import"./inheritsLoose-C51erBbc.js";import"./get-DAUq65Xs.js";import"./_baseGet-BAYfqDfh.js";import"./toString-Uaq3eq9r.js";import"./isSymbol-oj_-vwa9.js";import"./eq-CC2vorwN.js";import"./omit-CS6P3RiW.js";import"./_setToString-CLXxGEHx.js";import"./_getTag-5V2N-G3f.js";import"./isArrayLike-CJa-2peo.js";import"./DropdownButton-5DS6nl8l.js";import"./ActionIconToggle.component-Dep-paU3.js";import"./Actions.component-BSmuIAS6.js";import"./FocusManager.component-DDpdvnfF.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
