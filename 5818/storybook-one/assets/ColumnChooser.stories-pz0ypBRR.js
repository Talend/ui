import{j as o,S as l}from"./iframe-B103sUzx.js";import{C as t}from"./ColumnChooser.component-BW1ef09v.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-C5fEGlkN.js";import"./index-eqt-FPXJ.js";import"./index-BIvLFC97.js";import"./Action.component-BDIYEnlq.js";import"./ActionButton.component-Cki9NuM7.js";import"./TooltipTrigger.component-eMxhJlz6.js";import"./index-C4709orZ.js";import"./CircularProgress.component-j-bZtT2W.js";import"./translate-DRtMcB2y.js";import"./withTranslation-DYpnLnCb.js";import"./Skeleton.component-C35wTHLT.js";import"./index-DrLLf3GQ.js";import"./theme-Dr1j5G3A.js";import"./OverlayTrigger.component-kXR6qFfE.js";import"./RootCloseWrapper-BW1yOe35.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C1q8tzmP.js";import"./Transition-DeMFB2kt.js";import"./Transition-7OQpZWg0.js";import"./ActionSplitDropdown.component-DiHrIQ44.js";import"./SplitButton-Owc9Psca.js";import"./inheritsLoose-DUOmUqbJ.js";import"./get-CLIt06rP.js";import"./_baseGet-DJW8rzEv.js";import"./toString-DhzgJs-I.js";import"./isSymbol-CzF2uldG.js";import"./eq-BLBaq9xX.js";import"./omit-BvPeIEf8.js";import"./_setToString-Dh8TuV2C.js";import"./_getTag-CnFAYsTL.js";import"./isArrayLike-DpKYGo6T.js";import"./DropdownButton-nPhOik_8.js";import"./ActionIconToggle.component-DorkGkiF.js";import"./Actions.component-BDXhs-py.js";import"./FormControl-BLBST-pB.js";import"./flow-__XfNZbl.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CeC8cE_w.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
