import{j as e,r as n}from"./iframe-Cfph2DnH.js";import{I as o}from"./InputDateTimePicker.component-CpianD18.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-cx4IBkRT.js";import"./index-BMc5exqt.js";import"./FocusManager.component-CxRWPls-.js";import"./setSeconds-DV9HjPRe.js";import"./locale-CMlNLaF7.js";import"./setYear-DOCXpCWf.js";import"./index-BtJZfqke.js";import"./index-qmTUW6dD.js";import"./Action.component-B0yXGqfc.js";import"./ActionButton.component-Bx0SysYG.js";import"./TooltipTrigger.component-Cdj-2FPD.js";import"./index-CsIHMGve.js";import"./CircularProgress.component-CckIFTx5.js";import"./constants-CZYEPhht.js";import"./translate-zaNK4eyE.js";import"./withTranslation-DyhivlV8.js";import"./Skeleton.component-DwjJUeXs.js";import"./index-D6BxuZjr.js";import"./theme-1JUgSmKD.js";import"./OverlayTrigger.component-D2NurrbH.js";import"./RootCloseWrapper-CBgf09w_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CglAm0Hz.js";import"./Transition-COY8w3Hq.js";import"./Transition-LGSW0rRl.js";import"./ActionSplitDropdown.component-CKHva0tX.js";import"./SplitButton-BQxlrn_Z.js";import"./inheritsLoose-BrwQGNDA.js";import"./DropdownButton-bH_U98sw.js";import"./ActionIconToggle.component-DHhobi5S.js";import"./locale-D-K8eJeG.js";import"./Actions.component-Dbgt2pKG.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
