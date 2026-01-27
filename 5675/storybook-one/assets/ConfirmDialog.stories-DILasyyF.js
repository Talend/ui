import{j as e,P as o}from"./iframe-Fv_vVGZN.js";import{D as w}from"./Dialog.component-CA_uX00p.js";import{A as u}from"./Action.component-DU21-Msq.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionBar.component-DyH-MCwm.js";import"./Actions.component-r4v7brPZ.js";import"./OverlayTrigger.component-C19J5ewi.js";import"./RootCloseWrapper-C4S0M7VT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BDkcGskv.js";import"./Transition-CV9ZxHzg.js";import"./Transition-BMiB0AlX.js";import"./SplitButton-enRAsFA9.js";import"./inheritsLoose-CQRarj6Q.js";import"./ActionButton.component-BGrLFd2s.js";import"./TooltipTrigger.component-eBDOtZP9.js";import"./index-MMEptsc7.js";import"./CircularProgress.component-D0r9lOI7.js";import"./constants-CZYEPhht.js";import"./translate-D9s1Bjkz.js";import"./withTranslation-CTObs2UP.js";import"./Skeleton.component-D6yy3OnK.js";import"./index-CprQB1Z1.js";import"./theme-D6f1aVid.js";import"./ActionIconToggle.component-iHtCGVrb.js";import"./ActionSplitDropdown.component-DJmXjSVq.js";import"./Progress.component-8zixZisa.js";import"./Modal-CzHjwS7I.js";import"./removeClass-B-DUduzN.js";import"./get-Dtrs5e6d.js";import"./_baseGet-4_z8tnd-.js";import"./toString-Dlr6kBM4.js";import"./isSymbol-CNKm9IEk.js";import"./eq-McJnFt1I.js";import"./omit-BbxJ_pGP.js";import"./_setToString-B_239-ah.js";import"./_getTag-BnrjvEwI.js";import"./isArrayLike-CWL7q3nM.js";import"./DropdownButton-Dj19_MGA.js";function r({children:n,validateAction:i,secondaryActions:f,cancelAction:t,progressLabel:y,progressValue:C,onHide:D,...j}){const l={left:[],center:[],right:[]};t&&l.left.push(t),f&&(l.right=l.right.concat(f)),i&&l.right.push(i);let v;C&&(v={percent:C,tooltip:y});function k(A){return t&&t.onClick&&t.onClick(),D?D(A):null}return e.jsx(w,{progress:v,closeButton:!1,actionbar:{actions:l},onHide:k,...j,children:n})}r.displayName="ConfirmDialog";r.defaultValue={secondaryActions:[]};r.propTypes={header:o.string,size:o.oneOf(["small","large"]),children:o.oneOfType([o.element,o.arrayOf(o.element)]),show:o.bool,cancelAction:o.shape(u.propTypes),validateAction:o.shape(u.propTypes),secondaryActions:o.arrayOf(o.shape(u.propTypes)),progressLabel:o.string,progressValue:o.number,bodyOverflow:o.bool,onHide:o.func,getComponent:o.func};const b={header:"Hello world",show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},S={show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},P={show:!0,header:"Hello world",size:"small",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},O={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},x={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"},progressValue:66,progressLabel:"66%"},s=e.jsx("div",{children:"BODY content. You can put what ever you want here"}),ue={title:"Components/Layout/Modals/ConfirmDialog",component:r,tags:["autodocs"]},a={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...b,children:s})]})},c={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...S,children:s})]})},d={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...P,children:s})]})},p={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...O,children:s})]})},m={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:s})]})},h={render:()=>{const n=[];for(let i=0;i<50;i++)n.push(e.jsx("p",{children:"The content dictate the height"},i));return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:e.jsx("div",{children:n})})]})}},g={render:()=>{const n={...b,header:"Delete elements",validateAction:{label:"Delete",onClick:()=>console.log("ok"),bsStyle:"danger"},secondaryActions:[{label:"Show info",onClick:()=>console.log("info"),bsStyle:"info"}]};return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...n,children:s})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
