import{j as a,r as h}from"./iframe-tG6QAxGp.js";import{V as t,l as b}from"./DialogBackdrop-N06p4J8i.js";import"./Skeleton-L7DFVFIl.js";import{S as m,a as T}from"./StackItem-D6bOdz6V.js";import"./QualityBar.component-BZc_QuRi.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-B3Nh8BJ6.js";import"./index-lfDkKVxQ.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-BXOwPJfR.js";import"./RatioBar.component-CcljfwSJ.js";const K={component:t,title:"Navigation/Tabs"},e=()=>a.jsxs(m,{gap:"M",justify:"spaceBetween",children:[a.jsxs(T,{gap:"S",align:"center",children:[a.jsx("h2",{children:"Default"}),a.jsxs(t.Container,{defaultActiveKey:"profile",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"home",title:"Home"}),a.jsx(t.Tab,{"aria-controls":"profile",title:"Profile"}),a.jsx(t.Tab,{"aria-controls":"contact",title:"Contact",disabled:!0})]}),a.jsx(t.Panel,{id:"home",children:"Tab content for Home"}),a.jsx(t.Panel,{id:"profile",children:"Tab content for Profile"}),a.jsx(t.Panel,{id:"contact",children:"Tab content for Contact"})]})]}),a.jsxs(T,{gap:"S",align:"center",children:[a.jsx("h2",{children:"Large"}),a.jsxs(t.Container,{size:"L",defaultActiveKey:"profile",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"home",title:"Home"}),a.jsx(t.Tab,{"aria-controls":"profile",title:"Profile"}),a.jsx(t.Tab,{"aria-controls":"contact",title:"Contact",disabled:!0})]}),a.jsx(t.Panel,{id:"home",children:"Tab content for Home"}),a.jsx(t.Panel,{id:"profile",children:"Tab content for Profile"}),a.jsx(t.Panel,{id:"contact",children:"Tab content for Contact"})]})]})]}),n=()=>a.jsx(t,{tabs:[{tabTitle:{icon:"user",title:"User",error:!0},tabContent:a.jsx("h2",{children:"Users tab content"})},{tabTitle:{icon:"calendar",title:"Calendar"},tabContent:a.jsx("h2",{children:"Calendar tab content"})}]}),r=()=>a.jsxs(t.Container,{defaultActiveKey:"profile",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"user",title:"User",icon:"user"}),a.jsx(t.Tab,{"aria-controls":"calendar",title:"Calendar",icon:"calendar"}),a.jsx(t.Tab,{"aria-controls":"favorite",title:"Favorite",icon:"star",disabled:!0})]}),a.jsx(t.Panel,{id:"user",children:"Users tab content"}),a.jsx(t.Panel,{id:"calendar",children:"Calendar tab content"}),a.jsx(t.Panel,{id:"favorite",children:"Favorite tab content"})]}),o=()=>a.jsxs(t.Container,{defaultActiveKey:"profile",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"user",title:"User",icon:"user",tag:13}),a.jsx(t.Tab,{"aria-controls":"calendar",title:"Calendar",icon:"calendar",tag:54}),a.jsx(t.Tab,{"aria-controls":"favorite",title:"Favorite",icon:"star",tag:"999+",tooltip:"1534 Favorite items"})]}),a.jsx(t.Panel,{id:"user",children:"Users tab content"}),a.jsx(t.Panel,{id:"calendar",children:"Calendar tab content"}),a.jsx(t.Panel,{id:"favorite",children:"Favorite tab content"})]}),s=()=>a.jsxs(t.Container,{defaultActiveKey:"user",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"user",title:"User",icon:"user",tag:13}),a.jsx(t.Tab,{"aria-controls":"notification",title:"A much too long title that will trigger the overflow limit",icon:"information-stroke",tag:"999+",tooltip:"1239 notifications - A much too long title that will trigger the overflow limit"})]}),a.jsx(t.Panel,{id:"user",children:"Users tab content"}),a.jsx(t.Panel,{id:"notification",children:a.jsx("h2",{children:"About tab content"})})]}),i=()=>{const[d,u]=h.useState("home");return a.jsxs(t.Container,{activeKey:d,onSelect:(p,f)=>u(f),children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"home",title:"Home"}),a.jsx(t.Tab,{"aria-controls":"profile",title:"Profile"}),a.jsx(t.Tab,{"aria-controls":"contact",title:"Contact",disabled:!0})]}),a.jsx(t.Panel,{id:"home",children:"Tab content for Home"}),a.jsx(t.Panel,{id:"profile",children:"Tab content for Profile"}),a.jsx(t.Panel,{id:"contact",children:"Tab content for Contact"})]})},l=()=>a.jsxs(t.Container,{defaultActiveKey:"profile",children:[a.jsxs(t.List,{children:[a.jsx(t.Tab,{"aria-controls":"user",title:"User",icon:"user",tag:13,statusDot:b.beta}),a.jsx(t.Tab,{"aria-controls":"calendar",title:"Calendar",icon:"calendar",tag:54,statusDot:b.information}),a.jsx(t.Tab,{"aria-controls":"favorite",title:"Favorite",icon:"star",tag:"999+",tooltip:"1534 Favorite items",statusDot:b.success})]}),a.jsx(t.Panel,{id:"user",children:"Users tab content"}),a.jsx(t.Panel,{id:"calendar",children:"Calendar tab content"}),a.jsx(t.Panel,{id:"favorite",children:"Favorite tab content"})]}),c=()=>a.jsx(t,{tabs:[{tabTitle:"Tabs 1",tabContent:a.jsx(a.Fragment,{children:"Tab 1"})},{tabTitle:{title:"Tabs 2"},tabContent:a.jsx(a.Fragment,{children:"Tab 2"})},{tabTitle:{title:"Tabs 3",icon:"user",tag:"999+",tooltip:"1534 Favorite"},tabContent:a.jsx(a.Fragment,{children:"Tab 3"})}]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <StackHorizontal gap="M" justify="spaceBetween">
        <StackVertical gap="S" align="center">
            <h2>Default</h2>
            <Tabs.Container defaultActiveKey="profile">
                <Tabs.List>
                    <Tabs.Tab aria-controls="home" title="Home" />
                    <Tabs.Tab aria-controls="profile" title="Profile" />
                    <Tabs.Tab aria-controls="contact" title="Contact" disabled />
                </Tabs.List>
                <Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
                <Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
                <Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
            </Tabs.Container>
        </StackVertical>
        <StackVertical gap="S" align="center">
            <h2>Large</h2>
            <Tabs.Container size="L" defaultActiveKey="profile">
                <Tabs.List>
                    <Tabs.Tab aria-controls="home" title="Home" />
                    <Tabs.Tab aria-controls="profile" title="Profile" />
                    <Tabs.Tab aria-controls="contact" title="Contact" disabled />
                </Tabs.List>
                <Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
                <Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
                <Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
            </Tabs.Container>
        </StackVertical>
    </StackHorizontal>`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <Tabs tabs={[{
  tabTitle: {
    icon: 'user',
    title: 'User',
    error: true
  },
  tabContent: <h2>Users tab content</h2>
}, {
  tabTitle: {
    icon: 'calendar',
    title: 'Calendar'
  },
  tabContent: <h2>Calendar tab content</h2>
}]} />`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <Tabs.Container defaultActiveKey="profile">
        <Tabs.List>
            <Tabs.Tab aria-controls="user" title="User" icon="user" />
            <Tabs.Tab aria-controls="calendar" title="Calendar" icon="calendar" />
            <Tabs.Tab aria-controls="favorite" title="Favorite" icon="star" disabled />
        </Tabs.List>
        <Tabs.Panel id="user">Users tab content</Tabs.Panel>
        <Tabs.Panel id="calendar">Calendar tab content</Tabs.Panel>
        <Tabs.Panel id="favorite">Favorite tab content</Tabs.Panel>
    </Tabs.Container>`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <Tabs.Container defaultActiveKey="profile">
        <Tabs.List>
            <Tabs.Tab aria-controls="user" title="User" icon="user" tag={13} />
            <Tabs.Tab aria-controls="calendar" title="Calendar" icon="calendar" tag={54} />
            <Tabs.Tab aria-controls="favorite" title="Favorite" icon="star" tag="999+" tooltip="1534 Favorite items" />
        </Tabs.List>
        <Tabs.Panel id="user">Users tab content</Tabs.Panel>
        <Tabs.Panel id="calendar">Calendar tab content</Tabs.Panel>
        <Tabs.Panel id="favorite">Favorite tab content</Tabs.Panel>
    </Tabs.Container>`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <Tabs.Container defaultActiveKey="user">
        <Tabs.List>
            <Tabs.Tab aria-controls="user" title="User" icon="user" tag={13} />
            <Tabs.Tab aria-controls="notification" title="A much too long title that will trigger the overflow limit" icon="information-stroke" tag="999+" tooltip="1239 notifications - A much too long title that will trigger the overflow limit" />
        </Tabs.List>
        <Tabs.Panel id="user">Users tab content</Tabs.Panel>
        <Tabs.Panel id="notification">
            <h2>About tab content</h2>
        </Tabs.Panel>
    </Tabs.Container>`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const [key, setKey] = useState<string>('home');
  return <Tabs.Container activeKey={key} onSelect={(e, k) => setKey(k)}>
            <Tabs.List>
                <Tabs.Tab aria-controls="home" title="Home" />
                <Tabs.Tab aria-controls="profile" title="Profile" />
                <Tabs.Tab aria-controls="contact" title="Contact" disabled />
            </Tabs.List>
            <Tabs.Panel id="home">Tab content for Home</Tabs.Panel>
            <Tabs.Panel id="profile">Tab content for Profile</Tabs.Panel>
            <Tabs.Panel id="contact">Tab content for Contact</Tabs.Panel>
        </Tabs.Container>;
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  return <Tabs.Container defaultActiveKey="profile">
            <Tabs.List>
                <Tabs.Tab aria-controls="user" title="User" icon="user" tag={13} statusDot={StatusDotVariants.beta} />
                <Tabs.Tab aria-controls="calendar" title="Calendar" icon="calendar" tag={54} statusDot={StatusDotVariants.information} />
                <Tabs.Tab aria-controls="favorite" title="Favorite" icon="star" tag="999+" tooltip="1534 Favorite items" statusDot={StatusDotVariants.success} />
            </Tabs.List>
            <Tabs.Panel id="user">Users tab content</Tabs.Panel>
            <Tabs.Panel id="calendar">Calendar tab content</Tabs.Panel>
            <Tabs.Panel id="favorite">Favorite tab content</Tabs.Panel>
        </Tabs.Container>;
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <Tabs tabs={[{
  tabTitle: 'Tabs 1',
  tabContent: <>Tab 1</>
}, {
  tabTitle: {
    title: 'Tabs 2'
  },
  tabContent: <>Tab 2</>
}, {
  tabTitle: {
    title: 'Tabs 3',
    icon: 'user',
    tag: '999+',
    tooltip: '1534 Favorite'
  },
  tabContent: <>Tab 3</>
}]} />`,...c.parameters?.docs?.source}}};const k=["Styles","TabsWithError","TabsWithIcon","TabsWithTag","TabsWithLongTitles","TabStandaloneControlled","TabsWithStatusDot","TabAPI"];export{e as Styles,c as TabAPI,i as TabStandaloneControlled,n as TabsWithError,r as TabsWithIcon,s as TabsWithLongTitles,l as TabsWithStatusDot,o as TabsWithTag,k as __namedExportsOrder,K as default};
