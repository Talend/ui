import{j as e}from"./iframe-Bl7tTCpu.js";import{E as r}from"./EditableText.component-co95MHbI.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-ksJXp5VB.js";import"./index-ClSbUYTE.js";import"./theme-CY0lAqA7.js";import"./constants-CZYEPhht.js";import"./Action.component-CHtqNjwc.js";import"./ActionButton.component-Dn22dGR0.js";import"./TooltipTrigger.component-_1_3taz4.js";import"./index-CK21R32n.js";import"./CircularProgress.component-DfVIk94t.js";import"./translate-SSGdWeYe.js";import"./withTranslation-Cg70oZeD.js";import"./OverlayTrigger.component-DDFdmF3z.js";import"./RootCloseWrapper-Cti4e6c-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CZbUNA5w.js";import"./Transition-BIKS9pJ4.js";import"./Transition-Bf7nV51V.js";import"./ActionSplitDropdown.component-BNFKN-87.js";import"./SplitButton-FcKZr7LO.js";import"./inheritsLoose-D8nHgM7Z.js";import"./get-CkvdNgkq.js";import"./_baseGet-BTf-ABXs.js";import"./toString-BDRN21-n.js";import"./isSymbol-BQNBFodK.js";import"./eq-BYqYf7pb.js";import"./omit-CGGb0KYE.js";import"./_setToString-DGV72ImX.js";import"./_getTag-mUiNMJM-.js";import"./isArrayLike-DfNKs8fL.js";import"./DropdownButton-Db2vzRHG.js";import"./ActionIconToggle.component-bspWPRew.js";import"./Actions.component-B2DMDtjC.js";import"./FocusManager.component-jF_P2YCv.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
