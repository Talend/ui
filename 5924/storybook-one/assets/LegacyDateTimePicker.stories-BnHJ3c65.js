import{j as e,r as n}from"./iframe-CznhUcwq.js";import{I as o}from"./InputDateTimePicker.component-TQYaTeWT.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Dii0-QbD.js";import"./index-DW-ZyMer.js";import"./FocusManager.component-C5C0ANwX.js";import"./setSeconds-DaCBmsv1.js";import"./locale-CcoAdjXy.js";import"./setYear-DRpo0_MR.js";import"./index-CAIlw6El.js";import"./index-CrEiKniw.js";import"./Action.component-BzZnaSZL.js";import"./ActionButton.component-p2-A9FgF.js";import"./TooltipTrigger.component-B2rRzx3C.js";import"./index-CgexE0x5.js";import"./CircularProgress.component-B__yXDi1.js";import"./constants-CZYEPhht.js";import"./translate-BYv7b2G_.js";import"./withTranslation-C5GK5G2e.js";import"./Skeleton.component-D_SXO69o.js";import"./index-BTM52Cfh.js";import"./theme-CWGwz770.js";import"./OverlayTrigger.component-CHKp6rXU.js";import"./RootCloseWrapper-CL1PWpHT.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BBcaJJAg.js";import"./Transition-xqwoA6kd.js";import"./Transition-CpxPvNtk.js";import"./ActionSplitDropdown.component-B9aqV25q.js";import"./SplitButton-D_XmFbeu.js";import"./inheritsLoose-C8vUFnnV.js";import"./DropdownButton-BxODINrY.js";import"./ActionIconToggle.component-4h2ERYxG.js";import"./locale-DGk_POTu.js";import"./Actions.component-BmI8b1sZ.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
