import{j as e,r as n}from"./iframe-BFBI_cRx.js";import{I as o}from"./InputDateTimePicker.component-DyB4Q6tL.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CridBTua.js";import"./index-hy55x9YN.js";import"./FocusManager.component-DbYcTbSO.js";import"./setSeconds-C3vvXS2Q.js";import"./locale-DVzGZYyG.js";import"./setYear-BSIi3DIK.js";import"./index-RQ2dcPBA.js";import"./index-CxUv5nyT.js";import"./Action.component-rPq0x8yd.js";import"./ActionButton.component-DVnj7ik5.js";import"./TooltipTrigger.component-De-HffSZ.js";import"./index-BC7UvRp8.js";import"./CircularProgress.component-Bu0mhu9E.js";import"./constants-CZYEPhht.js";import"./translate-B6ju_ZDW.js";import"./withTranslation-E5qHrCHW.js";import"./Skeleton.component-CpPLjjSt.js";import"./index-C9SGdhVP.js";import"./theme-CMZZiavz.js";import"./OverlayTrigger.component-D1GRWUeZ.js";import"./RootCloseWrapper-lE3Q3kTB.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-COD8Kc9M.js";import"./Transition-Cganbtnr.js";import"./Transition-UMgsydZR.js";import"./ActionSplitDropdown.component-J0UppBjw.js";import"./SplitButton-DjIyEWg9.js";import"./inheritsLoose-BZYkjnji.js";import"./DropdownButton-CTsy2Q-o.js";import"./ActionIconToggle.component-CIjQRiW3.js";import"./locale-hdmK1GM_.js";import"./Actions.component-0FMRUzjd.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
