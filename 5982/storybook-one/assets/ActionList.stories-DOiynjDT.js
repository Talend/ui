import{j as e}from"./iframe-CFTvtEsz.js";import{A as o}from"./ActionList.component-ChgA2s41.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BouwcN0H.js";import"./ActionButton.component-Bsr31zXB.js";import"./TooltipTrigger.component-BnGHfwzc.js";import"./index-nI918P2o.js";import"./CircularProgress.component-DgdrlEA2.js";import"./constants-CZYEPhht.js";import"./translate-tMlflK_Z.js";import"./withTranslation-awndhEMW.js";import"./Skeleton.component-BOt7hsGe.js";import"./index-CMGayb7Q.js";import"./theme-C8h5OfGu.js";import"./OverlayTrigger.component-CgajNKSS.js";import"./RootCloseWrapper-xFeMKCbw.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DoMK6SdO.js";import"./Transition-Dq9EIbD7.js";import"./Transition-Cl2PIggM.js";import"./ActionSplitDropdown.component-B6tKToSc.js";import"./SplitButton-CdEWQ61m.js";import"./inheritsLoose-WZXy_04p.js";import"./DropdownButton-BBn9LU3t.js";import"./ActionIconToggle.component-wa3YtYjg.js";import"./Actions.component-D2jGKCnq.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
