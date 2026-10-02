import{j as o}from"./iframe-CaM4pCYv.js";import{A as l}from"./ActionBar.component-DO3CbVGX.js";import{F as e}from"./FilterBar.component-Do7sAXDZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CZE9ZQF6.js";import"./ActionButton.component-C0ot--5y.js";import"./TooltipTrigger.component-BueHNT20.js";import"./index-DTwir-ZV.js";import"./CircularProgress.component-BGprhGdK.js";import"./constants-CZYEPhht.js";import"./translate-BYClF0Em.js";import"./withTranslation-dmg4-Q5z.js";import"./Skeleton.component-CnEYHeXI.js";import"./index-C9jwf_CE.js";import"./theme-VhsxeChM.js";import"./OverlayTrigger.component-CMwhMkOs.js";import"./RootCloseWrapper-BQusrErX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BuQcakZm.js";import"./Transition-CCocwTET.js";import"./Transition-ByM5Uw3w.js";import"./ActionSplitDropdown.component-ZOAoKQYy.js";import"./SplitButton-q_TkxrQy.js";import"./inheritsLoose-CN7rSwcY.js";import"./DropdownButton-IyHy4vIQ.js";import"./ActionIconToggle.component-Dxy5Hf60.js";import"./Actions.component-IWaOR18-.js";import"./index-M-tf8MgB.js";import"./index-Dk8g1PGz.js";import"./FormControl-DtP9RUjC.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
