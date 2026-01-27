import{r as j,j as e,c as m,K as A,I as w}from"./iframe-BBf9rzxA.js";import{r as N}from"./range-xKfxO_L4.js";import{S as T}from"./index-hK3e0JSs.js";import"./index-DAqxfM7Q.js";import"./preload-helper-PPVm8Dsz.js";import"./_isIterateeCall-D5s1XzZY.js";import"./eq-BfMl4R98.js";import"./isSymbol-d6VGNOms.js";import"./isArrayLike-CGt-7ZY7.js";import"./toFinite-DIpSmBgC.js";import"./toNumber-B8zT_HUj.js";const L="_selected_17mab_41",d={"tc-slider":"_tc-slider_17mab_2","tc-slider__handler":"_tc-slider__handler_17mab_9","tc-slider__value":"_tc-slider__value_17mab_12","tc-slider-captions":"_tc-slider-captions_17mab_19","tc-slider-captions-element":"_tc-slider-captions-element_17mab_27",selected:L,"tc-slider-rc-slider":"_tc-slider-rc-slider_17mab_50","tc-slider-rc-slider--track-greater-than":"_tc-slider-rc-slider--track-greater-than_17mab_75","tc-slider-rc-slider--track-exclusive":"_tc-slider-rc-slider--track-exclusive_17mab_76","tc-slider-rc-slider--track-equals":"_tc-slider-rc-slider--track-equals_17mab_83"},p={GREATER_THAN:"greaterThan",EQUALS:"equals",EXCLUSIVE:"exclusive"};function I(i){return i&&Array.isArray(i)&&i.length>1}function R(i,t,n,s){if(Array.isArray(s)||s===void 0)return-1;const l=(n-t)/(i.length-1);return Math.round(s/l)}function S(i,t,n){const s=(n-t)/(i-1),l=N(t,n,s);return l.push(n),l}function M(i,t,n,s,l,h){const a=S(i.length,n,s);return e.jsx("div",{className:m(d["tc-slider-captions"],"tc-slider-captions"),children:i.map((u,v)=>j.createElement(A,{tooltipPlacement:"bottom",...u,key:v,onClick:()=>t(a[v]),disabled:h},"children"in u?u.children||"":"label"in u?u.label:""))},"actions")}function q(i,t,n,s){if(I(i)){const l=R(i,t,n,s);return e.jsx("div",{className:m(d["tc-slider-captions"],"tc-slider-captions"),children:i.map((h,a)=>e.jsx("div",{className:m(d["tc-slider-captions-element"],"tc-slider-captions-element"),children:e.jsx(w,{name:h,className:m({[d.selected]:a===l},{selected:a===l})},a)},a))},"icons")}return null}function F(i,t,n,s){if(i>1){const l=S(i,n,s);return e.jsx("div",{className:m(d["tc-slider-captions"],"tc-slider-captions"),children:l.map((h,a)=>e.jsx("div",{className:m(d["tc-slider-captions-element"],"tc-slider-captions-element"),children:t(h)},a))},"captions")}return null}function D(i,t,n,s,l,h,a,u,v){return h?M(h,i,n,s,l,v):a?q(a,n,s,l):u?F(u,t,n,s):null}function W(i){function t(n,s){return e.jsxs("div",{className:d["tc-slider__handler"],children:[e.jsx("div",{className:d["tc-slider__value"],style:n.props.style,children:i?i(s?.value):null}),n]})}return t}const r=j.forwardRef(({id:i,value:t,captionActions:n,captionIcons:s,captionTextStepNumber:l,captionsFormat:h=x=>x,min:a=0,max:u=100,step:v=1,mode:g,onChange:C,disabled:f,hideTooltip:b,...k},E)=>{const x=W(h),_=t==null;return e.jsxs("div",{children:[e.jsx("div",{className:m(d["tc-slider"],"tc-slider"),children:e.jsx(T,{range:Array.isArray(t),defaultValue:_?void 0:0,value:t,min:a,max:u,step:v,handleRender:_||b?void 0:x,className:m(d["tc-slider-rc-slider"],{[d["tc-slider-rc-slider--track-equals"]]:g===p.EQUALS},{[d["tc-slider-rc-slider--track-exclusive"]]:g===p.EXCLUSIVE},{[d["tc-slider-rc-slider--track-greater-than"]]:g===p.GREATER_THAN},"tc-slider-rc-slider",{"tc-slider-rc-slider--track-equals":g===p.EQUALS},{"tc-slider-rc-slider--track-exclusive":g===p.EXCLUSIVE},{"tc-slider-rc-slider--track-greater-than":g===p.GREATER_THAN}),onChange:C,disabled:f,ref:E,...k})}),D(C,h,a,u,t,n,s,l,f)]})});r.displayName="Slider";r.MODES=p;const{action:c}=__STORYBOOK_MODULE_ACTIONS__,O=["talend-activity","talend-most-trusted","talend-network","talend-streams","talend-tdc-negative"],U={padding:"20px"},o={paddingTop:"25px",paddingBottom:"25px",borderBottom:"1px dashed grey"},V=[{id:"icon1",label:"Click Me",icon:"talend-smiley-angry","data-feature":"action",link:!0,hideLabel:!0},{id:"icon2",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon3",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0},{id:"icon4",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0},{id:"icon5",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0}],B=[{id:"icon1",children:"this is the worst entity",icon:"smiley-angry","data-feature":"slider-worst-entity"},{id:"icon2",children:"this is a bad entity",icon:"smiley-neutral","data-feature":"slider-bad-entity"},{id:"icon3",children:"this is a meh entity",icon:"smiley-satisfied","data-feature":"slider-meh-entity"},{id:"icon4",children:"this is a good entity",icon:"smiley-satisfied","data-feature":"slider-good-entity"},{id:"icon5",children:"this is the best entity",icon:"smiley-satisfied","data-feature":"slider-best-entity"}],G=i=>`${i}-test`,H=i=>`${Math.floor(i)}`,te={title:"Components/Form - Controls/Slider"},y=()=>e.jsx("section",{children:e.jsxs("div",{style:U,children:[e.jsxs("div",{style:o,children:[e.jsx("p",{children:"By default"}),e.jsx(r,{onChange:c("onChange")})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"With value"}),e.jsx(r,{onChange:c("onChange"),value:10})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"Greater than usage"}),e.jsx(r,{max:10,min:0,mode:"greaterThan",onChange:c("onChange"),value:3})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"Equals"}),e.jsx(r,{max:10,min:0,mode:"equals",onChange:c("onChange"),value:5})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"With disabled"}),e.jsx(r,{onChange:c("onChange"),disabled:!0})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"With value & format"}),e.jsx(r,{id:"selectable",onChange:c("onChange"),captionsFormat:G,value:10})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"With icons"}),e.jsx(r,{onChange:c("onChange"),captionIcons:O})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"with icon buttons"}),e.jsx(r,{onChange:c("onChange"),captionActions:V,value:50})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"with icon buttons from the DS "}),e.jsx(r,{onChange:c("onChange"),captionActions:B,value:50})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"with step number"}),e.jsx(r,{onChange:c("onChange"),value:25,captionTextStepNumber:5,captionsFormat:H})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"with range (inclusive)"}),e.jsx(r,{onChange:c("onChange"),min:0,max:100,value:[25,75],allowCross:!1})]}),e.jsxs("div",{style:o,children:[e.jsx("p",{children:"with range (exclusive)"}),e.jsx(r,{onChange:c("onChange"),min:0,max:100,mode:"exclusive",value:[25,75],allowCross:!1})]})]})});y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <section>
        <div style={style}>
            <div style={delimiterStyle}>
                <p>By default</p>
                <Slider onChange={action('onChange')} />
            </div>
            <div style={delimiterStyle}>
                <p>With value</p>
                <Slider onChange={action('onChange')} value={10} />
            </div>
            <div style={delimiterStyle}>
                <p>Greater than usage</p>
                <Slider max={10} min={0} mode="greaterThan" onChange={action('onChange')} value={3} />
            </div>
            <div style={delimiterStyle}>
                <p>Equals</p>
                <Slider max={10} min={0} mode="equals" onChange={action('onChange')} value={5} />
            </div>
            <div style={delimiterStyle}>
                <p>With disabled</p>
                <Slider onChange={action('onChange')} disabled />
            </div>
            <div style={delimiterStyle}>
                <p>With value & format</p>
                <Slider id="selectable" onChange={action('onChange')} captionsFormat={functionToFormat} value={10} />
            </div>
            <div style={delimiterStyle}>
                <p>With icons</p>
                <Slider onChange={action('onChange')} captionIcons={icons} />
            </div>
            <div style={delimiterStyle}>
                <p>with icon buttons</p>
                <Slider onChange={action('onChange')} captionActions={actions} value={50} />
            </div>
            <div style={delimiterStyle}>
                <p>with icon buttons from the DS </p>
                <Slider onChange={action('onChange')} captionActions={actionsDS} value={50} />
            </div>
            <div style={delimiterStyle}>
                <p>with step number</p>
                <Slider onChange={action('onChange')} value={25} captionTextStepNumber={5} captionsFormat={functionFormatFloor} />
            </div>
            <div style={delimiterStyle}>
                <p>with range (inclusive)</p>
                <Slider onChange={action('onChange')} min={0} max={100} value={[25, 75]} allowCross={false} />
            </div>
            <div style={delimiterStyle}>
                <p>with range (exclusive)</p>
                <Slider onChange={action('onChange')} min={0} max={100} mode="exclusive" value={[25, 75]} allowCross={false} />
            </div>
        </div>
    </section>`,...y.parameters?.docs?.source}}};const ne=["Default"];export{y as Default,ne as __namedExportsOrder,te as default};
