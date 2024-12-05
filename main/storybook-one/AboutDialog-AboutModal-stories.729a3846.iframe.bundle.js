(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[3485],{"../components/src/AboutDialog/AboutModal.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Expanded:()=>Expanded,ExpandedLoading:()=>ExpandedLoading,ExpandedWithLotOfServices:()=>ExpandedWithLotOfServices,Loading:()=>Loading,WithCustomDefinition:()=>WithCustomDefinition,WithoutTheVersion:()=>WithoutTheVersion,__namedExportsOrder:()=>__namedExportsOrder,default:()=>AboutModal_stories});var dist=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),classnames=__webpack_require__("../../node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),es=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),Dialog=__webpack_require__("../components/src/Dialog/index.js"),Icon=__webpack_require__("../components/src/Icon/index.ts"),Skeleton=__webpack_require__("../components/src/Skeleton/index.ts"),constants=__webpack_require__("../components/src/constants.js"),translate=__webpack_require__("../components/src/translate.js"),AboutDialog_module=__webpack_require__("../components/src/AboutDialog/AboutDialog.module.scss"),AboutDialog_module_default=__webpack_require__.n(AboutDialog_module),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const i18n=(0,translate.kh)(),getColumnHeaders=()=>({name:{key:"name",label:i18n.t("tui-components:SERVICE",{defaultValue:"Service"})},build:{key:"build",label:i18n.t("tui-components:BUILD_ID",{defaultValue:"Build ID"})},version:{key:"version",label:i18n.t("tui-components:VERSION",{defaultValue:"Version"})}});function Text({text="",loading,size=Skeleton.A.SIZES.medium}){return loading?(0,jsx_runtime.jsx)(Skeleton.A,{type:Skeleton.A.TYPES.text,size}):text}function AboutDialogTable({definition=Object.values(getColumnHeaders()),services=[],loading=!1}){return services&&services.length?(0,jsx_runtime.jsxs)("table",{className:classnames_default()(AboutDialog_module_default()["about-versions"],"about-versions","table table-striped"),children:[(0,jsx_runtime.jsx)("thead",{children:(0,jsx_runtime.jsx)("tr",{children:definition.map((attribute=>(0,jsx_runtime.jsx)("th",{children:attribute.label},attribute.key)))})}),(0,jsx_runtime.jsx)("tbody",{children:(loading?[{name:"loading-first"},{name:"loading-second"},{name:"loading-third"}]:services).map((service=>(0,jsx_runtime.jsx)("tr",{children:definition.map((attribute=>(0,jsx_runtime.jsx)("td",{children:(0,jsx_runtime.jsx)(Text,{loading,text:service[attribute.key]})},attribute.key)))},service.name)))})]}):null}function AboutDialog({services,expanded,definition,show,product,version,loading,icon,copyrights,onToggle,onHide,t}){const bar={actions:{center:[{label:expanded?t("LESS",{defaultValue:"Less"}):t("MORE",{defaultValue:"More"}),className:"btn-default btn-inverse",onClick:onToggle}]}};return(0,jsx_runtime.jsx)(Dialog.A,{header:t("ABOUT_HEADER",{defaultValue:"About {{product}}",product}),className:classnames_default()(AboutDialog_module_default()["about-dialog"],"about-dialog"),type:Dialog.A.TYPES.INFORMATIVE,onHide,actionbar:bar,show,children:(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Icon.A,{name:icon,className:classnames_default()(AboutDialog_module_default()["about-logo"],"about-logo"),"data-testid":"icon"}),(0,jsx_runtime.jsxs)("div",{className:classnames_default()(AboutDialog_module_default()["about-excerpt"],"about-excerpt"),children:[version&&(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(Text,{text:t("ABOUT_VERSION_NAME",{defaultValue:"Version: {{version}}",version,interpolation:{escapeValue:!1}}),size:Skeleton.A.SIZES.xlarge,loading})}),(0,jsx_runtime.jsx)("div",{children:(0,jsx_runtime.jsx)(Text,{text:copyrights||t("ABOUT_COPYRIGHTS",{defaultValue:"© {{year}} Talend. All rights reserved.",year:(new Date).getFullYear()}),size:Skeleton.A.SIZES.large,loading})})]}),expanded&&(0,jsx_runtime.jsx)(AboutDialogTable,{t,loading,services,definition})]})})}Text.propTypes={text:prop_types_default().string,loading:prop_types_default().bool,size:prop_types_default().string},AboutDialogTable.propTypes={services:prop_types_default().arrayOf(prop_types_default().shape({name:prop_types_default().string,version:prop_types_default().string,build:prop_types_default().string})),definition:prop_types_default().arrayOf(prop_types_default().shape({key:prop_types_default().string,label:prop_types_default().string})),loading:prop_types_default().bool},AboutDialog.displayName="AboutDialog",AboutDialog.defaultProps={t:(0,translate.Ay)()};const AboutDialog_component=(0,es.CI)(constants.A)(AboutDialog);AboutDialogTable.Text=Text,AboutDialogTable.getColumnHeaders=getColumnHeaders,AboutDialog_component.Table=AboutDialogTable;const src_AboutDialog=AboutDialog_component,props={show:!0,onToggle:(0,dist.XI)("onToggle"),version:"Summer '18",icon:"talend-tdp-colored",services:["API","Dataset","Preparation","Transformation"].map((name=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name})))},services=["API","Dataset","Preparation","Transformation","service2","service3","service4","service5","service6","service7","service8","service9","service12","service13","service14","service15","service16","service17","service18","service19"].map((name=>({version:"2.8.0-SNAPSHOT",build:"87d0dcd-12e0d6f",name}))),{name:AboutModal_stories_name,version}=src_AboutDialog.Table.getColumnHeaders(),AboutModal_stories={title:"Components/Layout/Modals/AboutModal",decorators:[story=>(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h1",{children:"AboutDialog"}),story()]})]},Default=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{...props}),WithoutTheVersion=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{...props,version:null}),Loading=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{loading:!0,...props}),Expanded=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{expanded:!0,...props}),ExpandedWithLotOfServices=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{expanded:!0,...props,services}),WithCustomDefinition=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{expanded:!0,...props,services,definition:[AboutModal_stories_name,version]}),ExpandedLoading=()=>(0,jsx_runtime.jsx)(src_AboutDialog,{expanded:!0,loading:!0,...props});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => <AboutDialog {...props} />",...Default.parameters?.docs?.source}}},WithoutTheVersion.parameters={...WithoutTheVersion.parameters,docs:{...WithoutTheVersion.parameters?.docs,source:{originalSource:"() => <AboutDialog {...props} version={null} />",...WithoutTheVersion.parameters?.docs?.source}}},Loading.parameters={...Loading.parameters,docs:{...Loading.parameters?.docs,source:{originalSource:"() => <AboutDialog loading {...props} />",...Loading.parameters?.docs?.source}}},Expanded.parameters={...Expanded.parameters,docs:{...Expanded.parameters?.docs,source:{originalSource:"() => <AboutDialog expanded {...props} />",...Expanded.parameters?.docs?.source}}},ExpandedWithLotOfServices.parameters={...ExpandedWithLotOfServices.parameters,docs:{...ExpandedWithLotOfServices.parameters?.docs,source:{originalSource:"() => <AboutDialog expanded {...props} services={services} />",...ExpandedWithLotOfServices.parameters?.docs?.source}}},WithCustomDefinition.parameters={...WithCustomDefinition.parameters,docs:{...WithCustomDefinition.parameters?.docs,source:{originalSource:"() => <AboutDialog expanded {...props} services={services} definition={[name, version]} />",...WithCustomDefinition.parameters?.docs?.source}}},ExpandedLoading.parameters={...ExpandedLoading.parameters,docs:{...ExpandedLoading.parameters?.docs,source:{originalSource:"() => <AboutDialog expanded loading {...props} />",...ExpandedLoading.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithoutTheVersion","Loading","Expanded","ExpandedWithLotOfServices","WithCustomDefinition","ExpandedLoading"]},"../components/src/Dialog/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../components/src/Dialog/Dialog.component.js").A},"../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[14].use[3]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!../components/src/AboutDialog/AboutDialog.module.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".AboutDialog-module__about-dialog___jOIuo .modal-body{text-align:center;padding-top:.625rem;padding-left:2rem;padding-right:2rem}.AboutDialog-module__about-dialog___jOIuo .modal-body .AboutDialog-module__about-logo___EI18b{width:4.125rem;height:4.125rem}.AboutDialog-module__about-dialog___jOIuo .modal-body .AboutDialog-module__about-excerpt___OqvUx{margin-top:1.25rem}.AboutDialog-module__about-dialog___jOIuo .modal-body .AboutDialog-module__about-versions___ZV7c9{margin:0 auto;margin-top:1.875rem;text-align:justify;table-layout:fixed}.AboutDialog-module__about-dialog___jOIuo .modal-body .AboutDialog-module__about-versions___ZV7c9 th,.AboutDialog-module__about-dialog___jOIuo .modal-body .AboutDialog-module__about-versions___ZV7c9 td{padding:5px;text-align:left}","",{version:3,sources:["webpack://./../components/src/AboutDialog/AboutDialog.module.scss","webpack://./../theme/src/theme/_paddings.scss"],names:[],mappings:"AAGC,sDACC,iBAAA,CAEC,mBAAA,CACA,iBAAA,CACA,kBAAA,CAIA,8FACC,cAAA,CACA,eAAA,CAGD,iGACC,kBAAA,CAGD,kGACC,aAAA,CACA,mBAAA,CACA,kBAAA,CACA,kBAAA,CAEA,0MAEC,WCtBa,CDuBb,eAAA",sourcesContent:["@use '@talend/bootstrap-theme/src/theme/guidelines' as *;\n\n.about-dialog {\n\t:global(.modal-body) {\n\t\ttext-align: center;\n\t\tpadding: {\n\t\t\ttop: 0.625rem;\n\t\t\tleft: 2rem;\n\t\t\tright: 2rem;\n\t\t}\n\n\t\t.about {\n\t\t\t&-logo {\n\t\t\t\twidth: 4.125rem;\n\t\t\t\theight: 4.125rem;\n\t\t\t}\n\n\t\t\t&-excerpt {\n\t\t\t\tmargin-top: 1.25rem;\n\t\t\t}\n\n\t\t\t&-versions {\n\t\t\t\tmargin: 0 auto;\n\t\t\t\tmargin-top: 1.875rem;\n\t\t\t\ttext-align: justify;\n\t\t\t\ttable-layout: fixed;\n\n\t\t\t\tth,\n\t\t\t\ttd {\n\t\t\t\t\tpadding: $padding-smaller;\n\t\t\t\t\ttext-align: left;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n","////\n/// Talend paddings\n/// @group Paddings\n////\n\n/// Smaller\n/// @type Number (Unit)\n$padding-smaller: 5px !default;\n\n/// Small\n/// @type Number (Unit)\n$padding-small: 10px !default;\n\n/// Normal\n/// @type Number (Unit)\n$padding-normal: 15px !default;\n\n/// Large\n/// @type Number (Unit)\n$padding-large: 20px !default;\n\n/// Larger\n/// @type Number (Unit)\n$padding-larger: 30px !default;\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={"about-dialog":"AboutDialog-module__about-dialog___jOIuo","about-logo":"AboutDialog-module__about-logo___EI18b","about-excerpt":"AboutDialog-module__about-excerpt___OqvUx","about-versions":"AboutDialog-module__about-versions___ZV7c9"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"../components/src/AboutDialog/AboutDialog.module.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var API=__webpack_require__("../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),domAPI=__webpack_require__("../../node_modules/style-loader/dist/runtime/styleDomAPI.js"),insertFn=__webpack_require__("../../node_modules/style-loader/dist/runtime/insertBySelector.js"),setAttributes=__webpack_require__("../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),insertStyleElement=__webpack_require__("../../node_modules/style-loader/dist/runtime/insertStyleElement.js"),styleTagTransformFn=__webpack_require__("../../node_modules/style-loader/dist/runtime/styleTagTransform.js"),content=__webpack_require__("../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[14].use[1]!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!../../node_modules/resolve-url-loader/index.js??ruleSet[1].rules[14].use[3]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[4]!../components/src/AboutDialog/AboutDialog.module.scss");content=content.__esModule?content.default:content;var options={};options.styleTagTransform=styleTagTransformFn,options.setAttributes=setAttributes,options.insert=insertFn.bind(null,"head"),options.domAPI=domAPI,options.insertStyleElement=insertStyleElement;API(content,options);module.exports=content&&content.locals||{}}}]);