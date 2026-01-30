import{j as e,c as C,a as M}from"./iframe-BPWKJ2_o.js";import{a as j,A as N}from"./Action.component-CGKdISv0.js";import"./Actions.component-ChOdem63.js";import"./ActionButton.component-nOOll17V.js";import"./ActionIconToggle.component-ugUZNPkA.js";import"./ActionSplitDropdown.component-8PenvcAp.js";import{S as r}from"./Skeleton.component-DsXVPtu7.js";import{I as R}from"./constants-CZYEPhht.js";import{a as F}from"./translate-q8yQChef.js";import{w as L}from"./withTranslation-ByA2ZQp2.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-Cqzsa5JT.js";import"./index-B5TGO0So.js";import"./CircularProgress.component-COR0Xrwv.js";import"./OverlayTrigger.component-aV17y0dX.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpIv-jbF.js";import"./Transition-CPW5JkxA.js";import"./Transition-5lMdqHLm.js";import"./index-BRrpl1wo.js";import"./get-6sLcuglD.js";import"./_baseGet-GCSfqC3R.js";import"./toString-RNHQn9jk.js";import"./isSymbol-DtjENQP0.js";import"./eq-CT9ytHj1.js";import"./omit-Dp4FCWoh.js";import"./_baseSlice-DRoy53G4.js";import"./_getTag-KzPaKQG2.js";import"./isArrayLike-BnxJKSWE.js";import"./DropdownButton-BvV7HSyt.js";import"./SplitButton-C2kpOeLT.js";import"./inheritsLoose-DEJIaahp.js";import"./theme-Cj2Fm6kQ.js";const O="_loading_tdseu_5",h={"tc-breadcrumb":"_tc-breadcrumb_tdseu_2",loading:O},U=4,b=1,W=[{type:r.TYPES.text,size:r.SIZES.large},{type:r.TYPES.circle,size:r.SIZES.small},{type:r.TYPES.text,size:r.SIZES.large}];function B({loading:o,id:c,items:T,maxItems:E,t:D}){if(o)return e.jsx("div",{className:C(h["tc-breadcrumb"],h.loading,"tc-breadcrumb","tc-breadcrumb--loading"),children:W.map(({size:l,type:t},i)=>e.jsx(r,{size:l,type:t},i))});const v=T.length,S=v>E,p=v-E+b,I=T.slice(b,p+1).map((l,t)=>({id:`${c}-item-${t+b}`,label:l.text,title:l.title,onClick:i=>l.onClick(i,l)}));function _(l,t){const{text:i,title:y,onClick:k}=l,u=t===v-1,f=`${c}-item-${t}`;let w;k&&(w=g=>k(g,l));function A(){if(!u&&k)return e.jsx(N,{id:f,bsStyle:"link",role:"link",title:y||i,"aria-label":y,label:i,onClick:w});const g=u?"page":void 0;return e.jsx("span",{id:f,title:y,"aria-current":g,children:i})}if(!(S&&t>0&&t<p))return S&&t===p?e.jsx("li",{className:"tc-breadcrumb-menu",children:e.jsx(j,{id:`${c}-ellipsis`,items:I,"aria-label":D("BREADCRUMB_OPEN_FIRST_LINKS_MENU",{defaultValue:"Show breadcrumb links"}),label:"…",link:!0,noCaret:!0})},t+.1):e.jsx("li",{className:C("tc-breadcrumb-item",{active:u}),children:A()},t)}return e.jsx("nav",{"aria-label":D("BREADCRUMB",{defaultValue:"breadcrumb"}),children:e.jsx("ul",{id:c,className:C("breadcrumb",h["tc-breadcrumb"],"tc-breadcrumb"),children:T.map(_)})})}B.displayName="Breadcrumbs";B.defaultProps={id:M(),items:[],maxItems:U,t:F()};const n=L(R)(B),he={title:"Components/Navigation/Breadcrumbs",component:n,tags:["autodocs"]},a={render:()=>{const o=[{text:"Text A",title:"Text title A",onClick:()=>console.log("Text A clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"text c in lower case",title:"Text title C",onClick:()=>console.log("Text C clicked")}];return e.jsx(n,{items:o})}},s={render:()=>e.jsx(n,{loading:!0})},m={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")}];return e.jsx(n,{items:o})}},x={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")}];return e.jsx(n,{items:o})}},d={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")},{text:"Text F",title:"Text title F",onClick:()=>console.log("Text F clicked")}];return e.jsx(n,{items:o,maxItems:5})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
