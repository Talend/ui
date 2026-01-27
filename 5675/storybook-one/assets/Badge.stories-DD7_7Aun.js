import{j as e,r as g}from"./iframe-B_4wJIS8.js";import{B as l}from"./Badge.component-BQR2R_tS.js";import{F as y}from"./FilterBar.component-C3-LMcz6.js";import{A as p}from"./Action.component-CFKS61Kv.js";import"./preload-helper-PPVm8Dsz.js";import"./theme-rZbYulMu.js";import"./TooltipTrigger.component-UE44jBfo.js";import"./constants-CZYEPhht.js";import"./index-2LIYn8RY.js";import"./index-CXccLl9J.js";import"./index-BjrCEcJh.js";import"./Actions.component--FIXM9e2.js";import"./OverlayTrigger.component-CPeQ8j4-.js";import"./RootCloseWrapper-DEvVHIQL.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-KR_oZShS.js";import"./Transition-xoA8W_1t.js";import"./Transition-BxQmsZ3a.js";import"./SplitButton-BBdShQee.js";import"./inheritsLoose-D74nn77K.js";import"./ActionButton.component-Cpu2RjWB.js";import"./index-BF7g9OyK.js";import"./CircularProgress.component-CJJ68GdE.js";import"./translate-9bG30sZL.js";import"./withTranslation-gwdAr2UT.js";import"./Skeleton.component-Cnert0C7.js";import"./ActionIconToggle.component-DT3KyiIW.js";import"./ActionSplitDropdown.component-DrRGmgDg.js";import"./FormControl-B8yMkt2Z.js";import"./get-C-eStwz-.js";import"./_baseGet-D4w8jjj2.js";import"./toString-Cq3taLdz.js";import"./isSymbol-DJhelppy.js";import"./eq-BDZQrTUZ.js";import"./omit-Cjg7wDrx.js";import"./_setToString-BOqf-aER.js";import"./_getTag-BZemYwVp.js";import"./isArrayLike-DS_zinFP.js";import"./DropdownButton-COOoeBO0.js";const i={display:"flex"},B={backgroundColor:"rgba(246, 246, 246, 0.5)"},s={flexGrow:"1",maxWidth:"250px",padding:"0 10px"},o={id:"context-dropdown-related-items",label:"Label",items:[{id:"context-dropdown-item-document-1",label:"document 1","data-feature":"actiondropdown.items",onClick:()=>console.log("document 1 click")},{divider:!0},{id:"context-dropdown-item-document-2",label:"document 2","data-feature":"actiondropdown.items",onClick:()=>console.log("document 2 click")}]},b={id:"context-dropdown-custom-items",label:"custom items",getComponent:r=>{if(r==="Action")return p;if(r==="FilterBar")return y;throw new Error("Component not found")},components:{itemsDropdown:[{component:"Action",label:"First item","data-feature":"actiondropdown.items"},{divider:!0},{component:"FilterBar",label:"Second item","data-feature":"actiondropdown.items",onFilter:()=>console.log("onFilter")}]}};function d(r){return{onDelete:()=>console.log(`remove badge ${r}`)}}function a(r){return{onSelect:()=>console.log(`select badge ${r}`)}}const t="Very, very, very, very, very, very, very, very long tag",ae={title:"Components/Navigation/Badge",component:l,tags:["autodocs"]},n={render:()=>e.jsxs(g.Fragment,{children:[e.jsxs("section",{children:[e.jsx("h1",{children:"New visual"}),e.jsxs("div",{style:i,id:"newVisual-header",children:[e.jsx("div",{style:s,children:e.jsx("span",{children:"Tags as links"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Read-only"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode (without select action)"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode (with select action)"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Badge with ellipsis"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Badge with Dropdown"})})]}),e.jsx("hr",{}),e.jsxs("div",{style:i,id:"newVisual",children:[e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,aslink:!0,...a("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,aslink:!0,...a("B")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,aslink:!0,...a("A"),icon:"talend-clock"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,aslink:!0,...a("B"),icon:"talend-clock"}),e.jsx("br",{}),e.jsx(l,{label:"Categ not visible",display:l.SIZES.large,category:"Cat",aslink:!0,...a("B")}),e.jsx(l,{label:"Categ not visible",display:l.SIZES.small,category:"Cat",aslink:!0,...a("B")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,icon:"talend-clock"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,icon:"talend-clock"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock"}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock"})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock",...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock",...d("A")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,...a("A"),...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,...a("A"),...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",...a("B"),...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",...a("B"),...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock",...a("B"),...d("A")}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock",...a("B"),...d("A")})]}),e.jsxs("div",{style:s,children:[e.jsx("span",{children:"As Link"}),e.jsx(l,{label:t,display:l.SIZES.large,aslink:!0,...a("B"),...d("A")}),e.jsx(l,{label:t,display:l.SIZES.small,aslink:!0,...a("B"),...d("A")}),e.jsx(l,{label:t,display:l.SIZES.large,aslink:!0,...a("B"),...d("A"),icon:"talend-clock"}),e.jsx(l,{label:t,display:l.SIZES.small,aslink:!0,...a("B"),...d("A"),icon:"talend-clock"}),e.jsx("span",{children:"Read only"}),e.jsx(l,{label:t,display:l.SIZES.large,category:t}),e.jsx(l,{label:t,display:l.SIZES.small,category:t}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,icon:"talend-clock"}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,icon:"talend-clock"}),e.jsx("span",{children:"Edit Mode"}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,...a("B"),...d("A")}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,...a("B"),...d("A")}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,icon:"talend-clock",...a("B"),...d("A")}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,icon:"talend-clock",...a("B"),...d("A")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:o}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:o}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:b}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:{...o,label:t,tooltipLabel:t}}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:{...o,label:t,tooltipLabel:t}})]})]}),e.jsx("hr",{})]}),e.jsxs("section",{children:[e.jsx("h1",{children:"New visual - Disabled"}),e.jsxs("div",{style:i,id:"newVisualDisabled-header",children:[e.jsx("div",{style:s,children:e.jsx("span",{children:"Tags as links"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Read-only"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode (without select action)"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode (with select action)"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Badge with ellipsis"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Badge with Dropdown"})})]}),e.jsx("hr",{}),e.jsxs("div",{style:i,id:"newVisualDisabled",children:[e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,aslink:!0,...a("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,aslink:!0,...a("B"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,aslink:!0,...a("A"),icon:"talend-clock",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,aslink:!0,...a("B"),icon:"talend-clock",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Categ not visible",display:l.SIZES.large,category:"Cat",aslink:!0,...a("B"),disabled:!0}),e.jsx(l,{label:"Categ not visible",display:l.SIZES.small,category:"Cat",aslink:!0,...a("B"),disabled:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,icon:"talend-clock",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,icon:"talend-clock",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock",disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock",disabled:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock",...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock",...d("A"),disabled:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Label",display:l.SIZES.large,...a("A"),...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,...a("A"),...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",...a("B"),...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",...a("B"),...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.large,category:"Cat",icon:"talend-clock",...a("B"),...d("A"),disabled:!0}),e.jsx("br",{}),e.jsx(l,{label:"Label",display:l.SIZES.small,category:"Cat",icon:"talend-clock",...a("B"),...d("A"),disabled:!0})]}),e.jsxs("div",{style:s,children:[e.jsx("span",{children:"As Link"}),e.jsx(l,{label:t,display:l.SIZES.large,aslink:!0,...a("B"),...d("A"),disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,aslink:!0,...a("B"),...d("A"),disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.large,aslink:!0,...a("B"),...d("A"),icon:"talend-clock",disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,aslink:!0,...a("B"),...d("A"),icon:"talend-clock",disabled:!0}),e.jsx("span",{children:"Read only"}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,icon:"talend-clock",disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,icon:"talend-clock",disabled:!0}),e.jsx("span",{children:"Edit Mode"}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,...a("B"),...d("A"),disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,...a("B"),...d("A"),disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.large,category:t,icon:"talend-clock",...a("B"),...d("A"),disabled:!0}),e.jsx(l,{label:t,display:l.SIZES.small,category:t,icon:"talend-clock",...a("B"),...d("A"),disabled:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:{...o,disabled:!0},disabled:!0}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:{...o,disabled:!0},disabled:!0}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:{...b,disabled:!0},disabled:!0}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.large,category:"Cat",dropdown:{...o,label:t,tooltipLabel:t,disabled:!0},disabled:!0}),e.jsx("br",{}),e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:{...o,label:t,tooltipLabel:t,disabled:!0},disabled:!0})]})]}),e.jsx("hr",{})]}),e.jsxs("section",{style:B,children:[e.jsx("h1",{children:"New visual - white background"}),e.jsxs("div",{style:i,id:"newVisualWhite-header",children:[e.jsx("div",{style:s,children:e.jsx("span",{children:"/"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Tags as links"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Read-only"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Edit mode with ellipsis"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Badge with Dropdown"})})]}),e.jsx("hr",{}),e.jsxs("div",{style:i,id:"newVisualWhiteEnabled",children:[e.jsx("div",{style:s,children:"enabled"}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,aslink:!0,...a("B")})}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,...a("B")})}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,...a("B"),...d("A")})}),e.jsx("div",{style:s,children:e.jsx(l,{label:t,display:l.SIZES.small,category:"Cat",white:!0,...a("B"),...d("A")})}),e.jsx("div",{style:s,children:e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:o,white:!0})})]}),e.jsx("hr",{}),e.jsxs("div",{style:i,id:"newVisualWhiteDisabled",children:[e.jsx("div",{style:s,children:"disabled"}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,aslink:!0,...a("B"),disabled:!0})}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,...a("B"),disabled:!0})}),e.jsx("div",{style:s,children:e.jsx(l,{label:"Label",display:l.SIZES.small,white:!0,...a("B"),...d("A"),disabled:!0})}),e.jsx("div",{style:s,children:e.jsx(l,{label:t,display:l.SIZES.small,category:"Cat",white:!0,...a("B"),...d("A"),disabled:!0})}),e.jsx("div",{style:s,children:e.jsx(l,{display:l.SIZES.small,category:"Cat",dropdown:{...o,disabled:!0},disabled:!0,white:!0})})]}),e.jsx("hr",{})]}),e.jsxs("section",{children:[e.jsx("h1",{children:"Old Examples"}),e.jsxs("div",{style:i,id:"oldExample-header",children:[e.jsx("div",{style:s,children:e.jsx("span",{children:"Read Only"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"With delete"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Selected"})}),e.jsx("div",{style:s,children:e.jsx("span",{children:"Disabled"})})]}),e.jsx("hr",{}),e.jsxs("div",{style:i,id:"oldExample",children:[e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Group A",...a("A")}),e.jsx(l,{label:t,...a("B")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Group A",...d("A"),...a("A")}),e.jsx(l,{label:t,...d("B"),...a("B")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Group A",...d("As"),...a("As"),selected:!0}),e.jsx(l,{label:t,...d("Bs"),...a("Bs"),selected:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Group A",...d("Ad"),disabled:!0}),e.jsx(l,{label:t,...d("Bd"),disabled:!0})]})]}),e.jsxs("div",{style:i,id:"oldExampleCategory",children:[e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Little Gem Magnolia",category:"Trees",...a("L")}),e.jsx(l,{label:"Mexican Plum",category:"Trees",...a("M")}),e.jsx(l,{label:"Rose",category:"Flowers",...a("R")}),e.jsx(l,{label:"Dog",category:"Animals",...a("D")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Little Gem Magnolia",category:"Trees",...d("L"),...a("L")}),e.jsx(l,{label:"Mexican Plum",category:"Trees",...d("M"),...a("M")}),e.jsx(l,{label:"Rose",category:"Flowers",...d("R"),...a("R")}),e.jsx(l,{label:"Dog",category:"Animals",...d("D"),...a("D")})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Little Gem Magnolia",category:"Trees",...d("Ls"),...a("Ls"),selected:!0}),e.jsx(l,{label:"Mexican Plum",category:"Trees",...d("Ms"),...a("Ms"),selected:!0}),e.jsx(l,{label:"Rose",category:"Flowers",...d("Rs"),...a("Rs"),selected:!0}),e.jsx(l,{label:"Dog",category:"Animals",...d("Ds"),...a("Ds"),selected:!0})]}),e.jsxs("div",{style:s,children:[e.jsx(l,{label:"Little Gem Magnolia",category:"Trees",...d("Ld"),...a("Ld"),disabled:!0}),e.jsx(l,{label:"Mexican Plum",category:"Trees",...d("Md"),...a("Md"),disabled:!0}),e.jsx(l,{label:"Rose",category:"Flowers",...d("Rd"),...a("Rd"),disabled:!0}),e.jsx(l,{label:"Dog",category:"Animals",...d("Dd"),...a("Dd"),disabled:!0})]})]})]})]})},c={render:()=>e.jsx(e.Fragment,{children:Object.entries(l.TYPES).map(([r,S])=>e.jsxs("div",{children:[r,e.jsx(l,{label:"Label",display:l.SIZES.small,type:S,category:"Category",...a("A"),...d("A")})]},r))})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <Fragment>
            <section>
                <h1>New visual</h1>

                <div style={defaultStyle} id="newVisual-header">
                    <div style={columnStyle}>
                        <span>Tags as links</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Read-only</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode (without select action)</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode (with select action)</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Badge with ellipsis</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Badge with Dropdown</span>
                    </div>
                </div>
                <hr />
                <div style={defaultStyle} id="newVisual">
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} icon="talend-clock" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} icon="talend-clock" />
                        <br />
                        <Badge label="Categ not visible" display={Badge.SIZES.large} category="Cat" aslink {...onSelect('B')} />
                        <Badge label="Categ not visible" display={Badge.SIZES.small} category="Cat" aslink {...onSelect('B')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} icon="talend-clock" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} icon="talend-clock" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" {...onDelete('A')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} {...onSelect('A')} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} {...onSelect('A')} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" {...onSelect('B')} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" {...onSelect('B')} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" {...onSelect('B')} {...onDelete('A')} />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" {...onSelect('B')} {...onDelete('A')} />
                    </div>
                    <div style={columnStyle}>
                        <span>As Link</span>
                        <Badge label={longStr} display={Badge.SIZES.large} aslink {...onSelect('B')} {...onDelete('A')} />
                        <Badge label={longStr} display={Badge.SIZES.small} aslink {...onSelect('B')} {...onDelete('A')} />
                        <Badge label={longStr} display={Badge.SIZES.large} aslink {...onSelect('B')} {...onDelete('A')} icon="talend-clock" />
                        <Badge label={longStr} display={Badge.SIZES.small} aslink {...onSelect('B')} {...onDelete('A')} icon="talend-clock" />
                        <span>Read only</span>
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} />
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} icon="talend-clock" />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} icon="talend-clock" />
                        <span>Edit Mode</span>
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} {...onSelect('B')} {...onDelete('A')} />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} {...onSelect('B')} {...onDelete('A')} />
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} icon="talend-clock" {...onSelect('B')} {...onDelete('A')} />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} icon="talend-clock" {...onSelect('B')} {...onDelete('A')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={dropdownProps} />
                        <br />
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={dropdownProps} />
                        <br />
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={withComponents} />
                        <br />
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={{
            ...dropdownProps,
            label: longStr,
            tooltipLabel: longStr
          }} />
                        <br />
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={{
            ...dropdownProps,
            label: longStr,
            tooltipLabel: longStr
          }} />
                    </div>
                </div>
                <hr />
            </section>

            <section>
                <h1>New visual - Disabled</h1>

                <div style={defaultStyle} id="newVisualDisabled-header">
                    <div style={columnStyle}>
                        <span>Tags as links</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Read-only</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode (without select action)</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode (with select action)</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Badge with ellipsis</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Badge with Dropdown</span>
                    </div>
                </div>
                <hr />
                <div style={defaultStyle} id="newVisualDisabled">
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} aslink {...onSelect('A')} icon="talend-clock" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} aslink {...onSelect('B')} icon="talend-clock" disabled />
                        <br />
                        <Badge label="Categ not visible" display={Badge.SIZES.large} category="Cat" aslink {...onSelect('B')} disabled />
                        <Badge label="Categ not visible" display={Badge.SIZES.small} category="Cat" aslink {...onSelect('B')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} icon="talend-clock" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} icon="talend-clock" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" {...onDelete('A')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.large} {...onSelect('A')} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} {...onSelect('A')} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" {...onSelect('B')} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" {...onSelect('B')} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.large} category="Cat" icon="talend-clock" {...onSelect('B')} {...onDelete('A')} disabled />
                        <br />
                        <Badge label="Label" display={Badge.SIZES.small} category="Cat" icon="talend-clock" {...onSelect('B')} {...onDelete('A')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <span>As Link</span>
                        <Badge label={longStr} display={Badge.SIZES.large} aslink {...onSelect('B')} {...onDelete('A')} disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} aslink {...onSelect('B')} {...onDelete('A')} disabled />
                        <Badge label={longStr} display={Badge.SIZES.large} aslink {...onSelect('B')} {...onDelete('A')} icon="talend-clock" disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} aslink {...onSelect('B')} {...onDelete('A')} icon="talend-clock" disabled />
                        <span>Read only</span>
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} disabled />
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} icon="talend-clock" disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} icon="talend-clock" disabled />
                        <span>Edit Mode</span>
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} {...onSelect('B')} {...onDelete('A')} disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} {...onSelect('B')} {...onDelete('A')} disabled />
                        <Badge label={longStr} display={Badge.SIZES.large} category={longStr} icon="talend-clock" {...onSelect('B')} {...onDelete('A')} disabled />
                        <Badge label={longStr} display={Badge.SIZES.small} category={longStr} icon="talend-clock" {...onSelect('B')} {...onDelete('A')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={{
            ...dropdownProps,
            disabled: true
          }} disabled />
                        <br />
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={{
            ...dropdownProps,
            disabled: true
          }} disabled />
                        <br />
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={{
            ...withComponents,
            disabled: true
          }} disabled />
                        <br />
                        <Badge display={Badge.SIZES.large} category="Cat" dropdown={{
            ...dropdownProps,
            label: longStr,
            tooltipLabel: longStr,
            disabled: true
          }} disabled />
                        <br />
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={{
            ...dropdownProps,
            label: longStr,
            tooltipLabel: longStr,
            disabled: true
          }} disabled />
                    </div>
                </div>
                <hr />
            </section>

            <section style={greyBackgroundStyle}>
                <h1>New visual - white background</h1>

                <div style={defaultStyle} id="newVisualWhite-header">
                    <div style={columnStyle}>
                        <span>/</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Tags as links</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Read-only</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Edit mode with ellipsis</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Badge with Dropdown</span>
                    </div>
                </div>
                <hr />
                <div style={defaultStyle} id="newVisualWhiteEnabled">
                    <div style={columnStyle}>enabled</div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white aslink {...onSelect('B')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} {...onDelete('A')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label={longStr} display={Badge.SIZES.small} category="Cat" white {...onSelect('B')} {...onDelete('A')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={dropdownProps} white />
                    </div>
                </div>
                <hr />
                <div style={defaultStyle} id="newVisualWhiteDisabled">
                    <div style={columnStyle}>disabled</div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white aslink {...onSelect('B')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Label" display={Badge.SIZES.small} white {...onSelect('B')} {...onDelete('A')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge label={longStr} display={Badge.SIZES.small} category="Cat" white {...onSelect('B')} {...onDelete('A')} disabled />
                    </div>
                    <div style={columnStyle}>
                        <Badge display={Badge.SIZES.small} category="Cat" dropdown={{
            ...dropdownProps,
            disabled: true
          }} disabled white />
                    </div>
                </div>
                <hr />
            </section>

            <section>
                <h1>Old Examples</h1>

                <div style={defaultStyle} id="oldExample-header">
                    <div style={columnStyle}>
                        <span>Read Only</span>
                    </div>
                    <div style={columnStyle}>
                        <span>With delete</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Selected</span>
                    </div>
                    <div style={columnStyle}>
                        <span>Disabled</span>
                    </div>
                </div>
                <hr />
                <div style={defaultStyle} id="oldExample">
                    <div style={columnStyle}>
                        <Badge label="Group A" {...onSelect('A')} />
                        <Badge label={longStr} {...onSelect('B')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Group A" {...onDelete('A')} {...onSelect('A')} />
                        <Badge label={longStr} {...onDelete('B')} {...onSelect('B')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Group A" {...onDelete('As')} {...onSelect('As')} selected />
                        <Badge label={longStr} {...onDelete('Bs')} {...onSelect('Bs')} selected />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Group A" {...onDelete('Ad')} disabled />
                        <Badge label={longStr} {...onDelete('Bd')} disabled />
                    </div>
                </div>
                <div style={defaultStyle} id="oldExampleCategory">
                    <div style={columnStyle}>
                        <Badge label="Little Gem Magnolia" category="Trees" {...onSelect('L')} />
                        <Badge label="Mexican Plum" category="Trees" {...onSelect('M')} />
                        <Badge label="Rose" category="Flowers" {...onSelect('R')} />
                        <Badge label="Dog" category="Animals" {...onSelect('D')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Little Gem Magnolia" category="Trees" {...onDelete('L')} {...onSelect('L')} />
                        <Badge label="Mexican Plum" category="Trees" {...onDelete('M')} {...onSelect('M')} />
                        <Badge label="Rose" category="Flowers" {...onDelete('R')} {...onSelect('R')} />
                        <Badge label="Dog" category="Animals" {...onDelete('D')} {...onSelect('D')} />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Little Gem Magnolia" category="Trees" {...onDelete('Ls')} {...onSelect('Ls')} selected />
                        <Badge label="Mexican Plum" category="Trees" {...onDelete('Ms')} {...onSelect('Ms')} selected />
                        <Badge label="Rose" category="Flowers" {...onDelete('Rs')} {...onSelect('Rs')} selected />
                        <Badge label="Dog" category="Animals" {...onDelete('Ds')} {...onSelect('Ds')} selected />
                    </div>
                    <div style={columnStyle}>
                        <Badge label="Little Gem Magnolia" category="Trees" {...onDelete('Ld')} {...onSelect('Ld')} disabled />
                        <Badge label="Mexican Plum" category="Trees" {...onDelete('Md')} {...onSelect('Md')} disabled />
                        <Badge label="Rose" category="Flowers" {...onDelete('Rd')} {...onSelect('Rd')} disabled />
                        <Badge label="Dog" category="Animals" {...onDelete('Dd')} {...onSelect('Dd')} disabled />
                    </div>
                </div>
            </section>
        </Fragment>
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <>
            {Object.entries(Badge.TYPES).map(([name, value]) => <div key={name}>
                    {name}
                    <Badge label="Label" display={Badge.SIZES.small} type={value} category="Category" {...onSelect('A')} {...onDelete('A')} />
                </div>)}
        </>
}`,...c.parameters?.docs?.source}}};const de=["Default","Colored"];export{c as Colored,n as Default,de as __namedExportsOrder,ae as default};
