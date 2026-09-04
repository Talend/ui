import{j as t}from"./iframe-Do9MkTTB.js";import{S as s}from"./Status.component-Brn64s0b.js";import"./preload-helper-PPVm8Dsz.js";import"./Actions.component-Sj5L0N-t.js";import"./Action.component-B4OSEy6m.js";import"./ActionButton.component-2llTRVLN.js";import"./TooltipTrigger.component-BZ6GrODe.js";import"./index-BqJQNhAi.js";import"./CircularProgress.component-CZS3CNAl.js";import"./constants-CZYEPhht.js";import"./translate-Da30Cq5o.js";import"./withTranslation-DpYoDMdS.js";import"./Skeleton.component-CSSMiQZZ.js";import"./index-DmoB33Vx.js";import"./theme-DqWGs9jL.js";import"./OverlayTrigger.component-BSeuuoqm.js";import"./RootCloseWrapper-CmuOVIHm.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CnM3wOZM.js";import"./Transition-DzSe8eVs.js";import"./Transition-CDdRDE4G.js";import"./ActionSplitDropdown.component-B2j4EuU_.js";import"./SplitButton-CnIs2fxo.js";import"./inheritsLoose-Boj-Odam.js";import"./get-CEgWO4ky.js";import"./_baseGet-jYYCWLwL.js";import"./toString-DSXExHZS.js";import"./isSymbol-Bx5lGEtt.js";import"./eq-Bq5QjZni.js";import"./omit-hj1fVQf8.js";import"./_setToString-DY7q7weI.js";import"./_getTag-CwuLMQhN.js";import"./isArrayLike-ZUl_Fg1l.js";import"./DropdownButton-Ck-fuHum.js";import"./ActionIconToggle.component-DUJO9ftK.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o={label:"cancel",icon:"talend-cross",onClick:a("onCancel"),bsSize:"small"},i={label:"delete",icon:"talend-cross",onClick:a("onDelete"),bsSize:"small"},n={status:"successful",label:"Successful",icon:"talend-check-circle",actions:[i]},N={title:"Components/Messaging & Communication/Status"},e=()=>t.jsxs("div",{children:[t.jsx("h1",{children:"Status"}),t.jsx("h2",{children:"Definition"}),t.jsx("p",{children:"The status component displays a label with icon and when the mouse is over the label, the component displays a button to let the user dispatch"}),t.jsx("h2",{children:"Examples"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"successful"})]}),t.jsx(s,{...n}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:""}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"warning"})]}),t.jsx(s,{...n,actions:[o],status:"warning",label:"Warning",icon:"talend-warning"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"failed"})]}),t.jsx(s,{...n,status:"failed",label:"Failed",icon:"talend-error"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"canceled"})]}),t.jsx(s,{...n,status:"canceled",label:"Canceled",icon:"talend-block"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"skeleton"})]}),t.jsx(s,{status:"skeleton",label:"Skeleton",icon:"talend-pencil"}),t.jsx("h3",{children:"Status without actions"}),t.jsx(s,{...n,actions:[]}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})," with progress"]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:"",progress:"50"}),t.jsxs("h3",{children:["Status with ",t.jsx("code",{children:"tooltip"})]}),t.jsx(s,{...n,actions:[],tooltip:"tooltip test"}),t.jsx("br",{})]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <div>
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
