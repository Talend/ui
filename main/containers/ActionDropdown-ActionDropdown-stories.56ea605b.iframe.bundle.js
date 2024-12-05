"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[446],{"./src/ActionDropdown/ActionDropdown.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var immutable__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/ActionDropdown/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import Immutable from 'immutable';\nimport { action } from '@storybook/addon-actions';\n\nimport ActionDropdown from '.';\n\nexport default {\n\ttitle: 'AboutDropdown',\n};\n\nexport function Default() {\n\tconst propsInjectedItems = {\n\t\tid: 'injected-items',\n\t\tdisplayMode: 'dropdown',\n\t\tlabel: 'my injected items',\n\t\tonSelect: action('selectAction'),\n\t\tcomponents: {\n\t\t\titemsDropdown: [\n\t\t\t\t{\n\t\t\t\t\tcomponent: 'Action',\n\t\t\t\t\tactionId: 'menu:first',\n\t\t\t\t\twithMenuItem: true,\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tdivider: true,\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tcomponent: 'FilterBar',\n\t\t\t\t\tdockable: false,\n\t\t\t\t\tdocked: false,\n\t\t\t\t\twithMenuItem: true,\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\tcomponent: 'Action',\n\t\t\t\t\tactionId: 'menu:second',\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t};\n\tconst propsImmutableItems = {\n\t\tid: 'immutable-items',\n\t\tdisplayMode: 'dropdown',\n\t\tlabel: 'my immutable items',\n\t\tonSelect: action('selectAction'),\n\t\titems: Immutable.fromJS([\n\t\t\t{\n\t\t\t\tid: 'item1',\n\t\t\t\tlabel: 'First immutable label',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'item2',\n\t\t\t\tlabel: '2nd immutable',\n\t\t\t},\n\t\t]),\n\t};\n\n\treturn (\n\t\t<div>\n\t\t\t<p>ActionDropdown with items in the settings</p>\n\t\t\t<ActionDropdown actionId=\"menu:items-id\" />\n\t\t\t<p>ActionDropdown with items from an expression</p>\n\t\t\t<ActionDropdown actionId=\"menu:items\" />\n\t\t\t<p>ActionDropdown from setting and items from props</p>\n\t\t\t<ActionDropdown actionId=\"menu:first\" actionIds={['menu:first', 'menu:second']} />\n\t\t\t<p>ActionDropdown from setting and a link into the items</p>\n\t\t\t<ActionDropdown actionId=\"action-dropdown:href\" />\n\t\t\t<p>ActionDropdown with components</p>\n\t\t\t<ActionDropdown {...propsInjectedItems} />\n\t\t\t<p>ActionDropdown with immutable items</p>\n\t\t\t<ActionDropdown {...propsImmutableItems} />\n\t\t</div>\n\t);\n}\n",locationsMap:{default:{startLoc:{col:7,line:10},endLoc:{col:1,line:72},startBody:{col:7,line:10},endBody:{col:1,line:72}}}}},title:"AboutDropdown"},Default=function Default(){const propsInjectedItems={id:"injected-items",displayMode:"dropdown",label:"my injected items",onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("selectAction"),components:{itemsDropdown:[{component:"Action",actionId:"menu:first",withMenuItem:!0},{divider:!0},{component:"FilterBar",dockable:!1,docked:!1,withMenuItem:!0},{component:"Action",actionId:"menu:second"}]}},propsImmutableItems={id:"immutable-items",displayMode:"dropdown",label:"my immutable items",onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("selectAction"),items:immutable__WEBPACK_IMPORTED_MODULE_0___default().fromJS([{id:"item1",label:"First immutable label"},{id:"item2",label:"2nd immutable"}])};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown with items in the settings"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{actionId:"menu:items-id"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown with items from an expression"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{actionId:"menu:items"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown from setting and items from props"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{actionId:"menu:first",actionIds:["menu:first","menu:second"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown from setting and a link into the items"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{actionId:"action-dropdown:href"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown with components"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...propsInjectedItems}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:"ActionDropdown with immutable items"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...propsImmutableItems})]})};Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"function Default() {\n  const propsInjectedItems = {\n    id: 'injected-items',\n    displayMode: 'dropdown',\n    label: 'my injected items',\n    onSelect: action('selectAction'),\n    components: {\n      itemsDropdown: [{\n        component: 'Action',\n        actionId: 'menu:first',\n        withMenuItem: true\n      }, {\n        divider: true\n      }, {\n        component: 'FilterBar',\n        dockable: false,\n        docked: false,\n        withMenuItem: true\n      }, {\n        component: 'Action',\n        actionId: 'menu:second'\n      }]\n    }\n  };\n  const propsImmutableItems = {\n    id: 'immutable-items',\n    displayMode: 'dropdown',\n    label: 'my immutable items',\n    onSelect: action('selectAction'),\n    items: Immutable.fromJS([{\n      id: 'item1',\n      label: 'First immutable label'\n    }, {\n      id: 'item2',\n      label: '2nd immutable'\n    }])\n  };\n  return <div>\n            <p>ActionDropdown with items in the settings</p>\n            <ActionDropdown actionId=\"menu:items-id\" />\n            <p>ActionDropdown with items from an expression</p>\n            <ActionDropdown actionId=\"menu:items\" />\n            <p>ActionDropdown from setting and items from props</p>\n            <ActionDropdown actionId=\"menu:first\" actionIds={['menu:first', 'menu:second']} />\n            <p>ActionDropdown from setting and a link into the items</p>\n            <ActionDropdown actionId=\"action-dropdown:href\" />\n            <p>ActionDropdown with components</p>\n            <ActionDropdown {...propsInjectedItems} />\n            <p>ActionDropdown with immutable items</p>\n            <ActionDropdown {...propsImmutableItems} />\n        </div>;\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/ActionDropdown/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ActionDropdown});var prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),ImmutablePropTypes=__webpack_require__("../../node_modules/react-immutable-proptypes/dist/ImmutablePropTypes.js"),ImmutablePropTypes_default=__webpack_require__.n(ImmutablePropTypes),lib_esm=__webpack_require__("../cmf/lib-esm/index.js"),actionOnClick=__webpack_require__("./src/actionOnClick.js"),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}function ContainerActionDropdown({items,...props}){const safeProps=(0,lodash.omit)(props,lib_esm.TJ.INJECTED_PROPS);if(items){const clikableItems=items.map((item=>_extends(item,(0,actionOnClick.A)(item,props))));return(0,jsx_runtime.jsx)(components_lib_esm.ActionDropdown,{items:clikableItems,...safeProps})}return(0,jsx_runtime.jsx)(components_lib_esm.ActionDropdown,{...safeProps})}ContainerActionDropdown.displayName="ContainerActionDropdown",ContainerActionDropdown.displayName="Container(ActionDropdown)",ContainerActionDropdown.propTypes={items:prop_types_default().oneOfType([prop_types_default().arrayOf(prop_types_default().object),ImmutablePropTypes_default().list]),noCaret:prop_types_default().bool,pullRight:prop_types_default().bool,hideLabel:prop_types_default().bool};const ActionDropdown=(0,lib_esm.TJ)({mapStateToProps:function mapStateToProps(state,ownProps={}){let props={};const context={registry:lib_esm.Ay.registry.getRegistry(),store:{getState:()=>state}};ownProps.actionId&&(props=lib_esm.Ay.action.getActionInfo(context,ownProps.actionId));const actionIds=ownProps.actionIds||props.actionIds;return actionIds&&(props.items=actionIds.map((itemId=>lib_esm.Ay.action.getActionInfo(context,itemId)))),props},mergeProps:function mergeProps(stateProps,dispatchProps,ownProps){const props={...ownProps,...stateProps,...dispatchProps};return props.actionId&&delete props.actionId,props.actionIds&&delete props.actionIds,props},omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(ContainerActionDropdown)},"./src/actionOnClick.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>getOnClick});var lodash__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/lodash/lodash.js");function getOnClick(item,props){return item.href?{}:item.actionCreator||(0,lodash__WEBPACK_IMPORTED_MODULE_0__.get)(item,"payload.type")?{onClick(event,data){item.actionCreator?props.dispatchActionCreator(item.actionCreator,event,data):props.dispatch({model:props.model,...item.payload})}}:{}}}}]);