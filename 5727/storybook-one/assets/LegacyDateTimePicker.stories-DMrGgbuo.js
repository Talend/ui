import{j as e,r as m}from"./iframe-BGIuRL4S.js";import{I as o}from"./InputDateTimePicker.component-DvBwFBOb.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BaHwijpI.js";import"./omit-mz8lpH4r.js";import"./toString-CCpUnVXs.js";import"./isSymbol-BVsMw-Q6.js";import"./_baseSlice-BPNoC_Qe.js";import"./_baseGet-ClsFL8Gs.js";import"./eq-BSuxMkJX.js";import"./_getTag-xIia899o.js";import"./isArrayLike-A0UH1NNY.js";import"./index-__UbZIzR.js";import"./FocusManager.component-CWXXiQxl.js";import"./setSeconds-BEYf4y08.js";import"./locale-DrV-I5PP.js";import"./setYear-CoFS22H0.js";import"./index-BmH_QCKp.js";import"./index-jlQmxj48.js";import"./Action.component-JWfbdBXF.js";import"./ActionButton.component-E5deMur2.js";import"./TooltipTrigger.component-BADEKJlr.js";import"./index-dvKqYt1u.js";import"./CircularProgress.component-CAd3ZChp.js";import"./constants-CZYEPhht.js";import"./translate-Cy2726cc.js";import"./withTranslation-BpgtAtgo.js";import"./Skeleton.component-B0jLA45p.js";import"./index-DDnTDZUK.js";import"./theme-3R2elXtU.js";import"./OverlayTrigger.component-sQneb90h.js";import"./RootCloseWrapper-CFtMMLNJ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BVTCUTdV.js";import"./Transition-C6-b-Osj.js";import"./Transition-C4c_ulxf.js";import"./ActionSplitDropdown.component-C226wKn4.js";import"./SplitButton-B3syWE9i.js";import"./inheritsLoose-CJtaSU43.js";import"./get-eCwbVx25.js";import"./DropdownButton-CljZdDwa.js";import"./ActionIconToggle.component-DuJSHZaS.js";import"./memoize-Clz7DTFh.js";import"./chunk-CDpCvbye.js";import"./_isIterateeCall-BKz5rAL9.js";import"./toInteger-d90Cbm_n.js";import"./toFinite-DgC00wkp.js";import"./toNumber-D9AlLzbR.js";import"./locale-Ce0CabLf.js";import"./Actions.component-Df6QtLw3.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
