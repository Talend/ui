import{j as e,r as S,aZ as E}from"./iframe-cBtRg4Zm.js";import{A as K}from"./ActionBar.component-4HGffKkP.js";import"./Action.component-DbfWXAi7.js";import"./Actions.component-CDUYopll.js";import{A as O}from"./ActionButton.component-BbFZmfp2.js";import"./ActionIconToggle.component-DocL8DWD.js";import"./ActionSplitDropdown.component-C5oizYOJ.js";import{H as B}from"./HeaderBar.component-BGBIMkMv.js";import{L as s,D as r,S as V}from"./SidePanel.component-DfemSbZA.js";import{T as G}from"./TabBar.component-BqtqX_Gv.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-CafacX6_.js";import"./RootCloseWrapper-B9V3vXXh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-RafO5SjG.js";import"./Transition-D7Ms2Ah2.js";import"./Transition-QmhJMkIM.js";import"./constants-CZYEPhht.js";import"./TooltipTrigger.component-BEpC4Cbd.js";import"./index-_4Lt4aG8.js";import"./CircularProgress.component-CJXktRGh.js";import"./translate-am4PfflD.js";import"./withTranslation-BL7gA-bp.js";import"./index-CopqRmGV.js";import"./get-DpZIkRWq.js";import"./_baseGet-bDt8gzSb.js";import"./toString-Dopjm_6L.js";import"./isSymbol-hEzy1n5Y.js";import"./eq-DmJpQRp3.js";import"./omit-DZjDjx7f.js";import"./_baseSlice-BFLcj3sE.js";import"./_getTag-D1YAmZF8.js";import"./isArrayLike-XKLyq0p9.js";import"./DropdownButton-DJxVuDn4.js";import"./SplitButton-Bri9k3Vu.js";import"./inheritsLoose-CFk7qFMH.js";import"./Skeleton.component-Dkla9Zfi.js";import"./theme-IDDytecF.js";import"./Intercom.component-CDErLmZJ.js";import"./Typeahead.component-D_K25MKZ.js";import"./index-CWClwecL.js";import"./usePopper-GxcgmlF_.js";import"./index-vqKS4t1F.js";import"./index-BOm_B24O.js";import"./Emphasis.component-DYH_H1ln.js";import"./index-BBfNNNmQ.js";import"./removeClass-B-DUduzN.js";import"./noop-C8uahSlP.js";import"./noop-BdyXNs-O.js";import"./EditableText.component-DXnvgoTV.js";import"./FocusManager.component-YCWWKH36.js";import"./ActionList.component-NyeplpPW.js";import"./debounce-ln2budr_.js";import"./debounce-BonoGGo3.js";import"./toNumber-B2Ftrld9.js";import"./Tab-C-TeA8pH.js";import"./NavItem-DREbTxaO.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,n=e.jsx(B,{brand:{label:"Example App Name"}}),F=[{label:"Preparations",icon:"talend-dataprep",onClick:c("Preparations clicked")},{label:"Datasets",icon:"talend-folder",onClick:c("Datasets clicked")},{label:"Favorites",icon:"talend-star",onClick:c("Favorites clicked")}],M={label:"Cancel",onClick:c("You clicked me"),className:"btn-inverse"},U={label:"Primary",bsStyle:"primary",onClick:c("You clicked me")},N={label:"Cancel",onClick:c("You clicked on cancel action"),className:"btn-inverse"},P={left:[M],right:[U]},Z={label:"multi3",icon:"talend-cog",onClick:c("You clicked me")},q={left:[{label:"multi1",icon:"talend-cog",onClick:c("You clicked me")},{label:"multi2",icon:"talend-cog",onClick:c("You clicked me")}],right:[Z,{label:"multi4",icon:"talend-cog",onClick:c("You clicked me")}]},i={actions:P,multiSelectActions:q},Y={id:"tabs",items:[{key:"info",label:"Info"},{key:"navigator",label:"Navigator"},{key:"profile",label:"Profile"},{key:"metrics",label:"Metrics"}],onSelect:c("Tab clicked"),selectedKey:"navigator"},R={id:"tabs",items:[{key:"info",label:"Info",footerActions:{actions:{left:[{id:"view-left",key:"view-left",label:"ActionRight"}],center:[{id:"view-center",key:"view-center",label:"ActionCenter"}],right:[{id:"view-right",key:"view-right",label:"ActionRight"}]}}},{key:"navigator",label:"Navigator",footerActions:{actions:{left:[{id:"view-left-hidden",key:"view-left-hidden",bsStyle:"danger",label:'Action not visible in the tab "info"'}]}}}],onSelect:c("Tab clicked")};function l(){const t=[];for(let a=1;a<=42;a+=1)t.push(e.jsxs("p",{children:["The scroll is defined by the content ",a]},a));return t}const z=()=>e.jsxs("div",{children:[e.jsx(O,{...F[0],hideLabel:!0,link:!0}),e.jsx(O,{...F[1],hideLabel:!0,link:!0})]}),_=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{title:"Im drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],J=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{renderTitleActions:z,editableTitle:!0,title:"Im drawer 20",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],Q=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{editableTitle:!0,renderTitleActions:z,title:"Im drawer 20 here in the long title header header header",footerActions:{...i,selected:0},onCancelAction:N,children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],X=[e.jsxs(r,{route:{state:{withTransition:!1}},stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{withTransition:!1,title:"Im drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],d=e.jsx(V,{actions:F}),m=[];for(let t=0;t<20;t++)m.push(e.jsx("p",{children:"The content dictate the width"},t));const tr={title:"Components/Layout/Drawer",parameters:{layout:"fullscreen"}},x=()=>e.jsxs(s,{header:n,mode:"OneColumn",drawers:_,children:[e.jsx("span",{children:"zone with drawer"}),m]}),C=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:_,children:[e.jsx("span",{children:"zone with drawer"}),m]}),y=()=>{const t=e.jsxs(r,{title:"Im drawer 2",footerActions:{},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2");return e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:[t],children:[e.jsx("span",{children:"zone with drawer"}),m]})},j=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:J,children:[e.jsx("span",{children:"zone with drawer"}),m]}),k=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:Q,children:[e.jsx("span",{children:"zone with drawer"}),m]}),D=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:X,children:[e.jsx("span",{children:"zone with drawer"}),m]}),T=()=>{const t=[e.jsxs(r,{stacked:!0,title:"I'm stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{stacked:!0,title:"I'm drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]},"drawer-2"),e.jsxs(r,{stacked:!0,title:"I'm drawer 3",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 3"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]},"drawer-3")],a=[];for(let o=0;o<50;o++)a.push(e.jsx("p",{children:"The content dictate the width"},o));return e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:[e.jsx("span",{children:"zone with drawer"}),a]})},v=()=>{const t=[e.jsx(r,{stacked:!0,title:"I'm a stacked drawer with tabs",footerActions:i,tabs:Y,children:e.jsx("p",{children:"The content"})},"drawer-1"),e.jsx(r,{title:"I'm a drawer with tabs",footerActions:i,tabs:Y,children:e.jsx("p",{children:"The content"})},"drawer-2")];return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:e.jsx("span",{children:"zone with drawer"})})},g=()=>{const t=[e.jsxs(r,{stacked:!0,title:"I'm a stacked drawer with tabs",selectedTabKey:"info",tabs:R,children:[e.jsx("p",{children:"This tab contain specific actions in left, center and right parts of the footer."}),e.jsx("p",{children:`An other specific action with the label "Action not visible in the tab 'info'" is define in the tab "navigator" but not visible in the tab "info".`})]},"drawer-1"),e.jsxs(r,{title:"I'm a drawer with tabs",selectedTabKey:"info",tabs:R,children:[e.jsx("p",{children:"This tab contain specific actions in left, center and right parts of the footer."}),e.jsx("p",{children:`An other specific action with the label "Action not visible in the tab 'info'" is define in the tab "navigator" but not visible in the tab "info".`})]},"drawer-2")];return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:e.jsx("span",{children:"zone with drawer"})})},A=()=>{function t(){const[a,o]=S.useState("info");return e.jsxs(r.Container,{children:[e.jsx(r.Title,{title:"Custom drawer with tabs and a super long name that breaks the drawer title",onCancelAction:N,children:e.jsx(G,{items:[{key:"info",label:"Info"},{key:"navigator",label:"Navigator"},{key:"profile",label:"Profile"}],onSelect:(w,u)=>o(u.key),selectedKey:a})}),e.jsxs("div",{style:{flexGrow:1,minHeight:0,display:"flex",flexDirection:"column"},children:[a==="info"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{children:"Test"})]}),a==="navigator"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{})]}),a==="profile"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{})]})]})]})}return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:[e.jsx(t,{},"drawer-1")],children:e.jsx("span",{children:"zone with drawer"})})},I=()=>{const t=P.left[0];function a(){return e.jsxs(r.Container,{stacked:!0,children:[e.jsx(r.Title,{title:"Custom drawer with tabs and a super long name that breaks the drawer title",onCancelAction:t}),e.jsxs("div",{style:{flexGrow:1,minHeight:0,display:"flex",flexDirection:"column"},children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{children:e.jsx(K,{actions:P})})]})]})}return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:[e.jsx(a,{},"drawer-1")],children:e.jsx("span",{children:"zone with drawer"})})},p=()=>{const t={first:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im stacked drawer 1",onCancelAction:{label:"Close",onClick:()=>w("first")},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]}),second:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im drawer 2",onCancelAction:{label:"Close",onClick:()=>w("second")},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]}),third:e.jsxs(r,{withTransition:!1,title:"Im drawer 3",onCancelAction:{label:"Close",onClick:()=>w("third")},children:[e.jsx("h1",{children:"No transition on this one"}),"Coucou"]})},[a,o]=S.useState(t);function w(u){o(H=>Object.entries(H).filter(([h])=>h!==u).reduce((h,[L,W])=>(h[L]=W,h),{}))}return e.jsx(s,{header:n,mode:"OneColumn",drawers:Object.values(a),children:e.jsx("div",{style:{padding:"0.9375rem"},children:e.jsx("button",{className:"btn btn-primary",onClick:()=>o(t),children:"Set back the drawers"})})})};p.parameters={chromatic:{disableSnapshot:!0}};const b=()=>{const t={first:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im stacked drawer 1",onCancelAction:{label:"Close",onClick:()=>w("first")},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]}),second:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im drawer 2",onCancelAction:{label:"Close",onClick:()=>w("second")},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]}),third:e.jsxs(r,{withTransition:!1,title:"Im drawer 3",onCancelAction:{label:"Close",onClick:()=>w("third")},children:[e.jsx("h1",{children:"No transition on this one"}),"Coucou"]})},[a,o]=S.useState(t);function w(u){o(H=>Object.entries(H).filter(([h])=>h!==u).reduce((h,[L,W])=>(h[L]=W,h),{}))}return e.jsx(s,{header:n,mode:"OneColumn",drawers:Object.values(a),children:e.jsx("div",{style:{padding:"0.9375rem"},children:e.jsx("button",{className:"btn btn-primary",onClick:()=>o(t),children:"Set back the drawers"})})})};b.parameters={chromatic:{disableSnapshot:!0}};const f=()=>{const[t,a]=S.useState("default");return e.jsxs(s,{header:n,mode:"OneColumn",drawers:[e.jsxs(r.Container,{children:[e.jsx(r.Title,{title:"Im drawer 1",subtitle:"Drawer subtitle",subtitleTag:{label:"Preview",tooltip:"This is a preview",variant:t},renderTitleActions:z,onCancelAction:N,editable:!0}),e.jsxs(r.Content,{children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]})]},"drawer-1")],children:[e.jsx("span",{children:"Select subtitle tag variants"}),e.jsx("select",{onChange:o=>a(o.target.value),style:{width:"250px"},children:E.map(o=>e.jsx("option",{value:o,children:o},o))})]})};f.parameters={chromatic:{disableSnapshot:!0}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="OneColumn" drawers={drawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const drawersWithoutFooterActions = <Drawer title="Im drawer 2" footerActions={{}} key="drawer-2">
            <h1>Hello drawer 2</h1>
            <p>The scroll is defined by the content</p>
            <h1>Hello drawer 3</h1>
            {scrollableContent()}
        </Drawer>;
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={[drawersWithoutFooterActions]}>
            <span>zone with drawer</span>
            {twentyRows}
        </Layout>;
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={editableDrawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={longEditableDrawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersNoTransition}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...D.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const stackedDrawers = [<Drawer stacked title="I'm stacked drawer 1" footerActions={{
    ...basicProps,
    selected: 0
  }} key="drawer-1">
            <h1>Hello drawer 1</h1>
            <p>You should not being able to read this because I'm first</p>
        </Drawer>, <Drawer stacked title="I'm drawer 2" footerActions={{
    ...basicProps,
    selected: 0
  }} key="drawer-2">
            <h1>Hello drawer 2</h1>
            <p>The scroll is defined by the content</p>
            {scrollableContent()}
        </Drawer>, <Drawer stacked title="I'm drawer 3" footerActions={{
    ...basicProps,
    selected: 0
  }} key="drawer-3">
            <h1>Hello drawer 3</h1>
            <p>The scroll is defined by the content</p>
            {scrollableContent()}
        </Drawer>];
  const fiftyRows = [];
  for (let index = 0; index < 50; index++) {
    fiftyRows.push(<p key={index}>The content dictate the width</p>);
  }
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={stackedDrawers}>
            <span>zone with drawer</span>
            {fiftyRows}
        </Layout>;
}`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const drawersWithTabs = [<Drawer stacked title="I'm a stacked drawer with tabs" footerActions={basicProps} tabs={tabs} key="drawer-1">
            <p>The content</p>
        </Drawer>, <Drawer title="I'm a drawer with tabs" footerActions={basicProps} tabs={tabs} key="drawer-2">
            <p>The content</p>
        </Drawer>];
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
            <span>zone with drawer</span>
        </Layout>;
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const drawersWithTabs = [<Drawer stacked title="I'm a stacked drawer with tabs" selectedTabKey="info" tabs={tabsActionFooter} key="drawer-1">
            <p>This tab contain specific actions in left, center and right parts of the footer.</p>
            <p>
                An other specific action with the label "Action not visible in the tab 'info'" is define in
                the tab "navigator" but not visible in the tab "info".
            </p>
        </Drawer>, <Drawer title="I'm a drawer with tabs" selectedTabKey="info" tabs={tabsActionFooter} key="drawer-2">
            <p>This tab contain specific actions in left, center and right parts of the footer.</p>
            <p>
                An other specific action with the label "Action not visible in the tab 'info'" is define in
                the tab "navigator" but not visible in the tab "info".
            </p>
        </Drawer>];
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
            <span>zone with drawer</span>
        </Layout>;
}`,...g.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
  function CustomDrawer() {
    const [selectedTab, setSelectedTab] = useState('info');
    return <Drawer.Container>
                <Drawer.Title title="Custom drawer with tabs and a super long name that breaks the drawer title" onCancelAction={onCancelAction}>
                    <TabBar items={[{
          key: 'info',
          label: 'Info'
        }, {
          key: 'navigator',
          label: 'Navigator'
        }, {
          key: 'profile',
          label: 'Profile'
        }]} onSelect={(_, tab) => setSelectedTab(tab.key)} selectedKey={selectedTab} />
                </Drawer.Title>
                <div style={{
        flexGrow: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
                    {selectedTab === 'info' && <>
                            <Drawer.Content>{scrollableContent()}</Drawer.Content>
                            <Drawer.Footer>Test</Drawer.Footer>
                        </>}
                    {selectedTab === 'navigator' && <>
                            <Drawer.Content>{scrollableContent()}</Drawer.Content>
                            <Drawer.Footer />
                        </>}
                    {selectedTab === 'profile' && <>
                            <Drawer.Content>{scrollableContent()}</Drawer.Content>
                            <Drawer.Footer />
                        </>}
                </div>
            </Drawer.Container>;
  }
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={[<CustomDrawer key="drawer-1" />]}>
            <span>zone with drawer</span>
        </Layout>;
}`,...A.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  // Use same cancel action props with className for Title and Footer
  const sameCancelAction = panelActions.left[0];
  function CustomDrawer() {
    return <Drawer.Container stacked>
                <Drawer.Title title="Custom drawer with tabs and a super long name that breaks the drawer title" onCancelAction={sameCancelAction} />
                <div style={{
        flexGrow: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
                    <Drawer.Content>{scrollableContent()}</Drawer.Content>
                    <Drawer.Footer>
                        <ActionBar actions={panelActions} />
                    </Drawer.Footer>
                </div>
            </Drawer.Container>;
  }
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={[<CustomDrawer key="drawer-1" />]}>
            <span>zone with drawer</span>
        </Layout>;
}`,...I.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const allDrawers = {
    first: <Drawer withTransition stacked title="Im stacked drawer 1" onCancelAction={{
      label: 'Close',
      onClick: () => remove('first')
    }}>
                <h1>Hello drawer 1</h1>
                <p>You should not being able to read this because I'm first</p>
            </Drawer>,
    second: <Drawer withTransition stacked title="Im drawer 2" onCancelAction={{
      label: 'Close',
      onClick: () => remove('second')
    }}>
                <h1>Hello drawer 2</h1>
                <p>The scroll is defined by the content</p>
                {scrollableContent()}
            </Drawer>,
    third: <Drawer withTransition={false} title="Im drawer 3" onCancelAction={{
      label: 'Close',
      onClick: () => remove('third')
    }}>
                <h1>No transition on this one</h1>
                Coucou
            </Drawer>
  };
  const [displayedDrawers, setDisplayedDrawers] = useState(allDrawers);
  function remove(id) {
    setDisplayedDrawers(oldDrawers => Object.entries(oldDrawers).filter(([key]) => key !== id).reduce((accu, [key, value]) => {
      accu[key] = value;
      return accu;
    }, {}));
  }
  return <Layout header={header} mode="OneColumn" drawers={Object.values(displayedDrawers)}>
            <div style={{
      padding: '0.9375rem'
    }}>
                <button className="btn btn-primary" onClick={() => setDisplayedDrawers(allDrawers)}>
                    Set back the drawers
                </button>
            </div>
        </Layout>;
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const allDrawers = {
    first: <Drawer withTransition stacked title="Im stacked drawer 1" onCancelAction={{
      label: 'Close',
      onClick: () => remove('first')
    }}>
                <h1>Hello drawer 1</h1>
                <p>You should not being able to read this because I'm first</p>
            </Drawer>,
    second: <Drawer withTransition stacked title="Im drawer 2" onCancelAction={{
      label: 'Close',
      onClick: () => remove('second')
    }}>
                <h1>Hello drawer 2</h1>
                <p>The scroll is defined by the content</p>
                {scrollableContent()}
            </Drawer>,
    third: <Drawer withTransition={false} title="Im drawer 3" onCancelAction={{
      label: 'Close',
      onClick: () => remove('third')
    }}>
                <h1>No transition on this one</h1>
                Coucou
            </Drawer>
  };
  const [displayedDrawers, setDisplayedDrawers] = useState(allDrawers);
  function remove(id) {
    setDisplayedDrawers(oldDrawers => Object.entries(oldDrawers).filter(([key]) => key !== id).reduce((accu, [key, value]) => {
      accu[key] = value;
      return accu;
    }, {}));
  }
  return <Layout header={header} mode="OneColumn" drawers={Object.values(displayedDrawers)}>
            <div style={{
      padding: '0.9375rem'
    }}>
                <button className="btn btn-primary" onClick={() => setDisplayedDrawers(allDrawers)}>
                    Set back the drawers
                </button>
            </div>
        </Layout>;
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [variant, setVariant] = useState('default');
  return <Layout header={header} mode="OneColumn" drawers={[<Drawer.Container key="drawer-1">
                    <Drawer.Title title="Im drawer 1" subtitle="Drawer subtitle" subtitleTag={{
      label: 'Preview',
      tooltip: 'This is a preview',
      variant
    }} renderTitleActions={titleActions} onCancelAction={onCancelAction} editable />
                    <Drawer.Content>
                        <h1>Hello drawer 1</h1>
                        <p>You should not being able to read this because I'm first</p>
                    </Drawer.Content>
                </Drawer.Container>]}>
            <span>Select subtitle tag variants</span>
            <select onChange={ev => setVariant(ev.target.value)} style={{
      width: '250px'
    }}>
                {TagVariantsNames.map(variant => <option key={variant} value={variant}>
                        {variant}
                    </option>)}
            </select>
        </Layout>;
}`,...f.parameters?.docs?.source}}};const ar=["Layout1Column","Layout2Columns","WithoutFooterActions","WithEditableHeader","WithLongEditableHeader","DefaultWithNoTransition","StackedDrawers","WithTabs","WithTabsWithSpecificFooters","Custom","CustomStacked","Interactive","_Interactive","WithSubtitleComponent"];export{A as Custom,I as CustomStacked,D as DefaultWithNoTransition,p as Interactive,x as Layout1Column,C as Layout2Columns,T as StackedDrawers,j as WithEditableHeader,k as WithLongEditableHeader,f as WithSubtitleComponent,v as WithTabs,g as WithTabsWithSpecificFooters,y as WithoutFooterActions,b as _Interactive,ar as __namedExportsOrder,tr as default};
