import{j as e,c as C,a as M}from"./iframe-BpHPnehy.js";import{a as j,A as N}from"./Action.component-Bem806fA.js";import"./Actions.component-CpJ50iSx.js";import"./ActionButton.component-Mqqkz04I.js";import"./ActionIconToggle.component-CuP-yQrL.js";import"./ActionSplitDropdown.component-D09ZIT4b.js";import{S as n}from"./Skeleton.component-BaRg1Dgr.js";import{I as R}from"./constants-CZYEPhht.js";import{a as F}from"./translate-Nmgh_wQP.js";import{w as L}from"./withTranslation-COCjSCag.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-CTcUmZRa.js";import"./index-GeNoR4Be.js";import"./CircularProgress.component-CFmgaqkz.js";import"./OverlayTrigger.component-CYkKPrYu.js";import"./RootCloseWrapper-CGX1yvw4.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DsCAXCWn.js";import"./Transition-CYGy_rvE.js";import"./Transition-DblCj8s-.js";import"./index-CP74lAEa.js";import"./DropdownButton-xR9rB9iF.js";import"./SplitButton-DPm_QReI.js";import"./inheritsLoose-QOZuaEVW.js";import"./theme-CjF-M1xI.js";const O="_loading_tdseu_5",h={"tc-breadcrumb":"_tc-breadcrumb_tdseu_2",loading:O},U=4,b=1,W=[{type:n.TYPES.text,size:n.SIZES.large},{type:n.TYPES.circle,size:n.SIZES.small},{type:n.TYPES.text,size:n.SIZES.large}];function B({loading:l,id:c,items:T,maxItems:E,t:D}){if(l)return e.jsx("div",{className:C(h["tc-breadcrumb"],h.loading,"tc-breadcrumb","tc-breadcrumb--loading"),children:W.map(({size:o,type:t},i)=>e.jsx(n,{size:o,type:t},i))});const v=T.length,S=v>E,y=v-E+b,I=T.slice(b,y+1).map((o,t)=>({id:`${c}-item-${t+b}`,label:o.text,title:o.title,onClick:i=>o.onClick(i,o)}));function _(o,t){const{text:i,title:p,onClick:k}=o,u=t===v-1,f=`${c}-item-${t}`;let w;k&&(w=g=>k(g,o));function A(){if(!u&&k)return e.jsx(N,{id:f,bsStyle:"link",role:"link",title:p||i,"aria-label":p,label:i,onClick:w});const g=u?"page":void 0;return e.jsx("span",{id:f,title:p,"aria-current":g,children:i})}if(!(S&&t>0&&t<y))return S&&t===y?e.jsx("li",{className:"tc-breadcrumb-menu",children:e.jsx(j,{id:`${c}-ellipsis`,items:I,"aria-label":D("BREADCRUMB_OPEN_FIRST_LINKS_MENU",{defaultValue:"Show breadcrumb links"}),label:"…",link:!0,noCaret:!0})},t+.1):e.jsx("li",{className:C("tc-breadcrumb-item",{active:u}),children:A()},t)}return e.jsx("nav",{"aria-label":D("BREADCRUMB",{defaultValue:"breadcrumb"}),children:e.jsx("ul",{id:c,className:C("breadcrumb",h["tc-breadcrumb"],"tc-breadcrumb"),children:T.map(_)})})}B.displayName="Breadcrumbs";B.defaultProps={id:M(),items:[],maxItems:U,t:F()};const r=L(R)(B),de={title:"Components/Navigation/Breadcrumbs",component:r,tags:["autodocs"]},a={render:()=>{const l=[{text:"Text A",title:"Text title A",onClick:()=>console.log("Text A clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"text c in lower case",title:"Text title C",onClick:()=>console.log("Text C clicked")}];return e.jsx(r,{items:l})}},s={render:()=>e.jsx(r,{loading:!0})},x={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")}];return e.jsx(r,{items:l})}},m={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")}];return e.jsx(r,{items:l})}},d={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")},{text:"Text F",title:"Text title F",onClick:()=>console.log("Text F clicked")}];return e.jsx(r,{items:l,maxItems:5})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      text: 'Text A',
      title: 'Text title A',
      onClick: () => console.log('Text A clicked')
    }, {
      text: 'Text B',
      title: 'Text title B',
      onClick: () => console.log('Text B clicked')
    }, {
      text: 'text c in lower case',
      title: 'Text title C',
      onClick: () => console.log('Text C clicked')
    }];
    return <Breadcrumbs items={items} />;
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs loading />
}`,...s.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      text: 'item very very very very long that we have to display',
      title: 'item very very very very long that we have to display',
      onClick: () => console.log('item very very very very long that we have to display clicked')
    }, {
      text: 'Text B',
      title: 'Text title B',
      onClick: () => console.log('Text B clicked')
    }, {
      text: 'Text C',
      title: 'Text title C',
      onClick: () => console.log('Text C clicked')
    }, {
      text: 'Text D',
      title: 'Text title D',
      onClick: () => console.log('Text D clicked')
    }];
    return <Breadcrumbs items={items} />;
  }
}`,...x.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      text: 'item very very very very long that we have to display',
      title: 'item very very very very long that we have to display',
      onClick: () => console.log('item very very very very long that we have to display clicked')
    }, {
      text: 'Text B',
      title: 'Text title B',
      onClick: () => console.log('Text B clicked')
    }, {
      text: 'Text C',
      title: 'Text title C',
      onClick: () => console.log('Text C clicked')
    }, {
      text: 'Text D',
      title: 'Text title D',
      onClick: () => console.log('Text D clicked')
    }, {
      text: 'Text E',
      title: 'Text title E',
      onClick: () => console.log('Text E clicked')
    }];
    return <Breadcrumbs items={items} />;
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = [{
      text: 'item very very very very long that we have to display',
      title: 'item very very very very long that we have to display',
      onClick: () => console.log('item very very very very long that we have to display clicked')
    }, {
      text: 'Text B',
      title: 'Text title B',
      onClick: () => console.log('Text B clicked')
    }, {
      text: 'Text C',
      title: 'Text title C',
      onClick: () => console.log('Text C clicked')
    }, {
      text: 'Text D',
      title: 'Text title D',
      onClick: () => console.log('Text D clicked')
    }, {
      text: 'Text E',
      title: 'Text title E',
      onClick: () => console.log('Text E clicked')
    }, {
      text: 'Text F',
      title: 'Text title F',
      onClick: () => console.log('Text F clicked')
    }];
    return <Breadcrumbs items={items} maxItems={5} />;
  }
}`,...d.parameters?.docs?.source}}};const Te=["Default","Loading","WithMaxItemsReached","WithMoreThanDefaultMaxItemsValue","WithMoreThanASpecifiedMaxItemsValue"];export{a as Default,s as Loading,x as WithMaxItemsReached,d as WithMoreThanASpecifiedMaxItemsValue,m as WithMoreThanDefaultMaxItemsValue,Te as __namedExportsOrder,de as default};
