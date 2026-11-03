import{j as e}from"./iframe-BglYK56O.js";import{A as o}from"./ActionList.component-tigF9z1p.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BsMHV2GF.js";import"./ActionButton.component-C70x_04_.js";import"./TooltipTrigger.component-D7STm9Bc.js";import"./index-kR_1UKoM.js";import"./CircularProgress.component-E1mCbzfz.js";import"./constants-CZYEPhht.js";import"./translate-Bsg6Iyz2.js";import"./withTranslation-BbKIRkKt.js";import"./Skeleton.component-CHoOFMfr.js";import"./index-i9SkNYUd.js";import"./theme-CEtf6r-x.js";import"./OverlayTrigger.component-DQ_oka0J.js";import"./RootCloseWrapper-DeAagyxI.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-s5S0HdHk.js";import"./Transition-CvuALjp-.js";import"./Transition-Oq6VJvc9.js";import"./ActionSplitDropdown.component-DoMXrwtX.js";import"./SplitButton-o7vMCjyj.js";import"./inheritsLoose-DfNQruAO.js";import"./DropdownButton-C7z2tqG_.js";import"./ActionIconToggle.component-CVPuCJuT.js";import"./Actions.component-B-vs8eBm.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
