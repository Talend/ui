import{j as o}from"./iframe-DfdifOwL.js";import{A as l}from"./ActionBar.component-DNgnkjme.js";import{F as e}from"./FilterBar.component-8WiFabzF.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BR9S43mM.js";import"./ActionButton.component-UYOJvcYX.js";import"./TooltipTrigger.component-BJTpyXDt.js";import"./index-QfL4wXG6.js";import"./CircularProgress.component-OrLWawc-.js";import"./constants-CZYEPhht.js";import"./translate-CHxtV6I3.js";import"./withTranslation-DAWSAIvR.js";import"./Skeleton.component-D7SwgdCx.js";import"./index-CanZ0F1o.js";import"./theme-pB6coKgW.js";import"./OverlayTrigger.component-CS_vSBul.js";import"./RootCloseWrapper-BMMhQz6K.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpAJlHQX.js";import"./Transition-CSYT3GvG.js";import"./Transition-BVdSZFdr.js";import"./ActionSplitDropdown.component-GVbhWc-F.js";import"./SplitButton-BsAqQBPt.js";import"./inheritsLoose-CAyfXZxb.js";import"./get-DxznK-f3.js";import"./_baseGet-Cukhu6FA.js";import"./toString-Cgya6l1E.js";import"./isSymbol-ANBliHla.js";import"./eq-B-mHujBy.js";import"./omit-kelfQUT-.js";import"./_setToString-C6PbTfIV.js";import"./_getTag-D_AG95qx.js";import"./isArrayLike-D7EC_x23.js";import"./DropdownButton-BYW7Gel0.js";import"./ActionIconToggle.component-cEVyz_R_.js";import"./Actions.component-BsaIdXnV.js";import"./index-CKJuRNYr.js";import"./index-Cu2CbqNH.js";import"./FormControl-BAnTVIuv.js";const s={id:"FILTER-dockAndDockable",dockable:!0,docked:!1,navbar:!0,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"My placeholder",highlight:!1,tooltipPlacement:"bottom"},c={...s,iconAlwaysVisible:!0,dockable:!1},d={id:"FILTER-noDockAndNoDockable",dockable:!1,docked:!1,navbar:!1,onFilter:()=>console.log("onFilter"),onBlur:()=>console.log("onBlur"),onFocus:()=>console.log("onFocus"),onToggle:()=>console.log("onToggle"),placeholder:"Type your filter term",tooltipPlacement:"bottom",highlight:!1},p={...s,disabled:!0},a={width:"18.75rem"},Y={title:"Components/Form - Inline form/FilterBar",component:e,tags:["autodocs"]},r={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When not docked but dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...s})})]})},n={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"When icon always visible and not docked, no dockable in an ActionBar"}),o.jsx(l,{children:o.jsx(e,{...c})})]})},t={render:()=>o.jsxs("div",{children:[o.jsx("p",{children:"When not docked and no dockable take full width"}),o.jsx(e,{...d})]})},i={render:()=>o.jsxs("div",{style:a,children:[o.jsx("p",{children:"With the input filter disable"}),o.jsx(l,{children:o.jsx(e,{...p})})]})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
