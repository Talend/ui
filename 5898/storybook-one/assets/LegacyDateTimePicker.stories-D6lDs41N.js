import{j as e,r as n}from"./iframe-CDJ6KLCh.js";import{I as o}from"./InputDateTimePicker.component-DSfTAvVm.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-B-3jPftw.js";import"./index-CWjbCr1P.js";import"./FocusManager.component-BeHAbrAj.js";import"./setSeconds-pI5LeZNB.js";import"./locale-BDvK9v-w.js";import"./setYear-DBVODZyI.js";import"./index-KD2n7iIT.js";import"./index-C-wytU6m.js";import"./Action.component-B6ZqhYBk.js";import"./ActionButton.component-BHnJ6ZYO.js";import"./TooltipTrigger.component-DqtXbTPd.js";import"./index-CZ9hiKOH.js";import"./CircularProgress.component-D3CAQNDq.js";import"./constants-CZYEPhht.js";import"./translate-BQrhZ-Pf.js";import"./withTranslation-BDdFVgBu.js";import"./Skeleton.component-qSXu_DdQ.js";import"./index-DkixZ_vL.js";import"./theme-DFBXpDF3.js";import"./OverlayTrigger.component-yjbFEnLP.js";import"./RootCloseWrapper-CMvK690L.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-x16v4Ffx.js";import"./Transition-C3U9XB36.js";import"./Transition-DDfD36wc.js";import"./ActionSplitDropdown.component-CjC0mqTm.js";import"./SplitButton-DowJ6UE3.js";import"./inheritsLoose-DqqoJLU4.js";import"./DropdownButton-UrlXDmWt.js";import"./ActionIconToggle.component-CHNGMr74.js";import"./locale-BEaZYby_.js";import"./Actions.component-nPO5HRpr.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
