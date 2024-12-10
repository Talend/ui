"use strict";(self.webpackChunk_talend_ui_storybook_one=self.webpackChunk_talend_ui_storybook_one||[]).push([[9554],{"../../node_modules/react-autowhatever/dist/Autowhatever.js":(__unused_webpack_module,exports,__webpack_require__)=>{var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_slicedToArray=function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i.return&&_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__("../../node_modules/react/index.js"),_react2=_interopRequireDefault(_react),_propTypes2=_interopRequireDefault(__webpack_require__("../../node_modules/prop-types/index.js")),_sectionIterator2=_interopRequireDefault(__webpack_require__("../../node_modules/section-iterator/dist/index.js")),_reactThemeable2=_interopRequireDefault(__webpack_require__("../../node_modules/react-themeable/dist/index.js")),_SectionTitle2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/SectionTitle.js")),_ItemsList2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/ItemsList.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var emptyObject={},Autowhatever=function(_Component){function Autowhatever(props){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Autowhatever);var _this=function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}(this,(Autowhatever.__proto__||Object.getPrototypeOf(Autowhatever)).call(this,props));return _this.storeInputReference=function(input){null!==input&&(_this.input=input)},_this.storeItemsContainerReference=function(itemsContainer){null!==itemsContainer&&(_this.itemsContainer=itemsContainer)},_this.onHighlightedItemChange=function(highlightedItem){_this.highlightedItem=highlightedItem},_this.getItemId=function(sectionIndex,itemIndex){return null===itemIndex?null:"react-autowhatever-"+_this.props.id+"-"+(null===sectionIndex?"":"section-"+sectionIndex)+"-item-"+itemIndex},_this.onFocus=function(event){var inputProps=_this.props.inputProps;_this.setState({isInputFocused:!0}),inputProps.onFocus&&inputProps.onFocus(event)},_this.onBlur=function(event){var inputProps=_this.props.inputProps;_this.setState({isInputFocused:!1}),inputProps.onBlur&&inputProps.onBlur(event)},_this.onKeyDown=function(event){var _this$props=_this.props,inputProps=_this$props.inputProps,highlightedSectionIndex=_this$props.highlightedSectionIndex,highlightedItemIndex=_this$props.highlightedItemIndex;switch(event.key){case"ArrowDown":case"ArrowUp":var nextPrev="ArrowDown"===event.key?"next":"prev",_this$sectionIterator=_this.sectionIterator[nextPrev]([highlightedSectionIndex,highlightedItemIndex]),_this$sectionIterator2=_slicedToArray(_this$sectionIterator,2),newHighlightedSectionIndex=_this$sectionIterator2[0],newHighlightedItemIndex=_this$sectionIterator2[1];inputProps.onKeyDown(event,{newHighlightedSectionIndex,newHighlightedItemIndex});break;default:inputProps.onKeyDown(event,{highlightedSectionIndex,highlightedItemIndex})}},_this.highlightedItem=null,_this.state={isInputFocused:!1},_this.setSectionsItems(props),_this.setSectionIterator(props),_this.setTheme(props),_this}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(Autowhatever,_Component),_createClass(Autowhatever,[{key:"componentDidMount",value:function componentDidMount(){this.ensureHighlightedItemIsVisible()}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(nextProps){nextProps.items!==this.props.items&&this.setSectionsItems(nextProps),nextProps.items===this.props.items&&nextProps.multiSection===this.props.multiSection||this.setSectionIterator(nextProps),nextProps.theme!==this.props.theme&&this.setTheme(nextProps)}},{key:"componentDidUpdate",value:function componentDidUpdate(){this.ensureHighlightedItemIsVisible()}},{key:"setSectionsItems",value:function setSectionsItems(props){props.multiSection&&(this.sectionsItems=props.items.map((function(section){return props.getSectionItems(section)})),this.sectionsLengths=this.sectionsItems.map((function(items){return items.length})),this.allSectionsAreEmpty=this.sectionsLengths.every((function(itemsCount){return 0===itemsCount})))}},{key:"setSectionIterator",value:function setSectionIterator(props){this.sectionIterator=(0,_sectionIterator2.default)({multiSection:props.multiSection,data:props.multiSection?this.sectionsLengths:props.items.length})}},{key:"setTheme",value:function setTheme(props){this.theme=(0,_reactThemeable2.default)(props.theme)}},{key:"renderSections",value:function renderSections(){var _this2=this;if(this.allSectionsAreEmpty)return null;var theme=this.theme,_props=this.props,id=_props.id,items=_props.items,renderItem=_props.renderItem,renderItemData=_props.renderItemData,renderSectionTitle=_props.renderSectionTitle,highlightedSectionIndex=_props.highlightedSectionIndex,highlightedItemIndex=_props.highlightedItemIndex,itemProps=_props.itemProps;return items.map((function(section,sectionIndex){var keyPrefix="react-autowhatever-"+id+"-",sectionKeyPrefix=keyPrefix+"section-"+sectionIndex+"-",isFirstSection=0===sectionIndex;return _react2.default.createElement("div",theme(sectionKeyPrefix+"container","sectionContainer",isFirstSection&&"sectionContainerFirst"),_react2.default.createElement(_SectionTitle2.default,{section,renderSectionTitle,theme,sectionKeyPrefix}),_react2.default.createElement(_ItemsList2.default,{items:_this2.sectionsItems[sectionIndex],itemProps,renderItem,renderItemData,sectionIndex,highlightedItemIndex:highlightedSectionIndex===sectionIndex?highlightedItemIndex:null,onHighlightedItemChange:_this2.onHighlightedItemChange,getItemId:_this2.getItemId,theme,keyPrefix,ref:_this2.storeItemsListReference}))}))}},{key:"renderItems",value:function renderItems(){var items=this.props.items;if(0===items.length)return null;var theme=this.theme,_props2=this.props,id=_props2.id,renderItem=_props2.renderItem,renderItemData=_props2.renderItemData,highlightedSectionIndex=_props2.highlightedSectionIndex,highlightedItemIndex=_props2.highlightedItemIndex,itemProps=_props2.itemProps;return _react2.default.createElement(_ItemsList2.default,{items,itemProps,renderItem,renderItemData,highlightedItemIndex:null===highlightedSectionIndex?highlightedItemIndex:null,onHighlightedItemChange:this.onHighlightedItemChange,getItemId:this.getItemId,theme,keyPrefix:"react-autowhatever-"+id+"-"})}},{key:"ensureHighlightedItemIsVisible",value:function ensureHighlightedItemIsVisible(){var highlightedItem=this.highlightedItem;if(highlightedItem){var itemsContainer=this.itemsContainer,itemOffsetRelativeToContainer=highlightedItem.offsetParent===itemsContainer?highlightedItem.offsetTop:highlightedItem.offsetTop-itemsContainer.offsetTop,scrollTop=itemsContainer.scrollTop;itemOffsetRelativeToContainer<scrollTop?scrollTop=itemOffsetRelativeToContainer:itemOffsetRelativeToContainer+highlightedItem.offsetHeight>scrollTop+itemsContainer.offsetHeight&&(scrollTop=itemOffsetRelativeToContainer+highlightedItem.offsetHeight-itemsContainer.offsetHeight),scrollTop!==itemsContainer.scrollTop&&(itemsContainer.scrollTop=scrollTop)}}},{key:"render",value:function render(){var theme=this.theme,_props3=this.props,id=_props3.id,multiSection=_props3.multiSection,renderInputComponent=_props3.renderInputComponent,renderItemsContainer=_props3.renderItemsContainer,highlightedSectionIndex=_props3.highlightedSectionIndex,highlightedItemIndex=_props3.highlightedItemIndex,isInputFocused=this.state.isInputFocused,renderedItems=multiSection?this.renderSections():this.renderItems(),isOpen=null!==renderedItems,ariaActivedescendant=this.getItemId(highlightedSectionIndex,highlightedItemIndex),itemsContainerId="react-autowhatever-"+id,containerProps=_extends({role:"combobox","aria-haspopup":"listbox","aria-owns":itemsContainerId,"aria-expanded":isOpen},theme("react-autowhatever-"+id+"-container","container",isOpen&&"containerOpen"),this.props.containerProps),inputComponent=renderInputComponent(_extends({type:"text",value:"",autoComplete:"off","aria-autocomplete":"list","aria-controls":itemsContainerId,"aria-activedescendant":ariaActivedescendant},theme("react-autowhatever-"+id+"-input","input",isOpen&&"inputOpen",isInputFocused&&"inputFocused"),this.props.inputProps,{onFocus:this.onFocus,onBlur:this.onBlur,onKeyDown:this.props.inputProps.onKeyDown&&this.onKeyDown,ref:this.storeInputReference})),itemsContainer=renderItemsContainer({containerProps:_extends({id:itemsContainerId,role:"listbox"},theme("react-autowhatever-"+id+"-items-container","itemsContainer",isOpen&&"itemsContainerOpen"),{ref:this.storeItemsContainerReference}),children:renderedItems});return _react2.default.createElement("div",containerProps,inputComponent,itemsContainer)}}]),Autowhatever}(_react.Component);Autowhatever.propTypes={id:_propTypes2.default.string,multiSection:_propTypes2.default.bool,renderInputComponent:_propTypes2.default.func,renderItemsContainer:_propTypes2.default.func,items:_propTypes2.default.array.isRequired,renderItem:_propTypes2.default.func,renderItemData:_propTypes2.default.object,renderSectionTitle:_propTypes2.default.func,getSectionItems:_propTypes2.default.func,containerProps:_propTypes2.default.object,inputProps:_propTypes2.default.object,itemProps:_propTypes2.default.oneOfType([_propTypes2.default.object,_propTypes2.default.func]),highlightedSectionIndex:_propTypes2.default.number,highlightedItemIndex:_propTypes2.default.number,theme:_propTypes2.default.oneOfType([_propTypes2.default.object,_propTypes2.default.array])},Autowhatever.defaultProps={id:"1",multiSection:!1,renderInputComponent:function defaultRenderInputComponent(props){return _react2.default.createElement("input",props)},renderItemsContainer:function defaultRenderItemsContainer(_ref){var containerProps=_ref.containerProps,children=_ref.children;return _react2.default.createElement("div",containerProps,children)},renderItem:function renderItem(){throw new Error("`renderItem` must be provided")},renderItemData:emptyObject,renderSectionTitle:function renderSectionTitle(){throw new Error("`renderSectionTitle` must be provided")},getSectionItems:function getSectionItems(){throw new Error("`getSectionItems` must be provided")},containerProps:emptyObject,inputProps:emptyObject,itemProps:emptyObject,highlightedSectionIndex:null,highlightedItemIndex:null,theme:{container:"react-autowhatever__container",containerOpen:"react-autowhatever__container--open",input:"react-autowhatever__input",inputOpen:"react-autowhatever__input--open",inputFocused:"react-autowhatever__input--focused",itemsContainer:"react-autowhatever__items-container",itemsContainerOpen:"react-autowhatever__items-container--open",itemsList:"react-autowhatever__items-list",item:"react-autowhatever__item",itemFirst:"react-autowhatever__item--first",itemHighlighted:"react-autowhatever__item--highlighted",sectionContainer:"react-autowhatever__section-container",sectionContainerFirst:"react-autowhatever__section-container--first",sectionTitle:"react-autowhatever__section-title"}},exports.default=Autowhatever},"../../node_modules/react-autowhatever/dist/Item.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__("../../node_modules/react/index.js"),_react2=_interopRequireDefault(_react),_propTypes2=_interopRequireDefault(__webpack_require__("../../node_modules/prop-types/index.js")),_compareObjects2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/compareObjects.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}var Item=function(_Component){function Item(){var _ref,_temp,_this;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Item);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return _temp=_this=_possibleConstructorReturn(this,(_ref=Item.__proto__||Object.getPrototypeOf(Item)).call.apply(_ref,[this].concat(args))),_this.storeItemReference=function(item){null!==item&&(_this.item=item)},_this.onMouseEnter=function(event){var _this$props=_this.props,sectionIndex=_this$props.sectionIndex,itemIndex=_this$props.itemIndex;_this.props.onMouseEnter(event,{sectionIndex,itemIndex})},_this.onMouseLeave=function(event){var _this$props2=_this.props,sectionIndex=_this$props2.sectionIndex,itemIndex=_this$props2.itemIndex;_this.props.onMouseLeave(event,{sectionIndex,itemIndex})},_this.onMouseDown=function(event){var _this$props3=_this.props,sectionIndex=_this$props3.sectionIndex,itemIndex=_this$props3.itemIndex;_this.props.onMouseDown(event,{sectionIndex,itemIndex})},_this.onClick=function(event){var _this$props4=_this.props,sectionIndex=_this$props4.sectionIndex,itemIndex=_this$props4.itemIndex;_this.props.onClick(event,{sectionIndex,itemIndex})},_possibleConstructorReturn(_this,_temp)}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(Item,_Component),_createClass(Item,[{key:"shouldComponentUpdate",value:function shouldComponentUpdate(nextProps){return(0,_compareObjects2.default)(nextProps,this.props,["renderItemData"])}},{key:"render",value:function render(){var _props=this.props,isHighlighted=_props.isHighlighted,item=_props.item,renderItem=_props.renderItem,renderItemData=_props.renderItemData,restProps=function _objectWithoutProperties(obj,keys){var target={};for(var i in obj)keys.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(obj,i)&&(target[i]=obj[i]);return target}(_props,["isHighlighted","item","renderItem","renderItemData"]);return delete restProps.sectionIndex,delete restProps.itemIndex,"function"==typeof restProps.onMouseEnter&&(restProps.onMouseEnter=this.onMouseEnter),"function"==typeof restProps.onMouseLeave&&(restProps.onMouseLeave=this.onMouseLeave),"function"==typeof restProps.onMouseDown&&(restProps.onMouseDown=this.onMouseDown),"function"==typeof restProps.onClick&&(restProps.onClick=this.onClick),_react2.default.createElement("li",_extends({role:"option"},restProps,{ref:this.storeItemReference}),renderItem(item,_extends({isHighlighted},renderItemData)))}}]),Item}(_react.Component);Item.propTypes={sectionIndex:_propTypes2.default.number,isHighlighted:_propTypes2.default.bool.isRequired,itemIndex:_propTypes2.default.number.isRequired,item:_propTypes2.default.any.isRequired,renderItem:_propTypes2.default.func.isRequired,renderItemData:_propTypes2.default.object.isRequired,onMouseEnter:_propTypes2.default.func,onMouseLeave:_propTypes2.default.func,onMouseDown:_propTypes2.default.func,onClick:_propTypes2.default.func},exports.default=Item},"../../node_modules/react-autowhatever/dist/ItemsList.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__("../../node_modules/react/index.js"),_react2=_interopRequireDefault(_react),_propTypes2=_interopRequireDefault(__webpack_require__("../../node_modules/prop-types/index.js")),_Item2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/Item.js")),_compareObjects2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/compareObjects.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}var ItemsList=function(_Component){function ItemsList(){var _ref,_temp,_this;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ItemsList);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return _temp=_this=_possibleConstructorReturn(this,(_ref=ItemsList.__proto__||Object.getPrototypeOf(ItemsList)).call.apply(_ref,[this].concat(args))),_this.storeHighlightedItemReference=function(highlightedItem){_this.props.onHighlightedItemChange(null===highlightedItem?null:highlightedItem.item)},_possibleConstructorReturn(_this,_temp)}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(ItemsList,_Component),_createClass(ItemsList,[{key:"shouldComponentUpdate",value:function shouldComponentUpdate(nextProps){return(0,_compareObjects2.default)(nextProps,this.props,["itemProps"])}},{key:"render",value:function render(){var _this2=this,_props=this.props,items=_props.items,itemProps=_props.itemProps,renderItem=_props.renderItem,renderItemData=_props.renderItemData,sectionIndex=_props.sectionIndex,highlightedItemIndex=_props.highlightedItemIndex,getItemId=_props.getItemId,theme=_props.theme,keyPrefix=_props.keyPrefix,sectionPrefix=null===sectionIndex?keyPrefix:keyPrefix+"section-"+sectionIndex+"-",isItemPropsFunction="function"==typeof itemProps;return _react2.default.createElement("ul",_extends({role:"listbox"},theme(sectionPrefix+"items-list","itemsList")),items.map((function(item,itemIndex){var isFirst=0===itemIndex,isHighlighted=itemIndex===highlightedItemIndex,itemKey=sectionPrefix+"item-"+itemIndex,itemPropsObj=isItemPropsFunction?itemProps({sectionIndex,itemIndex}):itemProps,allItemProps=_extends({id:getItemId(sectionIndex,itemIndex),"aria-selected":isHighlighted},theme(itemKey,"item",isFirst&&"itemFirst",isHighlighted&&"itemHighlighted"),itemPropsObj);return isHighlighted&&(allItemProps.ref=_this2.storeHighlightedItemReference),_react2.default.createElement(_Item2.default,_extends({},allItemProps,{sectionIndex,isHighlighted,itemIndex,item,renderItem,renderItemData}))})))}}]),ItemsList}(_react.Component);ItemsList.propTypes={items:_propTypes2.default.array.isRequired,itemProps:_propTypes2.default.oneOfType([_propTypes2.default.object,_propTypes2.default.func]),renderItem:_propTypes2.default.func.isRequired,renderItemData:_propTypes2.default.object.isRequired,sectionIndex:_propTypes2.default.number,highlightedItemIndex:_propTypes2.default.number,onHighlightedItemChange:_propTypes2.default.func.isRequired,getItemId:_propTypes2.default.func.isRequired,theme:_propTypes2.default.func.isRequired,keyPrefix:_propTypes2.default.string.isRequired},ItemsList.defaultProps={sectionIndex:null},exports.default=ItemsList},"../../node_modules/react-autowhatever/dist/SectionTitle.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_react=__webpack_require__("../../node_modules/react/index.js"),_react2=_interopRequireDefault(_react),_propTypes2=_interopRequireDefault(__webpack_require__("../../node_modules/prop-types/index.js")),_compareObjects2=_interopRequireDefault(__webpack_require__("../../node_modules/react-autowhatever/dist/compareObjects.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SectionTitle=function(_Component){function SectionTitle(){return function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,SectionTitle),function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}(this,(SectionTitle.__proto__||Object.getPrototypeOf(SectionTitle)).apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(SectionTitle,_Component),_createClass(SectionTitle,[{key:"shouldComponentUpdate",value:function shouldComponentUpdate(nextProps){return(0,_compareObjects2.default)(nextProps,this.props)}},{key:"render",value:function render(){var _props=this.props,section=_props.section,renderSectionTitle=_props.renderSectionTitle,theme=_props.theme,sectionKeyPrefix=_props.sectionKeyPrefix,sectionTitle=renderSectionTitle(section);return sectionTitle?_react2.default.createElement("div",theme(sectionKeyPrefix+"title","sectionTitle"),sectionTitle):null}}]),SectionTitle}(_react.Component);SectionTitle.propTypes={section:_propTypes2.default.any.isRequired,renderSectionTitle:_propTypes2.default.func.isRequired,theme:_propTypes2.default.func.isRequired,sectionKeyPrefix:_propTypes2.default.string.isRequired},exports.default=SectionTitle},"../../node_modules/react-autowhatever/dist/compareObjects.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};exports.default=function compareObjects(objA,objB){var keys=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(objA===objB)return!1;var aKeys=Object.keys(objA),bKeys=Object.keys(objB);if(aKeys.length!==bKeys.length)return!0;var keysMap={},i=void 0,len=void 0;for(i=0,len=keys.length;i<len;i++)keysMap[keys[i]]=!0;for(i=0,len=aKeys.length;i<len;i++){var key=aKeys[i],aValue=objA[key],bValue=objB[key];if(aValue!==bValue){if(!keysMap[key]||null===aValue||null===bValue||"object"!==(void 0===aValue?"undefined":_typeof(aValue))||"object"!==(void 0===bValue?"undefined":_typeof(bValue)))return!0;var aValueKeys=Object.keys(aValue),bValueKeys=Object.keys(bValue);if(aValueKeys.length!==bValueKeys.length)return!0;for(var n=0,length=aValueKeys.length;n<length;n++){var aValueKey=aValueKeys[n];if(aValue[aValueKey]!==bValue[aValueKey])return!0}}}return!1}},"../../node_modules/react-autowhatever/dist/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("../../node_modules/react-autowhatever/dist/Autowhatever.js").default},"../../node_modules/react-themeable/dist/index.js":(module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i.return&&_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}var _objectAssign2=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(__webpack_require__("../../node_modules/react-themeable/node_modules/object-assign/index.js")),truthy=function truthy(x){return x};exports.default=function(input){var _ref=Array.isArray(input)&&2===input.length?input:[input,null],_ref2=_slicedToArray(_ref,2),theme=_ref2[0],classNameDecorator=_ref2[1];return function(key){for(var _len=arguments.length,names=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)names[_key-1]=arguments[_key];var styles=names.map((function(name){return theme[name]})).filter(truthy);return"string"==typeof styles[0]||"function"==typeof classNameDecorator?{key,className:classNameDecorator?classNameDecorator.apply(void 0,_toConsumableArray(styles)):styles.join(" ")}:{key,style:_objectAssign2.default.apply(void 0,[{}].concat(_toConsumableArray(styles)))}}},module.exports=exports.default},"../../node_modules/react-themeable/node_modules/object-assign/index.js":module=>{var propIsEnumerable=Object.prototype.propertyIsEnumerable;function ownEnumerableKeys(obj){var keys=Object.getOwnPropertyNames(obj);return Object.getOwnPropertySymbols&&(keys=keys.concat(Object.getOwnPropertySymbols(obj))),keys.filter((function(key){return propIsEnumerable.call(obj,key)}))}module.exports=Object.assign||function(target,source){for(var from,keys,to=function ToObject(val){if(null==val)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(val)}(target),s=1;s<arguments.length;s++){from=arguments[s],keys=ownEnumerableKeys(Object(from));for(var i=0;i<keys.length;i++)to[keys[i]]=from[keys[i]]}return to}},"../../node_modules/section-iterator/dist/index.js":module=>{var _slicedToArray=function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i.return&&_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")};module.exports=function(_ref){var data=_ref.data,multiSection=_ref.multiSection;function next(position){var _position=_slicedToArray(position,2),sectionIndex=_position[0],itemIndex=_position[1];return multiSection?null===itemIndex||itemIndex===data[sectionIndex]-1?null===(sectionIndex=function nextNonEmptySectionIndex(sectionIndex){for(null===sectionIndex?sectionIndex=0:sectionIndex++;sectionIndex<data.length&&0===data[sectionIndex];)sectionIndex++;return sectionIndex===data.length?null:sectionIndex}(sectionIndex))?[null,null]:[sectionIndex,0]:[sectionIndex,itemIndex+1]:0===data||itemIndex===data-1?[null,null]:null===itemIndex?[null,0]:[null,itemIndex+1]}return{next,prev:function prev(position){var _position2=_slicedToArray(position,2),sectionIndex=_position2[0],itemIndex=_position2[1];return multiSection?null===itemIndex||0===itemIndex?null===(sectionIndex=function prevNonEmptySectionIndex(sectionIndex){for(null===sectionIndex?sectionIndex=data.length-1:sectionIndex--;sectionIndex>=0&&0===data[sectionIndex];)sectionIndex--;return-1===sectionIndex?null:sectionIndex}(sectionIndex))?[null,null]:[sectionIndex,data[sectionIndex]-1]:[sectionIndex,itemIndex-1]:0===data||0===itemIndex?[null,null]:null===itemIndex?[null,data-1]:[null,itemIndex-1]},isLast:function isLast(position){return null===next(position)[1]}}}}}]);