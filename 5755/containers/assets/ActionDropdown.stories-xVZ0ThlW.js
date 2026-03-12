import{j as t}from"./iframe-BGftoB4z.js";import{A as e}from"./ActionDropdown.connect-D8eDtQRw.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-DctsRtRD.js";import"./actionOnClick-rotEOTXz.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,l={title:"AboutDropdown",args:{onSelect:m("selectAction")}};function o({onSelect:n}){const i={id:"injected-items",displayMode:"dropdown",label:"my injected items",onSelect:n,components:{itemsDropdown:[{component:"Action",actionId:"menu:first",withMenuItem:!0},{divider:!0},{component:"FilterBar",dockable:!1,docked:!1,withMenuItem:!0},{component:"Action",actionId:"menu:second"}]}},s={id:"immutable-items",displayMode:"dropdown",label:"my immutable items",onSelect:n,items:[{id:"item1",label:"First immutable label"},{id:"item2",label:"2nd immutable"}]};return t.jsxs("div",{children:[t.jsx("p",{children:"ActionDropdown with items in the settings"}),t.jsx(e,{actionId:"menu:items-id"}),t.jsx("p",{children:"ActionDropdown with items from an expression"}),t.jsx(e,{actionId:"menu:items"}),t.jsx("p",{children:"ActionDropdown from setting and items from props"}),t.jsx(e,{actionId:"menu:first",actionIds:["menu:first","menu:second"]}),t.jsx("p",{children:"ActionDropdown from setting and a link into the items"}),t.jsx(e,{actionId:"action-dropdown:href"}),t.jsx("p",{children:"ActionDropdown with components"}),t.jsx(e,{...i}),t.jsx("p",{children:"ActionDropdown with immutable items"}),t.jsx(e,{...s})]})}o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`function Default({
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
    items: [{
      id: 'item1',
      label: 'First immutable label'
    }, {
      id: 'item2',
      label: '2nd immutable'
    }]
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
}`,...o.parameters?.docs?.source}}};const u=["Default"];export{o as Default,u as __namedExportsOrder,l as default};
