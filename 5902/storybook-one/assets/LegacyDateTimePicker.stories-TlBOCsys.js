import{j as e,r as n}from"./iframe-BQEEiZRV.js";import{I as o}from"./InputDateTimePicker.component-DJJEbU9z.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-C4IociZq.js";import"./index-DzF2KCRb.js";import"./FocusManager.component-CZagYCIJ.js";import"./setSeconds-vO0SI6sc.js";import"./locale-BcGT2m1r.js";import"./setYear-BTlSwEoe.js";import"./index-N7oSttiG.js";import"./index-CFeD03Ge.js";import"./Action.component-B--dv5VL.js";import"./ActionButton.component-8HHrM9Qn.js";import"./TooltipTrigger.component-BAsIK6_B.js";import"./index-D4k-9F7L.js";import"./CircularProgress.component-COIHK1Ps.js";import"./constants-CZYEPhht.js";import"./translate-DtsfgApf.js";import"./withTranslation-DD5bijEW.js";import"./Skeleton.component-DaxO-5F7.js";import"./index-BrkDvxo5.js";import"./theme-CHdsOZuJ.js";import"./OverlayTrigger.component-rcexGgTF.js";import"./RootCloseWrapper-DkaxUEUD.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DX7031yL.js";import"./Transition-B9b2qDfo.js";import"./Transition-BPKUexP_.js";import"./ActionSplitDropdown.component-B5kEziLw.js";import"./SplitButton-Cc4i-rrH.js";import"./inheritsLoose-B-gjyeBc.js";import"./DropdownButton-bx3m8i2K.js";import"./ActionIconToggle.component-BmYSilDj.js";import"./locale-UAbWA3Rh.js";import"./Actions.component-DGzWT6yE.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
