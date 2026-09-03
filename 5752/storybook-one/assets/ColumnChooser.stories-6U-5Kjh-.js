import{j as o,S as l}from"./iframe-iRAzPMY8.js";import{C as t}from"./ColumnChooser.component-BDR-RAYH.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-CJc7HKiM.js";import"./index-BH54s8PQ.js";import"./index-DyHyJTev.js";import"./Action.component-TvI6aE1g.js";import"./ActionButton.component-C-MA_r8j.js";import"./TooltipTrigger.component-Bb4l9GJn.js";import"./index-DtBEJcaV.js";import"./CircularProgress.component-hAIB16uf.js";import"./translate-CXTmblci.js";import"./withTranslation-BNHcusKW.js";import"./Skeleton.component-fiKEWpb3.js";import"./index-CoeS2ufb.js";import"./theme-DkX-pT0S.js";import"./OverlayTrigger.component-CaaWVcUe.js";import"./RootCloseWrapper-BdzZZqCI.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_KIwtImD.js";import"./Transition-DjCDrLBR.js";import"./Transition-BYvXW3PW.js";import"./ActionSplitDropdown.component-Lbw5668r.js";import"./SplitButton-COJ8E7lV.js";import"./inheritsLoose-C51erBbc.js";import"./get-DAUq65Xs.js";import"./_baseGet-BAYfqDfh.js";import"./toString-Uaq3eq9r.js";import"./isSymbol-oj_-vwa9.js";import"./eq-CC2vorwN.js";import"./omit-CS6P3RiW.js";import"./_setToString-CLXxGEHx.js";import"./_getTag-5V2N-G3f.js";import"./isArrayLike-CJa-2peo.js";import"./DropdownButton-5DS6nl8l.js";import"./ActionIconToggle.component-Dep-paU3.js";import"./Actions.component-BSmuIAS6.js";import"./FormControl-BqwKqwwU.js";import"./flow-swDRAsw7.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-afFbIVJB.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
