import{j as e}from"./iframe-BeUrxS75.js";import{E as r}from"./EditableText.component-D6mwh9kX.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-Doa5RG4V.js";import"./index-D3gJW--R.js";import"./theme-ByAIAit0.js";import"./constants-CZYEPhht.js";import"./Action.component-B81spSf8.js";import"./ActionButton.component-DztB4VBb.js";import"./TooltipTrigger.component-BN0CMt2Y.js";import"./index-tLR6j0ax.js";import"./CircularProgress.component-D90Gv8Ln.js";import"./translate-BhDR11Ia.js";import"./withTranslation-BMw-xhsf.js";import"./OverlayTrigger.component-CXa1QDao.js";import"./RootCloseWrapper-Dkb2rwuc.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C_DxvxFJ.js";import"./Transition-DsLtkSnW.js";import"./Transition-CVbE3JtA.js";import"./ActionSplitDropdown.component-DagaBzcf.js";import"./SplitButton-BHzI4c9u.js";import"./inheritsLoose-CtV3E512.js";import"./get-Da1hbhWf.js";import"./_baseGet-BYPC0Nrw.js";import"./toString-COATutRb.js";import"./isSymbol-BqqTSgov.js";import"./eq-VoAmlW1Q.js";import"./omit-CUjb5z2T.js";import"./_setToString-CzatqGiI.js";import"./_getTag-D-QJwtlC.js";import"./isArrayLike-RX78eRsG.js";import"./DropdownButton-CYyElzZX.js";import"./ActionIconToggle.component-Nz6Gc9hj.js";import"./Actions.component-CJmufm-4.js";import"./FocusManager.component-GwNYAl5B.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
