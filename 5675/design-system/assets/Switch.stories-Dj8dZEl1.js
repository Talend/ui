import{j as t}from"./index-nXv0R8um.js";import{a as n}from"./iframe-DGvyPnos.js";import{n as o}from"./DialogBackdrop-BuzytS8-.js";import"./Skeleton-B1IJ9vsQ.js";import"./useCopyToClipboard-CBbDwwBs.js";import"./index-D5CQICtx.js";import"./TalendDesignTokens-JgHEBmOa.js";const c={title:"Form/Switch",component:o},e=r=>t.jsx(o,{...r});e.args={values:["input","both","output"]};const a=()=>{const r="value f",[s,u]=n.useState(r);return t.jsxs(t.Fragment,{children:[t.jsxs("p",{children:["Selected value: ",s]}),t.jsx(o,{values:["value a","value b","value c","value d","value e","value f"],defaultValue:r,onChange:(i,l)=>u(l)})]})};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"(props: any) => <Switch {...props} />",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const defaultValue = 'value f';
  const [value, setValue] = useState(defaultValue);
  return <>
            <p>Selected value: {value}</p>
            <Switch values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']} defaultValue={defaultValue} onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)} />
        </>;
}`,...a.parameters?.docs?.source}}};const p=["Default","Uncontrolled"],x=Object.freeze(Object.defineProperty({__proto__:null,Default:e,Uncontrolled:a,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{e as D,x as S,a as U};
