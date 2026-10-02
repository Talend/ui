import{j as e,r as n}from"./iframe-IyTrQp3w.js";import{I as o}from"./InputDateTimePicker.component-CsNFyzOG.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DI8fmWKB.js";import"./index-hiPue-Jc.js";import"./FocusManager.component-Ceex2Tq7.js";import"./setSeconds-BksoDUzD.js";import"./locale-D3J9s9ZJ.js";import"./setYear-B8qd3Obt.js";import"./index-CxpTtWMB.js";import"./index-CiXI6pyl.js";import"./Action.component-BqcLHo0n.js";import"./ActionButton.component-BWqFhqON.js";import"./TooltipTrigger.component-BDZqU8wb.js";import"./index-DsD3ND4S.js";import"./CircularProgress.component-D_cyqiwC.js";import"./constants-CZYEPhht.js";import"./translate-Cj588R69.js";import"./withTranslation-CmUZ5poH.js";import"./Skeleton.component-ClLS45qJ.js";import"./index-DYM8FOsa.js";import"./theme-DHmMipUz.js";import"./OverlayTrigger.component-Bk2tKkUO.js";import"./RootCloseWrapper-B6F0gopa.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CX74NBF1.js";import"./Transition-C4HRJ7oA.js";import"./Transition-BLFS26dr.js";import"./ActionSplitDropdown.component-BNznQYdW.js";import"./SplitButton-CHSmRaiQ.js";import"./inheritsLoose-B1J5sroI.js";import"./DropdownButton-Dec0cFOK.js";import"./ActionIconToggle.component-VaY3wPL5.js";import"./locale-CoG7tSCU.js";import"./Actions.component-aYonatL1.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
