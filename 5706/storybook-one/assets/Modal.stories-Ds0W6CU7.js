import{u as F,r as s,j as t}from"./iframe-CfWawTfz.js";import{u as Q,n as U,o as V,L as Y}from"./DialogBackdrop-BORENU0g.js";import{b as B,J,B as w,a as z}from"./Skeleton-WqWGNSGs.js";import{a as D,S as K}from"./StackItem-DxCmUS5t.js";import"./QualityBar.component-BEOa_2t1.js";import{r as X}from"./Tooltip-CCa96Lmg.js";import"./preload-helper-PPVm8Dsz.js";import"./index-mnPuEzeF.js";import"./removeClass-B-DUduzN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Transition-DqY3BSxz.js";import"./RatioBar.component-Cq1ZosWw.js";function G({children:e,popref:o,...a}){return X(e,{...{ref:o},...a})||null}const Z="_modal_ymcpe_1",$="_modal__header_ymcpe_39",tt="_modal__content_ymcpe_40",et="_modal__buttons_ymcpe_41",n={"modal-backdrop":"_modal-backdrop_ymcpe_1",modal:Z,modal__header:$,modal__content:tt,modal__buttons:et,"close-button":"_close-button_ymcpe_68","modal-header-text":"_modal-header-text_ymcpe_72","modal-header-text__title":"_modal-header-text__title_ymcpe_78","modal-header-text__description":"_modal-header-text__description_ymcpe_79","modal-icon":"_modal-icon_ymcpe_88"};function ot(e){const{icon:o,"data-test":a}=e;return t.jsx("div",{className:n["modal-icon"],"data-test":a,children:typeof o=="string"?t.jsx(J,{name:o}):o})}function at(e){if(!("destructive"in e)||!e.destructive)return t.jsx(w,{...e});const{destructive:o,...a}=e;return t.jsx(z,{...a})}function A(e){const{header:o,primaryAction:a,disclosure:c,onClose:l,secondaryAction:W,preventEscaping:d,children:L,preventInteractiveBackdrop:C,...R}=e,M="disclosure"in e,{t:O}=F("design-system"),x=Q({visible:!M}),T=s.useRef(null),P=s.useRef(null),N="modal-header-text-title";s.useEffect(()=>{P.current?.focus()},[P]);const h=s.useMemo(()=>M?()=>x.hide():()=>l&&l(),[x,M,l]),H=s.useCallback(E=>{!d&&!C&&E.target===T.current&&h()},[h,C,d]),q=s.useCallback(()=>{!d&&!C&&h()},[h,C,d]);return t.jsxs(t.Fragment,{children:[c&&t.jsx(G,{...x,children:E=>s.cloneElement(c,{...E,onClick:x.show})}),t.jsx(U,{visible:x.visible,className:n["modal-backdrop"],"data-test":"modal.backdrop","data-testid":"modal.backdrop",onClick:H,ref:T,children:t.jsx(V,{...R,visible:x.visible,"data-test":"modal","data-testid":"modal",className:n.modal,hide:q,"aria-labelledby":N,ref:P,children:t.jsxs(D,{gap:0,children:[t.jsxs("div",{className:n.modal__header,children:[o.icon&&t.jsx(ot,{icon:o.icon,"data-test":"modal.header.icon","data-testid":"modal.header.icon"}),t.jsxs("div",{className:n["modal-header-text"],children:[t.jsx("span",{id:N,className:n["modal-header-text__title"],"data-test":"modal.header.title",children:o.title}),o.description&&t.jsx("span",{className:n["modal-header-text__description"],"data-test":"modal.header.description",children:o.description})]})]}),t.jsx("div",{className:n.modal__content,"data-test":"modal.content",children:L}),t.jsx("div",{className:n.modal__buttons,"data-test":"modal.buttons",children:t.jsxs(K,{gap:"XS",justify:"end",children:[!d&&t.jsx("span",{className:n["close-button"],children:t.jsx(B,{onClick:()=>h(),"data-test":"modal.buttons.close","data-testid":"modal.buttons.close","data-feature":"modal.buttons.close",children:a||W?O("CANCEL","Cancel"):O("CLOSE","Close")})}),W&&t.jsx(B,{"data-test":"modal.buttons.secondary","data-testid":"modal.buttons.secondary","data-feature":"modal.buttons.secondary",...W}),a&&t.jsx(at,{"data-testid":"modal.buttons.primary","data-test":"modal.buttons.primary","data-feature":"modal.buttons.primary",...a})]})})]})})})]})}const{action:i}=__STORYBOOK_MODULE_ACTIONS__,bt={component:A,title:"Layout/Modal"};function r(e){const[o,a]=s.useState(!1),{children:c,...l}=e;return t.jsxs(t.Fragment,{children:[t.jsx(w,{onClick:()=>a(!0),"data-test":"open-modal",children:"See"}),o&&t.jsx(A,{header:{title:"(Default story title)"},onClose:()=>{i("onClose"),a(!1)},...l,children:c||"(Default story child)"})]})}function I(){return t.jsxs("div",{children:[t.jsxs("p",{children:[t.jsx("b",{children:"STEP 1"}),t.jsx("br",{}),"For the pastry, put 175g plain flour, 100g cold butter, cut into pieces, 1 egg yolk and 4 tsp cold water into a food processor. Using the pulse button, process until the mix binds."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 2"}),t.jsx("br",{}),"Tip the pastry onto a lightly floured surface, gather into a smooth ball, then roll out as thinly as you can."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 3"}),t.jsx("br",{}),"Line a 23 x 2.5cm loose-bottomed, fluted flan tin, easing the pastry into the base."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 4"}),t.jsx("br",{}),"Trim the pastry edges with scissors (save any trimmings) so it sits slightly above the tin (if it shrinks, it shouldn’t now go below the level of the tin). Press the pastry into the flutes, lightly prick the base with a fork, then chill for 10 mins."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 5"}),t.jsx("br",{}),"Put a baking sheet in the oven and heat oven to 200C/fan 180C/gas 6. Line pastry case with foil, shiny side down, fill with dry beans and bake on the hot sheet for 15 mins."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 6"}),t.jsx("br",{}),"Remove foil and beans and bake for 4-5 mins more until the pastry is pale golden. If you notice any small holes or cracks, patch up with pastry trimmings. You can make up to this point a day ahead."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 7"}),t.jsx("br",{}),"While the pastry cooks, prepare the filling. Heat a small frying pan, tip in 200g lardons and fry for a couple of mins. Drain off any liquid that comes out, then continue cooking until the lardons just start to colour, but aren’t crisp. Remove and drain on paper towels."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 8"}),t.jsx("br",{}),"Cut three quarters of the 50g gruyère into small dice and finely grate the rest. Scatter the diced gruyère and fried lardons over the bottom of the pastry case."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 9"}),t.jsx("br",{}),"Using a spoon, beat 200ml crème fraîche to slacken it then slowly beat in 200ml double cream. Mix in 3 well beaten eggs. Season (you shouldn’t need much salt) and add a pinch of ground nutmeg. Pour three quarters of the filling into the pastry case."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 10"}),t.jsx("br",{}),"Half-pull the oven shelf out and put the flan tin on the baking sheet. Quickly pour the rest of the filling into the pastry case – you get it right to the top this way. Scatter the grated cheese over the top, then carefully push the shelf back into the oven."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 11"}),t.jsx("br",{}),"Lower the oven to 190C/fan 170C/gas 5. Bake for about 25 mins, or until golden and softly set (the centre should not feel too firm)."]}),t.jsxs("p",{children:[t.jsx("b",{children:"STEP 12"}),t.jsx("br",{}),"Let the quiche settle for 4-5 mins, then remove from the tin. Serve freshly baked, although it’s also good cold."]}),t.jsx("div",{style:{width:"50%",margin:"1.25rem auto 0"},children:t.jsx("img",{src:"https://img-3.journaldesfemmes.fr/csLNATf47C8IYJxFtQ4S-o1t0kw=/800x600/smart/5a1c637d7ef0426784dad14c29aaff55/recipe-jdf/10025089.jpg",alt:"The quiche lorraine"})})]})}const p=e=>t.jsx(r,{...e,header:{title:"No disclosure modal"},children:t.jsx("p",{children:"A basic modal with only a title and a text content."})});p.parameters={chromatic:{disableSnapshot:!0}};const v=e=>t.jsx(A,{...e,header:{title:"With disclosure"},disclosure:t.jsx(w,{"data-test":"modal-disclosure",onClick:()=>{},children:"Open the modal"}),children:t.jsx("p",{children:"A basic modal with an associated disclosure button."})}),m=e=>t.jsx(r,{...e,header:{title:"With icon",icon:"talend-file-hdfs-o"},children:t.jsx("p",{children:"A basic modal with title, a text content and an icon."})});m.parameters={chromatic:{disableSnapshot:!0}};const nt=t.jsx("span",{children:"👋"}),u=e=>t.jsx(r,{...e,header:{title:"With custom icon",icon:nt},children:t.jsx("p",{children:"A basic modal with title, a text content and a custom icon."})});u.parameters={chromatic:{disableSnapshot:!0}};const y=e=>t.jsx(r,{...e,header:{title:"With description",description:"That is the description"},children:t.jsx("p",{children:"A basic modal with title, a description and a text content."})});y.parameters={chromatic:{disableSnapshot:!0}};const b=e=>t.jsx(r,{...e,header:{title:"With no clickable backdrop",icon:"talend-file-hdfs-o"},preventInteractiveBackdrop:!0,children:t.jsx("p",{children:"A basic modal with title, a text content and an icon."})});b.parameters={chromatic:{disableSnapshot:!0}};const f=e=>t.jsx(r,{...e,header:{title:"With actions"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick")},secondaryAction:{children:"Secondary action",onClick:i("[Secondary action] onClick")},children:t.jsx("p",{children:"A modal with title, a text content, an icon and both available actions (primary and secondary)."})});f.parameters={chromatic:{disableSnapshot:!0}};const g=e=>t.jsx(r,{...e,header:{title:"With actions"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick"),destructive:!0},children:t.jsx("p",{children:"A modal with a destructive primary action."})});g.parameters={chromatic:{disableSnapshot:!0}};const j=()=>{const[e,o]=s.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsx(w,{onClick:()=>o(!0),"data-test":"open-modal",children:"See"}),e&&t.jsx(A,{header:{title:"A blocking modal"},onClose:()=>{i("onClose"),o(!1)},preventEscaping:!0,children:t.jsxs(D,{gap:"M",align:"center",children:[t.jsxs("p",{children:["A modal that doesn't trigger ",t.jsx("code",{children:"onClose"})," when the backdrop is clicked and without the close button"]}),t.jsx(Y,{onClick:()=>o(!1),"data-test":"close-modal",children:"Close me !"})]})})]})};j.parameters={chromatic:{disableSnapshot:!0}};const S=e=>t.jsx(r,{...e,header:{title:"With overflowing content (including the title and the description, text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",description:"The description is also too long (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)"},children:"👋"});S.parameters={chromatic:{disableSnapshot:!0}};const k=e=>t.jsx(r,{...e,header:{title:"With overflowing content"},children:t.jsx(I,{})});k.parameters={chromatic:{disableSnapshot:!0}};const _=e=>t.jsx(r,{...e,header:{title:"With everything, including a long title (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",description:"... and description (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)",icon:"talend-file-hdfs-o"},primaryAction:{children:"Primary action",onClick:i("[Primary action] onClick")},secondaryAction:{children:"Secondary action",onClick:i("[Secondary action] onClick"),"data-feature":"secondary-action"},children:t.jsx(I,{})});_.parameters={chromatic:{disableSnapshot:!0}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'No disclosure modal'
}}>
        <p>A basic modal with only a title and a text content.</p>
    </ModalStory>`,...p.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`props => <Modal {...props} header={{
  title: 'With disclosure'
}} disclosure={<ButtonPrimary data-test="modal-disclosure" onClick={() => {}}>
                Open the modal
            </ButtonPrimary>}>
        <p>A basic modal with an associated disclosure button.</p>
    </Modal>`,...v.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With icon',
  icon: 'talend-file-hdfs-o'
}}>
        <p>A basic modal with title, a text content and an icon.</p>
    </ModalStory>`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With custom icon',
  icon: customIcon
}}>
        <p>A basic modal with title, a text content and a custom icon.</p>
    </ModalStory>`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With description',
  description: 'That is the description'
}}>
        <p>A basic modal with title, a description and a text content.</p>
    </ModalStory>`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With no clickable backdrop',
  icon: 'talend-file-hdfs-o'
}} preventInteractiveBackdrop>
        <p>A basic modal with title, a text content and an icon.</p>
    </ModalStory>`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
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
    </ModalStory>`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With actions'
}} primaryAction={{
  children: 'Primary action',
  onClick: action('[Primary action] onClick'),
  destructive: true
}}>
        <p>A modal with a destructive primary action.</p>
    </ModalStory>`,...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
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
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With overflowing content (including the title and the description, text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)',
  description: 'The description is also too long (text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text)'
}}>
        👋
    </ModalStory>`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
  title: 'With overflowing content'
}}>
        <QuicheRecipe />
    </ModalStory>`,...k.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`props => <ModalStory {...props} header={{
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
    </ModalStory>`,..._.parameters?.docs?.source}}};const ft=["NoDisclosure","WithDisclosure","WithIcon","WithCustomIcon","WithDescription","WithNoClickableBackdrop","WithActions","WithDestructivePrimaryAction","WithNoEscape","WithOverflowingHeader","WithOverflowingContent","WithEverything"];export{p as NoDisclosure,f as WithActions,u as WithCustomIcon,y as WithDescription,g as WithDestructivePrimaryAction,v as WithDisclosure,_ as WithEverything,m as WithIcon,b as WithNoClickableBackdrop,j as WithNoEscape,k as WithOverflowingContent,S as WithOverflowingHeader,ft as __namedExportsOrder,bt as default};
