import{j as o,S as a}from"./iframe-SKm5afGR.js";import{C as t}from"./ColumnChooser.component-CUZhy8Bw.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-B5naiSTw.js";import"./index-BFCNDHHq.js";import"./index-Cvl8y4P7.js";import"./Action.component-DmzN_EWn.js";import"./ActionButton.component-CmjmCagI.js";import"./TooltipTrigger.component-DQg3YoHy.js";import"./index-CPW3g4LR.js";import"./CircularProgress.component-DIb9Hk7L.js";import"./translate-CEiihR1l.js";import"./withTranslation-CU-bJQye.js";import"./Skeleton.component-TmQiub_B.js";import"./index-v4RqFekH.js";import"./theme-7OSfQ_Pi.js";import"./OverlayTrigger.component-Bos5hxc-.js";import"./RootCloseWrapper-CZqf_b6r.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C-ecfSAo.js";import"./Transition-CfDEhTwS.js";import"./Transition-BbNCJNUs.js";import"./ActionSplitDropdown.component-BL_7AD4x.js";import"./SplitButton-DsxUKcrb.js";import"./inheritsLoose-DzhaYN07.js";import"./DropdownButton-B1nQqDKW.js";import"./ActionIconToggle.component-BUXRR5Yy.js";import"./Actions.component-ClmXVcty.js";import"./FormControl-Bv1Mx5bg.js";import"./RichLayout.component-DEluxDAP.js";const m="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",i={card:m,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:i.card,children:o.jsxs(a,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:i.card__header,children:e}),o.jsx("div",{className:i.card__body,children:r})]})})}const{action:l}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:l("submit")},q={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},s={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:l("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
