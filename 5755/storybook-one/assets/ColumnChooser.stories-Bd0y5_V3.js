import{j as o,S as l}from"./iframe-gYF_G_fE.js";import{C as t}from"./ColumnChooser.component-BvroVgzL.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BktELNW-.js";import"./index-B4AlwF7Q.js";import"./index-FoHZtXG_.js";import"./Action.component-Br0NjqE0.js";import"./ActionButton.component-BEPjXJOh.js";import"./TooltipTrigger.component-Cq3j2j1T.js";import"./index-BvzjzKmP.js";import"./CircularProgress.component-DVjiN9Cy.js";import"./translate-CqNlcqFg.js";import"./withTranslation-b-d2pe2u.js";import"./Skeleton.component-3xVHTWN3.js";import"./index-fhOEXeee.js";import"./theme-BVcRJK3s.js";import"./OverlayTrigger.component-B6dmMou1.js";import"./RootCloseWrapper-xrEj3CJP.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cs4fQJvl.js";import"./Transition-fVWzjx8U.js";import"./Transition-6GZi0dnD.js";import"./ActionSplitDropdown.component-Bp4zP5Ce.js";import"./SplitButton-CStUta-K.js";import"./inheritsLoose-VTIw4njF.js";import"./get-BVX_P4PF.js";import"./_baseGet-BpHqkg2j.js";import"./toString-KzU2lKBf.js";import"./isSymbol-DWn58mtK.js";import"./eq-CXZE_YOC.js";import"./omit-BYAik5n-.js";import"./_setToString-Bft5b4bW.js";import"./_getTag-CtJ5ewXi.js";import"./isArrayLike-DL1Iy8XB.js";import"./DropdownButton-D06ht9G5.js";import"./ActionIconToggle.component-BFP8ry7f.js";import"./Actions.component-DVRRfGwT.js";import"./FormControl-hedQzAB6.js";import"./flow-BzEvBD2B.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-XeAqThYJ.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
