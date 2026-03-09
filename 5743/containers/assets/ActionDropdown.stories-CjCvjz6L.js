import{o as m,j as t}from"./iframe-ZVrP7biW.js";import{A as o}from"./ActionDropdown.connect-BDiXkFGC.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-DgkYMm4S.js";import"./actionOnClick-b1ALSuIi.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,u={title:"AboutDropdown",args:{onSelect:d("selectAction")}};function e({onSelect:n}){const i={id:"injected-items",displayMode:"dropdown",label:"my injected items",onSelect:n,components:{itemsDropdown:[{component:"Action",actionId:"menu:first",withMenuItem:!0},{divider:!0},{component:"FilterBar",dockable:!1,docked:!1,withMenuItem:!0},{component:"Action",actionId:"menu:second"}]}},s={id:"immutable-items",displayMode:"dropdown",label:"my immutable items",onSelect:n,items:m([{id:"item1",label:"First immutable label"},{id:"item2",label:"2nd immutable"}])};return t.jsxs("div",{children:[t.jsx("p",{children:"ActionDropdown with items in the settings"}),t.jsx(o,{actionId:"menu:items-id"}),t.jsx("p",{children:"ActionDropdown with items from an expression"}),t.jsx(o,{actionId:"menu:items"}),t.jsx("p",{children:"ActionDropdown from setting and items from props"}),t.jsx(o,{actionId:"menu:first",actionIds:["menu:first","menu:second"]}),t.jsx("p",{children:"ActionDropdown from setting and a link into the items"}),t.jsx(o,{actionId:"action-dropdown:href"}),t.jsx("p",{children:"ActionDropdown with components"}),t.jsx(o,{...i}),t.jsx("p",{children:"ActionDropdown with immutable items"}),t.jsx(o,{...s})]})}e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`function Default({
  onSelect
}) {
  const propsInjectedItems = {
    id: 'injected-items',
    displayMode: 'dropdown',
    label: 'my injected items',
    onSelect,
    components: {
      itemsDropdown: [{
        component: 'Action',
        actionId: 'menu:first',
        withMenuItem: true
      }, {
        divider: true
      }, {
        component: 'FilterBar',
        dockable: false,
        docked: false,
        withMenuItem: true
      }, {
        component: 'Action',
        actionId: 'menu:second'
      }]
    }
  };
  const propsImmutableItems = {
    id: 'immutable-items',
    displayMode: 'dropdown',
    label: 'my immutable items',
    onSelect,
    items: fromJS([{
      id: 'item1',
      label: 'First immutable label'
    }, {
      id: 'item2',
      label: '2nd immutable'
    }])
  };
  return <div>
            <p>ActionDropdown with items in the settings</p>
            <ActionDropdown actionId="menu:items-id" />
            <p>ActionDropdown with items from an expression</p>
            <ActionDropdown actionId="menu:items" />
            <p>ActionDropdown from setting and items from props</p>
            <ActionDropdown actionId="menu:first" actionIds={['menu:first', 'menu:second']} />
            <p>ActionDropdown from setting and a link into the items</p>
            <ActionDropdown actionId="action-dropdown:href" />
            <p>ActionDropdown with components</p>
            <ActionDropdown {...propsInjectedItems} />
            <p>ActionDropdown with immutable items</p>
            <ActionDropdown {...propsImmutableItems} />
        </div>;
}`,...e.parameters?.docs?.source}}};const w=["Default"];export{e as Default,w as __namedExportsOrder,u as default};
