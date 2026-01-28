import{q as S,r as et,j as d,c as F,a4 as b,a0 as it,a1 as bt,S as St,n as Lt}from"./iframe-D37Phr64.js";import{S as kt}from"./StackItem-DjDOnEFa.js";import{T as Ct}from"./Tooltip.component-DBYb0Br2.js";import{X as dt,Y as rt,R as Ot,C as At}from"./YAxis-SAr11CXU.js";import{E as Dt,L as tt,C as _t,A as wt,d as jt,e as pt,G as Tt,z as st,f as Pt,j as It,i as Et,D as Ut}from"./generateCategoricalChart-Ccm3VWy9.js";import{i as zt,c as lt,D as Wt,n as Nt,f as R,b as M,C as Ft,u as $t}from"./Dot-CypkQi77.js";import{i as nt}from"./isNil-BEvy3S_S.js";import{i as Bt}from"./_baseIteratee-c3XEwa63.js";import"./preload-helper-PPVm8Dsz.js";import"./get-90MRQFNM.js";import"./_baseGet-BdbJtFQK.js";import"./toString-DU9ul6dr.js";import"./isSymbol-DOqcnDfM.js";import"./eq-Oi8weurB.js";import"./range-D18HFkZe.js";import"./_isIterateeCall-e0hMYX5g.js";import"./isArrayLike-B6M8JwQg.js";import"./toFinite-BumeZVHV.js";import"./toNumber-IBqixyL0.js";import"./_setToString-BzqI9MrB.js";import"./_getTag-3_YbZVhb.js";import"./map-Cj9MOAbd.js";import"./_baseUniq-CadV2y1D.js";import"./_baseFindIndex-BoTWL3gD.js";import"./noop-BdyXNs-O.js";import"./debounce-BFlNRUwm.js";import"./last-D5tJbS0F.js";import"./path-B39wOLeq.js";import"./linear-BUPp6Ss9.js";import"./string-xuEJKGi6.js";import"./time-Bxxu2oqH.js";import"./isObject-CIuTZrJA.js";import"./findIndex-BS6vzQtT.js";import"./toInteger-Q60EgPSW.js";import"./memoize-DDa3CULr.js";import"./isString-CYF6p357.js";import"./_mapToArray-Dr1Ktip_.js";import"./_hasPath-DRs0yx8e.js";var Mt=["type","layout","connectNulls","ref"],Yt=["key"];function $(t){"@babel/helpers - typeof";return $=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$(t)}function ct(t,e){if(t==null)return{};var n=qt(t,e),r,o;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(o=0;o<s.length;o++)r=s[o],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function qt(t,e){if(t==null)return{};var n={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;n[r]=t[r]}return n}function Y(){return Y=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Y.apply(this,arguments)}function ut(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(t,o).enumerable})),n.push.apply(n,r)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ut(Object(n),!0).forEach(function(r){_(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ut(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function N(t){return Kt(t)||Gt(t)||Vt(t)||Rt()}function Rt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Vt(t,e){if(t){if(typeof t=="string")return ot(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ot(t,e)}}function Gt(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Kt(t){if(Array.isArray(t))return ot(t)}function ot(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function Ht(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ht(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,ft(r.key),r)}}function Xt(t,e,n){return e&&ht(t.prototype,e),n&&ht(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function Jt(t,e,n){return e=Z(e),Qt(t,mt()?Reflect.construct(e,n||[],Z(t).constructor):e.apply(t,n))}function Qt(t,e){if(e&&($(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Zt(t)}function Zt(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function mt(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(mt=function(){return!!t})()}function Z(t){return Z=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},Z(t)}function te(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&at(t,e)}function at(t,e){return at=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},at(t,e)}function _(t,e,n){return e=ft(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ft(t){var e=ee(t,"string");return $(e)=="symbol"?e:e+""}function ee(t,e){if($(t)!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if($(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}var q=(function(t){function e(){var n;Ht(this,e);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return n=Jt(this,e,[].concat(o)),_(n,"state",{isAnimationFinished:!0,totalLength:0}),_(n,"generateSimpleStrokeDasharray",function(a,l){return"".concat(l,"px ").concat(a-l,"px")}),_(n,"getStrokeDasharray",function(a,l,p){var f=p.reduce(function(L,A){return L+A});if(!f)return n.generateSimpleStrokeDasharray(l,a);for(var v=Math.floor(a/f),u=a%f,y=l-a,i=[],c=0,h=0;c<p.length;h+=p[c],++c)if(h+p[c]>u){i=[].concat(N(p.slice(0,c)),[u-h]);break}var x=i.length%2===0?[0,y]:[y];return[].concat(N(e.repeat(p,v)),N(i),x).map(function(L){return"".concat(L,"px")}).join(", ")}),_(n,"id",$t("recharts-line-")),_(n,"pathRef",function(a){n.mainCurve=a}),_(n,"handleAnimationEnd",function(){n.setState({isAnimationFinished:!0}),n.props.onAnimationEnd&&n.props.onAnimationEnd()}),_(n,"handleAnimationStart",function(){n.setState({isAnimationFinished:!1}),n.props.onAnimationStart&&n.props.onAnimationStart()}),n}return te(e,t),Xt(e,[{key:"componentDidMount",value:function(){if(this.props.isAnimationActive){var r=this.getTotalLength();this.setState({totalLength:r})}}},{key:"componentDidUpdate",value:function(){if(this.props.isAnimationActive){var r=this.getTotalLength();r!==this.state.totalLength&&this.setState({totalLength:r})}}},{key:"getTotalLength",value:function(){var r=this.mainCurve;try{return r&&r.getTotalLength&&r.getTotalLength()||0}catch{return 0}}},{key:"renderErrorBar",value:function(r,o){if(this.props.isAnimationActive&&!this.state.isAnimationFinished)return null;var s=this.props,a=s.points,l=s.xAxis,p=s.yAxis,f=s.layout,v=s.children,u=Nt(v,Dt);if(!u)return null;var y=function(h,x){return{x:h.x,y:h.y,value:h.value,errorVal:pt(h.payload,x)}},i={clipPath:r?"url(#clipPath-".concat(o,")"):null};return S.createElement(tt,i,u.map(function(c){return S.cloneElement(c,{key:"bar-".concat(c.props.dataKey),data:a,xAxis:l,yAxis:p,layout:f,dataPointFormatter:y})}))}},{key:"renderDots",value:function(r,o,s){var a=this.props.isAnimationActive;if(a&&!this.state.isAnimationFinished)return null;var l=this.props,p=l.dot,f=l.points,v=l.dataKey,u=R(this.props,!1),y=R(p,!0),i=f.map(function(h,x){var L=C(C(C({key:"dot-".concat(x),r:3},u),y),{},{index:x,cx:h.x,cy:h.y,value:h.value,dataKey:v,payload:h.payload,points:f});return e.renderDotItem(p,L)}),c={clipPath:r?"url(#clipPath-".concat(o?"":"dots-").concat(s,")"):null};return S.createElement(tt,Y({className:"recharts-line-dots",key:"dots"},c),i)}},{key:"renderCurveStatically",value:function(r,o,s,a){var l=this.props,p=l.type,f=l.layout,v=l.connectNulls;l.ref;var u=ct(l,Mt),y=C(C(C({},R(u,!0)),{},{fill:"none",className:"recharts-line-curve",clipPath:o?"url(#clipPath-".concat(s,")"):null,points:r},a),{},{type:p,layout:f,connectNulls:v});return S.createElement(_t,Y({},y,{pathRef:this.pathRef}))}},{key:"renderCurveWithAnimation",value:function(r,o){var s=this,a=this.props,l=a.points,p=a.strokeDasharray,f=a.isAnimationActive,v=a.animationBegin,u=a.animationDuration,y=a.animationEasing,i=a.animationId,c=a.animateNewValues,h=a.width,x=a.height,L=this.state,A=L.prevPoints,P=L.totalLength;return S.createElement(wt,{begin:v,duration:u,isActive:f,easing:y,from:{t:0},to:{t:1},key:"line-".concat(i),onAnimationEnd:this.handleAnimationEnd,onAnimationStart:this.handleAnimationStart},function(k){var D=k.t;if(A){var I=A.length/l.length,w=l.map(function(g,j){var T=Math.floor(j*I);if(A[T]){var B=A[T],W=M(B.x,g.x),vt=M(B.y,g.y);return C(C({},g),{},{x:W(D),y:vt(D)})}if(c){var gt=M(h*2,g.x),xt=M(x/2,g.y);return C(C({},g),{},{x:gt(D),y:xt(D)})}return C(C({},g),{},{x:g.x,y:g.y})});return s.renderCurveStatically(w,r,o)}var z=M(0,P),U=z(D),m;if(p){var E="".concat(p).split(/[,\s]+/gim).map(function(g){return parseFloat(g)});m=s.getStrokeDasharray(U,P,E)}else m=s.generateSimpleStrokeDasharray(P,U);return s.renderCurveStatically(l,r,o,{strokeDasharray:m})})}},{key:"renderCurve",value:function(r,o){var s=this.props,a=s.points,l=s.isAnimationActive,p=this.state,f=p.prevPoints,v=p.totalLength;return l&&a&&a.length&&(!f&&v>0||!Bt(f,a))?this.renderCurveWithAnimation(r,o):this.renderCurveStatically(a,r,o)}},{key:"render",value:function(){var r,o=this.props,s=o.hide,a=o.dot,l=o.points,p=o.className,f=o.xAxis,v=o.yAxis,u=o.top,y=o.left,i=o.width,c=o.height,h=o.isAnimationActive,x=o.id;if(s||!l||!l.length)return null;var L=this.state.isAnimationFinished,A=l.length===1,P=lt("recharts-line",p),k=f&&f.allowDataOverflow,D=v&&v.allowDataOverflow,I=k||D,w=nt(x)?this.id:x,z=(r=R(a,!1))!==null&&r!==void 0?r:{r:3,strokeWidth:2},U=z.r,m=U===void 0?3:U,E=z.strokeWidth,g=E===void 0?2:E,j=Ft(a)?a:{},T=j.clipDot,B=T===void 0?!0:T,W=m*2+g;return S.createElement(tt,{className:P},k||D?S.createElement("defs",null,S.createElement("clipPath",{id:"clipPath-".concat(w)},S.createElement("rect",{x:k?y:y-i/2,y:D?u:u-c/2,width:k?i:i*2,height:D?c:c*2})),!B&&S.createElement("clipPath",{id:"clipPath-dots-".concat(w)},S.createElement("rect",{x:y-W/2,y:u-W/2,width:i+W,height:c+W}))):null,!A&&this.renderCurve(I,w),this.renderErrorBar(I,w),(A||a)&&this.renderDots(I,B,w),(!h||L)&&jt.renderCallByParent(this.props,l))}}],[{key:"getDerivedStateFromProps",value:function(r,o){return r.animationId!==o.prevAnimationId?{prevAnimationId:r.animationId,curPoints:r.points,prevPoints:o.curPoints}:r.points!==o.curPoints?{curPoints:r.points}:null}},{key:"repeat",value:function(r,o){for(var s=r.length%2!==0?[].concat(N(r),[0]):r,a=[],l=0;l<o;++l)a=[].concat(N(a),N(s));return a}},{key:"renderDotItem",value:function(r,o){var s;if(S.isValidElement(r))s=S.cloneElement(r,o);else if(zt(r))s=r(o);else{var a=o.key,l=ct(o,Yt),p=lt("recharts-line-dot",typeof r!="boolean"?r.className:"");s=S.createElement(Wt,Y({key:a},l,{className:p}))}return s}}])})(et.PureComponent);_(q,"displayName","Line");_(q,"defaultProps",{xAxisId:0,yAxisId:0,connectNulls:!1,activeDot:!0,dot:!0,legendType:"line",stroke:"#3182bd",strokeWidth:1,fill:"#fff",points:[],isAnimationActive:!Tt.isSsr,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",hide:!1,label:!1});_(q,"getComposedData",function(t){var e=t.props,n=t.xAxis,r=t.yAxis,o=t.xAxisTicks,s=t.yAxisTicks,a=t.dataKey,l=t.bandSize,p=t.displayedData,f=t.offset,v=e.layout,u=p.map(function(y,i){var c=pt(y,a);return v==="horizontal"?{x:st({axis:n,ticks:o,bandSize:l,entry:y,index:i}),y:nt(c)?null:r.scale(c),value:c,payload:y}:{x:nt(c)?null:n.scale(c),y:st({axis:r,ticks:s,bandSize:l,entry:y,index:i}),value:c,payload:y}});return C({points:u,layout:v},f)});var re=Pt({chartName:"LineChart",GraphicalChild:q,axisComponents:[{axisType:"xAxis",AxisComp:dt},{axisType:"yAxis",AxisComp:rt}],formatAxisMap:It});const ne="_container_4ppsq_1",O={container:ne,"line-chart-custom-tooltip":"_line-chart-custom-tooltip_4ppsq_8","line-chart-custom-tooltip__line-item--inactive":"_line-chart-custom-tooltip__line-item--inactive_4ppsq_13","line-chart-custom-tooltip__line-value":"_line-chart-custom-tooltip__line-value_4ppsq_16","line-chart-custom-legend":"_line-chart-custom-legend_4ppsq_20","line-chart-custom-legend-item":"_line-chart-custom-legend-item_4ppsq_28","line-chart-custom-legend--align-left":"_line-chart-custom-legend--align-left_4ppsq_34","line-chart-custom-legend--align-center":"_line-chart-custom-legend--align-center_4ppsq_37","line-chart-custom-legend--align-right":"_line-chart-custom-legend--align-right_4ppsq_40","line-chart-custom-legend--shift-left":"_line-chart-custom-legend--shift-left_4ppsq_43","line-chart-custom-legend__button--selection-enabled":"_line-chart-custom-legend__button--selection-enabled_4ppsq_46","line-chart-custom-legend__button--selected":"_line-chart-custom-legend__button--selected_4ppsq_49","line-chart-custom-legend__button--inactive":"_line-chart-custom-legend__button--inactive_4ppsq_55","line-chart-custom-legend__line-label":"_line-chart-custom-legend__line-label_4ppsq_58","line-chart-line-icon":"_line-chart-line-icon_4ppsq_63"},oe=(t,e)=>e?`repeating-linear-gradient(to right, ${t} 0, ${t} 7px,transparent 6px,transparent 9px)`:t,yt=({color:t,dashed:e=!1})=>d.jsx("div",{className:F(O["line-chart-line-icon"]),style:{background:oe(t,e)}}),ae=({active:t,payload:e,label:n,external:r})=>{const{linesConfig:o,leftUnit:s,rightUnit:a,xformatter:l,showInactives:p}=r,f=i=>i==="right"?a:s,v=(i,c)=>{const h=i.find(x=>x.dataKey===c.key).value;return c.tooltipFormatter?c.tooltipFormatter(h):h},u=n&&l?l(n):n,y=p?o:o.filter(i=>i.status!=="inactive");return t&&e?.length?d.jsx(Ct,{title:u,children:d.jsx("ul",{className:O["line-chart-custom-tooltip"],children:y.map(i=>d.jsxs("li",{id:`tooltip_item_${i.key}`,className:F({[O["line-chart-custom-tooltip__line-item--inactive"]]:i?.status==="inactive"}),children:[d.jsx(yt,{color:i.color,dashed:i?.dashed}),d.jsx("span",{children:i.tooltipLabel??i.key}),":",d.jsx("span",{className:F(O["line-chart-custom-tooltip__line-value"]),children:v(e,i)}),d.jsx("span",{children:f(i.axis)})]},i.key))})}):null},ie=({payload:t,external:e,hasLineSelection:n,selection:r,onLegendClicked:o=()=>{},onLegendHovered:s=()=>{}})=>{const{linesConfig:a,align:l,showInactives:p,isRightAxisDisplayed:f}=e,v=p?a:a.filter(u=>u.status!=="inactive");return t?.length?d.jsx("ul",{className:F(O["line-chart-custom-legend"],O[`line-chart-custom-legend--align-${l||"right"}`],{[O["line-chart-custom-legend--shift-left"]]:f}),children:v.map(u=>d.jsx("li",{children:d.jsxs("div",{"data-testid":`legend_item_${u.key}`,className:F(O["line-chart-custom-legend-item"],{[O["line-chart-custom-legend__button--selection-enabled"]]:n,[O["line-chart-custom-legend__button--selected"]]:r.includes(u.key),[O["line-chart-custom-legend__button--inactive"]]:u?.status==="inactive"}),role:"button",onClick:()=>o(u.key),onKeyPress:()=>o(u.key),onMouseEnter:()=>s(u.key),onMouseLeave:()=>s(""),tabIndex:0,children:[d.jsx(yt,{color:u.color,dashed:u?.dashed}),d.jsx("span",{className:F(O["line-chart-custom-legend__line-label"]),children:u.legendLabel??u.key})]})},u.key))}):null};function se({data:t,lines:e,chartOptions:n,hasLineSelection:r,initialSelectedLines:o=[],onLineClicked:s=()=>{},onLineHovered:a=()=>{},onLegendItemClicked:l=()=>{},onLegendItemHovered:p=()=>{}}){const{width:f,height:v,margin:u,showGridLines:y,xAxisOptions:i,leftYAxisOptions:c,rightYAxisOptions:h,legend:x,tooltip:L}=n,[A,P]=et.useState(null),[k,D]=et.useState(o),I=t?.length===1,w=(m,E)=>{const g=I?2:0,j=I?4:0,T={light:{strokeWidth:1,strokeOpacity:1,activeDot:{r:3,strokeWidth:0}},active:{strokeWidth:2,strokeOpacity:1,activeDot:{r:5,strokeWidth:0}},inactive:{strokeWidth:2,strokeOpacity:.25,activeDot:{r:0,strokeWidth:0}},highlighted:{strokeWidth:3,strokeOpacity:1,activeDot:{r:6,strokeWidth:0}}};return r&&k.length>0?{dot:{r:g,strokeWidth:j},...T[m],strokeOpacity:k.includes(E)?1:.25}:A!==null?{dot:{r:g,strokeWidth:j},...T[m],strokeOpacity:A===E?1:.25}:{dot:{r:g,strokeWidth:j},...T[m]}},z=m=>{if(r){const g=k.includes(m)?k.filter(j=>j!==m):[...k,m];D(g.length===e.length?[]:g)}l(m)},U=m=>{p&&p(m),P(m===""?null:m)};return d.jsx(d.Fragment,{children:d.jsx(Ot,{width:f||"100%",height:v||"100%",debounce:1,children:d.jsxs(re,{data:t,margin:u||{},className:O.container,children:[!!y&&d.jsx(At,{stroke:b.coralColorNeutralBackgroundMedium,strokeDasharray:"2",vertical:!1}),d.jsx(dt,{dataKey:"xLabel",interval:i?.interval,dx:i?.horizontalOffset,dy:i?.verticalOffset,allowDataOverflow:i?.clipDomain,ticks:i?.manualTicks,tickLine:!1,tickFormatter:i?.formatter,domain:i?.domain,type:i?.type}),d.jsx(rt,{yAxisId:"left",type:c?.type,domain:c?.domain,unit:c?.hideUnitInAxis?"":c?.unit,interval:c?.manualTicks?void 0:"preserveEnd",dx:c?.horizontalOffset,dy:c?.verticalOffset,minTickGap:2,tickCount:c?.manualTicks?void 0:6,ticks:c?.manualTicks,tickLine:!!c?.tickLine,tickFormatter:c?.formatter}),d.jsx(rt,{hide:h?.hide!==!1,yAxisId:"right",orientation:"right",type:h?.type,domain:h?.domain,unit:h?.hideUnitInAxis?"":h?.unit,interval:h?.manualTicks?void 0:"preserveEnd",dx:h?.horizontalOffset,dy:h?.verticalOffset,minTickGap:2,tickCount:h?.manualTicks?void 0:6,ticks:h?.manualTicks,tickLine:!!h?.tickLine,tickFormatter:h?.formatter}),!L?.hide&&d.jsx(Et,{content:d.jsx(ae,{external:{linesConfig:e,xformatter:i?.tooltipFormatter||i?.formatter,leftUnit:c?.unit,rightUnit:h?.unit,showInactives:L?.showInnactives}})}),!x?.hide&&d.jsx(Ut,{verticalAlign:x?.verticalAlign||"bottom",content:d.jsx(ie,{external:{linesConfig:e,align:x?.horizontalAlign||"right",showInactives:x?.showInactives,isRightAxisDisplayed:h?.hide===!1},selection:k,hasLineSelection:r,onLegendClicked:z,onLegendHovered:U})}),e.map(m=>d.jsx(q,{id:`line_${m.key}`,yAxisId:m.axis||"left",dataKey:m.key,stroke:m.color,type:"monotone",strokeDasharray:m?.dashed?"17 4":"",connectNulls:!0,animationDuration:300,...w(m?.status||"active",m.key),onClick:()=>s(m.key),onMouseEnter:()=>a(m.key),onMouseLeave:()=>a("")},m.key))]})})})}const Ke={title:"Dataviz/LineChart",component:se,decorators:[t=>d.jsx("div",{style:{height:300,width:600},children:d.jsx(t,{})})],parameters:{docs:{description:{component:"A curve type chart based on the [LineChart component](https://recharts.org/en-US/api/LineChart) of [Recharts ](https://recharts.org/en-US)"}},chromatic:{diffThreshold:.6}}},V={args:{chartOptions:{showGridLines:!0,tooltip:{showInnactives:!0},legend:{verticalAlign:"top",horizontalAlign:"right",showInactives:!0},xAxisOptions:{interval:2,horizontalOffset:10,verticalOffset:10,clipDomain:!0,formatter:t=>`${t.getMonth()}/${t.getDate()}`,tooltipFormatter:t=>t.toLocaleString()},leftYAxisOptions:{unit:"%",type:"number",domain:[0,100],horizontalOffset:0,verticalOffset:10},rightYAxisOptions:{hide:!1,type:"number",domain:[0,5],horizontalOffset:0,verticalOffset:-10,unit:"/5",hideUnitInAxis:!0}},lines:[{key:"trustScore",color:b.coralColorChartsDefault,tooltipLabel:"Trust Score™",legendLabel:"Talend Trust Score™",axis:"right",status:"light"},{key:"validity",color:b.coralColorChartsColor00Strong,legendLabel:d.jsxs(it,{gap:"XS",align:"center",children:[d.jsx(kt,{children:"Validity"}),d.jsx(bt,{title:"Validity refer to your sample quality",children:d.jsx(it,{gap:0,children:d.jsx(St,{name:"information-stroke",size:"S"})})}),d.jsx(Lt,{children:"Well"})]}),tooltipLabel:"Validity",axis:"left",status:"highlighted"},{key:"threshold",color:b.coralColorChartsColor00Strong,tooltipLabel:"Axis threshold",legendLabel:"Axis threshold",axis:"left",status:"light",dashed:!0}],data:[{xLabel:new Date(2021,2,2),trustScore:2.2,validity:50,threshold:30},{xLabel:new Date(2022,2,2),trustScore:2.2,validity:50,threshold:30},{xLabel:new Date(2022,2,4),trustScore:2.2,validity:50,threshold:30},{xLabel:new Date(2022,2,6),trustScore:2.6,validity:50,threshold:30},{xLabel:new Date(2022,2,8),trustScore:3,validity:50,threshold:30},{xLabel:new Date(2022,2,10),trustScore:2.9,validity:50,threshold:30},{xLabel:new Date(2022,2,12),trustScore:3.1,validity:50,threshold:30},{xLabel:new Date(2022,2,14),trustScore:3.4,validity:65,threshold:30},{xLabel:new Date(2022,2,16),trustScore:3.4,validity:65,threshold:30},{xLabel:new Date(2022,2,18),trustScore:3,validity:65,threshold:30},{xLabel:new Date(2022,2,20),trustScore:3.1,validity:65,threshold:30},{xLabel:new Date(2022,2,22),trustScore:3.9,validity:55,threshold:30},{xLabel:new Date(2022,2,24),trustScore:3.5,validity:55,threshold:30},{xLabel:new Date(2022,2,26),trustScore:3.5,validity:55,threshold:30},{xLabel:new Date(2022,2,28),trustScore:3.9,validity:55,threshold:30},{xLabel:new Date(2022,2,30),trustScore:4.2,validity:75,threshold:30}]}},G={args:{chartOptions:{leftYAxisOptions:{type:"number",domain:[0,5]}},lines:[{key:"trustScore",color:b.coralColorChartsDefault}],data:[{xLabel:"2/2",trustScore:2.2},{xLabel:"2/16",trustScore:3.4},{xLabel:"2/24",trustScore:3.5},{xLabel:"2/30",trustScore:4.2}]}},K={args:{chartOptions:{leftYAxisOptions:{type:"number",domain:[0,5]}},lines:[{key:"trustScore",color:b.coralColorChartsDefault},{key:"globalScore",color:b.coralColorChartsColor04}],data:[{xLabel:"2/2",trustScore:2.2,globalScore:3},{xLabel:"2/16",trustScore:3.4,globalScore:3.2},{xLabel:"2/24",trustScore:3.5,globalScore:3.2},{xLabel:"2/30",trustScore:4.2,globalScore:4}]}},H={args:{hasLineSelection:!0,initialSelectedLines:["trustScore"],chartOptions:{leftYAxisOptions:{type:"number",domain:[0,5]}},lines:[{key:"trustScore",color:b.coralColorChartsDefault},{key:"globalScore",color:b.coralColorChartsColor04},{key:"localScore",color:b.coralColorChartsColor00}],data:[{xLabel:"2/2",trustScore:2.2,globalScore:3,localScore:1.5},{xLabel:"2/16",trustScore:3.4,globalScore:3.2,localScore:1.8},{xLabel:"2/24",trustScore:3.5,globalScore:3.2,localScore:2.8},{xLabel:"2/30",trustScore:4.2,globalScore:4,localScore:3.5}]}},X={args:{chartOptions:{leftYAxisOptions:{type:"number",domain:[0,5]},xAxisOptions:{type:"number",domain:[new Date("2022-06-10").getTime(),new Date("2022-06-18").getTime()],formatter:t=>new Date(t).toLocaleDateString()}},lines:[{key:"trustScore",color:b.coralColorChartsDefault}],data:[{xLabel:new Date("2022-06-12").getTime(),trustScore:2.2},{xLabel:new Date("2022-06-13").getTime(),trustScore:3.4},{xLabel:new Date("2022-06-14").getTime(),trustScore:3.5},{xLabel:new Date("2022-06-15").getTime(),trustScore:4.2}]}},le=t=>{const e=t/26784e5;return`${Math.floor(e)} months`},ce=t=>{const e=t/36e5;return`${Math.floor(e)} hours`},J={args:{hasLineSelection:!0,chartOptions:{showGridLines:!0,xAxisOptions:"{verticalOffset: 5}",leftYAxisOptions:{horizontalOffset:4,manualTicks:[3024e6,57024e5,83808e5,110592e5],formatter:le}},lines:[{key:"User1",color:b.coralColorChartsColor01},{key:"User2",color:b.coralColorChartsColor02},{key:"User3",color:b.coralColorChartsColor04}],data:[{xLabel:"W41 2022",User1:3024e6,User2:57024e5,User3:83808e5}]}},Q={args:{hasLineSelection:!0,chartOptions:{margin:{top:10,right:20,bottom:5,left:5},showGridLines:!0,xAxisOptions:{verticalOffset:5},leftYAxisOptions:{horizontalOffset:4,manualTicks:[22378905872,22382505872,22386105872,22389705872],formatter:ce}},lines:[{key:"User1",color:b.coralColorChartsColor01},{key:"User2",color:b.coralColorChartsColor02},{key:"User3",color:b.coralColorChartsColor04}],data:[{xLabel:"W41 2022",User1:22379081790,User2:22378905872,User3:22379612230}]}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    chartOptions: {
      showGridLines: true,
      tooltip: {
        showInnactives: true
      },
      legend: {
        verticalAlign: 'top',
        horizontalAlign: 'right',
        showInactives: true
      },
      xAxisOptions: {
        interval: 2,
        horizontalOffset: 10,
        verticalOffset: 10,
        clipDomain: true,
        formatter: (date: Date) => \`\${date.getMonth()}/\${date.getDate()}\`,
        tooltipFormatter: (date: Date) => date.toLocaleString()
      },
      leftYAxisOptions: {
        unit: '%',
        type: 'number',
        domain: [0, 100],
        horizontalOffset: 0,
        verticalOffset: 10
      },
      rightYAxisOptions: {
        hide: false,
        type: 'number',
        domain: [0, 5],
        horizontalOffset: 0,
        verticalOffset: -10,
        unit: '/5',
        hideUnitInAxis: true
      }
    },
    lines: [{
      key: 'trustScore',
      color: tokens.coralColorChartsDefault,
      tooltipLabel: 'Trust Score™',
      legendLabel: 'Talend Trust Score™',
      axis: 'right',
      status: 'light'
    }, {
      key: 'validity',
      color: tokens.coralColorChartsColor00Strong,
      legendLabel: <StackHorizontal gap="XS" align="center">
                        <StackItem>Validity</StackItem>
                        <Tooltip title="Validity refer to your sample quality">
                            <StackHorizontal gap={0}>
                                <SizedIcon name="information-stroke" size="S" />
                            </StackHorizontal>
                        </Tooltip>
                        <TagInformation>Well</TagInformation>
                    </StackHorizontal>,
      tooltipLabel: 'Validity',
      axis: 'left',
      status: 'highlighted'
    }, {
      key: 'threshold',
      color: tokens.coralColorChartsColor00Strong,
      tooltipLabel: 'Axis threshold',
      legendLabel: 'Axis threshold',
      axis: 'left',
      status: 'light',
      dashed: true
    }],
    data: [{
      xLabel: new Date(2021, 2, 2),
      trustScore: 2.2,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 2),
      trustScore: 2.2,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 4),
      trustScore: 2.2,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 6),
      trustScore: 2.6,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 8),
      trustScore: 3,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 10),
      trustScore: 2.9,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 12),
      trustScore: 3.1,
      validity: 50,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 14),
      trustScore: 3.4,
      validity: 65,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 16),
      trustScore: 3.4,
      validity: 65,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 18),
      trustScore: 3,
      validity: 65,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 20),
      trustScore: 3.1,
      validity: 65,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 22),
      trustScore: 3.9,
      validity: 55,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 24),
      trustScore: 3.5,
      validity: 55,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 26),
      trustScore: 3.5,
      validity: 55,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 28),
      trustScore: 3.9,
      validity: 55,
      threshold: 30
    }, {
      xLabel: new Date(2022, 2, 30),
      trustScore: 4.2,
      validity: 75,
      threshold: 30
    }]
  }
}`,...V.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    chartOptions: {
      leftYAxisOptions: {
        type: 'number',
        domain: [0, 5]
      }
    },
    lines: [{
      key: 'trustScore',
      color: tokens.coralColorChartsDefault
    }],
    data: [{
      xLabel: '2/2',
      trustScore: 2.2
    }, {
      xLabel: '2/16',
      trustScore: 3.4
    }, {
      xLabel: '2/24',
      trustScore: 3.5
    }, {
      xLabel: '2/30',
      trustScore: 4.2
    }]
  }
}`,...G.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    chartOptions: {
      leftYAxisOptions: {
        type: 'number',
        domain: [0, 5]
      }
    },
    lines: [{
      key: 'trustScore',
      color: tokens.coralColorChartsDefault
    }, {
      key: 'globalScore',
      color: tokens.coralColorChartsColor04
    }],
    data: [{
      xLabel: '2/2',
      trustScore: 2.2,
      globalScore: 3
    }, {
      xLabel: '2/16',
      trustScore: 3.4,
      globalScore: 3.2
    }, {
      xLabel: '2/24',
      trustScore: 3.5,
      globalScore: 3.2
    }, {
      xLabel: '2/30',
      trustScore: 4.2,
      globalScore: 4
    }]
  }
}`,...K.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    hasLineSelection: true,
    initialSelectedLines: ['trustScore'],
    chartOptions: {
      leftYAxisOptions: {
        type: 'number',
        domain: [0, 5]
      }
    },
    lines: [{
      key: 'trustScore',
      color: tokens.coralColorChartsDefault
    }, {
      key: 'globalScore',
      color: tokens.coralColorChartsColor04
    }, {
      key: 'localScore',
      color: tokens.coralColorChartsColor00
    }],
    data: [{
      xLabel: '2/2',
      trustScore: 2.2,
      globalScore: 3,
      localScore: 1.5
    }, {
      xLabel: '2/16',
      trustScore: 3.4,
      globalScore: 3.2,
      localScore: 1.8
    }, {
      xLabel: '2/24',
      trustScore: 3.5,
      globalScore: 3.2,
      localScore: 2.8
    }, {
      xLabel: '2/30',
      trustScore: 4.2,
      globalScore: 4,
      localScore: 3.5
    }]
  }
}`,...H.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    chartOptions: {
      leftYAxisOptions: {
        type: 'number',
        domain: [0, 5]
      },
      xAxisOptions: {
        type: 'number',
        domain: [new Date('2022-06-10').getTime(), new Date('2022-06-18').getTime()],
        formatter: (value: any) => new Date(value).toLocaleDateString()
      }
    },
    lines: [{
      key: 'trustScore',
      color: tokens.coralColorChartsDefault
    }],
    data: [{
      xLabel: new Date('2022-06-12').getTime(),
      trustScore: 2.2
    }, {
      xLabel: new Date('2022-06-13').getTime(),
      trustScore: 3.4
    }, {
      xLabel: new Date('2022-06-14').getTime(),
      trustScore: 3.5
    }, {
      xLabel: new Date('2022-06-15').getTime(),
      trustScore: 4.2
    }]
  }
}`,...X.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    hasLineSelection: true,
    chartOptions: {
      showGridLines: true,
      xAxisOptions: '{verticalOffset: 5}',
      leftYAxisOptions: {
        horizontalOffset: 4,
        manualTicks: [3024000000, 5702400000, 8380800000, 11059200000],
        formatter: tickFormatterByMonth
      }
    },
    lines: [{
      key: 'User1',
      color: tokens.coralColorChartsColor01
    }, {
      key: 'User2',
      color: tokens.coralColorChartsColor02
    }, {
      key: 'User3',
      color: tokens.coralColorChartsColor04
    }],
    data: [{
      xLabel: 'W41 2022',
      User1: 3024000000,
      User2: 5702400000,
      User3: 8380800000
    }]
  }
}`,...J.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    hasLineSelection: true,
    chartOptions: {
      margin: {
        top: 10,
        right: 20,
        bottom: 5,
        left: 5
      },
      showGridLines: true,
      xAxisOptions: {
        verticalOffset: 5
      },
      leftYAxisOptions: {
        horizontalOffset: 4,
        manualTicks: [22378905872, 22382505872, 22386105872, 22389705872],
        formatter: tickFormatterByHour
      }
    },
    lines: [{
      key: 'User1',
      color: tokens.coralColorChartsColor01
    }, {
      key: 'User2',
      color: tokens.coralColorChartsColor02
    }, {
      key: 'User3',
      color: tokens.coralColorChartsColor04
    }],
    data: [{
      xLabel: 'W41 2022',
      User1: 22379081790,
      User2: 22378905872,
      User3: 22379612230
    }]
  }
}`,...Q.parameters?.docs?.source}}};const He=["FullyCustomisedLineChart","SimpleLineChart","MultiCurveLineChart","WithLineSelection","CustomXAxisDomainLineChart","WithOnlyOneDot","WithOnlyOneDotOnTheTop"];export{X as CustomXAxisDomainLineChart,V as FullyCustomisedLineChart,K as MultiCurveLineChart,G as SimpleLineChart,H as WithLineSelection,J as WithOnlyOneDot,Q as WithOnlyOneDotOnTheTop,He as __namedExportsOrder,Ke as default};
