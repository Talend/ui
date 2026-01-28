import{j as n}from"./iframe-DSAcyFY1.js";import{A as s}from"./Actions.connect-BtWjn7dt.js";import"./preload-helper-PPVm8Dsz.js";import"./Action.connect-EucvbpGI.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,t=[{label:"Preparations",icon:"talend-dataprep",onClick:i("Preparations clicked"),bsStyle:"primary"},{label:"Datasets",icon:"talend-datasets",onClick:i("Datasets clicked")},{label:"Favorites",icon:"talend-star",onClick:i("Favorites clicked")},{displayMode:"dropdown",label:"related items",icon:"talend-file-xls-o",items:[{label:"document 1",onClick:i("document 1 click")},{label:"document 2",onClick:i("document 2 click")}]}],d={title:"Actions"};function e(){return n.jsxs("div",{children:[n.jsx("p",{children:"using action ids"}),n.jsx(s,{actionIds:["menu:first","menu:second","menu:third"]}),n.jsx("p",{children:"Using pure component props"}),n.jsx(s,{actions:t}),n.jsx("p",{children:"Using with items defined by id"}),n.jsx(s,{actionIds:["menu:items-id"]}),n.jsx("p",{children:"Using with dynamics items by an expression"}),n.jsx(s,{actionIds:["menu:items"]})]})}e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`function Default() {
  return <div>
            <p>using action ids</p>
            <Actions actionIds={['menu:first', 'menu:second', 'menu:third']} />
            <p>Using pure component props</p>
            <Actions actions={infos} />
            <p>Using with items defined by id</p>
            <Actions actionIds={['menu:items-id']} />
            <p>Using with dynamics items by an expression</p>
            <Actions actionIds={['menu:items']} />
        </div>;
}`,...e.parameters?.docs?.source}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,d as default};
