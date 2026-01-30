import{j as e}from"./index-BfyV6fgH.js";import"./DialogBackdrop-Cck8yRo6.js";import{x as F,O as t,S as x,s as d}from"./Skeleton-DfZ5cPl-.js";import{r as n}from"./iframe-DB7vHRjW.js";import"./useCopyToClipboard-4_wheD1f.js";import"./index-BzQ6li6Y.js";import"./TalendDesignTokens-JgHEBmOa.js";import{I as M,b as O}from"./blocks-CUIhDQeA.js";const C=({children:o,docs:a})=>{const[l,c]=n.useState([]),[i,h]=n.useState(""),[j,I]=n.useState(2),[p,b]=n.useState(),[T,y]=n.useState(""),[u,v]=n.useState(),[S,z]=n.useState(),[g,w]=n.useState();n.useEffect(()=>{F.getAllIconIds().then(r=>{const E=r.filter(f=>f&&!f.includes(":"));c(E)})},[]);const A=r=>{h(r.currentTarget.value)},U=r=>{I(parseFloat(r.currentTarget.value))},_=r=>{y(r.currentTarget.value)},k=r=>a?e.jsx(O,{children:r.children}):e.jsx("div",{children:r.children});return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsxs(x,{gap:"M",children:[e.jsx(t.Search,{name:"search",label:"Search",onChange:A}),e.jsxs(t.Select,{name:"Size",label:"Size",onChange:U,value:j,children:[e.jsx("option",{value:"1",children:"S"}),e.jsx("option",{value:"2",children:"M"}),e.jsx("option",{value:"3",children:"L"}),e.jsx("option",{value:"4",children:"XL"})]}),e.jsxs(t.Select,{name:"Transform",label:"Transform",onChange:_,children:[e.jsx("option",{children:"spin"}),e.jsx("option",{children:"rotate-45"}),e.jsx("option",{children:"rotate-90"}),e.jsx("option",{children:"rotate-135"}),e.jsx("option",{children:"rotate-180"}),e.jsx("option",{children:"rotate-225"}),e.jsx("option",{children:"rotate-270"}),e.jsx("option",{children:"rotate-315"}),e.jsx("option",{children:"flip-horizontal"}),e.jsx("option",{children:"flip-vertical"})]})]}),e.jsxs(x,{gap:"M",children:[e.jsx(t.ToggleSwitch,{label:"Use color",name:"color",onChange:()=>v(!u),checked:!!u}),e.jsx(t.ToggleSwitch,{label:"Use border",name:"border",onChange:()=>w(!g),checked:!!g}),e.jsx(t.ToggleSwitch,{name:"grayscale",label:"Use grayscale filter",onChange:()=>b(!p),checked:!!p})]}),u?e.jsx(t.Color,{label:"Color",onChange:r=>z(r.currentTarget.value),value:S,name:"color"}):null]}),e.jsx("div",{style:{marginTop:"1.875rem",color:S},children:e.jsx(k,{children:l.filter(r=>r&&r.includes(i)).map(r=>r&&o({name:r,size:j,transform:T,useCurrentColor:u,border:g,filter:p}))})})]})},R=()=>e.jsx(C,{docs:!0,children:({name:o,size:a,transform:l,border:c,filter:i,useCurrentColor:h})=>e.jsx(M,{name:o,children:e.jsx(d,{name:o,style:{width:`${a}rem`,height:`${a}rem`,filter:i?"url('#talend-grayscale')":"none"},transform:l,border:c})},o)}),H={title:"Icons/Icon"},s=o=>e.jsxs(x,{gap:"XS",children:[e.jsx(d,{name:o.name,style:{width:"0.75rem",height:"0.75rem"}}),e.jsx(d,{name:o.name}),e.jsx(d,{name:o.name,style:{width:"1.5rem",height:"1.5rem"}})]});s.args={name:"talend-cross"};s.argTypes={name:{control:"string"}};const m=()=>e.jsx(C,{children:({name:o,size:a,transform:l,border:c,filter:i,useCurrentColor:h})=>e.jsx(d,{name:o,size:a,transform:l,border:c,filter:i,useCurrentColor:h})});s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`(args: UsageProps) => <StackHorizontal gap="XS">
        <Icon name={args.name} style={{
    width: '0.75rem',
    height: '0.75rem'
  }} />
        <Icon name={args.name} />
        <Icon name={args.name} style={{
    width: '1.5rem',
    height: '1.5rem'
  }} />
    </StackHorizontal>`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <AllIconsTemplate>
        {({
    name,
    size,
    transform,
    border,
    filter,
    useCurrentColor
  }) => <Icon name={name} size={size} transform={transform} border={border} filter={filter} useCurrentColor={useCurrentColor} />}
    </AllIconsTemplate>`,...m.parameters?.docs?.source}}};const P=["Usage","AllIcons"],W=Object.freeze(Object.defineProperty({__proto__:null,AllIcons:m,Usage:s,__namedExportsOrder:P,default:H},Symbol.toStringTag,{value:"Module"}));export{R as A,W as S,s as U};
