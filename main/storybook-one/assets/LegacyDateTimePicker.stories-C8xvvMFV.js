import{j as e,r as n}from"./iframe-D35tfLrh.js";import{I as o}from"./InputDateTimePicker.component-BWZjV8JU.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CmcLW0u-.js";import"./index-BeBcG_6X.js";import"./FocusManager.component-CaSTeJxa.js";import"./setSeconds--24t8xCw.js";import"./locale-B46OvMyv.js";import"./setYear-DfhD1AUF.js";import"./index-eOSH--4g.js";import"./index-BFgwzEUY.js";import"./Action.component-Bs6_evzo.js";import"./ActionButton.component-BNtHNDSZ.js";import"./TooltipTrigger.component-DAiUYdDw.js";import"./index-B73zCkzo.js";import"./CircularProgress.component-CiKlgH5y.js";import"./constants-CZYEPhht.js";import"./translate-DLUFU1WN.js";import"./withTranslation-DAWKBDwS.js";import"./Skeleton.component-BZG-gUIy.js";import"./index-CXWGzsSb.js";import"./theme-BLPVqtFJ.js";import"./OverlayTrigger.component-BG4ctf8I.js";import"./RootCloseWrapper-BDjYu1IV.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CBO-_tK4.js";import"./Transition-Bs9O9Xy1.js";import"./Transition-BZcc62nJ.js";import"./ActionSplitDropdown.component-Fk40hU5c.js";import"./SplitButton-2GvtZM0z.js";import"./inheritsLoose-qMtYIwha.js";import"./DropdownButton-BG8U4BMz.js";import"./ActionIconToggle.component-CcY1DcAt.js";import"./locale-r-OxmJrV.js";import"./Actions.component-BbPcdGym.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
