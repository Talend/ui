(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[2466],{"../components/src/Actions/ActionSplitDropdown/SplitDropdown.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,StyleVariations:()=>StyleVariations,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.component.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const items=[{label:"From Local","data-feature":"actionsplitdropdown.items",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("From Local click")},{label:"From Remote","data-feature":"actionsplitdropdown.items",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("From Remote click")}],itemsWithIcons=[{...items[0],icon:"talend-logo-ic"},{...items[1],icon:"talend-logo-dp"}],myAction={label:"Add File",icon:"talend-environment","data-feature":"actionsplitdropdown",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onAdd"),items,emptyDropdownLabel:"No option"},__WEBPACK_DEFAULT_EXPORT__={title:"Components/Deprecated/SplitDropdown",decorators:[story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[story(),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"container",style:{paddingTop:40}})]})]},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"By default :"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id:"default",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"Options with icons"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id:"icon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{...myAction,items:itemsWithIcons})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"Without icon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id:"noicon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{...myAction,icon:""})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"dropup"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id:"noicon",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{...myAction,dropup:!0})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p",{children:"Empty option"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{id:"empty",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{...myAction,items:[]})})]}),StyleVariations=()=>{const btnStyles={margin:"0 5px"};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{id:"styles",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"default",...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"primary",...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"success",...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"info",...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"warning",...myAction})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span",{style:btnStyles,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ActionSplitDropdown_component__WEBPACK_IMPORTED_MODULE_1__.A,{bsStyle:"danger",...myAction})})]})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => <div>\n        <p>By default :</p>\n        <div id="default">\n            <ActionSplitDropdown {...myAction} />\n        </div>\n        <p>Options with icons</p>\n        <div id="icon">\n            <ActionSplitDropdown {...myAction} items={itemsWithIcons} />\n        </div>\n        <p>Without icon</p>\n        <div id="noicon">\n            <ActionSplitDropdown {...myAction} icon="" />\n        </div>\n        <p>dropup</p>\n        <div id="noicon">\n            <ActionSplitDropdown {...myAction} dropup />\n        </div>\n        <p>Empty option</p>\n        <div id="empty">\n            <ActionSplitDropdown {...myAction} items={[]} />\n        </div>\n    </div>',...Default.parameters?.docs?.source}}},StyleVariations.parameters={...StyleVariations.parameters,docs:{...StyleVariations.parameters?.docs,source:{originalSource:'() => {\n  const btnStyles = {\n    margin: \'0 5px\'\n  };\n  return <div id="styles">\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="default" {...myAction} />\n            </span>\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="primary" {...myAction} />\n            </span>\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="success" {...myAction} />\n            </span>\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="info" {...myAction} />\n            </span>\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="warning" {...myAction} />\n            </span>\n            <span style={btnStyles}>\n                <ActionSplitDropdown bsStyle="danger" {...myAction} />\n            </span>\n        </div>;\n}',...StyleVariations.parameters?.docs?.source}}};const __namedExportsOrder=["Default","StyleVariations"]},"../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.component.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>ActionSplitDropdown});var prop_types__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__),classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../fork/react-bootstrap/lib-esm/SplitButton.js"),_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("../../fork/react-bootstrap/lib-esm/MenuItem.js"),_talend_utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../utils/lib-esm/index.js"),react_i18next__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),_Icon__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/Icon/index.ts"),_ActionSplitDropdown_module_scss__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.module.scss"),_ActionSplitDropdown_module_scss__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_ActionSplitDropdown_module_scss__WEBPACK_IMPORTED_MODULE_4__),_wrapOnClick__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("../components/src/Actions/wrapOnClick.js"),_constants__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../components/src/constants.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/react/index.js");function ActionSplitDropdown(props){const{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.Bd)(_constants__WEBPACK_IMPORTED_MODULE_5__.A),{icon,items,label,emptyDropdownLabel,className,...rest}=props,Title=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span",{children:[icon?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:icon}):null,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span",{children:label})]});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_8__.A,{onClick:(0,_wrapOnClick__WEBPACK_IMPORTED_MODULE_9__.A)(props),title:Title,id:(0,_talend_utils__WEBPACK_IMPORTED_MODULE_1__.N4)(),className:classnames__WEBPACK_IMPORTED_MODULE_0___default()(className,_ActionSplitDropdown_module_scss__WEBPACK_IMPORTED_MODULE_4___default()["tc-split-dropdown"]),"aria-label":label,toggleLabel:t("ACTION_MENU_OPEN",{defaultValue:"Open {{label}} menu",label}),...rest,children:items.length?items.map(((item,index)=>(0,react__WEBPACK_IMPORTED_MODULE_7__.createElement)(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.A,{...item,key:index,onClick:(0,_wrapOnClick__WEBPACK_IMPORTED_MODULE_9__.A)(item)},item.icon&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_3__.A,{name:item.icon}),item.label))):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.A,{disabled:!0,children:emptyDropdownLabel})})}ActionSplitDropdown.displayName="ActionSplitDropdown",ActionSplitDropdown.propTypes={icon:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string,items:prop_types__WEBPACK_IMPORTED_MODULE_11___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_11___default().shape({icon:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string,label:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string,..._talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_10__.A.propTypes})),label:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string.isRequired,model:prop_types__WEBPACK_IMPORTED_MODULE_11___default().object,onClick:prop_types__WEBPACK_IMPORTED_MODULE_11___default().func,emptyDropdownLabel:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string,className:prop_types__WEBPACK_IMPORTED_MODULE_11___default().string,t:prop_types__WEBPACK_IMPORTED_MODULE_11___default().func},ActionSplitDropdown.defaultProps={items:[]}},"../components/src/Actions/wrapOnClick.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function noOp(){}function wrapOnClick(action){const{model,onClick,...rest}=action,eventHandler=onClick||noOp;return event=>eventHandler(event,{action:{...rest},model})}__webpack_require__.d(__webpack_exports__,{A:()=>wrapOnClick})},"../components/src/Icon/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _talend_design_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/lib-esm/index.js");_talend_design_system__WEBPACK_IMPORTED_MODULE_0__.In.displayName="Icon";const __WEBPACK_DEFAULT_EXPORT__=_talend_design_system__WEBPACK_IMPORTED_MODULE_0__.In},"../components/src/constants.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,W:()=>CIRCULAR_PROGRESS_SIZE});const CIRCULAR_PROGRESS_SIZE={small:"small",default:"default",large:"large"},__WEBPACK_DEFAULT_EXPORT__="tui-components"},"../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[14].use[3]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ActionSplitDropdown-module__tc-split-dropdown___bHMl_ li>a i,.ActionSplitDropdown-module__tc-split-dropdown___bHMl_ li>a svg{margin-right:5px;width:1rem;height:1rem}","",{version:3,sources:["webpack://./../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.module.scss","webpack://./../theme/src/theme/_paddings.scss","webpack://./../theme/src/theme/_guidelines.scss"],names:[],mappings:"AAIE,8HAEC,gBCCe,CAAA,UCsEJ,CFrEX,WEqEW",sourcesContent:["@use '@talend/bootstrap-theme/src/theme/guidelines' as *;\n\n.tc-split-dropdown {\n\tli>a {\n\t\ti,\n\t\tsvg {\n\t\t\tmargin-right: $padding-smaller;\n\t\t\twidth: $svg-md-size;\n\t\t\theight: $svg-md-size;\n\t\t}\n\t}\n}\n","////\n/// Talend paddings\n/// @group Paddings\n////\n\n/// Smaller\n/// @type Number (Unit)\n$padding-smaller: 5px !default;\n\n/// Small\n/// @type Number (Unit)\n$padding-small: 10px !default;\n\n/// Normal\n/// @type Number (Unit)\n$padding-normal: 15px !default;\n\n/// Large\n/// @type Number (Unit)\n$padding-large: 20px !default;\n\n/// Larger\n/// @type Number (Unit)\n$padding-larger: 30px !default;\n","////\n/// Talend spec from the guidelines\n/// @group Guidelines\n////\n@use '@talend/design-tokens/lib/tokens' as tokens;\n\n@import './helpers';\n@import './colors';\n@import './paddings';\n@import './variables';\n@import '~@talend/bootstrap-sass/assets/stylesheets/bootstrap/mixins';\n@import './visual-helpers';\n@import './datagrid';\n\n/// Button font size\n/// @type Number (Unit)\n$btn-font-size: 14px !default;\n\n/// Button box shadow width\n/// @type Number (Unit)\n$btn-box-shadow-width: 3px !default;\n\n/// Button background tinting percent\n/// @type Number (Unitless)\n$btn-background-tint-percent: 10 !default;\n\n/// Dropdown caret size\n/// @type Number (Unit)\n$dropdown-caret-size: $caret-width-large !default;\n\n/// Input group button padding\n/// @type Number (Unit)\n$input-group-btn-padding: 0 !default;\n\n/// Input group add-on padding\n/// @type Number (Unit)\n$input-group-addon-padding: 0 !default;\n\n/// Modal header background color\n///\n/// @type Color\n$modal-header-bg: $white !default;\n\n/// Modal header color\n///\n/// @type Color\n$modal-header-color: $black !default;\n\n/// Navbar brand logo width\n/// @type Number (Unit)\n$navbar-brand-logo-height: 20px !default;\n$navbar-brand-logo-width: 75px !default;\n\n/// Drawer z-index\n/// should always stay lower than dialog z-index which is set to 1040\n/// @type Number (Unitless)\n$drawer-z-index: tokens.$coral-elevation-layer-standard-front !default; // 4\n\n/// Navbar form top and bottom width\n/// @type Number (Unit)\n$navbar-form-margin: 0 !default;\n\n/// Navbar search text and border bottom color\n///\n/// @type Color\n$navbar-search-btn-color: $black !default;\n\n/// Extra small button svg size\n/// @type Number (Unitless)\n$svg-xs-size: 0.5rem !default;\n\n/// Small button svg size\n/// @type Number (Unitless)\n$svg-sm-size: 0.75rem !default;\n\n/// Default button svg size\n/// @type Number (Unitless)\n$svg-md-size: 1rem !default;\n\n/// Default button svg size\n/// @type Number (Unitless)\n$svg-rg-size: 1.25rem !default;\n\n/// Large button svg size\n/// @type Number (Unitless)\n$svg-lg-size: 1.5rem !default;\n\n/// Extra large button svg size\n/// @type Number (Unitless)\n$svg-xlg-size: 2rem !default;\n\n/// Breadcrumb height\n/// @type Number (Unit)\n$breadcrumb-height: 3.125rem !default;\n\n/// Breadcrumb max width of each visible items\n/// @type Number (Unit)\n$breadcrumb-items-max-width: 18.75rem !default;\n\n/// Breadcrumb items color\n/// @type Number (Color)\n$breadcrumb-items-color: $black !default;\n\n/// Breadcrumb items color on hover\n/// @type Number (Color)\n$breadcrumb-items-color-hover: $scooter !default;\n\n/// Breadcrumb active item color\n/// @type Number (Color)\n$breadcrumb-items-active-color: $dove-gray !default;\n\n/// Breadcrumb separator color\n/// @type Number (Color)\n$breadcrumb-items-separator-color: $gray !default;\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={"tc-split-dropdown":"ActionSplitDropdown-module__tc-split-dropdown___bHMl_"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.module.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var API=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),domAPI=__webpack_require__("../../node_modules/style-loader/dist/runtime/styleDomAPI.js"),insertFn=__webpack_require__("../../node_modules/style-loader/dist/runtime/insertBySelector.js"),setAttributes=__webpack_require__("../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),insertStyleElement=__webpack_require__("../../node_modules/style-loader/dist/runtime/insertStyleElement.js"),styleTagTransformFn=__webpack_require__("../../node_modules/style-loader/dist/runtime/styleTagTransform.js"),content=__webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[14].use[3]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!../components/src/Actions/ActionSplitDropdown/ActionSplitDropdown.module.scss");content=content.__esModule?content.default:content;var options={};options.styleTagTransform=styleTagTransformFn,options.setAttributes=setAttributes,options.insert=insertFn.bind(null,"head"),options.domAPI=domAPI,options.insertStyleElement=insertStyleElement;API(content,options);module.exports=content&&content.locals||{}}}]);