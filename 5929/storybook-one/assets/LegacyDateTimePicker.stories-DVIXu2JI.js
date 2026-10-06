import{j as e,r as n}from"./iframe-BBYQFaf-.js";import{I as o}from"./InputDateTimePicker.component-LC1_Lm-B.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-C8e5I6PP.js";import"./index-DY8yLYGJ.js";import"./FocusManager.component-DXxqZum-.js";import"./setSeconds-BGmowbYt.js";import"./locale-CahACZmk.js";import"./setYear-CWnk2xWs.js";import"./index-DZgGjBO1.js";import"./index-acXvn1zH.js";import"./Action.component-B9VcFDzJ.js";import"./ActionButton.component-CZV3KmZo.js";import"./TooltipTrigger.component-BFwl66fI.js";import"./index-GmTTOzur.js";import"./CircularProgress.component-7uTdu2HS.js";import"./constants-CZYEPhht.js";import"./translate-BtQKkx6u.js";import"./withTranslation-Bxt6NXNq.js";import"./Skeleton.component-DhX8TcO6.js";import"./index-BDW0Unf8.js";import"./theme-B4Q2yiSF.js";import"./OverlayTrigger.component-BcBpuOBK.js";import"./RootCloseWrapper-z9QGwfQt.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B5vup_oD.js";import"./Transition-xW7kx1K3.js";import"./Transition-DZh_DNCi.js";import"./ActionSplitDropdown.component-iEaSbAg6.js";import"./SplitButton-DiMHGbNq.js";import"./inheritsLoose-Bhz8e1Tw.js";import"./DropdownButton-C_s2Y8nd.js";import"./ActionIconToggle.component-Ck_MGAn9.js";import"./locale-B4RlnhE8.js";import"./Actions.component-BmAHY5sX.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
