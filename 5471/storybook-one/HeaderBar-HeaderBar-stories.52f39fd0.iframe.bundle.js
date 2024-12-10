"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[9790],{"../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_inheritsLoose});var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,(0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.A)(t,o)}},"../../node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XI:()=>action});var v4=__webpack_require__("../../node_modules/@storybook/addon-actions/node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("../../node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a},generateId=()=>"object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.A)():Date.now().toString(36)+Math.random().toString(36).substring(2);function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors._U({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id=generateId(),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}},"../components/src/HeaderBar/HeaderBar.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Barebone:()=>Barebone,CustomAppSwitcher:()=>CustomAppSwitcher,CustomIntercom:()=>CustomIntercom,Default:()=>Default,WithBrandIcon:()=>WithBrandIcon,WithBrandIconUrl:()=>WithBrandIconUrl,WithCallToAction:()=>WithCallToAction,WithEnvironmentDropdown:()=>WithEnvironmentDropdown,WithFullLogo:()=>WithFullLogo,WithGenericAction:()=>WithGenericAction,WithHelpSplitDropdown:()=>WithHelpSplitDropdown,WithReadNotifications:()=>WithReadNotifications,WithUnreadNotifications:()=>WithUnreadNotifications,WithoutProducts:()=>WithoutProducts,WithoutUserAndWithInformation:()=>WithoutUserAndWithInformation,_Intercom:()=>_Intercom,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@storybook/addon-actions/dist/index.mjs"),immutable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__),_talend_assets_api__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../assets-api/lib-esm/index.js"),_AppSwitcher__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/AppSwitcher/index.js"),_Icon__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../components/src/Icon/index.ts"),_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../components/src/HeaderBar/HeaderBar.component.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const props={brand:{id:"header-brand",label:"Example App Name",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onApplicationNameClick")},logo:{id:"header-logo",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onLogoClick")},help:{id:"header-help",icon:"talend-question-circle",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onHelpClick")},user:{id:"header-user",items:[{id:"settings",icon:"talend-cog",label:"Settings",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onSettingsClick")}],name:"John Doe",firstName:"John",lastName:"Doe"},products:{items:[{icon:"talend-tdp-negative",key:"tdp",label:"Data Preparation"},{icon:"talend-tic-negative",key:"tic",label:"Integration Cloud"},{icon:"talend-tmc-negative",key:"tmc",label:"Management Console"}],onSelect:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onProductClick")}},infoStyle=stylesheet=>({...stylesheet,button:{...stylesheet.button,topRight:{...stylesheet.button.topRight,top:"48px"}}});function AppSwitcherComponent(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_AppSwitcher__WEBPACK_IMPORTED_MODULE_3__.A,{...props.brand})}function IntercomComponent(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{style:{color:"white",margin:"0 10px",width:"2rem",height:"2rem",borderRadius:"50%",background:"green",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_4__.A,{name:"talend-bubbles"})})}const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Navigation/HeaderBar"},Default=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};Default.story={name:"default",parameters:{info:{styles:infoStyle}}};const WithFullLogo=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.logo.isFull=!0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithFullLogo.story={name:"with full logo",parameters:{info:{styles:infoStyle}}};const WithoutProducts=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS({...props,products:null}).toJS();return headerProps.logo.isFull=!0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithoutProducts.story={name:"without products",parameters:{info:{styles:infoStyle}}};const WithBrandIcon=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS({...props,brand:{...props.brand,icon:"talend-tmc-negative"}}).toJS();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithBrandIcon.story={name:"with brand icon",parameters:{info:{styles:infoStyle}}};const WithBrandIconUrl=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS({...props,brand:{...props.brand,iconUrl:_talend_assets_api__WEBPACK_IMPORTED_MODULE_2__.A.getURL("/src/svg/products/tmc-negative.svg","@talend/icons","7.11.0")}}).toJS();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithBrandIconUrl.story={name:"with brand icon url",parameters:{info:{styles:infoStyle}}};const WithEnvironmentDropdown=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.env={id:"header-environment",items:[{label:"Runtime Environment",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onEnvClick")}],label:"Default"},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithEnvironmentDropdown.story={name:"with environment dropdown",parameters:{info:{styles:infoStyle}}};const WithUnreadNotifications=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.notification={hasUnread:!0},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithUnreadNotifications.story={name:"with unread notifications",parameters:{info:{styles:infoStyle}}};const WithReadNotifications=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.notification={hasUnread:!1},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithReadNotifications.story={name:"with read notifications",parameters:{info:{styles:infoStyle}}};const WithHelpSplitDropdown=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.help.items=[{icon:"talend-board",label:"Onboarding",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onOnboardingClick")},{icon:"talend-cog",label:"About",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onAboutClick")}],(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithHelpSplitDropdown.story={name:"with help split dropdown",parameters:{info:{styles:infoStyle}}};const WithCallToAction=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.callToAction={bsStyle:"info",className:"btn-inverse",id:"header-call-to-action",label:"Subscribe now",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onActionClick")},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithCallToAction.story={name:"with callToAction",parameters:{info:{styles:infoStyle}}};const WithGenericAction=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.genericAction={bsStyle:"link",id:"header-generic-action",icon:"talend-info-circle",label:"Talend Experience",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onActionClick")},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithGenericAction.story={name:"with genericAction",parameters:{info:{styles:infoStyle}}};const WithoutUserAndWithInformation=()=>{const headerProps=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS(props).toJS();return headerProps.user=null,headerProps.information={id:"header-info",bsStyle:"link",icon:"talend-info-circle",label:"Information",hideLabel:!0,pullRight:!0,noCaret:!0,tooltipPlacement:"bottom",items:[{label:"Guided tour",onClick:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.XI)("onOnboardingClick")},{divider:!0},{label:"Community",target:"_blank",href:"https://community.talend.com/"},{label:"Support",target:"_blank",href:"https://www.talend.com/services/technical-support/"}]},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{...headerProps})};WithoutUserAndWithInformation.story={name:"without user and with information",parameters:{info:{styles:infoStyle}}};const _Intercom=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{logo:props.logo,brand:props.brand,...props,intercom:{id:"intercom",config:{app_id:"j9pqsz4w",email:"toto@gmail.com"}}});_Intercom.story={name:"intercom",parameters:{info:{styles:infoStyle}}};const Barebone=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{});Barebone.story={name:"barebone",parameters:{info:{styles:infoStyle}}};const CustomAppSwitcher=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{AppSwitcher:AppSwitcherComponent});CustomAppSwitcher.story={name:"Custom AppSwitcher",parameters:{info:{styles:infoStyle}}};const CustomIntercom=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_HeaderBar_component__WEBPACK_IMPORTED_MODULE_5__.A,{Intercom:IntercomComponent});CustomIntercom.story={parameters:{info:{styles:infoStyle}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  return <HeaderBar {...headerProps} />;\n}",...Default.parameters?.docs?.source}}},WithFullLogo.parameters={...WithFullLogo.parameters,docs:{...WithFullLogo.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.logo.isFull = true;\n  return <HeaderBar {...headerProps} />;\n}",...WithFullLogo.parameters?.docs?.source}}},WithoutProducts.parameters={...WithoutProducts.parameters,docs:{...WithoutProducts.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS({\n    ...props,\n    products: null\n  }).toJS();\n  headerProps.logo.isFull = true;\n  return <HeaderBar {...headerProps} />;\n}",...WithoutProducts.parameters?.docs?.source}}},WithBrandIcon.parameters={...WithBrandIcon.parameters,docs:{...WithBrandIcon.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS({\n    ...props,\n    brand: {\n      ...props.brand,\n      icon: 'talend-tmc-negative'\n    }\n  }).toJS();\n  return <HeaderBar {...headerProps} />;\n}",...WithBrandIcon.parameters?.docs?.source}}},WithBrandIconUrl.parameters={...WithBrandIconUrl.parameters,docs:{...WithBrandIconUrl.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS({\n    ...props,\n    brand: {\n      ...props.brand,\n      iconUrl: assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')\n    }\n  }).toJS();\n  return <HeaderBar {...headerProps} />;\n}",...WithBrandIconUrl.parameters?.docs?.source}}},WithEnvironmentDropdown.parameters={...WithEnvironmentDropdown.parameters,docs:{...WithEnvironmentDropdown.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.env = {\n    id: 'header-environment',\n    items: [{\n      label: 'Runtime Environment',\n      onClick: action('onEnvClick')\n    }],\n    label: 'Default'\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithEnvironmentDropdown.parameters?.docs?.source}}},WithUnreadNotifications.parameters={...WithUnreadNotifications.parameters,docs:{...WithUnreadNotifications.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.notification = {\n    hasUnread: true\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithUnreadNotifications.parameters?.docs?.source}}},WithReadNotifications.parameters={...WithReadNotifications.parameters,docs:{...WithReadNotifications.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.notification = {\n    hasUnread: false\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithReadNotifications.parameters?.docs?.source}}},WithHelpSplitDropdown.parameters={...WithHelpSplitDropdown.parameters,docs:{...WithHelpSplitDropdown.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.help.items = [{\n    icon: 'talend-board',\n    label: 'Onboarding',\n    onClick: action('onOnboardingClick')\n  }, {\n    icon: 'talend-cog',\n    label: 'About',\n    onClick: action('onAboutClick')\n  }];\n  return <HeaderBar {...headerProps} />;\n}",...WithHelpSplitDropdown.parameters?.docs?.source}}},WithCallToAction.parameters={...WithCallToAction.parameters,docs:{...WithCallToAction.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.callToAction = {\n    bsStyle: 'info',\n    className: 'btn-inverse',\n    id: 'header-call-to-action',\n    label: 'Subscribe now',\n    onClick: action('onActionClick')\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithCallToAction.parameters?.docs?.source}}},WithGenericAction.parameters={...WithGenericAction.parameters,docs:{...WithGenericAction.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.genericAction = {\n    bsStyle: 'link',\n    id: 'header-generic-action',\n    icon: 'talend-info-circle',\n    label: 'Talend Experience',\n    onClick: action('onActionClick')\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithGenericAction.parameters?.docs?.source}}},WithoutUserAndWithInformation.parameters={...WithoutUserAndWithInformation.parameters,docs:{...WithoutUserAndWithInformation.parameters?.docs,source:{originalSource:"() => {\n  const headerProps = Immutable.fromJS(props).toJS();\n  headerProps.user = null;\n  headerProps.information = {\n    id: 'header-info',\n    bsStyle: 'link',\n    icon: 'talend-info-circle',\n    label: 'Information',\n    hideLabel: true,\n    pullRight: true,\n    noCaret: true,\n    tooltipPlacement: 'bottom',\n    items: [{\n      label: 'Guided tour',\n      onClick: action('onOnboardingClick')\n    }, {\n      divider: true\n    }, {\n      label: 'Community',\n      target: '_blank',\n      href: 'https://community.talend.com/'\n    }, {\n      label: 'Support',\n      target: '_blank',\n      href: 'https://www.talend.com/services/technical-support/'\n    }]\n  };\n  return <HeaderBar {...headerProps} />;\n}",...WithoutUserAndWithInformation.parameters?.docs?.source}}},_Intercom.parameters={..._Intercom.parameters,docs:{..._Intercom.parameters?.docs,source:{originalSource:"() => <HeaderBar logo={props.logo} brand={props.brand} {...props} intercom={{\n  id: 'intercom',\n  config: {\n    app_id: 'j9pqsz4w',\n    email: 'toto@gmail.com'\n  }\n}} />",..._Intercom.parameters?.docs?.source}}},Barebone.parameters={...Barebone.parameters,docs:{...Barebone.parameters?.docs,source:{originalSource:"() => <HeaderBar />",...Barebone.parameters?.docs?.source}}},CustomAppSwitcher.parameters={...CustomAppSwitcher.parameters,docs:{...CustomAppSwitcher.parameters?.docs,source:{originalSource:"() => <HeaderBar AppSwitcher={AppSwitcherComponent} />",...CustomAppSwitcher.parameters?.docs?.source}}},CustomIntercom.parameters={...CustomIntercom.parameters,docs:{...CustomIntercom.parameters?.docs,source:{originalSource:"() => <HeaderBar Intercom={IntercomComponent} />",...CustomIntercom.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithFullLogo","WithoutProducts","WithBrandIcon","WithBrandIconUrl","WithEnvironmentDropdown","WithUnreadNotifications","WithReadNotifications","WithHelpSplitDropdown","WithCallToAction","WithGenericAction","WithoutUserAndWithInformation","_Intercom","Barebone","CustomAppSwitcher","CustomIntercom"]},"../components/src/Actions/Actions.component.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__),_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../fork/react-bootstrap/lib-esm/ButtonGroup.js"),classnames__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/classnames/index.js"),classnames__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__),_Action__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../components/src/Actions/Action/index.js"),_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../components/src/OverlayTrigger/index.js"),_Inject__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/Inject/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Actions({getComponent,hideLabel,link,tooltipPlacement,...props}){const buttonGroupProps=function getButtonGroupProps(props){const buttonGroupProps={};return Object.keys(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A.propTypes).forEach((id=>{void 0!==props[id]&&(buttonGroupProps[id]=props[id])})),buttonGroupProps}(props),Renderers=_Inject__WEBPACK_IMPORTED_MODULE_3__.A.getAll(getComponent,{Action:_Action__WEBPACK_IMPORTED_MODULE_1__.A});return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A,{className:classnames__WEBPACK_IMPORTED_MODULE_0___default()("tc-actions",props.className),...buttonGroupProps,children:props.actions.map(((action,index)=>{const extraParams={};return hideLabel&&(extraParams.hideLabel=hideLabel),link&&(extraParams.link=link),tooltipPlacement&&(extraParams.tooltipPlacement=tooltipPlacement),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Renderers.Action,{...action,...extraParams},index)}))})}Actions.displayName="Actions",Actions.propTypes={actions:prop_types__WEBPACK_IMPORTED_MODULE_6___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_6___default().shape(_Action__WEBPACK_IMPORTED_MODULE_1__.A.propTypes)])),className:prop_types__WEBPACK_IMPORTED_MODULE_6___default().string,hideLabel:prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool,tooltipPlacement:_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__.A.propTypes.placement,link:prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool,..._talend_react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.A.propTypes},Actions.defaultProps={actions:[]};const __WEBPACK_DEFAULT_EXPORT__=Actions},"../components/src/Actions/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{En:()=>_Actions_component__WEBPACK_IMPORTED_MODULE_1__.A,If:()=>_ActionSplitDropdown__WEBPACK_IMPORTED_MODULE_6__.A,rA:()=>_ActionButton__WEBPACK_IMPORTED_MODULE_2__.A,rc:()=>_Action__WEBPACK_IMPORTED_MODULE_0__.A,yd:()=>_ActionDropdown__WEBPACK_IMPORTED_MODULE_3__.A});var _Action__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../components/src/Actions/Action/index.js"),_Actions_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../components/src/Actions/Actions.component.js"),_ActionButton__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../components/src/Actions/ActionButton/index.js"),_ActionDropdown__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../components/src/Actions/ActionDropdown/index.js"),_ActionSplitDropdown__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("../components/src/Actions/ActionFile/index.js"),__webpack_require__("../components/src/Actions/ActionIconToggle/index.js"),__webpack_require__("../components/src/Actions/ActionSplitDropdown/index.js"))},"../../node_modules/dom-helpers/activeElement.js":(module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__("../../node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.__esModule=!0,exports.default=function activeElement(doc){void 0===doc&&(doc=(0,_ownerDocument.default)());try{return doc.activeElement}catch(e){}};var _ownerDocument=_interopRequireDefault(__webpack_require__("../../node_modules/dom-helpers/ownerDocument.js"));module.exports=exports.default},"../../node_modules/prop-types-extra/lib/all.js":(module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function all(){for(var _len=arguments.length,validators=Array(_len),_key=0;_key<_len;_key++)validators[_key]=arguments[_key];return(0,_createChainableTypeChecker2.default)((function allPropTypes(){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];var error=null;return validators.forEach((function(validator){if(null==error){var result=validator.apply(void 0,args);null!=result&&(error=result)}})),error}))};var _createChainableTypeChecker2=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__("../../node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js"));module.exports=exports.default},"../../node_modules/uncontrollable/lib/esm/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Pd:()=>uncontrollable});var react=__webpack_require__("../../node_modules/react/index.js"),browser=__webpack_require__("../../node_modules/invariant/browser.js"),browser_default=__webpack_require__.n(browser),noop=function noop(){};function isProp(props,prop){return void 0!==props[prop]}function defaultKey(key){return"default"+key.charAt(0).toUpperCase()+key.substr(1)}var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),inheritsLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),react_lifecycles_compat_es=__webpack_require__("../../node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js"),_jsxFileName="/Users/jquense/src/uncontrollable/src/uncontrollable.js";function uncontrollable(Component,controlledValues,methods){void 0===methods&&(methods=[]);var displayName=Component.displayName||Component.name||"Component",canAcceptRef=function utils_canAcceptRef(component){return!!component&&("function"!=typeof component||component.prototype&&component.prototype.isReactComponent)}(Component),controlledProps=Object.keys(controlledValues),PROPS_TO_OMIT=controlledProps.map(defaultKey);!canAcceptRef&&methods.length&&browser_default()(!1);var UncontrolledComponent=function(_React$Component){function UncontrolledComponent(){for(var _this,_len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];(_this=_React$Component.call.apply(_React$Component,[this].concat(args))||this).handlers=Object.create(null),controlledProps.forEach((function(propName){var handlerName=controlledValues[propName];_this.handlers[handlerName]=function handleChange(value){if(_this.props[handlerName]){var _this$props;_this._notifying=!0;for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];(_this$props=_this.props)[handlerName].apply(_this$props,[value].concat(args)),_this._notifying=!1}_this.unmounted||_this.setState((function(_ref){var _extends2,values=_ref.values;return{values:(0,esm_extends.A)(Object.create(null),values,(_extends2={},_extends2[propName]=value,_extends2))}}))}})),methods.length&&(_this.attachRef=function(ref){_this.inner=ref});var values=Object.create(null);return controlledProps.forEach((function(key){values[key]=_this.props[defaultKey(key)]})),_this.state={values,prevProps:{}},_this}(0,inheritsLoose.A)(UncontrolledComponent,_React$Component);var _proto=UncontrolledComponent.prototype;return _proto.shouldComponentUpdate=function shouldComponentUpdate(){return!this._notifying},UncontrolledComponent.getDerivedStateFromProps=function getDerivedStateFromProps(props,_ref2){var values=_ref2.values,prevProps=_ref2.prevProps,nextState={values:(0,esm_extends.A)(Object.create(null),values),prevProps:{}};return controlledProps.forEach((function(key){nextState.prevProps[key]=props[key],!isProp(props,key)&&isProp(prevProps,key)&&(nextState.values[key]=props[defaultKey(key)])})),nextState},_proto.componentWillUnmount=function componentWillUnmount(){this.unmounted=!0},_proto.render=function render(){var _this2=this,_this$props2=this.props,innerRef=_this$props2.innerRef,props=(0,objectWithoutPropertiesLoose.A)(_this$props2,["innerRef"]);PROPS_TO_OMIT.forEach((function(prop){delete props[prop]}));var newProps={};return controlledProps.forEach((function(propName){var propValue=_this2.props[propName];newProps[propName]=void 0!==propValue?propValue:_this2.state.values[propName]})),react.createElement(Component,(0,esm_extends.A)({},props,newProps,this.handlers,{ref:innerRef||this.attachRef}))},UncontrolledComponent}(react.Component);(0,react_lifecycles_compat_es.polyfill)(UncontrolledComponent),UncontrolledComponent.displayName="Uncontrolled("+displayName+")",UncontrolledComponent.propTypes=(0,esm_extends.A)({innerRef:function innerRef(){}},function uncontrolledPropTypes(controlledValues,displayName){var propTypes={};return Object.keys(controlledValues).forEach((function(prop){propTypes[defaultKey(prop)]=noop})),propTypes}(controlledValues)),methods.forEach((function(method){UncontrolledComponent.prototype[method]=function $proxiedMethod(){var _this$inner;return(_this$inner=this.inner)[method].apply(_this$inner,arguments)}}));var WrappedComponent=UncontrolledComponent;return react.forwardRef&&((WrappedComponent=react.forwardRef((function(props,ref){return react.createElement(UncontrolledComponent,(0,esm_extends.A)({},props,{innerRef:ref,__source:{fileName:_jsxFileName,lineNumber:128},__self:this}))}))).propTypes=UncontrolledComponent.propTypes),WrappedComponent.ControlledComponent=Component,WrappedComponent.deferControlTo=function(newComponent,additions,nextMethods){return void 0===additions&&(additions={}),uncontrollable(newComponent,(0,esm_extends.A)({},controlledValues,additions),nextMethods)},WrappedComponent}}}]);