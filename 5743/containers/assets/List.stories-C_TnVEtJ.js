import{_,$ as E,j as e,M as C,o as S,P as H,e as I}from"./iframe-ZVrP7biW.js";import{L as i}from"./index-BwLY_LYg.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-DgkYMm4S.js";import"./actionAPI-B71MLgVb.js";var b,w;function z(){if(w)return b;w=1;var t=_(),T=1,A=4;function k(M){return t(M,T|A)}return b=k,b}var R=z();const P=E(R);function y({cellData:t}){return e.jsxs("div",{children:["hello ",t," !"]})}y.displayName="VirtualizedList(CellWithHello)";y.propTypes={cellData:H.string};I.component.register("helloComp",y);function x({label:t}){return e.jsxs("div",{children:["hello ",t," !"]})}x.displayName="VirtualizedList(CustomHeader)";x.propTypes={label:H.string};I.component.register("helloHeader",x);const W={columns:[{key:"id",label:"Id"},{key:"label",label:"Name"},{key:"count",label:"Count"},{key:"author",label:"Author"},{key:"created",label:"Created"},{key:"modified",label:"Modified"}],titleProps:{key:"label"}},Y={columns:[{key:"id",label:"Id",type:"hello"},{key:"label",label:"Name",header:"helloHeader",sortFunction:"_list_sort:sortByLength"},{key:"author",label:"Author"},{key:"created",label:"Created",type:"datetime",data:{mode:"format",pattern:"HH:mm:ss YYYY-MM-DD",iconName:"talend-scheduler"},header:"icon"},{key:"modified",label:"Modified",type:"datetime",data:{mode:"ago"}}],titleProps:{key:"label"}},D={title:"list:view",left:["list:add","list:upload","menu:items"],items:["list:delete"]},F={...D,persistentItemsActions:["list:add"]},q={items:[["list:add"],D.items],persistentItemsActions:["list:add"]},B={sort:{field:"id",options:[{id:"id",name:"Id"},{id:"label",name:"Name"}]},display:{displayModes:["large","table"]},filter:{placeholder:"find an object"}},r={list:W,actions:D,toolbar:B},G={large:200,table:100},K=new C({displayMode:"large"}),V=new C({sortOn:"modified",sortAsc:!1}),s=S([{id:"id1",label:"Title with actions",count:1,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",count:2,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id4",label:"Simple title",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id5",label:"Simple title",count:11,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"id6",label:"Simple title another one",count:0,created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"}]),N=Date.now(),J=N-3600*3*1e3,U=N-3600*2*1e3,j=N-3600*1*1e3,L=N-180*1e3,v=24*3600*1e3,O=S([{id:"id0",label:"Title with actions but first",created:J,modified:J,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"ID2",label:"Title in input mode",created:U,modified:U-v*2,author:"Jean-Pierre DUPONT",icon:"fa fa-file-pdf-o",display:"input",className:"item-1-class"},{id:"id1",label:"Title with actions",created:L-v,modified:L,author:"Jean-Pierre DUPONT",icon:"fa fa-file-excel-o",display:"text",className:"item-0-class"},{id:"iD3",label:"Super long title to trigger overflow on some rendering",created:j-v,modified:j,author:"Jean-Pierre DUPONT with super long name"}]),$={field:"modified",isDescending:!1},o=P(r);o.list=Y;o.list.sort=$;const ie={title:"List"},a=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,items:s})}),n=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,actions:F,items:s})}),l=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,actions:q,items:s})}),d=()=>{const t=P(r),T=s.concat(S([{id:"id4",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID5",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD6",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id7",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID8",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD9",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"},{id:"id10",label:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"ID11",label:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT"},{id:"iD12",label:"Super long title to trigger overflow on some rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super long name"}]));return t.toolbar.pagination={},e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:T})})},c=()=>{const t=P(r);return t.list.inProgress=!0,e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:s})})},m=()=>{const t=P(r);return t.multiSelectActions={left:["list:multi:remove"]},t.idKey="id",e.jsx("div",{className:"list-container",children:e.jsx(i,{...t,items:s})})},p=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{list:W,actions:D,items:s})}),u=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...r,items:s,rowHeight:G,initialState:K})}),h=()=>e.jsx("div",{className:"list-container",children:e.jsx(i,{...o,items:O,initialState:V})}),f=()=>{const t={hello:{component:"helloComp"}};return e.jsx("div",{className:"list-container",children:e.jsx(i,{virtualized:!0,...o,items:O,cellDictionary:t})})},g=()=>{const t={helloHeader:{component:"helloHeader"}};return e.jsx("div",{className:"list-container",children:e.jsx(i,{virtualized:!0,...o,items:O,headerDictionary:t})})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} items={items} />
    </div>`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} actions={actionsWithPersistent} items={items} />
    </div>`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} actions={actionsWithSeparator} items={items} />
    </div>`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const propsPg = cloneDeep(props);
  const itemsPg = items.concat(fromJS([{
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
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const props2 = cloneDeep(props);
  props2.list.inProgress = true;
  return <div className="list-container">
            <List {...props2} items={items} />
        </div>;
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const multiSelectionProps = cloneDeep(props);
  multiSelectionProps.multiSelectActions = {
    left: ['list:multi:remove']
  };
  multiSelectionProps.idKey = 'id';
  return <div className="list-container">
            <List {...multiSelectionProps} items={items} />
        </div>;
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List list={list} actions={actions} items={items} />
    </div>`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...props} items={items} rowHeight={customHeight} initialState={defaultListState} />
    </div>`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <div className="list-container">
        <List {...propsTimestampSorted} items={itemsWithTimestamp} initialState={defaultSortedListState} />
    </div>`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const cellDictionary = {
    hello: {
      component: 'helloComp'
    }
  };
  return <div className="list-container">
            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} cellDictionary={cellDictionary} />
        </div>;
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const headerDictionary = {
    helloHeader: {
      component: 'helloHeader'
    }
  };
  return <div className="list-container">
            <List virtualized {...propsTimestampSorted} items={itemsWithTimestamp} headerDictionary={headerDictionary} />
        </div>;
}`,...g.parameters?.docs?.source}}};const re=["Default","WithPersistentActions","WithSeparatorActions","Pagination","InProgress","MultiSelection","NoToolbar","CustomHeight","SortOnTimestamps","CustomCellRenderer","CustomHeaderRenderer"];export{f as CustomCellRenderer,g as CustomHeaderRenderer,u as CustomHeight,a as Default,c as InProgress,m as MultiSelection,p as NoToolbar,d as Pagination,h as SortOnTimestamps,n as WithPersistentActions,l as WithSeparatorActions,re as __namedExportsOrder,ie as default};
