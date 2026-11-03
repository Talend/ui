import{j as e}from"./iframe-DMq_Bl1l.js";import{A as o}from"./ActionList.component-B5qbhNCY.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-C2LZ1aO_.js";import"./ActionButton.component-DRgRBK1R.js";import"./TooltipTrigger.component-X90YMzAS.js";import"./index-BC6XATVW.js";import"./CircularProgress.component-CPUqw1Yf.js";import"./constants-CZYEPhht.js";import"./translate-CsqPqVnG.js";import"./withTranslation-CyCcloq2.js";import"./Skeleton.component-Ci3rPfS4.js";import"./index-BKx0TSQl.js";import"./theme-UqqTBbL7.js";import"./OverlayTrigger.component-BsaGM-zO.js";import"./RootCloseWrapper-DUTlypnE.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C6eCey9U.js";import"./Transition-DXZIzh5E.js";import"./Transition-CISGZ89M.js";import"./ActionSplitDropdown.component-DkZWs833.js";import"./SplitButton-C8i-06PJ.js";import"./inheritsLoose-CEjWN797.js";import"./DropdownButton-8TXAcJnp.js";import"./ActionIconToggle.component-DcJ_9mte.js";import"./Actions.component-WkEErxMY.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
