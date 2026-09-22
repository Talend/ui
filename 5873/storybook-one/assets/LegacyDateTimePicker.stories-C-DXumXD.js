import{j as e,r as n}from"./iframe-BfpIHyiI.js";import{I as o}from"./InputDateTimePicker.component-Cl91Fe5r.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CHGljv1s.js";import"./index-DYtwYpRE.js";import"./FocusManager.component-kmQtBQQs.js";import"./setSeconds-BiYQAtRD.js";import"./locale-u9SlOmUk.js";import"./setYear-Bn9J6SMO.js";import"./index-dPdzhdbL.js";import"./index-K87tJTHe.js";import"./Action.component-Bebt37_w.js";import"./ActionButton.component-DxHfKjzE.js";import"./TooltipTrigger.component-BRVgfROy.js";import"./index--6-TfL08.js";import"./CircularProgress.component-DAdvBSAS.js";import"./constants-CZYEPhht.js";import"./translate-CGMPRUh2.js";import"./withTranslation-D0SHyXB-.js";import"./Skeleton.component-CWJgD7cs.js";import"./index-CN5Gafv6.js";import"./theme-CInLgWcz.js";import"./OverlayTrigger.component-BNE9qrih.js";import"./RootCloseWrapper-BTDkItTv.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CfPgzEBi.js";import"./Transition-HvAfX8p1.js";import"./Transition-Caj_SskO.js";import"./ActionSplitDropdown.component-GzKW6gqV.js";import"./SplitButton-Uzxq3QhS.js";import"./inheritsLoose-CWoqp7r6.js";import"./DropdownButton-CWCvh_he.js";import"./ActionIconToggle.component-GmnB9wA6.js";import"./locale-Cchetra0.js";import"./Actions.component-BZKj5sC3.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
