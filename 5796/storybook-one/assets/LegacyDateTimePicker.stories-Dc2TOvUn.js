import{j as e,r as m}from"./iframe-BHNyYmnH.js";import{I as o}from"./InputDateTimePicker.component-DyMP9Rua.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D8PAOuvU.js";import"./omit-B9cOHraP.js";import"./toString-DnNoqVhG.js";import"./isSymbol-DgOvFIr6.js";import"./_setToString-DBxFL1_f.js";import"./_baseGet-BedlkoUw.js";import"./eq-Bl4h4C2b.js";import"./_getTag-BkiVVTqL.js";import"./isArrayLike-D4mkoKrk.js";import"./index-7Ga0JH1j.js";import"./FocusManager.component-Be_vX8pk.js";import"./setSeconds-DAQq61Zf.js";import"./locale-FvjAjwt9.js";import"./setYear-3Ej3fWH7.js";import"./index-Bm__hfUd.js";import"./index-P-6uvQoa.js";import"./Action.component-Bz6kRUtL.js";import"./ActionButton.component-IpEDwgct.js";import"./TooltipTrigger.component-Br6btDrg.js";import"./index-CCy5oUWi.js";import"./CircularProgress.component-wH_0fLsi.js";import"./constants-CZYEPhht.js";import"./translate-WIDpsCUC.js";import"./withTranslation-DwuNJiuX.js";import"./Skeleton.component-CRLGQTnO.js";import"./index-CjM7RE0z.js";import"./theme-CSQRXcUF.js";import"./OverlayTrigger.component-CcmbwYTe.js";import"./RootCloseWrapper-S2ClSwjN.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bzka2rP5.js";import"./Transition-KG3xiPMS.js";import"./Transition-bW7caDWR.js";import"./ActionSplitDropdown.component-CjufbVQL.js";import"./SplitButton-CsH6Huhx.js";import"./inheritsLoose-CK_T0nOw.js";import"./get-CHMwC6sW.js";import"./DropdownButton-By-VQHak.js";import"./ActionIconToggle.component-LcOvVwur.js";import"./memoize-DOGg7Df3.js";import"./chunk-ChKdktJF.js";import"./_isIterateeCall-DnRLtmyf.js";import"./toInteger-CPpdDXJp.js";import"./toFinite-B4ap4QdY.js";import"./toNumber-Ws7-aXVF.js";import"./locale-BjgMTOMK.js";import"./Actions.component-DnEXXnwT.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
