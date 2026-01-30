import{j as e,r as m}from"./iframe-ChHbVRNu.js";import{I as o}from"./InputDateTimePicker.component-QPlzN-o-.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CC6BXrbO.js";import"./omit-D_vPiMOe.js";import"./toString-BoyePzJy.js";import"./isSymbol-BULzMdII.js";import"./_baseSlice-t7865O3C.js";import"./_baseGet-DBNpedq7.js";import"./eq-CAK3zFQY.js";import"./_getTag-QP-MsuCO.js";import"./isArrayLike-Cow3ytjD.js";import"./index-CXhJpatZ.js";import"./FocusManager.component-DGsym7v5.js";import"./setSeconds-CqS_VXFc.js";import"./locale-m3p2c8qd.js";import"./setYear-DclFRI5z.js";import"./index-B3g3bunw.js";import"./index-jH6ZSRU8.js";import"./Action.component-3AV8JWX6.js";import"./ActionButton.component-HnO9sWYB.js";import"./TooltipTrigger.component-Cjzk50Qq.js";import"./index-B8VVVPUl.js";import"./CircularProgress.component-WB80l_2i.js";import"./constants-CZYEPhht.js";import"./translate-DSkg9kkf.js";import"./withTranslation-DNrQQHNO.js";import"./Skeleton.component-CPGSHBW4.js";import"./index-DGGBlbSp.js";import"./theme-6pUkCs8M.js";import"./OverlayTrigger.component-C6hFVnWk.js";import"./RootCloseWrapper-CDbyJ8bQ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DSJE1X6Q.js";import"./Transition-CZYJCq4z.js";import"./Transition-r4xo0oMn.js";import"./ActionSplitDropdown.component-DepItD5T.js";import"./SplitButton-DuNCG4_z.js";import"./inheritsLoose-BkN_cD3F.js";import"./get-CwrUn-1j.js";import"./DropdownButton-CQCiZiyd.js";import"./ActionIconToggle.component-DHYaEX4T.js";import"./memoize-__KTZTHe.js";import"./chunk-DmdG8SXY.js";import"./_isIterateeCall-3kt-T_aK.js";import"./toInteger-B18sQwF3.js";import"./toFinite-3ikywzH_.js";import"./toNumber-B16mozF0.js";import"./locale-CcMBuZ1a.js";import"./Actions.component-oylIYMTM.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
