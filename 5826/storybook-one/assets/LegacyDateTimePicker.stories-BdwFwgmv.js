import{j as e,r as m}from"./iframe-DX09XFlY.js";import{I as o}from"./InputDateTimePicker.component-0LaxsS_e.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BAtK_w8i.js";import"./omit-C-nlpjth.js";import"./toString-BJhpRwnP.js";import"./isSymbol-BoPaXQfS.js";import"./_setToString-BHWVSFsC.js";import"./_baseGet-DuPL4aBk.js";import"./eq-CsKuJzwX.js";import"./_getTag-fz8XCwtg.js";import"./isArrayLike-CglDIL7U.js";import"./index-DWIhsRv_.js";import"./FocusManager.component-FBqLkKc9.js";import"./setSeconds-CpbEHdsN.js";import"./locale-CYl-s5h2.js";import"./setYear-qmvd7b-8.js";import"./index-PI8_0Jed.js";import"./index-Q5e0ObXA.js";import"./Action.component-DSWSo5-6.js";import"./ActionButton.component-B8bAVOqx.js";import"./TooltipTrigger.component-DulIapz4.js";import"./index-ZHgZhXnL.js";import"./CircularProgress.component-DofxFAli.js";import"./constants-CZYEPhht.js";import"./translate-BxxfymuE.js";import"./withTranslation-hLMNO8CV.js";import"./Skeleton.component-BRSGPXFA.js";import"./index-B1R-hQ9g.js";import"./theme-BGUpvL97.js";import"./OverlayTrigger.component-DESIT7U0.js";import"./RootCloseWrapper-Dc0PA1K_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BGPwe-mJ.js";import"./Transition-Ngvp1HON.js";import"./Transition-D_GUK25g.js";import"./ActionSplitDropdown.component-CL7O_5P9.js";import"./SplitButton-3-OuN36h.js";import"./inheritsLoose-HOQlhI9f.js";import"./get-Yr5cAmls.js";import"./DropdownButton-DtdIlehY.js";import"./ActionIconToggle.component-M6OVIFAm.js";import"./memoize-D-q-w21X.js";import"./chunk-BTHdRfFK.js";import"./_isIterateeCall-CjwqhF2e.js";import"./toInteger-CUI-r8lB.js";import"./toFinite-DtHjtcGO.js";import"./toNumber-FxfqrMh0.js";import"./locale-BxJMYIIn.js";import"./Actions.component-BD52avh_.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
