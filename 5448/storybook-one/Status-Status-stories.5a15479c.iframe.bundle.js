"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[8504],{"../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_inheritsLoose});var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,(0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.A)(t,o)}},"../../node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var v4=__webpack_require__("../../node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("../../node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors._U({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"../components/src/Status/Status.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),_Status_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../components/src/Status/Status.component.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const cancelAction={label:"cancel",icon:"talend-cross",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onCancel"),bsSize:"small"},deleteAction={label:"delete",icon:"talend-cross",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onDelete"),bsSize:"small"},myStatus={status:"successful",label:"Successful",icon:"talend-check-circle",actions:[deleteAction]},__WEBPACK_DEFAULT_EXPORT__={title:"Components/Messaging & Communication/Status"},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h1",{children:"Status"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2",{children:"Definition"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"The status component displays a label with icon and when the mouse is over the label, the component displays a button to let the user dispatch"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2",{children:"Examples"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"successful"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"inProgress"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,actions:[cancelAction,deleteAction],status:"inProgress",label:"In Progress",icon:""}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"warning"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,actions:[cancelAction],status:"warning",label:"Warning",icon:"talend-warning"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"failed"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,status:"failed",label:"Failed",icon:"talend-error"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"canceled"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,status:"canceled",label:"Canceled",icon:"talend-block"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"skeleton"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{status:"skeleton",label:"Skeleton",icon:"talend-pencil"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3",{children:"Status without actions"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,actions:[]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"inProgress"})," with progress"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,actions:[cancelAction,deleteAction],status:"inProgress",label:"In Progress",icon:"",progress:"50"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3",{children:["Status with ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("code",{children:"tooltip"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Status_component__WEBPACK_IMPORTED_MODULE_1__.nW,{...myStatus,actions:[],tooltip:"tooltip test"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br",{})]});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => <div>\n        <h1>Status</h1>\n        <h2>Definition</h2>\n        <p>\n            The status component displays a label with icon and when the mouse is over the label, the\n            component displays a button to let the user dispatch\n        </p>\n        <h2>Examples</h2>\n        <h3>\n            Status is <code>successful</code>\n        </h3>\n        <Status {...myStatus} />\n        <h3>\n            Status is <code>inProgress</code>\n        </h3>\n        <Status {...{\n    ...myStatus,\n    actions: [cancelAction, deleteAction]\n  }} status="inProgress" label="In Progress" icon="" />\n        <h3>\n            Status is <code>warning</code>\n        </h3>\n        <Status {...{\n    ...myStatus,\n    actions: [cancelAction]\n  }} status="warning" label="Warning" icon="talend-warning" />\n        <h3>\n            Status is <code>failed</code>\n        </h3>\n        <Status {...myStatus} status="failed" label="Failed" icon="talend-error" />\n        <h3>\n            Status is <code>canceled</code>\n        </h3>\n        <Status {...myStatus} status="canceled" label="Canceled" icon="talend-block" />\n        <h3>\n            Status is <code>skeleton</code>\n        </h3>\n        <Status status="skeleton" label="Skeleton" icon="talend-pencil" />\n        <h3>Status without actions</h3>\n        <Status {...{\n    ...myStatus,\n    actions: []\n  }} />\n        <h3>\n            Status is <code>inProgress</code> with progress\n        </h3>\n        <Status {...{\n    ...myStatus,\n    actions: [cancelAction, deleteAction]\n  }} status="inProgress" label="In Progress" icon="" progress="50" />\n        <h3>\n            Status with <code>tooltip</code>\n        </h3>\n        <Status {...myStatus} actions={[]} tooltip="tooltip test" />\n        <br />\n    </div>',...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"../components/src/Actions/Actions.component.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__),_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../fork/react-bootstrap/lib-esm/ButtonGroup.js"),classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_Action__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../components/src/Actions/Action/index.js"),_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../components/src/OverlayTrigger/index.js"),_Inject__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/Inject/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Actions({getComponent,hideLabel,link,tooltipPlacement,...props}){const buttonGroupProps=function getButtonGroupProps(props){const buttonGroupProps={};return Object.keys(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A.propTypes).forEach((id=>{void 0!==props[id]&&(buttonGroupProps[id]=props[id])})),buttonGroupProps}(props),Renderers=_Inject__WEBPACK_IMPORTED_MODULE_3__.A.getAll(getComponent,{Action:_Action__WEBPACK_IMPORTED_MODULE_1__.A});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A,{className:classnames__WEBPACK_IMPORTED_MODULE_0___default()("tc-actions",props.className),...buttonGroupProps,children:props.actions.map(((action,index)=>{const extraParams={};return hideLabel&&(extraParams.hideLabel=hideLabel),link&&(extraParams.link=link),tooltipPlacement&&(extraParams.tooltipPlacement=tooltipPlacement),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Renderers.Action,{...action,...extraParams},index)}))})}Actions.displayName="Actions",Actions.propTypes={actions:prop_types__WEBPACK_IMPORTED_MODULE_6___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default().shape(_Action__WEBPACK_IMPORTED_MODULE_1__.A.propTypes)])),className:prop_types__WEBPACK_IMPORTED_MODULE_6___default().string,hideLabel:prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool,tooltipPlacement:_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__.A.propTypes.placement,link:prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool,..._talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A.propTypes},Actions.defaultProps={actions:[]};const __WEBPACK_DEFAULT_EXPORT__=Actions},"../../node_modules/dom-helpers/activeElement.js":(module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.__esModule=!0,exports.default=function activeElement(doc){void 0===doc&&(doc=(0,_ownerDocument.default)());try{return doc.activeElement}catch(e){}};var _ownerDocument=_interopRequireDefault(__webpack_require__("../../node_modules/dom-helpers/ownerDocument.js"));module.exports=exports.default},"../../node_modules/prop-types-extra/lib/all.js":(module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function all(){for(var _len=arguments.length,validators=Array(_len),_key=0;_key<_len;_key++)validators[_key]=arguments[_key];return(0,_createChainableTypeChecker2.default)((function allPropTypes(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];var error=null;return validators.forEach((function(validator){if(null==error){var result=validator.apply(void 0,args);null!=result&&(error=result)}})),error}))};var _createChainableTypeChecker2=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__("../../node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js"));module.exports=exports.default},"../../node_modules/uncontrollable/lib/esm/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Pd:()=>uncontrollable});var react=__webpack_require__("../../node_modules/react/index.js"),browser=__webpack_require__("../../node_modules/invariant/browser.js"),browser_default=__webpack_require__.n(browser),noop=function noop(){};function isProp(props,prop){return void 0!==props[prop]}function defaultKey(key){return"default"+key.charAt(0).toUpperCase()+key.substr(1)}var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),inheritsLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),react_lifecycles_compat_es=__webpack_require__("../../node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js"),_jsxFileName="/Users/jquense/src/uncontrollable/src/uncontrollable.js";function uncontrollable(Component,controlledValues,methods){void 0===methods&&(methods=[]);var displayName=Component.displayName||Component.name||"Component",canAcceptRef=function utils_canAcceptRef(component){return!!component&&("function"!=typeof component||component.prototype&&component.prototype.isReactComponent)}(Component),controlledProps=Object.keys(controlledValues),PROPS_TO_OMIT=controlledProps.map(defaultKey);!canAcceptRef&&methods.length&&browser_default()(!1);var UncontrolledComponent=function(_React$Component){function UncontrolledComponent(){for(var _this,_len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];(_this=_React$Component.call.apply(_React$Component,[this].concat(args))||this).handlers=Object.create(null),controlledProps.forEach((function(propName){var handlerName=controlledValues[propName];_this.handlers[handlerName]=function handleChange(value){if(_this.props[handlerName]){var _this$props;_this._notifying=!0;for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];(_this$props=_this.props)[handlerName].apply(_this$props,[value].concat(args)),_this._notifying=!1}_this.unmounted||_this.setState((function(_ref){var _extends2,values=_ref.values;return{values:(0,esm_extends.A)(Object.create(null),values,(_extends2={},_extends2[propName]=value,_extends2))}}))}})),methods.length&&(_this.attachRef=function(ref){_this.inner=ref});var values=Object.create(null);return controlledProps.forEach((function(key){values[key]=_this.props[defaultKey(key)]})),_this.state={values,prevProps:{}},_this}(0,inheritsLoose.A)(UncontrolledComponent,_React$Component);var _proto=UncontrolledComponent.prototype;return _proto.shouldComponentUpdate=function shouldComponentUpdate(){return!this._notifying},UncontrolledComponent.getDerivedStateFromProps=function getDerivedStateFromProps(props,_ref2){var values=_ref2.values,prevProps=_ref2.prevProps,nextState={values:(0,esm_extends.A)(Object.create(null),values),prevProps:{}};return controlledProps.forEach((function(key){nextState.prevProps[key]=props[key],!isProp(props,key)&&isProp(prevProps,key)&&(nextState.values[key]=props[defaultKey(key)])})),nextState},_proto.componentWillUnmount=function componentWillUnmount(){this.unmounted=!0},_proto.render=function render(){var _this2=this,_this$props2=this.props,innerRef=_this$props2.innerRef,props=(0,objectWithoutPropertiesLoose.A)(_this$props2,["innerRef"]);PROPS_TO_OMIT.forEach((function(prop){delete props[prop]}));var newProps={};return controlledProps.forEach((function(propName){var propValue=_this2.props[propName];newProps[propName]=void 0!==propValue?propValue:_this2.state.values[propName]})),react.createElement(Component,(0,esm_extends.A)({},props,newProps,this.handlers,{ref:innerRef||this.attachRef}))},UncontrolledComponent}(react.Component);(0,react_lifecycles_compat_es.polyfill)(UncontrolledComponent),UncontrolledComponent.displayName="Uncontrolled("+displayName+")",UncontrolledComponent.propTypes=(0,esm_extends.A)({innerRef:function innerRef(){}},function uncontrolledPropTypes(controlledValues,displayName){var propTypes={};return Object.keys(controlledValues).forEach((function(prop){propTypes[defaultKey(prop)]=noop})),propTypes}(controlledValues)),methods.forEach((function(method){UncontrolledComponent.prototype[method]=function $proxiedMethod(){var _this$inner;return(_this$inner=this.inner)[method].apply(_this$inner,arguments)}}));var WrappedComponent=UncontrolledComponent;return react.forwardRef&&((WrappedComponent=react.forwardRef((function(props,ref){return react.createElement(UncontrolledComponent,(0,esm_extends.A)({},props,{innerRef:ref,__source:{fileName:_jsxFileName,lineNumber:128},__self:this}))}))).propTypes=UncontrolledComponent.propTypes),WrappedComponent.ControlledComponent=Component,WrappedComponent.deferControlTo=function(newComponent,additions,nextMethods){return void 0===additions&&(additions={}),uncontrollable(newComponent,(0,esm_extends.A)({},controlledValues,additions),nextMethods)},WrappedComponent}}}]);