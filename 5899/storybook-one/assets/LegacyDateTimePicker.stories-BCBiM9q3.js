import{j as e,r as n}from"./iframe-DJiD4C-0.js";import{I as o}from"./InputDateTimePicker.component-D8Vy5pkJ.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-RJrfLdut.js";import"./index-C5-Ngfaw.js";import"./FocusManager.component-DWc8Wf43.js";import"./setSeconds-BiwFuvVq.js";import"./locale-OMWJGTci.js";import"./setYear-MgyFitL8.js";import"./index-pZbktKPF.js";import"./index-BfJgw5fX.js";import"./Action.component-BnB-hoxj.js";import"./ActionButton.component-DVsL5ubl.js";import"./TooltipTrigger.component-CdqnuISb.js";import"./index-DBRABzGQ.js";import"./CircularProgress.component-fxhCax-U.js";import"./constants-CZYEPhht.js";import"./translate-BCZirpKz.js";import"./withTranslation-C24mBudh.js";import"./Skeleton.component-og2Dwb9y.js";import"./index-DpqzPEmN.js";import"./theme-CUjkxWmc.js";import"./OverlayTrigger.component-BG5e1_ZY.js";import"./RootCloseWrapper-C1zC9sq6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B0SYvr8g.js";import"./Transition-C0m1IxG1.js";import"./Transition-TRtFWTTG.js";import"./ActionSplitDropdown.component-BjIEjlmC.js";import"./SplitButton-jw3mrHBR.js";import"./inheritsLoose-D6JO1C06.js";import"./DropdownButton-taqlB1WW.js";import"./ActionIconToggle.component-Cm0023Tj.js";import"./locale-CgEVH3wH.js";import"./Actions.component-4IcW9gb9.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
