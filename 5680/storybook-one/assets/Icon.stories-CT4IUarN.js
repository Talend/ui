import{r as a,j as n}from"./iframe-BIQdka0S.js";import{i as x,a as y}from"./info-th5TaBQg.js";import"./preload-helper-PPVm8Dsz.js";const u={XS:8,S:12,M:16,L:24},m=e=>u[e];[...Array.from(new Set(Object.values(x)))].sort((e,t)=>m(t)-m(e));[...Array.from(new Set(Object.keys(x).map(e=>e.split(":")[0])))].sort();a.createContext({query:"",setQuery:e=>{}});const h=a.createContext({size:"",setSize:e=>{},filter:"",setFilter:e=>{}}),v=a.createContext({color:"",setColor:e=>{}}),p=({name:e,size:t})=>{const s=a.useContext(v),i=a.useContext(h),d={display:"flex",alignItems:"center",justifyContent:"center",color:"initial"},r={width:"auto",height:"auto"};let g="";if(s.color&&(d.color=s.color),i.size){const{size:o}=i;r.width=o,r.height=o}if(i.filter&&(g=i.filter),t){const o=m(t).toString();r.width=o,r.height=o}if(!e)return null;const f=t?e.split(":")[0]+":"+t:e;return n.jsx("div",{className:g,style:d,children:n.jsx("svg",{style:r,shapeRendering:"geometricPrecision",children:n.jsx("use",{xlinkHref:"#"+f})})})},j=()=>n.jsx("style",{children:`
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
		`});p.displayName="Icon";const b={title:"Icons/Icon",component:p},c={args:{name:"talend-box"},argTypes:{name:{options:Object.keys(y),control:{type:"select"}}}},l=e=>{const t=Object.keys(y);return n.jsxs("div",{children:[n.jsx(j,{}),n.jsx("div",{style:{display:"flex",flexWrap:"wrap"},children:t.map(s=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",margin:"0.625rem"},children:[n.jsx(p,{name:s}),n.jsx("span",{style:{fontSize:"1.25rem"},children:s})]},s))})]})};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`props => {
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
}`,...l.parameters?.docs?.source}}};const w=["Usage","All"];export{l as All,c as Usage,w as __namedExportsOrder,b as default};
