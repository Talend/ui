import{j as e,r as m}from"./iframe-rcbdjyh0.js";import{I as o}from"./InputDateTimePicker.component-5JuokMQh.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DSaOm42y.js";import"./omit-CT9o4-Oo.js";import"./toString-BX2Xe3RA.js";import"./isSymbol-C7eRzt_H.js";import"./_setToString-yrwp8C8e.js";import"./_baseGet-C11ef2gr.js";import"./eq-C1mzgYra.js";import"./_getTag-BeKiPZ6S.js";import"./isArrayLike-CgqB0nhw.js";import"./index-Be7EvH16.js";import"./FocusManager.component-DAb9QZwA.js";import"./setSeconds-apUqzLUh.js";import"./locale-iZIbbp18.js";import"./setYear-HI3RenZo.js";import"./index-CaNwmXiY.js";import"./index-CfKrxIPm.js";import"./Action.component-DodTS3cT.js";import"./ActionButton.component-BnfaDICA.js";import"./TooltipTrigger.component-BQEDq8Ni.js";import"./index-BbWLOxH9.js";import"./CircularProgress.component-DKXr6UXW.js";import"./constants-CZYEPhht.js";import"./translate-BK16wNsJ.js";import"./withTranslation-RtkcgpcX.js";import"./Skeleton.component-BVQpKunZ.js";import"./index-C3Pb3PUj.js";import"./theme-DhFfYXOr.js";import"./OverlayTrigger.component-DSaE6koc.js";import"./RootCloseWrapper-CaRqAQd6.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-BaDRcFjQ.js";import"./Transition-CLi3r_Mg.js";import"./Transition-DIYpAYhp.js";import"./ActionSplitDropdown.component-KvS3iaZW.js";import"./SplitButton-oQtMwEHI.js";import"./inheritsLoose-7iwQTnFx.js";import"./get-C09BkURI.js";import"./DropdownButton-DkLmTM9_.js";import"./ActionIconToggle.component-CVBydy35.js";import"./memoize-D28H7Huj.js";import"./chunk-DJjVcVFb.js";import"./_isIterateeCall-bvaWDBpL.js";import"./toInteger-Bla0nInN.js";import"./toFinite-7LzTl54X.js";import"./toNumber-DX9GOYq0.js";import"./locale-MJtC3Det.js";import"./Actions.component-jMwCncJt.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
