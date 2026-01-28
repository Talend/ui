import{r as B,P as t,j as e,c as h,I as L}from"./iframe-D37Phr64.js";import{A as q}from"./Action.component-Ck4uvcSx.js";import{T as ne}from"./TooltipTrigger.component-DR5pn2u9.js";import"./Actions.component-BI02MMVv.js";import"./ActionButton.component-CznGsQDN.js";import"./ActionIconToggle.component-CivhpjLz.js";import"./ActionSplitDropdown.component-BpSVpVkj.js";import"./index-BlZT6wrK.js";import"./index-CoDy01W3.js";import{B as re}from"./Badge.component-rFdgYyru.js";import{G as se}from"./index-djx7_qMh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CSYudTWG.js";import"./CircularProgress.component-CQfs1YoU.js";import"./constants-CZYEPhht.js";import"./translate-CAq4Kplr.js";import"./withTranslation-Borovdv1.js";import"./OverlayTrigger.component-BCMwzjb4.js";import"./RootCloseWrapper-4SBbwaun.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-GTcxw7wL.js";import"./Transition-CM8yD3oi.js";import"./Transition-DXkAf1V6.js";import"./get-90MRQFNM.js";import"./_baseGet-BdbJtFQK.js";import"./toString-DU9ul6dr.js";import"./isSymbol-DOqcnDfM.js";import"./eq-Oi8weurB.js";import"./omit-20CTcyqL.js";import"./_setToString-BzqI9MrB.js";import"./_getTag-3_YbZVhb.js";import"./isArrayLike-B6M8JwQg.js";import"./DropdownButton-Bnk65iT_.js";import"./SplitButton-DTDnhUCW.js";import"./inheritsLoose-DWEYlpi0.js";import"./Skeleton.component-YGLhyf4R.js";import"./theme-CeyjN51H.js";const oe="_disabled_3xg82_23",c={"tc-treeview-li":"_tc-treeview-li_3xg82_2","tc-treeview-item":"_tc-treeview-item_3xg82_13",disabled:oe,"tc-treeview-item-name":"_tc-treeview-item-name_3xg82_27","tc-treeview-toggle":"_tc-treeview-toggle_3xg82_33","tc-treeview-folder":"_tc-treeview-folder_3xg82_50","tc-treeview-img":"_tc-treeview-img_3xg82_58","tc-treeview-item-ctrl":"_tc-treeview-item-ctrl_3xg82_98","tc-treeview-ul":"_tc-treeview-ul_3xg82_120"},ae=30,ce=12,le=20;function de(s="talend-folder",i){return i?s:`${s}-closed`}function F({icon:s,isOpened:i}){return typeof s=="object"?s.tooltipLabel?e.jsx(ne,{label:s.tooltipLabel,tooltipPlacement:s.tooltipPlacement||"top",children:e.jsx("span",{children:e.jsx(L,{name:s.name,className:h(c["tc-treeview-img"],s.className)})})}):e.jsx(L,{...s,className:h(c["tc-treeview-img"],s.className)}):e.jsx(L,{name:de(s,i),className:h(c["tc-treeview-folder"])})}F.propTypes={icon:t.oneOfType([t.bool,t.string,t.shape(L.propTypes)]),isOpened:t.bool};class z extends B.Component{static propTypes={id:t.string.isRequired,index:t.number.isRequired,item:t.shape({id:t.oneOfType([t.string,t.number]),name:t.string.isRequired,disabled:t.bool,isOpened:t.bool,className:t.string,children:t.arrayOf(t.object),icon:t.oneOfType([t.bool,t.string,t.object]),actions:t.arrayOf(t.shape({action:t.func,label:t.string,icon:t.string})),counter:t.number,showCounter:t.bool}).isRequired,siblings:t.array,level:t.number.isRequired,onKeyDown:t.func.isRequired,onToggle:t.func.isRequired,onSelect:t.func.isRequired,selectedId:t.oneOfType([t.string,t.number,t.array])};static defaultProps={level:1};constructor(i){super(i),this.renderIconAction=this.renderIconAction.bind(this),this.renderTreeViewChildren=this.renderTreeViewChildren.bind(this),this.onMouseLeave=this.onMouseLeave.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.state={hovered:!1}}onMouseEnter(){this.setState({hovered:!0})}onMouseLeave(){this.setState({hovered:!1})}getTabIndex(){let i;return this.props.selectedId===void 0?i=this.props.level===1&&this.props.index===1:i=this.isSelected(),i?0:-1}hasChildren(){return this.props.item.children&&this.props.item.children.length}isSelected(){const{item:i,selectedId:n}=this.props;return n===void 0?!1:Array.isArray(n)?n.includes(i.id):i.id===n}isOpened(){const{children:i=[],isOpened:n=!1}=this.props.item;if(i.length)return n}renderTreeViewChildren(){if(!this.isOpened())return null;const{children:i}=this.props.item;return e.jsx("ul",{role:"group",className:c["tc-treeview-ul"],children:i.map((n,r)=>e.jsx(z,{id:this.props.id&&`${this.props.id}-${r}`,item:n,siblings:i,onKeyDown:this.props.onKeyDown,onSelect:this.props.onSelect,onToggle:this.props.onToggle,index:r+1,selectedId:this.props.selectedId,level:this.props.level+1},r))},"children")}renderIconAction({action:i,id:n,...r}){let d=n;return!n&&this.props.id&&(d=`${this.props.id}-${r.icon}`),B.createElement(q,{...r,onClick:v=>{v.stopPropagation(),i(this.props.item)},tooltipPlacement:"right",hideLabel:!0,key:r.label,id:d,link:!0})}render(){const{id:i,index:n,item:r,level:d,onKeyDown:v,onSelect:R,onToggle:P,siblings:j}=this.props,{isOpened:g=!1,hidden:E,name:M,children:w=[],showCounter:b,actions:T,icon:x,counter:Z=w.length,disabled:y,className:ee}=r,te=`${(d-1)*(le+ce)+ae}px`,ie=!!(w.length&&(g||this.state.hovered));return e.jsxs("li",{id:i,role:"treeitem",tabIndex:this.getTabIndex(),"aria-expanded":this.isOpened(),"aria-level":d,"aria-posinset":n,"aria-setsize":j.length,"aria-selected":this.isSelected(),"aria-disabled":y,className:h("tc-treeview-item-li",c["tc-treeview-li"],ee),onClick:l=>(l.stopPropagation(),!y&&R(l,r)),onKeyDown:l=>!y&&v(l,this.containerRef,{...r,hasChildren:w.length,isOpened:g,siblings:j}),"data-hidden":E,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,ref:l=>{this.containerRef=l},children:[e.jsxs("div",{className:h("tc-treeview-item",c["tc-treeview-item"],{[c.disabled]:y,disabled:y}),style:{paddingLeft:te},children:[w.length?e.jsx(q,{className:c["tc-treeview-toggle"],icon:"talend-caret-down",iconTransform:g?void 0:"rotate-270",id:i&&`${i}-toggle`,onClick:l=>(l.stopPropagation(),P(l,r)),label:"","aria-hidden":!0,tabIndex:"-1",link:!0}):null,x!==!1&&e.jsx(F,{icon:x,isOpened:ie},"icon"),e.jsx("span",{className:h("tc-treeview-item-name",c["tc-treeview-item-name"]),children:M},"label"),e.jsxs("div",{className:c["tc-treeview-item-ctrl"],children:[b&&e.jsx(re,{label:Z.toString()},"badge"),T&&T.map(this.renderIconAction)]},"actions")]}),this.renderTreeViewChildren()]})}}const K={"tc-treeview":"_tc-treeview_upiea_2","tc-treeview-header":"_tc-treeview-header_upiea_2","tc-treeview-list":"_tc-treeview-list_upiea_15"};function G(s){const{id:i,headerText:n,structure:r,addAction:d,addActionLabel:v,onKeyDown:R,onSelect:P,onToggle:j,noHeader:g,className:E,selectedId:M,style:w}=s,b=i&&`${i}-title`;return e.jsxs("div",{className:h("tc-treeview",K["tc-treeview"],E),style:w,children:[e.jsxs("header",{className:h(K["tc-treeview-header"],{"sr-only":g}),children:[e.jsx("span",{id:b,children:n}),d&&e.jsx(q,{label:v,icon:"talend-plus",onClick:d,tooltipPlacement:"right",hideLabel:!0,link:!0,id:i&&`${i}-add`},v)]}),e.jsx("ul",{className:K["tc-treeview-list"],role:"tree","aria-labelledby":b,children:r.map((T,x)=>e.jsx(z,{id:i&&`${i}-${x}`,item:T,siblings:r,onKeyDown:R,onSelect:P,onToggle:j,index:x+1,selectedId:M,level:1},x))})]})}G.displayName="TreeView";G.defaultProps={id:"tc-treeview",addActionLabel:"Add folder",headerText:"Folders"};const o=se.withTreeGesture(G),{action:p}=__STORYBOOK_MODULE_ACTIONS__,he=[{name:"hitmonlee",children:[{name:"Hitmonchan"}],isOpened:!1},{name:"pikachu",children:[{name:"raichu"}],isOpened:!0},{id:"selected",name:"Abra",isOpened:!0,children:[{name:"Kadabra",isOpened:!0,children:[{name:"Alakazam"}]}]}],pe=[{name:"hitmonlee",children:[{name:"Hitmonchan"}],isOpened:!1,icon:{name:"talend-versioning",tooltipLabel:"New version of the Pokemon is available"}},{name:"pikachu",children:[{name:"raichu",icon:{name:"src-http://static.pokemonpets.com/images/monsters-images-300-300/2026-Shiny-Raichu.png"}}],isOpened:!0,icon:{name:"src-http://static.pokemonpets.com/images/monsters-images-300-300/2025-Shiny-Pikachu.png"}},{id:"selected",name:"Abra",icon:{name:"src-http://static.pokemonpets.com/images/monsters-images-300-300/63-Abra.png"},isOpened:!0,children:[{name:"Kadabra",icon:{name:"src-http://static.pokemonpets.com/images/monsters-images-300-300/64-Kadabra.png"},isOpened:!0,children:[{name:"Alakazam",icon:{name:"src-http://static.pokemonpets.com/images/monsters-images-300-300/65-Alakazam.png"}}]}]}],me=[{name:"hitmonlee",children:[{name:"Hitmonchan"}],isOpened:!1,icon:!1},{name:"pikachu",children:[{name:"raichu",icon:!1}],isOpened:!0,icon:!1},{id:"selected",name:"Abra",icon:!1,isOpened:!0,children:[{name:"Kadabra",icon:!1,isOpened:!0,children:[{name:"Alakazam",icon:!1}]}]}],$=[{action:p("itemRemoveCallback"),icon:"talend-trash",label:"remove element"}],u=[{action:p("itemAddCallback"),icon:"talend-plus",label:"Add Item"},{action:p("itemEditCallback"),icon:"talend-pencil",label:"Edit Item"},{action:p("itemRemoveCallback"),icon:"talend-trash",label:"Remove Item"}],ue=[{name:"hitmonlee",isOpened:!0,children:[{name:"raichu",showCounter:!0,counter:111,actions:$}],counter:-1,showCounter:!0,actions:$},{name:"pikachu",isOpened:!0,counter:2911,showCounter:!0,actions:$}],ve=[{name:"hitmonlee",isOpened:!0,children:[{name:"raichu",actions:u}],actions:u},{name:"pikachu",isOpened:!0,actions:u}],we=[{name:"doge",isOpened:!0,children:[{name:"dogecoin",actions:u}],actions:u},{name:"hitmonlee",isOpened:!1,disabled:!0,icon:{name:"talend-warning",tooltipLabel:"New version of the Pokemon is available"},children:[{name:"raichu",actions:u}]},{id:"selected",name:"Selected item",isOpened:!0,actions:u}],f={id:"my-treeview",structure:he,onSelect:p("onSelect"),onToggle:p("onToggle"),onToggleAllSiblings:p("onToggleAllSiblings"),selectedId:"selected"},m={...f,addAction:p("added")},xe={...m,headerText:"some elements",addActionLabel:"add element"},Y={...m};Y.structure=ue;const U={...m};U.structure=ve;const J={...m},ge={...m,structure:[{name:"hitmonlee",children:[{name:"Hitmonchan"}],isOpened:!1,className:"test-class"},{name:"pikachu",children:[{name:"raichu"}],isOpened:!0,className:"test-class"},{id:"selected",name:"Abra",isOpened:!0,children:[{name:"Kadabra",isOpened:!0,children:[{name:"Alakazam"}]}]}]};J.structure=we;const ye=[{name:"Hitmonlee1",isOpened:!0,children:[{name:"Hitmonchan2",isOpened:!0,children:[{name:"Hitmonchan3",isOpened:!0,children:[{name:"Hitmonchan4",isOpened:!0,children:[{name:"Hitmonchan5",isOpened:!0,children:[{name:"Hitmonchan6",isOpened:!0,children:[{name:"Hitmonchan7",isOpened:!0,children:[{name:"Hitmonchan8",isOpened:!0,children:[{name:"Hitmonchan9",isOpened:!0,children:[{name:"Hitmonchan10",isOpened:!0,children:[{name:"Hitmonchen11",isOpened:!0,children:[{name:"Hitmonchen12",isOpened:!0,children:[{name:"Hitmonchen13",isOpened:!0,children:[{name:"Hitmonchen14"}]}]}]}]}]}]}]}]}]}]}]}]}]}],Q={...f};Q.structure=ye;const X={...f};X.structure=[{name:"Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1 Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1Hitmonlee1",isOpened:!0}];const a={width:"300px",border:"1px solid #eee",marginLeft:"10px"},nt={title:"Components/Tree/FolderTreeView"},A=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set with action example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...m})})]}),D=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"The icons can be customized, passign the Icon components props"}),e.jsx("div",{style:a,children:e.jsx(o,{...m,structure:pe})})]}),O=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Custom header and action tooltip property-set example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...xe})})]}),k=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set without action example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...f})})]}),V=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set without header example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...f,noHeader:!0})})]}),_=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set with remove action example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...Y})})]}),I=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set with remove action example: "}),e.jsx("div",{style:a,children:e.jsx(o,{...U})})]}),C=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"When an element cannot be selected the whole line is 0.54 opacity, with a not-allowed cursor."}),e.jsx("h3",{children:"An example with disabled items: "}),e.jsx("div",{style:a,children:e.jsx(o,{...J})})]}),H=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set with deep structure: "}),e.jsx("div",{style:a,children:e.jsx(o,{...Q})})]}),S=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set with cornercase: longname "}),e.jsx("div",{style:a,children:e.jsx(o,{...X})})]}),N=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"Default property-set without icons: "}),e.jsx("div",{style:a,children:e.jsx(o,{...m,structure:me})})]}),W=()=>e.jsxs("div",{children:[e.jsx("h1",{children:"TreeView"}),e.jsx("h3",{children:"Definition"}),e.jsx("p",{children:"A view component to display any tree structure, like folders or categories."}),e.jsx("h3",{children:"You can pass custom class names to a tree view items "}),e.jsx("style",{children:`
                    .test-class {
                        background: rgba(0,0,0,0.1);
                        animation: mymove 2s infinite;
                    }
                    .test-class .tc-treeview-item {
                        cursor: copy;
                    }

                    @keyframes mymove {
                        0% {opacity: 1;}
                        50% {opacity: 0.4;}
                        100% {opacity: 1;}
                    }`}),e.jsx("div",{style:a,children:e.jsx(o,{...ge})})]});A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set with action example: </h3>
        <div style={style}>
            <TreeView {...withAddAction} />
        </div>
    </div>`,...A.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>The icons can be customized, passign the Icon components props</p>
        <div style={style}>
            <TreeView {...withAddAction} structure={structureWithIcons} />
        </div>
    </div>`,...D.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Custom header and action tooltip property-set example: </h3>
        <div style={style}>
            <TreeView {...withHeader} />
        </div>
    </div>`,...O.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set without action example: </h3>
        <div style={style}>
            <TreeView {...defaultProps} />
        </div>
    </div>`,...k.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set without header example: </h3>
        <div style={style}>
            <TreeView {...defaultProps} noHeader />
        </div>
    </div>`,...V.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set with remove action example: </h3>
        <div style={style}>
            <TreeView {...withRemoval} />
        </div>
    </div>`,..._.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set with remove action example: </h3>
        <div style={style}>
            <TreeView {...withActions} />
        </div>
    </div>`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>
            When an element cannot be selected the whole line is 0.54 opacity, with a not-allowed cursor.
        </p>
        <h3>An example with disabled items: </h3>
        <div style={style}>
            <TreeView {...withDisabledItems} />
        </div>
    </div>`,...C.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set with deep structure: </h3>
        <div style={style}>
            <TreeView {...withDeepStructure} />
        </div>
    </div>`,...H.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set with cornercase: longname </h3>
        <div style={style}>
            <TreeView {...cornerCaseLongName} />
        </div>
    </div>`,...S.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>Default property-set without icons: </h3>
        <div style={style}>
            <TreeView {...withAddAction} structure={structureWithoutIcons} />
        </div>
    </div>`,...N.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => <div>
        <h1>TreeView</h1>
        <h3>Definition</h3>
        <p>A view component to display any tree structure, like folders or categories.</p>
        <h3>You can pass custom class names to a tree view items </h3>
        <style>
            {\`
                    .test-class {
                        background: rgba(0,0,0,0.1);
                        animation: mymove 2s infinite;
                    }
                    .test-class .tc-treeview-item {
                        cursor: copy;
                    }

                    @keyframes mymove {
                        0% {opacity: 1;}
                        50% {opacity: 0.4;}
                        100% {opacity: 1;}
                    }\`}
        </style>
        <div style={style}>
            <TreeView {...withClassNames} />
        </div>
    </div>`,...W.parameters?.docs?.source}}};const rt=["Default","WithCustomIcons","WithCustomHeaderText","WithoutAction","WithoutHeader","WithRemoveActionAndCounter","WithManyActions","WithDisabledItems","WithDeepStructure","WithLongName","WithoutIcons","ItemsClassNames"];export{A as Default,W as ItemsClassNames,O as WithCustomHeaderText,D as WithCustomIcons,H as WithDeepStructure,C as WithDisabledItems,S as WithLongName,I as WithManyActions,_ as WithRemoveActionAndCounter,k as WithoutAction,V as WithoutHeader,N as WithoutIcons,rt as __namedExportsOrder,nt as default};
