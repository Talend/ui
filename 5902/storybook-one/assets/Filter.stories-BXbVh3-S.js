import{j as o}from"./iframe-BQEEiZRV.js";import{A as l}from"./ActionBar.component-SkC14uO_.js";import{F as e}from"./FilterBar.component-C63Iw1U6.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-B--dv5VL.js";import"./ActionButton.component-8HHrM9Qn.js";import"./TooltipTrigger.component-BAsIK6_B.js";import"./index-D4k-9F7L.js";import"./CircularProgress.component-COIHK1Ps.js";import"./constants-CZYEPhht.js";import"./translate-DtsfgApf.js";import"./withTranslation-DD5bijEW.js";import"./Skeleton.component-DaxO-5F7.js";import"./index-BrkDvxo5.js";import"./theme-CHdsOZuJ.js";import"./OverlayTrigger.component-rcexGgTF.js";import"./RootCloseWrapper-DkaxUEUD.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DX7031yL.js";import"./Transition-B9b2qDfo.js";import"./Transition-BPKUexP_.js";import"./ActionSplitDropdown.component-B5kEziLw.js";import"./SplitButton-Cc4i-rrH.js";import"./inheritsLoose-B-gjyeBc.js";import"./DropdownButton-bx3m8i2K.js";import"./ActionIconToggle.component-BmYSilDj.js";import"./Actions.component-DGzWT6yE.js";import"./index-N7oSttiG.js";import"./index-CFeD03Ge.js";import"./FormControl-BZmTx6hU.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
