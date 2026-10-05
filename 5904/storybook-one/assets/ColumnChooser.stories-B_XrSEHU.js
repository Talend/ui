import{j as o,S as a}from"./iframe-BpHPnehy.js";import{C as t}from"./ColumnChooser.component-USs5pxcY.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-CO_2UUkb.js";import"./index-hWAFBLXC.js";import"./index-D098i322.js";import"./Action.component-Bem806fA.js";import"./ActionButton.component-Mqqkz04I.js";import"./TooltipTrigger.component-CTcUmZRa.js";import"./index-GeNoR4Be.js";import"./CircularProgress.component-CFmgaqkz.js";import"./translate-Nmgh_wQP.js";import"./withTranslation-COCjSCag.js";import"./Skeleton.component-BaRg1Dgr.js";import"./index-CP74lAEa.js";import"./theme-CjF-M1xI.js";import"./OverlayTrigger.component-CYkKPrYu.js";import"./RootCloseWrapper-CGX1yvw4.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DsCAXCWn.js";import"./Transition-CYGy_rvE.js";import"./Transition-DblCj8s-.js";import"./ActionSplitDropdown.component-D09ZIT4b.js";import"./SplitButton-DPm_QReI.js";import"./inheritsLoose-QOZuaEVW.js";import"./DropdownButton-xR9rB9iF.js";import"./ActionIconToggle.component-CuP-yQrL.js";import"./Actions.component-CpJ50iSx.js";import"./FormControl-D7HslIuq.js";import"./RichLayout.component-DtfKBeL1.js";const m="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",i={card:m,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:i.card,children:o.jsxs(a,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:i.card__header,children:e}),o.jsx("div",{className:i.card__body,children:r})]})})}const{action:l}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:l("submit")},q={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},s={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:l("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    title: 'Column chooser tooltip',
    description: 'Default mode with minimal props'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const G=["Default","CustomizeColumnChooser"];export{s as CustomizeColumnChooser,n as Default,G as __namedExportsOrder,q as default};
