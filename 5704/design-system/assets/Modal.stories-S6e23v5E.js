import{j as t}from"./index-BeRoqjfO.js";import{r as s}from"./iframe-0koiw-N4.js";import{u as F,o as Q,p as U,L as V}from"./DialogBackdrop-BDgqVk1C.js";import{r as Y,a as D,S as z,c as B,s as J,B as w,b as K}from"./Skeleton-XhJlLQkP.js";import{m as X}from"./useCopyToClipboard-BFdKw2yF.js";import"./index-osoKd-JR.js";import"./TalendDesignTokens-JgHEBmOa.js";function G({children:e,popref:o,...a}){return Y(e,{...{ref:o},...a})||null}const Z="_modal_ymcpe_1",$="_modal__header_ymcpe_39",tt="_modal__content_ymcpe_40",et="_modal__buttons_ymcpe_41",n={"modal-backdrop":"_modal-backdrop_ymcpe_1",modal:Z,modal__header:$,modal__content:tt,modal__buttons:et,"close-button":"_close-button_ymcpe_68","modal-header-text":"_modal-header-text_ymcpe_72","modal-header-text__title":"_modal-header-text__title_ymcpe_78","modal-header-text__description":"_modal-header-text__description_ymcpe_79","modal-icon":"_modal-icon_ymcpe_88"};function ot(e){const{icon:o,"data-test":a}=e;return t.jsx("div",{className:n["modal-icon"],"data-test":a,children:typeof o=="string"?t.jsx(J,{name:o}):o})}function at(e){if(!("destructive"in e)||!e.destructive)return t.jsx(w,{...e});const{destructive:o,...a}=e;return t.jsx(K,{...a})}function W(e){const{header:o,primaryAction:a,disclosure:j,onClose:S,secondaryAction:A,preventEscaping:k,children:L,preventInteractiveBackdrop:v,...R}=e,M="disclosure"in e,{t:O}=X("design-system"),x=F({visible:!M}),T=s.useRef(null),P=s.useRef(null),N="modal-header-text-title";s.useEffect(()=>{P.current?.focus()},[P]);const _=s.useMemo(()=>M?()=>x.hide():()=>S&&S(),[x,M,S]),H=s.useCallback(E=>{!k&&!v&&E.target===T.current&&_()},[_,v,k]),q=s.useCallback(()=>{!k&&!v&&_()},[_,v,k]);return t.jsxs(t.Fragment,{children:[j&&t.jsx(G,{...x,children:E=>s.cloneElement(j,{...E,onClick:x.show})}),t.jsx(Q,{visible:x.visible,className:n["modal-backdrop"],"data-test":"modal.backdrop","data-testid":"modal.backdrop",onClick:H,ref:T,children:t.jsx(U,{...R,visible:x.visible,"data-test":"modal","data-testid":"modal",className:n.modal,hide:q,"aria-labelledby":N,ref:P,children:t.jsxs(D,{gap:0,children:[t.jsxs("div",{className:n.modal__header,children:[o.icon&&t.jsx(ot,{icon:o.icon,"data-test":"modal.header.icon","data-testid":"modal.header.icon"}),t.jsxs("div",{className:n["modal-header-text"],children:[t.jsx("span",{id:N,className:n["modal-header-text__title"],"data-test":"modal.header.title",children:o.title}),o.description&&t.jsx("span",{className:n["modal-header-text__description"],"data-test":"modal.header.description",children:o.description})]})]}),t.jsx("div",{className:n.modal__content,"data-test":"modal.content",children:L}),t.jsx("div",{className:n.modal__buttons,"data-test":"modal.buttons",children:t.jsxs(z,{gap:"XS",justify:"end",children:[!k&&t.jsx("span",{className:n["close-button"],children:t.jsx(B,{onClick:()=>_(),"data-test":"modal.buttons.close","data-testid":"modal.buttons.close","data-feature":"modal.buttons.close",children:a||A?O("CANCEL","Cancel"):O("CLOSE","Close")})}),A&&t.jsx(B,{"data-test":"modal.buttons.secondary","data-testid":"modal.buttons.secondary","data-feature":"modal.buttons.secondary",...A}),a&&t.jsx(at,{"data-testid":"modal.buttons.primary","data-test":"modal.buttons.primary","data-feature":"modal.buttons.primary",...a})]})})]})})})]})}const{action:i}=__STORYBOOK_MODULE_ACTIONS__,nt={component:W,title:"Layout/Modal"};function r(e){const[o,a]=s.useState(!1),{children:j,...S}=e;return t.jsxs(t.Fragment,{children:[t.jsx(w,{onClick:()=>a(!0),"data-test":"open-modal",children:"See"}),o&&t.jsx(W,{header:{title:"(Default story title)"},onClose:()=>{i("onClose"),a(!1)},...S,children:j||"(Default story child)"})]})}function I(){return t.jsxs("div",{children:[t.jsxs("p",{children:[t.jsx("b",{children:"STEP 1"}),t.jsx("br",{}),"For the pastry, put 175g plain flour, 100g cold butter, cut into pieces, 1 egg yolk and 4 tsp cold water into a food processor. Using the pulse button, process until the mix binds."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 2"}),t.jsx("br",{}),"Tip the pastry onto a lightly floured surface, gather into a smooth ball, then roll out as thinly as you can."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 3"}),t.jsx("br",{}),"Line a 23 x 2.5cm loose-bottomed, fluted flan tin, easing the pastry into the base."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 4"}),t.jsx("br",{}),"Trim the pastry edges with scissors (save any trimmings) so it sits slightly above the tin (if it shrinks, it shouldn’t now go below the level of the tin). Press the pastry into the flutes, lightly prick the base with a fork, then chill for 10 mins."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 5"}),t.jsx("br",{}),"Put a baking sheet in the oven and heat oven to 200C/fan 180C/gas 6. Line pastry case with foil, shiny side down, fill with dry beans and bake on the hot sheet for 15 mins."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 6"}),t.jsx("br",{}),"Remove foil and beans and bake for 4-5 mins more until the pastry is pale golden. If you notice any small holes or cracks, patch up with pastry trimmings. You can make up to this point a day ahead."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 7"}),t.jsx("br",{}),"While the pastry cooks, prepare the filling. Heat a small frying pan, tip in 200g lardons and fry for a couple of mins. Drain off any liquid that comes out, then continue cooking until the lardons just start to colour, but aren’t crisp. Remove and drain on paper towels."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 8"}),t.jsx("br",{}),"Cut three quarters of the 50g gruyère into small dice and finely grate the rest. Scatter the diced gruyère and fried lardons over the bottom of the pastry case."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 9"}),t.jsx("br",{}),"Using a spoon, beat 200ml crème fraîche to slacken it then slowly beat in 200ml double cream. Mix in 3 well beaten eggs. Season (you shouldn’t need much salt) and add a pinch of ground nutmeg. Pour three quarters of the filling into the pastry case."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 10"}),t.jsx("br",{}),"Half-pull the oven shelf out and put the flan tin on the baking sheet. Quickly pour the rest of the filling into the pastry case – you get it right to the top this way. Scatter the grated cheese over the top, then carefully push the shelf back into the oven."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 11"}),t.jsx("br",{}),"Lower the oven to 190C/fan 170C/gas 5. Bake for about 25 mins, or until golden and softly set (the centre should not feel too firm)."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 12"}),t.jsx("br",{}),"Let the quiche settle for 4-5 mins, then remove from the tin. Serve freshly baked, although it’s also good cold."]}),t.jsx("div",{style:{width:"50%",margin:"1.25rem auto 0"},children:t.jsx("img",{src:"https://img-3.journaldesfemmes.fr/csLNATf47C8IYJxFtQ4S-o1t0kw=/800x600/smart/5a1c637d7ef0426784dad14c29aaff55/recipe-jdf/10025089.jpg",alt:"The quiche lorraine"})})]})}const c=e=>t.jsx(r,{...e,header:{title:"No disclosure modal"},children:t.jsx("p",{children:"A basic modal with only a title and a text content."})});c.parameters={chromatic:{disableSnapshot:!0}};const C=e=>t.jsx(W,{...e,header:{title:"With disclosure"},disclosure:t.jsx(w,{"data-test":"modal-disclosure",onClick:()=>{},children:"Open the modal"}),children:t.jsx("p",{children:"A basic modal with an associated disclosure button."})}),l=e=>t.jsx(r,{...e,header:{title:"With icon",icon:"talend-file-hdfs-o"},children:t.jsx("p",{children:"A basic modal with title, a text content and an icon."})});l.parameters={chromatic:{disableSnapshot:!0}};const rt=t.jsx("span",{children:"👋"}),d=e=>t.jsx(r,{...e,header:{title:"With custom icon",icon:rt},children:t.jsx("p",{children:"A basic modal with title, a text content and a custom icon."})});d.parameters={chromatic:{disableSnapshot:!0}};const h=e=>t.jsx(r,{...e,header:{title:"With description",description:"That is the description"},children:t.jsx("p",{children:"A basic modal with title, a description and a text content."})});h.parameters={chromatic:{disableSnapshot:!0}};const p=e=>t.jsx(r,{...e,header:{title:"With no clickable backdrop",icon:"talend-file-hdfs-o"},preventInteractiveBackdrop:!0,children:t.jsx("p",{children:"A basic modal with title, a text content and an icon."})});p.parameters={chromatic:{disableSnapshot:!0}};const m=e=>t.jsx(r,{...e,header:{title:"With actions"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick")},secondaryAction:{children:"Secondary action",onClick:i("[Secondary action] onClick")},children:t.jsx("p",{children:"A modal with title, a text content, an icon and both available actions (primary and secondary)."})});m.parameters={chromatic:{disableSnapshot:!0}};const u=e=>t.jsx(r,{...e,header:{title:"With actions"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick"),destructive:!0},children:t.jsx("p",{children:"A modal with a destructive primary action."})});u.parameters={chromatic:{disableSnapshot:!0}};const y=()=>{const[e,o]=s.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(w,{onClick:()=>o(!0),"data-test":"open-modal",children:"See"}),e&&t.jsx(W,{header:{title:"A blocking modal"},onClose:()=>{i("onClose"),o(!1)},preventEscaping:!0,children:t.jsxs(D,{gap:"M",align:"center",children:[t.jsxs("p",{children:["A modal that doesn't trigger ",t.jsx("code",{children:"onClose"})," when the backdrop is clicked and without the close button"]}),t.jsx(V,{onClick:()=>o(!1),"data-test":"close-modal",children:"Close me !"})]})})]})};y.parameters={chromatic:{disableSnapshot:!0}};const b=e=>t.jsx(r,{...e,header:{title:"With overflowing content (including the title and the description, text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",description:"The description is also too long (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)"},children:"👋"});b.parameters={chromatic:{disableSnapshot:!0}};const f=e=>t.jsx(r,{...e,header:{title:"With overflowing content"},children:t.jsx(I,{})});f.parameters={chromatic:{disableSnapshot:!0}};const g=e=>t.jsx(r,{...e,header:{title:"With everything, including a long title (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",description:"... and description (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",icon:"talend-file-hdfs-o"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick")},secondaryAction:{children:"Secondary action",onClick:i("[Secondary action] onClick"),"data-feature":"secondary-action"},children:t.jsx(I,{})});g.parameters={chromatic:{disableSnapshot:!0}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'No disclosure modal'
}}>
        <p>A basic modal with only a title and a text content.</p>
    </ModalStory>`,...c.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`props => <Modal {...props} header={{
  title: 'With disclosure'
}} disclosure={<ButtonPrimary data-test="modal-disclosure" onClick={() => {}}>
                Open the modal
            </ButtonPrimary>}>
        <p>A basic modal with an associated disclosure button.</p>
    </Modal>`,...C.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With icon',
  icon: 'talend-file-hdfs-o'
}}>
        <p>A basic modal with title, a text content and an icon.</p>
    </ModalStory>`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With custom icon',
  icon: customIcon
}}>
        <p>A basic modal with title, a text content and a custom icon.</p>
    </ModalStory>`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With description',
  description: 'That is the description'
}}>
        <p>A basic modal with title, a description and a text content.</p>
    </ModalStory>`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With no clickable backdrop',
  icon: 'talend-file-hdfs-o'
}} preventInteractiveBackdrop>
        <p>A basic modal with title, a text content and an icon.</p>
    </ModalStory>`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With actions'
}} primaryAction={{
  children: 'Primary action',
  onClick: action('[Primary action] onClick')
}} secondaryAction={{
  children: 'Secondary action',
  onClick: action('[Secondary action] onClick')
}}>
        <p>
            A modal with title, a text content, an icon and both available actions (primary and
            secondary).
        </p>
    </ModalStory>`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With actions'
}} primaryAction={{
  children: 'Primary action',
  onClick: action('[Primary action] onClick'),
  destructive: true
}}>
        <p>A modal with a destructive primary action.</p>
    </ModalStory>`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [modalOpen, setModalOpen] = useState(false);
  return <>
            <ButtonPrimary onClick={() => setModalOpen(true)} data-test="open-modal">
                See
            </ButtonPrimary>

            {modalOpen && <Modal header={{
      title: 'A blocking modal'
    }} onClose={() => {
      action('onClose');
      setModalOpen(false);
    }} preventEscaping>
                    <StackVertical gap="M" align="center">
                        <p>
                            A modal that doesn't trigger <code>onClose</code> when the backdrop is clicked and
                            without the close button
                        </p>

                        <LinkAsButton onClick={() => setModalOpen(false)} data-test="close-modal">
                            Close me !
                        </LinkAsButton>
                    </StackVertical>
                </Modal>}
        </>;
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With overflowing content (including the title and the description, text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
  description: 'The description is also too long (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)'
}}>
        👋
    </ModalStory>`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With overflowing content'
}}>
        <QuicheRecipe />
    </ModalStory>`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With everything, including a long title (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
  description: '... and description (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
  icon: 'talend-file-hdfs-o'
}} primaryAction={{
  children: 'Primary action',
  onClick: action('[Primary action] onClick')
}} secondaryAction={{
  children: 'Secondary action',
  onClick: action('[Secondary action] onClick'),
  'data-feature': 'secondary-action'
}}>
        <QuicheRecipe />
    </ModalStory>`,...g.parameters?.docs?.source}}};const st=["NoDisclosure","WithDisclosure","WithIcon","WithCustomIcon","WithDescription","WithNoClickableBackdrop","WithActions","WithDestructivePrimaryAction","WithNoEscape","WithOverflowingHeader","WithOverflowingContent","WithEverything"],mt=Object.freeze(Object.defineProperty({__proto__:null,NoDisclosure:c,WithActions:m,WithCustomIcon:d,WithDescription:h,WithDestructivePrimaryAction:u,WithDisclosure:C,WithEverything:g,WithIcon:l,WithNoClickableBackdrop:p,WithNoEscape:y,WithOverflowingContent:f,WithOverflowingHeader:b,__namedExportsOrder:st,default:nt},Symbol.toStringTag,{value:"Module"}));export{c as N,mt as S,C as W,l as a,d as b,h as c,p as d,m as e,u as f,y as g,b as h,f as i,g as j};
