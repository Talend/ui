import{j as e}from"./iframe-tG6QAxGp.js";import{P as r}from"./Progress.component-D6vIWkRV.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-DPerC_fX.js";const s={border:"1px solid black",width:"450px",height:"200px"},d={title:"Components/Messaging & Communication/ProgressBar"},n=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Action"}),e.jsx("h2",{children:"Definition"}),e.jsxs("p",{children:["The component displays a progress bar at the top of the window.",e.jsx("br",{}),e.jsx("a",{href:"http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle",children:"Spec"})]}),e.jsx("h2",{children:"Examples"}),"Look above and put the mouse on it",e.jsx(r,{id:"my-progress",percent:75,tooltip:"Hey ! Already 75% !"})]}),i=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Action"}),e.jsx("h2",{children:"Definition"}),e.jsxs("p",{children:["The component displays an infinite progress bar at the top of the window.",e.jsx("br",{}),e.jsx("a",{href:"http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle",children:"Spec"})]}),e.jsx("h2",{children:"Examples"}),"Look above and put the mouse on it",e.jsx(r,{id:"my-progress",infinite:!0,tooltip:"Hey !"})]}),o=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Action"}),e.jsx("h2",{children:"Definition"}),e.jsxs("p",{children:["The component displays an infinite progress bar at the top of the window.",e.jsx("br",{}),e.jsx("a",{href:"http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle",children:"Spec"})]}),e.jsxs("div",{style:s,children:[e.jsx("h2",{children:"Examples"}),"Look above, the progress bar is contained in a div :",e.jsx("br",{}),e.jsx(r,{id:"my-progress",contained:!0,percent:75,tooltip:"Hey ! Already 75% !"}),"And a infinite contained progress bar :",e.jsx("br",{}),e.jsx(r,{id:"my-infinite-progress",contained:!0,infinite:!0,tooltip:"Hey !"})]})]});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <div>
        <h1>Action</h1>
        <h2>Definition</h2>
        <p>
            The component displays a progress bar at the top of the window.
            <br />
            <a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
                Spec
            </a>
        </p>
        <h2>Examples</h2>
        Look above and put the mouse on it
        <Progress id="my-progress" percent={75} tooltip="Hey ! Already 75% !" />
    </div>`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <div>
        <h1>Action</h1>
        <h2>Definition</h2>
        <p>
            The component displays an infinite progress bar at the top of the window.
            <br />
            <a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
                Spec
            </a>
        </p>
        <h2>Examples</h2>
        Look above and put the mouse on it
        <Progress id="my-progress" infinite tooltip="Hey !" />
    </div>`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <div>
        <h1>Action</h1>
        <h2>Definition</h2>
        <p>
            The component displays an infinite progress bar at the top of the window.
            <br />
            <a href="http://guidelines.talend.com/document/92132#/messaging-communication/progress-bar-circle">
                Spec
            </a>
        </p>

        <div style={containerStyle}>
            <h2>Examples</h2>
            Look above, the progress bar is contained in a div :<br />
            <Progress id="my-progress" contained percent={75} tooltip="Hey ! Already 75% !" />
            And a infinite contained progress bar :<br />
            <Progress id="my-infinite-progress" contained infinite tooltip="Hey !" />
        </div>
    </div>`,...o.parameters?.docs?.source}}};const h=["Percent","Infinite","Contained"];export{o as Contained,i as Infinite,n as Percent,h as __namedExportsOrder,d as default};
