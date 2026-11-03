import{j as e}from"./iframe-CnDzOXmp.js";import{A as o}from"./ActionList.component-CgmcJUCr.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-iTEjhAHV.js";import"./ActionButton.component-DmCtUwip.js";import"./TooltipTrigger.component-_KuF62S_.js";import"./index-B_e3EdL4.js";import"./CircularProgress.component-BJGGC9XG.js";import"./constants-CZYEPhht.js";import"./translate-DhJ6yiS8.js";import"./withTranslation-hDJ__1ti.js";import"./Skeleton.component-DgzOOPnt.js";import"./index-DUHEnfvu.js";import"./theme-Cp79Y8_3.js";import"./OverlayTrigger.component-C6EjVDuW.js";import"./RootCloseWrapper-B6VLJQVV.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DGgOzWJy.js";import"./Transition-Dza7tpgi.js";import"./Transition-CcQt0e6l.js";import"./ActionSplitDropdown.component-BPYpeiND.js";import"./SplitButton-C632gbj6.js";import"./inheritsLoose-CeDhcOfY.js";import"./DropdownButton-W21lpCkD.js";import"./ActionIconToggle.component-D3wtsE3a.js";import"./Actions.component-DgcfrmGx.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
