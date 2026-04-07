import{j as e,r as m}from"./iframe-BSz8vrfY.js";import{I as o}from"./InputDateTimePicker.component-DHUHckD4.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DD5QA70L.js";import"./omit-CeFrI3J6.js";import"./toString-DUCbBMsG.js";import"./isSymbol-iQ5ybfyV.js";import"./_setToString-84T2O85k.js";import"./_baseGet-DMDd9vcj.js";import"./eq-BHBdTl8g.js";import"./_getTag-BOI4WlkC.js";import"./isArrayLike-Mcz7Mxgi.js";import"./index-C5YqwKre.js";import"./FocusManager.component-BaIrfzYF.js";import"./setSeconds-TzzWwjLu.js";import"./locale-Blw_NGgx.js";import"./setYear-BQRIKtOm.js";import"./index-C4aL7ShN.js";import"./index-DfRm0hD7.js";import"./Action.component-BrhEH71p.js";import"./ActionButton.component-BTbU08-U.js";import"./TooltipTrigger.component-DUDXLG6K.js";import"./index-DSLVRfwH.js";import"./CircularProgress.component-DCy-0alI.js";import"./constants-CZYEPhht.js";import"./translate-CtJTLw1v.js";import"./withTranslation-C3cS2IQG.js";import"./Skeleton.component-D41QE2CR.js";import"./index-B5UpSaAr.js";import"./theme-C0W7qRlo.js";import"./OverlayTrigger.component-DvpbEPYL.js";import"./RootCloseWrapper-DB7QGOev.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B_1sO96Q.js";import"./Transition-DvW7H1s9.js";import"./Transition-DyFP2-hp.js";import"./ActionSplitDropdown.component-fddWVN-h.js";import"./SplitButton-DAYBYkMo.js";import"./inheritsLoose-jxwFaUeB.js";import"./get-CTTh00M_.js";import"./DropdownButton-BwQ3aYRe.js";import"./ActionIconToggle.component-DYzNyzR9.js";import"./memoize-CVhWAueP.js";import"./chunk-Dnf9Aopj.js";import"./_isIterateeCall-DXcu_r6y.js";import"./toInteger-BKVljSpJ.js";import"./toFinite-Dj-KFgjK.js";import"./toNumber-C-Hh_Jnn.js";import"./locale-CWPB9IXq.js";import"./Actions.component-CCn5uskd.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
