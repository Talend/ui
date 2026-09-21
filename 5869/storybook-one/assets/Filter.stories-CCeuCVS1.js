import{j as o}from"./iframe-BQ6GoR_5.js";import{A as l}from"./ActionBar.component-BdpaODRg.js";import{F as e}from"./FilterBar.component-B_dqDsvL.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-l344p9qu.js";import"./ActionButton.component-CPgdJaw-.js";import"./TooltipTrigger.component-BVXAPqdw.js";import"./index-DRb_0Z3K.js";import"./CircularProgress.component-BtPFZobs.js";import"./constants-CZYEPhht.js";import"./translate-DReBwGmt.js";import"./withTranslation-D7xvxPha.js";import"./Skeleton.component-DZqA_dzJ.js";import"./index-D7kuL6rg.js";import"./theme-DR8nny8b.js";import"./OverlayTrigger.component-YEmToyAK.js";import"./RootCloseWrapper-CciQVrFX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_LZOrNA7.js";import"./Transition-yWYMS89P.js";import"./Transition-Cf2GXXoK.js";import"./ActionSplitDropdown.component-CFwDdFxB.js";import"./SplitButton-BD1oC3cS.js";import"./inheritsLoose-4yQX7ab8.js";import"./DropdownButton-BpAwFV83.js";import"./ActionIconToggle.component-MFJTDnGB.js";import"./Actions.component-DThssFMG.js";import"./index-DTkF8FmZ.js";import"./index-BLDJZEwj.js";import"./FormControl-BiQXRZE-.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},O={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
