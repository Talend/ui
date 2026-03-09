import{j as e,r as m}from"./iframe-Dz_qA_Fa.js";import{I as o}from"./InputDateTimePicker.component-DVhYzlY2.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BBssyibT.js";import"./omit-Cc8OFDRb.js";import"./toString-BNLGOlej.js";import"./isSymbol-DTXI2GwG.js";import"./_setToString-CxIpm-1K.js";import"./_baseGet-CJVZLrYF.js";import"./eq-J5bas50k.js";import"./_getTag-C4Wku8tT.js";import"./isArrayLike-CN1V8Fp6.js";import"./index-Bbc6G5Tu.js";import"./FocusManager.component-BVrDIFsl.js";import"./setSeconds-Cap02l59.js";import"./locale-CbguIItS.js";import"./setYear-D-jFvVS1.js";import"./index-CbFBALAq.js";import"./index-CN8sGrMK.js";import"./Action.component-Ch672Rmw.js";import"./ActionButton.component-DCYG8N9B.js";import"./TooltipTrigger.component-_c0QPveT.js";import"./index-BGgNcAF3.js";import"./CircularProgress.component-yPmQuuJb.js";import"./constants-CZYEPhht.js";import"./translate-DdOJE879.js";import"./withTranslation-CG5lIvpL.js";import"./Skeleton.component-C83rHjC1.js";import"./index-BbvlCrSE.js";import"./theme-B5Br_zxa.js";import"./OverlayTrigger.component-Br6J8Vkf.js";import"./RootCloseWrapper-C1JMhpOp.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-WxKj_jxf.js";import"./Transition-BZcqI1EY.js";import"./Transition-D-MPy9FH.js";import"./ActionSplitDropdown.component-B-KMBCxf.js";import"./SplitButton-D3gG5gVf.js";import"./inheritsLoose-Bun7ixcr.js";import"./get-Bs9aIrca.js";import"./DropdownButton-BwFRaPg5.js";import"./ActionIconToggle.component-7Ltchg3h.js";import"./memoize-Bbzr2uha.js";import"./chunk-BWfIHOju.js";import"./_isIterateeCall-DbvL7bl-.js";import"./toInteger-t7KMymBg.js";import"./toFinite-CiYnhTuu.js";import"./toNumber-CWeh9qrO.js";import"./locale-Cy1IvIgW.js";import"./Actions.component-BtioUtDE.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
