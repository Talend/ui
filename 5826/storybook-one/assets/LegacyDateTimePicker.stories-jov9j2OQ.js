import{j as e,r as m}from"./iframe-CCJukFV9.js";import{I as o}from"./InputDateTimePicker.component-2TzNeLgv.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-yhsJW5Cf.js";import"./omit-D4WBPx8x.js";import"./toString-0Ah1j7tI.js";import"./isSymbol-CYfdUlT-.js";import"./_setToString-B1_PfrWJ.js";import"./_baseGet-Bd9imoXi.js";import"./eq-BlvQFX-D.js";import"./_getTag-fIDcIhm1.js";import"./isArrayLike-DzCCRrvG.js";import"./index-ShuKq7mB.js";import"./FocusManager.component-67eL3XBS.js";import"./setSeconds-CmjkMeuT.js";import"./locale-B3r_-8KI.js";import"./setYear-BtbsUok_.js";import"./index-BE91LA0v.js";import"./index-t7aijU2e.js";import"./Action.component-Bof1YKtH.js";import"./ActionButton.component-BKQGNbEN.js";import"./TooltipTrigger.component-Cnq3GBjF.js";import"./index-BlMUnjzq.js";import"./CircularProgress.component-C2nzsqjs.js";import"./constants-CZYEPhht.js";import"./translate-b0nMpzbF.js";import"./withTranslation-DabJI8tM.js";import"./Skeleton.component-Bnl4BRAs.js";import"./index-DyxS6wjv.js";import"./theme-CBRMcrR4.js";import"./OverlayTrigger.component-bL6bkZNr.js";import"./RootCloseWrapper-C9t6VUr3.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-AQKaqIhi.js";import"./Transition-6iivEj4B.js";import"./Transition-Cg7FHDIs.js";import"./ActionSplitDropdown.component-DjmX76hh.js";import"./SplitButton-CT5SZZbo.js";import"./inheritsLoose-KQuwg05W.js";import"./get-DnMG8Dka.js";import"./DropdownButton-CwrnM9H0.js";import"./ActionIconToggle.component-CrxOV61w.js";import"./memoize-CUr6Nnbt.js";import"./chunk-pInJ4mmZ.js";import"./_isIterateeCall-Cc1bPqU3.js";import"./toInteger-CiN5NAes.js";import"./toFinite-BSsmlBPl.js";import"./toNumber-DW9_SI8z.js";import"./locale-D3ei4SB2.js";import"./Actions.component-Bclv0puA.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
