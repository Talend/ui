import{r as M,u as Q,j as t,ab as X,c as W,aE as Z,ap as B,aa as l}from"./iframe-BQEEiZRV.js";import{I as ee}from"./constants-CZYEPhht.js";import{F as te}from"./FocusManager.component-CZagYCIJ.js";import"./index-BrkDvxo5.js";import{T as ne}from"./Typeahead.component-BZVpbORc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DEVvjEu3.js";import"./usePopper-C4IociZq.js";import"./Action.component-B--dv5VL.js";import"./ActionButton.component-8HHrM9Qn.js";import"./TooltipTrigger.component-BAsIK6_B.js";import"./index-D4k-9F7L.js";import"./CircularProgress.component-COIHK1Ps.js";import"./translate-DtsfgApf.js";import"./withTranslation-DD5bijEW.js";import"./Skeleton.component-DaxO-5F7.js";import"./theme-CHdsOZuJ.js";import"./OverlayTrigger.component-rcexGgTF.js";import"./RootCloseWrapper-DkaxUEUD.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DX7031yL.js";import"./Transition-B9b2qDfo.js";import"./Transition-BPKUexP_.js";import"./ActionSplitDropdown.component-B5kEziLw.js";import"./SplitButton-Cc4i-rrH.js";import"./inheritsLoose-B-gjyeBc.js";import"./DropdownButton-bx3m8i2K.js";import"./ActionIconToggle.component-BmYSilDj.js";import"./Actions.component-DGzWT6yE.js";import"./index-N7oSttiG.js";import"./index-CFeD03Ge.js";import"./Emphasis.component-tDMAvCgh.js";const oe="_container_125nv_6",se="_items_125nv_13",w={container:oe,"items-container":"_items-container_125nv_13","tc-datalist-item":"_tc-datalist-item_125nv_21","tc-datalist-item-icon":"_tc-datalist-item-icon_125nv_25",items:se};function ie(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const ae=["restricted","titleMap","value"],x={ALL:"all",FILTER:"filter",NONE:"none"};function V(e,o,n){return n?e.find(a=>a.suggestions.find(u=>o.toLowerCase()===u.name.toLowerCase())):e.find(a=>o.toLowerCase()===a.name.toLowerCase())}function le({displayMode:e,titleMap:o,filterValue:n,multiSection:a,allowAddNewElements:u,allowAddNewElementsSuffix:m}){if(e===x.NONE)return;if(e===x.ALL&&n){const d=[...o];return u&&!V(o,n,a)&&d.unshift({title:`${n} ${m}`,name:n,value:n}),d}if(e===x.ALL||!n)return o;const f=ie(n.trim()),S=new RegExp(f,"i"),v=a?o.map(d=>({...d,suggestions:n?d.suggestions.filter(h=>S.test(h.name)):d.suggestions})).filter(d=>d.suggestions.length>0):o.filter(d=>S.test(d.name));return u&&!V(o,n,a)&&v.unshift({title:`${n} ${m}`,name:n,value:n}),v}function E(e,o,n=""){if(!e)return null;for(let a=0;a<e.length;a+=1){const u=e[a];if(u.suggestions){const m=u.suggestions.find(f=>!f.disabled&&f[o].toLowerCase()===n.toLowerCase());if(m)return m}else if(!u.disabled&&String(u[o]).toLowerCase()===String(n).toLowerCase())return u}return null}function re(e,o,n){if(o==="")return{name:o,value:""};const a=E(e,"name",o);return a||(n?void 0:{name:o,value:o})}function F(e,o,n){const a=E(e,"value",o);return a||(n?void 0:{name:o,value:o})}function ce(e,o,n){const a=E(e,"name",o)||E(e,"value",o);return a||{name:o,value:o}}function r(e){const[{name:o,value:n},a]=M.useState({}),{t:u}=Q(ee),[m,f]=M.useState(""),[S,v]=M.useState(x.NONE),[d,h]=M.useState({focusedItemIndex:void 0,focusedSectionIndex:void 0}),y=le({displayMode:e.readOnly||e.disabled?x.NONE:S,titleMap:e.titleMap,filterValue:m,multiSection:e.multiSection,allowAddNewElements:e.allowAddNewElements,allowAddNewElementsSuffix:e.allowAddNewElementsSuffix??u("NEW_WITH_PARENTHESIS","(new)")});M.useEffect(()=>{if(e.value===void 0||e.value===null)return;const s=F(e.titleMap,e.value);s&&((s.value!==n||s.name!==o)&&a(s),(!o&&!m||o===m)&&f(s.name))},[e.value,e.titleMap]);const O=()=>h({focusedItemIndex:void 0,focusedSectionIndex:void 0}),$=()=>v(x.FILTER),P=()=>v(x.ALL),A=()=>{v(x.NONE),O()},R=()=>{const s=F(e.titleMap,n);s&&f(s.name)};function L(s,i,c){const g=i.name;f(g),c?(a(i),e.onChange(s,{value:i.value})):e.onLiveChange&&e.onLiveChange(s,i.value)}function _(){if(e.multiSection){const s=e.titleMap;for(let i=0;i<s.length;i+=1){const c=s[i].suggestions.findIndex(g=>g.name===n);if(c>-1){h({focusedItemIndex:c,focusedSectionIndex:i});break}}}else{const s=e.titleMap.findIndex(i=>i.name===n);h({focusedItemIndex:s===-1?null:s})}}function k(s){A();const i=F(e.titleMap,n,e.restricted);if(!i||i.name!==m){const c=re(e.titleMap,m,e.restricted);c&&c.value!==n?L(s,c,!0):R()}}const H=function(i){e.onBlur&&e.onBlur(),k(i)};function q(s,i){const c=ce(e.titleMap,i.value);L(s,c,!1),$(),O()}function U(s){e.onFocus&&e.onFocus(s),s.target.select(),P(),_()}function K(){P(),_()}function T(s,{sectionIndex:i,itemIndex:c}){const g=e.multiSection?y[i].suggestions[c]:y[c];if(A(),g.disabled||g.value===n){s.preventDefault();return}L(s,g,!0)}function Y(s,i){const{highlightedItemIndex:c,highlightedSectionIndex:g,newHighlightedItemIndex:G,newHighlightedSectionIndex:J}=i;switch(s.key){case"Esc":case"Escape":s.preventDefault(),R(),A();break;case"Enter":if(!y)break;s.preventDefault(),Number.isInteger(c)?T(s,{itemIndex:c,sectionIndex:g}):k(s);break;case"Down":case"ArrowDown":case"Up":case"ArrowUp":if(s.preventDefault(),!y){P(),_();break}h({focusedItemIndex:G,focusedSectionIndex:J});break}}function z(){if(e.titleMap){if(e.multiSection){const i=e.titleMap.find(c=>c.suggestions.find(g=>g.name===n));return B(i&&i.suggestions.find(c=>c.name===n),"icon")}const s=e.titleMap.find(i=>i.name===n)||e.titleMap.find(i=>i.value===n);if(s)return B(s,"icon")}}const D=z();return t.jsxs(te,{onFocusOut:H,className:w["tc-datalist-item"],children:[D&&t.jsx(X,{className:w["tc-datalist-item-icon"],name:D.name,title:D.title,transform:D.transform}),t.jsx(ne,{...Z(e,ae),className:W("tc-datalist",e.className),focusedItemIndex:d.focusedItemIndex,focusedSectionIndex:d.focusedSectionIndex,items:y,onChange:q,onFocus:U,onClick:K,onKeyDown:Y,onSelect:T,theme:{container:W(w.container,"tc-datalist-container"),itemsContainer:w["items-container"],itemsList:w.items},value:m,valueId:n,caret:!0})]},"focus-manager")}r.displayName="Datalist component";r.defaultProps={value:"",restricted:!1,multiSection:!1,titleMap:[]};r.propTypes={autoFocus:l.bool,allowAddNewElements:l.bool,allowAddNewElementsSuffix:l.string,isLoading:l.bool,className:l.string,onBlur:l.func,onChange:l.func.isRequired,onFocus:l.func,onClick:l.func,onLiveChange:l.func,disabled:l.bool,multiSection:l.bool,readOnly:l.bool,restricted:l.bool,titleMap:l.arrayOf(l.oneOfType([l.shape({name:l.string.isRequired,value:l.string.isRequired}),l.shape({title:l.string,suggestions:l.arrayOf(l.shape({name:l.string,value:l.string}))})])),value:l.string};const I={onChange:()=>console.log("onChange"),disabled:!1,readOnly:!1,placeholder:"search for something...",titleMap:[{name:"My foo",value:"foo",description:"foo description"},{name:"My bar",value:"bar"},{name:"My foobar",value:"foobar",description:"foobar description"},{name:"My lol",value:"lol"}]},b={...I,multiSection:!0,titleMap:[{title:"cat 1",suggestions:[{name:"My foo",value:"foo",description:"foo description"},{name:"My faa",value:"faa"}]},{title:"cat 2",suggestions:[{name:"My bar",value:"bar"}]},{title:"cat 3",suggestions:[{name:"My foobar",value:"foobar",description:"foobar description"}]},{title:"cat 4",suggestions:[{name:"My lol",value:"lol"}]}]},p={...I,multiSection:!1},ue=[{name:"My foo",value:"foo",description:"foo description",disabled:!0},{name:"My bar",value:"bar"},{name:"My lol",value:"lol",disabled:!0},{name:"My foobar",value:"foobar",description:"foobar description"}],He={title:"Components/Form - Controls/Datalist",component:r,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"col-lg-offset-2 col-lg-8",children:e()})]},j={render:()=>{const e={...b,restricted:!0},o={...b,value:"lol"},n={...b,titleMap:b.titleMap.map(a=>({...a,suggestions:a.suggestions.map(u=>({...u,icon:{name:"talend-clock"}}))}))};return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"By default"}),t.jsx(r,{...b}),t.jsx("h3",{children:"default value"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Restricted values"}),t.jsx(r,{...e}),t.jsx("h3",{children:"With icons"}),t.jsx(r,{...n}),t.jsx("h3",{children:"Auto focused"}),t.jsx(r,{...b,autoFocus:!0})]})}},N={render:()=>{const e={...p,restricted:!0},o={...p,value:"lol"},n={...p,titleMap:ue},a={...p,titleMap:p.titleMap.map((f,S)=>({...f,icon:{name:["talend-clock","talend-world","talend-flow","talend-flow-o"][S],title:"My icon"}}))},[u,m]=M.useState(o.titleMap);return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"By default"}),t.jsx(r,{...p}),t.jsx("h3",{children:"Allow adding new elements"}),t.jsx(r,{...p,allowAddNewElements:!0,allowAddNewElementsSuffix:"(Not in the dictionary)"}),t.jsx("h3",{children:"default value"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Restricted values"}),t.jsx(r,{...e}),t.jsx("h3",{children:"Loading"}),t.jsx(r,{...p,titleMap:[],isLoading:!0}),t.jsx("h3",{children:"Auto focused"}),t.jsx(r,{...p,autoFocus:!0}),t.jsx("h3",{children:"With disabled Items"}),t.jsx(r,{...n,autoFocus:!0}),t.jsx("h3",{children:"With icons"}),t.jsx(r,{...a}),t.jsx("h3",{children:"With suggestions API"}),t.jsx(r,{...o,titleMap:u,onLiveChange:()=>{setTimeout(()=>{m(f=>[...f])},200)}}),t.jsx("h3",{children:"Insert custom elements via render props"}),t.jsx(r,{...p,children:(f,{isShown:S},v,d)=>t.jsxs("div",{children:[S&&t.jsx("button",{onClick:()=>d.blur(),onMouseDown:h=>h.preventDefault(),type:"button",children:"Close dropdown"}),f,S&&t.jsx("button",{onClick:()=>console.log("onAfterClick"),onMouseDown:h=>h.preventDefault(),type:"button",children:"after"})]})})]})}},C={render:()=>{const e={...I,disabled:!0,readOnly:!1},o={...I,disabled:!1,readOnly:!0},n={...I,disabled:!0,readOnly:!0};return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"Disabled"}),t.jsx(r,{...e}),t.jsx("h3",{children:"Readonly"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Combination (disabled + readonly)"}),t.jsx(r,{...n})]})}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const restrictedValues = {
      ...propsMultiSection,
      restricted: true
    };
    const defaultValue = {
      ...propsMultiSection,
      value: 'lol'
    };
    const withIcons = {
      ...propsMultiSection,
      titleMap: propsMultiSection.titleMap.map(titleMap => ({
        ...titleMap,
        suggestions: titleMap.suggestions.map(suggestion => ({
          ...suggestion,
          icon: {
            name: 'talend-clock'
          }
        }))
      }))
    };
    return <form className="form">
                <h3>By default</h3>
                <Datalist {...propsMultiSection} />
                <h3>default value</h3>
                <Datalist {...defaultValue} />
                <h3>Restricted values</h3>
                <Datalist {...restrictedValues} />
                <h3>With icons</h3>
                <Datalist {...withIcons} />
                <h3>Auto focused</h3>
                <Datalist {...propsMultiSection} autoFocus />
            </form>;
  }
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const restrictedValues = {
      ...singleSectionProps,
      restricted: true
    };
    const defaultValue = {
      ...singleSectionProps,
      value: 'lol'
    };
    const disabledItems = {
      ...singleSectionProps,
      titleMap: titleMapWithDisabledItems
    };
    const withIcons = {
      ...singleSectionProps,
      titleMap: singleSectionProps.titleMap.map((titleMap, i) => ({
        ...titleMap,
        icon: {
          name: ['talend-clock', 'talend-world', 'talend-flow', 'talend-flow-o'][i],
          title: 'My icon'
        }
      }))
    };
    const [titleMap, setTitleMap] = useState(defaultValue.titleMap);
    return <form className="form">
                <h3>By default</h3>
                <Datalist {...singleSectionProps} />

                <h3>Allow adding new elements</h3>
                <Datalist {...singleSectionProps} allowAddNewElements allowAddNewElementsSuffix="(Not in the dictionary)" />

                <h3>default value</h3>
                <Datalist {...defaultValue} />
                <h3>Restricted values</h3>
                <Datalist {...restrictedValues} />
                <h3>Loading</h3>
                <Datalist {...singleSectionProps} titleMap={[]} isLoading />
                <h3>Auto focused</h3>
                <Datalist {...singleSectionProps} autoFocus />
                <h3>With disabled Items</h3>
                <Datalist {...disabledItems} autoFocus />
                <h3>With icons</h3>
                <Datalist {...withIcons} />
                <h3>With suggestions API</h3>
                <Datalist {...defaultValue} titleMap={titleMap} onLiveChange={() => {
        setTimeout(() => {
          setTitleMap(prev => [...prev]);
        }, 200);
      }} />
                <h3>Insert custom elements via render props</h3>
                <Datalist {...singleSectionProps}>
                    {(content, {
          isShown
        }, _, inputRef) => <div>
                            {isShown && <button onClick={() => inputRef.blur()} onMouseDown={e => e.preventDefault()} type="button">
                                    Close dropdown
                                </button>}
                            {content}
                            {isShown && <button onClick={() => console.log('onAfterClick')} onMouseDown={e => e.preventDefault()} type="button">
                                    after
                                </button>}
                        </div>}
                </Datalist>
            </form>;
  }
}`,...N.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const disabledSectionProps = {
      ...defaultProps,
      disabled: true,
      readOnly: false
    };
    const readonlySectionProps = {
      ...defaultProps,
      disabled: false,
      readOnly: true
    };
    const combinationSectionProps = {
      ...defaultProps,
      disabled: true,
      readOnly: true
    };
    return <form className="form">
                <h3>Disabled</h3>
                <Datalist {...disabledSectionProps} />
                <h3>Readonly</h3>
                <Datalist {...readonlySectionProps} />
                <h3>Combination (disabled + readonly)</h3>
                <Datalist {...combinationSectionProps} />
            </form>;
  }
}`,...C.parameters?.docs?.source}}};const qe=["DefaultMultiSection","DefaultSingleSection","DisabledAndReadonly"];export{j as DefaultMultiSection,N as DefaultSingleSection,C as DisabledAndReadonly,qe as __namedExportsOrder,He as default};
