import{j as e,at as o}from"./iframe-ZOGeCSiy.js";import{D as w}from"./Dialog.component-DkbWVajX.js";import{A as u}from"./Action.component-B584f_uk.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionBar.component-C1rZjJ69.js";import"./Actions.component-Cuk-riaJ.js";import"./OverlayTrigger.component-BMlPJI7F.js";import"./RootCloseWrapper-TPLWA_tq.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DksHDv9A.js";import"./Transition-j6wf0nG1.js";import"./Transition-BVyFOmuZ.js";import"./SplitButton-DLiWLDF5.js";import"./inheritsLoose-B465Ji_I.js";import"./ActionButton.component-eaoAlJUf.js";import"./TooltipTrigger.component-BLJRLllu.js";import"./index-DC843bAT.js";import"./CircularProgress.component-BrhcN_XO.js";import"./constants-CZYEPhht.js";import"./translate-C0eZGPcd.js";import"./withTranslation-D4TJQ1jV.js";import"./Skeleton.component-N7_eYc0h.js";import"./index-D_abBtzh.js";import"./theme-CE6R_YGz.js";import"./ActionIconToggle.component-DA-mj3wa.js";import"./ActionSplitDropdown.component-CXns4ixp.js";import"./Progress.component-Cwft4TK1.js";import"./Modal-Ck9MtiMh.js";import"./removeClass-B-DUduzN.js";import"./get-Bf-Kb1qt.js";import"./_baseGet-zdJDQGKY.js";import"./toString-CvgZXU79.js";import"./isSymbol-IdjUtDg4.js";import"./eq-lWQTG8BZ.js";import"./omit-ClkKedsP.js";import"./_setToString-DPVKMo3z.js";import"./_getTag-BhxNqYHo.js";import"./isArrayLike-Bympu03d.js";import"./DropdownButton-BWgznDww.js";function r({children:n,validateAction:i,secondaryActions:f,cancelAction:t,progressLabel:y,progressValue:C,onHide:D,...j}){const l={left:[],center:[],right:[]};t&&l.left.push(t),f&&(l.right=l.right.concat(f)),i&&l.right.push(i);let v;C&&(v={percent:C,tooltip:y});function k(A){return t&&t.onClick&&t.onClick(),D?D(A):null}return e.jsx(w,{progress:v,closeButton:!1,actionbar:{actions:l},onHide:k,...j,children:n})}r.displayName="ConfirmDialog";r.defaultValue={secondaryActions:[]};r.propTypes={header:o.string,size:o.oneOf(["small","large"]),children:o.oneOfType([o.element,o.arrayOf(o.element)]),show:o.bool,cancelAction:o.shape(u.propTypes),validateAction:o.shape(u.propTypes),secondaryActions:o.arrayOf(o.shape(u.propTypes)),progressLabel:o.string,progressValue:o.number,bodyOverflow:o.bool,onHide:o.func,getComponent:o.func};const b={header:"Hello world",show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},S={show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},P={show:!0,header:"Hello world",size:"small",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},O={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},x={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"},progressValue:66,progressLabel:"66%"},s=e.jsx("div",{children:"BODY content. You can put what ever you want here"}),ue={title:"Components/Layout/Modals/ConfirmDialog",component:r,tags:["autodocs"]},a={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...b,children:s})]})},c={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...S,children:s})]})},d={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...P,children:s})]})},p={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...O,children:s})]})},m={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:s})]})},h={render:()=>{const n=[];for(let i=0;i<50;i++)n.push(e.jsx("p",{children:"The content dictate the height"},i));return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:e.jsx("div",{children:n})})]})}},g={render:()=>{const n={...b,header:"Delete elements",validateAction:{label:"Delete",onClick:()=>console.log("ok"),bsStyle:"danger"},secondaryActions:[{label:"Show info",onClick:()=>console.log("info"),bsStyle:"info"}]};return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...n,children:s})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
        </div>
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...propsWithoutHeader}>{children}</ConfirmDialog>
        </div>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...smallProps}>{children}</ConfirmDialog>
        </div>
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...largeProps}>{children}</ConfirmDialog>
        </div>
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...withProgressBarProps}>{children}</ConfirmDialog>
        </div>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const rows = [];
    for (let index = 0; index < 50; index++) {
      rows.push(<p key={index}>The content dictate the height</p>);
    }
    return <div>
                <h1>Dialog</h1>
                <ConfirmDialog {...withProgressBarProps}>
                    <div>{rows}</div>
                </ConfirmDialog>
            </div>;
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const propsWithMoreActions = {
      ...defaultProps,
      header: 'Delete elements',
      validateAction: {
        label: 'Delete',
        onClick: () => console.log('ok'),
        bsStyle: 'danger'
      },
      secondaryActions: [{
        label: 'Show info',
        onClick: () => console.log('info'),
        bsStyle: 'info'
      }]
    };
    return <div>
                <h1>Dialog</h1>
                <ConfirmDialog {...propsWithMoreActions}>{children}</ConfirmDialog>
            </div>;
  }
}`,...g.parameters?.docs?.source}}};const fe=["Default","WithoutHeader","Small","Large","WithProgressBar","WithLotsOfContent","WithSecondaryActions"];export{a as Default,p as Large,d as Small,h as WithLotsOfContent,m as WithProgressBar,g as WithSecondaryActions,c as WithoutHeader,fe as __namedExportsOrder,ue as default};
