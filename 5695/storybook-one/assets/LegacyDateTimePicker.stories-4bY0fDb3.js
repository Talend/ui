import{j as e,r as m}from"./iframe-BPWKJ2_o.js";import{I as o}from"./InputDateTimePicker.component-B46yxAUt.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CM0sjsC9.js";import"./omit-Dp4FCWoh.js";import"./toString-RNHQn9jk.js";import"./isSymbol-DtjENQP0.js";import"./_baseSlice-DRoy53G4.js";import"./_baseGet-GCSfqC3R.js";import"./eq-CT9ytHj1.js";import"./_getTag-KzPaKQG2.js";import"./isArrayLike-BnxJKSWE.js";import"./index-BPavWh-U.js";import"./FocusManager.component-rpkdNNjL.js";import"./setSeconds-bzIzS23A.js";import"./locale-BUXC210M.js";import"./setYear-D-oJS44X.js";import"./index-CPccb1WS.js";import"./index-B5EOfhho.js";import"./Action.component-CGKdISv0.js";import"./ActionButton.component-nOOll17V.js";import"./TooltipTrigger.component-Cqzsa5JT.js";import"./index-B5TGO0So.js";import"./CircularProgress.component-COR0Xrwv.js";import"./constants-CZYEPhht.js";import"./translate-q8yQChef.js";import"./withTranslation-ByA2ZQp2.js";import"./Skeleton.component-DsXVPtu7.js";import"./index-BRrpl1wo.js";import"./theme-Cj2Fm6kQ.js";import"./OverlayTrigger.component-aV17y0dX.js";import"./RootCloseWrapper-CMQxteV5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpIv-jbF.js";import"./Transition-CPW5JkxA.js";import"./Transition-5lMdqHLm.js";import"./ActionSplitDropdown.component-8PenvcAp.js";import"./SplitButton-C2kpOeLT.js";import"./inheritsLoose-DEJIaahp.js";import"./get-6sLcuglD.js";import"./DropdownButton-BvV7HSyt.js";import"./ActionIconToggle.component-ugUZNPkA.js";import"./memoize-DzqNq4gO.js";import"./chunk-DAfUTpf1.js";import"./_isIterateeCall-mNJHjOf0.js";import"./toInteger-L-JXVBl5.js";import"./toFinite-C3wqvSHG.js";import"./toNumber-CF5pNCSH.js";import"./locale-DiIq47TW.js";import"./Actions.component-ChOdem63.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
