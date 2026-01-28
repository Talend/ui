import{j as e}from"./index-BjJ1gK4Q.js";import{u as l}from"./index-7VTgGnxW.js";import{M as h,C as s,a as c}from"./blocks-GUWGtVHi.js";import{U as t,F as d}from"./Use-DQB9gvIp.js";import"./index-CKY2Phf9.js";import{S as p,D as x,B as u,V as r,W as m}from"./InlineMessage.stories-C8U_s-BP.js";import"./DialogBackdrop-DrwYyHz3.js";import"./Skeleton-BJ-qTseU.js";import"./iframe-BWotmeKP.js";import"./useCopyToClipboard-Bz_CjoHD.js";import"./TalendDesignTokens-JgHEBmOa.js";import{S as j}from"./Status.block-BF0DqVL-.js";import"./index-V1_MM1Tg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./index-_8PjVJwf.js";import"./Statuses-Ytrdq_P-.js";function a(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",strong:"strong",...l(),...i.components};return t||o("Use",!1),t.Do||o("Use.Do",!0),t.Dont||o("Use.Dont",!0),e.jsxs(e.Fragment,{children:[e.jsx(h,{of:p}),`
`,e.jsx(j,{id:"inlineMessage"}),`
`,e.jsx(n.h1,{id:"inline-message",children:"Inline Message"}),`
`,e.jsx(n.p,{children:"Inline Message semantically highlights necessary information to the user in different contexts."}),`
`,e.jsx(n.p,{children:"It can be additional information related to system status, it can be a required action to complete the current task."}),`
`,e.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(d,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=12%3A96",alt:"zoning image for inline messages"}),`
`,e.jsx(n.h2,{id:"style",children:"Style"}),`
`,e.jsx(n.h3,{id:"text",children:"Text"}),`
`,e.jsx(n.p,{children:"The text should adapt to the surrounding layout. Depending on the context, if the text is too long it should automatically wrap to the next line."}),`
`,e.jsx(n.h3,{id:"variations",children:"Variations"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Default"})}),`
`,e.jsx(s,{of:x}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"With background"})}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(n.p,{children:"Inline messages are non-clickable, except if there is a link. In that case, only the link will be clickable."}),`
`,e.jsxs(n.p,{children:["Please refer to the ",e.jsx(n.a,{href:"/docs/clickable-link--docs",children:"Link guidelines"})," for more information."]}),`
`,e.jsx(n.h2,{id:"content",children:"Content"}),`
`,e.jsx(n.p,{children:"Inline messages interrupt the user to deliver a communication. They can be notifications, alerts, confirmation, inline validation, or error messages."}),`
`,e.jsx(n.p,{children:"Error messages should tell why there was a problem and what could be done to resolve it where possible. There are several types of error messages including:"}),`
`,e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n.p,{children:`Errors which tell users something serious or less serious has gone wrong. We require the users'
comprehension and maybe their action.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Field-validation errors which display when users enter info in a form field, but it isn’t
formatted correctly.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`System errors which display when the entire application is having trouble, like when something
is down or users' data is missing through no fault of their own.`})})]}),`
`,e.jsxs(t,{children:[e.jsx(t.Do,{children:e.jsxs("ul",{children:[e.jsx("li",{children:"Be clear and conversational."}),e.jsx("li",{children:e.jsx(n.p,{children:`Get right to the point. Be brief but also super literal. Say what exactly happened and what
the user needs to do to fix the error.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Use the correct combination of call-to-action buttons. For example, if you say "Replace the
source file with X?" the options should be Replace / Cancel and not Yes / No / Retry.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Provide appropriate actions where applicable. Actions in error messages guide users about
the next step.`})}),e.jsx("li",{children:"Use appropriate language for your audience and keep technical jargon to minimum."})]})}),e.jsx(t.Dont,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n.p,{children:`Don’t include extra details about why the error happened—give only the info that users need
to know.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Avoid negative words. For example, say "You need to have enough rights to publish pipelines"
instead of "You don't have enough rights to publish pipelines".`})})]})})]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.h3,{id:"with-variant-prop",children:["With ",e.jsx(n.code,{children:"variant"})," prop"]}),`
`,e.jsx(n.p,{children:"If you need a message to change from one semantic type to another, a prop may be better than a standalone component."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<InlineMessage />"})," is here just for that purpose."]}),`
`,e.jsx(s,{of:r}),`
`,e.jsxs(n.p,{children:["It behaves like the standalone components but with a ",e.jsx(n.code,{children:"variant"})," prop."]}),`
`,e.jsx(c,{of:r}),`
`,e.jsx(n.h3,{id:"with-a-router-link",children:"With a Router link"}),`
`,e.jsx(n.p,{children:"If the link you need is not external, chances are you're using a routing library."}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["Each Inline Message has a role ",e.jsx(n.code,{children:"status"})," and an aria-live attribute ",e.jsx(n.code,{children:"polite"})," by default."]})]})}function B(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function o(i,n){throw new Error("Expected "+(n?"component":"object")+" `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{B as default};
