import{j as o,S as l}from"./iframe-RgUw65v6.js";import{C as t}from"./ColumnChooser.component-75UED-al.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-Bz78C6ZV.js";import"./index-B67xqEzI.js";import"./index-CgHIEa6c.js";import"./Action.component-Cp3A882T.js";import"./ActionButton.component-DH_ewcRl.js";import"./TooltipTrigger.component-BQ9jb_NL.js";import"./index-CR3ImUN2.js";import"./CircularProgress.component-CvY4EAGe.js";import"./translate-CvJJhwK7.js";import"./withTranslation-Cd7UKj-O.js";import"./Skeleton.component-BuC7E58u.js";import"./index-DuKiuLaM.js";import"./theme-B84GjGRI.js";import"./OverlayTrigger.component-DR2heDsy.js";import"./RootCloseWrapper-C77L2t2N.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CQcdUi3P.js";import"./Transition-CBwaArrS.js";import"./Transition-BoXVcRNz.js";import"./ActionSplitDropdown.component-SzKI3P9o.js";import"./SplitButton-DU91hRTn.js";import"./inheritsLoose-DIMPQris.js";import"./get-vL3k2tsH.js";import"./_baseGet-Ba48x7nN.js";import"./toString-CN3eaBAU.js";import"./isSymbol-C2UyLp5U.js";import"./eq-BC1O3BWQ.js";import"./omit-BUCJM0J1.js";import"./_baseSlice-7jdVvZRa.js";import"./_getTag-C_TwGE6F.js";import"./isArrayLike-CE3xx7cU.js";import"./DropdownButton-v4xa8Tac.js";import"./ActionIconToggle.component-CJyf72RA.js";import"./Actions.component-Dgcz1iPH.js";import"./FormControl-Dio_vH7_.js";import"./flow-lbtaYPjp.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BaaY1pfG.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
