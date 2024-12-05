"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[604],{"./src/SubHeaderBar/SubHeaderBar.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CenterActions:()=>CenterActions,Default:()=>Default,Editable:()=>Editable,Icon:()=>Icon,InProgress:()=>InProgress,Loading:()=>Loading,RightActions:()=>RightActions,Subtitle:()=>Subtitle,__namedExportsOrder:()=>__namedExportsOrder,all:()=>SubHeaderBar_stories_all,default:()=>SubHeaderBar_stories});var SubHeaderBar_selectors_namespaceObject={};__webpack_require__.r(SubHeaderBar_selectors_namespaceObject),__webpack_require__.d(SubHeaderBar_selectors_namespaceObject,{getComponentState:()=>getComponentState});var lib_esm=__webpack_require__("../cmf/lib-esm/index.js"),react=__webpack_require__("../../node_modules/react/index.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),immutable=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable_default=__webpack_require__.n(immutable),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const DISPLAY_NAME="Container(SubHeaderBar)",DEFAULT_STATE=new(immutable_default().Map)({});class SubHeaderBar extends react.Component{constructor(props){super(props),this.onGoBack=this.onGoBack.bind(this)}onGoBack(event){this.props.onGoBack&&this.props.onGoBack(event),this.props.actionCreatorGoBack&&this.props.dispatchActionCreator(this.props.actionCreatorGoBack,event,{props:this.props})}render(){const state=this.props.state||DEFAULT_STATE,hasGoBack=this.props.onGoBack||this.props.actionCreatorGoBack,{onEdit,onCancel,onSubmit,onChange}=this.props,eventHandlerProps={};onEdit&&(eventHandlerProps.onEdit=onEdit),onCancel&&(eventHandlerProps.onCancel=onCancel),onSubmit&&(eventHandlerProps.onSubmit=onSubmit),onChange&&(eventHandlerProps.onChange=onChange),hasGoBack&&(eventHandlerProps.onGoBack=this.onGoBack);const props={...(0,lodash.omit)(this.props,lib_esm.TJ.INJECTED_PROPS),...eventHandlerProps,...state.toJS()};return(0,jsx_runtime.jsx)(components_lib_esm.SubHeaderBar,{...props})}}SubHeaderBar.displayName="SubHeaderBar",_defineProperty(SubHeaderBar,"displayName",DISPLAY_NAME),_defineProperty(SubHeaderBar,"propTypes",{...lib_esm.TJ.propTypes,actionCreatorCancel:prop_types_default().string,actionCreatorEdit:prop_types_default().string,actionCreatorSubmit:prop_types_default().string,actionCreatorChange:prop_types_default().string,actionCreatorGoBack:prop_types_default().string,onCancel:prop_types_default().func,onEdit:prop_types_default().func,onSubmit:prop_types_default().func,onChange:prop_types_default().func,onGoBack:prop_types_default().func,title:prop_types_default().string});const SubHeaderBar_container=SubHeaderBar,SubHeaderBar_connect=(0,lib_esm.TJ)({componentId:ownProps=>ownProps.componentId||ownProps.id,defaultState:DEFAULT_STATE,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(SubHeaderBar_container);function getComponentState(state,idComponent){return state.cmf.components.getIn([DISPLAY_NAME,idComponent],DEFAULT_STATE)}SubHeaderBar_connect.selectors=SubHeaderBar_selectors_namespaceObject;const src_SubHeaderBar=SubHeaderBar_connect;const injectedComponentsCenter={center:[{component:"FilterBar",center:!0,navbar:!0,docked:!1,dockable:!1}]},injectedComponentsRight={right:[{actionId:"subheaderbar:sharing",component:"Action",right:!0},{actionId:"subheaderbar:bubbles",component:"Action",right:!0}]},props={title:"MyTitle",actionCreatorCancel:"subheaderbar:cancel",actionCreatorSubmit:"subheaderbar:submit",actionCreatorChange:"subheaderbar:change",actionCreatorGoBack:"subheaderbar:goback"},SubHeaderBar_stories={parameters:{storySource:{source:"import SubHeaderBar from '.';\n\nconst viewSubHeader = {\n\ttitle: 'MyTitle',\n\tactionCreatorCancel: 'subheaderbar:cancel',\n\tactionCreatorSubmit: 'subheaderbar:submit',\n\tactionCreatorChange: 'subheaderbar:change',\n\tactionCreatorGoBack: 'subheaderbar:goback',\n};\n\nconst injectedComponentsCenter = {\n\tcenter: [\n\t\t{\n\t\t\tcomponent: 'FilterBar',\n\t\t\tcenter: true,\n\t\t\tnavbar: true,\n\t\t\tdocked: false,\n\t\t\tdockable: false,\n\t\t},\n\t],\n};\nconst injectedComponentsRight = {\n\tright: [\n\t\t{\n\t\t\tactionId: 'subheaderbar:sharing',\n\t\t\tcomponent: 'Action',\n\t\t\tright: true,\n\t\t},\n\t\t{\n\t\t\tactionId: 'subheaderbar:bubbles',\n\t\t\tcomponent: 'Action',\n\t\t\tright: true,\n\t\t},\n\t],\n};\n\nconst props = {\n\t...viewSubHeader,\n};\n\nexport default {\n\ttitle: 'SubHeaderBar',\n};\n\nexport const Default = () => <SubHeaderBar {...props} />;\nexport const Subtitle = () => <SubHeaderBar subTitle=\"mySubTitle\" {...props} />;\nexport const Icon = () => <SubHeaderBar iconId=\"talend-file-csv-o\" {...props} />;\nexport const Editable = () => <SubHeaderBar {...props} editable />;\nexport const InProgress = () => <SubHeaderBar {...props} editable inProgress />;\nexport const Loading = () => <SubHeaderBar {...props} loading />;\nexport const RightActions = () => <SubHeaderBar {...props} components={injectedComponentsRight} />;\nexport const CenterActions = () => (\n\t<SubHeaderBar {...props} components={injectedComponentsCenter} />\n);\nexport const all = () => (\n\t<SubHeaderBar\n\t\t{...props}\n\t\tcomponents={{ ...injectedComponentsCenter, ...injectedComponentsRight }}\n\t\ticonId=\"talend-file-csv-o\"\n\t\tsubTitle=\"mySubTitle\"\n\t\teditable\n\t/>\n);\n",locationsMap:{default:{startLoc:{col:23,line:45},endLoc:{col:56,line:45},startBody:{col:23,line:45},endBody:{col:56,line:45}},subtitle:{startLoc:{col:24,line:46},endLoc:{col:79,line:46},startBody:{col:24,line:46},endBody:{col:79,line:46}},icon:{startLoc:{col:20,line:47},endLoc:{col:80,line:47},startBody:{col:20,line:47},endBody:{col:80,line:47}},editable:{startLoc:{col:24,line:48},endLoc:{col:66,line:48},startBody:{col:24,line:48},endBody:{col:66,line:48}},"in-progress":{startLoc:{col:26,line:49},endLoc:{col:79,line:49},startBody:{col:26,line:49},endBody:{col:79,line:49}},loading:{startLoc:{col:23,line:50},endLoc:{col:64,line:50},startBody:{col:23,line:50},endBody:{col:64,line:50}},"right-actions":{startLoc:{col:28,line:51},endLoc:{col:98,line:51},startBody:{col:28,line:51},endBody:{col:98,line:51}},"center-actions":{startLoc:{col:29,line:52},endLoc:{col:1,line:54},startBody:{col:29,line:52},endBody:{col:1,line:54}},all:{startLoc:{col:19,line:55},endLoc:{col:1,line:63},startBody:{col:19,line:55},endBody:{col:1,line:63}}}}},title:"SubHeaderBar"},Default=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props});Default.displayName="Default";const Subtitle=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{subTitle:"mySubTitle",...props});Subtitle.displayName="Subtitle";const Icon=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{iconId:"talend-file-csv-o",...props});Icon.displayName="Icon";const Editable=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,editable:!0});Editable.displayName="Editable";const InProgress=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,editable:!0,inProgress:!0});InProgress.displayName="InProgress";const Loading=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,loading:!0});Loading.displayName="Loading";const RightActions=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,components:injectedComponentsRight});RightActions.displayName="RightActions";const CenterActions=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,components:injectedComponentsCenter});CenterActions.displayName="CenterActions";const SubHeaderBar_stories_all=()=>(0,jsx_runtime.jsx)(src_SubHeaderBar,{...props,components:{...injectedComponentsCenter,...injectedComponentsRight},iconId:"talend-file-csv-o",subTitle:"mySubTitle",editable:!0});SubHeaderBar_stories_all.displayName="all",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} />",...Default.parameters?.docs?.source}}},Subtitle.parameters={...Subtitle.parameters,docs:{...Subtitle.parameters?.docs,source:{originalSource:'() => <SubHeaderBar subTitle="mySubTitle" {...props} />',...Subtitle.parameters?.docs?.source}}},Icon.parameters={...Icon.parameters,docs:{...Icon.parameters?.docs,source:{originalSource:'() => <SubHeaderBar iconId="talend-file-csv-o" {...props} />',...Icon.parameters?.docs?.source}}},Editable.parameters={...Editable.parameters,docs:{...Editable.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} editable />",...Editable.parameters?.docs?.source}}},InProgress.parameters={...InProgress.parameters,docs:{...InProgress.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} editable inProgress />",...InProgress.parameters?.docs?.source}}},Loading.parameters={...Loading.parameters,docs:{...Loading.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} loading />",...Loading.parameters?.docs?.source}}},RightActions.parameters={...RightActions.parameters,docs:{...RightActions.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} components={injectedComponentsRight} />",...RightActions.parameters?.docs?.source}}},CenterActions.parameters={...CenterActions.parameters,docs:{...CenterActions.parameters?.docs,source:{originalSource:"() => <SubHeaderBar {...props} components={injectedComponentsCenter} />",...CenterActions.parameters?.docs?.source}}},SubHeaderBar_stories_all.parameters={...SubHeaderBar_stories_all.parameters,docs:{...SubHeaderBar_stories_all.parameters?.docs,source:{originalSource:'() => <SubHeaderBar {...props} components={{\n  ...injectedComponentsCenter,\n  ...injectedComponentsRight\n}} iconId="talend-file-csv-o" subTitle="mySubTitle" editable />',...SubHeaderBar_stories_all.parameters?.docs?.source}}};const __namedExportsOrder=["Default","Subtitle","Icon","Editable","InProgress","Loading","RightActions","CenterActions","all"]}}]);