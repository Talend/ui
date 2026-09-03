import{j as o,S as l}from"./iframe-DqLkcC_p.js";import{C as t}from"./ColumnChooser.component-B7QhlEAE.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-eTVXKhak.js";import"./index-CkgPXoh5.js";import"./index-0vUrjiOI.js";import"./Action.component-DkyyyqGT.js";import"./ActionButton.component-Wc-xjWvy.js";import"./TooltipTrigger.component-DXvai9iq.js";import"./index-B_XRYfHm.js";import"./CircularProgress.component-DM42CpaE.js";import"./translate-upENKyO0.js";import"./withTranslation-CYrWQw4j.js";import"./Skeleton.component-DQmp7pSm.js";import"./index-CUULivym.js";import"./theme-BzAhr63g.js";import"./OverlayTrigger.component-mBiihvas.js";import"./RootCloseWrapper-CC0YbW_h.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BvmvrUKA.js";import"./Transition-oL0du4tN.js";import"./Transition-7_MjOcbp.js";import"./ActionSplitDropdown.component-6Eg8-CVw.js";import"./SplitButton-D-EhJxF1.js";import"./inheritsLoose-D2z94f4h.js";import"./get-vLCTdp9T.js";import"./_baseGet-CqLo12ra.js";import"./toString-XRfePjwx.js";import"./isSymbol-8uZDi99P.js";import"./eq-B-n9oN1f.js";import"./omit-D7Y82oir.js";import"./_setToString-BmXcwbXv.js";import"./_getTag-Cga9V7T2.js";import"./isArrayLike-FDbjKheZ.js";import"./DropdownButton-CIcEgCrn.js";import"./ActionIconToggle.component-dK31r8s6.js";import"./Actions.component-CKq_M3Nf.js";import"./FormControl-BVXJQM38.js";import"./flow-9bqbZM_h.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-C5WPb6wD.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
