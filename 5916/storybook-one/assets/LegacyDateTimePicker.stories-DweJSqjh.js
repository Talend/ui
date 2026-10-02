import{j as e,r as n}from"./iframe-CWO44ICj.js";import{I as o}from"./InputDateTimePicker.component-B_TPDyKR.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-qmYPYzVm.js";import"./index-C8hkzrY-.js";import"./FocusManager.component-C38sqC62.js";import"./setSeconds-B0RYk_HP.js";import"./locale-BEZG5NS7.js";import"./setYear-dZ68JGpZ.js";import"./index-Za00U789.js";import"./index-_QOrKSLy.js";import"./Action.component-BloZ-tkV.js";import"./ActionButton.component-DBNFoi4U.js";import"./TooltipTrigger.component-BJ4uN8Lw.js";import"./index-Bm3UUPxe.js";import"./CircularProgress.component-5lZ-BlMq.js";import"./constants-CZYEPhht.js";import"./translate-QxJ2kByD.js";import"./withTranslation-CdvT9usZ.js";import"./Skeleton.component-BePEJJdZ.js";import"./index-IUDFaUcS.js";import"./theme-Dv3ZnZnO.js";import"./OverlayTrigger.component-JMJOGulL.js";import"./RootCloseWrapper-D1eYAWOa.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cv0eSLqu.js";import"./Transition-Cn72OOjP.js";import"./Transition-j0K6HskJ.js";import"./ActionSplitDropdown.component-D4ipV-N3.js";import"./SplitButton-Da7K2JMK.js";import"./inheritsLoose-BzEmE2OM.js";import"./DropdownButton-fjbkCTr9.js";import"./ActionIconToggle.component-3Zss0yWQ.js";import"./locale-5AhelXER.js";import"./Actions.component-B4pi7sY1.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
