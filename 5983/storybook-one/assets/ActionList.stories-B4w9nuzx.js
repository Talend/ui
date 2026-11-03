import{j as e}from"./iframe-CgxoJ_Os.js";import{A as o}from"./ActionList.component-CaUdSOlH.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BvFsRneE.js";import"./ActionButton.component-DTDlV5_e.js";import"./TooltipTrigger.component-Bj05s_rK.js";import"./index-VNAKgd4Z.js";import"./CircularProgress.component-7MbP1c-l.js";import"./constants-CZYEPhht.js";import"./translate-BkbGbMy7.js";import"./withTranslation-Di---dek.js";import"./Skeleton.component-RUpKAfF-.js";import"./index-D-AWf6A-.js";import"./theme--_Y8vkUB.js";import"./OverlayTrigger.component-B5bjenHu.js";import"./RootCloseWrapper-BSx0pvVf.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BpQzayJm.js";import"./Transition-BeVLWsH-.js";import"./Transition-BIBcPml0.js";import"./ActionSplitDropdown.component-Bg_wMRK0.js";import"./SplitButton-BiEZAWXW.js";import"./inheritsLoose-Db5SCXSI.js";import"./DropdownButton-xYf4SiED.js";import"./ActionIconToggle.component-klLXQczk.js";import"./Actions.component-DjRt1Zeg.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
