import{j as e,r as n}from"./iframe-DLNvOUB0.js";import{m as o}from"./DialogBackdrop-CmPZQo0e.js";import"./Skeleton-CK_lsHpw.js";import"./StackItem-e5MB3L7N.js";import"./QualityBar.component-DPwkwck4.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-ByAyeGQ0.js";import"./index-CleoY1AT.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-Bfnhv3KJ.js";import"./RatioBar.component-BsI1wwue.js";const w={title:"Form/Switch",component:o},t=a=>e.jsx(o,{...a});t.args={values:["input","both","output"]};const r=()=>{const a="value f",[s,u]=n.useState(a);return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Selected value: ",s]}),e.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:a,onChange:(c,l)=>u(l)})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...r.parameters?.docs?.source}}};const E=["Default","Uncontrolled"];export{t as Default,r as Uncontrolled,E as __namedExportsOrder,w as default};
