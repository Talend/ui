import{j as e}from"./iframe-2jEul6cN.js";import{A as o}from"./ActionList.component-BLsrVnJy.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-H0u7bBE3.js";import"./ActionButton.component-CBhy_tda.js";import"./TooltipTrigger.component-B4q4h8-f.js";import"./index-CsN6i3hs.js";import"./CircularProgress.component-IvjieZKY.js";import"./constants-CZYEPhht.js";import"./translate-Bom2eGHJ.js";import"./withTranslation-BcoQNoIx.js";import"./Skeleton.component-p37_FRoF.js";import"./index-DI6cVblI.js";import"./theme-DLQANqNv.js";import"./OverlayTrigger.component-znnCP3tf.js";import"./RootCloseWrapper-D8jI-JSv.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-uS4EWoO4.js";import"./Transition-Dy6Cf8zw.js";import"./Transition-B6H_5MHZ.js";import"./ActionSplitDropdown.component-B-dUiF9a.js";import"./SplitButton-DgAA-P4e.js";import"./inheritsLoose-D6BXuhFM.js";import"./DropdownButton-P9Vnv4ks.js";import"./ActionIconToggle.component-CxxFBBMn.js";import"./Actions.component-BzLpB2lH.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
