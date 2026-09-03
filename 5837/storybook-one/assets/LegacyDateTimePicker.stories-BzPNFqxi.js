import{j as e,r as m}from"./iframe-DqLkcC_p.js";import{I as o}from"./InputDateTimePicker.component-CfuX8HNC.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Xnz-BZj_.js";import"./omit-D7Y82oir.js";import"./toString-XRfePjwx.js";import"./isSymbol-8uZDi99P.js";import"./_setToString-BmXcwbXv.js";import"./_baseGet-CqLo12ra.js";import"./eq-B-n9oN1f.js";import"./_getTag-Cga9V7T2.js";import"./isArrayLike-FDbjKheZ.js";import"./index-CFJEEIcD.js";import"./FocusManager.component-D258sfUd.js";import"./setSeconds-tWuJToWF.js";import"./locale-BkXxd7W3.js";import"./setYear-DcTh0nXG.js";import"./index-CkgPXoh5.js";import"./index-0vUrjiOI.js";import"./Action.component-DkyyyqGT.js";import"./ActionButton.component-Wc-xjWvy.js";import"./TooltipTrigger.component-DXvai9iq.js";import"./index-B_XRYfHm.js";import"./CircularProgress.component-DM42CpaE.js";import"./constants-CZYEPhht.js";import"./translate-upENKyO0.js";import"./withTranslation-CYrWQw4j.js";import"./Skeleton.component-DQmp7pSm.js";import"./index-CUULivym.js";import"./theme-BzAhr63g.js";import"./OverlayTrigger.component-mBiihvas.js";import"./RootCloseWrapper-CC0YbW_h.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BvmvrUKA.js";import"./Transition-oL0du4tN.js";import"./Transition-7_MjOcbp.js";import"./ActionSplitDropdown.component-6Eg8-CVw.js";import"./SplitButton-D-EhJxF1.js";import"./inheritsLoose-D2z94f4h.js";import"./get-vLCTdp9T.js";import"./DropdownButton-CIcEgCrn.js";import"./ActionIconToggle.component-dK31r8s6.js";import"./memoize-rIrd_6yL.js";import"./chunk-B1qyjKng.js";import"./_isIterateeCall-CzlDIJXJ.js";import"./toInteger-DdM711xJ.js";import"./toFinite-DKGm0LrZ.js";import"./toNumber-BHJi-9dG.js";import"./locale-K0ucwtmD.js";import"./Actions.component-CKq_M3Nf.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
