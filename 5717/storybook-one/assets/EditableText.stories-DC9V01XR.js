import{j as e}from"./iframe-DLNvOUB0.js";import{E as r}from"./EditableText.component-BawHBOC8.js";import"./preload-helper-PPVm8Dsz.js";import"./Skeleton.component-BCP_tymf.js";import"./index-BayEts6e.js";import"./theme-BE0pQPy_.js";import"./constants-CZYEPhht.js";import"./Action.component-Be-HZH7n.js";import"./ActionButton.component-tP9JPag2.js";import"./TooltipTrigger.component-D8Bc8a6o.js";import"./index-B41yblyX.js";import"./CircularProgress.component-0xB_c5z_.js";import"./translate-DzrbyU4a.js";import"./withTranslation-CvaP5PxU.js";import"./OverlayTrigger.component-Cd2iG2yL.js";import"./RootCloseWrapper-gxGhI_cZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CjhE3iYr.js";import"./Transition-CBBi_-lk.js";import"./Transition-Bfnhv3KJ.js";import"./ActionSplitDropdown.component-BcjQPHz0.js";import"./SplitButton-B4P5n9I3.js";import"./inheritsLoose-D8OOErJR.js";import"./get-DvH0MHqO.js";import"./_baseGet-BQKmBcvz.js";import"./toString-PTKgs-Bb.js";import"./isSymbol-DQOFvlp-.js";import"./eq-BPNOT68H.js";import"./omit-C8EJGJPj.js";import"./_baseSlice-BPJPZi7x.js";import"./_getTag-BYGoso54.js";import"./isArrayLike-DAxrnkzW.js";import"./DropdownButton-BYvZYhNn.js";import"./ActionIconToggle.component-IhX4fhkP.js";import"./Actions.component-JQaUe7Sj.js";import"./FocusManager.component-H8Jx8Jho.js";const o={text:"Lorem ipsum dolor sit amet",onEdit:()=>console.log("onEdit"),onSubmit:()=>console.log("onSubmit"),onChange:()=>console.log("onChange"),onCancel:()=>console.log("onCancel")},X={title:"Components/Form - Inline form/EditableText",component:r,tags:["autodocs"],decorators:[u=>e.jsxs("div",{children:[e.jsx("h1",{children:"EditableText"}),u()]})]},t={render:()=>e.jsx(r,{...o})},s={render:()=>{const u={...o,text:""};return e.jsx("div",{style:{width:150},children:e.jsx(r,{...u})})}},a={render:()=>e.jsx("div",{style:{width:"150px"},children:e.jsx(r,{...o})})},i={render:()=>e.jsx(r,{loading:!0,...o})},d={render:()=>e.jsx(r,{disabled:!0,...o})},n={render:()=>e.jsx(r,{inProgress:!0,...o})},p={render:()=>e.jsx(r,{editMode:!0,...o})},m={render:()=>e.jsx(r,{required:!1,editMode:!0,...o})},c={render:()=>e.jsx(r,{editMode:!0,placeholder:"Enter your text here..",...o,text:""})},l={render:()=>e.jsx(r,{editMode:!0,...o,text:"",errorMessage:"custom error message"})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
