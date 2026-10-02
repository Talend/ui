import{j as e,r as n}from"./iframe-DXyAJGfU.js";import{I as o}from"./InputDateTimePicker.component-DXWAypKj.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CE5HcchP.js";import"./index-CMCdPbJx.js";import"./FocusManager.component-CvM-JrfW.js";import"./setSeconds-BLHsPpps.js";import"./locale-CTft3p8W.js";import"./setYear-DdMSuDNQ.js";import"./index-CK_9ZMHD.js";import"./index-DSCvMTmm.js";import"./Action.component-C_y0V_7n.js";import"./ActionButton.component-DjcKnqfz.js";import"./TooltipTrigger.component-Bey2nKai.js";import"./index-Dq_0C1aK.js";import"./CircularProgress.component-DIjKUsDf.js";import"./constants-CZYEPhht.js";import"./translate-CkI8SF5C.js";import"./withTranslation-DYxrGKsj.js";import"./Skeleton.component-AnP1ik7f.js";import"./index-Cf4YeNrF.js";import"./theme-DTFWgmck.js";import"./OverlayTrigger.component-CjpGrhio.js";import"./RootCloseWrapper-CJ99hid4.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BFc59jFO.js";import"./Transition-Dm51_q3n.js";import"./Transition-BKI5exGd.js";import"./ActionSplitDropdown.component-C0Ga0KoM.js";import"./SplitButton-CZkV6LMn.js";import"./inheritsLoose-CvqH6a-T.js";import"./DropdownButton-DpAabnjI.js";import"./ActionIconToggle.component-BqByQGhz.js";import"./locale-BLAfh5ey.js";import"./Actions.component-D22MxnO2.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
