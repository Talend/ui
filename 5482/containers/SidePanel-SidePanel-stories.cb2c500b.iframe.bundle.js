"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[346],{"./src/SidePanel/SidePanel.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,InjectedSettings:()=>InjectedSettings,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/SidePanel/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const actions=[{componentId:"first",href:"/storybook"},{componentId:"second",href:"/foo"},{componentId:"configuration",href:"/configuration"}],__WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import SidePanel from '.';\n\nconst actions = [\n\t{\n\t\tcomponentId: 'first',\n\t\thref: '/storybook',\n\t},\n\t{\n\t\tcomponentId: 'second',\n\t\thref: '/foo',\n\t},\n\t{\n\t\tcomponentId: 'configuration',\n\t\thref: '/configuration',\n\t},\n];\n\nexport default {\n\ttitle: 'SidePanel',\n};\n\nexport const Default = () => <SidePanel actions={actions} />;\nexport const InjectedSettings = () => (\n\t<SidePanel\n\t\tactionIds={['menu:first', 'menu:second', 'menu:third']}\n\t\tcomponents={{\n\t\t\t'before-actions': [\n\t\t\t\t{\n\t\t\t\t\tcomponent: 'FilterBar',\n\t\t\t\t\tdocked: false,\n\t\t\t\t},\n\t\t\t],\n\t\t}}\n\t/>\n);\n",locationsMap:{default:{startLoc:{col:23,line:22},endLoc:{col:60,line:22},startBody:{col:23,line:22},endBody:{col:60,line:22}},"injected-settings":{startLoc:{col:32,line:23},endLoc:{col:1,line:35},startBody:{col:32,line:23},endBody:{col:1,line:35}}}}},title:"SidePanel"},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.A,{actions});Default.displayName="Default";const InjectedSettings=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.A,{actionIds:["menu:first","menu:second","menu:third"],components:{"before-actions":[{component:"FilterBar",docked:!1}]}});InjectedSettings.displayName="InjectedSettings",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => <SidePanel actions={actions} />",...Default.parameters?.docs?.source}}},InjectedSettings.parameters={...InjectedSettings.parameters,docs:{...InjectedSettings.parameters?.docs,source:{originalSource:"() => <SidePanel actionIds={['menu:first', 'menu:second', 'menu:third']} components={{\n  'before-actions': [{\n    component: 'FilterBar',\n    docked: false\n  }]\n}} />",...InjectedSettings.parameters?.docs?.source}}};const __namedExportsOrder=["Default","InjectedSettings"]},"./src/SidePanel/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>src_SidePanel});var lib_esm=__webpack_require__("../cmf/lib-esm/index.js");var react=__webpack_require__("../../node_modules/react/index.js"),immutable=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const DEFAULT_STATE=new immutable.Map({docked:!1});class SidePanel extends react.Component{constructor(props,context){super(props,context),this.onToggleDock=this.onToggleDock.bind(this)}onToggleDock(){const state=this.props.state||DEFAULT_STATE;this.props.setState({docked:!state.get("docked")})}render(){const{state=DEFAULT_STATE}=this.props,props={docked:state.get("docked"),onToggleDock:this.onToggleDock,...(0,lodash.omit)(this.props,lib_esm.TJ.INJECTED_PROPS)};return(0,jsx_runtime.jsx)(components_lib_esm.SidePanel,{...props})}}SidePanel.displayName="SidePanel",_defineProperty(SidePanel,"displayName","Container(SidePanel)"),_defineProperty(SidePanel,"propTypes",{...lib_esm.TJ.propTypes}),SidePanel.ACTION_TYPE_LINK="MENU_LINK";const SidePanel_container=SidePanel,cache={};function getCache(componentId="default",currentRoute,actions){return cache[componentId]||(cache[componentId]={}),cache[componentId].route===currentRoute&&cache[componentId].actions===actions||(cache[componentId]={route:currentRoute,actions}),cache[componentId]}function isBasePathOf(actionPath,currentPath){const length=actionPath.length;return currentPath.length+1===length?`${currentPath}/`===actionPath:currentPath.length===length?currentPath===actionPath:!(currentPath.length<length)&&(actionPath===currentPath.slice(0,length)&&["/","#"].includes(currentPath[length]))}function getSelectedAction(currentRoute,actions){return actions.find((action=>{return action.href&&isBasePathOf((href=action.href,!window.basename||"/"===window.basename||href.startsWith(window.basename)?href:`${window.basename||""}${href}`.replaceAll("//","/")),currentRoute);var href}))}function getActions(state,ownProps,currentRoute){if(ownProps.actions){let actions=ownProps.actions;window.basename&&"/"!==window.basename&&(actions=ownProps.actions.map((action=>({...action,href:`${window.basename}${action.href}`.replaceAll("//","/")}))));const cacheAction=getCache(ownProps.componentId,currentRoute,actions);return cacheAction.value||(cacheAction.value=function getActionsWrapped(actions){return actions.map((action=>!action.href||action.onClick||action.onClickDispatch||action.onClickActionCreator?action:{...action,onClick:event=>{event.metaKey||event.ctrlKey||(event.preventDefault(),event.stopPropagation())},onClickDispatch:{type:"MENU_LINK",cmf:{routerPush:action.href}}}))}(actions)),cacheAction.value}if(ownProps.actionIds){const cacheAction=getCache(ownProps.componentId,currentRoute,ownProps.actionIds);return cacheAction.value||(cacheAction.value=ownProps.actionIds.map((id=>function getAction(id,currentRoute,state){const action={actionId:id},info=lib_esm.Ay.action.getActionInfo({registry:lib_esm.Ay.registry.getRegistry(),store:{getState:()=>state}},id);action.label=info.label,action.id=info.id;const route=(0,lodash.get)(info,"payload.cmf.routerReplace",(0,lodash.get)(info,"payload.cmf.routerPush",(0,lodash.get)(info,"href")));return route&&isBasePathOf(route,currentRoute)&&(action.active=!0),action}(id,currentRoute,state)))),cacheAction.value}}const src_SidePanel=(0,lib_esm.TJ)({defaultState:DEFAULT_STATE,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0,keepComponentState:!0,mapStateToProps:function mapStateToProps(state,ownProps){const props={},currentRoute=window.location.pathname;return props.actions=getActions(state,ownProps,currentRoute),ownProps.actions&&(props.selected=getSelectedAction(currentRoute,props.actions)),props},mergeProps:function mergeProps(stateProps,dispatchProps,ownProps){const props={...ownProps,...stateProps,...dispatchProps};return props.actionIds&&delete props.actionIds,props}})(SidePanel_container)}}]);