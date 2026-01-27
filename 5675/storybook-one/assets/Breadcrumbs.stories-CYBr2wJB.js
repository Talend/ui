import{j as e,c as C,b as M}from"./iframe-B9f9Cci2.js";import{a as j,A as N}from"./Action.component-DYwIluar.js";import"./Actions.component-BJlHQphr.js";import"./ActionButton.component-CpxFTm-n.js";import"./ActionIconToggle.component-BV58letW.js";import"./ActionSplitDropdown.component-Bh7iT6YB.js";import{S as r}from"./Skeleton.component-DBDuO3by.js";import{I as R}from"./constants-CZYEPhht.js";import{a as F}from"./translate-BHqtADpL.js";import{w as L}from"./withTranslation-eX0Mn235.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-BedDpRF3.js";import"./index-DNafQg6z.js";import"./CircularProgress.component-D-tT-C9h.js";import"./OverlayTrigger.component-BNrpNvk8.js";import"./RootCloseWrapper-DHj10w1C.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DixPJ5_v.js";import"./Transition-h3Fmi7r0.js";import"./Transition-KhAiUgQr.js";import"./index-DRAAYgIz.js";import"./get-C_0C-DjM.js";import"./_baseGet-T0Q5TGKe.js";import"./toString-ClRFiu0U.js";import"./isSymbol-W7excr-L.js";import"./eq-DkkWHXuO.js";import"./omit-BvgacqV1.js";import"./_setToString-J6FyJefy.js";import"./_getTag-vZcvUCeY.js";import"./isArrayLike-DiQq1izh.js";import"./DropdownButton-B-VNf-5_.js";import"./SplitButton-U2WmwpRw.js";import"./inheritsLoose-fv5wmOmv.js";import"./theme-B7lIOIL0.js";const O="_loading_tdseu_5",h={"tc-breadcrumb":"_tc-breadcrumb_tdseu_2",loading:O},U=4,b=1,W=[{type:r.TYPES.text,size:r.SIZES.large},{type:r.TYPES.circle,size:r.SIZES.small},{type:r.TYPES.text,size:r.SIZES.large}];function B({loading:o,id:c,items:T,maxItems:E,t:D}){if(o)return e.jsx("div",{className:C(h["tc-breadcrumb"],h.loading,"tc-breadcrumb","tc-breadcrumb--loading"),children:W.map(({size:l,type:t},i)=>e.jsx(r,{size:l,type:t},i))});const v=T.length,S=v>E,p=v-E+b,I=T.slice(b,p+1).map((l,t)=>({id:`${c}-item-${t+b}`,label:l.text,title:l.title,onClick:i=>l.onClick(i,l)}));function _(l,t){const{text:i,title:y,onClick:k}=l,u=t===v-1,f=`${c}-item-${t}`;let w;k&&(w=g=>k(g,l));function A(){if(!u&&k)return e.jsx(N,{id:f,bsStyle:"link",role:"link",title:y||i,"aria-label":y,label:i,onClick:w});const g=u?"page":void 0;return e.jsx("span",{id:f,title:y,"aria-current":g,children:i})}if(!(S&&t>0&&t<p))return S&&t===p?e.jsx("li",{className:"tc-breadcrumb-menu",children:e.jsx(j,{id:`${c}-ellipsis`,items:I,"aria-label":D("BREADCRUMB_OPEN_FIRST_LINKS_MENU",{defaultValue:"Show breadcrumb links"}),label:"…",link:!0,noCaret:!0})},t+.1):e.jsx("li",{className:C("tc-breadcrumb-item",{active:u}),children:A()},t)}return e.jsx("nav",{"aria-label":D("BREADCRUMB",{defaultValue:"breadcrumb"}),children:e.jsx("ul",{id:c,className:C("breadcrumb",h["tc-breadcrumb"],"tc-breadcrumb"),children:T.map(_)})})}B.displayName="Breadcrumbs";B.defaultProps={id:M(),items:[],maxItems:U,t:F()};const n=L(R)(B),he={title:"Components/Navigation/Breadcrumbs",component:n,tags:["autodocs"]},a={render:()=>{const o=[{text:"Text A",title:"Text title A",onClick:()=>console.log("Text A clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"text c in lower case",title:"Text title C",onClick:()=>console.log("Text C clicked")}];return e.jsx(n,{items:o})}},s={render:()=>e.jsx(n,{loading:!0})},m={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")}];return e.jsx(n,{items:o})}},x={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")}];return e.jsx(n,{items:o})}},d={render:()=>{const o=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")},{text:"Text F",title:"Text title F",onClick:()=>console.log("Text F clicked")}];return e.jsx(n,{items:o,maxItems:5})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
