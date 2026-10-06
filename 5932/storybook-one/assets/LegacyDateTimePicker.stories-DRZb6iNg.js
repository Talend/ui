import{j as e,r as n}from"./iframe-C48pFhJV.js";import{I as o}from"./InputDateTimePicker.component-D5SBiBqx.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-PO1G7Y3e.js";import"./index-D3jJmA7m.js";import"./FocusManager.component-CwZMlstE.js";import"./setSeconds-DbOG4CsO.js";import"./locale-DUbsdwKj.js";import"./setYear-CkIhWlMS.js";import"./index-Duh0XQBd.js";import"./index-DlBQH41y.js";import"./Action.component-Cpi1X-1x.js";import"./ActionButton.component-DAiOpKdz.js";import"./TooltipTrigger.component-rzwE4Eqv.js";import"./index-Lgc-nS1Y.js";import"./CircularProgress.component-DtGmW_Lq.js";import"./constants-CZYEPhht.js";import"./translate-TSLQ9ZAB.js";import"./withTranslation-C9dXqC9o.js";import"./Skeleton.component-D2uNjX-i.js";import"./index-CyPmmwkQ.js";import"./theme-emrfbaKr.js";import"./OverlayTrigger.component-BnpVB_Hv.js";import"./RootCloseWrapper-Defzce-c.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B6ceX3nG.js";import"./Transition-DMYNUTay.js";import"./Transition-DeCDAV1K.js";import"./ActionSplitDropdown.component-BIA86FyM.js";import"./SplitButton-BqrRqMDI.js";import"./inheritsLoose-D8IXCwSh.js";import"./DropdownButton-3tsc0Xzz.js";import"./ActionIconToggle.component-BrQJkIgo.js";import"./locale-DSemfvc5.js";import"./Actions.component-CSukSEfe.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
