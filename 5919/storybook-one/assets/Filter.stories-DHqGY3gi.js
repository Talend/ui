import{j as o}from"./iframe-C4X7v6Um.js";import{A as l}from"./ActionBar.component-Dco-WeE_.js";import{F as e}from"./FilterBar.component-CkvHKTdZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BqnXiauK.js";import"./ActionButton.component-AlWvq_Am.js";import"./TooltipTrigger.component-DSZEQOuJ.js";import"./index-ChdIVX7r.js";import"./CircularProgress.component-PIxfqVZk.js";import"./constants-CZYEPhht.js";import"./translate-DeMmLpQx.js";import"./withTranslation-xGOXzfMk.js";import"./Skeleton.component-CDa0cKNt.js";import"./index-Hz11bDaL.js";import"./theme-BMGJz1IE.js";import"./OverlayTrigger.component-UyQN2Ly5.js";import"./RootCloseWrapper-sHnxR9r7.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DsJpRGw4.js";import"./Transition-4RQCvlf4.js";import"./Transition-EGOt_229.js";import"./ActionSplitDropdown.component-BsqOoHNV.js";import"./SplitButton-Bd9PAVkf.js";import"./inheritsLoose-BkNWGGaW.js";import"./DropdownButton-Vz6YKxpy.js";import"./ActionIconToggle.component-Cl4OBJrf.js";import"./Actions.component-CvmBpwRv.js";import"./index-yMXNQuE8.js";import"./index-CNwkPYn5.js";import"./FormControl-YSk87vR4.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const q=["DefaultDockAndDockable","NoDockedNoDockableAndIconVisible","CustomUndockNoDockable","DisabledInput"];export{t as CustomUndockNoDockable,r as DefaultDockAndDockable,i as DisabledInput,n as NoDockedNoDockableAndIconVisible,q as __namedExportsOrder,O as default};
