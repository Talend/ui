import{j as e,r as n}from"./iframe-C2JQcP4r.js";import{I as o}from"./InputDateTimePicker.component-BhrvNEXm.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CN8K9fPQ.js";import"./index-Q6G-RbHz.js";import"./FocusManager.component-Cml6dj6x.js";import"./setSeconds-DXX5Bf0N.js";import"./locale-CksFY2Je.js";import"./setYear-OSjxTApK.js";import"./index-56TBbBJu.js";import"./index-Qe0fhXVo.js";import"./Action.component-CC-ZQUN0.js";import"./ActionButton.component-BG4s1ruG.js";import"./TooltipTrigger.component-5kIn1CCC.js";import"./index-qzwUsuin.js";import"./CircularProgress.component-QbeJ5MeL.js";import"./constants-CZYEPhht.js";import"./translate-CJytpqYL.js";import"./withTranslation-C1ZsVOyo.js";import"./Skeleton.component-94IRDDR2.js";import"./index-CfIn3wW7.js";import"./theme-C9vmGKeV.js";import"./OverlayTrigger.component-BTlZON8h.js";import"./RootCloseWrapper-CwIzVC40.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DWllWhyX.js";import"./Transition-Cxazjzg-.js";import"./Transition-BoF2zojP.js";import"./ActionSplitDropdown.component-BsXBwVgI.js";import"./SplitButton-C3KfugAI.js";import"./inheritsLoose-CtOpWIrP.js";import"./DropdownButton--YOrYjqE.js";import"./ActionIconToggle.component-C8yDKO9X.js";import"./locale-QQPWF2pE.js";import"./Actions.component-C3Z_gHVd.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
