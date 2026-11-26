import{j as e}from"./iframe-D8rGMUc2.js";import{A as o}from"./ActionList.component-DNVqD4DP.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BhLex1i0.js";import"./ActionButton.component-B3UgTF_p.js";import"./TooltipTrigger.component-DbNnUOIn.js";import"./index-DScx9jqB.js";import"./CircularProgress.component-D7Nso3Xo.js";import"./constants-CZYEPhht.js";import"./translate-C92pClKy.js";import"./withTranslation-jeqB_SQ7.js";import"./Skeleton.component-DdZR1rJH.js";import"./index-CQWDvZab.js";import"./theme-Caislsnk.js";import"./OverlayTrigger.component-MwQMMmDp.js";import"./RootCloseWrapper-DLBBo_0U.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_PvIAbxn.js";import"./Transition-Biz4MT5V.js";import"./Transition-UyLmXOWD.js";import"./ActionSplitDropdown.component-D3e2FK7L.js";import"./SplitButton-kHPBzU3a.js";import"./inheritsLoose-BjgN-pvn.js";import"./DropdownButton-9Obg_T4E.js";import"./ActionIconToggle.component-CPo-HJ7c.js";import"./Actions.component-DAzPfLt5.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
