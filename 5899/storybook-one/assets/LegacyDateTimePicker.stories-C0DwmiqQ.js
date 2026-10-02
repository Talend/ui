import{j as e,r as n}from"./iframe-CEkJ-dO3.js";import{I as o}from"./InputDateTimePicker.component-BBk0np7X.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Bwo1Sx58.js";import"./index-BLM8OqKD.js";import"./FocusManager.component-DOy-mCRN.js";import"./setSeconds-D-UO5wWF.js";import"./locale-BGgwjhio.js";import"./setYear-kocXLCZu.js";import"./index-DoU-W2F-.js";import"./index-DMyzW1Sq.js";import"./Action.component-Cn3xZOn-.js";import"./ActionButton.component-BQpTO_i_.js";import"./TooltipTrigger.component-CWV9K8-s.js";import"./index-DIYS691u.js";import"./CircularProgress.component-DL4qYQ0s.js";import"./constants-CZYEPhht.js";import"./translate-_-zhXNi2.js";import"./withTranslation-BD8D02dt.js";import"./Skeleton.component-B6ODzdkH.js";import"./index-BeB15Kik.js";import"./theme-TT1-Xmj3.js";import"./OverlayTrigger.component-DPESnu1C.js";import"./RootCloseWrapper-DVlRLBjn.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ChV4F-k8.js";import"./Transition-YOCg0Vws.js";import"./Transition-gaCAu0PX.js";import"./ActionSplitDropdown.component-FASG4wm6.js";import"./SplitButton-kINTaGkh.js";import"./inheritsLoose-D_WY8tVG.js";import"./DropdownButton-Dw4wLAxM.js";import"./ActionIconToggle.component-DSY0KEsu.js";import"./locale-ahrDuq8b.js";import"./Actions.component-C0EZRGwq.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
