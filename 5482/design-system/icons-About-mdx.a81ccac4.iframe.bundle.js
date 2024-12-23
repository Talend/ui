(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[7725,5787,3182],{"../../node_modules/@mdx-js/react/lib/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{BN:()=>MDXContext,RP:()=>useMDXComponents,gz:()=>withMDXComponents,xA:()=>MDXProvider});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");const MDXContext=react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function withMDXComponents(Component){return function boundMDXComponent(props){const allComponents=useMDXComponents(props.components);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(Component,{...props,allComponents})}}function useMDXComponents(components){const contextComponents=react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);return react__WEBPACK_IMPORTED_MODULE_0__.useMemo((()=>"function"==typeof components?components(contextComponents):{...contextComponents,...components}),[contextComponents,components])}const emptyObject={};function MDXProvider({components,children,disableParentContext}){let allComponents;return allComponents=disableParentContext?"function"==typeof components?components({}):components||emptyObject:useMDXComponents(components),react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider,{value:allComponents},children)}},"../design-system/src/stories/icons/Icon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AllIcons:()=>AllIcons,Usage:()=>Usage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),_Icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-system/src/stories/icons/Icons.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Icons/Icon"},Usage=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"XS",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name,style:{width:"0.75rem",height:"0.75rem"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name,style:{width:"1.5rem",height:"1.5rem"}})]});Usage.args={name:"talend-cross"},Usage.argTypes={name:{control:"string"}};const AllIcons=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icons__WEBPACK_IMPORTED_MODULE_1__.g,{children:({name,size,transform,border,filter,useCurrentColor})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name,size,transform,border,filter,useCurrentColor})});Usage.parameters={...Usage.parameters,docs:{...Usage.parameters?.docs,source:{originalSource:"(args: UsageProps) => <StackHorizontal gap=\"XS\">\n        <Icon name={args.name} style={{\n    width: '0.75rem',\n    height: '0.75rem'\n  }} />\n        <Icon name={args.name} />\n        <Icon name={args.name} style={{\n    width: '1.5rem',\n    height: '1.5rem'\n  }} />\n    </StackHorizontal>",...Usage.parameters?.docs?.source}}},AllIcons.parameters={...AllIcons.parameters,docs:{...AllIcons.parameters?.docs,source:{originalSource:"() => <AllIconsTemplate>\n        {({\n    name,\n    size,\n    transform,\n    border,\n    filter,\n    useCurrentColor\n  }) => <Icon name={name} size={size} transform={transform} border={border} filter={filter} useCurrentColor={useCurrentColor} />}\n    </AllIconsTemplate>",...AllIcons.parameters?.docs?.source}}};const __namedExportsOrder=["Usage","AllIcons"]},"../design-system/src/stories/icons/SizedIcon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,IconL:()=>IconL,IconM:()=>IconM,IconS:()=>IconS,IconXS:()=>IconXS,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _talend_icons_dist_typeUtils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../icons/lib-esm/typeUtils.js"),_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-tokens/lib-esm/index.js"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Icons/SizedIcon",component:___WEBPACK_IMPORTED_MODULE_2__.V6},IconXS=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"XS",name:args.name,color:args.color}),IconS=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"S",name:args.name,color:args.color}),IconM=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"M",name:args.name,color:args.color}),IconL=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"L",name:args.name,color:args.color}),colorOptions={options:[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorSuccessIcon,_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorAccentIcon,_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorDangerIcon,_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorNeutralIcon,_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorWarningIcon],control:{type:"select",labels:{[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorSuccessIcon]:"Success",[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorAccentIcon]:"Accent",[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorDangerIcon]:"Danger",[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorNeutralIcon]:"Neutral",[_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorWarningIcon]:"Warning"}}},defaultArgs={color:_talend_design_tokens__WEBPACK_IMPORTED_MODULE_1__.A.coralColorNeutralIcon,name:"pencil"};IconXS.argTypes={name:{options:_talend_icons_dist_typeUtils__WEBPACK_IMPORTED_MODULE_0__.P.XS,control:{type:"select"}},color:colorOptions,size:{table:{disable:!0}}},IconXS.args=defaultArgs,IconS.argTypes={name:{options:_talend_icons_dist_typeUtils__WEBPACK_IMPORTED_MODULE_0__.P.S,control:{type:"select"}},color:colorOptions,size:{table:{disable:!0}}},IconS.args=defaultArgs,IconM.argTypes={name:{options:_talend_icons_dist_typeUtils__WEBPACK_IMPORTED_MODULE_0__.P.M,control:{type:"select"}},color:colorOptions,size:{table:{disable:!0}}},IconM.args=defaultArgs,IconL.argTypes={name:{options:_talend_icons_dist_typeUtils__WEBPACK_IMPORTED_MODULE_0__.P.L,control:{type:"select"}},color:colorOptions,size:{table:{disable:!0}}},IconL.args=defaultArgs;const Example=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.N5,{gap:"XS",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"S",name:"note-pencil"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"M",name:"note-pencil"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.V6,{size:"L",name:"note-pencil"})]});IconXS.parameters={...IconXS.parameters,docs:{...IconXS.parameters?.docs,source:{originalSource:"(args: {\n  name: IconNameWithSize<'XS'>;\n  color: string;\n}) => {\n  return <SizedIcon size=\"XS\" name={args.name} color={args.color} />;\n}",...IconXS.parameters?.docs?.source}}},IconS.parameters={...IconS.parameters,docs:{...IconS.parameters?.docs,source:{originalSource:"(args: {\n  name: IconNameWithSize<'S'>;\n  color: string;\n}) => <SizedIcon size=\"S\" name={args.name} color={args.color} />",...IconS.parameters?.docs?.source}}},IconM.parameters={...IconM.parameters,docs:{...IconM.parameters?.docs,source:{originalSource:"(args: {\n  name: IconNameWithSize<'M'>;\n  color: string;\n}) => <SizedIcon size=\"M\" name={args.name} color={args.color} />",...IconM.parameters?.docs?.source}}},IconL.parameters={...IconL.parameters,docs:{...IconL.parameters?.docs,source:{originalSource:"(args: {\n  name: IconNameWithSize<'L'>;\n  color: string;\n}) => <SizedIcon size=\"L\" name={args.name} color={args.color} />",...IconL.parameters?.docs?.source}}},Example.parameters={...Example.parameters,docs:{...Example.parameters?.docs,source:{originalSource:'() => <StackHorizontal gap="XS">\n        <SizedIcon size="S" name="note-pencil" />\n        <SizedIcon size="M" name="note-pencil" />\n        <SizedIcon size="L" name="note-pencil" />\n    </StackHorizontal>',...Example.parameters?.docs?.source}}};const __namedExportsOrder=["IconXS","IconS","IconM","IconL","Example"]},"../design-system/src/stories/icons/About.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_Icon_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/stories/icons/Icon.stories.tsx"),_SizedIcon_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../design-system/src/stories/icons/SizedIcon.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",ul:"ul",li:"li",h2:"h2",a:"a"},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.W8,{title:"Icons/About"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"about-icons",children:"About Icons"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["To date, Coral provides two ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Icon"})," components. A legacy one and a new one. Eventually, the newer one will remain, alone."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Why two components?"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ul,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:'The original one was built around a philosophy of "everything goes". It\'s a component library approach.'}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.li,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"The newer one does not follow the same principles. It enforces a strict ruleset that is the same for designers and for developers."}),"\n"]}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["The original ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Icon"})," component can take any size we want, support any color etc... Whereas the newer ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"SizedIcon"})," does not."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"sizedicon",children:"SizedIcon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Icons are now strictly defined by size."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"SizedIcon"})," takes two props ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"size"})," and ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"name"}),". The available ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"name"}),"s will be dependent on the chosen ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"size"}),"!"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/icons-sizedicon--docs",children:"Checkout the SizedIcon docs here."})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_SizedIcon_stories__WEBPACK_IMPORTED_MODULE_3__.Example}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.ov,{of:_SizedIcon_stories__WEBPACK_IMPORTED_MODULE_3__.IconXS}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Calling ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:'<SizedIcon size="XS" name="note-pencil" />'})," would not compile in TS because ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"note-pencil"})," does not exist at this size."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"This is true both for developers and designers."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"icon-svg--remote--img",children:"Icon (SVG / Remote . Img)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"This is more generic component which is not considered as Icon but more as image&svg loader"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"/docs/icons-icon--docs",children:"Checkout the Icon docs here."})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_5__.Hl,{of:_Icon_stories__WEBPACK_IMPORTED_MODULE_2__.Usage}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"These icons are lawless. Some even have their own colorset. They are impossible to homogenize as part of a design language."})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_4__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../design-system/src/stories/icons/Icons.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{F:()=>AllIconsDocs,g:()=>AllIconsTemplate});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const AllIconsTemplate=({children,docs})=>{const[icons,setIds]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),[query,setQuery]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(2),[filter,setFilter]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[transform,setTransform]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),[useCurrentColor,setUseCurrentColor]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[currentColor,setCurrentColor]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[border,setBorder]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{___WEBPACK_IMPORTED_MODULE_1__._Q.getAllIconIds().then((ids=>{const cleanIds=ids.filter((id=>id&&!id.includes(":")));setIds(cleanIds)}))}),[]);const Wrapper=props=>docs?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.yt,{children:props.children}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{children:props.children});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.N5,{gap:"M",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.Search,{name:"search",label:"Search",onChange:event=>{setQuery(event.currentTarget.value)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV.Select,{name:"Size",label:"Size",onChange:event=>{setSize(parseFloat(event.currentTarget.value))},value:size,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"1",children:"S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"2",children:"M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"3",children:"L"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"4",children:"XL"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV.Select,{name:"Transform",label:"Transform",onChange:event=>{setTransform(event.currentTarget.value)},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"spin"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-45"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-90"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-135"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-180"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-225"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-270"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-315"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"flip-horizontal"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"flip-vertical"})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.N5,{gap:"M",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{label:"Use color",name:"color",onChange:()=>setUseCurrentColor(!useCurrentColor),checked:!!useCurrentColor}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{label:"Use border",name:"border",onChange:()=>setBorder(!border),checked:!!border}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{name:"grayscale",label:"Use grayscale filter",onChange:()=>setFilter(!filter),checked:!!filter})]}),useCurrentColor?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.Color,{label:"Color",onChange:event=>setCurrentColor(event.currentTarget.value),value:currentColor,name:"color"}):null]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{marginTop:"1.875rem",color:currentColor},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrapper,{children:icons.filter((iconName=>iconName&&iconName.includes(query))).map((iconName=>iconName&&children({name:iconName,size,transform,useCurrentColor,border,filter})))})})]})},AllIconsDocs=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(AllIconsTemplate,{docs:!0,children:({name,size,transform,border,filter,useCurrentColor})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.xz,{name,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.In,{name,style:{width:`${size}rem`,height:`${size}rem`,filter:filter?"url('#talend-grayscale')":"none"},transform,border})},name)})},"../../node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="../../node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);