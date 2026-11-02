import{j as e}from"./iframe-D3Cirk23.js";import{A as o}from"./ActionList.component-BgAN4y1w.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Gosl5j_z.js";import"./ActionButton.component-pMa1U-FR.js";import"./TooltipTrigger.component-D4M5dfDR.js";import"./index-fZaegMMG.js";import"./CircularProgress.component-CLcLgtdJ.js";import"./constants-CZYEPhht.js";import"./translate-BNlb_Nb5.js";import"./withTranslation-BI_ZIuw4.js";import"./Skeleton.component-DYrGcq1S.js";import"./index-D5UQ7Y_B.js";import"./theme-B0tC3zMd.js";import"./OverlayTrigger.component-jweZHlGv.js";import"./RootCloseWrapper-BBVevm_Z.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DACpMobO.js";import"./Transition-D5IqSF6G.js";import"./Transition-BYMVvgE4.js";import"./ActionSplitDropdown.component-Ca97n-9A.js";import"./SplitButton-BrTY_UxA.js";import"./inheritsLoose-DeztS7sp.js";import"./DropdownButton-fgMXsXiU.js";import"./ActionIconToggle.component-DB_1C6xm.js";import"./Actions.component-ByaE8VaZ.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
