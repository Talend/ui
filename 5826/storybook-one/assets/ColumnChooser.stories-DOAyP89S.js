import{j as o,S as l}from"./iframe-DfdifOwL.js";import{C as t}from"./ColumnChooser.component-CrSkcxY2.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-8WiFabzF.js";import"./index-CKJuRNYr.js";import"./index-Cu2CbqNH.js";import"./Action.component-BR9S43mM.js";import"./ActionButton.component-UYOJvcYX.js";import"./TooltipTrigger.component-BJTpyXDt.js";import"./index-QfL4wXG6.js";import"./CircularProgress.component-OrLWawc-.js";import"./translate-CHxtV6I3.js";import"./withTranslation-DAWSAIvR.js";import"./Skeleton.component-D7SwgdCx.js";import"./index-CanZ0F1o.js";import"./theme-pB6coKgW.js";import"./OverlayTrigger.component-CS_vSBul.js";import"./RootCloseWrapper-BMMhQz6K.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpAJlHQX.js";import"./Transition-CSYT3GvG.js";import"./Transition-BVdSZFdr.js";import"./ActionSplitDropdown.component-GVbhWc-F.js";import"./SplitButton-BsAqQBPt.js";import"./inheritsLoose-CAyfXZxb.js";import"./get-DxznK-f3.js";import"./_baseGet-Cukhu6FA.js";import"./toString-Cgya6l1E.js";import"./isSymbol-ANBliHla.js";import"./eq-B-mHujBy.js";import"./omit-kelfQUT-.js";import"./_setToString-C6PbTfIV.js";import"./_getTag-D_AG95qx.js";import"./isArrayLike-D7EC_x23.js";import"./DropdownButton-BYW7Gel0.js";import"./ActionIconToggle.component-cEVyz_R_.js";import"./Actions.component-BsaIdXnV.js";import"./FormControl-BAnTVIuv.js";import"./flow-BzCRSIqh.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-Bf7uwyJL.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
