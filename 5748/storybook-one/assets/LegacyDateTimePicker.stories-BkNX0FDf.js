import{j as e,r as m}from"./iframe-Bl7tTCpu.js";import{I as o}from"./InputDateTimePicker.component-s-C9vuof.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Bt06V1V1.js";import"./omit-CGGb0KYE.js";import"./toString-BDRN21-n.js";import"./isSymbol-BQNBFodK.js";import"./_setToString-DGV72ImX.js";import"./_baseGet-BTf-ABXs.js";import"./eq-BYqYf7pb.js";import"./_getTag-mUiNMJM-.js";import"./isArrayLike-DfNKs8fL.js";import"./index-1JFeOidx.js";import"./FocusManager.component-jF_P2YCv.js";import"./setSeconds-MfM0coq7.js";import"./locale-CKRBCBiB.js";import"./setYear-BUSQjXsi.js";import"./index-UnCaggew.js";import"./index-DKZc_3zN.js";import"./Action.component-CHtqNjwc.js";import"./ActionButton.component-Dn22dGR0.js";import"./TooltipTrigger.component-_1_3taz4.js";import"./index-CK21R32n.js";import"./CircularProgress.component-DfVIk94t.js";import"./constants-CZYEPhht.js";import"./translate-SSGdWeYe.js";import"./withTranslation-Cg70oZeD.js";import"./Skeleton.component-ksJXp5VB.js";import"./index-ClSbUYTE.js";import"./theme-CY0lAqA7.js";import"./OverlayTrigger.component-DDFdmF3z.js";import"./RootCloseWrapper-Cti4e6c-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CZbUNA5w.js";import"./Transition-BIKS9pJ4.js";import"./Transition-Bf7nV51V.js";import"./ActionSplitDropdown.component-BNFKN-87.js";import"./SplitButton-FcKZr7LO.js";import"./inheritsLoose-D8nHgM7Z.js";import"./get-CkvdNgkq.js";import"./DropdownButton-Db2vzRHG.js";import"./ActionIconToggle.component-bspWPRew.js";import"./memoize-BUVazt3B.js";import"./chunk-GPz98Kje.js";import"./_isIterateeCall-DwblsXrP.js";import"./toInteger-FbNLNQo-.js";import"./toFinite-DcS2xE4R.js";import"./toNumber-JPIT3jcD.js";import"./locale-xoagfd6N.js";import"./Actions.component-B2DMDtjC.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
