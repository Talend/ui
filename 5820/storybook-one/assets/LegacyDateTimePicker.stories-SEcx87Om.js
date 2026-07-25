import{j as e,r as m}from"./iframe-BqWCCsDL.js";import{I as o}from"./InputDateTimePicker.component-uJgQxOOr.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-CmfMXPXl.js";import"./omit-C0QUnnF3.js";import"./toString-B2BNrrUM.js";import"./isSymbol-CtaomC-F.js";import"./_setToString-DixzDcZd.js";import"./_baseGet-CdnBnxpc.js";import"./eq-BMdSP8iB.js";import"./_getTag-DT6N4jPe.js";import"./isArrayLike-CCv4fVuZ.js";import"./index-BMThaRJc.js";import"./FocusManager.component-DY1GS63J.js";import"./setSeconds-CRC8i3UZ.js";import"./locale-Q_LNqK9i.js";import"./setYear-CNCNogYS.js";import"./index-BuprKFFR.js";import"./index-CglVEfpL.js";import"./Action.component-BuAQFmZU.js";import"./ActionButton.component-aBNqwcau.js";import"./TooltipTrigger.component-DccGE_fb.js";import"./index-C2Izrgqa.js";import"./CircularProgress.component-0MMSHmti.js";import"./constants-CZYEPhht.js";import"./translate-BVVRSOsh.js";import"./withTranslation-BAxK1D91.js";import"./Skeleton.component-D_mZOzFV.js";import"./index-xzXCkAHM.js";import"./theme-4HAfHMSd.js";import"./OverlayTrigger.component-28qePXrx.js";import"./RootCloseWrapper-UHfWJoQo.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-D_hQj0VP.js";import"./Transition-Cu-CicM_.js";import"./Transition-Em4fwuWs.js";import"./ActionSplitDropdown.component-cT17gFt-.js";import"./SplitButton-DSwLULBF.js";import"./inheritsLoose-DLFSINMF.js";import"./get-Dx5XbnSB.js";import"./DropdownButton-6Etz-8PM.js";import"./ActionIconToggle.component-CLnn2DQN.js";import"./memoize-Ln4B4MtD.js";import"./chunk-DAW5JGUW.js";import"./_isIterateeCall-CNkHRC8X.js";import"./toInteger-nw7NVAJR.js";import"./toFinite-Dpn2O82S.js";import"./toNumber-BgEUNCO-.js";import"./locale-BHbX-v0h.js";import"./Actions.component-BLozSqqY.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
