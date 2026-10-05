import{j as e,r as n}from"./iframe-DOLJ-fPI.js";import{I as o}from"./InputDateTimePicker.component-CjfGN0Ek.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DEmHRBKL.js";import"./index-BaM0vmWJ.js";import"./FocusManager.component-CjjxPLJt.js";import"./setSeconds-Bw4t3Afe.js";import"./locale-Bv27pKUI.js";import"./setYear-CfcEP8_m.js";import"./index-DXoFipWI.js";import"./index-BbIN2Mse.js";import"./Action.component-BlMA_cRs.js";import"./ActionButton.component-Co80ip6C.js";import"./TooltipTrigger.component-3r0OvBj_.js";import"./index-CEpZgdjv.js";import"./CircularProgress.component-zFiix6Je.js";import"./constants-CZYEPhht.js";import"./translate-BhUX-_0a.js";import"./withTranslation-3N-wYMGa.js";import"./Skeleton.component-C0IdcxhU.js";import"./index-DH7on9Dq.js";import"./theme-CV9Ca-Q-.js";import"./OverlayTrigger.component-qw-RJj0R.js";import"./RootCloseWrapper-DQRPcFH1.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CC9mGFDv.js";import"./Transition-C_Nn8oeK.js";import"./Transition-DG3tvzIG.js";import"./ActionSplitDropdown.component-BekXhOnH.js";import"./SplitButton-D6b27zFw.js";import"./inheritsLoose-BT63Bloz.js";import"./DropdownButton-96ZRCyXT.js";import"./ActionIconToggle.component-hITRMOFK.js";import"./locale-DqEaPg0G.js";import"./Actions.component-C7IVCP7j.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  return <Fragment>
            <div style={{
      width: 150
    }}>
                <div> in form mode with validation and submit </div>
                <InputDateTimePicker id="my-date-picker" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime formMode required={false} useSeconds />
            </div>
        </Fragment>;
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  return <Fragment>
            <h3>Hybrid DateTime picker</h3>
            <p>For use when the independent input of date or time within one component is required</p>
            <div style={{
      width: 200
    }}>
                <div>With no preselected value</div>
                <InputDateTimePicker id="my-date-picker2" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode formMode />
                <div>With preselected time</div>
                <InputDateTimePicker id="my-date-picker2" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode selectedDateTime="14:33:00" formMode />
                <div>With preselected date</div>
                <InputDateTimePicker id="my-date-picker3" name="Datetime" onBlur={action('onBlur')} onChange={action('onChange')} useTime required={false} useSeconds hybridMode selectedDateTime="2012-12-12" formMode />
            </div>
        </Fragment>;
}`,...t.parameters?.docs?.source}}};const K=["FormModeDateTime","FormModeHybridDateTime"];export{i as FormModeDateTime,t as FormModeHybridDateTime,K as __namedExportsOrder,A as default};
