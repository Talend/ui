import{j as e,r as m}from"./iframe-CfWawTfz.js";import{I as o}from"./InputDateTimePicker.component-D6hjiBBW.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CarRmKu2.js";import"./omit-CDk5agw1.js";import"./toString-CZ1StVC9.js";import"./isSymbol-B_IhllLH.js";import"./_baseSlice-DoFQb18h.js";import"./_baseGet-Bg4bRzyO.js";import"./eq-CeyCSzlA.js";import"./_getTag-C-E0KhKX.js";import"./isArrayLike-xbYlSaqA.js";import"./index-CNthQxxj.js";import"./FocusManager.component-DCTseE8Q.js";import"./setSeconds-CB1W604e.js";import"./locale-Bq7BOy_N.js";import"./setYear-DOADqSXy.js";import"./index-fbFDAKs5.js";import"./index-Br7yK_xg.js";import"./Action.component-CvQB7n2g.js";import"./ActionButton.component-CQ7IfqeE.js";import"./TooltipTrigger.component-C_mlG1Ec.js";import"./index-bf582Dru.js";import"./CircularProgress.component-Bl-gboGZ.js";import"./constants-CZYEPhht.js";import"./translate-_-Ynof8F.js";import"./withTranslation-LpUUPLYn.js";import"./Skeleton.component-D787FrVL.js";import"./index-Da2WDrD7.js";import"./theme-DZnXLXFI.js";import"./OverlayTrigger.component-7d0O78sW.js";import"./RootCloseWrapper-BvF8jVFh.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CFjNdl8c.js";import"./Transition-CO_Dd883.js";import"./Transition-DqY3BSxz.js";import"./ActionSplitDropdown.component-DmzuBYmN.js";import"./SplitButton-tTvU2YaZ.js";import"./inheritsLoose-DczegdGe.js";import"./get-Boxz4RUy.js";import"./DropdownButton-2hY-uqx4.js";import"./ActionIconToggle.component-LHDY8e6M.js";import"./memoize-B_FJBipw.js";import"./chunk-lf9YdDX2.js";import"./_isIterateeCall-B7PaslHw.js";import"./toInteger-Cej3zF08.js";import"./toFinite-BtNoub35.js";import"./toNumber-DhHo3qSJ.js";import"./locale-mefTl7jf.js";import"./Actions.component-D_CjFFo9.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
