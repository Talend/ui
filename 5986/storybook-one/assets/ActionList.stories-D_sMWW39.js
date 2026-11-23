import{j as e}from"./iframe-7ahm8p6t.js";import{A as o}from"./ActionList.component-CK5NxJrX.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BHo5Wp0z.js";import"./ActionButton.component-DOZQ3Miv.js";import"./TooltipTrigger.component-Din5dMnt.js";import"./index-D2Mrcsdc.js";import"./CircularProgress.component-BlrNhl_X.js";import"./constants-CZYEPhht.js";import"./translate-DmEh3mYN.js";import"./withTranslation-BCTySQfn.js";import"./Skeleton.component-DccGvBOX.js";import"./index-BBjYuCO-.js";import"./theme-BeKEOmhn.js";import"./OverlayTrigger.component-BmoFuSDB.js";import"./RootCloseWrapper-Cau7aB1q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DLLhT-Ai.js";import"./Transition-Cl8jGbyC.js";import"./Transition-C888kG8y.js";import"./ActionSplitDropdown.component-CKJeIzYX.js";import"./SplitButton-Dd4T1ssj.js";import"./inheritsLoose-C1x9mAsQ.js";import"./DropdownButton-DceMTrXv.js";import"./ActionIconToggle.component-CTUVF4kG.js";import"./Actions.component-Cezlq1Bu.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
