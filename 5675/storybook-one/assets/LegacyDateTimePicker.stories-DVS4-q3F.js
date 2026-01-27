import{j as e,r as m}from"./iframe-jBdAviOK.js";import{I as o}from"./InputDateTimePicker.component-D-pUcOV2.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-YsylEwLE.js";import"./omit-DPJAlTWZ.js";import"./toString-BX93RoAV.js";import"./isSymbol-CvtXITru.js";import"./_setToString-Ce43QsYj.js";import"./_baseGet-u5avH9tD.js";import"./eq-D9JUUvu0.js";import"./_getTag-D1QWKMPg.js";import"./isArrayLike-CxvCEo1J.js";import"./index-C4_ds7mK.js";import"./FocusManager.component-DKDjWtMo.js";import"./setSeconds-C1rZRtUQ.js";import"./locale-Dhh2Q4hR.js";import"./setYear-D_uoAOws.js";import"./index-CjuoX8-B.js";import"./index-BCHe5Q6b.js";import"./Action.component-D7YnYMrZ.js";import"./ActionButton.component-C5JV4tjE.js";import"./TooltipTrigger.component-BXqDA9l2.js";import"./index-NQu-qG2g.js";import"./CircularProgress.component-8dLlgufm.js";import"./constants-CZYEPhht.js";import"./translate-921hfUGs.js";import"./withTranslation-CzsoIku5.js";import"./Skeleton.component-D5lAIBRU.js";import"./index-BrWIkuKz.js";import"./theme-BL0Anhlu.js";import"./OverlayTrigger.component-DfTxmYyS.js";import"./RootCloseWrapper-CKQqWj4X.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bn8Lv4IE.js";import"./Transition-OJ4_kF-v.js";import"./Transition-DC_Nj6xN.js";import"./ActionSplitDropdown.component-DD3Rf5MG.js";import"./SplitButton-CL2Q7Cit.js";import"./inheritsLoose-CAJZymaM.js";import"./get-jEP8xMl_.js";import"./DropdownButton-CNxduld3.js";import"./ActionIconToggle.component-C0OGhigD.js";import"./memoize-CJVJ1oX1.js";import"./chunk-BXzgpDGt.js";import"./_isIterateeCall-Dn49xDB4.js";import"./toInteger-D73iF8Tr.js";import"./toFinite-CBR12lu8.js";import"./toNumber-CQOS0Bvc.js";import"./locale-3N7G8h3c.js";import"./Actions.component-BQZQRpFu.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
