import{j as e}from"./iframe-DDbQPtEW.js";import{E as r}from"./EditableText.component-DAzuepL9.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-E6T_PEsN.js";import"./index-DwN9fP63.js";import"./theme-B86cisQm.js";import"./constants-CZYEPhht.js";import"./Action.component-z_tc2k8W.js";import"./ActionButton.component-C1rXDJXG.js";import"./TooltipTrigger.component-RyTGuFAh.js";import"./index-Br5au_O-.js";import"./CircularProgress.component-apPtCWbd.js";import"./translate-BAS4THSV.js";import"./withTranslation-CBoklo2K.js";import"./OverlayTrigger.component-BqP3Bda5.js";import"./RootCloseWrapper-BGY27Mp-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ByhQlRMI.js";import"./Transition-DKLhCDBr.js";import"./Transition-BRDVftK1.js";import"./ActionSplitDropdown.component-DJ2RyVCW.js";import"./SplitButton-BOEX_SVG.js";import"./inheritsLoose-CDxvETEX.js";import"./get-DEhvjXoT.js";import"./_baseGet-lTKxROzH.js";import"./toString-Cnm5KTc0.js";import"./isSymbol-DBdBqAfo.js";import"./eq-DCF4gZF2.js";import"./omit-D72adO18.js";import"./_setToString-Cv7pkYb4.js";import"./_getTag-BfvBz_ei.js";import"./isArrayLike-BSyHTOuQ.js";import"./DropdownButton-Bs0K8Cqf.js";import"./ActionIconToggle.component-moWZDsKn.js";import"./Actions.component-BBVK7eHA.js";import"./FocusManager.component-BTm7IE9d.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
