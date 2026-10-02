import{j as e,r as n}from"./iframe-C4X7v6Um.js";import{I as o}from"./InputDateTimePicker.component-CD6xW5tJ.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BJJOdGNb.js";import"./index-B7BzQRaY.js";import"./FocusManager.component-DywMykIG.js";import"./setSeconds-BfmRubsj.js";import"./locale-B93BPV5r.js";import"./setYear-C9obTjOS.js";import"./index-yMXNQuE8.js";import"./index-CNwkPYn5.js";import"./Action.component-BqnXiauK.js";import"./ActionButton.component-AlWvq_Am.js";import"./TooltipTrigger.component-DSZEQOuJ.js";import"./index-ChdIVX7r.js";import"./CircularProgress.component-PIxfqVZk.js";import"./constants-CZYEPhht.js";import"./translate-DeMmLpQx.js";import"./withTranslation-xGOXzfMk.js";import"./Skeleton.component-CDa0cKNt.js";import"./index-Hz11bDaL.js";import"./theme-BMGJz1IE.js";import"./OverlayTrigger.component-UyQN2Ly5.js";import"./RootCloseWrapper-sHnxR9r7.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DsJpRGw4.js";import"./Transition-4RQCvlf4.js";import"./Transition-EGOt_229.js";import"./ActionSplitDropdown.component-BsqOoHNV.js";import"./SplitButton-Bd9PAVkf.js";import"./inheritsLoose-BkNWGGaW.js";import"./DropdownButton-Vz6YKxpy.js";import"./ActionIconToggle.component-Cl4OBJrf.js";import"./locale-afsICmws.js";import"./Actions.component-CvmBpwRv.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
