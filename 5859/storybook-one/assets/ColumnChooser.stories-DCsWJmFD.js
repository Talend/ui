import{j as o,S as l}from"./iframe-D-blrJ-o.js";import{C as t}from"./ColumnChooser.component-DAqd1NUw.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-DE7eQp7u.js";import"./index-CMr_3tio.js";import"./index-C1B4idi0.js";import"./Action.component-BBEYvhF1.js";import"./ActionButton.component-NL6_EwV_.js";import"./TooltipTrigger.component-DMbfnZpY.js";import"./index-lIvj0yXg.js";import"./CircularProgress.component-YCw1GpO-.js";import"./translate-cma22zhb.js";import"./withTranslation-C_HRI0RV.js";import"./Skeleton.component-CIGG43mj.js";import"./index-C8-AnYno.js";import"./theme-CAXbUl-6.js";import"./OverlayTrigger.component-CXTKhBbT.js";import"./RootCloseWrapper-RrEZAO_q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dwnv9pdF.js";import"./Transition-BDadDiAh.js";import"./Transition-B-69Sh4H.js";import"./ActionSplitDropdown.component-GCAMmQRB.js";import"./SplitButton-B9c5f5NT.js";import"./inheritsLoose-Dp07B8_F.js";import"./get-DhnSccqV.js";import"./_baseGet-NFp1u5HG.js";import"./toString-BTfYpm0t.js";import"./isSymbol-fqM6njwu.js";import"./eq-J4RZavgT.js";import"./omit-SqwbWo4S.js";import"./_setToString-Cp67bGf8.js";import"./_getTag-C64CVJ8L.js";import"./isArrayLike-CpbMogeV.js";import"./DropdownButton-BocLSqvv.js";import"./ActionIconToggle.component-C2V0JP5p.js";import"./Actions.component-BgzTKYXl.js";import"./FormControl-gRZx7gKT.js";import"./flow-D_LtrBcD.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-x5v5SKfU.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
