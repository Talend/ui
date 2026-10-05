import{j as r}from"./iframe-30-spegq.js";import{D as F,a as S,L as j,H as k}from"./TreeView.component-OGv9eaCh.js";import"./ResourcePicker.component-CcvC8kvC.js";import{F as h}from"./index-hhUzg3gZ.js";import{a as y}from"./argTypes-DfDrrAWS.js";import{d as x}from"./displayMode.schema-B6V3NT0J.js";import{s as a}from"./simple-C3esf9_T.js";import"./preload-helper-PPVm8Dsz.js";import"./withTranslation-X3-5uq1y.js";import"./reactour.esm-D70wC6ST.js";import"./index-C0dxqnk3.js";import"./tslib.es6-DwEbZtuj.js";import"./inheritsLoose-DzbXIRbr.js";import"./ErrorState-BOF2d7il.js";import"./Transition-BB6AoHQV.js";import"./Transition-0Dh1J_J8.js";import"./Modal-D6zqZOHg.js";import"./interopRequireDefault-CBIuXflU.js";import"./RootCloseWrapper-ClMMNp_n.js";import"./SplitButton-DB2EHEie.js";import"./Popover-BLtgje2a.js";import"./removeClass-B-DUduzN.js";import"./noop-Boj8uolG.js";import"./head-0-hdwy0D.js";import"./head-DCcSS0Sj.js";import"./isNull-xX2o6BtO.js";import"./escapeRegExp-CID-Lr8o.js";import"./CellMeasurerCache-DTQgdmn8.js";import"./index-D6_yCAQp.js";import"./entries-DN1pVdFE.js";import"./debounce-gsR_lfak.js";import"./debounce-_m1DrqvO.js";import"./Tab-BPucQf7z.js";import"./NavItem-B9ceHFgj.js";import"./index-DxgMr67h.js";import"./NavDropdown-DXhml-kr.js";import"./Panel-EjBFSlq2.js";import"./useLocalStorage-DQ2sSHd9.js";import"./util-jvF6Sxgj.js";import"./clsx-bABnpZPl.js";import"./map-D5P4Gi94.js";import"./map-D-d9Af4s.js";import"./isNil-C_OLNhww.js";import"./memoize-one.esm-BdPwpGay.js";import"./union-CEyvrhGq.js";import"./union-CmAYPFeo.js";import"./_baseUniq-CVze6p6t.js";import"./isObject-DW0O77EE.js";import"./index-uYldUkFO.js";import"./transform-CLRdSQou.js";import"./string-xuEJKGi6.js";import"./arc-C8ymbxV7.js";import"./path-B39wOLeq.js";import"./Dot-Be1zHEwK.js";import"./isString-Cuqi9KAL.js";import"./range-rniap4j3.js";import"./index-CQN-FCk9.js";import"./index-CbSHwHuV.js";import"./usePopper-Dk77EYe8.js";import"./index-5xjTdKmP.js";import"./locale-BA3a9n_o.js";import"./setYear-vk55Ia2U.js";import"./isWithinInterval-Ddfg-3ZW.js";import"./setSeconds-U2YFpPJL.js";import"./findIndex-CGUBgX2t.js";import"./DropdownButton-D3xVdv6t.js";import"./FormControl-C7hno3uV.js";import"./useKey-DVkZ4lKN.js";import"./StackItem-WLy4VXrQ.js";import"./RHFInput.component-TGbE6mVU.js";import"./index.esm-xPcjdYtZ.js";import"./RHFSelect.component-CNCV4_Ip.js";import"./RHFTextArea.component-DPU0nQLl.js";import"./last-DRNdK_BZ.js";const Gr={title:"Forms/Schema/Layout",component:h,argTypes:y,parameters:{centeredLayout:!0}},o=({title:e,stacked:t=!1,...s})=>{const D=[r.jsx(S,{stacked:t,children:r.jsx(h,{...s})},"first")];return r.jsx(j,{drawers:D,mode:"TwoColumns",header:r.jsx(k,{}),children:r.jsxs("div",{style:{margin:10},children:[r.jsx("h1",{children:e}),r.jsx("p",{children:"To use a UIForm in a drawer you just have to create your component this way:"}),r.jsx("code",{children:"<Drawer.Container><UIForm {...props} /></Drawer.Container>"})]})})},i={render:e=>r.jsxs("div",{children:[r.jsx("h1",{children:"Form by default take 100% width of the container"}),r.jsx(h,{...e})]})};i.args={data:a};const n={args:{title:"UIForm in a drawer",data:a},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};n.args={data:a};const p={args:{title:"UIForm in a drawer",data:a},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};p.args={data:a,anchorButtonsToFooter:!0};const m={args:{title:"UIForm in a drawer",data:x,displayMode:"text"},render:({title:e,...t})=>r.jsx(o,{title:e,...t})};m.args={data:x,displayMode:"text"};const d={args:{title:"UIForm in a drawer",data:a,stacked:!0},render:({title:e,stacked:t,...s})=>r.jsx(o,{title:e,...s,stacked:t})},c={args:{data:a},render:e=>r.jsx(F,{header:"UIForm in a Modal",flex:!0,show:!0,children:r.jsx(h,{...e})})},l={args:{loading:!0,data:a}},u={args:{loading:!0,actions:[],data:a}},g={args:{loading:!0,title:"Form in loading in drawer",data:a},render:({title:e,...t})=>r.jsx(o,{...t,title:e})},w={args:{loading:!0,data:a,title:"Form in loading in drawer",stacked:!0},render:({title:e,stacked:t,...s})=>r.jsx(o,{...s,title:e,stacked:t})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
