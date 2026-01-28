import{j as e}from"./index-BfyV6fgH.js";import{u as s}from"./index-pZzKWhjH.js";import{M as r}from"./blocks-CUIhDQeA.js";import"./iframe-DB7vHRjW.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cbet5SZL.js";import"./index-DrFu-skq.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Content/Internationalization"}),`
`,e.jsx(n.h1,{id:"internationalization",children:"Internationalization"}),`
`,e.jsx(n.h2,{id:"naming-conventions-for-string-ids",children:"Naming conventions for string IDs"}),`
`,e.jsx(n.p,{children:`Currently, not all string IDs visible in XTM give hints to what is the string.
We need to have an identifier in the ID which says what is the string.
This will help giving some context during the validation process in XTM.`}),`
`,e.jsx(n.p,{children:"Please follow any of the below templates when adding IDs to your strings:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Standalone strings: ",e.jsx(n.code,{children:"<feature*or_element>*<qualifier>_<anything_you_want>"})," examples: notification*title_success, preparation_import_tooltip, job_submit_engine_error"]}),`
`,e.jsxs(n.li,{children:["Fragmented strings: ",e.jsx(n.code,{children:"<feature_or_element>*<qualifier>_frag_<anything_you_want>"})," ex: Where",e.jsx(n.code,{children:"<qualifier>"})," gives a hint to what or where is the string in the UI and frag indicates that th string is part of larger string."]}),`
`]}),`
`,e.jsx(n.h2,{id:"updating-default-values-on-dev-repositories",children:"Updating default values on dev repositories"}),`
`,e.jsxs(n.p,{children:["Currently, if engineers or developers do any updates to defaultValues on their branches, they can test and validate their updates only after the strings go through the localization process because we publish the ",e.jsx(n.code,{children:"*_en"})," files from the ",e.jsx(n.code,{children:"i18n-product"}),` repo.
In case you'll need an urgent testing for your updates on your repo, you can use new keys for the strings you want to modify:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Update the text of the existing string according to your needs."}),`
`,e.jsxs(n.li,{children:["Modify the ID of the string by adding a numeric suffix preceded by an underscore to its end: ",e.jsx(n.code,{children:"<initial ID>_1"}),"."]}),`
`,e.jsx(n.li,{children:`This helps the system processing the string as if it were new while we keep trace of the changes made.
This helps you testing and validating your changes shortly.`}),`
`,e.jsx(n.li,{children:"Delete the string with the legacy ID."}),`
`,e.jsx(n.li,{children:"If there are multiple occurrences of the same string, update all of them and their IDs similarly and delete the legacy strings."}),`
`,e.jsxs(n.li,{children:["Use sequential numeric suffixes to update the same string more than once: ",e.jsx(n.code,{children:"<initial ID>_2"}),", ",e.jsx(n.code,{children:"<initial ID>_3"}),", etc."]}),`
`,e.jsx(n.li,{children:"If you think the change you're doing is important or big, create a Jira ticket to the loc team in the I18N project."}),`
`,e.jsxs(n.li,{children:["Perform the final QA on the ",e.jsx(n.code,{children:"*_en"})," files as usual at the end of the loc process."]}),`
`]})]})}function g(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{g as default};
