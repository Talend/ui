import{j as e,r as n}from"./iframe-BpHPnehy.js";import{I as o}from"./InputDateTimePicker.component-BXmJF0yd.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CeC1aTTD.js";import"./index-Dsx11pWV.js";import"./FocusManager.component-DqPsQ7NM.js";import"./setSeconds-BmveiOTZ.js";import"./locale-CrvlMb61.js";import"./setYear-BydiCRuy.js";import"./index-hWAFBLXC.js";import"./index-D098i322.js";import"./Action.component-Bem806fA.js";import"./ActionButton.component-Mqqkz04I.js";import"./TooltipTrigger.component-CTcUmZRa.js";import"./index-GeNoR4Be.js";import"./CircularProgress.component-CFmgaqkz.js";import"./constants-CZYEPhht.js";import"./translate-Nmgh_wQP.js";import"./withTranslation-COCjSCag.js";import"./Skeleton.component-BaRg1Dgr.js";import"./index-CP74lAEa.js";import"./theme-CjF-M1xI.js";import"./OverlayTrigger.component-CYkKPrYu.js";import"./RootCloseWrapper-CGX1yvw4.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DsCAXCWn.js";import"./Transition-CYGy_rvE.js";import"./Transition-DblCj8s-.js";import"./ActionSplitDropdown.component-D09ZIT4b.js";import"./SplitButton-DPm_QReI.js";import"./inheritsLoose-QOZuaEVW.js";import"./DropdownButton-xR9rB9iF.js";import"./ActionIconToggle.component-CuP-yQrL.js";import"./locale-jnxrSwkB.js";import"./Actions.component-CpJ50iSx.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
