import{j as e}from"./iframe-BuKiX4IK.js";import{A as o}from"./ActionList.component-BQumozN7.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-C5GCCKRL.js";import"./ActionButton.component-C1vr8Y1n.js";import"./TooltipTrigger.component-CQtzPp_8.js";import"./index-DK9M7ti7.js";import"./CircularProgress.component-RPBOZlpb.js";import"./constants-CZYEPhht.js";import"./translate-ySlj2Mv2.js";import"./withTranslation-nYY0s1IX.js";import"./Skeleton.component--J0q4Wyo.js";import"./index-5y5O7tNJ.js";import"./theme-vAnkOvFF.js";import"./OverlayTrigger.component-IjA0Q1jd.js";import"./RootCloseWrapper-CLFTZsgX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ouIYCvyh.js";import"./Transition-C8YpLGCH.js";import"./Transition-Dh5HIOdY.js";import"./ActionSplitDropdown.component-ChO9lgpr.js";import"./SplitButton-DKYy8dZc.js";import"./inheritsLoose-CzkFn0RC.js";import"./DropdownButton-P6-R2cRK.js";import"./ActionIconToggle.component-G69T2spP.js";import"./Actions.component-vh6QnLEb.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
