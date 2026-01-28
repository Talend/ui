import{j as e}from"./iframe-BIQdka0S.js";import{A as o}from"./ActionList.component-BcCFDJas.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.component-DlN2FB-s.js";import"./ActionButton.component-BsTHLteF.js";import"./TooltipTrigger.component-D98QtRbU.js";import"./index-D2ql4zSJ.js";import"./CircularProgress.component-CDahmhUX.js";import"./constants-CZYEPhht.js";import"./translate-RgWSvZcG.js";import"./withTranslation-C0c3WAs5.js";import"./Skeleton.component-CvIHnOft.js";import"./index-BmiDGyXa.js";import"./theme-cRIqY071.js";import"./OverlayTrigger.component-BEmr1R_L.js";import"./RootCloseWrapper-BE9og5Xq.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DqMnblOM.js";import"./Transition-aWEt4ZNO.js";import"./Transition-CZ1LJOWj.js";import"./ActionSplitDropdown.component-YHa9OEXZ.js";import"./SplitButton-CQzMX6Mi.js";import"./inheritsLoose-BbyS8huE.js";import"./get-33mJQZqf.js";import"./_baseGet-DNbipbyJ.js";import"./toString-BqfwYfrR.js";import"./isSymbol-dumj61Kg.js";import"./eq-GFeXzubR.js";import"./omit-BJGUYW0v.js";import"./_baseSlice-C8dPXsaR.js";import"./_getTag-KdA_BnLc.js";import"./isArrayLike-C7prZ4fa.js";import"./DropdownButton-tYa3qFM7.js";import"./ActionIconToggle.component-BGI0SNww.js";import"./Actions.component-BlWGLWfC.js";const l=[{label:"Recent datasets",icon:"talend-clock","data-feature":"actionlist.item",onClick:()=>console.log("Recent clicked")},{label:"Favorite datasets of the year 2019",iconName:"star","data-feature":"actionlist.item",onClick:()=>console.log("Favorite clicked"),beta:!0,active:!0},{label:"Certified datasets",icon:"talend-badge","data-feature":"actionlist.item",onClick:()=>console.log("Certified clicked")},{label:"All datasets",icon:"talend-expanded","data-feature":"actionlist.item",onClick:()=>console.log("All clicked")},{label:"Import file",icon:"talend-folder","data-feature":"actionlist.item",onClick:()=>console.log("Import clicked")},{label:"Use magic",icon:"talend-tdp-negative","data-feature":"actionlist.item",onClick:()=>console.log("Magic clicked")}],w={title:"Components/Navigation/ActionList",component:o,tags:["autodocs"]},t={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top"})})},s={render:()=>e.jsx("div",{style:{display:"inline-table"},children:e.jsx(o,{id:"context",actions:l,onSelect:()=>console.log("onItemSelect"),onToggleDock:()=>console.log("onToggleDock"),tooltipPlacement:"top",reverse:!0})})},c={render:()=>e.jsxs("div",{children:[e.jsx("p",{children:"You can add your custom classnames to the container and items"}),e.jsx("pre",{children:`
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
