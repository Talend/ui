import{j as o}from"./iframe-cBtRg4Zm.js";import{A as l}from"./ActionBar.component-4HGffKkP.js";import{F as e}from"./FilterBar.component-Cq7DmiGj.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-DbfWXAi7.js";import"./ActionButton.component-BbFZmfp2.js";import"./TooltipTrigger.component-BEpC4Cbd.js";import"./index-_4Lt4aG8.js";import"./CircularProgress.component-CJXktRGh.js";import"./constants-CZYEPhht.js";import"./translate-am4PfflD.js";import"./withTranslation-BL7gA-bp.js";import"./Skeleton.component-Dkla9Zfi.js";import"./index-CopqRmGV.js";import"./theme-IDDytecF.js";import"./OverlayTrigger.component-CafacX6_.js";import"./RootCloseWrapper-B9V3vXXh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-RafO5SjG.js";import"./Transition-D7Ms2Ah2.js";import"./Transition-QmhJMkIM.js";import"./ActionSplitDropdown.component-C5oizYOJ.js";import"./SplitButton-Bri9k3Vu.js";import"./inheritsLoose-CFk7qFMH.js";import"./get-DpZIkRWq.js";import"./_baseGet-bDt8gzSb.js";import"./toString-Dopjm_6L.js";import"./isSymbol-hEzy1n5Y.js";import"./eq-DmJpQRp3.js";import"./omit-DZjDjx7f.js";import"./_baseSlice-BFLcj3sE.js";import"./_getTag-D1YAmZF8.js";import"./isArrayLike-XKLyq0p9.js";import"./DropdownButton-DJxVuDn4.js";import"./ActionIconToggle.component-DocL8DWD.js";import"./Actions.component-CDUYopll.js";import"./index-vqKS4t1F.js";import"./index-BOm_B24O.js";import"./FormControl-CNIXxuXk.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},Y={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
