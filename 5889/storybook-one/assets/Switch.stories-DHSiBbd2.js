import{j as e,r as n}from"./iframe-2ufzqGgU.js";import{m as o}from"./DialogBackdrop-BYwM_kJK.js";import"./Skeleton-DGPCfzcD.js";import"./StackItem-BgyW_eaZ.js";import"./QualityBar.component-DkM16RmJ.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-RJX8FuVg.js";import"./index-6XQ5mT_m.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BKQqByaB.js";import"./RatioBar.component-D5oh1ZXT.js";const w={title:"Form/Switch",component:o},t=a=>e.jsx(o,{...a});t.args={values:["input","both","output"]};const r=()=>{const a="value f",[s,u]=n.useState(a);return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Selected value: ",s]}),e.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:a,onChange:(c,l)=>u(l)})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...r.parameters?.docs?.source}}};const E=["Default","Uncontrolled"];export{t as Default,r as Uncontrolled,E as __namedExportsOrder,w as default};
