import{j as e}from"./iframe-Bl7tTCpu.js";import{A as o}from"./ActionList.component-BupfztEZ.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-CHtqNjwc.js";import"./ActionButton.component-Dn22dGR0.js";import"./TooltipTrigger.component-_1_3taz4.js";import"./index-CK21R32n.js";import"./CircularProgress.component-DfVIk94t.js";import"./constants-CZYEPhht.js";import"./translate-SSGdWeYe.js";import"./withTranslation-Cg70oZeD.js";import"./Skeleton.component-ksJXp5VB.js";import"./index-ClSbUYTE.js";import"./theme-CY0lAqA7.js";import"./OverlayTrigger.component-DDFdmF3z.js";import"./RootCloseWrapper-Cti4e6c-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CZbUNA5w.js";import"./Transition-BIKS9pJ4.js";import"./Transition-Bf7nV51V.js";import"./ActionSplitDropdown.component-BNFKN-87.js";import"./SplitButton-FcKZr7LO.js";import"./inheritsLoose-D8nHgM7Z.js";import"./get-CkvdNgkq.js";import"./_baseGet-BTf-ABXs.js";import"./toString-BDRN21-n.js";import"./isSymbol-BQNBFodK.js";import"./eq-BYqYf7pb.js";import"./omit-CGGb0KYE.js";import"./_setToString-DGV72ImX.js";import"./_getTag-mUiNMJM-.js";import"./isArrayLike-DfNKs8fL.js";import"./DropdownButton-Db2vzRHG.js";import"./ActionIconToggle.component-bspWPRew.js";import"./Actions.component-B2DMDtjC.js";const l=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],w={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},t={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},s={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},c={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
                    }`}),e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",className:"custom-container-classname",itemClassName:"custom-item-classname"})})]})},i={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:[l[1]],onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'inline-table'
  }}>
            <ActionList id="context" actions={[actions[1]]} onSelect={() => console.log('onItemSelect')} onToggleDock={() => console.log('onToggleDock')} tooltipPlacement="top" />
        </div>
}`,...i.parameters?.docs?.source}}};const z=["Default","Reverse","WithCustomClassNames","Single"];export{t as Default,s as Reverse,i as Single,c as WithCustomClassNames,z as __namedExportsOrder,w as default};
