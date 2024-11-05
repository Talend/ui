"use strict";(self.webpackChunk_talend_react_containers=self.webpackChunk_talend_react_containers||[]).push([[988],{"./src/List/List.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomCellRenderer:()=>CustomCellRenderer,CustomHeaderRenderer:()=>CustomHeaderRenderer,CustomHeight:()=>CustomHeight,Default:()=>Default,InProgress:()=>InProgress,MultiSelection:()=>MultiSelection,NoToolbar:()=>NoToolbar,Pagination:()=>Pagination,SortOnTimestamps:()=>SortOnTimestamps,WithPersistentActions:()=>WithPersistentActions,WithSeparatorActions:()=>WithSeparatorActions,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__),_talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../cmf/lib-esm/index.js"),immutable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/immutable/dist/immutable.js"),immutable__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_1__),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/List/index.js"),lodash__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/lodash/lodash.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function CellWithHello({cellData}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:["hello ",cellData," !"]})}function CustomHeader({label}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:["hello ",label," !"]})}CellWithHello.displayName="CellWithHello",CellWithHello.displayName="VirtualizedList(CellWithHello)",CellWithHello.propTypes={cellData:prop_types__WEBPACK_IMPORTED_MODULE_5___default().string},_talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__.Ay.component.register("helloComp",CellWithHello),CustomHeader.displayName="CustomHeader",CustomHeader.displayName="VirtualizedList(CustomHeader)",CustomHeader.propTypes={label:prop_types__WEBPACK_IMPORTED_MODULE_5___default().string},_talend_react_cmf__WEBPACK_IMPORTED_MODULE_0__.Ay.component.register("helloHeader",CustomHeader);const list={columns:[{key:"id",label:"Id"},{key:"label",label:"Name"},{key:"count",label:"Count"},{key:"author",label:"Author"},{key:"created",label:"Created"},{key:"modified",label:"Modified"}],titleProps:{key:"label"}},actions={title:"list:view",left:["list:add","list:upload","menu:items"],items:["list:delete"]},actionsWithPersistent={...actions,persistentItemsActions:["list:add"]},actionsWithSeparator={items:[["list:add"],actions.items],persistentItemsActions:["list:add"]},props={list,actions,toolbar:{sort:{field:"id",options:[{id:"id",name:"Id"},{id:"label",name:"Name"}]},display:{displayModes:["large","table"]},filter:{placeholder:"find an object"}}},customHeight={large:200,table:100},defaultListState=new(immutable__WEBPACK_IMPORTED_MODULE_1___default().Map)({displayMode:"large"}),defaultSortedListState=new(immutable__WEBPACK_IMPORTED_MODULE_1___default().Map)({sortOn:"modified",sortAsc:!1}),items=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS([{id:"id1",label:"Title with actions",count:1,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",count:2,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id4",label:"Simple title",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id5",label:"Simple title",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id6",label:"Simple title another one",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"}]),referenceDatetime=Date.now(),minusThreeHours=referenceDatetime-108e5,minusTwoHours=referenceDatetime-72e5,minusOneHours=referenceDatetime-36e5,minusThreeMin=referenceDatetime-18e4,itemsWithTimestamp=immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS([{id:"id0",label:"Title with actions but first",created:minusThreeHours,modified:minusThreeHours,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",created:minusTwoHours,modified:minusTwoHours-1728e5,author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"id1",label:"Title with actions",created:minusThreeMin-864e5,modified:minusThreeMin,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",created:minusOneHours-864e5,modified:minusOneHours,author:"Jean-Pierre DUPONT with super long name"}]),propsTimestampSorted=(0,lodash__WEBPACK_IMPORTED_MODULE_3__.cloneDeep)(props);propsTimestampSorted.list={columns:[{key:"id",label:"Id",type:"hello"},{key:"label",label:"Name",header:"helloHeader",sortFunction:"_list_sort:sortByLength"},{key:"author",label:"Author"},{key:"created",label:"Created",type:"datetime",data:{mode:"format",pattern:"HH:mm:ss YYYY-MM-DD",iconName:"talend-scheduler"},header:"icon"},{key:"modified",label:"Modified",type:"datetime",data:{mode:"ago"}}],titleProps:{key:"label"}},propsTimestampSorted.list.sort={field:"modified",isDescending:!1};const __WEBPACK_DEFAULT_EXPORT__={parameters:{storySource:{source:"import PropTypes from 'prop-types';\n\nimport api from '@talend/react-cmf';\nimport Immutable from 'immutable';\nimport cloneDeep from 'lodash/cloneDeep';\n\nimport List from '.';\n\n/**\n * Cell renderer that displays hello + text\n */\nfunction CellWithHello({ cellData }) {\n\treturn <div>hello {cellData} !</div>;\n}\n\nCellWithHello.displayName = 'VirtualizedList(CellWithHello)';\nCellWithHello.propTypes = {\n\tcellData: PropTypes.string,\n};\n\napi.component.register('helloComp', CellWithHello);\n\n/**\n * Cell renderer that displays hello + text\n */\nfunction CustomHeader({ label }) {\n\treturn <div>hello {label} !</div>;\n}\n\nCustomHeader.displayName = 'VirtualizedList(CustomHeader)';\nCustomHeader.propTypes = {\n\tlabel: PropTypes.string,\n};\n\napi.component.register('helloHeader', CustomHeader);\n\nconst list = {\n\tcolumns: [\n\t\t{ key: 'id', label: 'Id' },\n\t\t{ key: 'label', label: 'Name' },\n\t\t{ key: 'count', label: 'Count' },\n\t\t{ key: 'author', label: 'Author' },\n\t\t{ key: 'created', label: 'Created' },\n\t\t{ key: 'modified', label: 'Modified' },\n\t],\n\ttitleProps: {\n\t\tkey: 'label',\n\t},\n};\n\nconst listWithTimestamp = {\n\tcolumns: [\n\t\t{ key: 'id', label: 'Id', type: 'hello' },\n\t\t{ key: 'label', label: 'Name', header: 'helloHeader', sortFunction: '_list_sort:sortByLength' },\n\t\t{ key: 'author', label: 'Author' },\n\t\t{\n\t\t\tkey: 'created',\n\t\t\tlabel: 'Created',\n\t\t\ttype: 'datetime',\n\t\t\tdata: { mode: 'format', pattern: 'HH:mm:ss YYYY-MM-DD', iconName: 'talend-scheduler' },\n\t\t\theader: 'icon',\n\t\t},\n\t\t{\n\t\t\tkey: 'modified',\n\t\t\tlabel: 'Modified',\n\t\t\ttype: 'datetime',\n\t\t\tdata: { mode: 'ago' },\n\t\t},\n\t],\n\ttitleProps: {\n\t\tkey: 'label',\n\t},\n};\n\nconst actions = {\n\ttitle: 'list:view',\n\tleft: ['list:add', 'list:upload', 'menu:items'],\n\titems: ['list:delete'],\n};\n\nconst actionsWithPersistent = {\n\t...actions,\n\tpersistentItemsActions: ['list:add'],\n};\n\nconst actionsWithSeparator = {\n\titems: [['list:add'], actions.items],\n\tpersistentItemsActions: ['list:add'],\n};\n\nconst toolbar = {\n\tsort: {\n\t\tfield: 'id',\n\t\toptions: [\n\t\t\t{ id: 'id', name: 'Id' },\n\t\t\t{ id: 'label', name: 'Name' },\n\t\t],\n\t},\n\tdisplay: {\n\t\tdisplayModes: ['large', 'table'],\n\t},\n\tfilter: {\n\t\tplaceholder: 'find an object',\n\t},\n};\n\nconst props = {\n\tlist,\n\tactions,\n\ttoolbar,\n};\n\nconst customHeight = {\n\tlarge: 200,\n\ttable: 100,\n};\n\nconst defaultListState = new Immutable.Map({\n\tdisplayMode: 'large',\n});\n\nconst defaultSortedListState = new Immutable.Map({\n\tsortOn: 'modified',\n\tsortAsc: false,\n});\n\nconst items = Immutable.fromJS([\n\t{\n\t\tid: 'id1',\n\t\tlabel: 'Title with actions',\n\t\tcount: 1,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t\ticon: 'fa fa-file-excel-o',\n\t\tdisplay: 'text',\n\t\tclassName: 'item-0-class',\n\t},\n\t{\n\t\tid: 'ID2',\n\t\tlabel: 'Title in input mode',\n\t\tcount: 11,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t\ticon: 'fa fa-file-pdf-o',\n\t\tdisplay: 'input',\n\t\tclassName: 'item-1-class',\n\t},\n\t{\n\t\tid: 'iD3',\n\t\tlabel: 'Super long title to trigger overflow on some rendering',\n\t\tcount: 2,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT with super long name',\n\t},\n\t{\n\t\tid: 'id4',\n\t\tlabel: 'Simple title',\n\t\tcount: 0,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t},\n\t{\n\t\tid: 'id5',\n\t\tlabel: 'Simple title',\n\t\tcount: 11,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t},\n\t{\n\t\tid: 'id6',\n\t\tlabel: 'Simple title another one',\n\t\tcount: 0,\n\t\tcreated: '2016-09-22',\n\t\tmodified: '2016-09-22',\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t},\n]);\n\nconst referenceDatetime = Date.now();\nconst minusThreeHours = referenceDatetime - 3600 * 3 * 1000;\nconst minusTwoHours = referenceDatetime - 3600 * 2 * 1000;\nconst minusOneHours = referenceDatetime - 3600 * 1 * 1000;\nconst minusThreeMin = referenceDatetime - 60 * 3 * 1000;\n\nconst oneDay = 24 * 3600 * 1000;\n\nconst itemsWithTimestamp = Immutable.fromJS([\n\t{\n\t\tid: 'id0',\n\t\tlabel: 'Title with actions but first',\n\t\tcreated: minusThreeHours,\n\t\tmodified: minusThreeHours,\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t\ticon: 'fa fa-file-excel-o',\n\t\tdisplay: 'text',\n\t\tclassName: 'item-0-class',\n\t},\n\t{\n\t\tid: 'ID2',\n\t\tlabel: 'Title in input mode',\n\t\tcreated: minusTwoHours,\n\t\tmodified: minusTwoHours - oneDay * 2,\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t\ticon: 'fa fa-file-pdf-o',\n\t\tdisplay: 'input',\n\t\tclassName: 'item-1-class',\n\t},\n\t{\n\t\tid: 'id1',\n\t\tlabel: 'Title with actions',\n\t\tcreated: minusThreeMin - oneDay,\n\t\tmodified: minusThreeMin,\n\t\tauthor: 'Jean-Pierre DUPONT',\n\t\ticon: 'fa fa-file-excel-o',\n\t\tdisplay: 'text',\n\t\tclassName: 'item-0-class',\n\t},\n\t{\n\t\tid: 'iD3',\n\t\tlabel: 'Super long title to trigger overflow on some rendering',\n\t\tcreated: minusOneHours - oneDay,\n\t\tmodified: minusOneHours,\n\t\tauthor: 'Jean-Pierre DUPONT with super long name',\n\t},\n]);\n\nconst sortUpdatedAsc = {\n\tfield: 'modified',\n\tisDescending: false,\n};\nconst propsTimestampSorted = cloneDeep(props);\npropsTimestampSorted.list = listWithTimestamp;\npropsTimestampSorted.list.sort = sortUpdatedAsc;\n\nexport default {\n\ttitle: 'List',\n};\n\nexport const Default = () => (\n\t<div className=\"list-container\">\n\t\t<List {...props} items={items} />\n\t</div>\n);\nexport const WithPersistentActions = () => (\n\t<div className=\"list-container\">\n\t\t<List {...props} actions={actionsWithPersistent} items={items} />\n\t</div>\n);\nexport const WithSeparatorActions = () => (\n\t<div className=\"list-container\">\n\t\t<List {...props} actions={actionsWithSeparator} items={items} />\n\t</div>\n);\nexport const Pagination = () => {\n\tconst propsPg = cloneDeep(props);\n\tconst itemsPg = items.concat(\n\t\tImmutable.fromJS([\n\t\t\t{\n\t\t\t\tid: 'id4',\n\t\t\t\tlabel: 'Title with actions',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'ID5',\n\t\t\t\tlabel: 'Title in input mode',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'iD6',\n\t\t\t\tlabel: 'Super long title to trigger overflow on some rendering',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT with super long name',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'id7',\n\t\t\t\tlabel: 'Title with actions',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'ID8',\n\t\t\t\tlabel: 'Title in input mode',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'iD9',\n\t\t\t\tlabel: 'Super long title to trigger overflow on some rendering',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT with super long name',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'id10',\n\t\t\t\tlabel: 'Title with actions',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'ID11',\n\t\t\t\tlabel: 'Title in input mode',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT',\n\t\t\t},\n\t\t\t{\n\t\t\t\tid: 'iD12',\n\t\t\t\tlabel: 'Super long title to trigger overflow on some rendering',\n\t\t\t\tcreated: '2016-09-22',\n\t\t\t\tmodified: '2016-09-22',\n\t\t\t\tauthor: 'Jean-Pierre DUPONT with super long name',\n\t\t\t},\n\t\t]),\n\t);\n\tpropsPg.toolbar.pagination = {};\n\treturn (\n\t\t<div className=\"list-container\">\n\t\t\t<List {...propsPg} items={itemsPg} />\n\t\t</div>\n\t);\n};\nexport const InProgress = () => {\n\tconst props2 = cloneDeep(props);\n\tprops2.list.inProgress = true;\n\treturn (\n\t\t<div className=\"list-container\">\n\t\t\t<List {...props2} items={items} />\n\t\t</div>\n\t);\n};\nexport const MultiSelection = () => {\n\tconst multiSelectionProps = cloneDeep(props);\n\tmultiSelectionProps.multiSelectActions = {\n\t\tleft: ['list:multi:remove'],\n\t};\n\tmultiSelectionProps.idKey = 'id';\n\treturn (\n\t\t<div className=\"list-container\">\n\t\t\t<List {...multiSelectionProps} items={items} />\n\t\t</div>\n\t);\n};\nexport const NoToolbar = () => (\n\t<div className=\"list-container\">\n\t\t<List list={list} actions={actions} items={items} />\n\t</div>\n);\nexport const CustomHeight = () => (\n\t<div className=\"list-container\">\n\t\t<List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />\n\t</div>\n);\nexport const SortOnTimestamps = () => (\n\t<div className=\"list-container\">\n\t\t<List\n\t\t\t{...propsTimestampSorted}\n\t\t\titems={itemsWithTimestamp}\n\t\t\tinitialState={defaultSortedListState}\n\t\t/>\n\t</div>\n);\nexport const CustomCellRenderer = () => {\n\tconst cellDictionary = {\n\t\thello: { component: 'helloComp' },\n\t};\n\n\treturn (\n\t\t<div className=\"list-container\">\n\t\t\t<List\n\t\t\t\tvirtualized\n\t\t\t\t{...propsTimestampSorted}\n\t\t\t\titems={itemsWithTimestamp}\n\t\t\t\tcellDictionary={cellDictionary}\n\t\t\t/>\n\t\t</div>\n\t);\n};\nexport const CustomHeaderRenderer = () => {\n\tconst headerDictionary = {\n\t\thelloHeader: { component: 'helloHeader' },\n\t};\n\treturn (\n\t\t<div className=\"list-container\">\n\t\t\t<List\n\t\t\t\tvirtualized\n\t\t\t\t{...propsTimestampSorted}\n\t\t\t\titems={itemsWithTimestamp}\n\t\t\t\theaderDictionary={headerDictionary}\n\t\t\t/>\n\t\t</div>\n\t);\n};\n",locationsMap:{default:{startLoc:{col:23,line:244},endLoc:{col:1,line:248},startBody:{col:23,line:244},endBody:{col:1,line:248}},"with-persistent-actions":{startLoc:{col:37,line:249},endLoc:{col:1,line:253},startBody:{col:37,line:249},endBody:{col:1,line:253}},"with-separator-actions":{startLoc:{col:36,line:254},endLoc:{col:1,line:258},startBody:{col:36,line:254},endBody:{col:1,line:258}},pagination:{startLoc:{col:26,line:259},endLoc:{col:1,line:334},startBody:{col:26,line:259},endBody:{col:1,line:334}},"in-progress":{startLoc:{col:26,line:335},endLoc:{col:1,line:343},startBody:{col:26,line:335},endBody:{col:1,line:343}},"multi-selection":{startLoc:{col:30,line:344},endLoc:{col:1,line:355},startBody:{col:30,line:344},endBody:{col:1,line:355}},"no-toolbar":{startLoc:{col:25,line:356},endLoc:{col:1,line:360},startBody:{col:25,line:356},endBody:{col:1,line:360}},"custom-height":{startLoc:{col:28,line:361},endLoc:{col:1,line:365},startBody:{col:28,line:361},endBody:{col:1,line:365}},"sort-on-timestamps":{startLoc:{col:32,line:366},endLoc:{col:1,line:374},startBody:{col:32,line:366},endBody:{col:1,line:374}},"custom-cell-renderer":{startLoc:{col:34,line:375},endLoc:{col:1,line:390},startBody:{col:34,line:375},endBody:{col:1,line:390}},"custom-header-renderer":{startLoc:{col:36,line:391},endLoc:{col:1,line:405},startBody:{col:36,line:391},endBody:{col:1,line:405}}}}},title:"List"},Default=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...props,items})});Default.displayName="Default";const WithPersistentActions=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...props,actions:actionsWithPersistent,items})});WithPersistentActions.displayName="WithPersistentActions";const WithSeparatorActions=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...props,actions:actionsWithSeparator,items})});WithSeparatorActions.displayName="WithSeparatorActions";const Pagination=()=>{const propsPg=(0,lodash__WEBPACK_IMPORTED_MODULE_3__.cloneDeep)(props),itemsPg=items.concat(immutable__WEBPACK_IMPORTED_MODULE_1___default().fromJS([{id:"id4",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID5",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD6",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id7",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID8",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD9",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id10",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID11",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD12",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"}]));return propsPg.toolbar.pagination={},(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...propsPg,items:itemsPg})})};Pagination.displayName="Pagination";const InProgress=()=>{const props2=(0,lodash__WEBPACK_IMPORTED_MODULE_3__.cloneDeep)(props);return props2.list.inProgress=!0,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...props2,items})})};InProgress.displayName="InProgress";const MultiSelection=()=>{const multiSelectionProps=(0,lodash__WEBPACK_IMPORTED_MODULE_3__.cloneDeep)(props);return multiSelectionProps.multiSelectActions={left:["list:multi:remove"]},multiSelectionProps.idKey="id",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...multiSelectionProps,items})})};MultiSelection.displayName="MultiSelection";const NoToolbar=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{list,actions,items})});NoToolbar.displayName="NoToolbar";const CustomHeight=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...props,items,rowHeight:customHeight,initialState:defaultListState})});CustomHeight.displayName="CustomHeight";const SortOnTimestamps=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{...propsTimestampSorted,items:itemsWithTimestamp,initialState:defaultSortedListState})});SortOnTimestamps.displayName="SortOnTimestamps";const CustomCellRenderer=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{virtualized:!0,...propsTimestampSorted,items:itemsWithTimestamp,cellDictionary:{hello:{component:"helloComp"}}})});CustomCellRenderer.displayName="CustomCellRenderer";const CustomHeaderRenderer=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"list-container",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.A,{virtualized:!0,...propsTimestampSorted,items:itemsWithTimestamp,headerDictionary:{helloHeader:{component:"helloHeader"}}})});CustomHeaderRenderer.displayName="CustomHeaderRenderer",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List {...props} items={items} />\n    </div>',...Default.parameters?.docs?.source}}},WithPersistentActions.parameters={...WithPersistentActions.parameters,docs:{...WithPersistentActions.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List {...props} actions={actionsWithPersistent} items={items} />\n    </div>',...WithPersistentActions.parameters?.docs?.source}}},WithSeparatorActions.parameters={...WithSeparatorActions.parameters,docs:{...WithSeparatorActions.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List {...props} actions={actionsWithSeparator} items={items} />\n    </div>',...WithSeparatorActions.parameters?.docs?.source}}},Pagination.parameters={...Pagination.parameters,docs:{...Pagination.parameters?.docs,source:{originalSource:"() => {\n  const propsPg = cloneDeep(props);\n  const itemsPg = items.concat(Immutable.fromJS([{\n    id: 'id4',\n    label: 'Title with actions',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'ID5',\n    label: 'Title in input mode',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'iD6',\n    label: 'Super long title to trigger overflow on some rendering',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT with super long name'\n  }, {\n    id: 'id7',\n    label: 'Title with actions',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'ID8',\n    label: 'Title in input mode',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'iD9',\n    label: 'Super long title to trigger overflow on some rendering',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT with super long name'\n  }, {\n    id: 'id10',\n    label: 'Title with actions',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'ID11',\n    label: 'Title in input mode',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT'\n  }, {\n    id: 'iD12',\n    label: 'Super long title to trigger overflow on some rendering',\n    created: '2016-09-22',\n    modified: '2016-09-22',\n    author: 'Jean-Pierre DUPONT with super long name'\n  }]));\n  propsPg.toolbar.pagination = {};\n  return <div className=\"list-container\">\n            <List {...propsPg} items={itemsPg} />\n        </div>;\n}",...Pagination.parameters?.docs?.source}}},InProgress.parameters={...InProgress.parameters,docs:{...InProgress.parameters?.docs,source:{originalSource:'() => {\n  const props2 = cloneDeep(props);\n  props2.list.inProgress = true;\n  return <div className="list-container">\n            <List {...props2} items={items} />\n        </div>;\n}',...InProgress.parameters?.docs?.source}}},MultiSelection.parameters={...MultiSelection.parameters,docs:{...MultiSelection.parameters?.docs,source:{originalSource:"() => {\n  const multiSelectionProps = cloneDeep(props);\n  multiSelectionProps.multiSelectActions = {\n    left: ['list:multi:remove']\n  };\n  multiSelectionProps.idKey = 'id';\n  return <div className=\"list-container\">\n            <List {...multiSelectionProps} items={items} />\n        </div>;\n}",...MultiSelection.parameters?.docs?.source}}},NoToolbar.parameters={...NoToolbar.parameters,docs:{...NoToolbar.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List list={list} actions={actions} items={items} />\n    </div>',...NoToolbar.parameters?.docs?.source}}},CustomHeight.parameters={...CustomHeight.parameters,docs:{...CustomHeight.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />\n    </div>',...CustomHeight.parameters?.docs?.source}}},SortOnTimestamps.parameters={...SortOnTimestamps.parameters,docs:{...SortOnTimestamps.parameters?.docs,source:{originalSource:'() => <div className="list-container">\n        <List {...propsTimestampSorted} items={itemsWithTimestamp} initialState={defaultSortedListState} />\n    </div>',...SortOnTimestamps.parameters?.docs?.source}}},CustomCellRenderer.parameters={...CustomCellRenderer.parameters,docs:{...CustomCellRenderer.parameters?.docs,source:{originalSource:"() => {\n  const cellDictionary = {\n    hello: {\n      component: 'helloComp'\n    }\n  };\n  return <div className=\"list-container\">\n            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} cellDictionary={cellDictionary} />\n        </div>;\n}",...CustomCellRenderer.parameters?.docs?.source}}},CustomHeaderRenderer.parameters={...CustomHeaderRenderer.parameters,docs:{...CustomHeaderRenderer.parameters?.docs,source:{originalSource:"() => {\n  const headerDictionary = {\n    helloHeader: {\n      component: 'helloHeader'\n    }\n  };\n  return <div className=\"list-container\">\n            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} headerDictionary={headerDictionary} />\n        </div>;\n}",...CustomHeaderRenderer.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithPersistentActions","WithSeparatorActions","Pagination","InProgress","MultiSelection","NoToolbar","CustomHeight","SortOnTimestamps","CustomCellRenderer","CustomHeaderRenderer"]}}]);