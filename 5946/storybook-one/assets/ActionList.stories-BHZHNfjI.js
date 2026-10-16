import{j as e}from"./iframe-BerNaxgU.js";import{A as o}from"./ActionList.component-CuZfHxIJ.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-zrduZfUO.js";import"./ActionButton.component-R2TUB22b.js";import"./TooltipTrigger.component-DvpYr3KQ.js";import"./index-CD2KfldG.js";import"./CircularProgress.component-D4ofyL0v.js";import"./constants-CZYEPhht.js";import"./translate-Dq00O8Vv.js";import"./withTranslation-CXHZ0VOS.js";import"./Skeleton.component-DTyYnRsu.js";import"./index-m-F-0dMv.js";import"./theme-Bnv4UNKB.js";import"./OverlayTrigger.component-DlWUcpt7.js";import"./RootCloseWrapper-Bv5CGEcR.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DyLz4JgQ.js";import"./Transition-hmdj6ryG.js";import"./Transition-CJU6fAxM.js";import"./ActionSplitDropdown.component-B3poLXtp.js";import"./SplitButton-CyLwnWWb.js";import"./inheritsLoose-Cu-LYvCq.js";import"./DropdownButton-B-hzwcyi.js";import"./ActionIconToggle.component-B173tGny.js";import"./Actions.component-D-XkqwvM.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
