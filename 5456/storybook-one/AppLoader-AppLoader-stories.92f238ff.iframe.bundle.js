"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[4654],{"../components/src/AppLoader/AppLoader.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>AppLoader_stories});var prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),es=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),constants=__webpack_require__("../components/src/constants.js"),translate=__webpack_require__("../components/src/translate.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function AppLoaderComponent({t}){return(0,jsx_runtime.jsx)("div",{className:"tc-app-loader-container","aria-label":t("APP_LOADER_LOADING",{defaultValue:"Loading application"}),role:"status",children:(0,jsx_runtime.jsx)("div",{className:"tc-app-loader-icon",children:(0,jsx_runtime.jsx)("div",{className:"tc-app-loader",children:(0,jsx_runtime.jsxs)("div",{className:"spinner-wrapper",children:[(0,jsx_runtime.jsx)("div",{className:"spinner-left",children:(0,jsx_runtime.jsx)("div",{className:"circle"})}),(0,jsx_runtime.jsx)("div",{className:"spinner-right",children:(0,jsx_runtime.jsx)("div",{className:"circle"})})]})})})})}AppLoaderComponent.propTypes={t:prop_types_default().func},AppLoaderComponent.defaultProps={t:(0,translate.Ay)()};const AppLoader_component=(0,es.CI)(constants.A)(AppLoaderComponent),LOADER_STYLE="* {\n\tbox-sizing: border-box;\n}\n\nbody {\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.tc-app-loader-container {\n  display: flex;\n  height: 100vh;\n  width: 100vw;\n  background: #f6f6f6;\n  background: var(--coral-color-neutral-background-medium, #f6f6f6);\n}\n\n.tc-app-loader-icon {\n  animation: app-loader-fadeIn 1.5s linear infinite;\n  background-image: ICON_BASE_64;\n  display: inline-block;\n  position: relative;\n  width: 151px;\n  height: 151px;\n  border-radius: 50%;\n  margin: auto;\n}\n   \n.tc-app-loader {\n  animation: container-rotate 1568ms linear infinite;\n  display: inline-block;\n  position: relative;\n  width: 165px;\n  height: 165px;\n  margin: -7px 0px 0px -7px;\n}\n\n.tc-app-loader .spinner-wrapper {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border-color: #ababab;\n  border-color: var(--coral-color-neutral-border, #ababab);\n  opacity: 1;\n  animation: app-loader-spin 5332ms cubic-bezier(.4, 0, .2, 1) infinite both;\n}\n\n.tc-app-loader .spinner-left,\n.tc-app-loader .spinner-right {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit;\n}\n\n.tc-app-loader .spinner-left {\n  float: left !important;\n}\n\n.tc-app-loader .spinner-right {\n  float: right !important;\n}\n\n.tc-app-loader .spinner-left .circle,\n.tc-app-loader .spinner-right .circle {\n  width: 165px;\n  height: 165px;\n  content: '';\n  border-width: 4.5px;\n  border-style: solid;\n  border-color: inherit;\n  border-bottom-color: transparent !important;\n  border-radius: 50%;\n  animation: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.tc-app-loader .spinner-left .circle {\n  animation: left-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;\n  left: 0;\n  border-right-color: transparent !important;\n  transform: rotate(129deg);\n}\n\n.tc-app-loader .spinner-right .circle {\n  animation: right-spin 1333ms cubic-bezier(.4, 0, .2, 1) infinite both;\n  left: -100%;\n  border-left-color: transparent !important;\n  transform: rotate(-129deg);\n}\n\n@keyframes container-rotate {\n  100% {\n      transform: rotate(360deg);\n  }\n}\n\n@keyframes app-loader-spin {\n  12.5% {\n      transform: rotate(135deg);\n  }\n  25% {\n      transform: rotate(270deg);\n  }\n  37.5% {\n      transform: rotate(405deg);\n  }\n  50% {\n      transform: rotate(540deg);\n  }\n  62.5% {\n      transform: rotate(675deg);\n  }\n  75% {\n      transform: rotate(810deg);\n  }\n  87.5% {\n      transform: rotate(945deg);\n  }\n  100% {\n      transform: rotate(1080deg);\n  }\n}\n\n@keyframes left-spin {\n  0% {\n      transform: rotate(130deg);\n  }\n  50% {\n      transform: rotate(-5deg);\n  }\n  100% {\n      transform: rotate(130deg);\n  }\n}\n\n@keyframes right-spin {\n  0% {\n      transform: rotate(-130deg);\n  }\n\n  50% {\n      transform: rotate(5deg);\n  }\n  100% {\n      transform: rotate(-130deg);\n  }\n}\n\n@keyframes app-loader-fadeIn {\n  0%,\n  100% {\n    opacity: 0.5;\n  }\n  50% {\n    opacity: 1;\n  }\n}";const constant={APP_LOADER:'<div class="tc-app-loader-container" aria-label="Loading application" role="status">\n\t<div class="tc-app-loader-icon">\n\t\t<div class="tc-app-loader" >\n\t\t\t<div class="spinner-wrapper">\n\t\t\t\t<div class="spinner-left" >\n\t\t\t\t\t<div class="circle"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="spinner-right">\n\t\t\t\t\t<div class="circle"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n',getLoaderStyle:function getLoaderStyle(icon=""){return LOADER_STYLE.replace("ICON_BASE_64",icon)}},AppLoader_stories={title:"Components/Design Principles/Loading Feedback/AppLoader",component:({iconUrl})=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("style",{children:constant.getLoaderStyle(`url(${iconUrl})`)}),(0,jsx_runtime.jsx)(AppLoader_component,{})]})},Default={argTypes:{iconUrl:{name:"iconUrl",type:{name:"string",required:!0},defaultValue:"https://unpkg.com/@talend/icons@6.51.1/src/svg/products/logo-square.svg"}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  argTypes: {\n    iconUrl: {\n      name: 'iconUrl',\n      type: {\n        name: 'string',\n        required: true\n      },\n      defaultValue: 'https://unpkg.com/@talend/icons@6.51.1/src/svg/products/logo-square.svg'\n    }\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"../components/src/constants.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,W:()=>CIRCULAR_PROGRESS_SIZE});const CIRCULAR_PROGRESS_SIZE={small:"small",default:"default",large:"large"},__WEBPACK_DEFAULT_EXPORT__="tui-components"},"../components/src/translate.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ay:()=>getDefaultT,UK:()=>getCurrentLanguage,kh:()=>getI18nInstance});var react_i18next__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),i18next__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/i18next/dist/esm/i18next.js");function getI18nInstance(){return(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.TO)()?i18next__WEBPACK_IMPORTED_MODULE_1__.Ay:i18next__WEBPACK_IMPORTED_MODULE_1__.Ay.createInstance({},(()=>{}))}function getDefaultT(){const i18n=(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.TO)();return i18n?i18n.t.bind((0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.TO)()):__webpack_require__.g.I18NEXT_T}function getCurrentLanguage(){return i18next__WEBPACK_IMPORTED_MODULE_1__.Ay.language?i18next__WEBPACK_IMPORTED_MODULE_1__.Ay.language:"en"}(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.TO)()||(console.warn("@talend/react-components used without i18n host."),(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.Vx)(i18next__WEBPACK_IMPORTED_MODULE_1__.Ay.createInstance({},(()=>{}))))}}]);