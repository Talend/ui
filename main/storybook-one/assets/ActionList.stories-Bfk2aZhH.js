import{j as e}from"./iframe-Dz_qA_Fa.js";import{A as o}from"./ActionList.component-BUXM_iUF.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-Ch672Rmw.js";import"./ActionButton.component-DCYG8N9B.js";import"./TooltipTrigger.component-_c0QPveT.js";import"./index-BGgNcAF3.js";import"./CircularProgress.component-yPmQuuJb.js";import"./constants-CZYEPhht.js";import"./translate-DdOJE879.js";import"./withTranslation-CG5lIvpL.js";import"./Skeleton.component-C83rHjC1.js";import"./index-BbvlCrSE.js";import"./theme-B5Br_zxa.js";import"./OverlayTrigger.component-Br6J8Vkf.js";import"./RootCloseWrapper-C1JMhpOp.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-WxKj_jxf.js";import"./Transition-BZcqI1EY.js";import"./Transition-D-MPy9FH.js";import"./ActionSplitDropdown.component-B-KMBCxf.js";import"./SplitButton-D3gG5gVf.js";import"./inheritsLoose-Bun7ixcr.js";import"./get-Bs9aIrca.js";import"./_baseGet-CJVZLrYF.js";import"./toString-BNLGOlej.js";import"./isSymbol-DTXI2GwG.js";import"./eq-J5bas50k.js";import"./omit-Cc8OFDRb.js";import"./_setToString-CxIpm-1K.js";import"./_getTag-C4Wku8tT.js";import"./isArrayLike-CN1V8Fp6.js";import"./DropdownButton-BwFRaPg5.js";import"./ActionIconToggle.component-7Ltchg3h.js";import"./Actions.component-BtioUtDE.js";const l=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],w={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},t={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},s={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},c={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
