import{j as e}from"./iframe-CuNXteRk.js";import{A as o}from"./ActionList.component-fqdXaZJ4.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CkEUVOTc.js";import"./ActionButton.component-DZ_TkiZM.js";import"./TooltipTrigger.component-DTt9yTRg.js";import"./index-B59HUntW.js";import"./CircularProgress.component-D6ChXFTT.js";import"./constants-CZYEPhht.js";import"./translate-DsZXE6b5.js";import"./withTranslation-iNSwDiMk.js";import"./Skeleton.component-CP8FAtlq.js";import"./index-Bl5remmT.js";import"./theme-B0iRzlk5.js";import"./OverlayTrigger.component-DtmP2bXk.js";import"./RootCloseWrapper-CaF_2Cen.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D3FJ0OSo.js";import"./Transition-o_SUuwAx.js";import"./Transition-CLubs97W.js";import"./ActionSplitDropdown.component-vxkYRRTc.js";import"./SplitButton-C7t24MSg.js";import"./inheritsLoose-DrWawei-.js";import"./DropdownButton-58VZEazq.js";import"./ActionIconToggle.component-fCQhh54D.js";import"./Actions.component-Bu6aPXvL.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
