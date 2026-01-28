import{j as e,r as m}from"./iframe-D37Phr64.js";import{I as o}from"./InputDateTimePicker.component-B1FrgmVI.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BQ-KAC9t.js";import"./omit-20CTcyqL.js";import"./toString-DU9ul6dr.js";import"./isSymbol-DOqcnDfM.js";import"./_setToString-BzqI9MrB.js";import"./_baseGet-BdbJtFQK.js";import"./eq-Oi8weurB.js";import"./_getTag-3_YbZVhb.js";import"./isArrayLike-B6M8JwQg.js";import"./index-djx7_qMh.js";import"./FocusManager.component-fAANkDZ6.js";import"./setSeconds-TXJ47-9w.js";import"./locale-DkwMPTDa.js";import"./setYear-C2S87tqw.js";import"./index-BA0qziCA.js";import"./index-BX8koOWB.js";import"./Action.component-Ck4uvcSx.js";import"./ActionButton.component-CznGsQDN.js";import"./TooltipTrigger.component-DR5pn2u9.js";import"./index-CSYudTWG.js";import"./CircularProgress.component-CQfs1YoU.js";import"./constants-CZYEPhht.js";import"./translate-CAq4Kplr.js";import"./withTranslation-Borovdv1.js";import"./Skeleton.component-YGLhyf4R.js";import"./index-BlZT6wrK.js";import"./theme-CeyjN51H.js";import"./OverlayTrigger.component-BCMwzjb4.js";import"./RootCloseWrapper-4SBbwaun.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-GTcxw7wL.js";import"./Transition-CM8yD3oi.js";import"./Transition-DXkAf1V6.js";import"./ActionSplitDropdown.component-BpSVpVkj.js";import"./SplitButton-DTDnhUCW.js";import"./inheritsLoose-DWEYlpi0.js";import"./get-90MRQFNM.js";import"./DropdownButton-Bnk65iT_.js";import"./ActionIconToggle.component-CivhpjLz.js";import"./memoize-DDa3CULr.js";import"./chunk-C026mR0B.js";import"./_isIterateeCall-e0hMYX5g.js";import"./toInteger-Q60EgPSW.js";import"./toFinite-BumeZVHV.js";import"./toNumber-IBqixyL0.js";import"./locale-BHRvaj1l.js";import"./Actions.component-BI02MMVv.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
