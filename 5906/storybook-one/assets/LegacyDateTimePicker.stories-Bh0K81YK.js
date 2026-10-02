import{j as e,r as n}from"./iframe-BlgLk9qF.js";import{I as o}from"./InputDateTimePicker.component-wecWuWYT.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-C8yl0VlP.js";import"./index-BT7Q77Kl.js";import"./FocusManager.component-Dx2j840Z.js";import"./setSeconds-D2j-pA43.js";import"./locale-Dg2FNfVQ.js";import"./setYear-BhkY6M6x.js";import"./index-CqYiVaiw.js";import"./index-D-jkFzob.js";import"./Action.component-BrAhCwfa.js";import"./ActionButton.component-BZxe2TEM.js";import"./TooltipTrigger.component-BAQzXUKh.js";import"./index-2dsGfdQT.js";import"./CircularProgress.component-FO_vWdpf.js";import"./constants-CZYEPhht.js";import"./translate-D6s30Iv1.js";import"./withTranslation-BxoeIsoM.js";import"./Skeleton.component-DzMHrXkf.js";import"./index-CO6Zhhm2.js";import"./theme-BwIKUXAt.js";import"./OverlayTrigger.component-CZ5dtuAo.js";import"./RootCloseWrapper-BdbdM7Ju.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-C9kBt5PL.js";import"./Transition-D2oyEY0S.js";import"./Transition-C2RCk1Q0.js";import"./ActionSplitDropdown.component-B2HMzsU0.js";import"./SplitButton-BcPhsw0x.js";import"./inheritsLoose-Cgie4Cg5.js";import"./DropdownButton-CTvbovuQ.js";import"./ActionIconToggle.component-yq-dCKUG.js";import"./locale-COHvTqCQ.js";import"./Actions.component-OAx3L2OW.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
