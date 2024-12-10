"use strict";(self.webpackChunk_talend_design_docs=self.webpackChunk_talend_design_docs||[]).push([[725],{"../../node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var v4=__webpack_require__("../../node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("../../node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors._U({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"../design-system/src/stories/form/Affix/Affix.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AffixButton:()=>AffixButton,AffixSelect:()=>AffixSelect,AffixText:()=>AffixText,DatalistAffix:()=>DatalistAffix,Mix:()=>Mix,QuickStart:()=>QuickStart,ReactHookForm:()=>ReactHookForm,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),react_hook_form__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react-hook-form/dist/index.esm.mjs"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../design-system/src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:___WEBPACK_IMPORTED_MODULE_2__.lV.Text,title:"Form/Affix"},QuickStart=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Select affix",placeholder:"ex: talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"https://",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"https://"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"http://"})]})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Text affix",placeholder:"ex: talend",prefix:{type:"text",children:"https://"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Button affix",placeholder:"ex: 4874-48f4-vh34-284h",defaultValue:"4874-48f4-vh34-284h",readOnly:!0,prefix:{type:"button",children:"copy",icon:"copy",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Copied")}})]}),AffixSelect=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Select prefix and input text",placeholder:"www.talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"France (+33)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"UK (+31)"})]})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"select",label:"Select suffix and select input",placeholder:"www.talend.com",suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".com"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".org"})]})},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.talend"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.stitch"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Disabled select prefix",placeholder:"www.talend.com",prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",disabled:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"France (+33)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"UK (+31)"})]})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"select",label:"Disabled select suffix",placeholder:"www.talend.com",suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",disabled:!0,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".com"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".org"})]})},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.talend"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.stitch"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Read-only select prefix",placeholder:"www.talend.com",readOnly:!0,prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"France (+33)",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"France (+33)"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"UK (+31)"})]})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"select",label:"Read-only select suffix",placeholder:"www.talend",defaultValue:"www.talend",readOnly:!0,suffix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:".com",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".com"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:".org"})]})},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.talend"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.stitch"})]})]}),AffixButton=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Button prefix with icon and input text",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("prefix clicked"),children:"Copy",icon:"copy"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"select",label:"Select suffix and select input",defaultValue:"Dataset 001",suffix:{type:"button",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("suffix clicked"),children:"Check dataset"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Dataset 001"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Dataset 002"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Button affix with dropdown",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("prefix clicked"),children:"https://",icon:"locker-closed",isDropdown:!0}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Button affix with icon and hidden text",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("prefix clicked"),children:"Copy",icon:"copy",hideText:!0}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Button affix disabled",placeholder:"www.talend.com",prefix:{type:"button",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("prefix clicked"),children:"Copy",icon:"copy",disabled:!0}})]}),AffixText=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Text prefix with input text",placeholder:"ex: 06 19 19 19 19",prefix:{type:"text",children:"France (+33)"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"text",label:"Text suffix with select input",placeholder:"Authorized domain list",defaultValue:"www.talend",suffix:{type:"text",children:".com"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.talend"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"www.stitch"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Text affix with icon",placeholder:"ex: talend.com",prefix:{type:"text",children:"https://",icon:"locker-closed"}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"text",label:"Text affix with icon and hidden text",placeholder:"ex: https://talend.com",prefix:{type:"text",children:"Address to share",icon:"export",hideText:!0}})]}),DatalistAffix=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Datalist,{name:"column",label:"Input",values:["Id","Name","Country","Age"],multiple:!0,prefix:{type:"select",label:"type",name:"type",defaultValue:"Column",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Value"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Column"})]})}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"column",label:"Input",multiple:!0,prefix:{type:"select",label:"type",name:"type",defaultValue:"Column",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Value"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Column"})]})},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Id"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Name"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{selected:!0,children:"Country"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"Age"})]})]}),Mix=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.xs,{gap:"M",justify:"stretch",align:"stretch",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{name:"generatedId",label:"Button prefix and suffix on a single field",prefix:{type:"button",children:"Copy",icon:"copy",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Copied")},suffix:{type:"button",children:"Create a new ID",icon:"restart",onClick:()=>(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.XI)("Refreshed"),hideText:!0}}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV.Select,{name:"fakeDomain",label:"Select prefix, text suffix",suffix:{type:"text",children:".com"},prefix:{type:"select",label:"prefix",name:"prefix",required:!0,defaultValue:"https://",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"https://"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"http://"})]})},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{children:"domain-name.com"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{selected:!0,children:"talend.com"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Number,{name:"value",label:"Text prefix, text suffix",prefix:{type:"text",children:"$"},suffix:{type:"text",children:".00"}})]}),ReactHookForm=()=>{const{register,handleSubmit,watch}=(0,react_hook_form__WEBPACK_IMPORTED_MODULE_4__.mN)(),[formData,setFormData]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.lV,{onSubmit:handleSubmit(setFormData),children:[formData&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.B$,{title:"Form data",description:JSON.stringify(formData,null,2),withBackground:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Text,{label:"API Key",prefix:{...register("prefix"),type:"select",label:"Type",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{value:"Public",children:"Public"},"public"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{value:"Private",children:"Private"},"private")],defaultValue:"Public"},suffix:{type:"button",onClick:()=>{},icon:"talend-files-o",hideText:!0,children:"Do something"},description:"The input seems readonly and the value is not displayed while submitting the form",defaultValue:42,...register("apiKey")}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.lV.Buttons,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.$$,{type:"submit",onClick:()=>{},children:"Submit"})})]})};QuickStart.parameters={...QuickStart.parameters,docs:{...QuickStart.parameters?.docs,source:{originalSource:'() => <StackVertical gap="M" justify="stretch" align="stretch">\n        <Form.Text name="text" label="Select affix" placeholder="ex: talend.com" prefix={{\n    type: \'select\',\n    label: \'prefix\',\n    name: \'prefix\',\n    required: true,\n    defaultValue: \'https://\',\n    children: <>\n                        <option>https://</option>\n                        <option>http://</option>\n                    </>\n  }} />\n        <Form.Text name="text" label="Text affix" placeholder="ex: talend" prefix={{\n    type: \'text\',\n    children: \'https://\'\n  }} />\n        <Form.Text name="text" label="Button affix" placeholder="ex: 4874-48f4-vh34-284h" defaultValue="4874-48f4-vh34-284h" readOnly prefix={{\n    type: \'button\',\n    children: \'copy\',\n    icon: \'copy\',\n    onClick: () => action(\'Copied\')\n  }} />\n    </StackVertical>',...QuickStart.parameters?.docs?.source}}},AffixSelect.parameters={...AffixSelect.parameters,docs:{...AffixSelect.parameters?.docs,source:{originalSource:"() => <StackVertical gap=\"M\" justify=\"stretch\" align=\"stretch\">\n        <Form.Text name=\"text\" label=\"Select prefix and input text\" placeholder=\"www.talend.com\" prefix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: 'France (+33)',\n    children: <>\n                        <option>France (+33)</option>\n                        <option>UK (+31)</option>\n                    </>\n  }} />\n        <Form.Select name=\"select\" label=\"Select suffix and select input\" placeholder=\"www.talend.com\" suffix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: '.com',\n    children: <>\n                        <option>.com</option>\n                        <option>.org</option>\n                    </>\n  }}>\n            <option>www.talend</option>\n            <option>www.stitch</option>\n        </Form.Select>\n        <Form.Text name=\"text\" label=\"Disabled select prefix\" placeholder=\"www.talend.com\" prefix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: 'France (+33)',\n    disabled: true,\n    children: <>\n                        <option>France (+33)</option>\n                        <option>UK (+31)</option>\n                    </>\n  }} />\n        <Form.Select name=\"select\" label=\"Disabled select suffix\" placeholder=\"www.talend.com\" suffix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: '.com',\n    disabled: true,\n    children: <>\n                        <option>.com</option>\n                        <option>.org</option>\n                    </>\n  }}>\n            <option>www.talend</option>\n            <option>www.stitch</option>\n        </Form.Select>\n        <Form.Text name=\"text\" label=\"Read-only select prefix\" placeholder=\"www.talend.com\" readOnly prefix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: 'France (+33)',\n    children: <>\n                        <option>France (+33)</option>\n                        <option>UK (+31)</option>\n                    </>\n  }} />\n        <Form.Select name=\"select\" label=\"Read-only select suffix\" placeholder=\"www.talend\" defaultValue=\"www.talend\" readOnly suffix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: '.com',\n    children: <>\n                        <option>.com</option>\n                        <option>.org</option>\n                    </>\n  }}>\n            <option>www.talend</option>\n            <option>www.stitch</option>\n        </Form.Select>\n    </StackVertical>",...AffixSelect.parameters?.docs?.source}}},AffixButton.parameters={...AffixButton.parameters,docs:{...AffixButton.parameters?.docs,source:{originalSource:"() => <StackVertical gap=\"M\" justify=\"stretch\" align=\"stretch\">\n        <Form.Text name=\"text\" label=\"Button prefix with icon and input text\" placeholder=\"www.talend.com\" prefix={{\n    type: 'button',\n    onClick: () => action('prefix clicked'),\n    children: 'Copy',\n    icon: 'copy'\n  }} />\n        <Form.Select name=\"select\" label=\"Select suffix and select input\" defaultValue=\"Dataset 001\" suffix={{\n    type: 'button',\n    onClick: () => action('suffix clicked'),\n    children: 'Check dataset'\n  }}>\n            <option>Dataset 001</option>\n            <option>Dataset 002</option>\n        </Form.Select>\n        <Form.Text name=\"text\" label=\"Button affix with dropdown\" placeholder=\"www.talend.com\" prefix={{\n    type: 'button',\n    onClick: () => action('prefix clicked'),\n    children: 'https://',\n    icon: 'locker-closed',\n    isDropdown: true\n  }} />\n        <Form.Text name=\"text\" label=\"Button affix with icon and hidden text\" placeholder=\"www.talend.com\" prefix={{\n    type: 'button',\n    onClick: () => action('prefix clicked'),\n    children: 'Copy',\n    icon: 'copy',\n    hideText: true\n  }} />\n        <Form.Text name=\"text\" label=\"Button affix disabled\" placeholder=\"www.talend.com\" prefix={{\n    type: 'button',\n    onClick: () => action('prefix clicked'),\n    children: 'Copy',\n    icon: 'copy',\n    disabled: true\n  }} />\n    </StackVertical>",...AffixButton.parameters?.docs?.source}}},AffixText.parameters={...AffixText.parameters,docs:{...AffixText.parameters?.docs,source:{originalSource:'() => <StackVertical gap="M" justify="stretch" align="stretch">\n        <Form.Text name="text" label="Text prefix with input text" placeholder="ex: 06 19 19 19 19" prefix={{\n    type: \'text\',\n    children: \'France (+33)\'\n  }} />\n        <Form.Select name="text" label="Text suffix with select input" placeholder="Authorized domain list" defaultValue="www.talend" suffix={{\n    type: \'text\',\n    children: \'.com\'\n  }}>\n            <option>www.talend</option>\n            <option>www.stitch</option>\n        </Form.Select>\n        <Form.Text name="text" label="Text affix with icon" placeholder="ex: talend.com" prefix={{\n    type: \'text\',\n    children: \'https://\',\n    icon: \'locker-closed\'\n  }} />\n        <Form.Text name="text" label="Text affix with icon and hidden text" placeholder="ex: https://talend.com" prefix={{\n    type: \'text\',\n    children: \'Address to share\',\n    icon: \'export\',\n    hideText: true\n  }} />\n    </StackVertical>',...AffixText.parameters?.docs?.source}}},DatalistAffix.parameters={...DatalistAffix.parameters,docs:{...DatalistAffix.parameters?.docs,source:{originalSource:"() => <StackVertical gap=\"M\" justify=\"stretch\" align=\"stretch\">\n        <Form.Datalist name=\"column\" label=\"Input\" values={['Id', 'Name', 'Country', 'Age']} multiple prefix={{\n    type: 'select',\n    label: 'type',\n    name: 'type',\n    defaultValue: 'Column',\n    children: <>\n                        <option>Value</option>\n                        <option>Column</option>\n                    </>\n  }} />\n        <Form.Select name=\"column\" label=\"Input\" multiple prefix={{\n    type: 'select',\n    label: 'type',\n    name: 'type',\n    defaultValue: 'Column',\n    children: <>\n                        <option>Value</option>\n                        <option>Column</option>\n                    </>\n  }}>\n            <option>Id</option>\n            <option>Name</option>\n            <option selected>Country</option>\n            <option>Age</option>\n        </Form.Select>\n    </StackVertical>",...DatalistAffix.parameters?.docs?.source}}},Mix.parameters={...Mix.parameters,docs:{...Mix.parameters?.docs,source:{originalSource:"() => <StackVertical gap=\"M\" justify=\"stretch\" align=\"stretch\">\n        <Form.Text name=\"generatedId\" label=\"Button prefix and suffix on a single field\" prefix={{\n    type: 'button',\n    children: 'Copy',\n    icon: 'copy',\n    onClick: () => action('Copied')\n  }} suffix={{\n    type: 'button',\n    children: 'Create a new ID',\n    icon: 'restart',\n    onClick: () => action('Refreshed'),\n    hideText: true\n  }} />\n        <Form.Select name=\"fakeDomain\" label=\"Select prefix, text suffix\" suffix={{\n    type: 'text',\n    children: '.com'\n  }} prefix={{\n    type: 'select',\n    label: 'prefix',\n    name: 'prefix',\n    required: true,\n    defaultValue: 'https://',\n    children: <>\n                        <option>https://</option>\n                        <option>http://</option>\n                    </>\n  }}>\n            <option>domain-name.com</option>\n            <option selected>talend.com</option>\n        </Form.Select>\n        <Form.Number name=\"value\" label=\"Text prefix, text suffix\" prefix={{\n    type: 'text',\n    children: '$'\n  }} suffix={{\n    type: 'text',\n    children: '.00'\n  }} />\n    </StackVertical>",...Mix.parameters?.docs?.source}}},ReactHookForm.parameters={...ReactHookForm.parameters,docs:{...ReactHookForm.parameters?.docs,source:{originalSource:"() => {\n  const {\n    register,\n    handleSubmit,\n    watch\n  } = useForm();\n  const [formData, setFormData] = useState();\n  return <Form onSubmit={handleSubmit(setFormData)}>\n            {formData && <InlineMessageInformation title={'Form data'} description={JSON.stringify(formData, null, 2)} withBackground />}\n            <Form.Text label=\"API Key\" prefix={{\n      ...register('prefix'),\n      type: 'select',\n      label: 'Type',\n      children: [<option key=\"public\" value=\"Public\">\n                            Public\n                        </option>, <option key=\"private\" value=\"Private\">\n                            Private\n                        </option>],\n      defaultValue: 'Public'\n    }} suffix={{\n      type: 'button',\n      onClick: () => {},\n      icon: 'talend-files-o',\n      hideText: true,\n      children: 'Do something'\n    }} description=\"The input seems readonly and the value is not displayed while submitting the form\" defaultValue={42} {...register('apiKey')} />\n            <Form.Buttons>\n                <ButtonPrimary type=\"submit\" onClick={() => {}}>\n                    Submit\n                </ButtonPrimary>\n            </Form.Buttons>\n        </Form>;\n}",...ReactHookForm.parameters?.docs?.source}}};const __namedExportsOrder=["QuickStart","AffixSelect","AffixButton","AffixText","DatalistAffix","Mix","ReactHookForm"]}}]);