import{j as e}from"./iframe-DIB3-0BR.js";import{B as k,L as m}from"./index-U0p7ckJm.js";import"./DialogBackdrop-RDLrSwsF.js";import{D as o,B as b,c as d,f as h,b as y}from"./Skeleton-BFPFErrJ.js";import"./StackItem-qSIpPSEC.js";import"./QualityBar.component-D1Er04NA.js";import"./preload-helper-PPVm8Dsz.js";import"./Tooltip-DQ7pcu8v.js";import"./index-D8uPicF6.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-Dw8bnBfP.js";import"./RatioBar.component-D-VTL4ax.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,_={component:o,title:"Clickable/Dropdown"},r={render:t=>e.jsx(o,{...t,"aria-label":"Switch between Talend applications",items:[{icon:"talend-tdp-colored",label:"Link with icon",href:"https://tdp.cloud.talend.com",type:"link"},{icon:"talend-tmc-colored",label:"Button with icon",onClick:i("Button with icon clicked"),type:"button"}],children:e.jsx(d,{isDropdown:!0,onClick:()=>{},children:"App switcher"})})},l={render:t=>e.jsx(o,{...t,"aria-label":"Custom menu",items:[{label:"External link",href:"https://community.talend.com/s/?language=en_US",target:"_blank",type:"link"},{type:"divider"},{label:"Link",href:"/download",type:"link"},{label:"Another link",href:"/user",type:"link"},{type:"divider"},{label:"Button",onClick:()=>i("logged out"),type:"button"}],children:e.jsx(d,{isDropdown:!0,onClick:()=>{},children:"Dropdown"})})},s={render:t=>e.jsx(o,{...t,"aria-label":"Custom menu",items:[{type:"title",label:"This is a title"},{type:"divider"},{label:"Link",href:"/download",type:"link"},{label:"Another link",href:"/user",type:"link"}],children:e.jsx(y,{isDropdown:!0,onClick:()=>{},children:"Dropdown"})})},a=()=>e.jsx(k,{children:e.jsx(o,{"aria-label":"Custom menu",items:[{label:"Link",as:e.jsx(m,{to:"/destination"}),type:"link"},{label:"Another link",as:e.jsx(m,{to:"/destination-2"}),type:"link"}],children:e.jsx(h,{icon:"chevron-down",onClick:()=>{},children:"Dropdown"})})}),c={render:t=>e.jsx(o,{...t,"aria-label":"Custom menu",items:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eleifend justo. Donec ultrices justo sit amet lectus pellentesque ornare. Integer nec ultrices augue. Curabitur vel mi euismod ipsum fermentum vestibulum id non elit. Donec rhoncus est eu tristique lacinia. Maecenas a mi ut lectus commodo molestie nec sed ipsum. Morbi pellentesque nisi at libero scelerisque vestibulum. Fusce elementum volutpat lobortis. Vestibulum sed blandit est. Duis pulvinar, erat eget consectetur ornare, risus odio mattis velit, quis tempor turpis nulla viverra dolor. Suspendisse sapien tellus, iaculis a urna vel, dignissim dapibus ex.".split(" ").map(n=>({label:n,type:"button",onClick(){console.log(`${n} click`)}})),children:e.jsx(d,{isDropdown:!0,onClick:()=>{},children:"Dropdown"})})},u={render:t=>e.jsx(o,{...t,"aria-label":"Custom menu",items:["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ","Ut ultrices sit amet orci et venenatis.","Suspendisse potenti. Fusce tristique pretium quam a lacinia. ","Aliquam vel diam eu massa rhoncus tincidunt. ","Suspendisse diam lorem, consectetur mollis tincidunt vel, gravida ac tortor."].map(n=>({label:n,type:"button",onClick(){console.log(`${n} click`)}})),children:e.jsx(d,{isDropdown:!0,onClick:()=>{},children:"Dropdown"})})},p=()=>e.jsx(k,{children:e.jsx("span",{style:{padding:"20px"},children:e.jsx(o,{"aria-label":"Exhaustive contents demo",items:[{type:"title",label:"Title - Buttons are below"},{type:"divider"},{label:"Button",type:"button",onClick:()=>{i("clicked")}},{label:"Button selected",type:"button",onClick:()=>{i("clicked")},checked:!0},{label:"Button with icon",type:"button",icon:"zoom-plus",onClick:()=>{i("clicked")}},{label:"Button with too much copy to create an overflow",icon:"plus-stroke",type:"button",onClick:()=>{i("clicked")}},{type:"divider"},{type:"title",label:"Title - Links are below"},{type:"divider"},{label:"Link",type:"link",href:"/doc"},{label:"Link with icon",type:"link",href:"/doc",icon:"plus-stroke"},{label:"Router link with too much copy to create an overflow",type:"link",icon:"plus-stroke","data-testid":"link-as","data-test":"link-as",as:e.jsx(m,{to:"/documentation"})},{label:"External link with too much copy to create an overflow",type:"link",icon:"plus-stroke",target:"_blank",href:"https://talend.com"}],children:e.jsx(b,{onClick:()=>{},isDropdown:!0,children:"Dropdown"})})})});r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Dropdown {...props} aria-label="Switch between Talend applications" items={[{
    icon: 'talend-tdp-colored',
    label: 'Link with icon',
    href: 'https://tdp.cloud.talend.com',
    type: 'link'
  }, {
    icon: 'talend-tmc-colored',
    label: 'Button with icon',
    onClick: action('Button with icon clicked'),
    type: 'button'
  }]}>
            <ButtonTertiary isDropdown onClick={() => {}}>
                App switcher
            </ButtonTertiary>
        </Dropdown>
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Dropdown {...props} aria-label="Custom menu" items={[{
    label: 'External link',
    href: 'https://community.talend.com/s/?language=en_US',
    target: '_blank',
    type: 'link'
  }, {
    type: 'divider'
  }, {
    label: 'Link',
    href: '/download',
    type: 'link'
  }, {
    label: 'Another link',
    href: '/user',
    type: 'link'
  }, {
    type: 'divider'
  }, {
    label: 'Button',
    onClick: () => action('logged out'),
    type: 'button'
  }]}>
            <ButtonTertiary isDropdown onClick={() => {}}>
                Dropdown
            </ButtonTertiary>
        </Dropdown>
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Dropdown {...props} aria-label="Custom menu" items={[{
    type: 'title',
    label: 'This is a title'
  }, {
    type: 'divider'
  }, {
    label: 'Link',
    href: '/download',
    type: 'link'
  }, {
    label: 'Another link',
    href: '/user',
    type: 'link'
  }]}>
            <ButtonSecondary isDropdown onClick={() => {}}>
                Dropdown
            </ButtonSecondary>
        </Dropdown>
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <Dropdown aria-label="Custom menu" items={[{
    label: 'Link',
    as: <RouterLink to="/destination" />,
    type: 'link'
  }, {
    label: 'Another link',
    as: <RouterLink to="/destination-2" />,
    type: 'link'
  }]}>
            <ButtonIcon icon="chevron-down" onClick={() => {}}>
                Dropdown
            </ButtonIcon>
        </Dropdown>
    </BrowserRouter>`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Dropdown {...props} aria-label="Custom menu" items={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae eleifend justo. Donec ultrices justo sit amet lectus pellentesque ornare. Integer nec ultrices augue. Curabitur vel mi euismod ipsum fermentum vestibulum id non elit. Donec rhoncus est eu tristique lacinia. Maecenas a mi ut lectus commodo molestie nec sed ipsum. Morbi pellentesque nisi at libero scelerisque vestibulum. Fusce elementum volutpat lobortis. Vestibulum sed blandit est. Duis pulvinar, erat eget consectetur ornare, risus odio mattis velit, quis tempor turpis nulla viverra dolor. Suspendisse sapien tellus, iaculis a urna vel, dignissim dapibus ex.'.split(' ').map(word => ({
    label: word,
    type: 'button',
    onClick() {
      // eslint-disable-next-line no-console
      console.log(\`\${word} click\`);
    }
  }))}>
            <ButtonTertiary isDropdown onClick={() => {}}>
                Dropdown
            </ButtonTertiary>
        </Dropdown>
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: (props: Story) => <Dropdown {...props} aria-label="Custom menu" items={['Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 'Ut ultrices sit amet orci et venenatis.', 'Suspendisse potenti. Fusce tristique pretium quam a lacinia. ', 'Aliquam vel diam eu massa rhoncus tincidunt. ', 'Suspendisse diam lorem, consectetur mollis tincidunt vel, gravida ac tortor.'].map(sentence => ({
    label: sentence,
    type: 'button',
    onClick() {
      // eslint-disable-next-line no-console
      console.log(\`\${sentence} click\`);
    }
  }))}>
            <ButtonTertiary isDropdown onClick={() => {}}>
                Dropdown
            </ButtonTertiary>
        </Dropdown>
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <BrowserRouter>
        <span style={{
    padding: '20px'
  }}>
            <Dropdown aria-label="Exhaustive contents demo" items={[{
      type: 'title',
      label: 'Title - Buttons are below'
    }, {
      type: 'divider'
    }, {
      label: 'Button',
      type: 'button',
      onClick: () => {
        action('clicked');
      }
    }, {
      label: 'Button selected',
      type: 'button',
      onClick: () => {
        action('clicked');
      },
      checked: true
    }, {
      label: 'Button with icon',
      type: 'button',
      icon: 'zoom-plus',
      onClick: () => {
        action('clicked');
      }
    }, {
      label: 'Button with too much copy to create an overflow',
      icon: 'plus-stroke',
      type: 'button',
      onClick: () => {
        action('clicked');
      }
    }, {
      type: 'divider'
    }, {
      type: 'title',
      label: 'Title - Links are below'
    }, {
      type: 'divider'
    }, {
      label: 'Link',
      type: 'link',
      href: '/doc'
    }, {
      label: 'Link with icon',
      type: 'link',
      href: '/doc',
      icon: 'plus-stroke'
    }, {
      label: 'Router link with too much copy to create an overflow',
      type: 'link',
      icon: 'plus-stroke',
      'data-testid': 'link-as',
      'data-test': 'link-as',
      as: <RouterLink to="/documentation" />
    }, {
      label: 'External link with too much copy to create an overflow',
      type: 'link',
      icon: 'plus-stroke',
      target: '_blank',
      href: 'https://talend.com'
    }]}>
                <ButtonPrimary onClick={() => {}} isDropdown>
                    Dropdown
                </ButtonPrimary>
            </Dropdown>
        </span>
    </BrowserRouter>`,...p.parameters?.docs?.source}}};const R=["WithIcons","WithDividers","WithTitle","WithRouterLinks","WithManyItems","WithLongText","Basic"];export{p as Basic,l as WithDividers,r as WithIcons,u as WithLongText,c as WithManyItems,a as WithRouterLinks,s as WithTitle,R as __namedExportsOrder,_ as default};
