import{j as e}from"./iframe-C-K0RwhG.js";import{A as o}from"./ActionList.component-CXaAokMd.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Dq3UVLjL.js";import"./ActionButton.component-DQYwR2c5.js";import"./TooltipTrigger.component-M2e_Paf3.js";import"./index-DSgcqnpD.js";import"./CircularProgress.component-BZ0uvlH6.js";import"./constants-CZYEPhht.js";import"./translate-TGutkCdD.js";import"./withTranslation-znuAFlzj.js";import"./Skeleton.component-B6-6N1bK.js";import"./index-aPx_Jw-b.js";import"./theme-C3EL_Fc0.js";import"./OverlayTrigger.component-CxII7CUD.js";import"./RootCloseWrapper-Bm6ywThT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BZ0lhdMc.js";import"./Transition-DuiBrOhL.js";import"./Transition-BmNwbG8C.js";import"./ActionSplitDropdown.component-DvoKqwMJ.js";import"./SplitButton--8yajAQk.js";import"./inheritsLoose-DPClRSjl.js";import"./DropdownButton-1L-dVpkb.js";import"./ActionIconToggle.component-CHp2-2Sw.js";import"./Actions.component-CzzC3XGw.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
