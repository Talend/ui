import{j as o,S as l}from"./iframe-DkvIbG8Q.js";import{C as t}from"./ColumnChooser.component-aJ-OMJ4_.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BqgWWcp2.js";import"./index-DhOzP4ZN.js";import"./index-BFECLTVI.js";import"./Action.component-Cj99rDFV.js";import"./ActionButton.component-DLGwg8lB.js";import"./TooltipTrigger.component-D-z0kzrA.js";import"./index-CCwBNUZZ.js";import"./CircularProgress.component-CmGs8O0d.js";import"./translate-C3GUxnFA.js";import"./withTranslation-BbBG3kQ2.js";import"./Skeleton.component-BNAusV71.js";import"./index-BaQN_8jc.js";import"./theme-tzHq6zkd.js";import"./OverlayTrigger.component-M36WnowO.js";import"./RootCloseWrapper-BLEQmdde.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-wUbaYJ_D.js";import"./Transition-DYZvbGmz.js";import"./Transition-BY4dpRbl.js";import"./ActionSplitDropdown.component-CE0dKYM3.js";import"./SplitButton-SmGvzDHr.js";import"./inheritsLoose-CjEx5Qvm.js";import"./get-Dp5Ox8Ui.js";import"./_baseGet-BtXGieak.js";import"./toString-zeZo6fT4.js";import"./isSymbol-MNwrRfGF.js";import"./eq-CM5aoTox.js";import"./omit-Dhz2bKop.js";import"./_setToString-CCQnyzvo.js";import"./_getTag-mrOIxYMu.js";import"./isArrayLike-CmVa1TF2.js";import"./DropdownButton-DwtiJR7b.js";import"./ActionIconToggle.component-C2wEvLGU.js";import"./Actions.component-kvWOB8Vc.js";import"./FormControl-vuFG0wga.js";import"./flow-auWSgwd4.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BT221WWI.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
