import{j as e}from"./iframe-BDzYBMaC.js";import{E as r}from"./EditableText.component-BLsD5w9I.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-Deo2Fhm1.js";import"./index-CgwxmQms.js";import"./theme-BkTAIP-h.js";import"./constants-CZYEPhht.js";import"./Action.component-CZ4U2OK5.js";import"./ActionButton.component-Bxjilb56.js";import"./TooltipTrigger.component-BnH52FLd.js";import"./index-CJ5sQWM1.js";import"./CircularProgress.component-BJX6z2P5.js";import"./translate-DaL0c1TJ.js";import"./withTranslation-C6292tqo.js";import"./OverlayTrigger.component-Bm8TQHXw.js";import"./RootCloseWrapper-iY3kxLkJ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-hTNRUy-C.js";import"./Transition-6VlpfvTD.js";import"./Transition-66tmR4yx.js";import"./ActionSplitDropdown.component-xq5GqnO5.js";import"./SplitButton-D1VkrNzs.js";import"./inheritsLoose-CVceljL-.js";import"./get-r9bOepnM.js";import"./_baseGet-qa8X972v.js";import"./toString-D3MAot4O.js";import"./isSymbol-CfhP7y8g.js";import"./eq-BicXA8Su.js";import"./omit-u_0FUImL.js";import"./_baseSlice-BmVIjQqE.js";import"./_getTag-BFP-W8DA.js";import"./isArrayLike-DJQc95ca.js";import"./DropdownButton-BIJRhCnj.js";import"./ActionIconToggle.component-D2an_6WR.js";import"./Actions.component-jIfW4RKk.js";import"./FocusManager.component-BtOCB0ts.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
