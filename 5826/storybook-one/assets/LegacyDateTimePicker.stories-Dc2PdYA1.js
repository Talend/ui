import{j as e,r as m}from"./iframe-DfdifOwL.js";import{I as o}from"./InputDateTimePicker.component-O1fYsxBI.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-nmtNze5u.js";import"./omit-kelfQUT-.js";import"./toString-Cgya6l1E.js";import"./isSymbol-ANBliHla.js";import"./_setToString-C6PbTfIV.js";import"./_baseGet-Cukhu6FA.js";import"./eq-B-mHujBy.js";import"./_getTag-D_AG95qx.js";import"./isArrayLike-D7EC_x23.js";import"./index-x2ZnoRV2.js";import"./FocusManager.component-DUHSp3Ph.js";import"./setSeconds-CQrUfLeZ.js";import"./locale-hZXvGLxM.js";import"./setYear-C6nxqJtA.js";import"./index-CKJuRNYr.js";import"./index-Cu2CbqNH.js";import"./Action.component-BR9S43mM.js";import"./ActionButton.component-UYOJvcYX.js";import"./TooltipTrigger.component-BJTpyXDt.js";import"./index-QfL4wXG6.js";import"./CircularProgress.component-OrLWawc-.js";import"./constants-CZYEPhht.js";import"./translate-CHxtV6I3.js";import"./withTranslation-DAWSAIvR.js";import"./Skeleton.component-D7SwgdCx.js";import"./index-CanZ0F1o.js";import"./theme-pB6coKgW.js";import"./OverlayTrigger.component-CS_vSBul.js";import"./RootCloseWrapper-BMMhQz6K.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CpAJlHQX.js";import"./Transition-CSYT3GvG.js";import"./Transition-BVdSZFdr.js";import"./ActionSplitDropdown.component-GVbhWc-F.js";import"./SplitButton-BsAqQBPt.js";import"./inheritsLoose-CAyfXZxb.js";import"./get-DxznK-f3.js";import"./DropdownButton-BYW7Gel0.js";import"./ActionIconToggle.component-cEVyz_R_.js";import"./memoize-Bx0_YnyZ.js";import"./chunk-Cfnbxiq9.js";import"./_isIterateeCall-BdU2Aeee.js";import"./toInteger-BRhv67ZS.js";import"./toFinite-DX_hGx3D.js";import"./toNumber-BQ9Pim1s.js";import"./locale-De9Rs2xd.js";import"./Actions.component-BsaIdXnV.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
