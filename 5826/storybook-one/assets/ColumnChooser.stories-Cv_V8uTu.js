import{j as o,S as l}from"./iframe-DQgfJw67.js";import{C as t}from"./ColumnChooser.component-CWlBxT1-.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-B6wiySt0.js";import"./index-qFWW23ar.js";import"./index-BVrDfkW_.js";import"./Action.component-CmH1MtAx.js";import"./ActionButton.component-AsICv5PP.js";import"./TooltipTrigger.component-B8TTpdzm.js";import"./index-DrrsYP9K.js";import"./CircularProgress.component-lrWQ3-22.js";import"./translate-DiI_Es12.js";import"./withTranslation-5PR4BJ6-.js";import"./Skeleton.component-DZyar7PT.js";import"./index-CncI1Mj4.js";import"./theme-DI8-UJzN.js";import"./OverlayTrigger.component-BVf8SOUy.js";import"./RootCloseWrapper-BV5D6_Gk.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-sVDanUzs.js";import"./Transition-DmNqRhFd.js";import"./Transition-C453gXLR.js";import"./ActionSplitDropdown.component-BSp9Na7X.js";import"./SplitButton-CEa8ibQT.js";import"./inheritsLoose-Dv8TIbRQ.js";import"./get-ClAVEm52.js";import"./_baseGet-CUFEkqTw.js";import"./toString-DozcUBT0.js";import"./isSymbol-CVtcgdPj.js";import"./eq-DGfcdYR8.js";import"./omit-ejUvHiJ5.js";import"./_setToString-DxntCt01.js";import"./_getTag-DVBlZYjA.js";import"./isArrayLike-CLJp57Ut.js";import"./DropdownButton-pzd5K3ei.js";import"./ActionIconToggle.component-B0-5UtJT.js";import"./Actions.component-rBGQUexS.js";import"./FormControl--5by1CiO.js";import"./flow-CrkVpmU9.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CKPyMIHv.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
