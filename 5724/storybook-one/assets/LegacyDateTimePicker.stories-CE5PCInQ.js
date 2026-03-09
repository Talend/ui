import{j as e,r as m}from"./iframe-6C1ykPWx.js";import{I as o}from"./InputDateTimePicker.component-Mx4JaKwE.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D14ulujF.js";import"./omit-DOIp0Mir.js";import"./toString-BmH2ab_Y.js";import"./isSymbol-DXYi_rXD.js";import"./_setToString-B6ffYbVG.js";import"./_baseGet-BkvsmCY6.js";import"./eq-B2JVFhQ7.js";import"./_getTag-DsXBrIAD.js";import"./isArrayLike-BxJVNhir.js";import"./index-CBQ_Byc5.js";import"./FocusManager.component-C_T9ShwH.js";import"./setSeconds-DxdPCG7H.js";import"./locale-CXXgK9M9.js";import"./setYear-D368Ex7M.js";import"./index-C6738efb.js";import"./index-CZCtCY20.js";import"./Action.component-D9mQufs9.js";import"./ActionButton.component-BY-q4ggr.js";import"./TooltipTrigger.component-BFy3cTU3.js";import"./index-BslmIV_L.js";import"./CircularProgress.component-Sihr6Bhr.js";import"./constants-CZYEPhht.js";import"./translate-BE-TYhPo.js";import"./withTranslation-CKQm43hb.js";import"./Skeleton.component-Baon3CiZ.js";import"./index-Cq7VnXI3.js";import"./theme-DO-cPuEw.js";import"./OverlayTrigger.component-Bv47wzHE.js";import"./RootCloseWrapper-Bz2qVbgv.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DttzocPT.js";import"./Transition-CoH8Ej_X.js";import"./Transition-C_9MPLqP.js";import"./ActionSplitDropdown.component-DQJ29b0w.js";import"./SplitButton-B2drXeWC.js";import"./inheritsLoose-BFjbzfgv.js";import"./get-Caf05NaP.js";import"./DropdownButton-jG80Mf4A.js";import"./ActionIconToggle.component-DSmCVp0i.js";import"./memoize-DhZQKvgI.js";import"./chunk-3wsBQ8Ih.js";import"./_isIterateeCall-casX9c1H.js";import"./toInteger-ChbjiwP1.js";import"./toFinite-DuPNFw--.js";import"./toNumber-5BZGt68h.js";import"./locale-UoWJvSqU.js";import"./Actions.component-DUF_O44g.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
