import{b9 as i,j as e,a9 as g}from"./iframe-CznhUcwq.js";import{L as s}from"./List.component-BNFK1EpN.js";import"./SelectAll.component-CWoTOQqR.js";import"./ColumnChooser.component-oqKiprlE.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-CHKp6rXU.js";import"./RootCloseWrapper-CL1PWpHT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BBcaJJAg.js";import"./Transition-xqwoA6kd.js";import"./Transition-CpxPvNtk.js";import"./index-BnBZYw78.js";import"./TooltipTrigger.component-B2rRzx3C.js";import"./index-BZ3lfjSG.js";import"./index-CgexE0x5.js";import"./CircularProgress.component-B__yXDi1.js";import"./constants-CZYEPhht.js";import"./translate-BYv7b2G_.js";import"./withTranslation-C5GK5G2e.js";import"./findIndex-D4qrQzG_.js";import"./locale-CcoAdjXy.js";import"./clsx-DSDVUJJd.js";import"./index-DW-ZyMer.js";import"./Skeleton.component-D_SXO69o.js";import"./index-BTM52Cfh.js";import"./theme-CWGwz770.js";import"./Action.component-BzZnaSZL.js";import"./ActionButton.component-p2-A9FgF.js";import"./ActionSplitDropdown.component-B9aqV25q.js";import"./SplitButton-D_XmFbeu.js";import"./inheritsLoose-C8vUFnnV.js";import"./DropdownButton-BxODINrY.js";import"./ActionIconToggle.component-4h2ERYxG.js";import"./Actions.component-BmI8b1sZ.js";import"./CellMeasurerCache-DXNvPQhS.js";import"./CollapsiblePanel.component-CfIfZ-3R.js";import"./Status.component-DFtPVAjo.js";import"./Panel-C-1g3H3q.js";import"./index-CW33jNcN.js";import"./Badge.component-DYahSp6c.js";import"./locale-DGk_POTu.js";import"./Checkbox-Bipyzk6i.js";import"./QualityBar.component-jQ9TVh37.js";import"./NavItem-Bv85A-6j.js";import"./NavDropdown-CuZrCBB8.js";import"./FilterBar.component-D3MsuQmF.js";import"./index-CAIlw6El.js";import"./index-CrEiKniw.js";import"./FormControl-DFFflYN2.js";import"./ActionBar.component-NKAJ9IDz.js";import"./RichLayout.component--y3BZsFX.js";g.string;const y=[{id:"edit",label:"edit",icon:"talend-pencil",onClick:()=>console.log("onEdit")},{id:"delete",label:"delete",icon:"talend-trash",onClick:()=>console.log("onDelete")},{id:"related",displayMode:"dropdown",label:"related items",icon:"talend-folder",items:[{label:"document 1",onClick:()=>console.log("document 1 click")},{label:"document 2",onClick:()=>console.log("document 2 click")}],pullRight:!0}],b=[{id:"edit",label:"edit",icon:"talend-pencil",onClick:()=>console.log("onEdit")},{id:"delete",label:"delete",icon:"talend-trash",onClick:()=>console.log("onDelete")},{id:"copy",label:"copy",icon:"talend-files-o",onClick:()=>console.log("onCopy")},{id:"parameters",label:"efit parameters",icon:"talend-cog",onClick:()=>console.log("onEditParameters")},{id:"related",displayMode:"dropdown",label:"related items",icon:"talend-folder",items:[{label:"document 1",onClick:()=>console.log("document 1 click")},{label:"document 2",onClick:()=>console.log("document 2 click")}],pullRight:!0}],f=[{id:"edit",label:"edit",icon:"talend-apache",onClick:()=>console.log("onEdit")}],o={id:"talend",displayMode:"table",list:{columns:[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Modified",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5}],items:[{id:0,name:"Title with actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",actions:y,icon:"talend-file-s3-o",display:"text",className:"item-0-class"},{id:1,name:"Title with a lot of actions",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",actions:b,icon:"talend-file-xls-o",display:"text",className:"item-1-class"},{id:2,name:"Title with super super super super super super super super super super super super super super super super super super super super super super super super super super super super super super long title oh yeah",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"talend-file-xls-o",display:"text",className:"item-1-class"},{id:3,name:"Title in input mode",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT",icon:"talend-file-json-o",display:"input",className:"item-2-class"},{persistentActions:f,id:4,name:"Super long title to trigger overflow on tile rendering",created:"2016-09-22",modified:"2016-09-22",author:"Jean-Pierre DUPONT with super super super super super super super super super super super super super super super super super super super super super super super long name, but there was not enough long text",className:"item-3-class"}],titleProps:{key:"name",iconKey:"icon",displayModeKey:"display",onClick:()=>console.log("onTitleClick"),onEditCancel:()=>console.log("onEditCancel"),onEditSubmit:()=>console.log("onEditSubmit")},itemProps:{classNameKey:"className"}},toolbar:{actionBar:{actions:{left:[{id:"add",label:"Add Folder",bsStyle:"info",icon:"talend-plus-circle",onClick:()=>console.log("add.onClick")},{displayMode:"splitDropdown",label:"Add File",icon:"talend-folder",onClick:()=>console.log("onAdd"),items:[{label:"From Local",onClick:()=>console.log("From Local click")},{label:"From Remote",onClick:()=>console.log("From Remote click")}],emptyDropdownLabel:"No option"}]}},display:{onChange:()=>console.log("display.onChange")},sort:{field:"name",onChange:()=>console.log("sort.onChange"),options:[{id:"id",name:"Id"},{id:"name",name:"Name With Multiple Words"}]},filter:{docked:!0,onBlur:()=>console.log("filter.onBlur"),onClear:()=>console.log("filter.onClear"),onFocus:()=>console.log("filter.onFocus"),onFilter:()=>console.log("filter.onFilter"),onToggle:()=>console.log("filter.onToggle"),placeholder:"search for something"}}},ye={title:"Components/List/List",component:s,tags:["autodocs"]},r={render:()=>e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"Display the list in table mode. This is the default mode."}),e.jsx(s,{...o})]})},l={render:()=>{const t=i(o);return t.toolbar.itemsNumber={totalItems:t.list.items.length,label:`${t.list.items.length} users`},e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"Display the list in table mode with the total number of items."}),e.jsx(s,{...t})]})}},a={render:()=>{const t=i(o),m=[{id:0,name:"Title 1",status:"ok",cat:"fluffy"},{id:1,name:"Title 2",status:"warning",cat:"fat"},{id:2,name:"Title 3",status:"random",cat:"regular"}],u=h=>{switch(h.cat){case"fluffy":return{label:"OK!",icon:"talend-star",onClick:()=>{}};case"fat":return{label:"Oh no!",icon:"talend-warning",onClick:()=>{}};default:return null}};return t.list.columns=[{key:"id",label:"Id"},{key:"name",label:"Name"},{key:"status",label:"Status",type:"texticon",data:{getIcon:u}},{key:"cat",label:"Cat"}],t.list.items=m,e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"Display with icons in status"}),e.jsx(s,{...t})]})}},n={render:()=>{const t=i(o);return e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"displayMode large"}),e.jsx(s,{...t,rowHeight:140,displayMode:"large"})]})}},c={render:()=>{const t=i(o);return t.list.items=[],e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"Empty"}),e.jsx(s,{...t})]})}},d={render:()=>{const t=i(o);return t.toolbar=void 0,e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"List without toolbar"}),e.jsx(s,{...t})]})}},p={render:()=>{const t=i(o);return t.list.columns[0].hideHeader=!0,e.jsxs("div",{style:{height:"70vh"},className:"virtualized-list",children:[e.jsx("h1",{children:"List"}),e.jsx("p",{children:"Hidden header labels"}),e.jsx(s,{...t})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    height: '70vh'
  }} className="virtualized-list">
            <h1>List</h1>
            <p>Display the list in table mode. This is the default mode.</p>
            <List {...props} />
        </div>
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const customProps = cloneDeep(props);
    customProps.toolbar.itemsNumber = {
      totalItems: customProps.list.items.length,
      label: \`\${customProps.list.items.length} users\`
    };
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>Display the list in table mode with the total number of items.</p>
                <List {...customProps} />
            </div>;
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const customProps = cloneDeep(props);
    const itemsForListWithIcons = [{
      id: 0,
      name: 'Title 1',
      status: 'ok',
      cat: 'fluffy'
    }, {
      id: 1,
      name: 'Title 2',
      status: 'warning',
      cat: 'fat'
    }, {
      id: 2,
      name: 'Title 3',
      status: 'random',
      cat: 'regular'
    }];
    const getIcon = item => {
      switch (item.cat) {
        case 'fluffy':
          return {
            label: 'OK!',
            icon: 'talend-star',
            onClick: () => {}
          };
        case 'fat':
          return {
            label: 'Oh no!',
            icon: 'talend-warning',
            onClick: () => {}
          };
        default:
          return null;
      }
    };
    customProps.list.columns = [{
      key: 'id',
      label: 'Id'
    }, {
      key: 'name',
      label: 'Name'
    }, {
      key: 'status',
      label: 'Status',
      type: 'texticon',
      data: {
        getIcon
      }
    }, {
      key: 'cat',
      label: 'Cat'
    }];
    customProps.list.items = itemsForListWithIcons;
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>Display with icons in status</p>
                <List {...customProps} />
            </div>;
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const customProps = cloneDeep(props);
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>displayMode large</p>
                <List {...customProps} rowHeight={140} displayMode="large" />
            </div>;
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const emptyListProps = cloneDeep(props);
    emptyListProps.list.items = [];
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>Empty</p>
                <List {...emptyListProps} />
            </div>;
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const tprops = cloneDeep(props);
    tprops.toolbar = undefined;
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>List without toolbar</p>
                <List {...tprops} />
            </div>;
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const customProps = cloneDeep(props);
    customProps.list.columns[0].hideHeader = true;
    return <div style={{
      height: '70vh'
    }} className="virtualized-list">
                <h1>List</h1>
                <p>Hidden header labels</p>
                <List {...customProps} />
            </div>;
  }
}`,...p.parameters?.docs?.source}}};const be=["TableDisplay","TableWithNumber","TableIcons","LargeDisplay","EmptyTable","NoToolbar","HiddenHeaderLabels"];export{c as EmptyTable,p as HiddenHeaderLabels,n as LargeDisplay,d as NoToolbar,r as TableDisplay,a as TableIcons,l as TableWithNumber,be as __namedExportsOrder,ye as default};
