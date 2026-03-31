import{j as e}from"./iframe-Dvowsd3O.js";import{E as r}from"./EditableText.component-Dt_loleR.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-B35syhI6.js";import"./index-C_dH7GD9.js";import"./theme-CcAT0CDp.js";import"./constants-CZYEPhht.js";import"./Action.component-C0aZRgmw.js";import"./ActionButton.component-C1B7ptUs.js";import"./TooltipTrigger.component-CLY_2EJG.js";import"./index-Bium8SmC.js";import"./CircularProgress.component-CBV7f5M3.js";import"./translate-BDOAM9iE.js";import"./withTranslation-Diaz7TBZ.js";import"./OverlayTrigger.component-BvS_G0w-.js";import"./RootCloseWrapper-Bs-3D2R6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CRALqaQN.js";import"./Transition-CuC7Ka_d.js";import"./Transition-BhPvHe6i.js";import"./ActionSplitDropdown.component-CmGbSFWG.js";import"./SplitButton-DEpKFwz4.js";import"./inheritsLoose-CsmMGUjM.js";import"./get-CmA6nBAh.js";import"./_baseGet-D2eDGu1E.js";import"./toString-8u18pFy3.js";import"./isSymbol-ByVRBfnc.js";import"./eq-CT5L5I4M.js";import"./omit-C4KfQ_-8.js";import"./_setToString-Ykk7KIXg.js";import"./_getTag-B24nJyzZ.js";import"./isArrayLike-Cq9vpx2B.js";import"./DropdownButton-B-GIYYt8.js";import"./ActionIconToggle.component-Cht7gJjW.js";import"./Actions.component-0d7NMU5I.js";import"./FocusManager.component-CgQwBVxX.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
