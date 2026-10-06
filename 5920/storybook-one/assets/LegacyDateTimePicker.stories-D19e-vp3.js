import{j as e,r as n}from"./iframe-DCrXPobh.js";import{I as o}from"./InputDateTimePicker.component-DRW2PBhP.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-C9trWdJf.js";import"./index-ssv3RIZg.js";import"./FocusManager.component-DgyHw6dv.js";import"./setSeconds-CDRjsUj3.js";import"./locale-B2gG8q6G.js";import"./setYear-DBPt7KcA.js";import"./index-DW71XhsI.js";import"./index-Ze7DFzP8.js";import"./Action.component-YMw4WcHB.js";import"./ActionButton.component-CpTFQFxK.js";import"./TooltipTrigger.component-47nBXvXE.js";import"./index-DmVgxto2.js";import"./CircularProgress.component-BO3djBH8.js";import"./constants-CZYEPhht.js";import"./translate-CLidr3C5.js";import"./withTranslation--wRrJrfl.js";import"./Skeleton.component-Bdi2I_dh.js";import"./index-CTXJ3FYI.js";import"./theme-C6uw3NHX.js";import"./OverlayTrigger.component-DFehdaG6.js";import"./RootCloseWrapper-GDdx9Oei.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Bmt0QOH9.js";import"./Transition-BvfOrbJo.js";import"./Transition-CqnXNonC.js";import"./ActionSplitDropdown.component-BoqRirbi.js";import"./SplitButton-DWE6u_81.js";import"./inheritsLoose-cnAjfeC3.js";import"./DropdownButton-CQDS2_Bp.js";import"./ActionIconToggle.component-DPUwQv8I.js";import"./locale-Tu1jDgld.js";import"./Actions.component-3PO3xVg3.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
