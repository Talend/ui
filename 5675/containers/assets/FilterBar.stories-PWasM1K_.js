import{j as a}from"./iframe-D7nf90uh.js";import{F as o}from"./index-BPljg9sx.js";import"./preload-helper-PPVm8Dsz.js";import"./omit-Cf5iRJkC.js";const i={title:"FilterBar"};function r(){return a.jsx(o,{id:"exampleFilterNavbar",placeholder:"filter nav bar",dockable:!0,navbar:!0})}function e(){return a.jsx(o,{id:"exampleFilterNoNavbar",dockable:!1,navbar:!1,placeholder:"filter no nav bar"})}r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`function Dockable() {
  return <FilterBar id="exampleFilterNavbar" placeholder="filter nav bar" dockable navbar />;
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`function NotDockable() {
  return <FilterBar id="exampleFilterNoNavbar" dockable={false} navbar={false} placeholder="filter no nav bar" />;
}`,...e.parameters?.docs?.source}}};const n=["Dockable","NotDockable"];export{r as Dockable,e as NotDockable,n as __namedExportsOrder,i as default};
