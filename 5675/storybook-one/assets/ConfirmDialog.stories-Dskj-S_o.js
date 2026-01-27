import{j as e,P as o}from"./iframe-DIB3-0BR.js";import{D as w}from"./Dialog.component-DOFj4JY8.js";import{A as u}from"./Action.component-DH-GAoec.js";import"./preload-helper-PPVm8Dsz.js";import"./ActionBar.component-BxHo0lB0.js";import"./Actions.component-CD5rCVBo.js";import"./OverlayTrigger.component-DK-wOvtE.js";import"./RootCloseWrapper-BoYIv9I_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ClBq45ZB.js";import"./Transition-DIDeI3r7.js";import"./Transition-Dw8bnBfP.js";import"./SplitButton-BMIBksG4.js";import"./inheritsLoose-DL4FPuFe.js";import"./ActionButton.component-DQTMc3aF.js";import"./TooltipTrigger.component-CVMfTS1k.js";import"./index-pFY2HaYN.js";import"./CircularProgress.component-CgPW_-zP.js";import"./constants-CZYEPhht.js";import"./translate-Cb2TG_Ch.js";import"./withTranslation-C93BmHMx.js";import"./Skeleton.component-ByoA-jbm.js";import"./index-DOjBLebZ.js";import"./theme-DaJrfx0F.js";import"./ActionIconToggle.component-CsrdTqc8.js";import"./ActionSplitDropdown.component-qEyNazAr.js";import"./Progress.component-DIbQetou.js";import"./Modal-Tyk5NWGs.js";import"./removeClass-B-DUduzN.js";import"./get-YPPIQngb.js";import"./_baseGet-Ct5VDv7d.js";import"./toString-B57_GXo2.js";import"./isSymbol-B6o2xB3b.js";import"./eq-w3r5tFL9.js";import"./omit-7Cusbh4T.js";import"./_setToString-DajbfPCu.js";import"./_getTag-UecFYJaC.js";import"./isArrayLike-OVmvncqg.js";import"./DropdownButton-C6bBdUBg.js";function r({children:n,validateAction:i,secondaryActions:f,cancelAction:t,progressLabel:y,progressValue:C,onHide:D,...j}){const l={left:[],center:[],right:[]};t&&l.left.push(t),f&&(l.right=l.right.concat(f)),i&&l.right.push(i);let v;C&&(v={percent:C,tooltip:y});function k(A){return t&&t.onClick&&t.onClick(),D?D(A):null}return e.jsx(w,{progress:v,closeButton:!1,actionbar:{actions:l},onHide:k,...j,children:n})}r.displayName="ConfirmDialog";r.defaultValue={secondaryActions:[]};r.propTypes={header:o.string,size:o.oneOf(["small","large"]),children:o.oneOfType([o.element,o.arrayOf(o.element)]),show:o.bool,cancelAction:o.shape(u.propTypes),validateAction:o.shape(u.propTypes),secondaryActions:o.arrayOf(o.shape(u.propTypes)),progressLabel:o.string,progressValue:o.number,bodyOverflow:o.bool,onHide:o.func,getComponent:o.func};const b={header:"Hello world",show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},S={show:!0,validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},P={show:!0,header:"Hello world",size:"small",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},O={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"}},x={show:!0,header:"Hello world",size:"large",validateAction:{label:"OK",onClick:()=>console.log("ok"),bsStyle:"primary"},cancelAction:{label:"CANCEL",onClick:()=>console.log("cancel"),className:"btn-inverse"},progressValue:66,progressLabel:"66%"},s=e.jsx("div",{children:"BODY content. You can put what ever you want here"}),ue={title:"Components/Layout/Modals/ConfirmDialog",component:r,tags:["autodocs"]},a={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...b,children:s})]})},c={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...S,children:s})]})},d={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...P,children:s})]})},p={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...O,children:s})]})},m={render:()=>e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:s})]})},h={render:()=>{const n=[];for(let i=0;i<50;i++)n.push(e.jsx("p",{children:"The content dictate the height"},i));return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...x,children:e.jsx("div",{children:n})})]})}},g={render:()=>{const n={...b,header:"Delete elements",validateAction:{label:"Delete",onClick:()=>console.log("ok"),bsStyle:"danger"},secondaryActions:[{label:"Show info",onClick:()=>console.log("info"),bsStyle:"info"}]};return e.jsxs("div",{children:[e.jsx("h1",{children:"Dialog"}),e.jsx(r,{...n,children:s})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
