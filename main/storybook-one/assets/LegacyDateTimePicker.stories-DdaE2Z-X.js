import{j as e,r as n}from"./iframe-BlVYFGTi.js";import{I as o}from"./InputDateTimePicker.component-CyEphLpQ.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CGvmoEyH.js";import"./index-DAOF5XUb.js";import"./FocusManager.component-CrmvKZQf.js";import"./setSeconds-aUFVzz3D.js";import"./locale-BbuCLn1l.js";import"./setYear-CIhUYDxc.js";import"./index-DzFIr7-i.js";import"./index-s0BpJyU5.js";import"./Action.component-DYtMuoCk.js";import"./ActionButton.component-DeSUxjyA.js";import"./TooltipTrigger.component-DBOcDPoX.js";import"./index-CrOjQEPX.js";import"./CircularProgress.component-jbJZ5abs.js";import"./constants-CZYEPhht.js";import"./translate-G8g0CnDN.js";import"./withTranslation-Brs3RRnt.js";import"./Skeleton.component-DG2_Bjfe.js";import"./index-4zTDRxxt.js";import"./theme-DY0an3yU.js";import"./OverlayTrigger.component-BIBECa0Q.js";import"./RootCloseWrapper-isyYo1yf.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DaErbT6j.js";import"./Transition-CflGRc79.js";import"./Transition-BG9YA1Xj.js";import"./ActionSplitDropdown.component-BzhaFSjp.js";import"./SplitButton-ChxX6g7S.js";import"./inheritsLoose-M-rJplcw.js";import"./DropdownButton-CX0GGuzE.js";import"./ActionIconToggle.component-BnTxNG37.js";import"./locale-CEriA6Tz.js";import"./Actions.component-CJzwMJMJ.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
