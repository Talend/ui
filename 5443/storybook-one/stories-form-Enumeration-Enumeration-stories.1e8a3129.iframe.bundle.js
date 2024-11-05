"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[9317],{"../design-system/src/stories/form/Enumeration/Enumeration.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Empty:()=>Empty,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_components_Enumeration__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-system/src/components/Enumeration/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:_components_Enumeration__WEBPACK_IMPORTED_MODULE_1__.w,title:"Form/Enumeration"},getItems=(numItems,totalItems)=>{const itemsToAdd=[];for(let i=0;i<totalItems;i++)i<=numItems?itemsToAdd.push(`Item ${i+1}`):itemsToAdd.push("");return itemsToAdd},Default=()=>{const[items,setItems]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([...getItems(100,500)]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_Enumeration__WEBPACK_IMPORTED_MODULE_1__.w,{id:"default",items,loadMoreRows:({stopIndex})=>new Promise((resolve=>{setItems([...getItems(stopIndex,500)]),resolve()})),onChange:setItems,onImport:data=>{setItems([...data,...items])},title:"This is a title"})},Empty=()=>{const[items,setItems]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_Enumeration__WEBPACK_IMPORTED_MODULE_1__.w,{title:"This is a title",items,id:"empty",onChange:setItems})};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  const [items, setItems] = useState([...getItems(100, 500)]);\n  return <Enumeration id={'default'} items={items} loadMoreRows={({\n    stopIndex\n  }) => new Promise<void>(resolve => {\n    setItems([...getItems(stopIndex, 500)]);\n    resolve();\n  })} onChange={setItems} onImport={(data: string[]) => {\n    setItems([...data, ...items]);\n  }} title=\"This is a title\" />;\n}",...Default.parameters?.docs?.source}}},Empty.parameters={...Empty.parameters,docs:{...Empty.parameters?.docs,source:{originalSource:"() => {\n  const [items, setItems] = useState<string[]>([]);\n  return <Enumeration title=\"This is a title\" items={items} id={'empty'} onChange={setItems} />;\n}",...Empty.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Empty"]}}]);