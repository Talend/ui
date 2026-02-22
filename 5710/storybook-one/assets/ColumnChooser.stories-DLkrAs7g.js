import{j as o,S as l}from"./iframe-CBPnIo_q.js";import{C as t}from"./ColumnChooser.component-DNghvcnU.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BSdUTNk1.js";import"./index-BdLiaVGG.js";import"./index-D_5c2Ser.js";import"./Action.component-hAWodN4y.js";import"./ActionButton.component-BQADwHW4.js";import"./TooltipTrigger.component-B7TCfnSH.js";import"./index-CWrd71Ec.js";import"./CircularProgress.component-CyfyM4xX.js";import"./translate-Bth8mwBJ.js";import"./withTranslation-C5wfFNmc.js";import"./Skeleton.component-BxeqfJ89.js";import"./index-Dvwmyln6.js";import"./theme-DjWxLJoY.js";import"./OverlayTrigger.component-C_ZmJESS.js";import"./RootCloseWrapper-u9EmCT3r.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-YuUD0WGQ.js";import"./Transition-B5pnczL5.js";import"./Transition-CIj1qIVq.js";import"./ActionSplitDropdown.component-CGv72myh.js";import"./SplitButton-ClPxxiTL.js";import"./inheritsLoose-D4zmiq0K.js";import"./get-BBk9fHjl.js";import"./_baseGet-Cc2vc2LS.js";import"./toString-VLAAfG_f.js";import"./isSymbol-CRdirWIJ.js";import"./eq-Bg_GhI-V.js";import"./omit-CaydZ5de.js";import"./_baseSlice-BHEWSlEw.js";import"./_getTag-DFlPA5Nn.js";import"./isArrayLike-DD_KOnF7.js";import"./DropdownButton-TUJqehJ9.js";import"./ActionIconToggle.component-PynEp8OQ.js";import"./Actions.component-DKD2ljSi.js";import"./FormControl-C3isOPv8.js";import"./flow-CnazJX0F.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CjZHWsbQ.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
