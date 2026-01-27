import{j as e,r as m}from"./iframe-Fv_vVGZN.js";import{I as o}from"./InputDateTimePicker.component-DeayqIOR.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CQFCA5aA.js";import"./omit-BbxJ_pGP.js";import"./toString-Dlr6kBM4.js";import"./isSymbol-CNKm9IEk.js";import"./_setToString-B_239-ah.js";import"./_baseGet-4_z8tnd-.js";import"./eq-McJnFt1I.js";import"./_getTag-BnrjvEwI.js";import"./isArrayLike-CWL7q3nM.js";import"./index-4tufL-DP.js";import"./FocusManager.component-CofoSDdo.js";import"./setSeconds-C2tKzmMF.js";import"./locale-vCjV5JiD.js";import"./setYear-D1BW2rMK.js";import"./index-ByNcQzVm.js";import"./index-DBmIotRA.js";import"./Action.component-DU21-Msq.js";import"./ActionButton.component-BGrLFd2s.js";import"./TooltipTrigger.component-eBDOtZP9.js";import"./index-MMEptsc7.js";import"./CircularProgress.component-D0r9lOI7.js";import"./constants-CZYEPhht.js";import"./translate-D9s1Bjkz.js";import"./withTranslation-CTObs2UP.js";import"./Skeleton.component-D6yy3OnK.js";import"./index-CprQB1Z1.js";import"./theme-D6f1aVid.js";import"./OverlayTrigger.component-C19J5ewi.js";import"./RootCloseWrapper-C4S0M7VT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BDkcGskv.js";import"./Transition-CV9ZxHzg.js";import"./Transition-BMiB0AlX.js";import"./ActionSplitDropdown.component-DJmXjSVq.js";import"./SplitButton-enRAsFA9.js";import"./inheritsLoose-CQRarj6Q.js";import"./get-Dtrs5e6d.js";import"./DropdownButton-Dj19_MGA.js";import"./ActionIconToggle.component-iHtCGVrb.js";import"./memoize-CdLjARUp.js";import"./chunk-CtoVR_YQ.js";import"./_isIterateeCall-BeiS_0gG.js";import"./toInteger-Bo78RpTa.js";import"./toFinite-BAXbtB1Y.js";import"./toNumber-BhB94Asb.js";import"./locale-BE3073v2.js";import"./Actions.component-r4v7brPZ.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
