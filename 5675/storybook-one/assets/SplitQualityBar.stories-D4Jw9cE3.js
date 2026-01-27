import{j as a}from"./iframe-DIB3-0BR.js";import{Q as i}from"./QualityBar.component-D1Er04NA.js";import"./preload-helper-PPVm8Dsz.js";import"./RatioBar.component-D-VTL4ax.js";import"./Tooltip-DQ7pcu8v.js";import"./StackItem-qSIpPSEC.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,y={title:"Dataviz/SplitQualityBar"},l=()=>a.jsxs("section",{style:{maxWidth:500,padding:20},children:[a.jsx("header",{children:"Quality Bar"}),a.jsxs("div",{children:[a.jsx("div",{children:"Split quality bar"}),a.jsx(i,{invalid:10,valid:30,empty:30,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),a.jsx(i,{invalid:0,valid:100,empty:0,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),a.jsx(i,{invalid:40,valid:60,empty:0,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),a.jsx(i,{invalid:40,valid:30,empty:15,na:15,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0}),a.jsx("div",{children:"Disabled"}),a.jsx(i,{disabled:!0,invalid:40,valid:30,empty:15,na:15,onClick:e("onSplitQualityBarAction"),getDataFeature:t=>`data-feature.${t}`,split:!0})]})]});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <section style={{
  maxWidth: 500,
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
    </section>`,...l.parameters?.docs?.source}}};const s=["SplitQualityBar"];export{l as SplitQualityBar,s as __namedExportsOrder,y as default};
