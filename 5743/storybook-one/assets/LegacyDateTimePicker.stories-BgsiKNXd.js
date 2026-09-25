import{j as e,r as n}from"./iframe-lQ44fTGe.js";import{I as o}from"./InputDateTimePicker.component-BowoNojY.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-B5yEhXlx.js";import"./index-pkbT1GRS.js";import"./FocusManager.component-XTHK7tUV.js";import"./setSeconds-DXW2v4AX.js";import"./locale-BWUoKoae.js";import"./setYear-DBP98LXK.js";import"./index-wzUCG6-_.js";import"./index-B-Vq2RNM.js";import"./Action.component-N8xjpJ_p.js";import"./ActionButton.component-BClGrjnm.js";import"./TooltipTrigger.component-Duk_2u5K.js";import"./index-DqGt5Jo4.js";import"./CircularProgress.component-D7mRoxfk.js";import"./constants-CZYEPhht.js";import"./translate-CGqwdWwP.js";import"./withTranslation-biIfzT2x.js";import"./Skeleton.component-tJ4YQp1k.js";import"./index-DdpITWU_.js";import"./theme-xS0kuK8t.js";import"./OverlayTrigger.component-eTGnFngT.js";import"./RootCloseWrapper-Cy3quzkX.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CYnO1wAH.js";import"./Transition-vRcfIWOw.js";import"./Transition-CRtzAhLI.js";import"./ActionSplitDropdown.component-DAF2W308.js";import"./SplitButton-D9GOV_Hi.js";import"./inheritsLoose-D5tT8USs.js";import"./DropdownButton-CmCbMl8z.js";import"./ActionIconToggle.component-BcRAM3GP.js";import"./locale-DIjopum_.js";import"./Actions.component-mKcCz_b9.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
