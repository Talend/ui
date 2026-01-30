import{j as n}from"./iframe-BPWKJ2_o.js";import{A as t}from"./ActionSplitDropdown.component-8PenvcAp.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BRrpl1wo.js";import"./constants-CZYEPhht.js";import"./SplitButton-C2kpOeLT.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./inheritsLoose-DEJIaahp.js";const r=[{label:"From Local","data-feature":"actionsplitdropdown.items",onClick:()=>console.log("From Local click")},{label:"From Remote","data-feature":"actionsplitdropdown.items",onClick:()=>console.log("From Remote click")}],d=[{...r[0],icon:"talend-logo-ic"},{...r[1],icon:"talend-logo-dp"}],o={label:"Add File",icon:"talend-environment","data-feature":"actionsplitdropdown",onClick:()=>console.log("onAdd"),items:r,emptyDropdownLabel:"No option"},u={title:"Components/Deprecated/SplitDropdown",component:t,tags:["autodocs"],decorators:[i=>n.jsxs("div",{children:[i(),n.jsx("div",{className:"container",style:{paddingTop:40}})]})]},s={render:()=>n.jsxs("div",{children:[n.jsx("p",{children:"By default :"}),n.jsx("div",{id:"default",children:n.jsx(t,{...o})}),n.jsx("p",{children:"Options with icons"}),n.jsx("div",{id:"icon",children:n.jsx(t,{...o,items:d})}),n.jsx("p",{children:"Without icon"}),n.jsx("div",{id:"noicon",children:n.jsx(t,{...o,icon:""})}),n.jsx("p",{children:"dropup"}),n.jsx("div",{id:"noicon",children:n.jsx(t,{...o,dropup:!0})}),n.jsx("p",{children:"Empty option"}),n.jsx("div",{id:"empty",children:n.jsx(t,{...o,items:[]})})]})},e={render:()=>{const i={margin:"0 5px"};return n.jsxs("div",{id:"styles",children:[n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"default",...o})}),n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"primary",...o})}),n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"success",...o})}),n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"info",...o})}),n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"warning",...o})}),n.jsx("span",{style:i,children:n.jsx(t,{bsStyle:"danger",...o})})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <p>By default :</p>
            <div id="default">
                <ActionSplitDropdown {...myAction} />
            </div>
            <p>Options with icons</p>
            <div id="icon">
                <ActionSplitDropdown {...myAction} items={itemsWithIcons} />
            </div>
            <p>Without icon</p>
            <div id="noicon">
                <ActionSplitDropdown {...myAction} icon="" />
            </div>
            <p>dropup</p>
            <div id="noicon">
                <ActionSplitDropdown {...myAction} dropup />
            </div>
            <p>Empty option</p>
            <div id="empty">
                <ActionSplitDropdown {...myAction} items={[]} />
            </div>
        </div>
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const btnStyles = {
      margin: '0 5px'
    };
    return <div id="styles">
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="default" {...myAction} />
                </span>
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="primary" {...myAction} />
                </span>
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="success" {...myAction} />
                </span>
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="info" {...myAction} />
                </span>
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="warning" {...myAction} />
                </span>
                <span style={btnStyles}>
                    <ActionSplitDropdown bsStyle="danger" {...myAction} />
                </span>
            </div>;
  }
}`,...e.parameters?.docs?.source}}};const A=["Default","StyleVariations"];export{s as Default,e as StyleVariations,A as __namedExportsOrder,u as default};
