import{j as e,r as n}from"./iframe-VHcrZt8_.js";import{I as o}from"./InputDateTimePicker.component-CR3r-jLA.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Cnyx8nGH.js";import"./index-Cu2VHZX_.js";import"./FocusManager.component-7mcm4pIr.js";import"./setSeconds-dQtpmdqF.js";import"./locale-B1BeCaPC.js";import"./setYear-BCR5Wbs1.js";import"./index-Bbmcwk-l.js";import"./index-BadCF_21.js";import"./Action.component-bdj-K6Rk.js";import"./ActionButton.component-BLPyZlVZ.js";import"./TooltipTrigger.component-BDOJ9BfO.js";import"./index-Do17dimz.js";import"./CircularProgress.component-rcErY46J.js";import"./constants-CZYEPhht.js";import"./translate-BOUIz-uh.js";import"./withTranslation-BeBYPiey.js";import"./Skeleton.component-Cs6KqOuG.js";import"./index-pwioB_R5.js";import"./theme-RygKw-t-.js";import"./OverlayTrigger.component-DADnuN3f.js";import"./RootCloseWrapper-DFB0OJyD.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B_e9WTic.js";import"./Transition-5Dpr573j.js";import"./Transition-i1YBrKJi.js";import"./ActionSplitDropdown.component-CPgKp-ox.js";import"./SplitButton-B47KNU1M.js";import"./inheritsLoose-DlftjF2A.js";import"./DropdownButton-n-ZKdN2o.js";import"./ActionIconToggle.component-D3aKhc8h.js";import"./locale-DscKEHQf.js";import"./Actions.component-BAjrgRna.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
