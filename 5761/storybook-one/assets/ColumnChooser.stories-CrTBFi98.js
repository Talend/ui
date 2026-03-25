import{j as o,S as l}from"./iframe-B4qnySQT.js";import{C as t}from"./ColumnChooser.component-r1OdHP73.js";import"./preload-helper-PPVm8Dsz.js";import"./constants-CZYEPhht.js";import"./FilterBar.component-DSoxVV9c.js";import"./index-D92zvz-z.js";import"./index-hRl7hB-F.js";import"./Action.component-BWlBSARz.js";import"./ActionButton.component-mis2utRY.js";import"./TooltipTrigger.component-xiHfIBBM.js";import"./index-DgGM3Yga.js";import"./CircularProgress.component-yuuTg9Ca.js";import"./translate-D3JO2TfR.js";import"./withTranslation-BqFrxFwI.js";import"./Skeleton.component-BYVSqbiw.js";import"./index-DPNAW96s.js";import"./theme-B-Y9eRaQ.js";import"./OverlayTrigger.component-D8Yj_q1l.js";import"./RootCloseWrapper-DDohZBZW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B2Cn2r-I.js";import"./Transition-DqVzSKkG.js";import"./Transition-DmEinDrA.js";import"./ActionSplitDropdown.component-BNYNsOCp.js";import"./SplitButton-CHoaJRzX.js";import"./inheritsLoose-DhlgcSQA.js";import"./get-Cp5WvLx4.js";import"./_baseGet-Ca_R9usK.js";import"./toString-BY9RXH1D.js";import"./isSymbol-DcRtttP9.js";import"./eq-B6WRamrM.js";import"./omit-muK3dr0k.js";import"./_setToString-B4bSgU0r.js";import"./_getTag-Dd-sPh7z.js";import"./isArrayLike-DbsxgW-k.js";import"./DropdownButton-DxeyHX32.js";import"./ActionIconToggle.component-C1qDwjv-.js";import"./Actions.component-XoFBT-WO.js";import"./FormControl-CzIDF4CA.js";import"./flow-DmanciuH.js";import"./noop-BdyXNs-O.js";import"./RichLayout.component-CgjDXhvB.js";const a="_card_1gl2g_1",d="_card__header_1gl2g_9",c="_card__body_1gl2g_10",s={card:a,card__header:d,card__body:c};function p({header:e,children:r}){return o.jsx("div",{className:s.card,children:o.jsxs(l,{gap:"L",alignContent:"center",children:[e&&o.jsx("header",{className:s.card__header,children:e}),o.jsx("div",{className:s.card__body,children:r})]})})}const{action:m}=__STORYBOOK_MODULE_ACTIONS__,u=[{key:"id",label:"Id",order:1},{key:"name",label:"Name",order:2},{key:"author",label:"Author",order:3},{key:"created",label:"Created",order:6},{key:"modified",label:"Very long name long name long name long name long name",order:4,header:"icon",data:{iconName:"talend-scheduler"}},{key:"icon",label:"Icon",hidden:!0,order:5,locked:!0}],h={columnsFromList:u,nbLockedLeftItems:2,id:"default-column-chooser",onSubmit:m("submit")},to={title:"Components/List/Column Chooser",render:e=>o.jsx(t,{...h,...e}),decorators:[(e,{parameters:r})=>o.jsxs("div",{children:[o.jsx("h1",{children:r?.title}),o.jsx("p",{children:r?.description}),o.jsx("div",{style:{width:"31.25rem",height:"31.25rem"},children:o.jsx(p,{children:o.jsx(e,{})})})]})]},n={parameters:{title:"Column chooser tooltip",description:"Default mode with minimal props"}},i={parameters:{title:"Column chooser tooltip",description:"You can provide and compose some of the column chooser part."},args:{children:o.jsxs(o.Fragment,{children:[o.jsxs(t.Header,{children:[o.jsx("span",{children:"Hello world"}),o.jsx("button",{style:{marginLeft:"200px"},children:"My Button"})]}),o.jsx(t.Body,{children:e=>e.map(r=>o.jsx("div",{children:o.jsxs(t.Body.Row,{children:[o.jsx(t.Body.Row.Label,{label:r.label}),o.jsx("button",{style:{marginLeft:"20px",display:"flex",height:"50%"},onClick:m("my custom action"),children:"Action"})]})},r.label))}),o.jsx(t.Footer,{})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
