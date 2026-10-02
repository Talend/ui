import{j as e,c as C,a as M}from"./iframe-DMYygnnc.js";import{a as j,A as N}from"./Action.component-BYVcB2HU.js";import"./Actions.component-DEuWAkIT.js";import"./ActionButton.component-Dfh5U0ff.js";import"./ActionIconToggle.component-BKBlgTuM.js";import"./ActionSplitDropdown.component-BhC6vjzE.js";import{S as n}from"./Skeleton.component-CMzkALFe.js";import{I as R}from"./constants-CZYEPhht.js";import{a as F}from"./translate-BXBoSd0f.js";import{w as L}from"./withTranslation-CyucCgxt.js";import"./preload-helper-PPVm8Dsz.js";import"./TooltipTrigger.component-BlZkglGh.js";import"./index-gr0DNHBK.js";import"./CircularProgress.component-BsrCMjdW.js";import"./OverlayTrigger.component-43A9_uft.js";import"./RootCloseWrapper-BrrbSwFu.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CXD522Ua.js";import"./Transition-B7FF88VB.js";import"./Transition-Cv-VN0tb.js";import"./index-DYiAIfAw.js";import"./DropdownButton-1V4YTh6d.js";import"./SplitButton-JluruZ2w.js";import"./inheritsLoose-rE0GIGrX.js";import"./theme-DkSTE3P1.js";const O="_loading_tdseu_5",h={"tc-breadcrumb":"_tc-breadcrumb_tdseu_2",loading:O},U=4,b=1,W=[{type:n.TYPES.text,size:n.SIZES.large},{type:n.TYPES.circle,size:n.SIZES.small},{type:n.TYPES.text,size:n.SIZES.large}];function B({loading:l,id:c,items:T,maxItems:E,t:D}){if(l)return e.jsx("div",{className:C(h["tc-breadcrumb"],h.loading,"tc-breadcrumb","tc-breadcrumb--loading"),children:W.map(({size:o,type:t},i)=>e.jsx(n,{size:o,type:t},i))});const v=T.length,S=v>E,y=v-E+b,I=T.slice(b,y+1).map((o,t)=>({id:`${c}-item-${t+b}`,label:o.text,title:o.title,onClick:i=>o.onClick(i,o)}));function _(o,t){const{text:i,title:p,onClick:k}=o,u=t===v-1,f=`${c}-item-${t}`;let w;k&&(w=g=>k(g,o));function A(){if(!u&&k)return e.jsx(N,{id:f,bsStyle:"link",role:"link",title:p||i,"aria-label":p,label:i,onClick:w});const g=u?"page":void 0;return e.jsx("span",{id:f,title:p,"aria-current":g,children:i})}if(!(S&&t>0&&t<y))return S&&t===y?e.jsx("li",{className:"tc-breadcrumb-menu",children:e.jsx(j,{id:`${c}-ellipsis`,items:I,"aria-label":D("BREADCRUMB_OPEN_FIRST_LINKS_MENU",{defaultValue:"Show breadcrumb links"}),label:"…",link:!0,noCaret:!0})},t+.1):e.jsx("li",{className:C("tc-breadcrumb-item",{active:u}),children:A()},t)}return e.jsx("nav",{"aria-label":D("BREADCRUMB",{defaultValue:"breadcrumb"}),children:e.jsx("ul",{id:c,className:C("breadcrumb",h["tc-breadcrumb"],"tc-breadcrumb"),children:T.map(_)})})}B.displayName="Breadcrumbs";B.defaultProps={id:M(),items:[],maxItems:U,t:F()};const r=L(R)(B),de={title:"Components/Navigation/Breadcrumbs",component:r,tags:["autodocs"]},a={render:()=>{const l=[{text:"Text A",title:"Text title A",onClick:()=>console.log("Text A clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"text c in lower case",title:"Text title C",onClick:()=>console.log("Text C clicked")}];return e.jsx(r,{items:l})}},s={render:()=>e.jsx(r,{loading:!0})},x={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")}];return e.jsx(r,{items:l})}},m={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")}];return e.jsx(r,{items:l})}},d={render:()=>{const l=[{text:"item very very very very long that we have to display",title:"item very very very very long that we have to display",onClick:()=>console.log("item very very very very long that we have to display clicked")},{text:"Text B",title:"Text title B",onClick:()=>console.log("Text B clicked")},{text:"Text C",title:"Text title C",onClick:()=>console.log("Text C clicked")},{text:"Text D",title:"Text title D",onClick:()=>console.log("Text D clicked")},{text:"Text E",title:"Text title E",onClick:()=>console.log("Text E clicked")},{text:"Text F",title:"Text title F",onClick:()=>console.log("Text F clicked")}];return e.jsx(r,{items:l,maxItems:5})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
