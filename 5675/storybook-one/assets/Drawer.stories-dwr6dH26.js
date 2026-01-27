import{r as o,j as e}from"./iframe-B_4wJIS8.js";import{D as a,L as i,S as T}from"./SidePanel.component-BBtbdi1z.js";import{T as f}from"./TabBar.component-CY9pTsMO.js";import{H as l}from"./HeaderBar.component-C5XLKgXr.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-CPeQ8j4-.js";import"./RootCloseWrapper-DEvVHIQL.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-KR_oZShS.js";import"./Transition-xoA8W_1t.js";import"./Transition-BxQmsZ3a.js";import"./omit-Cjg7wDrx.js";import"./toString-Cq3taLdz.js";import"./isSymbol-DJhelppy.js";import"./_setToString-BOqf-aER.js";import"./_baseGet-D4w8jjj2.js";import"./eq-BDZQrTUZ.js";import"./_getTag-BZemYwVp.js";import"./isArrayLike-DS_zinFP.js";import"./index-DudLnKAe.js";import"./removeClass-B-DUduzN.js";import"./get-C-eStwz-.js";import"./noop-BCdsZsMF.js";import"./noop-BdyXNs-O.js";import"./ActionBar.component-CAO08cqj.js";import"./Action.component-CFKS61Kv.js";import"./ActionButton.component-Cpu2RjWB.js";import"./TooltipTrigger.component-UE44jBfo.js";import"./index-BF7g9OyK.js";import"./CircularProgress.component-CJJ68GdE.js";import"./constants-CZYEPhht.js";import"./translate-9bG30sZL.js";import"./withTranslation-gwdAr2UT.js";import"./Skeleton.component-Cnert0C7.js";import"./index-2LIYn8RY.js";import"./theme-rZbYulMu.js";import"./ActionSplitDropdown.component-DrRGmgDg.js";import"./SplitButton-BBdShQee.js";import"./inheritsLoose-D74nn77K.js";import"./DropdownButton-COOoeBO0.js";import"./ActionIconToggle.component-DT3KyiIW.js";import"./Actions.component--FIXM9e2.js";import"./EditableText.component-B5aOxvRG.js";import"./FocusManager.component-PlGVxjVG.js";import"./ActionList.component-B_VABIdI.js";import"./debounce-DVDMisOT.js";import"./debounce-Cr0gYv9g.js";import"./toNumber-BuekqiaR.js";import"./Tab-BaASZVow.js";import"./NavItem-DvCCKZW5.js";import"./Intercom.component-C8oOySqr.js";import"./Typeahead.component-Dnl1nNDE.js";import"./index-BDXj0XPU.js";import"./usePopper-DGnPhFcy.js";import"./index-CXccLl9J.js";import"./index-BjrCEcJh.js";import"./Emphasis.component-BDl8yCTN.js";const d=()=>e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h2",{children:"Main Content Area"}),e.jsx("p",{children:"This is the main content area of the application."})]}),c=()=>e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("h3",{children:"Drawer Content"}),e.jsx("p",{children:"Drawer content goes here"})]}),He={title:"Components/Layout/Drawer",component:a,tags:["autodocs"]},h={render:()=>{const[r,t]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",onToggle:()=>t(!r),logo:e.jsx("span",{children:"Logo"}),title:"Drawer Example"}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},w={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("Edit me");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"With Editable Header"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:n,onEdit:()=>console.log("editing"),children:e.jsx(c,{})}),e.jsx(d,{})]})}},u={render:()=>{const[r,t]=o.useState(!1),[n,s]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Stacked Drawers"}),e.jsxs(a,{show:r,onClose:()=>t(!1),title:"First Drawer",children:[e.jsx("button",{onClick:()=>s(!0),children:"Open Second Drawer"}),e.jsx(c,{})]}),e.jsx(a,{show:n,onClose:()=>s(!1),title:"Second Drawer",children:e.jsx(c,{})}),e.jsx(d,{})]})}},p={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("tab1");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer With Tabs"}),e.jsxs(a,{show:r,onClose:()=>t(!1),children:[e.jsx(f,{items:[{key:"tab1",label:"Tab 1"},{key:"tab2",label:"Tab 2"}],selectedKey:n,onSelect:g=>s(g)}),e.jsxs("div",{style:{padding:"15px"},children:[n==="tab1"&&e.jsx("p",{children:"Content of Tab 1"}),n==="tab2"&&e.jsx("p",{children:"Content of Tab 2"})]})]}),e.jsx(d,{})]})}},m={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with SidePanel"}),e.jsx(T,{title:"Side Panel",show:n,onClose:()=>s(!1),children:e.jsx("p",{children:"Side panel content"})}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},S={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Custom Actions"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Custom Actions",actions:[{label:"Save",onClick:()=>console.log("save")},{label:"Cancel",onClick:()=>t(!1)}],children:e.jsx(c,{})}),e.jsx(d,{})]})}},x={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Large Content"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Large Content",children:e.jsx("div",{style:{padding:"15px"},children:Array.from({length:20},(n,s)=>e.jsxs("p",{children:["Item ",s+1," - This is some content"]},s))})}),e.jsx(d,{})]})}},C={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Scrollable Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Scrollable",maxHeight:300,children:e.jsx("div",{style:{padding:"15px",overflowY:"auto",maxHeight:"250px"},children:Array.from({length:50},(n,s)=>e.jsxs("p",{children:["Line ",s+1]},s))})}),e.jsx(d,{})]})}},b={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Custom Position Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Right Position",position:"right",children:e.jsx(c,{})}),e.jsx(d,{})]})}},D={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{style:{height:"100vh"},children:[e.jsx(l,{brand:"Talend",title:"Full Height Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Full Height",children:e.jsx(c,{})}),e.jsx(d,{})]})}},j={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Loading Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),isLoading:!0,children:e.jsx(c,{})}),e.jsx(d,{})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
