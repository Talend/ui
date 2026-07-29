import{j as o,S as l}from"./iframe-CWCo7ykZ.js";import{C as t}from"./ColumnChooser.component-DHtGRGmM.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BDz4Tgah.js";import"./index-BNFJt_fi.js";import"./index-CNSBROrU.js";import"./Action.component-C2Pruoba.js";import"./ActionButton.component-SMqKQVu9.js";import"./TooltipTrigger.component-DsttEDpQ.js";import"./index-bKQTdL_z.js";import"./CircularProgress.component-CdPCIW2V.js";import"./translate-Bw3v2824.js";import"./withTranslation-DueXOWk5.js";import"./Skeleton.component-DCcxR7G4.js";import"./index-Be3RCHZG.js";import"./theme-Dwj7aUke.js";import"./OverlayTrigger.component-sKror3P-.js";import"./RootCloseWrapper-Dj7qYGOW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dn4Pc0td.js";import"./Transition-BytmYUSd.js";import"./Transition-BKhBmWtS.js";import"./ActionSplitDropdown.component-DjR-i4Sg.js";import"./SplitButton-CkNt02FD.js";import"./inheritsLoose-DxeIgX3i.js";import"./get-6XsBgkAQ.js";import"./_baseGet-sfRMLqfN.js";import"./toString-KZigM7OW.js";import"./isSymbol-BGGx6Z8n.js";import"./eq-DVyWNhDF.js";import"./omit-BnJVre6j.js";import"./_setToString-B42zykNw.js";import"./_getTag-fmLSluek.js";import"./isArrayLike-CDET1z1l.js";import"./DropdownButton-ljWWovtg.js";import"./ActionIconToggle.component-CNs1qSEA.js";import"./Actions.component-Bt2N73dW.js";import"./FormControl-EwXC_iOp.js";import"./flow-Cw8KOAtK.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-5usX9vNY.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
