import{j as e,r as m}from"./iframe-BBf9rzxA.js";import{I as o}from"./InputDateTimePicker.component-P0DKr9Ms.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-DlGpQQ9g.js";import"./omit-D2aDgycu.js";import"./toString-CYYtD2UM.js";import"./isSymbol-d6VGNOms.js";import"./_setToString-DGfO32Ln.js";import"./_baseGet-BLHmTq3h.js";import"./eq-BfMl4R98.js";import"./_getTag-BQmqoArp.js";import"./isArrayLike-CGt-7ZY7.js";import"./index-CNra1Jm6.js";import"./FocusManager.component-ZobH5sk1.js";import"./setSeconds-CanBfAXC.js";import"./locale-Dj1lWA4T.js";import"./setYear-BJzlXwe-.js";import"./index-Elct4BNm.js";import"./index-Cd2SuuYy.js";import"./Action.component-Cz8Igo4J.js";import"./ActionButton.component-D9c99jvM.js";import"./TooltipTrigger.component-gDCERbUQ.js";import"./index-D3rKfqfq.js";import"./CircularProgress.component-CP7cXXJs.js";import"./constants-CZYEPhht.js";import"./translate-DcFpjhI3.js";import"./withTranslation-Tch9Q_mc.js";import"./Skeleton.component-D0yTK3Tj.js";import"./index-DAqxfM7Q.js";import"./theme-C4w-c8M9.js";import"./OverlayTrigger.component-kuFDFFVI.js";import"./RootCloseWrapper-D3cfPY5q.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-f2TN8igf.js";import"./Transition-BOfoCdDz.js";import"./Transition-Bz4l5973.js";import"./ActionSplitDropdown.component-8m2MMfat.js";import"./SplitButton-MWoh9VS5.js";import"./inheritsLoose-CDvLJTBf.js";import"./get-D4npDK4m.js";import"./DropdownButton-20PkRYW5.js";import"./ActionIconToggle.component-CW6o58yd.js";import"./memoize-DHMZL6Yg.js";import"./chunk-CLfbxtdW.js";import"./_isIterateeCall-D5s1XzZY.js";import"./toInteger-C5CuOUwJ.js";import"./toFinite-DIpSmBgC.js";import"./toNumber-B8zT_HUj.js";import"./locale-CJ-eiN_N.js";import"./Actions.component-D8eQ-2cD.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
