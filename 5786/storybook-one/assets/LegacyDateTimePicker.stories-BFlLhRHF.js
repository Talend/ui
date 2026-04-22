import{j as e,r as m}from"./iframe-Dh7VbQiA.js";import{I as o}from"./InputDateTimePicker.component-CxRYWtK-.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Bx0R9rKM.js";import"./omit-DG4IBbq5.js";import"./toString-DfqiTAWZ.js";import"./isSymbol-BxSERxOF.js";import"./_setToString-CRSykUKT.js";import"./_baseGet-HcE5cbRy.js";import"./eq-DHjFRxjv.js";import"./_getTag-BxTQTySV.js";import"./isArrayLike-xIqzFimc.js";import"./index-TMVE95nf.js";import"./FocusManager.component-D06nD1Ki.js";import"./setSeconds-JqsYHqyB.js";import"./locale-Df62gcgX.js";import"./setYear-CaRizVsM.js";import"./index-DVHYiiSR.js";import"./index-DxwQsrrp.js";import"./Action.component-bYYX-yG8.js";import"./ActionButton.component-CT33y5jt.js";import"./TooltipTrigger.component-CWGfWXze.js";import"./index-7CgzCUF8.js";import"./CircularProgress.component-BYyEV4F_.js";import"./constants-CZYEPhht.js";import"./translate-BGSUX0hC.js";import"./withTranslation-CcRbPA83.js";import"./Skeleton.component-DSr5GhCi.js";import"./index-Cq8HUum5.js";import"./theme-DybafV9H.js";import"./OverlayTrigger.component-pTo8-PwH.js";import"./RootCloseWrapper-CgM3JVZy.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-q_n5B-Zf.js";import"./Transition-jOZTDWha.js";import"./Transition-D37FQ5H8.js";import"./ActionSplitDropdown.component-DNVnBd2g.js";import"./SplitButton-1fDE41bR.js";import"./inheritsLoose-CcK1r-La.js";import"./get-BZbnIL66.js";import"./DropdownButton-BlrvHer1.js";import"./ActionIconToggle.component-DLpznuWB.js";import"./memoize-C1d0izY7.js";import"./chunk-DL9ewoPc.js";import"./_isIterateeCall-CcJ8Shqv.js";import"./toInteger-CA2F4MsF.js";import"./toFinite-DaV3eHxz.js";import"./toNumber-UcIoSUGC.js";import"./locale-D6FVHBK3.js";import"./Actions.component-XK2YXxUy.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
