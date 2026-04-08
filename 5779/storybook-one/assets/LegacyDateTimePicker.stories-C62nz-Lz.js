import{j as e,r as m}from"./iframe-BHnbutdG.js";import{I as o}from"./InputDateTimePicker.component-CqLZG_Yn.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-Dcn-yIw1.js";import"./omit-CrC8vraa.js";import"./toString-5H9hC4sS.js";import"./isSymbol-SwXU_3e7.js";import"./_setToString-CviBO5SA.js";import"./_baseGet-Cu5X6nP5.js";import"./eq-CCRVU2t9.js";import"./_getTag-C10-OLJK.js";import"./isArrayLike-zIqURxS0.js";import"./index-DKCr66SG.js";import"./FocusManager.component-Cfl5McbL.js";import"./setSeconds-DQiaHVn6.js";import"./locale-D_R7nzSJ.js";import"./setYear-BUbB3gyn.js";import"./index-vD5TjdI3.js";import"./index-CZsYbblm.js";import"./Action.component-BewrHkxq.js";import"./ActionButton.component-DTtesVDN.js";import"./TooltipTrigger.component-B-uA8ont.js";import"./index-C1Md9dj7.js";import"./CircularProgress.component-BIkdk1Yo.js";import"./constants-CZYEPhht.js";import"./translate-HKqSxWEz.js";import"./withTranslation-Ccbo2hsU.js";import"./Skeleton.component-CCaDGy81.js";import"./index-HvYp_m2K.js";import"./theme-CdeFHoTX.js";import"./OverlayTrigger.component-3Vqx1ab4.js";import"./RootCloseWrapper-DFm-2V3K.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-B42uhfai.js";import"./Transition-pfN9JF0x.js";import"./Transition-DaP1WEWp.js";import"./ActionSplitDropdown.component-CHN-_77i.js";import"./SplitButton-CKKf5Unu.js";import"./inheritsLoose-B91ckkkl.js";import"./get-DXPKu8yu.js";import"./DropdownButton-CIomr5WH.js";import"./ActionIconToggle.component-DpG0qhL4.js";import"./memoize-DJRV2pqm.js";import"./chunk-D25TB9pb.js";import"./_isIterateeCall-DOHiEXZD.js";import"./toInteger-D68JfFdg.js";import"./toFinite-D17zRLon.js";import"./toNumber-le2V35GE.js";import"./locale-BnJHaDdV.js";import"./Actions.component-CT1cukiz.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
