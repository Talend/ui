"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[346],{"../components/src/SidePanel/SidePanel.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Docked:()=>Docked,Links:()=>Links,Minimised:()=>Minimised,Reverse:()=>Reverse,ReverseLargeDocked:()=>ReverseLargeDocked,ReverseWithLayout:()=>ReverseWithLayout,Uncontrolled:()=>Uncontrolled,WithALargeAmountOfItems:()=>WithALargeAmountOfItems,WithBackgroundIcon:()=>WithBackgroundIcon,_WithLayout:()=>_WithLayout,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),_talend_assets_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../assets-api/lib-esm/index.js"),_Layout__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/Layout/index.js"),_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../components/src/SidePanel/SidePanel.component.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const actions=[{label:"Preparations",icon:"talend-dataprep",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Preparations clicked"),active:!0},{label:"Datasets",iconName:"dataset",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Datasets clicked")},{label:"Favorites",icon:"talend-star",beta:!0,onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Favorites clicked")}],actionsLinks=[{label:"Preparations",icon:"talend-dataprep",href:"/preparations",active:!0,beta:!0},{label:"Datasets",icon:"talend-download",href:"/datasets",beta:!0},{label:"Favorites",icon:"talend-star",href:"/favorites"}],items=[{key:"preparations",label:"Preparations",beta:!0,icon:"talend-dataprep"},{key:"datasets",label:"Datasets",icon:"talend-download"},{key:"favorites",label:"Favorites",icon:"talend-star"}],other=[{key:"users",label:"Users",icon:"talend-user-circle"},{key:"groups",label:"Groups",icon:"talend-group-circle",beta:!0},{key:"roles",label:"Roles",icon:"talend-roles"},{key:"licenses",label:"Licenses",icon:"talend-license"},{key:"projects",label:"Projects",icon:"talend-projects"},{key:"activity",label:"Activity",icon:"talend-activity"}],__WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/SidePanel"},Uncontrolled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{id:"context",actions,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),tooltipPlacement:"top"}),Controlled=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{id:"context",actions,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),onToggleDock:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onToggleDock"),tooltipPlacement:"top"}),WithBackgroundIcon=(_,context)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_3__.A,{mode:"TwoColumns",theme:context.globals.theme,one:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{id:"context",actions,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),onToggleDock:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onToggleDock"),tooltipPlacement:"top",backgroundIcon:_talend_assets_api__WEBPACK_IMPORTED_MODULE_2__.A.getURL("/src/svg/products/tmc-negative.svg","@talend/icons","7.10.3")}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("article",{style:{padding:10},children:["The props ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong",{children:"backgroundIcon"})," let you support product icons. It is used as"," ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("pre",{children:"mask-image: url(backgroundIcon)"})," so you have to provide URL. For this example we have used assetsApi this way:",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("pre",{children:["backgroundIcon=",_talend_assets_api__WEBPACK_IMPORTED_MODULE_2__.A.getURL("/src/svg/products/tmc-negative.svg","@talend/icons","7.10.3")]})]})}),Links=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{id:"context",actions:actionsLinks,tooltipPlacement:"top"}),Docked=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions,docked:!0,tooltipPlacement:"top"}),Minimised=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions,onToggleDock:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Toggle dock clicked"),minimised:!0,tooltipPlacement:"top"}),WithALargeAmountOfItems=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions:[...items,...other,...other,...other],onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),selected:items[1],tooltipPlacement:"top"}),Reverse=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions:items,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),selected:items[1],reverse:!0,tooltipPlacement:"top"}),ReverseLargeDocked=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions:items,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),selected:items[1],reverse:!0,large:!0,minimised:!0,dockable:!1,tooltipPlacement:"top"}),_WithLayout=(_,context)=>{class WithLayout extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(){super(),this.state={docked:!1}}render(){const panel=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions:[...items,...other,...other,...other],onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),docked:this.state.docked,tooltipPlacement:"top"});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_3__.A,{mode:"TwoColumns",one:panel,theme:context.globals.theme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ol",{children:new Array(100).fill("This is some random content").map(((item,num)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{children:item},num)))})})}}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(WithLayout,{})},ReverseWithLayout=(_,context)=>{const panelItems=items.concat([{key:"longname",label:"Some super super super long name",icon:"talend-world"}]),panel=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_SidePanel_component__WEBPACK_IMPORTED_MODULE_4__.A,{actions:panelItems,onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("onItemSelect"),reverse:!0,tooltipPlacement:"top"});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_3__.A,{mode:"TwoColumns",one:panel,theme:context.globals.theme,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("ol",{children:new Array(100).fill("This is some random content").map(((item,num)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li",{children:item},num)))})})};Uncontrolled.parameters={...Uncontrolled.parameters,docs:{...Uncontrolled.parameters?.docs,source:{originalSource:'() => <SidePanel id="context" actions={actions} onSelect={action(\'onItemSelect\')} tooltipPlacement="top" />',...Uncontrolled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"() => <SidePanel id=\"context\" actions={actions} onSelect={action('onItemSelect')} onToggleDock={action('onToggleDock')} tooltipPlacement=\"top\" />",...Controlled.parameters?.docs?.source}}},WithBackgroundIcon.parameters={...WithBackgroundIcon.parameters,docs:{...WithBackgroundIcon.parameters?.docs,source:{originalSource:"(_, context) => <Layout mode=\"TwoColumns\" theme={context.globals.theme} one={<SidePanel id=\"context\" actions={actions} onSelect={action('onItemSelect')} onToggleDock={action('onToggleDock')} tooltipPlacement=\"top\" backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')} />}>\n        <article style={{\n    padding: 10\n  }}>\n            The props <strong>backgroundIcon</strong> let you support product icons. It is used as{' '}\n            <pre>mask-image: url(backgroundIcon)</pre> so you have to provide URL. For this example we\n            have used assetsApi this way:\n            <pre>\n                backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')}\n            </pre>\n        </article>\n    </Layout>",...WithBackgroundIcon.parameters?.docs?.source}}},Links.parameters={...Links.parameters,docs:{...Links.parameters?.docs,source:{originalSource:'() => <SidePanel id="context" actions={actionsLinks} tooltipPlacement="top" />',...Links.parameters?.docs?.source}}},Docked.parameters={...Docked.parameters,docs:{...Docked.parameters?.docs,source:{originalSource:'() => <SidePanel actions={actions} docked tooltipPlacement="top" />',...Docked.parameters?.docs?.source}}},Minimised.parameters={...Minimised.parameters,docs:{...Minimised.parameters?.docs,source:{originalSource:"() => <SidePanel actions={actions} onToggleDock={action('Toggle dock clicked')} minimised tooltipPlacement=\"top\" />",...Minimised.parameters?.docs?.source}}},WithALargeAmountOfItems.parameters={...WithALargeAmountOfItems.parameters,docs:{...WithALargeAmountOfItems.parameters?.docs,source:{originalSource:"() => <SidePanel actions={[...items, ...other, ...other, ...other]} onSelect={action('onItemSelect')} selected={items[1]} tooltipPlacement=\"top\" />",...WithALargeAmountOfItems.parameters?.docs?.source}}},Reverse.parameters={...Reverse.parameters,docs:{...Reverse.parameters?.docs,source:{originalSource:"() => <SidePanel actions={items} onSelect={action('onItemSelect')} selected={items[1]} reverse tooltipPlacement=\"top\" />",...Reverse.parameters?.docs?.source}}},ReverseLargeDocked.parameters={...ReverseLargeDocked.parameters,docs:{...ReverseLargeDocked.parameters?.docs,source:{originalSource:"() => <SidePanel actions={items} onSelect={action('onItemSelect')} selected={items[1]} reverse large minimised dockable={false} tooltipPlacement=\"top\" />",...ReverseLargeDocked.parameters?.docs?.source}}},_WithLayout.parameters={..._WithLayout.parameters,docs:{..._WithLayout.parameters?.docs,source:{originalSource:"(_, context) => {\n  class WithLayout extends Component {\n    constructor() {\n      super();\n      this.state = {\n        docked: false\n      };\n    }\n    render() {\n      const panel = <SidePanel actions={[...items, ...other, ...other, ...other]} onSelect={action('onItemSelect')} docked={this.state.docked} tooltipPlacement=\"top\" />;\n      return <Layout mode=\"TwoColumns\" one={panel} theme={context.globals.theme}>\n                    <ol>\n                        {new Array(100).fill('This is some random content').map((item, num) => <li key={num}>{item}</li>)}\n                    </ol>\n                </Layout>;\n    }\n  }\n  return <WithLayout />;\n}",..._WithLayout.parameters?.docs?.source}}},ReverseWithLayout.parameters={...ReverseWithLayout.parameters,docs:{...ReverseWithLayout.parameters?.docs,source:{originalSource:"(_, context) => {\n  const panelItems = items.concat([{\n    key: 'longname',\n    label: 'Some super super super long name',\n    icon: 'talend-world'\n  }]);\n  const panel = <SidePanel actions={panelItems} onSelect={action('onItemSelect')} reverse tooltipPlacement=\"top\" />;\n  return <Layout mode=\"TwoColumns\" one={panel} theme={context.globals.theme}>\n            <ol>\n                {new Array(100).fill('This is some random content').map((item, num) => <li key={num}>{item}</li>)}\n            </ol>\n        </Layout>;\n}",...ReverseWithLayout.parameters?.docs?.source}}};const __namedExportsOrder=["Uncontrolled","Controlled","WithBackgroundIcon","Links","Docked","Minimised","WithALargeAmountOfItems","Reverse","ReverseLargeDocked","_WithLayout","ReverseWithLayout"]},"../../node_modules/dom-helpers/activeElement.js":(module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.__esModule=!0,exports.default=function activeElement(doc){void 0===doc&&(doc=(0,_ownerDocument.default)());try{return doc.activeElement}catch(e){}};var _ownerDocument=_interopRequireDefault(__webpack_require__("../../node_modules/dom-helpers/ownerDocument.js"));module.exports=exports.default},"../../node_modules/prop-types-extra/lib/all.js":(module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function all(){for(var _len=arguments.length,validators=Array(_len),_key=0;_key<_len;_key++)validators[_key]=arguments[_key];return(0,_createChainableTypeChecker2.default)((function allPropTypes(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];var error=null;return validators.forEach((function(validator){if(null==error){var result=validator.apply(void 0,args);null!=result&&(error=result)}})),error}))};var _createChainableTypeChecker2=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__("../../node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js"));module.exports=exports.default},"../../node_modules/uncontrollable/lib/esm/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Pd:()=>uncontrollable});var react=__webpack_require__("../../node_modules/react/index.js"),browser=__webpack_require__("../../node_modules/invariant/browser.js"),browser_default=__webpack_require__.n(browser),noop=function noop(){};function isProp(props,prop){return void 0!==props[prop]}function defaultKey(key){return"default"+key.charAt(0).toUpperCase()+key.substr(1)}var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),inheritsLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),react_lifecycles_compat_es=__webpack_require__("../../node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js"),_jsxFileName="/Users/jquense/src/uncontrollable/src/uncontrollable.js";function uncontrollable(Component,controlledValues,methods){void 0===methods&&(methods=[]);var displayName=Component.displayName||Component.name||"Component",canAcceptRef=function utils_canAcceptRef(component){return!!component&&("function"!=typeof component||component.prototype&&component.prototype.isReactComponent)}(Component),controlledProps=Object.keys(controlledValues),PROPS_TO_OMIT=controlledProps.map(defaultKey);!canAcceptRef&&methods.length&&browser_default()(!1);var UncontrolledComponent=function(_React$Component){function UncontrolledComponent(){for(var _this,_len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];(_this=_React$Component.call.apply(_React$Component,[this].concat(args))||this).handlers=Object.create(null),controlledProps.forEach((function(propName){var handlerName=controlledValues[propName];_this.handlers[handlerName]=function handleChange(value){if(_this.props[handlerName]){var _this$props;_this._notifying=!0;for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];(_this$props=_this.props)[handlerName].apply(_this$props,[value].concat(args)),_this._notifying=!1}_this.unmounted||_this.setState((function(_ref){var _extends2,values=_ref.values;return{values:(0,esm_extends.A)(Object.create(null),values,(_extends2={},_extends2[propName]=value,_extends2))}}))}})),methods.length&&(_this.attachRef=function(ref){_this.inner=ref});var values=Object.create(null);return controlledProps.forEach((function(key){values[key]=_this.props[defaultKey(key)]})),_this.state={values,prevProps:{}},_this}(0,inheritsLoose.A)(UncontrolledComponent,_React$Component);var _proto=UncontrolledComponent.prototype;return _proto.shouldComponentUpdate=function shouldComponentUpdate(){return!this._notifying},UncontrolledComponent.getDerivedStateFromProps=function getDerivedStateFromProps(props,_ref2){var values=_ref2.values,prevProps=_ref2.prevProps,nextState={values:(0,esm_extends.A)(Object.create(null),values),prevProps:{}};return controlledProps.forEach((function(key){nextState.prevProps[key]=props[key],!isProp(props,key)&&isProp(prevProps,key)&&(nextState.values[key]=props[defaultKey(key)])})),nextState},_proto.componentWillUnmount=function componentWillUnmount(){this.unmounted=!0},_proto.render=function render(){var _this2=this,_this$props2=this.props,innerRef=_this$props2.innerRef,props=(0,objectWithoutPropertiesLoose.A)(_this$props2,["innerRef"]);PROPS_TO_OMIT.forEach((function(prop){delete props[prop]}));var newProps={};return controlledProps.forEach((function(propName){var propValue=_this2.props[propName];newProps[propName]=void 0!==propValue?propValue:_this2.state.values[propName]})),react.createElement(Component,(0,esm_extends.A)({},props,newProps,this.handlers,{ref:innerRef||this.attachRef}))},UncontrolledComponent}(react.Component);(0,react_lifecycles_compat_es.polyfill)(UncontrolledComponent),UncontrolledComponent.displayName="Uncontrolled("+displayName+")",UncontrolledComponent.propTypes=(0,esm_extends.A)({innerRef:function innerRef(){}},function uncontrolledPropTypes(controlledValues,displayName){var propTypes={};return Object.keys(controlledValues).forEach((function(prop){propTypes[defaultKey(prop)]=noop})),propTypes}(controlledValues)),methods.forEach((function(method){UncontrolledComponent.prototype[method]=function $proxiedMethod(){var _this$inner;return(_this$inner=this.inner)[method].apply(_this$inner,arguments)}}));var WrappedComponent=UncontrolledComponent;return react.forwardRef&&((WrappedComponent=react.forwardRef((function(props,ref){return react.createElement(UncontrolledComponent,(0,esm_extends.A)({},props,{innerRef:ref,__source:{fileName:_jsxFileName,lineNumber:128},__self:this}))}))).propTypes=UncontrolledComponent.propTypes),WrappedComponent.ControlledComponent=Component,WrappedComponent.deferControlTo=function(newComponent,additions,nextMethods){return void 0===additions&&(additions={}),uncontrollable(newComponent,(0,esm_extends.A)({},controlledValues,additions),nextMethods)},WrappedComponent}}}]);