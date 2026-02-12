import{j as o}from"./iframe-CfWawTfz.js";import{A as l}from"./ActionBar.component-zAHgtQKo.js";import{F as e}from"./FilterBar.component-CuzbcWk3.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CvQB7n2g.js";import"./ActionButton.component-CQ7IfqeE.js";import"./TooltipTrigger.component-C_mlG1Ec.js";import"./index-bf582Dru.js";import"./CircularProgress.component-Bl-gboGZ.js";import"./constants-CZYEPhht.js";import"./translate-_-Ynof8F.js";import"./withTranslation-LpUUPLYn.js";import"./Skeleton.component-D787FrVL.js";import"./index-Da2WDrD7.js";import"./theme-DZnXLXFI.js";import"./OverlayTrigger.component-7d0O78sW.js";import"./RootCloseWrapper-BvF8jVFh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CFjNdl8c.js";import"./Transition-CO_Dd883.js";import"./Transition-DqY3BSxz.js";import"./ActionSplitDropdown.component-DmzuBYmN.js";import"./SplitButton-tTvU2YaZ.js";import"./inheritsLoose-DczegdGe.js";import"./get-Boxz4RUy.js";import"./_baseGet-Bg4bRzyO.js";import"./toString-CZ1StVC9.js";import"./isSymbol-B_IhllLH.js";import"./eq-CeyCSzlA.js";import"./omit-CDk5agw1.js";import"./_baseSlice-DoFQb18h.js";import"./_getTag-C-E0KhKX.js";import"./isArrayLike-xbYlSaqA.js";import"./DropdownButton-2hY-uqx4.js";import"./ActionIconToggle.component-LHDY8e6M.js";import"./Actions.component-D_CjFFo9.js";import"./index-fbFDAKs5.js";import"./index-Br7yK_xg.js";import"./FormControl-DPbSeyfv.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},Y={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
