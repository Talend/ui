import{j as e,r as n}from"./iframe-DOVc7DCP.js";import{I as o}from"./InputDateTimePicker.component-BkbfyPjx.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-D6MkR_QK.js";import"./index-BPvjyhca.js";import"./FocusManager.component-Bc4W1f78.js";import"./setSeconds-rpVS2wTi.js";import"./locale-DsSVitGo.js";import"./setYear-BFiu4LGl.js";import"./index-NhQWjlUE.js";import"./index-5YEdGRBQ.js";import"./Action.component-DXIB2moW.js";import"./ActionButton.component-CvEPOcqr.js";import"./TooltipTrigger.component-DOlK60PV.js";import"./index-Cx6jk1au.js";import"./CircularProgress.component-utW0MuIa.js";import"./constants-CZYEPhht.js";import"./translate-Burp3HDS.js";import"./withTranslation-D1G7-PQf.js";import"./Skeleton.component-Dpw3dv-L.js";import"./index-DZRZkhFJ.js";import"./theme-ST3mZTRy.js";import"./OverlayTrigger.component-Dcy4RO1G.js";import"./RootCloseWrapper-BLzxDP94.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D15U1g_1.js";import"./Transition-BYO0GM37.js";import"./Transition-BxL_ba3-.js";import"./ActionSplitDropdown.component-BofquaR9.js";import"./SplitButton-BMR5_pXa.js";import"./inheritsLoose-DDC0Rvot.js";import"./DropdownButton-DFFM0Jvh.js";import"./ActionIconToggle.component-DOdR2THA.js";import"./locale-V-BFAlLF.js";import"./Actions.component-Dd_z7yBf.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
