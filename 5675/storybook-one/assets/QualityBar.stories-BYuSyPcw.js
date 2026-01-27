import{j as i}from"./iframe-BeUrxS75.js";import{Q as a}from"./QualityBar.component-Cu4Qf4Xj.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,o={title:"Components/Dataviz/QualityBar"},l=()=>i.jsxs("section",{style:{"max-width":500,padding:20},children:[i.jsx("header",{children:"Quality Bar"}),i.jsxs("div",{children:[i.jsx("div",{children:"Homogeneous Quality"}),i.jsx(a,{invalid:30,valid:30,empty:30}),i.jsx("div",{children:"Very invalid"}),i.jsx(a,{invalid:30,valid:0,empty:0}),i.jsx("div",{children:"Not applicable"}),i.jsx(a,{invalid:30,valid:0,empty:0,na:20}),i.jsx("div",{children:"Best quality ever"}),i.jsx(a,{invalid:0,valid:30,empty:0}),i.jsx("div",{children:"Nothing to see here"}),i.jsx(a,{invalid:0,valid:0,empty:30}),i.jsx("div",{children:"Invalid and Empty"}),i.jsx(a,{invalid:0,valid:30,empty:30}),i.jsx("div",{children:"Classic look"}),i.jsx(a,{invalid:2,valid:88,empty:3}),i.jsx("div",{children:"Classic look (again yep)"}),i.jsx(a,{invalid:122,valid:1088,empty:293}),i.jsx("div",{children:"I really like the digits !"}),i.jsx(a,{invalid:30,valid:30,empty:30,digits:5}),i.jsx("div",{children:"With a placeholder"}),i.jsx(a,{invalid:30,valid:0,empty:0,placeholder:70}),i.jsx("div",{children:"Disabled"}),i.jsx(a,{invalid:30,valid:0,empty:0,placeholder:70,disabled:!0}),i.jsx("div",{children:"Classic look with action button"}),i.jsx(a,{invalid:2,valid:88,empty:3,onClick:e("onClickAction"),getDataFeature:t=>`data-feature.${t}`})]})]}),n=()=>i.jsxs("section",{style:{"max-width":500,padding:20},children:[i.jsx("header",{children:"Quality Bar"}),i.jsxs("div",{children:[i.jsx("div",{children:"Split quality bar"}),i.jsx(a,{invalid:10,valid:30,empty:30,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),i.jsx(a,{invalid:0,valid:100,empty:0,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),i.jsx(a,{invalid:40,valid:60,empty:0,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),i.jsx(a,{invalid:40,valid:30,empty:15,na:15,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),i.jsx("div",{children:"Disabled"}),i.jsx(a,{disabled:!0,invalid:40,valid:30,empty:15,na:15,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0})]})]});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() =>
// @ts-ignore
<section style={{
  'max-width': 500,
  padding: 20
}}>
        <header>Quality Bar</header>

        <div>
            <div>Homogeneous Quality</div>
            <QualityBar invalid={30} valid={30} empty={30} />

            <div>Very invalid</div>
            <QualityBar invalid={30} valid={0} empty={0} />

            <div>Not applicable</div>
            <QualityBar invalid={30} valid={0} empty={0} na={20} />

            <div>Best quality ever</div>
            <QualityBar invalid={0} valid={30} empty={0} />

            <div>Nothing to see here</div>
            <QualityBar invalid={0} valid={0} empty={30} />

            <div>Invalid and Empty</div>
            <QualityBar invalid={0} valid={30} empty={30} />

            <div>Classic look</div>
            <QualityBar invalid={2} valid={88} empty={3} />

            <div>Classic look (again yep)</div>
            <QualityBar invalid={122} valid={1088} empty={293} />

            <div>I really like the digits !</div>
            <QualityBar invalid={30} valid={30} empty={30} digits={5} />

            <div>With a placeholder</div>
            <QualityBar invalid={30} valid={0} empty={0} placeholder={70} />

            <div>Disabled</div>
            <QualityBar invalid={30} valid={0} empty={0} placeholder={70} disabled />

            <div>Classic look with action button</div>
            <QualityBar invalid={2} valid={88} empty={3} onClick={action('onClickAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} />
        </div>
    </section>`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() =>
// @ts-ignore
<section style={{
  'max-width': 500,
  padding: 20
}}>
        <header>Quality Bar</header>

        <div>
            <div>Split quality bar</div>
            <QualityBar invalid={10} valid={30} empty={30} onClick={action('onSplitQualityBarAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} split />
            <QualityBar invalid={0} valid={100} empty={0} onClick={action('onSplitQualityBarAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} split />
            <QualityBar invalid={40} valid={60} empty={0} onClick={action('onSplitQualityBarAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} split />
            <QualityBar invalid={40} valid={30} empty={15} na={15} onClick={action('onSplitQualityBarAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} split />

            <div>Disabled</div>
            <QualityBar disabled invalid={40} valid={30} empty={15} na={15} onClick={action('onSplitQualityBarAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} split />
        </div>
    </section>`,...n.parameters?.docs?.source}}};const y=["Default","SplitBars"];export{l as Default,n as SplitBars,y as __namedExportsOrder,o as default};
