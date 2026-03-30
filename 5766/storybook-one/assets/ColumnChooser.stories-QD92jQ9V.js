import{j as o,S as l}from"./iframe-CPxLBC5O.js";import{C as t}from"./ColumnChooser.component-BSsJUgbx.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-Dp501EUu.js";import"./index-CZMgmUn8.js";import"./index-CA1G-4Rb.js";import"./Action.component-D4r-jbCI.js";import"./ActionButton.component-C9hV4DYD.js";import"./TooltipTrigger.component-DTQC3xBu.js";import"./index-CNqTy3se.js";import"./CircularProgress.component-BhsKU7ot.js";import"./translate-Bh6O5sXJ.js";import"./withTranslation-Jim-bBZE.js";import"./Skeleton.component-EqeNPg_B.js";import"./index-deZpcOOS.js";import"./theme-CBfSNsEl.js";import"./OverlayTrigger.component-Biw8hDNM.js";import"./RootCloseWrapper-BJQPyziT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D4VIV8Qx.js";import"./Transition-C7NRlE02.js";import"./Transition-ECqydgiu.js";import"./ActionSplitDropdown.component-y0obZlLL.js";import"./SplitButton-dqnbmJth.js";import"./inheritsLoose-hQ-uK37r.js";import"./get-B6tCSfMU.js";import"./_baseGet-CBhhvZNo.js";import"./toString-haM-zpMe.js";import"./isSymbol-D7pS_NzT.js";import"./eq-DO5Ji_y7.js";import"./omit-DiwhPy9B.js";import"./_setToString-acJ9qpHd.js";import"./_getTag-DUouNTsr.js";import"./isArrayLike-DMZ1QFa6.js";import"./DropdownButton-KjeEryCO.js";import"./ActionIconToggle.component-Duiw98n4.js";import"./Actions.component-BMZVCL3R.js";import"./FormControl-_DXM38Nj.js";import"./flow-Bd8NL2rw.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BbCuTY9g.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
