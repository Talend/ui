import{j as e}from"./iframe-yuc_797P.js";import{A as o}from"./ActionList.component-DKbVXVgg.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CI6_O_JV.js";import"./ActionButton.component-DVjLN14F.js";import"./TooltipTrigger.component-D32scl68.js";import"./index-kHY4iLh9.js";import"./CircularProgress.component-CsC2dJYv.js";import"./constants-CZYEPhht.js";import"./translate-C-oWtKKf.js";import"./withTranslation-B_IjQewW.js";import"./Skeleton.component-BLM-60Bi.js";import"./index-Cdtpyq-d.js";import"./theme-CX1qDbKh.js";import"./OverlayTrigger.component-Cp05XPhZ.js";import"./RootCloseWrapper-BE97qGvI.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B3vSrIxE.js";import"./Transition-CGR8X_d9.js";import"./Transition-Lr_rH5UU.js";import"./ActionSplitDropdown.component-DjScHJ7P.js";import"./SplitButton-Cef0gFTj.js";import"./inheritsLoose-orHxz6P5.js";import"./DropdownButton-BR9luQAm.js";import"./ActionIconToggle.component-B0hWR8Y4.js";import"./Actions.component-afUp1w1C.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
