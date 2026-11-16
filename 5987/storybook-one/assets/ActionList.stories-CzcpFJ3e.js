import{j as e}from"./iframe-w7ABEegS.js";import{A as o}from"./ActionList.component-BoPPvYuC.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-DpPD-aiG.js";import"./ActionButton.component-Ew1VW1Il.js";import"./TooltipTrigger.component-_OKXfbsQ.js";import"./index-D2FAw-Xr.js";import"./CircularProgress.component-D0bQQGAO.js";import"./constants-CZYEPhht.js";import"./translate-Bgl4ZoFp.js";import"./withTranslation-Dut4ONj2.js";import"./Skeleton.component-BMVNtyWO.js";import"./index-P1cL9dO1.js";import"./theme-BtxMSztn.js";import"./OverlayTrigger.component-CGCgPK3w.js";import"./RootCloseWrapper-Ds1-JX4g.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-g2cmfneb.js";import"./Transition-DdsHwWpm.js";import"./Transition-BzNEZj3C.js";import"./ActionSplitDropdown.component-Bk9lrT3S.js";import"./SplitButton-4j9brJxZ.js";import"./inheritsLoose-DtM7SK-P.js";import"./DropdownButton-BnYSDcwe.js";import"./ActionIconToggle.component-BA_VlZa5.js";import"./Actions.component-BtvVFtO1.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
