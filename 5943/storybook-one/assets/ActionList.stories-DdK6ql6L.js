import{j as e}from"./iframe-C9K-2HoY.js";import{A as o}from"./ActionList.component-BsfbY7GE.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Dl-uJ9uz.js";import"./ActionButton.component-CZ6yOhJ1.js";import"./TooltipTrigger.component-_Pa565OB.js";import"./index-qxz3XUiW.js";import"./CircularProgress.component-CHl_2sZr.js";import"./constants-CZYEPhht.js";import"./translate-Dj8pdZnj.js";import"./withTranslation-BCbAzUH7.js";import"./Skeleton.component-C9iD8A_D.js";import"./index-1SaT7Tr4.js";import"./theme-rMl34uIJ.js";import"./OverlayTrigger.component-CeusCpjv.js";import"./RootCloseWrapper-xbihl913.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bykvm7ik.js";import"./Transition-BJAprmQG.js";import"./Transition-D5GckmWv.js";import"./ActionSplitDropdown.component-DhUHQ1d1.js";import"./SplitButton-Bcq3UouT.js";import"./inheritsLoose-CHGXYGub.js";import"./DropdownButton-CZQnmvpY.js";import"./ActionIconToggle.component-9LfZx1J-.js";import"./Actions.component-CPk0QYXZ.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
