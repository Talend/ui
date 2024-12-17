(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[7363,6586],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{BN:()=>MDXContext,RP:()=>useMDXComponents,gz:()=>withMDXComponents,xA:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"../design-system/src/stories/clickable/ButtonAsLink.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonAsRouterLink:()=>ButtonAsRouterLink,ButtonAsRouterLinkVariant:()=>ButtonAsRouterLinkVariant,DestructiveAsLink:()=>DestructiveAsLink,PrimaryAsLink:()=>PrimaryAsLink,SecondaryAsLink:()=>SecondaryAsLink,TertiaryAsLink:()=>TertiaryAsLink,TooltipButton:()=>TooltipButton,VariantComponent:()=>VariantComponent,Variations:()=>Variations,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_router_dom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react-router-dom/index.js"),___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}const defaultArgs={children:"Link label",href:"./",target:"_blank",icon:"talend-plus",size:"M"},commonLinkArgTypes={children:{control:{type:"text"}},href:{control:{type:"text"}},target:{options:["_blank","_self","_parent","_top"],control:{type:"select"},description:"optional"},icon:{control:{type:"text"},description:"optional"},size:{options:["M","S"],control:{type:"select"},description:'optional (default is "M")'}},__WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_0__.XR,title:"Clickable/ButtonAsLink",parameters:{actions:{argTypesRegex:"^on[A-Z].*"}},args:defaultArgs,argTypes:commonLinkArgTypes},PrimaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{...args})).bind({});_extends(PrimaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const DestructiveAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{...args})).bind({});_extends(DestructiveAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const SecondaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{...args})).bind({});_extends(SecondaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const TertiaryAsLink=(args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{...args})).bind({});_extends(TertiaryAsLink,{args:defaultArgs,argTypes:commonLinkArgTypes});const TooltipButton=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.m_,{title:"Relevant information about contacting the support",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{href:"/support",target:"_blank",icon:"talend-bubbles",...props,children:"Contact support"})}),VariantComponent=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"S",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"primary",href:"https://talend.com",children:"Primary Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"destructive",href:"https://talend.com",children:"Destructive Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"secondary",href:"https://talend.com",children:"Secondary Button as link"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"tertiary",href:"https://talend.com",children:"Tertiary Button as link"})]}),ButtonAsRouterLink=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Kd,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{as:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.N_,{to:"home"}),children:"Home"})}),ButtonAsRouterLinkVariant=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Kd,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.xy,{variant:"destructive",icon:"talend-plus-circle",as:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.N_,{to:"home"}),children:"Home"})}),Variations=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"S",justify:"spaceBetween",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"spaceAround",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p",{children:" "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"S"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.XR,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Destructive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Bd,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Secondary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.Ru,{icon:"upload",href:"/",size:"S",children:"Label"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3",{children:"Tertiary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{icon:"upload",href:"/",children:"Label"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.lN,{icon:"upload",href:"/",size:"S",children:"Label"})]})]});PrimaryAsLink.parameters={...PrimaryAsLink.parameters,docs:{...PrimaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonPrimaryAsLink {...args} />;\n}",...PrimaryAsLink.parameters?.docs?.source}}},DestructiveAsLink.parameters={...DestructiveAsLink.parameters,docs:{...DestructiveAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonDestructiveAsLink {...args} />;\n}",...DestructiveAsLink.parameters?.docs?.source}}},SecondaryAsLink.parameters={...SecondaryAsLink.parameters,docs:{...SecondaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonSecondaryAsLink {...args} />;\n}",...SecondaryAsLink.parameters?.docs?.source}}},TertiaryAsLink.parameters={...TertiaryAsLink.parameters,docs:{...TertiaryAsLink.parameters?.docs,source:{originalSource:"args => {\n  return <ButtonTertiaryAsLink {...args} />;\n}",...TertiaryAsLink.parameters?.docs?.source}}},TooltipButton.parameters={...TooltipButton.parameters,docs:{...TooltipButton.parameters?.docs,source:{originalSource:'(props: any) => <Tooltip title="Relevant information about contacting the support">\n        <ButtonPrimaryAsLink href="/support" target="_blank" icon="talend-bubbles" {...props}>\n            Contact support\n        </ButtonPrimaryAsLink>\n    </Tooltip>',...TooltipButton.parameters?.docs?.source}}},VariantComponent.parameters={...VariantComponent.parameters,docs:{...VariantComponent.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="S">\n        <ButtonAsLink variant="primary" href="https://talend.com">\n            Primary Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="destructive" href="https://talend.com">\n            Destructive Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="secondary" href="https://talend.com">\n            Secondary Button as link\n        </ButtonAsLink>\n        <ButtonAsLink variant="tertiary" href="https://talend.com">\n            Tertiary Button as link\n        </ButtonAsLink>\n    </StackHorizontal>',...VariantComponent.parameters?.docs?.source}}},ButtonAsRouterLink.parameters={...ButtonAsRouterLink.parameters,docs:{...ButtonAsRouterLink.parameters?.docs,source:{originalSource:'() => <BrowserRouter>\n        <ButtonSecondaryAsLink as={<Link to="home" />}>Home</ButtonSecondaryAsLink>\n    </BrowserRouter>',...ButtonAsRouterLink.parameters?.docs?.source}}},ButtonAsRouterLinkVariant.parameters={...ButtonAsRouterLinkVariant.parameters,docs:{...ButtonAsRouterLinkVariant.parameters?.docs,source:{originalSource:'() => <BrowserRouter>\n        <ButtonAsLink variant="destructive" icon="talend-plus-circle" as={<Link to="home" />}>\n            Home\n        </ButtonAsLink>\n    </BrowserRouter>',...ButtonAsRouterLinkVariant.parameters?.docs?.source}}},Variations.parameters={...Variations.parameters,docs:{...Variations.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">\n        <StackVertical gap="S" justify="spaceAround" align="center">\n            <p>&nbsp;</p>\n            <h3>M</h3>\n            <h3>S</h3>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Primary</h3>\n            <ButtonPrimaryAsLink icon="upload" href="/">\n                Label\n            </ButtonPrimaryAsLink>\n            <ButtonPrimaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonPrimaryAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Destructive</h3>\n            <ButtonDestructiveAsLink icon="upload" href="/">\n                Label\n            </ButtonDestructiveAsLink>\n            <ButtonDestructiveAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonDestructiveAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Secondary</h3>\n            <ButtonSecondaryAsLink icon="upload" href="/">\n                Label\n            </ButtonSecondaryAsLink>\n            <ButtonSecondaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonSecondaryAsLink>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Tertiary</h3>\n            <ButtonTertiaryAsLink icon="upload" href="/">\n                Label\n            </ButtonTertiaryAsLink>\n            <ButtonTertiaryAsLink icon="upload" href="/" size="S">\n                Label\n            </ButtonTertiaryAsLink>\n        </StackVertical>\n    </StackHorizontal>',...Variations.parameters?.docs?.source}}};const __namedExportsOrder=["PrimaryAsLink","DestructiveAsLink","SecondaryAsLink","TertiaryAsLink","TooltipButton","VariantComponent","ButtonAsRouterLink","ButtonAsRouterLinkVariant","Variations"]},"../design-system/src/stories/clickable/ButtonIcon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ButtonIconSkeletons:()=>ButtonIconSkeletons,Default:()=>Default,DefaultButtonIcon:()=>DefaultButtonIcon,DefaultButtonIconFloating:()=>DefaultButtonIconFloating,DefaultButtonIconToggle:()=>DefaultButtonIconToggle,Floating:()=>Floating,Loading:()=>Loading,NaturalButtonProps:()=>NaturalButtonProps,Toggle:()=>Toggle,ToggleActive:()=>ToggleActive,Variations:()=>Variations,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const defaultArgs={children:"Action label",icon:"plus",action:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Button clicked"),size:"M"},commonArgTypes={children:{control:{type:"text"}},icon:{control:{type:"text"},description:'In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In size "XS", it supports the legacy icon name still, and the SizedIcon<"S"> names.'},size:{options:["XS","S","M"],control:{type:"select"},description:"optional, defaults to M"},onClick:{disabled:!0,description:"A callback function"},isLoading:{control:{type:"boolean"},description:"optional"},disabled:{control:{type:"boolean"},description:"optional"}},__WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_2__.a2,title:"Clickable/ButtonIcon",args:defaultArgs,argTypes:commonArgTypes},TemplateToggle=args=>{const{children,...rest}=args;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{...rest,children})},Default=(args=>{const{children,...rest}=args;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{...rest,children})}).bind({});Default.args=defaultArgs,Default.argTypes={...commonArgTypes};const Toggle=TemplateToggle.bind({});Toggle.args=defaultArgs,Toggle.argTypes={...commonArgTypes,isActive:{control:{type:"boolean"}}};const ToggleActive=TemplateToggle.bind({});ToggleActive.argTypes={...Toggle.argTypes},ToggleActive.args={...defaultArgs,isActive:!0};const Floating=(args=>{const{children,...rest}=args;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{...rest,children})}).bind({});Floating.args=defaultArgs,Floating.argTypes={...commonArgTypes,size:{options:["S","M"],control:{type:"select"},description:"optional, defaults to M"}};const NaturalButtonProps=()=>{const[isActive,setActive]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"talend-send",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Submitted"),type:"submit",children:"Send message"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"talend-zoomin",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Zoomed in"),disabled:!0,children:"Zoom in"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{icon:"talend-collapse",onClick:()=>setActive(!isActive),isActive,"data-test":"test-feat-"+(isActive?"on":"off"),children:"Toggle drawer"})]})},Loading=()=>{const[isActive,setActive]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"talend-send",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Submitted"),type:"submit",isLoading:!0,children:"Send message"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"talend-zoomin",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Zoomed in"),isLoading:!0,children:"Zoom in"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{icon:"talend-collapse",onClick:()=>setActive(!isActive),isActive,isLoading:!0,children:"Toggle drawer"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{icon:"talend-collapse",onClick:()=>setActive(!isActive),isActive:!0,isLoading:!0,children:"Toggle drawer"})]})},Variations=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"S",justify:"spaceBetween",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"S",justify:"spaceAround",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p",{children:" "}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"XS"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Default"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{size:"XS",icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size XS"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Floating"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Toggle-ON"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!0,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M + Active"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!0,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S + Active"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"S",justify:"start",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h3",{children:"Toggle-OFF"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!1,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M + Inactive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!1,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S + Inactive"})]})]}),DefaultButtonIcon=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",justify:"center",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a2,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"XS",children:"Size XS"})]}),DefaultButtonIconToggle=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",justify:"center",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!1,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M + Inactive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!1,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S + Inactive"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!0,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M + Active"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.m6,{isActive:!0,icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S + Active"})]}),DefaultButtonIconFloating=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",justify:"center",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),children:"Size M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.Uu,{icon:"plus",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Clicked"),size:"S",children:"Size S"})]}),ButtonIconSkeletons=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.EA,{variant:"buttonIcon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.EA,{variant:"buttonIcon",size:"S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.EA,{variant:"buttonIcon",size:"XS"})]});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  const {\n    children,\n    ...rest\n  } = args;\n  return <ButtonIcon {...rest}>{children}</ButtonIcon>;\n}",...Default.parameters?.docs?.source}}},Toggle.parameters={...Toggle.parameters,docs:{...Toggle.parameters?.docs,source:{originalSource:"args => {\n  const {\n    children,\n    ...rest\n  } = args;\n  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;\n}",...Toggle.parameters?.docs?.source}}},ToggleActive.parameters={...ToggleActive.parameters,docs:{...ToggleActive.parameters?.docs,source:{originalSource:"args => {\n  const {\n    children,\n    ...rest\n  } = args;\n  return <ButtonIconToggle {...rest}>{children}</ButtonIconToggle>;\n}",...ToggleActive.parameters?.docs?.source}}},Floating.parameters={...Floating.parameters,docs:{...Floating.parameters?.docs,source:{originalSource:"args => {\n  const {\n    children,\n    ...rest\n  } = args;\n  return <ButtonIconFloating {...rest}>{children}</ButtonIconFloating>;\n}",...Floating.parameters?.docs?.source}}},NaturalButtonProps.parameters={...NaturalButtonProps.parameters,docs:{...NaturalButtonProps.parameters?.docs,source:{originalSource:'() => {\n  const [isActive, setActive] = useState<boolean>(false);\n  return <StackHorizontal gap="XS">\n            <ButtonIcon icon="talend-send" onClick={action(\'Submitted\')} type="submit">\n                Send message\n            </ButtonIcon>\n            <ButtonIconFloating icon="talend-zoomin" onClick={action(\'Zoomed in\')} disabled>\n                Zoom in\n            </ButtonIconFloating>\n            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive={isActive} data-test={`test-feat-${isActive ? \'on\' : \'off\'}`}>\n                Toggle drawer\n            </ButtonIconToggle>\n        </StackHorizontal>;\n}',...NaturalButtonProps.parameters?.docs?.source}}},Loading.parameters={...Loading.parameters,docs:{...Loading.parameters?.docs,source:{originalSource:'() => {\n  const [isActive, setActive] = useState<boolean>(false);\n  return <StackHorizontal gap="XS">\n            <ButtonIcon icon="talend-send" onClick={action(\'Submitted\')} type="submit" isLoading>\n                Send message\n            </ButtonIcon>\n            <ButtonIconFloating icon="talend-zoomin" onClick={action(\'Zoomed in\')} isLoading>\n                Zoom in\n            </ButtonIconFloating>\n            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive={isActive} isLoading>\n                Toggle drawer\n            </ButtonIconToggle>\n            <ButtonIconToggle icon="talend-collapse" onClick={() => setActive(!isActive)} isActive isLoading>\n                Toggle drawer\n            </ButtonIconToggle>\n        </StackHorizontal>;\n}',...Loading.parameters?.docs?.source}}},Variations.parameters={...Variations.parameters,docs:{...Variations.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="S" justify="spaceBetween" align="stretch">\n        <StackVertical gap="S" justify="spaceAround" align="center">\n            <p>&nbsp;</p>\n            <h3>M</h3>\n            <h3>S</h3>\n            <h3>XS</h3>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Default</h3>\n            <ButtonIcon icon="plus" onClick={action(\'Clicked\')}>\n                Size M\n            </ButtonIcon>\n            <ButtonIcon icon="plus" onClick={action(\'Clicked\')} size="S">\n                Size S\n            </ButtonIcon>\n            <ButtonIcon size="XS" icon="plus" onClick={action(\'Clicked\')}>\n                Size XS\n            </ButtonIcon>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Floating</h3>\n            <ButtonIconFloating icon="plus" onClick={action(\'Clicked\')}>\n                Size M\n            </ButtonIconFloating>\n            <ButtonIconFloating icon="plus" onClick={action(\'Clicked\')} size="S">\n                Size S\n            </ButtonIconFloating>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Toggle-ON</h3>\n            <ButtonIconToggle isActive icon="plus" onClick={action(\'Clicked\')}>\n                Size M + Active\n            </ButtonIconToggle>\n            <ButtonIconToggle isActive icon="plus" onClick={action(\'Clicked\')} size="S">\n                Size S + Active\n            </ButtonIconToggle>\n        </StackVertical>\n        <StackVertical gap="S" justify="start" align="center">\n            <h3>Toggle-OFF</h3>\n            <ButtonIconToggle isActive={false} icon="plus" onClick={action(\'Clicked\')}>\n                Size M + Inactive\n            </ButtonIconToggle>\n            <ButtonIconToggle isActive={false} icon="plus" onClick={action(\'Clicked\')} size="S">\n                Size S + Inactive\n            </ButtonIconToggle>\n        </StackVertical>\n    </StackHorizontal>',...Variations.parameters?.docs?.source}}},DefaultButtonIcon.parameters={...DefaultButtonIcon.parameters,docs:{...DefaultButtonIcon.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="XS" justify="center" align="center">\n        <ButtonIcon icon="plus" onClick={action(\'Clicked\')}>\n            Size M\n        </ButtonIcon>\n        <ButtonIcon icon="plus" onClick={action(\'Clicked\')} size="S">\n            Size S\n        </ButtonIcon>\n        <ButtonIcon icon="plus" onClick={action(\'Clicked\')} size="XS">\n            Size XS\n        </ButtonIcon>\n    </StackHorizontal>',...DefaultButtonIcon.parameters?.docs?.source}}},DefaultButtonIconToggle.parameters={...DefaultButtonIconToggle.parameters,docs:{...DefaultButtonIconToggle.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="XS" justify="center" align="center">\n        <ButtonIconToggle isActive={false} icon="plus" onClick={action(\'Clicked\')}>\n            Size M + Inactive\n        </ButtonIconToggle>\n        <ButtonIconToggle isActive={false} icon="plus" onClick={action(\'Clicked\')} size="S">\n            Size S + Inactive\n        </ButtonIconToggle>\n\n        <ButtonIconToggle isActive icon="plus" onClick={action(\'Clicked\')}>\n            Size M + Active\n        </ButtonIconToggle>\n        <ButtonIconToggle isActive icon="plus" onClick={action(\'Clicked\')} size="S">\n            Size S + Active\n        </ButtonIconToggle>\n    </StackHorizontal>',...DefaultButtonIconToggle.parameters?.docs?.source}}},DefaultButtonIconFloating.parameters={...DefaultButtonIconFloating.parameters,docs:{...DefaultButtonIconFloating.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="XS" justify="center" align="center">\n        <ButtonIconFloating icon="plus" onClick={action(\'Clicked\')}>\n            Size M\n        </ButtonIconFloating>\n        <ButtonIconFloating icon="plus" onClick={action(\'Clicked\')} size="S">\n            Size S\n        </ButtonIconFloating>\n    </StackHorizontal>',...DefaultButtonIconFloating.parameters?.docs?.source}}},ButtonIconSkeletons.parameters={...ButtonIconSkeletons.parameters,docs:{...ButtonIconSkeletons.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="XS" align="center">\n        <Skeleton variant="buttonIcon" />\n        <Skeleton variant="buttonIcon" size="S" />\n        <Skeleton variant="buttonIcon" size="XS" />\n    </StackHorizontal>',...ButtonIconSkeletons.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Toggle","ToggleActive","Floating","NaturalButtonProps","Loading","Variations","DefaultButtonIcon","DefaultButtonIconToggle","DefaultButtonIconFloating","ButtonIconSkeletons"]},"../design-system/src/stories/clickable/About.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_Button_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/stories/clickable/Button.stories.tsx"),_ButtonAsLink_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../design-system/src/stories/clickable/ButtonAsLink.stories.tsx"),_ButtonIcon_stories__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../design-system/src/stories/clickable/ButtonIcon.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",h2:"h2",a:"a",code:"code"},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.W8,{title:"Clickable/About"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"about-clickables",children:"About Clickables"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Clickables are just the things that look like buttons. It's a UI pattern that has various UX effects."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"buttons",children:"Buttons"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/clickable-button--docs",children:"Checkout the Button docs here."})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Use ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Button"})," when you need highly readable CTAs that trigger an action on the page."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.Hl,{sourceState:"hidden",of:_Button_stories__WEBPACK_IMPORTED_MODULE_2__.Variations}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"buttonaslinks",children:"ButtonAsLinks"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/clickable-buttonaslink--docs",children:"Checkout the ButtonAsLink docs here."})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Use ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ButtonAsLink"})," when you need a CTA that will navigate to a new page."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.Hl,{sourceState:"hidden",of:_ButtonAsLink_stories__WEBPACK_IMPORTED_MODULE_3__.Variations}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"buttonicon",children:"ButtonIcon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/clickable-buttonicon--docs",children:"Checkout the ButtonIcon docs here."})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Use ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"ButtonIcon"})," when you need to click on a standalone icon. This should never be a hyperlink."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_6__.Hl,{sourceState:"hidden",of:_ButtonIcon_stories__WEBPACK_IMPORTED_MODULE_4__.Variations})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_5__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../../node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="../../node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);