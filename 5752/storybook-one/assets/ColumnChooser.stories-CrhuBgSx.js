import{j as o,S as l}from"./iframe-Do9MkTTB.js";import{C as t}from"./ColumnChooser.component-B1U8nFPo.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-aYFxkG3m.js";import"./index-Bf7Dc89O.js";import"./index-InRK0CWC.js";import"./Action.component-B4OSEy6m.js";import"./ActionButton.component-2llTRVLN.js";import"./TooltipTrigger.component-BZ6GrODe.js";import"./index-BqJQNhAi.js";import"./CircularProgress.component-CZS3CNAl.js";import"./translate-Da30Cq5o.js";import"./withTranslation-DpYoDMdS.js";import"./Skeleton.component-CSSMiQZZ.js";import"./index-DmoB33Vx.js";import"./theme-DqWGs9jL.js";import"./OverlayTrigger.component-BSeuuoqm.js";import"./RootCloseWrapper-CmuOVIHm.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CnM3wOZM.js";import"./Transition-DzSe8eVs.js";import"./Transition-CDdRDE4G.js";import"./ActionSplitDropdown.component-B2j4EuU_.js";import"./SplitButton-CnIs2fxo.js";import"./inheritsLoose-Boj-Odam.js";import"./get-CEgWO4ky.js";import"./_baseGet-jYYCWLwL.js";import"./toString-DSXExHZS.js";import"./isSymbol-Bx5lGEtt.js";import"./eq-Bq5QjZni.js";import"./omit-hj1fVQf8.js";import"./_setToString-DY7q7weI.js";import"./_getTag-CwuLMQhN.js";import"./isArrayLike-ZUl_Fg1l.js";import"./DropdownButton-Ck-fuHum.js";import"./ActionIconToggle.component-DUJO9ftK.js";import"./Actions.component-Sj5L0N-t.js";import"./FormControl-BPIzZtw8.js";import"./flow-BMyIphqs.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-BtB72F_H.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
