import{j as r,aO as a,x as J,au as k}from"./iframe-BPWKJ2_o.js";import{H as o,A as I}from"./HeaderBar.component-_DwfAy-6.js";import"./index-BRrpl1wo.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-Dp4FCWoh.js";import"./toString-RNHQn9jk.js";import"./isSymbol-DtjENQP0.js";import"./_baseSlice-DRoy53G4.js";import"./_baseGet-GCSfqC3R.js";import"./eq-CT9ytHj1.js";import"./_getTag-KzPaKQG2.js";import"./isArrayLike-BnxJKSWE.js";import"./Action.component-CGKdISv0.js";import"./ActionButton.component-nOOll17V.js";import"./TooltipTrigger.component-Cqzsa5JT.js";import"./index-B5TGO0So.js";import"./CircularProgress.component-COR0Xrwv.js";import"./constants-CZYEPhht.js";import"./translate-q8yQChef.js";import"./withTranslation-ByA2ZQp2.js";import"./Skeleton.component-DsXVPtu7.js";import"./theme-Cj2Fm6kQ.js";import"./OverlayTrigger.component-aV17y0dX.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpIv-jbF.js";import"./Transition-CPW5JkxA.js";import"./Transition-5lMdqHLm.js";import"./ActionSplitDropdown.component-8PenvcAp.js";import"./SplitButton-C2kpOeLT.js";import"./inheritsLoose-DEJIaahp.js";import"./get-6sLcuglD.js";import"./DropdownButton-BvV7HSyt.js";import"./ActionIconToggle.component-ugUZNPkA.js";import"./Actions.component-ChOdem63.js";import"./Intercom.component-Cbbt0b8P.js";import"./Typeahead.component-DHnYIZjM.js";import"./index-Rbgy7uSV.js";import"./usePopper-CM0sjsC9.js";import"./index-CPccb1WS.js";import"./index-B5EOfhho.js";import"./Emphasis.component-FHiBuwIi.js";const n={brand:{id:"header-brand",label:"Example App Name",onClick:()=>console.log("onApplicationNameClick")},logo:{id:"header-logo",onClick:()=>console.log("onLogoClick")},help:{id:"header-help",icon:"talend-question-circle",onClick:()=>console.log("onHelpClick")},user:{id:"header-user",items:[{id:"settings",icon:"talend-cog",label:"Settings",onClick:()=>console.log("onSettingsClick")}],name:"John Doe",firstName:"John",lastName:"Doe"},products:{items:[{icon:"talend-tdp-negative",key:"tdp",label:"Data Preparation"},{icon:"talend-tic-negative",key:"tic",label:"Integration Cloud"},{icon:"talend-tmc-negative",key:"tmc",label:"Management Console"}],onSelect:()=>console.log("onProductClick")}},t=e=>({...e,button:{...e.button,topRight:{...e.button.topRight,top:"48px"}}});function x(){return r.jsx(I,{...n.brand})}function A(){const e={color:"white",margin:"0 10px",width:"2rem",height:"2rem",borderRadius:"50%",background:"green",display:"flex",alignItems:"center",justifyContent:"center"};return r.jsx("div",{style:e,children:r.jsx(k,{name:"talend-bubbles"})})}const fe={title:"Components/Navigation/HeaderBar",component:o,tags:["autodocs"]},s={render:()=>{const e=a.fromJS(n).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},i={render:()=>{const e=a.fromJS(n).toJS();return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},c={render:()=>{const e=a.fromJS({...n,products:null}).toJS();return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},l={render:()=>{const e=a.fromJS({...n,brand:{...n.brand,icon:"talend-tmc-negative"}}).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},p={render:()=>{const e=a.fromJS({...n,brand:{...n.brand,iconUrl:J.getURL("/src/svg/products/tmc-negative.svg","@talend/icons")}}).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},m={render:()=>{const e=a.fromJS(n).toJS();return e.env={id:"header-environment",items:[{label:"Runtime Environment",onClick:()=>console.log("onEnvClick")}],label:"Default"},r.jsx(o,{...e})},parameters:{info:{styles:t}}},d={render:()=>{const e=a.fromJS(n).toJS();return e.notification={hasUnread:!0},r.jsx(o,{...e})},parameters:{info:{styles:t}}},u={render:()=>{const e=a.fromJS(n).toJS();return e.notification={hasUnread:!1},r.jsx(o,{...e})},parameters:{info:{styles:t}}},h={render:()=>{const e=a.fromJS(n).toJS();return e.help.items=[{icon:"talend-board",label:"Onboarding",onClick:()=>console.log("onOnboardingClick")},{icon:"talend-cog",label:"About",onClick:()=>console.log("onAboutClick")}],r.jsx(o,{...e})},parameters:{info:{styles:t}}},f={render:()=>{const e=a.fromJS(n).toJS();return e.callToAction={bsStyle:"info",className:"btn-inverse",id:"header-call-to-action",label:"Subscribe now",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},S={render:()=>{const e=a.fromJS(n).toJS();return e.genericAction={bsStyle:"link",id:"header-generic-action",icon:"talend-info-circle",label:"Talend Experience",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},g={render:()=>{const e=a.fromJS(n).toJS();return e.user=null,e.information={id:"header-info",bsStyle:"link",icon:"talend-info-circle",label:"Information",hideLabel:!0,pullRight:!0,noCaret:!0,tooltipPlacement:"bottom",items:[{label:"Guided tour",onClick:()=>console.log("onOnboardingClick")},{divider:!0},{label:"Community",target:"_blank",href:"https://community.talend.com/"},{label:"Support",target:"_blank",href:"https://www.talend.com/services/technical-support/"}]},r.jsx(o,{...e})},parameters:{info:{styles:t}}},b={render:()=>r.jsx(o,{logo:n.logo,brand:n.brand,...n,intercom:{id:"intercom",config:{app_id:"j9pqsz4w",email:"toto@gmail.com"}}}),parameters:{info:{styles:t}}},y={render:()=>r.jsx(o,{}),parameters:{info:{styles:t}}},P={render:()=>r.jsx(o,{AppSwitcher:x}),parameters:{info:{styles:t}}},C={render:()=>r.jsx(o,{Intercom:A}),parameters:{info:{styles:t}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
    const headerProps = Immutable.fromJS({
      ...props,
      products: null
    }).toJS();
    headerProps.logo.isFull = true;
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS({
      ...props,
      brand: {
        ...props.brand,
        icon: 'talend-tmc-negative'
      }
    }).toJS();
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS({
      ...props,
      brand: {
        ...props.brand,
        iconUrl: assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')
      }
    }).toJS();
    return <HeaderBar {...headerProps} />;
  },
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...S.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const headerProps = Immutable.fromJS(props).toJS();
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
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar AppSwitcher={AppSwitcherComponent} />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...P.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <HeaderBar Intercom={IntercomComponent} />,
  parameters: {
    info: {
      styles: infoStyle
    }
  }
}`,...C.parameters?.docs?.source}}};const Se=["Default","WithFullLogo","WithoutProducts","WithBrandIcon","WithBrandIconUrl","WithEnvironmentDropdown","WithUnreadNotifications","WithReadNotifications","WithHelpSplitDropdown","WithCallToAction","WithGenericAction","WithoutUserAndWithInformation","Intercom","Barebone","CustomAppSwitcher","CustomIntercom"];export{y as Barebone,P as CustomAppSwitcher,C as CustomIntercom,s as Default,b as Intercom,l as WithBrandIcon,p as WithBrandIconUrl,f as WithCallToAction,m as WithEnvironmentDropdown,i as WithFullLogo,S as WithGenericAction,h as WithHelpSplitDropdown,u as WithReadNotifications,d as WithUnreadNotifications,c as WithoutProducts,g as WithoutUserAndWithInformation,Se as __namedExportsOrder,fe as default};
