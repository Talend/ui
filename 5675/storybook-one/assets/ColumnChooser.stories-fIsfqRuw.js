import{j as o,G as l}from"./iframe-tG6QAxGp.js";import{C as t}from"./ColumnChooser.component-BxpS5HVF.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-DwwOWTuM.js";import"./index-pACPjwMb.js";import"./index-D0Y12Ojj.js";import"./Action.component-XcQ2WTii.js";import"./ActionButton.component-CFI9Dawz.js";import"./TooltipTrigger.component-DPerC_fX.js";import"./index-CK4oWbr4.js";import"./CircularProgress.component--kEh-yrf.js";import"./translate-Dz4hh4kd.js";import"./withTranslation-CB2voPv-.js";import"./Skeleton.component-BsxZfoo7.js";import"./index-C4M67xWB.js";import"./theme-CbiPqX1n.js";import"./OverlayTrigger.component-DGPJQ8lB.js";import"./RootCloseWrapper-kKt8xs6O.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cj9NDUvU.js";import"./Transition-BOeWoA1S.js";import"./Transition-BXOwPJfR.js";import"./ActionSplitDropdown.component-6Mr2oZ_K.js";import"./SplitButton-CFNkqeLE.js";import"./inheritsLoose-Bj8HyUC0.js";import"./get-DE0l8-4q.js";import"./_baseGet-Dd0iB8L9.js";import"./toString-BG9c7NwH.js";import"./isSymbol-ytlJlBjl.js";import"./eq-D9WtH5Fn.js";import"./omit-CRo6-3gC.js";import"./_setToString-B2UnnL-D.js";import"./_getTag-OmseOmXH.js";import"./isArrayLike-DErJ5wjt.js";import"./DropdownButton-B81McBOZ.js";import"./ActionIconToggle.component-DNdEU90S.js";import"./Actions.component-BXy7cgFX.js";import"./FormControl-DA_zxNws.js";import"./flow-BxJY-UAk.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CbnUqvo4.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
