import{j as e}from"./iframe-ZOGeCSiy.js";import{E as r}from"./EditableText.component-Dsjsy6u7.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-N7_eYc0h.js";import"./index-D_abBtzh.js";import"./theme-CE6R_YGz.js";import"./constants-CZYEPhht.js";import"./Action.component-B584f_uk.js";import"./ActionButton.component-eaoAlJUf.js";import"./TooltipTrigger.component-BLJRLllu.js";import"./index-DC843bAT.js";import"./CircularProgress.component-BrhcN_XO.js";import"./translate-C0eZGPcd.js";import"./withTranslation-D4TJQ1jV.js";import"./OverlayTrigger.component-BMlPJI7F.js";import"./RootCloseWrapper-TPLWA_tq.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DksHDv9A.js";import"./Transition-j6wf0nG1.js";import"./Transition-BVyFOmuZ.js";import"./ActionSplitDropdown.component-CXns4ixp.js";import"./SplitButton-DLiWLDF5.js";import"./inheritsLoose-B465Ji_I.js";import"./get-Bf-Kb1qt.js";import"./_baseGet-zdJDQGKY.js";import"./toString-CvgZXU79.js";import"./isSymbol-IdjUtDg4.js";import"./eq-lWQTG8BZ.js";import"./omit-ClkKedsP.js";import"./_setToString-DPVKMo3z.js";import"./_getTag-BhxNqYHo.js";import"./isArrayLike-Bympu03d.js";import"./DropdownButton-BWgznDww.js";import"./ActionIconToggle.component-DA-mj3wa.js";import"./Actions.component-Cuk-riaJ.js";import"./FocusManager.component-BI70yK_8.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
