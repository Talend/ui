import{j as e,r as n}from"./iframe-D35tfLrh.js";import{m as o}from"./DialogBackdrop-BmYlD_yI.js";import"./Skeleton-FfW_a6n7.js";import"./StackItem-CumHjnXM.js";import"./QualityBar.component-FHpm2a4l.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-B0qmS2NC.js";import"./index-CMpVX-HQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BZcc62nJ.js";import"./RatioBar.component-BdDzmW3o.js";const w={title:"Form/Switch",component:o},t=a=>e.jsx(o,{...a});t.args={values:["input","both","output"]};const r=()=>{const a="value f",[s,u]=n.useState(a);return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Selected value: ",s]}),e.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:a,onChange:(c,l)=>u(l)})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...r.parameters?.docs?.source}}};const E=["Default","Uncontrolled"];export{t as Default,r as Uncontrolled,E as __namedExportsOrder,w as default};
