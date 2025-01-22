"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[146],{"./src/TreeView/TreeView.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/TreeView/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:'import TreeView from \'.\';\n\nexport default {\n\ttitle: \'TreeView\',\n};\n\nexport const Default = () => (\n\t<TreeView\n\t\tid="my-treeview"\n\t\tcollection="with.data"\n\t\tnameAttr="label"\n\t\tonToggleActionCreator="object:view"\n\t\tonSelectActionCreator="object:view"\n\t\tnoHeader\n\t/>\n);\n',locationsMap:{default:{startLoc:{col:23,line:7},endLoc:{col:1,line:16},startBody:{col:23,line:7},endBody:{col:1,line:16}}}}},title:"TreeView"},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.A,{id:"my-treeview",collection:"with.data",nameAttr:"label",onToggleActionCreator:"object:view",onSelectActionCreator:"object:view",noHeader:!0});Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => <TreeView id="my-treeview" collection="with.data" nameAttr="label" onToggleActionCreator="object:view" onSelectActionCreator="object:view" noHeader />',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/TreeView/TreeView.container.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>__WEBPACK_DEFAULT_EXPORT__,hi:()=>DISPLAY_NAME});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__),_talend_react_cmf__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../cmf/lib-esm/index.js"),react_immutable_proptypes__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-immutable-proptypes/dist/ImmutablePropTypes.js"),react_immutable_proptypes__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(react_immutable_proptypes__WEBPACK_IMPORTED_MODULE_2__),immutable__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_3__),lodash__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/lodash/lodash.js"),_talend_react_components__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../components/lib-esm/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const OPENED_ATTR="opened",SELECTED_ATTR="selectedId",DISPLAY_NAME="Container(TreeView)",DEFAULT_STATE=new(immutable__WEBPACK_IMPORTED_MODULE_3___default().Map)({[OPENED_ATTR]:new(immutable__WEBPACK_IMPORTED_MODULE_3___default().List),[SELECTED_ATTR]:void 0});function itemHasChildId(data,idAttr,idToMatch){return!(!data.children||!data.children.length)&&data.children.some((child=>child[idAttr]===idToMatch||itemHasChildId(child,idAttr,idToMatch)))}function toggleState(prevProps,data,idAttr){const id=data[idAttr],opened=prevProps.state.get("opened"),index=opened.indexOf(id);if(-1!==index){let nextState=prevProps.state.set("opened",opened.delete(index));const selectedId=nextState.get("selectedId");return void 0!==selectedId&&itemHasChildId(data,idAttr,selectedId)&&(nextState=nextState.set("selectedId",void 0)),nextState}return prevProps.state.set("opened",prevProps.state.get("opened").push(id))}function transform(items,props,parent){if(!items)return;const state=props.state||DEFAULT_STATE,selectedId=state.get("selectedId"),opened=state.get("opened");return items.map((item=>{const elem={...item,id:item[props.idAttr],isOpened:item.isOpened||opened.includes(item[props.idAttr]),name:item[props.nameAttr],parent};if(elem.children=transform(item[props.childrenAttr],props,elem),item[props.idAttr]===selectedId)for(let current=elem;current.parent;current=current.parent)current.parent.isOpened=!0;return elem}))}class TreeView extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(props){super(props),this.onSelect=this.onSelect.bind(this),this.onToggle=this.onToggle.bind(this),this.onToggleAllSiblings=this.onToggleAllSiblings.bind(this),props.onClick}onSelect(event,data){this.props.setState((prevState=>function selectWrapper(prevProps,id){return id===prevProps.state.get("selectedId")?prevProps.state.set("selectedId",void 0):prevProps.state.set("selectedId",id)}(prevState,data[this.props.idAttr]))),this.props.onSelectActionCreator&&this.props.dispatchActionCreator(this.props.onSelectActionCreator,{type:"select",source:"TreeView",props:this.props},data),this.props.onSelect&&this.props.onSelect(data)}onToggle(event,data){this.props.setState((prevState=>toggleState(prevState,data,this.props.idAttr))),this.props.onClickActionCreator&&this.props.dispatchActionCreator(this.props.onClickActionCreator,{type:"toggle",source:"TreeView",props:this.props},data),this.props.onToggle&&this.props.onToggle(data),this.props.onClick&&this.props.onClick(data)}onToggleAllSiblings(event,data){this.props.setState((prevState=>function openAllState(prevProps,data,idAttr){const nextOpened=data.reduce(((accu,item)=>accu.add(item[idAttr])),prevProps.state.get("opened").toSet()).toList();return prevProps.state.set("opened",nextOpened)}(prevState,data,this.props.idAttr)))}getSelectedId(){const selectedId=this.props.selectedId;if(void 0!==selectedId)return selectedId;return(this.props.state||DEFAULT_STATE).get("selectedId")}render(){if(!this.props.data)return null;const structure=transform(this.props.data.toJS(),this.props),props=(0,lodash__WEBPACK_IMPORTED_MODULE_4__.omit)(this.props,_talend_react_cmf__WEBPACK_IMPORTED_MODULE_1__.TJ.INJECTED_PROPS);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_talend_react_components__WEBPACK_IMPORTED_MODULE_5__.TreeView,{...props,structure,onSelect:this.onSelect,onToggle:this.onToggle,onToggleAllSiblings:this.onToggleAllSiblings,selectedId:this.getSelectedId()})}}TreeView.displayName="TreeView",_defineProperty(TreeView,"displayName",DISPLAY_NAME),_defineProperty(TreeView,"propTypes",{childrenAttr:prop_types__WEBPACK_IMPORTED_MODULE_7___default().string,data:react_immutable_proptypes__WEBPACK_IMPORTED_MODULE_2___default().list,idAttr:prop_types__WEBPACK_IMPORTED_MODULE_7___default().string,nameAttr:prop_types__WEBPACK_IMPORTED_MODULE_7___default().string,onClick:prop_types__WEBPACK_IMPORTED_MODULE_7___default().func,onToggle:prop_types__WEBPACK_IMPORTED_MODULE_7___default().func,onSelect:prop_types__WEBPACK_IMPORTED_MODULE_7___default().func,onClickActionCreator:prop_types__WEBPACK_IMPORTED_MODULE_7___default().string,onSelectActionCreator:prop_types__WEBPACK_IMPORTED_MODULE_7___default().string,..._talend_react_cmf__WEBPACK_IMPORTED_MODULE_1__.TJ.propTypes}),_defineProperty(TreeView,"defaultProps",{idAttr:"id",nameAttr:"name",childrenAttr:"children"});const __WEBPACK_DEFAULT_EXPORT__=(0,_talend_react_cmf__WEBPACK_IMPORTED_MODULE_1__.TJ)({defaultState:DEFAULT_STATE,mapStateToProps:function mapStateToProps(state,ownProps){const props={};return ownProps.collection&&(props.data=state.cmf.collections.getIn(ownProps.collection.split(".")),props.data||console.warn("TreeView.collection not found")),props},omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(TreeView)},"./src/TreeView/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("./src/TreeView/TreeView.container.js").Ay}}]);