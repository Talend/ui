import{j as e}from"./index-ezWhUaUG.js";import{u as a}from"./index-DY6ZQmeY.js";import{M as o,C as i}from"./blocks-BPYIHoeL.js";import{F as r}from"./Use-DaC-5pFv.js";import"./index-D7QZZOrd.js";import{S as h}from"./Status.block-D8U3KFUq.js";import{S as l,D as d,W as c,a as p,b as u,c as x}from"./ErrorState.stories-DfxZc3mx.js";import"./iframe-DtIjfOV1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Sr8Oukat.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-DgLp_AnM.js";import"./DialogBackdrop-BEiEofEA.js";import"./Skeleton-CCG0GZp1.js";import"./useCopyToClipboard-DG0W1111.js";import"./TalendDesignTokens-JgHEBmOa.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(h,{id:"errorState"}),`
`,e.jsx(n.h1,{id:"errorstate",children:"ErrorState"}),`
`,e.jsx(n.p,{children:"They describe the state where the app fails to complete an action or can't respond or do what the user wants."}),`
`,e.jsx(n.p,{children:"The scope of the error varies and could be associated with:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The entire app"}),`
`,e.jsx(n.li,{children:"The entire current screen"}),`
`,e.jsx(n.li,{children:"A specific element on the screen"}),`
`]}),`
`,e.jsx(n.p,{children:"Depending on the scope, the error state may display directly on the screen, in dialogs, or in toasters."}),`
`,e.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(r,{src:"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5523%3A27381",alt:"Zoning image for ErrorState"}),`
`,e.jsx(n.h2,{id:"style",children:"Style"}),`
`,e.jsx(r,{src:"https://www.figma.com/file/hMYM9HGXajJpWdGwRb5ITR/Coral?node-id=5523%3A27381",alt:"Styles for ErrorStates"}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"Use this error state to clearly tell users what went wrong, the underlying cause and how they could fix the problem, take a step back, or move to other pages."}),`
`,e.jsx(n.p,{children:"This error state includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"an icon which supports the error message (except in alert toasters)"}),`
`,e.jsx(n.li,{children:"an informative title to clearly state the problem"}),`
`,e.jsxs(n.li,{children:["body text to:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Say why this happened and give any additional information or context users need to know in order to do the right action. Avoid repeating content from the title",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"suggest actions users can take"}),`
`,e.jsx(n.li,{children:"give users at least one button (primary CTA) to help them resolve the problem and a secondary outline button, a button with an option to go back and cancel the action. (except in alert toasters)"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"variations",children:"Variations"}),`
`,e.jsx(n.p,{children:"Error state visually varies depending on what features are provided through the props to the component."}),`
`,e.jsx(n.h4,{id:"default-with-a-title-and-a-description",children:"Default (with a title and a description)"}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(n.h4,{id:"with-a-link-default-features-plus-a-link",children:"With a link (default features, plus a link)"}),`
`,e.jsx(i,{of:c}),`
`,e.jsxs(n.h4,{id:"with-a-link-built-from-link--props",children:["With a link built from ",e.jsx(n.code,{children:"<Link />"})," props"]}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(n.h4,{id:"with-an-action-default-features-plus-an-action",children:"With an action (default features, plus an action)"}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(n.h4,{id:"with-an-action-and-a-link-default-features-plus-an-action-and-a-link",children:"With an action and a link (default features, plus an action and a link)"}),`
`,e.jsx(i,{of:x}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.p,{children:"N/A"}),`
`,e.jsx(n.h2,{id:"content",children:"Content:"}),`
`,e.jsx(n.p,{children:"Use error states to help users fix the problem and let the product voice shine through."}),`
`,e.jsx(n.h3,{id:"title",children:"Title"}),`
`,e.jsx(n.p,{children:"Template: Couldn't (do something)"}),`
`,e.jsx(n.h3,{id:"body",children:"Body"}),`
`,e.jsx(n.p,{children:"Template: (cause) + (actions to do)"}),`
`,e.jsx(n.h3,{id:"cta",children:"CTA"}),`
`,e.jsx(n.p,{children:"CTAs which align with the propositions in the body"}),`
`,e.jsx(n.h3,{id:"example",children:"Example:"}),`
`,e.jsx(n.p,{children:`Title: Couldn’t rerun the preparation
Body: The below parameters have changed in the last run. Edit them and try again, or define a new run.
CTA: Start over Edit`}),`
`,e.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"N/A"}),`
`,e.jsx(n.h2,{id:"usage-1",children:"Usage"})]})}function R(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{R as default};
