import{j as e,at as l,r as q}from"./iframe-BIQdka0S.js";import{A as K}from"./ActionButton.component-BsTHLteF.js";import"./transform-CLRdSQou.js";import{o as F}from"./omit-BJGUYW0v.js";import{I as J}from"./constants-CZYEPhht.js";import{a as Q}from"./translate-RgWSvZcG.js";import{S as y}from"./Skeleton.component-CvIHnOft.js";import{g as M}from"./theme-cRIqY071.js";import{w as ee}from"./withTranslation-C0c3WAs5.js";import{a as te}from"./arc-C8ymbxV7.js";import{A as ae}from"./Action.component-DlN2FB-s.js";import"./Actions.component-BlWGLWfC.js";import"./ActionIconToggle.component-BGI0SNww.js";import"./ActionSplitDropdown.component-YHa9OEXZ.js";import{O as T}from"./OverlayTrigger.component-BEmr1R_L.js";import{T as ie}from"./TooltipTrigger.component-D98QtRbU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D2ql4zSJ.js";import"./CircularProgress.component-CDahmhUX.js";import"./index-BmiDGyXa.js";import"./RootCloseWrapper-BE9og5Xq.js";import"./interopRequireDefault-CBIuXflU.js";import"./string-xuEJKGi6.js";import"./toString-BqfwYfrR.js";import"./isSymbol-dumj61Kg.js";import"./_baseSlice-C8dPXsaR.js";import"./_baseGet-DNbipbyJ.js";import"./eq-GFeXzubR.js";import"./_getTag-KdA_BnLc.js";import"./isArrayLike-C7prZ4fa.js";import"./path-B39wOLeq.js";import"./get-33mJQZqf.js";import"./DropdownButton-tYa3qFM7.js";import"./SplitButton-CQzMX6Mi.js";import"./inheritsLoose-BbyS8huE.js";import"./Popover-DqMnblOM.js";import"./Transition-aWEt4ZNO.js";import"./Transition-CZ1LJOWj.js";const re="_active_sevdy_74",O={"tc-pie-chart-loading":"_tc-pie-chart-loading_sevdy_20","tc-pie-chart-loading-no-label":"_tc-pie-chart-loading-no-label_sevdy_25","tc-pie-chart-loading-circle":"_tc-pie-chart-loading-circle_sevdy_28","tc-pie-chart-button":"_tc-pie-chart-button_sevdy_33","tc-pie-chart-color-rio-grande":"_tc-pie-chart-color-rio-grande_sevdy_33","tc-pie-chart-color-jaffa":"_tc-pie-chart-color-jaffa_sevdy_38","tc-pie-chart-color-chestnut-rose":"_tc-pie-chart-color-chestnut-rose_sevdy_43","tc-pie-chart-color-lightning-yellow":"_tc-pie-chart-color-lightning-yellow_sevdy_48","tc-pie-chart-color-dove-gray":"_tc-pie-chart-color-dove-gray_sevdy_53","tc-pie-chart-color-silver-chalice":"_tc-pie-chart-color-silver-chalice_sevdy_58","tc-pie-chart-color-alto":"_tc-pie-chart-color-alto_sevdy_63",active:re,"tc-pie-chart-icon":"_tc-pie-chart-icon_sevdy_87","tc-pie-chart-icon-graph":"_tc-pie-chart-icon-graph_sevdy_133","object-blink":"_object-blink_sevdy_1","skeleton-blink":"_skeleton-blink_sevdy_1"},m=M(O),h={MIN_SIZE:20,MAX_PERCENT:100,BASE_INNER_RADIUS:6,BASE_OUTER_RADIUS:9,BASE_PAD_ANGLE:.2,INNER_RADIUS_PER_PIXEL:.4,OUTER_RADIUS_PER_PIXEL:.45,PAD_ANGLE_PER_PIXEL:.0013},oe={small:20,medium:35,large:50,xlarge:80,xxlarge:100},X=te();function N(t){return t*2/100*Math.PI}function ne(t,a){return t?t[a]:{}}function le(t,a){return a.percentageShown-t.percentageShown}function se(t,a,i){const n=t.reduce((c,g)=>c+g.percentageShown,0);if(n>=h.MAX_PERCENT-i)return null;const r=X({innerRadius:a.innerRadius,outerRadius:a.outerRadius,padAngle:a.padAngle,startAngle:N(n),endAngle:Math.PI*2});return e.jsx("path",{className:m("tc-pie-chart-color-alto"),d:r,transform:`translate(${a.svgSize/2},${a.svgSize/2})`})}function ce(t,a,i){function n(r){i>0&&(r.percentageShown-=1,i-=1)}for(;i>0;){const r=t.filter(c=>c.percentageShown>a).sort(le);r.length>0?r.forEach(n):i=0}return t}function pe(t,a){if(!t)return[];let i=0;const n=t.map(r=>r.percentage&&r.percentage<a?(i+=a-r.percentage,{...r,percentageShown:a}):{...r,percentageShown:r.percentage});return ce(n,a,i)}function de(t,a){return t.reduce((i,n,r)=>r<a?i+n.percentageShown:i,0)}function he(t){return t>0&&t<1?{prefix:"< ",percentage:1}:t>99&&t<100?{prefix:"> ",percentage:99}:{prefix:"",percentage:Math.round(t)}}function me(t,a,i){if(!t&&a.percentage!=null){const{percentage:n,prefix:r}=he(a.percentage),c=i("PIE_CHART_PERCENTAGE",{defaultValue:"{{percentage}}%",percentage:n});return`${r}${c}`}return""}function ue(t,a,i,n){const r=de(i,a),c=X({innerRadius:n.innerRadius,outerRadius:n.outerRadius,padAngle:n.padAngle,startAngle:N(r),endAngle:N(r+t.percentageShown)});return e.jsx("path",{d:c,className:m(`tc-pie-chart-color-${t.color}`),transform:`translate(${n.svgSize/2},${n.svgSize/2})`},a)}function ge(t,a){let i=t;!i&&a&&(i=oe[a]);const n=i-h.MIN_SIZE;return{svgSize:i,innerRadius:parseInt(h.BASE_INNER_RADIUS+h.INNER_RADIUS_PER_PIXEL*n,10),outerRadius:parseInt(h.BASE_OUTER_RADIUS+h.OUTER_RADIUS_PER_PIXEL*n,10),padAngle:h.BASE_PAD_ANGLE-h.PAD_ANGLE_PER_PIXEL*n}}function E({display:t,hideLabel:a,labelIndex:i,loading:n,minimumPercentage:r,model:c,size:g,t:j,...w}){const p=ge(g,t);if(n)return e.jsxs("span",{className:m("tc-pie-chart-loading"),"aria-busy":"true","aria-label":j("PIE_CHART_LOADING",{defaultValue:"Loading chart"}),children:[e.jsx(y,{type:y.TYPES.circle,width:p.svgSize,height:p.svgSize,className:m("tc-pie-chart-loading-circle")}),!a&&e.jsx(y,{type:y.TYPES.text,size:y.SIZES.small})]});const _=ne(c,i),C=pe(c,r),x=F(w,["i18n","tReady"]);return e.jsxs("span",{className:m("tc-pie-chart-icon"),children:[e.jsxs("svg",{width:p.svgSize,height:p.svgSize,className:m("tc-pie-chart-icon-graph"),style:{width:p.svgSize,height:p.svgSize},...x,children:[C.map((L,A)=>ue(L,A,C,p)),se(C,p,r)]}),e.jsx("div",{className:m(`tc-pie-chart-color-${_.color}`),children:me(a,_,j)})]})}const B={display:l.oneOf(["small","medium","large","xlarge","xxlarge"]),hideLabel:l.bool,labelIndex:l.number,loading:l.bool,minimumPercentage:l.number,model:l.arrayOf(l.shape({color:l.oneOf(["rio-grande","chestnut-rose","lightning-yellow","dove-gray","silver-chalice","jaffa"]),percentage:l.number.isRequired}).isRequired),size:l.string};E.propTypes={...B,t:l.func};E.defaultProps={labelIndex:0,minimumPercentage:5,display:"small",t:Q()};E.displayName="PieChartIcon";const U=ee(J)(E),Ce=M(O);function xe(t,a,i,n,r){return i?e.jsx("span",{children:e.jsx(T,{trigger:"click",rootClose:!0,placement:a,overlay:e.jsx("div",{id:n,children:i}),ref:r,children:t})}):t}function z(t,a,i,n,r){return a||!t?null:c=>t(c,{action:{label:i,...n},model:r})}function I({available:t,buttonRef:a,className:i,display:n,hideLabel:r,label:c,labelIndex:g,loading:j,minimumPercentage:w,model:p,onClick:_,onMouseDown:C,overlayComponent:x,overlayId:L,overlayPlacement:A,overlayRef:$,size:V,...R}){if(!t)return null;const Y=z(_,x,c,R,p),H=z(C,x,c,R,p),Z=e.jsx(ae,{className:Ce("tc-pie-chart-button",i),onMouseDown:H,onClick:Y,buttonRef:a,bsStyle:"link",role:"button",...R,children:e.jsx(U,{display:n,hideLabel:r,labelIndex:g,loading:j,minimumPercentage:w,model:p,size:V})});return xe(Z,A,x,L,$)}I.propTypes={...B,available:l.bool,buttonRef:l.func,className:l.string,getComponent:l.func,label:l.string,onClick:l.func,onMouseDown:l.func,overlayComponent:l.element,overlayId:l.string,overlayPlacement:T.propTypes.placement,overlayRef:l.func};I.defaultProps={available:!0,overlayId:"pie-chart-popover",overlayPlacement:"bottom"};I.displayName="PieChartButton";function ye(t,a,i,n,r){return!t||!a?e.jsx(n,{...r}):e.jsx(ie,{label:a,tooltipPlacement:i,children:e.jsx("span",{children:e.jsx(n,{...r})})})}function je(t){return t?I:U}function o({tooltip:t,tooltipPlacement:a,...i}){return ye(t,i.label,a,je(i.onClick),i)}o.propTypes={label:l.string,onClick:l.func,tooltip:l.bool,tooltipPlacement:T.propTypes.placement};o.defaultProps={tooltipPlacement:"top"};o.displayName="PieChart";const{action:G}=__STORYBOOK_MODULE_ACTIONS__,s=[{color:"rio-grande",percentage:50},{color:"chestnut-rose",percentage:12},{color:"jaffa",percentage:1},{color:"dove-gray",percentage:4},{color:"silver-chalice",percentage:3}],u=[{color:"rio-grande",percentage:15},{color:"chestnut-rose",percentage:15},{color:"jaffa",percentage:60},{color:"dove-gray",percentage:2}],k=[{color:"dove-gray",percentage:0}],W=[20,22,25,30,35,40,45,50],d=G("You clicked me"),_e=G("You mousedown me"),fe=e.jsx("div",{children:"I am an overlay"}),nt={title:"Components/Dataviz/PieChart"},f=()=>e.jsxs("div",{children:[e.jsx("p",{children:"Small :"}),e.jsx(o,{display:"small",model:s}),e.jsx("p",{children:"custom size"}),e.jsx(o,{size:25,model:s}),e.jsx("p",{children:"Medium :"}),e.jsx(o,{display:"medium",model:s}),e.jsx("p",{children:"Large : "}),e.jsx(o,{display:"large",model:s}),e.jsx("p",{children:"X-Large : "}),e.jsx(o,{display:"xlarge",model:s}),e.jsx("p",{children:"XX-Large : "}),e.jsx(o,{display:"xxlarge",model:s}),e.jsx("p",{children:"with other data :"}),e.jsx(o,{display:"medium",model:u}),e.jsx("p",{children:"without label :"}),e.jsx(o,{display:"medium",model:u,hideLabel:!0}),e.jsx("p",{children:"without label to 0% :"}),e.jsx(o,{display:"medium",model:k}),e.jsx("p",{children:"with tooltip :"}),e.jsx(o,{display:"medium",model:k,tooltip:!0,label:"This is a tooltip",tooltipPlacement:"right"})]}),P=()=>{const t=[{color:"rio-grande",percentage:99.2},{color:"chestnut-rose",percentage:.8}];return e.jsxs("div",{children:[e.jsx("p",{children:" Greater than 99% :"}),e.jsx(o,{display:"medium",model:t}),e.jsx("p",{children:" Less than 1% :"}),e.jsx(o,{display:"medium",model:t,labelIndex:1})]})},v=()=>e.jsx("div",{children:W.map(t=>e.jsxs("div",{children:[e.jsxs("p",{children:[t,"px"]}),e.jsx(o,{size:t,model:s})]},t))}),S=()=>e.jsx("div",{children:e.jsx("div",{children:W.map(t=>e.jsxs("div",{children:[e.jsxs("p",{children:[t,"px"]}),e.jsx(o,{loading:!0,size:t,model:s})]},t))})}),b=()=>e.jsxs("div",{children:[e.jsx("p",{children:"Small :"}),e.jsx(o,{display:"small",model:s,onClick:d}),e.jsx("p",{children:"custom size"}),e.jsx(o,{size:25,model:s,onClick:d}),e.jsx("p",{children:"Medium :"}),e.jsx(o,{display:"medium",model:s,onClick:d,onMouseDown:_e}),e.jsx("p",{children:"Large : "}),e.jsx(o,{display:"large",model:s,onClick:d}),e.jsx("p",{children:"with other data :"}),e.jsx(o,{display:"medium",model:u,onClick:d}),e.jsx("p",{children:"without label :"}),e.jsx(o,{display:"medium",model:u,onClick:d,hideLabel:!0}),e.jsx("p",{children:"without label to 0% :"}),e.jsx(o,{display:"medium",model:k,onClick:d}),e.jsx("p",{children:"with overlay component"}),e.jsx(o,{display:"medium",labelIndex:2,model:u,overlayComponent:fe,overlayId:"id-popover",onClick:d}),e.jsx("p",{children:"with a tooltip"}),e.jsx(o,{display:"medium",model:u,label:"this is a tooltip",tooltip:!0,tooltipPlacement:"right",onClick:d})]}),D=()=>{class t extends q.Component{constructor(){super(),this.changeState=this.changeState.bind(this),this.state={loading:!0}}changeState(){this.setState(i=>({loading:!i.loading}))}render(){return e.jsxs("div",{children:[e.jsx(K,{label:"changestatus",onClick:this.changeState}),e.jsx("p",{children:"Small :"}),e.jsx(o,{display:"small",model:s,loading:this.state.loading}),e.jsx("p",{children:"Medium :"}),e.jsx(o,{display:"medium",model:s,loading:this.state.loading}),e.jsx("p",{children:"Large :"}),e.jsx(o,{display:"large",model:s,loading:this.state.loading}),e.jsx("p",{children:"Small without label:"}),e.jsx(o,{display:"small",hideLabel:!0,model:s,loading:this.state.loading}),e.jsx("p",{children:"Medium without label:"}),e.jsx(o,{display:"medium",hideLabel:!0,model:s,loading:this.state.loading}),e.jsx("p",{children:"Large without label:"}),e.jsx(o,{display:"large",hideLabel:!0,model:s,loading:this.state.loading}),e.jsx("p",{children:"after large"})]})}}return e.jsx(t,{})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => <div>
        <p>Small :</p>
        <PieChart display="small" model={pieChartData1} />
        <p>custom size</p>
        <PieChart size={25} model={pieChartData1} />
        <p>Medium :</p>
        <PieChart display="medium" model={pieChartData1} />
        <p>Large : </p>
        <PieChart display="large" model={pieChartData1} />
        <p>X-Large : </p>
        <PieChart display="xlarge" model={pieChartData1} />
        <p>XX-Large : </p>
        <PieChart display="xxlarge" model={pieChartData1} />
        <p>with other data :</p>
        <PieChart display="medium" model={pieChartData2} />
        <p>without label :</p>
        <PieChart display="medium" model={pieChartData2} hideLabel />
        <p>without label to 0% :</p>
        <PieChart display="medium" model={pieChartData3} />
        <p>with tooltip :</p>
        <PieChart display="medium" model={pieChartData3} tooltip label="This is a tooltip" tooltipPlacement="right" />
    </div>`,...f.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const pieChartDataEdge1 = [{
    color: 'rio-grande',
    percentage: 99.2
  }, {
    color: 'chestnut-rose',
    percentage: 0.8
  }];
  return <div>
            <p> Greater than 99% :</p>
            <PieChart display="medium" model={pieChartDataEdge1} />
            <p> Less than 1% :</p>
            <PieChart display="medium" model={pieChartDataEdge1} labelIndex={1} />
        </div>;
}`,...P.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => <div>
        {sizes.map(size => <div key={size}>
                <p>{size}px</p>
                <PieChart size={size} model={pieChartData1} />
            </div>)}
    </div>`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <div>
        <div>
            {sizes.map(size => <div key={size}>
                    <p>{size}px</p>
                    <PieChart loading size={size} model={pieChartData1} />
                </div>)}
        </div>
    </div>`,...S.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <div>
        <p>Small :</p>
        <PieChart display="small" model={pieChartData1} onClick={onClick} />
        <p>custom size</p>
        <PieChart size={25} model={pieChartData1} onClick={onClick} />
        <p>Medium :</p>
        <PieChart display="medium" model={pieChartData1} onClick={onClick} onMouseDown={onMouseDown} />
        <p>Large : </p>
        <PieChart display="large" model={pieChartData1} onClick={onClick} />
        <p>with other data :</p>
        <PieChart display="medium" model={pieChartData2} onClick={onClick} />
        <p>without label :</p>
        <PieChart display="medium" model={pieChartData2} onClick={onClick} hideLabel />
        <p>without label to 0% :</p>
        <PieChart display="medium" model={pieChartData3} onClick={onClick} />
        <p>with overlay component</p>
        <PieChart display="medium" labelIndex={2} model={pieChartData2} overlayComponent={overlayComponent} overlayId="id-popover" onClick={onClick} />
        <p>with a tooltip</p>
        <PieChart display="medium" model={pieChartData2} label="this is a tooltip" tooltip tooltipPlacement="right" onClick={onClick} />
    </div>`,...b.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  class WithLayout extends Component {
    constructor() {
      super();
      this.changeState = this.changeState.bind(this);
      this.state = {
        loading: true
      };
    }
    changeState() {
      this.setState(prevState => ({
        loading: !prevState.loading
      }));
    }
    render() {
      return <div>
                    <ActionButton label="changestatus" onClick={this.changeState} />
                    <p>Small :</p>
                    <PieChart display="small" model={pieChartData1} loading={this.state.loading} />
                    <p>Medium :</p>
                    <PieChart display="medium" model={pieChartData1} loading={this.state.loading} />
                    <p>Large :</p>
                    <PieChart display="large" model={pieChartData1} loading={this.state.loading} />
                    <p>Small without label:</p>
                    <PieChart display="small" hideLabel model={pieChartData1} loading={this.state.loading} />
                    <p>Medium without label:</p>
                    <PieChart display="medium" hideLabel model={pieChartData1} loading={this.state.loading} />
                    <p>Large without label:</p>
                    <PieChart display="large" hideLabel model={pieChartData1} loading={this.state.loading} />
                    <p>after large</p>
                </div>;
    }
  }
  return <WithLayout />;
}`,...D.parameters?.docs?.source}}};const lt=["PieChartIconDefault","PieChartsWithEdgeValues","PieChartLotOfSizes","PieChartLotOfLoading","PieChartButtonDefault","LoadingState"];export{D as LoadingState,b as PieChartButtonDefault,f as PieChartIconDefault,S as PieChartLotOfLoading,v as PieChartLotOfSizes,P as PieChartsWithEdgeValues,lt as __namedExportsOrder,nt as default};
