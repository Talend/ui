import{j as e}from"./iframe-DQUUjqOn.js";import{A as o}from"./ActionList.component-BO_vNwHv.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-xQV-QY_V.js";import"./ActionButton.component-CQrw5UAn.js";import"./TooltipTrigger.component-DRwbiiMo.js";import"./index-Bzid2zgy.js";import"./CircularProgress.component-C6QgnCJj.js";import"./constants-CZYEPhht.js";import"./translate-Dt26VBks.js";import"./withTranslation-dXS7V3mQ.js";import"./Skeleton.component-BaaIc_od.js";import"./index-BNyI1cJ1.js";import"./theme-DZFSANDX.js";import"./OverlayTrigger.component-B61gzQ1w.js";import"./RootCloseWrapper-BJQcx6Ol.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DOv9jmk8.js";import"./Transition-54PbgB1a.js";import"./Transition-DXlyPj7G.js";import"./ActionSplitDropdown.component-UujK7WGV.js";import"./SplitButton-3S4CWSZB.js";import"./inheritsLoose-BI0OXI22.js";import"./DropdownButton-B5KORYwN.js";import"./ActionIconToggle.component-uDx3-ny_.js";import"./Actions.component-Ch0oJ0rK.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
