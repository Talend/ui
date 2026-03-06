import{j as t}from"./iframe-6C1ykPWx.js";import{S as s}from"./Status.component-DPoET7TG.js";import"./preload-helper-PPVm8Dsz.js";import"./Actions.component-DUF_O44g.js";import"./Action.component-D9mQufs9.js";import"./ActionButton.component-BY-q4ggr.js";import"./TooltipTrigger.component-BFy3cTU3.js";import"./index-BslmIV_L.js";import"./CircularProgress.component-Sihr6Bhr.js";import"./constants-CZYEPhht.js";import"./translate-BE-TYhPo.js";import"./withTranslation-CKQm43hb.js";import"./Skeleton.component-Baon3CiZ.js";import"./index-Cq7VnXI3.js";import"./theme-DO-cPuEw.js";import"./OverlayTrigger.component-Bv47wzHE.js";import"./RootCloseWrapper-Bz2qVbgv.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DttzocPT.js";import"./Transition-CoH8Ej_X.js";import"./Transition-C_9MPLqP.js";import"./ActionSplitDropdown.component-DQJ29b0w.js";import"./SplitButton-B2drXeWC.js";import"./inheritsLoose-BFjbzfgv.js";import"./get-Caf05NaP.js";import"./_baseGet-BkvsmCY6.js";import"./toString-BmH2ab_Y.js";import"./isSymbol-DXYi_rXD.js";import"./eq-B2JVFhQ7.js";import"./omit-DOIp0Mir.js";import"./_setToString-B6ffYbVG.js";import"./_getTag-DsXBrIAD.js";import"./isArrayLike-BxJVNhir.js";import"./DropdownButton-jG80Mf4A.js";import"./ActionIconToggle.component-DSmCVp0i.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o={label:"cancel",icon:"talend-cross",onClick:a("onCancel"),bsSize:"small"},i={label:"delete",icon:"talend-cross",onClick:a("onDelete"),bsSize:"small"},n={status:"successful",label:"Successful",icon:"talend-check-circle",actions:[i]},N={title:"Components/Messaging & Communication/Status"},e=()=>t.jsxs("div",{children:[t.jsx("h1",{children:"Status"}),t.jsx("h2",{children:"Definition"}),t.jsx("p",{children:"The status component displays a label with icon and when the mouse is over the label, the component displays a button to let the user dispatch"}),t.jsx("h2",{children:"Examples"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"successful"})]}),t.jsx(s,{...n}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:""}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"warning"})]}),t.jsx(s,{...n,actions:[o],status:"warning",label:"Warning",icon:"talend-warning"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"failed"})]}),t.jsx(s,{...n,status:"failed",label:"Failed",icon:"talend-error"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"canceled"})]}),t.jsx(s,{...n,status:"canceled",label:"Canceled",icon:"talend-block"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"skeleton"})]}),t.jsx(s,{status:"skeleton",label:"Skeleton",icon:"talend-pencil"}),t.jsx("h3",{children:"Status without actions"}),t.jsx(s,{...n,actions:[]}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})," with progress"]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:"",progress:"50"}),t.jsxs("h3",{children:["Status with ",t.jsx("code",{children:"tooltip"})]}),t.jsx(s,{...n,actions:[],tooltip:"tooltip test"}),t.jsx("br",{})]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <div>
        <h1>Status</h1>
        <h2>Definition</h2>
        <p>
            The status component displays a label with icon and when the mouse is over the label, the
            component displays a button to let the user dispatch
        </p>
        <h2>Examples</h2>
        <h3>
            Status is <code>successful</code>
        </h3>
        <Status {...myStatus} />
        <h3>
            Status is <code>inProgress</code>
        </h3>
        <Status {...{
    ...myStatus,
    actions: [cancelAction, deleteAction]
  }} status="inProgress" label="In Progress" icon="" />
        <h3>
            Status is <code>warning</code>
        </h3>
        <Status {...{
    ...myStatus,
    actions: [cancelAction]
  }} status="warning" label="Warning" icon="talend-warning" />
        <h3>
            Status is <code>failed</code>
        </h3>
        <Status {...myStatus} status="failed" label="Failed" icon="talend-error" />
        <h3>
            Status is <code>canceled</code>
        </h3>
        <Status {...myStatus} status="canceled" label="Canceled" icon="talend-block" />
        <h3>
            Status is <code>skeleton</code>
        </h3>
        <Status status="skeleton" label="Skeleton" icon="talend-pencil" />
        <h3>Status without actions</h3>
        <Status {...{
    ...myStatus,
    actions: []
  }} />
        <h3>
            Status is <code>inProgress</code> with progress
        </h3>
        <Status {...{
    ...myStatus,
    actions: [cancelAction, deleteAction]
  }} status="inProgress" label="In Progress" icon="" progress="50" />
        <h3>
            Status with <code>tooltip</code>
        </h3>
        <Status {...myStatus} actions={[]} tooltip="tooltip test" />
        <br />
    </div>`,...e.parameters?.docs?.source}}};const U=["Default"];export{e as Default,U as __namedExportsOrder,N as default};
