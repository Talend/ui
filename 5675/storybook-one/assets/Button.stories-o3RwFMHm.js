import{j as o,r as p}from"./iframe-BrV_C0lS.js";import{A as e}from"./ActionButton.component-CX64OOwE.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-xTn3JdoU.js";import"./index-CyLLb8ny.js";import"./CircularProgress.component-BGG8ERnA.js";import"./constants-CZYEPhht.js";import"./translate-DHfPBvmz.js";import"./withTranslation-B0EdGgI2.js";import"./Skeleton.component-NhDgtDmF.js";import"./index-D7vK3zVi.js";import"./theme-COWgiA41.js";import"./OverlayTrigger.component-BFqpcy8S.js";import"./RootCloseWrapper-Cplz5Qvz.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CWstWGjk.js";import"./Transition-C2lqVYsH.js";import"./Transition-DEWbpGS1.js";const m={"storybook-wrapped-action":"_storybook-wrapped-action_1qgnm_2"},t={label:"Click me",icon:"talend-dataprep","data-feature":"action",onClick:()=>console.log("You clicked me")},c=o.jsx("div",{children:"I am an overlay"}),r={label:"Click me",icon:"talend-dataprep","data-feature":"action",onMouseDown:()=>console.log("You clicked me")},n="Action 1",l="Action 2",u=()=>{const[i,d]=p.useState(n),h={icon:"talend-panel-opener-right",tooltipPlacement:"top",tooltip:!0};return o.jsxs(p.Fragment,{children:[o.jsx("p",{children:"Switch Button"}),o.jsx(e,{...h,label:n,active:i===n,disabled:i===n,onClick:()=>d(n)}),o.jsx(e,{...h,label:l,active:i===l,disabled:i===l,onClick:()=>d(l)})]})},T={title:"Components/Actions/Button",component:e,tags:["autodocs"],decorators:[i=>o.jsx("div",{className:"col-lg-offset-2 col-lg-8",children:i()})]},a={render:()=>o.jsx(u,{})},s={render:()=>o.jsxs("div",{children:[o.jsx("h3",{children:"By default :"}),o.jsx(e,{id:"default",...t}),o.jsx("h3",{children:"Bootstrap style :"}),o.jsx(e,{id:"bsStyle",...t,bsStyle:"primary"}),o.jsx(e,{id:"bsStyle",...t,className:"btn-primary btn-inverse"}),o.jsx("h3",{children:"With new icons"}),o.jsx(e,{id:"newIcon",...t,iconName:"badge-star",className:"btn-primary"}),o.jsx("h3",{children:"With hideLabel option"}),o.jsx(e,{id:"hidelabel",...t,hideLabel:!0}),o.jsx("h3",{children:"In progress"}),o.jsx(e,{id:"inprogress",...t,inProgress:!0}),o.jsx("h3",{children:"Loading"}),o.jsx(e,{id:"loading",loading:!0,label:"loading"}),o.jsx("h3",{children:"Icon button with label"}),o.jsx(e,{id:"icon",...t,link:!0}),o.jsx("h3",{children:"Icon button without label"}),o.jsx(e,{id:"icon-without-label",...t,link:!0,label:""}),o.jsx("h3",{children:"Loading Icon button"}),o.jsx(e,{id:"icon",link:!0,label:"Click me",loading:!0}),o.jsx("h3",{children:"Disabled"}),o.jsx(e,{id:"disabled",...t,disabled:!0,tooltip:!0}),o.jsx("h3",{children:"Reverse display"}),o.jsx(e,{id:"reverseDisplay",...t,iconPosition:"right"}),o.jsx("h3",{children:"With hover handlers"}),o.jsx(e,{id:"withHoverHandlers",...t,onMouseEnter:()=>console.log("mouse enter"),onMouseLeave:()=>console.log("mouse leave")}),o.jsx("h3",{children:"Transform icon"}),o.jsx(e,{id:"reverseDisplay",...t,iconTransform:"rotate-180"}),o.jsx("h3",{children:"Custom tooltip"}),o.jsx(e,{id:"default",...t,tooltipLabel:"Custom label here"}),o.jsx("h3",{children:"OnMouse down handler"}),o.jsx(e,{id:"hidelabel",...r,hideLabel:!0}),o.jsx("h3",{children:"Action with popover"}),o.jsx(e,{id:"hidelabel",overlayId:"hidelabel",overlayComponent:c,overlayPlacement:"top",tooltipPlacement:"right",...r,hideLabel:!0}),o.jsx("h3",{children:"Action in progress"}),o.jsx(e,{id:"hidelabel",inProgress:!0,overlayId:"in-progress",overlayComponent:c,overlayPlacement:"top",tooltipPlacement:"right",...r,hideLabel:!0}),o.jsx("h3",{children:'Automatic Dropup : this is contained in a restricted ".tc-dropdown-container" element.'}),o.jsxs("div",{id:"auto-dropup",className:"tc-dropdown-container",style:{border:"1px solid black",overflow:"scroll",height:"300px",resize:"vertical"},children:[o.jsx("p",{children:"Scroll me to set overflow on top or down of the container, then open the dropdown."}),o.jsx("div",{className:m["storybook-wrapped-action"],children:o.jsx(e,{preventScrolling:!0,overlayId:"scroll",overlayComponent:c,overlayPlacement:"bottom",tooltipPlacement:"right",...r,hideLabel:!0,style:{marginTop:"200px",marginBottom:"200px"}})})]})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <DisableActionButton />
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h3>By default :</h3>
            <ActionButton id="default" {...myAction} />
            <h3>Bootstrap style :</h3>
            <ActionButton id="bsStyle" {...myAction} bsStyle="primary" />
            <ActionButton id="bsStyle" {...myAction} className="btn-primary btn-inverse" />
            <h3>With new icons</h3>
            <ActionButton id="newIcon" {...myAction} iconName="badge-star" className="btn-primary" />
            <h3>With hideLabel option</h3>
            <ActionButton id="hidelabel" {...myAction} hideLabel />
            <h3>In progress</h3>
            <ActionButton id="inprogress" {...myAction} inProgress />
            <h3>Loading</h3>
            <ActionButton id="loading" loading label="loading" />
            <h3>Icon button with label</h3>
            <ActionButton id="icon" {...myAction} link />
            <h3>Icon button without label</h3>
            <ActionButton id="icon-without-label" {...myAction} link label="" />
            <h3>Loading Icon button</h3>
            <ActionButton id="icon" link label="Click me" loading />
            <h3>Disabled</h3>
            <ActionButton id="disabled" {...myAction} disabled tooltip />
            <h3>Reverse display</h3>
            <ActionButton id="reverseDisplay" {...myAction} iconPosition="right" />
            <h3>With hover handlers</h3>
            <ActionButton id="withHoverHandlers" {...myAction} onMouseEnter={() => console.log('mouse enter')} onMouseLeave={() => console.log('mouse leave')} />
            <h3>Transform icon</h3>
            <ActionButton id="reverseDisplay" {...myAction} iconTransform="rotate-180" />
            <h3>Custom tooltip</h3>
            <ActionButton id="default" {...myAction} tooltipLabel="Custom label here" />
            <h3>OnMouse down handler</h3>
            <ActionButton id="hidelabel" {...mouseDownAction} hideLabel />
            <h3>Action with popover</h3>
            <ActionButton id="hidelabel" overlayId="hidelabel" overlayComponent={OverlayComponent} overlayPlacement="top" tooltipPlacement="right" {...mouseDownAction} hideLabel />
            <h3>Action in progress</h3>
            <ActionButton id="hidelabel" inProgress overlayId="in-progress" overlayComponent={OverlayComponent} overlayPlacement="top" tooltipPlacement="right" {...mouseDownAction} hideLabel />
            <h3>
                Automatic Dropup : this is contained in a restricted ".tc-dropdown-container" element.
            </h3>
            <div id="auto-dropup" className="tc-dropdown-container" style={{
      border: '1px solid black',
      overflow: 'scroll',
      height: '300px',
      resize: 'vertical'
    }}>
                <p>Scroll me to set overflow on top or down of the container, then open the dropdown.</p>
                <div className={theme['storybook-wrapped-action']}>
                    <ActionButton preventScrolling overlayId="scroll" overlayComponent={OverlayComponent} overlayPlacement="bottom" tooltipPlacement="right" {...mouseDownAction} hideLabel style={{
          marginTop: '200px',
          marginBottom: '200px'
        }} />
                </div>
            </div>
        </div>
}`,...s.parameters?.docs?.source}}};const O=["DisableTheButtons","Default"];export{s as Default,a as DisableTheButtons,O as __namedExportsOrder,T as default};
