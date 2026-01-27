import{j as o,H as l}from"./iframe-DDbQPtEW.js";import{C as t}from"./ColumnChooser.component-DbMMzuuK.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-Do2GaOlO.js";import"./index-BKUC7KxK.js";import"./index-BhaHfiwO.js";import"./Action.component-z_tc2k8W.js";import"./ActionButton.component-C1rXDJXG.js";import"./TooltipTrigger.component-RyTGuFAh.js";import"./index-Br5au_O-.js";import"./CircularProgress.component-apPtCWbd.js";import"./translate-BAS4THSV.js";import"./withTranslation-CBoklo2K.js";import"./Skeleton.component-E6T_PEsN.js";import"./index-DwN9fP63.js";import"./theme-B86cisQm.js";import"./OverlayTrigger.component-BqP3Bda5.js";import"./RootCloseWrapper-BGY27Mp-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ByhQlRMI.js";import"./Transition-DKLhCDBr.js";import"./Transition-BRDVftK1.js";import"./ActionSplitDropdown.component-DJ2RyVCW.js";import"./SplitButton-BOEX_SVG.js";import"./inheritsLoose-CDxvETEX.js";import"./get-DEhvjXoT.js";import"./_baseGet-lTKxROzH.js";import"./toString-Cnm5KTc0.js";import"./isSymbol-DBdBqAfo.js";import"./eq-DCF4gZF2.js";import"./omit-D72adO18.js";import"./_setToString-Cv7pkYb4.js";import"./_getTag-BfvBz_ei.js";import"./isArrayLike-BSyHTOuQ.js";import"./DropdownButton-Bs0K8Cqf.js";import"./ActionIconToggle.component-moWZDsKn.js";import"./Actions.component-BBVK7eHA.js";import"./FormControl-C4Rbba9T.js";import"./flow-CXD64QOB.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BOxGUQ3X.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    title: 'Column chooser tooltip',
    description: 'Default mode with minimal props'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    title: 'Column chooser tooltip',
    description: 'You can provide and compose some of the column chooser part.'
  },
  args: {
    children: <>
                <ColumnChooser.Header>
                    <span>Hello world</span>
                    <button style={{
          marginLeft: '200px'
        }}>My Button</button>
                </ColumnChooser.Header>
                <ColumnChooser.Body>
                    {myBodyColumns => myBodyColumns.map(column => <div key={column.label}>
                                <ColumnChooser.Body.Row>
                                    <ColumnChooser.Body.Row.Label label={column.label} />
                                    <button style={{
              marginLeft: '20px',
              display: 'flex',
              height: '50%'
            }} onClick={action('my custom action')}>
                                        Action
                                    </button>
                                </ColumnChooser.Body.Row>
                            </div>)}
                </ColumnChooser.Body>
                <ColumnChooser.Footer />
            </>
  }
}`,...i.parameters?.docs?.source}}};const no=["Default","CustomizeColumnChooser"];export{i as CustomizeColumnChooser,n as Default,no as __namedExportsOrder,to as default};
