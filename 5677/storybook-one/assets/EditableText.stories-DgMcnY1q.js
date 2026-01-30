import{j as e}from"./iframe-ChHbVRNu.js";import{E as r}from"./EditableText.component-C8pFHH7-.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-CPGSHBW4.js";import"./index-DGGBlbSp.js";import"./theme-6pUkCs8M.js";import"./constants-CZYEPhht.js";import"./Action.component-3AV8JWX6.js";import"./ActionButton.component-HnO9sWYB.js";import"./TooltipTrigger.component-Cjzk50Qq.js";import"./index-B8VVVPUl.js";import"./CircularProgress.component-WB80l_2i.js";import"./translate-DSkg9kkf.js";import"./withTranslation-DNrQQHNO.js";import"./OverlayTrigger.component-C6hFVnWk.js";import"./RootCloseWrapper-CDbyJ8bQ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DSJE1X6Q.js";import"./Transition-CZYJCq4z.js";import"./Transition-r4xo0oMn.js";import"./ActionSplitDropdown.component-DepItD5T.js";import"./SplitButton-DuNCG4_z.js";import"./inheritsLoose-BkN_cD3F.js";import"./get-CwrUn-1j.js";import"./_baseGet-DBNpedq7.js";import"./toString-BoyePzJy.js";import"./isSymbol-BULzMdII.js";import"./eq-CAK3zFQY.js";import"./omit-D_vPiMOe.js";import"./_baseSlice-t7865O3C.js";import"./_getTag-QP-MsuCO.js";import"./isArrayLike-Cow3ytjD.js";import"./DropdownButton-CQCiZiyd.js";import"./ActionIconToggle.component-DHYaEX4T.js";import"./Actions.component-oylIYMTM.js";import"./FocusManager.component-DGsym7v5.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
