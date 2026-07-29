import{j as o,S as l}from"./iframe-CCJukFV9.js";import{C as t}from"./ColumnChooser.component-CRESLcZb.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-u4CNge3M.js";import"./index-BE91LA0v.js";import"./index-t7aijU2e.js";import"./Action.component-Bof1YKtH.js";import"./ActionButton.component-BKQGNbEN.js";import"./TooltipTrigger.component-Cnq3GBjF.js";import"./index-BlMUnjzq.js";import"./CircularProgress.component-C2nzsqjs.js";import"./translate-b0nMpzbF.js";import"./withTranslation-DabJI8tM.js";import"./Skeleton.component-Bnl4BRAs.js";import"./index-DyxS6wjv.js";import"./theme-CBRMcrR4.js";import"./OverlayTrigger.component-bL6bkZNr.js";import"./RootCloseWrapper-C9t6VUr3.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-AQKaqIhi.js";import"./Transition-6iivEj4B.js";import"./Transition-Cg7FHDIs.js";import"./ActionSplitDropdown.component-DjmX76hh.js";import"./SplitButton-CT5SZZbo.js";import"./inheritsLoose-KQuwg05W.js";import"./get-DnMG8Dka.js";import"./_baseGet-Bd9imoXi.js";import"./toString-0Ah1j7tI.js";import"./isSymbol-CYfdUlT-.js";import"./eq-BlvQFX-D.js";import"./omit-D4WBPx8x.js";import"./_setToString-B1_PfrWJ.js";import"./_getTag-fIDcIhm1.js";import"./isArrayLike-DzCCRrvG.js";import"./DropdownButton-CwrnM9H0.js";import"./ActionIconToggle.component-CrxOV61w.js";import"./Actions.component-Bclv0puA.js";import"./FormControl-Dhp2M8Q8.js";import"./flow-zgXAyb2y.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-snUuYijU.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
