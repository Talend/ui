import{j as e}from"./iframe-CJUMQqVE.js";import{A as o}from"./ActionList.component-B-MTNMZW.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-DUytRqZZ.js";import"./ActionButton.component-O-F85n6d.js";import"./TooltipTrigger.component-Dv3fQiPe.js";import"./index-rQ-MVT7V.js";import"./CircularProgress.component-D1-ZdaRf.js";import"./constants-CZYEPhht.js";import"./translate-CLp3-OST.js";import"./withTranslation-DGiHO3ZI.js";import"./Skeleton.component-BcjYzvpm.js";import"./index-HK1aBBQZ.js";import"./theme-df46-61j.js";import"./OverlayTrigger.component-tbLSYEro.js";import"./RootCloseWrapper-9XF8KLQu.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DDQbZfVD.js";import"./Transition-GOLrJWDc.js";import"./Transition-CebGy9_z.js";import"./ActionSplitDropdown.component-CLv3AD9o.js";import"./SplitButton-BSOTD7yo.js";import"./inheritsLoose-BiHFGU-I.js";import"./DropdownButton-2GnyLBvI.js";import"./ActionIconToggle.component-BGNk8kUi.js";import"./Actions.component-BLBbQ9W9.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
