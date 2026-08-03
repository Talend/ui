import{j as e}from"./iframe-BIlTseOR.js";import{E as r}from"./EditableText.component-BjGCrgO7.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-DzGdl8Ok.js";import"./index-Bx3-Knuk.js";import"./theme-B8SIcIZ-.js";import"./constants-CZYEPhht.js";import"./Action.component-BEqvGwIH.js";import"./ActionButton.component-BAJFaB-X.js";import"./TooltipTrigger.component-BzH-4p_V.js";import"./index-Bq5aoIbe.js";import"./CircularProgress.component-CbtGAEkx.js";import"./translate-HdDYEQ7l.js";import"./withTranslation-BAq7qSAa.js";import"./OverlayTrigger.component-BCyOtEPb.js";import"./RootCloseWrapper-BrnMcBWH.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CFryWc8E.js";import"./Transition-BdAae8s4.js";import"./Transition-Djm1RO_m.js";import"./ActionSplitDropdown.component-BuZOOqtY.js";import"./SplitButton-ClREZmpf.js";import"./inheritsLoose-DYaf4ECg.js";import"./get-7LRZiTcy.js";import"./_baseGet-BG7BiJ02.js";import"./toString-bKpWVbaB.js";import"./isSymbol-Dzp-ihe1.js";import"./eq-D00YlZ_o.js";import"./omit-BaKyBsUW.js";import"./_setToString-DYTubzWT.js";import"./_getTag-DxawX5ba.js";import"./isArrayLike-Cf2QI71o.js";import"./DropdownButton-VZRLYmH0.js";import"./ActionIconToggle.component-3Fpv-XX4.js";import"./Actions.component-Cx-LLj1r.js";import"./FocusManager.component-BYoFNU3K.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
