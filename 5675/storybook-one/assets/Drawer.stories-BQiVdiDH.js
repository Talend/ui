import{r as o,j as e}from"./iframe-Fv_vVGZN.js";import{D as a,L as i,S as T}from"./SidePanel.component-ynwDAEeI.js";import{T as f}from"./TabBar.component-DEw7Eyn5.js";import{H as l}from"./HeaderBar.component-CvnaAO0Y.js";import"./preload-helper-PPVm8Dsz.js";import"./OverlayTrigger.component-C19J5ewi.js";import"./RootCloseWrapper-C4S0M7VT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BDkcGskv.js";import"./Transition-CV9ZxHzg.js";import"./Transition-BMiB0AlX.js";import"./omit-BbxJ_pGP.js";import"./toString-Dlr6kBM4.js";import"./isSymbol-CNKm9IEk.js";import"./_setToString-B_239-ah.js";import"./_baseGet-4_z8tnd-.js";import"./eq-McJnFt1I.js";import"./_getTag-BnrjvEwI.js";import"./isArrayLike-CWL7q3nM.js";import"./index-DLd9iNva.js";import"./removeClass-B-DUduzN.js";import"./get-Dtrs5e6d.js";import"./noop-Bot40Z5M.js";import"./noop-BdyXNs-O.js";import"./ActionBar.component-DyH-MCwm.js";import"./Action.component-DU21-Msq.js";import"./ActionButton.component-BGrLFd2s.js";import"./TooltipTrigger.component-eBDOtZP9.js";import"./index-MMEptsc7.js";import"./CircularProgress.component-D0r9lOI7.js";import"./constants-CZYEPhht.js";import"./translate-D9s1Bjkz.js";import"./withTranslation-CTObs2UP.js";import"./Skeleton.component-D6yy3OnK.js";import"./index-CprQB1Z1.js";import"./theme-D6f1aVid.js";import"./ActionSplitDropdown.component-DJmXjSVq.js";import"./SplitButton-enRAsFA9.js";import"./inheritsLoose-CQRarj6Q.js";import"./DropdownButton-Dj19_MGA.js";import"./ActionIconToggle.component-iHtCGVrb.js";import"./Actions.component-r4v7brPZ.js";import"./EditableText.component-C2xecjzK.js";import"./FocusManager.component-CofoSDdo.js";import"./ActionList.component-BBsQdrBv.js";import"./debounce-DKzuwe06.js";import"./debounce-BGAq-WH6.js";import"./toNumber-BhB94Asb.js";import"./Tab-DhExr7KR.js";import"./NavItem-D91X6NxC.js";import"./Intercom.component-BJLPuNp7.js";import"./Typeahead.component-BpcU05bd.js";import"./index-C4mwJ9A3.js";import"./usePopper-CQFCA5aA.js";import"./index-ByNcQzVm.js";import"./index-DBmIotRA.js";import"./Emphasis.component-Dr0U2jZk.js";const d=()=>e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h2",{children:"Main Content Area"}),e.jsx("p",{children:"This is the main content area of the application."})]}),c=()=>e.jsxs("div",{style:{padding:"15px"},children:[e.jsx("h3",{children:"Drawer Content"}),e.jsx("p",{children:"Drawer content goes here"})]}),He={title:"Components/Layout/Drawer",component:a,tags:["autodocs"]},h={render:()=>{const[r,t]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",onToggle:()=>t(!r),logo:e.jsx("span",{children:"Logo"}),title:"Drawer Example"}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},w={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("Edit me");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"With Editable Header"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:n,onEdit:()=>console.log("editing"),children:e.jsx(c,{})}),e.jsx(d,{})]})}},u={render:()=>{const[r,t]=o.useState(!1),[n,s]=o.useState(!1);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Stacked Drawers"}),e.jsxs(a,{show:r,onClose:()=>t(!1),title:"First Drawer",children:[e.jsx("button",{onClick:()=>s(!0),children:"Open Second Drawer"}),e.jsx(c,{})]}),e.jsx(a,{show:n,onClose:()=>s(!1),title:"Second Drawer",children:e.jsx(c,{})}),e.jsx(d,{})]})}},p={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState("tab1");return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer With Tabs"}),e.jsxs(a,{show:r,onClose:()=>t(!1),children:[e.jsx(f,{items:[{key:"tab1",label:"Tab 1"},{key:"tab2",label:"Tab 2"}],selectedKey:n,onSelect:g=>s(g)}),e.jsxs("div",{style:{padding:"15px"},children:[n==="tab1"&&e.jsx("p",{children:"Content of Tab 1"}),n==="tab2"&&e.jsx("p",{children:"Content of Tab 2"})]})]}),e.jsx(d,{})]})}},m={render:()=>{const[r,t]=o.useState(!0),[n,s]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with SidePanel"}),e.jsx(T,{title:"Side Panel",show:n,onClose:()=>s(!1),children:e.jsx("p",{children:"Side panel content"})}),e.jsx(a,{show:r,onClose:()=>t(!1),children:e.jsx(c,{})}),e.jsx(d,{})]})}},S={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Custom Actions"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Custom Actions",actions:[{label:"Save",onClick:()=>console.log("save")},{label:"Cancel",onClick:()=>t(!1)}],children:e.jsx(c,{})}),e.jsx(d,{})]})}},x={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Drawer with Large Content"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Large Content",children:e.jsx("div",{style:{padding:"15px"},children:Array.from({length:20},(n,s)=>e.jsxs("p",{children:["Item ",s+1," - This is some content"]},s))})}),e.jsx(d,{})]})}},C={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Scrollable Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Scrollable",maxHeight:300,children:e.jsx("div",{style:{padding:"15px",overflowY:"auto",maxHeight:"250px"},children:Array.from({length:50},(n,s)=>e.jsxs("p",{children:["Line ",s+1]},s))})}),e.jsx(d,{})]})}},b={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Custom Position Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Right Position",position:"right",children:e.jsx(c,{})}),e.jsx(d,{})]})}},D={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{style:{height:"100vh"},children:[e.jsx(l,{brand:"Talend",title:"Full Height Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),title:"Full Height",children:e.jsx(c,{})}),e.jsx(d,{})]})}},j={render:()=>{const[r,t]=o.useState(!0);return e.jsxs(i,{children:[e.jsx(l,{brand:"Talend",title:"Loading Drawer"}),e.jsx(a,{show:r,onClose:()=>t(!1),isLoading:!0,children:e.jsx(c,{})}),e.jsx(d,{})]})}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
