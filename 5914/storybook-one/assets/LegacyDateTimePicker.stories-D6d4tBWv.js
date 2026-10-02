import{j as e,r as n}from"./iframe-DMYygnnc.js";import{I as o}from"./InputDateTimePicker.component-B6XdXXUs.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DPPOuBNy.js";import"./index-BGudqb9a.js";import"./FocusManager.component-kxwJW1Va.js";import"./setSeconds-BoUPwKDQ.js";import"./locale-B5Zv7x9Z.js";import"./setYear-lUsPL041.js";import"./index-ifmf6sur.js";import"./index-C5AW5qOW.js";import"./Action.component-BYVcB2HU.js";import"./ActionButton.component-Dfh5U0ff.js";import"./TooltipTrigger.component-BlZkglGh.js";import"./index-gr0DNHBK.js";import"./CircularProgress.component-BsrCMjdW.js";import"./constants-CZYEPhht.js";import"./translate-BXBoSd0f.js";import"./withTranslation-CyucCgxt.js";import"./Skeleton.component-CMzkALFe.js";import"./index-DYiAIfAw.js";import"./theme-DkSTE3P1.js";import"./OverlayTrigger.component-43A9_uft.js";import"./RootCloseWrapper-BrrbSwFu.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CXD522Ua.js";import"./Transition-B7FF88VB.js";import"./Transition-Cv-VN0tb.js";import"./ActionSplitDropdown.component-BhC6vjzE.js";import"./SplitButton-JluruZ2w.js";import"./inheritsLoose-rE0GIGrX.js";import"./DropdownButton-1V4YTh6d.js";import"./ActionIconToggle.component-BKBlgTuM.js";import"./locale-Dg_o-iUL.js";import"./Actions.component-DEuWAkIT.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
