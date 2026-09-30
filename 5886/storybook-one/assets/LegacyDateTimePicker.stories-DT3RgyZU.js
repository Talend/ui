import{j as e,r as n}from"./iframe-D-EUysff.js";import{I as o}from"./InputDateTimePicker.component-Cq1FBFn3.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CwQCEU1a.js";import"./index-ULQPmOLK.js";import"./FocusManager.component-QNoYSpOj.js";import"./setSeconds-BcPvYjrr.js";import"./locale-o6gM6zie.js";import"./setYear-cEJROGXF.js";import"./index-B4xqsCWS.js";import"./index-5juW9kAf.js";import"./Action.component-BY8cq8pC.js";import"./ActionButton.component-BMEKJbGJ.js";import"./TooltipTrigger.component-4Btv4xcw.js";import"./index-B_9n7Kxb.js";import"./CircularProgress.component-Cg7GFagI.js";import"./constants-CZYEPhht.js";import"./translate-B7K6hZ5Q.js";import"./withTranslation-r53Aab-q.js";import"./Skeleton.component-CY3-zHAI.js";import"./index-C6xQUgcU.js";import"./theme-tDs5Tliy.js";import"./OverlayTrigger.component-Dm-iYfjy.js";import"./RootCloseWrapper-Br3iUN4-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-DvN40Q8B.js";import"./Transition-DEni0Ict.js";import"./Transition-Bwa-40Ro.js";import"./ActionSplitDropdown.component-mPufUNzO.js";import"./SplitButton-CVQeHJdR.js";import"./inheritsLoose-ByZnSrO6.js";import"./DropdownButton-DuHlW_pH.js";import"./ActionIconToggle.component-Br2_1DlB.js";import"./locale-BmM_QnQe.js";import"./Actions.component-CeCJEBWH.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
