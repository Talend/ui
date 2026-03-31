import{j as o,S as l}from"./iframe-Dvowsd3O.js";import{C as t}from"./ColumnChooser.component-DZV4e3rl.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-C5rzR1Ac.js";import"./index-CoM7n3QQ.js";import"./index-try_3uGK.js";import"./Action.component-C0aZRgmw.js";import"./ActionButton.component-C1B7ptUs.js";import"./TooltipTrigger.component-CLY_2EJG.js";import"./index-Bium8SmC.js";import"./CircularProgress.component-CBV7f5M3.js";import"./translate-BDOAM9iE.js";import"./withTranslation-Diaz7TBZ.js";import"./Skeleton.component-B35syhI6.js";import"./index-C_dH7GD9.js";import"./theme-CcAT0CDp.js";import"./OverlayTrigger.component-BvS_G0w-.js";import"./RootCloseWrapper-Bs-3D2R6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CRALqaQN.js";import"./Transition-CuC7Ka_d.js";import"./Transition-BhPvHe6i.js";import"./ActionSplitDropdown.component-CmGbSFWG.js";import"./SplitButton-DEpKFwz4.js";import"./inheritsLoose-CsmMGUjM.js";import"./get-CmA6nBAh.js";import"./_baseGet-D2eDGu1E.js";import"./toString-8u18pFy3.js";import"./isSymbol-ByVRBfnc.js";import"./eq-CT5L5I4M.js";import"./omit-C4KfQ_-8.js";import"./_setToString-Ykk7KIXg.js";import"./_getTag-B24nJyzZ.js";import"./isArrayLike-Cq9vpx2B.js";import"./DropdownButton-B-GIYYt8.js";import"./ActionIconToggle.component-Cht7gJjW.js";import"./Actions.component-0d7NMU5I.js";import"./FormControl-S-bfsDrN.js";import"./flow-4FHFgt06.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-B9dw64M8.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
