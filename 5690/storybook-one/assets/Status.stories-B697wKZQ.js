import{j as t}from"./iframe-DLNvOUB0.js";import{S as s}from"./Status.component-Bfd0Be_C.js";import"./preload-helper-PPVm8Dsz.js";import"./Actions.component-JQaUe7Sj.js";import"./Action.component-Be-HZH7n.js";import"./ActionButton.component-tP9JPag2.js";import"./TooltipTrigger.component-D8Bc8a6o.js";import"./index-B41yblyX.js";import"./CircularProgress.component-0xB_c5z_.js";import"./constants-CZYEPhht.js";import"./translate-DzrbyU4a.js";import"./withTranslation-CvaP5PxU.js";import"./Skeleton.component-BCP_tymf.js";import"./index-BayEts6e.js";import"./theme-BE0pQPy_.js";import"./OverlayTrigger.component-Cd2iG2yL.js";import"./RootCloseWrapper-gxGhI_cZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CjhE3iYr.js";import"./Transition-CBBi_-lk.js";import"./Transition-Bfnhv3KJ.js";import"./ActionSplitDropdown.component-BcjQPHz0.js";import"./SplitButton-B4P5n9I3.js";import"./inheritsLoose-D8OOErJR.js";import"./get-DvH0MHqO.js";import"./_baseGet-BQKmBcvz.js";import"./toString-PTKgs-Bb.js";import"./isSymbol-DQOFvlp-.js";import"./eq-BPNOT68H.js";import"./omit-C8EJGJPj.js";import"./_baseSlice-BPJPZi7x.js";import"./_getTag-BYGoso54.js";import"./isArrayLike-DAxrnkzW.js";import"./DropdownButton-BYvZYhNn.js";import"./ActionIconToggle.component-IhX4fhkP.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o={label:"cancel",icon:"talend-cross",onClick:a("onCancel"),bsSize:"small"},i={label:"delete",icon:"talend-cross",onClick:a("onDelete"),bsSize:"small"},n={status:"successful",label:"Successful",icon:"talend-check-circle",actions:[i]},N={title:"Components/Messaging & Communication/Status"},e=()=>t.jsxs("div",{children:[t.jsx("h1",{children:"Status"}),t.jsx("h2",{children:"Definition"}),t.jsx("p",{children:"The status component displays a label with icon and when the mouse is over the label, the component displays a button to let the user dispatch"}),t.jsx("h2",{children:"Examples"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"successful"})]}),t.jsx(s,{...n}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:""}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"warning"})]}),t.jsx(s,{...n,actions:[o],status:"warning",label:"Warning",icon:"talend-warning"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"failed"})]}),t.jsx(s,{...n,status:"failed",label:"Failed",icon:"talend-error"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"canceled"})]}),t.jsx(s,{...n,status:"canceled",label:"Canceled",icon:"talend-block"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"skeleton"})]}),t.jsx(s,{status:"skeleton",label:"Skeleton",icon:"talend-pencil"}),t.jsx("h3",{children:"Status without actions"}),t.jsx(s,{...n,actions:[]}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})," with progress"]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:"",progress:"50"}),t.jsxs("h3",{children:["Status with ",t.jsx("code",{children:"tooltip"})]}),t.jsx(s,{...n,actions:[],tooltip:"tooltip test"}),t.jsx("br",{})]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <div>
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
