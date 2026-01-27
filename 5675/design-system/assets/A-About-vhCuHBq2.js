import{j as e}from"./index-DqyI3zNy.js";import{u as o}from"./index-DUm8XAT2.js";import{M as a,U as d}from"./blocks-BA4ii67_.js";import{a as r}from"./iframe-BqCCNGDC.js";import{B as c,S as i,a as h,I as l,E as g}from"./Dialog-CSUeb_TG.js";import"./index-3dZT5jlp.js";import"./useCopyToClipboard-DqYYtEeu.js";import"./TalendDesignTokens-JgHEBmOa.js";import"./index-fQXUwmIU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DrFu-skq.js";function m(s,n){return e.jsx(c,{...s,variant:"floating",ref:n})}const p=r.forwardRef(m),u=""+new URL("definition-BYYN1syG.png",import.meta.url).href,x="_card_abzxf_1",j={card:x};function f(){const[s,n]=r.useState(!1);return e.jsx(i,{gap:"M",align:"center",justify:"center",children:e.jsx("div",{"data-theme":s?"dark":"light",children:e.jsx("div",{className:j.card,children:e.jsxs(h,{gap:"M",justify:"stretch",align:"stretch",children:[e.jsxs(i,{gap:"M",justify:"spaceBetween",align:"center",children:[e.jsx(l,{withBackground:!0,title:"Theme switching",description:"Click on the icon button to see theme switching in action"}),e.jsx(p,{icon:"refresh",onClick:()=>n(!s),children:"Switch themes"})]}),e.jsx("p",{children:"With tokens, designing and implementing once works for every possible theme. Components built with tokens are resilient."}),e.jsx(g,{title:"Illustrations as well",description:"It's easier for everybody",action:{actionType:"button",children:"It really is",onClick:()=>{}}})]})})})})}function t(s){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Design Tokens/About"}),`
`,e.jsx(n.h1,{id:"design-tokens",children:"Design tokens"}),`
`,e.jsxs(n.p,{children:[`Design tokens are the single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages.
They are exported from Figma using `,e.jsx(n.a,{href:"https://www.supernova.io/",rel:"nofollow",children:"Supernova"}),"."]}),`
`,e.jsx(n.h2,{id:"what-are-design-tokens",children:"What are design tokens?"}),`
`,e.jsx("img",{src:u,alt:"This graph shows that for one token name, depending on a theme, the value can be different",width:"464px"}),`
`,e.jsxs(n.p,{children:[`Design tokens are the foundations of a strong Design System — they are «the visual atoms
of the Design System». Tokens are a set of `,e.jsx("strong",{children:"visual properties"}),` such as
colors, sizes, shadows, animations...`]}),`
`,e.jsxs(n.p,{children:["Ours are using a ",e.jsx("strong",{children:"semantic"}),` nomenclature instead of a simple description.
That way, they create a common language not depending on the component type or the
platform where it lives. It ensures developers and designers speak the same language.
Tokens make it easier to build our product by improving communication and design-to-code
handoff, enforcing a logical approach behind every design decisions they can target.`]}),`
`,e.jsx(n.h2,{id:"theming-with-design-tokens",children:"Theming with design tokens"}),`
`,e.jsx(n.p,{children:"With Design Tokens, themes are much easier to handle. Each token is purely semantic, its value is dependent on a theme file - a stylesheet assigning a value to that semantic name."}),`
`,e.jsxs(n.p,{children:[`When you implement a component using tokens, you are guaranteed that this component will
support any theme. To get different themes to take effect, simply load the correct
stylesheet and update the `,e.jsx("code",{children:"data-theme"})," attribute and you’re done."]}),`
`,e.jsx(n.p,{children:`With tokens, designing and implementing once works for every possible theme.
Components built with tokens are resilient.`}),`
`,e.jsx(d,{children:e.jsx(f,{})}),`
`,e.jsx(n.h2,{id:"coral-design-tokens",children:"Coral design tokens"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-borders--docs",children:"Borders"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-branding--docs",children:"Branding"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-breakpoints--docs",children:"Breakpoints"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-colors--docs",children:"Colors"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-color-composition--docs",children:"Color Compositions"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-elevations--docs",children:"Elevations"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-gradients--docs",children:"Gradients"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-opacity--docs",children:"Opacity"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-radius--docs",children:"Radius"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-shadows--docs",children:"Shadows"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-measures--docs",children:"Measures"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-typography--docs",children:"Typography"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/docs/design-tokens-transitions--docs",children:"Transitions"})}),`
`]})]})}function I(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{I as default};
