import{j as e,r as n}from"./iframe-BFp3kphZ.js";import{I as o}from"./InputDateTimePicker.component-Bs2l55Q-.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CFC8b8qc.js";import"./index-BpLaCLxH.js";import"./FocusManager.component-CrsrxwXc.js";import"./setSeconds-iUsT5g9i.js";import"./locale-BQCHC_yk.js";import"./setYear-MiyIeS0O.js";import"./index-DsX7sBZa.js";import"./index-CjiFleQf.js";import"./Action.component-BD9LQLEt.js";import"./ActionButton.component-BPA25F7u.js";import"./TooltipTrigger.component-DBvU6Ejf.js";import"./index-Cz1CkeTS.js";import"./CircularProgress.component-DNBExNUz.js";import"./constants-CZYEPhht.js";import"./translate-DfDmVi-6.js";import"./withTranslation-CcFAq2nN.js";import"./Skeleton.component-BlRFWj5S.js";import"./index-C_e1XS4i.js";import"./theme-BbHXgE-q.js";import"./OverlayTrigger.component-CJ0K3Pbc.js";import"./RootCloseWrapper-BgbQEDTt.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-5lcqSi0w.js";import"./Transition-Cei9fC4x.js";import"./Transition-DqhMVBaV.js";import"./ActionSplitDropdown.component-sH1CGwQa.js";import"./SplitButton-BsIY-iC6.js";import"./inheritsLoose-Bby2EU5v.js";import"./DropdownButton-_-uljz05.js";import"./ActionIconToggle.component-BzY5TG6D.js";import"./locale-C-DINJRM.js";import"./Actions.component-BBfV_JrK.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
