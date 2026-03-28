import{j as e,r as m}from"./iframe-DZbVhgSq.js";import{I as o}from"./InputDateTimePicker.component-fV72Plw0.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-hTYoqyVZ.js";import"./omit-DfWDWnZr.js";import"./toString-DRypW0xg.js";import"./isSymbol-utH3E145.js";import"./_setToString-Cb9q76qX.js";import"./_baseGet-B6sZByIR.js";import"./eq-Gtm29xL-.js";import"./_getTag-Dflrppun.js";import"./isArrayLike-BA1-QX5o.js";import"./index-CTcQ-izg.js";import"./FocusManager.component-D3zd-vM3.js";import"./setSeconds-Dr6-DXjW.js";import"./locale-BNgLu0P2.js";import"./setYear-DuUUQAvE.js";import"./index-Bhmc-rPl.js";import"./index-fsXHssHI.js";import"./Action.component-CM_yy-Ch.js";import"./ActionButton.component-DqTy6pFj.js";import"./TooltipTrigger.component-BhCVnRoV.js";import"./index-B5IEsJlc.js";import"./CircularProgress.component-DulLwRMd.js";import"./constants-CZYEPhht.js";import"./translate-BPs01qDA.js";import"./withTranslation-smRg6hW0.js";import"./Skeleton.component-B2jQE8az.js";import"./index-DyMPaTFk.js";import"./theme-DVMl23xe.js";import"./OverlayTrigger.component-Oh62E1hX.js";import"./RootCloseWrapper-BLTTc6a5.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DgMVFoSo.js";import"./Transition-stKwlJ-Q.js";import"./Transition-ChCIhTF-.js";import"./ActionSplitDropdown.component-7OFyWLvE.js";import"./SplitButton-BDlJUCCc.js";import"./inheritsLoose-G35GzxTI.js";import"./get-DQh4jKHT.js";import"./DropdownButton-CbhGUKqD.js";import"./ActionIconToggle.component-Bk-X4e1M.js";import"./memoize-Do9BI7Wk.js";import"./chunk-KCnOAw3q.js";import"./_isIterateeCall-Ca2bvyKH.js";import"./toInteger-B3lUOw4s.js";import"./toFinite-DOXIN6hA.js";import"./toNumber-Bs8tgP7e.js";import"./locale-BsUWqYL4.js";import"./Actions.component-BG2Hz-Vd.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
