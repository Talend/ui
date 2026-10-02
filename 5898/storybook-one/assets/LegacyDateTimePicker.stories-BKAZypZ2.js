import{j as e,r as n}from"./iframe-D7ss8w5A.js";import{I as o}from"./InputDateTimePicker.component-i8FqLY4n.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DXSDRf-7.js";import"./index-BiB9TttI.js";import"./FocusManager.component-BOHB5K2P.js";import"./setSeconds-DzJOahNU.js";import"./locale-D8tzDv7e.js";import"./setYear-Dh5ULVh6.js";import"./index-Df9vGiEp.js";import"./index-CBqCWqiu.js";import"./Action.component-ClKya2nf.js";import"./ActionButton.component-BvXYpkAa.js";import"./TooltipTrigger.component-BVcyaa0s.js";import"./index-BoaXdCls.js";import"./CircularProgress.component-CONIfxTO.js";import"./constants-CZYEPhht.js";import"./translate-XcseDaOQ.js";import"./withTranslation-DLUlYqN0.js";import"./Skeleton.component-hXCKjcJ4.js";import"./index-BRmW9b-V.js";import"./theme-BEfxuR5s.js";import"./OverlayTrigger.component-CfYL7Wf-.js";import"./RootCloseWrapper-CoEs2ivG.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpfC2rzt.js";import"./Transition-hSDJ7ZrG.js";import"./Transition-B15LKM9o.js";import"./ActionSplitDropdown.component-CaFtRraD.js";import"./SplitButton-DFEqt2R3.js";import"./inheritsLoose-VyzycbeX.js";import"./DropdownButton-_WobVVx9.js";import"./ActionIconToggle.component-CDiHxiy0.js";import"./locale-3zNOt66U.js";import"./Actions.component-5dF1K6UW.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
