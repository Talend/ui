import{j as e,r as n}from"./iframe-DQgfJw67.js";import{m as o}from"./DialogBackdrop-Bz7X2Jil.js";import"./Skeleton-dmtfbDEz.js";import"./StackItem-CPY04vaw.js";import"./QualityBar.component-Bm4GwzO5.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-COm6hyve.js";import"./index-DjllIR5g.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-C453gXLR.js";import"./RatioBar.component-DqM5MmAx.js";const w={title:"Form/Switch",component:o},t=a=>e.jsx(o,{...a});t.args={values:["input","both","output"]};const r=()=>{const a="value f",[s,u]=n.useState(a);return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Selected value: ",s]}),e.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:a,onChange:(c,l)=>u(l)})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...r.parameters?.docs?.source}}};const E=["Default","Uncontrolled"];export{t as Default,r as Uncontrolled,E as __namedExportsOrder,w as default};
