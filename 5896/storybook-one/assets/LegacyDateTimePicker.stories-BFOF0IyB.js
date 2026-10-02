import{j as e,r as n}from"./iframe-C-xiqyGS.js";import{I as o}from"./InputDateTimePicker.component-CWWvJgZT.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DBgrz1fk.js";import"./index-aMlfDJ2o.js";import"./FocusManager.component-CW6IyXBT.js";import"./setSeconds-wQqrKzTu.js";import"./locale-DPZ41ufx.js";import"./setYear-DjMFeP4b.js";import"./index-VLxBkueb.js";import"./index-CWam3yl_.js";import"./Action.component-B1K3CJU-.js";import"./ActionButton.component-BlUPgckP.js";import"./TooltipTrigger.component-Db5UU-kL.js";import"./index-DohPNRn5.js";import"./CircularProgress.component-fQGWD3Pl.js";import"./constants-CZYEPhht.js";import"./translate-D2ms-2Ez.js";import"./withTranslation-D2lK0The.js";import"./Skeleton.component-G5-f-TGh.js";import"./index-Ct6zlM2O.js";import"./theme-CRO3wWci.js";import"./OverlayTrigger.component-D0mQmEdI.js";import"./RootCloseWrapper-DM4x_TCU.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-PUej0E69.js";import"./Transition-B5IVMjX3.js";import"./Transition-CRoPPnJh.js";import"./ActionSplitDropdown.component-LK_QM6aK.js";import"./SplitButton-B_dYi9T8.js";import"./inheritsLoose-ByZm6T89.js";import"./DropdownButton-BreAy9fM.js";import"./ActionIconToggle.component-LaDIO_FD.js";import"./locale-Md727kB5.js";import"./Actions.component-DLA6FoCS.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(n.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(n.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
