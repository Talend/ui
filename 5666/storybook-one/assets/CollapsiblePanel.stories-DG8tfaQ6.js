import{j as e}from"./iframe-BXejucuQ.js";import{C as l}from"./CollapsiblePanel.component-Cj6cbzN_.js";import"./Action.component-DuK0_BCA.js";import"./Actions.component-C9EqYmc4.js";import{A as g}from"./ActionButton.component-dsjCIjlo.js";import"./ActionIconToggle.component-BCl6yGrn.js";import"./ActionSplitDropdown.component-Ci92bM0C.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-faUy-PCD.js";import"./RootCloseWrapper-tKen8Zym.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dz86Bgyr.js";import"./Transition-2jjjH3fW.js";import"./Transition-BjI2T3UQ.js";import"./Status.component-gwesV_vk.js";import"./CircularProgress.component-Bs5Ehers.js";import"./constants-CZYEPhht.js";import"./translate-_8OV6OIY.js";import"./withTranslation-BqYh4fpd.js";import"./index-CM8P_UdQ.js";import"./Skeleton.component-D5iPgGQN.js";import"./theme-jwodq2iz.js";import"./TooltipTrigger.component-BdHplbW4.js";import"./Panel-ClBDQeVy.js";import"./SplitButton-D26HEfLU.js";import"./inheritsLoose-Ce93F3T_.js";import"./index-Bp183NWd.js";import"./get-DTSKuxIH.js";import"./_baseGet-DBoymvAE.js";import"./toString-Cra93cns.js";import"./isSymbol-BQoa29kw.js";import"./eq-BaGMOmWe.js";import"./omit-BssNVCFl.js";import"./_setToString-CAfiehcU.js";import"./_getTag-Bb3r3DqM.js";import"./isArrayLike-B9hmjtrU.js";import"./DropdownButton-4jXankOv.js";const h=[{label:"Content1",description:"Description1"},{label:"Content2",description:"Description2"}],b=[{displayMode:"status",status:"successful",label:"Successful",icon:"talend-check"}],x=[{displayMode:"status",status:"failed",label:"Failed",icon:"talend-cross"}],C=[{displayMode:"status",status:"warning",label:"Warning",icon:"talend-warning"}],v=[{displayMode:"status",status:"canceled",label:"Canceled",icon:"talend-cross"}],f=[{displayMode:"status",status:"skeleton",label:"Loading"},{displayMode:"badge",label:"Execution",bsStyle:"info",tooltipPlacement:"top",tooltipLabel:"Updating execution status..."}],P=[{displayMode:"status",status:"inProgress",label:"In Progress",actions:[{label:"cancel",onClick:()=>console.log("onCancel"),link:!0}]}],o={displayMode:"action",label:"Download",icon:"talend-download",onClick:()=>console.log("onDownload"),hideLabel:!0,link:!0},u={displayMode:"badge",label:"XML",bsStyle:"info",tooltipPlacement:"top",tooltipLabel:"Extensible Markup Language"},m={tooltipPlacement:"top",tooltipLabel:"Webhook job",element:e.jsx("div",{className:"custom-element",children:"Custom element can be here"})},r={label:"Panel with descriptive-panel theme",bsStyle:"default",tooltipPlacement:"top",className:"title"},c={label:"(Tag element)",bsStyle:"default",tooltipPlacement:"top",className:"tag"},p={label:"Detail element",bsStyle:"default",tooltipPlacement:"top",className:"detail"},T=e.jsxs("div",{children:[" ","my custom element ",e.jsx(g,{...o})]}),ie={title:"Components/Layout/CollapsiblePanel",component:l,tags:["autodocs"]},a={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Collapsible Panel"}),e.jsx(l,{id:"panel-default-1",header:[{label:"Controlled collapsed panel"}],onToggle:()=>console.log("onToggle"),children:"Coucou"}),e.jsx(l,{id:"panel-default-2",header:[{label:"Controlled expanded panel"}],onToggle:()=>console.log("onToggle"),expanded:!0,children:"Coucou"}),e.jsx(l,{id:"panel-default-fail",header:[{label:"Controlled expanded panel with status fail"}],onToggle:()=>console.log("onToggle"),expanded:!0,status:"failed",children:"Coucou"}),e.jsx(l,{id:"panel-default-success",header:[{label:"Controlled expanded panel with success status"}],onToggle:()=>console.log("onToggle"),expanded:!0,status:"successful",children:"Coucou"}),e.jsx(l,{id:"panel-default-3",header:[{label:"No content panel"}]})]})},t={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Collapsible Panel Headers"}),e.jsx(l,{id:"panel-header-1",header:[{label:"Simple header"}]}),e.jsx(l,{id:"panel-header-1",header:[{label:"Simple header with a very very very very long label that should not completly appear and not push other element outside the headerSimple header with a very very very very long label that should not completly appear and not push other element outside the header"},o],children:"Panel content"}),e.jsx(l,{id:"panel-header-2",header:[{label:"Header with actions"},{element:T}]}),e.jsx(l,{id:"panel-header-element-withbutton",header:[{label:"Header with element having actions"},o]}),e.jsx(l,{id:"panel-header-3",header:[{label:"Header with badge"},u]}),e.jsx(l,{id:"panel-header-4",header:[{label:"Header with custom element"},m]}),e.jsx(l,{id:"panel-header-5",header:[{label:"Header with groups"},[u,o],m]}),e.jsx(l,{id:"panel-header-6",header:[{label:"Header with caret"},u,o,m],children:"Coucou"}),e.jsx(l,{id:"panel-header-7",header:b,status:"successful"}),e.jsx(l,{id:"panel-header-8",header:x,status:"failed"}),e.jsx(l,{id:"panel-header-9",header:C,status:"warning"}),e.jsx(l,{id:"panel-header-10",header:v,status:"canceled"}),e.jsx(l,{id:"panel-header-11",header:P,status:"inProgress"}),e.jsx(l,{id:"panel-header-12",header:f,status:"skeleton"})]})},n={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Collapsible Panel"}),e.jsx(l,{id:"panel-content-1",header:[{label:"Body with children"}],onToggle:()=>console.log("onToggle"),expanded:!0,children:"Coucou from children"}),e.jsx(l,{id:"panel-default-2",header:[{label:"Body with key/value"}],onToggle:()=>console.log("onToggle"),expanded:!0,content:h})]})},i={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Theme : descriptive-panel"}),e.jsx(l,{id:"panel-textual-1",header:[[r,c],p],content:{head:[{label:"Content head element",bsStyle:"default",tooltipPlacement:"top"},{label:"Content head right element",bsStyle:"default",tooltipPlacement:"top",className:"text-right"}],description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},theme:"descriptive-panel",onToggle:()=>console.log("onToggle"),expanded:!0}),e.jsx(l,{id:"panel-textual-2",header:[[r,c],p],theme:"descriptive-panel"})]})},s={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Selection"}),e.jsx(l,{id:"panel-selection-1",header:[{label:"Controlled collapsed panel"}],onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),status:"selected",children:"Coucou"}),e.jsx(l,{id:"panel-selection-2",header:[{label:"Controlled expanded panel"}],onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),status:"selected",expanded:!0,children:"Coucou"}),e.jsx(l,{id:"panel-selection-3",header:[[r,c],p],content:{head:[],description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},theme:"descriptive-panel",onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),status:"selected"}),e.jsx(l,{id:"panel-selection-4",header:[[r,c],p],content:{head:[],description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},theme:"descriptive-panel",onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),status:"selected",expanded:!0})]})},d={render:()=>e.jsxs("div",{className:"col-lg-offset-1 col-lg-10",children:[e.jsx("h1",{children:"Nested"}),e.jsx(l,{id:"panel-nested-1",header:[{label:"First level CollapsiblePanel"}],onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),expanded:!0,children:e.jsx(l,{id:"panel-nested-2",header:[{label:"Second level CollapsiblePanel"}],onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),expanded:!0,children:e.jsx(l,{id:"panel-nested-3",header:[{label:"Third level CollapsiblePanel"}],onToggle:()=>console.log("onToggle"),onSelect:()=>console.log("onSelect"),expanded:!0,children:"Lorem ipsum dolor sit amet."})})})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Collapsible Panel</h1>
            <CollapsiblePanel id="panel-default-1" header={[{
      label: 'Controlled collapsed panel'
    }]} onToggle={() => console.log('onToggle')}>
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-default-2" header={[{
      label: 'Controlled expanded panel'
    }]} onToggle={() => console.log('onToggle')} expanded>
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-default-fail" header={[{
      label: 'Controlled expanded panel with status fail'
    }]} onToggle={() => console.log('onToggle')} expanded status="failed">
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-default-success" header={[{
      label: 'Controlled expanded panel with success status'
    }]} onToggle={() => console.log('onToggle')} expanded status="successful">
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-default-3" header={[{
      label: 'No content panel'
    }]} />
        </div>
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Collapsible Panel Headers</h1>
            <CollapsiblePanel id="panel-header-1" header={[{
      label: 'Simple header'
    }]} />
            <CollapsiblePanel id="panel-header-1" header={[{
      label: 'Simple header with a very very very very long label that should not completly appear and not push other element outside the headerSimple header with a very very very very long label that should not completly appear and not push other element outside the header'
    }, buttonDownload]}>
                Panel content
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-header-2" header={[{
      label: 'Header with actions'
    }, {
      element
    }]} />
            <CollapsiblePanel id="panel-header-element-withbutton" header={[{
      label: 'Header with element having actions'
    }, buttonDownload]} />
            <CollapsiblePanel id="panel-header-3" header={[{
      label: 'Header with badge'
    }, badge]} />
            <CollapsiblePanel id="panel-header-4" header={[{
      label: 'Header with custom element'
    }, customElement]} />
            <CollapsiblePanel id="panel-header-5" header={[{
      label: 'Header with groups'
    }, [badge, buttonDownload], customElement]} />
            <CollapsiblePanel id="panel-header-6" header={[{
      label: 'Header with caret'
    }, badge, buttonDownload, customElement]}>
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-header-7" header={statusSuccessfulHeader} status="successful" />
            <CollapsiblePanel id="panel-header-8" header={statusFailedHeader} status="failed" />
            <CollapsiblePanel id="panel-header-9" header={statusWarningHeader} status="warning" />
            <CollapsiblePanel id="panel-header-10" header={statusCanceledHeader} status="canceled" />
            <CollapsiblePanel id="panel-header-11" header={statusInProgressHeader} status="inProgress" />
            <CollapsiblePanel id="panel-header-12" header={statusSkeletonHeader} status="skeleton" />
        </div>
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Collapsible Panel</h1>
            <CollapsiblePanel id="panel-content-1" header={[{
      label: 'Body with children'
    }]} onToggle={() => console.log('onToggle')} expanded>
                Coucou from children
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-default-2" header={[{
      label: 'Body with key/value'
    }]} onToggle={() => console.log('onToggle')} expanded content={keyValueContent} />
        </div>
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Theme : descriptive-panel</h1>
            <CollapsiblePanel id="panel-textual-1" header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]} content={{
      head: [{
        label: 'Content head element',
        bsStyle: 'default',
        tooltipPlacement: 'top'
      }, {
        label: 'Content head right element',
        bsStyle: 'default',
        tooltipPlacement: 'top',
        className: 'text-right'
      }],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }} theme="descriptive-panel" onToggle={() => console.log('onToggle')} expanded />
            <CollapsiblePanel id="panel-textual-2" header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]} theme="descriptive-panel" />
        </div>
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Selection</h1>
            <CollapsiblePanel id="panel-selection-1" header={[{
      label: 'Controlled collapsed panel'
    }]} onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} status="selected">
                Coucou
            </CollapsiblePanel>
            <CollapsiblePanel id="panel-selection-2" header={[{
      label: 'Controlled expanded panel'
    }]} onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} status="selected" expanded>
                Coucou
            </CollapsiblePanel>

            <CollapsiblePanel id="panel-selection-3" header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]} content={{
      head: [],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }} theme="descriptive-panel" onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} status="selected" />
            <CollapsiblePanel id="panel-selection-4" header={[[descriptiveTitle, descriptiveTag], descriptiveDetail]} content={{
      head: [],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }} theme="descriptive-panel" onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} status="selected" expanded />
        </div>
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="col-lg-offset-1 col-lg-10">
            <h1>Nested</h1>
            <CollapsiblePanel id="panel-nested-1" header={[{
      label: 'First level CollapsiblePanel'
    }]} onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} expanded>
                <CollapsiblePanel id="panel-nested-2" header={[{
        label: 'Second level CollapsiblePanel'
      }]} onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} expanded>
                    <CollapsiblePanel id="panel-nested-3" header={[{
          label: 'Third level CollapsiblePanel'
        }]} onToggle={() => console.log('onToggle')} onSelect={() => console.log('onSelect')} expanded>
                        Lorem ipsum dolor sit amet.
                    </CollapsiblePanel>
                </CollapsiblePanel>
            </CollapsiblePanel>
        </div>
}`,...d.parameters?.docs?.source}}};const se=["Default","Header","Body","ThemeDescriptivePanel","Selection","Nested"];export{n as Body,a as Default,t as Header,d as Nested,s as Selection,i as ThemeDescriptivePanel,se as __namedExportsOrder,ie as default};
