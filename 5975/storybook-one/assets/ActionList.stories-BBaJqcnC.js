import{j as e}from"./iframe-Ds3hCLTn.js";import{A as o}from"./ActionList.component-D-1lOegM.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CkJe-_60.js";import"./ActionButton.component-D9OdmrIf.js";import"./TooltipTrigger.component-H0hipEZc.js";import"./index-CbcAwb2F.js";import"./CircularProgress.component-BtJamAoh.js";import"./constants-CZYEPhht.js";import"./translate-BJuteC9w.js";import"./withTranslation-DQp43kfh.js";import"./Skeleton.component-CVLEPX7s.js";import"./index-B1HYGSRJ.js";import"./theme-DoHlK8QQ.js";import"./OverlayTrigger.component-CsMJDkXJ.js";import"./RootCloseWrapper-CaX1MPGl.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DpbU_PXR.js";import"./Transition-CtTY9APu.js";import"./Transition-BD4cgNrZ.js";import"./ActionSplitDropdown.component-ChfrhtMu.js";import"./SplitButton-DPlupF0w.js";import"./inheritsLoose-DAG2gAuJ.js";import"./DropdownButton-CsEiI3e0.js";import"./ActionIconToggle.component-yi6eoWgv.js";import"./Actions.component-BzDtetoJ.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
