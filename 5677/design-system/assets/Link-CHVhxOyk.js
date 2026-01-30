import{j as e}from"./index-B-4QAGRT.js";import{u as c}from"./index-DL9MQ0Zp.js";import{M as h,C as i,a as r}from"./blocks-AzSKip7y.js";import{U as s,F as x}from"./Use-Cl_PCiZO.js";import"./index-BBitzEYX.js";import{Default as p,WithIcon as u,MultiLines as j,Disabled as m,External as f,TargetBlank as k,RouterLinkStory as b,Usage as a}from"./Link.stories-C3UlLgeJ.js";import{LinkAsButtonStory as l}from"./LinkAsButton.stories-CrGzo6l1.js";import"./DialogBackdrop-9Sis8N-G.js";import{q as g}from"./Skeleton-QTANCvJ0.js";import"./iframe-Bzc6Acpn.js";import"./useCopyToClipboard-5SsFVDgy.js";import"./TalendDesignTokens-JgHEBmOa.js";import{S as w}from"./Status.block-B3N7J5uY.js";import"./index-C7esbbQj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./index-zQlFbBTw.js";import"./Statuses-CPLRtz2B.js";function d(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...c(),...t.components};return s||o("Use",!1),s.Do||o("Use.Do",!0),s.Dont||o("Use.Dont",!0),e.jsxs(e.Fragment,{children:[e.jsx(h,{title:"Clickable/Link",component:g}),`
`,e.jsx(w,{id:"link"}),`
`,e.jsx(n.h1,{id:"link",children:"Link"}),`
`,e.jsx(n.p,{children:"Link is used for navigation."}),`
`,e.jsxs(n.p,{children:["If you use a link for triggering an action on the page, you must consider using a ",e.jsx(n.a,{href:"/docs/clickable-button--docs",children:"Button"})," instead."]}),`
`,e.jsxs(n.p,{children:["Still need to be convinced? Please, take the time to read ",e.jsx(n.a,{href:"https://marcysutton.com/links-vs-buttons-in-modern-web-applications",rel:"nofollow",children:"this article written by Marcy Sutton"}),"."]}),`
`,e.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(x,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=12%3A142",alt:"zoning image for links"}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"default",children:"Default"}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(n.h3,{id:"with-icon",children:"With icon"}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(n.h3,{id:"multi-lines",children:"Multi lines"}),`
`,e.jsx(i,{of:j}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsx(n.p,{children:"When the link is disabled the whole component is displayed with $opacity.disabled."}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(n.h3,{id:"external",children:"External"}),`
`,e.jsx(n.p,{children:"When the link targets a new domain, we add an external-link icon right after."}),`
`,e.jsx(i,{of:f}),`
`,e.jsxs(n.p,{children:["Even if it's the same domain, when the link opens in a new window or tab, the title ",e.jsx(n.code,{children:"open in a new tab"})," is added or appended to an existing title."]}),`
`,e.jsx(i,{of:k}),`
`,e.jsxs(n.p,{children:["The attribute ",e.jsx(n.code,{children:'rel="noopener noreferrer"'})," is added if its target is ",e.jsx(n.code,{children:"_blank"}),"."]}),`
`,e.jsx(n.h3,{id:"router-links",children:"Router links"}),`
`,e.jsxs(n.p,{children:["In React SPAs, most links are handled by libraries such as React Router. ",e.jsx(n.code,{children:"Link"})," takes that into account."]}),`
`,e.jsx(i,{of:b}),`
`,e.jsx(n.h3,{id:"as-a-button",children:"As a button"}),`
`,e.jsxs(n.p,{children:[`In extreme cases we do not condone, you may need the style of a link but the behavior of a button.
If your action open a new tab, you can use the `,e.jsx(n.code,{children:"openInNewTab"})," props to trigger the display of the ",e.jsx(n.code,{children:"external-link"})," icon, and add ",e.jsx(n.code,{children:"open in a new tab"})," in the link title."]}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(r,{of:l}),`
`,e.jsx(n.h2,{id:"content",children:"Content"}),`
`,e.jsx(n.p,{children:"Link labels should be specific and clear enough to increase the likelihood that users will quickly understand the link as they scan and process the page. There's no maximum word count for links, but the best practice is to be as succinct as possible."}),`
`,e.jsxs(s,{children:[e.jsx(s.Do,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n.p,{children:`Use a meaningful link text which communicates to users what they'll exactly find on the
other side of the click.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Make link text stand alone—it should make sense without any of the surrounding text as users
tend to scan UI.`})}),e.jsx("li",{children:e.jsx(n.p,{children:`Frontload link text with keywords and use the rest of the label text to increase user
understanding.`})})]})}),e.jsx(s.Dont,{children:e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx(n.p,{children:`Avoid vague or repetative text for links. For example, don't use the text "Click here" or
"See this document" for links.`})}),e.jsx("li",{children:"Don't use a URL as link text."})]})})]}),`
`,e.jsx(n.h2,{id:"interaction",children:"Interaction"}),`
`,e.jsx(n.p,{children:"Text underline appears while hovering the link and disappears as soon as the mouse is out of its clickable area with a smooth animation."}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"TABS"})," to focus on a link"]}),`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"ENTER"})," to open a link"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(r,{of:a})]})}function z(t={}){const{wrapper:n}={...c(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function o(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{z as default};
