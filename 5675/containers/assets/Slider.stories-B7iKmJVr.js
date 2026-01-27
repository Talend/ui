import{I as S,r as g,P as h,e as p,j as t,aj as f,b as u}from"./iframe-CDk27K55.js";import{o as C}from"./omit-BQCIpMM7.js";import"./preload-helper-PPVm8Dsz.js";const l="value",c=new S.Map({[l]:void 0}),m="Container(Slider)";let x=class extends g.Component{static displayName=m;static propTypes={...p.propTypes,id:h.string,value:h.number};static defaultProps={value:0};constructor(e){super(e),this.onChange=this.onChange.bind(this),this.onAfterChange=this.onAfterChange.bind(this)}onAfterChange(e){this.props.onAfterChange&&this.props.onAfterChange(e)}onChange(e){this.props.setState(o=>o.state.set(l,e)),this.props.onChange&&this.props.onChange(e)}render(){const e=this.props.state||c,o={...C(this.props,p.INJECTED_PROPS),value:e.get(l,this.props.value),onChange:this.onChange,onAfterChange:this.onAfterChange};return t.jsx(f,{...o})}};const a=p({componentId:i=>i.id,defaultState:c,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(x);function y(i,e){return i.cmf.components.getIn([m,e],c)}function b(i,e){return y(i,e).get(l,"")}a.selectors={getComponentState:y,getValue:b};const v=["talend-smiley-angry","talend-smiley-unhappy","talend-smiley-neutral","talend-smiley-satisfied","talend-smiley-enthusiast"],s={paddingTop:"25px",paddingBottom:"25px",borderBottom:"1px dashed grey"},n={paddingLeft:"10px"},j=[{id:"icon1",label:"Click Me",icon:"talend-smiley-angry","data-feature":"action",link:!0,hideLabel:!0},{id:"icon2",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon3",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon4",label:"Click Me",icon:"talend-smiley-neutral","data-feature":"action",link:!0,hideLabel:!0},{id:"icon5",label:"Click Me",icon:"talend-smiley-satisfied","data-feature":"action",link:!0,hideLabel:!0}],A=i=>`${i}`,T=new u.Map,d=new u.Map({value:50}),I={title:"Slider"},r=()=>t.jsxs("div",{style:{padding:"0 0.75rem"},children:[t.jsxs("div",{style:s,children:[t.jsx("p",{style:n,children:"default"}),t.jsx(a,{id:"slider1",initialState:d})]}),t.jsxs("div",{style:s,children:[t.jsx("p",{style:n,children:"with some icons"}),t.jsx(a,{id:"slider2",captionIcons:v,initialState:T})]}),t.jsxs("div",{style:s,children:[t.jsx("p",{style:n,children:"with some actions icons"}),t.jsx(a,{id:"slider3",captionActions:j,initialState:d})]}),t.jsxs("div",{style:s,children:[t.jsx("p",{style:n,children:"with step number"}),t.jsx(a,{id:"slider4",initialState:d,captionsFormat:A,captionTextStepNumber:5})]})]});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <div style={{
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
    </div>`,...r.parameters?.docs?.source}}};const L=["Default"];export{r as Default,L as __namedExportsOrder,I as default};
