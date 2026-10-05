import{j as e,r as n}from"./iframe-30-spegq.js";import{I as o}from"./InputDateTimePicker.component-D3bVGpPa.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Dk77EYe8.js";import"./index-uYldUkFO.js";import"./FocusManager.component-yOK1j8sF.js";import"./setSeconds-U2YFpPJL.js";import"./locale-BA3a9n_o.js";import"./setYear-vk55Ia2U.js";import"./index-5xjTdKmP.js";import"./index-C0dxqnk3.js";import"./Action.component-aMAwVkZF.js";import"./ActionButton.component-DUMyRRIk.js";import"./TooltipTrigger.component-C9fs7T9d.js";import"./index-D5cfcCd7.js";import"./CircularProgress.component-C4YTADy9.js";import"./constants-CZYEPhht.js";import"./translate-CrRQOpL4.js";import"./withTranslation-X3-5uq1y.js";import"./Skeleton.component-Ct75Kafh.js";import"./index-CetHZVZu.js";import"./theme-BPIIEjs4.js";import"./OverlayTrigger.component-BzzDPL97.js";import"./RootCloseWrapper-ClMMNp_n.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BLtgje2a.js";import"./Transition-BB6AoHQV.js";import"./Transition-0Dh1J_J8.js";import"./ActionSplitDropdown.component-BV9FxSOP.js";import"./SplitButton-DB2EHEie.js";import"./inheritsLoose-DzbXIRbr.js";import"./DropdownButton-D3xVdv6t.js";import"./ActionIconToggle.component-DTo-D2fR.js";import"./locale-C7jkmp_6.js";import"./Actions.component-DrYbitcf.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
