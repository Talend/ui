import{j as e}from"./iframe-lQ44fTGe.js";import{T as o}from"./Toggle.component-XCi_nmcK.js";import"./preload-helper-PPVm8Dsz.js";import"./Checkbox-uTLPd8-Y.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,l=i("onChange"),s=i("onBlur"),c={id:"id1",onBlur:s,onChange:l},h={id:"id2",onBlur:s,onChange:l,checked:!0},d={id:"id3",onBlur:s,onChange:l,disabled:!0},r={id:"id4",onBlur:s,onChange:l,label:"Some label"},m={title:"Components/Form - Controls/Toggle"},n=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Toggle"}),e.jsx("h2",{children:"Definition"}),e.jsx("p",{children:"The Toggle component is basically a fancy checkbox like you have in your iphone"}),e.jsx("h2",{children:"Examples"}),e.jsxs("form",{children:[e.jsx("h3",{children:"Default Toggle"}),e.jsx(o,{...c}),e.jsxs("h3",{children:["Toggle with ",e.jsx("code",{children:"checked: true"})]}),e.jsx(o,{...h}),e.jsxs("h3",{children:["Toggle with ",e.jsx("code",{children:"disabled: true"})]}),e.jsx(o,{...d}),e.jsxs("h3",{children:["Toggle with ",e.jsx("code",{children:"label: 'Some label'"})]}),e.jsx(o,{...r})]})]});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <div>
        <h1>Toggle</h1>
        <h2>Definition</h2>
        <p>The Toggle component is basically a fancy checkbox like you have in your iphone</p>
        <h2>Examples</h2>
        <form>
            <h3>Default Toggle</h3>
            <Toggle {...defaultProps} />

            <h3>
                Toggle with <code>checked: true</code>
            </h3>
            <Toggle {...checked} />

            <h3>
                Toggle with <code>disabled: true</code>
            </h3>
            <Toggle {...disabled} />

            <h3>
                Toggle with <code>label: 'Some label'</code>
            </h3>
            <Toggle {...withLabel} />
        </form>
    </div>`,...n.parameters?.docs?.source}}};const T=["Default"];export{n as Default,T as __namedExportsOrder,m as default};
