import{j as e}from"./index--KvFR1jg.js";import{u as a,M as c,C as s,a as h}from"./blocks-BXloX8RE.js";import{U as o}from"./Use-B5i2zvAZ.js";import"./index-jzd0SbQr.js";import{S as d,C as x,a as p,b,c as m,d as u,B as l}from"./Input.Checkbox.stories-BcFfDFnt.js";import{S as j}from"./Status.block-DOHy3PY6.js";import"./iframe-RzlH1tvj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-FaKQGoXO.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./DialogBackdrop-DKmgnz_i.js";import"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./TalendDesignTokens-JgHEBmOa.js";import"./index.esm-DUWUYt1-.js";import"./Statuses-B98etxXV.js";function r(n){const t={a:"a",blockquote:"blockquote",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...a(),...n.components};return o||i("Use",!1),o.Do||i("Use.Do",!0),o.Dont||i("Use.Dont",!0),e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d}),`
`,e.jsx(j,{id:"formFieldInputCheckbox"}),`
`,e.jsx(t.h1,{id:"checkbox",children:"Checkbox"}),`
`,e.jsx(t.p,{children:"Checkbox should be used for item/option selection and only when more than one item can be selected at the same time."}),`
`,e.jsx(t.p,{children:"If there is only two options (on/off), consider using a SwitchToggle. If the user should select only one option among many, use Radio inputs instead."}),`
`,e.jsx(t.h2,{id:"states",children:"States"}),`
`,e.jsxs(t.p,{children:["Note on ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes",rel:"nofollow",children:"indeterminate"})," state. It is a controlled only state."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"This is a state in which it's impossible to say whether the item is toggled on or off. This is set using the HTMLInputElement object's indeterminate property via JavaScript (it cannot be set using an HTML attribute)"}),`
`]}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(t.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h3,{id:"read-only",children:"Read only"}),`
`,e.jsx(s,{of:b}),`
`,e.jsx(t.h3,{id:"multiple-checkboxes",children:"Multiple checkboxes"}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h3,{id:"controlled-checkbox",children:"Controlled checkbox"}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(t.h2,{id:"content",children:"Content"}),`
`,e.jsx(t.p,{children:"Checkboxes appear as a list in UIs, it's therefore important to make their labels as parallel as possible without twisting the language too much."}),`
`,e.jsx(t.p,{children:"Aim for parallelism but not at the expense of comprehension."}),`
`,e.jsxs(o,{children:[e.jsx(o.Do,{children:e.jsxs("ul",{children:[e.jsx("li",{children:"Use positive and active wording for checkbox labels."}),e.jsx("li",{children:e.jsx(t.p,{children:`Aim for parallel checkbox labels to ease reading flow and help users make the right choices.
For example, use "Search profile, Delete profile, Create profile, Edit profile" and don't
use "Search in profile, Delete profiles, Create a new profile, Edit existing profile".`})}),e.jsx("li",{children:"Start each label with capital letter."})]})}),e.jsx(o.Dont,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(t.p,{children:"Don’t use vague or misleading labels that are difficult to understand by average users."})}),e.jsx("li",{children:"Don’t use punctuations at the end of labels."})]})})]}),`
`,e.jsx(t.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The label must always be clickable to check or uncheck."}),`
`]}),`
`,e.jsx(t.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(s,{of:l}),`
`,e.jsx(h,{of:l}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Press ",e.jsx("kbd",{children:"Tab"})," to focus on a checkbox."]}),`
`,e.jsxs(t.p,{children:["Press ",e.jsx("kbd",{children:"Tab"})," or ",e.jsx("kbd",{children:"Shift"})," + ",e.jsx("kbd",{children:"Tab"})," to navigate between checkboxes."]}),`
`,e.jsxs(t.p,{children:["Press ",e.jsx("kbd",{children:"Space"})," to toggle the checkbox between selected and not selected."]})]})}function H(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}function i(n,t){throw new Error("Expected "+(t?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{H as default};
