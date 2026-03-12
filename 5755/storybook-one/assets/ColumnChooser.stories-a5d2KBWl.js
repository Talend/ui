import{j as o,S as l}from"./iframe-CytCQUUU.js";import{C as t}from"./ColumnChooser.component-J6tlVQZP.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-Cn9dGrX6.js";import"./index-DKn75FDV.js";import"./index-cNE3O2_I.js";import"./Action.component-ekpn42YI.js";import"./ActionButton.component-BSdI9gBs.js";import"./TooltipTrigger.component-DsvBKGWh.js";import"./index-BgEi0J4W.js";import"./CircularProgress.component-DBKZ5Q5B.js";import"./translate-BkaTgoLM.js";import"./withTranslation-CIBsQi2s.js";import"./Skeleton.component-DzFxn6fU.js";import"./index-D2jelG_f.js";import"./theme-D1CUrmcp.js";import"./OverlayTrigger.component-xINK76-b.js";import"./RootCloseWrapper-BaBSAX3p.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CAbvDgto.js";import"./Transition-Q4C-KkOJ.js";import"./Transition-Day0ijEo.js";import"./ActionSplitDropdown.component-CVYfZxbu.js";import"./SplitButton-kf-kJbI2.js";import"./inheritsLoose-BV6Y_Ibl.js";import"./get-CB4XSzUF.js";import"./_baseGet-D0GTZWOD.js";import"./toString-ccGXZRQ0.js";import"./isSymbol-Dk4nAFFy.js";import"./eq-DB1Y3wb4.js";import"./omit-Chj7wRCG.js";import"./_setToString-ivLDk9y1.js";import"./_getTag-CBkgzLJu.js";import"./isArrayLike-B9AHzHAl.js";import"./DropdownButton-C7yqK0ME.js";import"./ActionIconToggle.component-CHvirMom.js";import"./Actions.component-BDo1cuIa.js";import"./FormControl-fJrULau_.js";import"./flow-C-dwXG23.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-EUCplpKN.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
