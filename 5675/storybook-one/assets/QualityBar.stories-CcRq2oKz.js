import{j as i}from"./iframe-BeUrxS75.js";import{Q as a}from"./QualityBar.component-COfHaiIR.js";import"./preload-helper-PPVm8Dsz.js";import"./RatioBar.component-Djoh8F-5.js";import"./Tooltip-bt00C8QA.js";import"./StackItem-DJTmFzN6.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,y={title:"Dataviz/QualityBar"},l=()=>i.jsxs("section",{style:{maxWidth:500,padding:20},children:[i.jsx("header",{children:"Quality Bar"}),i.jsxs("div",{children:[i.jsx("div",{children:"Homogeneous Quality"}),i.jsx(a,{invalid:30,valid:30,empty:30,tooltipLabels:{empty:"30 empty values",invalid:"30 invalid values",valid:"30 valid values"}}),i.jsx("div",{children:"Very invalid"}),i.jsx(a,{invalid:30,valid:0,empty:0,tooltipLabels:{invalid:"30 invalid values"}}),i.jsx("div",{children:"Not applicable"}),i.jsx(a,{invalid:30,valid:0,empty:0,na:20,tooltipLabels:{invalid:"30 invalid values",na:"20 not applicable values"}}),i.jsx("div",{children:"Best quality ever"}),i.jsx(a,{invalid:0,valid:30,empty:0,tooltipLabels:{valid:"30 valid values"}}),i.jsx("div",{children:"Nothing to see here"}),i.jsx(a,{invalid:0,valid:0,empty:30,tooltipLabels:{empty:"30 empty values"}}),i.jsx("div",{children:"Invalid and Empty"}),i.jsx(a,{invalid:0,valid:30,empty:30,tooltipLabels:{empty:"30 empty values",valid:"30 valid values"}}),i.jsx("div",{children:"Classic look"}),i.jsx(a,{invalid:2,valid:88,empty:3,tooltipLabels:{empty:"3 empty values",invalid:"2 invalid values",valid:"88 valid values"}}),i.jsx("div",{children:"Classic look (again yep)"}),i.jsx(a,{invalid:122,valid:1088,empty:293,tooltipLabels:{empty:"293 empty values",invalid:"122 invalid values",valid:"1088 valid values"}}),i.jsx("div",{children:"I really like the digits !"}),i.jsx(a,{invalid:30,valid:30,empty:30,digits:5,tooltipLabels:{empty:"30 empty values",invalid:"30 invalid values",valid:"30 valid values"}}),i.jsx("div",{children:"With a placeholder"}),i.jsx(a,{invalid:30,valid:0,empty:0,placeholder:70,tooltipLabels:{invalid:"30 invalid values"}}),i.jsx("div",{children:"Disabled"}),i.jsx(a,{invalid:30,valid:0,empty:0,placeholder:70,disabled:!0}),i.jsx("div",{children:"Classic look with action button"}),i.jsx(a,{invalid:2,valid:88,empty:3,onClick:d("onClickAction"),getDataFeature:e=>`data-feature.${e}`,tooltipLabels:{empty:"3 empty values",invalid:"2 invalid values",valid:"88 valid values"}})]})]});l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <section style={{
  maxWidth: 500,
  padding: 20
}}>
        <header>Quality Bar</header>

        <div>
            <div>Homogeneous Quality</div>
            <QualityBar invalid={30} valid={30} empty={30} tooltipLabels={{
      empty: '30 empty values',
      invalid: '30 invalid values',
      valid: '30 valid values'
    }} />

            <div>Very invalid</div>
            <QualityBar invalid={30} valid={0} empty={0} tooltipLabels={{
      invalid: '30 invalid values'
    }} />

            <div>Not applicable</div>
            <QualityBar invalid={30} valid={0} empty={0} na={20} tooltipLabels={{
      invalid: '30 invalid values',
      na: '20 not applicable values'
    }} />

            <div>Best quality ever</div>
            <QualityBar invalid={0} valid={30} empty={0} tooltipLabels={{
      valid: '30 valid values'
    }} />

            <div>Nothing to see here</div>
            <QualityBar invalid={0} valid={0} empty={30} tooltipLabels={{
      empty: '30 empty values'
    }} />

            <div>Invalid and Empty</div>
            <QualityBar invalid={0} valid={30} empty={30} tooltipLabels={{
      empty: '30 empty values',
      valid: '30 valid values'
    }} />

            <div>Classic look</div>
            <QualityBar invalid={2} valid={88} empty={3} tooltipLabels={{
      empty: '3 empty values',
      invalid: '2 invalid values',
      valid: '88 valid values'
    }} />

            <div>Classic look (again yep)</div>
            <QualityBar invalid={122} valid={1088} empty={293} tooltipLabels={{
      empty: '293 empty values',
      invalid: '122 invalid values',
      valid: '1088 valid values'
    }} />

            <div>I really like the digits !</div>
            <QualityBar invalid={30} valid={30} empty={30} digits={5} tooltipLabels={{
      empty: '30 empty values',
      invalid: '30 invalid values',
      valid: '30 valid values'
    }} />

            <div>With a placeholder</div>
            <QualityBar invalid={30} valid={0} empty={0} placeholder={70} tooltipLabels={{
      invalid: '30 invalid values'
    }} />

            <div>Disabled</div>
            <QualityBar invalid={30} valid={0} empty={0} placeholder={70} disabled />

            <div>Classic look with action button</div>
            <QualityBar invalid={2} valid={88} empty={3} onClick={action('onClickAction')} getDataFeature={qualityType => \`data-feature.\${qualityType}\`} tooltipLabels={{
      empty: '3 empty values',
      invalid: '2 invalid values',
      valid: '88 valid values'
    }} />
        </div>
    </section>`,...l.parameters?.docs?.source}}};const u=["_QualityBar"];export{l as _QualityBar,u as __namedExportsOrder,y as default};
