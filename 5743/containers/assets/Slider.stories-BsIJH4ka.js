import{M as c,r as S,P as u,b as p,j as t,ak as g}from"./iframe-ZVrP7biW.js";import{o as f}from"./omit-DgkYMm4S.js";import"./preload-helper-PPVm8Dsz.js";const l="value",h=new c({[l]:void 0}),m="Container(Slider)";let C=class extends S.Component{static displayName=m;static propTypes={...p.propTypes,id:u.string,value:u.number};static defaultProps={value:0};constructor(e){super(e),this.onChange=this.onChange.bind(this),this.onAfterChange=this.onAfterChange.bind(this)}onAfterChange(e){this.props.onAfterChange&&this.props.onAfterChange(e)}onChange(e){this.props.setState(o=>o.state.set(l,e)),this.props.onChange&&this.props.onChange(e)}render(){const e=this.props.state||h,o={...f(this.props,p.INJECTED_PROPS),value:e.get(l,this.props.value),onChange:this.onChange,onAfterChange:this.onAfterChange};return t.jsx(g,{...o})}};const s=p({componentId:i=>i.id,defaultState:h,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(C);function y(i,e){return i.cmf.components.getIn([m,e],h)}function x(i,e){return y(i,e).get(l,"")}s.selectors={getComponentState:y,getValue:x};const v=["talend-smiley-angry","talend-smiley-unhappy","talend-smiley-neutral","talend-smiley-satisfied","talend-smiley-enthusiast"],n={paddingTop:"25px",paddingBottom:"25px",borderBottom:"1px dashed grey"},a={paddingLeft:"10px"},b=[{id:"icon1",label:"Click Me",icon:"talend-smiley-angry","data-feature":"action",link:!0,hideLabel:!0},{id:"icon2",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon3",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon4",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon5",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0}],j=i=>`${i}`,A=new c,d=new c({value:50}),L={title:"Slider"},r=()=>t.jsxs("div",{style:{padding:"0 0.75rem"},children:[t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"default"}),t.jsx(s,{id:"slider1",initialState:d})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with some icons"}),t.jsx(s,{id:"slider2",captionIcons:v,initialState:A})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with some actions icons"}),t.jsx(s,{id:"slider3",captionActions:b,initialState:d})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with step number"}),t.jsx(s,{id:"slider4",initialState:d,captionsFormat:j,captionTextStepNumber:5})]})]});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '0 0.75rem'
}}>
        <div style={delimiterStyle}>
            <p style={paragraphStyle}>default</p>
            <Slider id="slider1" initialState={initialState} />
        </div>
        <div style={delimiterStyle}>
            <p style={paragraphStyle}>with some icons</p>
            <Slider id="slider2" captionIcons={icons} initialState={nullState} />
        </div>
        <div style={delimiterStyle}>
            <p style={paragraphStyle}>with some actions icons</p>
            <Slider id="slider3" captionActions={actions} initialState={initialState} />
        </div>
        <div style={delimiterStyle}>
            <p style={paragraphStyle}>with step number</p>
            <Slider id="slider4" initialState={initialState} captionsFormat={functionToFormat} captionTextStepNumber={5} />
        </div>
    </div>`,...r.parameters?.docs?.source}}};const M=["Default"];export{r as Default,M as __namedExportsOrder,L as default};
