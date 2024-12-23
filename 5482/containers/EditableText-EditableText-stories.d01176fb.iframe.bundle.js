"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[118],{"./src/EditableText/EditableText.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithDefault:()=>WithDefault,__namedExportsOrder:()=>__namedExportsOrder,default:()=>EditableText_stories});var EditableText_selectors_namespaceObject={};__webpack_require__.r(EditableText_selectors_namespaceObject),__webpack_require__.d(EditableText_selectors_namespaceObject,{getEditMode:()=>getEditMode});var lib_esm=__webpack_require__("../cmf/lib-esm/index.js"),react=__webpack_require__("../../node_modules/react/index.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types),immutable=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable_default=__webpack_require__.n(immutable),lodash=__webpack_require__("../../node_modules/lodash/lodash.js"),components_lib_esm=__webpack_require__("../components/lib-esm/index.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}const DEFAULT_STATE=new(immutable_default().Map)({editMode:!1});class EditableText extends react.Component{constructor(props){super(props),this.onCancel=this.onCancel.bind(this),this.onEdit=this.onEdit.bind(this),this.onSubmit=this.onSubmit.bind(this),this.onChange=this.onChange.bind(this)}onSubmit(event,data){this.props.setState({editMode:!1}),this.props.onSubmit&&this.props.onSubmit(event,data),this.props.actionCreatorSubmit&&this.props.dispatchActionCreator(this.props.actionCreatorSubmit,event,{props:this.props,data})}onCancel(event){this.props.setState({editMode:!1}),this.props.onCancel&&this.props.onCancel(event),this.props.actionCreatorCancel&&this.props.dispatchActionCreator(this.props.actionCreatorCancel,event,{props:this.props})}onEdit(event){this.props.setState({editMode:!0}),this.props.onEdit&&this.props.onEdit(event),this.props.actionCreatorEdit&&this.props.dispatchActionCreator(this.props.actionCreatorEdit,event,{props:this.props})}onChange(event){this.props.onChange&&this.props.onChange(event,event.target.value),this.props.actionCreatorChange&&this.props.dispatchActionCreator(this.props.actionCreatorChange,event,{props:this.props,value:event.target.value})}render(){const state=this.props.state||DEFAULT_STATE,props={...(0,lodash.omit)(this.props,lib_esm.TJ.INJECTED_PROPS),onEdit:this.onEdit,onCancel:this.onCancel,onSubmit:this.onSubmit,onChange:this.onChange,...state.toJS()};return(0,jsx_runtime.jsx)(components_lib_esm.EditableText,{...props})}}EditableText.displayName="EditableText",_defineProperty(EditableText,"displayName","Container(EditableText)"),_defineProperty(EditableText,"propTypes",{...lib_esm.TJ.propTypes,actionCreatorCancel:prop_types_default().string,actionCreatorEdit:prop_types_default().string,actionCreatorSubmit:prop_types_default().string,actionCreatorChange:prop_types_default().string,onCancel:prop_types_default().func,onEdit:prop_types_default().func,onSubmit:prop_types_default().func,onChange:prop_types_default().func,text:prop_types_default().string.isRequired});const EditableText_container=EditableText,EditableText_connect=(0,lib_esm.TJ)({defaultState:DEFAULT_STATE,omitCMFProps:!0,withComponentRegistry:!0,withDispatch:!0,withDispatchActionCreator:!0,withComponentId:!0})(EditableText_container);function getEditMode(state,idComponent){return EditableText_connect.getState(state,idComponent).get("editMode",!1)}EditableText_connect.selectors=EditableText_selectors_namespaceObject;const src_EditableText=EditableText_connect;const props={text:"Example text",actionCreatorCancel:"editabletext:cancel",actionCreatorSubmit:"editabletext:submit",actionCreatorChange:"editabletext:change",actionCreatorEdit:"editabletext:edit"},EditableText_stories={parameters:{storySource:{source:"import EditableText from '.';\n\nconst props = {\n\ttext: 'Example text',\n\tactionCreatorCancel: 'editabletext:cancel',\n\tactionCreatorSubmit: 'editabletext:submit',\n\tactionCreatorChange: 'editabletext:change',\n\tactionCreatorEdit: 'editabletext:edit',\n};\n\nexport default {\n\ttitle: 'EditableText',\n};\n\nexport function WithDefault() {\n\treturn <EditableText {...props} />;\n}\n",locationsMap:{"with-default":{startLoc:{col:7,line:15},endLoc:{col:1,line:17},startBody:{col:7,line:15},endBody:{col:1,line:17}}}}},title:"EditableText"},WithDefault=function WithDefault(){return(0,jsx_runtime.jsx)(src_EditableText,{...props})};WithDefault.displayName="WithDefault",WithDefault.parameters={...WithDefault.parameters,docs:{...WithDefault.parameters?.docs,source:{originalSource:"function WithDefault() {\n  return <EditableText {...props} />;\n}",...WithDefault.parameters?.docs?.source}}};const __namedExportsOrder=["WithDefault"]}}]);