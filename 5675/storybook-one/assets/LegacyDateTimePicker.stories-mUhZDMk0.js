import{j as e,r as m}from"./iframe-DDbQPtEW.js";import{I as o}from"./InputDateTimePicker.component-BqYw2nWN.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-BI8BxSlp.js";import"./omit-D72adO18.js";import"./toString-Cnm5KTc0.js";import"./isSymbol-DBdBqAfo.js";import"./_setToString-Cv7pkYb4.js";import"./_baseGet-lTKxROzH.js";import"./eq-DCF4gZF2.js";import"./_getTag-BfvBz_ei.js";import"./isArrayLike-BSyHTOuQ.js";import"./index-D87kYxp9.js";import"./FocusManager.component-BTm7IE9d.js";import"./setSeconds-BGwblNSk.js";import"./locale-fkJFDnVX.js";import"./setYear-BFavk6TG.js";import"./index-BKUC7KxK.js";import"./index-BhaHfiwO.js";import"./Action.component-z_tc2k8W.js";import"./ActionButton.component-C1rXDJXG.js";import"./TooltipTrigger.component-RyTGuFAh.js";import"./index-Br5au_O-.js";import"./CircularProgress.component-apPtCWbd.js";import"./constants-CZYEPhht.js";import"./translate-BAS4THSV.js";import"./withTranslation-CBoklo2K.js";import"./Skeleton.component-E6T_PEsN.js";import"./index-DwN9fP63.js";import"./theme-B86cisQm.js";import"./OverlayTrigger.component-BqP3Bda5.js";import"./RootCloseWrapper-BGY27Mp-.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-ByhQlRMI.js";import"./Transition-DKLhCDBr.js";import"./Transition-BRDVftK1.js";import"./ActionSplitDropdown.component-DJ2RyVCW.js";import"./SplitButton-BOEX_SVG.js";import"./inheritsLoose-CDxvETEX.js";import"./get-DEhvjXoT.js";import"./DropdownButton-Bs0K8Cqf.js";import"./ActionIconToggle.component-moWZDsKn.js";import"./memoize-DLUabEJq.js";import"./chunk-8zleJmCP.js";import"./_isIterateeCall-DSJOqLfp.js";import"./toInteger-DrYW0tzK.js";import"./toFinite-D0Ioh8e7.js";import"./toNumber-CxRDCBqN.js";import"./locale-CzoPqZuo.js";import"./Actions.component-BBVK7eHA.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
