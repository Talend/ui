import{j as o}from"./iframe-DMYygnnc.js";import{A as l}from"./ActionBar.component-C00ZcSl2.js";import{F as e}from"./FilterBar.component-BTOvTpOb.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BYVcB2HU.js";import"./ActionButton.component-Dfh5U0ff.js";import"./TooltipTrigger.component-BlZkglGh.js";import"./index-gr0DNHBK.js";import"./CircularProgress.component-BsrCMjdW.js";import"./constants-CZYEPhht.js";import"./translate-BXBoSd0f.js";import"./withTranslation-CyucCgxt.js";import"./Skeleton.component-CMzkALFe.js";import"./index-DYiAIfAw.js";import"./theme-DkSTE3P1.js";import"./OverlayTrigger.component-43A9_uft.js";import"./RootCloseWrapper-BrrbSwFu.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CXD522Ua.js";import"./Transition-B7FF88VB.js";import"./Transition-Cv-VN0tb.js";import"./ActionSplitDropdown.component-BhC6vjzE.js";import"./SplitButton-JluruZ2w.js";import"./inheritsLoose-rE0GIGrX.js";import"./DropdownButton-1V4YTh6d.js";import"./ActionIconToggle.component-BKBlgTuM.js";import"./Actions.component-DEuWAkIT.js";import"./index-ifmf6sur.js";import"./index-C5AW5qOW.js";import"./FormControl-Dppj9N57.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
