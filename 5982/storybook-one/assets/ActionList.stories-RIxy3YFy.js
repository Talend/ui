import{j as e}from"./iframe-nYr_8740.js";import{A as o}from"./ActionList.component-Bzb13viQ.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BYsQXxJc.js";import"./ActionButton.component-Cc3Gn8A_.js";import"./TooltipTrigger.component-GJk8Zh8s.js";import"./index-CK_Jnzmb.js";import"./CircularProgress.component-Be7xA7g2.js";import"./constants-CZYEPhht.js";import"./translate-c84yNBkX.js";import"./withTranslation-cld8GFd5.js";import"./Skeleton.component-Xf2kB3En.js";import"./index-CSzmImrc.js";import"./theme-D4jDnrQe.js";import"./OverlayTrigger.component-BJ3a6356.js";import"./RootCloseWrapper-gP65maj7.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CGDei521.js";import"./Transition-BjuHBLgn.js";import"./Transition-DHf7k2m-.js";import"./ActionSplitDropdown.component-DE-c-1ls.js";import"./SplitButton-TUKTgB1B.js";import"./inheritsLoose-BSaRjVuI.js";import"./DropdownButton-CC6EEF4u.js";import"./ActionIconToggle.component-DVLyVyhH.js";import"./Actions.component-DqeInclH.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
