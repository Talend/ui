import{j as e,r as n}from"./iframe-6asKVVsl.js";import{I as o}from"./InputDateTimePicker.component-C3TV71aN.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CJFFTxUY.js";import"./index-BmZd2mRn.js";import"./FocusManager.component-B5DZISft.js";import"./setSeconds-7jsdONGC.js";import"./locale-Q5F9Z2nt.js";import"./setYear-UL388o3V.js";import"./index-B1DisSoT.js";import"./index-DauKQxXd.js";import"./Action.component-KbugO4_C.js";import"./ActionButton.component-D9FZGuHe.js";import"./TooltipTrigger.component-C86URA6j.js";import"./index-By-pDWaI.js";import"./CircularProgress.component-9wuRn7KY.js";import"./constants-CZYEPhht.js";import"./translate-CoBVjAcn.js";import"./withTranslation-CvVGPkLZ.js";import"./Skeleton.component-BKVpzPxj.js";import"./index-Cyqtpwuc.js";import"./theme-D-7rBt3Q.js";import"./OverlayTrigger.component-BZ0nG-17.js";import"./RootCloseWrapper-BBNC_g8X.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BGc1L0-G.js";import"./Transition-B-ARgh4W.js";import"./Transition-z-aqn63k.js";import"./ActionSplitDropdown.component-dfq8kj9J.js";import"./SplitButton-BVxJDWo6.js";import"./inheritsLoose-BOC6Wc0J.js";import"./DropdownButton-Ct4wIPBI.js";import"./ActionIconToggle.component-CfpX3wCg.js";import"./locale-BVr7jBC-.js";import"./Actions.component-B45Q7cW0.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
