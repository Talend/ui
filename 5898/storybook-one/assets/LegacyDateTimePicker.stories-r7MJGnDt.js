import{j as e,r as n}from"./iframe-CaM4pCYv.js";import{I as o}from"./InputDateTimePicker.component-KBuAEq_N.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-alIGMGro.js";import"./index-IPI_gJky.js";import"./FocusManager.component-ClbLhlkP.js";import"./setSeconds-Rk1jX_a8.js";import"./locale-ehZSeiHj.js";import"./setYear-CQlo3sTW.js";import"./index-M-tf8MgB.js";import"./index-Dk8g1PGz.js";import"./Action.component-CZE9ZQF6.js";import"./ActionButton.component-C0ot--5y.js";import"./TooltipTrigger.component-BueHNT20.js";import"./index-DTwir-ZV.js";import"./CircularProgress.component-BGprhGdK.js";import"./constants-CZYEPhht.js";import"./translate-BYClF0Em.js";import"./withTranslation-dmg4-Q5z.js";import"./Skeleton.component-CnEYHeXI.js";import"./index-C9jwf_CE.js";import"./theme-VhsxeChM.js";import"./OverlayTrigger.component-CMwhMkOs.js";import"./RootCloseWrapper-BQusrErX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BuQcakZm.js";import"./Transition-CCocwTET.js";import"./Transition-ByM5Uw3w.js";import"./ActionSplitDropdown.component-ZOAoKQYy.js";import"./SplitButton-q_TkxrQy.js";import"./inheritsLoose-CN7rSwcY.js";import"./DropdownButton-IyHy4vIQ.js";import"./ActionIconToggle.component-Dxy5Hf60.js";import"./locale-y16cKWJG.js";import"./Actions.component-IWaOR18-.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
