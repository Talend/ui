import{j as e}from"./iframe-mE13i2Hv.js";import{A as o}from"./ActionList.component-CvTf_zn7.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CKeQRQjC.js";import"./ActionButton.component-Dtxnl7sX.js";import"./TooltipTrigger.component-7tMkFbFy.js";import"./index-DFRcqnbK.js";import"./CircularProgress.component-YlHQIxw9.js";import"./constants-CZYEPhht.js";import"./translate-D2zrxYm7.js";import"./withTranslation-CGo-AqNr.js";import"./Skeleton.component-LQZzGxUz.js";import"./index-Dl9HuHjC.js";import"./theme-zysUzRYq.js";import"./OverlayTrigger.component-PzIEWuF7.js";import"./RootCloseWrapper-C7qK_rkn.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DkPC39i7.js";import"./Transition-DcfuVLlK.js";import"./Transition-iQPKgsry.js";import"./ActionSplitDropdown.component-DTBO18ol.js";import"./SplitButton-DrjiUIGo.js";import"./inheritsLoose-D3tiarUm.js";import"./DropdownButton-BOXDT9YF.js";import"./ActionIconToggle.component-Cqg_TO8H.js";import"./Actions.component-BL8LgOvq.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
