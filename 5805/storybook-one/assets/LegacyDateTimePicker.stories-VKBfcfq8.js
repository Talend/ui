import{j as e,r as m}from"./iframe-CWCo7ykZ.js";import{I as o}from"./InputDateTimePicker.component-D5PUdEHq.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-1yNKiZqV.js";import"./omit-BnJVre6j.js";import"./toString-KZigM7OW.js";import"./isSymbol-BGGx6Z8n.js";import"./_setToString-B42zykNw.js";import"./_baseGet-sfRMLqfN.js";import"./eq-DVyWNhDF.js";import"./_getTag-fmLSluek.js";import"./isArrayLike-CDET1z1l.js";import"./index-BtADC1kh.js";import"./FocusManager.component-8vjAA9o5.js";import"./setSeconds-CRE553GT.js";import"./locale-C3nZ5E0r.js";import"./setYear-BG0ZnMN_.js";import"./index-BNFJt_fi.js";import"./index-CNSBROrU.js";import"./Action.component-C2Pruoba.js";import"./ActionButton.component-SMqKQVu9.js";import"./TooltipTrigger.component-DsttEDpQ.js";import"./index-bKQTdL_z.js";import"./CircularProgress.component-CdPCIW2V.js";import"./constants-CZYEPhht.js";import"./translate-Bw3v2824.js";import"./withTranslation-DueXOWk5.js";import"./Skeleton.component-DCcxR7G4.js";import"./index-Be3RCHZG.js";import"./theme-Dwj7aUke.js";import"./OverlayTrigger.component-sKror3P-.js";import"./RootCloseWrapper-Dj7qYGOW.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Dn4Pc0td.js";import"./Transition-BytmYUSd.js";import"./Transition-BKhBmWtS.js";import"./ActionSplitDropdown.component-DjR-i4Sg.js";import"./SplitButton-CkNt02FD.js";import"./inheritsLoose-DxeIgX3i.js";import"./get-6XsBgkAQ.js";import"./DropdownButton-ljWWovtg.js";import"./ActionIconToggle.component-CNs1qSEA.js";import"./memoize-CnlAeXFp.js";import"./chunk-DR-3x5AX.js";import"./_isIterateeCall-DjVrctvL.js";import"./toInteger-A08uDcjN.js";import"./toFinite-Ck_G33yw.js";import"./toNumber-KAY5szgL.js";import"./locale-V4AG7v3F.js";import"./Actions.component-Bt2N73dW.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
