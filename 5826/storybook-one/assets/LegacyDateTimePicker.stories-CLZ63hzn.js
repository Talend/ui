import{j as e,r as m}from"./iframe-DQgfJw67.js";import{I as o}from"./InputDateTimePicker.component-CDSeGhs6.js";import"./preload-helper-PPVm8Dsz.js";import"./usePopper-pqEwsCH-.js";import"./omit-ejUvHiJ5.js";import"./toString-DozcUBT0.js";import"./isSymbol-CVtcgdPj.js";import"./_setToString-DxntCt01.js";import"./_baseGet-CUFEkqTw.js";import"./eq-DGfcdYR8.js";import"./_getTag-DVBlZYjA.js";import"./isArrayLike-CLJp57Ut.js";import"./index-qucOk5KI.js";import"./FocusManager.component-W0S9WzNH.js";import"./setSeconds-BhulK3U1.js";import"./locale-3E9mQ0-F.js";import"./setYear-znM4dBzQ.js";import"./index-qFWW23ar.js";import"./index-BVrDfkW_.js";import"./Action.component-CmH1MtAx.js";import"./ActionButton.component-AsICv5PP.js";import"./TooltipTrigger.component-B8TTpdzm.js";import"./index-DrrsYP9K.js";import"./CircularProgress.component-lrWQ3-22.js";import"./constants-CZYEPhht.js";import"./translate-DiI_Es12.js";import"./withTranslation-5PR4BJ6-.js";import"./Skeleton.component-DZyar7PT.js";import"./index-CncI1Mj4.js";import"./theme-DI8-UJzN.js";import"./OverlayTrigger.component-BVf8SOUy.js";import"./RootCloseWrapper-BV5D6_Gk.js";import"./interopRequireDefault-CBIuXflU.js";import"./Popover-sVDanUzs.js";import"./Transition-DmNqRhFd.js";import"./Transition-C453gXLR.js";import"./ActionSplitDropdown.component-BSp9Na7X.js";import"./SplitButton-CEa8ibQT.js";import"./inheritsLoose-Dv8TIbRQ.js";import"./get-ClAVEm52.js";import"./DropdownButton-pzd5K3ei.js";import"./ActionIconToggle.component-B0-5UtJT.js";import"./memoize-APV1wq0W.js";import"./chunk-BS7RgkN2.js";import"./_isIterateeCall-Dt6YPhxg.js";import"./toInteger-DCsyowyb.js";import"./toFinite-DOBzaUwH.js";import"./toNumber-Cmj3r02Y.js";import"./locale-CeCU_m53.js";import"./Actions.component-rBGQUexS.js";const{action:r}=__STORYBOOK_MODULE_ACTIONS__,ie={title:"Components/Deprecated/LegacyDteTimePicker"},i=()=>e.jsx(m.Fragment,{children:e.jsxs("div",{style:{width:150},children:[e.jsx("div",{children:" in form mode with validation and submit "}),e.jsx(o,{id:"my-date-picker",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,formMode:!0,required:!1,useSeconds:!0})]})}),t=()=>e.jsxs(m.Fragment,{children:[e.jsx("h3",{children:"Hybrid DateTime picker"}),e.jsx("p",{children:"For use when the independent input of date or time within one component is required"}),e.jsxs("div",{style:{width:200},children:[e.jsx("div",{children:"With no preselected value"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,formMode:!0}),e.jsx("div",{children:"With preselected time"}),e.jsx(o,{id:"my-date-picker2",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"14:33:00",formMode:!0}),e.jsx("div",{children:"With preselected date"}),e.jsx(o,{id:"my-date-picker3",name:"Datetime",onBlur:r("onBlur"),onChange:r("onChange"),useTime:!0,required:!1,useSeconds:!0,hybridMode:!0,selectedDateTime:"2012-12-12",formMode:!0})]})]});i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
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
