import{j as e,r as n}from"./iframe-ZOGeCSiy.js";import{m as o}from"./DialogBackdrop-CQcYKoW_.js";import"./Skeleton-Fvr4jU9X.js";import"./StackItem-JfWW04kW.js";import"./QualityBar.component-C2IuN6lA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-B31wejcZ.js";import"./index-BU-4Qln4.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BVyFOmuZ.js";import"./RatioBar.component-DOv-up2m.js";const w={title:"Form/Switch",component:o},t=a=>e.jsx(o,{...a});t.args={values:["input","both","output"]};const r=()=>{const a="value f",[s,u]=n.useState(a);return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Selected value: ",s]}),e.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:a,onChange:(c,l)=>u(l)})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...r.parameters?.docs?.source}}};const E=["Default","Uncontrolled"];export{t as Default,r as Uncontrolled,E as __namedExportsOrder,w as default};
