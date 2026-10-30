import{j as e}from"./iframe-DJYEffib.js";import{A as o}from"./ActionList.component-B5nIQ4V9.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-fGagoSd3.js";import"./ActionButton.component-BZ0yx02_.js";import"./TooltipTrigger.component-VOLa544B.js";import"./index-X3o3kHxa.js";import"./CircularProgress.component-Dvu6wRl_.js";import"./constants-CZYEPhht.js";import"./translate-C3WnT0cL.js";import"./withTranslation-WEqoVkRJ.js";import"./Skeleton.component-AdyXfDG0.js";import"./index-DDAl8sMp.js";import"./theme-DZPhi_k-.js";import"./OverlayTrigger.component-CFiSQlyN.js";import"./RootCloseWrapper-DqfdVcrf.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BZnNYomZ.js";import"./Transition-Hsj8IfYK.js";import"./Transition-DIpJii31.js";import"./ActionSplitDropdown.component-C24rpyyj.js";import"./SplitButton-BQPAVl9z.js";import"./inheritsLoose-DjXesfAs.js";import"./DropdownButton-kVwpFO-B.js";import"./ActionIconToggle.component-Bc_8i6v_.js";import"./Actions.component-DBYxCYOK.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
