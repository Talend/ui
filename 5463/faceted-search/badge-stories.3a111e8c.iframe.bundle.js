"use strict";(self.webpackChunk_talend_react_faceted_search=self.webpackChunk_talend_react_faceted_search||[]).push([[80],{"./stories/badge.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DatePicker:()=>DatePicker,ReadOnly:()=>ReadOnly,WithSpecialChars:()=>WithSpecialChars,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_i18next__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js"),_src__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.js"),_src_components_context_badgeFaceted_context__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/context/badgeFaceted.context.js"),_src_components_BadgesGenerator__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/BadgesGenerator/index.js"),_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/dictionary/badge.dictionary.js"),lodash__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/lodash/lodash.js"),_talend_react_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../components/lib-esm/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const badgesFaceted_badges=[{properties:{attribute:"connection.type",initialOperatorOpened:!1,initialValueOpened:!1,label:"Connection Type",operator:{label:"In",name:"in"},operators:[{label:"In",name:"in"}],type:"checkbox",value:[{id:"amazon_s3",label:"Amazon S3",checked:!0},{id:"hdfs",label:"HDFS",checked:!0},{id:"localcon",label:"Local connection",checked:!0}]},metadata:{badgePerFacet:"1",entitiesPerBadge:"N",values:[{id:"amazon_s3",label:"Amazon S3"},{id:"hdfs",label:"HDFS"},{id:"kafka",label:"Kafka"},{id:"localcon",label:"Local connection"},{id:"salesforce",label:"Salesforce"},{id:"aws_kinesis",label:"AWS kinesis"}],operators:["in"],badgeId:"connection.type-9f0e5bc7-c687-4198-9635-d0fc7724dfd1",isInCreation:!1}}],__WEBPACK_DEFAULT_EXPORT__={title:"Faceted search/Badge",component:_src__WEBPACK_IMPORTED_MODULE_1__.A.Faceted,parameters:{storySource:{source:"import { Badge } from '@talend/react-components';\nimport { useTranslation } from 'react-i18next';\nimport set from 'lodash/set';\nimport cloneDeep from 'lodash/cloneDeep';\n\nimport FacetedSearch from '../src';\nimport { BadgeFacetedProvider } from '../src/components/context/badgeFaceted.context';\nimport { BadgesGenerator } from '../src/components/BadgesGenerator';\nimport { createBadgesDict, getBadgesFromDict } from '../src/dictionary/badge.dictionary';\n\nconst badgesFaceted = {\n\tbadges: [\n\t\t{\n\t\t\tproperties: {\n\t\t\t\tattribute: 'connection.type',\n\t\t\t\tinitialOperatorOpened: false,\n\t\t\t\tinitialValueOpened: false,\n\t\t\t\tlabel: 'Connection Type',\n\t\t\t\toperator: {\n\t\t\t\t\tlabel: 'In',\n\t\t\t\t\tname: 'in',\n\t\t\t\t},\n\t\t\t\toperators: [\n\t\t\t\t\t{\n\t\t\t\t\t\tlabel: 'In',\n\t\t\t\t\t\tname: 'in',\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t\ttype: 'checkbox',\n\t\t\t\tvalue: [\n\t\t\t\t\t{\n\t\t\t\t\t\tid: 'amazon_s3',\n\t\t\t\t\t\tlabel: 'Amazon S3',\n\t\t\t\t\t\tchecked: true,\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tid: 'hdfs',\n\t\t\t\t\t\tlabel: 'HDFS',\n\t\t\t\t\t\tchecked: true,\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tid: 'localcon',\n\t\t\t\t\t\tlabel: 'Local connection',\n\t\t\t\t\t\tchecked: true,\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t},\n\t\t\tmetadata: {\n\t\t\t\tbadgePerFacet: '1',\n\t\t\t\tentitiesPerBadge: 'N',\n\t\t\t\tvalues: [\n\t\t\t\t\t{ id: 'amazon_s3', label: 'Amazon S3' },\n\t\t\t\t\t{ id: 'hdfs', label: 'HDFS' },\n\t\t\t\t\t{ id: 'kafka', label: 'Kafka' },\n\t\t\t\t\t{ id: 'localcon', label: 'Local connection' },\n\t\t\t\t\t{ id: 'salesforce', label: 'Salesforce' },\n\t\t\t\t\t{ id: 'aws_kinesis', label: 'AWS kinesis' },\n\t\t\t\t],\n\t\t\t\toperators: ['in'],\n\t\t\t\tbadgeId: 'connection.type-9f0e5bc7-c687-4198-9635-d0fc7724dfd1',\n\t\t\t\tisInCreation: false,\n\t\t\t},\n\t\t},\n\t],\n};\n\nexport default {\n\ttitle: 'Faceted search/Badge',\n\tcomponent: FacetedSearch.Faceted,\n\tparameters: {\n\t\tdocs: {\n\t\t\tdescription: {\n\t\t\t\tcomponent:\n\t\t\t\t\t'Faceted search is a technique that involves augmenting traditional search techniques with a faceted navigation system, allowing users to narrow down search results by applying multiple filters based on faceted classification of the items. The user can look for any value, even if the field is not currently visible.',\n\t\t\t},\n\t\t},\n\t},\n\tdecorators: [\n\t\t(Story, context) => (\n\t\t\t<div>\n\t\t\t\t<Story {...context} />\n\t\t\t</div>\n\t\t),\n\t],\n};\n\nexport const WithSpecialChars = () => {\n\tconst { t } = useTranslation();\n\tconst badgesDictionary = createBadgesDict();\n\tconst badge = cloneDeep(badgesFaceted.badges[0]);\n\tObject.assign(badge.properties, {\n\t\tvalue: '  text  ',\n\t\ttype: 'text',\n\t\tdisplayType: Badge.TYPES.PATTERN,\n\t});\n\treturn (\n\t\t<BadgeFacetedProvider value={{}}>\n\t\t\t<BadgesGenerator\n\t\t\t\tbadges={[badge]}\n\t\t\t\tbadgesDictionary={badgesDictionary}\n\t\t\t\tgetBadgeFromDict={getBadgesFromDict}\n\t\t\t\tt={t}\n\t\t\t/>\n\t\t</BadgeFacetedProvider>\n\t);\n};\n\nexport const DatePicker = () => {\n\tconst { t } = useTranslation();\n\tconst badgesDictionary = createBadgesDict();\n\tconst badge = cloneDeep(badgesFaceted.badges[0]);\n\tObject.assign(badge.properties, {\n\t\tvalue: Date.now(),\n\t\ttype: 'date',\n\t});\n\treturn (\n\t\t<BadgeFacetedProvider value={{}}>\n\t\t\t<BadgesGenerator\n\t\t\t\tbadges={[badge]}\n\t\t\t\tbadgesDictionary={badgesDictionary}\n\t\t\t\tgetBadgeFromDict={getBadgesFromDict}\n\t\t\t\tt={t}\n\t\t\t/>\n\t\t</BadgeFacetedProvider>\n\t);\n};\n\nexport const ReadOnly = () => {\n\tconst { t } = useTranslation();\n\tconst badgesDictionary = createBadgesDict();\n\treturn (\n\t\t<BadgeFacetedProvider value={{}}>\n\t\t\t<BadgesGenerator\n\t\t\t\tbadges={[\n\t\t\t\t\tset(cloneDeep(badgesFaceted.badges[0]), 'properties.readOnly', true),\n\t\t\t\t\tset(cloneDeep(badgesFaceted.badges[0]), 'properties.removable', false),\n\t\t\t\t]}\n\t\t\t\tbadgesDictionary={badgesDictionary}\n\t\t\t\tgetBadgeFromDict={getBadgesFromDict}\n\t\t\t\tt={t}\n\t\t\t/>\n\t\t</BadgeFacetedProvider>\n\t);\n};\n",locationsMap:{"with-special-chars":{startLoc:{col:32,line:87},endLoc:{col:1,line:106},startBody:{col:32,line:87},endBody:{col:1,line:106}},"date-picker":{startLoc:{col:26,line:108},endLoc:{col:1,line:126},startBody:{col:26,line:108},endBody:{col:1,line:126}},"read-only":{startLoc:{col:24,line:128},endLoc:{col:1,line:144},startBody:{col:24,line:128},endBody:{col:1,line:144}}}},docs:{description:{component:"Faceted search is a technique that involves augmenting traditional search techniques with a faceted navigation system, allowing users to narrow down search results by applying multiple filters based on faceted classification of the items. The user can look for any value, even if the field is not currently visible."}}},decorators:[(Story,context)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Story,{...context})})]},WithSpecialChars=()=>{const{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.Bd)(),badgesDictionary=(0,_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.Rc)(),badge=(0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(badgesFaceted_badges[0]);return _extends(badge.properties,{value:"  text  ",type:"text",displayType:_talend_react_components__WEBPACK_IMPORTED_MODULE_6__.Ex.TYPES.PATTERN}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_context_badgeFaceted_context__WEBPACK_IMPORTED_MODULE_2__.B,{value:{},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_BadgesGenerator__WEBPACK_IMPORTED_MODULE_3__.U,{badges:[badge],badgesDictionary,getBadgeFromDict:_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.zW,t})})};WithSpecialChars.displayName="WithSpecialChars";const DatePicker=()=>{const{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.Bd)(),badgesDictionary=(0,_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.Rc)(),badge=(0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(badgesFaceted_badges[0]);return _extends(badge.properties,{value:Date.now(),type:"date"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_context_badgeFaceted_context__WEBPACK_IMPORTED_MODULE_2__.B,{value:{},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_BadgesGenerator__WEBPACK_IMPORTED_MODULE_3__.U,{badges:[badge],badgesDictionary,getBadgeFromDict:_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.zW,t})})};DatePicker.displayName="DatePicker";const ReadOnly=()=>{const{t}=(0,react_i18next__WEBPACK_IMPORTED_MODULE_0__.Bd)(),badgesDictionary=(0,_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.Rc)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_context_badgeFaceted_context__WEBPACK_IMPORTED_MODULE_2__.B,{value:{},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_src_components_BadgesGenerator__WEBPACK_IMPORTED_MODULE_3__.U,{badges:[(0,lodash__WEBPACK_IMPORTED_MODULE_5__.set)((0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(badgesFaceted_badges[0]),"properties.readOnly",!0),(0,lodash__WEBPACK_IMPORTED_MODULE_5__.set)((0,lodash__WEBPACK_IMPORTED_MODULE_5__.cloneDeep)(badgesFaceted_badges[0]),"properties.removable",!1)],badgesDictionary,getBadgeFromDict:_src_dictionary_badge_dictionary__WEBPACK_IMPORTED_MODULE_4__.zW,t})})};ReadOnly.displayName="ReadOnly",WithSpecialChars.parameters={...WithSpecialChars.parameters,docs:{...WithSpecialChars.parameters?.docs,source:{originalSource:"() => {\n  const {\n    t\n  } = useTranslation();\n  const badgesDictionary = createBadgesDict();\n  const badge = cloneDeep(badgesFaceted.badges[0]);\n  Object.assign(badge.properties, {\n    value: '  text  ',\n    type: 'text',\n    displayType: Badge.TYPES.PATTERN\n  });\n  return <BadgeFacetedProvider value={{}}>\n            <BadgesGenerator badges={[badge]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />\n        </BadgeFacetedProvider>;\n}",...WithSpecialChars.parameters?.docs?.source}}},DatePicker.parameters={...DatePicker.parameters,docs:{...DatePicker.parameters?.docs,source:{originalSource:"() => {\n  const {\n    t\n  } = useTranslation();\n  const badgesDictionary = createBadgesDict();\n  const badge = cloneDeep(badgesFaceted.badges[0]);\n  Object.assign(badge.properties, {\n    value: Date.now(),\n    type: 'date'\n  });\n  return <BadgeFacetedProvider value={{}}>\n            <BadgesGenerator badges={[badge]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />\n        </BadgeFacetedProvider>;\n}",...DatePicker.parameters?.docs?.source}}},ReadOnly.parameters={...ReadOnly.parameters,docs:{...ReadOnly.parameters?.docs,source:{originalSource:"() => {\n  const {\n    t\n  } = useTranslation();\n  const badgesDictionary = createBadgesDict();\n  return <BadgeFacetedProvider value={{}}>\n            <BadgesGenerator badges={[set(cloneDeep(badgesFaceted.badges[0]), 'properties.readOnly', true), set(cloneDeep(badgesFaceted.badges[0]), 'properties.removable', false)]} badgesDictionary={badgesDictionary} getBadgeFromDict={getBadgesFromDict} t={t} />\n        </BadgeFacetedProvider>;\n}",...ReadOnly.parameters?.docs?.source}}};const __namedExportsOrder=["WithSpecialChars","DatePicker","ReadOnly"]}}]);