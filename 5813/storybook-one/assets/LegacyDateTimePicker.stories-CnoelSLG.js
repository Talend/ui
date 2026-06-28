import{j as e,r as m}from"./iframe-B103sUzx.js";import{I as o}from"./InputDateTimePicker.component-BRi1TZhL.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CoqZQaka.js";import"./omit-BvPeIEf8.js";import"./toString-DhzgJs-I.js";import"./isSymbol-CzF2uldG.js";import"./_setToString-Dh8TuV2C.js";import"./_baseGet-DJW8rzEv.js";import"./eq-BLBaq9xX.js";import"./_getTag-CnFAYsTL.js";import"./isArrayLike-DpKYGo6T.js";import"./index-WoosrAQb.js";import"./FocusManager.component-BN8egDk2.js";import"./setSeconds-D1dkn823.js";import"./locale-B6DuSlzK.js";import"./setYear-Cz9n3fxc.js";import"./index-eqt-FPXJ.js";import"./index-BIvLFC97.js";import"./Action.component-BDIYEnlq.js";import"./ActionButton.component-Cki9NuM7.js";import"./TooltipTrigger.component-eMxhJlz6.js";import"./index-C4709orZ.js";import"./CircularProgress.component-j-bZtT2W.js";import"./constants-CZYEPhht.js";import"./translate-DRtMcB2y.js";import"./withTranslation-DYpnLnCb.js";import"./Skeleton.component-C35wTHLT.js";import"./index-DrLLf3GQ.js";import"./theme-Dr1j5G3A.js";import"./OverlayTrigger.component-kXR6qFfE.js";import"./RootCloseWrapper-BW1yOe35.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C1q8tzmP.js";import"./Transition-DeMFB2kt.js";import"./Transition-7OQpZWg0.js";import"./ActionSplitDropdown.component-DiHrIQ44.js";import"./SplitButton-Owc9Psca.js";import"./inheritsLoose-DUOmUqbJ.js";import"./get-CLIt06rP.js";import"./DropdownButton-nPhOik_8.js";import"./ActionIconToggle.component-DorkGkiF.js";import"./memoize-BfQry3Dm.js";import"./chunk-eWvB73XO.js";import"./_isIterateeCall-MTt-ekR3.js";import"./toInteger-Bkax-ccp.js";import"./toFinite-CMSkfE8x.js";import"./toNumber-CrWThM7i.js";import"./locale-FKIWnBOa.js";import"./Actions.component-BDXhs-py.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
