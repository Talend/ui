import{j as o,H as l}from"./iframe-BrV_C0lS.js";import{C as t}from"./ColumnChooser.component-BE_TbFUy.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-C6zDcOXS.js";import"./index-IKeAoPW3.js";import"./index-BGPWKf8_.js";import"./Action.component-Bd2ry1Cm.js";import"./ActionButton.component-CX64OOwE.js";import"./TooltipTrigger.component-xTn3JdoU.js";import"./index-CyLLb8ny.js";import"./CircularProgress.component-BGG8ERnA.js";import"./translate-DHfPBvmz.js";import"./withTranslation-B0EdGgI2.js";import"./Skeleton.component-NhDgtDmF.js";import"./index-D7vK3zVi.js";import"./theme-COWgiA41.js";import"./OverlayTrigger.component-BFqpcy8S.js";import"./RootCloseWrapper-Cplz5Qvz.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CWstWGjk.js";import"./Transition-C2lqVYsH.js";import"./Transition-DEWbpGS1.js";import"./ActionSplitDropdown.component-uVrYiVkr.js";import"./SplitButton-CEU47wFB.js";import"./inheritsLoose-Cwo6rj-Z.js";import"./get-D6yb22gy.js";import"./_baseGet-BarmkZqE.js";import"./toString-EHNBcK8R.js";import"./isSymbol-B-O5EbbU.js";import"./eq-CESIMbK6.js";import"./omit-DwXSrYJI.js";import"./_setToString-Dc5lN5s8.js";import"./_getTag-DKk3ktNN.js";import"./isArrayLike-Dz6u7zkv.js";import"./DropdownButton-BkqPs7DL.js";import"./ActionIconToggle.component-Tr4QZC5x.js";import"./Actions.component-CqTL0dCk.js";import"./FormControl-BLne0qcV.js";import"./flow-B9xawp-E.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-DlbriAiY.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
