import{j as e}from"./iframe-lQ44fTGe.js";import{C as n}from"./Checkbox-uTLPd8-Y.js";import"./preload-helper-PPVm8Dsz.js";const o=()=>console.log("onChange"),h={id:"id1",onChange:o},i={id:"id2",onChange:o,intermediate:!0},d={id:"id3",onChange:o,checked:!0},s={id:"id4",onChange:o,disabled:!0},t={id:"id5",onChange:o,label:"Some label"},x={title:"Components/Form - Controls/Checkbox",component:n,tags:["autodocs"]},c={render:()=>e.jsxs("div",{style:{padding:30},children:[e.jsx("h1",{children:"Checkbox"}),e.jsx("h2",{children:"Definition"}),e.jsx("p",{children:"The Checkbox component is basically a fancy checkbox like you have in your iphone"}),e.jsx("h2",{children:"Examples"}),e.jsxs("form",{children:[e.jsx("h3",{children:"Default Checkbox"}),e.jsx(n,{...h}),e.jsxs("h3",{children:["Checkbox with ",e.jsx("code",{children:"intermediate: true"})]}),e.jsx(n,{...i}),e.jsxs("h3",{children:["Checkbox with ",e.jsx("code",{children:"checked: true"})]}),e.jsx(n,{...d}),e.jsxs("h3",{children:["Checkbox with ",e.jsx("code",{children:"disabled: true"})]}),e.jsx(n,{...s}),e.jsxs("h3",{children:["Checkbox with ",e.jsx("code",{children:"label: Some label"})]}),e.jsx(n,{...t})]})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 30
  }}>
            <h1>Checkbox</h1>
            <h2>Definition</h2>
            <p>The Checkbox component is basically a fancy checkbox like you have in your iphone</p>
            <h2>Examples</h2>
            <form>
                <h3>Default Checkbox</h3>
                <Checkbox {...defaultProps} />

                <h3>
                    Checkbox with <code>intermediate: true</code>
                </h3>
                <Checkbox {...intermediate} />

                <h3>
                    Checkbox with <code>checked: true</code>
                </h3>
                <Checkbox {...checked} />

                <h3>
                    Checkbox with <code>disabled: true</code>
                </h3>
                <Checkbox {...disabled} />

                <h3>
                    Checkbox with <code>label: Some label</code>
                </h3>
                <Checkbox {...withLabel} />
            </form>
        </div>
}`,...c.parameters?.docs?.source}}};const b=["Default"];export{c as Default,b as __namedExportsOrder,x as default};
