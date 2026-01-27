import{j as e}from"./index-DqyI3zNy.js";import{u as c}from"./index-DUm8XAT2.js";import{M as d,C as r}from"./blocks-BA4ii67_.js";import{F as m}from"./Use-BRy90BcC.js";import{c as s}from"./index-3dZT5jlp.js";import{S as h}from"./Status.block-hwD0x4WB.js";import{S as f,a as p,W as x,b as j,U as g}from"./FloatingDrawer.stories-Ba1EaIfP.js";import"./iframe-BqCCNGDC.js";import"./preload-helper-PPVm8Dsz.js";import"./index-fQXUwmIU.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-CfLXJF6u.js";import"./DialogBackdrop-Bbhqy77d.js";import"./Skeleton-DhSiadqt.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./TalendDesignTokens-JgHEBmOa.js";const w="_iframe_1uv01_1",o={iframe:w},a={height:600,width:"100%",allowFullScreen:!0},u=({light:n,dark:i,...t})=>e.jsxs(e.Fragment,{children:[n?e.jsx("iframe",{title:"Figma",...a,...t,className:s(o.iframe,"figma-iframe figma-iframe--light"),src:`https://www.figma.com/embed?embed_host=storybook&url=                  ${n}`}):null,i?e.jsx("iframe",{title:"Figma",...a,...t,className:s(o.iframe,"figma-iframe figma-iframe--dark"),src:`https://www.figma.com/embed?embed_host=storybook&url=				  ${i}`}):null]});function l(n){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...c(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:f}),`
`,e.jsx(h,{id:"floatingDrawer"}),`
`,e.jsx(i.h1,{id:"drawer",children:"Drawer"}),`
`,e.jsx(i.p,{children:"Drawer slides into the screen from the right side and is placed visually over the content of the page."}),`
`,e.jsx(i.p,{children:"It aims to display extra information while keeping the navigation enabled on the main content."}),`
`,e.jsx(i.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(m,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=744%3A263",alt:"zoning image for drawers"}),`
`,e.jsx(i.h2,{id:"style",children:"Style"}),`
`,e.jsx(u,{light:"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer?node-id=1%3A83",dark:"https://www.figma.com/file/x0RxG7E0CzVWDycXtNgq7H/Drawer?node-id=1%3A105"}),`
`,e.jsx(i.h3,{id:"variations",children:"Variations"}),`
`,e.jsx(r,{sourceState:"none",of:p}),`
`,e.jsx(r,{sourceState:"none",of:x}),`
`,e.jsx(r,{sourceState:"none",of:j}),`
`,e.jsx(i.h2,{id:"states",children:"States"}),`
`,e.jsx(i.p,{children:"Drawers are either visible or hidden."}),`
`,e.jsx(i.h2,{id:"content",children:"Content"}),`
`,e.jsx(i.p,{children:"Drawers are “optional” content living on top of primary content. Since they fill only 1/3 of the page's width, prefer extra or additional information. Avoid dense copy and complex forms. Drawer contents should be efficient, short and tailored for the limited layout space available."}),`
`,e.jsxs(i.p,{children:["If you need more space, use ",e.jsx(i.a,{href:"",children:"full-page layout"}),"."]}),`
`,e.jsx(i.p,{children:"Footer can contain only calls to action."}),`
`,e.jsx(i.h2,{id:"interaction",children:"Interaction"}),`
`,e.jsx(i.p,{children:"Drawer Heading and Footer zones are fixed; the Content zone can display a scrollbar when its content overflows."}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.p,{children:["Drawers disclosures have a value specified for ",e.jsx(i.code,{children:"aria-controls"})," that refers to Drawer."]}),`
`,e.jsxs(i.p,{children:["When Drawer is visible, disclosure has ",e.jsx(i.code,{children:"aria-expanded"})," set to ",e.jsx(i.code,{children:"true"}),". When Drawer is hidden, it is set to ",e.jsx(i.code,{children:"false"}),"."]}),`
`,e.jsxs(i.p,{children:["Also ",e.jsx(i.code,{children:"aria-label"})," is required for screen readers."]}),`
`,e.jsx(i.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(r,{of:g})]})}function U(n={}){const{wrapper:i}={...c(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(l,{...n})}):l(n)}export{U as default};
