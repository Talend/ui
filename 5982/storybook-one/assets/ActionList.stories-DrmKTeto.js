import{j as e}from"./iframe-CIe7IlH7.js";import{A as o}from"./ActionList.component-BK6mSS8L.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BhPjfEnu.js";import"./ActionButton.component-nFLZLuKE.js";import"./TooltipTrigger.component-BmAr6Dpy.js";import"./index-DSiqNgIE.js";import"./CircularProgress.component-IcgbfgH_.js";import"./constants-CZYEPhht.js";import"./translate-BmStnUk6.js";import"./withTranslation-Chrf0r7H.js";import"./Skeleton.component-BkPrMZdC.js";import"./index-D3w3Pz8h.js";import"./theme-lp3gVr6V.js";import"./OverlayTrigger.component-zIsomRHN.js";import"./RootCloseWrapper-DQRIRnZb.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Ds0aeodl.js";import"./Transition-DLPd-1vw.js";import"./Transition-CYVD8Ezo.js";import"./ActionSplitDropdown.component-CvA-WQH4.js";import"./SplitButton-oIIlxMNO.js";import"./inheritsLoose-JU6lFqma.js";import"./DropdownButton-BdB63ovc.js";import"./ActionIconToggle.component-Cc05KCsN.js";import"./Actions.component-Ny5-OlUH.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
