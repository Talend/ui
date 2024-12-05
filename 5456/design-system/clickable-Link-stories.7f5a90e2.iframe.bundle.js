"use strict";(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[6150],{"../design-system/src/stories/clickable/Link.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,External:()=>External,MultiLines:()=>MultiLines,RouterLinkStory:()=>RouterLinkStory,TargetBlank:()=>TargetBlank,Usage:()=>Usage,WithIcon:()=>WithIcon,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-router-dom/index.js"),___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.N_,title:"Clickable/Link",argTypes:{icon:{control:{type:"select"},options:["information-filled","talend-tdp-colored","talend-tmc-colored"]},href:{control:{type:"text"}},disabled:{control:{type:"boolean"}}}},Default=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"#",...props,children:"Link example"}),WithIcon=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"#",icon:"information-filled",...props,children:"Link example"}),MultiLines=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"https://www.talend.com",target:"_blank",icon:"information-filled",...props,children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac facilisis massa. Morbi et massa nulla. Nulla vitae hendrerit diam. Aenean eu sem libero. Integer vitae quam rutrum orci maximus imperdiet non sed lacus. Suspendisse ac est ac turpis luctus viverra. Proin tristique accumsan eleifend. Mauris at nibh aliquet, blandit turpis quis, scelerisque eros. Cras semper risus at felis convallis, ullamcorper rutrum augue ullamcorper. Donec malesuada felis tortor, vel porttitor tortor tincidunt at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."}),Disabled=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"#",icon:"information-filled",disabled:!0,...props,children:"Link example"}),External=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"https://www.talend.com",...props,children:"talend.com"}),TargetBlank=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{href:"#",target:"_blank",...props,children:"Link example"}),RouterLinkStory=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Kd,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{as:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.N_,{to:"/documentation"}),icon:"information-filled",children:"Documentation"})}),Usage=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.N_,{...args});Usage.args={icon:"talend-info-circle",children:"Help",href:"https://help.talend.com",disabled:!1,hideExternalIcon:!1},Usage.argTypes={icon:{description:"Link icon before text as illustration",control:{type:"select",options:[""].concat(___WEBPACK_IMPORTED_MODULE_0__._Q.getCurrentIconIds())}},href:{description:"Link reference",control:{type:"text"}},hideExternalIcon:{description:"Button has hidden text",control:{type:"boolean"}},as:{description:"Polymorphic prop to give this style to a button. `string` `ReactComponentType`.",control:!1}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'(props: LinkProps) => <Link href="#" {...props}>\n        Link example\n    </Link>',...Default.parameters?.docs?.source}}},WithIcon.parameters={...WithIcon.parameters,docs:{...WithIcon.parameters?.docs,source:{originalSource:'(props: Story<LinkProps>) => <Link href="#" icon="information-filled" {...props}>\n        Link example\n    </Link>',...WithIcon.parameters?.docs?.source}}},MultiLines.parameters={...MultiLines.parameters,docs:{...MultiLines.parameters?.docs,source:{originalSource:'(props: Story<LinkProps>) => <Link href="https://www.talend.com" target="_blank" icon="information-filled" {...props}>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac facilisis massa. Morbi et massa\n        nulla. Nulla vitae hendrerit diam. Aenean eu sem libero. Integer vitae quam rutrum orci maximus\n        imperdiet non sed lacus. Suspendisse ac est ac turpis luctus viverra. Proin tristique accumsan\n        eleifend. Mauris at nibh aliquet, blandit turpis quis, scelerisque eros. Cras semper risus at\n        felis convallis, ullamcorper rutrum augue ullamcorper. Donec malesuada felis tortor, vel\n        porttitor tortor tincidunt at. Pellentesque habitant morbi tristique senectus et netus et\n        malesuada fames ac turpis egestas.\n    </Link>',...MultiLines.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'(props: Story<LinkProps>) => <Link href="#" icon="information-filled" disabled {...props}>\n        Link example\n    </Link>',...Disabled.parameters?.docs?.source}}},External.parameters={...External.parameters,docs:{...External.parameters?.docs,source:{originalSource:'(props: Story<LinkProps>) => <Link href="https://www.talend.com" {...props}>\n        talend.com\n    </Link>',...External.parameters?.docs?.source}}},TargetBlank.parameters={...TargetBlank.parameters,docs:{...TargetBlank.parameters?.docs,source:{originalSource:'(props: Story<LinkProps>) => <Link href="#" target="_blank" {...props}>\n        Link example\n    </Link>',...TargetBlank.parameters?.docs?.source}}},RouterLinkStory.parameters={...RouterLinkStory.parameters,docs:{...RouterLinkStory.parameters?.docs,source:{originalSource:'() => <BrowserRouter>\n        <Link as={<RouterLink to="/documentation" />} icon="information-filled">\n            Documentation\n        </Link>\n    </BrowserRouter>',...RouterLinkStory.parameters?.docs?.source}}},Usage.parameters={...Usage.parameters,docs:{...Usage.parameters?.docs,source:{originalSource:"(args: any) => <Link {...args} />",...Usage.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithIcon","MultiLines","Disabled","External","TargetBlank","RouterLinkStory","Usage"]}}]);