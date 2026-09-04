import{j as e,r as m}from"./iframe-Do9MkTTB.js";import{I as o}from"./InputDateTimePicker.component-DZ7Xs421.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D5n1gtMm.js";import"./omit-hj1fVQf8.js";import"./toString-DSXExHZS.js";import"./isSymbol-Bx5lGEtt.js";import"./_setToString-DY7q7weI.js";import"./_baseGet-jYYCWLwL.js";import"./eq-Bq5QjZni.js";import"./_getTag-CwuLMQhN.js";import"./isArrayLike-ZUl_Fg1l.js";import"./index-Dky4ZMrt.js";import"./FocusManager.component-DRn5CmNe.js";import"./setSeconds-Bxttaxnl.js";import"./locale-thci81l_.js";import"./setYear-tv31_-cm.js";import"./index-Bf7Dc89O.js";import"./index-InRK0CWC.js";import"./Action.component-B4OSEy6m.js";import"./ActionButton.component-2llTRVLN.js";import"./TooltipTrigger.component-BZ6GrODe.js";import"./index-BqJQNhAi.js";import"./CircularProgress.component-CZS3CNAl.js";import"./constants-CZYEPhht.js";import"./translate-Da30Cq5o.js";import"./withTranslation-DpYoDMdS.js";import"./Skeleton.component-CSSMiQZZ.js";import"./index-DmoB33Vx.js";import"./theme-DqWGs9jL.js";import"./OverlayTrigger.component-BSeuuoqm.js";import"./RootCloseWrapper-CmuOVIHm.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CnM3wOZM.js";import"./Transition-DzSe8eVs.js";import"./Transition-CDdRDE4G.js";import"./ActionSplitDropdown.component-B2j4EuU_.js";import"./SplitButton-CnIs2fxo.js";import"./inheritsLoose-Boj-Odam.js";import"./get-CEgWO4ky.js";import"./DropdownButton-Ck-fuHum.js";import"./ActionIconToggle.component-DUJO9ftK.js";import"./memoize-DG46Qt6M.js";import"./chunk-Du-B0h9b.js";import"./_isIterateeCall-Ca5GgYyQ.js";import"./toInteger-dRlKS84H.js";import"./toFinite-WHbGx8TK.js";import"./toNumber-8EiuPIvp.js";import"./locale-Dy06X_P1.js";import"./Actions.component-Sj5L0N-t.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
}`,...t.parameters?.docs?.source}}};const te=["FormModeDateTime","FormModeHybridDateTime"];export{i as FormModeDateTime,t as FormModeHybridDateTime,te as __namedExportsOrder,ie as default};
