import{j as e}from"./iframe-2ufzqGgU.js";import{A as o}from"./ActionList.component-DBuR8saP.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-C03D_KEI.js";import"./ActionButton.component-CwypvZR9.js";import"./TooltipTrigger.component-BJsj5tvb.js";import"./index-CSKw7C4M.js";import"./CircularProgress.component-DzkV6M2Y.js";import"./constants-CZYEPhht.js";import"./translate-0yJbfsdh.js";import"./withTranslation-DoNzQl1-.js";import"./Skeleton.component-BPSXOHWw.js";import"./index-zz5sWUfT.js";import"./theme-BdUZ5v26.js";import"./OverlayTrigger.component-BDLl_LQp.js";import"./RootCloseWrapper-BqrPI3WZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cr9jbfne.js";import"./Transition-DSfwVrgn.js";import"./Transition-BKQqByaB.js";import"./ActionSplitDropdown.component-B399NJ3M.js";import"./SplitButton-C_J8f8Z7.js";import"./inheritsLoose-C5iVoILh.js";import"./DropdownButton-DQZBVSqQ.js";import"./ActionIconToggle.component-MwRVlC9d.js";import"./Actions.component-D29yjmqS.js";const n=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],q={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},t={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:n,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},s={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:n,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},c={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
                    }`}),e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:n,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",className:"custom-container-classname",itemClassName:"custom-item-classname"})})]})},l={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:[n[1]],onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'inline-table'
  }}>
            <ActionList id="context" actions={actions} onSelect={() => console.log('onItemSelect')} onToggleDock={() => console.log('onToggleDock')} tooltipPlacement="top" />
        </div>
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'inline-table'
  }}>
            <ActionList id="context" actions={actions} onSelect={() => console.log('onItemSelect')} onToggleDock={() => console.log('onToggleDock')} tooltipPlacement="top" reverse />
        </div>
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <p>You can add your custom classnames to the container and items</p>
            <pre>
                {\`
.custom-container-classname {
    border: 5px solid turquoise;
}

.custom-item-classname {
    background-color: pink;
}
                    \`}
            </pre>
            <pre>
                {\`
<ActionList
    className={'custom-container-classname'}
    itemClassName={'custom-item-classname'}
    {...otherProps}
/>
            \`}
            </pre>
            <style>
                {\`.custom-container-classname {
                        border: 5px solid turquoise;
                    }

                    .custom-item-classname {
                        background-color: pink;
                    }\`}
            </style>
            <div style={{
      display: 'inline-table'
    }}>
                <ActionList id="context" actions={actions} onSelect={() => console.log('onItemSelect')} onToggleDock={() => console.log('onToggleDock')} tooltipPlacement="top" className="custom-container-classname" itemClassName="custom-item-classname" />
            </div>
        </div>
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'inline-table'
  }}>
            <ActionList id="context" actions={[actions[1]]} onSelect={() => console.log('onItemSelect')} onToggleDock={() => console.log('onToggleDock')} tooltipPlacement="top" />
        </div>
}`,...l.parameters?.docs?.source}}};const E=["Default","Reverse","WithCustomClassNames","Single"];export{t as Default,s as Reverse,l as Single,c as WithCustomClassNames,E as __namedExportsOrder,q as default};
