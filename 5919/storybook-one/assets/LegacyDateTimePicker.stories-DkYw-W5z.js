import{j as e,r as n}from"./iframe-SKm5afGR.js";import{I as o}from"./InputDateTimePicker.component-CYPK_Pgq.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BqCdOxHy.js";import"./index-Cs_-r44A.js";import"./FocusManager.component-JH0l5rG_.js";import"./setSeconds-2BZ_e2mp.js";import"./locale-MsHLc9aD.js";import"./setYear-B3Xb8lne.js";import"./index-BFCNDHHq.js";import"./index-Cvl8y4P7.js";import"./Action.component-DmzN_EWn.js";import"./ActionButton.component-CmjmCagI.js";import"./TooltipTrigger.component-DQg3YoHy.js";import"./index-CPW3g4LR.js";import"./CircularProgress.component-DIb9Hk7L.js";import"./constants-CZYEPhht.js";import"./translate-CEiihR1l.js";import"./withTranslation-CU-bJQye.js";import"./Skeleton.component-TmQiub_B.js";import"./index-v4RqFekH.js";import"./theme-7OSfQ_Pi.js";import"./OverlayTrigger.component-Bos5hxc-.js";import"./RootCloseWrapper-CZqf_b6r.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C-ecfSAo.js";import"./Transition-CfDEhTwS.js";import"./Transition-BbNCJNUs.js";import"./ActionSplitDropdown.component-BL_7AD4x.js";import"./SplitButton-DsxUKcrb.js";import"./inheritsLoose-DzhaYN07.js";import"./DropdownButton-B1nQqDKW.js";import"./ActionIconToggle.component-BUXRR5Yy.js";import"./locale-zHNqFxUw.js";import"./Actions.component-ClmXVcty.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
