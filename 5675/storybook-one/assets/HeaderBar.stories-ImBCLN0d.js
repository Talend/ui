import{j as r,a,a6 as J,I as k}from"./iframe-DIB3-0BR.js";import{H as o,A as I}from"./HeaderBar.component-BBI_ANse.js";import"./index-DOjBLebZ.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-7Cusbh4T.js";import"./toString-B57_GXo2.js";import"./isSymbol-B6o2xB3b.js";import"./_setToString-DajbfPCu.js";import"./_baseGet-Ct5VDv7d.js";import"./eq-w3r5tFL9.js";import"./_getTag-UecFYJaC.js";import"./isArrayLike-OVmvncqg.js";import"./Action.component-DH-GAoec.js";import"./ActionButton.component-DQTMc3aF.js";import"./TooltipTrigger.component-CVMfTS1k.js";import"./index-pFY2HaYN.js";import"./CircularProgress.component-CgPW_-zP.js";import"./constants-CZYEPhht.js";import"./translate-Cb2TG_Ch.js";import"./withTranslation-C93BmHMx.js";import"./Skeleton.component-ByoA-jbm.js";import"./theme-DaJrfx0F.js";import"./OverlayTrigger.component-DK-wOvtE.js";import"./RootCloseWrapper-BoYIv9I_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ClBq45ZB.js";import"./Transition-DIDeI3r7.js";import"./Transition-Dw8bnBfP.js";import"./ActionSplitDropdown.component-qEyNazAr.js";import"./SplitButton-BMIBksG4.js";import"./inheritsLoose-DL4FPuFe.js";import"./get-YPPIQngb.js";import"./DropdownButton-C6bBdUBg.js";import"./ActionIconToggle.component-CsrdTqc8.js";import"./Actions.component-CD5rCVBo.js";import"./Intercom.component-B4noMUDa.js";import"./Typeahead.component-CMRx75bs.js";import"./index-DlPA27Gk.js";import"./usePopper-D8JI-5jH.js";import"./index-C5BPL4_N.js";import"./index-ClVTDIRd.js";import"./Emphasis.component-CPMkp7uY.js";const n={brand:{id:"header-brand",label:"Example App Name",onClick:()=>console.log("onApplicationNameClick")},logo:{id:"header-logo",onClick:()=>console.log("onLogoClick")},help:{id:"header-help",icon:"talend-question-circle",onClick:()=>console.log("onHelpClick")},user:{id:"header-user",items:[{id:"settings",icon:"talend-cog",label:"Settings",onClick:()=>console.log("onSettingsClick")}],name:"John Doe",firstName:"John",lastName:"Doe"},products:{items:[{icon:"talend-tdp-negative",key:"tdp",label:"Data Preparation"},{icon:"talend-tic-negative",key:"tic",label:"Integration Cloud"},{icon:"talend-tmc-negative",key:"tmc",label:"Management Console"}],onSelect:()=>console.log("onProductClick")}},t=e=>({...e,button:{...e.button,topRight:{...e.button.topRight,top:"48px"}}});function A(){return r.jsx(I,{...n.brand})}function v(){const e={color:"white",margin:"0 10px",width:"2rem",height:"2rem",borderRadius:"50%",background:"green",display:"flex",alignItems:"center",justifyContent:"center"};return r.jsx("div",{style:e,children:r.jsx(k,{name:"talend-bubbles"})})}const fe={title:"Components/Navigation/HeaderBar",component:o,tags:["autodocs"]},s={render:()=>{const e=a.fromJS(n).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},i={render:()=>{const e=a.fromJS(n).toJS();return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},c={render:()=>{const e=a.fromJS({...n,products:null}).toJS();return e.logo.isFull=!0,r.jsx(o,{...e})},parameters:{info:{styles:t}}},l={render:()=>{const e=a.fromJS({...n,brand:{...n.brand,icon:"talend-tmc-negative"}}).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},p={render:()=>{const e=a.fromJS({...n,brand:{...n.brand,iconUrl:J.getURL("/src/svg/products/tmc-negative.svg","@talend/icons")}}).toJS();return r.jsx(o,{...e})},parameters:{info:{styles:t}}},m={render:()=>{const e=a.fromJS(n).toJS();return e.env={id:"header-environment",items:[{label:"Runtime Environment",onClick:()=>console.log("onEnvClick")}],label:"Default"},r.jsx(o,{...e})},parameters:{info:{styles:t}}},d={render:()=>{const e=a.fromJS(n).toJS();return e.notification={hasUnread:!0},r.jsx(o,{...e})},parameters:{info:{styles:t}}},u={render:()=>{const e=a.fromJS(n).toJS();return e.notification={hasUnread:!1},r.jsx(o,{...e})},parameters:{info:{styles:t}}},h={render:()=>{const e=a.fromJS(n).toJS();return e.help.items=[{icon:"talend-board",label:"Onboarding",onClick:()=>console.log("onOnboardingClick")},{icon:"talend-cog",label:"About",onClick:()=>console.log("onAboutClick")}],r.jsx(o,{...e})},parameters:{info:{styles:t}}},f={render:()=>{const e=a.fromJS(n).toJS();return e.callToAction={bsStyle:"info",className:"btn-inverse",id:"header-call-to-action",label:"Subscribe now",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},S={render:()=>{const e=a.fromJS(n).toJS();return e.genericAction={bsStyle:"link",id:"header-generic-action",icon:"talend-info-circle",label:"Talend Experience",onClick:()=>console.log("onActionClick")},r.jsx(o,{...e})},parameters:{info:{styles:t}}},g={render:()=>{const e=a.fromJS(n).toJS();return e.user=null,e.information={id:"header-info",bsStyle:"link",icon:"talend-info-circle",label:"Information",hideLabel:!0,pullRight:!0,noCaret:!0,tooltipPlacement:"bottom",items:[{label:"Guided tour",onClick:()=>console.log("onOnboardingClick")},{divider:!0},{label:"Community",target:"_blank",href:"https://community.talend.com/"},{label:"Support",target:"_blank",href:"https://www.talend.com/services/technical-support/"}]},r.jsx(o,{...e})},parameters:{info:{styles:t}}},b={render:()=>r.jsx(o,{logo:n.logo,brand:n.brand,...n,intercom:{id:"intercom",config:{app_id:"j9pqsz4w",email:"toto@gmail.com"}}}),parameters:{info:{styles:t}}},y={render:()=>r.jsx(o,{}),parameters:{info:{styles:t}}},P={render:()=>r.jsx(o,{AppSwitcher:A}),parameters:{info:{styles:t}}},C={render:()=>r.jsx(o,{Intercom:v}),parameters:{info:{styles:t}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
