import{j as a,bb as d,T as l}from"./iframe-BIQdka0S.js";import"./preload-helper-PPVm8Dsz.js";const t=({amount:n,total:i,errors:r=0,hideLabel:e=!1,notApplicableLabel:s})=>a.jsx(d,{amount:n,errors:r,hideLabel:e,notApplicableLabel:s||a.jsxs(l,{i18nKey:"tui-components:NA",children:[a.jsx("strong",{children:"N"}),"/A"]}),total:i}),u={title:"Components/Dataviz/RatioBar"},o=()=>a.jsxs("section",{style:{maxWidth:500,padding:20},children:[a.jsx("header",{children:"Ratio Bar"}),a.jsxs("div",{children:[a.jsx("div",{children:"Not applicable amount"}),a.jsx(t,{total:12}),a.jsx("div",{children:"With an amount of 0"}),a.jsx(t,{amount:0,total:12}),a.jsx("div",{children:"With an amount of 10/12"}),a.jsx(t,{amount:10,total:12}),a.jsx("div",{children:"With an amount of 12/12"}),a.jsx(t,{amount:12,total:12}),a.jsx("div",{children:"With an amount of 532/1000"}),a.jsx(t,{amount:532,total:1e3}),a.jsx("div",{children:"With an amount of 10/20 with 1 error"}),a.jsx(t,{amount:10,errors:1,total:20}),a.jsx("div",{children:"With an amount of 532/1000 and no label"}),a.jsx(t,{amount:532,total:1e3,hideLabel:!0})]})]});o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <section style={{
  maxWidth: 500,
  padding: 20
}}>
        <header>Ratio Bar</header>
        <div>
            <div>Not applicable amount</div>
            <RatioBar total={12} />
            <div>With an amount of 0</div>
            <RatioBar amount={0} total={12} />
            <div>With an amount of 10/12</div>
            <RatioBar amount={10} total={12} />
            <div>With an amount of 12/12</div>
            <RatioBar amount={12} total={12} />
            <div>With an amount of 532/1000</div>
            <RatioBar amount={532} total={1000} />
            <div>With an amount of 10/20 with 1 error</div>
            <RatioBar amount={10} errors={1} total={20} />
            <div>With an amount of 532/1000 and no label</div>
            <RatioBar amount={532} total={1000} hideLabel />
        </div>
    </section>`,...o.parameters?.docs?.source}}};const c=["_RatioBar"];export{o as _RatioBar,c as __namedExportsOrder,u as default};
