import{j as e}from"./iframe-DE-oTz_S.js";import{A as o}from"./ActionList.component-DahO7Mjr.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CIJNUnd7.js";import"./ActionButton.component-BLKKOcIX.js";import"./TooltipTrigger.component-DBiQ79Vk.js";import"./index-CrFewMmc.js";import"./CircularProgress.component-CTO4mZSZ.js";import"./constants-CZYEPhht.js";import"./translate-Cs9qcU4X.js";import"./withTranslation-BlguUKxY.js";import"./Skeleton.component-Bz3c5uir.js";import"./index-5pu4O4Qr.js";import"./theme-CTShgFir.js";import"./OverlayTrigger.component-DOOWjaoQ.js";import"./RootCloseWrapper-BAnSU4yK.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cj3HRPpO.js";import"./Transition-C4cTUftm.js";import"./Transition-BOIMUPP0.js";import"./ActionSplitDropdown.component-Bu5yp9K2.js";import"./SplitButton-BOAdiPNQ.js";import"./inheritsLoose-Cj7NC8Je.js";import"./DropdownButton-TJ2fpQD1.js";import"./ActionIconToggle.component-Dk7ietN-.js";import"./Actions.component-D0TqbKPa.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
