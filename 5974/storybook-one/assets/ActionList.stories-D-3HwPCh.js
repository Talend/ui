import{j as e}from"./iframe-DxnY8sNQ.js";import{A as o}from"./ActionList.component-pLWfWHTH.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-lStfvPxb.js";import"./ActionButton.component-BqYp-Ydu.js";import"./TooltipTrigger.component-lWqyK0a1.js";import"./index-KxDMqT99.js";import"./CircularProgress.component-DfLOd4k1.js";import"./constants-CZYEPhht.js";import"./translate-CjRz8oOF.js";import"./withTranslation-CxkG22SM.js";import"./Skeleton.component-B-YVeZuB.js";import"./index-C_f_KheF.js";import"./theme-DwqJb9G2.js";import"./OverlayTrigger.component-mBSr94kj.js";import"./RootCloseWrapper-Dd3P5B0A.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bxu2XJ7c.js";import"./Transition-51CPxuJS.js";import"./Transition-TfvvhROn.js";import"./ActionSplitDropdown.component-COnSFctR.js";import"./SplitButton-BDNaLTJp.js";import"./inheritsLoose-DdyzV2TU.js";import"./DropdownButton-ndj_uPHi.js";import"./ActionIconToggle.component-DwGmjF9t.js";import"./Actions.component-Bi2nwWRi.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
