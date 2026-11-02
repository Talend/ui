import{j as e}from"./iframe-W0rONCVa.js";import{A as o}from"./ActionList.component-DqEG524M.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-BXM03J4A.js";import"./ActionButton.component-Cm2kwZud.js";import"./TooltipTrigger.component-3Jq2n78f.js";import"./index-BawCQIpj.js";import"./CircularProgress.component-CAm4a_yh.js";import"./constants-CZYEPhht.js";import"./translate-N1YIQosn.js";import"./withTranslation-DKZ5hvgV.js";import"./Skeleton.component-BgtHRmBd.js";import"./index-CZ8gsRWy.js";import"./theme-CrMgGob7.js";import"./OverlayTrigger.component-DVCLiNI9.js";import"./RootCloseWrapper-D40rM1PE.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BugqAaVJ.js";import"./Transition-FHcpkw3l.js";import"./Transition-DRGGMVug.js";import"./ActionSplitDropdown.component-Du1zKej2.js";import"./SplitButton-wzD6v7uw.js";import"./inheritsLoose-CueqUH3-.js";import"./DropdownButton-CACc3dBM.js";import"./ActionIconToggle.component-CcD3rqiQ.js";import"./Actions.component-D9h2pvF5.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
