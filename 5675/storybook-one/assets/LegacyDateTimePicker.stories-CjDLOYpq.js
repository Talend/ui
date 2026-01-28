import{j as e,r as m}from"./iframe-BrV_C0lS.js";import{I as o}from"./InputDateTimePicker.component-CBdGpoUK.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-fw3b8kBr.js";import"./omit-DwXSrYJI.js";import"./toString-EHNBcK8R.js";import"./isSymbol-B-O5EbbU.js";import"./_setToString-Dc5lN5s8.js";import"./_baseGet-BarmkZqE.js";import"./eq-CESIMbK6.js";import"./_getTag-DKk3ktNN.js";import"./isArrayLike-Dz6u7zkv.js";import"./index-DLa56r1g.js";import"./FocusManager.component-djsn5sqz.js";import"./setSeconds-RqtVUS0h.js";import"./locale-BQqvxkDH.js";import"./setYear-C63yvo2e.js";import"./index-IKeAoPW3.js";import"./index-BGPWKf8_.js";import"./Action.component-Bd2ry1Cm.js";import"./ActionButton.component-CX64OOwE.js";import"./TooltipTrigger.component-xTn3JdoU.js";import"./index-CyLLb8ny.js";import"./CircularProgress.component-BGG8ERnA.js";import"./constants-CZYEPhht.js";import"./translate-DHfPBvmz.js";import"./withTranslation-B0EdGgI2.js";import"./Skeleton.component-NhDgtDmF.js";import"./index-D7vK3zVi.js";import"./theme-COWgiA41.js";import"./OverlayTrigger.component-BFqpcy8S.js";import"./RootCloseWrapper-Cplz5Qvz.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CWstWGjk.js";import"./Transition-C2lqVYsH.js";import"./Transition-DEWbpGS1.js";import"./ActionSplitDropdown.component-uVrYiVkr.js";import"./SplitButton-CEU47wFB.js";import"./inheritsLoose-Cwo6rj-Z.js";import"./get-D6yb22gy.js";import"./DropdownButton-BkqPs7DL.js";import"./ActionIconToggle.component-Tr4QZC5x.js";import"./memoize-DMmWGOdk.js";import"./chunk-DSAWLCmk.js";import"./_isIterateeCall-CTXNeVd3.js";import"./toInteger-CnVus2ze.js";import"./toFinite-CGOU2Bjq.js";import"./toNumber-Ak3aqMMO.js";import"./locale-DjNbnxYC.js";import"./Actions.component-CqTL0dCk.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
}`,...t.parameters?.docs?.source}}};const te=["FormModeDateTime","FormModeHybridDateTime"];export{i as FormModeDateTime,t as FormModeHybridDateTime,te as __namedExportsOrder,ie as default};
