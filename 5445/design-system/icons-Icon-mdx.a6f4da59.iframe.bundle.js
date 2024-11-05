"use strict";(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[1273],{"../design-system/src/stories/icons/Icon.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AllIcons:()=>AllIcons,Usage:()=>Usage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),_Icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-system/src/stories/icons/Icons.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Icons/Icon"},Usage=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.N5,{gap:"XS",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name,style:{width:"0.75rem",height:"0.75rem"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name:args.name,style:{width:"1.5rem",height:"1.5rem"}})]});Usage.args={name:"talend-cross"},Usage.argTypes={name:{control:"string"}};const AllIcons=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Icons__WEBPACK_IMPORTED_MODULE_1__.g,{children:({name,size,transform,border,filter,useCurrentColor})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.In,{name,size,transform,border,filter,useCurrentColor})});Usage.parameters={...Usage.parameters,docs:{...Usage.parameters?.docs,source:{originalSource:"(args: UsageProps) => <StackHorizontal gap=\"XS\">\n        <Icon name={args.name} style={{\n    width: '0.75rem',\n    height: '0.75rem'\n  }} />\n        <Icon name={args.name} />\n        <Icon name={args.name} style={{\n    width: '1.5rem',\n    height: '1.5rem'\n  }} />\n    </StackHorizontal>",...Usage.parameters?.docs?.source}}},AllIcons.parameters={...AllIcons.parameters,docs:{...AllIcons.parameters?.docs,source:{originalSource:"() => <AllIconsTemplate>\n        {({\n    name,\n    size,\n    transform,\n    border,\n    filter,\n    useCurrentColor\n  }) => <Icon name={name} size={size} transform={transform} border={border} filter={filter} useCurrentColor={useCurrentColor} />}\n    </AllIconsTemplate>",...AllIcons.parameters?.docs?.source}}};const __namedExportsOrder=["Usage","AllIcons"]},"../design-system/src/stories/icons/Icon.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_Icon_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/stories/icons/Icon.stories.tsx"),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../design-system/src/index.ts"),_Status_block__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../design-system/src/stories/Status.block.tsx"),_Icons__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../design-system/src/stories/icons/Icons.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",pre:"pre"},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.RP)(),props.components);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.W8,{of:_Icon_stories__WEBPACK_IMPORTED_MODULE_2__}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Status_block__WEBPACK_IMPORTED_MODULE_4__.n,{id:"icon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"icon",children:"Icon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"This component is generic and can be seens as a Primitive to display SVG, img, remote or not."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Hl,{of:_Icon_stories__WEBPACK_IMPORTED_MODULE_2__.Usage}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"remote-icon",children:"Remote icon"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Icon can accept a URL as ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"name"}),' but it must be prefixed by "remote-"']}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.xz,{name:"remote-url as svg",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.In,{name:"remote-https://unpkg.com/@talend/icons@6.1.5/src/svg/core/abc.svg"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-javascript",children:'<Icon name="remote-https://unpkg.com/@talend/icons@6.1.5/src/svg/core/abc.svg" />\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"icon-as-image",children:"Icon as image"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Icon can accept any type of image but their ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"name"}),' must be prefixed by "src-".']}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.xz,{name:"src-url as img",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_3__.In,{name:"src-https://statics-dev.cloud.talend.com/@talend/common/images/favicon-logo-square.ico"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.pre,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{className:"language-javascript",children:'<Icon name="src-https://statics-dev.cloud.talend.com/@talend/common/images/favicon-logo-square.ico" />\n'})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"svg-from-the-bundle-allsvg",children:"SVG from the bundle all.svg"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"All icons can be found below and you can apply transformations on them."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Icons__WEBPACK_IMPORTED_MODULE_5__.F,{})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)}},"../design-system/src/stories/Status.block.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>Status});const status_namespaceObject=JSON.parse('{"accordion":{"figma":{"status":"ok","link":"https://www.figma.com/file/CDfr4jLz1m6Ud2RNi4qpQJ/Accordion"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Accordion/Accordion.tsx"},"i18n":{"status":"na"}},"badge":{"figma":{"status":"wip","link":"https://www.figma.com/file/3YWRmMgPIjAABxJl9X9B3W/Badge"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Badge/Badge.tsx"},"i18n":{"status":"wip"}},"breadcrumbs":{"figma":{"status":"ok","link":"https://www.figma.com/file/8ifUyNjdZkWBmKKrgfB675/Breadcrumbs"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Breadcrumbs/Breadcrumbs.tsx"},"i18n":{"status":"na"}},"button":{"figma":{"status":"ok","link":"https://www.figma.com/file/vvJTHBAgiLfBpgeKEjmvvZ/Buttons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Button/Button.tsx"},"i18n":{"status":"na"}},"buttonAsLink":{"figma":{"status":"ok","link":"https://www.figma.com/file/vvJTHBAgiLfBpgeKEjmvvZ/Buttons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ButtonAsLink/ButtonAsLink.tsx"},"i18n":{"status":"na"}},"buttonIcon":{"figma":{"status":"ok","link":"https://www.figma.com/file/KuJ1PlP77uyXlfOhdniqsZ/ButtonIcon?node-id=1%3A75"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ButtonIcon/variations/ButtonIcon.tsx"},"i18n":{"status":"na"}},"card":{"figma":{"status":"wip"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Card/Card.tsx"},"i18n":{"status":"na"}},"combobox":{"figma":{"status":"wip","link":"https://www.figma.com/file/XLAg5NdlNDKGVp6IgqDzGC/Combo-box"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Combobox/Combobox.tsx"},"i18n":{"status":"na"}},"divider":{"figma":{"status":"ok","link":"https://www.figma.com/file/OGrnGJ6dCVvU0CRYsOuiTZ/Divider"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Divider/Divider.tsx"},"i18n":{"status":"na"}},"drawer":{"figma":{"status":"wip","link":"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Drawer/variants/FloatingDrawer/FloatingDrawer.tsx"},"i18n":{"status":"na"}},"floatingDrawer":{"figma":{"status":"wip","link":"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Drawer/variants/FloatingDrawer/FloatingDrawer.tsx"},"i18n":{"status":"na"}},"dropdown":{"figma":{"status":"ok","link":"https://www.figma.com/file/IUeLBwjDCMkpdO7OtZ29u1/Dropdown"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Dropdown/Dropdown.tsx"},"i18n":{"status":"na"}},"emptyState":{"figma":{"status":"ok","link":"https://www.figma.com/file/6XBBCBVOhyX6yTaNcZQiti/Empty-States"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/EmptyState/EmptyState.tsx"},"i18n":{"status":"wip"}},"errorState":{"figma":{"status":"ok","link":"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5523%3A27380"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ErrorState/ErrorState.tsx"},"i18n":{"status":"na"}},"form":{"figma":{"status":"ok","link":"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=58%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Form.tsx"},"i18n":{"status":"na"}},"formAffix":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=249%3A129"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Affix/variations/AffixSelect.tsx"},"i18n":{"status":"na"}},"formButton":{"figma":{"status":"ok","link":"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/?node-id=34%3A4932"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Buttons/Buttons.tsx"},"i18n":{"status":"na"}},"formField":{"figma":{"status":"ok","link":"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5300%3A21659"},"storybook":{"status":"ok"},"react":{"status":"ok"},"i18n":{"status":"na"}},"formFieldDatalist":{"figma":{"status":"ok","link":"ttps://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=252%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Datalist/Datalist.tsx"},"i18n":{"status":"na"}},"formFieldInputPassword":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A294"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Password/Password.tsx"},"i18n":{"status":"ok"}},"formFieldInputCheckbox":{"figma":{"status":"ok","link":"https://www.figma.com/file/9q3dOyrI7zRR7dHDe2jRpz/Checkbox?node-id=0%3A1"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputColor":{"figma":{"status":"wip","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Color.tsx"},"i18n":{"status":"na"}},"formFieldInputCopy":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A11"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Copy.tsx"},"i18n":{"status":"ok"}},"formFieldInputDate":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Date.tsx"},"i18n":{"status":"na"}},"formFieldInputDateTimeLocal":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.DatetimeLocal.tsx"},"i18n":{"status":"na"}},"formFieldInputEmail":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputFile":{"figma":{"status":"ok","link":"ttps://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A233"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.File.tsx"},"i18n":{"status":"ok"}},"formFieldInputMonth":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Month.tsx"},"i18n":{"status":"na"}},"formFieldInputNumber":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A53"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputRadio":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=44%3A76"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Radio.tsx"},"i18n":{"status":"na"}},"formFieldInputSearch":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A198"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Search.tsx"},"i18n":{"status":"na"}},"formFieldInputTel":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Tel.tsx"},"i18n":{"status":"na"}},"formFieldInputText":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Text.tsx"},"i18n":{"status":"na"}},"formFieldInputTime":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Time.tsx"},"i18n":{"status":"na"}},"formFieldInputToggleSwitch":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=252%3A9"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.ToggleSwitch.tsx"},"i18n":{"status":"na"}},"formFieldInputUrl":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Url.tsx"},"i18n":{"status":"na"}},"formFieldInputWeek":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Week.tsx"},"i18n":{"status":"na"}},"formFieldInputSelect":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A211"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Select/Select.tsx"},"i18n":{"status":"na"}},"formFieldInputTextArea":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A268"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Textarea/Textarea.tsx"},"i18n":{"status":"na"}},"formEnumeration":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Enumeration/Enumeration.component.tsx"},"i18n":{"status":"na"}},"formFieldset":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=349%3A227"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Fieldset/Fieldset.tsx"},"i18n":{"status":"na"}},"icon":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Icon/Icon.tsx"},"i18n":{"status":"na"}},"sizedIcon":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Icon/SizedIcon.tsx"},"i18n":{"status":"na"}},"inlineEditing":{"figma":{"status":"ok","link":"https://www.figma.com/file/Ve55mrVTPmg8yDo8VKRp83/Inline-editing?node-id=422%3A3426"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/InlineEditing/variations/InlineEditing.text.tsx"},"i18n":{"status":"ok"}},"inlineMessage":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=12%3A96"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/InlineMessage/InlineMessage.tsx"},"i18n":{"status":"na"}},"link":{"figma":{"status":"ok","link":"https://www.figma.com/file/l3FmBFqbeqqSlz9TBZKgWS/Links"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Link/Link.tsx"},"i18n":{"status":"ok"}},"loading":{"figma":{"status":"ok"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Loading/Loading.tsx"},"i18n":{"status":"na"}},"message":{"figma":{"status":"ok","link":"https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=122%3A42331"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Message/Primitive/MessagePrimitive.tsx"},"i18n":{"status":"na"}},"modal":{"figma":{"status":"ok","link":"https://www.figma.com/file/0Jolh2prAAdfO5224n3OU3/Modal"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Modal/Modal.tsx"},"i18n":{"status":"na"}},"popover":{"figma":{"status":"wip"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Popover/Popover.tsx"},"i18n":{"status":"na"}},"richRadioButton":{"figma":{"status":"ok"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/RichRadioButton/RichRadioButton.component.tsx"},"i18n":{"status":"na"}},"skeleton":{"figma":{"status":"ok","link":"https://www.figma.com/file/RMs7GdNC3mnAwHgG4Firw9/Skeletons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Skeleton/Skeleton.tsx"},"i18n":{"status":"na"}},"stack":{"figma":{"status":"na","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=1044%3A237"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stack/Primitive/StackPrimitive.tsx"},"i18n":{"status":"na"}},"status":{"figma":{"status":"ok","link":"https://www.figma.com/file/joEoPYw910CgGO0DiKWRoD/Status?node-id=2%3A72"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Status/Status.tsx"},"i18n":{"status":"ok"}},"stepper":{"figma":{"status":"ok","link":"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/?node-id=1%3A5"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stepper/Stepper.tsx"},"i18n":{"status":"ok"}},"stepperStep":{"figma":{"status":"ok","link":"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/?node-id=1%3A4"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stepper/Step/Primitive/Step.tsx"},"i18n":{"status":"na"}},"switch":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Switch/Switch.tsx"},"i18n":{"status":"na"}},"tabs":{"figma":{"status":"ok","link":"https://www.figma.com/file/bSesPlHPWLPA66wySm8VYV/Tabs"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Tabs/variants/Tabs.tsx"},"i18n":{"status":"na"}},"tag":{"figma":{"status":"ok","link":"https://www.figma.com/file/wggW0Nf0ZujylGaXt5Snnn/Tags"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Tag/Tag.tsx"},"i18n":{"status":"na"}},"tooltip":{"figma":{"status":"ok","link":"https://www.figma.com/file/93AaDV2pC1tK9J1O6IbHho/Tooltips"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Tooltip/Tooltip.tsx"},"i18n":{"status":"na"}}}');var lib=__webpack_require__("../storybook-docs/lib/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Status({id}){const info=status_namespaceObject[id];return(0,jsx_runtime.jsx)(lib.ComponentStatuses,{...info})}},"../design-system/src/stories/icons/Icons.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>AllIconsDocs,g:()=>AllIconsTemplate});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const AllIconsTemplate=({children,docs})=>{const[icons,setIds]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),[query,setQuery]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),[size,setSize]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(2),[filter,setFilter]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[transform,setTransform]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),[useCurrentColor,setUseCurrentColor]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[currentColor,setCurrentColor]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[border,setBorder]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{___WEBPACK_IMPORTED_MODULE_1__._Q.getAllIconIds().then((ids=>{const cleanIds=ids.filter((id=>id&&!id.includes(":")));setIds(cleanIds)}))}),[]);const Wrapper=props=>docs?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.yt,{children:props.children}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{children:props.children});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.N5,{gap:"M",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.Search,{name:"search",label:"Search",onChange:event=>{setQuery(event.currentTarget.value)}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV.Select,{name:"Size",label:"Size",onChange:event=>{setSize(parseFloat(event.currentTarget.value))},value:size,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"1",children:"S"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"2",children:"M"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"3",children:"L"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{value:"4",children:"XL"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.lV.Select,{name:"Transform",label:"Transform",onChange:event=>{setTransform(event.currentTarget.value)},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"spin"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-45"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-90"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-135"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-180"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-225"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-270"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"rotate-315"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"flip-horizontal"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("option",{children:"flip-vertical"})]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.N5,{gap:"M",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{label:"Use color",name:"color",onChange:()=>setUseCurrentColor(!useCurrentColor),checked:!!useCurrentColor}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{label:"Use border",name:"border",onChange:()=>setBorder(!border),checked:!!border}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.ToggleSwitch,{name:"grayscale",label:"Use grayscale filter",onChange:()=>setFilter(!filter),checked:!!filter})]}),useCurrentColor?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.lV.Color,{label:"Color",onChange:event=>setCurrentColor(event.currentTarget.value),value:currentColor,name:"color"}):null]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{style:{marginTop:"1.875rem",color:currentColor},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrapper,{children:icons.filter((iconName=>iconName&&iconName.includes(query))).map((iconName=>iconName&&children({name:iconName,size,transform,useCurrentColor,border,filter})))})})]})},AllIconsDocs=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(AllIconsTemplate,{docs:!0,children:({name,size,transform,border,filter,useCurrentColor})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_3__.xz,{name,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.In,{name,style:{width:`${size}rem`,height:`${size}rem`,filter:filter?"url('#talend-grayscale')":"none"},transform,border})},name)})}}]);