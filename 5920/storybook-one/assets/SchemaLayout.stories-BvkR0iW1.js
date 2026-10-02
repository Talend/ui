import{j as r}from"./iframe-CqcHacxX.js";import{D as F,a as S,L as j,H as k}from"./TreeView.component-SqDhJ4pp.js";import"./ResourcePicker.component-I2W0sOh8.js";import{F as h}from"./index-Cv1mhrYH.js";import{a as y}from"./argTypes-CfPV3Ldy.js";import{d as x}from"./displayMode.schema-B6V3NT0J.js";import{s as a}from"./simple-C3esf9_T.js";import"./preload-helper-PPVm8Dsz.js";import"./withTranslation-CeIEClgT.js";import"./reactour.esm-BDv0xOdk.js";import"./index-D5GTn9mG.js";import"./tslib.es6-DwEbZtuj.js";import"./inheritsLoose-D0tmYnN-.js";import"./ErrorState-Dn2MBp0h.js";import"./Transition-q62-OWAm.js";import"./Transition-Dz7IGlpM.js";import"./Modal-CUQMr3W9.js";import"./interopRequireDefault-CBIuXflU.js";import"./RootCloseWrapper-B7SvJh3k.js";import"./SplitButton-DGj1ik2f.js";import"./Popover-BwSqUvYF.js";import"./removeClass-B-DUduzN.js";import"./noop-D0T5IRG7.js";import"./head-CKrtWt2U.js";import"./head-DCcSS0Sj.js";import"./isNull-DWK0sA3F.js";import"./escapeRegExp-DFoqE2jH.js";import"./CellMeasurerCache-C4Cq6K5X.js";import"./index-Crjh0Agi.js";import"./entries-9QFlCXQv.js";import"./debounce-DIVsUaCQ.js";import"./debounce-Cuz6-LZR.js";import"./Tab-Csk1B9j9.js";import"./NavItem-BZ7e2fxy.js";import"./index-uRJol-Jj.js";import"./NavDropdown-C6TZo8gI.js";import"./Panel-Bak0qEMb.js";import"./useLocalStorage-Bc1Yq2eF.js";import"./util-jvF6Sxgj.js";import"./clsx-DWXoUXuQ.js";import"./map-Cx073hC6.js";import"./map-FFvyU-Df.js";import"./isNil-BMINaSo1.js";import"./memoize-one.esm-BdPwpGay.js";import"./union-DQaP6oKY.js";import"./union-EGjn2Z3Q.js";import"./_baseUniq-CP2ZoGAH.js";import"./isObject-Phh2NUrR.js";import"./index-DUwcjPHK.js";import"./transform-CLRdSQou.js";import"./string-xuEJKGi6.js";import"./arc-C8ymbxV7.js";import"./path-B39wOLeq.js";import"./Dot-DRYHqX7b.js";import"./isString-DK6a5-RB.js";import"./range-B-Nj_6zd.js";import"./index-BTpfC00N.js";import"./index-DVCBB82h.js";import"./usePopper-BERyUs98.js";import"./index-CtVZq7su.js";import"./locale-DGmdyOYb.js";import"./setYear-Cok-ShjB.js";import"./isWithinInterval-BykPRPjy.js";import"./setSeconds-CXNmWMrd.js";import"./findIndex-Bghjb0lr.js";import"./DropdownButton-9Z_x2v7Z.js";import"./FormControl-vG5Hj6hq.js";import"./useKey-EzgQ8uS6.js";import"./StackItem-Beou9FNv.js";import"./RHFInput.component-Bm-oe-jC.js";import"./index.esm-Bdx2Xtma.js";import"./RHFSelect.component-CRB7FQ0c.js";import"./RHFTextArea.component-CzCZ-pHt.js";import"./last-DIHoE2HC.js";const Gr={title:"Forms/Schema/Layout",component:h,argTypes:y,parameters:{centeredLayout:!0}},o=({title:e,stacked:t=!1,...s})=>{const D=[r.jsx(S,{stacked:t,children:r.jsx(h,{...s})},"first")];return r.jsx(j,{drawers:D,mode:"TwoColumns",header:r.jsx(k,{}),children:r.jsxs("div",{style:{margin:10},children:[r.jsx("h1",{children:e}),r.jsx("p",{children:"To use a UIForm in a drawer you just have to create your component this way:"}),r.jsx("code",{children:"<Drawer.Container><UIForm {...props} /></Drawer.Container>"})]})})},i={render:e=>r.jsxs("div",{children:[r.jsx("h1",{children:"Form by default take 100% width of the container"}),r.jsx(h,{...e})]})};i.args={data:a};const n={args:{title:"UIForm in a drawer",data:a},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};n.args={data:a};const p={args:{title:"UIForm in a drawer",data:a},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};p.args={data:a,anchorButtonsToFooter:!0};const m={args:{title:"UIForm in a drawer",data:x,displayMode:"text"},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};m.args={data:x,displayMode:"text"};const d={args:{title:"UIForm in a drawer",data:a,stacked:!0},render:({title:e,stacked:t,...s})=>r.jsx(o,{title:e,...s,stacked:t})},c={args:{data:a},render:e=>r.jsx(F,{header:"UIForm in a Modal",flex:!0,show:!0,children:r.jsx(h,{...e})})},l={args:{loading:!0,data:a}},u={args:{loading:!0,actions:[],data:a}},g={args:{loading:!0,title:"Form in loading in drawer",data:a},render:({title:e,...t})=>r.jsx(o,{...t,title:e})},w={args:{loading:!0,data:a,title:"Form in loading in drawer",stacked:!0},render:({title:e,stacked:t,...s})=>r.jsx(o,{...s,title:e,stacked:t})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: props => <div>
            <h1>Form by default take 100% width of the container</h1>
            <Form {...props} />
        </div>
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'UIForm in a drawer',
    data: simple
  },
  render: ({
    title,
    ...props
  }) => <LayoutDrawer title={title} {...props} />
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'UIForm in a drawer',
    data: simple
  },
  render: ({
    title,
    ...props
  }) => <LayoutDrawer title={title} {...props} />
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'UIForm in a drawer',
    data: displayModeSchema,
    displayMode: 'text'
  },
  render: ({
    title,
    ...props
  }) => <LayoutDrawer title={title} {...props} />
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'UIForm in a drawer',
    data: simple,
    stacked: true
  },
  render: ({
    title,
    stacked,
    ...props
  }) => <LayoutDrawer title={title} {...props} stacked={stacked} />
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    data: simple
  },
  render: props => <Dialog header="UIForm in a Modal" flex show>
            <Form {...props} />
        </Dialog>
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    data: simple // in case the user switch to loading: false
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    actions: [],
    data: simple // in case the user switch to loading: false
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    title: 'Form in loading in drawer',
    data: simple // in case the user switch to loading: false
  },
  render: ({
    title,
    ...props
  }) => <LayoutDrawer {...props} title={title} />
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    data: simple,
    // in case the user switch to loading: false
    title: 'Form in loading in drawer',
    stacked: true
  },
  render: ({
    title,
    stacked,
    ...props
  }) => <LayoutDrawer {...props} title={title} stacked={stacked} />
}`,...w.parameters?.docs?.source}}};const Jr=["Default","Drawer","DrawerButtonsToBottom","DrawerTextMode","DrawerStacked","Modal","Skeleton","NoButton","SkeletonDrawer","SkeletonDrawerStacked"];export{i as Default,n as Drawer,p as DrawerButtonsToBottom,d as DrawerStacked,m as DrawerTextMode,c as Modal,u as NoButton,l as Skeleton,g as SkeletonDrawer,w as SkeletonDrawerStacked,Jr as __namedExportsOrder,Gr as default};
