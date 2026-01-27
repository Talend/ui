import{j as o,G as l}from"./iframe-BeUrxS75.js";import{C as t}from"./ColumnChooser.component-IaeTEiYp.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BWsym7Ob.js";import"./index-D7D6o1tc.js";import"./index-Dv9bXkj0.js";import"./Action.component-B81spSf8.js";import"./ActionButton.component-DztB4VBb.js";import"./TooltipTrigger.component-BN0CMt2Y.js";import"./index-tLR6j0ax.js";import"./CircularProgress.component-D90Gv8Ln.js";import"./translate-BhDR11Ia.js";import"./withTranslation-BMw-xhsf.js";import"./Skeleton.component-Doa5RG4V.js";import"./index-D3gJW--R.js";import"./theme-ByAIAit0.js";import"./OverlayTrigger.component-CXa1QDao.js";import"./RootCloseWrapper-Dkb2rwuc.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C_DxvxFJ.js";import"./Transition-DsLtkSnW.js";import"./Transition-CVbE3JtA.js";import"./ActionSplitDropdown.component-DagaBzcf.js";import"./SplitButton-BHzI4c9u.js";import"./inheritsLoose-CtV3E512.js";import"./get-Da1hbhWf.js";import"./_baseGet-BYPC0Nrw.js";import"./toString-COATutRb.js";import"./isSymbol-BqqTSgov.js";import"./eq-VoAmlW1Q.js";import"./omit-CUjb5z2T.js";import"./_setToString-CzatqGiI.js";import"./_getTag-D-QJwtlC.js";import"./isArrayLike-RX78eRsG.js";import"./DropdownButton-CYyElzZX.js";import"./ActionIconToggle.component-Nz6Gc9hj.js";import"./Actions.component-CJmufm-4.js";import"./FormControl-IK8vEV3N.js";import"./flow-B8zSWCrk.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-Cj1c1ESN.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
