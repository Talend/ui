import{j as o,H as l}from"./iframe-Bku7JZgU.js";import{C as t}from"./ColumnChooser.component-BVVgpqqF.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-Zu-7251y.js";import"./index-891GY3sP.js";import"./index-Di-3Xr6W.js";import"./Action.component-f22K0oPU.js";import"./ActionButton.component-CMeZjbf-.js";import"./TooltipTrigger.component-BnLMF6J9.js";import"./index-B13TKEVb.js";import"./CircularProgress.component-B9hHuwBj.js";import"./translate-DXNh9fd6.js";import"./withTranslation-aReN8xgw.js";import"./Skeleton.component-RdT2KIjN.js";import"./index-BjK5tyCZ.js";import"./theme-BgMxE0FJ.js";import"./OverlayTrigger.component-DirIAOXh.js";import"./RootCloseWrapper-Bh4junDo.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C6Yf2we-.js";import"./Transition-DW1p8owc.js";import"./Transition-CaUSRA9n.js";import"./ActionSplitDropdown.component-Bv_F7p_M.js";import"./SplitButton-IkMWlr2O.js";import"./inheritsLoose-dVvng6s0.js";import"./get-BzmuSdje.js";import"./_baseGet-CJbCI7UD.js";import"./toString-DZHUkWgu.js";import"./isSymbol-D6QjNeiz.js";import"./eq-BwtgxKt8.js";import"./omit-BiIXUGxm.js";import"./_setToString-CWaqJpnQ.js";import"./_getTag-D590vccR.js";import"./isArrayLike-mbD1yk1N.js";import"./DropdownButton-CNEGZRhy.js";import"./ActionIconToggle.component-BoA2YxwX.js";import"./Actions.component-C-q7QR_q.js";import"./FormControl-paT9InVY.js";import"./flow-BrZ8acCi.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BhLUG2Rp.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
