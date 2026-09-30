import{j as e,r as n}from"./iframe-a5Rf_AQR.js";import{I as o}from"./InputDateTimePicker.component-BdqKaXkq.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-AdZlvhHQ.js";import"./index-CoYo5lqI.js";import"./FocusManager.component-BBVLJaWc.js";import"./setSeconds-C5rzY2UB.js";import"./locale-Dt8-XB4q.js";import"./setYear-CKJjhaa0.js";import"./index-DHicgGcF.js";import"./index-DoAmz4W4.js";import"./Action.component-C2pS_h9i.js";import"./ActionButton.component-DNTsKO6k.js";import"./TooltipTrigger.component-BdD5xIR0.js";import"./index-vXVWXJXZ.js";import"./CircularProgress.component-9AViWkWO.js";import"./constants-CZYEPhht.js";import"./translate-CsaMLfJz.js";import"./withTranslation-DMeju75L.js";import"./Skeleton.component-BVX9Imcg.js";import"./index-CoXpFZ9y.js";import"./theme-DD6AZ0yJ.js";import"./OverlayTrigger.component-C-wv0t73.js";import"./RootCloseWrapper-DJD254Ku.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CkcRyA9V.js";import"./Transition-CMQYpQVe.js";import"./Transition-B0S2v8Mg.js";import"./ActionSplitDropdown.component-CpoRtLA7.js";import"./SplitButton-BBCiy7XH.js";import"./inheritsLoose-D93ogGyB.js";import"./DropdownButton-Cv0IJs82.js";import"./ActionIconToggle.component-C1jkDPhV.js";import"./locale-BNc3WflE.js";import"./Actions.component-yCTkE0NM.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
