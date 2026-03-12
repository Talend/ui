import{j as e}from"./iframe-gYF_G_fE.js";import{E as r}from"./EditableText.component-IWELk_JF.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-3xVHTWN3.js";import"./index-fhOEXeee.js";import"./theme-BVcRJK3s.js";import"./constants-CZYEPhht.js";import"./Action.component-Br0NjqE0.js";import"./ActionButton.component-BEPjXJOh.js";import"./TooltipTrigger.component-Cq3j2j1T.js";import"./index-BvzjzKmP.js";import"./CircularProgress.component-DVjiN9Cy.js";import"./translate-CqNlcqFg.js";import"./withTranslation-b-d2pe2u.js";import"./OverlayTrigger.component-B6dmMou1.js";import"./RootCloseWrapper-xrEj3CJP.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cs4fQJvl.js";import"./Transition-fVWzjx8U.js";import"./Transition-6GZi0dnD.js";import"./ActionSplitDropdown.component-Bp4zP5Ce.js";import"./SplitButton-CStUta-K.js";import"./inheritsLoose-VTIw4njF.js";import"./get-BVX_P4PF.js";import"./_baseGet-BpHqkg2j.js";import"./toString-KzU2lKBf.js";import"./isSymbol-DWn58mtK.js";import"./eq-CXZE_YOC.js";import"./omit-BYAik5n-.js";import"./_setToString-Bft5b4bW.js";import"./_getTag-CtJ5ewXi.js";import"./isArrayLike-DL1Iy8XB.js";import"./DropdownButton-D06ht9G5.js";import"./ActionIconToggle.component-BFP8ry7f.js";import"./Actions.component-DVRRfGwT.js";import"./FocusManager.component-C0DUOqqw.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
