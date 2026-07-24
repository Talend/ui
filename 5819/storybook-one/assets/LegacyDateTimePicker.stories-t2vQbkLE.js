import{j as e,r as m}from"./iframe-DkvIbG8Q.js";import{I as o}from"./InputDateTimePicker.component-BnQXNa9I.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CehS4xrx.js";import"./omit-Dhz2bKop.js";import"./toString-zeZo6fT4.js";import"./isSymbol-MNwrRfGF.js";import"./_setToString-CCQnyzvo.js";import"./_baseGet-BtXGieak.js";import"./eq-CM5aoTox.js";import"./_getTag-mrOIxYMu.js";import"./isArrayLike-CmVa1TF2.js";import"./index-DLWpVMWr.js";import"./FocusManager.component-DfmbdNpk.js";import"./setSeconds-DG6IK_Pb.js";import"./locale-DxuMR8P-.js";import"./setYear-ClJzt2Jl.js";import"./index-DhOzP4ZN.js";import"./index-BFECLTVI.js";import"./Action.component-Cj99rDFV.js";import"./ActionButton.component-DLGwg8lB.js";import"./TooltipTrigger.component-D-z0kzrA.js";import"./index-CCwBNUZZ.js";import"./CircularProgress.component-CmGs8O0d.js";import"./constants-CZYEPhht.js";import"./translate-C3GUxnFA.js";import"./withTranslation-BbBG3kQ2.js";import"./Skeleton.component-BNAusV71.js";import"./index-BaQN_8jc.js";import"./theme-tzHq6zkd.js";import"./OverlayTrigger.component-M36WnowO.js";import"./RootCloseWrapper-BLEQmdde.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-wUbaYJ_D.js";import"./Transition-DYZvbGmz.js";import"./Transition-BY4dpRbl.js";import"./ActionSplitDropdown.component-CE0dKYM3.js";import"./SplitButton-SmGvzDHr.js";import"./inheritsLoose-CjEx5Qvm.js";import"./get-Dp5Ox8Ui.js";import"./DropdownButton-DwtiJR7b.js";import"./ActionIconToggle.component-C2wEvLGU.js";import"./memoize-C3_Dvgt3.js";import"./chunk-3UhWdw5d.js";import"./_isIterateeCall-fCyF5Q7v.js";import"./toInteger-XM5FEIPu.js";import"./toFinite-LqbfLX6H.js";import"./toNumber-Cs2bblKV.js";import"./locale-DCAU1tuC.js";import"./Actions.component-kvWOB8Vc.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
