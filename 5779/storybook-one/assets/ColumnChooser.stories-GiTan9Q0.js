import{j as o,S as l}from"./iframe-BlAwZJYC.js";import{C as t}from"./ColumnChooser.component-DMN-Ikqu.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-B4QFiEvT.js";import"./index-mCtSq3HC.js";import"./index-Crmj5pbd.js";import"./Action.component-D1yN2heb.js";import"./ActionButton.component-BkFEJEsa.js";import"./TooltipTrigger.component-CKf8znt4.js";import"./index-B-SnfOJm.js";import"./CircularProgress.component-B4Wm3A86.js";import"./translate-C1JIiQxT.js";import"./withTranslation-CjGMgmnY.js";import"./Skeleton.component-DRj781-k.js";import"./index-BuMhPtEM.js";import"./theme-BPTRim7y.js";import"./OverlayTrigger.component-DQDt_Vit.js";import"./RootCloseWrapper-COPwb9jy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BQW726Ug.js";import"./Transition-CF62pEtu.js";import"./Transition-Bz1h2jYx.js";import"./ActionSplitDropdown.component-B7kXeD4J.js";import"./SplitButton-DxWPgA46.js";import"./inheritsLoose-Dev66u7n.js";import"./get-C0ExTL_9.js";import"./_baseGet-0UqVY_yl.js";import"./toString-COxhx_ue.js";import"./isSymbol-DzJhhvfo.js";import"./eq-BVmKQjva.js";import"./omit-BE0rUHay.js";import"./_setToString-BieVKRad.js";import"./_getTag-BKZbvEh5.js";import"./isArrayLike-XyhmcoyG.js";import"./DropdownButton-CHbSInmF.js";import"./ActionIconToggle.component-DVWjbCCo.js";import"./Actions.component-BfJPOaLF.js";import"./FormControl-BrEQ5Q63.js";import"./flow-UbVhernv.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-KtrWqDsT.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
