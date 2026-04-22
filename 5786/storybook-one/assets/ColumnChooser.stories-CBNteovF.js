import{j as o,S as l}from"./iframe-Dh7VbQiA.js";import{C as t}from"./ColumnChooser.component-BzcvmNY0.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-6lfXJ8i6.js";import"./index-DVHYiiSR.js";import"./index-DxwQsrrp.js";import"./Action.component-bYYX-yG8.js";import"./ActionButton.component-CT33y5jt.js";import"./TooltipTrigger.component-CWGfWXze.js";import"./index-7CgzCUF8.js";import"./CircularProgress.component-BYyEV4F_.js";import"./translate-BGSUX0hC.js";import"./withTranslation-CcRbPA83.js";import"./Skeleton.component-DSr5GhCi.js";import"./index-Cq8HUum5.js";import"./theme-DybafV9H.js";import"./OverlayTrigger.component-pTo8-PwH.js";import"./RootCloseWrapper-CgM3JVZy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-q_n5B-Zf.js";import"./Transition-jOZTDWha.js";import"./Transition-D37FQ5H8.js";import"./ActionSplitDropdown.component-DNVnBd2g.js";import"./SplitButton-1fDE41bR.js";import"./inheritsLoose-CcK1r-La.js";import"./get-BZbnIL66.js";import"./_baseGet-HcE5cbRy.js";import"./toString-DfqiTAWZ.js";import"./isSymbol-BxSERxOF.js";import"./eq-DHjFRxjv.js";import"./omit-DG4IBbq5.js";import"./_setToString-CRSykUKT.js";import"./_getTag-BxTQTySV.js";import"./isArrayLike-xIqzFimc.js";import"./DropdownButton-BlrvHer1.js";import"./ActionIconToggle.component-DLpznuWB.js";import"./Actions.component-XK2YXxUy.js";import"./FormControl-BOLk7YIl.js";import"./flow-CoVB24n2.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-15NyWudN.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
