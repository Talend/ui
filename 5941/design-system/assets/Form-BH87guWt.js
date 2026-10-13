import{j as e}from"./index--KvFR1jg.js";import{u as t,M as r,C as i}from"./blocks-BXloX8RE.js";import{S as d}from"./Status.block-DOHy3PY6.js";import{S as l,F as a,D as c,E as h,I as m,L as x}from"./Form.stories-B1oP8oqb.js";import"./iframe-RzlH1tvj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-FaKQGoXO.js";import"./Use-B5i2zvAZ.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./index-jzd0SbQr.js";import"./Statuses-B98etxXV.js";import"./DialogBackdrop-DKmgnz_i.js";import"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./TalendDesignTokens-JgHEBmOa.js";function o(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(d,{id:"form"}),`
`,e.jsx(n.h1,{id:"form",children:"Form"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"Form"})," component is a slightly opinionated ",e.jsx(n.code,{children:"<form>"})," tag with a flex layout and set vertical gap."]}),`
`,e.jsx(n.h2,{id:"style",children:"Style"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The vertical gap between fields, unless specified otherwise, is ",e.jsx(n.code,{children:"spacing-s"}),"."]}),`
`,e.jsxs(n.li,{children:["The horizontal gap between inlined elements in a form is ",e.jsx(n.code,{children:"spacing-m"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/design-tokens-measures--docs",children:"The spacing docs can be found here."})}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"skeleton",children:"Skeleton"}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(n.h3,{id:"field-states",children:"Field states"}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(n.h3,{id:"error",children:"Error"}),`
`,e.jsxs(n.p,{children:["When an error occurs at a level that is not specific to one field, use ",e.jsx(n.code,{children:"InlineMessage"})," to give the user feedback:"]}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"/docs/messaging-inlinemessage--docs",children:"The InlineMessage docs can be found here."})}),`
`,e.jsx(n.h2,{id:"content",children:"Content"}),`
`,e.jsx(n.h3,{id:"form-inline-help",children:"Form inline help"}),`
`,e.jsxs(n.p,{children:["Consider using an ",e.jsx(n.a,{href:"/?path=/docs/messaging-inlinemessage--docs",children:"Inline message"})," when help is needed to fill the form."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(n.h3,{id:"synchronous-action",children:"Synchronous action"}),`
`,e.jsx(i,{of:x}),`
`,e.jsx(n.h3,{id:"data-loss-message",children:"Data loss message"}),`
`,e.jsx(n.p,{children:"When the user clicks on the cancel button or go back to the previous page, provide a confirm dialog."}),`
`,e.jsxs(n.p,{children:["You can easily build that dialog with the ",e.jsx(n.a,{href:"/docs/layout-modal--docs",children:"Modal component."}),"."]}),`
`,e.jsx(n.h3,{id:"error-focus",children:"Error focus"}),`
`,e.jsx(n.p,{children:"In case of error after submission, the focus on the screen should be on the first field errored. If more than one field in error, the focus should be placed on the first one."}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["Choosing between ",e.jsx(n.code,{children:"readonly"})," and ",e.jsx(n.code,{children:"disabled"}),` states is not really easy!
A readonly element is not editable, but gets sent when the form is submitted.
A disabled element isn't editable and isn't sent on submit.
Another difference is that readonly elements can be focused (and getting focused when "tabbing" through a form) while disabled elements can't.`]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"Non applicable"})]})}function E(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{E as default};
