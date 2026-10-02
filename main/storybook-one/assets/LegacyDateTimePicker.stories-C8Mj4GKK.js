import{j as e,r as n}from"./iframe-Cs1iKGF6.js";import{I as o}from"./InputDateTimePicker.component-DQwLf2hU.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-NhgvPrHZ.js";import"./index-DOR_C8M-.js";import"./FocusManager.component-CsYNjXOx.js";import"./setSeconds-B-1VAv-e.js";import"./locale-NQD-TtXA.js";import"./setYear-Bwznguoz.js";import"./index-aQ15ksH_.js";import"./index-CDJnoz_X.js";import"./Action.component-CBos6Cyo.js";import"./ActionButton.component-BE27to8l.js";import"./TooltipTrigger.component-YINnM2k-.js";import"./index-D1orNG-G.js";import"./CircularProgress.component-BmSgZZGe.js";import"./constants-CZYEPhht.js";import"./translate-CQ9gSqY7.js";import"./withTranslation-BnNn1aP7.js";import"./Skeleton.component-sgTf02Hd.js";import"./index-CrRtVAVg.js";import"./theme-CAzTxADl.js";import"./OverlayTrigger.component-d0or2etY.js";import"./RootCloseWrapper-C5TjY85t.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-OoGe5lSc.js";import"./Transition-C29NDQ4c.js";import"./Transition-BRPTpux0.js";import"./ActionSplitDropdown.component-EhqGzbnN.js";import"./SplitButton-C0AABibr.js";import"./inheritsLoose-DJnvDLyP.js";import"./DropdownButton-BDfFg58O.js";import"./ActionIconToggle.component-CWmmY1Qs.js";import"./locale-2oCtipjF.js";import"./Actions.component-D1p8bjF6.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
