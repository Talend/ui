import{j as e}from"./index-BfyV6fgH.js";import{u as l}from"./index-pZzKWhjH.js";import{M as c,C as i}from"./blocks-CUIhDQeA.js";import{U as o,F as s}from"./Use-DQzVczH6.js";import"./index-BzQ6li6Y.js";import"./DialogBackdrop-Cck8yRo6.js";import{D as h}from"./Skeleton-DfZ5cPl-.js";import"./iframe-DB7vHRjW.js";import"./useCopyToClipboard-4_wheD1f.js";import"./TalendDesignTokens-JgHEBmOa.js";import{Basic as a,WithIcons as p,WithDividers as x,WithTitle as j,WithManyItems as m,WithLongText as u,WithRouterLinks as w}from"./Dropdown.stories-Cc8ra_71.js";import{S as f}from"./Status.block-1WdZhaEa.js";import"./index-Cbet5SZL.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./index-B6ECKiqq.js";import"./Statuses-3XcKyxHO.js";function r(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...t.components};return o||d("Use",!1),o.Do||d("Use.Do",!0),e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Clickable/Dropdown",component:h}),`
`,e.jsx(f,{id:"dropdown"}),`
`,e.jsx(n.h1,{id:"dropdown",children:"Dropdown"}),`
`,e.jsx(n.p,{children:"A dropdown menu displays a list of available actions."}),`
`,e.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/IUeLBwjDCMkpdO7OtZ29u1/Dropdown?node-id=806%3A2186",alt:"zoning image for dropdown"}),`
`,e.jsx(n.h2,{id:"style",children:"Style"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/IUeLBwjDCMkpdO7OtZ29u1/Dropdown?node-id=806%3A2112",alt:"Basic dropdown styles"}),`
`,e.jsx(i,{sourceState:"hidden",height:"35rem",of:a}),`
`,e.jsx(n.h3,{id:"variations",children:"Variations"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"With icons"})}),`
`,e.jsx(i,{height:"25rem",of:p}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"With dividers"})}),`
`,e.jsx(i,{height:"25rem",of:x}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"With titles"})}),`
`,e.jsx(n.p,{children:"Use titles in combination with dividers to group menu contents together under headings that make sense."}),`
`,e.jsx(i,{height:"25rem",of:j}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Max height"})}),`
`,e.jsx(n.p,{children:`The max-height of a dropdown is 32rem (320px). A scroll-bar has to be added after exceeding 32rem longer items.
This rule is not applicable for the header-bar dropdowns.`}),`
`,e.jsx(i,{sourceState:"hidden",height:"36rem",of:m}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(s,{src:"https://www.figma.com/file/IUeLBwjDCMkpdO7OtZ29u1/Dropdown?node-id=808%3A2230",alt:"dropdown behaviors"}),`
`,e.jsx(n.h2,{id:"content",children:"Content"}),`
`,e.jsx(o,{children:e.jsx(o.Do,{children:e.jsx("ul",{children:e.jsx("li",{children:e.jsx(n.p,{children:`Keep menu items to a single line of text as much as possible. If not, when the label is too
long for the available horizontal space, it wraps to form another line.`})})})})}),`
`,e.jsx(i,{sourceState:"hidden",height:"25rem",of:u}),`
`,e.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(n.p,{children:"N/A"}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"Tabs"})," to focus on the dropdown"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"Up Arrow"})," or ",e.jsx("kbd",{children:"Down Arrow"})," to navigate in the dropdown menu"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"Space"})," or ",e.jsx("kbd",{children:"Enter"})," to activate the dropdown menu item"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Press ",e.jsx("kbd",{children:"Escape"})," to close the dropdown menu"]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"aria-label"})," to describe the menu's contents / objective"]}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.h3,{id:"anatomy",children:"Anatomy"}),`
`,e.jsx(n.p,{children:"Dropdowns have two parts: a disclosure and a popover."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Disclosure"})}),`
`,e.jsxs(n.p,{children:["The disclosure can be any ",e.jsx(n.code,{children:"Clickable"})," element. ",e.jsx(n.a,{href:"/docs/clickable-about--docs",children:"You can find them here."})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"isDropdown"})," props of ",e.jsx(n.code,{children:"Button"})," is mandatory."]}),`
`,e.jsxs(n.p,{children:["The disclosure is passed as a child to ",e.jsx(n.code,{children:"<Dropdown>"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Dropdown items={[...]}>
    <ButtonPrimary onClick={() => {}} isDropdown>My menu</ButtonPrimary>
</Dropdown>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"The popover"})}),`
`,e.jsxs(n.p,{children:["The popover contents are strongly typed. To list them, you need to fill the ",e.jsx(n.code,{children:"items"})," props on ",e.jsx(n.code,{children:"Dropdown"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Dropdown
	items={[
		{
			type: 'link',
			href: '/relativeLink',
			label: 'Relative link example',
            icon: 'talend-plus', // Optional
		},
		{
			type: 'link',
			as: <RouterLink to="/route" />,
			label: 'Router link example',
            icon: 'talend-plus', // Optional
		},
        {
			type: 'button',
			onClick: () => logout(),
			label: 'Button example',
            icon: 'talend-plus', // Optional
		},
        {
			type: 'title',
			label: 'Title example',
		},
        {
			type: 'divider',
		},
	]}
    ...
`})}),`
`,e.jsx(n.h3,{id:"router-links",children:"Router links"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"items"})," prop of ",e.jsx(n.code,{children:"Dropdown"})," accepts 4 types: links, buttons, titles and dividers."]}),`
`,e.jsxs(n.p,{children:["When it comes to links, you can override the default ",e.jsx(n.code,{children:"<a>"})," element and use a React-Router ",e.jsx(n.code,{children:"Link"})," instead:"]}),`
`,e.jsx(i,{height:"25rem",of:w})]})}function E(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}function d(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{E as default};
