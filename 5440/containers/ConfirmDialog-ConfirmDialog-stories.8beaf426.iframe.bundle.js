"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[6],{"./src/ConfirmDialog/ConfirmDialog.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ConfirmDialog_stories});var immutable=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),lib_esm=__webpack_require__("../cmf/lib-esm/index.js"),actionAPI=__webpack_require__("./src/actionAPI.js"),components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const DEFAULT_STATE=new immutable.Map({show:!1});function ConfirmDialog(props){const context=(0,lib_esm.n7)(),state=(props.state||DEFAULT_STATE).toJS();if(!state.validateAction||!state.cancelAction)return null;state.validateAction=(0,actionAPI.c)(context,state.validateAction,state.model),state.cancelAction=(0,actionAPI.c)(context,state.cancelAction,state.model);const newProps={...(0,lodash.omit)(props,lib_esm.TJ.INJECTED_PROPS),...state};return(0,jsx_runtime.jsx)(components_lib_esm.ConfirmDialog,{...newProps})}ConfirmDialog.displayName="ConfirmDialog",ConfirmDialog.displayName="CMFContainer(ConfirmDialog)",ConfirmDialog.propTypes={...lib_esm.TJ.propTypes};const ConfirmDialog_container=ConfirmDialog;const ConfirmDialog_connect=(0,lib_esm.TJ)({defaultState:DEFAULT_STATE,componentId:ownProps=>ownProps&&ownProps.id||"ConfirmDialog",mapStateToProps:function mapStateToProps(state,props,cmfProps){const context={registry:lib_esm.Ay.registry.getRegistry(),store:{getState:()=>state}},validateAction=cmfProps.state?cmfProps.state.get("validateAction"):void 0,cancelAction=cmfProps.state?cmfProps.state.get("cancelAction"):void 0,model=cmfProps.state?cmfProps.state.get("model"):cmfProps.model;return{validateAction:(0,actionAPI.c)(context,validateAction,model),cancelAction:(0,actionAPI.c)(context,cancelAction,model)}},omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(ConfirmDialog_container);ConfirmDialog_connect.showDialog=function showConfirmDialog(state,action){const newState={...state};return newState.cmf.components=state.cmf.components.setIn(["CMFContainer(ConfirmDialog)","ConfirmDialog"],action.confirmDialogConf.set("show",!0)),newState},ConfirmDialog_connect.hideDialog=function hideConfirmDialog(state){const newState={...state};return newState.cmf.components=state.cmf.components.setIn(["CMFContainer(ConfirmDialog)","ConfirmDialog","show"],!1),newState};const src_ConfirmDialog=ConfirmDialog_connect;const initialState=new immutable.Map({size:"small",header:"DO SOMETHING",show:!0,children:"Confirm this !",validateAction:"confirm-dialog:validate",cancelAction:"confirm-dialog:cancel"}),ConfirmDialog_stories={parameters:{storySource:{source:"import { Map } from 'immutable';\nimport ConfirmDialog from '.';\n\nconst initialState = new Map({\n\tsize: 'small',\n\theader: 'DO SOMETHING',\n\tshow: true,\n\tchildren: 'Confirm this !',\n\tvalidateAction: 'confirm-dialog:validate',\n\tcancelAction: 'confirm-dialog:cancel',\n});\n\nexport default {\n\ttitle: 'ConfirmDialog',\n};\n\nexport function Default() {\n\treturn <ConfirmDialog initialState={initialState} />;\n}\n",locationsMap:{default:{startLoc:{col:7,line:17},endLoc:{col:1,line:19},startBody:{col:7,line:17},endBody:{col:1,line:19}}}}},title:"ConfirmDialog"},Default=function Default(){return(0,jsx_runtime.jsx)(src_ConfirmDialog,{initialState})};Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"function Default() {\n  return <ConfirmDialog initialState={initialState} />;\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/actionAPI.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>getActionsProps});var _talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../cmf/lib-esm/index.js"),lodash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/lodash/lodash.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}function evalExpressions(action,context,payload={}){return _talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__.Ay.expression.getProps(action,["active","available","disabled","inProgress"],context,payload)}function getActionsProps(context,ids,model){if(!ids)return[];let tmpIds=ids;const onlyOne="string"==typeof ids||"object"==typeof ids&&!Array.isArray(ids);onlyOne&&(tmpIds=[ids]);const props=tmpIds.map((id=>"string"==typeof id?_talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__.Ay.action.getActionInfo(context,id):id)).map((info=>{const newprops={},dispatch=(0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(context,"store.dispatch");return dispatch&&(newprops.onClick=(event,data)=>{info.actionCreator?dispatch(_talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__.Ay.action.getActionObject(context,info.id,event,data)):dispatch({model,...info.payload})}),_extends(newprops,evalExpressions(info,context,{model})),newprops}));return onlyOne?props[0]:props}}}]);