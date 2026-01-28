import{j as e}from"./iframe-BrV_C0lS.js";import{A as o}from"./ActionList.component-euPscMv3.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Bd2ry1Cm.js";import"./ActionButton.component-CX64OOwE.js";import"./TooltipTrigger.component-xTn3JdoU.js";import"./index-CyLLb8ny.js";import"./CircularProgress.component-BGG8ERnA.js";import"./constants-CZYEPhht.js";import"./translate-DHfPBvmz.js";import"./withTranslation-B0EdGgI2.js";import"./Skeleton.component-NhDgtDmF.js";import"./index-D7vK3zVi.js";import"./theme-COWgiA41.js";import"./OverlayTrigger.component-BFqpcy8S.js";import"./RootCloseWrapper-Cplz5Qvz.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CWstWGjk.js";import"./Transition-C2lqVYsH.js";import"./Transition-DEWbpGS1.js";import"./ActionSplitDropdown.component-uVrYiVkr.js";import"./SplitButton-CEU47wFB.js";import"./inheritsLoose-Cwo6rj-Z.js";import"./get-D6yb22gy.js";import"./_baseGet-BarmkZqE.js";import"./toString-EHNBcK8R.js";import"./isSymbol-B-O5EbbU.js";import"./eq-CESIMbK6.js";import"./omit-DwXSrYJI.js";import"./_setToString-Dc5lN5s8.js";import"./_getTag-DKk3ktNN.js";import"./isArrayLike-Dz6u7zkv.js";import"./DropdownButton-BkqPs7DL.js";import"./ActionIconToggle.component-Tr4QZC5x.js";import"./Actions.component-CqTL0dCk.js";const l=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],w={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},t={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},s={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},c={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
