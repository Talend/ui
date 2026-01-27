import{j as e,r as m}from"./iframe-BKTgqfAy.js";import{I as o}from"./InputDateTimePicker.component-C5GxSnME.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D-8sHgrM.js";import"./omit-RI_1kSX6.js";import"./toString-ClD_locP.js";import"./isSymbol-Bb6JexB6.js";import"./_setToString-DxO6j9lL.js";import"./_baseGet-DG4kp6Co.js";import"./eq-GMWYOiFI.js";import"./_getTag-DBTi5Kus.js";import"./isArrayLike-BBf38vlD.js";import"./index-CX1LR2gp.js";import"./FocusManager.component-CQHGC1Oh.js";import"./setSeconds-B_hxWS5e.js";import"./locale-CEPU8GsQ.js";import"./setYear-D2rSVdA6.js";import"./index-1Sz6aA3P.js";import"./index-BLwKesM4.js";import"./Action.component-qDfRZfGg.js";import"./ActionButton.component-BFx4x5yr.js";import"./TooltipTrigger.component-DaLV_29x.js";import"./index-DNjy6cOb.js";import"./CircularProgress.component-uKNhM_QG.js";import"./constants-CZYEPhht.js";import"./translate-Bxh8Pyn6.js";import"./withTranslation-D8OTpJpr.js";import"./Skeleton.component-CSahJsM8.js";import"./index-1vobLllX.js";import"./theme-BNTGt-n2.js";import"./OverlayTrigger.component-Hi495Fuo.js";import"./RootCloseWrapper-l0ydqqX4.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B0FXiGn_.js";import"./Transition-B3O8MB_D.js";import"./Transition-B_HlkmwM.js";import"./ActionSplitDropdown.component-aWggALkU.js";import"./SplitButton-C-Xw7V2Y.js";import"./inheritsLoose-t6CNXeUF.js";import"./get-p-NCefnH.js";import"./DropdownButton-CF9L4D2K.js";import"./ActionIconToggle.component-DNEkEeh_.js";import"./memoize-CwF0VkYN.js";import"./chunk-WwFst9wd.js";import"./_isIterateeCall-DwohURdD.js";import"./toInteger-D6l81jV6.js";import"./toFinite-B0DNlXy6.js";import"./toNumber-Bh1L3nVV.js";import"./locale-Dm0dy8lE.js";import"./Actions.component-Chf1O_Rr.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
