import{j as t}from"./iframe-DQgfJw67.js";import{S as s}from"./Status.component-Q9ijUz1y.js";import"./preload-helper-PPVm8Dsz.js";import"./Actions.component-rBGQUexS.js";import"./Action.component-CmH1MtAx.js";import"./ActionButton.component-AsICv5PP.js";import"./TooltipTrigger.component-B8TTpdzm.js";import"./index-DrrsYP9K.js";import"./CircularProgress.component-lrWQ3-22.js";import"./constants-CZYEPhht.js";import"./translate-DiI_Es12.js";import"./withTranslation-5PR4BJ6-.js";import"./Skeleton.component-DZyar7PT.js";import"./index-CncI1Mj4.js";import"./theme-DI8-UJzN.js";import"./OverlayTrigger.component-BVf8SOUy.js";import"./RootCloseWrapper-BV5D6_Gk.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-sVDanUzs.js";import"./Transition-DmNqRhFd.js";import"./Transition-C453gXLR.js";import"./ActionSplitDropdown.component-BSp9Na7X.js";import"./SplitButton-CEa8ibQT.js";import"./inheritsLoose-Dv8TIbRQ.js";import"./get-ClAVEm52.js";import"./_baseGet-CUFEkqTw.js";import"./toString-DozcUBT0.js";import"./isSymbol-CVtcgdPj.js";import"./eq-DGfcdYR8.js";import"./omit-ejUvHiJ5.js";import"./_setToString-DxntCt01.js";import"./_getTag-DVBlZYjA.js";import"./isArrayLike-CLJp57Ut.js";import"./DropdownButton-pzd5K3ei.js";import"./ActionIconToggle.component-B0-5UtJT.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,o={label:"cancel",icon:"talend-cross",onClick:a("onCancel"),bsSize:"small"},i={label:"delete",icon:"talend-cross",onClick:a("onDelete"),bsSize:"small"},n={status:"successful",label:"Successful",icon:"talend-check-circle",actions:[i]},N={title:"Components/Messaging & Communication/Status"},e=()=>t.jsxs("div",{children:[t.jsx("h1",{children:"Status"}),t.jsx("h2",{children:"Definition"}),t.jsx("p",{children:"The status component displays a label with icon and when the mouse is over the label, the component displays a button to let the user dispatch"}),t.jsx("h2",{children:"Examples"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"successful"})]}),t.jsx(s,{...n}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:""}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"warning"})]}),t.jsx(s,{...n,actions:[o],status:"warning",label:"Warning",icon:"talend-warning"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"failed"})]}),t.jsx(s,{...n,status:"failed",label:"Failed",icon:"talend-error"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"canceled"})]}),t.jsx(s,{...n,status:"canceled",label:"Canceled",icon:"talend-block"}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"skeleton"})]}),t.jsx(s,{status:"skeleton",label:"Skeleton",icon:"talend-pencil"}),t.jsx("h3",{children:"Status without actions"}),t.jsx(s,{...n,actions:[]}),t.jsxs("h3",{children:["Status is ",t.jsx("code",{children:"inProgress"})," with progress"]}),t.jsx(s,{...n,actions:[o,i],status:"inProgress",label:"In Progress",icon:"",progress:"50"}),t.jsxs("h3",{children:["Status with ",t.jsx("code",{children:"tooltip"})]}),t.jsx(s,{...n,actions:[],tooltip:"tooltip test"}),t.jsx("br",{})]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <div>
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
