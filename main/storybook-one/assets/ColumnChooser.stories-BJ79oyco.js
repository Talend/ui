import{j as o,S as l}from"./iframe-DlMK_tMs.js";import{C as t}from"./ColumnChooser.component-CyYXq79b.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-BMHebZi7.js";import"./index-CFWFA5zl.js";import"./index-DxjytvOx.js";import"./Action.component-Ouasy6Al.js";import"./ActionButton.component-Ba05ipJv.js";import"./TooltipTrigger.component-DbCWo6Zj.js";import"./index-WK3eFADS.js";import"./CircularProgress.component-D7-fLMeg.js";import"./translate-CY-1uK8d.js";import"./withTranslation-BekHgTlQ.js";import"./Skeleton.component-DYENtng-.js";import"./index-BGuVaVyo.js";import"./theme-x0vFkEBD.js";import"./OverlayTrigger.component-dMRK9Eza.js";import"./RootCloseWrapper-VUYpQ_iy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BOMoGmND.js";import"./Transition-BAAHxMmu.js";import"./Transition-Bwg4AJ7-.js";import"./ActionSplitDropdown.component-Ey5FgJmX.js";import"./SplitButton-M7GPhNq-.js";import"./inheritsLoose-CEEHa28p.js";import"./get-knGTTJ1Y.js";import"./_baseGet-BU2gbPiL.js";import"./toString-z5yAz4Kc.js";import"./isSymbol-DxHDIK51.js";import"./eq-BA7cxji8.js";import"./omit-DiQ6RqWN.js";import"./_setToString-DHWUAJp0.js";import"./_getTag-IzvHci0T.js";import"./isArrayLike-C0maW25Q.js";import"./DropdownButton-wWeHP7JV.js";import"./ActionIconToggle.component-CEt791Te.js";import"./Actions.component-0q7KjchE.js";import"./FormControl-Bt6UWJyQ.js";import"./flow-vGytfXq1.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BtyX8b3I.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
