import{j as e}from"./iframe-CRi1dZJp.js";import{A as o}from"./ActionList.component-Cv2HsYIU.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CjJYH70i.js";import"./ActionButton.component-BdGRIK1X.js";import"./TooltipTrigger.component-eAE2Wua_.js";import"./index-BQ0U4Y5q.js";import"./CircularProgress.component-iDKezPd8.js";import"./constants-CZYEPhht.js";import"./translate-OC8pClKt.js";import"./withTranslation-DDwxSJju.js";import"./Skeleton.component-Cbx_usXO.js";import"./index-DEijJkfW.js";import"./theme-BI34Yh8E.js";import"./OverlayTrigger.component-wMejClrf.js";import"./RootCloseWrapper-KZFsBTv2.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DFIXEub5.js";import"./Transition-B6HK187S.js";import"./Transition-DJMJ4WD6.js";import"./ActionSplitDropdown.component-Dk35ZPZE.js";import"./SplitButton-BV80XnZh.js";import"./inheritsLoose-DD1FT3hZ.js";import"./DropdownButton-BqhEShqj.js";import"./ActionIconToggle.component-6ElijWcZ.js";import"./Actions.component-DbUVv2bM.js";const t=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],I={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},P={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},R={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:t,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},L={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
