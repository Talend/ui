import{j as e}from"./iframe-DW8HScoe.js";import{A as o}from"./ActionList.component-CuHU2ebz.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CjP9h_i4.js";import"./ActionButton.component-DJkonU_b.js";import"./TooltipTrigger.component-GVBQb2Pn.js";import"./index-Bp7fJcDJ.js";import"./CircularProgress.component-C2OjHQoR.js";import"./constants-CZYEPhht.js";import"./translate-C0ztS9eR.js";import"./withTranslation-BJYWsTn3.js";import"./Skeleton.component-Ba5bgRAc.js";import"./index-sYRnW9Q4.js";import"./theme-DFZazDBT.js";import"./OverlayTrigger.component-DmBTTarN.js";import"./RootCloseWrapper-BBM9wQX-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BGhsU5z2.js";import"./Transition-De64zT5N.js";import"./Transition-CGHANmlN.js";import"./ActionSplitDropdown.component-DRvogCYb.js";import"./SplitButton-BEDl93J_.js";import"./inheritsLoose-CVC9ROMS.js";import"./DropdownButton-Dl5WPa7L.js";import"./ActionIconToggle.component-2M0N1QKY.js";import"./Actions.component-DUPsnszw.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
