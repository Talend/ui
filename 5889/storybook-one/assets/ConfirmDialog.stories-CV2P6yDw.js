import{j as e,aa as o}from"./iframe-2ufzqGgU.js";import{D as w}from"./Dialog.component-CQq-QQBQ.js";import{A as u}from"./Action.component-C03D_KEI.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionBar.component-BkVYxDvb.js";import"./Actions.component-D29yjmqS.js";import"./OverlayTrigger.component-BDLl_LQp.js";import"./RootCloseWrapper-BqrPI3WZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cr9jbfne.js";import"./Transition-DSfwVrgn.js";import"./Transition-BKQqByaB.js";import"./SplitButton-C_J8f8Z7.js";import"./inheritsLoose-C5iVoILh.js";import"./ActionButton.component-CwypvZR9.js";import"./TooltipTrigger.component-BJsj5tvb.js";import"./index-CSKw7C4M.js";import"./CircularProgress.component-DzkV6M2Y.js";import"./constants-CZYEPhht.js";import"./translate-0yJbfsdh.js";import"./withTranslation-DoNzQl1-.js";import"./Skeleton.component-BPSXOHWw.js";import"./index-zz5sWUfT.js";import"./theme-BdUZ5v26.js";import"./ActionIconToggle.component-MwRVlC9d.js";import"./ActionSplitDropdown.component-B399NJ3M.js";import"./Progress.component-CY-gbuLj.js";import"./Modal-j9Frohtt.js";import"./removeClass-B-DUduzN.js";import"./DropdownButton-DQZBVSqQ.js";function r({children:n,validateAction:i,secondaryActions:f,cancelAction:l,progressLabel:y,progressValue:C,onHide:D,...j}){const a={left:[],center:[],right:[]};l&&a.left.push(l),f&&(a.right=a.right.concat(f)),i&&a.right.push(i);let v;C&&(v={percent:C,tooltip:y});function k(A){return l&&l.onClick&&l.onClick(),D?D(A):null}return e.jsx(w,{progress:v,closeButton:!1,actionbar:{actions:a},onHide:k,...j,children:n})}r.displayName="ConfirmDialog";r.defaultValue={secondaryActions:[]};r.propTypes={header:o.string,size:o.oneOf(["small","large"]),children:o.oneOfType([o.element,o.arrayOf(o.element)]),show:o.bool,cancelAction:o.shape(u.propTypes),validateAction:o.shape(u.propTypes),secondaryActions:o.arrayOf(o.shape(u.propTypes)),progressLabel:o.string,progressValue:o.number,bodyOverflow:o.bool,onHide:o.func,getComponent:o.func};const b={header:"Hello world",show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},S={show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},P={show:!0,header:"Hello world",size:"small",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},O={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},x={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"},progressValue:66,progressLabel:"66%"},s=e.jsx("div",{children:"BODY content. You can put what ever you want here"}),le={title:"Components/Layout/Modals/ConfirmDialog",component:r,tags:["autodocs"]},t={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...b,children:s})]})},c={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...S,children:s})]})},d={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...P,children:s})]})},p={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...O,children:s})]})},m={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:s})]})},h={render:()=>{const n=[];for(let i=0;i<50;i++)n.push(e.jsx("p",{children:"The content dictate the height"},i));return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:e.jsx("div",{children:n})})]})}},g={render:()=>{const n={...b,header:"Delete elements",validateAction:{label:"Delete",onClick:()=>console.log("ok"),bsStyle:"danger"},secondaryActions:[{label:"Show info",onClick:()=>console.log("info"),bsStyle:"info"}]};return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...n,children:s})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div>
            <h1>Dialog</h1>
            <ConfirmDialog {...defaultProps}>{children}</ConfirmDialog>
        </div>
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const ae=["Default","WithoutHeader","Small","Large","WithProgressBar","WithLotsOfContent","WithSecondaryActions"];export{t as Default,p as Large,d as Small,h as WithLotsOfContent,m as WithProgressBar,g as WithSecondaryActions,c as WithoutHeader,ae as __namedExportsOrder,le as default};
