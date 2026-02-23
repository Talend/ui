import{j as e}from"./index-BeRoqjfO.js";import{u as c}from"./index-zLaHi0yW.js";import{M as p,C as r,a as h}from"./blocks-rBK3BsRX.js";import{U as n,F as o}from"./Use-DAeIQU6X.js";import"./index-osoKd-JR.js";import{V as d}from"./DialogBackdrop-BDgqVk1C.js";import"./Skeleton-XhJlLQkP.js";import"./iframe-0koiw-N4.js";import"./useCopyToClipboard-BFdKw2yF.js";import"./TalendDesignTokens-JgHEBmOa.js";import{S as u}from"./Status.block-CJNyHLmY.js";import{S as x,V as f,H as m,O as j,U as a}from"./Stepper.stories-CCIE23vK.js";import"./index-CX4Xx5Ev.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-dORB0uPY.js";function l(t){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",...c(),...t.components};return n||i("Use",!1),n.Do||i("Use.Do",!0),n.Dont||i("Use.Dont",!0),e.jsxs(e.Fragment,{children:[e.jsx(p,{of:x,component:d}),`
`,e.jsx(u,{id:"stepper"}),`
`,e.jsx(s.h1,{id:"stepper",children:"Stepper"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"Stepper"})," is used to display the different steps needed to complete an action."]}),`
`,e.jsx(s.p,{children:"It helps users avoid frustration and successfully complete a primary task."}),`
`,e.jsx(s.p,{children:"The stepper displays progress through a sequence split into multiple logical and numbered steps."}),`
`,e.jsx(s.h2,{id:"zoning",children:"Zoning"}),`
`,e.jsx(o,{src:"https://www.figma.com/file/qc8oUSyVJM67gSsbTShftt/%F0%9F%93%90-Zoning?node-id=952%3A230",alt:"zoning image for the stepper"}),`
`,e.jsx(s.h2,{id:"style",children:"Style"}),`
`,e.jsx(s.h3,{id:"variations",children:"Variations"}),`
`,e.jsxs(s.p,{children:["A Stepper is ",e.jsx(s.strong,{children:"vertical by default"})," but can be horizontal."]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Vertical"})}),`
`,e.jsx(s.p,{children:"Consider using a vertical stepper when there are workflows greater than 3 steps."}),`
`,e.jsx(o,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1809%3A47231",alt:"Mockup of a vertical stepper"}),`
`,e.jsx(r,{of:f}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Horizontal"})}),`
`,e.jsx(s.p,{children:"Consider using a horizontal stepper when full page components are used (such as Data grid or List)"}),`
`,e.jsx(s.p,{children:"A horizontal stepper should not have more than 3 steps."}),`
`,e.jsx(o,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1809%3A47229",alt:"Mockup of a horizontal stepper"}),`
`,e.jsx(r,{of:m}),`
`,e.jsx(s.h2,{id:"states",children:"States"}),`
`,e.jsx(s.h3,{id:"overflowing-steps",children:"Overflowing steps"}),`
`,e.jsx(s.p,{children:"The space dedicated to step is limited. No reflow strategy has been put in place, so text overflow is truncated with an ellipsis."}),`
`,e.jsx(r,{of:j}),`
`,e.jsx(s.h2,{id:"content",children:"Content"}),`
`,e.jsx(s.p,{children:"Use nouns to create one-word labels for steps. Go for 2-word step labels when necessary."}),`
`,e.jsx(s.p,{children:"Step labels should describe the purpose of each step and let users know where they are in their setup."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"In vertical steppers"}),`, each step describes a section to the right of the stepper. Start the section title with a verb and tell users what to do and why. For example, a step label "Engine" could have a section title "Add the engine on which to process data".
Step sections can also have subtitles, if necessary, to provide users with extra important information—as in complicated steps for example.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"In horizontal steppers"}),", no sections are used. Once a step is selected, user input shows below. Avoid using long nouns in horizontal steppers"]}),`
`,e.jsxs(n,{children:[e.jsx(n.Do,{children:e.jsxs("ul",{children:[e.jsx("li",{children:"Keep labels concise: one-word labels as a rule, two words when necessary"}),e.jsx("li",{children:"Match step labels to the title of the page they link to"})]})}),e.jsx(n.Dont,{children:e.jsxs("ul",{children:[e.jsx("li",{children:"Use complex long nouns"}),e.jsx("li",{children:"Mix action and noun phrases in steps labels"})]})})]}),`
`,e.jsx(s.h3,{id:"buttons-in-forms-that-use-a-stepper",children:"Buttons in forms that use a Stepper"}),`
`,e.jsx(s.p,{children:"In case of multi-step form, we should always provide at least 2 buttons:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsx(s.li,{children:"Cancel or Back button"}),`
`,e.jsx(s.li,{children:"Continue or Next button"}),`
`]}),`
`,e.jsxs(s.p,{children:["Use a ",e.jsx(s.strong,{children:"cancel button"})," for the first step as the user can't step back. Use a ",e.jsx(s.strong,{children:"back button"})," from the second step to allow the user to step back."]}),`
`,e.jsx(o,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=115%3A0",alt:"buttons mutli step form example"}),`
`,e.jsx(s.p,{children:"The back button can also be used in addition of the cancel button. In that case, the cancel button is still the first available:"}),`
`,e.jsx(o,{src:"https://www.figma.com/file/WUVKJmcDHfR7K1q1lYhaHk/Stepper?node-id=1808%3A47056",alt:"cancel and back buttons for multi step form"}),`
`,e.jsx(s.h2,{id:"interactions",children:"Interactions"}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Error in the form"})}),`
`,e.jsx(s.p,{children:"In case of an error in the current step, please inform the user by using an inline message on that screen."}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(r,{of:a}),`
`,e.jsx(h,{of:a,exclude:["loading"]}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.p,{children:["Stepper should follow related ",e.jsx(s.a,{href:"https://www.w3.org/WAI/tutorials/forms/multi-page/",rel:"nofollow",children:"WAI guidelines"}),"."]})]})}function F(t={}){const{wrapper:s}={...c(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(l,{...t})}):l(t)}function i(t,s){throw new Error("Expected "+(s?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{F as default};
