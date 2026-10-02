import{j as o}from"./iframe-Cfph2DnH.js";import{A as l}from"./ActionBar.component-DOiIZhTf.js";import{F as e}from"./FilterBar.component-_BmNJnQU.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-B0yXGqfc.js";import"./ActionButton.component-Bx0SysYG.js";import"./TooltipTrigger.component-Cdj-2FPD.js";import"./index-CsIHMGve.js";import"./CircularProgress.component-CckIFTx5.js";import"./constants-CZYEPhht.js";import"./translate-zaNK4eyE.js";import"./withTranslation-DyhivlV8.js";import"./Skeleton.component-DwjJUeXs.js";import"./index-D6BxuZjr.js";import"./theme-1JUgSmKD.js";import"./OverlayTrigger.component-D2NurrbH.js";import"./RootCloseWrapper-CBgf09w_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CglAm0Hz.js";import"./Transition-COY8w3Hq.js";import"./Transition-LGSW0rRl.js";import"./ActionSplitDropdown.component-CKHva0tX.js";import"./SplitButton-BQxlrn_Z.js";import"./inheritsLoose-BrwQGNDA.js";import"./DropdownButton-bH_U98sw.js";import"./ActionIconToggle.component-DHhobi5S.js";import"./Actions.component-Dbgt2pKG.js";import"./index-BtJZfqke.js";import"./index-qmTUW6dD.js";import"./FormControl-BZ9ejAqv.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
