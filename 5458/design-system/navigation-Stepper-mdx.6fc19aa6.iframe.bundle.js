"use strict";(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[4751,2025],{"../design-system/src/stories/navigation/Stepper.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Horizontal:()=>Horizontal,Overflows:()=>Overflows,Usage:()=>Usage,Vertical:()=>Vertical,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var ___WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Navigation/Stepper/Stepper",component:___WEBPACK_IMPORTED_MODULE_0__.C1},Vertical=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.C1,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Validated,{title:"Validated step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.InProgress,{title:"Current step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Enabled,{title:"Next step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Enabled,{title:"Next step"})]}),Horizontal=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.C1.Horizontal,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Validated,{title:"Validated step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.InProgress,{title:"Current step"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Enabled,{title:"Next step"})]}),Overflows=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.xs,{gap:"M",justify:"center",align:"center",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4",{children:"Vertical stepper"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.C1,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Validated,{title:"Validated step with copy that breaks the width limit"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.InProgress,{title:"Current step with copy that breaks the width limit"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.cG,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h4",{children:"Horizontal stepper"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(___WEBPACK_IMPORTED_MODULE_0__.C1.Horizontal,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Validated,{title:"Validated step with copy that breaks the width limit"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.InProgress,{title:"Current step with copy that breaks the width limit"})]})]}),Usage=({variant,...props})=>{const StepperComponent=___WEBPACK_IMPORTED_MODULE_0__.C1[variant];return StepperComponent.displayName=`Stepper.${variant}`,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(StepperComponent,{...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Validated,{title:"Validated"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.InProgress,{title:"In progress"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_0__.C1.Step.Enabled,{title:"Enabled"})]})};Usage.args={variant:"Vertical",currentStepIndex:1},Usage.argTypes={variant:{description:"Stepper variation",options:["Vertical","Horizontal"],control:{type:"select"}},currentStepIndex:{description:"Current step index",control:{type:"number"}}},Vertical.parameters={...Vertical.parameters,docs:{...Vertical.parameters?.docs,source:{originalSource:'() => <Stepper>\n        <Stepper.Step.Validated title="Validated step" />\n        <Stepper.Step.InProgress title="Current step" />\n        <Stepper.Step.Enabled title="Next step" />\n        <Stepper.Step.Enabled title="Next step" />\n    </Stepper>',...Vertical.parameters?.docs?.source}}},Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'() => <Stepper.Horizontal>\n        <Stepper.Step.Validated title="Validated step" />\n        <Stepper.Step.InProgress title="Current step" />\n        <Stepper.Step.Enabled title="Next step" />\n    </Stepper.Horizontal>',...Horizontal.parameters?.docs?.source}}},Overflows.parameters={...Overflows.parameters,docs:{...Overflows.parameters?.docs,source:{originalSource:'() => <StackVertical gap="M" justify="center" align="center">\n        <h4>Vertical stepper</h4>\n        <Stepper>\n            <Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />\n            <Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />\n        </Stepper>\n        <Divider />\n        <h4>Horizontal stepper</h4>\n        <Stepper.Horizontal>\n            <Stepper.Step.Validated title="Validated step with copy that breaks the width limit" />\n            <Stepper.Step.InProgress title="Current step with copy that breaks the width limit" />\n        </Stepper.Horizontal>\n    </StackVertical>',...Overflows.parameters?.docs?.source}}},Usage.parameters={...Usage.parameters,docs:{...Usage.parameters?.docs,source:{originalSource:'({\n  variant,\n  ...props\n}: any) => {\n  const StepperComponent = Stepper[variant];\n  StepperComponent.displayName = `Stepper.${variant}`;\n  return <StepperComponent {...props}>\n            <Stepper.Step.Validated title="Validated" />\n            <Stepper.Step.InProgress title="In progress" />\n            <Stepper.Step.Enabled title="Enabled" />\n        </StepperComponent>;\n}',...Usage.parameters?.docs?.source}}};const __namedExportsOrder=["Vertical","Horizontal","Overflows","Usage"]},"../design-system/src/stories/navigation/Stepper.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@mdx-js/react/lib/index.js"),_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@storybook/blocks/dist/index.mjs"),_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../storybook-docs/lib/index.js"),___WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../design-system/src/index.ts"),_Status_block__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../design-system/src/stories/Status.block.tsx"),_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../design-system/src/stories/navigation/Stepper.stories.tsx");function _createMdxContent(props){const _components=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",h3:"h3",strong:"strong",ol:"ol",li:"li",a:"a"},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.RP)(),props.components);return _talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use||_missingMdxReference("Use",!1),_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use.Do||_missingMdxReference("Use.Do",!0),_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use.Dont||_missingMdxReference("Use.Dont",!0),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.W8,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__,component:___WEBPACK_IMPORTED_MODULE_3__.C1}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Status_block__WEBPACK_IMPORTED_MODULE_4__.n,{id:"stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h1,{id:"stepper",children:"Stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.code,{children:"Stepper"})," is used to display the different steps needed to complete an action."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"It helps users avoid frustration and successfully complete a primary task."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"The stepper displays progress through a sequence split into multiple logical and numbered steps."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"zoning",children:"Zoning"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.FigmaImage,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=952%3A230",alt:"zoning image for the stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"style",children:"Style"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"variations",children:"Variations"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["A Stepper is ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"vertical by default"})," but can be horizontal."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Vertical"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Consider using a vertical stepper when there are workflows greater than 3 steps."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.FigmaImage,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1809%3A47231",alt:"Mockup of a vertical stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Hl,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__.Vertical}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Horizontal"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Consider using a horizontal stepper when full page components are used (such as Data grid or List)"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"A horizontal stepper should not have more than 3 steps."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.FigmaImage,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1809%3A47229",alt:"Mockup of a horizontal stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Hl,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__.Horizontal}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"states",children:"States"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"overflowing-steps",children:"Overflowing steps"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"The space dedicated to step is limited. No reflow strategy has been put in place, so text overflow is truncated with an ellipsis."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Hl,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__.Overflows}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"content",children:"Content"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Use nouns to create one-word labels for steps. Go for 2-word step labels when necessary."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"Step labels should describe the purpose of each step and let users know where they are in their setup."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"In vertical steppers"}),', each step describes a section to the right of the stepper. Start the section title with a verb and tell users what to do and why. For example, a step label "Engine" could have a section title "Add the engine on which to process data".\nStep sections can also have subtitles, if necessary, to provide users with extra important information—as in complicated steps for example.']}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"In horizontal steppers"}),", no sections are used. Once a step is selected, user input shows below. Avoid using long nouns in horizontal steppers"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use.Do,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Keep labels concise: one-word labels as a rule, two words when necessary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Match step labels to the title of the page they link to"})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.Use.Dont,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Use complex long nouns"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("li",{children:"Mix action and noun phrases in steps labels"})]})})]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h3,{id:"buttons-in-forms-that-use-a-stepper",children:"Buttons in forms that use a Stepper"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"In case of multi-step form, we should always provide at least 2 buttons:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.ol,{children:["\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Cancel or Back button"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.li,{children:"Continue or Next button"}),"\n"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Use a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"cancel button"})," for the first step as the user can't step back. Use a ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"back button"})," from the second step to allow the user to step back."]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.FigmaImage,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=115%3A0",alt:"buttons mutli step form example"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"The back button can also be used in addition of the cancel button. In that case, the cancel button is still the first available:"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_talend_storybook_docs__WEBPACK_IMPORTED_MODULE_2__.FigmaImage,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1808%3A47056",alt:"cancel and back buttons for multi step form"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"interactions",children:"Interactions"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.strong,{children:"Error in the form"})}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.p,{children:"In case of an error in the current step, please inform the user by using an inline message on that screen."}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"usage",children:"Usage"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.Hl,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__.Usage}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_storybook_blocks__WEBPACK_IMPORTED_MODULE_7__.H2,{of:_Stepper_stories__WEBPACK_IMPORTED_MODULE_5__.Usage,exclude:["loading"]}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.h2,{id:"accessibility",children:"Accessibility"}),"\n",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_components.p,{children:["Stepper should follow related ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_components.a,{href:"https://www.w3.org/WAI/tutorials/forms/multi-page/",target:"_blank",rel:"nofollow noopener noreferrer",children:"WAI guidelines"}),"."]})]})}const __WEBPACK_DEFAULT_EXPORT__=function MDXContent(props={}){const{wrapper:MDXLayout}=Object.assign({},(0,_home_runner_work_ui_ui_node_modules_storybook_addon_docs_dist_shims_mdx_react_shim__WEBPACK_IMPORTED_MODULE_6__.RP)(),props.components);return MDXLayout?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(MDXLayout,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_createMdxContent,props)})):_createMdxContent(props)};function _missingMdxReference(id,component){throw new Error("Expected "+(component?"component":"object")+" `"+id+"` to be defined: you likely forgot to import, pass, or provide it.")}},"../design-system/src/stories/Status.block.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>Status});const status_namespaceObject=JSON.parse('{"accordion":{"figma":{"status":"ok","link":"https://www.figma.com/file/CDfr4jLz1m6Ud2RNi4qpQJ/Accordion"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Accordion/Accordion.tsx"},"i18n":{"status":"na"}},"badge":{"figma":{"status":"wip","link":"https://www.figma.com/file/3YWRmMgPIjAABxJl9X9B3W/Badge"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Badge/Badge.tsx"},"i18n":{"status":"wip"}},"breadcrumbs":{"figma":{"status":"ok","link":"https://www.figma.com/file/8ifUyNjdZkWBmKKrgfB675/Breadcrumbs"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Breadcrumbs/Breadcrumbs.tsx"},"i18n":{"status":"na"}},"button":{"figma":{"status":"ok","link":"https://www.figma.com/file/vvJTHBAgiLfBpgeKEjmvvZ/Buttons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Button/Button.tsx"},"i18n":{"status":"na"}},"buttonAsLink":{"figma":{"status":"ok","link":"https://www.figma.com/file/vvJTHBAgiLfBpgeKEjmvvZ/Buttons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ButtonAsLink/ButtonAsLink.tsx"},"i18n":{"status":"na"}},"buttonIcon":{"figma":{"status":"ok","link":"https://www.figma.com/file/KuJ1PlP77uyXlfOhdniqsZ/ButtonIcon?node-id=1%3A75"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ButtonIcon/variations/ButtonIcon.tsx"},"i18n":{"status":"na"}},"card":{"figma":{"status":"wip"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Card/Card.tsx"},"i18n":{"status":"na"}},"combobox":{"figma":{"status":"wip","link":"https://www.figma.com/file/XLAg5NdlNDKGVp6IgqDzGC/Combo-box"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Combobox/Combobox.tsx"},"i18n":{"status":"na"}},"divider":{"figma":{"status":"ok","link":"https://www.figma.com/file/OGrnGJ6dCVvU0CRYsOuiTZ/Divider"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Divider/Divider.tsx"},"i18n":{"status":"na"}},"drawer":{"figma":{"status":"wip","link":"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Drawer/variants/FloatingDrawer/FloatingDrawer.tsx"},"i18n":{"status":"na"}},"floatingDrawer":{"figma":{"status":"wip","link":"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Drawer/variants/FloatingDrawer/FloatingDrawer.tsx"},"i18n":{"status":"na"}},"dropdown":{"figma":{"status":"ok","link":"https://www.figma.com/file/IUeLBwjDCMkpdO7OtZ29u1/Dropdown"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Dropdown/Dropdown.tsx"},"i18n":{"status":"na"}},"emptyState":{"figma":{"status":"ok","link":"https://www.figma.com/file/6XBBCBVOhyX6yTaNcZQiti/Empty-States"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/EmptyState/EmptyState.tsx"},"i18n":{"status":"wip"}},"errorState":{"figma":{"status":"ok","link":"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5523%3A27380"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/ErrorState/ErrorState.tsx"},"i18n":{"status":"na"}},"form":{"figma":{"status":"ok","link":"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=58%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Form.tsx"},"i18n":{"status":"na"}},"formAffix":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=249%3A129"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Affix/variations/AffixSelect.tsx"},"i18n":{"status":"na"}},"formButton":{"figma":{"status":"ok","link":"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/?node-id=34%3A4932"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Buttons/Buttons.tsx"},"i18n":{"status":"na"}},"formField":{"figma":{"status":"ok","link":"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5300%3A21659"},"storybook":{"status":"ok"},"react":{"status":"ok"},"i18n":{"status":"na"}},"formFieldDatalist":{"figma":{"status":"ok","link":"ttps://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=252%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Datalist/Datalist.tsx"},"i18n":{"status":"na"}},"formFieldInputPassword":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A294"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Password/Password.tsx"},"i18n":{"status":"ok"}},"formFieldInputCheckbox":{"figma":{"status":"ok","link":"https://www.figma.com/file/9q3dOyrI7zRR7dHDe2jRpz/Checkbox?node-id=0%3A1"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputColor":{"figma":{"status":"wip","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A0"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Color.tsx"},"i18n":{"status":"na"}},"formFieldInputCopy":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A11"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Copy.tsx"},"i18n":{"status":"ok"}},"formFieldInputDate":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Date.tsx"},"i18n":{"status":"na"}},"formFieldInputDateTimeLocal":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.DatetimeLocal.tsx"},"i18n":{"status":"na"}},"formFieldInputEmail":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputFile":{"figma":{"status":"ok","link":"ttps://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A233"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.File.tsx"},"i18n":{"status":"ok"}},"formFieldInputMonth":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Month.tsx"},"i18n":{"status":"na"}},"formFieldInputNumber":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=548%3A53"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Checkbox.tsx"},"i18n":{"status":"na"}},"formFieldInputRadio":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=44%3A76"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Radio.tsx"},"i18n":{"status":"na"}},"formFieldInputSearch":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A198"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Search.tsx"},"i18n":{"status":"na"}},"formFieldInputTel":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Tel.tsx"},"i18n":{"status":"na"}},"formFieldInputText":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Text.tsx"},"i18n":{"status":"na"}},"formFieldInputTime":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Time.tsx"},"i18n":{"status":"na"}},"formFieldInputToggleSwitch":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=252%3A9"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.ToggleSwitch.tsx"},"i18n":{"status":"na"}},"formFieldInputUrl":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Url.tsx"},"i18n":{"status":"na"}},"formFieldInputWeek":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A219"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Input/Input.Week.tsx"},"i18n":{"status":"na"}},"formFieldInputSelect":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A211"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Select/Select.tsx"},"i18n":{"status":"na"}},"formFieldInputTextArea":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=245%3A268"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Field/Textarea/Textarea.tsx"},"i18n":{"status":"na"}},"formEnumeration":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Enumeration/Enumeration.component.tsx"},"i18n":{"status":"na"}},"formFieldset":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=349%3A227"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Form/Fieldset/Fieldset.tsx"},"i18n":{"status":"na"}},"icon":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Icon/Icon.tsx"},"i18n":{"status":"na"}},"sizedIcon":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Icon/SizedIcon.tsx"},"i18n":{"status":"na"}},"inlineEditing":{"figma":{"status":"ok","link":"https://www.figma.com/file/Ve55mrVTPmg8yDo8VKRp83/Inline-editing?node-id=422%3A3426"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/InlineEditing/variations/InlineEditing.text.tsx"},"i18n":{"status":"ok"}},"inlineMessage":{"figma":{"status":"ok","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=12%3A96"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/InlineMessage/InlineMessage.tsx"},"i18n":{"status":"na"}},"link":{"figma":{"status":"ok","link":"https://www.figma.com/file/l3FmBFqbeqqSlz9TBZKgWS/Links"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Link/Link.tsx"},"i18n":{"status":"ok"}},"loading":{"figma":{"status":"ok"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Loading/Loading.tsx"},"i18n":{"status":"na"}},"message":{"figma":{"status":"ok","link":"https://www.figma.com/file/MSrfT0wzGwQSL8GuyG3UE7/Messages?node-id=122%3A42331"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Message/Primitive/MessagePrimitive.tsx"},"i18n":{"status":"na"}},"modal":{"figma":{"status":"ok","link":"https://www.figma.com/file/0Jolh2prAAdfO5224n3OU3/Modal"},"storybook":{"status":"wip"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Modal/Modal.tsx"},"i18n":{"status":"na"}},"popover":{"figma":{"status":"wip"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Popover/Popover.tsx"},"i18n":{"status":"na"}},"richRadioButton":{"figma":{"status":"ok"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/RichRadioButton/RichRadioButton.component.tsx"},"i18n":{"status":"na"}},"skeleton":{"figma":{"status":"ok","link":"https://www.figma.com/file/RMs7GdNC3mnAwHgG4Firw9/Skeletons"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Skeleton/Skeleton.tsx"},"i18n":{"status":"na"}},"stack":{"figma":{"status":"na","link":"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=1044%3A237"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stack/Primitive/StackPrimitive.tsx"},"i18n":{"status":"na"}},"status":{"figma":{"status":"ok","link":"https://www.figma.com/file/joEoPYw910CgGO0DiKWRoD/Status?node-id=2%3A72"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Status/Status.tsx"},"i18n":{"status":"ok"}},"stepper":{"figma":{"status":"ok","link":"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/?node-id=1%3A5"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stepper/Stepper.tsx"},"i18n":{"status":"ok"}},"stepperStep":{"figma":{"status":"ok","link":"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/?node-id=1%3A4"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Stepper/Step/Primitive/Step.tsx"},"i18n":{"status":"na"}},"switch":{"figma":{"status":"ok"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Switch/Switch.tsx"},"i18n":{"status":"na"}},"tabs":{"figma":{"status":"ok","link":"https://www.figma.com/file/bSesPlHPWLPA66wySm8VYV/Tabs"},"storybook":{"status":"wip"},"react":{"status":"wip","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/WIP/Tabs/variants/Tabs.tsx"},"i18n":{"status":"na"}},"tag":{"figma":{"status":"ok","link":"https://www.figma.com/file/wggW0Nf0ZujylGaXt5Snnn/Tags"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Tag/Tag.tsx"},"i18n":{"status":"na"}},"tooltip":{"figma":{"status":"ok","link":"https://www.figma.com/file/93AaDV2pC1tK9J1O6IbHho/Tooltips"},"storybook":{"status":"ok"},"react":{"status":"ok","link":"https://github.com/Talend/ui/blob/master/packages/design-system/src/components/Tooltip/Tooltip.tsx"},"i18n":{"status":"na"}}}');var lib=__webpack_require__("../storybook-docs/lib/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Status({id}){const info=status_namespaceObject[id];return(0,jsx_runtime.jsx)(lib.ComponentStatuses,{...info})}}}]);