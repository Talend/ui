import{j as o,S as l}from"./iframe-DX09XFlY.js";import{C as t}from"./ColumnChooser.component-C74jPAGb.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-CAOZ5xVL.js";import"./index-PI8_0Jed.js";import"./index-Q5e0ObXA.js";import"./Action.component-DSWSo5-6.js";import"./ActionButton.component-B8bAVOqx.js";import"./TooltipTrigger.component-DulIapz4.js";import"./index-ZHgZhXnL.js";import"./CircularProgress.component-DofxFAli.js";import"./translate-BxxfymuE.js";import"./withTranslation-hLMNO8CV.js";import"./Skeleton.component-BRSGPXFA.js";import"./index-B1R-hQ9g.js";import"./theme-BGUpvL97.js";import"./OverlayTrigger.component-DESIT7U0.js";import"./RootCloseWrapper-Dc0PA1K_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BGPwe-mJ.js";import"./Transition-Ngvp1HON.js";import"./Transition-D_GUK25g.js";import"./ActionSplitDropdown.component-CL7O_5P9.js";import"./SplitButton-3-OuN36h.js";import"./inheritsLoose-HOQlhI9f.js";import"./get-Yr5cAmls.js";import"./_baseGet-DuPL4aBk.js";import"./toString-BJhpRwnP.js";import"./isSymbol-BoPaXQfS.js";import"./eq-CsKuJzwX.js";import"./omit-C-nlpjth.js";import"./_setToString-BHWVSFsC.js";import"./_getTag-fz8XCwtg.js";import"./isArrayLike-CglDIL7U.js";import"./DropdownButton-DtdIlehY.js";import"./ActionIconToggle.component-M6OVIFAm.js";import"./Actions.component-BD52avh_.js";import"./FormControl-DnYt393u.js";import"./flow-DDIdDCrP.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-C6NKe0M9.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
