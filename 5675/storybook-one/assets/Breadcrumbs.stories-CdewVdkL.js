import{j as e,c as C,b as M}from"./iframe-DDbQPtEW.js";import{a as j,A as N}from"./Action.component-z_tc2k8W.js";import"./Actions.component-BBVK7eHA.js";import"./ActionButton.component-C1rXDJXG.js";import"./ActionIconToggle.component-moWZDsKn.js";import"./ActionSplitDropdown.component-DJ2RyVCW.js";import{S as r}from"./Skeleton.component-E6T_PEsN.js";import{I as R}from"./constants-CZYEPhht.js";import{a as F}from"./translate-BAS4THSV.js";import{w as L}from"./withTranslation-CBoklo2K.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-RyTGuFAh.js";import"./index-Br5au_O-.js";import"./CircularProgress.component-apPtCWbd.js";import"./OverlayTrigger.component-BqP3Bda5.js";import"./RootCloseWrapper-BGY27Mp-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ByhQlRMI.js";import"./Transition-DKLhCDBr.js";import"./Transition-BRDVftK1.js";import"./index-DwN9fP63.js";import"./get-DEhvjXoT.js";import"./_baseGet-lTKxROzH.js";import"./toString-Cnm5KTc0.js";import"./isSymbol-DBdBqAfo.js";import"./eq-DCF4gZF2.js";import"./omit-D72adO18.js";import"./_setToString-Cv7pkYb4.js";import"./_getTag-BfvBz_ei.js";import"./isArrayLike-BSyHTOuQ.js";import"./DropdownButton-Bs0K8Cqf.js";import"./SplitButton-BOEX_SVG.js";import"./inheritsLoose-CDxvETEX.js";import"./theme-B86cisQm.js";const O="_loading_tdseu_5",h={"tc-breadcrumb":"_tc-breadcrumb_tdseu_2",loading:O},U=4,b=1,W=[{type:r.TYPES.text,size:r.SIZES.large},{type:r.TYPES.circle,size:r.SIZES.small},{type:r.TYPES.text,size:r.SIZES.large}];function B({loading:o,id:c,items:T,maxItems:E,t:D}){if(o)return e.jsx("div",{className:C(h["tc-breadcrumb"],h.loading,"tc-breadcrumb","tc-breadcrumb--loading"),children:W.map(({size:l,type:t},i)=>e.jsx(r,{size:l,type:t},i))});const v=T.length,S=v>E,p=v-E+b,I=T.slice(b,p+1).map((l,t)=>({id:`${c}-item-${t+b}`,label:l.text,title:l.title,onClick:i=>l.onClick(i,l)}));function _(l,t){const{text:i,title:y,onClick:k}=l,u=t===v-1,f=`${c}-item-${t}`;let w;k&&(w=g=>k(g,l));function A(){if(!u&&k)return e.jsx(N,{id:f,bsStyle:"link",role:"link",title:y||i,"aria-label":y,label:i,onClick:w});const g=u?"page":void 0;return e.jsx("span",{id:f,title:y,"aria-current":g,children:i})}if(!(S&&t>0&&t<p))return S&&t===p?e.jsx("li",{className:"tc-breadcrumb-menu",children:e.jsx(j,{id:`${c}-ellipsis`,items:I,"aria-label":D("BREADCRUMB_OPEN_FIRST_LINKS_MENU",{defaultValue:"Show breadcrumb links"}),label:"…",link:!0,noCaret:!0})},t+.1):e.jsx("li",{className:C("tc-breadcrumb-item",{active:u}),children:A()},t)}return e.jsx("nav",{"aria-label":D("BREADCRUMB",{defaultValue:"breadcrumb"}),children:e.jsx("ul",{id:c,className:C("breadcrumb",h["tc-breadcrumb"],"tc-breadcrumb"),children:T.map(_)})})}B.displayName="Breadcrumbs";B.defaultProps={id:M(),items:[],maxItems:U,t:F()};const n=L(R)(B),he={title:"Components/Navigation/Breadcrumbs",component:n,tags:["autodocs"]},a={render:()=>{const o=[{text:"Text A",title:"Text title A",onClick:()=>console.log("Text A clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"text c in lower case",title:"Text title C",onClick:()=>console.log("Text C clicked")}];return e.jsx(n,{items:o})}},s={render:()=>e.jsx(n,{loading:!0})},m={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")}];return e.jsx(n,{items:o})}},x={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")}];return e.jsx(n,{items:o})}},d={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")},{text:"Text F",title:"Text title F",onClick:()=>console.log("Text F clicked")}];return e.jsx(n,{items:o,maxItems:5})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const be=["Default","Loading","WithMaxItemsReached","WithMoreThanDefaultMaxItemsValue","WithMoreThanASpecifiedMaxItemsValue"];export{a as Default,s as Loading,m as WithMaxItemsReached,d as WithMoreThanASpecifiedMaxItemsValue,x as WithMoreThanDefaultMaxItemsValue,be as __namedExportsOrder,he as default};
