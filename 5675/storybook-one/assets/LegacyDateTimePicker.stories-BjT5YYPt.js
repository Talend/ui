import{j as e,r as m}from"./iframe-tG6QAxGp.js";import{I as o}from"./InputDateTimePicker.component-DqyHtOSZ.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D-FRCYGn.js";import"./omit-CRo6-3gC.js";import"./toString-BG9c7NwH.js";import"./isSymbol-ytlJlBjl.js";import"./_setToString-B2UnnL-D.js";import"./_baseGet-Dd0iB8L9.js";import"./eq-D9WtH5Fn.js";import"./_getTag-OmseOmXH.js";import"./isArrayLike-DErJ5wjt.js";import"./index-Bb3pmQxq.js";import"./FocusManager.component-Bw2mcafx.js";import"./setSeconds-CCs0wN5D.js";import"./locale-D_pFNwCR.js";import"./setYear-BkrZyUGV.js";import"./index-pACPjwMb.js";import"./index-D0Y12Ojj.js";import"./Action.component-XcQ2WTii.js";import"./ActionButton.component-CFI9Dawz.js";import"./TooltipTrigger.component-DPerC_fX.js";import"./index-CK4oWbr4.js";import"./CircularProgress.component--kEh-yrf.js";import"./constants-CZYEPhht.js";import"./translate-Dz4hh4kd.js";import"./withTranslation-CB2voPv-.js";import"./Skeleton.component-BsxZfoo7.js";import"./index-C4M67xWB.js";import"./theme-CbiPqX1n.js";import"./OverlayTrigger.component-DGPJQ8lB.js";import"./RootCloseWrapper-kKt8xs6O.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cj9NDUvU.js";import"./Transition-BOeWoA1S.js";import"./Transition-BXOwPJfR.js";import"./ActionSplitDropdown.component-6Mr2oZ_K.js";import"./SplitButton-CFNkqeLE.js";import"./inheritsLoose-Bj8HyUC0.js";import"./get-DE0l8-4q.js";import"./DropdownButton-B81McBOZ.js";import"./ActionIconToggle.component-DNdEU90S.js";import"./memoize-CnCALRJ4.js";import"./chunk-BM2XK7uW.js";import"./_isIterateeCall-ORf7Lxls.js";import"./toInteger-D4hQFTTs.js";import"./toFinite-DRTONrXJ.js";import"./toNumber-BDv1lg2s.js";import"./locale-ST6-XOnU.js";import"./Actions.component-BXy7cgFX.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
