import{j as e}from"./iframe-DGR7KKzq.js";import{A as o}from"./ActionList.component-DURtFu4d.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-D4NE0-aM.js";import"./ActionButton.component-7xj2ElLP.js";import"./TooltipTrigger.component-DXOp_2kJ.js";import"./index-D_95NuQi.js";import"./CircularProgress.component-DZSyOt2Y.js";import"./constants-CZYEPhht.js";import"./translate-CQiX0a-O.js";import"./withTranslation-BLqWrDcY.js";import"./Skeleton.component-DgV84Nq7.js";import"./index-BZ6zDeKS.js";import"./theme-DfFBi3yV.js";import"./OverlayTrigger.component-DDGAPZSW.js";import"./RootCloseWrapper-vIZ5_CfW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DCLsZwUf.js";import"./Transition-DMMu0t9u.js";import"./Transition-BI9J2Ofw.js";import"./ActionSplitDropdown.component-BcSwnrhp.js";import"./SplitButton-CU9Src_v.js";import"./inheritsLoose-vXPXxnMK.js";import"./DropdownButton-0RxzBweM.js";import"./ActionIconToggle.component-Br6lGum9.js";import"./Actions.component-w6pkBgrV.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
.custom-container-classname {
    border: 5px solid turquoise;
}

.custom-item-classname {
    background-color: pink;
}
                    `}),e.jsx("pre",{children:`
<ActionList
    className={'custom-container-classname'}
    itemClassName={'custom-item-classname'}
    {...otherProps}
/>
            `}),e.jsx("style",{children:`.custom-container-classname {
                        border: 5px solid turquoise;
                    }

                    .custom-item-classname {
                        background-color: pink;
                    }`}),e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",className:"custom-container-classname",itemClassName:"custom-item-classname"})})]})},q={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:[t[1]],onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},E=["Default","Reverse","WithCustomClassNames","Single"];export{P as Default,R as Reverse,q as Single,L as WithCustomClassNames,E as __namedExportsOrder,I as default};
