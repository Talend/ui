import{j as e}from"./iframe-BWxcDItH.js";import{A as o}from"./ActionList.component-zTCq5VpW.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CCsZbhZH.js";import"./ActionButton.component-BnXw83sI.js";import"./TooltipTrigger.component-hy6D1VY3.js";import"./index-C5dXWh4z.js";import"./CircularProgress.component-DL8vzfF6.js";import"./constants-CZYEPhht.js";import"./translate-TJYfFd0Z.js";import"./withTranslation-DvnDk7sz.js";import"./Skeleton.component-CUtowJe2.js";import"./index-D5B0DGdL.js";import"./theme-COVBCymt.js";import"./OverlayTrigger.component-hw_AaSV7.js";import"./RootCloseWrapper-DuwSh-Lr.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B-ZgWWJ6.js";import"./Transition-OYKrEnIo.js";import"./Transition-BD9sT3WM.js";import"./ActionSplitDropdown.component-9dtp2OQ_.js";import"./SplitButton-CQfCYzxn.js";import"./inheritsLoose-ltB_vK-d.js";import"./DropdownButton-K5ZlKxTJ.js";import"./ActionIconToggle.component-B3EQV3XX.js";import"./Actions.component-CWoFpM2L.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
