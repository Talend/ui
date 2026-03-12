import{j as r,x as P,au as k}from"./iframe-CytCQUUU.js";import{H as o,A as x}from"./HeaderBar.component-Dg-OZXI7.js";import"./index-D2jelG_f.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-Chj7wRCG.js";import"./toString-ccGXZRQ0.js";import"./isSymbol-Dk4nAFFy.js";import"./_setToString-ivLDk9y1.js";import"./_baseGet-D0GTZWOD.js";import"./eq-DB1Y3wb4.js";import"./_getTag-CBkgzLJu.js";import"./isArrayLike-B9AHzHAl.js";import"./Action.component-ekpn42YI.js";import"./ActionButton.component-BSdI9gBs.js";import"./TooltipTrigger.component-DsvBKGWh.js";import"./index-BgEi0J4W.js";import"./CircularProgress.component-DBKZ5Q5B.js";import"./constants-CZYEPhht.js";import"./translate-BkaTgoLM.js";import"./withTranslation-CIBsQi2s.js";import"./Skeleton.component-DzFxn6fU.js";import"./theme-D1CUrmcp.js";import"./OverlayTrigger.component-xINK76-b.js";import"./RootCloseWrapper-BaBSAX3p.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CAbvDgto.js";import"./Transition-Q4C-KkOJ.js";import"./Transition-Day0ijEo.js";import"./ActionSplitDropdown.component-CVYfZxbu.js";import"./SplitButton-kf-kJbI2.js";import"./inheritsLoose-BV6Y_Ibl.js";import"./get-CB4XSzUF.js";import"./DropdownButton-C7yqK0ME.js";import"./ActionIconToggle.component-CHvirMom.js";import"./Actions.component-BDo1cuIa.js";import"./Intercom.component-FpEfl0Mr.js";import"./Typeahead.component-CYM-VR96.js";import"./index-C2kApat2.js";import"./usePopper-CUofxkjM.js";import"./index-DKn75FDV.js";import"./index-cNE3O2_I.js";import"./Emphasis.component-BMa1BQ2G.js";const n={brand:{id:"header-brand",label:"Example App Name",onClick:()=>console.log("onApplicationNameClick")},logo:{id:"header-logo",onClick:()=>console.log("onLogoClick")},help:{id:"header-help",icon:"talend-question-circle",onClick:()=>console.log("onHelpClick")},user:{id:"header-user",items:[{id:"settings",icon:"talend-cog",label:"Settings",onClick:()=>console.log("onSettingsClick")}],name:"John Doe",firstName:"John",lastName:"Doe"},products:{items:[{icon:"talend-tdp-negative",key:"tdp",label:"Data Preparation"},{icon:"talend-tic-negative",key:"tic",label:"Integration Cloud"},{icon:"talend-tmc-negative",key:"tmc",label:"Management Console"}],onSelect:()=>console.log("onProductClick")}},t=e=>({...e,button:{...e.button,topRight:{...e.button.topRight,top:"48px"}}});function A(){return r.jsx(x,{...n.brand})}function v(){const e={color:"white",margin:"0 10px",width:"2rem",height:"2rem",borderRadius:"50%",background:"green",display:"flex",alignItems:"center",justifyContent:"center"};return r.jsx("div",{style:e,children:r.jsx(k,{name:"talend-bubbles"})})}const he={title:"Components/Navigation/HeaderBar",component:o,tags:["autodocs"]},s={render:()=>{const e=structuredClone(n);return r.jsx(o,{...e})},parameters:{info:{styles:t}}},a={render:()=>{const e=structuredClone(n);return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},i={render:()=>{const e=structuredClone({...n,products:null});return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},c={render:()=>{const e=structuredClone({...n,brand:{...n.brand,icon:"talend-tmc-negative"}});return r.jsx(o,{...e})},parameters:{info:{styles:t}}},l={render:()=>{const e=structuredClone({...n,brand:{...n.brand,iconUrl:P.getURL("/src/svg/products/tmc-negative.svg","@talend/icons")}});return r.jsx(o,{...e})},parameters:{info:{styles:t}}},p={render:()=>{const e=structuredClone(n);return e.env={id:"header-environment",items:[{label:"Runtime Environment",onClick:()=>console.log("onEnvClick")}],label:"Default"},r.jsx(o,{...e})},parameters:{info:{styles:t}}},d={render:()=>{const e=structuredClone(n);return e.notification={hasUnread:!0},r.jsx(o,{...e})},parameters:{info:{styles:t}}},m={render:()=>{const e=structuredClone(n);return e.notification={hasUnread:!1},r.jsx(o,{...e})},parameters:{info:{styles:t}}},u={render:()=>{const e=structuredClone(n);return e.help.items=[{icon:"talend-board",label:"Onboarding",onClick:()=>console.log("onOnboardingClick")},{icon:"talend-cog",label:"About",onClick:()=>console.log("onAboutClick")}],r.jsx(o,{...e})},parameters:{info:{styles:t}}},h={render:()=>{const e=structuredClone(n);return e.callToAction={bsStyle:"info",className:"btn-inverse",id:"header-call-to-action",label:"Subscribe now",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},g={render:()=>{const e=structuredClone(n);return e.genericAction={bsStyle:"link",id:"header-generic-action",icon:"talend-info-circle",label:"Talend Experience",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},f={render:()=>{const e=structuredClone(n);return e.user=null,e.information={id:"header-info",bsStyle:"link",icon:"talend-info-circle",label:"Information",hideLabel:!0,pullRight:!0,noCaret:!0,tooltipPlacement:"bottom",items:[{label:"Guided tour",onClick:()=>console.log("onOnboardingClick")},{divider:!0},{label:"Community",target:"_blank",href:"https://community.talend.com/"},{label:"Support",target:"_blank",href:"https://www.talend.com/services/technical-support/"}]},r.jsx(o,{...e})},parameters:{info:{styles:t}}},b={render:()=>r.jsx(o,{logo:n.logo,brand:n.brand,...n,intercom:{id:"intercom",config:{app_id:"j9pqsz4w",email:"toto@gmail.com"}}}),parameters:{info:{styles:t}}},C={render:()=>r.jsx(o,{}),parameters:{info:{styles:t}}},y={render:()=>r.jsx(o,{AppSwitcher:A}),parameters:{info:{styles:t}}},S={render:()=>r.jsx(o,{Intercom:v}),parameters:{info:{styles:t}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
