import{j as e}from"./iframe-BSUAZMZx.js";import{A as o}from"./ActionList.component-DWF9IS2E.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CI6NQLfJ.js";import"./ActionButton.component-Cid1q1TZ.js";import"./TooltipTrigger.component-DpP-o30M.js";import"./index-BXHNPF-R.js";import"./CircularProgress.component-DKIlgMuc.js";import"./constants-CZYEPhht.js";import"./translate-3uBlyxXt.js";import"./withTranslation-Coj3DM61.js";import"./Skeleton.component-2YQGdEoM.js";import"./index-DixMoDXm.js";import"./theme-Bht0MkCJ.js";import"./OverlayTrigger.component-B2r6V37F.js";import"./RootCloseWrapper-CXcoJaGe.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DOT0T7Pe.js";import"./Transition-MxPrZxuW.js";import"./Transition-COHjB9AT.js";import"./ActionSplitDropdown.component-6SbVkLB1.js";import"./SplitButton-IW_oOigG.js";import"./inheritsLoose-CddMAWck.js";import"./DropdownButton-DJA2hWEg.js";import"./ActionIconToggle.component-B_Rk5WjY.js";import"./Actions.component-CSsNKvWz.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
