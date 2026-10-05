import{j as e,r as n}from"./iframe-CIjSn5tz.js";import{I as o}from"./InputDateTimePicker.component-CtYMveef.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-B_vVD8ma.js";import"./index-DEwWoTHW.js";import"./FocusManager.component-SNhu6vEh.js";import"./setSeconds-CVVotA5w.js";import"./locale-C8oY8SWt.js";import"./setYear-DMHYDl47.js";import"./index-CJHMEaqk.js";import"./index-CmKhz5V8.js";import"./Action.component-BI1o5Sl7.js";import"./ActionButton.component-CZCo9YBN.js";import"./TooltipTrigger.component-DYBUdnn7.js";import"./index-Dj1T5c1e.js";import"./CircularProgress.component-DxHX2pVC.js";import"./constants-CZYEPhht.js";import"./translate-Cz8atfjf.js";import"./withTranslation-Bd6kEzjU.js";import"./Skeleton.component-YNgJeGKl.js";import"./index-DrfhzOpD.js";import"./theme-B8ec9k2O.js";import"./OverlayTrigger.component-BZNC6jdh.js";import"./RootCloseWrapper-XbZehzmo.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DvTxt6cd.js";import"./Transition-CZF-CfGg.js";import"./Transition-2bQZcMoP.js";import"./ActionSplitDropdown.component-DvnehdHk.js";import"./SplitButton-RZcbEvCv.js";import"./inheritsLoose-BPjYtduK.js";import"./DropdownButton-OiVH4lZ2.js";import"./ActionIconToggle.component-tI4T2uoI.js";import"./locale-BFmai0lc.js";import"./Actions.component-CFUHM2Rx.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
