import{j as e}from"./index-nXv0R8um.js";import{u as r}from"./index-DzN6VfON.js";import{M as a,C as i}from"./blocks-eyDa0ols.js";import{F as s}from"./Use-gkmn5k2T.js";import"./index-D5CQICtx.js";import{T as d}from"./DialogBackdrop-BuzytS8-.js";import"./Skeleton-B1IJ9vsQ.js";import"./iframe-DGvyPnos.js";import"./useCopyToClipboard-CBbDwwBs.js";import"./TalendDesignTokens-JgHEBmOa.js";import{S as l}from"./Status.block-CuX0HOKv.js";import{S as c,F as h,D as m,E as p,I as f,L as j}from"./Form.stories-CcIjpEM-.js";import"./index-syHneGmw.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-Q2hzITiA.js";function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c}),`
`,e.jsx(l,{id:"form"}),`
`,e.jsx(n.h1,{id:"form",children:"Form"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Form"})," component is a slightly opinionated ",e.jsx(n.code,{children:"<form>"})," tag with a flex layout and set vertical gap."]}),`
`,e.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=349%3A135",alt:"zoning image for form"}),`
`,e.jsx(n.h2,{id:"style",children:"Style"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The vertical gap between fields, unless specified otherwise, is ",e.jsx(n.code,{children:"spacing-s"}),"."]}),`
`,e.jsxs(n.li,{children:["The horizontal gap between inlined elements in a form is ",e.jsx(n.code,{children:"spacing-m"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/design-tokens-measures--docs",children:"The spacing docs can be found here."})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"skeleton",children:"Skeleton"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=311%3A25",alt:"Form mockup"}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(n.h3,{id:"field-states",children:"Field states"}),`
`,e.jsx(d,{tabs:[{tabTitle:"Default",tabContent:e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=362%3A699",alt:"Form mockup"})},{tabTitle:"Disabled",tabContent:e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=26978%3A137499",alt:"Form mockup disabled state"})},{tabTitle:"ReadOnly",tabContent:e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=26980%3A128569",alt:"Form mockup readonly"})}]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(n.h3,{id:"error",children:"Error"}),`
`,e.jsxs(n.p,{children:["When an error occurs at a level that is not specific to one field, use ",e.jsx(n.code,{children:"InlineMessage"})," to give the user feedback:"]}),`
`,e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=314%3A704",alt:"Form mockup"}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/messaging-inlinemessage--docs",children:"The InlineMessage docs can be found here."})}),`
`,e.jsx(n.h2,{id:"content",children:"Content"}),`
`,e.jsx(n.h3,{id:"form-inline-help",children:"Form inline help"}),`
`,e.jsxs(n.p,{children:["Consider using an ",e.jsx(n.a,{href:"/?path=/docs/messaging-inlinemessage--docs",children:"Inline message"})," when help is needed to fill the form."]}),`
`,e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=314%3A1028",alt:"Form mockup"}),`
`,e.jsx(i,{of:f}),`
`,e.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(n.h3,{id:"synchronous-action",children:"Synchronous action"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=311%3A9",alt:"Form mockup"}),`
`,e.jsx(i,{of:j}),`
`,e.jsx(n.h3,{id:"data-loss-message",children:"Data loss message"}),`
`,e.jsx(n.p,{children:"When the user clicks on the cancel button or go back to the previous page, provide a confirm dialog."}),`
`,e.jsx(s,{src:"https://www.figma.com/file/FaYIWpJeP6LwjWr78L8eAr/Forms?node-id=232%3A39",alt:"Form mockup"}),`
`,e.jsxs(n.p,{children:["You can easily build that dialog with the ",e.jsx(n.a,{href:"/docs/layout-modal--docs",children:"Modal component."}),"."]}),`
`,e.jsx(n.h3,{id:"error-focus",children:"Error focus"}),`
`,e.jsx(n.p,{children:"In case of error after submission, the focus on the screen should be on the first field errored. If more than one field in error, the focus should be placed on the first one."}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Choosing between ",e.jsx(n.code,{children:"readonly"})," and ",e.jsx(n.code,{children:"disabled"}),` states is not really easy!
A readonly element is not editable, but gets sent when the form is submitted.
A disabled element isn't editable and isn't sent on submit.
Another difference is that readonly elements can be focused (and getting focused when "tabbing" through a form) while disabled elements can't.`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"Non applicable"})]})}function D(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{D as default};
