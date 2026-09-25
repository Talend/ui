import{j as o,S as a}from"./iframe-lQ44fTGe.js";import{C as t}from"./ColumnChooser.component-BjPhU6Un.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-DyHMC1xL.js";import"./index-wzUCG6-_.js";import"./index-B-Vq2RNM.js";import"./Action.component-N8xjpJ_p.js";import"./ActionButton.component-BClGrjnm.js";import"./TooltipTrigger.component-Duk_2u5K.js";import"./index-DqGt5Jo4.js";import"./CircularProgress.component-D7mRoxfk.js";import"./translate-CGqwdWwP.js";import"./withTranslation-biIfzT2x.js";import"./Skeleton.component-tJ4YQp1k.js";import"./index-DdpITWU_.js";import"./theme-xS0kuK8t.js";import"./OverlayTrigger.component-eTGnFngT.js";import"./RootCloseWrapper-Cy3quzkX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CYnO1wAH.js";import"./Transition-vRcfIWOw.js";import"./Transition-CRtzAhLI.js";import"./ActionSplitDropdown.component-DAF2W308.js";import"./SplitButton-D9GOV_Hi.js";import"./inheritsLoose-D5tT8USs.js";import"./DropdownButton-CmCbMl8z.js";import"./ActionIconToggle.component-BcRAM3GP.js";import"./Actions.component-mKcCz_b9.js";import"./FormControl-URo5gefE.js";import"./RichLayout.component-B-wMZUS9.js";const m="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",i={card:m,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:i.card,children:o.jsxs(a,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:i.card__header,children:e}),o.jsx("div",{className:i.card__body,children:r})]})})}const{action:l}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:l("submit")},q={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},s={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:l("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    title: 'Column chooser tooltip',
    description: 'Default mode with minimal props'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const G=["Default","CustomizeColumnChooser"];export{s as CustomizeColumnChooser,n as Default,G as __namedExportsOrder,q as default};
