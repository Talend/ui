import{j as e,r as n}from"./iframe-BgsLVtNb.js";import{I as o}from"./InputDateTimePicker.component-BzC2kXtz.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-zXHL_8zn.js";import"./index-Dtu3LjcV.js";import"./FocusManager.component-DmpWZthX.js";import"./setSeconds-DXpIMpCI.js";import"./locale-BEMcF_75.js";import"./setYear-CsGOW5-E.js";import"./index-ANFQO9Ut.js";import"./index-C8PhCw3v.js";import"./Action.component-BOT-fr8H.js";import"./ActionButton.component-ro9EyG17.js";import"./TooltipTrigger.component-CHnjowas.js";import"./index-D8rCSQ2N.js";import"./CircularProgress.component-0KmABO8R.js";import"./constants-CZYEPhht.js";import"./translate-DWsPRBqA.js";import"./withTranslation-54U-fY_b.js";import"./Skeleton.component-BH54IMkc.js";import"./index-1_BhjC6S.js";import"./theme-Bz2b32jw.js";import"./OverlayTrigger.component-BbVNkQea.js";import"./RootCloseWrapper-Bz_2LwCi.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CN8TBiMn.js";import"./Transition-G9fJwy3K.js";import"./Transition-BWpb0eHZ.js";import"./ActionSplitDropdown.component-QYx_MNPM.js";import"./SplitButton-C_60eGiF.js";import"./inheritsLoose-DlbViPgk.js";import"./DropdownButton-beYf-9B0.js";import"./ActionIconToggle.component-DZMhPFS6.js";import"./locale-bt-t7AYM.js";import"./Actions.component-AHHhTOt0.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
