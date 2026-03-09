import{j as o,S as l}from"./iframe-ZOGeCSiy.js";import{C as t}from"./ColumnChooser.component-mgzn7NaQ.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-QR_FrQy9.js";import"./index-DjDIA258.js";import"./index-D4opw-Qz.js";import"./Action.component-B584f_uk.js";import"./ActionButton.component-eaoAlJUf.js";import"./TooltipTrigger.component-BLJRLllu.js";import"./index-DC843bAT.js";import"./CircularProgress.component-BrhcN_XO.js";import"./translate-C0eZGPcd.js";import"./withTranslation-D4TJQ1jV.js";import"./Skeleton.component-N7_eYc0h.js";import"./index-D_abBtzh.js";import"./theme-CE6R_YGz.js";import"./OverlayTrigger.component-BMlPJI7F.js";import"./RootCloseWrapper-TPLWA_tq.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DksHDv9A.js";import"./Transition-j6wf0nG1.js";import"./Transition-BVyFOmuZ.js";import"./ActionSplitDropdown.component-CXns4ixp.js";import"./SplitButton-DLiWLDF5.js";import"./inheritsLoose-B465Ji_I.js";import"./get-Bf-Kb1qt.js";import"./_baseGet-zdJDQGKY.js";import"./toString-CvgZXU79.js";import"./isSymbol-IdjUtDg4.js";import"./eq-lWQTG8BZ.js";import"./omit-ClkKedsP.js";import"./_setToString-DPVKMo3z.js";import"./_getTag-BhxNqYHo.js";import"./isArrayLike-Bympu03d.js";import"./DropdownButton-BWgznDww.js";import"./ActionIconToggle.component-DA-mj3wa.js";import"./Actions.component-Cuk-riaJ.js";import"./FormControl-CvOdIUvH.js";import"./flow-Df3g_bvf.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CH4CNeaX.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
