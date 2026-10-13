import{j as n}from"./index--KvFR1jg.js";import{u as c,M as d,C as t,a as s}from"./blocks-BXloX8RE.js";import{S as h,V as u,D as p,a as x,b as j,L as f,B as g,c as i,T as a,F as l,N as b}from"./ButtonIcon.stories-BdTNsqzH.js";import{S as m}from"./Status.block-DOHy3PY6.js";import"./iframe-RzlH1tvj.js";import"./preload-helper-PPVm8Dsz.js";import"./index-FaKQGoXO.js";import"./DialogBackdrop-DKmgnz_i.js";import"./index-jzd0SbQr.js";import"./Skeleton-y1-gpUX_.js";import"./useCopyToClipboard-BeD991x2.js";import"./TalendDesignTokens-JgHEBmOa.js";import"./Use-B5i2zvAZ.js";import"./dictionary-CKKJDmnH.js";import"./dictionary-CeEBddAU.js";import"./Statuses-B98etxXV.js";function r(o){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",ul:"ul",...c(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(d,{of:h}),`
`,n.jsx(m,{id:"buttonIcon"}),`
`,n.jsx(e.h1,{id:"buttonicon",children:"ButtonIcon"}),`
`,n.jsx(e.p,{children:"This component should be used when icons are meant to be clicked on."}),`
`,n.jsx(e.p,{children:"It handles the two largest usecases we have for clickable icons: actions and toggles."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Always try use when an icon is meant to be clicked on."}),`
`,n.jsx(e.li,{children:"Always provide developers with copy for the tooltip."}),`
`,n.jsx(e.li,{children:"If the button holds the ON / OFF state of something, then use the Toggle variants."}),`
`,n.jsx(e.li,{children:"If the button is floating on top of something else, use the Floating variant."}),`
`,n.jsx(e.li,{children:"Only use size XS when absolutely unavoidable."}),`
`,n.jsx(e.li,{children:"Spacing between buttons should be at least 4px (XXS), 8px is best (XS)."}),`
`]}),`
`,n.jsx(e.h2,{id:"style",children:"Style"}),`
`,n.jsx(e.h3,{id:"variations",children:"Variations"}),`
`,n.jsx(t,{sourceState:"hidden",of:u}),`
`,n.jsx(e.h4,{id:"default",children:"Default"}),`
`,n.jsx(e.p,{children:"This is the go-to ButtonIcon for most generic actions."}),`
`,n.jsx(t,{of:p}),`
`,n.jsx(e.h4,{id:"toggle",children:"Toggle"}),`
`,n.jsx(e.p,{children:"If the button needs to hold an active / inactive state, then it is a Toggle."}),`
`,n.jsx(e.p,{children:"Don’t use Toggles in series, opt for badge dropdowns instead."}),`
`,n.jsx(t,{of:x}),`
`,n.jsx(e.h4,{id:"floating",children:"Floating"}),`
`,n.jsx(e.p,{children:"This variant is only used when the button floats on top of content."}),`
`,n.jsx(e.p,{children:"It could be it's sitting on top of a line connecting two nodes, or sticky on top of a draggable scene for instance."}),`
`,n.jsx(t,{of:j}),`
`,n.jsx(e.h2,{id:"states",children:"States"}),`
`,n.jsx(e.p,{children:'ButtonIcons can display a "loading" state for asynchronous actions.'}),`
`,n.jsx(e.h3,{id:"loading",children:"Loading"}),`
`,n.jsx(e.p,{children:"Only use when necessary to avoid multiple clicks when the action is not instant."}),`
`,n.jsx(t,{of:f}),`
`,n.jsx(e.h3,{id:"skeleton",children:"Skeleton"}),`
`,n.jsx(e.p,{children:"Skeletons are placeholders for UIs that are not yet ready but will feature a ButtonIcon."}),`
`,n.jsx(e.p,{children:"The Loading state is for asynchronous tasks where the Button (and the button only) represents a pending state."}),`
`,n.jsxs(e.p,{children:["Skeleton needs are handled by the Skeleton component. Use ",n.jsx(e.code,{children:"SkeletonButtonIcon"})," or the right ",n.jsx(e.code,{children:"variant"})," prop on ",n.jsx(e.code,{children:"Skeleton"}),"."]}),`
`,n.jsx(t,{of:g}),`
`,n.jsx(e.p,{children:n.jsx(e.a,{href:"/docs/feedback-skeleton--docs",children:"The Skeleton Documentation is over there!"})}),`
`,n.jsx(e.h2,{id:"interaction",children:"Interaction"}),`
`,n.jsx(e.p,{children:'All buttons have interactive states for "hover", "active" and "disabled". A focus ring should also be displayed on keyboard navigation.'}),`
`,n.jsx(e.h2,{id:"content",children:"Content"}),`
`,n.jsx(e.p,{children:'All ButtonIcons carry a tooltip on hover. The content of that tooltip should be short ("do something") and effective.'}),`
`,n.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(e.p,{children:"You have access to three components with curated props for each."}),`
`,n.jsx(e.h3,{id:"buttonicon-1",children:"ButtonIcon"}),`
`,n.jsx(t,{of:i}),`
`,n.jsx(s,{of:i}),`
`,n.jsx(e.h3,{id:"buttonicontoggle",children:"ButtonIconToggle"}),`
`,n.jsx(t,{of:a}),`
`,n.jsx(s,{of:a}),`
`,n.jsx(e.h3,{id:"buttoniconfloating",children:"ButtonIconFloating"}),`
`,n.jsx(t,{of:l}),`
`,n.jsx(s,{of:l}),`
`,n.jsx(e.h3,{id:"button-props",children:"Button props"}),`
`,n.jsxs(e.p,{children:["Of course all buttons can also use natural ",n.jsx(e.code,{children:"<button>"})," attributes (but not ",n.jsx(e.code,{children:"classNames"})," nor ",n.jsx(e.code,{children:"style"}),")."]}),`
`,n.jsx(t,{of:b}),`
`,n.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,n.jsxs(e.p,{children:["In order to be semantically correct, ",n.jsx(e.code,{children:"ButtonIconToggle"}),"'s active state is dependent on the ",n.jsx(e.code,{children:"aria-pressed"})," attribute being set to ",n.jsx(e.code,{children:"true"}),"."]}),`
`,n.jsxs(e.p,{children:["This attribute is transparent to consumers of the component and providing the mandatory ",n.jsx(e.code,{children:"isActive"})," prop will actually assign the correct ",n.jsx(e.code,{children:"aria-pressed"})," value."]})]})}function N(o={}){const{wrapper:e}={...c(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(r,{...o})}):r(o)}export{N as default};
