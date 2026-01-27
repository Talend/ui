import{r as o,j as e}from"./iframe-tG6QAxGp.js";import{D as a,L as i,S as T}from"./SidePanel.component-DkRPewLJ.js";import{T as f}from"./TabBar.component-rWX-3BWp.js";import{H as l}from"./HeaderBar.component-BZ2ruVds.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-DGPJQ8lB.js";import"./RootCloseWrapper-kKt8xs6O.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cj9NDUvU.js";import"./Transition-BOeWoA1S.js";import"./Transition-BXOwPJfR.js";import"./omit-CRo6-3gC.js";import"./toString-BG9c7NwH.js";import"./isSymbol-ytlJlBjl.js";import"./_setToString-B2UnnL-D.js";import"./_baseGet-Dd0iB8L9.js";import"./eq-D9WtH5Fn.js";import"./_getTag-OmseOmXH.js";import"./isArrayLike-DErJ5wjt.js";import"./index-lfDkKVxQ.js";import"./removeClass-B-DUduzN.js";import"./get-DE0l8-4q.js";import"./noop-Cd9RwCW8.js";import"./noop-BdyXNs-O.js";import"./ActionBar.component-fIvNO9IS.js";import"./Action.component-XcQ2WTii.js";import"./ActionButton.component-CFI9Dawz.js";import"./TooltipTrigger.component-DPerC_fX.js";import"./index-CK4oWbr4.js";import"./CircularProgress.component--kEh-yrf.js";import"./constants-CZYEPhht.js";import"./translate-Dz4hh4kd.js";import"./withTranslation-CB2voPv-.js";import"./Skeleton.component-BsxZfoo7.js";import"./index-C4M67xWB.js";import"./theme-CbiPqX1n.js";import"./ActionSplitDropdown.component-6Mr2oZ_K.js";import"./SplitButton-CFNkqeLE.js";import"./inheritsLoose-Bj8HyUC0.js";import"./DropdownButton-B81McBOZ.js";import"./ActionIconToggle.component-DNdEU90S.js";import"./Actions.component-BXy7cgFX.js";import"./EditableText.component-N8K7Vhuu.js";import"./FocusManager.component-Bw2mcafx.js";import"./ActionList.component-DedBVWz9.js";import"./debounce-JeuKl8Il.js";import"./debounce-D0ymFkuQ.js";import"./toNumber-BDv1lg2s.js";import"./Tab-Ta42ykup.js";import"./NavItem-C6_u2eP-.js";import"./Intercom.component-Dr_g22Pz.js";import"./Typeahead.component-CwgpYuuj.js";import"./index-CBV5n_MU.js";import"./usePopper-D-FRCYGn.js";import"./index-pACPjwMb.js";import"./index-D0Y12Ojj.js";import"./Emphasis.component-ckitWJS_.js";const d=()=>e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h2",{children:"Main Content Area"}),e.jsx("p",{children:"This is the main content area of the application."})]}),c=()=>e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("h3",{children:"Drawer Content"}),e.jsx("p",{children:"Drawer content goes here"})]}),He={title:"Components/Layout/Drawer",component:a,tags:["autodocs"]},h={render:()=>{const[r,t]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",onToggle:()=>t(!r),logo:e.jsx("span",{children:"Logo"}),title:"Drawer Example"}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},w={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("Edit me");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"With Editable Header"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:n,onEdit:()=>console.log("editing"),children:e.jsx(c,{})}),e.jsx(d,{})]})}},u={render:()=>{const[r,t]=o.useState(!1),[n,s]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Stacked Drawers"}),e.jsxs(a,{show:r,onClose:()=>t(!1),title:"First Drawer",children:[e.jsx("button",{onClick:()=>s(!0),children:"Open Second Drawer"}),e.jsx(c,{})]}),e.jsx(a,{show:n,onClose:()=>s(!1),title:"Second Drawer",children:e.jsx(c,{})}),e.jsx(d,{})]})}},p={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("tab1");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer With Tabs"}),e.jsxs(a,{show:r,onClose:()=>t(!1),children:[e.jsx(f,{items:[{key:"tab1",label:"Tab 1"},{key:"tab2",label:"Tab 2"}],selectedKey:n,onSelect:g=>s(g)}),e.jsxs("div",{style:{padding:"15px"},children:[n==="tab1"&&e.jsx("p",{children:"Content of Tab 1"}),n==="tab2"&&e.jsx("p",{children:"Content of Tab 2"})]})]}),e.jsx(d,{})]})}},m={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with SidePanel"}),e.jsx(T,{title:"Side Panel",show:n,onClose:()=>s(!1),children:e.jsx("p",{children:"Side panel content"})}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},S={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Custom Actions"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Custom Actions",actions:[{label:"Save",onClick:()=>console.log("save")},{label:"Cancel",onClick:()=>t(!1)}],children:e.jsx(c,{})}),e.jsx(d,{})]})}},x={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Large Content"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Large Content",children:e.jsx("div",{style:{padding:"15px"},children:Array.from({length:20},(n,s)=>e.jsxs("p",{children:["Item ",s+1," - This is some content"]},s))})}),e.jsx(d,{})]})}},C={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Scrollable Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Scrollable",maxHeight:300,children:e.jsx("div",{style:{padding:"15px",overflowY:"auto",maxHeight:"250px"},children:Array.from({length:50},(n,s)=>e.jsxs("p",{children:["Line ",s+1]},s))})}),e.jsx(d,{})]})}},b={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Custom Position Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Right Position",position:"right",children:e.jsx(c,{})}),e.jsx(d,{})]})}},D={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{style:{height:"100vh"},children:[e.jsx(l,{brand:"Talend",title:"Full Height Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Full Height",children:e.jsx(c,{})}),e.jsx(d,{})]})}},j={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Loading Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),isLoading:!0,children:e.jsx(c,{})}),e.jsx(d,{})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(false);
    return <Layout>
                <HeaderBar brand="Talend" onToggle={() => setShow(!show)} logo={<span>Logo</span>} title="Drawer Example" />
                <Drawer show={show} onClose={() => setShow(false)}>
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...h.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    const [title, setTitle] = useState('Edit me');
    return <Layout>
                <HeaderBar brand="Talend" title="With Editable Header" />
                <Drawer show={show} onClose={() => setShow(false)} title={title} onEdit={() => console.log('editing')}>
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...w.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    return <Layout>
                <HeaderBar brand="Talend" title="Stacked Drawers" />
                <Drawer show={show1} onClose={() => setShow1(false)} title="First Drawer">
                    <button onClick={() => setShow2(true)}>Open Second Drawer</button>
                    <DrawerContent />
                </Drawer>
                <Drawer show={show2} onClose={() => setShow2(false)} title="Second Drawer">
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    const [activeTab, setActiveTab] = useState('tab1');
    return <Layout>
                <HeaderBar brand="Talend" title="Drawer With Tabs" />
                <Drawer show={show} onClose={() => setShow(false)}>
                    <TabBar items={[{
          key: 'tab1',
          label: 'Tab 1'
        }, {
          key: 'tab2',
          label: 'Tab 2'
        }]} selectedKey={activeTab} onSelect={key => setActiveTab(key)} />
                    <div style={{
          padding: '15px'
        }}>
                        {activeTab === 'tab1' && <p>Content of Tab 1</p>}
                        {activeTab === 'tab2' && <p>Content of Tab 2</p>}
                    </div>
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [showDrawer, setShowDrawer] = useState(true);
    const [showSidePanel, setShowSidePanel] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Drawer with SidePanel" />
                <SidePanel title="Side Panel" show={showSidePanel} onClose={() => setShowSidePanel(false)}>
                    <p>Side panel content</p>
                </SidePanel>
                <Drawer show={showDrawer} onClose={() => setShowDrawer(false)}>
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...m.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Drawer with Custom Actions" />
                <Drawer show={show} onClose={() => setShow(false)} title="Custom Actions" actions={[{
        label: 'Save',
        onClick: () => console.log('save')
      }, {
        label: 'Cancel',
        onClick: () => setShow(false)
      }]}>
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Drawer with Large Content" />
                <Drawer show={show} onClose={() => setShow(false)} title="Large Content">
                    <div style={{
          padding: '15px'
        }}>
                        {Array.from({
            length: 20
          }, (_, i) => <p key={i}>Item {i + 1} - This is some content</p>)}
                    </div>
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Scrollable Drawer" />
                <Drawer show={show} onClose={() => setShow(false)} title="Scrollable" maxHeight={300}>
                    <div style={{
          padding: '15px',
          overflowY: 'auto',
          maxHeight: '250px'
        }}>
                        {Array.from({
            length: 50
          }, (_, i) => <p key={i}>Line {i + 1}</p>)}
                    </div>
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Custom Position Drawer" />
                <Drawer show={show} onClose={() => setShow(false)} title="Right Position" position="right">
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...b.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout style={{
      height: '100vh'
    }}>
                <HeaderBar brand="Talend" title="Full Height Drawer" />
                <Drawer show={show} onClose={() => setShow(false)} title="Full Height">
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...D.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [show, setShow] = useState(true);
    return <Layout>
                <HeaderBar brand="Talend" title="Loading Drawer" />
                <Drawer show={show} onClose={() => setShow(false)} isLoading>
                    <DrawerContent />
                </Drawer>
                <Content />
            </Layout>;
  }
}`,...j.parameters?.docs?.source}}};const Pe=["Default","WithEditableHeader","StackedDrawers","WithTabs","WithSidePanel","WithCustomActions","LargeContent","ScrollableContent","CustomPosition","FullHeight","WithLoading"];export{b as CustomPosition,h as Default,D as FullHeight,x as LargeContent,C as ScrollableContent,u as StackedDrawers,S as WithCustomActions,w as WithEditableHeader,j as WithLoading,m as WithSidePanel,p as WithTabs,Pe as __namedExportsOrder,He as default};
