import{j as e}from"./iframe-Bd5zo36b.js";import{A as o}from"./ActionList.component-BIlLTO6-.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BJ8GaJ1G.js";import"./ActionButton.component-CnSIx69G.js";import"./TooltipTrigger.component-C04g7gSm.js";import"./index-CIa1Bgv9.js";import"./CircularProgress.component-CwK4U0_c.js";import"./constants-CZYEPhht.js";import"./translate-BCETk1iE.js";import"./withTranslation-C__rj8ub.js";import"./Skeleton.component-Cg6qw8BT.js";import"./index-DOv8VBhj.js";import"./theme-BxOwGWub.js";import"./OverlayTrigger.component-CG5kmKEc.js";import"./RootCloseWrapper-DL7Y3GY6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C45dndme.js";import"./Transition-xJGCWa94.js";import"./Transition-jW05QtyD.js";import"./ActionSplitDropdown.component-DpTRGuYF.js";import"./SplitButton-CeeJqKAF.js";import"./inheritsLoose-BY9v1g_H.js";import"./DropdownButton-CFkXQRJY.js";import"./ActionIconToggle.component-CdUXmUcM.js";import"./Actions.component-CpZQ1wjO.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
