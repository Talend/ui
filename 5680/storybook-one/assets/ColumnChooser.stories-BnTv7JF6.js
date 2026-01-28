import{j as o,S as l}from"./iframe-BIQdka0S.js";import{C as t}from"./ColumnChooser.component-Dv6_d2mc.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BOeFLDFX.js";import"./index-CI26bWZ5.js";import"./index-4WOAe8Hp.js";import"./Action.component-DlN2FB-s.js";import"./ActionButton.component-BsTHLteF.js";import"./TooltipTrigger.component-D98QtRbU.js";import"./index-D2ql4zSJ.js";import"./CircularProgress.component-CDahmhUX.js";import"./translate-RgWSvZcG.js";import"./withTranslation-C0c3WAs5.js";import"./Skeleton.component-CvIHnOft.js";import"./index-BmiDGyXa.js";import"./theme-cRIqY071.js";import"./OverlayTrigger.component-BEmr1R_L.js";import"./RootCloseWrapper-BE9og5Xq.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DqMnblOM.js";import"./Transition-aWEt4ZNO.js";import"./Transition-CZ1LJOWj.js";import"./ActionSplitDropdown.component-YHa9OEXZ.js";import"./SplitButton-CQzMX6Mi.js";import"./inheritsLoose-BbyS8huE.js";import"./get-33mJQZqf.js";import"./_baseGet-DNbipbyJ.js";import"./toString-BqfwYfrR.js";import"./isSymbol-dumj61Kg.js";import"./eq-GFeXzubR.js";import"./omit-BJGUYW0v.js";import"./_baseSlice-C8dPXsaR.js";import"./_getTag-KdA_BnLc.js";import"./isArrayLike-C7prZ4fa.js";import"./DropdownButton-tYa3qFM7.js";import"./ActionIconToggle.component-BGI0SNww.js";import"./Actions.component-BlWGLWfC.js";import"./FormControl-DYDzYlf_.js";import"./flow-CQchxf0D.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-OvxeCe_t.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
