import{j as o}from"./iframe-D-blrJ-o.js";import{A as l}from"./ActionBar.component-BoDWotE1.js";import{F as e}from"./FilterBar.component-DE7eQp7u.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BBEYvhF1.js";import"./ActionButton.component-NL6_EwV_.js";import"./TooltipTrigger.component-DMbfnZpY.js";import"./index-lIvj0yXg.js";import"./CircularProgress.component-YCw1GpO-.js";import"./constants-CZYEPhht.js";import"./translate-cma22zhb.js";import"./withTranslation-C_HRI0RV.js";import"./Skeleton.component-CIGG43mj.js";import"./index-C8-AnYno.js";import"./theme-CAXbUl-6.js";import"./OverlayTrigger.component-CXTKhBbT.js";import"./RootCloseWrapper-RrEZAO_q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dwnv9pdF.js";import"./Transition-BDadDiAh.js";import"./Transition-B-69Sh4H.js";import"./ActionSplitDropdown.component-GCAMmQRB.js";import"./SplitButton-B9c5f5NT.js";import"./inheritsLoose-Dp07B8_F.js";import"./get-DhnSccqV.js";import"./_baseGet-NFp1u5HG.js";import"./toString-BTfYpm0t.js";import"./isSymbol-fqM6njwu.js";import"./eq-J4RZavgT.js";import"./omit-SqwbWo4S.js";import"./_setToString-Cp67bGf8.js";import"./_getTag-C64CVJ8L.js";import"./isArrayLike-CpbMogeV.js";import"./DropdownButton-BocLSqvv.js";import"./ActionIconToggle.component-C2V0JP5p.js";import"./Actions.component-BgzTKYXl.js";import"./index-CMr_3tio.js";import"./index-C1B4idi0.js";import"./FormControl-gRZx7gKT.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},Y={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={divStyle}>
            <p>When not docked but dockable in an ActionBar</p>
            <ActionBar>
                <FilterBar {...propsDockToggle} />
            </ActionBar>
        </div>
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div style={divStyle}>
            <p>When icon always visible and not docked, no dockable in an ActionBar</p>
            <ActionBar>
                <FilterBar {...propsIconAlwaysVisble} />
            </ActionBar>
        </div>
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <p>When not docked and no dockable take full width</p>
            <FilterBar {...propsNoDockToggle} />
        </div>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={divStyle}>
            <p>With the input filter disable</p>
            <ActionBar>
                <FilterBar {...propsDisabled} />
            </ActionBar>
        </div>
}`,...i.parameters?.docs?.source}}};const Z=["DefaultDockAndDockable","NoDockedNoDockableAndIconVisible","CustomUndockNoDockable","DisabledInput"];export{t as CustomUndockNoDockable,r as DefaultDockAndDockable,i as DisabledInput,n as NoDockedNoDockableAndIconVisible,Z as __namedExportsOrder,Y as default};
