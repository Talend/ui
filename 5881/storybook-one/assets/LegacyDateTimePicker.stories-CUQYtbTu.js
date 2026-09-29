import{j as e,r as n}from"./iframe-Cc0UfpRW.js";import{I as o}from"./InputDateTimePicker.component-B8rt8yFM.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DVXzMqh9.js";import"./index-D11GGGSI.js";import"./FocusManager.component-KxZc5b8T.js";import"./setSeconds-D5GkJOFR.js";import"./locale-ChVLwwP_.js";import"./setYear-BiLSqibF.js";import"./index-DWwX463-.js";import"./index-BTaYgUFD.js";import"./Action.component-_fKV-7ZK.js";import"./ActionButton.component-CiXBQqZQ.js";import"./TooltipTrigger.component-Cv-KKErX.js";import"./index-MBNAhG2s.js";import"./CircularProgress.component-thoUhyHY.js";import"./constants-CZYEPhht.js";import"./translate-Bi4xKzpQ.js";import"./withTranslation-CPihPqhH.js";import"./Skeleton.component-DPSgmNqS.js";import"./index-yzSp2pKy.js";import"./theme-Bxf99ZTz.js";import"./OverlayTrigger.component-CuDX1A7F.js";import"./RootCloseWrapper-CoUOZErj.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DcHOxOAJ.js";import"./Transition-DcaXTO62.js";import"./Transition-CyMA3_Ff.js";import"./ActionSplitDropdown.component-DUNB9H0X.js";import"./SplitButton-DXCt6kHF.js";import"./inheritsLoose-B7oWC0v7.js";import"./DropdownButton-ChWncpx3.js";import"./ActionIconToggle.component-BaaMrW5-.js";import"./locale-BsCIF-Ha.js";import"./Actions.component-BLL450ZX.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
}`,...t.parameters?.docs?.source}}};const K=["FormModeDateTime","FormModeHybridDateTime"];export{i as FormModeDateTime,t as FormModeHybridDateTime,K as __namedExportsOrder,A as default};
