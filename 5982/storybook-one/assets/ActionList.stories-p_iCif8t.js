import{j as e}from"./iframe-DQCOpW1X.js";import{A as o}from"./ActionList.component-D_1i6kF4.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CfY8-F17.js";import"./ActionButton.component-DARLZ97L.js";import"./TooltipTrigger.component-MtAi4Ysg.js";import"./index-D_I0RGs4.js";import"./CircularProgress.component-iXDLk5tU.js";import"./constants-CZYEPhht.js";import"./translate-Cvd9mZ0C.js";import"./withTranslation-Bx8VfNTs.js";import"./Skeleton.component-cVknafUF.js";import"./index-D1p6DCpH.js";import"./theme-D66MgE1m.js";import"./OverlayTrigger.component-Ko4ru3dD.js";import"./RootCloseWrapper-BdXon44D.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Z7Sjs5SF.js";import"./Transition-1M-Ln82e.js";import"./Transition-CdJA3wI9.js";import"./ActionSplitDropdown.component-Cfl06DFJ.js";import"./SplitButton-Cqu1daYh.js";import"./inheritsLoose-aldoTGS2.js";import"./DropdownButton-De6098HL.js";import"./ActionIconToggle.component-CFOpl8a4.js";import"./Actions.component-DxILDr2t.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
