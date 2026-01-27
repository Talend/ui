import{j as e}from"./iframe-DDbQPtEW.js";import{A as a}from"./Action.component-z_tc2k8W.js";import"./Actions.component-BBVK7eHA.js";import"./ActionButton.component-C1rXDJXG.js";import"./ActionIconToggle.component-moWZDsKn.js";import"./ActionSplitDropdown.component-DJ2RyVCW.js";import{A as o}from"./ActionBar.component-BiYaXkrz.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-RyTGuFAh.js";import"./index-Br5au_O-.js";import"./CircularProgress.component-apPtCWbd.js";import"./constants-CZYEPhht.js";import"./translate-BAS4THSV.js";import"./withTranslation-CBoklo2K.js";import"./OverlayTrigger.component-BqP3Bda5.js";import"./RootCloseWrapper-BGY27Mp-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ByhQlRMI.js";import"./Transition-DKLhCDBr.js";import"./Transition-BRDVftK1.js";import"./index-DwN9fP63.js";import"./get-DEhvjXoT.js";import"./_baseGet-lTKxROzH.js";import"./toString-Cnm5KTc0.js";import"./isSymbol-DBdBqAfo.js";import"./eq-DCF4gZF2.js";import"./omit-D72adO18.js";import"./_setToString-Cv7pkYb4.js";import"./_getTag-BfvBz_ei.js";import"./isArrayLike-BSyHTOuQ.js";import"./DropdownButton-Bs0K8Cqf.js";import"./SplitButton-BOEX_SVG.js";import"./inheritsLoose-CDxvETEX.js";import"./Skeleton.component-E6T_PEsN.js";import"./theme-B86cisQm.js";const i={label:"Primary",icon:"talend-cog",bsStyle:"primary","data-feature":"actionbar.primary",onClick:()=>console.log("You clicked me")},r={left:[i,{label:"Secondary1",icon:"talend-cog","data-feature":"actionbar.secondary",onClick:()=>console.log("You clicked me")},{displayMode:o.DISPLAY_MODES.SPLIT_DROPDOWN,label:"Secondary3",icon:"talend-cog","data-feature":"actionbar.splitdropdown",onClick:()=>console.log("on split button click"),items:[{label:"From Local","data-feature":"actionbar.splitdropdown.items",onClick:()=>console.log("From Local click")},{label:"From Remote","data-feature":"actionbar.splitdropdown.items",onClick:()=>console.log("From Remote click")}],emptyDropdownLabel:"No option"},{id:"dropdown",displayMode:o.DISPLAY_MODES.DROPDOWN,label:"Dropdown",icon:"talend-cog",items:[{label:"From Local",onClick:()=>console.log("From Local click")},{label:"From Remote",onClick:()=>console.log("From Remote click")}]}],right:[{label:"Secondary4",icon:"talend-upload",displayMode:"file",onChange:()=>console.log("You changed me")},{label:"Secondary5",icon:"talend-cog",onClick:()=>console.log("You clicked me")}]},c={label:"multi3",icon:"talend-cog",onClick:()=>console.log("You clicked me")},s={left:[{label:"multi1",icon:"talend-cog",onClick:()=>console.log("You clicked me")},{label:"multi2",icon:"talend-cog",onClick:()=>console.log("You clicked me")}],center:[{label:"multi5",icon:"talend-cog",onClick:()=>console.log("You clicked me")}],right:[c,{label:"multi4",icon:"talend-cog",onClick:()=>console.log("You clicked me")}]},d={left:[{displayMode:o.DISPLAY_MODES.BTN_GROUP,actions:[{label:"hidden mean tooltips",icon:"talend-cog",hideLabel:!0,onClick:()=>console.log("cog")},{label:"you are a super star",icon:"talend-badge",hideLabel:!0,onClick:()=>console.log("badge")},{label:"but don t click this",icon:"talend-cross",hideLabel:!0,onClick:()=>console.log("boom")},{label:"edit me",icon:"talend-pencil",hideLabel:!0,onClick:()=>console.log("oh yes")}]},{displayMode:o.DISPLAY_MODES.BTN_GROUP,actions:[{label:"you can also add",icon:"talend-plus-circle",hideLabel:!0,onClick:()=>console.log("add !")},{label:"search",icon:"talend-search",hideLabel:!0,onClick:()=>console.log("search")},{label:"star",icon:"talend-star",hideLabel:!0,onClick:()=>console.log("star")}]}],center:[{displayMode:o.DISPLAY_MODES.BTN_GROUP,actions:[{label:"go to dataprep",icon:"talend-dataprep",hideLabel:!0,onClick:()=>console.log("dataprep")},{label:"go to elastic",icon:"talend-elastic",hideLabel:!0,onClick:()=>console.log("elastic")},{label:"go to cloud engine",icon:"talend-cloud-engine",hideLabel:!0,onClick:()=>console.log("cloud-engine")}]}],right:[{displayMode:o.DISPLAY_MODES.BTN_GROUP,actions:[{label:"table",icon:"talend-table",hideLabel:!0,onClick:()=>console.log("table")},{label:"trash",icon:"talend-trash",hideLabel:!0,onClick:()=>console.log("trash")}]}]},n={actions:r,multiSelectActions:s},p={label:"Delete",icon:"talend-trash",onClick:()=>console.log("multiple delete"),className:"btn-icon-text"},m={label:"Duplicate",icon:"talend-files-o",onClick:()=>console.log("multiple duplicate"),className:"btn-icon-text"},u={label:"Update",icon:"talend-file-move",onClick:()=>console.log("multiple update"),className:"btn-icon-text"},b={label:"Favorite",icon:"talend-star",onClick:()=>console.log("multiple favorite"),className:"btn-icon-text"},g={label:"Certify",icon:"talend-badge",onClick:()=>console.log("multiple certify"),className:"btn-icon-text"},h={left:[p,m,u]},C={left:[b,g]},$={title:"Components/Form - Controls/ActionBar",component:o,tags:["autodocs"]},t={render:()=>e.jsxs("nav",{children:[e.jsx("p",{children:"No Selected, Layout: Left Space Right"}),e.jsx("div",{id:"default",children:e.jsx(o,{...n,selected:0})}),e.jsx("p",{children:"1 Selected, Layout: Left Center Right"}),e.jsx("div",{id:"selected",children:e.jsx(o,{...n,selected:1})}),e.jsx("p",{children:"1 Selected, Layout: Right"}),e.jsx("div",{id:"right",children:e.jsx(o,{selected:1,actions:{left:[i]},multiSelectActions:{right:[c]}})}),e.jsx("p",{children:"Toolbar with btn-group and only icons/ Layout: left, center, right"}),e.jsx("div",{id:"btn-group",children:e.jsx(o,{actions:d})}),e.jsx("p",{children:"3 items selected, with mass/bulk Actions"}),e.jsx("div",{id:"mass-actions",children:e.jsx(o,{selected:3,multiSelectActions:h,appMultiSelectActions:C})})]})},l={render:()=>e.jsx("nav",{children:e.jsx("div",{id:"default",children:e.jsxs(o,{children:[e.jsx(o.Content,{tag:"a",left:!0,href:"#/foo/bar",children:"Hello anchor"}),e.jsx(o.Content,{tag:"button",className:"btn btn-default",left:!0,children:"Hello button"}),e.jsx(o.Content,{left:!0,children:e.jsx(a,{label:"hello Action",icon:"talend-trash",onClick:()=>console.log("onClick")})}),e.jsxs(o.Content,{tag:"form",role:"search",center:!0,children:[e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",className:"form-control",placeholder:"Search"})}),e.jsx("button",{type:"submit",className:"btn btn-default",children:"Submit"})]}),e.jsx(o.Content,{tag:"p",right:!0,children:"Hello paragraph"})]})})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <nav>
            <p>No Selected, Layout: Left Space Right</p>
            <div id="default">
                <ActionBar {...basicProps} selected={0} />
            </div>
            <p>1 Selected, Layout: Left Center Right</p>
            <div id="selected">
                <ActionBar {...basicProps} selected={1} />
            </div>

            <p>1 Selected, Layout: Right</p>
            <div id="right">
                <ActionBar selected={1} actions={{
        left: [primary]
      }} multiSelectActions={{
        right: [multi3]
      }} />
            </div>
            <p>Toolbar with btn-group and only icons/ Layout: left, center, right</p>
            <div id="btn-group">
                <ActionBar actions={btnGroupActions} />
            </div>
            <p>3 items selected, with mass/bulk Actions</p>
            <div id="mass-actions">
                <ActionBar selected={3} multiSelectActions={massActions} appMultiSelectActions={appMassActions} />
            </div>
        </nav>
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <nav>
            <div id="default">
                <ActionBar>
                    <ActionBar.Content tag="a" left href="#/foo/bar">
                        Hello anchor
                    </ActionBar.Content>
                    <ActionBar.Content tag="button" className="btn btn-default" left>
                        Hello button
                    </ActionBar.Content>
                    <ActionBar.Content left>
                        <Action label="hello Action" icon="talend-trash" onClick={() => console.log('onClick')} />
                    </ActionBar.Content>
                    <ActionBar.Content tag="form" role="search" center>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search" />
                        </div>
                        <button type="submit" className="btn btn-default">
                            Submit
                        </button>
                    </ActionBar.Content>
                    <ActionBar.Content tag="p" right>
                        Hello paragraph
                    </ActionBar.Content>
                </ActionBar>
            </div>
        </nav>
}`,...l.parameters?.docs?.source}}};const ee=["Default","Custom"];export{l as Custom,t as Default,ee as __namedExportsOrder,$ as default};
