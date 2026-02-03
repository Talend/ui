import{r as i,j as t}from"./iframe-cBtRg4Zm.js";import{i as x,a as y}from"./info-th5TaBQg.js";import"./preload-helper-PPVm8Dsz.js";const u={XS:8,S:12,M:16,L:24},m=e=>u[e];[...Array.from(new Set(Object.values(x)))].sort((e,n)=>m(n)-m(e));[...Array.from(new Set(Object.keys(x).map(e=>e.split(":")[0])))].sort();i.createContext({query:"",setQuery:e=>{}});const h=i.createContext({size:"",setSize:e=>{},filter:"",setFilter:e=>{}}),v=i.createContext({color:"",setColor:e=>{}}),p=({name:e,size:n})=>{const s=i.useContext(v),c=i.useContext(h),d={display:"flex",alignItems:"center",justifyContent:"center",color:"initial"},r={width:"auto",height:"auto"};let g="";if(s.color&&(d.color=s.color),c.size){const{size:o}=c;r.width=o,r.height=o}if(c.filter&&(g=c.filter),n){const o=m(n).toString();r.width=o,r.height=o}if(!e)return null;const f=n?e.split(":")[0]+":"+n:e;return t.jsx("div",{className:g,style:d,children:t.jsx("svg",{style:r,shapeRendering:"geometricPrecision",children:t.jsx("use",{xlinkHref:"#"+f})})})},j=()=>t.jsx("style",{children:`
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
		`});p.displayName="Icon";const b={title:"Icons/Icon",component:p},l={args:{name:"talend-box"},argTypes:{name:{options:Object.keys(y),control:{type:"select"}}}},a=e=>{const n=Object.keys(y);return t.jsxs("div",{children:[t.jsx(j,{}),t.jsx("div",{style:{display:"flex",flexWrap:"wrap"},children:n.map(s=>t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"0.625rem"},children:[t.jsx(p,{name:s}),t.jsx("span",{style:{fontSize:"1.25rem"},children:s})]},s))})]})};a.parameters={chromatic:{disableSnapshot:!0}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    name: 'talend-box'
  },
  argTypes: {
    name: {
      options: Object.keys(icons),
      control: {
        type: 'select'
      }
    }
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`props => {
  const names = Object.keys(icons);
  return <div>
            <StyleIcon />
            <div style={{
      display: 'flex',
      flexWrap: 'wrap'
    }}>
                {names.map(name => <div key={name} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0.625rem'
      }}>
                        <Icon name={name} />
                        <span style={{
          fontSize: '1.25rem'
        }}>{name}</span>
                    </div>)}
            </div>
        </div>;
}`,...a.parameters?.docs?.source}}};const w=["Usage","All"];export{a as All,l as Usage,w as __namedExportsOrder,b as default};
