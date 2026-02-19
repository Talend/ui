import{j as e,r as m}from"./iframe-cBtRg4Zm.js";import{I as o}from"./InputDateTimePicker.component-BUS2wZWv.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-GxcgmlF_.js";import"./omit-DZjDjx7f.js";import"./toString-Dopjm_6L.js";import"./isSymbol-hEzy1n5Y.js";import"./_baseSlice-BFLcj3sE.js";import"./_baseGet-bDt8gzSb.js";import"./eq-DmJpQRp3.js";import"./_getTag-D1YAmZF8.js";import"./isArrayLike-XKLyq0p9.js";import"./index-eoj_-iSp.js";import"./FocusManager.component-YCWWKH36.js";import"./setSeconds-FynO3kZ7.js";import"./locale-C5EtQQFI.js";import"./setYear-CyDb8ryn.js";import"./index-vqKS4t1F.js";import"./index-BOm_B24O.js";import"./Action.component-DbfWXAi7.js";import"./ActionButton.component-BbFZmfp2.js";import"./TooltipTrigger.component-BEpC4Cbd.js";import"./index-_4Lt4aG8.js";import"./CircularProgress.component-CJXktRGh.js";import"./constants-CZYEPhht.js";import"./translate-am4PfflD.js";import"./withTranslation-BL7gA-bp.js";import"./Skeleton.component-Dkla9Zfi.js";import"./index-CopqRmGV.js";import"./theme-IDDytecF.js";import"./OverlayTrigger.component-CafacX6_.js";import"./RootCloseWrapper-B9V3vXXh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-RafO5SjG.js";import"./Transition-D7Ms2Ah2.js";import"./Transition-QmhJMkIM.js";import"./ActionSplitDropdown.component-C5oizYOJ.js";import"./SplitButton-Bri9k3Vu.js";import"./inheritsLoose-CFk7qFMH.js";import"./get-DpZIkRWq.js";import"./DropdownButton-DJxVuDn4.js";import"./ActionIconToggle.component-DocL8DWD.js";import"./memoize-BJD1Gfju.js";import"./chunk-DWL5LZXx.js";import"./_isIterateeCall-DQUlforL.js";import"./toInteger-YO8VQZdE.js";import"./toFinite-Dcd9YxU7.js";import"./toNumber-B2Ftrld9.js";import"./locale-BcBXR-Kr.js";import"./Actions.component-CDUYopll.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
