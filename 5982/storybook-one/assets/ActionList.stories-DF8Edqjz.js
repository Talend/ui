import{j as e}from"./iframe-s27tzi0x.js";import{A as o}from"./ActionList.component-BJjzr0EC.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BdZxApL-.js";import"./ActionButton.component-os2pJyc1.js";import"./TooltipTrigger.component-CRn2nEqq.js";import"./index-BjGHdyXd.js";import"./CircularProgress.component-CYstce4G.js";import"./constants-CZYEPhht.js";import"./translate-DPmoT1TZ.js";import"./withTranslation-Ct1tJJ2D.js";import"./Skeleton.component-Cvt53ETX.js";import"./index-Bo4Rrteg.js";import"./theme-DUXEF90D.js";import"./OverlayTrigger.component-ey52J6dh.js";import"./RootCloseWrapper-CuYsp7uC.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-V5cSI2i0.js";import"./Transition-BOn_UV-N.js";import"./Transition-hVE-JuN3.js";import"./ActionSplitDropdown.component-DMKMK89G.js";import"./SplitButton-DS9iJ5kG.js";import"./inheritsLoose-BOUfzMz8.js";import"./DropdownButton-Cm_qbXp8.js";import"./ActionIconToggle.component-CXmIMGu9.js";import"./Actions.component-C0YoLNSa.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
