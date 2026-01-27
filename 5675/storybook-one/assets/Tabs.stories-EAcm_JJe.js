import{j as e,r as h}from"./iframe-B_4wJIS8.js";import"./Action.component-CFKS61Kv.js";import"./Actions.component--FIXM9e2.js";import{A as v}from"./ActionButton.component-Cpu2RjWB.js";import"./ActionIconToggle.component-DT3KyiIW.js";import"./ActionSplitDropdown.component-DrRGmgDg.js";import{T as t}from"./TabBar.component-CY9pTsMO.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-UE44jBfo.js";import"./index-BF7g9OyK.js";import"./CircularProgress.component-CJJ68GdE.js";import"./constants-CZYEPhht.js";import"./translate-9bG30sZL.js";import"./withTranslation-gwdAr2UT.js";import"./OverlayTrigger.component-CPeQ8j4-.js";import"./RootCloseWrapper-DEvVHIQL.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-KR_oZShS.js";import"./Transition-xoA8W_1t.js";import"./Transition-BxQmsZ3a.js";import"./index-2LIYn8RY.js";import"./get-C-eStwz-.js";import"./_baseGet-D4w8jjj2.js";import"./toString-Cq3taLdz.js";import"./isSymbol-DJhelppy.js";import"./eq-BDZQrTUZ.js";import"./omit-Cjg7wDrx.js";import"./_setToString-BOqf-aER.js";import"./_getTag-BZemYwVp.js";import"./isArrayLike-DS_zinFP.js";import"./DropdownButton-COOoeBO0.js";import"./SplitButton-BBdShQee.js";import"./inheritsLoose-D74nn77K.js";import"./Skeleton.component-Cnert0C7.js";import"./theme-rZbYulMu.js";import"./debounce-DVDMisOT.js";import"./debounce-Cr0gYv9g.js";import"./toNumber-BuekqiaR.js";import"./Tab-BaASZVow.js";import"./NavItem-DvCCKZW5.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,i={id:"my-tabs",items:[{key:"1",label:"Tab1","data-feature":"action.1"},{key:"2",label:"Tab2","data-feature":"action.2",icon:{name:"talend-empty-calendar"},badge:{label:85}},{key:"3",label:"Tab3 and very very long text that should be truncated","data-feature":"action.3",icon:{name:"talend-user-circle"},badge:{label:"1105",bsStyle:"danger"}},{key:"4",label:"Tab4","data-feature":"action.4",icon:{name:"talend-arrow-right"}},{key:"5",label:"Tab5",badge:{label:"975",bsStyle:"warning"},"data-feature":"action.5"},{key:"6",label:"Tab6","data-feature":"action.6",icon:{name:"fa fa-asterisk"}},{key:"7",label:"Tab7","data-feature":"action.7",icon:{name:"talend-star"},badge:{label:"5275",bsStyle:"success"}},{key:"8",label:"Tab8","data-feature":"action.8",icon:{name:"fa fa-file-excel-o"}},{key:"9",label:"Tab9","data-feature":"action.9",disabled:!0},{key:"10",label:"Tab10",badge:{label:"BETA",bsStyle:"beta"},"data-feature":"action.10"}],onSelect:b("onSelect"),selectedKey:"2"},y={...i,right:e.jsx(v,{className:"btn-inverse",label:"Add",bsStyle:"info",icon:"talend-plus-circle",onClick:b("add")})};function p(r,a){return a==="tab"?`my-custom-id-${r}`:null}const x=r=>{const[a,c]=h.useState("2");return e.jsxs(t,{...r,selectedKey:a,onSelect:(u,m)=>c(m.key),children:["I'm the child of tab ",a]})},f=r=>{const[a,c]=h.useState("2");return e.jsxs(t,{...r,selectedKey:a,onSelect:(u,m)=>c(m.key),children:["I'm the child of responsive tab ",a]})};function n(){return e.jsx("div",{style:{padding:"0.625rem 1.25rem"},children:e.jsx("p",{children:"I'm the child"})})}const de={title:"Components/Navigation/Tabs"},d=()=>e.jsxs("nav",{children:[e.jsx("h3",{children:"Default TabBar"}),e.jsx("div",{id:"default",children:e.jsx(t,{...i,children:n()})}),e.jsx("div",{id:"with right children",children:e.jsx(t,{...y,children:n()})}),e.jsx("h3",{children:"Default TabBar with too small container"}),e.jsx("div",{id:"default-smaller",style:{width:"18.75rem",border:"1px solid"},children:e.jsx(t,{...i,children:n()})}),e.jsxs("h3",{children:["Default TabBar with too small container and ",e.jsx("code",{children:"responsive = false"})]}),e.jsx("div",{id:"default-smaller",style:{width:"29.375rem",border:"1px solid"},children:e.jsx(t,{...i,responsive:!1,children:n()})})]}),s=()=>e.jsxs("nav",{children:[e.jsx("h3",{children:"TabBar with custom ids"}),e.jsxs("p",{children:["By default, you pass an id (required for accessibility) to the component and all ids are generated.",e.jsx("br",{}),"But you can customize the ids.",e.jsx("br",{}),"The generated id will be passed to the panel as aria-describedby."]}),e.jsx("pre",{children:`
function generateChildId(key, kind) {
    if (kind === 'tab') {
        return \`my-custom-id-\${key}\`;
    }
}
...
<TabBar
    {...tabProps}
    generateChildId={generateChildId}
>
    I'm the child
</TabBar>
                `}),e.jsx("div",{id:"customId",children:e.jsx(t,{...i,generateChildId:p,children:"I'm the child"})})]}),o=()=>e.jsxs("nav",{children:[e.jsx("h3",{children:"TabBar with custom content"}),e.jsxs("div",{id:"customContent",children:[e.jsx(t,{...i,generateChildId:p}),e.jsx("div",{id:"my-custom-id-1",style:{display:"none"},children:"I'm the existing content of tab 1"}),e.jsx("div",{id:"my-custom-id-2",children:"I'm the existing content of tab 2"}),e.jsx("div",{id:"my-custom-id-3",style:{display:"none"},children:"I'm the existing content of tab 3"}),e.jsx("div",{id:"my-custom-id-4",style:{display:"none"},children:"I'm the existing content of tab 4"}),e.jsx("div",{id:"my-custom-id-5",style:{display:"none"},children:"I'm the existing content of tab 5"})]})]}),l=()=>e.jsxs("nav",{children:[e.jsx("h3",{children:"Interactive TabBar demo"}),e.jsx("div",{id:"interactive",children:e.jsx(x,{...i,children:"I'm the child"})}),e.jsx("div",{id:"interactive-responsive",style:{width:"18.75rem",border:"1px solid"},children:e.jsx(f,{...i,children:"I'm the responsive child"})})]});d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <nav>
        <h3>Default TabBar</h3>
        <div id="default">
            <TabBar {...tabProps}>{renderContent()}</TabBar>
        </div>
        <div id="with right children">
            <TabBar {...rightProps}>{renderContent()}</TabBar>
        </div>
        <h3>Default TabBar with too small container</h3>
        <div id="default-smaller" style={{
    width: '18.75rem',
    border: '1px solid'
  }}>
            <TabBar {...tabProps}>{renderContent()}</TabBar>
        </div>
        <h3>
            Default TabBar with too small container and <code>responsive = false</code>
        </h3>
        <div id="default-smaller" style={{
    width: '29.375rem',
    border: '1px solid'
  }}>
            <TabBar {...tabProps} responsive={false}>
                {renderContent()}
            </TabBar>
        </div>
    </nav>`,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <nav>
        <h3>TabBar with custom ids</h3>
        <p>
            By default, you pass an id (required for accessibility) to the component and all ids are
            generated.
            <br />
            But you can customize the ids.
            <br />
            The generated id will be passed to the panel as aria-describedby.
        </p>

        <pre>
            {\`
function generateChildId(key, kind) {
    if (kind === 'tab') {
        return \\\`my-custom-id-\\\${key}\\\`;
    }
}
...
<TabBar
    {...tabProps}
    generateChildId={generateChildId}
>
    I'm the child
</TabBar>
                \`}
        </pre>
        <div id="customId">
            <TabBar {...tabProps} generateChildId={generateChildId}>
                I'm the child
            </TabBar>
        </div>
    </nav>`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <nav>
        <h3>TabBar with custom content</h3>
        <div id="customContent">
            <TabBar {...tabProps} generateChildId={generateChildId} />
            <div id="my-custom-id-1" style={{
      display: 'none'
    }}>
                I'm the existing content of tab 1
            </div>
            <div id="my-custom-id-2">I'm the existing content of tab 2</div>
            <div id="my-custom-id-3" style={{
      display: 'none'
    }}>
                I'm the existing content of tab 3
            </div>
            <div id="my-custom-id-4" style={{
      display: 'none'
    }}>
                I'm the existing content of tab 4
            </div>
            <div id="my-custom-id-5" style={{
      display: 'none'
    }}>
                I'm the existing content of tab 5
            </div>
        </div>
    </nav>`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <nav>
        <h3>Interactive TabBar demo</h3>
        <div id="interactive">
            <InteractiveTabs {...tabProps}>I'm the child</InteractiveTabs>
        </div>
        <div id="interactive-responsive" style={{
    width: '18.75rem',
    border: '1px solid'
  }}>
            <InteractiveResponsiveTabs {...tabProps}>I'm the responsive child</InteractiveResponsiveTabs>
        </div>
    </nav>`,...l.parameters?.docs?.source}}};const se=["Default","CustomIdGenerator","WithExistingContent","FullyInteractive"];export{s as CustomIdGenerator,d as Default,l as FullyInteractive,o as WithExistingContent,se as __namedExportsOrder,de as default};
