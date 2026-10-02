import{j as e,r as n}from"./iframe-3y1jZF4x.js";import{I as o}from"./InputDateTimePicker.component-D8kEG8Su.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-ZYanoXIi.js";import"./index-Db-M1FSy.js";import"./FocusManager.component-CaIMHG6u.js";import"./setSeconds-DCcFVW-k.js";import"./locale-2xpwZSwl.js";import"./setYear-z6WBc_2R.js";import"./index-Bd7Vi3ix.js";import"./index-B7Jm5y_F.js";import"./Action.component-X-jMLTGW.js";import"./ActionButton.component-WhmwOG1x.js";import"./TooltipTrigger.component-BmZ3pKCr.js";import"./index-CsfkV2dm.js";import"./CircularProgress.component-DdpEaGyz.js";import"./constants-CZYEPhht.js";import"./translate-DpBBtley.js";import"./withTranslation-DPR8F9lr.js";import"./Skeleton.component-BOh42d_1.js";import"./index-Dg-53Q88.js";import"./theme-BvDxQjp0.js";import"./OverlayTrigger.component-BUrrKs_r.js";import"./RootCloseWrapper-yyTdfoFQ.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-fe5bZ7EN.js";import"./Transition-BgycbbsD.js";import"./Transition-DsYDbQ1K.js";import"./ActionSplitDropdown.component-CsfQNtI8.js";import"./SplitButton-g9agT759.js";import"./inheritsLoose-DJdv_X2N.js";import"./DropdownButton-I4soz7g5.js";import"./ActionIconToggle.component-D5-sXnHO.js";import"./locale-DGAuz_nn.js";import"./Actions.component-BaP_ECyk.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
