import{j as e,r as n}from"./iframe-Bs6nKxqG.js";import{I as o}from"./InputDateTimePicker.component-my37joRo.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CcEqMzTv.js";import"./index-DXVEdLQy.js";import"./FocusManager.component-BXfN1Yt_.js";import"./setSeconds-Bp9Bj0FA.js";import"./locale-BkS7kqzG.js";import"./setYear-DH2AxRyi.js";import"./index-D9-4cH02.js";import"./index-mbitjNzs.js";import"./Action.component-Dra-XOYJ.js";import"./ActionButton.component-C5GGY9iW.js";import"./TooltipTrigger.component-B6vk0TvW.js";import"./index-nPCYZ0j6.js";import"./CircularProgress.component-0Y81bwHY.js";import"./constants-CZYEPhht.js";import"./translate-Dy-c5UEY.js";import"./withTranslation-CtMkTZA3.js";import"./Skeleton.component-D8PApyCg.js";import"./index-Bh5P-VSB.js";import"./theme-BD1DLp9S.js";import"./OverlayTrigger.component-DB_lcYWp.js";import"./RootCloseWrapper-BTjGJKb5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Ct2DLi4C.js";import"./Transition-C8kM9jgP.js";import"./Transition-DsqEW0ZQ.js";import"./ActionSplitDropdown.component-DiNAHDoR.js";import"./SplitButton-pCyzCEif.js";import"./inheritsLoose-CEe19dPH.js";import"./DropdownButton-DNzsI0CR.js";import"./ActionIconToggle.component-CeSo2H-5.js";import"./locale-DXxb4CJH.js";import"./Actions.component-BG6xKRfk.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
