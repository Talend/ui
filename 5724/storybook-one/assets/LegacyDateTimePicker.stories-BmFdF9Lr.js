import{j as e,r as m}from"./iframe-RgUw65v6.js";import{I as o}from"./InputDateTimePicker.component-DYpMD8As.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DQJydvEn.js";import"./omit-BUCJM0J1.js";import"./toString-CN3eaBAU.js";import"./isSymbol-C2UyLp5U.js";import"./_baseSlice-7jdVvZRa.js";import"./_baseGet-Ba48x7nN.js";import"./eq-BC1O3BWQ.js";import"./_getTag-C_TwGE6F.js";import"./isArrayLike-CE3xx7cU.js";import"./index-w0rc4Keq.js";import"./FocusManager.component-DQJ7wKGh.js";import"./setSeconds-Ctctg384.js";import"./locale-CkP533Lo.js";import"./setYear-Tk_0lEvd.js";import"./index-B67xqEzI.js";import"./index-CgHIEa6c.js";import"./Action.component-Cp3A882T.js";import"./ActionButton.component-DH_ewcRl.js";import"./TooltipTrigger.component-BQ9jb_NL.js";import"./index-CR3ImUN2.js";import"./CircularProgress.component-CvY4EAGe.js";import"./constants-CZYEPhht.js";import"./translate-CvJJhwK7.js";import"./withTranslation-Cd7UKj-O.js";import"./Skeleton.component-BuC7E58u.js";import"./index-DuKiuLaM.js";import"./theme-B84GjGRI.js";import"./OverlayTrigger.component-DR2heDsy.js";import"./RootCloseWrapper-C77L2t2N.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-CQcdUi3P.js";import"./Transition-CBwaArrS.js";import"./Transition-BoXVcRNz.js";import"./ActionSplitDropdown.component-SzKI3P9o.js";import"./SplitButton-DU91hRTn.js";import"./inheritsLoose-DIMPQris.js";import"./get-vL3k2tsH.js";import"./DropdownButton-v4xa8Tac.js";import"./ActionIconToggle.component-CJyf72RA.js";import"./memoize-ChuVL-sc.js";import"./chunk-f0nrcY2B.js";import"./_isIterateeCall-jTp-qapP.js";import"./toInteger-DQr-uPme.js";import"./toFinite-BHR4wtu5.js";import"./toNumber-CzalR9iH.js";import"./locale-COx5vfTP.js";import"./Actions.component-Dgcz1iPH.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
