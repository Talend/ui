import{j as e,r as n}from"./iframe-BELAelA7.js";import{I as o}from"./InputDateTimePicker.component-C3O3kW3i.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-De2A8M-X.js";import"./index-Dyykv0FX.js";import"./FocusManager.component-BPq6_P9q.js";import"./setSeconds-DG74FPV6.js";import"./locale-DFBMPdtr.js";import"./setYear-C52m7s9I.js";import"./index-BUXna9p-.js";import"./index-DkuKIpGG.js";import"./Action.component-CfLqaCUE.js";import"./ActionButton.component-DDWs7rM3.js";import"./TooltipTrigger.component-DaOHFgfM.js";import"./index-BOLdx2Yi.js";import"./CircularProgress.component-BP5YRUbR.js";import"./constants-CZYEPhht.js";import"./translate-D_R4KAOI.js";import"./withTranslation-DO1lz_1l.js";import"./Skeleton.component-CjjFh-In.js";import"./index-CsS-gCJ2.js";import"./theme-BMaIj9LU.js";import"./OverlayTrigger.component-DqOlnngh.js";import"./RootCloseWrapper-DztN7uhP.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CAcrHE_X.js";import"./Transition-B_Mn-fDT.js";import"./Transition-DPjgsdol.js";import"./ActionSplitDropdown.component-DlsZaez7.js";import"./SplitButton-DUsFaH2H.js";import"./inheritsLoose-DTyqRviu.js";import"./DropdownButton-DfgKpAx8.js";import"./ActionIconToggle.component-2SAZ-AKO.js";import"./locale-lTiTUgEd.js";import"./Actions.component-BQxRW8na.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
