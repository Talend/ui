import{j as t}from"./index-BjJ1gK4Q.js";import{u as d}from"./index-7VTgGnxW.js";import{M as h,C as i,a as o}from"./blocks-GUWGtVHi.js";import{F as m}from"./Use-DQB9gvIp.js";import"./index-CKY2Phf9.js";import{S as p,T as s,a,b as r,c as x,d as c}from"./Stack.stories-CrDDAZFD.js";import{S as u}from"./Status.block-BF0DqVL-.js";import"./iframe-BWotmeKP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-V1_MM1Tg.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./TalendDesignTokens-JgHEBmOa.js";import"./DialogBackdrop-DrwYyHz3.js";import"./Skeleton-BJ-qTseU.js";import"./useCopyToClipboard-Bz_CjoHD.js";import"./Statuses-Ytrdq_P-.js";function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...d(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(h,{of:p,title:"Layout/Stack"}),`
`,t.jsx(u,{id:"stack"}),`
`,t.jsx(n.h1,{id:"stack-aka-autolayout",children:'Stack (aka "Autolayout")'}),`
`,t.jsxs(n.p,{children:[t.jsx(n.code,{children:"StackVertical"})," and ",t.jsx(n.code,{children:"StackHorizontal"})," are opinionated layout components. They serve has wrappers for most layout needs that would otherwise require manual CSS."]}),`
`,t.jsx(n.p,{children:"On Figma, this pattern is found in the Autolayout tool."}),`
`,t.jsxs(n.p,{children:["However, where Figma lets you pick random margin and padding values, ",t.jsx(n.code,{children:"Stacks"})," limit those options to design tokens."]}),`
`,t.jsxs(n.p,{children:["It is built around a ",t.jsx(n.code,{children:"StrackPrimitive"})," private component for composition."]}),`
`,t.jsx(n.h2,{id:"zoning",children:"Zoning"}),`
`,t.jsx(m,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=1044%3A237"}),`
`,t.jsx(n.h2,{id:"style",children:"Style"}),`
`,t.jsx(n.p,{children:"NA"}),`
`,t.jsx(n.h2,{id:"states",children:"States"}),`
`,t.jsx(n.p,{children:"NA"}),`
`,t.jsx(n.h2,{id:"interactions",children:"Interactions"}),`
`,t.jsx(n.p,{children:"NA"}),`
`,t.jsx(n.h2,{id:"content",children:"Content"}),`
`,t.jsxs(n.p,{children:[t.jsx(n.code,{children:"StackVertical"})," and ",t.jsx(n.code,{children:"StackHorizontal"})," accept any children as long as they are valid React children types."]}),`
`,t.jsxs(n.p,{children:["If you need to override the positional behavior of a child element, use the ",t.jsx(n.code,{children:"StackItem"})," component:"]}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-tsx",children:`<StackVertical gap="XS" as="ul">
	<li>List entry</li>
	<StackItem as="li" align="center" grow>
		List entry 2
	</StackItem>
	<li>List entry 3</li>
</StackVertical>
`})}),`
`,t.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,t.jsx(n.p,{children:"Simply import the appropriate Stack and start composing your layout."}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-tsx",children:`import { Button, StackHorizontal } from '../../';

function myComponent() {
	return (
		<StackHorizontal padding="S" gap="S" align="start" justify="start">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<Button.Primary onClick={clickHandler}>Click here</Button.Primary>
		</StackHorizontal>
	);
}
`})}),`
`,t.jsx(n.h3,{id:"simple-stackhorizontal",children:"Simple StackHorizontal"}),`
`,t.jsx(i,{of:s}),`
`,t.jsx(o,{of:s}),`
`,t.jsx(n.h3,{id:"simple-stackhorizontal-with-complex-spacing",children:"Simple StackHorizontal with complex spacing"}),`
`,t.jsxs(n.p,{children:["Spacing can also be set as an object ",t.jsx(n.code,{children:"{ x: SizeToken, y: SizeToken }"})," or ",t.jsx(n.code,{children:"{top: SizeToken, left: SizeToken, right: SizeToken, bottom: SizeToken}"})," like this:"]}),`
`,t.jsx(i,{of:a}),`
`,t.jsx(o,{of:a}),`
`,t.jsx(n.p,{children:"You do need to set all the values for each of these objects when using them."}),`
`,t.jsx(n.h3,{id:"simple-stackvertical",children:"Simple StackVertical"}),`
`,t.jsx(i,{of:r}),`
`,t.jsx(o,{of:r}),`
`,t.jsx(n.h3,{id:"nesting-stacks-to-compose-a-layout",children:"Nesting Stacks to compose a layout"}),`
`,t.jsx(i,{of:x}),`
`,t.jsx(n.h3,{id:"using-stackitem",children:"Using StackItem"}),`
`,t.jsx(i,{of:c}),`
`,t.jsx(o,{of:c}),`
`,t.jsx(n.h2,{id:"accessibility",children:"Accessibility"})]})}function V(e={}){const{wrapper:n}={...d(),...e.components};return n?t.jsx(n,{...e,children:t.jsx(l,{...e})}):l(e)}export{V as default};
