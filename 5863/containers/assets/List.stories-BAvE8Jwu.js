import{j as e,I as a,_ as D,P as U,e as j}from"./iframe-CPISLRMc.js";import{L as i}from"./index-zxYu1shM.js";import"./preload-helper-PPVm8Dsz.js";import"./actionAPI-Ctje8yyT.js";function S({cellData:t}){return e.jsxs("div",{children:["hello ",t," !"]})}S.displayName="VirtualizedList(CellWithHello)";S.propTypes={cellData:U.string};j.component.register("helloComp",S);function v({label:t}){return e.jsxs("div",{children:["hello ",t," !"]})}v.displayName="VirtualizedList(CustomHeader)";v.propTypes={label:U.string};j.component.register("helloHeader",v);const H={columns:[{key:"id",label:"Id"},{key:"label",label:"Name"},{key:"count",label:"Count"},{key:"author",label:"Author"},{key:"created",label:"Created"},{key:"modified",label:"Modified"}],titleProps:{key:"label"}},C={columns:[{key:"id",label:"Id",type:"hello"},{key:"label",label:"Name",header:"helloHeader",sortFunction:"_list_sort:sortByLength"},{key:"author",label:"Author"},{key:"created",label:"Created",type:"datetime",data:{mode:"format",pattern:"HH:mm:ss YYYY-MM-DD",iconName:"talend-scheduler"},header:"icon"},{key:"modified",label:"Modified",type:"datetime",data:{mode:"ago"}}],titleProps:{key:"label"}},T={title:"list:view",left:["list:add","list:upload","menu:items"],items:["list:delete"]},I={...T,persistentItemsActions:["list:add"]},W={items:[["list:add"],T.items],persistentItemsActions:["list:add"]},k={sort:{field:"id",options:[{id:"id",name:"Id"},{id:"label",name:"Name"}]},display:{displayModes:["large","table"]},filter:{placeholder:"find an object"}},r={list:H,actions:T,toolbar:k},A={large:200,table:100},M=new a.Map({displayMode:"large"}),z=new a.Map({sortOn:"modified",sortAsc:!1}),s=a.fromJS([{id:"id1",label:"Title with actions",count:1,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",count:2,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id4",label:"Simple title",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id5",label:"Simple title",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id6",label:"Simple title another one",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"}]),N=Date.now(),x=N-3600*3*1e3,O=N-3600*2*1e3,w=N-3600*1*1e3,J=N-180*1e3,b=24*3600*1e3,y=a.fromJS([{id:"id0",label:"Title with actions but first",created:x,modified:x,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",created:O,modified:O-b*2,author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"id1",label:"Title with actions",created:J-b,modified:J,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",created:w-b,modified:w,author:"Jean-Pierre DUPONT with super long name"}]),_={field:"modified",isDescending:!1},o=D(r);o.list=C;o.list.sort=_;const V={title:"List"},l=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,items:s})}),n=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,actions:I,items:s})}),d=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,actions:W,items:s})}),c=()=>{const t=D(r),L=s.concat(a.fromJS([{id:"id4",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID5",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD6",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id7",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID8",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD9",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id10",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID11",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD12",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"}]));return t.toolbar.pagination={},e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:L})})},m=()=>{const t=D(r);return t.list.inProgress=!0,e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:s})})},p=()=>{const t=D(r);return t.multiSelectActions={left:["list:multi:remove"]},t.idKey="id",e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:s})})},u=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{list:H,actions:T,items:s})}),h=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,items:s,rowHeight:A,initialState:M})}),f=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...o,items:y,initialState:z})}),g=()=>{const t={hello:{component:"helloComp"}};return e.jsx("div",{className:"list-container",children:e.jsx(i,{virtualized:!0,...o,items:y,cellDictionary:t})})},P=()=>{const t={helloHeader:{component:"helloHeader"}};return e.jsx("div",{className:"list-container",children:e.jsx(i,{virtualized:!0,...o,items:y,headerDictionary:t})})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} items={items} />
    </div>`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} actions={actionsWithPersistent} items={items} />
    </div>`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} actions={actionsWithSeparator} items={items} />
    </div>`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const propsPg = cloneDeep(props);
  const itemsPg = items.concat(Immutable.fromJS([{
    id: 'id4',
    label: 'Title with actions',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'ID5',
    label: 'Title in input mode',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'iD6',
    label: 'Super long title to trigger overflow on some rendering',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT with super long name'
  }, {
    id: 'id7',
    label: 'Title with actions',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'ID8',
    label: 'Title in input mode',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'iD9',
    label: 'Super long title to trigger overflow on some rendering',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT with super long name'
  }, {
    id: 'id10',
    label: 'Title with actions',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'ID11',
    label: 'Title in input mode',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT'
  }, {
    id: 'iD12',
    label: 'Super long title to trigger overflow on some rendering',
    created: '2016-09-22',
    modified: '2016-09-22',
    author: 'Jean-Pierre DUPONT with super long name'
  }]));
  propsPg.toolbar.pagination = {};
  return <div className="list-container">
            <List {...propsPg} items={itemsPg} />
        </div>;
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const props2 = cloneDeep(props);
  props2.list.inProgress = true;
  return <div className="list-container">
            <List {...props2} items={items} />
        </div>;
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const multiSelectionProps = cloneDeep(props);
  multiSelectionProps.multiSelectActions = {
    left: ['list:multi:remove']
  };
  multiSelectionProps.idKey = 'id';
  return <div className="list-container">
            <List {...multiSelectionProps} items={items} />
        </div>;
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List list={list} actions={actions} items={items} />
    </div>`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />
    </div>`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...propsTimestampSorted} items={itemsWithTimestamp} initialState={defaultSortedListState} />
    </div>`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const cellDictionary = {
    hello: {
      component: 'helloComp'
    }
  };
  return <div className="list-container">
            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} cellDictionary={cellDictionary} />
        </div>;
}`,...g.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const headerDictionary = {
    helloHeader: {
      component: 'helloHeader'
    }
  };
  return <div className="list-container">
            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} headerDictionary={headerDictionary} />
        </div>;
}`,...P.parameters?.docs?.source}}};const B=["Default","WithPersistentActions","WithSeparatorActions","Pagination","InProgress","MultiSelection","NoToolbar","CustomHeight","SortOnTimestamps","CustomCellRenderer","CustomHeaderRenderer"];export{g as CustomCellRenderer,P as CustomHeaderRenderer,h as CustomHeight,l as Default,m as InProgress,p as MultiSelection,u as NoToolbar,c as Pagination,f as SortOnTimestamps,n as WithPersistentActions,d as WithSeparatorActions,B as __namedExportsOrder,V as default};
