import{j as e,r as n}from"./iframe-2ufzqGgU.js";import{I as o}from"./InputDateTimePicker.component-fZ00wgHG.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CH3C5zjc.js";import"./index-Up98YUH_.js";import"./FocusManager.component-BuwA-AvN.js";import"./setSeconds-FVCfhxYx.js";import"./locale-htv5FZFN.js";import"./setYear-DaJqwIwb.js";import"./index-5UpCtgfF.js";import"./index-CVvDFZML.js";import"./Action.component-C03D_KEI.js";import"./ActionButton.component-CwypvZR9.js";import"./TooltipTrigger.component-BJsj5tvb.js";import"./index-CSKw7C4M.js";import"./CircularProgress.component-DzkV6M2Y.js";import"./constants-CZYEPhht.js";import"./translate-0yJbfsdh.js";import"./withTranslation-DoNzQl1-.js";import"./Skeleton.component-BPSXOHWw.js";import"./index-zz5sWUfT.js";import"./theme-BdUZ5v26.js";import"./OverlayTrigger.component-BDLl_LQp.js";import"./RootCloseWrapper-BqrPI3WZ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-Cr9jbfne.js";import"./Transition-DSfwVrgn.js";import"./Transition-BKQqByaB.js";import"./ActionSplitDropdown.component-B399NJ3M.js";import"./SplitButton-C_J8f8Z7.js";import"./inheritsLoose-C5iVoILh.js";import"./DropdownButton-DQZBVSqQ.js";import"./ActionIconToggle.component-MwRVlC9d.js";import"./locale-BnqYx_0x.js";import"./Actions.component-D29yjmqS.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
