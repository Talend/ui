import{j as e,r as m}from"./iframe-iRAzPMY8.js";import{I as o}from"./InputDateTimePicker.component-sfUT7BkC.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-8ShMoA3m.js";import"./omit-CS6P3RiW.js";import"./toString-Uaq3eq9r.js";import"./isSymbol-oj_-vwa9.js";import"./_setToString-CLXxGEHx.js";import"./_baseGet-BAYfqDfh.js";import"./eq-CC2vorwN.js";import"./_getTag-5V2N-G3f.js";import"./isArrayLike-CJa-2peo.js";import"./index-TOOeksgY.js";import"./FocusManager.component-DDpdvnfF.js";import"./setSeconds-Kwk_xvNh.js";import"./locale-Cbb7_lvI.js";import"./setYear-DbEHJ8oo.js";import"./index-BH54s8PQ.js";import"./index-DyHyJTev.js";import"./Action.component-TvI6aE1g.js";import"./ActionButton.component-C-MA_r8j.js";import"./TooltipTrigger.component-Bb4l9GJn.js";import"./index-DtBEJcaV.js";import"./CircularProgress.component-hAIB16uf.js";import"./constants-CZYEPhht.js";import"./translate-CXTmblci.js";import"./withTranslation-BNHcusKW.js";import"./Skeleton.component-fiKEWpb3.js";import"./index-CoeS2ufb.js";import"./theme-DkX-pT0S.js";import"./OverlayTrigger.component-CaaWVcUe.js";import"./RootCloseWrapper-BdzZZqCI.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-_KIwtImD.js";import"./Transition-DjCDrLBR.js";import"./Transition-BYvXW3PW.js";import"./ActionSplitDropdown.component-Lbw5668r.js";import"./SplitButton-COJ8E7lV.js";import"./inheritsLoose-C51erBbc.js";import"./get-DAUq65Xs.js";import"./DropdownButton-5DS6nl8l.js";import"./ActionIconToggle.component-Dep-paU3.js";import"./memoize-cpQbkobv.js";import"./chunk-BfEH3ni8.js";import"./_isIterateeCall-D4n6KxFK.js";import"./toInteger-BBa7cTzS.js";import"./toFinite-D0bNmBFe.js";import"./toNumber-CGEvAp63.js";import"./locale-AZfHnvbm.js";import"./Actions.component-BSmuIAS6.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
