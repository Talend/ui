import{j as r,x as P,au as k}from"./iframe-gYF_G_fE.js";import{H as o,A as x}from"./HeaderBar.component-C3ZJRSt9.js";import"./index-fhOEXeee.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-BYAik5n-.js";import"./toString-KzU2lKBf.js";import"./isSymbol-DWn58mtK.js";import"./_setToString-Bft5b4bW.js";import"./_baseGet-BpHqkg2j.js";import"./eq-CXZE_YOC.js";import"./_getTag-CtJ5ewXi.js";import"./isArrayLike-DL1Iy8XB.js";import"./Action.component-Br0NjqE0.js";import"./ActionButton.component-BEPjXJOh.js";import"./TooltipTrigger.component-Cq3j2j1T.js";import"./index-BvzjzKmP.js";import"./CircularProgress.component-DVjiN9Cy.js";import"./constants-CZYEPhht.js";import"./translate-CqNlcqFg.js";import"./withTranslation-b-d2pe2u.js";import"./Skeleton.component-3xVHTWN3.js";import"./theme-BVcRJK3s.js";import"./OverlayTrigger.component-B6dmMou1.js";import"./RootCloseWrapper-xrEj3CJP.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cs4fQJvl.js";import"./Transition-fVWzjx8U.js";import"./Transition-6GZi0dnD.js";import"./ActionSplitDropdown.component-Bp4zP5Ce.js";import"./SplitButton-CStUta-K.js";import"./inheritsLoose-VTIw4njF.js";import"./get-BVX_P4PF.js";import"./DropdownButton-D06ht9G5.js";import"./ActionIconToggle.component-BFP8ry7f.js";import"./Actions.component-DVRRfGwT.js";import"./Intercom.component-CuFt4eeO.js";import"./Typeahead.component-BslVugrW.js";import"./index-tmsB8_6r.js";import"./usePopper-B-GRv-V0.js";import"./index-B4AlwF7Q.js";import"./index-FoHZtXG_.js";import"./Emphasis.component-D3U0-_8A.js";const n={brand:{id:"header-brand",label:"Example App Name",onClick:()=>console.log("onApplicationNameClick")},logo:{id:"header-logo",onClick:()=>console.log("onLogoClick")},help:{id:"header-help",icon:"talend-question-circle",onClick:()=>console.log("onHelpClick")},user:{id:"header-user",items:[{id:"settings",icon:"talend-cog",label:"Settings",onClick:()=>console.log("onSettingsClick")}],name:"John Doe",firstName:"John",lastName:"Doe"},products:{items:[{icon:"talend-tdp-negative",key:"tdp",label:"Data Preparation"},{icon:"talend-tic-negative",key:"tic",label:"Integration Cloud"},{icon:"talend-tmc-negative",key:"tmc",label:"Management Console"}],onSelect:()=>console.log("onProductClick")}},t=e=>({...e,button:{...e.button,topRight:{...e.button.topRight,top:"48px"}}});function A(){return r.jsx(x,{...n.brand})}function v(){const e={color:"white",margin:"0 10px",width:"2rem",height:"2rem",borderRadius:"50%",background:"green",display:"flex",alignItems:"center",justifyContent:"center"};return r.jsx("div",{style:e,children:r.jsx(k,{name:"talend-bubbles"})})}const he={title:"Components/Navigation/HeaderBar",component:o,tags:["autodocs"]},s={render:()=>{const e=structuredClone(n);return r.jsx(o,{...e})},parameters:{info:{styles:t}}},a={render:()=>{const e=structuredClone(n);return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},i={render:()=>{const e=structuredClone({...n,products:null});return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},c={render:()=>{const e=structuredClone({...n,brand:{...n.brand,icon:"talend-tmc-negative"}});return r.jsx(o,{...e})},parameters:{info:{styles:t}}},l={render:()=>{const e=structuredClone({...n,brand:{...n.brand,iconUrl:P.getURL("/src/svg/products/tmc-negative.svg","@talend/icons")}});return r.jsx(o,{...e})},parameters:{info:{styles:t}}},p={render:()=>{const e=structuredClone(n);return e.env={id:"header-environment",items:[{label:"Runtime Environment",onClick:()=>console.log("onEnvClick")}],label:"Default"},r.jsx(o,{...e})},parameters:{info:{styles:t}}},d={render:()=>{const e=structuredClone(n);return e.notification={hasUnread:!0},r.jsx(o,{...e})},parameters:{info:{styles:t}}},m={render:()=>{const e=structuredClone(n);return e.notification={hasUnread:!1},r.jsx(o,{...e})},parameters:{info:{styles:t}}},u={render:()=>{const e=structuredClone(n);return e.help.items=[{icon:"talend-board",label:"Onboarding",onClick:()=>console.log("onOnboardingClick")},{icon:"talend-cog",label:"About",onClick:()=>console.log("onAboutClick")}],r.jsx(o,{...e})},parameters:{info:{styles:t}}},h={render:()=>{const e=structuredClone(n);return e.callToAction={bsStyle:"info",className:"btn-inverse",id:"header-call-to-action",label:"Subscribe now",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},g={render:()=>{const e=structuredClone(n);return e.genericAction={bsStyle:"link",id:"header-generic-action",icon:"talend-info-circle",label:"Talend Experience",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},f={render:()=>{const e=structuredClone(n);return e.user=null,e.information={id:"header-info",bsStyle:"link",icon:"talend-info-circle",label:"Information",hideLabel:!0,pullRight:!0,noCaret:!0,tooltipPlacement:"bottom",items:[{label:"Guided tour",onClick:()=>console.log("onOnboardingClick")},{divider:!0},{label:"Community",target:"_blank",href:"https://community.talend.com/"},{label:"Support",target:"_blank",href:"https://www.talend.com/services/technical-support/"}]},r.jsx(o,{...e})},parameters:{info:{styles:t}}},b={render:()=>r.jsx(o,{logo:n.logo,brand:n.brand,...n,intercom:{id:"intercom",config:{app_id:"j9pqsz4w",email:"toto@gmail.com"}}}),parameters:{info:{styles:t}}},C={render:()=>r.jsx(o,{}),parameters:{info:{styles:t}}},y={render:()=>r.jsx(o,{AppSwitcher:A}),parameters:{info:{styles:t}}},S={render:()=>r.jsx(o,{Intercom:v}),parameters:{info:{styles:t}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.logo.isFull = true;
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone({
      ...props,
      products: null
    });
    headerProps.logo.isFull = true;
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone({
      ...props,
      brand: {
        ...props.brand,
        icon: 'talend-tmc-negative'
      }
    });
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone({
      ...props,
      brand: {
        ...props.brand,
        iconUrl: assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')
      }
    });
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.env = {
      id: 'header-environment',
      items: [{
        label: 'Runtime Environment',
        onClick: () => console.log('onEnvClick')
      }],
      label: 'Default'
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.notification = {
      hasUnread: true
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.notification = {
      hasUnread: false
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.help.items = [{
      icon: 'talend-board',
      label: 'Onboarding',
      onClick: () => console.log('onOnboardingClick')
    }, {
      icon: 'talend-cog',
      label: 'About',
      onClick: () => console.log('onAboutClick')
    }];
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.callToAction = {
      bsStyle: 'info',
      className: 'btn-inverse',
      id: 'header-call-to-action',
      label: 'Subscribe now',
      onClick: () => console.log('onActionClick')
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.genericAction = {
      bsStyle: 'link',
      id: 'header-generic-action',
      icon: 'talend-info-circle',
      label: 'Talend Experience',
      onClick: () => console.log('onActionClick')
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = structuredClone(props);
    headerProps.user = null;
    headerProps.information = {
      id: 'header-info',
      bsStyle: 'link',
      icon: 'talend-info-circle',
      label: 'Information',
      hideLabel: true,
      pullRight: true,
      noCaret: true,
      tooltipPlacement: 'bottom',
      items: [{
        label: 'Guided tour',
        onClick: () => console.log('onOnboardingClick')
      }, {
        divider: true
      }, {
        label: 'Community',
        target: '_blank',
        href: 'https://community.talend.com/'
      }, {
        label: 'Support',
        target: '_blank',
        href: 'https://www.talend.com/services/technical-support/'
      }]
    };
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar logo={props.logo} brand={props.brand} {...props} intercom={{
    id: 'intercom',
    config: {
      app_id: 'j9pqsz4w',
      email: 'toto@gmail.com'
    }
  }} />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...C.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar AppSwitcher={AppSwitcherComponent} />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar Intercom={IntercomComponent} />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...S.parameters?.docs?.source}}};const ge=["Default","WithFullLogo","WithoutProducts","WithBrandIcon","WithBrandIconUrl","WithEnvironmentDropdown","WithUnreadNotifications","WithReadNotifications","WithHelpSplitDropdown","WithCallToAction","WithGenericAction","WithoutUserAndWithInformation","Intercom","Barebone","CustomAppSwitcher","CustomIntercom"];export{C as Barebone,y as CustomAppSwitcher,S as CustomIntercom,s as Default,b as Intercom,c as WithBrandIcon,l as WithBrandIconUrl,h as WithCallToAction,p as WithEnvironmentDropdown,a as WithFullLogo,g as WithGenericAction,u as WithHelpSplitDropdown,m as WithReadNotifications,d as WithUnreadNotifications,i as WithoutProducts,f as WithoutUserAndWithInformation,ge as __namedExportsOrder,he as default};
