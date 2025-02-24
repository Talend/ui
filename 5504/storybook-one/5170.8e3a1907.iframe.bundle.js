(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[5170],{"../../node_modules/lodash.debounce/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{var reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt,freeGlobal="object"==typeof __webpack_require__.g&&__webpack_require__.g&&__webpack_require__.g.Object===Object&&__webpack_require__.g,freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),objectToString=Object.prototype.toString,nativeMax=Math.max,nativeMin=Math.min,now=function(){return root.Date.now()};function isObject(value){var type=typeof value;return!!value&&("object"==type||"function"==type)}function toNumber(value){if("number"==typeof value)return value;if(function isSymbol(value){return"symbol"==typeof value||function isObjectLike(value){return!!value&&"object"==typeof value}(value)&&"[object Symbol]"==objectToString.call(value)}(value))return NaN;if(isObject(value)){var other="function"==typeof value.valueOf?value.valueOf():value;value=isObject(other)?other+"":other}if("string"!=typeof value)return 0===value?value:+value;value=value.replace(reTrim,"");var isBinary=reIsBinary.test(value);return isBinary||reIsOctal.test(value)?freeParseInt(value.slice(2),isBinary?2:8):reIsBadHex.test(value)?NaN:+value}module.exports=function debounce(func,wait,options){var lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime=0,leading=!1,maxing=!1,trailing=!0;if("function"!=typeof func)throw new TypeError("Expected a function");function invokeFunc(time){var args=lastArgs,thisArg=lastThis;return lastArgs=lastThis=void 0,lastInvokeTime=time,result=func.apply(thisArg,args)}function shouldInvoke(time){var timeSinceLastCall=time-lastCallTime;return void 0===lastCallTime||timeSinceLastCall>=wait||timeSinceLastCall<0||maxing&&time-lastInvokeTime>=maxWait}function timerExpired(){var time=now();if(shouldInvoke(time))return trailingEdge(time);timerId=setTimeout(timerExpired,function remainingWait(time){var result=wait-(time-lastCallTime);return maxing?nativeMin(result,maxWait-(time-lastInvokeTime)):result}(time))}function trailingEdge(time){return timerId=void 0,trailing&&lastArgs?invokeFunc(time):(lastArgs=lastThis=void 0,result)}function debounced(){var time=now(),isInvoking=shouldInvoke(time);if(lastArgs=arguments,lastThis=this,lastCallTime=time,isInvoking){if(void 0===timerId)return function leadingEdge(time){return lastInvokeTime=time,timerId=setTimeout(timerExpired,wait),leading?invokeFunc(time):result}(lastCallTime);if(maxing)return timerId=setTimeout(timerExpired,wait),invokeFunc(lastCallTime)}return void 0===timerId&&(timerId=setTimeout(timerExpired,wait)),result}return wait=toNumber(wait)||0,isObject(options)&&(leading=!!options.leading,maxWait=(maxing="maxWait"in options)?nativeMax(toNumber(options.maxWait)||0,wait):maxWait,trailing="trailing"in options?!!options.trailing:trailing),debounced.cancel=function cancel(){void 0!==timerId&&clearTimeout(timerId),lastInvokeTime=0,lastArgs=lastCallTime=lastThis=timerId=void 0},debounced.flush=function flush(){return void 0===timerId?result:trailingEdge(now())},debounced}},"../../node_modules/react-debounce-input/lib/Component.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.DebounceInput=void 0;var _react=_interopRequireDefault(__webpack_require__("../../node_modules/react/index.js")),_lodash=_interopRequireDefault(__webpack_require__("../../node_modules/lodash.debounce/index.js")),_excluded=["element","onChange","value","minLength","debounceTimeout","forceNotifyByEnter","forceNotifyOnBlur","onKeyDown","onBlur","inputRef"];function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return function _possibleConstructorReturn(self,call){if(call&&("object"===_typeof(call)||"function"==typeof call))return call;if(void 0!==call)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(self)}(this,result)}}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DebounceInput=function(_React$PureComponent){!function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),Object.defineProperty(subClass,"prototype",{writable:!1}),superClass&&_setPrototypeOf(subClass,superClass)}(DebounceInput,_React$PureComponent);var _super=_createSuper(DebounceInput);function DebounceInput(props){var _this;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,DebounceInput),_defineProperty(_assertThisInitialized(_this=_super.call(this,props)),"onChange",(function(event){event.persist();var oldValue=_this.state.value,minLength=_this.props.minLength;_this.setState({value:event.target.value},(function(){var value=_this.state.value;value.length>=minLength?_this.notify(event):oldValue.length>value.length&&_this.notify(_objectSpread(_objectSpread({},event),{},{target:_objectSpread(_objectSpread({},event.target),{},{value:""})}))}))})),_defineProperty(_assertThisInitialized(_this),"onKeyDown",(function(event){"Enter"===event.key&&_this.forceNotify(event);var onKeyDown=_this.props.onKeyDown;onKeyDown&&(event.persist(),onKeyDown(event))})),_defineProperty(_assertThisInitialized(_this),"onBlur",(function(event){_this.forceNotify(event);var onBlur=_this.props.onBlur;onBlur&&(event.persist(),onBlur(event))})),_defineProperty(_assertThisInitialized(_this),"createNotifier",(function(debounceTimeout){if(debounceTimeout<0)_this.notify=function(){return null};else if(0===debounceTimeout)_this.notify=_this.doNotify;else{var debouncedChangeFunc=(0,_lodash.default)((function(event){_this.isDebouncing=!1,_this.doNotify(event)}),debounceTimeout);_this.notify=function(event){_this.isDebouncing=!0,debouncedChangeFunc(event)},_this.flush=function(){return debouncedChangeFunc.flush()},_this.cancel=function(){_this.isDebouncing=!1,debouncedChangeFunc.cancel()}}})),_defineProperty(_assertThisInitialized(_this),"doNotify",(function(){_this.props.onChange.apply(void 0,arguments)})),_defineProperty(_assertThisInitialized(_this),"forceNotify",(function(event){var debounceTimeout=_this.props.debounceTimeout;if(_this.isDebouncing||!(debounceTimeout>0)){_this.cancel&&_this.cancel();var value=_this.state.value,minLength=_this.props.minLength;value.length>=minLength?_this.doNotify(event):_this.doNotify(_objectSpread(_objectSpread({},event),{},{target:_objectSpread(_objectSpread({},event.target),{},{value})}))}})),_this.isDebouncing=!1,_this.state={value:void 0===props.value||null===props.value?"":props.value};var _debounceTimeout2=_this.props.debounceTimeout;return _this.createNotifier(_debounceTimeout2),_this}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(DebounceInput,[{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){if(!this.isDebouncing){var _this$props=this.props,value=_this$props.value,debounceTimeout=_this$props.debounceTimeout,oldTimeout=prevProps.debounceTimeout,oldValue=prevProps.value,stateValue=this.state.value;void 0!==value&&oldValue!==value&&stateValue!==value&&this.setState({value}),debounceTimeout!==oldTimeout&&this.createNotifier(debounceTimeout)}}},{key:"componentWillUnmount",value:function componentWillUnmount(){this.flush&&this.flush()}},{key:"render",value:function render(){var maybeOnKeyDown,maybeOnBlur,_this$props2=this.props,element=_this$props2.element,forceNotifyByEnter=(_this$props2.onChange,_this$props2.value,_this$props2.minLength,_this$props2.debounceTimeout,_this$props2.forceNotifyByEnter),forceNotifyOnBlur=_this$props2.forceNotifyOnBlur,onKeyDown=_this$props2.onKeyDown,onBlur=_this$props2.onBlur,inputRef=_this$props2.inputRef,props=_objectWithoutProperties(_this$props2,_excluded),value=this.state.value;maybeOnKeyDown=forceNotifyByEnter?{onKeyDown:this.onKeyDown}:onKeyDown?{onKeyDown}:{},maybeOnBlur=forceNotifyOnBlur?{onBlur:this.onBlur}:onBlur?{onBlur}:{};var maybeRef=inputRef?{ref:inputRef}:{};return _react.default.createElement(element,_objectSpread(_objectSpread(_objectSpread(_objectSpread({},props),{},{onChange:this.onChange,value},maybeOnKeyDown),maybeOnBlur),maybeRef))}}]),DebounceInput}(_react.default.PureComponent);exports.DebounceInput=DebounceInput,_defineProperty(DebounceInput,"defaultProps",{element:"input",type:"text",onKeyDown:void 0,onBlur:void 0,value:void 0,minLength:0,debounceTimeout:100,forceNotifyByEnter:!0,forceNotifyOnBlur:!0,inputRef:void 0})},"../../node_modules/react-debounce-input/lib/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var DebounceInput=__webpack_require__("../../node_modules/react-debounce-input/lib/Component.js").DebounceInput;DebounceInput.DebounceInput=DebounceInput,module.exports=DebounceInput}}]);