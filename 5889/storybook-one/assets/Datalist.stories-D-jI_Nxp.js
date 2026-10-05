import{r as M,u as Q,j as t,ac as X,D as Z,c as W,aF as ee,ap as B,ab as l}from"./iframe-DT56rRqx.js";import{I as te}from"./constants-CZYEPhht.js";import{F as ne}from"./FocusManager.component-D48hxik2.js";import"./index-C3KQR-_6.js";import{T as oe}from"./Typeahead.component-Cc2s7BJ1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D_pYnOwd.js";import"./usePopper-DFyFiJbT.js";import"./Action.component-BEPutLED.js";import"./ActionButton.component-BErhuowe.js";import"./TooltipTrigger.component-DP16PCjf.js";import"./index-D35iZLMx.js";import"./CircularProgress.component-BFOu_qvW.js";import"./translate-BNyYa1-4.js";import"./withTranslation-CwbHg-m4.js";import"./Skeleton.component-Z95iRMiD.js";import"./theme-Ce0PgxUn.js";import"./OverlayTrigger.component-HyiwQiCb.js";import"./RootCloseWrapper-4E1hn56M.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B5_pNt7A.js";import"./Transition-BdzFFZX1.js";import"./Transition-TH-ani7r.js";import"./ActionSplitDropdown.component-BdSYpoEp.js";import"./SplitButton-y79iVT_T.js";import"./inheritsLoose-BzKyXHnh.js";import"./DropdownButton-BPCZ779j.js";import"./ActionIconToggle.component-DM0kKVg8.js";import"./Actions.component-DoeuIkzb.js";import"./index-dq6Whslw.js";import"./index-DAS9Wpee.js";import"./Emphasis.component-D_INgOzF.js";const se="_container_125nv_6",ie="_items_125nv_13",w={container:se,"items-container":"_items-container_125nv_13","tc-datalist-item":"_tc-datalist-item_125nv_21","tc-datalist-item-icon":"_tc-datalist-item-icon_125nv_25",items:ie};function ae(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const le=["restricted","titleMap","value"],x={ALL:"all",FILTER:"filter",NONE:"none"};function V(e,o,n){return n?e.find(a=>a.suggestions.find(u=>o.toLowerCase()===u.name.toLowerCase())):e.find(a=>o.toLowerCase()===a.name.toLowerCase())}function re({displayMode:e,titleMap:o,filterValue:n,multiSection:a,allowAddNewElements:u,allowAddNewElementsSuffix:m}){if(e===x.NONE)return;if(e===x.ALL&&n){const d=[...o];return u&&!V(o,n,a)&&d.unshift({title:`${n} ${m}`,name:n,value:n}),d}if(e===x.ALL||!n)return o;const f=ae(n.trim()),S=new RegExp(f,"i"),v=a?o.map(d=>({...d,suggestions:n?d.suggestions.filter(h=>S.test(h.name)):d.suggestions})).filter(d=>d.suggestions.length>0):o.filter(d=>S.test(d.name));return u&&!V(o,n,a)&&v.unshift({title:`${n} ${m}`,name:n,value:n}),v}function C(e,o,n=""){if(!e)return null;for(let a=0;a<e.length;a+=1){const u=e[a];if(u.suggestions){const m=u.suggestions.find(f=>!f.disabled&&f[o].toLowerCase()===n.toLowerCase());if(m)return m}else if(!u.disabled&&String(u[o]).toLowerCase()===String(n).toLowerCase())return u}return null}function ce(e,o,n){if(o==="")return{name:o,value:""};const a=C(e,"name",o);return a||(n?void 0:{name:o,value:o})}function F(e,o,n){const a=C(e,"value",o);return a||(n?void 0:{name:o,value:o})}function ue(e,o,n){const a=C(e,"name",o)||C(e,"value",o);return a||{name:o,value:o}}function r(e){const[{name:o,value:n},a]=M.useState({}),{t:u}=Q(te),[m,f]=M.useState(""),[S,v]=M.useState(x.NONE),[d,h]=M.useState({focusedItemIndex:void 0,focusedSectionIndex:void 0}),y=re({displayMode:e.readOnly||e.disabled?x.NONE:S,titleMap:e.titleMap,filterValue:m,multiSection:e.multiSection,allowAddNewElements:e.allowAddNewElements,allowAddNewElementsSuffix:e.allowAddNewElementsSuffix??u("NEW_WITH_PARENTHESIS","(new)")});M.useEffect(()=>{if(e.value===void 0||e.value===null)return;const s=F(e.titleMap,e.value);s&&((s.value!==n||s.name!==o)&&a(s),(!o&&!m||o===m)&&f(s.name))},[e.value,e.titleMap]);const _=()=>h({focusedItemIndex:void 0,focusedSectionIndex:void 0}),$=()=>v(x.FILTER),P=()=>v(x.ALL),E=()=>{v(x.NONE),_()},O=()=>{const s=F(e.titleMap,n);s&&f(s.name)};function A(s,i,c){const g=i.name;f(g),c?(a(i),e.onChange(s,{value:i.value})):e.onLiveChange&&e.onLiveChange(s,i.value)}function L(){if(e.multiSection){const s=e.titleMap;for(let i=0;i<s.length;i+=1){const c=s[i].suggestions.findIndex(g=>g.name===n);if(c>-1){h({focusedItemIndex:c,focusedSectionIndex:i});break}}}else{const s=e.titleMap.findIndex(i=>i.name===n);h({focusedItemIndex:s===-1?null:s})}}function R(s){E();const i=F(e.titleMap,n,e.restricted);if(!i||i.name!==m){const c=ce(e.titleMap,m,e.restricted);c&&c.value!==n?A(s,c,!0):O()}}const H=function(i){e.onBlur&&e.onBlur(),R(i)};function q(s,i){const c=ue(e.titleMap,i.value);A(s,c,!1),$(),_()}function U(s){e.onFocus&&e.onFocus(s),s.target.select(),P(),L()}function z(){P(),L()}function k(s,{sectionIndex:i,itemIndex:c}){const g=e.multiSection?y[i].suggestions[c]:y[c];if(E(),g.disabled||g.value===n){s.preventDefault();return}A(s,g,!0)}function K(s,i){const{highlightedItemIndex:c,highlightedSectionIndex:g,newHighlightedItemIndex:G,newHighlightedSectionIndex:J}=i;switch(s.key){case"Esc":case"Escape":s.preventDefault(),O(),E();break;case"Enter":if(!y)break;s.preventDefault(),Number.isInteger(c)?k(s,{itemIndex:c,sectionIndex:g}):R(s);break;case"Down":case"ArrowDown":case"Up":case"ArrowUp":if(s.preventDefault(),!y){P(),L();break}h({focusedItemIndex:G,focusedSectionIndex:J});break}}function Y(){if(e.titleMap){if(e.multiSection){const i=e.titleMap.find(c=>c.suggestions.find(g=>g.name===n));return B(i&&i.suggestions.find(c=>c.name===n),"icon")}const s=e.titleMap.find(i=>i.name===n)||e.titleMap.find(i=>i.value===n);if(s)return B(s,"icon")}}const T=Y();return t.jsxs(ne,{onFocusOut:H,className:w["tc-datalist-item"],children:[T&&t.jsx(X,{className:w["tc-datalist-item-icon"],...Z(T)}),t.jsx(oe,{...ee(e,le),className:W("tc-datalist",e.className),focusedItemIndex:d.focusedItemIndex,focusedSectionIndex:d.focusedSectionIndex,items:y,onChange:q,onFocus:U,onClick:z,onKeyDown:K,onSelect:k,theme:{container:W(w.container,"tc-datalist-container"),itemsContainer:w["items-container"],itemsList:w.items},value:m,valueId:n,caret:!0})]},"focus-manager")}r.displayName="Datalist component";r.defaultProps={value:"",restricted:!1,multiSection:!1,titleMap:[]};r.propTypes={autoFocus:l.bool,allowAddNewElements:l.bool,allowAddNewElementsSuffix:l.string,isLoading:l.bool,className:l.string,onBlur:l.func,onChange:l.func.isRequired,onFocus:l.func,onClick:l.func,onLiveChange:l.func,disabled:l.bool,multiSection:l.bool,readOnly:l.bool,restricted:l.bool,titleMap:l.arrayOf(l.oneOfType([l.shape({name:l.string.isRequired,value:l.string.isRequired}),l.shape({title:l.string,suggestions:l.arrayOf(l.shape({name:l.string,value:l.string}))})])),value:l.string};const I={onChange:()=>console.log("onChange"),disabled:!1,readOnly:!1,placeholder:"search for something...",titleMap:[{name:"My foo",value:"foo",description:"foo description"},{name:"My bar",value:"bar"},{name:"My foobar",value:"foobar",description:"foobar description"},{name:"My lol",value:"lol"}]},b={...I,multiSection:!0,titleMap:[{title:"cat 1",suggestions:[{name:"My foo",value:"foo",description:"foo description"},{name:"My faa",value:"faa"}]},{title:"cat 2",suggestions:[{name:"My bar",value:"bar"}]},{title:"cat 3",suggestions:[{name:"My foobar",value:"foobar",description:"foobar description"}]},{title:"cat 4",suggestions:[{name:"My lol",value:"lol"}]}]},p={...I,multiSection:!1},de=[{name:"My foo",value:"foo",description:"foo description",disabled:!0},{name:"My bar",value:"bar"},{name:"My lol",value:"lol",disabled:!0},{name:"My foobar",value:"foobar",description:"foobar description"}],qe={title:"Components/Form - Controls/Datalist",component:r,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"col-lg-offset-2 col-lg-8",children:e()})]},D={render:()=>{const e={...b,restricted:!0},o={...b,value:"lol"},n={...b,titleMap:b.titleMap.map(a=>({...a,suggestions:a.suggestions.map(u=>({...u,icon:{name:"talend-clock"}}))}))};return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"By default"}),t.jsx(r,{...b}),t.jsx("h3",{children:"default value"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Restricted values"}),t.jsx(r,{...e}),t.jsx("h3",{children:"With icons"}),t.jsx(r,{...n}),t.jsx("h3",{children:"Auto focused"}),t.jsx(r,{...b,autoFocus:!0})]})}},j={render:()=>{const e={...p,restricted:!0},o={...p,value:"lol"},n={...p,titleMap:de},a={...p,titleMap:p.titleMap.map((f,S)=>({...f,icon:{name:["talend-clock","talend-world","talend-flow","talend-flow-o"][S],title:"My icon"}}))},[u,m]=M.useState(o.titleMap);return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"By default"}),t.jsx(r,{...p}),t.jsx("h3",{children:"Allow adding new elements"}),t.jsx(r,{...p,allowAddNewElements:!0,allowAddNewElementsSuffix:"(Not in the dictionary)"}),t.jsx("h3",{children:"default value"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Restricted values"}),t.jsx(r,{...e}),t.jsx("h3",{children:"Loading"}),t.jsx(r,{...p,titleMap:[],isLoading:!0}),t.jsx("h3",{children:"Auto focused"}),t.jsx(r,{...p,autoFocus:!0}),t.jsx("h3",{children:"With disabled Items"}),t.jsx(r,{...n,autoFocus:!0}),t.jsx("h3",{children:"With icons"}),t.jsx(r,{...a}),t.jsx("h3",{children:"With suggestions API"}),t.jsx(r,{...o,titleMap:u,onLiveChange:()=>{setTimeout(()=>{m(f=>[...f])},200)}}),t.jsx("h3",{children:"Insert custom elements via render props"}),t.jsx(r,{...p,children:(f,{isShown:S},v,d)=>t.jsxs("div",{children:[S&&t.jsx("button",{onClick:()=>d.blur(),onMouseDown:h=>h.preventDefault(),type:"button",children:"Close dropdown"}),f,S&&t.jsx("button",{onClick:()=>console.log("onAfterClick"),onMouseDown:h=>h.preventDefault(),type:"button",children:"after"})]})})]})}},N={render:()=>{const e={...I,disabled:!0,readOnly:!1},o={...I,disabled:!1,readOnly:!0},n={...I,disabled:!0,readOnly:!0};return t.jsxs("form",{className:"form",children:[t.jsx("h3",{children:"Disabled"}),t.jsx(r,{...e}),t.jsx("h3",{children:"Readonly"}),t.jsx(r,{...o}),t.jsx("h3",{children:"Combination (disabled + readonly)"}),t.jsx(r,{...n})]})}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};const Ue=["DefaultMultiSection","DefaultSingleSection","DisabledAndReadonly"];export{D as DefaultMultiSection,j as DefaultSingleSection,N as DisabledAndReadonly,Ue as __namedExportsOrder,qe as default};
