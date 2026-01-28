import{j as e,r as S,T as E}from"./iframe-Bku7JZgU.js";import{A as K}from"./ActionBar.component-CcjSgayl.js";import"./Action.component-f22K0oPU.js";import"./Actions.component-C-q7QR_q.js";import{A as O}from"./ActionButton.component-CMeZjbf-.js";import"./ActionIconToggle.component-BoA2YxwX.js";import"./ActionSplitDropdown.component-Bv_F7p_M.js";import{H as B}from"./HeaderBar.component-D2XD2ErV.js";import{L as s,D as r,S as V}from"./SidePanel.component-Ca0f3Pwk.js";import{T as G}from"./TabBar.component-CgdS5SUJ.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-DirIAOXh.js";import"./RootCloseWrapper-Bh4junDo.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C6Yf2we-.js";import"./Transition-DW1p8owc.js";import"./Transition-CaUSRA9n.js";import"./constants-CZYEPhht.js";import"./TooltipTrigger.component-BnLMF6J9.js";import"./index-B13TKEVb.js";import"./CircularProgress.component-B9hHuwBj.js";import"./translate-DXNh9fd6.js";import"./withTranslation-aReN8xgw.js";import"./index-BjK5tyCZ.js";import"./get-BzmuSdje.js";import"./_baseGet-CJbCI7UD.js";import"./toString-DZHUkWgu.js";import"./isSymbol-D6QjNeiz.js";import"./eq-BwtgxKt8.js";import"./omit-BiIXUGxm.js";import"./_setToString-CWaqJpnQ.js";import"./_getTag-D590vccR.js";import"./isArrayLike-mbD1yk1N.js";import"./DropdownButton-CNEGZRhy.js";import"./SplitButton-IkMWlr2O.js";import"./inheritsLoose-dVvng6s0.js";import"./Skeleton.component-RdT2KIjN.js";import"./theme-BgMxE0FJ.js";import"./Intercom.component-elf8_-FI.js";import"./Typeahead.component-DxEd1kvv.js";import"./index-DaGJdKsv.js";import"./usePopper-Ck1L2yJ4.js";import"./index-891GY3sP.js";import"./index-Di-3Xr6W.js";import"./Emphasis.component-Wnrr1hI5.js";import"./index-64NF8RCI.js";import"./removeClass-B-DUduzN.js";import"./noop-CafSuU7c.js";import"./noop-BdyXNs-O.js";import"./EditableText.component-Wk7mUyn1.js";import"./FocusManager.component-BfrBBBqU.js";import"./ActionList.component-DxIe5hFY.js";import"./debounce-Cm5Drajo.js";import"./debounce-DaTbRd9f.js";import"./toNumber-BxoMQp9S.js";import"./Tab-Caw9aYFp.js";import"./NavItem-BxE95KCn.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,n=e.jsx(B,{brand:{label:"Example App Name"}}),F=[{label:"Preparations",icon:"talend-dataprep",onClick:c("Preparations clicked")},{label:"Datasets",icon:"talend-folder",onClick:c("Datasets clicked")},{label:"Favorites",icon:"talend-star",onClick:c("Favorites clicked")}],M={label:"Cancel",onClick:c("You clicked me"),className:"btn-inverse"},U={label:"Primary",bsStyle:"primary",onClick:c("You clicked me")},N={label:"Cancel",onClick:c("You clicked on cancel action"),className:"btn-inverse"},P={left:[M],right:[U]},q={label:"multi3",icon:"talend-cog",onClick:c("You clicked me")},J={left:[{label:"multi1",icon:"talend-cog",onClick:c("You clicked me")},{label:"multi2",icon:"talend-cog",onClick:c("You clicked me")}],right:[q,{label:"multi4",icon:"talend-cog",onClick:c("You clicked me")}]},i={actions:P,multiSelectActions:J},Y={id:"tabs",items:[{key:"info",label:"Info"},{key:"navigator",label:"Navigator"},{key:"profile",label:"Profile"},{key:"metrics",label:"Metrics"}],onSelect:c("Tab clicked"),selectedKey:"navigator"},R={id:"tabs",items:[{key:"info",label:"Info",footerActions:{actions:{left:[{id:"view-left",key:"view-left",label:"ActionRight"}],center:[{id:"view-center",key:"view-center",label:"ActionCenter"}],right:[{id:"view-right",key:"view-right",label:"ActionRight"}]}}},{key:"navigator",label:"Navigator",footerActions:{actions:{left:[{id:"view-left-hidden",key:"view-left-hidden",bsStyle:"danger",label:'Action not visible in the tab "info"'}]}}}],onSelect:c("Tab clicked")};function l(){const t=[];for(let a=1;a<=42;a+=1)t.push(e.jsxs("p",{children:["The scroll is defined by the content ",a]},a));return t}const z=()=>e.jsxs("div",{children:[e.jsx(O,{...F[0],hideLabel:!0,link:!0}),e.jsx(O,{...F[1],hideLabel:!0,link:!0})]}),_=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{title:"Im drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],Q=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{renderTitleActions:z,editableTitle:!0,title:"Im drawer 20",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],X=[e.jsxs(r,{stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{editableTitle:!0,renderTitleActions:z,title:"Im drawer 20 here in the long title header header header",footerActions:{...i,selected:0},onCancelAction:N,children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],Z=[e.jsxs(r,{route:{state:{withTransition:!1}},stacked:!0,title:"Im stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{withTransition:!1,title:"Im drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2")],d=e.jsx(V,{actions:F}),m=[];for(let t=0;t<20;t++)m.push(e.jsx("p",{children:"The content dictate the width"},t));const tr={title:"Components/Layout/Drawer",parameters:{layout:"fullscreen"}},p=()=>e.jsxs(s,{header:n,mode:"OneColumn",drawers:_,children:[e.jsx("span",{children:"zone with drawer"}),m]}),b=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:_,children:[e.jsx("span",{children:"zone with drawer"}),m]}),f=()=>{const t=e.jsxs(r,{title:"Im drawer 2",footerActions:{},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),e.jsx("h1",{children:"Hello drawer 3"}),l()]},"drawer-2");return e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:[t],children:[e.jsx("span",{children:"zone with drawer"}),m]})},x=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:Q,children:[e.jsx("span",{children:"zone with drawer"}),m]}),C=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:X,children:[e.jsx("span",{children:"zone with drawer"}),m]}),y=()=>e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:Z,children:[e.jsx("span",{children:"zone with drawer"}),m]}),j=()=>{const t=[e.jsxs(r,{stacked:!0,title:"I'm stacked drawer 1",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]},"drawer-1"),e.jsxs(r,{stacked:!0,title:"I'm drawer 2",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]},"drawer-2"),e.jsxs(r,{stacked:!0,title:"I'm drawer 3",footerActions:{...i,selected:0},children:[e.jsx("h1",{children:"Hello drawer 3"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]},"drawer-3")],a=[];for(let o=0;o<50;o++)a.push(e.jsx("p",{children:"The content dictate the width"},o));return e.jsxs(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:[e.jsx("span",{children:"zone with drawer"}),a]})},k=()=>{const t=[e.jsx(r,{stacked:!0,title:"I'm a stacked drawer with tabs",footerActions:i,tabs:Y,children:e.jsx("p",{children:"The content"})},"drawer-1"),e.jsx(r,{title:"I'm a drawer with tabs",footerActions:i,tabs:Y,children:e.jsx("p",{children:"The content"})},"drawer-2")];return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:e.jsx("span",{children:"zone with drawer"})})},T=()=>{const t=[e.jsxs(r,{stacked:!0,title:"I'm a stacked drawer with tabs",selectedTabKey:"info",tabs:R,children:[e.jsx("p",{children:"This tab contain specific actions in left, center and right parts of the footer."}),e.jsx("p",{children:`An other specific action with the label "Action not visible in the tab 'info'" is define in the tab "navigator" but not visible in the tab "info".`})]},"drawer-1"),e.jsxs(r,{title:"I'm a drawer with tabs",selectedTabKey:"info",tabs:R,children:[e.jsx("p",{children:"This tab contain specific actions in left, center and right parts of the footer."}),e.jsx("p",{children:`An other specific action with the label "Action not visible in the tab 'info'" is define in the tab "navigator" but not visible in the tab "info".`})]},"drawer-2")];return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:t,children:e.jsx("span",{children:"zone with drawer"})})},D=()=>{function t(){const[a,o]=S.useState("info");return e.jsxs(r.Container,{children:[e.jsx(r.Title,{title:"Custom drawer with tabs and a super long name that breaks the drawer title",onCancelAction:N,children:e.jsx(G,{items:[{key:"info",label:"Info"},{key:"navigator",label:"Navigator"},{key:"profile",label:"Profile"}],onSelect:(w,u)=>o(u.key),selectedKey:a})}),e.jsxs("div",{style:{flexGrow:1,minHeight:0,display:"flex",flexDirection:"column"},children:[a==="info"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{children:"Test"})]}),a==="navigator"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{})]}),a==="profile"&&e.jsxs(e.Fragment,{children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{})]})]})]})}return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:[e.jsx(t,{},"drawer-1")],children:e.jsx("span",{children:"zone with drawer"})})},v=()=>{const t=P.left[0];function a(){return e.jsxs(r.Container,{stacked:!0,children:[e.jsx(r.Title,{title:"Custom drawer with tabs and a super long name that breaks the drawer title",onCancelAction:t}),e.jsxs("div",{style:{flexGrow:1,minHeight:0,display:"flex",flexDirection:"column"},children:[e.jsx(r.Content,{children:l()}),e.jsx(r.Footer,{children:e.jsx(K,{actions:P})})]})]})}return e.jsx(s,{header:n,mode:"TwoColumns",one:d,drawers:[e.jsx(a,{},"drawer-1")],children:e.jsx("span",{children:"zone with drawer"})})},g=()=>{const t={first:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im stacked drawer 1",onCancelAction:{label:"Close",onClick:()=>w("first")},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]}),second:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im drawer 2",onCancelAction:{label:"Close",onClick:()=>w("second")},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]}),third:e.jsxs(r,{withTransition:!1,title:"Im drawer 3",onCancelAction:{label:"Close",onClick:()=>w("third")},children:[e.jsx("h1",{children:"No transition on this one"}),"Coucou"]})},[a,o]=S.useState(t);function w(u){o(H=>Object.entries(H).filter(([h])=>h!==u).reduce((h,[L,W])=>(h[L]=W,h),{}))}return e.jsx(s,{header:n,mode:"OneColumn",drawers:Object.values(a),children:e.jsx("div",{style:{padding:"0.9375rem"},children:e.jsx("button",{className:"btn btn-primary",onClick:()=>o(t),children:"Set back the drawers"})})})},A=()=>{const t={first:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im stacked drawer 1",onCancelAction:{label:"Close",onClick:()=>w("first")},children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]}),second:e.jsxs(r,{withTransition:!0,stacked:!0,title:"Im drawer 2",onCancelAction:{label:"Close",onClick:()=>w("second")},children:[e.jsx("h1",{children:"Hello drawer 2"}),e.jsx("p",{children:"The scroll is defined by the content"}),l()]}),third:e.jsxs(r,{withTransition:!1,title:"Im drawer 3",onCancelAction:{label:"Close",onClick:()=>w("third")},children:[e.jsx("h1",{children:"No transition on this one"}),"Coucou"]})},[a,o]=S.useState(t);function w(u){o(H=>Object.entries(H).filter(([h])=>h!==u).reduce((h,[L,W])=>(h[L]=W,h),{}))}return e.jsx(s,{header:n,mode:"OneColumn",drawers:Object.values(a),children:e.jsx("div",{style:{padding:"0.9375rem"},children:e.jsx("button",{className:"btn btn-primary",onClick:()=>o(t),children:"Set back the drawers"})})})},I=()=>{const[t,a]=S.useState("default");return e.jsxs(s,{header:n,mode:"OneColumn",drawers:[e.jsxs(r.Container,{children:[e.jsx(r.Title,{title:"Im drawer 1",subtitle:"Drawer subtitle",subtitleTag:{label:"Preview",tooltip:"This is a preview",variant:t},renderTitleActions:z,onCancelAction:N,editable:!0}),e.jsxs(r.Content,{children:[e.jsx("h1",{children:"Hello drawer 1"}),e.jsx("p",{children:"You should not being able to read this because I'm first"})]})]},"drawer-1")],children:[e.jsx("span",{children:"Select subtitle tag variants"}),e.jsx("select",{onChange:o=>a(o.target.value),style:{width:"250px"},children:E.map(o=>e.jsx("option",{value:o,children:o},o))})]})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="OneColumn" drawers={drawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
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
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={editableDrawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={longEditableDrawers}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersNoTransition}>
        <span>zone with drawer</span>
        {twentyRows}
    </Layout>`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
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
}`,...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const drawersWithTabs = [<Drawer stacked title="I'm a stacked drawer with tabs" footerActions={basicProps} tabs={tabs} key="drawer-1">
            <p>The content</p>
        </Drawer>, <Drawer title="I'm a drawer with tabs" footerActions={basicProps} tabs={tabs} key="drawer-2">
            <p>The content</p>
        </Drawer>];
  return <Layout header={header} mode="TwoColumns" one={sidePanel} drawers={drawersWithTabs}>
            <span>zone with drawer</span>
        </Layout>;
}`,...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
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
}`,...T.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
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
}`,...D.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
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
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
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
}`,...g.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
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
}`,...A.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
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
}`,...I.parameters?.docs?.source}}};const ar=["Layout1Column","Layout2Columns","WithoutFooterActions","WithEditableHeader","WithLongEditableHeader","DefaultWithNoTransition","StackedDrawers","WithTabs","WithTabsWithSpecificFooters","Custom","CustomStacked","Interactive","_Interactive","WithSubtitleComponent"];export{D as Custom,v as CustomStacked,y as DefaultWithNoTransition,g as Interactive,p as Layout1Column,b as Layout2Columns,j as StackedDrawers,x as WithEditableHeader,C as WithLongEditableHeader,I as WithSubtitleComponent,k as WithTabs,T as WithTabsWithSpecificFooters,f as WithoutFooterActions,A as _Interactive,ar as __namedExportsOrder,tr as default};
