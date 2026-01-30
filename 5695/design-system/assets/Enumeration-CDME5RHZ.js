import{j as e}from"./index-BeRoqjfO.js";import{u as i}from"./index-zLaHi0yW.js";import{M as s,C as o}from"./blocks-rBK3BsRX.js";import{S as a,D as d,E as l}from"./Enumeration.stories-AsKGfokl.js";import{S as h}from"./Status.block-CJNyHLmY.js";import"./iframe-0koiw-N4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CX4Xx5Ev.js";import"./index-DrFu-skq.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./Skeleton-XhJlLQkP.js";import"./index-osoKd-JR.js";import"./Use-DAeIQU6X.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-dORB0uPY.js";function r(n){const t={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a}),`
`,e.jsx(h,{id:"formEnumeration"}),`
`,e.jsx(t.h1,{id:"enumeration",children:"Enumeration"}),`
`,e.jsx(t.p,{children:"Lazy loading list that allows to create, edit and remove items from it."}),`
`,e.jsx(t.h2,{id:"variations",children:"Variations"}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(o,{of:l}),`
`,e.jsx(t.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(t.p,{children:["The component is split into two parts, the ",e.jsx(t.em,{children:"header"})," and the ",e.jsx(t.em,{children:"body"}),"."]}),`
`,e.jsx(t.h3,{id:"header",children:"Header"}),`
`,e.jsxs(t.p,{children:["The header has a ",e.jsx(t.code,{children:"title"})," and the 3 different actions:"]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["Create: ",e.jsx(t.code,{children:"onCreate"})," - optional parameter."]}),`
`,e.jsxs(t.li,{children:['Edit: Triggers edit mode on the body part of the component, which allows for items to be selected. When items are selected, a "Remove" button appears, which triggers the ',e.jsx(t.code,{children:"onRemove"})," callback when clicked."]}),`
`,e.jsxs(t.li,{children:["Import: ",e.jsx(t.code,{children:"onImport"})," - optional parameter. If not passed, the action will not appear."]}),`
`]}),`
`,e.jsxs(t.p,{children:["All actions (create, edit and remove) call the ",e.jsx(t.code,{children:"onChange"})," callback."]}),`
`,e.jsx(t.p,{children:"The search feature only filters the items already rendered. Since its a lazy loading list, if the items are not rendered they will not be included on the search."}),`
`,e.jsx(t.h3,{id:"body",children:"Body"}),`
`,e.jsxs(t.p,{children:["The part of the component where the lazy loading list is present from the ",e.jsx(t.code,{children:"items"})," parameter. To load more items, the ",e.jsx(t.code,{children:"loadMoreRows"})," callback must be passed to the component, with ",e.jsx(t.em,{children:"startIndex"})," and ",e.jsx(t.em,{children:"stopIndex"})," parameters."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`<Enumeration
	...
	loadMoreRows={({ startIndex, stopIndex }) => {
		...
	}}
/>
`})}),`
`,e.jsx(t.p,{children:"Each item can be editted or removed individually."})]})}function T(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{T as default};
