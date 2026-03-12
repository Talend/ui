import{r as y,P as c,b as d,j as t,ag as S}from"./iframe-BGftoB4z.js";import{o as g}from"./omit-DctsRtRD.js";import"./preload-helper-PPVm8Dsz.js";const l="value",p={[l]:void 0},h="Container(Slider)";let f=class extends y.Component{static displayName=h;static propTypes={...d.propTypes,id:c.string,value:c.number};static defaultProps={value:0};constructor(e){super(e),this.onChange=this.onChange.bind(this),this.onAfterChange=this.onAfterChange.bind(this)}onAfterChange(e){this.props.onAfterChange&&this.props.onAfterChange(e)}onChange(e){this.props.setState({[l]:e}),this.props.onChange&&this.props.onChange(e)}render(){const e=this.props.state||p,m={...g(this.props,d.INJECTED_PROPS),value:e?.[l]??this.props.value,onChange:this.onChange,onAfterChange:this.onAfterChange};return t.jsx(S,{...m})}};const s=d({componentId:i=>i.id,defaultState:p,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(f);function u(i,e){return i.cmf.components?.[h]?.[e]??p}function C(i,e){return u(i,e)?.[l]??""}s.selectors={getComponentState:u,getValue:C};const x=["talend-smiley-angry","talend-smiley-unhappy","talend-smiley-neutral","talend-smiley-satisfied","talend-smiley-enthusiast"],n={paddingTop:"25px",paddingBottom:"25px",borderBottom:"1px dashed grey"},a={paddingLeft:"10px"},v=[{id:"icon1",label:"Click Me",icon:"talend-smiley-angry","data-feature":"action",link:!0,hideLabel:!0},{id:"icon2",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon3",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon4",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon5",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0}],b=i=>`${i}`,j={},o={value:50},E={title:"Slider"},r=()=>t.jsxs("div",{style:{padding:"0 0.75rem"},children:[t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"default"}),t.jsx(s,{id:"slider1",initialState:o})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with some icons"}),t.jsx(s,{id:"slider2",captionIcons:x,initialState:j})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with some actions icons"}),t.jsx(s,{id:"slider3",captionActions:v,initialState:o})]}),t.jsxs("div",{style:n,children:[t.jsx("p",{style:a,children:"with step number"}),t.jsx(s,{id:"slider4",initialState:o,captionsFormat:b,captionTextStepNumber:5})]})]});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
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
    </div>`,...r.parameters?.docs?.source}}};const L=["Default"];export{r as Default,L as __namedExportsOrder,E as default};
