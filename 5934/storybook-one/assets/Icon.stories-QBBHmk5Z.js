import{r as i,j as t}from"./iframe-DQUUjqOn.js";import{i as m,a as x}from"./info-th5TaBQg.js";import"./preload-helper-PPVm8Dsz.js";const f={XS:8,S:12,M:16,L:24},c=e=>f[e];[...Array.from(new Set(Object.values(m)))].sort((e,s)=>c(s)-c(e));[...Array.from(new Set(Object.keys(m).map(e=>e.split(":")[0])))].sort();i.createContext({query:"",setQuery:e=>{}});const h=i.createContext({size:"",setSize:e=>{},filter:"",setFilter:e=>{}}),y=i.createContext({color:"",setColor:e=>{}}),a=({name:e,size:s})=>{const o=i.useContext(y),l=i.useContext(h),p={display:"flex",alignItems:"center",justifyContent:"center",color:"initial"},r={width:"auto",height:"auto"};let g="";if(o.color&&(p.color=o.color),l.size){const{size:n}=l;r.width=n,r.height=n}if(l.filter&&(g=l.filter),s){const n=c(s).toString();r.width=n,r.height=n}if(!e)return null;const d=s?e.split(":")[0]+":"+s:e;return t.jsx("div",{className:g,style:p,children:t.jsx("svg",{style:r,shapeRendering:"geometricPrecision",children:t.jsx("use",{xlinkHref:"#"+d})})})},u=()=>t.jsx("style",{children:`
			svg {
				max-width: 1.5rem;
				max-height: 1.5rem;
			}
			svg path {
				shape-rendering: geometricPrecision;
			}
			.colormapping > svg {
				filter: url(#colormapping);
			}
			.grayscale > svg {
				filter: url(#talend-grayscale);
			}
			.colormapping:hover > svg,
			.grayscale:hover > svg {
				filter: none;
			}
		`});a.displayName="Icon";const I={title:"Icons/Icon",component:a},w={args:{name:"talend-box"},argTypes:{name:{options:Object.keys(x),control:{type:"select"}}}},v=e=>{const s=Object.keys(x);return t.jsxs("div",{children:[t.jsx(u,{}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap"},children:s.map(o=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"0.625rem"},children:[t.jsx(a,{name:o}),t.jsx("span",{style:{fontSize:"1.25rem"},children:o})]},o))})]})};v.parameters={chromatic:{disableSnapshot:!0}};const z=["Usage","All"];export{v as All,w as Usage,z as __namedExportsOrder,I as default};
