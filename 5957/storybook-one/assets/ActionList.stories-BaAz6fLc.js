import{j as e}from"./iframe-B9yR_0qI.js";import{A as o}from"./ActionList.component-D9rAOg4V.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-rx0gr5wA.js";import"./ActionButton.component-k2Bc_Pju.js";import"./TooltipTrigger.component-BR8MEid9.js";import"./index-CeOMWKG3.js";import"./CircularProgress.component-Cp5izeTn.js";import"./constants-CZYEPhht.js";import"./translate-howCBIeH.js";import"./withTranslation-Cr0BmXDA.js";import"./Skeleton.component-B-Kuw4Cu.js";import"./index-oXLm8ett.js";import"./theme-BTonzxCP.js";import"./OverlayTrigger.component-CgjmusA7.js";import"./RootCloseWrapper-DX9Wwsm7.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BKCW99Nz.js";import"./Transition-pAKq_vqm.js";import"./Transition-FSK8QYMj.js";import"./ActionSplitDropdown.component-qZMPe3gQ.js";import"./SplitButton-B0jMGk1e.js";import"./inheritsLoose-BmZ9rgaC.js";import"./DropdownButton-1myulpZt.js";import"./ActionIconToggle.component-BbsIwcgY.js";import"./Actions.component-Dg9O8J3F.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
