import{j as e,r as m}from"./iframe-BeUrxS75.js";import{I as o}from"./InputDateTimePicker.component-B8U6c3mV.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D3o_VXKE.js";import"./omit-CUjb5z2T.js";import"./toString-COATutRb.js";import"./isSymbol-BqqTSgov.js";import"./_setToString-CzatqGiI.js";import"./_baseGet-BYPC0Nrw.js";import"./eq-VoAmlW1Q.js";import"./_getTag-D-QJwtlC.js";import"./isArrayLike-RX78eRsG.js";import"./index-DUg1PiHq.js";import"./FocusManager.component-GwNYAl5B.js";import"./setSeconds-B2zbJaFq.js";import"./locale-CNTayxya.js";import"./setYear-JtNaC-W-.js";import"./index-D7D6o1tc.js";import"./index-Dv9bXkj0.js";import"./Action.component-B81spSf8.js";import"./ActionButton.component-DztB4VBb.js";import"./TooltipTrigger.component-BN0CMt2Y.js";import"./index-tLR6j0ax.js";import"./CircularProgress.component-D90Gv8Ln.js";import"./constants-CZYEPhht.js";import"./translate-BhDR11Ia.js";import"./withTranslation-BMw-xhsf.js";import"./Skeleton.component-Doa5RG4V.js";import"./index-D3gJW--R.js";import"./theme-ByAIAit0.js";import"./OverlayTrigger.component-CXa1QDao.js";import"./RootCloseWrapper-Dkb2rwuc.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C_DxvxFJ.js";import"./Transition-DsLtkSnW.js";import"./Transition-CVbE3JtA.js";import"./ActionSplitDropdown.component-DagaBzcf.js";import"./SplitButton-BHzI4c9u.js";import"./inheritsLoose-CtV3E512.js";import"./get-Da1hbhWf.js";import"./DropdownButton-CYyElzZX.js";import"./ActionIconToggle.component-Nz6Gc9hj.js";import"./memoize-TZCLPtL-.js";import"./chunk-CABp-_na.js";import"./_isIterateeCall-y1Swj2iJ.js";import"./toInteger-BLCtB8cy.js";import"./toFinite-CQRyyY9Z.js";import"./toNumber-xJmQYSjZ.js";import"./locale-DRCpZekj.js";import"./Actions.component-CJmufm-4.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
