"use strict";(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[8290],{"../design-system/src/stories/clickable/ButtonAsLink.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonAsRouterLink:()=>ButtonAsRouterLink,ButtonAsRouterLinkVariant:()=>ButtonAsRouterLinkVariant,DestructiveAsLink:()=>DestructiveAsLink,PrimaryAsLink:()=>PrimaryAsLink,SecondaryAsLink:()=>SecondaryAsLink,TertiaryAsLink:()=>TertiaryAsLink,TooltipButton:()=>TooltipButton,VariantComponent:()=>VariantComponent,Variations:()=>Variations,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-router-dom/index.js"),___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const defaultArgs={children:"Link label",href:"./",target:"_blank",icon:"talend-plus",size:"M"},commonLinkArgTypes={children:{control:{type:"text"}},href:{control:{type:"text"}},target:{options:["_blank","_self","_parent","_top"],control:{type:"select"},description:"optional"},icon:{control:{type:"text"},description:"optional"},size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'}},__WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.XR,title:"Clickable/ButtonAsLink",parameters:{actions:{argTypesRegex:"^on[A-Z].*"}},args:defaultArgs,argTypes:commonLinkArgTypes},PrimaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{...args})).bind({});_extends(PrimaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const DestructiveAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{...args})).bind({});_extends(DestructiveAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const SecondaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{...args})).bind({});_extends(SecondaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const TertiaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{...args})).bind({});_extends(TertiaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const TooltipButton=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.m_,{title:"Relevant information about contacting the support",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{href:"/support",target:"_blank",icon:"talend-bubbles",...props,children:"Contact support"})}),VariantComponent=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"S",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"primary",href:"https://talend.com",children:"Primary Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"destructive",href:"https://talend.com",children:"Destructive Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"secondary",href:"https://talend.com",children:"Secondary Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"tertiary",href:"https://talend.com",children:"Tertiary Button as link"})]}),ButtonAsRouterLink=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Kd,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{as:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.N_,{to:"home"}),children:"Home"})}),ButtonAsRouterLinkVariant=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Kd,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"destructive",icon:"talend-plus-circle",as:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.N_,{to:"home"}),children:"Home"})}),Variations=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"S",justify:"spaceBetween",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"spaceAround",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:" "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"S"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Destructive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Tertiary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{icon:"upload",href:"/",size:"S",children:"Label"})]})]});PrimaryAsLink.parameters={...PrimaryAsLink.parameters,docs:{...PrimaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonPrimaryAsLink {...args} />;\n}",...PrimaryAsLink.parameters?.docs?.source}}},DestructiveAsLink.parameters={...DestructiveAsLink.parameters,docs:{...DestructiveAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonDestructiveAsLink {...args} />;\n}",...DestructiveAsLink.parameters?.docs?.source}}},SecondaryAsLink.parameters={...SecondaryAsLink.parameters,docs:{...SecondaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonSecondaryAsLink {...args} />;\n}",...SecondaryAsLink.parameters?.docs?.source}}},TertiaryAsLink.parameters={...TertiaryAsLink.parameters,docs:{...TertiaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonTertiaryAsLink {...args} />;\n}",...TertiaryAsLink.parameters?.docs?.source}}},TooltipButton.parameters={...TooltipButton.parameters,docs:{...TooltipButton.parameters?.docs,source:{originalSource:'(props: any) => <Tooltip title="Relevant information about contacting the support">\n        <ButtonPrimaryAsLink href="/support" target="_blank" icon="talend-bubbles" {...props}>\n            Contact support\n        </ButtonPrimaryAsLink>\n    </Tooltip>',...TooltipButton.parameters?.docs?.source}}},VariantComponent.parameters={...VariantComponent.parameters,docs:{...VariantComponent.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="S">\n        <ButtonAsLink variant="primary" href="https://talend.com">\n            Primary Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="destructive" href="https://talend.com">\n            Destructive Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="secondary" href="https://talend.com">\n            Secondary Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="tertiary" href="https://talend.com">\n            Tertiary Button as link\n        </ButtonAsLink>\n    </StackHorizontal>',...VariantComponent.parameters?.docs?.source}}},ButtonAsRouterLink.parameters={...ButtonAsRouterLink.parameters,docs:{...ButtonAsRouterLink.parameters?.docs,source:{originalSource:'() => <BrowserRouter>\n        <ButtonSecondaryAsLink as={<Link to="home" />}>Home</ButtonSecondaryAsLink>\n    </BrowserRouter>',...ButtonAsRouterLink.parameters?.docs?.source}}},ButtonAsRouterLinkVariant.parameters={...ButtonAsRouterLinkVariant.parameters,docs:{...ButtonAsRouterLinkVariant.parameters?.docs,source:{originalSource:'() => <BrowserRouter>\n        <ButtonAsLink variant="destructive" icon="talend-plus-circle" as={<Link to="home" />}>\n            Home\n        </ButtonAsLink>\n    </BrowserRouter>',...ButtonAsRouterLinkVariant.parameters?.docs?.source}}},Variations.parameters={...Variations.parameters,docs:{...Variations.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">\n        <StackVertical gap="S" justify="spaceAround" align="center">\n            <p>&nbsp;</p>\n            <h3>M</h3>\n            <h3>S</h3>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Primary</h3>\n            <ButtonPrimaryAsLink icon="upload" href="/">\n                Label\n            </ButtonPrimaryAsLink>\n            <ButtonPrimaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonPrimaryAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Destructive</h3>\n            <ButtonDestructiveAsLink icon="upload" href="/">\n                Label\n            </ButtonDestructiveAsLink>\n            <ButtonDestructiveAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonDestructiveAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Secondary</h3>\n            <ButtonSecondaryAsLink icon="upload" href="/">\n                Label\n            </ButtonSecondaryAsLink>\n            <ButtonSecondaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonSecondaryAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Tertiary</h3>\n            <ButtonTertiaryAsLink icon="upload" href="/">\n                Label\n            </ButtonTertiaryAsLink>\n            <ButtonTertiaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonTertiaryAsLink>\n        </StackVertical>\n    </StackHorizontal>',...Variations.parameters?.docs?.source}}};const __namedExportsOrder=["PrimaryAsLink","DestructiveAsLink","SecondaryAsLink","TertiaryAsLink","TooltipButton","VariantComponent","ButtonAsRouterLink","ButtonAsRouterLinkVariant","Variations"]}}]);