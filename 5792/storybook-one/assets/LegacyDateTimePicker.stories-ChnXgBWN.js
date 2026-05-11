import{j as e,r as m}from"./iframe-a6xiEYuy.js";import{I as o}from"./InputDateTimePicker.component-BL4Vr5wG.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-IVihwMf1.js";import"./omit-DbcP29q1.js";import"./toString-DtB-B3f9.js";import"./isSymbol-Cg5qelfb.js";import"./_setToString-ubMkSUoF.js";import"./_baseGet-Cz2lJXYo.js";import"./eq-n8YMwXX5.js";import"./_getTag-EwqW6hLy.js";import"./isArrayLike-DJHIFDtz.js";import"./index-DQcxTp4t.js";import"./FocusManager.component-DWc_wsCd.js";import"./setSeconds-DNcRsDBo.js";import"./locale-CY4saaaJ.js";import"./setYear-DWSaJ5RZ.js";import"./index-CoP-0gOE.js";import"./index-BDtk5PRO.js";import"./Action.component-DqtUqR0u.js";import"./ActionButton.component-cKy5g6LW.js";import"./TooltipTrigger.component-CITdH7pE.js";import"./index-BTcVgyDx.js";import"./CircularProgress.component-CH-1GiuP.js";import"./constants-CZYEPhht.js";import"./translate-BdRXs8yh.js";import"./withTranslation-BB2aKQbx.js";import"./Skeleton.component-DRPinVx-.js";import"./index-DwwAVDLO.js";import"./theme-BsVFmEJs.js";import"./OverlayTrigger.component-tx3JvTPu.js";import"./RootCloseWrapper-C0sV5jo_.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CerpRm2L.js";import"./Transition-D3zIP1lt.js";import"./Transition-D5bVNl6N.js";import"./ActionSplitDropdown.component-CxbDpLXj.js";import"./SplitButton-CrIWYVRv.js";import"./inheritsLoose-CKfnZvzy.js";import"./get-CuuORsUe.js";import"./DropdownButton-DpMSfSHH.js";import"./ActionIconToggle.component-ChddMXPM.js";import"./memoize-ZJp_3ky8.js";import"./chunk-BgY8viCx.js";import"./_isIterateeCall-DbSE2L-r.js";import"./toInteger-D74UchSU.js";import"./toFinite-Cl0yQ5rt.js";import"./toNumber-UwXCVx31.js";import"./locale-CEUyytsw.js";import"./Actions.component-2tUNKz7v.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
